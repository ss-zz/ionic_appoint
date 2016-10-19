//地图导航
app.controller('HosMapCtrl', function($scope, $stateParams, $sce) {

	var address=$stateParams.address;
	if(address){
		$scope.addressSrc = $sce.trustAsResourceUrl("pub/hos_map.html?address="+address);
	}
});