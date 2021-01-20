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
    console.log(state.data.body.id);
    return { ...state, access_token: state.data.body.id };
  }
);

get(
  `${state.configuration.url}/vPatients?access_token=${state.access_token}`,
  { strictSSL: false },
  state => {
    // mappings in hre
    console.log(state.data);
    return state;
  }
);

