app.controller('AppointMentCtrl',function($scope, $stateParams, $state,PatientService,AppointService){
	//获取排班预约信息
	var aj=$stateParams.aj;
	if(aj == null){//当从选择就诊人页面返回后，从其他参数中获取排班信息
		aj = $stateParams.otherParams;
	}
	aj.appointSimpleDate=appointSimpleDate(new Date(aj.arrayjobDate));
	$scope.aj= aj;
	//获取就诊人信息
	var patient = $stateParams.patient;
	if(patient !=null ){
		$scope.patient = patient;
	}else{//加载默认的就诊人信息
		PatientService.getCurrentPatient().then(function(data){
		$scope.patient=data;
		});
	}

	function appointSimpleDate(sdate){
		var year = sdate.getFullYear();
		var month = sdate.getMonth()+1;
		var day = sdate.getDate();
		var sday=day;
		var apm='';
		if(aj.regisrationPeriodCd==2){
			apm='上午';
		}
		if(aj.regisrationPeriodCd==3){
			apm='下午';
		}
		if(aj.regisrationPeriodCd==4){
			apm='晚上';
		}
		if(day<10){
			sday='0'+day;
		}
		if(month<10){
			return year+'年 0'+month+'月'+sday+apm;
		}else{
			return year+'年'+month+'月'+sday+apm;
		}
	}
	//选择就诊人
	$scope.changePatient=function(){
		//把排班信息放入其他参数中传过去
		$state.go('app.patientList',{targetState:'appointMent',otherParams:aj});
	}
	//预约挂号
	$scope.appointMent = function(){
		AppointService.add(
			$scope.patient.id,
			$scope.aj.id
		).then(function(data){
			console.log(data);
			$state.go("appointSuccess", {appointId: data});

		});
	}
});
