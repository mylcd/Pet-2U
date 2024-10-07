from flask import Blueprint, request, jsonify, current_app
from app.models import OrderProduct, Product
from app.forms import OrderProductForm
from flask_login import current_user, login_required

order_product_routes = Blueprint('order_products', __name__)

@order_product_routes.route('/<int:order_id>/<int:product_id>', methods=["POST"])
@login_required
def create_order_products(order_id, product_id):
  form = OrderProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    product = Product.query.get(product_id)
    order_product = OrderProduct(
      order_id=order_id,
      product_id=product_id,
      amount=form.data['amount'],
      price=product.price
    )
    product.stock = product.stock - amount
    product.sold = product.sold + amount
    db.session.add(order_product)
    db.session.commit()
    return jsonify(order_product.to_dict()), 201
  else:
    return form.errors, 401
