 //医生-详情
app.controller('DoctorDetailCtrl', function($scope, $stateParams, DoctorService) {

	if($stateParams.doctor){//传入医生对象
		$scope.doctor = $stateParams.doctor;
	}else if($stateParams.doctorId){//传入医生id
		DoctorService.getDoctorById($stateParams.doctorId).then(function(data){
			$scope.doctor = data;
		});
	}

});