from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text

# Adds 1 seeder shopping cart belongs to user_id=2
# This shopping cart has 1 product with id=1
def seed_carts():
  buying = CartItem(user_id=2, product_id=1, amount=1)

  db.session.add(buying)
  db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_carts():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM cart_items"))

  db.session.commit()
