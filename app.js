const express = require("express");
const app = express();
const port = 5000;

// add random to make change

const logger = require("morgan");
app.use(logger("dev"));

app.use((req, res, next) => {
    console.log("This is global middleware");
    next();
});

function myMiddleware(req, res, next) {
    console.log("This is middleware for specific path");
    next();
}

app.get("/", myMiddleware, (req, res, next) => {
    res.send("Hello World!");
    next()
});

app.get("/posts", (req, res) => {
    res.send("List of post");
});

app.get("/posts/:id", (req, res) => {
    res.send("ID" + req.params.id);
});

app.get("/users/", (req, res) => {
    res.send("List of users");
});

app.get("/users/:name", (req, res) => {
    res.send("User: " + req.params.name);
});

app.use((req, res, next) => {
    const error = new Error("Resource Not Found");
    error.statusCode = 404;
    next(error);
});

function errorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.statusCode || 500);
    res.send(err.message);
    next()
}
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});