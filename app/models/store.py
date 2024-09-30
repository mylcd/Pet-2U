from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Store(db.Model):
  __tablename__ = 'stores'

  if environment == 'production':
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  name = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(1000), nullable=False)

  created_on = db.Column(db.DateTime, default=datetime.now())
  updated_on = db.Column(db.DateTime, default=datetime.now(), onupdate=datetime.now())

  user = db.relationship('User', back_populates='stores')
  products = db.relationship('Product', back_populates='store', cascade='all, delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.user_id,
      'name': self.name,
      'description': self.description,
      'created_on': self.created_on,
      'updated_on': self.updated_on
    }
