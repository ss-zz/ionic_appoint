//就医评价
app.service('EvaluateService', function(UTIL_HTTP){
	return {
		//评价
		evaluate: function(evaluate){
			return UTIL_HTTP.post({
				url: "/outpatientevaluate/add",
				data: evaluate
			});
		},
		//获取当前用户的评价结果
		getEvaluate: function(clinNo, hosOrgCode){
			return UTIL_HTTP.get({
				url: "/outpatientevaluate/get",
				data: {
					clinNo: clinNo,
					hosOrgCode: hosOrgCode
				}
			});
		}
	};

})