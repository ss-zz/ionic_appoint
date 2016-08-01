//我的-首页
app.controller('MainMyCtrl', function($scope, UserService, UTIL_USER, MessageService, $cordovaCamera, UTIL_DIALOG, $state) {

	//用户是否登录
	$scope.isLogin = UTIL_USER.isLogin();

	if($scope.isLogin){//已登录
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
			$scope.imageBase64 = "data:image/jpeg;base64," + data;
		});
	}

	//上传头像
	$scope.clickTop = function(){
		if($scope.isLogin){
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