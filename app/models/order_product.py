from .db import db, environment, SCHEMA, add_prefix_for_prod


class OrderProduct(db.Model):
  __tablename__ = 'order_products'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), nullable=False)
  product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
  amount = db.Column(db.Integer, nullable=False)
  price = db.Column(db.Float, nullable=False)

  order = db.relationship('Order', back_populates="order_products")
  product = db.relationship('Product', back_populates="order_products")
