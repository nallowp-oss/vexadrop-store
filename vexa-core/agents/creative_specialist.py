import os
import json
from typing import Optional
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from core.llm_router import LLMRouter

class CreativeSpecialist:
    def __init__(self, output_dir: str = "public/assets"):
        self.output_dir = output_dir
        self.background_color = "#F8F8F8"
        self.client = LLMRouter()

    def process_product_image(self, image_path: str, product_name: str) -> dict:
        """
        Uses Marketing/Visual LLM reasoning to generate premium image prompts.
        """
        results = {
            "original": image_path,
            "transformed": None,
            "lifestyle": None,
            "status": "pending"
        }

        system_prompt = "You are the VexaDrop Creative Art Director. Your goal is to generate prompt strings for an AI image generator to create hyper-premium eCommerce assets."
        
        prompt = f"Product Name: {product_name}\nBackground Color: {self.background_color}\n\nTask 1: Generate a prompt for a minimalist, center-aligned studio shot.\nTask 2: Generate a prompt for a cinematic lifestyle shot.\n\nReturn ONLY a JSON dictionary with keys 'transformed_prompt' and 'lifestyle_prompt'. Nothing else."
        
        # Use high tier marketing model for visually descriptive prompts
        response = self.client.write_marketing(prompt, system_prompt=system_prompt)
        
        try:
            # Attempt to parse json from marketing model
            import re
            json_match = re.search(r'\{.*\}', response.replace('\n', ''), re.DOTALL)
            parsed = json.loads(json_match.group(0) if json_match else response)
            results["transformed_prompt"] = parsed.get("transformed_prompt", "")
            results["lifestyle_prompt"] = parsed.get("lifestyle_prompt", "")
        except:
            # Fallback if malformed
            results["transformed_prompt"] = f"A professional studio shot of {product_name}, minimalist design, center-aligned, on a solid {self.background_color} background, soft natural drop shadow, 8k resolution, premium e-commerce style."
            results["lifestyle_prompt"] = f"A stylish person using a {product_name} while relaxing on a modern minimalist sofa in a bright, high-end living room, cinematic lighting, 8k resolution, lifestyle photography."

        results["status"] = "prompts_ready"
        return results

if __name__ == "__main__":
    # Test
    specialist = CreativeSpecialist()
    print(json.dumps(specialist.process_product_image("mock_supplier_img.jpg", "Neural Sync One"), indent=2))
