//医院-叫号跟踪
app.controller('HosCallnoCtrl', function($scope, $stateParams, HospitalService) {

	var hos = $stateParams.hos;
	$scope.hos = hos;

	$scope.refresh = function(){
		if(!hos) return;
		HospitalService
			.getCallno(hos.hosOrgCode, hos.hosOrgName)
			.then(function(data){
			$scope.refreshTime = new Date();
			$scope.nos = data;
		});
	};

	//默认加载
	$scope.refresh();

});