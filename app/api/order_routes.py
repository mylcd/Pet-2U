from flask import Blueprint, request, jsonify, current_app
from app.models import Order, db
from flask_login import current_user, login_required

order_routes = Blueprint('orders', __name__)

@order_routes.route('/')
@login_required
def get_all_orders():
  orders = Order.query.filter(Order.user_id == current_user.id).all()
  orders_res = {
    'Orders': [order.to_dict() for order in orders]
  }

  return jsonify(orders_res), 200

@order_routes.route('/', methods=["POST"])
@login_required
def create_orders():
  order = Order(
    user_id=current_user.id,
  )
  db.session.add(order)
  db.session.commit()
  return jsonify({'id': order.id}), 201
