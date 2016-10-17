angular.module('app.commonservices', [])

/**
公共组件
*/
//公共-消息
.factory('UTIL_DIALOG', function($ionicPopup, $cordovaToast){
	return {
		//弹出消息
		show: function(message, title){
			$ionicPopup.alert({
				title: title || "提示信息",
				buttons: [{
					text: '确认',
					type: 'button-balanced'
				}],
				template: message
			});
		},
		//显示消息
		alert: function(message){
			$cordovaToast.showShortTop(message)
		}
	};
})
//公共-loading
.factory('UTIL_LOADING', function($ionicLoading){

	return {
		show: function(){
			$ionicLoading.show({
				template: '加载中...'
			});
		},
		close: function(){
			$ionicLoading.hide();
		}
	};
})

//公共-http
.factory('UTIL_HTTP', function($http, $q, $state, UTIL_LOADING, UTIL_DIALOG, UTIL_USER, APPCONFIG ){

	function sendHttp(params){
		if(!params) return;
		var deferred = $q.defer();
		//增加token
		UTIL_USER.getToken().then(function(token){
			if(token){
				if(params.data){
					params.data.token = token;
				}else{
					params.data = {token: token};
				}
			}
			//是否显示loading
			var lastTimeout = null;
			if(params.isShowLoading !== false){
				//延迟显示loading
				var loadingDefferTime = 500;
				lastTimeout = setTimeout(function(){
					UTIL_LOADING.show();
				}, loadingDefferTime);
			}

			var request = {
				url: APPCONFIG.SERVER_URL_PRE + params.url,
				dataType: 'json'
			};
			params.type = params.type || "GET";
			request.method = params.type;
			if(params.type == "GET"){
				request.params = params.data;
			}else{
				request.data = params.data;
			}

			$http(request).success(function(data){
				if(lastTimeout){
					clearTimeout(lastTimeout);
					lastTimeout = null;
				}
				UTIL_LOADING.close();
				if(!data) return;
				if(data.success === "1"){//成功
					deferred.resolve(data.data);
				}else if(data.success === "0"){//失败
					if(params.isShowLoading !== false){
						UTIL_DIALOG.show(data.msg || "加载失败");
					}
					deferred.reject("加载失败");
				}else if(data.success === "403"){//未登陆
					$state.go("login");
				}
			}).error(function(data, header, config, status){
				if(lastTimeout){
					clearTimeout(lastTimeout);
					lastTimeout = null;
				}
				UTIL_LOADING.close();
				if(params.isShowLoading !== false){
					UTIL_DIALOG.show(data.msg || "加载失败");
				}
				deferred.reject("加载失败");
			});
		});

		return deferred.promise;
	}

	return {
		/* get请求
		{
			url: "",//url
			data: {},//参数
			isShowLoading: true,//是否显示加载-默认：是
		}
		*/
		get: function(data){
			var reqData = data;
			if(reqData){
				reqData.type = "GET";
			}else{
				reqData = {type: "GET"};
			}
			return sendHttp(reqData);
		},
		/* post请求
		{
			url: "",//url
			data: {},//参数
			isShowLoading: true,//是否显示加载-默认：是
		}
		*/
		post: function(data){
			var reqData = data;
			if(reqData){
				reqData.type = "POST";
			}else{
				reqData = {type: "POST"};
			}
			return sendHttp(reqData);
		}
	};

})

//公共-用户状态
.factory('UTIL_USER', function($q, SPEDATA){

	var userInfoKey = "user_info";

	//获取登录用户信息
	var getUserInfo = function(key){
		var deferred = $q.defer();
		SPEDATA.get(userInfoKey).then(function(data){
			if(data){
				var item = JSON.parse(data);
				if(key){
					deferred.resolve(item[key]);
				}else{
					deferred.resolve(item);
				}
			}else{
				deferred.resolve(null);
			}
		});
		return deferred.promise;
	};

	return {
		//是否登录
		isLogin: function(){
			var deferred = $q.defer();
			getUserInfo("expire").then(function(expire){
				var isLogin = false;
				if(!expire){
					isLogin = false;
				}else{
					if(new Date(expire) <= new Date().getTime()){
						isLogin = false;
					}else{
						isLogin = true;
					}
				}
				deferred.resolve(isLogin);
			});
			return deferred.promise;
		},
		//获取用户id
		getUserId: function(){
			var deferred = $q.defer();
			getUserInfo("id").then(function(id){
				deferred.resolve(id + "");
			});
			return deferred.promise;
		},
		//user info
		getUser: function(){
			var deferred = $q.defer();
			getUserInfo().then(function(info){
				deferred.resolve(info);
			});
			return deferred.promise;
		},
		//token
		getToken: function(){
			var deferred = $q.defer();
			getUserInfo("token").then(function(token){
				deferred.resolve(token);
			});
			return deferred.promise;
		},
		//设置用户信息
		setUserInfo: function(info){
			SPEDATA.set(userInfoKey, JSON.stringify(info));
		},
		//用户登出
		logout: function(){
			SPEDATA.del(userInfoKey);
		}
	};
})

//公共-sqlite存储
.service("$sqliteService", function($q, $cordovaSQLite, APPCONFIG, $log, SqlInitBrowser, SqlInitMobile, UTIL_DIALOG){

	var self = this;
	var _db;
	self.db = function () {
		if (!_db) {
			if (window.sqlitePlugin !== undefined) {
				_db = window.sqlitePlugin.openDatabase({ name: APPCONFIG.DB_FILE, location: 2, createFromLocation: 1 });
			} else {
				// For debugging in the browser
				_db = window.openDatabase(APPCONFIG.DB_FILE, "1.0", "Database", 200000);
			}
			self.initTables();
		}
		return _db;
	};

	//执行sql
	self.executeSql = function (query, parameters) {
		var deferred = $q.defer();
		$cordovaSQLite
			.execute(self.db(), query, parameters)
			.then(function (res) {
				var items = [];
				for (var i = 0; i < res.rows.length; i++) {
					items.push(res.rows.item(i));
				}
				deferred.resolve(items);
		}, function (err) {
			$log.log(err.message);
			UTIL_DIALOG.show(err.message);
			deferred.reject(err);
		});
		return deferred.promise;
	};

	//初始化数据库
	self.initTables = function () {
		var deferred = $q.defer();
		var sqls;
		if (window.sqlitePlugin !== undefined) {
			sqls = SqlInitMobile.sqls;
		} else {
			sqls = SqlInitBrowser.sqls;
		}
		self.db().transaction(function (tx) {
			for (var i = 0; i < sqls.length; i++) {
				var query = sqls[i].replace(/\\n/g, '\n');
				tx.executeSql(query);
			}
		}, function (error) {
			deferred.reject(error);
		}, function () {
			deferred.resolve("OK");
		});
		return deferred.promise;
	};

})

//公共-从本地存储sqllite中读取、设置数据
.factory('SPEDATA', function($q, $sqliteService){

	return {
		//读取数据
		get: function(key){
			var deferred = $q.defer();
			$sqliteService.executeSql(
				"select * from spedata where key = ? ", [key])
			.then(function(data){
				var value;
				if(data && data.length > 0){
					value = data[0].value;
				}
				deferred.resolve(value);
			});
			return deferred.promise;
		},
		//设置数据
		set: function(key, value){
			//删除
			$sqliteService.executeSql(
				"delete from spedata where key = ? ", [key])
			.then(function(){
				//插入
				$sqliteService.executeSql(
					"insert into spedata (key, value) values (?, ?) ", [key, value]);
			});
		},
		//删除数据
		del: function(key){
			//删除
			$sqliteService.executeSql(
				"delete from spedata where key = ? ", [key]);
		}
	};
})

;