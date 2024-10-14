from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FloatField, Field
from wtforms.validators import DataRequired

class ListField(Field):
  def process_formdata(self, valuelist):
    self.data = valuelist

class ProductEditForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  price = FloatField('price', validators=[DataRequired()])
  stock = IntegerField('stock', validators=[DataRequired()])
  images = ListField()
  preview = StringField('preview', validators=[DataRequired()])
