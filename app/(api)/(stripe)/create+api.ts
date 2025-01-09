import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (request: Request) => {
    const body = await request.json();

    const { name, email, amount } = body;

    if (!name || !email || !amount) {
        return new Response('Missing required information', { status: 400 });
    }

    let customer;

    const doesCustomerExist = await stripe.customers.list({
        email: email,
    });

    if (doesCustomerExist.data.length === 0) {
        const newCustomer = await stripe.customers.create({
            name,
            email,
        });
        customer = newCustomer;
    } else {
        customer = doesCustomerExist.data[0];
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2020-08-27' }
    );

    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount) * 100,
        currency: 'usd',
        customer: customer.id,
        automatic_payment_methods: {
            enabled: true,
            allow_redirects: 'never',
        },
    });

    return Response.json({
        ephemeralKey: ephemeralKey,
        customer: customer.id,
        paymentIntent: paymentIntent,
    });
};