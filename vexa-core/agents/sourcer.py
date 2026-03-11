import json
import sys
from typing import List
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from core.llm_router import LLMRouter

class VexaSourcer:
    def __init__(self, trends_file: str = "tiktok_analysis.md"):
        self.trends_file = trends_file
        self.products_file = os.path.join(os.path.dirname(__file__), "..", "store", "products.json")
        self.client = LLMRouter()

    def scan_for_opportunities(self) -> List[dict]:
        """
        Uses LLM Reasoning to discover new opportunities from trend files or raw data.
        """
        # Read trends file if it exists, otherwise use fallback data
        trends_data = "Trending in SA: High-performance grooming and biotech skincare are up 50% this month."
        trends_path = os.path.join(os.path.dirname(__file__), '..', '..', self.trends_file)
        if os.path.exists(trends_path):
            with open(trends_path, 'r') as f:
                trends_data = f.read()

        system_prompt = "You are the VexaDrop Sourcing Agent. You find hyper-premium, futuristic products based on trend data. Respond ONLY with a valid JSON array of product objects containing: name, description, price, category, tags (list), image_url. Do not use Markdown block formatting."
        
        prompt = f"TREND DATA:\n{trends_data}\n\nPropose 1 new trending product opportunity to add to the store inventory."
        
        # Use deep reasoning tier for sourcing decisions
        response = self.client.reason_sales(prompt, system_prompt=system_prompt, complex_decision=True)
        
        try:
            import re
            json_match = re.search(r'\[.*\]', response.replace('\n', ''), re.DOTALL)
            parsed = json.loads(json_match.group(0) if json_match else response)
            return parsed
        except Exception as e:
            # Fallback if parsing fails
            return [{
                "name": "Aura Silk Conditioner",
                "description": "Premium bio-active hair treatment inspired by the 50% growth in SA grooming trends.",
                "price": 35.00,
                "category": "Personal Care",
                "tags": ["SA-Trend", "Grooming", "Lifestyle"],
                "image_url": "/assets/aura-mesh.png"
            }]

    def add_to_inventory_proposal(self, opportunities: List[dict]):
        if not os.path.exists(self.products_file):
            return "Error: products.json not found."

        with open(self.products_file, "r") as f:
            products = json.load(f)

        existing_names = [p['name'] for p in products]
        added = 0
        for opp in opportunities:
            if opp['name'] not in existing_names:
                products.append(opp)
                added += 1

        with open(self.products_file, "w") as f:
            json.dump(products, f, indent=4)

        return f"Successfully added {added} new products to sourcing proposal."

if __name__ == "__main__":
    sourcer = VexaSourcer()
    opps = sourcer.scan_for_opportunities()
    print(sourcer.add_to_inventory_proposal(opps))
