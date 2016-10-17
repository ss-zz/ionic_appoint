 //快捷预约
app.controller('AppointQuickCtrl', function($scope, $stateParams, $state, AppointService, HospitalService,PatientService) {
	
	//初始化参数
	$scope.hos = null;
	$scope.dept = null;
	$scope.params = {
		hos: null,
		dept: null
	};


	//获取默认号源
	AppointService.getDefaultArrayJob().then(function(data){
		var appoint = data.appoint,
			arrayJob = data.arrayJob;
		$scope.appoint = appoint;
		$scope.arrayJob = arrayJob;
		if(arrayJob){
			$scope.hos = {
				hosOrgName: arrayJob.hosOrgName,
		        hosId: arrayJob.hosId,
		        hosOrgCode: arrayJob.hosOrgCode
			};//提取医院的关键信息
			$scope.dept = {
				deptCode: arrayJob.deptCode,
				deptName: arrayJob.deptName
			};//提取科室信息
			$scope.params = {
				hos: $scope.hos,
				dept: $scope.dept
			};
		}
	});

	//预约
	$scope.appointMent = function(){
		if($scope.arrayJob){
			PatientService.getCurrentPatient().then(function(patient){
				if(patient){
					AppointService
						.add(patient.id,$scope.arrayJob.id)
						.then(function(data){
							$state.go("appointSuccess", {appointId: data});
						});
				}
			});
		}
	};

});