 //登录
app.controller('HealthRecordCtrl', function($scope, $state, $stateParams, UserService, $ionicHistory) {

	$scope.loginParams = {username: 'ceshi', password: '11111111'};

	console.log($scope.loginParams);
})
