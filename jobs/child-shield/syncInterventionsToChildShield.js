// operation 1 is a post, to get an access token
fn(state => {
  if (state.noop) {
    console.log('No data to process; logic in this workflow step is skipped');
    return state;
  }

  post(`${state.configuration.url}/Users/login`, {
    agentOptions: { rejectUnauthorized: false },
    headers: { 'content-type': 'application/json' },
    body: {
      email: state.configuration.email,
      password: state.configuration.password,
    },
  });
});

// Prepare helper functions for finding, updating and creating interventions
fn(state => {
  if (state.noop) return state;

  const access_token = state.data.id;
  console.log('Authentication done...');

  let todaysDate = new Date().toJSON().slice(0, 10);
  // helper function for formating national_id_no
  const formatNationalId = national_id_no => {
    return typeof national_id_no === 'string'
      ? national_id_no.replace(/-/g, '')
      : national_id_no;
  };

  const getPeopleByCid = async (cid, formMap) => {
    return get(`${state.configuration.url}/people/findOne`, {
      query: {
        filter: {
          where: {
            cid: formatNationalId(cid),
          },
        },
        access_token,
      },
      agentOptions: { rejectUnauthorized: false },
    })(state)
      .then(({ data }) => {
        return { interventionToBeCreated: { [cid]: formMap, person: data } };
      })
      .catch(error => {
        const safeError = error;
        safeError.config = '***';
        safeError.request = '***';
        safeError.response = {
          ...safeError.response,
          config: '***',
          request: '***',
        };
        console.log('Person does not exist');
        throw safeError;
      });
  };

  const getInterventionsByCid = async (cid, formMap) => {
    return get(`${state.configuration.url}/interventions/findOne`, {
      query: {
        filter: {
          where: {
            cid: formatNationalId(cid),
            'activities.primeroservice.serviceType': 'primero',
          },
        },
        access_token,
      },
      agentOptions: { rejectUnauthorized: false },
    })(state)
      .then(({ data }) => {
        console.log('Intervention found, send to interventionsToBeUpdate');
        // Add to state interventions to be updated
        return { interventionsToBeUpdate: { [data.id]: formMap } };
      })
      .catch(error => {
        console.log(`${error}`);
        console.log('Interventions not found, Check if person exist');

        return { notFoundInterventions: { [cid]: formMap } };
      });
  };

  const updateInterventions = async (id, formMap) => {
    const payload = {
      [`activities.primeroservice.${todaysDate}`]: formMap,
    };

    console.log('Updating interventions ::', JSON.stringify(payload, null, 2));
    return patch(`${state.configuration.url}/interventions/${id}`, {
      body: { ...payload },
      query: { access_token },
      agentOptions: { rejectUnauthorized: false },
    })(state);
  };

  const createInterventions = async (person, formMap) => {
    let todayFormMap = { [todaysDate]: formMap };

    const payload = {
      cid: person.cid,
      personId: person.id,
      activities: {
        primeroservice: {
          serviceType: 'primero',
        },
      },
    };

    Object.assign(payload.activities.primeroservice, todayFormMap);

    console.log('Creating interventions ::', JSON.stringify(payload, null, 2));
    return post(`${state.configuration.url}/interventions`, {
      body: { ...payload },
      query: { access_token },
      agentOptions: { rejectUnauthorized: false },
    })(state)
      .then(({ data }) => {
        console.log('INTERVENTION CREATED WITH THE FOLLOWING DATA');
        console.log(JSON.stringify(data, null, 4));
      })
      .catch(error => {
        console.log(`${error} ...We could not create interventions`);
      });
  };

  return {
    ...state,
    getInterventionsByCid,
    getPeopleByCid,
    createInterventions,
    updateInterventions,
  };
});
// To update when spec for Flow 1 , job #3 submitted
fn(state => {
  if (state.noop) return state;

  const {
    filteredCases,
    translations,
    locationsMap,
    sfToLookupMap,
    getInterventionsByCid,
  } = state;

  // Helper function to check for Empty string in filteredCases
  const checkEmptyStr = item => {
    const checkItem = item && item.length === 0 ? '' : item;
    return typeof item === 'undefined' ? null : checkItem;
  };

  const objFormatter = (obj, key) => {
    if (Array.isArray(key)) {
      return key.map(x => ({ [x]: obj[x] }));
    } else {
      return { [key]: obj[key] };
    }
  };

  const filteredCasesPromise = async () => {
    return Promise.all(
      [
        ...filteredCases.map(cs => {
          const formMap = {
            age_assessment:
              cs.age_assessment &&
              cs.age_assessment
                .map(age => ({
                  date_of_assessment: checkEmptyStr(age.date_of_assessment),
                  assessment_method: age.assessment_method
                    ? objFormatter(
                        translations[sfToLookupMap['assessment_method']],
                        age.assessment_method
                      )
                    : null,
                  age_assessed: checkEmptyStr(age.age_assessed),
                  months_20cb03a: checkEmptyStr(age.months_20cb03a),
                  maximum_age_assessed: checkEmptyStr(age.maximum_age_assessed),
                  months_1453205: checkEmptyStr(age.months_1453205),
                  additional_comments_1298bc4: checkEmptyStr(
                    age.additional_comments_1298bc4
                  ),
                  assessed_by: checkEmptyStr(age.assessed_by),
                }))
                .flat(),
            assessment: {
              assessment_requested_on: checkEmptyStr(
                cs.assessment_requested_on
              ),
              case_plan_due_date: checkEmptyStr(cs.case_plan_due_date),
              urgent_protection_concern: checkEmptyStr(
                cs.urgent_protection_concern
              ),
              risk_level: cs.risk_level
                ? objFormatter(
                    translations[sfToLookupMap['risk_level']],
                    cs.risk_level
                  )
                : null,
            },
            assessment_update:
              cs.assessment_update &&
              cs.assessment_update
                .map(assess => ({
                  update_description: checkEmptyStr(assess.update_description),
                  recorded_by_3: checkEmptyStr(assess.recorded_by_3),
                  date_5: checkEmptyStr(assess.date_5),
                }))
                .flat(),
            basic_identity: {
              national_id_no: checkEmptyStr(cs.national_id_no),
              registration_date: checkEmptyStr(cs.registration_date),
              case_id_display: checkEmptyStr(cs.case_id_display),
              physical_characteristics: checkEmptyStr(
                cs.physical_characteristics
              ),
              other_id_no: checkEmptyStr(cs.other_id_no),
              other_id_type: checkEmptyStr(cs.other_id_type),
              location_current: cs.location_current
                ? objFormatter(locationsMap, cs.location_current)
                : null,
              address_of_accomodation__foreigners_only_: checkEmptyStr(
                cs.address_of_accomodation__foreigners_only_
              ),
              assessment_due_date: checkEmptyStr(cs.assessment_due_date),
            },
            conclusion: {
              urgent_protection_concern: checkEmptyStr(
                cs.urgent_protection_concern
              ),
              protection_concerns: cs.protection_concerns
                ? objFormatter(
                    translations[sfToLookupMap['protection_concerns']],
                    cs.protection_concerns
                  )
                : null,
              protection_concerns_other: checkEmptyStr(
                cs.protection_concerns_other
              ),
              risk_level: cs.risk_level
                ? objFormatter(
                    translations[sfToLookupMap['risk_level']],
                    cs.risk_level
                  )
                : null,
            },
            conference_details_subform:
              cs.conference_details_subform &&
              cs.conference_details_subform
                .map(cdc => ({
                  conference_date: checkEmptyStr(cdc.conference_date),
                  conference_type: cdc.conference_type
                    ? objFormatter(
                        translations['conference_type'],
                        cdc.conference_type
                      )
                    : null,
                  conference_type_other: checkEmptyStr(
                    cdc.conference_type_other
                  ),
                  conference_reason: cdc.conference_reason
                    ? objFormatter(
                        translations['conference_reason'],
                        cdc.conference_reason
                      )
                    : null,
                  conference_reason_other: checkEmptyStr(
                    cdc.conference_reason_other
                  ),
                  conference_participants: checkEmptyStr(
                    cdc.conference_participants
                  ),
                  conference_current_situation: checkEmptyStr(
                    cdc.conference_current_situation
                  ),
                  conference_outcome_recommendations: checkEmptyStr(
                    cdc.conference_outcome_recommendations
                  ),
                  conference_case_status: cdc.conference_case_status
                    ? objFormatter(
                        translations[sfToLookupMap['conference_case_status']],
                        cdc.conference_case_status
                      )
                    : null,
                  conference_case_status_other: checkEmptyStr(
                    cdc.conference_case_status_other
                  ),
                  conference_case_transfer_reason:
                    cdc.conference_case_transfer_reason
                      ? objFormatter(
                          translations['conference_case_transfer_reason'],
                          cdc.conference_case_transfer_reason
                        )
                      : null,
                  conference_case_transfer_reason_other: checkEmptyStr(
                    cdc.conference_case_transfer_reason_other
                  ),
                  conference_followup_actions: checkEmptyStr(
                    cdc.conference_followup_actions
                  ),
                }))
                .flat(),
            cp_case_plan: {
              date_case_plan: checkEmptyStr(cs.date_case_plan),
              protection_concerns: cs.protection_concerns
                ? objFormatter(
                    translations[sfToLookupMap['protection_concerns']],
                    cs.protection_concerns
                  )
                : null,
              additional_details_3d84596: checkEmptyStr(
                cs.additional_details_3d84596
              ),
            },
            family_details: {
              family_size: checkEmptyStr(cs.family_size),
              who_is_the_patient_living_with_: checkEmptyStr(
                cs.who_is_the_patient_living_with_
              ),
              family_status: cs.family_status
                ? objFormatter(
                    translations[sfToLookupMap['family_status']],
                    cs.family_status
                  )
                : checkEmptyStr(cs.family_status),
              family_notes: checkEmptyStr(cs.family_notes),
            },
            family_details_section:
              cs.family_details_section &&
              cs.family_details_section
                .map(fds => ({
                  is_this_person_living_in_the_same_household_as_patient_7d39e1d:
                    checkEmptyStr(
                      fds.is_this_person_living_in_the_same_household_as_patient_7d39e1d
                    ),
                  relation: fds.relation
                    ? objFormatter(
                        translations[sfToLookupMap['relation']],
                        fds.relation
                      )
                    : checkEmptyStr(fds.relation),
                  relation_is_caregiver: checkEmptyStr(
                    fds.relation_is_caregiver
                  ),
                  relation_name: checkEmptyStr(fds.relation_name),
                  relation_age: checkEmptyStr(fds.relation_age),
                  relation_date_of_birth: checkEmptyStr(
                    fds.relation_date_of_birth
                  ),
                  relation_is_alive: fds.relation_is_alive
                    ? objFormatter(
                        translations['relation_is_alive'],
                        fds.relation_is_alive
                      )
                    : checkEmptyStr(fds.relation_is_alive),
                  relation_death_details: checkEmptyStr(
                    fds.relation_death_details
                  ),
                  relation_nationality: fds.relation_nationality
                    ? objFormatter(
                        translations[sfToLookupMap['relation_nationality']],
                        fds.relation_nationality
                      )
                    : checkEmptyStr(fds.relation_nationality),
                  national_id: checkEmptyStr(fds.national_id),
                  occupation_3: fds.occupation_3
                    ? objFormatter(
                        translations[sfToLookupMap['occupation_3']],
                        fds.occupation_3
                      )
                    : checkEmptyStr(fds.occupation_3),
                  relation_occupation: checkEmptyStr(fds.relation_occupation),
                  relation_location_current: fds.relation_location_current
                    ? objFormatter(locationsMap, fds.relation_location_current)
                    : checkEmptyStr(fds.relation_location_current),
                  relation_address_current: checkEmptyStr(
                    fds.relation_address_current
                  ),
                  relation_telephone: checkEmptyStr(fds.relation_telephone),
                  relation_comments: checkEmptyStr(fds.relation_comments),
                }))
                .flat(),
            followup: {
              final_diagnosis_3696c45: checkEmptyStr(
                cs.final_diagnosis_3696c45
              ),
              main_diagnosis__04438ee: checkEmptyStr(
                cs.main_diagnosis__04438ee
              ),
              co_morbidity_d3dfab2: checkEmptyStr(cs.co_morbidity_d3dfab2),
              complications_123ecae: checkEmptyStr(cs.complications_123ecae),
              other_diagnosis_a692bec: checkEmptyStr(
                cs.other_diagnosis_a692bec
              ),
              operation_room_procedure_bb7cffa: checkEmptyStr(
                cs.operation_room_procedure_bb7cffa
              ),
              external_cause_of_injury_8451818: checkEmptyStr(
                cs.external_cause_of_injury_8451818
              ),
              status_of_treatment_plan_a8ca0e8:
                cs.status_of_treatment_plan_a8ca0e8
                  ? objFormatter(
                      translations[
                        sfToLookupMap['status_of_treatment_plan_a8ca0e8']
                      ],
                      cs.status_of_treatment_plan_a8ca0e8
                    )
                  : null,
              protection_concerns: cs.protection_concerns
                ? objFormatter(
                    translations[sfToLookupMap['protection_concerns']],
                    cs.protection_concerns
                  )
                : null,
              risk_level: cs.risk_level
                ? objFormatter(
                    translations[sfToLookupMap['risk_level']],
                    cs.risk_level
                  )
                : null,
            },
            followup_subform_section:
              cs.followup_subform_section &&
              cs.followup_subform_section
                .map(form => ({
                  followup_type: form.followup_type
                    ? objFormatter(
                        translations[sfToLookupMap['followup_type']],
                        form.followup_type
                      )
                    : checkEmptyStr(form.followup_type),
                  followup_date: checkEmptyStr(form.followup_date),
                  child_was_seen: checkEmptyStr(form.child_was_seen),
                  reason_child_not_seen: form.reason_child_not_seen
                    ? objFormatter(
                        translations['reason_child_not_seen'],
                        form.reason_child_not_seen
                      )
                    : checkEmptyStr(form.reason_child_not_seen),
                  reason_child_not_seen_other_details: checkEmptyStr(
                    form.reason_child_not_seen_other_details
                  ),
                  action_taken_already: checkEmptyStr(
                    form.action_taken_already
                  ),
                  action_taken_date: checkEmptyStr(form.action_taken_date),
                  action_taken_details: checkEmptyStr(
                    form.action_taken_details
                  ),
                  followup_comments: checkEmptyStr(form.followup_comments),
                  need_follow_up_visit: checkEmptyStr(
                    form.need_follow_up_visit
                  ),
                  when_follow_up_visit_should_happen: checkEmptyStr(
                    form.when_follow_up_visit_should_happen
                  ),
                  recommend_case_closed: checkEmptyStr(
                    form.recommend_case_closed
                  ),
                }))
                .flat(),
            'formsection-age-assessment-a75187a': {
              age_declared_by_the_child: checkEmptyStr(
                cs.age_declared_by_the_child
              ),
              date_2: checkEmptyStr(cs.date_2),
              the_age_assessment_process_have_determined_that_the_subject_s_age_is_estimated_to_be:
                checkEmptyStr(
                  cs.the_age_assessment_process_have_determined_that_the_subject_s_age_is_estimated_to_be
                ),
              months_708ed08: checkEmptyStr(cs.months_708ed08),
              the_age_assessment_process_have_determined_that_the_subject_s_maximum_age_is_estimated_to_be:
                checkEmptyStr(
                  cs.the_age_assessment_process_have_determined_that_the_subject_s_maximum_age_is_estimated_to_be
                ),
              months_8023723: checkEmptyStr(cs.months_8023723),
              is_the_subject_given_the_benefit_of_the_doubt_: checkEmptyStr(
                cs.is_the_subject_given_the_benefit_of_the_doubt_
              ),
              additional_comments_dc86e91: checkEmptyStr(
                cs.additional_comments_dc86e91
              ),
            },
            'formsection-department-identification-e9cf45f': {
              if_other__please_specify_1: checkEmptyStr(
                cs.if_other__please_specify_1
              ),
            },
            'formsection-health-assessment-29sep-d35aedb': {
              full_name_4: checkEmptyStr(cs.full_name_4),
              date_4: checkEmptyStr(cs.date_4),
              disabilities_1: checkEmptyStr(cs.disabilities_1),
              chronic_illness: checkEmptyStr(cs.chronic_illness),
              if_yes__please_specify_1: checkEmptyStr(
                cs.if_yes__please_specify_1
              ),
              mental_illness: checkEmptyStr(cs.mental_illness),
              if_yes__please_specify_2: checkEmptyStr(
                cs.if_yes__please_specify_2
              ),
              behavior_of_risk: checkEmptyStr(cs.behavior_of_risk),
              if_yes__please_specify_3: checkEmptyStr(
                cs.if_yes__please_specify_3
              ),
              reproductive_health_information: checkEmptyStr(
                cs.reproductive_health_information
              ),
              developmental_issue: checkEmptyStr(cs.developmental_issue),
              if_yes__please_specify_4: checkEmptyStr(
                cs.if_yes__please_specify_4
              ),
              vaccinations_are_up_to_date: checkEmptyStr(
                cs.vaccinations_are_up_to_date
              ),
              if_not__please_specify: checkEmptyStr(cs.if_not__please_specify),
              nutritional_conditions_are_adequate: checkEmptyStr(
                cs.nutritional_conditions_are_adequate
              ),
              if_no__please_specify: checkEmptyStr(cs.if_no__please_specify),
              caregiver_s_disabilities: checkEmptyStr(
                cs.caregiver_s_disabilities
              ),
              if_yes__please_specify_5: checkEmptyStr(
                cs.if_yes__please_specify_5
              ),
              caregiver_s_chronic_illness_es: checkEmptyStr(
                cs.caregiver_s_chronic_illness_es
              ),
              if_yes__please_specify_6: checkEmptyStr(
                cs.if_yes__please_specify_6
              ),
              caregiver_s_mental_illness_es: checkEmptyStr(
                cs.caregiver_s_mental_illness_es
              ),
              if_yes__please_specify_7: checkEmptyStr(
                cs.if_yes__please_specify_7
              ),
              caregiver_s_economic_issue_s: checkEmptyStr(
                cs.caregiver_s_economic_issue_s
              ),
              if_yes__please_specify_8: checkEmptyStr(
                cs.if_yes__please_specify_8
              ),
              caregiver_s_substance_abuse_issue: checkEmptyStr(
                cs.caregiver_s_substance_abuse_issue
              ),
              if_yes__please_specify_9: checkEmptyStr(
                cs.if_yes__please_specify_9
              ),
              physical_abuse_issue: checkEmptyStr(cs.physical_abuse_issue),
              if_yes__please_specify_10: checkEmptyStr(
                cs.if_yes__please_specify_10
              ),
              other_relevant_information_about_the_caregiver_s: checkEmptyStr(
                cs.other_relevant_information_about_the_caregiver_s
              ),
              gambling_issue_in_the_family: checkEmptyStr(
                cs.gambling_issue_in_the_family
              ),
              if_yes__please_specify_11: checkEmptyStr(
                cs.if_yes__please_specify_11
              ),
              substance_abuse_in_the_family_community: checkEmptyStr(
                cs.substance_abuse_in_the_family_community
              ),
              if_yes__please_specify_12: checkEmptyStr(
                cs.if_yes__please_specify_12
              ),
              entertainment_venues_near_the_household: checkEmptyStr(
                cs.entertainment_venues_near_the_household
              ),
              if_yes__please_specify_13: checkEmptyStr(
                cs.if_yes__please_specify_13
              ),
              girls_lie_together_in_the_same_room_as_their_male_relatives:
                checkEmptyStr(
                  cs.girls_lie_together_in_the_same_room_as_their_male_relatives
                ),
              girls_lie_together_in_the_same_room_as_their_female_relatives:
                checkEmptyStr(
                  cs.girls_lie_together_in_the_same_room_as_their_female_relatives
                ),
              boys_lie_in_the_same_room_as_their_female_relatives:
                checkEmptyStr(
                  cs.boys_lie_in_the_same_room_as_their_female_relatives
                ),
              boys_lie_together_in_the_same_room_as_their_male_relatives:
                checkEmptyStr(
                  cs.boys_lie_together_in_the_same_room_as_their_male_relatives
                ),
              specify_any_other_relevant_information_on_the_sleeping_arrangements:
                checkEmptyStr(
                  cs.specify_any_other_relevant_information_on_the_sleeping_arrangements
                ),
              history_of_illegal_activities_behaviors_in_the_family:
                checkEmptyStr(
                  cs.history_of_illegal_activities_behaviors_in_the_family
                ),
              if_yes__please_specify_14: checkEmptyStr(
                cs.if_yes__please_specify_14
              ),
              history_of_child_labor_in_the_family_community: checkEmptyStr(
                cs.history_of_child_labor_in_the_family_community
              ),
              if_yes__please_specify_15: checkEmptyStr(
                cs.if_yes__please_specify_15
              ),
              bullying: checkEmptyStr(cs.bullying),
              if_yes__please_specify_16: checkEmptyStr(
                cs.if_yes__please_specify_16
              ),
              mingling_and_causing_annoyance_to_others: checkEmptyStr(
                cs.mingling_and_causing_annoyance_to_others
              ),
              if_yes__please_specify_17: checkEmptyStr(
                cs.if_yes__please_specify_17
              ),
              gambling: checkEmptyStr(cs.gambling),
              if_yes__please_specify_18: checkEmptyStr(
                cs.if_yes__please_specify_18
              ),
              substance_abuse: checkEmptyStr(cs.substance_abuse),
              if_yes__please_specify_19: checkEmptyStr(
                cs.if_yes__please_specify_19
              ),
              involved_in_sex_trade: checkEmptyStr(cs.involved_in_sex_trade),
              if_yes__please_specify_20: checkEmptyStr(
                cs.if_yes__please_specify_20
              ),
              behaves_in_a_sexually_inappropriate_or_obscene_manner:
                checkEmptyStr(
                  cs.behaves_in_a_sexually_inappropriate_or_obscene_manner
                ),
              if_yes__please_specify_21: checkEmptyStr(
                cs.if_yes__please_specify_21
              ),
              resisting_parental_teachings: checkEmptyStr(
                cs.resisting_parental_teachings
              ),
              if_yes__please_specify_22: checkEmptyStr(
                cs.if_yes__please_specify_22
              ),
            },
            'formsection-cp-act-be-2546-report-699f528': {
              reporting_date_d36d4ae: checkEmptyStr(cs.reporting_date_d36d4ae),
              report_registration_number_b868e09: checkEmptyStr(
                cs.report_registration_number_b868e09
              ),
              full_name_ab6062c: checkEmptyStr(cs.full_name_ab6062c),
              position_9401fd4: checkEmptyStr(cs.position_9401fd4),
              agency_75fac1e: checkEmptyStr(cs.agency_75fac1e),
              contact_details_aa1dbe6: checkEmptyStr(
                cs.contact_details_aa1dbe6
              ),
            },
            'formsection-medical-costs-and-service-fees-847e08f': {
              current_total: checkEmptyStr(cs.current_total),
            },
            new_expense:
              cs.new_expense &&
              cs.new_expense
                .map(ne => ({
                  date_1: checkEmptyStr(ne.date_1),
                  amount: checkEmptyStr(ne.amount),
                  description: checkEmptyStr(ne.description),
                }))
                .flat(),
            closure_form: {
              status: cs.status
                ? objFormatter(translations[sfToLookupMap['status']], cs.status)
                : null,
              closure_reason: cs.closure_reason
                ? objFormatter(
                    translations['closure_reason'],
                    cs.closure_reason
                  )
                : null,
              closure_reason_other: checkEmptyStr(cs.closure_reason_other),
              date_closure: checkEmptyStr(cs.date_closure),
              additional_comments_a0185f7: checkEmptyStr(
                cs.additional_comments_a0185f7
              ),
            },
            new_formal_complaint_2:
              cs.new_formal_complaint_2 &&
              cs.new_formal_complaint_2.map(nfc2 => ({
                report_date_and_time_1: checkEmptyStr(
                  nfc2.report_date_and_time_1
                ),
                case_number_code_1: checkEmptyStr(nfc2.case_number_code_1),
                police_station_name_1: checkEmptyStr(
                  nfc2.police_station_name_1
                ),
                police_focal_point: checkEmptyStr(nfc2.police_focal_point),
              })),
            services_section:
              cs.services_section &&
              cs.services_section
                .map(ss => ({
                  follow_up_date_71b7f60: checkEmptyStr(
                    ss.follow_up_date_71b7f60
                  ),
                  service_external_referral: checkEmptyStr(
                    ss.service_external_referral
                  ),
                  service_implementing_agency_external: checkEmptyStr(
                    ss.service_implementing_agency_external
                  ),
                  service_provider: checkEmptyStr(ss.service_provider),
                  service_delivery_location: ss.service_delivery_location
                    ? objFormatter(locationsMap, ss.service_delivery_location)
                    : null,
                  service_location: checkEmptyStr(ss.service_location),
                }))
                .flat(),
            services_needed:
              cs.services_needed &&
              cs.services_needed
                .map(sn => ({
                  sex_check_and_evaluation: checkEmptyStr(
                    sn.sex_check_and_evaluation
                  ),
                  physical: objFormatter(
                    translations[sfToLookupMap['physical']],
                    sn.physical
                  ),
                  mental: objFormatter(
                    translations[sfToLookupMap['mental']],
                    sn.mental
                  ),
                  social: objFormatter(
                    translations[sfToLookupMap['social']],
                    sn.social
                  ),
                  physical_1: objFormatter(
                    translations[sfToLookupMap['physical_1']],
                    sn.physical_1
                  ),
                  please_specify_13: checkEmptyStr(sn.please_specify_13),
                  mental_1: objFormatter(
                    translations[sfToLookupMap['mental_1']],
                    sn.mental_1
                  ),
                  reproductive_health: objFormatter(
                    translations[sfToLookupMap['reproductive_health']],
                    sn.reproductive_health
                  ),
                  test_text_service_needed: checkEmptyStr(
                    sn.test_text_service_needed
                  ),
                  if_other__please_specify_12: checkEmptyStr(
                    sn.if_other__please_specify_12
                  ),
                  laboratory_test_results: checkEmptyStr(
                    sn.laboratory_test_results
                  ),
                  other_support_needed: checkEmptyStr(sn.other_support_needed),
                  full_name_3: checkEmptyStr(sn.full_name_3),
                  date_service_needed_by: checkEmptyStr(
                    sn.date_service_needed_by
                  ),
                }))
                .flat(),
            witnesses__6c0a33c:
              cs.witnesses__6c0a33c &&
              cs.witnesses__6c0a33c
                .map(w6 => ({
                  full_name_1dde243: checkEmptyStr(w6.full_name_1dde243),
                  relation_to_the_child_37c30dc:
                    w6.relation_to_the_child_37c30dc
                      ? objFormatter(
                          translations[
                            sfToLookupMap['relation_to_the_child_37c30dc']
                          ],
                          w6.relation_to_the_child_37c30dc
                        )
                      : checkEmptyStr(w6.relation_to_the_child_37c30dc),
                  testimony__cec1e35: checkEmptyStr(w6.testimony__cec1e35),
                }))
                .flat(),
            new_pregnancy:
              cs.new_pregnancy &&
              cs.new_pregnancy
                .map(np => ({
                  date_of_report: checkEmptyStr(np.date_of_report),
                  current_gestational_week: checkEmptyStr(
                    np.current_gestational_week
                  ),
                  reason_for_unexpected_pregnancy: objFormatter(
                    translations[
                      sfToLookupMap['reason_for_unexpected_pregnancy']
                    ],
                    np.reason_for_unexpected_pregnancy
                  ),
                  specify_contraception_problem: objFormatter(
                    translations[
                      sfToLookupMap['specify_contraception_problem']
                    ],
                    np.specify_contraception_problem
                  ),
                  support_needed: objFormatter(
                    translations[sfToLookupMap['support_needed']],
                    np.support_needed
                  ),
                  if_other__please_specify_10: checkEmptyStr(
                    np.if_other__please_specify_10
                  ),
                  specify_legal_offenses: np.specify_legal_offenses
                    ? objFormatter(
                        translations[sfToLookupMap['specify_legal_offenses']],
                        np.specify_legal_offenses
                      )
                    : checkEmptyStr(np.specify_legal_offenses),
                  factors_for_pregnancy_termination: objFormatter(
                    translations[
                      sfToLookupMap['factors_for_pregnancy_termination']
                    ],
                    np.factors_for_pregnancy_termination
                  ),
                  specify_physical_issue: np.specify_physical_issue
                    ? objFormatter(
                        translations[sfToLookupMap['specify_physical_issue']],
                        np.specify_physical_issue
                      )
                    : checkEmptyStr(np.specify_physical_issue),
                  specify_mental_issue: objFormatter(
                    translations[sfToLookupMap['specify_mental_issue']],
                    np.specify_mental_issue
                  ),
                  specify_family_social_economic_issues: objFormatter(
                    translations[
                      sfToLookupMap['specify_family_social_economic_issues']
                    ],
                    np.specify_family_social_economic_issues
                  ),
                  other_factors__please_detail: checkEmptyStr(
                    np.other_factors__please_detail
                  ),
                  patient_provided_with_alternative_counseling: checkEmptyStr(
                    np.patient_provided_with_alternative_counseling
                  ),
                  patient_decision_after_being_provided_with_alternative_counseling:
                    objFormatter(
                      translations[
                        'patient_decision_after_being_provided_with_alternative_counseling'
                      ],
                      np.patient_decision_after_being_provided_with_alternative_counseling
                    ),
                  antenatal_care_will_be_provided_at: objFormatter(
                    translations[
                      sfToLookupMap['antenatal_care_will_be_provided_at']
                    ],
                    np.antenatal_care_will_be_provided_at
                  ),
                  if_other__please_specify_11: checkEmptyStr(
                    np.if_other__please_specify_11
                  ),
                  support_needed_1: objFormatter(
                    translations[sfToLookupMap['support_needed_1']],
                    np.support_needed_1
                  ),
                  additional_support: checkEmptyStr(np.additional_support),
                  source_of_information_647b9db: objFormatter(
                    translations[
                      sfToLookupMap['source_of_information_647b9db']
                    ],
                    np.source_of_information_647b9db
                  ),
                }))
                .flat(),
            'formsection-unexpected-pregnancy-9a51ea8': {
              first_pregnancy_at_age: checkEmptyStr(cs.first_pregnancy_at_age),
              number_of_live_births_to_date: checkEmptyStr(
                cs.number_of_live_births_to_date
              ),
              history_of_abortion__if_any_: checkEmptyStr(
                cs.history_of_abortion__if_any_
              ),
            },
            physical_check_2:
              cs.physical_check_2 &&
              cs.physical_check_2
                .map(pc2 => ({
                  description_of_physical_examination_observations_1:
                    checkEmptyStr(
                      pc2.description_of_physical_examination_observations_1
                    ),
                  patient_s_weight: checkEmptyStr(pc2.patient_s_weight),
                  patient_s_height: checkEmptyStr(pc2.patient_s_height),
                  date_of_last_period_menstruation: checkEmptyStr(
                    pc2.date_of_last_period_menstruation
                  ),
                  general_examination_results: checkEmptyStr(
                    pc2.general_examination_results
                  ),
                  general_description_of_genitalia_examination: checkEmptyStr(
                    pc2.general_description_of_genitalia_examination
                  ),
                  labia_minora_details: checkEmptyStr(pc2.labia_minora_details),
                  introitus_details: checkEmptyStr(pc2.introitus_details),
                  hymen_details_3538ed4: checkEmptyStr(
                    pc2.hymen_details_3538ed4
                  ),
                  if_teared__please_estimate_date: checkEmptyStr(
                    pc2.if_teared__please_estimate_date
                  ),
                  vagina_details: checkEmptyStr(pc2.vagina_details),
                  if_abnormal__please_specify: checkEmptyStr(
                    pc2.if_abnormal__please_specify
                  ),
                  if_abnormal__please_specify_1: checkEmptyStr(
                    pc2.if_abnormal__please_specify_1
                  ),
                  discharge_details: checkEmptyStr(pc2.discharge_details),
                  if_abnormal__please_specify_2: checkEmptyStr(
                    pc2.if_abnormal__please_specify_2
                  ),
                  uterus_details: checkEmptyStr(pc2.uterus_details),
                  if_abnormal__please_specify_3: checkEmptyStr(
                    pc2.if_abnormal__please_specify_3
                  ),
                  general_description_b738274: checkEmptyStr(
                    pc2.general_description_b738274
                  ),
                  penis_details_79f31be: checkEmptyStr(
                    pc2.penis_details_79f31be
                  ),
                  if_abnormal__please_specify_d03f913: checkEmptyStr(
                    pc2.if_abnormal__please_specify_d03f913
                  ),
                  urethra_and_discharge_60eb64e: checkEmptyStr(
                    pc2.urethra_and_discharge_60eb64e
                  ),
                  if_abnormal__please_specify_f3f0782: checkEmptyStr(
                    pc2.if_abnormal__please_specify_f3f0782
                  ),
                  scrotal_sac_f93e04a: checkEmptyStr(pc2.scrotal_sac_f93e04a),
                  if_abnormal__please_specify_899040a: checkEmptyStr(
                    pc2.if_abnormal__please_specify_899040a
                  ),
                  anus_and_rectum_eaf3784: checkEmptyStr(
                    pc2.anus_and_rectum_eaf3784
                  ),
                  if_abnormal__please_specify_ab4be7b: checkEmptyStr(
                    pc2.if_abnormal__please_specify_ab4be7b
                  ),
                  pregnancy_test_21c37e2: checkEmptyStr(
                    pc2.pregnancy_test_21c37e2
                  ),
                  sperm_check_2612983: checkEmptyStr(pc2.sperm_check_2612983),
                  if_positive__please_specify_location_s: checkEmptyStr(
                    pc2.if_positive__please_specify_location_s
                  ),
                  acid_phosphates_118c999: checkEmptyStr(
                    pc2.acid_phosphates_118c999
                  ),
                  hiv_ab_8c67abf: checkEmptyStr(pc2.hiv_ab_8c67abf),
                  vag__smeargram_strain_fce21b2: checkEmptyStr(
                    pc2.vag__smeargram_strain_fce21b2
                  ),
                  vag__parasite_7504774: checkEmptyStr(
                    pc2.vag__parasite_7504774
                  ),
                  vdrl_aa8c121: checkEmptyStr(pc2.vdrl_aa8c121),
                  hbv_ab__ag_f13b335: checkEmptyStr(pc2.hbv_ab__ag_f13b335),
                  hcv_ab_945585c: checkEmptyStr(pc2.hcv_ab_945585c),
                  other_exams_results__please_specify: checkEmptyStr(
                    pc2.other_exams_results__please_specify
                  ),
                  date_6: checkEmptyStr(pc2.date_6),
                  department_d8ec3cb: checkEmptyStr(pc2.department_d8ec3cb),
                  description_1: checkEmptyStr(pc2.description_1),
                  immediate_treatment_plan: checkEmptyStr(
                    pc2.immediate_treatment_plan
                  ),
                  pregnancy_prevention_medication: checkEmptyStr(
                    pc2.pregnancy_prevention_medication
                  ),
                  anti_infectious_diseases_medication: checkEmptyStr(
                    pc2.anti_infectious_diseases_medication
                  ),
                  anti_hiv_medication: checkEmptyStr(pc2.anti_hiv_medication),
                  source_of_information_44cac9a: objFormatter(
                    translations[
                      sfToLookupMap['source_of_information_44cac9a']
                    ],
                    pc2.source_of_information_44cac9a
                  ),
                }))
                .flat(),
            preliminary_observations_2:
              cs.preliminary_observations_2 &&
              cs.preliminary_observations_2
                .map(po2 => ({
                  initial_observations_4: checkEmptyStr(
                    po2.initial_observations_4
                  ),
                  social_problems_identified_1: objFormatter(
                    translations[sfToLookupMap['social_problems_identified_1']],
                    po2.social_problems_identified_1
                  ),
                  immediate_actions_needed_1: checkEmptyStr(
                    po2.immediate_actions_needed_1
                  ),
                  home_visit_required__2: checkEmptyStr(
                    po2.home_visit_required__2
                  ),
                  full_name_6: checkEmptyStr(po2.full_name_6),
                  date_7: checkEmptyStr(po2.date_7),
                }))
                .flat(),
            'formsection-incident-details-fe05aa4': {
              date_of_incident_creation_e497d33: checkEmptyStr(
                cs.date_of_incident_creation_e497d33
              ),
            },
            'formsection-incident-details-fe05aa3': {
              date_of_abuse_6e0107e: checkEmptyStr(cs.date_of_abuse_6e0107e),
              location_of_the_incident_885fe8c:
                cs.location_of_the_incident_885fe8c
                  ? objFormatter(
                      locationsMap,
                      cs.location_of_the_incident_885fe8c
                    )
                  : null,
              sender_s_national_id_number_eff07fa: checkEmptyStr(
                cs.sender_s_national_id_number_eff07fa
              ),
              sender_s_gender_b83c931: cs.sender_s_gender_b83c931
                ? objFormatter(
                    translations[sfToLookupMap['sender_s_gender_b83c931']],
                    cs.sender_s_gender_b83c931
                  )
                : null,
              sender_s_occupation_3ed671e: cs.sender_s_occupation_3ed671e
                ? objFormatter(
                    translations[sfToLookupMap['sender_s_occupation_3ed671e']],
                    cs.sender_s_occupation_3ed671e
                  )
                : null,
              sender_s_contact_details_8ef4518: checkEmptyStr(
                cs.sender_s_contact_details_8ef4518
              ),
              address_where_the_incident_took_place_6a203b8: checkEmptyStr(
                cs.address_where_the_incident_took_place_6a203b8
              ),
              type_of_place_where_the_incident_occurred_bdc967d:
                cs.type_of_place_where_the_incident_occurred_bdc967d
                  ? objFormatter(
                      translations[
                        sfToLookupMap[
                          'type_of_place_where_the_incident_occurred_bdc967d'
                        ]
                      ],
                      cs.type_of_place_where_the_incident_occurred_bdc967d
                    )
                  : null,
              other_relevant_details_ecfea34: checkEmptyStr(
                cs.other_relevant_details_ecfea34
              ),
              type_of_abuse_431f2ba: cs.type_of_abuse_431f2ba
                ? objFormatter(
                    translations[sfToLookupMap['type_of_abuse_431f2ba']],
                    cs.type_of_abuse_431f2ba
                  )
                : null,
              specify_physical_abuse_4867f38: cs.specify_physical_abuse_4867f38
                ? objFormatter(
                    translations[
                      sfToLookupMap['specify_physical_abuse_4867f38']
                    ],
                    cs.specify_physical_abuse_4867f38
                  )
                : null,
              if_other__please_specify_047c1fb: checkEmptyStr(
                cs.if_other__please_specify_047c1fb
              ),
              specify_sexual_abuse_16d36f7: objFormatter(
                translations[sfToLookupMap['specify_sexual_abuse_16d36f7']],
                cs.specify_sexual_abuse_16d36f7
              ),
              please_specify_7832f40: checkEmptyStr(cs.please_specify_7832f40),
              specify_physical_interaction_d13d273:
                cs.specify_physical_interaction_d13d273
                  ? objFormatter(
                      translations[
                        sfToLookupMap['specify_physical_interaction_d13d273']
                      ],
                      cs.specify_physical_interaction_d13d273
                    )
                  : checkEmptyStr(cs.specify_physical_interaction_d13d273),
              sexual_intercourse_a1585d0: checkEmptyStr(
                cs.sexual_intercourse_a1585d0
              ),
              if_no_physical_touch__please_specify_1159dde:
                cs.if_no_physical_touch__please_specify_1159dde
                  ? objFormatter(
                      translations[
                        sfToLookupMap[
                          'if_no_physical_touch__please_specify_1159dde'
                        ]
                      ],
                      cs.if_no_physical_touch__please_specify_1159dde
                    )
                  : checkEmptyStr(
                      cs.if_no_physical_touch__please_specify_1159dde
                    ),
              if_other__please_specify_e99bdbc: checkEmptyStr(
                cs.if_other__please_specify_e99bdbc
              ),
              specify_mental_abuse_6182644: cs.specify_mental_abuse_6182644
                ? objFormatter(
                    translations[sfToLookupMap['specify_mental_abuse_6182644']],
                    cs.specify_mental_abuse_6182644
                  )
                : checkEmptyStr(cs.specify_mental_abuse_6182644),
              if_other__please_specify_fbd4f87: checkEmptyStr(
                cs.if_other__please_specify_fbd4f87
              ),
              specify_neglect_9b8a22b: cs.specify_neglect_9b8a22b
                ? objFormatter(
                    translations[sfToLookupMap['specify_neglect_9b8a22b']],
                    cs.specify_neglect_9b8a22b
                  )
                : checkEmptyStr(cs.specify_neglect_9b8a22b),
              if_other__please_specify_d212f17: checkEmptyStr(
                cs.if_other__please_specify_d212f17
              ),
              specify_exploitation_ef65c2e: cs.specify_exploitation_ef65c2e
                ? objFormatter(
                    translations[sfToLookupMap['specify_exploitation_ef65c2e']],
                    cs.specify_exploitation_ef65c2e
                  )
                : checkEmptyStr(cs.specify_exploitation_ef65c2e),
              if_other__please_specify_9b6ad5d: checkEmptyStr(
                cs.if_other__please_specify_9b6ad5d
              ),
              specify_human_trafficking_dca84dd:
                cs.specify_human_trafficking_dca84dd
                  ? objFormatter(
                      translations[
                        sfToLookupMap['specify_human_trafficking_dca84dd']
                      ],
                      cs.specify_human_trafficking_dca84dd
                    )
                  : checkEmptyStr(cs.specify_human_trafficking_dca84dd),
              if_other__please_specify_ed0cad3: checkEmptyStr(
                cs.if_other__please_specify_ed0cad3
              ),
              stimulant_a4096c2: cs.stimulant_a4096c2
                ? objFormatter(
                    translations[sfToLookupMap['stimulant_a4096c2']],
                    cs.stimulant_a4096c2
                  )
                : checkEmptyStr(cs.stimulant_a4096c2),
              relation_within_family_a6c45fd: cs.relation_within_family_a6c45fd
                ? objFormatter(
                    translations[
                      sfToLookupMap['relation_within_family_a6c45fd']
                    ],
                    cs.relation_within_family_a6c45fd
                  )
                : checkEmptyStr(cs.relation_within_family_a6c45fd),
              economic_issue_a445217: cs.economic_issue_a445217
                ? objFormatter(
                    translations[sfToLookupMap['economic_issue_a445217']],
                    cs.economic_issue_a445217
                  )
                : checkEmptyStr(cs.economic_issue_a445217),
              physical_issue_2e9f1c6: cs.physical_issue_2e9f1c6
                ? objFormatter(
                    translations[sfToLookupMap['physical_issue_2e9f1c6']],
                    cs.physical_issue_2e9f1c6
                  )
                : checkEmptyStr(cs.physical_issue_2e9f1c6),
              mental_issue_4785ece: cs.mental_issue_4785ece
                ? objFormatter(
                    translations[sfToLookupMap['mental_issue_4785ece']],
                    cs.mental_issue_4785ece
                  )
                : checkEmptyStr(cs.mental_issue_4785ece),
              other_contributing_factors__please_specify_f276d39: checkEmptyStr(
                cs.other_contributing_factors__please_specify_f276d39
              ),
              full_name_0aff4ee: checkEmptyStr(cs.full_name_0aff4ee),
            },
            other_perpetrator_details_f80fc4e:
              cs.other_perpetrator_details_f80fc4e &&
              cs.other_perpetrator_details_f80fc4e
                .map(opd => ({
                  name_f5a1eac: checkEmptyStr(opd.name_f5a1eac),
                  relationship_with_the_abused_365fcd1:
                    opd.relationship_with_the_abused_365fcd1
                      ? objFormatter(
                          translations[
                            sfToLookupMap[
                              'relationship_with_the_abused_365fcd1'
                            ]
                          ],
                          opd.relationship_with_the_abused_365fcd1
                        )
                      : checkEmptyStr(opd.relationship_with_the_abused_365fcd1),
                  national_id_number_a822f83: checkEmptyStr(
                    opd.national_id_number_a822f83
                  ),
                  type_of_other_id_document_64e3ffc: checkEmptyStr(
                    opd.type_of_other_id_document_64e3ffc
                  ),
                  number_of_other_id_document_cddbddb: checkEmptyStr(
                    opd.number_of_other_id_document_cddbddb
                  ),
                  gender_2dea3c9: checkEmptyStr(opd.gender_2dea3c9),
                  age_6587e58: checkEmptyStr(opd.age_6587e58),
                  social_status_7c0989a: opd.social_status_7c0989a
                    ? objFormatter(
                        translations[sfToLookupMap['social_status_7c0989a']],
                        opd.social_status_7c0989a
                      )
                    : checkEmptyStr(opd.social_status_7c0989a),
                  occupation_c4d6420: opd.occupation_c4d6420
                    ? objFormatter(
                        translations[sfToLookupMap['occupation_c4d6420']],
                        opd.occupation_c4d6420
                      )
                    : checkEmptyStr(opd.occupation_c4d6420),
                  contact_details_b98ed09: checkEmptyStr(
                    opd.contact_details_b98ed09
                  ),
                }))
                .flat(),
            'formsection-perpetrator-details-998d1e0': {
              number_of_perpetrator_1c07dd4: checkEmptyStr(
                cs.number_of_perpetrator_1c07dd4
              ),
              name_5559215: checkEmptyStr(cs.name_5559215),
              nationality_fa822dc: objFormatter(
                translations[sfToLookupMap['nationality_fa822dc']],
                cs.nationality_fa822dc
              ),
              gender_4e8704a: checkEmptyStr(cs.gender_4e8704a),
              age_21cbe0d: checkEmptyStr(cs.age_21cbe0d),
              national_id_number_7dd2e74: checkEmptyStr(
                cs.national_id_number_7dd2e74
              ),
              type_of_other_id_document_b03f1b9: checkEmptyStr(
                cs.type_of_other_id_document_b03f1b9
              ),
              number_of_other_id_document_09a5601: checkEmptyStr(
                cs.number_of_other_id_document_09a5601
              ),
              relationship_with_the_abused_eb757fc: objFormatter(
                translations[
                  sfToLookupMap['relationship_with_the_abused_eb757fc']
                ],
                cs.relationship_with_the_abused_eb757fc
              ),
              social_status_6c1074a: cs.social_status_6c1074a
                ? objFormatter(
                    translations[sfToLookupMap['social_status_6c1074a']],
                    cs.social_status_6c1074a
                  )
                : checkEmptyStr(cs.social_status_6c1074a),
              occupation_09639f9: cs.occupation_09639f9
                ? objFormatter(
                    translations[sfToLookupMap['occupation_09639f9']],
                    cs.occupation_09639f9
                  )
                : checkEmptyStr(cs.occupation_09639f9),
              contact_details_31b6f3b: checkEmptyStr(
                cs.contact_details_31b6f3b
              ),
              stimulant_9191303: cs.stimulant_9191303
                ? objFormatter(
                    translations[sfToLookupMap['stimulant_9191303']],
                    cs.stimulant_9191303
                  )
                : checkEmptyStr(cs.stimulant_9191303),
              relation_within_family_41a62f4: objFormatter(
                translations[sfToLookupMap['relation_within_family_41a62f4']],
                cs.relation_within_family_41a62f4
              ),
              environment_3c4fc2b: objFormatter(
                translations[sfToLookupMap['environment_3c4fc2b']],
                cs.environment_3c4fc2b
              ),
              economic_issues_84c5b46: cs.economic_issues_84c5b46
                ? objFormatter(
                    translations[sfToLookupMap['economic_issues_84c5b46']],
                    cs.economic_issues_84c5b46
                  )
                : checkEmptyStr(cs.economic_issues_84c5b46),
              physical_issue_1f182e4: cs.physical_issue_1f182e4
                ? objFormatter(
                    translations[sfToLookupMap['physical_issue_1f182e4']],
                    cs.physical_issue_1f182e4
                  )
                : checkEmptyStr(cs.physical_issue_1f182e4),
              mental_issue_5607d21: objFormatter(
                translations[sfToLookupMap['mental_issue_5607d21']],
                cs.mental_issue_5607d21
              ),
              other_contributing_factors__please_specify_53bc483: checkEmptyStr(
                cs.other_contributing_factors__please_specify_53bc483
              ),
            },
            'formsection-patient-education-and-career-6d53ca5': {
              email_address: checkEmptyStr(cs.email_address),
              occupation_1: cs.occupation_1
                ? objFormatter(
                    translations[sfToLookupMap['occupation_1']],
                    cs.occupation_1
                  )
                : checkEmptyStr(cs.occupation_1),
              if_other__please_specify_2: checkEmptyStr(
                cs.if_other__please_specify_2
              ),
              if_out_of_school__specify_reason: objFormatter(
                translations[sfToLookupMap['if_out_of_school__specify_reason']],
                cs.if_out_of_school__specify_reason
              ),
              additional_details: checkEmptyStr(cs.additional_details),
              additional_details_1: checkEmptyStr(cs.additional_details_1),
            },
          };

          return getInterventionsByCid(cs.national_id_no, formMap);
        }),
      ].flat()
    ).then(interventions => {
      interventions.map(x => {
        x['notFoundInterventions'] &&
          state.notFoundInterventions.push(x['notFoundInterventions']);
        x['interventionsToBeUpdate'] &&
          state.interventionsToBeUpdate.push(x['interventionsToBeUpdate']);
      });
      return { ...state };
    });
  };

  return filteredCasesPromise();
});

// Update interventions
fn(state => {
  if (state.noop) return state;

  const { interventionsToBeUpdate, updateInterventions } = state;

  const updateInterventionsPromise = async () => {
    if (interventionsToBeUpdate.length > 0)
      return Promise.all(
        [
          ...interventionsToBeUpdate.map(intervention => {
            console.log('Updating intervention...');
            return updateInterventions(
              Object.keys(intervention),
              Object.values(intervention)
            );
          }),
        ].flat()
      ).then(() => {
        return { ...state };
      });
    return { ...state };
  };
  return updateInterventionsPromise();
});

// Find person for missing interventions
fn(state => {
  if (state.noop) return state;

  const { notFoundInterventions, getPeopleByCid } = state;

  const checkPersonForMissingIntervention = async () => {
    if (notFoundInterventions.length > 0)
      return Promise.all(
        [
          ...notFoundInterventions.map((intervention, i) => {
            // console.log(Object.keys(intervention)[i]);
            return getPeopleByCid(
              Object.keys(intervention)[i],
              Object.values(intervention)[i]
            );
          }),
        ].flat()
      )
        .then(persons => {
          persons.map(person =>
            state.interventionToBeCreated.push(
              person['interventionToBeCreated']
            )
          );

          return { ...state };
        })
        .catch(error => {
          throw error;
        });
    return { ...state };
  };

  return checkPersonForMissingIntervention();
});

// Create interventions for person founded
fn(state => {
  if (state.noop) return state;

  const { createInterventions, interventionToBeCreated } = state;
  const createInterventionsPromise = async () => {
    return Promise.all(
      [
        ...interventionToBeCreated.map(intervention => {
          console.log('Creating intervention...');
          return createInterventions(
            intervention.person,
            intervention[intervention.person.cid]
          );
        }),
      ].flat()
    ).then(() => {
      return { ...state };
    });
  };

  return createInterventionsPromise();
});
