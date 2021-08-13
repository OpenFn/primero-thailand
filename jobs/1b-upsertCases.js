alterState(state => {
  const maritalMap = {
    1: 'single',
    2: 'married_cohabitating',
    3: 'widowed',
    4: 'divorced_separated',
    5: 'seperated_595fb0b',
    6: 'monk_792c197',
    7: 'unknown_270da62',
  };

  const nationalityMap = {
    100: 'afghanistan',
    036: 'akha_77e13cf',
    119: 'albania',
    127: 'algeria',
    029: 'usa',
    120: 'andorra',
    128: 'angola',
    172: 'antigua_and_barbuda',
    195: 'arabic_e3c807d',
    033: 'argentina',
    224: 'armenia',
    079: 'australia',
    011: 'austria',
    225: 'azerbaijan',
    145: 'guinea_bissau',
    173: 'bahamas',
    101: 'bahrain',
    064: 'bangladesh',
    174: 'barbados',
    233: 'belarus',
    014: 'belgium',
    175: 'belize',
    129: 'benin',
    102: 'bhutan',
    083: 'bohemians_9f8ed16',
    190: 'boleyn_weir_cf1bf7d',
    245: 'bolivia',
    234: 'bosnia_and_herzegovina',
    130: 'botswana',
    034: 'brazil',
    126: 'british__english__scottish__b9660e5',
    069: 'brunei',
    026: 'bulgaria',
    131: 'burkina_faso',
    088: 'burmese_idps_7035500',
    132: 'burundi',
    057: 'cambodia',
    257: 'cambodia__fugitives_to_the_city__dcc3ba4',
    264: 'cambodia__labor__e5e8a39',
    091: 'cambodian_refugees_80fdd11',
    133: 'cameroon',
    030: 'canada',
    134: 'cabo_verde',
    135: 'central_african_republic',
    136: 'chad',
    035: 'chile',
    044: 'china',
    252: 'china__chinese_communist_party_in_the_past__43d35e0',
    214: 'china__chinese_yunnan_or_haw_immigrants__8dc969d',
    212: 'china__chinese_yunnan_or_haw_independent__bb8bc56',
    087: 'china__formerly_the_chinese____former_chinese_national__b3ca17d',
    219: 'china__hong_kong__089c473',
    220: 'china__taiwan__49ad06f',
    086: 'chinese_yunnan_or_haw_d0c4416',
    037: 'colombia',
    246: 'cook_islands_6032a2d',
    137: 'costa_rica',
    205: 'cover_the_groove_760940b',
    221: 'croatia',
    032: 'cuba',
    028: 'cyprus',
    018: 'czech_republic',
    006: 'denmark',
    140: 'djibouti',
    177: 'dominica',
    178: 'dominican_republic',
    003: 'netherlands',
    261: 'timor_leste',
    191: 'ecuador',
    074: 'egypt',
    179: 'el_salvador',
    141: 'equatorial_guinea',
    243: 'eritrea',
    236: 'estonia',
    075: 'ethiopia',
    111: 'fiji',
    013: 'finland',
    005: 'france',
    142: 'gabon',
    143: 'gambia',
    226: 'georgia',
    004: 'germany',
    144: 'ghana',
    020: 'greece',
    180: 'grenada',
    181: 'guatemala',
    078: 'guinea',
    192: 'guyana',
    182: 'haiti',
    082: 'hmong_ab4f799',
    183: 'honduras',
    019: 'hungary',
    122: 'iceland',
    089: 'immigrants_from_cambodia_87b280d',
    045: 'india',
    051: 'indonesia',
    062: 'iran',
    067: 'iraq',
    012: 'ireland',
    060: 'israel',
    009: 'italy',
    139: 'cote_divoire',
    184: 'jamaica',
    047: 'japan',
    103: 'jordan',
    196: 'kachin_2cfac98',
    254: 'karen__fugitives_to_the_city__27239e4',
    259: 'karen__hilltribe_communities__31d5068',
    071: 'karens_5652aa1',
    223: 'kazakhstan',
    073: 'kenya',
    200: 'khmu_0033891',
    112: 'kiribati',
    068: 'kuwait',
    227: 'kyrgyzstan',
    072: 'lahu_5042835',
    090: 'lao__lao_immigrants__dc72afe',
    056: 'laos',
    266: 'laos__labor__d95ad42',
    237: 'latvia',
    203: 'lawa_d954bcb',
    061: 'lebanon',
    146: 'lesotho',
    147: 'liberia',
    148: 'libya',
    123: 'liechtenstein',
    025: 'lisu_47521dd',
    238: 'lithuania',
    038: 'lois_dd44c1d',
    022: 'luxembourg',
    239: 'macedonia',
    149: 'malagasy_cbafc9e',
    150: 'malawi',
    050: 'malaysia',
    251: 'malaysia__chinese_communist_party_in_the_past__ab3d70d',
    105: 'maldives',
    151: 'mali',
    024: 'malta',
    230: 'marshall_islands',
    152: 'mauritania',
    153: 'mauritius',
    031: 'mexico',
    231: 'micronesia',
    209: 'mlabri_ef65bf0',
    240: 'moldova',
    208: 'mon_a8bdfbd',
    248: 'mon__burmese_idps__5710de2',
    255: 'mon__fugitives_to_the_city__2b89306',
    258: 'mon__hilltribe_communities__6953d05',
    124: 'monaco',
    106: 'mongolia',
    268: 'montenegro',
    154: 'morocco',
    155: 'mozambique',
    048: 'myanmar',
    265: 'myanmar__labor__0b98dab',
    244: 'namibia',
    113: 'nauru',
    055: 'nepal',
    247: 'nepali__nepalese_immigrants__e847725',
    080: 'new_zealand',
    185: 'nicaragua',
    156: 'niger',
    076: 'nigeria',
    104: 'north_korea',
    010: 'norway',
    098: 'not_thai_nationality_6b949f7',
    107: 'oman',
    097: 'other_39207af',
    207: 'pa_o_0223b71',
    052: 'pakistan',
    232: 'palau',
    260: 'palestine',
    040: 'panama',
    081: 'papua_new_guinea',
    193: 'paraguay',
    989: 'people_without_state_registration_8208e4b',
    039: 'peru',
    049: 'philippines',
    017: 'poland',
    002: 'portugal',
    043: 'puerto_rico_b7f5766',
    108: 'qatar',
    206: 'region_9511c6a',
    138: 'congo',
    027: 'romania',
    016: 'russia',
    157: 'rwanda',
    118: 'samoa',
    125: 'san_marino',
    158: 'sao_tome_and_principe',
    059: 'saudi_arabia',
    159: 'senegal',
    263: 'serbia_and_monte_negro__c3f39a4',
    267: 'serbia',
    160: 'seychelles',
    198: 'shan_6a36da2',
    249: 'shan__burmese_idps__91d71f0',
    256: 'shan__fugitives_to_the_city__eb42001',
    161: 'sierra_leone',
    054: 'singapore',
    253: 'singapore__chinese_communist_party_in_the_past__dadac01',
    241: 'slovakia',
    242: 'slovenia',
    114: 'solomon_islands',
    162: 'somalia',
    070: 'south_africa',
    053: 'south_korea',
    015: 'spain',
    058: 'sri_lanka',
    186: 'st_kitts_and_nevis',
    187: 'st_lucia',
    096: 'stateless_b4af0bb',
    163: 'sudan',
    194: 'suriname',
    164: 'swaziland',
    007: 'sweden',
    008: 'switzerland',
    066: 'syria',
    228: 'tajikistan',
    165: 'tanzania',
    262: 'thai_citizenship_waiver_49fa7ee',
    199: 'thai_lue_581ddcb',
    099: 'thailand',
    166: 'togo',
    201: 'tong_fight_dc4ab58',
    115: 'tonga',
    189: 'trinidad_and_tobago',
    167: 'tunisia',
    063: 'turkey',
    235: 'turkmenistan',
    188: 'turks_and_caicos_islands__0a919d1',
    116: 'tuvalu',
    168: 'uganda',
    216: 'ukraine',
    077: 'united_arab_emirates',
    999: 'unknown___unspecified_0a04c5c',
    041: 'uruguay',
    229: 'uzbekistan',
    117: 'vanuatu',
    023: 'vatican',
    042: 'venezuela',
    046: 'vietnam',
    250: 'vietnam__vietnamese_refugees__489aa7e',
    065: 'withdrawn_from_nationality_e25a680',
    197: 'wow_58f4376',
    109: 'yemen',
    021: 'yugoslavs_2382b00',
    169: 'drc',
    170: 'zambia',
    171: 'zimbabwe',
  };

  const educateMap = {
    0: 'dropped_out_of_school',
    1: 'kindergarten',
    2: 'primary_school',
    3: 'junior_high_school',
    4: 'high_school___vocational_education',
    5: 'bachelor',
    6: 'higher_than_bachelor',
    9: 'no_information',
  };

  let people = [];
  if (Array.isArray(state.data)) {
    people = Array.from(state.data);
  } else {
    people.push(state.data);
  }

  return {
    ...state,
    maritalMap,
    people,
    nationalityMap,
    educateMap,
  };
});

each(
  '$.people[*]',
  alterState(state => {
    const calculateAge = dob => {
      const diff = Date.now() - dob.getTime();
      const age_dt = new Date(diff);

      return Math.abs(age_dt.getUTCFullYear() - 1970);
    };

    const isEmpty = obj => {
      return Object.keys(obj).length === 0;
    };

    const patient = state.data;

    const recentIntervention =
      patient.interventions.length > 0
        ? patient.interventions.reduce((prev, curr) => {
            return prev.vstdate > curr.vstdate ? prev : curr;
          })
        : {};

    const vstDateTime = !isEmpty(recentIntervention)
      ? recentIntervention.vsttime
        ? `${recentIntervention.vstdate} ${recentIntervention.vsttime}`
        : `${recentIntervention.vstdate}`
      : null;

    const national_id_no = `${patient.cid}`; //Remove national_id formatting
    // const national_id_no = `${patient.cid.substring(
    //   0,
    //   2
    // )}-${patient.cid.substring(2, 6)}-${patient.cid.substring(
    //   6,
    //   11
    // )}-${patient.cid.substring(11, 13)}`;

    const address = [
      patient.addrpart,
      patient.moopart,
      patient.road,
      patient.tmbpart,
      patient.amppart,
      patient.chwpart,
    ];

    let data = {
      mark_synced_status: 'synced',
      //TODO: Move to credentials
      mark_synced_url:
        'https://www.openfn.org/inbox/7b080edf-4466-4041-a4b3-9dbfdf02daee',
      record_id: state.record_id,

      // PATIENT IDENTIFICATION FORM ========================================
      national_id_no,
      other_agency_id: patient.hn ? patient.hcode + '/' + patient.hn : '',
      //other_agency_id: recentIntervention.hn && recentIntervention.hn !== '' ? recentIntervention.hn : '',
      name_last: patient.lname,
      name_first: patient.fname,
      date_of_birth:
        patient.birthday && patient.birthday !== '' ? patient.birthday : '',
      age: calculateAge(new Date(patient.birthday)),
      // sex: patient.sex_name && patient.sex_name !== '' ? patient.sex_name : '',
      sex: patient.sex === '1' ? 'male' : patient.sex === '2' ? 'female' : '',
      maritial_status:
        patient.marrystatus && patient.marrystatus !== ''
          ? state.maritalMap[patient.marrystatus]
          : '',
      // To test 4. Primero update fail job: comment out 1. `nationality` and uncomment 2.
      // nationality:
      //   patient.nationality && patient.nationality !== ''
      //     ? [state.nationalityMap[patient.nationality]]
      //     : [''],
      nationality:
        patient.nationality && patient.nationality !== ''
          ? state.nationalityMap[patient.nationality]
          : '',
      address_current:
        patient.informaddr && patient.informaddr !== ''
          ? patient.informaddr
          : '',
      //registered_address: address.filter(x => x).join(', '), //Request to remove, only map
      telephone_current:
        patient.hometel && patient.hometel !== ''
          ? patient.hometel !== '+'
            ? patient.hometel
            : ''
          : '',
      insurance_type_2d79b49:
        patient.pttype_name && patient.pttype_name !== ''
          ? patient.pttype_name
          : '',
      // ====================================================================

      // EDUCATION AND CAREER ===============================================
      school_level_attained_:
        patient.educate && patient.educate !== ''
          ? state.educateMap[patient.educate]
          : '',
      if_working__please_specify_5c0dd61:
        patient.occupation_name && patient.occupation_name !== ''
          ? patient.occupation_name
          : '',
      // ====================================================================

      // DEPARTEMENT IDENTIFICATION =========================================
      service_department_87cec18:
        recentIntervention.main_dep && recentIntervention.main_dep !== ''
          ? recentIntervention.main_dep
          : '',
      service_place_code_98d0a58:
        patient.hcode && patient.hcode !== '' ? patient.hcode : '',
      outpatient_number:
        recentIntervention.vn && recentIntervention.vn !== ''
          ? `${recentIntervention.vn.substring(
              0,
              2
            )}-${recentIntervention.vn.substring(2)}`
          : '', //TODO: If value defined, return format NN-NNNNNNN where first 2 digits + '-' + remaining string
      case_detected_by_b4272cd:
        recentIntervention.spclty_name && recentIntervention.spclty_name !== ''
          ? recentIntervention.spclty_name
          : '',
      date_and_time_of_visit_to_the_hospital:
        vstDateTime && vstDateTime !== ''
          ? new Date(vstDateTime).toISOString()
          : null,
      if_yes__please_specify: '',
      operation_room_procedure_bb7cffa: '',
      // ====================================================================
    };
    // PHYSICAL EXAMINATION IDENTIFICATION ================================
    const physical_check_2 = [];
    const new_pregnancy = [];
    const labOrderType = {
      '0602203': 'pregnancy_test_21c37e2',
      '0350408': 'sperm_check_2612983',
      '0490615': 'acid_phosphates_118c999',
      '0743299': 'hiv_ab_8c67abf',
      '0749100': 'hiv_ab_8c67abf',
      '0749300': 'hiv_ab_8c67abf',
      '0320277': 'vag__smeargram_strain_fce21b2',
      '0794298': 'vag__parasite_7504774',
      '0721298': 'vdrl_aa8c121',
      '0749303': 'hbv_ab__ag_f13b335',
      '0741699': 'hcv_ab_945585c',
      '0749103': 'hcv_ab_945585c',
    };
    const labOrderResultObj = {};
    for (let type in labOrderType) labOrderResultObj[labOrderType[type]] = '';

    patient.interventions.forEach(intervention => {
      const { assessment, laboratory, anc } = intervention.activities;

      let unique_id = `${intervention.id}${patient.cid.substring(0, 8)}`;
      unique_id = `${unique_id.substring(0, 8)}-${unique_id.substring(
        8,
        12
      )}-${unique_id.substring(12, 16)}-${unique_id.substring(
        16,
        20
      )}-${unique_id.substring(20)}`;

      const assessmentObj = {
        description_of_physical_examination_observations_1:
          assessment && assessment.length > 0
            ? assessment[0].physicalexam && assessment[0].physicalexam !== ''
              ? assessment[0].physicalexam
              : ''
            : '',
        patient_s_weight:
          assessment && assessment.length > 0
            ? assessment[0].bw && assessment[0].bw !== ''
              ? assessment[0].bw
              : null
            : null,
        patient_s_height:
          assessment && assessment.length > 0
            ? assessment[0].height && assessment[0].height !== ''
              ? assessment[0].height
              : null
            : null,
        date_of_last_period_menstruation:
          anc && anc.length > 0
            ? anc[0].lmp && anc[0].lmp !== ''
              ? anc[0].lmp
              : null
            : null,
        general_examination_results:
          assessment && assessment.length > 0
            ? assessment[0].pe && assessment[0].pe !== ''
              ? assessment[0].pe
              : ''
            : '',
        date_6:
          intervention.vstdate && intervention.vstdate !== ''
            ? intervention.vstdate
            : '',
        department_d8ec3cb:
          intervention.main_dep && intervention.main_dep !== ''
            ? intervention.main_dep
            : '',
        unique_id,
        source_of_information_44cac9a: 'his',
        if_teared__please_estimate_date:
          assessment && assessment.length > 0
            ? assessment[0].pe_gen_text && assessment[0].pe_gen_text !== ''
              ? assessment[0].pe_gen_text
              : ''
            : '',
        // NOTE: Mappings not confirmed or availbale in HIS as of May 2021 ========================================
        hymen_details_3538ed4: '',
        general_description_of_genitalia_examination: '',
        labia_minora_details: '',
        introitus_details: '',
        if_abnormal__please_specify: '',
        // ================================================================================ //
      };

      // UNEXPECTED PREGNANCY================================================
      if (anc && anc.length > 0) {
        anc.forEach(ancElement => {
          let unique_id = `${ancElement.date.replace(/\-/g, '')}${
            ancElement.ga_week
          }${patient.cid}`;
          unique_id = `${unique_id.substring(0, 8)}-${unique_id.substring(
            8,
            12
          )}-${unique_id.substring(12, 16)}-${unique_id.substring(
            16,
            20
          )}-${unique_id.substring(20)}`;
          while (unique_id.length < 36) unique_id = unique_id + '0';

          const ancObj = {
            unique_id,
            current_gestational_week:
              ancElement.ga_week && ancElement.ga_week !== ''
                ? ancElement.ga_week
                : null,
            date_of_report:
              ancElement.date && ancElement.date !== '' ? ancElement.date : '',
            source_of_information_647b9db: 'his', //Source of Information
          };
          new_pregnancy.push(ancObj);
        });
      }
      // ====================================================================

      if (laboratory && laboratory.length > 0) {
        laboratory.forEach(lab => {
          const {
            provis_labcode,
            lab_order_result,
            lab_items_unit,
            lab_items_normal_value_ref,
          } = lab;

          if (labOrderType[provis_labcode] !== undefined)
            labOrderResultObj[
              labOrderType[provis_labcode]
            ] = `${lab_order_result} ${lab_items_unit} (${lab_items_normal_value_ref})`;
        });
      }
      physical_check_2.push({ ...assessmentObj, ...labOrderResultObj });
    });

    data['physical_check_2'] = physical_check_2;
    data['new_pregnancy'] = new_pregnancy;
    // ====================================================================

    // CONCLUSION =========================================================
    const diagType = {
      1: 'main_diagnosis__04438ee',
      2: 'co_morbidity_d3dfab2',
      3: 'complications_123ecae',
      4: 'other_diagnosis_a692bec',
      5: 'external_cause_of_injury_8451818',
    };
    const diagnosisObj = {};
    for (let type in diagType) diagnosisObj[diagType[type]] = '';
    const trimDiagType = diagtype => {
      return diagtype.length === 2 ? diagtype[1] : diagtype;
    };
    // patient.interventions.forEach(intervention => {
    if (!isEmpty(recentIntervention)) {
      const { diagnosis } = recentIntervention.activities;
      if (diagnosis)
        diagnosis.forEach(diag => {
          const { diagtype, diag_name, icd10 } = diag;
          // if there is anything in the diagnosisObj we are building
          if (diagnosisObj[diagType[trimDiagType(diagtype)]]) {
            // ... if that thing doest not include the current diag_name
            if (
              !diagnosisObj[diagType[trimDiagType(diagtype)]].includes(
                diag_name
              )
            ) {
              diagnosisObj[diagType[trimDiagType(diagtype)]] = [
                diagnosisObj[diagType[trimDiagType(diagtype)]],
                `${icd10} ${diag_name}`,
              ].join(', ');
            }
          } else {
            diagnosisObj[
              diagType[trimDiagType(diagtype)]
            ] = `${icd10} ${diag_name}`;
          }
        });
    }
    // });
    // ====================================================================

    data = { ...data, ...diagnosisObj };

    console.log('Upserting case', JSON.stringify(data, null, 2));
    // return state;
    return upsertCase(
      {
        externalIds: ['record_id'],
        data,
      },
      state => {
        console.log(state.data);
        return state;
      }
    )(state);
  })
);
