// get forms from Primero
get(`${state.configuration.url}/api/v2/forms`, {
  headers: { 'content-type': 'application/json' },
  authentication: {
    username: state.configuration.user,
    password: state.configuration.password,
  },
  strictSSL: false,
});

// get selected fields in google sheets
// get(
//     `${state.configuration.spreedsheetUrl}/${state.configuration.spreedsheetId}/values/Select%20Fields`,
//     {
//         headers: { 'content-type': 'application/json' },
//         params: {
//             majorDimension: "COLUMNS",
//             valueRenderOption: "FORMATTED_VALUE",
//             key: state.configuration.googleAPI_KEY
//         },
//     },
//     state => {
//         const select_fields = state.data
//         console.log(select_fields)
//         return state;
//     }
// );

// Get a list of selected externallyDefinedOptionSets (either as IDs or objects)
fn(state => {
  const forms = state.data.data;

  // Assume we have the select fields values from Google sheet
  const select_fields = [
    'location_current',
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
    'location_of_the_incident_885fe8c',
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
    'relation_location_current',
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
    'urgent_protection_concern',
    'protection_concerns',
    'risk_level',
    'conference_type',
    'conference_reason',
    'conference_case_status',
    'conference_case_transfer_reason',
    'relation_to_the_child_37c30dc',
    'protection_concerns',
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
    'service_implementing_agency',
    'service_implementing_agency_individual',
    'service_referral',
    'service_implemented',
    'service_delivery_location',
    'status_of_treatment_plan_a8ca0e8',
    'protection_concerns',
    'risk_level',
    'followup_type',
    'child_was_seen',
    'reason_child_not_seen',
    'action_taken_already',
    'need_follow_up_visit',
    'recommend_case_closed',
    'status',
    'closure_reason',
  ];

  const externallyDefinedOptionSets = forms
    .map(form =>
      form.fields
        .filter(field => {
          if (select_fields.includes(field.name)) {
            return true;
          } else {
            console.log(
              `Error: field ${field.name} not part of specified selectFields`
            );
            return false;
          }
        })
        .map(field =>
          field.hasOwnProperty('option_strings_source')
            ? {
                unique_id: field.option_strings_source.replace('lookup ', ''),
                values: [],
              }
            : {
                unique_id: field.name,
                values: field.option_strings_text,
              }
        )
        .flat()
    )
    .flat();

  // Clean up duplicates keys in externallyDefinedOptionSets to get uniqueExternallyDefinedOptionSets
  let uniqueExternallyDefinedOptionSets = [];

  for (i = 0; i < externallyDefinedOptionSets.length; i++) {
    if (
      !uniqueExternallyDefinedOptionSets.find(
        x => x.unique_id === externallyDefinedOptionSets[i].unique_id
      )
    ) {
      uniqueExternallyDefinedOptionSets.push(externallyDefinedOptionSets[i]);
    }
  }

  return { ...state, uniqueExternallyDefinedOptionSets };
});

// Get _all_ of the actual values for externallyDefinedOptionSets in Primero (they call these "lookups")
get(`${state.configuration.url}/api/v2/lookups?per=1000000&page=1`, {
  headers: { 'content-type': 'application/json' },
  authentication: {
    username: state.configuration.user,
    password: state.configuration.password,
  },
  strictSSL: false,
});

// Using the uniqueExternallyDefinedOptionSets, get the option values for each set.
fn(state => {
  const optionStringsSourceLookupNames =
    state.uniqueExternallyDefinedOptionSets;

  const lookupTranslations = state.data.data;

  // For optionStringsSourceLookupNames with existing values
  const formsTranslationsMapping = optionStringsSourceLookupNames
    .filter(optStringsSourceLookupName => {
      if (optStringsSourceLookupName.values.length !== 0) {
        return true;
      } else {
        return false;
      }
    })
    .map(optStringsSourceLookupName => {
      let desiredMappingOutput = [];

      optStringsSourceLookupName.values
        .map(val => {
          desiredMappingOutput.push({
            [val.id]: val.display_text.th,
          });
        })
        .flat();

      console.log(`Meeee ${optStringsSourceLookupName.unique_id}`);
      return {
        [optStringsSourceLookupName.unique_id]: Object.assign(
          {},
          ...desiredMappingOutput
        ),
      };
    })
    .flat();

  const lookupsTranslationsMapping = optionStringsSourceLookupNames
    .map(optStringsSourceLookupName => {
      return lookupTranslations
        .filter(lookupTranslation => {
          if (
            lookupTranslation.unique_id === optStringsSourceLookupName.unique_id
          ) {
            return true;
          } else {
            return false;
          }
        })
        .map(lookupTranslation => {
          console.log(
            `So let's build a new response ${optStringsSourceLookupName.unique_id}`
          );

          let desiredMappingOutput = [];
          // Map option values id and translations
          lookupTranslation.values
            .map(val => {
              desiredMappingOutput.push({
                [val.id]: val.display_text.th,
              });
            })
            .flat();
          return {
            [optStringsSourceLookupName.unique_id]: Object.assign(
              {},
              ...desiredMappingOutput
            ),
          };
        })
        .flat();
    })
    .flat();

  combineTranslations = formsTranslationsMapping.concat(
    lookupsTranslationsMapping
  );

  return { combineTranslations };
});
