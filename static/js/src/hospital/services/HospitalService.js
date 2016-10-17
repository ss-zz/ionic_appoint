//医院
app.service('HospitalService', function(UTIL_HTTP){
	return {
		//医院列表查询
		getHospitals: function(params){
			return UTIL_HTTP.get({
				url: "/hospital",
				data: params
			});
		},
		//根据id获取医院信息
		getHospitalById: function(hospitalId){
			return UTIL_HTTP.get({
				url: "/hospital/" + hospitalId
			});
		},
		//获取默认医院信息
		getDefaultHospital: function(){
			return UTIL_HTTP.get({
				url: "/hospital/default"
			});
		},
		//医院药品价格查询
		getHosDrugPrices: function(params){
			return UTIL_HTTP.get({
				url: "/hospital/medicinePrice",
				data: params
			});
		},
		//医院服务价格查询
		getHosServPrices: function(params){
			return UTIL_HTTP.get({
				url: "/hospital/servicePrice",
				data: params
			});
		},
		//医院特色科室
		getDeptSpe: function(hosId){
			return UTIL_HTTP.get({
				url: "/department",
				data: {
					hosId: hosId,
					isSpec: "1"
				}
			});
		},
		/*医院导航详细信息-
			参数组合：
			id 导航id
			hospitalId,navtype 医院id，导航类型
			hospitalCode,navtype 医院编码，导航类型
		*/
		getNavDetail: function(params){
			return UTIL_HTTP.get({
				url: "/hospital/innerNav/detail",
				data: params
			});
		},
		//医院导航列表
		getNavs: function(hosId){
			return UTIL_HTTP.get({
				url: "/hospital/innerNav",
				data: {
					hosId: hosId
				}
			});
		},
		//医院叫号跟踪
		getCallno: function(hosOrgCode, hosOrgName){
			return UTIL_HTTP.get({
				url: "/his/getCallNoOut",
				data: {
					hosOrgCode: hosOrgCode,
					hosOrgName: hosOrgName
				}
			});
		}
	};

})