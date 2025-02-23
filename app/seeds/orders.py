from app.models import db, Order, OrderProduct, environment, SCHEMA
from sqlalchemy.sql import text

# Adds 1 seeder order with 2 different items included in this order
# The order has 1 id=2 product @ $1000, 2 id=3 product @ $149
# Price in order does not have to match price of product
def seed_orders():
  order1 = Order(user_id=2)

  order_product1 = OrderProduct(order_id=1, product_id=2, amount=1, price=1000)
  order_product2 = OrderProduct(order_id=1, product_id=3, amount=2, price=149)

  db.session.add(order1)
  db.session.add(order_product1)
  db.session.add(order_product2)

  db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.order_products RESTART IDENTITY CASCADE;")
    db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM order_products"))
    db.session.execute(text("DELETE FROM orders"))

  db.session.commit()
