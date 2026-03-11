import requests
import json
import time

BASE_URL = "http://127.0.0.1:8000"

def test_api():
    print("--- VexaDrop Core API Verification ---")
    
    # 1. Health Check
    try:
        resp = requests.get(f"{BASE_URL}/health")
        print(f"Health Check: {resp.status_code} - {resp.json()}")
    except Exception as e:
        print(f"Health Check Failed: {e}")
        return

    # 2. List Products
    resp = requests.get(f"{BASE_URL}/products")
    products = resp.json()
    print(f"Products Found: {len(products)}")
    for p in products:
        print(f" - {p['name']} (${p['price']})")

    # 3. Inventory Report Agent
    resp = requests.get(f"{BASE_URL}/agent/inventory/report")
    print("\nInventory Agent Report:")
    print(resp.json().get('report'))

    # 4. Concierge Agent Recommendation
    print("\nTesting Concierge Agent...")
    query = "I'm looking for something to improve my neural performance while work-scanning."
    resp = requests.get(f"{BASE_URL}/agent/concierge/recommend", params={"query": query})
    print(f"User Query: {query}")
    print(f"Vexa Recommendation: {resp.json().get('recommendation')}")

    # 5. Creative Specialist Transformation
    print("\nTesting Creative Specialist...")
    resp = requests.post(f"{BASE_URL}/agent/creative/transform", json={
        "image_path": "supplier_aura_silk.png",
        "product_name": "Aura Silk Conditioner"
    })
    print(f"Transformation Results: {json.dumps(resp.json().get('results'), indent=2)}")

    # 6. Sourcing Specialist Scan
    print("\nTesting Sourcing Specialist Scan...")
    resp = requests.post(f"{BASE_URL}/agent/sourcer/scan")
    print(f"Sourcing Results: {json.dumps(resp.json(), indent=2)}")

if __name__ == "__main__":
    # Give server time to warm up
    time.sleep(2)
    test_api()
