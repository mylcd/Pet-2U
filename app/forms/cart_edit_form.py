from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

class CartEditForm(FlaskForm):
  amount = IntegerField('amount', validators=[DataRequired()])
