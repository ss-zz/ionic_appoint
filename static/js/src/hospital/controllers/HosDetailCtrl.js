//医院-详情
app.controller('HosDetailCtrl', function($scope, $stateParams, HospitalService) {

	if($stateParams.hos){//传入医院对象
		//$scope.hos = $stateParams.hos;
		//$scope.hos.hosId = $scope.hos.id;
		//避免传入的医院信息不全，所以根据医院id重新查询医院详情
		HospitalService.getHospitalById($stateParams.hos.id).then(function(data){
			$scope.hos = data;
			$scope.hos.hosId = $scope.hos.id;
		});
	}else if($stateParams.hosId){//传入医院id
		HospitalService.getHospitalById($stateParams.hosId).then(function(data){
			$scope.hos = data;
			$scope.hos.hosId = $scope.hos.id;
		});
	}else{//默认
		HospitalService.getDefaultHospital().then(function(data){
			$scope.hos = data;
			$scope.hos.hosId = $scope.hos.id;
		});
	}

});