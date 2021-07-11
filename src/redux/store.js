import {createStore} from 'redux';

// const [profile, setProfile] = useState("andjar");

// setProfile("saputra")

const initialState = {
  loading: false,
  // name: 'Isra Aras',
  // address: 'ardio',
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      loading: action.value,
    };
  }
  return state;
};

const store = createStore(reducer);

export default store;
