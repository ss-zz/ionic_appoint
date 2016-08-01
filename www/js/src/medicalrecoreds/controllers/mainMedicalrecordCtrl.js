//就诊记录主页面
app.controller('MainMedicalrecordCtrl', function($scope, $stateParams, MedicalRecordService, PatientService, UserService, APPCONFIG) {

	//是否有更多
	$scope.hasmore = true;
	//是否在加载数据
	var isRun = false;
	//分页起始条数
	var offset = 0;

	$scope.patientId = $stateParams.patientId;
	$scope.patient = $stateParams.patient;

	//头像信息
	UserService.getvatarByBase64().then(function(data){
		$scope.imageBase64 = "data:image/jpeg;base64," + data;
	});

	//刷新页面
	$scope.doRefresh = function(cb){
		$scope.hasmore = true;
		offset = 0;
		if($scope.patient){
			$scope.loadMedicalRecored(true)
		}else{
			if($scope.patientId){
				//获取就诊人
				PatientService.getPatientById(patientId).then(function(patient){
					$scope.patient = patient;
					$scope.loadMedicalRecored(true)
				});
			}else{
				//获取当前就诊人
				PatientService.getCurrentPatient().then(function(patient){
					$scope.patient = patient;
					$scope.loadMedicalRecored(true)
				});
			}
		}
	};

	//加载就诊数据
	$scope.loadMedicalRecored = function(isReload){
		if($scope.patient){

			if(!isRun){
				isRun = true;
				MedicalRecordService
					.getOutpatientRecords($scope.patient.idNo, {
						offset: offset
					})
					.then(function(data){

						if(!data || data.length < APPCONFIG.PAGE_SIZE){
							$scope.hasmore = false;
						}
						offset += APPCONFIG.PAGE_SIZE;
						if(isReload){//刷新
							$scope.records = data;
						}else{//加载更多
							$scope.records = $scope.records.concat(data);
						}
						isRun = false;
						$scope.$broadcast('scroll.refreshComplete');
						$scope.$broadcast('scroll.infiniteScrollComplete');

					});
			}

		}
	};

	//加载更多
	$scope.loadMore = function(){
		if($scope.hasmore){
			$scope.loadMedicalRecored(false);
		}
	};

	//进入页面刷新
	$scope.doRefresh();

})