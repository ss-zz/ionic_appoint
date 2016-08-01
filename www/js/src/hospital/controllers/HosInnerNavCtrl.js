//医院-院内导航、就医导航
app.controller('HosInnerNavCtrl', function($scope, $stateParams, HospitalService) {

	var hos = $stateParams.hos;
	$scope.hos = hos;

	if(hos){
		HospitalService
			.getNavs(hos.id)
			.then(function(data){
				$scope.navs = data.tHosNavs;
		});
	}

});