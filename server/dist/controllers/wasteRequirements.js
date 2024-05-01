"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.wasteReq = exports.getAllSatisfiedRequirements = exports.getWasteRequirements = exports.getAllWasteRequirements = exports.addWasteRequirement = exports.addWasteRequirementSchema = void 0;
const client_1 = require("@prisma/client");
const z = __importStar(require("zod"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const prisma = new client_1.PrismaClient();
const WasteRequirement = prisma.wasteRequirement;
exports.addWasteRequirementSchema = z.object({
    image: z.string().optional(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    initialQuantity: z.number(),
    color: z.string().optional(),
    weight: z.number().optional(),
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
});
const addWasteRequirement = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { image, name, description, price, initialQuantity, color, weight, length, width, height } = exports.addWasteRequirementSchema.parse(req.body);
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (image) {
            const uploadRes = yield cloudinary_1.default.uploader.upload(image);
            if (uploadRes) {
                const waste_requirement = yield WasteRequirement.create({
                    data: {
                        image,
                        name,
                        description,
                        price,
                        initialQuantity,
                        requiredQuantity: initialQuantity,
                        color,
                        weight,
                        length,
                        width,
                        height,
                        uploaderId: userId, // Assigning the uploaderId to the userId
                    },
                });
                return res.json({ msg: "Requirement uploaded successfully" });
            }
            else {
                return res.json({ error: "Error uploading image" });
            }
        }
        else {
            return res.json({ msg: "Image data is required" });
        }
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.json({ msg: message });
        }
        console.log(error);
        return res.json({ msg: "Internal Server Error" });
    }
});
exports.addWasteRequirement = addWasteRequirement;
const getAllWasteRequirements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wasteRequirements = yield WasteRequirement.findMany();
        return res.json(wasteRequirements);
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.json({ msg: message });
        }
        return res.json({ msg: "Internal Server Error" });
    }
});
exports.getAllWasteRequirements = getAllWasteRequirements;
const getWasteRequirements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wasteRequirements = yield WasteRequirement.findMany({
            where: {
                requiredQuantity: {
                    not: 0,
                },
            },
        });
        return res.json(wasteRequirements);
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.json({ msg: message });
        }
        return res.json({ msg: "Internal Server Error" });
    }
});
exports.getWasteRequirements = getWasteRequirements;
const getAllSatisfiedRequirements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wasteRequirements = yield WasteRequirement.findMany({
            where: {
                requiredQuantity: 0,
            },
        });
        return res.json(wasteRequirements);
    }
    catch (error) {
        if (error.errors && error.errors[0].message) {
            const message = error.errors[0].message;
            return res.json({ msg: message });
        }
        return res.json({ msg: "Internal Server Error" });
    }
});
exports.getAllSatisfiedRequirements = getAllSatisfiedRequirements;
const wasteReq = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const reqIdNum = parseInt(id, 10); // Convert id to a number
        const requirement = yield WasteRequirement.findFirst({
            where: {
                requirementId: reqIdNum,
            },
        });
        // Check if the requirement was found
        if (!requirement) {
            return res.status(404).json({ msg: "Requirement not found" });
        }
        return res.json(requirement);
    }
    catch (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.wasteReq = wasteReq;
