 //就诊人编辑、新增
app.controller('PatientEditCtrl', function($scope, $state, $stateParams, UTIL_DIALOG, PatientService) {

	//下拉控件
	$scope.selectData = {
		gender: [//性别
			{desc: "男", value: "男"},
			{desc: "女", value: "女"}
		]
	};

	var isEdit = false;
	if($stateParams.patient){
		isEdit = true;
		//防止其他属性影响
		var srcPatient = $stateParams.patient;
		$scope.patient = {
			id: srcPatient.id,
			name: srcPatient.name,
			gender: srcPatient.gender,
			idNo: srcPatient.idNo
		};
	}else{
		$scope.patient = {};
	}

	$scope.edit = function(){
		if(isEdit){//编辑
			PatientService
				.editPatient($scope.patient)
				.then(function(data){
					//跳转列表页
					$state.go("patientList", null, {reload: true});
			});
		}else{//新增
			PatientService
				.addPatient($scope.patient)
				.then(function(data){
					//跳转列表页
					$state.go("patientList", null, {reload: true});
			});
		}
	};

})
