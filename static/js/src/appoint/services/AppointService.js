//预约挂号
app.service('AppointService', function(UTIL_HTTP){
	return {
		//预约
		add : function(patientId, arrayJobId){
			return UTIL_HTTP.post({
				url: "/appoinment/add",
				data: {
					patientId: patientId,
					arrayJobId: arrayJobId
				}
			})
		},
		//获取预约记录
		getList: function(params){
			return UTIL_HTTP.get({
				url: "/appoinment/list",
				data: params
			});
		},
		//获取预约详情
		getDetail: function(appointId){
			return UTIL_HTTP.get({
				url: "/appoinment/id-" + appointId
			});
		},
		//退号
		back : function(appointId, state){
			return UTIL_HTTP.post({
				url: "/appoinment/back",
				data: {
					id: appointId,
					state: state
				}
			})
		},
		//获取排班号源
		getArrayJobs : function(params){
			return UTIL_HTTP.get({
				url: "/arrayJob",
				data: params
			})
		},
		//获取默认号源
		getDefaultArrayJob : function(){
			return UTIL_HTTP.get({
				url: "/arrayJob/default"
			})
		},

	};
		
})