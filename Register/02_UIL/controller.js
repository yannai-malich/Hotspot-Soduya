const express = require('express');
const bodyParser = require('body-parser');

const bll = require('./../01_BLL/index');

const app = express();


// Use middlewares (app level - not controller level):
// this middleware takes the content of the request`s body, 
//and parses it to json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/views"));

// Use middlewares (app level - not controller level):
// this middleware allows to access files in the given folder (this is for css, js, etc...)



app.get("/", (req, res) => {
    res.status(200);
    res.sendfile(__dirname + "/views/index.html")
})
app.get("/dvir", (req, res) => {
    res.status(200);
    res.sendfile(__dirname + "/views/index2.html")
})

app.get("/api/cars", (req, res) => {

    bll.getCars(
        (p2, p3) => {
            res.status(200);
            res.send(p2);
        },
        (p1) => {
            res.status(400);
            res.send(p1);
        }
    )

})

// ADD A NEW CAR (the car is a json object in the request body)
app.post("/reg", (req, res) => {


    let newCar = req.body;

    bll.addCar(newCar,
        (p2, p3) => {
            res.status(201);
            res.send(p2);
        },
        (p1) => {
            res.status(400);
            res.send(p1);
        }
    );
})


app.put("/api/car/:id", (req, res) => {


    let carId=req.params.id;
    let updatedCar = req.body;

   bll.editCar(carId,updatedCar,
        (p2, p3) => {
            res.status(200);
            res.send(p2);
        },
        (p1) => {
            res.status(400);
            res.send(p1);
        }
    );
})

app.delete("/api/car/:id", (req, res) => {

    let carId=req.params.id;

    bll.deleteCar(carId,
        (p2, p3) => {
            res.status(200);
            res.send(p2);
        },
        (p1) => {
            res.status(400);
            res.send(p1);
        }
    );
})


app.listen(process.env.PORT||3000, () => {
    bll.connectDb();
    bll.initDb();
    console.log("Server runs OK");
})
