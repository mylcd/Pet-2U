from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Order(db.Model):
  __tablename__ = 'orders'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

  created_on = db.Column(db.DateTime, default=datetime.now())
  updated_on = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

  user = db.relationship('User', back_populates='orders')
  order_products = db.relationship('OrderProduct', back_populates='order', cascade='all, delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'Products': [{
        'amount': order_product.amount,
        'price': order_product.price,
        'name': order_product.product.name,
        'previewImg': order_product.product.preview_image
      } for order_product in self.order_products],
      'created_on': self.created_on,
      'updated_on': self.updated_on
    }
