from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
    pikachu = Store(
      store_id=1,
      name="Pikachu",
      price=300,
      stock=1,
      sold=0,
      review_count=0,
      avg_star=-1,
      preview_image="default.png"
    )
    eevee = Store(
      store_id=1,
      name="Eevee",
      price=800,
      stock=1,
      sold=1,
      review_count=0,
      avg_star=-1,
      preview_image="default.png"
    )
    weavile = Store(
      store_id=1,
      name="Weavile",
      price=149,
      stock=3,
      sold=2,
      review_count=1,
      avg_star=5,
      preview_image="default.png"
    )


    db.session.add(pikachu)
    db.session.add(eevee)
    db.session.add(weavile)
    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
