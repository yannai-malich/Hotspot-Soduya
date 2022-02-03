// const mySql = require('mysql');


// // this is a global var - so we can use it in all the functions in this file
// let connection;



// function connect() {
//     let connectionConfig = {
//         "host": "localhost",
//         "user": "root",
//         "database": "cars"
//     };

//     //here we asiggn to the global var - the open connection that we created
//     connection = mySql.createConnection(connectionConfig);
// }
const mySql = require('mysql');


// this is a global var - so we can use it in all the functions in this file
let connection;



function connect() {
    let connectionConfig = {
        "host"     : 'us-cdbr-iron-east-03.cleardb.net',
        "user"     : 'b22e0337072cd4',
        "password" : '89b91073',
        "database" : 'heroku_1165074c20af055',
    };


    //here we asiggn to the global var - the open connection that we created
    connection = mySql.createConnection(connectionConfig);
    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
          console.log('error when connecting to db:', err);
          setTimeout(connect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
      });                                     // process asynchronous requests in the meantime.
                                              // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        connect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
    }
    });
}



function runQuery(queryToDb, successCallBack, failCallBack) {
    
    let callBackToQuery = (p0, p2, p3) => { (p0)? failCallBack(p0): successCallBack(p2, p3);};

    /*
    "query" function - is a built-in function in the package "mysql" that we installed from npm.
    the "query" function is to execute sqlQueries in the DB (with the connection that we opened before)

    the "query" function gets 2 parameters:
        1) The query to run in the DB
        2) A function that will be executed when the query has finished running in the DB.
            - If the query faieled the callback will get to the first parameter an Error
            - If the query succeed the callback will get to the second and third parameters the result
    */
    connection.query(queryToDb,callBackToQuery);
}


module.exports = {
    "connect": connect,
    "runQuery": runQuery
}