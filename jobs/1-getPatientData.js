fn(state => {
  // operation 1 is a post, to get an access token
  return post(
    `${state.configuration.url}/Users/login`,
    {
      headers: { 'content-type': 'application/json' },
      body: {
        email: state.configuration.email,
        password: state.configuration.password,
      },
      agentOptions: { rejectUnauthorized: false },
    },
    state => {
      const formatNationalId = national_id_no => {
        return typeof national_id_no === 'string'
          ? national_id_no.replace(/-/g, '')
          : national_id_no;
      };
      const access_token = state.data.id;
      console.log('Authentication done...');

      if (!state.references[0].data.national_id_no) {
        throw new Error(
          `Error: Primero did not provide 'national_id_no'. Patient cannot be found.`
        );
      }
      // operation 2 is a get, using the token, to get people
      const filter = {
        where: {
          cid: formatNationalId(state.references[0].data.national_id_no),
        },
        include: [
          {
            relation: 'interventions',
            scope: {
              order: 'vstdate DESC',
              limit: 50,
            },
          },
          {
            relation: 'riskmodel',
          },
        ],
      };
      console.log('filter', JSON.stringify(filter, null, 2));
      return get(
        `${state.configuration.url}/people/findOne`,
        {
          query: { filter, access_token },
          agentOptions: { rejectUnauthorized: false },
        },
        state => {
          console.log(JSON.stringify(state.data, null, 4));
          return { ...state, record_id: state.references[0].data.record_id };
        }
      )(state);
    }
  )(state).catch(error => {
    const safeData = JSON.parse(error.config.data);
    safeData['password'] = '******';
    const safeError = {
      hostname: error.hostname,
      url: error.config.url,
      method: error.config.method,
      data: safeData,
      headers: error.config.headers,
    };
    switch (error.code) {
      case 'EAI_AGAIN':
        console.log(`DNS lookup for '${safeError.url}' has timed out`);
        console.log(
          'Either network connectivity error, proxy error or Invalid DNS nameserver response'
        );
        throw safeError;
      case 'ENOTFOUND':
        console.log(`The URL '${safeError.url}' Is invalid`);
        console.log(
          'Please check the URL in the configuration and update it accordingly'
        );
        throw safeError;
      case 'UNABLE_TO_VERIFY_LEAF_SIGNATURE':
        console.log('Error: unable to verify the first certificate');
        console.log('Make sure you ingore SSL restriction on request headers');
        console.log(
          `For language-http => v4.0.0 'agentOptions: { rejectUnauthorized: false }' on request headers`
        );
        console.log(
          `For language-http <= v2.4.15 'strictSSL: false' on request headers`
        );
        throw safeError;
      default:
        throw error;
    }
  });
});
