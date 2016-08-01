//医院-科室信息
app.controller('HosDeptDetailCtrl', function($scope, $stateParams, DoctorService, APPCONFIG) {

	var dept = $stateParams.dept,
		hos = $stateParams.hos;
	$scope.dept = dept;
	$scope.hos = hos;

	//是否有更多
	$scope.hasmore = true;
	//分页起始条数
	var offset = 0;
	var isRun = false;

	$scope.doctors = [];

	//加载数据
	function loadData(isReload){
		if(!hos || !dept) return;
		if(!isRun){
			isRun = true;
			DoctorService.getDoctorsRecommond(
				hos.hosOrgCode, dept.deptCode, {
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
		loadData(true);
	};

	$scope.refresh();

});