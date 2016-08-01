 //搜索医院和医生
app.controller('SearchHosAndDocCtrl', function($scope, $stateParams, HospitalService, DoctorService) {
	

	$scope.searchParams = {};

	$scope.search = function(){
		HospitalService.getHospitals({
			hosName: $scope.searchParams.searchStr
		})
		.then(function(data){
			$scope.hospitals = data.hospitalSimples;
		});
		DoctorService.getDoctors({
			keyWord: $scope.searchParams.searchStr
		})
		.then(function(data){
			$scope.doctors = data.doctors;
		});
	};

});