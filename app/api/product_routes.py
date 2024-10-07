from flask import Blueprint, request, jsonify, current_app
from app.models import Product
from app.forms import ProductForm
from flask_login import current_user, login_required

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_all_products():
  products = Product.query.all()
  products_res = {
    'Products': [product.to_dict() for product in products]
  }

  return jsonify(products_res)

@product_routes.route('/stores/<int:store_id>')
def get_store_products(store_id):
  products = Product.query.filter(Product.store_id == store_id).all()
  products_res = {
    'Products': [product.to_dict() for product in products]
  }

  return jsonify(products_res)

@product_routes.route('/', methods=["POST"])
@login_required
def create_products():
  form = ProductForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    product = Product(
      store_id=form.data['store_id'],
      name=form.data['name'],
      description=form.data['description'],
      price=form.data['price'],
      stock=form.data['stock'],
      sold=0,
      review_count=0,
      avgStar=-1,
      preview_image="default.png"
    )
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201
  else:
    return form.errors, 401
