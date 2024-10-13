import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeStore } from "../../redux/store";

function StoreEditForm() {
  let location = useLocation();
  if(!location.state) {
    location = { state: { oldName: '', oldDescription: ''}};
  }
  const { id } = useParams();
  const user = useSelector((store) => store.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState(location.state.oldName);
  const [description, setDescription] = useState(location.state.oldDescription);

  const [error, setError] = useState(false);

  const handleName = e => setName(e.target.value);
  const handleDescription = e => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newStore = {
      id, name, description
    }
    const data = await dispatch(changeStore(newStore));
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
      <Navigate to='/login' state={{ origin: `/stores/${id}/edit` }} replace={true}/>
    )
  }

  return (
    <div>
      {storeForm}
    </div>
  );
}

export default StoreEditForm;
