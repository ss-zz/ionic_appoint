//首页
app.controller('MainIndexCtrl', function($scope, $state, NewsService, UserService, UTIL_USER, $ionicPopup) {

	//跳转找医院
	$scope.toSearch = function(){
		$state.go("searchHosAndDoc");
	};

	//是否在加载数据
	var isRun = false;

	//加载数据
	function loadData(){
		if(!isRun){
			isRun = true;
			NewsService.getNews(null, {
				limit: 5
			})
			.then(function(data){
				$scope.imgUrlBase = data.imgUrlBase;
				$scope.articles = data.articles;
				$scope.$broadcast('scroll.refreshComplete');
				isRun = false;
			});
		}
	}

	//查询
	$scope.refresh = function(current){
		loadData();
	};

	//默认加载
	loadData();

	$scope.viewLogin = function(){
		UTIL_USER.isLogin().then(function(isLogin){
			if(isLogin){
				var confirmPopup = $ionicPopup.confirm({
					title: '提示',
					template: '您已登录，确认退出？',
					okText: "确认",
					okType: "button-balanced",
					cancelText: "取消",
					cancelType: "button-balanced"
				});
				confirmPopup.then(function(res) {
					if(res) {
						UserService.logout().then(function(){
							$state.go("login");
						});
					}
				});
			}else{
				$state.go("login");
			}
		});
	};

})