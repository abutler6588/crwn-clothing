import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HGihFBE8FhuO1cga465bhvCmODDcI40vw3IQpFoUTm84hltcbMPubhqDBIJ3zndDlAAbdU8eMYKoO0lT2w6ZTn100FABgcSG0'

    const onToken = token => {
       axios({
           url: 'payment',
           method: 'post',
           data: {
               amount: priceForStripe,
               token
           }
       }).then(response => {
           alert('Payment successful');
       }).catch(error => {
           console.log('Payment Error: ', JSON.parse(error));
           alert(
               'There was an issue with your payment. Please be sure you use the provided credit card.'
           );
       });
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='BUTLER Clothing LLC.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;