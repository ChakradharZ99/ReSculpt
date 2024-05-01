import { z } from "zod";

export const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    cPassword: z.string().min(8)
})

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
})

export const resetPasswordSchema = z.object({
    password: z.string().min(8),
    cPassword: z.string().min(8) 
})

export const wasteRequirementSchema = z.object({
    requirementId: z.number(),
    image: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    initialQuantity: z.number(),
    requiredQuantity: z.number(),
    color: z.string().optional(),
    weight: z.number().optional(),
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
});

export const innovativeProdSchema = z.object({
    productId: z.number(),
    image: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    quantity: z.number(),
    color: z.string().optional(),
    material: z.string().optional(),
    weight: z.string().optional(),
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
});

export const contributionSchema = z.object({
    id: z.number(),
    mobile: z.string(),
    quantity: z.number(),
    address: z.string(),
})
export type SignupInput = z.infer<typeof signupSchema>
export type SigninInput = z.infer<typeof signinSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type AddInnovativeProdInput = z.infer<typeof innovativeProdSchema>
export type AddWasteRequirementInput = z.infer<typeof wasteRequirementSchema>