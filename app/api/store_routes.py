from flask import Blueprint, request, jsonify, current_app
from app.models import Store
from app.forms import StoreForm
from flask_login import current_user, login_required

store_routes = Blueprint('products', __name__)

@store_routes.route('/')
def get_all_stores():
  stores = Store.query.all()
  stores_res = {
    'Stores': [store.to_dict() for store in stores]
  }

  return jsonify(stores_res), 200

@store_routes.route('/<int:id>')
def get_store_details(id):
  store = Store.query.get(id)
  store_res = {}
  if store:
    store_res = store.to_dict()
    store_res["Products"] = [product.to_dict() for product in store.products]
    store_res["Owner"] = store.user.to_dict()

  return jsonify(store_res), 200

@store_routes.route('/', methods=["POST"])
@login_required
def create_stores():
  form = StoreForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    if Store.query.filter(Order.name == form.data['name']).one():
      return jsonify({'message': "Store name already exists"}), 400
    store = Store(
      user_id=current_user.id,
      name=form.data['name'],
      description=form.data['description'],
    )
    db.session.add(store)
    db.session.commit()
    return jsonify(store.to_dict()), 201
  else:
    return form.errors, 401

@store_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_stores(id):
  store = Store.query.get(id)
  if not store:
    return jsonify({'message': "Store not found"}), 404

  if store.user_id != current_user.id:
    return jsonify({"message": "Forbidden"}), 403

  form = StoreForm()
  form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

      if form.data['name'] != store.name:
        if Store.query.filter(Order.name == form.data['name']).one():
          return jsonify({'message': "Store name already exists"}), 400

      store.name = form.data['name']
      store.description = form.data['description']
      db.session.commit()
      return jsonify(store.to_dict()), 200
    else:
      return form.errors, 401

@store_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_stores(id):
  store = Store.query.get(id)

  if not store:
    return jsonify({"message": "Store not found"}), 404

  if store.user_id != current_user.id:
    return jsonify({"message": "Forbidden"}), 403

  db.session.delete(store)
  db.session.commit()
  return jsonify({"message": "Successfully deleted"})
