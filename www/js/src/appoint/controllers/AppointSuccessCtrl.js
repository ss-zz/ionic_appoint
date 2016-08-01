//预约成功的显示页面
app.controller('AppointSuccessCtrl',function($scope, $stateParams, $state,$ionicPopup,AppointService){
	//获取预约信息
	AppointService.getDetail($stateParams.appointId).then(function(data){
		scope.appoint = data;
	});
	//预约详情
	$scope.goDatail=function(appoint){
		$state.go('appointDetail',{appointId:appoint.id});
	}
	//退号
	$scope.cancelAppoint=function(appoint){
		$ionicPopup.confirm({
			title:'退号确认',
			template:'退掉后将不能恢复该预约，确定要退掉该预约号吗？',
			cancelText:'取消',
			cancelType: "button-balanced",
			okText:'确定',
			okType: "button-default"
		}).then(function(res){
			if(res){
				AppointService
					.back(appoint.id,appoint.state)
					.then(function(data){
						$scope.appoint.state = '9';//设置预约状态
				});
			}
		});

	}
});