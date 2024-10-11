from flask import Blueprint, request, jsonify, current_app
from app.models import Product, ProductImage, db
from app.forms import ProductForm, ProductEditForm
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

    for image in form.data['images']:
      product_image = ProductImage(
        product_id=product.id,
        url=image
      )
      db.session.add(product_image)
    db.session.commit()

    return jsonify(product.to_dict()), 201
  else:
    return form.errors, 401

@product_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_products(id):
  product = Product.query.get(id)
  if not product:
    return jsonify({'message': "Product not found"}), 404

  if product.store.user_id != current_user.id:
    return jsonify({"message": "Forbidden"}), 403

  form = ProductEditForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    product.name = form.data['name']
    product.description = form.data['description']
    product.price = form.data['price']
    product.stock = form.data['stock']
    db.session.commit()

    product_images = ProductImage.query.filter(ProductImage.product_id == product.id).all()
    for product_image in product_images:
      db.session.delete(product_image)
    db.session.commit()

    for image in form.data['images']:
      product_image = ProductImage(
        product_id=product.id,
        url=image
      )
      db.session.add(product_image)
    db.session.commit()

    return jsonify(product.to_dict()), 200
  else:
    return form.errors, 401

@product_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_products(id):
  product = Product.query.get(id)

  if not product:
    return jsonify({"message": "Product not found"}), 404

  if product.user_id != current_user.id:
    return jsonify({"message": "Forbidden"}), 403

  db.session.delete(product)
  db.session.commit()
  return jsonify({"message": "Successfully deleted"})
