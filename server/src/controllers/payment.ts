import { Request, Response } from 'express'
import stripe from 'stripe'

const stripeInstance = new stripe(process.env.STRIPE_SECRET!)

export const checkout = async (req: Request, res: Response) => {
  try {
    const { products } = req.body
    const lineItems = products.map((product: { name: any; image: any; price: number; quantity: any }) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }))

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/paymentSuccessful',
      cancel_url: 'http://localhost:5173/paymentFailed',
    })
    return res.json({ id: session.id })
  } catch (e) {
    console.log(e)
    return res.json("Internal Server Error");
  }
}