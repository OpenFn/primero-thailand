// get forms from Primero
get('/api/v2/forms');

// Build mapping specifications
fn(state => {
  const { filteredCases, translations, locationsMap } = state;

  const forms = state.data.data;

  // find related lookup for a given select field
  const getLookupName = sf => {
    const ids = forms
      .map(form =>
        form.fields
          .filter(field => sf === field.name)
          .map(field =>
            field.hasOwnProperty('option_strings_source')
              ? field.option_strings_source.replace('lookup ', '')
              : {
                  unique_id: field.name,
                  values: field.option_strings_text,
                }
          )
          .flat()
      )
      .flat();
    return ids.filter((item, index) => ids.indexOf(item) === index)[0];
  };

  // Helper function to check for Empty string in getCases
  const checkEmptyStr = item => {
    const checkItem = item && item.length === 0 ? '' : item;
    return typeof item === 'undefined' ? null : checkItem;
  };

  const formsMap = filteredCases.map(cs => {
    return {
      age_assessment: {
        date_of_assessment: cs.age_assessment
          ? checkEmptyStr(cs.age_assessment[0].date_of_assessment)
          : null,
        assessment_method: translations[getLookupName('assessment_method')],
        age_assessed: cs.age_assessment
          ? checkEmptyStr(cs.age_assessment[0].age_assessed)
          : null,
        months_20cb03a: cs.age_assessment
          ? checkEmptyStr(cs.age_assessment[0].months_20cb03a)
          : null,
        maximum_age_assessed: cs.age_assessment
          ? checkEmptyStr(cs.age_assessment[0].maximum_age_assessed)
          : null,
        months_1453205: cs.age_assessment
          ? checkEmptyStr(cs.age_assessment[0].months_1453205)
          : null,
        additional_comments_1298bc4: cs.age_assessment
          ? checkEmptyStr(cs.age_assessment[0].additional_comments_1298bc4)
          : null,
        assessed_by: cs.age_assessment
          ? checkEmptyStr(cs.age_assessment[0].assessed_by)
          : null,
      },
      assessment: {
        assessment_requested_on: cs.assessment_requested_on
          ? checkEmptyStr(cs.assessment_requested_on)
          : null,
        case_plan_due_date: cs.case_plan_due_date
          ? checkEmptyStr(cs.case_plan_due_date)
          : null,
        urgent_protection_concern: cs.urgent_protection_concern
          ? checkEmptyStr(cs.urgent_protection_concern)
          : null,
        risk_level: translations[getLookupName('risk_level')],
      },
      assessment_update: {
        update_description: cs.assessment_update
          ? checkEmptyStr(cs.assessment_update[0].update_description)
          : null,
        recorded_by_3: cs.assessment_update
          ? checkEmptyStr(cs.assessment_update[0].recorded_by_3)
          : null,
        date_5: cs.assessment_update
          ? checkEmptyStr(cs.assessment_update[0].date_5)
          : null,
      },
      basic_identity: {
        national_id_no: cs.national_id_no
          ? checkEmptyStr(cs.national_id_no)
          : null,
        registration_date: cs.registration_date
          ? checkEmptyStr(cs.registration_date)
          : null,
        case_id_display: cs.case_id_display
          ? checkEmptyStr(cs.case_id_display)
          : null,
        physical_characteristics: cs.physical_characteristics
          ? checkEmptyStr(cs.physical_characteristics)
          : null,
        other_id_no: cs.other_id_no ? checkEmptyStr(cs.other_id_no) : null,
        other_id_type: cs.other_id_type
          ? checkEmptyStr(cs.other_id_type)
          : null,
        location_current: cs.location_current
          ? locationsMap[cs.location_current]
          : null,
        address_of_accomodation__foreigners_only_:
          cs.address_of_accomodation__foreigners_only_
            ? checkEmptyStr(cs.address_of_accomodation__foreigners_only_)
            : null,
        assessment_due_date: cs.assessment_due_date
          ? checkEmptyStr(cs.assessment_due_date)
          : null,
      },
    };
  });

  return { ...state, formsMap };
});

// // operation 1 is a post, to get an access token
// post(`${state.configuration.url}/Users/login`, {
//   agentOptions: { rejectUnauthorized: false },
//   headers: { 'content-type': 'application/json' },
//   body: {
//     email: state.configuration.email,
//     password: state.configuration.pwd,
//   },
// });

// fn(state => {
//   const formatNationalId = national_id_no => {
//     return typeof national_id_no === 'string'
//       ? national_id_no.replace(/-/g, '')
//       : national_id_no;
//   };
//   const access_token = state.data.id;
//   console.log('Authentication done...');

//   //   const nationalIds = cases.map(cs => cs.national_id_no);
//   // CIDs to test with:
//   const nationalIdstoTest = [
//     '1101700141411',
//     '1067100182518',
//     '1102900888977',
//     '1144600547416',
//     '1144601602121',
//     '1144600889621',
//   ];

//   // operation 2 is a get, using the token, to get people
//   const filter = {
//     filter: {
//       where: {
//         cid: formatNationalId(nationalIdstoTest[0]),
//         'activities.primeroservice.serviceType': 'primero',
//       },
//     },
//   };

//   return get(
//     `${state.configuration.url}/interventions/findOne`,
//     {
//       query: { filter, access_token },
//       agentOptions: { rejectUnauthorized: false },
//     },
//     state => {
//       console.log(JSON.stringify(state.data, null, 4));
//       // return { ...state, record_id: state.references[0].data.record_id };
//     }
//   )(state);
// });
