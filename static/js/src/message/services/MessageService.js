//消息
app.service('MessageService',
	function(UTIL_HTTP, $sqliteService, UTIL_USER, $q){

	var MESSAGE_STATE_UNREAD = "0",
		MESSAGE_STATE_READ = "1";

	return {
		//刷新服务端消息并存储本地
		refreshServerMessages: function(){
			var deferred = $q.defer();
			UTIL_HTTP.get({
				url: "/usermessage/unread",
				isShowLoading: false
			}).then(function(data){
				if(data){
					UTIL_USER.getUserId().then(function(userId){
						var newMessage;
						for(var i in data){
							var item = data[i];
							var sql = "insert into message (msg, msgtype, state, "
							+ " t_patient_id, ext, msgdetail, EFFECT_TIME) values (?,?,?,?,?,?,?)";
							var params = [
								item.msg, item.msgtype + "",
								MESSAGE_STATE_UNREAD, userId,
								item.ext, item.msgDetail,
								item.effectTime
							];
							$sqliteService.executeSql(sql, params);
							if(i == 0){
								newMessage = item.msg;
							}
						}
						deferred.resolve(newMessage);
					});
				}else{
					deferred.resolve();
				}
			});
			return deferred.promise;
		},
		//从本地获取数据
		getMessageFromLocal: function(params){
			var deferred = $q.defer();
			UTIL_USER.getUserId().then(function(userId){
				var queryParams = [userId, 10, 0];
				if(params && params.offset != null){
					queryParams[2] = params.offset;
				}
				var sql = "select * from message where t_patient_id = ? order by createtime desc limit ? offset ?";
				$sqliteService.executeSql(sql, queryParams)
				.then(function(data){
					deferred.resolve(data);
				});
			});
			return deferred.promise;
		},
		//从本地获取未读消息数
		getUnreadMessageCountFromLocal: function(){
			var deferred = $q.defer();
			var sql = "select count(1) as cou from message where t_patient_id = ? and state = ? ";
			UTIL_USER.getUserId().then(function(userId){
				$sqliteService.executeSql(sql, [userId, "0"])
				.then(function(rows){
					if(rows && rows.length > 0){
						deferred.resolve(rows[0].cou);
					}else{
						deferred.resolve(0);
					}
				});
			});
			return deferred.promise;
		},
		//更新本地消息为已读
		updateMessageStateRead: function(id){
			var sql = "update message set state = ? where id = ? ";
			return $sqliteService.executeSql(sql, [MESSAGE_STATE_READ, id]);
		}
	};

});