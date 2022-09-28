// import cases from '../../tmp/mapTranslations/cases';
// import translations from '../../tmp/mapTranslations/translations';
// import locationsMap from '../../tmp/mapTranslations/locationsMap';

// operation 1 is a post, to get an access token
post(`${state.configuration.url}/Users/login`, {
  strictSSL: false,
  headers: { 'content-type': 'application/json' },
  body: {
    email: state.configuration.email,
    password: state.configuration.password,
  },
});

fn(state => {
  const formatNationalId = national_id_no => {
    return typeof national_id_no === 'string'
      ? national_id_no.replace(/-/g, '')
      : national_id_no;
  };
  const access_token = state.data.body.id;
  console.log('Authentication done...');

  //   const nationalIds = cases.map(cs => cs.national_id_no);
  // CIDs to test with:
  const nationalIdstoTest = [
    '1101700141411',
    '1067100182518',
    '1102900888977',
    '1144600547416',
    '1144601602121',
    '1144600889621',
  ];

  // operation 2 is a get, using the token, to get people
  const filter = {
    filter: {
      where: {
        cid: formatNationalId(nationalIdstoTest[0]),
        'activities.primeroservice.serviceType': 'primero',
      },
    },
  };

  return get(
    `${state.configuration.url}/interventions/findOne`,
    {
      query: { filter, access_token },
      strictSSL: false,
    },
    state => {
      console.log(JSON.stringify(state.data, null, 4));
      return { ...state, record_id: state.references[0].data.record_id };
    }
  )(state);
});
