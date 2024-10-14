import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements } from '@stripe/react-stripe-js';
import './Payment.css';

const stripePromise = loadStripe('pk_test_51Q8QNCLN3ffFuuHqn6d2dJFhlLG70aqXBjFWNxtUVDSn3oZPfQjehWtZbanTif8XKTRvMJ99nIfH6i14TFsw9jgk00f3Uds5qY');

const Payment = () => {
    const location = useLocation();
    const { amount, cardTitle } = location.state || {};
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const makePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const stripe = await stripePromise;
        const amountInCents = Math.round(amount * 100); 

        try {
            const response = await fetch('http://localhost:4000/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: amountInCents, email }),
            });

            console.log('Response Status:', response.status);
            const responseText = await response.text();
            console.log('Response Body:', responseText); 

            if (!response.ok) {
                throw new Error(responseText || 'Something went wrong.');
            }

            const session = JSON.parse(responseText);

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                setError(result.error.message);
            }
        } catch (error) {
            console.error('Payment error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payment-container">
            <h2>Payment Details for {cardTitle}</h2>
            <form className="payment-form" onSubmit={makePayment}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="example@gmail.com"
                        required
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>

                <CardElement />

                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="text" id="amount" value={amount ? amount.toFixed(2) : ''} readOnly />
                </div>

                {error && <div className="error-message">{error}</div>}
                <button type="submit" className="pay-button" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </form>
        </div>
    );
};

const WrappedPayment = () => (
    <Elements stripe={stripePromise}>
        <Payment />
    </Elements>
);

export default WrappedPayment;

