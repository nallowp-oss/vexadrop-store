import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from core.llm_router import LLMRouter

class ComplianceOfficer:
    def __init__(self):
        self.client = LLMRouter()
        self.persona = """
        You are the VexaDrop Compliance Officer (Tier 4).
        Your mission is to ensure all marketing copy and product descriptions adhere to data privacy laws, advertising standards, and platform terms of service.
        You review text and correct any misleading claims or missing disclosures.
        """

    def review_marketing_copy(self, copy_text: str) -> str:
        """
        Reviews copy for compliance issues.
        """
        prompt = f"Review the following marketing copy for compliance with data privacy laws and FTC advertising standards. Note any required disclosures, fix misleading claims, and return the compliant copy.\n\nCOPY:\n{copy_text}"
        return self.client.reason_sales(prompt, system_prompt=self.persona)
        
if __name__ == "__main__":
    agent = ComplianceOfficer()
    print(agent.review_marketing_copy("This brain chip cures all diseases and guarantees 100% focus forever."))
