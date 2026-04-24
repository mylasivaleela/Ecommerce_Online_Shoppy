export const openRazorpay = (order: any, onSuccess: () => void) => {
    const options = {
        key: 'rzp_test_SgXQUesiaXyA4r',
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        handler: async function (response: any) {
            const res = await fetch("http://localhost:3001/api/verify-payment", {
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
                alert("Payment failed ❌");
            }
        }
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
}