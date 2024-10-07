from app.models import db, Product, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_products():
  pikachu = Product(
    store_id=1,
    name="Pikachu",
    description="Electric type pokemon",
    price=300,
    stock=1,
    sold=0,
    review_count=0,
    avg_star=-1,
    preview_image="default.png"
  )
  eevee = Product(
    store_id=1,
    name="Eevee",
    description="Normal type pokemon",
    price=800,
    stock=1,
    sold=1,
    review_count=0,
    avg_star=-1,
    preview_image="default.png"
  )
  weavile = Product(
    store_id=1,
    name="Weavile",
    description="Dark and Ice type pokemon",
    price=149,
    stock=3,
    sold=2,
    review_count=1,
    avg_star=5,
    preview_image="default.png"
  )

  pikachu_png = ProductImage(
    product_id=1,
    url="https://en.wikipedia.org/wiki/Pikachu#/media/File:Pok%C3%A9mon_Pikachu_art.png"
  )


  db.session.add(pikachu)
  db.session.add(eevee)
  db.session.add(weavile)
  db.session.add(pikachu_png)

  db.session.commit()

def undo_products():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM product_images"))
    db.session.execute(text("DELETE FROM products"))

  db.session.commit()
