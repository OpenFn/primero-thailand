// operation 1 is a post, to get an access token
post(
  `${state.configuration.url}/Users/login`,
  {
    headers: { 'content-type': 'application/json' },
    body: {
      email: state.configuration.email,
      password: state.configuration.password,
    },
    strictSSL: false,
  },
  state => {
    const accessToken = state.data.body.id;
    console.log('Authentication done...');
    return { ...state, accessToken };
  }
);

// operation 2 is a get, using the token, to get patients
get(
  `${state.configuration.url}/vPatients`,
  {
    query: state => ({ access_token: state.accessToken }),
    strictSSL: false
  },
  state => {
    // mappings in here
    console.log(state.data);
    return state;
  }
);