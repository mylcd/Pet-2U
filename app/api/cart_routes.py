from flask import Blueprint, request, jsonify, current_app
from app.models import CartItem
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
