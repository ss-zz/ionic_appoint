 //添加就医卡
app.controller('addcardctrl', function($scope, $stateParams, APPCONFIG, MyCardService,UTIL_USER,UTIL_DIALOG) {

	$scope.cardParams = {};
	$scope.items = [];
    
	//测试是否有医院数据
	if($stateParams.hos){
		$scope.hos = $stateParams.hos;
		console.log($scope.hos.hosOrgName);
		console.log($scope.hos.hosOrgCode);
		$scope.cardParams = {hosOrgName: $scope.hos.hosOrgName, hosOrgCode: $scope.hos.hosOrgCode};
	
	}

	//添加就医卡
	$scope.bindcard = function(){
        console.log($scope.cardParams.cardno);
        var userid=  UTIL_USER.getUserId;
        MyCardService.bindCard($scope.cardParams.cardno,$scope.hos.hosOrgName,$scope.hos.hosOrgCode,$scope.cardParams.name,userid);
	    //UTIL_DIALOG.show("绑定成功");
	};
	
})