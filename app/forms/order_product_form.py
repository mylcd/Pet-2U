from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError

class OrderProductForm(FlaskForm):
  amount = IntegerField('amount', validators=[DataRequired()])
