//就诊记录详情
app.controller('MedicalrecordDetailCtrl', function($scope, $stateParams, MedicalRecordService) {

	var id = $stateParams.id;

	if(id){
		MedicalRecordService.getOutpatientDetail(id).then(function(data){
			if(data){
				//检查单
				$scope.checks = data.checks;
				//电子病历
				$scope.electronicMedicalRecord = data.electronicMedicalRecord;
				//费用
				$scope.fees = data.fees;
				//就诊记录
				$scope.outpatientRecord = data.outpatientRecord;
				//处方单
				$scope.prescribes = data.prescribes;
				//检验单
				$scope.tests = data.tests;

				//默认显示
				$scope.current = 'Ele';
			}
		});
	}

})