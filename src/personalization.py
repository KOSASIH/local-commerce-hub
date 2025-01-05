"""
Personalization Module
This module implements machine learning for user personalization.
"""

from sklearn.neighbors import NearestNeighbors
import numpy as np

class Personalization:
    def __init__(self, user_data):
        self.user_data = np.array(user_data)

    def recommend_products(self, user_id):
        model = NearestNeighbors(n_neighbors=5)
        model.fit(self.user_data)
        distances, indices = model.kneighbors(self.user_data[user_id].reshape(1, -1))
        return indices.flatten().tolist()  # Recommended product IDs
