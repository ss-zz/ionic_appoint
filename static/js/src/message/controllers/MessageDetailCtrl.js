//消息详情
app.controller('MessagesDetailCtrl', function($scope, $stateParams, MessageService) {

	//将ext里面属性转换为对象
	var message = $stateParams.message;
	if(message){

		//若状态为未读、则更新为已读
		if(message.state == "0"){
			MessageService.updateMessageStateRead(message.id);
		}

		$scope.message = message;
		$scope.type = message.msgtype;
		if(message.ext){
			$scope.ext = JSON.parse(message.ext);
		}
	}

});
