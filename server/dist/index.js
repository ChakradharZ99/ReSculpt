"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const wasteRequirement_1 = __importDefault(require("./routes/wasteRequirement"));
const innovativeProduct_1 = __importDefault(require("./routes/innovativeProduct"));
const user_1 = __importDefault(require("./routes/user"));
const payment_1 = __importDefault(require("./routes/payment"));
const app = (0, express_1.default)();
require("dotenv").config();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true
}));
app.use('/api/v1/auth', auth_1.default);
app.use(wasteRequirement_1.default);
app.use(innovativeProduct_1.default);
app.use(user_1.default);
app.use(payment_1.default);
app.listen(process.env.PORT, () => {
    console.log("Server running");
});
