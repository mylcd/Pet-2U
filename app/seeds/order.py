from app.models import db, Order, OrderProduct, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
  order1 = Order(user_id=2)

  order_product1 = OrderProduct(order_id=1, product_id=2, amount=1, price=1000)
  order_product2 = OrderProduct(order_id=1, product_id=3, amount=2, price=149)

  db.session.add(order1)
  db.session.add(order_product1)
  db.session.add(order_product2)

  db.session.commit()

def undo_orders():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.order_products RESTART IDENTITY CASCADE;")
    db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM order_products"))
    db.session.execute(text("DELETE FROM orders"))

  db.session.commit()
