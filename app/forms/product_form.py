from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FieldList
from wtforms.validators import DataRequired, ValidationError
from app.models import Store

def store_exists(form, field):
  store_id = field.data
  store = Store.query.get(store_id)
  if not store:
    raise ValidationError('This store does not exist.')

class ProductForm(FlaskForm):
  store_id = IntegerField('store_id', validators=[DataRequired(), store_exists])
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  price = IntegerField('price', validators=[DataRequired()])
  stock = IntegerField('stock', validators=[DataRequired()])
  images = FieldList(StringField('image', validators=[DataRequired()]), min_entries=1, max_entries=10)
