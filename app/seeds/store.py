from app.models import db, Store, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stores():
  pekaboo = Store(user_id=1, name="Pekaboo", description="This store sells ...")
  palworld = Store(user_id=2, name="Palworld", description="Get your Pal... ...")

  db.session.add(pekaboo)
  db.session.add(palworld)
  db.session.commit()

def undo_stores():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.stores RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM stores"))

  db.session.commit()
