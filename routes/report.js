var express = require('express');
var router = express.Router();

var dbPool = require('../libs/db_pool.js');

var SELECT_ALL_REPORT_DATA_QUERY = [
    "SELECT",
        "*",
    "FROM",
        "reports"
];

router.get('/all', function(req, res) {
  dbPool.acquire(function(err, db) {
    db.query(SELECT_ALL_REPORT_DATA_QUERY.join(' '), [], function(err, rows, columns) {
      dbPool.release(db);
      if (err) return res.end(err);

      res.json(rows);
    });
  });
});

var SELECT_REPORT_BY_ID_QUERY = [
    "SELECT",
        "*",
    "FROM",
        "reports",
    "WHERE",
        "idx = ?"
];


router.get('/:id', function(req, res) {
  dbPool.acquire(function(err, db) {
    db.query(SELECT_REPORT_BY_ID_QUERY.join(' '), [req.params.id], function(err, rows, columns) {
      dbPool.release(db);
      if (err) return res.end(err);
      res.json(rows);
    });
  });
});

var INSERT_DATA_QUERY = [
    "INSERT INTO", "reports", "SET ?" ];

router.post('/create', function(req, res) {
  console.log('/reports/create');
  var report = req.body;
  console.log('user request body');
  console.log(report);

  // Insert DATA object
  var post = {
    setting_global : report.SETTINGS_GLOBAL,
    device_features : report.DEVICE_FEATURES,
    model : report.PHONE_MODEL,
    preference : report.SHARED_PREFERENCES,
    android_version : report.ANDROID_VERSION,
    app_version_code : report.APP_VERSION_CODE,
    crash_configuration : report.CRASH_CONFIGURATION,
    crash_date : report.USER_CRASH_DATE,
    stack_trace : report.STACK_TRACE,
    logcat : report.LOGCAT,
    app_version : report.APP_VERSION_NAME,
    app_start_date : report.USER_APP_START_DATE,
    brand : report.BRAND,
    report_id : report.REPORT_ID };
  
  dbPool.acquire(function(err, db) {
    db.query(INSERT_DATA_QUERY.join(' '), post, function(err, result) {
      dbPool.release(db);

      if (err) return res.end(err);

      console.log
      console.log("=========================================================");
      console.log("                        RESULT                           ");
      console.log("=========================================================");
      console.log(JSON.stringify(result));
      console.log("=========================================================");

      var response = {};
      response.status = 200;
      response.result = result;

      res.send(response);
    });
  });

});

module.exports = router;
