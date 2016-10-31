//医院-导航
app.controller('HosNavCtrl', function($scope, $stateParams, HospitalService) {

	var hos = $stateParams.hos,
		hosId = $stateParams.hosId;
	$scope.hos = hos;

	if(!hos && hosId){
		HospitalService.getHospitalById(hosId).then(function(data){
			$scope.hos = data;
		});
	}

});