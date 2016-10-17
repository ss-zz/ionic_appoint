//服药提醒
app.controller('DrugAlertCtrl', function($scope, $state, $stateParams, DrugAlertService) {

	//初始化时间段
	$scope.alerts = [[], [], [], []];

	//读取本地记录
	DrugAlertService.get().then(function(als){
		var alsMap = {};
		for(var idx in als){
			var al = als[idx];
			alsMap[al.time] = true;
		}
		for(var i = 0; i < 24; i++){
			var timeBase = i < 10 ? "0" + i : "" + i,
				hour = timeBase + ":00",
				hourHalf = timeBase + ":30";
			var zone = 0;
			if(i > 0 && i < 6){
				zone = 0;
			}else if(i >= 6 && i < 12){
				zone = 1;
			}else if(i >= 12 && i < 18){
				zone = 2;
			}else if(i >= 18 && i < 24){
				zone = 3;
			}
			$scope.alerts[zone].push({time: hour, checked: alsMap[hour]});
			$scope.alerts[zone].push({time: hourHalf, checked: alsMap[hourHalf]});
		}
	});

	//改变时间段
	$scope.changezone = function(idx){
		$scope.current = idx;
	};
	//设置时间
	$scope.setTime = function(al){
		var checked = al.checked;
		if(checked){//添加
			DrugAlertService.add(al.time);
		}else{//取消
			DrugAlertService.cancle(al.time);
		}
	};

	$scope.current = 0;


})
