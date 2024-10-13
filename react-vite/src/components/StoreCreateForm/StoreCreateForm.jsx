import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewStores } from "../../redux/store";

function StoreCreateForm() {
  const user = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [error, setError] = useState(false);

  const handleName = e => setName(e.target.value);
  const handleDescription = e => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStore = {
      name, description
    }
    const data = await dispatch(createNewStores(newStore));
    if (data && data.message) {
      setError(true);
    }
    else {
      navigate(`/stores/${data.id}`);
    }
  };

  useEffect(() => {
    setError(false);
  }, [name]);

  let storeForm;
  if (user) {
    storeForm = (
      <form
        onSubmit={handleSubmit}
        className='apple-font form'
      >
        <div className='form-title'>Open your store on Pet2U</div>
        <div className='form-subtitle'>What is the name of your new store?</div>
        <input
          value={name}
          onChange={handleName}
          type="text"
          name="name"
          className='apple-form form-input'
          placeholder="Name of your store"
        />
        {error && (<div className='error'>Name already in use</div>)}

        <div className='form-subtitle'>Please describe your store.</div>
        <textarea
          value={description}
          onChange={handleDescription}
          name="description" rows="8"
          className='apple-font form-input'
          placeholder="What you sell? Where are your products from? Etc."
        />

        <div>
          <button
            disabled={(name.length < 3)}
            type="submit"
            className='apple-font form-button'
          >
            Create Store
          </button>
        </div>
      </form>
    );
  }
  else {
    storeForm = (
      <Navigate to='/login' state={{ origin: "/stores/new" }} replace={true}/>
    )
  }

  return (
    <div>
      {storeForm}
    </div>
  );
}

export default StoreCreateForm;
