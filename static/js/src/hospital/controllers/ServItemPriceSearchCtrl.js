 //医院-详情
app.controller('ServItemPriceSearchCtrl', function($scope, $stateParams, APPCONFIG, HospitalService) {
	
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
		HospitalService.getHosServPrices({
			hosId: $scope.hos.id,
			serName: $scope.searchParams.serName,
			offset: offset
		})
		.then(function(data){
			if(!data.hosServices  || data.hosServices .length < APPCONFIG.PAGE_SIZE){
				$scope.hasmore = false;
			}
			offset += APPCONFIG.PAGE_SIZE;
			if(isReload){//刷新
				$scope.items = data.hosServices ;
			}else{//加载更多
				$scope.items = $scope.items.concat(data.hosServices );
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
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