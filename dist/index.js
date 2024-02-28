"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3003;
const jsonMiddleware = express_1.default.json();
app.use(jsonMiddleware);
var HTTP_STATUSES;
(function (HTTP_STATUSES) {
    HTTP_STATUSES[HTTP_STATUSES["notFound"] = 404] = "notFound";
    HTTP_STATUSES[HTTP_STATUSES["ok"] = 200] = "ok";
    HTTP_STATUSES[HTTP_STATUSES["created"] = 201] = "created";
    HTTP_STATUSES[HTTP_STATUSES["noContent"] = 204] = "noContent";
    HTTP_STATUSES[HTTP_STATUSES["badRequest"] = 400] = "badRequest";
})(HTTP_STATUSES || (HTTP_STATUSES = {}));
const db = {
    courses: [
        { id: 1, title: "Front-end" },
        { id: 2, title: "Back-end" },
        { id: 3, title: "Fullstack" },
        { id: 4, title: "DevOps" },
        { id: 5, title: "Embedded" },
    ],
};
app.get("/", (req, res) => {
    res.send("Working!!!");
});
app.get("/courses", (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter((course) => course.title.startsWith(req.query.title));
    }
    res.json(foundCourses);
});
app.get("/courses/:id", (req, res) => {
    const coursesDbQuery = db.courses;
    const foundCourse = coursesDbQuery.find((course) => course.id === Number(req.params.id));
    if (!foundCourse) {
        res.sendStatus(HTTP_STATUSES.notFound);
        return;
    }
    res.json(foundCourse);
});
app.delete("/courses/:id", (req, res) => {
    db.courses = db.courses.filter((course) => course.id !== Number(req.params.id));
    res.send("Deleting done!");
});
app.post("/courses", (req, res) => {
    const newCourse = {
        id: Date.now(),
        title: req.body.title,
    };
    db.courses.push(newCourse);
    res.sendStatus(HTTP_STATUSES.created);
});
app.put("/courses", (req, res) => {
    const newCourse = {
        id: Date.now(),
        title: req.body.title,
    };
    db.courses.push(newCourse);
    res.sendStatus(HTTP_STATUSES.created);
});
app.listen(PORT, () => {
    console.log(`App was running on port ${PORT}`);
});
// const http = require("http");
// const path = require("path");
// const fs = require("fs");
// const PORT = 3003;
// const readFile = (path) => {
//   return new Promise((res, rej) => {
//     fs.readFile(path, (err, data) => {
//       if (err) rej(err);
//       else res(data);
//     });
//   });
// };
// const server = http.createServer(async (request, response) => {
//   if (request.url === "/favicon.ico") {
//     const iconPath = path.join(__dirname, "assets", "favicon.ico");
//     response.setHeader("Content-Type", "image/x-icon");
//     fs.createReadStream(iconPath).pipe(response);
//     return;
//   }
//   switch (request.url) {
//     case "/home":
//       // fs.readFile("pages/homehh.html", (err, data) => {
//       //   if (err) {
//       //     response.write("Something went wrong");
//       //   } else response.write(data);
//       //   response.end();
//       // });
//       const data = await readFile("pages/home.html");
//       response.write(data);
//       break;
//     case "/":
//       response.write("Start page");
//       break;
//     case "/about":
//       const data2 = await readFile("pages/about.html");
//       response.write(data2);
//       break;
//     default:
//       response.write("Poshol nahui");
//       break;
//   }
//   response.end();
// });
// server.listen(PORT);
