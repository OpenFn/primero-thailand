alterState(state => {
  const nationalityMap = {
    002: 'Portugal',
    003: 'Dutch',
    004: 'Germany',
    005: 'France',
    006: 'Denmark',
    007: 'Sweden',
    008: 'Switzerland',
    009: 'Italy',
    010: 'Norway',
    011: 'Austria',
    012: 'Irish',
    013: 'Finland',
    014: 'Belgium',
    015: 'Spain',
    016: 'Russia',
    017: 'Poland',
    018: 'Czech Republic',
    019: 'Hungary',
    020: 'Greece',
    021: 'Yugoslavs',
    022: 'Luxembourg',
    023: 'Vatican City (Holy See)',
    024: 'Malta',
    025: 'Lisu',
    026: 'Bulgaria',
    027: 'Romania',
    028: 'Cyprus',
    029: 'American',
    030: 'Canada',
    031: 'Mexico',
    032: 'Cuba',
    033: 'Argentina',
    034: 'Brazil',
    035: 'Chile',
    036: 'Akha',
    037: 'Columbia',
    038: 'Lois',
    039: 'Peru',
    040: 'Panama',
    041: 'Uruguay',
    042: 'Venezuela',
    043: 'Puerto Rico',
    044: 'China',
    045: 'India',
    046: 'Vietnam',
    047: 'Japan',
    048: 'Myanmar',
    049: 'Philippines',
    050: 'Malaysia',
    051: 'Indonesia',
    052: 'Pakistan',
    053: 'South Korea',
    054: 'Singapore',
    055: 'Nepal',
    056: 'Laos',
    057: 'Cambodia',
    058: 'Sri Lanka',
    059: 'Saudi Arabia',
    060: 'Israel',
    061: 'Lebanon',
    062: 'Iran',
    063: 'Turkey',
    064: 'Bangladesh',
    065: 'Withdrawn from nationality',
    066: 'Syria',
    067: 'Iraq',
    068: 'Kuwait',
    069: 'Brunei',
    070: 'South Africa',
    071: 'Karens',
    072: 'Lahu',
    073: 'Kenya',
    074: 'Egypt',
    075: 'Ethiopia',
    076: 'Nigeria',
    077: 'United Arab Emirates',
    078: 'Guinea',
    079: 'Australia',
    080: 'New Zealand',
    081: 'Papua New Guinea',
    082: 'Hmong',
    083: 'Bohemians',
    086: 'Chinese Yunnan or Haw',
    087: 'China (formerly the Chinese. , Former Chinese national)',
    088: 'Burmese IDPs',
    089: 'Immigrants from Cambodia',
    090: 'Lao (Lao immigrants)',
    091: 'Cambodian refugees',
    096: 'Stateless',
    097: 'other',
    098: 'Not Thai nationality',
    099: 'Thailand',
    100: 'Afghanistan',
    101: 'Bahrain',
    102: 'Bhutan',
    103: 'Jordan',
    104: 'North Korea',
    105: 'Maldives',
    106: 'Mongolia',
    107: 'Oman',
    108: 'Qatar',
    109: 'Yemen',
    111: 'Fiji',
    112: 'Kiribati',
    113: 'Nauru',
    114: 'Solomon Islands',
    115: 'Tonga',
    116: 'Tuvalu',
    117: 'Vanuatu',
    118: 'Samoan',
    119: 'Albania',
    120: 'Andorra',
    122: 'Iceland',
    123: 'Liechtenstein',
    124: 'Monaco',
    125: 'San Marino',
    126: 'British (English, Scottish)',
    127: 'Algeria',
    128: 'Angola',
    129: 'Benin',
    130: 'Botswana',
    131: 'Burkina Faso',
    132: 'Burundi',
    133: 'Cameroon',
    134: 'Cape Verde',
    135: 'Central African Republic',
    136: 'Chad',
    137: 'Costa Rica',
    138: 'Republic of the Congo',
    139: 'Ivory saurian',
    140: 'Djibouti',
    141: 'Equatorial Guinea',
    142: 'Gabon',
    143: 'Gambia',
    144: 'Ghana',
    145: 'B. Guinea Bissau',
    146: 'Lesotho',
    147: 'Liberia',
    148: 'Libya',
    149: 'Malagasy',
    150: 'Malawi',
    151: 'Mali',
    152: 'Mauritania',
    153: 'Mauritius',
    154: 'Morocco',
    155: 'Mozambique',
    156: 'Niger',
    157: 'Rwanda',
    158: 'Sao Tome and Principe.',
    159: 'Senegal',
    160: 'Seychelles',
    161: 'Sierra Leone',
    162: 'Somali',
    163: 'Sudan',
    164: 'Swaziland',
    165: 'Tanzania',
    166: 'Togo',
    167: 'Tunisia',
    168: 'Uganda',
    169: 'Zaire',
    170: 'Zambia',
    171: 'Zimbabwe',
    172: 'Antigua and Barbuda',
    173: 'Bahamas',
    174: 'Barbados',
    175: 'Belize',
    177: 'Dominica',
    178: 'Dominican Republic',
    179: 'El Salvador',
    180: 'Grenada',
    181: 'Guatemala',
    182: 'Haiti',
    183: 'Honduras',
    184: 'Jamaica',
    185: 'Nicaragua',
    186: 'St. Kitts and Nevis',
    187: 'St. Lucia',
    188: 'Turks and Caicos Islands.',
    189: 'Trinidad and Tobago',
    190: 'Boleyn Weir',
    191: 'Ecuador',
    192: 'Guyana',
    193: 'Paraguay',
    194: 'Suriname',
    195: 'Arabic',
    196: 'Kachin',
    197: 'Wow',
    198: 'Shan',
    199: 'Thai Lue',
    200: 'Khmu',
    201: 'Tong fight',
    203: 'Lawa',
    205: 'Cover the groove',
    206: 'Region',
    207: 'Pa-O',
    208: 'Mon',
    209: 'Mlabri',
    212: 'China (Chinese Yunnan or Haw independent)',
    214: 'China (Chinese Yunnan or Haw immigrants)',
    216: 'Ukraine',
    219: 'China (Hong Kong)',
    220: 'China (Taiwan)',
    221: 'Croatia',
    223: 'Kazakhstan',
    224: 'Armenia',
    225: 'Azerbaijan',
    226: 'Georgia',
    227: 'Kyrgyz',
    228: 'Tajikistan',
    229: 'Uzbekistan',
    230: 'Marshall Islands',
    231: 'Micronesia',
    232: 'Palau',
    233: 'Belarus',
    234: 'Bosnia and Herzegovina.',
    235: 'Turkmen',
    236: 'Estonia',
    237: 'Latvia',
    238: 'Lithuania',
    239: 'Macedonia',
    240: 'Moldova',
    241: 'Slovakia',
    242: 'Slovenia',
    243: 'Eritrea',
    244: 'Namibia',
    245: 'Bolivia',
    246: 'Cook Islands',
    247: 'Nepali (Nepalese immigrants)',
    248: 'Mon (Burmese IDPs)',
    249: 'Shan (Burmese IDPs)',
    250: 'Vietnam (Vietnamese refugees)',
    251: 'Malaysia (Chinese communist party in the past)',
    252: 'China (Chinese communist party in the past)',
    253: 'Singapore (Chinese communist party in the past)',
    254: 'Karen (Fugitives to the city)',
    255: 'Mon (Fugitives to the city)',
    256: 'Shan (Fugitives to the city)',
    257: 'Cambodia (Fugitives to the city)',
    258: 'Mon (Hilltribe communities)',
    259: 'Karen (Hilltribe communities)',
    260: 'Palestine',
    261: 'East Timor',
    262: 'Thai Citizenship Waiver',
    263: 'Serbia and Monte Negro.',
    264: 'Cambodia (Labor)',
    265: 'Myanmar (Labor)',
    266: 'Laos (Labor)',
    267: 'Serbians',
    268: 'Montenegro Lohengrin',
    989: 'People without state registration',
    999: 'Unknown / Unspecified',
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

    const patient = state.data;

    const recentIntervention = patient.interventions.reduce((prev, curr) => {
      return prev.vstdate > curr.vstdate ? prev : curr;
    });

    const vstDateTime = recentIntervention.vsttime
      ? `${recentIntervention.vstdate} ${recentIntervention.vsttime}`
      : `${recentIntervention.vstdate}`;

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
      date_of_birth: patient.birthday && patient.birthday !== '' ? patient.birthday : '',
      age: calculateAge(new Date(patient.birthday)),
      sex: patient.sex_name && patient.sex_name !== '' ? patient.sex_name : '',
      // sex:
      //   patient.sex === '1'
      //     ? 'Male'
      //     : patient.sex === '2'
      //       ? 'Female '
      //       : 'Alternative gender',
      maritial_status: patient.marrystatus_name && patient.marrystatus_name !== ''
        ? patient.marrystatus_name
        : '',
      nationality: patient.nationality && patient.nationality !== ''
        ? state.nationalityMap[patient.nationality]
        : '',
      address_current: patient.informaddr && patient.informaddr !== '' ? patient.informaddr : '',
      //registered_address: address.filter(x => x).join(', '), //Request to remove, only map
      telephone_current: patient.hometel && patient.hometel !== ''
        ? patient.hometel !== '+'
          ? patient.hometel
          : ''
        : '',
      insurance_type_2d79b49: patient.pttype_name && patient.pttype_name !== '' ? patient.pttype_name : '',
      // ====================================================================

      // EDUCATION AND CAREER ===============================================
      school_level_attained_: patient.educate & patient.educate !== ''
        ? state.educateMap[patient.educate]
        : '',
      if_working__please_specify_5c0dd61: patient.occupation_name && patient.occupation_name !== ''
        ? patient.occupation_name
        : '',
      // ====================================================================

      // DEPARTEMENT IDENTIFICATION =========================================
      service_department_87cec18: recentIntervention.main_dep && recentIntervention.main_dep !== ''
        ? recentIntervention.main_dep
        : '',
      service_place_code_98d0a58: patient.hcode && patient.hcode !== '' ? patient.hcode : '',
      outpatient_number: recentIntervention.vn && recentIntervention.vn !== ''
        ? `${recentIntervention.vn.substring(
          0,
          2
        )}-${recentIntervention.vn.substring(2)}`
        : '', //TODO: If value defined, return format NN-NNNNNNN where first 2 digits + '-' + remaining string
      case_detected_by: recentIntervention.spclty_name && recentIntervention.spclty_name !== ''
        ? recentIntervention.spclty_name
        : '',
      date_and_time_of_visit_to_the_hospital: vstDateTime && vstDateTime !== '' ?
        new Date(
          vstDateTime
        ).toISOString() : '',
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
    for (type in labOrderType) labOrderResultObj[labOrderType[type]] = '';

    patient.interventions.forEach(intervention => {
      const { assessment, laboratory, anc } = intervention.activities;

      const assessmentObj = {
        description_of_physical_examination_observations_1:
          assessment && assessment.length > 0 ? (assessment[0].physicalexam && assessment[0].physicalexam !== '' ? assessment[0].physicalexam : '') : '',
        patient_s_weight:
          assessment && assessment.length > 0 ? (assessment[0].bw && assessment[0].bw !== '' ? assessment[0].bw : '') : '',
        patient_s_height:
          assessment && assessment.length > 0 ? (assessment[0].height && assessment[0].height !== '' ? assessment[0].height : '') : '',
        date_of_last_period_menstruation:
          anc && anc.length > 0 ? (anc[0].lmp && anc[0].lmp !== '' ? anc[0].lmp : '') : '',
        general_examination_results:
          assessment && assessment.length > 0 ? (assessment[0].pe && assessment[0].pe !== '' ? assessment[0].pe : '') : '',
        date_6: intervention.vstdate && intervention.vstdate !== '' ? intervention.vstdate : '',
        department_d8ec3cb: intervention.main_dep && intervention.main_dep !== '' ? intervention.main_dep : '',
        unique_id: `${intervention.id}${patient.cid}`,
        source_of_information_44cac9a: 'his',
        if_teared__please_estimate_date:
          assessment && assessment.length > 0 ? (assessment[0].pe_gen_text && assessment[0].pe_gen_text !== '' ? assessment[0].pe_gen_text : '') : '',
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
          const ancObj = {
            unique_id: `${ancElement.date}${ancElement.ga_week}`,
            current_gestational_week: ancElement.ga_week && ancElement.ga_week !== ''
              ? ancElement.ga_week
              : '',
            date_of_report: ancElement.date && ancElement.date !== '' ? ancElement.date : '',
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
    for (type in diagType) diagnosisObj[diagType[type]] = '';
    const trimDiagType = diagtype => {
      return diagtype.length === 2 ? diagtype[1] : diagtype;
    };
    // patient.interventions.forEach(intervention => {
    const { diagnosis } = recentIntervention.activities;
    if (diagnosis)
      diagnosis.forEach(diag => {
        const { diagtype, diag_name, icd10 } = diag;
        // if there is anything in the diagnosisObj we are building
        if (diagnosisObj[diagType[trimDiagType(diagtype)]]) {
          // ... if that thing doest not include the current diag_name
          if (
            !diagnosisObj[diagType[trimDiagType(diagtype)]].includes(diag_name)
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
