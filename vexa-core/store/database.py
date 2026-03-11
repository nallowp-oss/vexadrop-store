import sqlite3
import json
from .models import Product, InventoryItem, Order, OrderItem
from typing import List, Optional
from pathlib import Path

DB_PATH = Path(__file__).parent / "vexadrop.db"

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                category TEXT,
                tags TEXT,
                image_url TEXT
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS inventory (
                product_id INTEGER PRIMARY KEY,
                stock_count INTEGER DEFAULT 0,
                last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (product_id) REFERENCES products (id)
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_name TEXT,
                customer_email TEXT,
                total_amount REAL,
                status TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS order_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER,
                product_id INTEGER,
                quantity INTEGER,
                price_at_order REAL,
                FOREIGN KEY (order_id) REFERENCES orders (id),
                FOREIGN KEY (product_id) REFERENCES products (id)
            )
        """)

def add_product(product: Product) -> int:
    with get_connection() as conn:
        cursor = conn.execute(
            "INSERT INTO products (name, description, price, category, tags, image_url) VALUES (?, ?, ?, ?, ?, ?)",
            (product.name, product.description, product.price, product.category, json.dumps(product.tags), product.image_url)
        )
        pid = cursor.lastrowid
        conn.execute("INSERT INTO inventory (product_id, stock_count) VALUES (?, ?)", (pid, 0))
        return pid

def update_stock(product_id: int, count: int):
    with get_connection() as conn:
        conn.execute(
            "UPDATE inventory SET stock_count = ?, last_updated = CURRENT_TIMESTAMP WHERE product_id = ?",
            (count, product_id)
        )

def get_all_products() -> List[Product]:
    products = []
    with get_connection() as conn:
        rows = conn.execute("SELECT * FROM products").fetchall()
        for row in rows:
            p = dict(row)
            p['tags'] = json.loads(p['tags'])
            products.append(Product(**p))
    return products

def get_inventory() -> List[dict]:
    with get_connection() as conn:
        rows = conn.execute("""
            SELECT p.name, i.stock_count, i.last_updated 
            FROM products p 
            JOIN inventory i ON p.id = i.product_id
        """).fetchall()
        return [dict(row) for row in rows]
