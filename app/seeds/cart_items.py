from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_carts():
  buying = CartItem(user_id=2, product_id=1, amount=1, price=300)

  db.session.add(buying)
  db.session.commit()

def undo_carts():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM cart_items"))

  db.session.commit()
