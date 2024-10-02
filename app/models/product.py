from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
  __tablename__ = 'products'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  store_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stores.id')), nullable=False)
  name = db.Column(db.String(100), nullable=False)
  price = db.Column(db.Float, nullable=False)
  stock = db.Column(db.Integer, nullable=False)
  sold = db.Column(db.Integer, nullable=False)
  review_count = db.Column(db.Integer, nullable=False)
  avg_star = db.Column(db.Float, nullable=False)
  preview_image = db.Column(db.String(1000), nullable=False)

  created_on = db.Column(db.DateTime, default=datetime.now())
  updated_on = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

  store = db.relationship('Store', back_populates='products')
  product_images = db.relationship('ProductImage', back_populates='product', cascade='all, delete-orphan')
  order_products = db.relationship('OrderProduct', back_populates='product', cascade='all, delete-orphan')
  cart_items = db.relationship('CartItem', back_populates='product', cascade='all, delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'storeId': self.store_id,
      'name': self.name,
      'price': self.price,
      'stock': self.stock,
      'sold': self.sold,
      'reviewCount': self.review_count,
      'avgStar': self.avg_star,
      'previewImage': self.preview_image,
      'created_on': self.created_on,
      'updated_on': self.updated_on
    }
