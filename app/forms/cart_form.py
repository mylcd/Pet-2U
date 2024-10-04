from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Product

def product_exists(form, field):
  product_id = field.data
  product = Product.query.get(product_id)
  if not product:
    raise ValidationError('This product does not exist.')

class CartForm(FlaskForm):
  user_id = IntegerField('user_id', validators=[DataRequired()])
  product_id = IntegerField('product_id', validators=[DataRequired(), product_exists])
  amount = IntegerField('amount', validators=[DataRequired()])
