from app.models import db, Product, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text

# Adds 3 seed products, 1 seed product image
# All three are Pokemons belong to store 1
# Product image is for the first product, "Pikachu"
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

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM product_images"))
    db.session.execute(text("DELETE FROM products"))

  db.session.commit()
