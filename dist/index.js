"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const http_1 = tslib_1.__importDefault(require("http"));
const express_rate_limit_1 = tslib_1.__importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1000,
    max: 5
});
app.use(limiter);
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/characters", require('./routes/characters'));
app.get("/", (req, res) => { res.redirect('/characters'); });
const server = http_1.default.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, () => { console.log(`App is running on port ${port}`); });
process.on("unhandledRejection", async (err) => { console.error("Unhandled Promise Rejection:\n", err); });
process.on("uncaughtException", async (err) => { console.error("Uncaught Promise Exception:\n", err); });
process.on("uncaughtExceptionMonitor", async (err) => { console.error("Uncaught Promise Exception (Monitor):\n", err); });
process.on("multipleResolves", async (type, promise, reason) => { console.error("Multiple Resolves:\n", type, promise, reason); });
