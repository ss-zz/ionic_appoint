//资讯
app.service('NewsService', function(UTIL_HTTP){
	return {
		//获取资讯列表数据
		getNews : function(channelId, params){
			if(channelId == null || channelId == undefined){
				channelId = "";
			}
			return UTIL_HTTP.get({
				url: "/consult/mobile/articles_" + channelId + ".json",
				data: params
			});
		}
	};
		
})