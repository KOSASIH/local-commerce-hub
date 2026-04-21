// routes/payments.js
app.post('/api/pay-with-pi', async (req, res) => {
  try {
    const hub = new PiMerchantHub();
    const result = await hub.processPiPayment(req.body.amount, req.body.wallet);
    res.json({ success: true, txId: result.txId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
