from app.models import db, Store, environment, SCHEMA
from sqlalchemy.sql import text

# Add 2 seed stores
# Store 1 belongs to user 1, store 2 belongs to user 2
def seed_stores():
  pekaboo = Store(user_id=1, name="Pekaboo", description="This store sells ...")
  palworld = Store(user_id=2, name="Palworld", description="Get your Pal... ...")

  db.session.add(pekaboo)
  db.session.add(palworld)
  db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_stores():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.stores RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM stores"))

  db.session.commit()
