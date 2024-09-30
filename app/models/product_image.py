from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class ProductImage(db.Model):
  __tablename__ = 'product_images'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
  url = db.Column(db.Integer, nullable=False)

  created_on = db.Column(db.DateTime, default=datetime.now())
  updated_on = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

  product = db.relationship('Product', back_populates="product_images")
