//就医卡列表
app.controller('MyCardCtrl', function($scope, $state, $stateParams, APPCONFIG, MyCardService) {

	//是否有更多
	$scope.hasmore = true;
	//是否在加载数据
	var isRun = false;
	//分页起始条数
	var offset = 0;
    $scope.searchParams = {};
	$scope.items = [];

	var targetState = $stateParams.targetState;
	//选择就医卡跳转页面
	if(targetState){
		$scope.go = function(card){
			if(card){
				card.cardno = card.cardno;
			}
			$state.go(targetState, {card: card}, {reload: true});
		};
	}

	//加载数据
	function loadData(isReload, extParams){

		if(!isRun){
			isRun = true;
			MyCardService.getMyCardlist({
				offset: offset
			})
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

	//加载更多
	$scope.loadMore = function(){
		if($scope.hasmore){
			loadData(false);
		}
	};

	//查询
	$scope.refresh = function(current){
		$scope.hasmore = true;
		offset = 0;
		loadData(true);
	};
	$scope.refresh();
	
	//添加就医卡
	$scope.addcard = function(){
        $state.go("addcard");
	};
});