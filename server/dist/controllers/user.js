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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.orders = exports.contributions = exports.satisfiedWasteRequirements = exports.uploadedWasteRequirements = exports.uploadedInnovativeProducts = exports.contribute = exports.profile = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const User = prisma.user;
const WasteRequirements = prisma.wasteRequirement;
const InnovativeProds = prisma.innovativeProduct;
const Contributions = prisma.contribution;
const Orders = prisma.orders;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        const userDetails = yield User.findFirst({
            where: {
                id: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
            }
        });
        return res.json({ userDetails });
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.profile = profile;
const contribute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const userId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
        const requirementId = parseInt(req.params.id);
        const { mobile, quantity, address } = req.body;
        // Check if the user and requirement exist
        const user = yield User.findUnique({ where: { id: userId } });
        const requirement = yield WasteRequirements.findUnique({ where: { requirementId } });
        if (!user || !requirement) {
            return res.status(404).json({ msg: 'User or requirement not found' });
        }
        // Check if the contribution quantity is valid
        if (quantity <= 0) {
            return res.json({ msg: "You need to contribute at least 1 item" });
        }
        // Check if the contribution quantity exceeds the required quantity
        if (quantity > requirement.requiredQuantity) {
            return res.json({
                msg: "You cannot contribute more than the required quantity",
                maxContributionAllowed: requirement.requiredQuantity,
            });
        }
        // Create a new contribution
        const contribution = yield Contributions.create({
            data: {
                mobile,
                quantity,
                address,
                user: { connect: { id: userId } },
                wasteRequirement: { connect: { requirementId } },
            },
        });
        // Update the requiredQuantity of the WasteRequirement
        const updatedRequirement = yield WasteRequirements.update({
            where: { requirementId },
            data: { requiredQuantity: { decrement: quantity } },
        });
        return res.json({ contribution, updatedRequirement });
    }
    catch (error) {
        console.error('Error contributing to requirement:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.contribute = contribute;
const uploadedInnovativeProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const uploadedItems = yield InnovativeProds.findMany({
            where: {
                uploaderId: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id
            }
        });
        return res.json({ uploadedItems });
    }
    catch (e) {
        return res.status(500).json({ msg: 'Server error' });
    }
});
exports.uploadedInnovativeProducts = uploadedInnovativeProducts;
const uploadedWasteRequirements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const requirements = yield WasteRequirements.findMany({
            where: {
                uploaderId: (_e = req.user) === null || _e === void 0 ? void 0 : _e.id
            }
        });
        return res.json({ requirements });
    }
    catch (e) {
        return res.status(500).json({ msg: 'Server error' });
    }
});
exports.uploadedWasteRequirements = uploadedWasteRequirements;
const satisfiedWasteRequirements = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const userId = (_f = req.user) === null || _f === void 0 ? void 0 : _f.id;
        const requirements = yield WasteRequirements.findMany({
            where: {
                requiredQuantity: 0,
                uploaderId: userId
            }
        });
        return res.json({ requirements });
    }
    catch (e) {
        return res.status(500).json({ msg: 'Server error' });
    }
});
exports.satisfiedWasteRequirements = satisfiedWasteRequirements;
const contributions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const userContributions = yield prisma.contribution.findMany({
            where: { userId: (_g = req.user) === null || _g === void 0 ? void 0 : _g.id },
            include: {
                wasteRequirement: true, // Include the associated WasteRequirement object
            },
        });
        return res.json(userContributions);
    }
    catch (e) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.contributions = contributions;
const orders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const buyerId = (_h = req.user) === null || _h === void 0 ? void 0 : _h.id;
        const productId = req.params.productId;
        if (buyerId === undefined) {
            return res.status(400).json({ msg: "Buyer ID is missing" });
        }
        // Convert productId to a number
        const parsedProductId = parseInt(productId);
        const order = yield Orders.create({
            data: {
                buyerId,
                productId: parsedProductId,
            },
        });
        const updatedProduct = yield InnovativeProds.update({
            where: {
                productId: parsedProductId,
            },
            data: {
                quantity: {
                    decrement: 1
                }
            }
        });
        return res.json({ order, updatedProduct });
    }
    catch (e) {
        console.error("Error creating order:", e);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.orders = orders;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    try {
        const buyerId = (_j = req.user) === null || _j === void 0 ? void 0 : _j.id;
        if (buyerId === undefined) {
            return res.status(400).json({ msg: "Buyer ID is missing" });
        }
        const order = yield Orders.findMany({
            where: {
                buyerId
            },
            include: {
                product: true,
            },
        });
        return res.json({ order });
    }
    catch (e) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});
exports.getOrders = getOrders;
