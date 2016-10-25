// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic', 'ngCordova', 'app.routes', 'app.commonservices', 'app.directives', 'templates'], function($httpProvider){

	// Use x-www-form-urlencoded Content-Type
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

	/**
	 * The workhorse; converts an object to x-www-form-urlencoded serialization.
	 * @param {Object} obj
	 * @return {String}
	 */
	var param = function(obj) {
	var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

	for(name in obj) {
		value = obj[name];

		if(value instanceof Array) {
		for(i=0; i<value.length; ++i) {
			subValue = value[i];
			fullSubName = name + '[' + i + ']';
			innerObj = {};
			innerObj[fullSubName] = subValue;
			query += param(innerObj) + '&';
		}
		}
		else if(value instanceof Object) {
		for(subName in value) {
			subValue = value[subName];
			fullSubName = name + '[' + subName + ']';
			innerObj = {};
			innerObj[fullSubName] = subValue;
			query += param(innerObj) + '&';
		}
		}
		else if(value !== undefined && value !== null)
		query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	}

	return query.length ? query.substr(0, query.length - 1) : query;
	};

	// Override $http service's default transformRequest
	$httpProvider.defaults.transformRequest = [function(data) {
	return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	}];

})

.run(function($ionicPlatform, $rootScope, $state, $location, $timeout, $ionicHistory, $cordovaToast, UTIL_USER, $ionicNavBarDelegate, $sqliteService,APPCONFIG,UTIL_USER) {

	$rootScope.EXT = {
		user: {
			isLogin: null
		}
	};
	//接收页面传来的参数
	var request =
	{
    	QueryString : function(val){
    	var uri = window.location.search;
    	var re = new RegExp(val+ "=([^&?]*)", "ig");
    	return ( (uri.match(re)) ?(uri.match(re)[0].substr(val.length+1)):null);
    	}
	}
	var token= decodeURI(request.QueryString("token"));
	if(APPCONFIG.IS_WEB&&(token!=null||token!="")){
		$rootScope.EXT.user.isLogin=true;
		UTIL_USER.setUserInfo({
			token: token,
			expire: 604800
		});
	}
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

			cordova.plugins.backgroundMode.setDefaults({ text:'百姓医院'});
			cordova.plugins.backgroundMode.enable();

			//进入后台
			cordova.plugins.backgroundMode.onactivate = function () {
				clearTimeout(timeOutMessage);
				refreshMessage(true);
			};
			//进入前台
			cordova.plugins.backgroundMode.ondeactivate  = function () {
				clearTimeout(timeOutMessage);
				refreshMessage(false);
			};
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}

		//初始化数据库
		$sqliteService.db();

		//启动画面
		if(navigator.splashscreen){
			navigator.splashscreen.hide();
		}

		//后退按钮事件
		$ionicPlatform.registerBackButtonAction(function (e) {
			//判断处于哪个页面时双击退出
			if ($location.path() == '/index') {
				if ($rootScope.backButtonPressedOnceToExit) {
					ionic.Platform.exitApp();
				} else {
					$rootScope.backButtonPressedOnceToExit = true;
					$cordovaToast.showShortTop('再按一次退出系统');
					setTimeout(function () {
						$rootScope.backButtonPressedOnceToExit = false;
					}, 2000);
				}
			}
			else if ($ionicHistory.backView()) {
				if ($cordovaKeyboard.isVisible()) {
					$cordovaKeyboard.close();
				} else {
					$ionicHistory.goBack();
				}
			} else {
				$rootScope.backButtonPressedOnceToExit = true;
				$cordovaToast.showShortTop('再按一次退出系统');
				setTimeout(function () {
					$rootScope.backButtonPressedOnceToExit = false;
				}, 2000);
			}
			e.preventDefault();
			return false;
		}, 101);

		// 初始化用户登录状态
		UTIL_USER.isLogin().then(function(data){
			$rootScope.EXT.user.isLogin = data;
		});

	});

	//需要登录的页面
	var filterStates = [
	"messagelist",
	"medicalrecored",
	"medicalrecoredDetail",
	"medicalrecoredPre",
	"medicalrecoredFee",
	"medicalrecoredReport",
	"patientList",
	"opinion",
	"messagelist",
	"messagedetail",
	"appointMent",
	"drugAlert"
	];
	//监听页面切换-开始-判断页面是否需要登录
	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){

		if(toState.name == 'login') return;// 如果是进入登录界面则允许
		if(fromState.name == '') return;

		for(var idx in filterStates){
			var filterState = filterStates[idx];
			if(filterState == toState.name){
				var isLogin = $rootScope.EXT.user.isLogin;
				if(!isLogin){
					e.preventDefault();
					$state.go(//跳转到登录界面
						"login",
						{from: fromState.name,
						fromParams: fromParams,
						to: toState.name,
						toParams: toParams});
				}
			}
		}
	});

	//监听页面切换-完毕
	$rootScope.$on('$stateChangeSuccess', function(event){
	$ionicNavBarDelegate.showBar(true);
	$ionicNavBarDelegate.showBackButton(true);
	});
})

//自定义ionic配置
app.config(function($ionicConfigProvider, APPCONFIG, $urlRouterProvider) {

	//tabs位置
	$ionicConfigProvider.tabs.position("bottom");
	//原生滚动
	$ionicConfigProvider.scrolling.jsScrolling(true);

});

//常量
app.constant('APPCONFIG', {
	IS_WEB: true,// 是否web发布（影响部分web不支持的功能）
	//服务端地址
	SERVER_URL_PRE: "http://localhost:8100/api",//浏览器调试
	//SERVER_URL_PRE: "http://192.168.1.252:9401/api-mobile/api",//打包发布
	//分页加载每页参数
	PAGE_SIZE: 10,
	//本地数据库
	DB_FILE: "appoint.db"
});

app.controller("NavBarCtrl", function($scope, $state ,$ionicHistory) {
	$scope.getPreviousTitle = function() {
		return $ionicHistory.backTitle();
	};
})