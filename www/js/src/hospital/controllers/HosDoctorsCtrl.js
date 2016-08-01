 //专家介绍
app.controller('HosDoctorsCtrl', function($scope, $state, $stateParams, APPCONFIG, DoctorService) {

	//是否有更多
	$scope.hasmore = true;
	//是否在加载数据
	var isRun = false;
	//分页起始条数
	var offset = 0;

	var hos = $stateParams.hos;

	$scope.doctors = [];
	$scope.hos = hos;

	//加载数据
	function loadData(isReload, extParams){
		if(!hos) return;
		if(!isRun){
			isRun = true;
			DoctorService.getDoctorsSpec(hos.hosOrgCode, {
				offset: offset
			})
			.then(function(data){
				if(!data || !data.doctors || data.doctors.length < APPCONFIG.PAGE_SIZE){
					$scope.hasmore = false;
				}
				offset += APPCONFIG.PAGE_SIZE;
				if(isReload){//刷新
					$scope.doctors = data.doctors;
				}else{//加载更多
					$scope.doctors = $scope.doctors.concat(data.doctors);
				}
				isRun = false;
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

});