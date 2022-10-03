// operation 1 is a post, to get an access token
post(`${state.configuration.url}/Users/login`, {
  agentOptions: { rejectUnauthorized: false },
  headers: { 'content-type': 'application/json' },
  body: {
    email: state.configuration.email,
    password: state.configuration.password,
  },
});

// To update when spec for Flow 1 , job #3 submitted
fn(state => {
  const { filteredCases, translations, locationsMap, sfToLookupMap } = state;

  // helper function for formating national_id_no
  const formatNationalId = national_id_no => {
    return typeof national_id_no === 'string'
      ? national_id_no.replace(/-/g, '')
      : national_id_no;
  };
  const access_token = state.data.id;
  console.log('Authentication done...');

  let todaysDate = new Date().toJSON().slice(0, 10);
  // Helper function to check for Empty string in filteredCases
  const checkEmptyStr = item => {
    const checkItem = item && item.length === 0 ? '' : item;
    return typeof item === 'undefined' ? null : checkItem;
  };

  const before = new Date();
  filteredCases.map(cs => {
    const formMap = {
      age_assessment: {
        date_of_assessment: cs.age_assessment
          ? checkEmptyStr(cs.age_assessment[0].date_of_assessment)
          : null,
        assessment_method: translations[sfToLookupMap['assessment_method']],
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
        assessment_requested_on: checkEmptyStr(cs.assessment_requested_on),
        case_plan_due_date: checkEmptyStr(cs.case_plan_due_date),
        urgent_protection_concern: checkEmptyStr(cs.urgent_protection_concern),
        risk_level: translations[sfToLookupMap['risk_level']],
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
        national_id_no: checkEmptyStr(cs.national_id_no),
        registration_date: checkEmptyStr(cs.registration_date),
        case_id_display: checkEmptyStr(cs.case_id_display),
        physical_characteristics: checkEmptyStr(cs.physical_characteristics),
        other_id_no: checkEmptyStr(cs.other_id_no),
        other_id_type: checkEmptyStr(cs.other_id_type),
        location_current: cs.location_current
          ? locationsMap[cs.location_current]
          : null,
        address_of_accomodation__foreigners_only_: checkEmptyStr(
          cs.address_of_accomodation__foreigners_only_
        ),
        assessment_due_date: checkEmptyStr(cs.assessment_due_date),
      },
      closer_form: {
        status: translations[sfToLookupMap['status']],
        closure_reason: translations[sfToLookupMap['closure_reason']],
        closure_reason_other: checkEmptyStr(cs.closure_reason_other),
        date_closure: checkEmptyStr(cs.date_closure),
        additional_comments_a0185f7: checkEmptyStr(
          cs.additional_comments_a0185f7
        ),
      },
      conclusion: {
        urgent_protection_concern: checkEmptyStr(cs.urgent_protection_concern),
        protection_concerns: translations[sfToLookupMap['protection_concerns']],
        protection_concerns_other: checkEmptyStr(cs.protection_concerns_other),
        risk_level: translations[sfToLookupMap['risk_level']],
      },
      conference_details_container: {
        conference_date: checkEmptyStr(cs.conference_date),
        conference_type: translations[sfToLookupMap['conference_type']],
        conference_type_other: checkEmptyStr(cs.conference_type_other),
        conference_reason: translations[sfToLookupMap['conference_reason']],
        conference_reason_other: checkEmptyStr(cs.conference_reason_other),
        conference_participants: checkEmptyStr(cs.conference_participants),
        conference_current_situation: checkEmptyStr(
          cs.conference_current_situation
        ),
        conference_outcome_recommendations: checkEmptyStr(
          cs.conference_outcome_recommendations
        ),
        conference_case_status:
          translations[sfToLookupMap['conference_case_status']],
        conference_case_status_other: checkEmptyStr(
          cs.conference_case_status_other
        ),
        conference_case_transfer_reason:
          translations[sfToLookupMap['conference_case_transfer_reason']],
        conference_case_transfer_reason_other: checkEmptyStr(
          cs.conference_case_transfer_reason_other
        ),
        conference_followup_actions: checkEmptyStr(
          cs.conference_followup_actions
        ),
      },
      cp_case_plan: {
        date_case_plan: checkEmptyStr(cs.date_case_plan),
        protection_concerns: translations[sfToLookupMap['protection_concerns']],
        additional_details_3d84596: checkEmptyStr(
          cs.additional_details_3d84596
        ),
      },
      family_details: {
        family_size: checkEmptyStr(cs.family_size),
        who_is_the_patient_living_with_: checkEmptyStr(
          cs.who_is_the_patient_living_with_
        ),
        family_status: translations[sfToLookupMap['family_status']],
        family_notes: checkEmptyStr(cs.family_notes),
      },
      family_details_section: {
        is_this_person_living_in_the_same_household_as_patient_7d39e1d:
          checkEmptyStr(
            cs.is_this_person_living_in_the_same_household_as_patient_7d39e1d
          ),
        relation: translations[sfToLookupMap['relation']],
        relation_is_caregiver: checkEmptyStr(cs.relation_is_caregiver),
        relation_name: checkEmptyStr(cs.relation_name),
        relation_age: checkEmptyStr(cs.relation_age),
        relation_date_of_birth: checkEmptyStr(cs.relation_date_of_birth),
        relation_is_alive: translations[sfToLookupMap['relation_is_alive']],
        relation_death_details: checkEmptyStr(cs.relation_death_details),
        relation_nationality:
          translations[sfToLookupMap['relation_nationality']],
        national_id: checkEmptyStr(cs.national_id),
        occupation_3: translations[sfToLookupMap['occupation_3']],
        relation_occupation: checkEmptyStr(cs.relation_occupation),
        relation_location_current: cs.relation_location_current
          ? locationsMap[cs.relation_location_current]
          : null,
        relation_address_current: checkEmptyStr(cs.relation_address_current),
        relation_telephone: checkEmptyStr(cs.relation_telephone),
        relation_comments: checkEmptyStr(cs.relation_comments),
      },
      followup: {
        final_diagnosis_3696c45: checkEmptyStr(cs.final_diagnosis_3696c45),
        main_diagnosis__04438ee: checkEmptyStr(cs.main_diagnosis__04438ee),
        co_morbidity_d3dfab2: checkEmptyStr(cs.co_morbidity_d3dfab2),
        complications_123ecae: checkEmptyStr(cs.complications_123ecae),
        other_diagnosis_a692bec: checkEmptyStr(cs.other_diagnosis_a692bec),
        operation_room_procedure_bb7cffa: checkEmptyStr(
          cs.operation_room_procedure_bb7cffa
        ),
        external_cause_of_injury_8451818: checkEmptyStr(
          cs.external_cause_of_injury_8451818
        ),
        status_of_treatment_plan_a8ca0e8:
          translations[sfToLookupMap['status_of_treatment_plan_a8ca0e8']],
        protection_concerns: translations[sfToLookupMap['protection_concerns']],
        risk_level: translations[sfToLookupMap['risk_level']],
      },
      followup_subform_section: {
        followup_type: translations[sfToLookupMap['followup_type']],
        followup_date: checkEmptyStr(cs.followup_date),
        child_was_seen: checkEmptyStr(cs.child_was_seen),
        reason_child_not_seen:
          translations[sfToLookupMap['reason_child_not_seen']],
        reason_child_not_seen_other_details: checkEmptyStr(
          cs.reason_child_not_seen_other_details
        ),
        action_taken_already: checkEmptyStr(cs.action_taken_already),
        action_taken_date: checkEmptyStr(cs.action_taken_date),
        action_taken_details: checkEmptyStr(cs.action_taken_details),
        followup_comments: checkEmptyStr(cs.followup_comments),
        need_follow_up_visit: checkEmptyStr(cs.need_follow_up_visit),
        when_follow_up_visit_should_happen: checkEmptyStr(
          cs.when_follow_up_visit_should_happen
        ),
        recommend_case_closed: checkEmptyStr(cs.recommend_case_closed),
      },
      'formsection-age-assessment-a75187a': {
        age_declared_by_the_child: checkEmptyStr(cs.age_declared_by_the_child),
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
        if_yes__please_specify_1: checkEmptyStr(cs.if_yes__please_specify_1),
        mental_illness: checkEmptyStr(cs.mental_illness),
        if_yes__please_specify_2: checkEmptyStr(cs.if_yes__please_specify_2),
        behavior_of_risk: checkEmptyStr(cs.behavior_of_risk),
        if_yes__please_specify_3: checkEmptyStr(cs.if_yes__please_specify_3),
        reproductive_health_information: checkEmptyStr(
          cs.reproductive_health_information
        ),
        developmental_issue: checkEmptyStr(cs.developmental_issue),
        if_yes__please_specify_4: checkEmptyStr(cs.if_yes__please_specify_4),
        vaccinations_are_up_to_date: checkEmptyStr(
          cs.vaccinations_are_up_to_date
        ),
        if_not__please_specify: checkEmptyStr(cs.if_not__please_specify),
        nutritional_conditions_are_adequate: checkEmptyStr(
          cs.nutritional_conditions_are_adequate
        ),
        if_no__please_specify: checkEmptyStr(cs.if_no__please_specify),
        caregiver_s_disabilities: checkEmptyStr(cs.caregiver_s_disabilities),
        if_yes__please_specify_5: checkEmptyStr(cs.if_yes__please_specify_5),
        caregiver_s_chronic_illness_es: checkEmptyStr(
          cs.caregiver_s_chronic_illness_es
        ),
        if_yes__please_specify_6: checkEmptyStr(cs.if_yes__please_specify_6),
        caregiver_s_mental_illness_es: checkEmptyStr(
          cs.caregiver_s_mental_illness_es
        ),
        if_yes__please_specify_7: checkEmptyStr(cs.if_yes__please_specify_7),
        caregiver_s_economic_issue_s: checkEmptyStr(
          cs.caregiver_s_economic_issue_s
        ),
        if_yes__please_specify_8: checkEmptyStr(cs.if_yes__please_specify_8),
        caregiver_s_substance_abuse_issue: checkEmptyStr(
          cs.caregiver_s_substance_abuse_issue
        ),
        if_yes__please_specify_9: checkEmptyStr(cs.if_yes__please_specify_9),
        physical_abuse_issue: checkEmptyStr(cs.physical_abuse_issue),
        if_yes__please_specify_10: checkEmptyStr(cs.if_yes__please_specify_10),
        other_relevant_information_about_the_caregiver_s: checkEmptyStr(
          cs.other_relevant_information_about_the_caregiver_s
        ),
        gambling_issue_in_the_family: checkEmptyStr(
          cs.gambling_issue_in_the_family
        ),
        if_yes__please_specify_11: checkEmptyStr(cs.if_yes__please_specify_11),
        substance_abuse_in_the_family_community: checkEmptyStr(
          cs.substance_abuse_in_the_family_community
        ),
        if_yes__please_specify_12: checkEmptyStr(cs.if_yes__please_specify_12),
        entertainment_venues_near_the_household: checkEmptyStr(
          cs.entertainment_venues_near_the_household
        ),
        if_yes__please_specify_13: checkEmptyStr(cs.if_yes__please_specify_13),
        girls_lie_together_in_the_same_room_as_their_male_relatives:
          checkEmptyStr(
            cs.girls_lie_together_in_the_same_room_as_their_male_relatives
          ),
        girls_lie_together_in_the_same_room_as_their_female_relatives:
          checkEmptyStr(
            cs.girls_lie_together_in_the_same_room_as_their_female_relatives
          ),
        boys_lie_in_the_same_room_as_their_female_relatives: checkEmptyStr(
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
        history_of_illegal_activities_behaviors_in_the_family: checkEmptyStr(
          cs.history_of_illegal_activities_behaviors_in_the_family
        ),
        if_yes__please_specify_14: checkEmptyStr(cs.if_yes__please_specify_14),
        history_of_child_labor_in_the_family_community: checkEmptyStr(
          cs.history_of_child_labor_in_the_family_community
        ),
        if_yes__please_specify_15: checkEmptyStr(cs.if_yes__please_specify_15),
        bullying: checkEmptyStr(cs.bullying),
        if_yes__please_specify_16: checkEmptyStr(cs.if_yes__please_specify_16),
        mingling_and_causing_annoyance_to_others: checkEmptyStr(
          cs.mingling_and_causing_annoyance_to_others
        ),
        if_yes__please_specify_17: checkEmptyStr(cs.if_yes__please_specify_17),
        gambling: checkEmptyStr(cs.gambling),
        if_yes__please_specify_18: checkEmptyStr(cs.if_yes__please_specify_18),
        substance_abuse: checkEmptyStr(cs.substance_abuse),
        if_yes__please_specify_19: checkEmptyStr(cs.if_yes__please_specify_19),
        involved_in_sex_trade: checkEmptyStr(cs.involved_in_sex_trade),
        if_yes__please_specify_20: checkEmptyStr(cs.if_yes__please_specify_20),
        behaves_in_a_sexually_inappropriate_or_obscene_manner: checkEmptyStr(
          cs.behaves_in_a_sexually_inappropriate_or_obscene_manner
        ),
        if_yes__please_specify_21: checkEmptyStr(cs.if_yes__please_specify_21),
        resisting_parental_teachings: checkEmptyStr(
          cs.resisting_parental_teachings
        ),
        if_yes__please_specify_22: checkEmptyStr(cs.if_yes__please_specify_22),
      },
      'formsection-cp-act-be-2546-report-699f528': {
        reporting_date_d36d4ae: checkEmptyStr(cs.reporting_date_d36d4ae),
        report_registration_number_b868e09: checkEmptyStr(
          cs.report_registration_number_b868e09
        ),
        full_name_ab6062c: checkEmptyStr(cs.full_name_ab6062c),
        position_9401fd4: checkEmptyStr(cs.position_9401fd4),
        agency_75fac1e: checkEmptyStr(cs.agency_75fac1e),
        contact_details_aa1dbe6: checkEmptyStr(cs.contact_details_aa1dbe6),
      },
      'formsection-medical-costs-and-service-fees-847e08f': {
        current_total: checkEmptyStr(cs.current_total),
      },
      new_expense: {
        date_1: checkEmptyStr(cs.date_1),
        amount: checkEmptyStr(cs.amount),
        description: checkEmptyStr(cs.description),
      },
      closure_form: {
        status: translations[sfToLookupMap['status']],
        closure_reason: translations[sfToLookupMap['closure_reason']],
        closure_reason_other: checkEmptyStr(cs.closure_reason_other),
        date_closure: checkEmptyStr(cs.date_closure),
        additional_comments_a0185f7: checkEmptyStr(
          cs.additional_comments_a0185f7
        ),
      },
      new_formal_complaint_2: {
        report_date_and_time_1: checkEmptyStr(cs.report_date_and_time_1),
        case_number_code_1: checkEmptyStr(cs.case_number_code_1),
        police_station_name_1: checkEmptyStr(cs.police_station_name_1),
        police_focal_point: checkEmptyStr(cs.police_focal_point),
      },
      services_section: {
        follow_up_date_71b7f60: checkEmptyStr(cs.follow_up_date_71b7f60),
        service_external_referral: checkEmptyStr(cs.service_external_referral),
        service_implementing_agency_external: checkEmptyStr(
          cs.service_implementing_agency_external
        ),
        service_provider: checkEmptyStr(cs.service_provider),
        service_delivery_location: cs.service_delivery_location
          ? locationsMap[cs.service_delivery_location]
          : null,
        service_location: checkEmptyStr(cs.service_location),
      },
      services_needed: {
        sex_check_and_evaluation: checkEmptyStr(cs.sex_check_and_evaluation),
        physical: translations[sfToLookupMap['physical']],
        mental: translations[sfToLookupMap['mental']],
        social: translations[sfToLookupMap['social']],
        physical_1: translations[sfToLookupMap['physical_1']],
        please_specify_13: checkEmptyStr(cs.please_specify_13),
        mental_1: translations[sfToLookupMap['mental_1']],
        reproductive_health: translations[sfToLookupMap['reproductive_health']],
        test_text_service_needed: checkEmptyStr(cs.test_text_service_needed),
        if_other__please_specify_12: checkEmptyStr(
          cs.if_other__please_specify_12
        ),
        laboratory_test_results: checkEmptyStr(cs.laboratory_test_results),
        other_support_needed: checkEmptyStr(cs.other_support_needed),
        full_name_3: checkEmptyStr(cs.full_name_3),
        date_service_needed_by: checkEmptyStr(cs.date_service_needed_by),
      },
      witnesses__6c0a3: {
        full_name_1dde243: checkEmptyStr(cs.full_name_1dde243),
        relation_to_the_child_37c30dc:
          translations[sfToLookupMap['relation_to_the_child_37c30dc']],
        testimony__cec1e35: checkEmptyStr(cs.testimony__cec1e35),
      },
      new_pregnancy: {
        date_of_report: checkEmptyStr(cs.date_of_report),
        current_gestational_week: checkEmptyStr(cs.current_gestational_week),
        reason_for_unexpected_pregnancy:
          translations[sfToLookupMap['reason_for_unexpected_pregnancy']],
        specify_contraception_problem:
          translations[sfToLookupMap['specify_contraception_problem']],
        support_needed: translations[sfToLookupMap['support_needed']],
        if_other__please_specify_10: checkEmptyStr(
          cs.if_other__please_specify_10
        ),
        specify_legal_offenses:
          translations[sfToLookupMap['specify_legal_offenses']],
        factors_for_pregnancy_termination:
          translations[sfToLookupMap['factors_for_pregnancy_termination']],
        specify_physical_issue:
          translations[sfToLookupMap['specify_physical_issue']],
        specify_mental_issue:
          translations[sfToLookupMap['specify_mental_issue']],
        specify_family_social_economic_issues:
          translations[sfToLookupMap['specify_family_social_economic_issues']],
        other_factors__please_detail: checkEmptyStr(
          cs.other_factors__please_detail
        ),
        patient_provided_with_alternative_counseling: checkEmptyStr(
          cs.patient_provided_with_alternative_counseling
        ),
        patient_decision_after_being_provided_with_alternative_counseling:
          checkEmptyStr(
            cs.patient_decision_after_being_provided_with_alternative_counseling
          ),
        antenatal_care_will_be_provided_at:
          translations[sfToLookupMap['antenatal_care_will_be_provided_at']],
        if_other__please_specify_11: checkEmptyStr(
          cs.if_other__please_specify_11
        ),
        support_needed_1: translations[sfToLookupMap['support_needed_1']],
        additional_support: checkEmptyStr(cs.additional_support),
        source_of_information_647b9db:
          translations[sfToLookupMap['source_of_information_647b9db']],
      },
      'formsection-unexpected-pregnancy-9a51ea8': {
        first_pregnancy_at_age: checkEmptyStr(cs.first_pregnancy_at_age),
        number_of_live_births_to_date: checkEmptyStr(
          cs.number_of_live_births_to_date
        ),
        history_of_abortion__if_any_: checkEmptyStr(
          cs.history_of_abortion__if_any_
        ),
      },
      physical_check_2: {
        description_of_physical_examination_observations_1: checkEmptyStr(
          cs.description_of_physical_examination_observations_1
        ),
        patient_s_weight: checkEmptyStr(cs.patient_s_weight),
        patient_s_height: checkEmptyStr(cs.patient_s_height),
        date_of_last_period_menstruation: checkEmptyStr(
          cs.date_of_last_period_menstruation
        ),
        general_examination_results: checkEmptyStr(
          cs.general_examination_results
        ),
        general_description_of_genitalia_examination: checkEmptyStr(
          cs.general_description_of_genitalia_examination
        ),
        labia_minora_details: checkEmptyStr(cs.labia_minora_details),
        introitus_details: checkEmptyStr(cs.introitus_details),
        hymen_details_3538ed4: checkEmptyStr(cs.hymen_details_3538ed4),
        if_teared__please_estimate_date: checkEmptyStr(
          cs.if_teared__please_estimate_date
        ),
        vagina_details: checkEmptyStr(cs.vagina_details),
        if_abnormal__please_specify: checkEmptyStr(
          cs.if_abnormal__please_specify
        ),
        If_abnormal__please_specify_1: checkEmptyStr(
          cs.If_abnormal__please_specify_1
        ),
        discharge_details: checkEmptyStr(cs.discharge_details),
        if_abnormal__please_specify_2: checkEmptyStr(
          cs.if_abnormal__please_specify_2
        ),
        uterus_details: checkEmptyStr(cs.uterus_details),
        if_abnormal__please_specify_3: checkEmptyStr(
          cs.if_abnormal__please_specify_3
        ),
        general_description_b738274: checkEmptyStr(
          cs.general_description_b738274
        ),
        penis_details_79f31be: checkEmptyStr(cs.penis_details_79f31be),
        if_abnormal__please_specify_d03f913: checkEmptyStr(
          cs.if_abnormal__please_specify_d03f913
        ),
        urethra_and_discharge_60eb64e: checkEmptyStr(
          cs.urethra_and_discharge_60eb64e
        ),
        if_abnormal__please_specify_f3f0782: checkEmptyStr(
          cs.if_abnormal__please_specify_f3f0782
        ),
        scrotal_sac_f93e04a: checkEmptyStr(cs.scrotal_sac_f93e04a),
        if_abnormal__please_specify_899040a: checkEmptyStr(
          cs.if_abnormal__please_specify_899040a
        ),
        anus_and_rectum_eaf3784: checkEmptyStr(cs.anus_and_rectum_eaf3784),
        if_abnormal__please_specify_ab4be7b: checkEmptyStr(
          cs.if_abnormal__please_specify_ab4be7b
        ),
        pregnancy_test_21c37e2: checkEmptyStr(cs.pregnancy_test_21c37e2),
        sperm_check_2612983: checkEmptyStr(cs.sperm_check_2612983),
        if_positive__please_specify_location_s: checkEmptyStr(
          cs.if_positive__please_specify_location_s
        ),
        acid_phosphates_118c999: checkEmptyStr(cs.acid_phosphates_118c999),
        hiv_ab_8c67abf: checkEmptyStr(cs.hiv_ab_8c67abf),
        vag__smeargram_strain_fce21b2: checkEmptyStr(
          cs.vag__smeargram_strain_fce21b2
        ),
        vag__parasite_7504774: checkEmptyStr(cs.vag__parasite_7504774),
        vdrl_aa8c121: checkEmptyStr(cs.vdrl_aa8c121),
        hbv_ab__ag_f13b335: checkEmptyStr(cs.hbv_ab__ag_f13b335),
        hcv_ab_945585c: checkEmptyStr(cs.hcv_ab_945585c),
        other_exams_results__please_specify: checkEmptyStr(
          cs.other_exams_results__please_specify
        ),
        date_6: checkEmptyStr(cs.date_6),
        department_d8ec3cb: checkEmptyStr(cs.department_d8ec3cb),
        description_1: checkEmptyStr(cs.description_1),
        immediate_treatment_plan: checkEmptyStr(cs.immediate_treatment_plan),
        pregnancy_prevention_medication: checkEmptyStr(
          cs.pregnancy_prevention_medication
        ),
        anti_infectious_diseases_medication: checkEmptyStr(
          cs.anti_infectious_diseases_medication
        ),
        anti_hiv_medication: checkEmptyStr(cs.anti_hiv_medication),
        source_of_information_44cac9a:
          translations[sfToLookupMap['source_of_information_44cac9a']],
      },
      preliminary_observations_2: {
        initial_observations_4: checkEmptyStr(cs.initial_observations_4),
        social_problems_identified_1:
          translations[sfToLookupMap['social_problems_identified_1']],
        immediate_actions_needed_1: checkEmptyStr(
          cs.immediate_actions_needed_1
        ),
        home_visit_required__2: checkEmptyStr(cs.home_visit_required__2),
        full_name_6: checkEmptyStr(cs.full_name_6),
        date_7: checkEmptyStr(cs.date_7),
      },
      'formsection-incident-details-fe05aa4': {
        date_of_incident_creation_e497d33: checkEmptyStr(
          cs.date_of_incident_creation_e497d33
        ),
      },
      'formsection-incident-details-fe05aa3': {
        date_of_abuse_6e0107e: checkEmptyStr(cs.date_of_abuse_6e0107e),
        location_of_the_incident_885fe8c: cs.location_of_the_incident_885fe8c
          ? locationsMap['location_of_the_incident_885fe8c']
          : null,
        sender_s_national_id_number_eff07fa: checkEmptyStr(
          cs.sender_s_national_id_number_eff07fa
        ),
        sender_s_gender_b83c931:
          translations[sfToLookupMap['sender_s_gender_b83c931']],
        sender_s_occupation_3ed671e:
          translations[sfToLookupMap['sender_s_occupation_3ed671e']],
        sender_s_contact_details_8ef4518: checkEmptyStr(
          cs.sender_s_contact_details_8ef4518
        ),
        address_where_the_incident_took_place_6a203b8: checkEmptyStr(
          cs.address_where_the_incident_took_place_6a203b8
        ),
        type_of_place_where_the_incident_occurred_bdc967d:
          translations[
            sfToLookupMap['type_of_place_where_the_incident_occurred_bdc967d']
          ],
        other_relevant_details_ecfea34: checkEmptyStr(
          cs.other_relevant_details_ecfea34
        ),
        type_of_abuse_431f2ba:
          translations[sfToLookupMap['type_of_abuse_431f2ba']],
        specify_physical_abuse_4867f38:
          translations[sfToLookupMap['specify_physical_abuse_4867f38']],
        if_other__please_specify_047c1fb: checkEmptyStr(
          cs.if_other__please_specify_047c1fb
        ),
        specify_sexual_abuse_16d36f7:
          translations[sfToLookupMap['specify_sexual_abuse_16d36f7']],
        please_specify_7832f40: checkEmptyStr(cs.please_specify_7832f40),
        specify_physical_interaction_d13d273:
          translations[sfToLookupMap['specify_physical_interaction_d13d273']],
        sexual_intercourse_a1585d0: checkEmptyStr(
          cs.sexual_intercourse_a1585d0
        ),
        if_no_physical_touch__please_specify_1159dde:
          translations[
            sfToLookupMap['if_no_physical_touch__please_specify_1159dde']
          ],
        if_other__please_specify_e99bdbc: checkEmptyStr(
          cs.if_other__please_specify_e99bdbc
        ),
        specify_mental_abuse_6182644:
          translations[sfToLookupMap['specify_mental_abuse_6182644']],
        if_other__please_specify_fbd4f87: checkEmptyStr(
          cs.if_other__please_specify_fbd4f87
        ),
        specify_neglect_9b8a22b:
          translations[sfToLookupMap['specify_neglect_9b8a22b']],
        if_other__please_specify_d212f17: checkEmptyStr(
          cs.if_other__please_specify_d212f17
        ),
        specify_exploitation_ef65c2e:
          translations[sfToLookupMap['specify_exploitation_ef65c2e']],
        if_other__please_specify_9b6ad5d: checkEmptyStr(
          cs.if_other__please_specify_9b6ad5d
        ),
        specify_human_trafficking_dca84dd:
          translations[sfToLookupMap['specify_human_trafficking_dca84dd']],
        if_other__please_specify_ed0cad3: checkEmptyStr(
          cs.if_other__please_specify_ed0cad3
        ),
        stimulant_a4096c2: translations[sfToLookupMap['stimulant_a4096c2']],
        relation_within_family_a6c45fd:
          translations[sfToLookupMap['relation_within_family_a6c45fd']],
        economic_issue_a445217:
          translations[sfToLookupMap['economic_issue_a445217']],
        physical_issue_2e9f1c6:
          translations[sfToLookupMap['physical_issue_2e9f1c6']],
        mental_issue_4785ece:
          translations[sfToLookupMap['mental_issue_4785ece']],
        other_contributing_factors__please_specify_f276d39: checkEmptyStr(
          cs.other_contributing_factors__please_specify_f276d39
        ),
        full_name_0aff4ee: checkEmptyStr(cs.full_name_0aff4ee),
      },
      other_perpetrator_details_f80fc4e: {
        name_f5a1eac: checkEmptyStr(cs.name_f5a1eac),
        relationship_with_the_abused_365fcd1:
          translations[sfToLookupMap['relationship_with_the_abused_365fcd1']],
        national_id_number_a822f83: checkEmptyStr(
          cs.national_id_number_a822f83
        ),
        type_of_other_id_document_64e3ffc: checkEmptyStr(
          cs.type_of_other_id_document_64e3ffc
        ),
        number_of_other_id_document_cddbddb: checkEmptyStr(
          cs.number_of_other_id_document_cddbddb
        ),
        gender_2dea3c9: checkEmptyStr(cs.gender_2dea3c9),
        age_6587e58: checkEmptyStr(cs.age_6587e58),
        social_status_7c0989a:
          translations[sfToLookupMap['social_status_7c0989a']],
        occupation_c4d6420: translations[sfToLookupMap['occupation_c4d6420']],
        contact_details_b98ed09: checkEmptyStr(cs.contact_details_b98ed09),
      },
      'formsection-perpetrator-details-998d1e0': {
        number_of_perpetrator_1c07dd4: checkEmptyStr(
          cs.number_of_perpetrator_1c07dd4
        ),
        name_5559215: checkEmptyStr(cs.name_5559215),
        nationality_fa822dc: translations[sfToLookupMap['nationality_fa822dc']],
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
        relationship_with_the_abused_eb757fc:
          translations[sfToLookupMap['relationship_with_the_abused_eb757fc']],
        social_status_6c1074a:
          translations[sfToLookupMap['social_status_6c1074a']],
        occupation_09639f9: translations[sfToLookupMap['occupation_09639f9']],
        contact_details_31b6f3b: checkEmptyStr(cs.contact_details_31b6f3b),
        stimulant_9191303: translations[sfToLookupMap['stimulant_9191303']],
        relation_within_family_41a62f4:
          translations[sfToLookupMap['relation_within_family_41a62f4']],
        environment_3c4fc2b: translations[sfToLookupMap['environment_3c4fc2b']],
        economic_issues_84c5b46:
          translations[sfToLookupMap['economic_issues_84c5b46']],
        physical_issue_1f182e4:
          translations[sfToLookupMap['physical_issue_1f182e4']],
        mental_issue_5607d21:
          translations[sfToLookupMap['mental_issue_5607d21']],
        other_contributing_factors__please_specify_53bc483: checkEmptyStr(
          cs.other_contributing_factors__please_specify_53bc483
        ),
      },
      'formsection-patient-education-and-career-6d53ca5': {
        email_address: checkEmptyStr(cs.email_address),
        occupation_1: translations[sfToLookupMap['occupation_1']],
        if_other__please_specify_2: checkEmptyStr(
          cs.if_other__please_specify_2
        ),
        if_out_of_school__specify_reason:
          translations[sfToLookupMap['if_out_of_school__specify_reason']],
        additional_details: checkEmptyStr(cs.additional_details),
        additional_details_1: checkEmptyStr(cs.additional_details_1),
      },
    };

    let todayFormMap = { [todaysDate]: formMap };

    return get(`${state.configuration.url}/interventions/findOne`, {
      query: {
        filter: {
          where: {
            cid: formatNationalId(cs.national_id_no),
            'activities.primeroservice.serviceType': 'primero',
          },
        },
        access_token,
      },
      agentOptions: { rejectUnauthorized: false },
      // options: { successCodes: [404] },
    })(state)
      .then(({ data }) => {
        const payload = {
          [`activities.primeroservice.${todaysDate}`]: formMap,
        };

        return patch(`${state.configuration.url}/interventions/${data.id}`, {
          body: { payload },
          query: { access_token },
          agentOptions: { rejectUnauthorized: false },
        })(state)
          .then(() => {
            console.log("UPDATING INTERVENTION WITH THE FOLLOWING DATA")
            console.log(JSON.stringify(payload, null, 4));
            console.log('Updated intervention...');
          })
          .catch(error => {
            console.log(`${error},Failed to update intervention`);
          });
      })
      .catch(error => {
        console.log(`${error}, We couldn't get intervention`);

        return get(`${state.configuration.url}/people/findOne`, {
          query: {
            filter: {
              where: {
                cid: formatNationalId(cs.national_id_no),
              },
            },
            access_token,
          },
          agentOptions: { rejectUnauthorized: false },
        })(state)
          .then(({ data }) => {
            const payload = {
              cid: data.cid,
              personId: data.id,
              activities: {
                primeroservice: {
                  serviceType: 'primero',
                },
              },
            };

            Object.assign(payload.activities.primeroservice, todayFormMap);
            console.log('Person found, creating an interventions...');

            return post(`${state.configuration.url}/interventions`, {
              body: { ...payload },
              query: { access_token },
              agentOptions: { rejectUnauthorized: false },
            })(state)
              .then(({ data }) => {
                console.log("CREATING INTERVENTION WITH THE FOLLOWING DATA")
                console.log(payload)
                console.log('Interventions created...');
              })
              .catch(error => {
                console.log('We could not create interventions..');
                // throw error;
              });
          })
          .catch(error => {
            console.log(`${error},Person does not exist`);
          });
      });
  });

  const after = new Date();
  console.log(
    'filterdCases.map (line 54) duration was:',
    (after - before) / 1000
  );

  return { ...state };
});