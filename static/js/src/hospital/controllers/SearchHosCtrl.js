
 //医院切换、医院查询
app.controller('SearchHosCtrl', function($scope, $state, $stateParams, APPCONFIG, HospitalService) {

	//是否有更多
	$scope.hasmore = true;
	//是否在加载数据
	var isRun = false;
	//分页起始条数
	var offset = 0;

	$scope.searchParams = {};
	$scope.items = [];

	var targetState = $stateParams.targetState;

	//选择医院跳转页面
	if(targetState){
		$scope.go = function(hospital){
			if(hospital){
				hospital.id = hospital.hosId;
			}
			$state.go(targetState, {hos: hospital}, {reload: true});
		};
	}

	//加载数据
	function loadData(isReload, extParams){
		if(!isRun){
			isRun = true;
			HospitalService.getHospitals({
				hosName: $scope.searchParams.hosName,
				hosLevel:$scope.searchParams.hosLevel,
				hosType: $scope.searchParams.hosType,
				offset: offset
			})
			.then(function(data){
				if(!data.hospitalSimples || data.hospitalSimples.length < APPCONFIG.PAGE_SIZE){
					$scope.hasmore = false;
				}
				offset += APPCONFIG.PAGE_SIZE;
				if(isReload){//刷新
					$scope.items = data.hospitalSimples;
				}else{//加载更多
					$scope.items = $scope.items.concat(data.hospitalSimples);
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
		level:[//级别
			{desc: "全部", value: ""},
			{desc: "三级", value: "3"},
			{desc: "二级", value: "2"},
			{desc: "一级", value: "1"}
		],
		type: [//类型
			{desc: "全部", value: ""},
			{desc: "综合医院", value: "A100"},
			{desc: "中医医院", value: "A2"},
			{desc: "中西医结合医院", value: "A300"},
			{desc: "专科医院", value: "A5"}
		]
	};



});
