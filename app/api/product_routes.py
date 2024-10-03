from flask import Blueprint, request, jsonify, current_app
from app.models import Product
from flask_login import current_user, login_required

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_all_products():
  products = Product.query.all()
  products_res = {
    'Products': [product.to_dict() for product in products]
  }

  return jsonify(products_res)
