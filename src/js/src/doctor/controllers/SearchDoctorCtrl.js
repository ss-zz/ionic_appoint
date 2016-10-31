 //医生查询、找大夫
app.controller('SearchDoctorCtrl', function($scope, $state, $stateParams, APPCONFIG, DoctorService) {

	//是否有更多
	$scope.hasmore = true;
	//是否在加载数据
	var isRun = false;
	//分页起始条数
	var offset = 0;

	$scope.searchParams = {};
	$scope.items = [];

	var targetState = $stateParams.targetState;

	//选择医生跳转页面
	if(targetState){
		$scope.go = function(doctor){
			if(doctor){
				doctor.doctorId = doctor.id;
			}
			$state.go(targetState, {doctor: doctor}, {reload: true});
		};
	}

	//加载数据
	function loadData(isReload, extParams){
		if(!isRun){
			isRun = true;
			DoctorService.getDoctors({
				keyWord: $scope.searchParams.keyWord,
				deptCode: $scope.searchParams.deptCode,
				titleCode: $scope.searchParams.titleCode,
				offset: offset
			})
			.then(function(data){
				if(!data.doctors  || data.doctors.length < APPCONFIG.PAGE_SIZE){
					$scope.hasmore = false;
				}
				offset += APPCONFIG.PAGE_SIZE;
				if(isReload){//刷新
					$scope.items = data.doctors;
				}else{//加载更多
					$scope.items = $scope.items.concat(data.doctors);
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
	//监控参数变化
	$scope.$watch('searchParams', function(newObj, oldObj, scope){
		$scope.refresh();
	}, true);
	//加载更多
	$scope.loadMore = function(){
		if($scope.hasmore){
			loadData(false);
		}
	};

	//下拉控件
	$scope.selectData = {
		zone:[//地区
			{desc: "全部", value: ""},
			{desc: "廊坊市", value: ""}
		],
		dept:[//级别
			{desc: "全部", value: ""}
		],
		titleCode: [//职称
			{desc: "全部", value: ""},
			{desc: "正高", value: "1"},
			{desc: "副高", value: "2"},
			{desc: "中级", value: "3"},
			{desc: "师级/助理", value: "4"},
			{desc: "士级", value: "5"},
			{desc: "特聘", value: "6"}
		]
	};

})