from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, Field
from wtforms.validators import DataRequired, ValidationError
from app.models import Store

def store_exists(form, field):
  store_id = field.data
  store = Store.query.get(store_id)
  if not store:
    raise ValidationError('This store does not exist.')

class ListField(Field):
  def process_formdata(self, valuelist):
    self.data = valuelist

class ProductForm(FlaskForm):
  store_id = IntegerField('store_id', validators=[DataRequired(), store_exists])
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  price = FloatField('price', validators=[DataRequired()])
  stock = IntegerField('stock', validators=[DataRequired()])
  images = ListField()
  preview = StringField('preview', validators=[DataRequired()])
