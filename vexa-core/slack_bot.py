"""
VexaDrop Slack Bot — Mobile Command Layer
=========================================
CEO (Rinaldo) communicates with VexaDrop AI agents from Slack on mobile.

Supported interactions:
  - DM / any message  → Vexa Concierge responds with product intelligence
  - /inventory        → Inventory Manager generates a real-time stock report
  - /source           → Sourcer Agent scans for new trending products
  - /status           → System health check across all Vexa-Core services

Setup:
  1. pip install slack-bolt python-dotenv
  2. Set SLACK_BOT_TOKEN, SLACK_APP_TOKEN in a .env file (or export them)
  3. python slack_bot.py
"""

import os
import sys
import logging
from dotenv import load_dotenv

# ── Add vexa-core root to path so agents & store can be imported ──────────────
BOT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BOT_DIR)

from slack_bolt import App
from slack_bolt.adapter.socket_mode import SocketModeHandler

from agents.concierge import VexaConcierge
from agents.inventory_manager import InventoryManager
from agents.sourcer import VexaSourcer
from agents.router import VexaRouter
from store import database

# ── Config ────────────────────────────────────────────────────────────────────
load_dotenv()

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("VexaBot")

SLACK_BOT_TOKEN = os.environ.get("SLACK_BOT_TOKEN")
SLACK_APP_TOKEN = os.environ.get("SLACK_APP_TOKEN")

# ── Initialise Bolt App ────────────────────────────────────────────────────────
app = App(token=SLACK_BOT_TOKEN)

# ── Agents (initialised once, shared across events) ───────────────────────────
concierge       = VexaConcierge()
inventory_mgr   = InventoryManager()
sourcer         = VexaSourcer()
router          = VexaRouter()


# ── Helper: loading message ───────────────────────────────────────────────────
def _thinking_message(say, text: str = "⏳ *Vexa is processing your request...*"):
    say(text)


# ── /inventory — Stock report ─────────────────────────────────────────────────
@app.command("/inventory")
def handle_inventory(ack, say, command):
    ack()
    logger.info("Inventory report requested by %s", command.get("user_name"))
    _thinking_message(say, "📦 *Pulling live inventory from Vexa-Core...*")

    try:
        database.init_db()
        inv_data = database.get_inventory()
        report   = inventory_mgr.generate_stock_report(inv_data)

        say(f"```{report}```")

    except Exception as e:
        logger.error("Inventory error: %s", e)
        say(f"⚠️ *Vexa Inventory Link Error:* `{e}`\nCheck that vexa-core is running.")


# ── /source — Trigger sourcing scan ──────────────────────────────────────────
@app.command("/source")
def handle_source(ack, say, command):
    ack()
    logger.info("Sourcing scan triggered by %s", command.get("user_name"))
    say("🔍 *Vexa Sourcer is scanning global trend signals...*")

    try:
        opportunities = sourcer.scan_for_opportunities()
        result        = sourcer.add_to_inventory_proposal(opportunities)

        blocks = [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"*🛍️ Sourcing Scan Complete*\n{result}",
                },
            },
        ]

        if opportunities:
            items_text = "\n".join(
                f"• *{o['name']}* — {o.get('category', 'General')} · ${o.get('price', '?')}"
                for o in opportunities
            )
            blocks.append(
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": f"*New Opportunities Identified:*\n{items_text}",
                    },
                }
            )

        say(blocks=blocks)

    except Exception as e:
        logger.error("Sourcer error: %s", e)
        say(f"⚠️ *Sourcer Error:* `{e}`")


# ── /status — System health ────────────────────────────────────────────────────
@app.command("/status-check")
def handle_status(ack, say, command):
    ack()
    logger.info("Status check by %s", command.get("user_name"))

    checks = {}

    # DB ping
    try:
        database.init_db()
        database.get_all_products()
        checks["Vexa-Core DB"]  = "🟢 Operational"
    except Exception as e:
        checks["Vexa-Core DB"]  = f"🔴 Error — {e}"

    # Inventory Manager
    try:
        inventory_mgr.generate_stock_report([])
        checks["Inventory Agent"] = "🟢 Operational"
    except Exception as e:
        checks["Inventory Agent"] = f"🔴 Error — {e}"

    # Sourcer
    try:
        sourcer.scan_for_opportunities()
        checks["Sourcer Agent"] = "🟢 Operational"
    except Exception as e:
        checks["Sourcer Agent"] = f"🔴 Error — {e}"

    # Concierge (no LLM call, just init check)
    checks["Concierge (Vexa)"] = "🟢 Standby — Requires local Ollama"

    lines = "\n".join(f"*{k}:* {v}" for k, v in checks.items())
    say(
        blocks=[
            {
                "type": "header",
                "text": {"type": "plain_text", "text": "⚡ Vexa-Core System Status"},
            },
            {
                "type": "section",
                "text": {"type": "mrkdwn", "text": lines},
            },
            {
                "type": "context",
                "elements": [
                    {"type": "mrkdwn", "text": "VexaDrop Intelligence Layer · March 2026"}
                ],
            },
        ]
    )


# ── DM / Mention → Concierge ──────────────────────────────────────────────────
@app.event("message")
def handle_message(event, say, logger):
    """
    Catch all direct messages (and messages in channels where the bot is added).
    Bot messages are ignored to prevent echo loops.
    """
    # Ignore bot messages to prevent echo loops
    if event.get("bot_id") or event.get("subtype") == "bot_message":
        return

    user_text = event.get("text", "").strip()
    user_id   = event.get("user", "CEO")

    if not user_text:
        return

    logger.info("Message from %s: %s", user_id, user_text)
    
    # ── Intent Classification ──
    intent = router.classify_intent(user_text)
    logger.info("Detected Intent: %s", intent)

    # ── Route to specialized handlers ──
    if intent == "INVENTORY_REPORT":
        handle_inventory(ack=lambda: None, say=say, command={"user_name": user_id})
        return
    elif intent == "SOURCING_SCAN":
        handle_source(ack=lambda: None, say=say, command={"user_name": user_id})
        return
    elif intent == "SYSTEM_STATUS":
        handle_status(ack=lambda: None, say=say, command={"user_name": user_id})
        return
    elif intent == "GREETING":
        say("👋 *Vexa online.* How can I assist your high-performance lifestyle today?")
        return

    # ── Default: Concierge (Inquiry or Technical Task) ──
    say(f"✨ *Vexa is analysing your query ({intent})...*")

    try:
        database.init_db()
        products = []
        if intent == "PRODUCT_RECOMMENDATION":
            prods = database.get_all_products()
            products = [p.dict() for p in prods] if prods else []
        
        # concierge.get_recommendation now handles both product and technical logic
        response = concierge.get_recommendation(user_text, products if products else None)

        say(
            blocks=[
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": f"*🤖 Vexa Command Mode*\n\n{response}",
                    },
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "mrkdwn",
                            "text": "Intelligent Intent Routing Active · `/inventory` · `/source` · `/status-check`",
                        }
                    ],
                },
            ]
        )

    except Exception as e:
        logger.error("Concierge error: %s", e)
        say(
            f"⚠️ *Concierge Link Unstable:* `{e}`\n"
            "Ensure Ollama is running locally: `ollama serve`"
        )


# ── Interactive Approvals UI & Handlers ──────────────────────────────────────
def send_approval_request(client, channel_id: str, request_id: str, title: str, details: str):
    """Sends an interactive Block Kit message with Approve/Reject buttons."""
    blocks = [
        {
            "type": "header",
            "text": {"type": "plain_text", "text": f"🔔 Action Required: {title}"}
        },
        {
            "type": "section",
            "text": {"type": "mrkdwn", "text": details}
        },
        {
            "type": "actions",
            "block_id": f"approval_block_{request_id}",
            "elements": [
                {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "✅ Approve"},
                    "style": "primary",
                    "action_id": "approve_action",
                    "value": request_id
                },
                {
                    "type": "button",
                    "text": {"type": "plain_text", "text": "❌ Reject"},
                    "style": "danger",
                    "action_id": "reject_action",
                    "value": request_id
                }
            ]
        }
    ]
    try:
        client.chat_postMessage(channel=channel_id, blocks=blocks, text=f"Approval needed for: {title}")
        logger.info(f"Sent approval request for {request_id} to {channel_id}")
    except Exception as e:
        logger.error(f"Error posting approval request: {e}")

@app.action("approve_action")
def handle_approve(ack, body, client, logger):
    ack()
    user_id = body["user"]["id"]
    request_id = body["actions"][0]["value"]
    logger.info(f"User {user_id} approved request {request_id}")
    
    # Update the message to remove buttons and show approved status
    client.chat_update(
        channel=body["channel"]["id"],
        ts=body["message"]["ts"],
        blocks=[
            {
                "type": "section",
                "text": {"type": "mrkdwn", "text": f"✅ *Approved* by <@{user_id}>\n_Request ID: {request_id}_"}
            }
        ],
        text="Request Approved"
    )

@app.action("reject_action")
def handle_reject(ack, body, client, logger):
    ack()
    user_id = body["user"]["id"]
    request_id = body["actions"][0]["value"]
    logger.info(f"User {user_id} rejected request {request_id}")
    
    # Update the message to remove buttons and show rejected status
    client.chat_update(
        channel=body["channel"]["id"],
        ts=body["message"]["ts"],
        blocks=[
            {
                "type": "section",
                "text": {"type": "mrkdwn", "text": f"❌ *Rejected* by <@{user_id}>\n_Request ID: {request_id}_"}
            }
        ],
        text="Request Rejected"
    )

# ── App Mention (@VexaBot in a channel) ──────────────────────────────────────
@app.event("app_mention")
def handle_mention(event, say):
    """Strip the bot mention and route to concierge."""
    raw_text  = event.get("text", "")
    # remove the <@BOTID> prefix
    user_text = " ".join(raw_text.split()[1:]).strip()

    if not user_text:
        say("👋 *Vexa online.* Ask me anything about the collection, or use `/inventory`, `/source`, `/status`.")
        return

    handle_message(event={"text": user_text, "user": event.get("user")}, say=say, logger=logger)


# ── Entry point ────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    logger.info("🚀 VexaDrop Slack Bot starting — Socket Mode active")
    database.init_db()
    logger.info("✅ Vexa-Core DB initialised")

    handler = SocketModeHandler(app, SLACK_APP_TOKEN)
    handler.start()
