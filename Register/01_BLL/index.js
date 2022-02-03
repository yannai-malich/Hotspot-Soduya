const dal = require('./../00_DAL/index');


function connectDb() {
    return dal.connect();
}

function initDb() {
    dropTableCars();
}


function dropTableCars() {
    let query = "DROP TABLE IF EXISTS `vehicles`";
    
    dal.runQuery(query,
        (res, extra) => { createTableCars()},
        (err) => { console.log("sorry err", err) }
    );
}

function createTableCars() {
    let query = "CREATE TABLE `vehicles` ("+
    "`veh_reg_no`  VARCHAR(8)            NOT NULL,"+
    "`category`    ENUM('car', 'truck')  NOT NULL DEFAULT 'car',"+
    "`brand`       VARCHAR(30)           NOT NULL DEFAULT '',"+
    "`desc`        VARCHAR(256)          NOT NULL DEFAULT '',"+
    "`daily_rate`  DECIMAL(6,2)          NOT NULL DEFAULT 9999.99,"+
    "PRIMARY KEY (`veh_reg_no`) );";
    
    dal.runQuery(query,
        (res, extra) => { insertCars()},
        (err) => { console.log("sorry err", err) }
    );
}

function insertCars() {
    let query = "INSERT INTO `vehicles` VALUES " +
    `('SBA1111A', 'car', 'NISSAN SUNNY 1.6L', '4 Door Saloon, Automatic', 99.99),
     ('SBB2222B','car', 'TOYOTA ALTIS 1.6L', '4 Door Saloon, Automatic', 99.99),
     ('SBC3333C', 'car', 'HONDA CIVIC 1.8L',  '4 Door Saloon, Automatic', 119.99),
     ('GA5555E', 'truck', 'NISSAN CABSTAR 3.0L',  'Lorry, Manual ', 89.99),
     ('GA6666F', 'truck', 'OPEL COMBO 1.6L',  'Van, Manual', 69.99);`;

    dal.runQuery(query,
        (res, extra) => { console.log(res, extra) },
        (err) => { console.log("sorry err", err) }
    );
}



//------------------------CRUD THAT IS USED DIRECT FROM UIL-----------------------------
function getCars(successCallBack, failCallBack) {
    let query="SELECT * FROM `vehicles`;";
    dal.runQuery(query,successCallBack,failCallBack);
}

function addCar(newCar,successCallBack, failCallBack) {
    let query="INSERT INTO `vehicles` VALUES " +
    `('${newCar.veh_reg_no}', '${newCar.category}', '${newCar.brand}', '${newCar.desc}', ${newCar.daily_rate})`;
    dal.runQuery(query,successCallBack,failCallBack);
}

function deleteCar(carId,successCallBack, failCallBack) {
    let query="DELETE FROM `vehicles` "+ 
              `WHERE veh_reg_no= '${carId}'`;
    
    dal.runQuery(query,successCallBack,failCallBack);
}


function editCar(carId,updatedCar,successCallBack, failCallBack) {
    let query="UPDATE `vehicles` "+ 
    `SET daily_rate = ${updatedCar.daily_rate} WHERE veh_reg_no = '${carId}';`
    
    dal.runQuery(query,successCallBack,failCallBack);
}



//--------------------------------------------------------------------------------------
module.exports = {
    "connectDb": connectDb,
    "initDb": initDb,
    "getCars":getCars,
    "addCar":addCar,
    "deleteCar":deleteCar,
    "editCar":editCar
}