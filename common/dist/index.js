"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contributionSchema = exports.innovativeProdSchema = exports.wasteRequirementSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.signinSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    cPassword: zod_1.z.string().min(8)
});
exports.signinSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8)
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
});
exports.resetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(8),
    cPassword: zod_1.z.string().min(8)
});
exports.wasteRequirementSchema = zod_1.z.object({
    requirementId: zod_1.z.number(),
    image: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    initialQuantity: zod_1.z.number(),
    requiredQuantity: zod_1.z.number(),
    color: zod_1.z.string().optional(),
    weight: zod_1.z.number().optional(),
    length: zod_1.z.number().optional(),
    width: zod_1.z.number().optional(),
    height: zod_1.z.number().optional(),
});
exports.innovativeProdSchema = zod_1.z.object({
    productId: zod_1.z.number(),
    image: zod_1.z.string(),
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
    color: zod_1.z.string().optional(),
    material: zod_1.z.string().optional(),
    weight: zod_1.z.string().optional(),
    length: zod_1.z.number().optional(),
    width: zod_1.z.number().optional(),
    height: zod_1.z.number().optional(),
});
exports.contributionSchema = zod_1.z.object({
    id: zod_1.z.number(),
    mobile: zod_1.z.string(),
    quantity: zod_1.z.number(),
    address: zod_1.z.string(),
});
