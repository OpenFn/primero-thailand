// operation 1 is a post, to get an access token
post(
  `${state.configuration.url}/Users/login`,
  {
    headers: { 'content-type': 'application/json' },
    body: {
      email: state.configuration.email,
      password: state.configuration.password,
    },
    // https: newAgent({ rejectUnauthorized: false }),
    strictSSL: false,
  },
  state => {
    const access_token = state.data.body.id;
    console.log('Authentication done...');
    // operation 2 is a get, using the token, to get people
    const filter = {
      where: { cid: state.references[0].data.national_id_no },
      include: 'interventions',
      limit: 1,
    };
    console.log('filter', JSON.stringify(filter, null, 2));
    return get(
      `${state.configuration.url}/people/findOne`,
      {
        query: { filter, access_token },
        // https: newAgent({ rejectUnauthorized: false }),
        strictSSL: false,
      },
      state => {
        console.log(state.data);
         console.log(state.references[0]);
        return { ...state, record_id: state.references[0].data.record_id };
      }
    )(state);
  }
);
