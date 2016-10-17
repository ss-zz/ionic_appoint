//就诊人
app.service('PatientService', function(UTIL_HTTP){
	return {
		//获取当前就诊人
		getCurrentPatient : function(){
			return UTIL_HTTP.get({
				url: "/patient/current"
			});
		},
		//获取我的就诊人列表
		getMyPatients: function(pageParam){
			return UTIL_HTTP.get({
				url: "/patients",
				data: pageParam
			});
		},
		//获取就诊人详细信息
		getPatientById: function(id){
			return UTIL_HTTP.get({
				url: "/patient/" + id
			});
		},
		//添加就诊人
		addPatient: function(patient){
			return UTIL_HTTP.post({
				url: "/patient/add",
				data: patient
			});
		},
		//修改就诊人
		editPatient: function(patient){
			return UTIL_HTTP.post({
				url: "/patient/edit",
				data: patient
			});
		}
	};
		
})