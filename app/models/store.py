from .db import db, environment, SCHEMA, add_prefix_for_prod


class Store(db.Model):
  __tablename__ = 'stores'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
  name = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(1000), nullable=False)

  user = db.relationship('User', back_populates='stores')
  answers = db.relationship('Product', back_populates='question', cascade="all, delete-orphan")

  def to_dict(self):
    return {
      'id': self.id,
      'question': self.question,
      'subject': self.subject,
      'user_id': self.user_id
    }
