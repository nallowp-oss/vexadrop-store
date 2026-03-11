import os
import requests

# --- VEXADROP CORE CONFIGURATION ---
# Authorized CEO Key for OpenRouter Access
API_KEY = "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"
API_URL = "https://openrouter.ai/api/v1/chat/completions"

def get_agent_response(prompt, model_id):
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://antigravity.ai", 
        "X-Title": "VexaDrop CEO Terminal"
    }
    payload = {
        "model": model_id,
        "messages": [{"role": "user", "content": prompt}]
    }
    try:
        # Increased timeout to 45s to handle peak-hour congestion
        response = requests.post(API_URL, headers=headers, json=payload, timeout=45)
        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content']
        # Log the specific error for diagnostic purposes
        return f"SKIP_ERR_{response.status_code}"
    except Exception as e:
        return f"SKIP_ERR_CONNECTION"

def route_request_to_best_model(prompt):
    # --- DYNAMIC PRIORITY QUEUE ---
    # We lead with 'openrouter/free' which automatically finds the least busy model.
    model_queue = [
        "openrouter/free", 
        "google/gemini-2.0-flash-lite-preview-02-05:free",
        "mistralai/mistral-small-24b-instruct-2501:free",
        "meta-llama/llama-3.1-8b-instruct:free"
    ]
    
    for model in model_queue:
        print(f"CEO DEBUG: Connection attempt -> {model}")
        result = get_agent_response(prompt, model)
        
        if not result.startswith("SKIP_ERR"):
            return result
        
        # If we hit a 429 (Rate Limit) or 400 (Bad Model), we skip to next
        print(f"CEO WARNING: {model} is currently congested or restricted. Rerouting...")

    return "CRITICAL: All fallback channels are currently congested or daily quota (50 msgs) reached."

def terminal_chat_mode():
    print("\n" + "="*60)
    print(" VEXADROP TERMINAL INTERFACE v2.5 - AUTO-ROUTING ACTIVE")
    print("="*60)
    print("STATUS: Bypassing UI Quota | FALLBACK: OpenRouter Auto-Pool")
    print("Type 'exit' to standby.\n")
    
    while True:
        user_input = input("CEO >> ")
        if user_input.lower() in ['exit', 'quit']: 
            print("System entering standby...")
            break
        if not user_input.strip(): 
            continue

        response = route_request_to_best_model(user_input)
        print(f"\nAGENT >> {response}\n")

if __name__ == "__main__":
    terminal_chat_mode()