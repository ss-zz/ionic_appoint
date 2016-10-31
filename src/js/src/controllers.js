app.controller("OtherCtrl", function($scope, $state, fromStateServ) {
    $scope.backNav = function() {
        var fromState = fromStateServ.getState("other");
        if (fromState.fromState !== undefined) {
            $state.go(fromState.fromState.name, fromState.fromParams);
        } else {
            //设置没有历史的时候，默认的跳转
            $state.go("tabs.index");
        }
    };
});

app.controller("TabsCtrl", function($scope, $state, $ionicHistory) {
    $scope.selectTabWithIndex = function(index, targetState) {
	    $state.go(targetState);
        //切换主菜单、清楚历史记录
        $ionicHistory.clearHistory();
	}
})