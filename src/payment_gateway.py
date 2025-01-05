"""
Payment Gateway Module
This module handles payment processing.
"""

import requests

class PaymentGateway:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.paymentgateway.com"

    def process_payment(self, amount, currency, payment_method):
        # Logic to process payment
        response = requests.post(f"{self.base_url}/payments", json={
            "amount": amount,
            "currency": currency,
            "payment_method": payment_method,
            "api_key": self.api_key
        })
        return response.json()

    def get_transaction_history(self, user_id):
        # Logic to get transaction history
        pass
