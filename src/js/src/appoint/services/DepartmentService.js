//科室
app.service('DepartmentService',function(UTIL_HTTP){
	return {
		getDepartmentList : function(parmas){
			return UTIL_HTTP.post({
				url:'/department',
				data:parmas
			});
		}
	}
});
