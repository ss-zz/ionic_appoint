//医生
app.service('DoctorService', function(UTIL_HTTP){
	return {
		//获取医生列表
		getDoctors : function(params){
			return UTIL_HTTP.get({
				url: "/doctor",
				data: params
			})
		},
		//根据id获取医生
		getDoctorById: function(doctorId){
			return UTIL_HTTP.get({
				url: "/doctor/" + doctorId
			});
		},
		//获取推荐医生
		getDoctorsRecommond: function(hosCode, deptCode, pageParam){
			var params = pageParam || {};
			params.hosCode = hosCode;
			params.deptCode = deptCode;
			return UTIL_HTTP.get({
				url: "/doctor/recommend",
				data: params
			});
		},
		//获取专家医生
		getDoctorsSpec: function(hosCode, pageParam){
			var params = pageParam || {};
			params.hosCode = hosCode;
			return UTIL_HTTP.get({
				url: "/doctor/spec",
				data: params
			});
		},
	};

})