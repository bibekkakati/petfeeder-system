const express = require("express");
const cors = require("cors");
const authorize = require("./middleware/authorize");
const handleFeed = require("./api/feed");
const handleRoot = require("./api/root");
const handleSocketState = require("./api/socket_state");
const handleLogin = require("./api/login");
const handleIsAuthorized = require("./api/is_authorized");
const handle404 = require("./api/404");
const handleFeedSchedule = require("./api/feed_schedule");
const handleFeedDeSchedule = require("./api/feed_deschedule");
const handleFeedReSchedule = require("./api/feed_reschedule");
const handleListFeedSchedule = require("./api/list_feed_schedule");

const app = express();
app.options("*", cors());
app.use(cors("*"));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.get("/", handleRoot);
app.post("/login", handleLogin);
app.post("/account/isauthorized", authorize, handleIsAuthorized);
app.post("/feed", authorize, handleFeed);
app.post("/socket/state", authorize, handleSocketState);
app.post("/feed/schedule", authorize, handleFeedSchedule);
app.delete("/feed/schedule", authorize, handleFeedDeSchedule);
app.put("/feed/schedule", authorize, handleFeedReSchedule);
app.get("/feed/schedule", authorize, handleListFeedSchedule);
app.all("*", handle404);

module.exports = app;
