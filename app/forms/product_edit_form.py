from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, FieldList
from wtforms.validators import DataRequired

class ProductEditForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  price = IntegerField('price', validators=[DataRequired()])
  stock = IntegerField('stock', validators=[DataRequired()])
  images = FieldList(StringField('image', validators=[DataRequired()]), min_entries=1, max_entries=10)
