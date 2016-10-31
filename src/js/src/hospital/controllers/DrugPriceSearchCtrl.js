 //医院-详情
app.controller('DrugPriceSearchCtrl', function($scope, $stateParams, APPCONFIG, HospitalService) {
	
	//是否有更多
	$scope.hasmore = true;
	//是否在加载数据
    var isRun = false;
    //分页起始条数
    var offset = 0;

	$scope.searchParams = {};
	$scope.items = [];

	//加载医院
	if($stateParams.hos){
		$scope.hos = $stateParams.hos;
	}else{
		HospitalService.getDefaultHospital().then(function(data){
      		$scope.hos = data;
    	});
	}

	//加载数据
	function loadData(isReload, extParams){
		//if(!isRun){
			//isRun = true;
			HospitalService.getHosDrugPrices({
				hosId: $scope.hos.id,
				medName: $scope.searchParams.medName,
				offset: offset
			})
			.then(function(data){
				if(!data.dugPriceList || data.dugPriceList.length < APPCONFIG.PAGE_SIZE){
					$scope.hasmore = false;
				}
				offset += APPCONFIG.PAGE_SIZE;
				if(isReload){//刷新
					$scope.items = data.dugPriceList;
				}else{//加载更多
					$scope.items = $scope.items.concat(data.dugPriceList);
				}
				//isRun = false;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		//}
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
	
})