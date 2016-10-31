 //医生-详情
app.controller('DoctorDetailCtrl', function($scope, $stateParams,$state, DoctorService,ArrayJob,UTIL_DIALOG) {
   // debugger;
	var docId = $stateParams.doctor
		? $stateParams.doctor.id : $stateParams.doctorId;
		//hos = $stateParams.hos;

	//$scope.hos = hos;
	$scope.allJobs = [[], [], [], []];
	//$scope.fullJobs = [];//全班
	//$scope.moningJobs = [];//上午班
	//$scope.afternoonJobs = [];//下午班
	//$scope.nightJobs = [];//晚班
	$scope.currentDate = null;
	var dayindex=0;
	//$scope.Names1 = [{"name":"晚上"},{"name":" "},{"name":" "},{"name":" "},{"name":" "},{"name":" "},{"name":" "},{"name":" "}];
	var weekNames = ['周日','周一','周二','周三','周四','周五','周六'];
	var now = new Date();
	var DAY_Millisecond = 86400000;
	var s1="<button class='button button-small button-energized' click='goAppoint(aj)'>预约</button>";
	var s2="<button class='button button-small button-outline'>约满</button>";
	$scope.arrayJobs=[];
	$scope.start="";
	$scope.end="";
	$scope.start1="";
	$scope.end1="";


	//初始化日期界面
	sevenDays(now);
	if($stateParams.doctor){//传入医生对象
		$scope.doctor = $stateParams.doctor;
		$scope.docId = $scope.doctor.id;
	}else if($stateParams.doctorId){//传入医生id
		DoctorService.getDoctorById($stateParams.doctorId).then(function(data){
			$scope.doctor = data;
			$scope.docId = $scope.doctor.id;
		});
	}

	getArrayJob();
	set();
	addclick();

	//添加事件代理
	function addclick(){
		// 获取父节点，并为它添加一个click事件
   document.getElementById("three").addEventListener("click",function(e) {

	switch (e.target.parentElement.id){

			case "p1":
		goAppoint1($scope.pi1);
		break;
			case "p2":
		goAppoint1($scope.pi2);
		break;
			case "p3":
		goAppoint1($scope.pi3);
		break;
			case "p4":
		goAppoint1($scope.pi4);
		break;
		case "p5":
		goAppoint1($scope.pi5);
		break;
			case "p6":
		goAppoint1($scope.pi6);
		break;
			case "p7":
		goAppoint1($scope.pi7);
		break;
	}

});
document.getElementById("one").addEventListener("click",function(e) {
	// 真正的处理过程在这里
	switch (e.target.parentElement.id){
		case "q1":
		goAppoint1($scope.qi1);
		break;
			case "q2":
		goAppoint1($scope.qi2);
		break;
			case "q3":
		goAppoint1($scope.qi3);
		break;
			case "q4":
		goAppoint1($scope.qi4);
		break;
			case "q5":
		goAppoint1($scope.qi5);
		break;
			case "q6":
		goAppoint1($scope.qi6);
		break;
			case "q7":
		goAppoint1($scope.qi7);
		break;
	}

});
document.getElementById("two").addEventListener("click",function(e) {
	// 真正的处理过程在这里
	switch (e.target.parentElement.id){
	case "a1":
		goAppoint1($scope.ai1);
		break;
			case "a2":
		goAppoint1($scope.ai2);
		break;
			case "a3":
		goAppoint1($scope.ai3);
		break;
			case "a4":
		goAppoint1($scope.ai4);
		break;
			case "a5":
		goAppoint1($scope.ai5);
		break;
			case "a6":
		goAppoint1($scope.ai6);
		break;
			case "a7":
		goAppoint1($scope.ai7);
		break;
	}

});
document.getElementById("four").addEventListener("click",function(e) {
	// 真正的处理过程在这里
	switch (e.target.parentElement.id){
	case "n1":
		goAppoint1($scope.ni1);
		break;
		case "n2":
		goAppoint1($scope.ni2);
		break;
		case "n3":
		goAppoint1($scope.ni3);
		break;
		case "n4":
		goAppoint1($scope.ni4);
		break;
		case "n5":
		goAppoint1($scope.ni5);
		break;
		case "n6":
		goAppoint1($scope.ni6);
		break;
		case "n7":
		goAppoint1($scope.ni7);
		break;
	}

});
	}


	function set(){

		 var w1=document.getElementById("w1");
		 var w2=document.getElementById("w2");
		 var w3=document.getElementById("w3");
		 var w4=document.getElementById("w4");
		 var w5=document.getElementById("w5");
		 var w6=document.getElementById("w6");
		 var w7=document.getElementById("w7");
		 switch($scope.weekindex){
		 	case "周一":
		 	w1.style.backgroundColor="#ccffdd";
		 	 break;
		 	 case "周二":
		 	w2.style.backgroundColor="#ccffdd";
		 	 break;
		 	 case "周三":
		 	w3.style.backgroundColor="#ccffdd";
		 	 break;
		 	 case "周四":
		 	w4.style.backgroundColor="#ccffdd";
		 	 break;
		 	 case "周五":
		 	w5.style.backgroundColor="#ccffdd";
		 	 break;
		 	 case "周六":
		 	w6.style.backgroundColor="#ccffdd";
		 	 break;
		 	 default :
		 	w7.style.backgroundColor="#ccffdd";
		 	 break;
		 }

	}
	function sevenDays(sdate){
		$scope.dateList = [];
		for(var i = 0; i < 7; i++){
			var da = {};
			da.date = new Date(sdate.getTime()-DAY_Millisecond);
			var week = da.date.getDay();
			var minusDay = week != 0 ? week - 1 : 6;
			minusDay=minusDay+1;
			//周一
			 da.monday = new Date(sdate.getTime() - (minusDay * DAY_Millisecond));
		   //本周 周日
			  da.sunday = new Date(da.monday.getTime() + (6 * DAY_Millisecond));


			da.week = weekNames[da.date.getDay()];//周几

			da.simpleDate = (da.date.getMonth())+'-'+(da.date.getDate());//简单日期‘06-28’

			da.simpleFullDate = simplyFormateDate(da.date);//简单全日期‘2016-06-28’
			if(i==0){
				$scope.weekindex=da.week;
				$scope.start=simplyFormateDate(da.monday);
				$scope.start1=simplyFormateDate1(da.monday);
				$scope.start2=simplyFormateDate1(da.monday);

			}
			if(i==6){
				$scope.end=simplyFormateDate(da.sunday);
				$scope.end1=simplyFormateDate1(da.sunday);
				$scope.end2=simplyFormateDate1(da.sunday);

			}
			$scope.dateList.push(da);
		}
		//加载数据

	}
	//格式化日期 yyyy-mm-dd
	function simplyFormateDate(date){
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		if(month<10){
			if(day<10){
			return year + '/0' + month + '/0' + day;
		}
			return year + '/0' + month + '/' + day;
		}else{
			if(day<10){
			return year + '/0' + month + '/0' + day;
		}
			return year + '/' + month + '/' + day;
		}

	}
	function simplyFormateDate1(date){
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		if(month<10){
			if(day<10){
			return year + '-0' + month + '-0' + day;
		}
			return year + '-0' + month + '-' + day;
		}else{
			if(day<10){
			return year + '-0' + month + '-0' + day;
		}
			return year + '-' + month + '-' + day;
		}

	}
	//排班号源
	function getArrayJob(){
		if($scope.dateList){
			var sdate = $scope.dateList[0].simpleFullDate1,
				edate = $scope.dateList[6].simpleFullDate1;
			//默认页面加载第一个日期的排班预约
			var da = $scope.dateList[0];

			$scope.currentDate = da;
			ArrayJob.arrayJob({
				docId:$scope.docId,
				dateStart: $scope.start1,
				dateEnd: $scope.end1
			}).then(function(data){
				$scope.arrayJobs = data.arrayjobs;
				addbutton();
			});
		}

	}
	function addbutton(){

		if($scope.arrayJobs!=null){

			var arrayJobs=$scope.arrayJobs;
			for(var i=0;i<arrayJobs.length;i++){
				var aj = arrayJobs[i];
				if(aj.regisrationPeriodCd==1){//全班

				   	addall(selctday(aj.arrayjobDate),aj.allowReservationNum,aj);
				   }else if(aj.regisrationPeriodCd==2){


					addam(selctday(aj.arrayjobDate),aj.allowReservationNum,aj);
				   }else if(aj.regisrationPeriodCd==3){
				addapm(selctday(aj.arrayjobDate),aj.allowReservationNum,aj);

				}else{

					addanm(selctday(aj.arrayjobDate),aj.allowReservationNum,aj);
				}
			}
		}

	}
	//上一页
	$scope.prex = function(){
		sevenDays(new Date($scope.dateList[0].date.getTime() - 7 * DAY_Millisecond));
		removeview();
		getArrayJob();
	}
//	//下一页
	$scope.next = function(){
		sevenDays(new Date($scope.dateList[6].date.getTime() + 7*DAY_Millisecond));
	   removeview();
		getArrayJob();
		//UTIL_DIALOG.show($scope.arrayJobs);
	}
//	//选择某一天
//	$scope.selectDate = function(da){
//		produceOneDayJob(da.date);
//	}

//	预约
	$scope.goAppoint = function(job){
		if(job){
			$state.go("appointMent", {aj: job});
		}
	}
	function goAppoint1(job){
		if(job){
			$state.go("appointMent", {aj: job});
		}
	}

	//查看可预约时间是本周第几天
	function selctday(date){
		var da = {};
		da.date=new Date(date);
		var week = da.date.getDay();
		var minusDay = week != 0 ? week - 1 : 6;
		return minusDay+1;
	}



	//添加全班
	function addall(index1,allowReservationNum,aj){
	 var q1=document.getElementById("q1");
	 var q2=document.getElementById("q2");
	 var q3=document.getElementById("q3");
	 var q4=document.getElementById("q4");
	 var q5=document.getElementById("q5");
	 var q6=document.getElementById("q6");
	 var q7=document.getElementById("q7");
	 switch(index1){
	 	case 1:
	 	if(allowReservationNum>0){
	 		q1.innerHTML="";
	 		q1.innerHTML=s1;
	 		$scope.qi1=aj;
	 	}else{
	 		q1.innerHTML=s2;
	 	}

	 	break;
	 	case 2:
	 	if(allowReservationNum>0){
	 		q2.innerHTML="";
	 		q2.innerHTML=s1;
	 		$scope.qi2=aj;
	 	}else{
	 		q2.innerHTML=s2;
	 	}
	 	break;
	 	case 3:
	 if(allowReservationNum>0){
	 		q3.innerHTML="";
	 		q3.innerHTML=s1;
	 		$scope.qi3=aj;
	 	}else{
	 		q3.innerHTML=s2;
	 	}
	 	break;
	 	case 4:
	 if(allowReservationNum>0){
	 		q4.innerHTML="";
	 		q4.innerHTML=s1;
	 		$scope.qi4=aj;
	 	}else{
	 		q4.innerHTML=s2;
	 	}
	 	break;
	 	case 5:
	if(allowReservationNum>0){
			q5.innerHTML="";
	 		q5.innerHTML=s1;
	 		$scope.qi5=aj;
	 	}else{
	 		q5.innerHTML=s2;
	 	}
	 	break;
	 	case 6:
if(allowReservationNum>0){
			q6.innerHTML="";
	 		q6.innerHTML=s1;
	 		$scope.qi6=aj;
	 	}else{
	 		q6.innerHTML=s2;
	 	}
	 	break;
	 	case 7:
	if(allowReservationNum>0){
			q7.innerHTML="";
	 		q7.innerHTML=s1;
	 		$scope.qi7=aj;
	 	}else{
	 		q7.innerHTML=s2;
	 	}
	 	break;
	 }

	}
	//添加上午
	function addam(index1,allowReservationNum,aj){
	 var a1=document.getElementById("a1");
	 var a2=document.getElementById("a2");
	 var a3=document.getElementById("a3");
	 var a4=document.getElementById("a4");
	 var a5=document.getElementById("a5");
	 var a6=document.getElementById("a6");
	 var a7=document.getElementById("a7");
	  switch(index1){
	 	case 1:
	 	if(allowReservationNum>0){
	 		a1.innerHTML="";
	 		a1.innerHTML=s1;
	 		$scope.ai1=aj;
	 	}else{
	 		a1.innerHTML=s2;
	 	}

	 	break;
	 	case 2:
	 	if(allowReservationNum>0){
	 		a2.innerHTML="";
	 		a2.innerHTML=s1;
	 		$scope.ai2=aj;
	 	}else{
	 		a2.innerHTML=s2;
	 	}
	 	break;
	 	case 3:
	 if(allowReservationNum>0){
	 		a3.innerHTML="";
	 		a3.innerHTML=s1;
	 		$scope.ai3=aj;
	 	}else{
	 		a3.innerHTML=s2;
	 	}
	 	break;
	 	case 4:
	 if(allowReservationNum>0){
	 		a4.innerHTML="";
	 		a4.innerHTML=s1;
	 		$scope.ai4=aj;
	 	}else{
	 		a4.innerHTML=s2;
	 	}
	 	break;
	 	case 5:
	if(allowReservationNum>0){
			a5.innerHTML="";
	 		a5.innerHTML=s1;
	 		$scope.ai5=aj;
	 	}else{
	 		a5.innerHTML=s2;
	 	}
	 	break;
	 	case 6:
if(allowReservationNum>0){
			a6.innerHTML="";
	 		a6.innerHTML=s1;
	 		$scope.ai6=aj;
	 	}else{
	 		a6.innerHTML=s2;
	 	}
	 	break;
	 	case 7:
	if(allowReservationNum>0){
			a7.innerHTML="";
	 		a7.innerHTML=s1;
	 		$scope.ai7=aj;
	 	}else{
	 		a7.innerHTML=s2;
	 	}
	 	break;
	 }
	}
	//添加下午
	function addapm(index1,allowReservationNum,aj){

	 var p1=document.getElementById("p1");
	 var p2=document.getElementById("p2");
	 var p3=document.getElementById("p3");
	 var p4=document.getElementById("p4");
	 var p5=document.getElementById("p5");
	 var p6=document.getElementById("p6");
	 var p7=document.getElementById("p7");

	  switch(index1){

	 	case 1:
	 	if(allowReservationNum>0){
	 		p1.innerHTML="";
	 		p1.innerHTML=s1;
	 		$scope.pi1=aj;
	 	}else{
	 		p1.innerHTML=s2;
	 	}

	 	break;
	 	case 2:
	 	if(allowReservationNum>0){
	 		p2.innerHTML="";
	 		p2.innerHTML=s1;
	 		$scope.pi2=aj;
	 	}else{
	 		p2.innerHTML=s2;
	 	}
	 	break;
	 	case 3:
	 if(allowReservationNum>0){
			p3.innerHTML="";
	 		p3.innerHTML=s1;
	 	 	$scope.pi3=aj;
	 	}else{
	 		p3.innerHTML=s2;
	 	}
	 	break;
	 	case 4:
	 if(allowReservationNum>0){
	 		p4.innerHTML="";
	 		p4.innerHTML=s1;
			 $scope.pi4=aj;
	 	}else{
	 		p4.innerHTML=s2;
	 	}
	 	break;
	 	case 5:
	if(allowReservationNum>0){
			p5.innerHTML="";
	 		p5.innerHTML=s1;
	 		 $scope.pi5=aj;
	 	}else{
	 		p5.innerHTML=s2;
	 	}
	 	break;
	 	case 6:
if(allowReservationNum>0){
			p6.innerHTML="";
	 		p6.innerHTML=s1;
	 		$scope.pi6=aj;
	 	}else{
	 		p6.innerHTML=s2;
	 	}
	 	break;
	 	case 7:
	if(allowReservationNum>0){
			p7.innerHTML="";
	 		p7.innerHTML=s1;
	 		$scope.pi7=aj;
	 	}else{
	 		p7.innerHTML=s2;
	 	}
	 	break;
	 }
	}
	//添加晚上
	function addanm(index1,allowReservationNum,aj){
	 var n1=document.getElementById("n1");
	 var n2=document.getElementById("n2");
	 var n3=document.getElementById("n3");
	 var n4=document.getElementById("n4");
	 var n5=document.getElementById("n5");
	 var n6=document.getElementById("n6");
	 var n7=document.getElementById("n7");
	  switch(index1){
	 	case 1:
	 	if(allowReservationNum>0){
		   	n1.innerHTML="";
	 		n1.innerHTML=s1;
	 		$scope.ni1=aj;
	 	}else{
	 		n1.innerHTML=s2;
	 	}

	 	break;
	 	case 2:
	 	if(allowReservationNum>0){
	 		n2.innerHTML="";
	 		n2.innerHTML=s1;
	 		$scope.ni2=aj;
	 	}else{
	 		n2.innerHTML=s2;
	 	}
	 	break;
	 	case 3:
	 if(allowReservationNum>0){
	 		n3.innerHTML="";
	 		n3.innerHTML=s1;
	 		$scope.ni3=aj;
	 	}else{
	 		n3.innerHTML=s2;
	 	}
	 	break;
	 	case 4:
	 if(allowReservationNum>0){
	 		n4.innerHTML="";
	 		n4.innerHTML=s1;
	 		$scope.ni4=aj;
	 	}else{
	 		n4.innerHTML=s2;
	 	}
	 	break;
	 	case 5:
	if(allowReservationNum>0){
		   n5.innerHTML="";
	 		n5.innerHTML=s1;
	 		$scope.ni5=aj;
	 	}else{
	 		n5.innerHTML=s2;
	 	}
	 	break;
	 	case 6:
if(allowReservationNum>0){
		   n6.innerHTML="";
	 		n6.innerHTML=s1;
	 		$scope.ni6=aj;
	 	}else{
	 		n6.innerHTML=s2;
	 	}
	 	break;
	 	case 7:
	if(allowReservationNum>0){
			n7.innerHTML="";
	 		n7.innerHTML=s1;
	 		$scope.ni7=aj;
	 	}else{
	 		n7.innerHTML=s2;
	 	}
	 	break;
	 }
	}
	function removeview(){
		document.getElementById("q1").innerHTML="";
		document.getElementById("q2").innerHTML="";
		document.getElementById("q3").innerHTML="";
		document.getElementById("q4").innerHTML="";
		document.getElementById("q5").innerHTML="";
		document.getElementById("q6").innerHTML="";
		document.getElementById("q7").innerHTML="";
		document.getElementById("a1").innerHTML="";
		document.getElementById("a2").innerHTML="";
		document.getElementById("a3").innerHTML="";
		document.getElementById("a4").innerHTML="";
		document.getElementById("a5").innerHTML="";
		document.getElementById("a6").innerHTML="";
		document.getElementById("a7").innerHTML="";
		document.getElementById("p1").innerHTML="";
		document.getElementById("p2").innerHTML="";
		document.getElementById("p3").innerHTML="";
		document.getElementById("p4").innerHTML="";
		document.getElementById("p5").innerHTML="";
		document.getElementById("p6").innerHTML="";
		document.getElementById("p7").innerHTML="";
		document.getElementById("n1").innerHTML="";
		document.getElementById("n2").innerHTML="";
		document.getElementById("n3").innerHTML="";
		document.getElementById("n4").innerHTML="";
		document.getElementById("n5").innerHTML="";
		document.getElementById("n6").innerHTML="";
		document.getElementById("n7").innerHTML="";


	}


});
