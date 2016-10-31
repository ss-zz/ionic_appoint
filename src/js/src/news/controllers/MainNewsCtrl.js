//资讯列表首页
app.controller('MainNewsCtrl', function($scope, NewsService, APPCONFIG) {

	//是否有更多
	$scope.hasmore = true;
	//是否在加载数据
    var isRun = false;
    //分页起始条数
    var offset = 0;

    //默认栏目
    $scope.current = "Default";
    var channelIdConfig = {
    	"Default": "",
    	"Food": "1",
    	"Psy": "2",
    	"Ladybaby": "3"
    };

    //加载数据
	function loadData(isReload, extParams){
		var channelId = channelIdConfig[$scope.current];
		if(!isRun){
			isRun = true;
			NewsService.getNews(channelId, {
				offset: offset
			})
			.then(function(data){
				if(!data || data.articles.length < APPCONFIG.PAGE_SIZE){
					$scope.hasmore = false;
				}
				$scope.imgUrlBase = data.imgUrlBase;
				offset += APPCONFIG.PAGE_SIZE;
				if(isReload){//刷新
					$scope.articles = data.articles;
				}else{//加载更多
					$scope.articles = $scope.articles.concat(data.articles);
				}
				isRun = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
	}

	//查询
	$scope.refresh = function(current){
		$scope.hasmore = true;
		offset = 0;
		$scope.current = current;
		loadData(true);
	};

	//加载更多
	$scope.loadMore = function(){	
		if($scope.hasmore){
			loadData(false);
		}
	};

	//默认加载
	loadData(true);

});