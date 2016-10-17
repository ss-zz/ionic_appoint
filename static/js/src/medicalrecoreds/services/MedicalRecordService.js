//就诊记录
app.service('MedicalRecordService', function(UTIL_HTTP){

	return {
		//就诊记录列表
		getOutpatientRecords: function(idNo, pageParams){
			return UTIL_HTTP.get({
				url: "/medicalRecords/patient-" + idNo,
				data: pageParams
			});
		},
		//就诊记录列表-有处方数据
		getOutpatientRecordsPrescribe: function(idNo, pageParams, hosOrgCode, preNo){
			pageParams = pageParams || {};
			pageParams.hosOrgCode = hosOrgCode;
			pageParams.preNo = preNo;
			return UTIL_HTTP.get({
				url: "/medicalRecords-prescribedata/patient-" + idNo,
				data: pageParams
			});
		},
		//就诊记录列表-有医疗费用数据
		getOutpatientRecordsFee: function(idNo, pageParams, hosOrgCode){
			pageParams = pageParams || {};
			pageParams.hosOrgCode = hosOrgCode;
			return UTIL_HTTP.get({
				url: "/medicalRecords-feedata/patient-" + idNo,
				data: pageParams
			});
		},
		//就诊记录列表-有检查报告数据
		getOutpatientRecordsCheckReport: function(idNo, pageParams, hosOrgCode){
			pageParams = pageParams || {};
			pageParams.hosOrgCode = hosOrgCode;
			return UTIL_HTTP.get({
				url: "/medicalRecords-checkreportdata/patient-" + idNo,
				data: pageParams
			});
		},
		//就诊记录列表-有检验报告数据
		getOutpatientRecordsTestReport: function(idNo, pageParams, hosOrgCode){
			pageParams = pageParams || {};
			pageParams.hosOrgCode = hosOrgCode;
			return UTIL_HTTP.get({
				url: "/medicalRecords-testreportdata/patient-" + idNo,
				data: pageParams
			});
		},
		//获取就诊明细-电子病历、检查单、检验单、处方单
		getOutpatientDetail: function(id){
			return UTIL_HTTP.get({
				url: "/medicalRecordsDetail/patient-" + id
			});
		}
	};

})