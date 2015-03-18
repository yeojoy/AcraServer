# ACRA Server
## ABOUT
[ACRA](http://www.acra.ch)에서 제공해 주는 library에서 쏴주는(POST) 에러로그를 받아줄 서버. node.js express로 간단히 만듬.

## HOW TO USE
1. install libraries

	$ npm install

2. edit database configuration

    $ mv libs/db.json.temp libs/db.json  
    $ vi libs/db.json

```
// db.json
{
	"host": "127.0.0.1",
    "port": "3306",
    "user": "user",
    "password": "user_password",
    "database": "db_name"
}
```

3. run

	$ bin/www
    
## Database Scheme
Maria DB를 사용함.
```
CREATE TABLE `reports` (
  `idx` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `setting_global` text,
  `device_features` text,
  `model` varchar(100) DEFAULT NULL,
  `preference` text,
  `android_version` varchar(5) DEFAULT NULL,
  `app_version_code` varchar(3) DEFAULT NULL,
  `crash_configuration` text,
  `crash_date` varchar(40) DEFAULT NULL,
  `stack_trace` mediumtext,
  `logcat` mediumtext,
  `app_version` varchar(10) DEFAULT NULL,
  `app_start_date` varchar(40) DEFAULT NULL,
  `brand` varchar(20) DEFAULT NULL,
  `report_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
```

# 참고
[URQA](http://urqa.io)도 상당히 괜찮음. 서버 구성이 필요없어서 좋음.