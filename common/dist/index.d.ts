import { z } from "zod";
export declare const signupSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    cPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
    cPassword: string;
}, {
    username: string;
    email: string;
    password: string;
    cPassword: string;
}>;
export declare const signinSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const resetPasswordSchema: z.ZodObject<{
    password: z.ZodString;
    cPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    cPassword: string;
}, {
    password: string;
    cPassword: string;
}>;
export declare const wasteRequirementSchema: z.ZodObject<{
    requirementId: z.ZodNumber;
    image: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    initialQuantity: z.ZodNumber;
    requiredQuantity: z.ZodNumber;
    color: z.ZodOptional<z.ZodString>;
    weight: z.ZodOptional<z.ZodNumber>;
    length: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    requirementId: number;
    image: string;
    name: string;
    description: string;
    price: number;
    initialQuantity: number;
    requiredQuantity: number;
    color?: string | undefined;
    weight?: number | undefined;
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}, {
    requirementId: number;
    image: string;
    name: string;
    description: string;
    price: number;
    initialQuantity: number;
    requiredQuantity: number;
    color?: string | undefined;
    weight?: number | undefined;
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}>;
export declare const innovativeProdSchema: z.ZodObject<{
    productId: z.ZodNumber;
    image: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    quantity: z.ZodNumber;
    color: z.ZodOptional<z.ZodString>;
    material: z.ZodOptional<z.ZodString>;
    weight: z.ZodOptional<z.ZodString>;
    length: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    image: string;
    name: string;
    description: string;
    price: number;
    productId: number;
    quantity: number;
    color?: string | undefined;
    material?: string | undefined;
    weight?: string | undefined;
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}, {
    image: string;
    name: string;
    description: string;
    price: number;
    productId: number;
    quantity: number;
    color?: string | undefined;
    material?: string | undefined;
    weight?: string | undefined;
    length?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}>;
export declare const contributionSchema: z.ZodObject<{
    id: z.ZodNumber;
    mobile: z.ZodString;
    quantity: z.ZodNumber;
    address: z.ZodString;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    id: number;
    mobile: string;
    address: string;
}, {
    quantity: number;
    id: number;
    mobile: string;
    address: string;
}>;
export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type AddInnovativeProdInput = z.infer<typeof innovativeProdSchema>;
export type AddWasteRequirementInput = z.infer<typeof wasteRequirementSchema>;
