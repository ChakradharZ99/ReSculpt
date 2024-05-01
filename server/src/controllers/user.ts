import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../utils/types";
import { Request, Response } from "express"
const prisma = new PrismaClient();

const User = prisma.user;
const WasteRequirements = prisma.wasteRequirement;
const InnovativeProds = prisma.innovativeProduct;
const Contributions = prisma.contribution;
const Orders = prisma.orders;

export const profile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = req.user?.id;
        if (!user) {
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        const userDetails = await User.findFirst({
            where: {
                id: req.user?.id,
            }
        });
        return res.json({userDetails});
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ msg: 'Server error' });
    }
};

export const contribute = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      const requirementId = parseInt(req.params.id);
      const { mobile, quantity, address } = req.body;
  
      // Check if the user and requirement exist
      const user = await User.findUnique({ where: { id: userId } });
      const requirement = await WasteRequirements.findUnique({ where: { requirementId } });
  
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
      const contribution = await Contributions.create({
        data: {
          mobile,
          quantity,
          address,
          user: { connect: { id: userId } },
          wasteRequirement: { connect: { requirementId } },
        },
      });
  
      // Update the requiredQuantity of the WasteRequirement
      const updatedRequirement = await WasteRequirements.update({
        where: { requirementId },
        data: { requiredQuantity: { decrement: quantity } },
      });
  
      return res.json({ contribution, updatedRequirement });
    } catch (error) {
      console.error('Error contributing to requirement:', error);
      res.status(500).json({ msg: 'Server error' });
    }
};

export const uploadedInnovativeProducts = async (req: AuthenticatedRequest, res: Response) =>{
    try{
        const uploadedItems = await InnovativeProds.findMany({
            where:{
                uploaderId : req.user?.id
            }
        })
        return res.json({uploadedItems});
    }
    catch(e){
        return res.status(500).json({ msg: 'Server error' });
    }
}

export const uploadedWasteRequirements = async (req: AuthenticatedRequest, res: Response) =>{
    try{
        const requirements = await WasteRequirements.findMany({
            where:{
                uploaderId : req.user?.id
            }
        })
        return res.json({requirements});
    }
    catch(e){
        return res.status(500).json({ msg: 'Server error' });
    }
}

export const satisfiedWasteRequirements = async (req: AuthenticatedRequest, res: Response) =>{
    try{
        const userId = req.user?.id;
        const requirements = await WasteRequirements.findMany({
            where:{
                requiredQuantity: 0,
                uploaderId : userId
            }
        })
        return res.json({ requirements});
    }
    catch(e){
        return res.status(500).json({ msg: 'Server error' });
    }
}

export const contributions = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userContributions = await prisma.contribution.findMany({
        where: { userId: req.user?.id },
        include: {
          wasteRequirement: true, // Include the associated WasteRequirement object
        },
      });
  
      return res.json(userContributions);
    } catch (e) {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const orders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const buyerId = req.user?.id;
    const productId = req.params.productId;

    if (buyerId === undefined) {
      return res.status(400).json({ msg: "Buyer ID is missing" });
    }

    // Convert productId to a number
    const parsedProductId = parseInt(productId);

    const order = await Orders.create({
      data: {
        buyerId,
        productId: parsedProductId,
      },
    });

    const updatedProduct = await InnovativeProds.update({
      where:{
        productId: parsedProductId,
      },
      data:{
        quantity :{
          decrement: 1
        }
      }
    })

    return res.json({ order , updatedProduct});
  } catch (e) {
    console.error("Error creating order:", e);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};



export const getOrders = async (req:AuthenticatedRequest, res: Response)=>{
  try{
    const buyerId = req.user?.id;

    if (buyerId === undefined) {
      return res.status(400).json({ msg: "Buyer ID is missing" });
    }
    
    const order = await Orders.findMany({
      where:{
        buyerId
      },
      include: {
        product: true,
      },
    })
    return res.json({order});
  }
  catch(e){
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}