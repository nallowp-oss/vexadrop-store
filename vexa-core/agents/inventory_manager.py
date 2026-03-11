from datetime import datetime
import json
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from core.llm_router import LLMRouter

class InventoryManager:
    def __init__(self, store_name: str = "VexaDrop"):
        self.store_name = store_name
        self.client = LLMRouter()

    def generate_stock_report(self, inventory_data: list) -> str:
        """Analyzes inventory and generates a concise, AI-driven status report."""
        low_stock = [item for item in inventory_data if item['stock_count'] < 5]
        total_items = sum(item['stock_count'] for item in inventory_data)
        
        system_prompt = f"You are the Inventory Manager for {self.store_name}. Provide a concise, high-tech, futuristic stock report based on the raw data."
        prompt = f"Total Assets: {total_items}\nLow Stock Items ({len(low_stock)}): {json.dumps(low_stock)}\nGenerate a short professional report."
        
        # Use fast, cheap orchestration model for summarization
        return self.client.orchestrate(prompt, system_prompt=system_prompt)

if __name__ == "__main__":
    # Test
    manager = InventoryManager()
    mock_inv = [{"name": "Vexa Core", "stock_count": 2}, {"name": "Omni Pods", "stock_count": 50}]
    print(manager.generate_stock_report(mock_inv))
