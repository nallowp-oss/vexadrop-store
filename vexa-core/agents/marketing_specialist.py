import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from core.llm_router import LLMRouter

class MarketingSpecialist:
    def __init__(self):
        self.client = LLMRouter()
        self.persona = """
        You are the VexaDrop Marketing Specialist (Tier 3).
        Your mission is to generate viral, high-converting copy and identify emerging lifestyle trends.
        Your tone is premium, aspirational, bold, and optimized for social media (TikTok, Instagram).
        Use dark mode / #0F172A branding themes.
        """

    def generate_campaign(self, product_name: str, target_audience: str) -> str:
        """
        Generates a premium marketing campaign.
        """
        prompt = f"Create a viral social media campaign for a product called '{product_name}'. Target audience: {target_audience}. Include hooks, main copy, and 3 hashtags."
        return self.client.write_marketing(prompt, system_prompt=self.persona)
        
    def scan_trends(self) -> str:
        prompt = "Identify 3 emerging lifestyle or tech trends in 2026 that fit a premium, minimalist 'dark glassmorphism' brand aesthetic."
        return self.client.write_marketing(prompt, system_prompt=self.persona)

if __name__ == "__main__":
    agent = MarketingSpecialist()
    print(agent.generate_campaign("QuantumPad Pro 14", "Gen Z Tech Enthusiasts"))
