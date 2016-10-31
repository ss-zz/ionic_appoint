//医院-特色科室
app.controller('HosDeptSpeCtrl', function($scope, $stateParams, HospitalService) {

	var hos = $stateParams.hos;
	$scope.hos = hos;

	if(hos && hos.hosId){
		var hosId = hos.hosId;
		HospitalService.getDeptSpe(hosId).then(function(data){
			$scope.depts = data.departments;
		});
	}

});