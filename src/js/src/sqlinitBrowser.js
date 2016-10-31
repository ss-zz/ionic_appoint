app.service('SqlInitBrowser', function(){

	//浏览器中测试数据库初始化脚本
	return {
		sqls: [
		//持久化存储数据表-Create
		"CREATE TABLE IF NOT EXISTS spedata (key VARCHAR(200), value BLOB_TEXT);",

		//消息表-Create
		"CREATE TABLE IF NOT EXISTS message (id integer primary key autoincrement, msg VARCHAR2(200), msgtype VARCHAR2(2), state VARCHAR2(2), t_patient_id integer, ext BLOB_TEXT, msgdetail BLOB_TEXT, EFFECT_TIME timestamp, createtime timestamp DEFAULT (datetime('now','localtime')));",
		/**
		//消息表-Insert
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('您已成功预约\"大厂回族自治县人民医院\"就诊！','1','1','1','2016-07-04 11:30:14','{\"timeLimit\":\"晚上\",\"deptName\":\"内科\",\"patientId\":15,\"patientname\":\"江左琳\",\"hosOrgName\":\"大厂回族自治县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":\"主任医师\",\"period\":\"晚上\",\"appointDate\":\"2016-07-04\"}','2016-07-04 11:30:02','您已成功预约\"大厂回族自治县人民医院 内科 主任医师 \"，请江左琳在2016-07-04 晚上到院就诊。');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('您的预约\"大厂回族自治县人民医院\"即将到期！','2','0','1','2016-07-04 11:30:14','{\"timeLimit\":\"晚上\",\"deptName\":\"内科\",\"patientId\":15,\"patientname\":\"江左琳\",\"hosOrgName\":\"大厂回族自治县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":\"主任医师\",\"period\":\"晚上\",\"appointDate\":\"2016-07-04\"}','2016-07-03 00:00:00','您的预约\"大厂回族自治县人民医院\"即将到期！');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('您的预约\"大厂回族自治县人民医院\"已经到期！','3','1','1','2016-07-04 11:30:14','{\"timeLimit\":\"晚上\",\"deptName\":\"内科\",\"patientId\":15,\"patientname\":\"江左琳\",\"hosOrgName\":\"大厂回族自治县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":\"主任医师\",\"period\":\"晚上\",\"appointDate\":\"2016-07-04\"}','2016-07-04 00:00:00','您的预约\"大厂回族自治县人民医院\"已经到期！');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('医生为您开具了\"检验项目\"，请缴费！','5','1','1','2016-07-02 17:21:21','{\"idNo\":\"410182198812113311\",\"deptName\":\"内科\",\"patientId\":1,\"hosOrgName\":\"大厂县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":\"普通医师\",\"deptCode\":\"40198958502\",\"clinNo\":\"1\"}','2016-07-02 17:21:16','您的就诊\"大厂县人民医院 内科 普通医师 \"，有一条（检验项目）需要缴费，请尽快缴费。');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('您有一个\"检验报告\"已出，请速取！','7','1','1','2016-07-04 14:53:07','{\"idNo\":\"410182198812113311\",\"id\":12,\"deptName\":\"内科\",\"patientId\":1,\"hosOrgName\":\"大厂县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":\"普通医师\",\"deptCode\":\"40198958502\",\"clinNo\":\"1\"}','2016-07-04 14:52:31','您的（检验项目）报告已出，请到检验室领取报告或自助打印报告。');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('医生为您开具了\"检查项目\"，请缴费！','8','1','1','2016-07-02 17:21:21','{\"idNo\":\"410182198812113311\",\"deptName\":\"内科\",\"patientId\":1,\"hosOrgName\":\"大厂县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":\"普通医师\",\"deptCode\":\"40198958502\",\"clinNo\":\"1\"}','2016-07-02 17:21:16','您的就诊\"大厂县人民医院 内科 普通医师 \"，有一条（检查项目）需要缴费，请尽快缴费。');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('您有一个\"检查报告\"已出，请速取！','10','1','1','2016-07-04 14:55:13','{\"idNo\":\"410182198812113311\",\"id\":20,\"deptName\":\"内科\",\"patientId\":1,\"hosOrgName\":\"大厂县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":\"普通医师\",\"deptCode\":\"40198958502\",\"clinNo\":\"1\"}','2016-07-04 14:54:37','您的（检查项目）报告已出，请到检验室领取报告或自助打印报告。');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('医生为您开具了\"处方\"，请缴费！','11','1','1','2016-07-02 16:27:09','{\"idNo\":\"410182196810145478\",\"deptName\":\"内一科门诊\",\"patientId\":21,\"hosOrgName\":\"大厂回族自治县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":null,\"deptCode\":\"0101\",\"clinNo\":\"13654452145_1\"}','2016-07-02 16:27:03','您的就诊\"大厂回族自治县人民医院 内一科门诊  \"，有一条（处方）需要缴费，请尽快缴费。');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('您有一个\"处方\"已经缴费成功！','12','1','1','2016-07-02 16:27:27','{\"idNo\":\"410182196810145478\",\"deptName\":\"内一科门诊\",\"patientId\":21,\"hosOrgName\":\"大厂回族自治县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":null,\"deptCode\":\"0101\",\"clinNo\":\"13654452145_1\"}','2016-07-02 16:27:22','您的就诊\"大厂回族自治县人民医院 内一科门诊  \"，（处方）已经缴费成功，请尽快到“药房”交方。');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('您已提交处方，请您到领药处领药！','13','1','1','2016-07-02 16:27:27','{\"idNo\":\"410182196810145478\",\"deptName\":\"内一科门诊\",\"patientId\":21,\"hosOrgName\":\"大厂回族自治县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":null,\"deptCode\":\"0101\",\"clinNo\":\"13654452145_1\"}','2016-07-02 16:27:22','您的就诊\"大厂回族自治县人民医院 内一科门诊  \"，已经收方，正在配药，请尽快到“药房”拿药。');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('感谢您的来诊，来看看我院推荐的服务吧！','17','0','1','2016-07-02 11:30:51','{\"idNo\":\"410182196810145478\",\"deptName\":\"内一科门诊\",\"patientId\":21,\"hosOrgName\":\"大厂回族自治县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":null,\"deptCode\":\"0101\",\"clinNo\":\"13654452145_1\"}','2016-07-07 11:30:45','感谢您参与了我院的治疗，根据您的情况，为您推荐如下服务：');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('您有一条新的消费记录，请查看！','18','1','1','2016-07-02 16:14:03','{\"idNo\":\"410182196810145478\",\"total\":210.00,\"cardNo\":\"0002306445\",\"cost\":230.00,\"costTime\":\"2016-01-02\"}','2016-07-02 16:13:57','您的就医卡0002306445于2016-01-02消费230.00元，余额210.00元。');",
		"insert into `message` (`MSG`, `MSGTYPE`, `STATE`, `T_PATIENT_ID`, `CREATETIME`, `EXT`, `EFFECT_TIME`, `MSGDETAIL`) values('您的反馈很重要，快来评价吧！','20','0','1','2016-07-02 11:30:51','{\"idNo\":\"410182196810145478\",\"deptName\":\"内一科门诊\",\"patientId\":21,\"hosOrgName\":\"大厂回族自治县人民医院\",\"hosId\":2,\"hosOrgCode\":\"401989585\",\"clinicName\":null,\"deptCode\":\"0101\",\"clinNo\":\"13654452145_1\"}','2016-07-03 11:30:45','为了更好地提高服务质量，请您对本次就诊体验进行评价。');",
		**/

		//用药提醒表-Create
		"CREATE TABLE IF NOT EXISTS drugalert (time VARCHAR(50), user_id VARCHAR(100));",
		//消息表-Insert
		/**
		"insert into 'drugalert' (time, user_id) values ('03:00', '1');",
		"insert into 'drugalert' (time, user_id) values ('03:30', '1');",
		"insert into 'drugalert' (time, user_id) values ('09:30', '1');",
		"insert into 'drugalert' (time, user_id) values ('11:30', '1');",
		"insert into 'drugalert' (time, user_id) values ('14:00', '1');"
		**/

	]};

})

;