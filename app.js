const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
var compression = require("compression");
const rateLimit = require("express-rate-limit");
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
const handleNotificationToken = require("./api/notification_token");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 50 requests per windowMs
});

const app = express();
app.set("trust proxy", 1);
app.use(limiter);
app.use(helmet());
app.use(compression());
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
app.post("/notification/token", authorize, handleNotificationToken);
app.all("*", handle404);

module.exports = app;
