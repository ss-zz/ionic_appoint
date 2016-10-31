//排班号源
app.service('ArrayJob',function(UTIL_HTTP){
	
	return {
		arrayJob:function(params){
			return UTIL_HTTP.post({
				url:'/arrayJob',
				data:params
			});
		}
	}
});
