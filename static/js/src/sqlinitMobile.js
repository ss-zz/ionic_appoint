app.service('SqlInitMobile', function(){

	//浏览器中测试数据库初始化脚本
	return {
		sqls: [
		//持久化存储数据表-Create
		"CREATE TABLE IF NOT EXISTS spedata (key VARCHAR(200), value BLOB_TEXT);",

		//消息表-Create
		"CREATE TABLE IF NOT EXISTS message (id integer primary key autoincrement, msg VARCHAR2(200), msgtype VARCHAR2(2), state VARCHAR2(2), t_patient_id integer, ext BLOB_TEXT, msgdetail BLOB_TEXT, EFFECT_TIME timestamp, createtime timestamp DEFAULT (datetime('now','localtime')));",

		//用药提醒表-Create
		"CREATE TABLE IF NOT EXISTS drugalert (time VARCHAR(50), user_id VARCHAR(100));"

	]};

})

;