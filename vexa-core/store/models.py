from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Product(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    price: float
    category: str
    tags: List[str] = []
    image_url: Optional[str] = None

class InventoryItem(BaseModel):
    product_id: int
    stock_count: int
    last_updated: datetime = Field(default_factory=datetime.now)

class OrderItem(BaseModel):
    product_id: int
    quantity: int
    price_at_order: float

class Order(BaseModel):
    id: Optional[int] = None
    customer_name: str
    customer_email: str
    items: List[OrderItem]
    total_amount: float
    status: str = "pending"  # pending, completed, cancelled
    created_at: datetime = Field(default_factory=datetime.now)
