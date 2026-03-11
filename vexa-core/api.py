from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from store import models, database
from agents.concierge import VexaConcierge
from agents.inventory_manager import InventoryManager
from agents.sourcer import VexaSourcer
from agents.creative_specialist import CreativeSpecialist
from agents.cyber_security import CyberSecuritySpecialist
from agents.marketing_specialist import MarketingSpecialist
from agents.legal_agent import LegalAgent
from agents.compliance_officer import ComplianceOfficer
import json
import os
import uuid
from slack_bot import send_approval_request, app as slack_app
import logging

from pydantic import BaseModel

app = FastAPI(title="VexaDrop Store API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CreativeRequest(BaseModel):
    image_path: str
    product_name: str

class ApprovalRequest(BaseModel):
    channel_id: str = "C08EACH994Z"

logger = logging.getLogger("VexaAPI")

# Initialize DB on startup
@app.on_event("startup")
def startup_event():
    database.init_db()
    # Seed data if empty
    if not database.get_all_products():
        seed_path = os.path.join(os.path.dirname(__file__), "store", "products.json")
        if os.path.exists(seed_path):
            with open(seed_path, "r") as f:
                seed_data = json.load(f)
                for p_data in seed_data:
                    p = models.Product(**p_data)
                    pid = database.add_product(p)
                    database.update_stock(pid, 10) # Seed with some stock

@app.get("/products", response_model=List[models.Product])
def list_products():
    return database.get_all_products()

@app.get("/inventory")
def get_inventory():
    return database.get_inventory()

@app.post("/stock/{product_id}")
def update_stock(product_id: int, count: int):
    database.update_stock(product_id, count)
    return {"status": "success", "message": f"Stock updated for product {product_id}"}

@app.get("/health")
def health_check():
    return {"status": "operational", "system": "Vexa-Core"}

class ChatRequest(BaseModel):
    query: str

@app.post("/chat")
def chat_with_vexa(req: ChatRequest):
    security = CyberSecuritySpecialist()
    sec_scan = security.scan_input(req.query)
    if not sec_scan.get("safe", True):
        return {"intent": "SECURITY_BLOCK", "response": f"Input rejected by Tier 3 Security: {sec_scan.get('analysis')}"}

    from agents.router import VexaRouter
    router = VexaRouter()
    intent = router.classify_intent(req.query)
    
    if intent == "PRODUCT_RECOMMENDATION":
        concierge = VexaConcierge()
        products = database.get_all_products()
        response = concierge.get_recommendation(req.query, [p.dict() for p in products])
        return {"intent": intent, "response": response}
        
    elif intent == "INVENTORY_REPORT":
        manager = InventoryManager()
        inv_data = database.get_inventory()
        report = manager.generate_stock_report(inv_data)
        return {"intent": intent, "response": report}
        
    elif intent == "SOURCING_SCAN":
        sourcer = VexaSourcer()
        opps = sourcer.scan_for_opportunities()
        response = sourcer.add_to_inventory_proposal(opps)
        return {"intent": intent, "response": response}
        
    elif intent == "SYSTEM_STATUS":
        return {"intent": intent, "response": "Vexa-Core and all Agentic subsystems are operational."}
        
    elif intent == "TECHNICAL_TASK":
        concierge = VexaConcierge()
        response = concierge.get_recommendation(req.query)
        return {"intent": intent, "response": response}
        
    elif intent == "MARKETING_CAMPAIGN":
        marketer = MarketingSpecialist()
        prompt = f"USER REQUEST: \"{req.query}\"\nProvide your marketing expertise or a campaign draft based on this request."
        response = marketer.client.write_marketing(prompt, system_prompt=marketer.persona)
        
        compliance = ComplianceOfficer()
        try:
             review = compliance.review_marketing_copy(response)
        except Exception:
             review = "Compliance review unavailable."
             
        return {"intent": intent, "response": response, "compliance_review": review}
        
    elif intent == "LEGAL_COMPLIANCE":
        legal = LegalAgent()
        prompt = f"USER REQUEST: \"{req.query}\"\nProvide your legal expertise based on this request."
        response = legal.client.reason_sales(prompt, system_prompt=legal.persona)
        return {"intent": intent, "response": response}
        
    else: # GREETING or Unknown
        return {"intent": intent, "response": "Hello. I am Vexa, the AI architect of this store. How may I assist your lifestyle augmentation today?"}

@app.get("/agent/concierge/recommend")
def recommend_product(query: str):
    concierge = VexaConcierge()
    products = database.get_all_products()
    recommendation = concierge.get_recommendation(query, [p.dict() for p in products])
    return {"recommendation": recommendation}

@app.get("/agent/inventory/report")
def get_inventory_report():
    manager = InventoryManager()
    inv_data = database.get_inventory()
    report = manager.generate_stock_report(inv_data)
    return {"report": report}

@app.post("/agent/sourcer/scan")
def trigger_sourcing_scan():
    sourcer = VexaSourcer()
    opps = sourcer.scan_for_opportunities()
    status = sourcer.add_to_inventory_proposal(opps)
    return {"status": "success", "message": status}

@app.post("/agent/creative/transform")
def transform_product_assets(req: CreativeRequest):
    specialist = CreativeSpecialist()
    results = specialist.process_product_image(req.image_path, req.product_name)
    return {"status": "success", "results": results}

# ── Slack Interactive Mock Triggers ──────────────────────────────────────────

@app.post("/trigger/social_post")
def trigger_social_approval(req: ApprovalRequest):
    """Simulates an agent proposing a social media post and requesting approval."""
    channel_id = req.channel_id
    request_id = f"social_{uuid.uuid4().hex[:8]}"
    title = "New Viral TikTok Post Draft"
    details = f"The Creative Specialist has generated a new campaign for *Aura Silk Conditioner*.\n\n*Caption:* `Unlock the glow. \u2728 #VexaDrop #AuraSilk`\n*Target Audience:* SA Grooming Trends"
    
    try:
        send_approval_request(slack_app.client, channel_id, request_id, title, details)
        return {"status": "success", "message": f"Approval request {request_id} sent to {channel_id}"}
    except Exception as e:
        logger.error(f"Failed to send approval via Slack App: {e}")
        return {"status": "error", "message": str(e)}

@app.post("/trigger/payment")
def trigger_payment_approval(req: ApprovalRequest):
    """Simulates a payment request requiring CEO approval."""
    channel_id = req.channel_id
    request_id = f"pay_{uuid.uuid4().hex[:8]}"
    title = "Supplier Invoice - Aura Silk Batch 2"
    details = f"*Amount:* $3,500.00\n*Supplier:* BioActive Labs Inc.\n*Due Date:* Immediate"
    
    try:
        send_approval_request(slack_app.client, channel_id, request_id, title, details)
        return {"status": "success", "message": f"Payment request {request_id} sent to {channel_id}"}
    except Exception as e:
        logger.error(f"Failed to send payment approval via Slack App: {e}")
        return {"status": "error", "message": str(e)}
