//用药提醒
app.service('DrugAlertService', function(UTIL_HTTP, UTIL_USER, $sqliteService, $q){
	return {
		//添加一个时间
		add: function(time){
			UTIL_USER.getUserId().then(function(userId){
				var queryParams = [time, userId];
				var sql = "insert into drugalert (time, user_id) values (?, ?)";
				$sqliteService.executeSql(sql, queryParams);
			});
		},
		//取消一个时间
		cancle: function(time){
			UTIL_USER.getUserId().then(function(userId){
				var queryParams = [time, userId];
				var sql = "delete from drugalert where time = ? and user_id = ?";
				$sqliteService.executeSql(sql, queryParams);
			});
		},
		//获取所有设置时间
		get: function(){
			var deferred = $q.defer();
			UTIL_USER.getUserId().then(function(userId){
				var queryParams = [userId];
				var sql = "select * from drugalert where user_id = ?";
				$sqliteService.executeSql(sql, queryParams)
					.then(function(data){
					deferred.resolve(data);
				});
			});
			return deferred.promise;;
		}
	};

})