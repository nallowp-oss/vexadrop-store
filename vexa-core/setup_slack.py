import os
import logging
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from dotenv import load_dotenv

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load config
load_dotenv()
SLACK_BOT_TOKEN = os.environ.get("SLACK_BOT_TOKEN")

def setup_vexa_channels():
    if not SLACK_BOT_TOKEN:
        print("❌ Error: SLACK_BOT_TOKEN not found in .env")
        return

    client = WebClient(token=SLACK_BOT_TOKEN)
    
    # List of channels to create
    channels = [
        "vexa-payments",
        "vexa-orders",
        "vexa-product-launches",
        "vexa-social-approvals",
        "vexa-system-alerts"
    ]
    
    print("Starting VexaDrop Slack Channels setup...")
    
    for channel_name in channels:
        try:
            # Create channel
            response = client.conversations_create(name=channel_name)
            channel_id = response["channel"]["id"]
            print(f"OK: Created channel: #{channel_name} (ID: {channel_id})")
            
            # Set purpose
            client.conversations_setPurpose(
                channel=channel_id,
                purpose=f"VexaDrop Automated {channel_name.replace('vexa-', '').replace('-', ' ').title()} Stream"
            )
            
            # Post welcome message
            client.chat_postMessage(
                channel=channel_id,
                text=f"Vexa Intelligence Layer now streaming to #{channel_name}.\nSystem Active · Tier 1 CEO Access Only"
            )
            
        except SlackApiError as e:
            if e.response["error"] == "name_taken":
                print(f"Info: Channel #{channel_name} already exists.")
            else:
                print(f"Error creating #{channel_name}: {e.response['error']}")

if __name__ == "__main__":
    setup_vexa_channels()
