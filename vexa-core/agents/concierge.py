import json
from typing import Optional
import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from core.llm_router import LLMRouter

class VexaConcierge:
    def __init__(self):
        self.client = LLMRouter()
        self.persona = """
        You are 'Vexa', the elite AI commander for VexaDrop Store.
        Your tone is sophisticated, futuristic, and highly knowledgeable about 2026 AI lifestyle trends.
        You treat high-performance technology as art.
        
        MISSION:
        - Guide users through the VexaDrop collection.
        - Recommend products based on their "performance profile".
        - Execute technical commands and system optimizations.
        - Maintain a premium, helpful, and slightly mysterious AI persona.
        - Be concise but impactful.
        """

    def get_recommendation(self, user_query: str, product_data: Optional[list] = None) -> str:
        """
        Routes to fast inference for products, or high reasoning for complex tasks.
        """
        if product_data:
            json_products = json.dumps(product_data, indent=2)
            prompt = f"AVAILABLE PRODUCTS:\n{json_products}\n\nUSER QUERY: \"{user_query}\"\n\nProvide a premium, Vexa-styled response."
            # Use marketing model for product pitches
            return self.client.write_marketing(prompt, system_prompt=self.persona)
        else:
            prompt = f"USER REQUEST: \"{user_query}\"\n\nProvide a high-reasoning, technical solution or response."
            # Use advanced reasoning model for technical tasks
            return self.client.reason_sales(prompt, system_prompt=self.persona, complex_decision=True)

if __name__ == "__main__":
    # Local Test
    concierge = VexaConcierge()
    mock_products = [{"name": "Neural Sync One", "description": "AI Headset"}]
    print(concierge.get_recommendation("I need to boost my focus during deep work.", mock_products))
