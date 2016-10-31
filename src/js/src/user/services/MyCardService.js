//就医卡
app.service('MyCardService', function(UTIL_HTTP){
	return {
	
		//获取就医卡列表
		getMyCardlist: function(pageParam){
			return UTIL_HTTP.get({
				url: "/opcard/my",
				data: pageParam
			});
		},
		

		//获取就医卡详细信息
		getCardById: function(id,pageParam){
			return UTIL_HTTP.get({
				url: "/opcard/" + id,
				data: pageParam
			});
		},
		//绑定就医卡
	    bindCard: function(cardno,hosOrgName,hosOrgCode,name,tAppointUserId){
			return UTIL_HTTP.post({
				url: "/opcard/bind",
				data: {
					cardno: cardno,
					hosOrgName:hosOrgName,
					hosOrgCode:hosOrgCode,
					name:name,
				    tAppointUserId:tAppointUserId
				}
			});
		},
	    
		//解绑就医卡
		undindCard: function(cardno){
			return UTIL_HTTP.get({
				url: "/opcard/unbind",
				data: cardno
			});
		},
	
	};
		
})