import { useState } from 'react';
import { useNavigate, Navigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editProducts } from "../../redux/product";
import ProductList from '../ProductComponents/ProductList';

function ProductEditForm() {
  let location = useLocation();
  if(!location.state) {
    location = { state: {
      oldName : "",
      oldDescription: "",
      oldPrice: "",
      oldStock: "",
      oldPreview: "default.png",
      oldImages: []
    }};
  }
  const { id } = useParams();
  const user = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(location.state.oldName);
  const [description, setDescription] = useState(location.state.oldDescription);
  const [price, setPrice] = useState(location.state.oldPrice);
  const [stock, setStock] = useState(location.state.oldStock);
  const [imageInput, setImageInput] = useState('');
  const [images, setImages] = useState(location.state.oldImages);
  const [preview, setPreview] = useState(location.state.oldPreview);

  const handleName = e => setName(e.target.value);
  const handleDescription = e => setDescription(e.target.value);
  const handlePrice = e => setPrice(e.target.value);
  const handleStock = e => setStock(e.target.value);
  const handleImageInput = e => setImageInput(e.target.value);
  const handlePreview = e => setPreview(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      id,
      name,
      description,
      price: parseFloat(price).toFixed(2),
      stock: parseInt(stock),
      images,
      preview
    }
    const data = await dispatch(editProducts(newProduct));
    if (!(data && data.message)) {
      console.log(data);
      navigate(`/products/${data.id}`);
    }
  };

  const handleImageSubmit = e => {
    e.preventDefault();
    let newImages = JSON.parse(JSON.stringify(images));
    newImages.push(imageInput);
    setImageInput('');
    setImages(newImages);
  }

  const handleImageReset = e => {
    e.preventDefault();
    setImages([]);
  }

  let productForm;
  if (user) {
    productForm = (
      <form
        onSubmit={handleSubmit}
        className='apple-font form'
      >
        <div className='form-title'>Edit Your Product on Pet2U</div>
        <div className='form-subtitle'>What is the name of your new product?</div>
        <input
          value={name}
          onChange={handleName}
          type="text"
          name="name"
          className='apple-form form-input'
          placeholder="Name of your product"
        />

        <div className='form-subtitle'>Please describe your product.</div>
        <textarea
          value={description}
          onChange={handleDescription}
          name="description" rows="8"
          className='apple-font form-textarea'
          placeholder="What is the size? the color? Etc."
        />

        <div className='form-subtitle'>What is the price?</div>
        <div>$
        <input
          value={price}
          onChange={handlePrice}
          type="text"
          name="price"
          className='apple-form form-dollar-input'
        />
        </div>

        <div className='form-subtitle'>How many do you have?</div>
        <input
          value={stock}
          onChange={handleStock}
          type="text"
          name="stock"
          className='apple-form form-input'
        />

        <div className='form-subtitle'>Add Images Here</div>
        <div>
          <input
            value={imageInput}
            onChange={handleImageInput}
            type="text"
            name="imageUrl"
            className='apple-form form-input'
          />
          <button
            type="button"
            onClick={handleImageSubmit}
            disabled={imageInput.length == 0}
            className='apple-font form-button'
          >
            Add Image
          </button>
          <button
            type="button"
            onClick={handleImageReset}
            className='apple-font form-button'
          >
            Clear
          </button>
        </div>

        <div className='form-hiddenimage'>
          {images.map((image, idx) => {
            return (
              <div className='form-hiddencross' key={idx}>
                <img className='form-image' src={image}/>
                <div
                  className='form-cross'
                  onClick={() => {
                  let newArr = JSON.parse(JSON.stringify(images));
                  newArr.splice(idx, 1);
                  setImages(newArr);
                  }}>
                  X
                </div>
              </div>);
          })}
        </div>

        <div className='form-subtitle'>Which image you want for preview?</div>
        <select
          value={preview}
          onChange={handlePreview}
          className='apple-form form-input'>
          <option value="default.png" key={-1}>Default Image</option>
          {images.map((image, i) => {
            return (
              <option value={image} key={i}>Image {i+1}</option>
            );
          })}
        </select>

        <div>
          <button
            disabled={
              (name.length < 3) ||
              (price.length < 1) ||
              (isNaN(price)) ||
              (price.includes('-')) ||
              (stock.length < 1) ||
              (isNaN(stock)) ||
              (stock.includes('.')) ||
              (stock.includes('-')) ||
              (parseInt(stock) == 0)
            }
            type="submit"
            className='apple-font form-button'
          >
            Edit Product
          </button>
        </div>

        <div className='form-preview'>
          <div className='form-subtitle'>Preview: </div>
          <ProductList products={[{
            id: 0,
            name,
            previewImage: images.length == 0 ? "default.png" : preview,
            closed: false,
            price: parseFloat(price)
          }]} />
        </div>
      </form>
    );
  }
  else {
    productForm = (
      <Navigate to='/login' state={{ origin: `/stores/${id}/new` }} replace={true}/>
    )
  }

  return (
    <div>
      {productForm}
    </div>
  );
}

export default ProductEditForm;
