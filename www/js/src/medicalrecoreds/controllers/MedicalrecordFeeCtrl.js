//门诊-费用明细
app.controller('MedicalrecordFeeCtrl', function($scope, $state, $stateParams, APPCONFIG, MedicalRecordService, PatientService) {

	//是否有更多
	$scope.hasmore = true;
	//是否在加载数据
	var isRun = false;
	//分页起始条数
	var offset = 0;

	var idNo = $stateParams.idNo,
		hosOrgCode = $stateParams.hosOrgCode;

	$scope.searchParams = {};
	$scope.items = [];

	//加载数据
	function loadData(isReload, extParams){
		if(!idNo) return;
		if(!isRun){
			isRun = true;
			MedicalRecordService.getOutpatientRecordsFee(idNo, {
				offset: offset
			}, hosOrgCode)
			.then(function(data){
				if(!data || data.length < APPCONFIG.PAGE_SIZE){
					$scope.hasmore = false;
				}
				offset += APPCONFIG.PAGE_SIZE;
				if(isReload){//刷新
					$scope.items = data;
				}else{//加载更多
					$scope.items = $scope.items.concat(data);
				}
				isRun = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
	}

	//查询
	$scope.refresh = function(){
		$scope.hasmore = true;
		offset = 0;
		loadData(true);
	};

	//加载更多
	$scope.loadMore = function(){
		if($scope.hasmore){
			loadData(false);
		}
	};

	//默认加载
	if(!idNo){
		PatientService.getCurrentPatient().then(function(data){
			idNo = data.idNo;
			loadData(true);
		});
	}else{
		loadData(true);
	}

});
