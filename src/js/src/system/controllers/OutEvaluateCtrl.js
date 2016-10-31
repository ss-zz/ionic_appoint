//就医评价
app.controller('OutEvaluateCtrl', function($scope, $state, $stateParams, EvaluateService) {

	var hos = $stateParams.hos,
		clinNo = $stateParams.clinNo;
	$scope.params = {};
	$scope.hasEvaluate = false;

	//获取评价结果
	EvaluateService
		.getEvaluate(clinNo, hos.hosOrgCode)
		.then(function(data){
			if(data && data.length > 0){//已评价
				$scope.hasEvaluate = true;
				$scope.params = data[0];
			}else{//未评价
				//默认评分
				$scope.params = {
					evaluateAll: 5,
					evaluateHosenv: 5,
					evaluateDeptenv: 5,
					evaluateDoctorserv: 5,
					evaluateApp: 5
				};
				$scope.hasEvaluate = false;
			}
	});

	//保存评价
	$scope.save = function(){
		var postParam = $scope.params;

		postParam.clinNo = clinNo;
		postParam.hosOrgCode = hos.hosOrgCode;
		postParam.hosOrgName = hos.hosOrgName;

		EvaluateService
			.evaluate(postParam)
			.then(function(data){
				$scope.hasEvaluate = true;
		});
	};

})
