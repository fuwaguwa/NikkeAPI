import express from "express";
import http from "http";
import rateLimit from "express-rate-limit";

const app = express();
const limiter = rateLimit({
	windowMs: 1000,
	max: 5,
});

app.use(limiter);
app.use(express.urlencoded({ extended: false, }));

app.use("/characters", require("./routes/characters"));
app.get("/", (req, res) => 
{
	res.redirect("/characters");
});

const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => 
{
	console.log(`App is running on port ${port}`);
});

process.on("unhandledRejection", async (err) => 
{
	console.error("Unhandled Promise Rejection:\n", err);
});
process.on("uncaughtException", async (err) => 
{
	console.error("Uncaught Promise Exception:\n", err);
});
process.on("uncaughtExceptionMonitor", async (err) => 
{
	console.error("Uncaught Promise Exception (Monitor):\n", err);
});
process.on("multipleResolves", async (type, promise, reason) => 
{
	console.error("Multiple Resolves:\n", type, promise, reason);
});
