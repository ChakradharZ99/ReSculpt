"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const User = prisma.user;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield User.findUnique({ where: { id: decode.userId } });
        if (!user) {
            return res.status(401).json({ msg: 'Invalid token, user not found' });
        }
        // Attach the user object to the request for further use
        req.user = user;
        // Call next middleware
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
});
exports.authMiddleware = authMiddleware;
