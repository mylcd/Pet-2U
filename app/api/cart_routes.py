from flask import Blueprint, request, jsonify, current_app
from app.models import CartItem, db
from app.forms import CartForm, CartEditForm
from flask_login import current_user, login_required

cart_routes = Blueprint('carts', __name__)

@cart_routes.route('/')
@login_required
def get_cart_products():
  cart_items = CartItem.query.filter(CartItem.user_id == current_user.id).all()
  cart_items_res = {
    'Products': [cart_item.to_dict() for cart_item in cart_items]
  }

  return jsonify(cart_items_res), 200

@cart_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_cart_products(id):
  cart_item = CartItem.query.get(id)

  if not cart_item:
    return jsonify({"message": "Cart Item not found"}), 404

  if cart_item.user_id != current_user.id:
    return jsonify({"message": "Forbidden"}), 403

  db.session.delete(cart_item)
  db.session.commit()
  return jsonify({"message": "Successfully deleted"})

@cart_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_cart_products(id):
  cart_item = CartItem.query.get(id)

  if not cart_item:
    return jsonify({"message": "Cart Item not found"}), 404

  if cart_item.user_id != current_user.id:
    return jsonify({"message": "Forbidden"}), 403

  form = CartEditForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    cart_item.amount = form.data['amount']
    db.session.commit()
    return jsonify(cart_item.to_dict()), 201
  else:
    return form.errors, 401

@cart_routes.route('/', methods=["POST"])
@login_required
def create_cart_products():
  form = CartForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    cart_item = CartItem(
      user_id=current_user.id,
      product_id=form.data['product_id'],
      amount=form.data['amount'],
    )
    db.session.add(cart_item)
    db.session.commit()
    return jsonify(cart_item.to_dict()), 201
  else:
    return form.errors, 401
