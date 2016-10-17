//医院-院内导航详情
app.controller('HosInnerNavDetailCtrl', function($scope, $stateParams, HospitalService) {

	var hos = $stateParams.hos;
	var nav = $stateParams.nav;
	$scope.hos = hos;
	$scope.nav = nav;

	//根据传入的不同参数进行不同的查询
	var params = {};
	if(nav && nav.id){
		params = {id: nav.id};
	}else if(hos){
		if(hos.hosId){
			params = {hospitalId: hos.hosId, navtype: nav.navtype};
		}else if(hos.hosOrgCode){
			params = {hospitalCode: hos.hosOrgCode, navtype: nav.navtype};
		}
	}

	HospitalService
		.getNavDetail(params)
		.then(function(data){
			$scope.nav = data;
	});

});