// =============================================================================
// === THE GOOGLE SHEETS OPTION ================================================
// Get selected fields in google sheets
// get(
//   `${state.configuration.spreedsheetUrl}/${state.configuration.spreedsheetId}/values/Select%20Fields?majorDimension=COLUMNS&valueRenderOption=FORMATTED_VALUE&key=${state.configuration.googleApiKey} `
// );

// Set selected fields to be used on Premiro job
// fn(state => {
//   const selectFields = state.data.values.flat();
//   selectFields.splice(selectFields.indexOf('SELECT FIELDS '), 1);

//   const uniqueSelectFields = [...new Set(selectFields)];

//   return { ...state, uniqueSelectFields };
// });
// =============================================================================

// Get Select Fields values from Googlesheet UNICEF Thailand & MOPH Interoperability Mapping [MASTER]
fn(state => {
  if (state.noop) {
    console.log('No data to process; logic in this workflow step is skipped');
    return state;
  }

  const selectFields = [
    //'location_current',
    'occupation_1',
    'if_out_of_school__specify_reason',
    'nationality_fa822dc',
    'gender_4e8704a',
    'relationship_with_the_abused_eb757fc',
    'social_status_6c1074a',
    'occupation_09639f9',
    'stimulant_9191303',
    'relation_within_family_41a62f4',
    'environment_3c4fc2b',
    'economic_issues_84c5b46',
    'physical_issue_1f182e4',
    'mental_issue_5607d21',
    'relationship_with_the_abused_365fcd1',
    'gender_2dea3c9',
    'social_status_7c0989a',
    'occupation_c4d6420',
    //'location_of_the_incident_885fe8c',
    'sender_s_gender_b83c931',
    'sender_s_occupation_3ed671e',
    'type_of_place_where_the_incident_occurred_bdc967d',
    'type_of_abuse_431f2ba',
    'specify_physical_abuse_4867f38',
    'specify_sexual_abuse_16d36f7',
    'specify_physical_interaction_d13d273',
    'sexual_intercourse_a1585d0',
    'if_no_physical_touch__please_specify_1159dde',
    'specify_mental_abuse_6182644',
    'specify_neglect_9b8a22b',
    'specify_exploitation_ef65c2e',
    'specify_human_trafficking_dca84dd',
    'stimulant_a4096c2',
    'relation_within_family_a6c45fd',
    'economic_issue_a445217',
    'physical_issue_2e9f1c6',
    'mental_issue_4785ece',
    'urgent_protection_concern',
    'risk_level',
    'social_problems_identified_1',
    'home_visit_required__2',
    'vagina_details',
    'cervix_details',
    'discharge_details',
    'uterus_details',
    'penis_details_79f31be',
    'urethra_and_discharge_60eb64e',
    'scrotal_sac_f93e04a',
    'anus_and_rectum_eaf3784',
    'source_of_information_44cac9a',
    'disabilities_1',
    'chronic_illness',
    'mental_illness',
    'behavior_of_risk',
    'developmental_issue',
    'vaccinations_are_up_to_date',
    'nutritional_conditions_are_adequate',
    'caregiver_s_disabilities',
    'caregiver_s_chronic_illness_es',
    'caregiver_s_mental_illness_es',
    'caregiver_s_economic_issue_s',
    'caregiver_s_substance_abuse_issue',
    'physical_abuse_issue',
    'gambling_issue_in_the_family',
    'substance_abuse_in_the_family_community',
    'entertainment_venues_near_the_household',
    'girls_lie_together_in_the_same_room_as_their_male_relatives',
    'girls_lie_together_in_the_same_room_as_their_female_relatives',
    'boys_lie_in_the_same_room_as_their_female_relatives',
    'boys_lie_together_in_the_same_room_as_their_male_relatives',
    'history_of_illegal_activities_behaviors_in_the_family',
    'history_of_child_labor_in_the_family_community',
    'bullying',
    'mingling_and_causing_annoyance_to_others',
    'gambling',
    'substance_abuse',
    'involved_in_sex_trade',
    'behaves_in_a_sexually_inappropriate_or_obscene_manner',
    'resisting_parental_teachings',
    'family_status',
    'is_this_person_living_in_the_same_household_as_patient_7d39e1d',
    'relation',
    'relation_is_alive',
    'relation_nationality',
    'occupation_3',
    //'relation_location_current',
    'reason_for_unexpected_pregnancy',
    'specify_contraception_problem',
    'specify_legal_offenses',
    'factors_for_pregnancy_termination',
    'specify_physical_issue',
    'specify_mental_issue',
    'specify_family_social_economic_issues',
    'patient_provided_with_alternative_counseling',
    'patient_decision_after_being_provided_with_alternative_counseling',
    'antenatal_care_will_be_provided_at',
    'support_needed',
    'support_needed_1',
    'source_of_information_647b9db',
    'is_the_subject_given_the_benefit_of_the_doubt_',
    'assessment_method',
    'protection_concerns',
    'conference_type',
    'conference_reason',
    'conference_case_status',
    'conference_case_transfer_reason',
    'relation_to_the_child_37c30dc',
    'sex_check_and_evaluation',
    'physical',
    'mental',
    'social',
    'physical_1',
    'mental_1',
    'reproductive_health',
    'psycho_social',
    'status_of_treatment_plan_a8ca0e8',
    'service_response_type',
    'service_type',
    'service_response_timeframe',
    //'service_implementing_agency',
    //'service_implementing_agency_individual',
    'service_referral',
    'service_implemented',
    //'service_delivery_location',
    'followup_type',
    'child_was_seen',
    'reason_child_not_seen',
    'action_taken_already',
    'need_follow_up_visit',
    'recommend_case_closed',
    'status',
    'closure_reason',
  ];

  return { ...state, selectFields };
});

// get forms from Primero
// get('/api/v2/forms');
fn(state => {
  if (state.noop) return state;

  return getForms()(state);
});

// Get a list of selected externallyDefinedOptionSets (as objects that either
// HAVE or don't have values... yet.)
fn(state => {
  console.log(state.noop);
  if (state.noop) return state;

  const { selectFields } = state;
  const forms = state.data;
  const fieldNames = forms
    .map(form => form.fields.map(field => field.name))
    .flat();

  // Check if select field exist in forms response
  selectFields.map(str => {
    if (!fieldNames.includes(str))
      console.log(`Error: select field ${str} not found in forms response`);
  });

  const externallyDefinedOptionSets = forms
    .map(form =>
      form.fields
        .filter(field => selectFields.includes(field.name))
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

  // Clean up duplicates keys in externallyDefinedOptionSets to get uniqueExternallyDefinedOptionSets
  const uniqueExternallyDefinedOptionSets = [
    ...new Set(externallyDefinedOptionSets),
  ];

  // select fields lookup mapping
  const sfToLookupMap = forms
    .map(form =>
      form.fields
        .filter(field => selectFields.includes(field.name))
        .map(field =>
          field.hasOwnProperty('option_strings_source')
            ? {
                [field.name]: field.option_strings_source.replace(
                  'lookup ',
                  ''
                ),
              }
            : {
                [field.name]: {
                  unique_id: field.name,
                  values: field.option_strings_text,
                },
              }
        )
        .flat()
    )
    .flat()
    .map(sf => sf)
    .reduce((acc, curr) => {
      const [[k, v]] = Object.entries(curr);
      return { ...acc, [k]: v };
    }, {});

  return {
    ...state,
    forms,
    selectFields,
    sfToLookupMap,
    uniqueExternallyDefinedOptionSets,
  };
});

// Get _all_ of the actual values for externallyDefinedOptionSets in Primero (they call these "lookups")
// get('/api/v2/lookups?per=1000000&page=1');
fn(state => {
  if (state.noop) return state;

  return getLookups({ per: 1000000, page: 1 })(state);
});

// Using the uniqueExternallyDefinedOptionSets, get the option values for each set.
fn(state => {
  if (state.noop) return state;

  const { uniqueExternallyDefinedOptionSets, forms, selectFields } = state;
  const lookups = state.data;

  const translations = uniqueExternallyDefinedOptionSets
    .map(s => {
      if (typeof s == 'object') return s;
      const lookup = lookups.find(l => l.unique_id === s);
      if (!lookup) {
        // Let's find out which field.name from forms response is missing a lookup
        const selectFieldsForMissingLookup = forms
          .map(form => {
            return form.fields
              .filter(field => selectFields.includes(field.name))
              .filter(field => field.option_strings_source == s)
              .map(field => field.name)
              .flat();
          })
          .flat();

        const uniqueselectFieldsForMissingLookup = [
          ...new Set(selectFieldsForMissingLookup),
        ];

        console.log(`Could not find translations for: ${s} on lookups`);

        uniqueselectFieldsForMissingLookup.map(sf => {
          console.log(`Select field for a missing lookup :${s} is :${sf}`);
        });
      }
      return lookup;
    })
    .filter(s => s)
    .reduce((acc, v) => {
      return {
        ...acc,
        [v.unique_id]: v.values
          .map(x => ({ [x.id]: x.display_text.th }))
          .reduce((obj, item) => {
            const [[k, v]] = Object.entries(item);
            return { ...obj, [k]: v };
          }, {}),
      };
    }, {});

  return { ...state, translations };
});

// but THIS needs changes... because it doesn't currenlty care whether or not you have cases in an array.
// Get locations translations
// get('/api/v2/locations?per=1000000');
fn(state => {
  if (state.noop) return state;

  return getLocations({ per: 1000000 })(state);
});

// NEEDS NO CHANGES............ you would have already written this to only take action on that array.
// location translations mapping
fn(state => {
  if (state.noop) return state;

  // else do the rest of the operation...
  const locations = state.data.data;
  const { filteredCases, translations, sfToLookupMap, noop } = state;

  const locationsMap = locations.reduce((acc, curr) => {
    acc[curr.code] = curr.name.th;
    return acc;
  }, {});

  return {
    noop,
    filteredCases,
    translations,
    locationsMap,
    sfToLookupMap,
    interventionToBeCreated: [],
    interventionsToBeUpdate: [],
    notFoundInterventions: [],
  };
});

// Post the translation to OpenFn Inbox
// post(`${state.configuration.openFnInboxURL}`, {
//   headers: { 'x-api-key': state.configuration.xApiKey },
//   body: state => {
//     const { translations, locationsMap } = state;
//     return { translations, locationsMap };
//   },
// });

// For perfomance debugging, you can use this trick here
// const before = new Date();
// Then start of your operations
// const locationsMap = locations.reduce((acc, v) => {
//   return { ...acc, [v.name.en]: v.name.th };
// }, {});
// End of your operation
// const after = new Date();
// console.log(
//   'locations.reduce (line 280) duration was:',
//   (after - before) / 1000
// );
