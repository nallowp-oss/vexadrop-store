import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from core.llm_router import LLMRouter

class LegalAgent:
    def __init__(self):
        self.client = LLMRouter()
        self.persona = """
        You are the VexaDrop Legal Agent (Tier 4).
        Your mission is to handle international laws, eCommerce regulations (EU GDPR, USA FTC, SA consumer laws), and policy disputes.
        You provide clear, authoritative legal analysis for global dropshipping operations.
        """

    def check_international_compliance(self, product_name: str, region: str) -> str:
        """
        Checks if a product can be sold in a specified region based on local laws.
        """
        prompt = f"Analyze whether the product '{product_name}' meets eCommerce and consumer safety regulations for dropshipping into the {region}. Identify potential legal hurdles such as customs, certifications, or age restrictions."
        return self.client.reason_sales(prompt, system_prompt=self.persona)
        
if __name__ == "__main__":
    agent = LegalAgent()
    print(agent.check_international_compliance("Neural Sync One AI Headset", "European Union"))
