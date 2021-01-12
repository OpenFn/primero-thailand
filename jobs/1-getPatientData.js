alterState(state => {
  return post(
    `${state.configuration.url}/Users/login`,
    {
      headers: { 'content-type': 'application/json' },
      body: {
        email: state.configuration.email,
        password: state.configuration.password,
      },
    },
    state => {
      return { ...state, access_token: state.data.id };
    }
  )(state);
});

alterState(state => {   
  const { access_token } = state.data;
  return get(
    `${state.configuration.url}/vPatients?access_token=${access_token}`,
    {},
    state => {
      // mappings in hre
      return state;
    }
  )(state);
});
