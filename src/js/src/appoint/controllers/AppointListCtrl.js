//我的预约列表
app.controller('AppointListCtrl',function($scope, $stateParams, $state,$ionicPopup,AppointService,APPCONFIG){
	//是否在加载数据
	var isRun = false;
	//分页起始条数
	var offset = 0;
	$scope.list = [];

	loadData();
	//加载数据
	function loadData(){
		if(!isRun){
			isRun = true;

			AppointService.getList({
				offset: offset
			}).then(function(data){
				if(!data || data.length < APPCONFIG.PAGE_SIZE){
					$scope.hasmore = false;
				}
				offset += APPCONFIG.PAGE_SIZE;
				$scope.list= $scope.list.concat(data);//追加数据到list中
				isRun = false;
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
	}
	//加载更多
	$scope.loadMore = function(){
		if($scope.hasmore){
			loadData();
		}
	}
	//退号
	$scope.cancelAppoint= function(appoint){
		$ionicPopup.confirm({
			title:'退号确认',
			template:'退掉后将不能恢复该预约，确定要退掉该预约号吗？',
			cancelText:'取消',
			cancelType: "button-balanced",
			okText:'确定',
			okType: "button-default"
		}).then(function(res){
				if(res){
					AppointService.back(appoint.id,appoint.state).then(function(data){
					for(var i=0; i < $scope.list.length; i++){
						var ap = $scope.list[i];
						if(ap.id==appoint.id){
							$scope.list[i].state='9';//设置预约状态
							break;
						}
					}
				});
			}
		});
	};

});