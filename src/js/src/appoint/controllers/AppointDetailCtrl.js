//预约详情
app.controller('AppointDetailCtrl', function($scope, $stateParams, AppointService){
  var weekNames = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	//获取默认号源
	AppointService
		.getDetail($stateParams.appointId)
		.then(function(data){
			$scope.appoint = data;
			var sdate = new Date(data.appointDate);
			$scope.week=weekNames[sdate.getDay()];
	});

});