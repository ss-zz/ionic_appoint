//消息列表
app.controller('MessagesListCtrl', function($scope, $state, $stateParams, APPCONFIG, MessageService) {

	//是否有更多
	$scope.hasmore = true;
	//分页起始条数
	var offset = 0;
	var isRun = false;

	$scope.items = [];

	//加载数据
	function loadData(isReload, extParams){

		if(!isRun){
			isRun = true;
			MessageService.getMessageFromLocal({
				offset: offset
			})
			.then(function(data){
				if(!data || data.length < APPCONFIG.PAGE_SIZE){
					$scope.hasmore = false;
				}
				offset += APPCONFIG.PAGE_SIZE;
				if(isReload){//刷新
					$scope.items = data;
				}else{//加载更多
					$scope.items = $scope.items.concat(data);
				}
				isRun = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
		}
	}

	//加载更多
	$scope.loadMore = function(){
		if($scope.hasmore){
			loadData(false);
		}
	};

	//查询
	$scope.refresh = function(current){
		MessageService.refreshServerMessages(true).then(function(){
			$scope.hasmore = true;
			offset = 0;
			loadData(true);
		});
	};

	$scope.refresh();

	// 查看详情
	$scope.viewDetail = function(message){
		//若状态为未读、则更新为已读
		if(message.state == "0"){
			message.state = "1";
			MessageService.updateMessageStateRead(message.id);
		}
		$state.go("messagedetail", {message: message});
	};

	// 删除消息
	$scope.delMsg = function(idx, message){
		MessageService.deleteLocalMsg(message.id)
		.then(function(data){
			var items = $scope.items;
			if(items){
				items.splice(idx, 1);
			}
		});
	};
	// 标记为已读
	$scope.flagRead = function(message){
		message.state = "1";
		MessageService.updateMessageStateRead(message.id);
	};

});
