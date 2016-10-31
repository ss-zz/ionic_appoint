//我的-首页
app.controller('MainMyCtrl', function($scope, UserService, UTIL_USER, MessageService, $cordovaCamera, UTIL_DIALOG, $state, APPCONFIG) {

	//用户是否登录
	//UTIL_USER.isLogin().then(function(data){
	//	$scope.isLogin = data;
	//	if($scope.isLogin){//已登录
			$scope.isLogin = true;
			//未读消息数
			MessageService.getUnreadMessageCountFromLocal().then(function(data){
				$scope.unreadMessageCount = data;
			});
			//基础信息
			UserService.getSummary().then(function(data){
				if(data){
					$scope.myPatientCount = data.myPatientCount;
					$scope.user = data.user;
				}
			});
			//头像信息
			UserService.getvatarByBase64().then(function(data){
				if(!data) return;
				if(data.indexOf("http://") !== -1){//网络地址图片
					$scope.imageBase64 = data;
				}else{// base64格式图片
					$scope.imageBase64 = "data:image/jpeg;base64," + data;
				}
			});
	//	}
	//});

	//上传头像
	$scope.clickTop = function(){

		if($scope.isLogin){

			if(APPCONFIG.IS_WEB) return;

			//https://www.npmjs.com/package/cordova-plugin-camera#module_camera.getPicture
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
				allowEdit: true,
				encodingType:Camera.EncodingType.JPEG,
				targetWidth: 200,
				targetHeight: 200,
				mediaType: 0,
				cameraDirection: 1,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false
			};

			$cordovaCamera
				.getPicture(options)
				.then(function(imageData) {
					console.dir(imageData);
					$scope.imageBase64 = "data:image/jpeg;base64," + imageData;
					UserService.editAvatarByBase64(imageData);

				});
		}else{
			$state.go("login");
		}
	};

});