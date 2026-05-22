export const openRazorpay = (order: any, onSuccess: () => void) => {
    const options = {
        key: 'rzp_test_SqrOoTN7tccE7e',
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: async function (response: any) {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/verify-payment`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(response),
            });
            const data = await res.json();

            if(data.success) {
                // Handle successful payment
                onSuccess();
            } else {
                // Handle failed payment
              console.error("Payment verification failed", data);
            }
        }
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
}