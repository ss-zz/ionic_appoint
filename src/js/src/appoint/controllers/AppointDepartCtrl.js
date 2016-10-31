app.controller('AppointDepartCtrl',function($scope, $stateParams, $state,HospitalService,DepartmentService){
	//一级科室列表
	$scope.oneList = [];
	//子级列表
	$scope.chidList = [];

	var targetState = $stateParams.targetState,
		hos = $stateParams.hos;
	$scope.hos = hos;

	if(hos && hos.hosId){
		//加载一级科室
		DepartmentService.getDepartmentList({
			hosId: hos.hosId,
			dpLevel: 1
		}).then(function(data){
			$scope.oneList = data.departments;
			var oneList = data.departments;
			//加载子科室
			if(oneList.length > 0){
				var dep = oneList[0];
				DepartmentService.getDepartmentList({
					hosId: hos.hosId,
					parentId: dep.id
				}).then(function(data){
					$scope.chidList = data.departments;
				});
			}
		});
	}

	//点击一级科室触发的事件
	$scope.showChildList=function(dept){
		DepartmentService.getDepartmentList({
			hosId: hospital.id,
			parentId: dept.id
		}).then(function(data){
			$scope.chidList = data.departments;
		});
	}

	//点击二级科室触发事件
	$scope.go = function(dept){
		if(dept){
			$stateParams.dept = dept;
			$state.go(targetState, $stateParams, {reload: true});
		}
	};

});