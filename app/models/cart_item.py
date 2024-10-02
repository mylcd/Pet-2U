from .db import db, environment, SCHEMA, add_prefix_for_prod


class CartItem(db.Model):
  __tablename__ = 'cart_items'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
  amount = db.Column(db.Integer, nullable=False)
  price = db.Column(db.Float, nullable=False)

  order = db.relationship('User', back_populates="cart_items")
  product = db.relationship('Product', back_populates="cart_items")
