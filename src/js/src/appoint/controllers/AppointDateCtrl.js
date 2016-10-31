//预约时间
app.controller('AppointDateCtrl',function($scope, $stateParams, $state,ArrayJob){
	//初始化页面参数
	debugger;
	var dept = $stateParams.dept,
		hos = $stateParams.hos;
	$scope.dept = dept;
	$scope.hos = hos;
	$scope.allJobs = [[], [], [], []];
	$scope.currentDate = null;

	var now = new Date();
	var DAY_Millisecond = 86400000;
	var weekNames = ['周日','周一','周二','周三','周四','周五','周六'];
	//初始化日期界面
	sevenDays(now);
	//7天日期选择
	function sevenDays(sdate){
		$scope.dateList = [];
		for(var i = 0; i < 7; i++){
			var da = {};
			da.date = new Date(sdate.getTime()+i*DAY_Millisecond);
			da.week = weekNames[da.date.getDay()];//周几
			da.simpleDate = (da.date.getMonth()+1)+'-'+(da.date.getDate());//简单日期‘06-28’
			da.simpleFullDate = simplyFormateDate(da.date);//简单全日期‘2016-06-28’
			$scope.dateList.push(da);
		}
		//加载数据
		getArrayJob();
	}
	//格式化日期 yyyy-mm-dd
	function simplyFormateDate(date){
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		if(month<10){
			return year + '-0' + month + '-' + day;
		}else{
			return year + '-' + month + '-' + day;
		}
	}
	//排班号源
	function getArrayJob(){
		if($scope.dateList){
			var sdate = $scope.dateList[0].simpleFullDate,
				edate = $scope.dateList[6].simpleFullDate;
			//默认页面加载第一个日期的排班预约
			var da = $scope.dateList[0];
			$scope.currentDate = da;
			ArrayJob.arrayJob({
				hosId: hos.hosId,
				deptCode: dept.deptCode,
				dateStart: sdate,
				dateEnd: edate
			}).then(function(data){
				$scope.arrayJobs = data.arrayjobs;
				produceOneDayJob(da.date);
			});
		}
	}
	//处理某一天的号源并按照时间段归类
	function produceOneDayJob(sdate){
		var fullJobs = [],//全班
			moningJobs = [],//上午班
			afternoonJobs = [],//下午班
			nightJobs = [];//晚班
		$scope.currentDate = sdate;
		if($scope.arrayJobs != null ){
			var arrayJobs = $scope.arrayJobs;
			for(var i=0 ; i< arrayJobs.length;i++){
				var aj = arrayJobs[i];
				if( simplyFormateDate(new Date(aj.arrayjobDate))== simplyFormateDate(sdate)){//指定日期的排班
					if(aj.regisrationPeriodCd == 1){//全班
						fullJobs.push(aj);
					}else if(aj.regisrationPeriodCd == 2){//上午班
						moningJobs.push(aj);
					}else if(aj.regisrationPeriodCd == 3){//下午班
						afternoonJobs.push(aj);
					}else if(aj.regisrationPeriodCd == 4){//晚班
						nightJobs.push(aj);
					}
				}
			}
		}
		$scope.allJobs[0] = fullJobs;
		$scope.allJobs[1] = moningJobs;
		$scope.allJobs[2] = afternoonJobs;
		$scope.allJobs[3] = nightJobs;
	}
	//上一页
	$scope.prex = function(){
		sevenDays(new Date($scope.dateList[0].date.getTime() - 7 * DAY_Millisecond));
	}
	//下一页
	$scope.next = function(){
		sevenDays(new Date($scope.dateList[6].date.getTime() + DAY_Millisecond));
	}
	//选择某一天
	$scope.selectDate = function(da){
		produceOneDayJob(da.date);
	}

	//预约
	$scope.goAppoint = function(job){
		if(job && job.allowReservationNum > 0){
			$state.go("appointMent", {aj: job});
		}
	};

});