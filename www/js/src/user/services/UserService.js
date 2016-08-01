//用户
app.service('UserService', function(UTIL_HTTP, UTIL_USER, $q){
	return {
		//登录
		login : function(params){
			var deferred = $q.defer();
			UTIL_HTTP.post({
				url: "/login",
				data: params
			})
			.then(function(data){
				if(data){
					//计算过期时间
					var expire = data.expire;
					var expireDate = new Date();
					expireDate.setSeconds(expireDate.getSeconds() + expire);
					UTIL_USER.setUserInfo({
						id: data.userId,
						token: data.token,
						expire: expireDate
					});
				}
				deferred.resolve();
			});
			return deferred.promise;
		},
		//登出
		logout : function(){
			var deferred = $q.defer();
			UTIL_USER.getToken().then(function(token){
				UTIL_HTTP.post({
					url: "/logout/" + token
				}).then(function(data){
					UTIL_USER.logout();
					deferred.resolve();
				});
			});
			return deferred.promise;
		},
		//个人中心概要信息
		getSummary: function(){
			return UTIL_HTTP.get({
				url: "/userinfo/summary"
			});
		},
		//编辑用户信息
		editUser: function(params){
			return UTIL_HTTP.post({
				url: "/userinfo/edit",
				data: params
			});
		},
		//修改密码
		editPassword: function(oldPwd, newPwd, dupNewPwd){
			return UTIL_HTTP.post({
				url: "/userinfo/editpwd",
				data: {
					oldPwd: oldPwd,
					newPwd: newPwd,
					dupNewPwd: dupNewPwd
				}
			});
		},
		//编辑头像-base64
		editAvatarByBase64: function(avatar){
			return UTIL_HTTP.post({
				url: "/userinfo/editAvatar",
				isShowLoading: false,
				data: {
					avatar: avatar
				}
			});
		},
		//获取头像-base64
		getvatarByBase64: function(){
			return UTIL_HTTP.post({
				url: "/userinfo/avatar"
			});
		},
		//反馈意见
		addOpinion: function(info){
			return UTIL_HTTP.post({
				url: "/useropinion/add",
				data: {
					info: info
				}
			});
		},
		//获取所有未读消息
		getUnreadMessage: function(){
			return UTIL_HTTP.get({
				url: "/usermessage/unread"
			});
		}
	};

})