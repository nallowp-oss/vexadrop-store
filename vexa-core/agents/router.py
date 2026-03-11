import json
import logging
import sys
import os

# Ensure core is accessible
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from core.llm_router import LLMRouter

logger = logging.getLogger("VexaRouter")

class VexaRouter:
    def __init__(self):
        self.client = LLMRouter()
        self.intents = {
            "PRODUCT_RECOMMENDATION": "The user is asking for product advice or checking the collection.",
            "INVENTORY_REPORT": "The user wants to see current stock levels or inventory status.",
            "SOURCING_SCAN": "The user wants to find new products, trends, or perform a scan.",
            "SYSTEM_STATUS": "The user is checking if the bots/system are operational.",
            "TECHNICAL_TASK": "The user is giving a complex instruction, code task, or architectural request.",
            "GREETING": "The user is just saying hello or socializing.",
            "MARKETING_CAMPAIGN": "The user wants to generate marketing content, viral social media copy, or check trends.",
            "LEGAL_COMPLIANCE": "The user is asking about laws, eCommerce compliance, FTC, GDPR, customs, or restrictions."
        }

    def classify_intent(self, user_query: str) -> str:
        """
        Uses a fast LLM pass to classify the user's intent with LOW complexity routing.
        """
        # Simple heuristic for common commands to save LLM tokens/time
        query_lower = user_query.lower()
        if any(w in query_lower for w in ["stock", "inventory", "how many"]):
            return "INVENTORY_REPORT"
        if any(w in query_lower for w in ["scan", "source", "new products", "trends"]):
            return "SOURCING_SCAN"
        if any(w in query_lower for w in ["status", "health", "running"]):
            return "SYSTEM_STATUS"
        if any(w in query_lower for w in ["market", "campaign", "social media", "tiktok", "instagram"]):
            return "MARKETING_CAMPAIGN"
        if any(w in query_lower for w in ["legal", "law", "compliance", "ftc", "gdpr", "customs", "regulation"]):
            return "LEGAL_COMPLIANCE"

        prompt = f"""
        Classify the following user query for an AI Store Assistant.
        Available Intents:
        {json.dumps(self.intents, indent=2)}

        USER QUERY: "{user_query}"

        Return ONLY the intent name (e.g., PRODUCT_RECOMMENDATION). No other text.
        """

        try:
            # Use LOW complexity for classification (GPT-4o-mini via orchestrate)
            intent = self.client.orchestrate(prompt).strip().upper()
            
            # Validation
            if intent in self.intents:
                return intent
            # Try to extract the intent if the model was verbose
            for key in self.intents.keys():
                if key in intent:
                    return key
                    
            return "TECHNICAL_TASK" if "TECHNICAL" in intent else "PRODUCT_RECOMMENDATION"
            
        except Exception as e:
            logger.error("Router classification error: %s", e)
            return "PRODUCT_RECOMMENDATION"

if __name__ == "__main__":
    router = VexaRouter()
    print(f"Intent 1: {router.classify_intent('How is our stock looking?')}")
    print(f"Intent 2: {router.classify_intent('I need to optimize AI tokens.')}")
    print(f"Intent 3: {router.classify_intent('What is the best headset for focus?')}")
