// Build mapping specifications
fn(state => {
  const { cases, translations, locationsMap } = state;
  const formMap = {
    age_assessment: [
      'date_of_assessment',
      'assessment_method',
      'age_assessed',
      'months_20cb03a',
      'maximum_age_assessed',
      'months_1453205',
      'additional_comments_1298bc4',
      'assessed_by',
    ],
    assessment: [
      'from',
      'assessment_requested_on',
      'case_plan_due_date',
      'urgent_protection_concern',
      'risk_level',
    ],
    assessment_update: [
      'from',
      'update_description',
      'recorded_by_3',
      'date_5',
    ],
    basic_identity: [
      'from',
      'national_id_no',
      'registration_date',
      'case_id_display',
      'physical_characteristics',
      'other_id_no',
      'other_id_type',
      'location_current',
      'address_of_accomodation__foreigners_only_',
      'assessment_due_date',
    ],
    closer_form: [
      'from',
      'status',
      'closure_reason',
      'closure_reason_other',
      'date_closure',
      'additional_comments_a0185f7',
    ],
  };
})(state);

// operation 1 is a post, to get an access token
post(`${state.configuration.url}/Users/login`, {
  agentOptions: { rejectUnauthorized: false },
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
  const access_token = state.data.id;
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
      agentOptions: { rejectUnauthorized: false },
    },
    state => {
      console.log(JSON.stringify(state.data, null, 4));
      // return { ...state, record_id: state.references[0].data.record_id };
    }
  )(state);
});
