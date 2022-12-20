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
    '036': 'akha_77e13cf',
    119: 'albania',
    127: 'algeria',
    '029': 'usa',
    120: 'andorra',
    128: 'angola',
    172: 'antigua_and_barbuda',
    195: 'arabic_e3c807d',
    '033': 'argentina',
    224: 'armenia',
    '079': 'australia',
    '011': 'austria',
    225: 'azerbaijan',
    145: 'guinea_bissau',
    173: 'bahamas',
    101: 'bahrain',
    '064': 'bangladesh',
    174: 'barbados',
    233: 'belarus',
    '014': 'belgium',
    175: 'belize',
    129: 'benin',
    102: 'bhutan',
    '083': 'bohemians_9f8ed16',
    190: 'boleyn_weir_cf1bf7d',
    245: 'bolivia',
    234: 'bosnia_and_herzegovina',
    130: 'botswana',
    '034': 'brazil',
    126: 'british__english__scottish__b9660e5',
    '069': 'brunei',
    '026': 'bulgaria',
    131: 'burkina_faso',
    '088': 'burmese_idps_7035500',
    132: 'burundi',
    '057': 'cambodia',
    257: 'cambodia__fugitives_to_the_city__dcc3ba4',
    264: 'cambodia__labor__e5e8a39',
    '091': 'cambodian_refugees_80fdd11',
    133: 'cameroon',
    '030': 'canada',
    134: 'cabo_verde',
    135: 'central_african_republic',
    136: 'chad',
    '035': 'chile',
    '044': 'china',
    252: 'china__chinese_communist_party_in_the_past__43d35e0',
    24: 'china__chinese_yunnan_or_haw_immigrants__8dc969d',
    212: 'china__chinese_yunnan_or_haw_independent__bb8bc56',
    '087': 'china__formerly_the_chinese____former_chinese_national__b3ca17d',
    219: 'china__hong_kong__089c473',
    220: 'china__taiwan__49ad06f',
    '086': 'chinese_yunnan_or_haw_d0c4416',
    '037': 'colombia',
    246: 'cook_islands_6032a2d',
    137: 'costa_rica',
    205: 'cover_the_groove_760940b',
    221: 'croatia',
    '032': 'cuba',
    '028': 'cyprus',
    '018': 'czech_republic',
    '006': 'denmark',
    140: 'djibouti',
    177: 'dominica',
    178: 'dominican_republic',
    '003': 'netherlands',
    261: 'timor_leste',
    191: 'ecuador',
    '074': 'egypt',
    179: 'el_salvador',
    141: 'equatorial_guinea',
    243: 'eritrea',
    236: 'estonia',
    '075': 'ethiopia',
    111: 'fiji',
    '013': 'finland',
    '005': 'france',
    142: 'gabon',
    143: 'gambia',
    226: 'georgia',
    '004': 'germany',
    144: 'ghana',
    '020': 'greece',
    180: 'grenada',
    181: 'guatemala',
    '078': 'guinea',
    192: 'guyana',
    182: 'haiti',
    '082': 'hmong_ab4f799',
    183: 'honduras',
    '019': 'hungary',
    122: 'iceland',
    '089': 'immigrants_from_cambodia_87b280d',
    '045': 'india',
    '051': 'indonesia',
    '062': 'iran',
    '067': 'iraq',
    '012': 'ireland',
    '060': 'israel',
    '009': 'italy',
    139: 'cote_divoire',
    184: 'jamaica',
    '047': 'japan',
    103: 'jordan',
    196: 'kachin_2cfac98',
    254: 'karen__fugitives_to_the_city__27239e4',
    259: 'karen__hilltribe_communities__31d5068',
    '071': 'karens_5652aa1',
    223: 'kazakhstan',
    '073': 'kenya',
    200: 'khmu_0033891',
    112: 'kiribati',
    '068': 'kuwait',
    227: 'kyrgyzstan',
    '072': 'lahu_5042835',
    '090': 'lao__lao_immigrants__dc72afe',
    '056': 'laos',
    266: 'laos__labor__d95ad42',
    237: 'latvia',
    203: 'lawa_d954bcb',
    '061': 'lebanon',
    146: 'lesotho',
    147: 'liberia',
    148: 'libya',
    123: 'liechtenstein',
    '025': 'lisu_47521dd',
    238: 'lithuania',
    '038': 'lois_dd44c1d',
    '022': 'luxembourg',
    239: 'macedonia',
    149: 'malagasy_cbafc9e',
    150: 'malawi',
    '050': 'malaysia',
    251: 'malaysia__chinese_communist_party_in_the_past__ab3d70d',
    105: 'maldives',
    151: 'mali',
    '024': 'malta',
    230: 'marshall_islands',
    152: 'mauritania',
    153: 'mauritius',
    '031': 'mexico',
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
    '048': 'myanmar',
    265: 'myanmar__labor__0b98dab',
    244: 'namibia',
    113: 'nauru',
    '055': 'nepal',
    247: 'nepali__nepalese_immigrants__e847725',
    '080': 'new_zealand',
    185: 'nicaragua',
    156: 'niger',
    '076': 'nigeria',
    104: 'north_korea',
    '010': 'norway',
    '098': 'not_thai_nationality_6b949f7',
    107: 'oman',
    '097': 'other_39207af',
    207: 'pa_o_0223b71',
    '052': 'pakistan',
    232: 'palau',
    260: 'palestine',
    '040': 'panama',
    '081': 'papua_new_guinea',
    193: 'paraguay',
    989: 'people_without_state_registration_8208e4b',
    '039': 'peru',
    '049': 'philippines',
    '017': 'poland',
    '002': 'portugal',
    '043': 'puerto_rico_b7f5766',
    108: 'qatar',
    206: 'region_9511c6a',
    138: 'congo',
    '027': 'romania',
    '016': 'russia',
    157: 'rwanda',
    118: 'samoa',
    125: 'san_marino',
    158: 'sao_tome_and_principe',
    '059': 'saudi_arabia',
    159: 'senegal',
    263: 'serbia_and_monte_negro__c3f39a4',
    267: 'serbia',
    160: 'seychelles',
    198: 'shan_6a36da2',
    249: 'shan__burmese_idps__91d71f0',
    256: 'shan__fugitives_to_the_city__eb42001',
    161: 'sierra_leone',
    '054': 'singapore',
    253: 'singapore__chinese_communist_party_in_the_past__dadac01',
    241: 'slovakia',
    242: 'slovenia',
    114: 'solomon_islands',
    162: 'somalia',
    '070': 'south_africa',
    '053': 'south_korea',
    '015': 'spain',
    '058': 'sri_lanka',
    186: 'st_kitts_and_nevis',
    187: 'st_lucia',
    '096': 'stateless_b4af0bb',
    163: 'sudan',
    194: 'suriname',
    164: 'swaziland',
    '007': 'sweden',
    '008': 'switzerland',
    '066': 'syria',
    228: 'tajikistan',
    165: 'tanzania',
    262: 'thai_citizenship_waiver_49fa7ee',
    199: 'thai_lue_581ddcb',
    '099': 'thailand',
    166: 'togo',
    201: 'tong_fight_dc4ab58',
    115: 'tonga',
    189: 'trinidad_and_tobago',
    167: 'tunisia',
    '063': 'turkey',
    235: 'turkmenistan',
    188: 'turks_and_caicos_islands__0a919d1',
    116: 'tuvalu',
    168: 'uganda',
    216: 'ukraine',
    '077': 'united_arab_emirates',
    999: 'unknown___unspecified_0a04c5c',
    '041': 'uruguay',
    229: 'uzbekistan',
    117: 'vanuatu',
    '023': 'vatican',
    '042': 'venezuela',
    '046': 'vietnam',
    250: 'vietnam__vietnamese_refugees__489aa7e',
    '065': 'withdrawn_from_nationality_e25a680',
    197: 'wow_58f4376',
    109: 'yemen',
    '021': 'yugoslavs_2382b00',
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
        ? patient.interventions
            .filter(intervention => intervention.vstdate)
            .reduce((prev, curr) => {
              return prev.vstdate > curr.vstdate ? prev : curr;
            })
        : {};

    const ifvstTime = recentIntervention.vsttime
      ? `${recentIntervention.vstdate} ${recentIntervention.vsttime}`
      : `${recentIntervention.vstdate}`;
    const vstDateTime = !isEmpty(recentIntervention) ? ifvstTime : null;

    // console.log(vstDateTime);

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

    const sharedAnswerCQ1 = {
      answers: {
        type: 'select',
        value: {
          score: {
            2: 'all_true_5a417ab',
            1: 'partially_true_35fa7e6',
            0: 'not_true_5c4d297',
          },
          th: {
            เป็นจริงทั้งหมด: 'all_true_5a417ab',
            เป็นจริงบางส่วน: 'partially_true_35fa7e6',
            ไม่จริงเลย: 'not_true_5c4d297',
          },
          en: {
            'All true': 'all_true_5a417ab',
            'Partially true': 'partially_true_35fa7e6',
            'Not true': 'not_true_5c4d297',
          },
        },
      },
    };

    const sharedAnswerAUQUEI_CQ2 = {
      answers: {
        type: 'select',
        value: {
          score: {
            0: 'not_happy_at_all_3d88bde',
            1: 'unhappy_4d6e375',
            2: 'happy_1c1406e',
            3: 'very_happy_185f560',
          },
          th: {
            '1) ไม่มีความสุขเลย': 'not_happy_at_all_3d88bde',
            '2) ไม่มีความสุข': 'unhappy_4d6e375',
            '3) มีความสุข': 'happy_1c1406e',
            '4) มีความสุขมาก': 'very_happy_185f560',
          },
          en: {
            'Not happy at all': 'not_happy_at_all_3d88bde',
            Unhappy: 'unhappy_4d6e375',
            Happy: 'happy_1c1406e',
            'Very Happy': 'very_happy_185f560',
          },
        },
      },
    };

    const sharedAnswerAUQUEI_CQ2_0 = {
      answers: {
        type: 'select',
        value: {
          score: {
            0: 'never_6cd6605',
            1: 'once_in_a_while_14725b7',
            2: 'often_cdd2705',
            3: 'very_often_dac14dd',
          },
          th: {
            ไม่เคยเลย: 'never_6cd6605',
            นานๆครั้ง: 'once_in_a_while_14725b7',
            บ่อยครั้ง: 'often_cdd2705',
            บ่อยมาก: 'very_often_dac14dd',
          },
          en: {
            Never: 'never_6cd6605',
            'Once in a while': 'once_in_a_while_14725b7',
            Often: 'often_cdd2705',
            'Very Often': 'very_often_dac14dd',
          },
        },
      },
    };

    const sharedAnswerPSu1 = {
      answers: {
        type: 'select',
        value: {
          score: {
            0: 'never_06e1b0e',
            1: 'very_rarely_0226291',
            2: 'rarely_1b2f16d',
            3: 'sometime_e587428',
            4: 'often_c9d1aa7',
            5: 'very_often_00602e0',
            6: 'always_08bfba1',
          },
          en: {
            Never: 'never_06e1b0e',
            'Very Rarely': 'very_rarely_0226291',
            Rarely: 'rarely_1b2f16d',
            Sometime: 'sometime_e587428',
            Often: 'often_c9d1aa7',
            'Very Often': 'very_often_00602e0',
            Always: 'always_08bfba1',
          },
        },
      },
    };
    const sharedAnswerPSu1_0 = {
      answers: {
        type: 'select',
        value: {
          score: {
            0: 'not_true_3691b29',
            1: 'somewhat_true_1677715',
            2: 'very_true_5d3a5a9',
          },
          en: {
            'Not true': 'not_true_3691b29',
            'Somewhat true': 'somewhat_true_1677715',
            'very true': 'very_true_5d3a5a9',
          },
          th: {
            ไม่จริง: 'not_true_3691b29',
            ค่อนข้างจริง: 'somewhat_true_1677715',
            จริงมาก: 'very_true_5d3a5a9',
          },
        },
      },
    };
    const sharedAnswerPSu1_1 = {
      answers: {
        type: 'select',
        value: {
          score: {
            0: 'never_0e6461d',
            1: '1_time_cd59eca',
            2: '2_times_76c438b',
            3: '3_times_af5df7c',
            4: '4_times_393b94d',
            5: '5_times_aabeeb5',
            6: '6_times_47383b9',
            7: '7_times_9ec7602',
            '8+': '8_times__bf866db',
          },
          en: {
            Never: 'never_0e6461d',
            '1 time': '1_time_cd59eca',
            '2 times': '2_times_76c438b',
            '3 times': '3_times_af5df7c',
            '4 times': '4_times_393b94d',
            '5 times': '5_times_aabeeb5',
            '6 times': '6_times_47383b9',
            '7 times': '7_times_9ec7602',
            '8 times': '8_times__bf866db',
          },
        },
      },
    };
    const sharedAnswerPSu1_2 = {
      answers: {
        type: 'select',
        value: {
          score: {
            0: 'rarely_or_none_of_the_time__less_than_1_day__72643c5',
            1: 'some_or_a_little_of_the_time__1_2_days__7e55e94',
            2: 'occasionally_or_a_moderate_amount_of_time__3_4_days__b151d67',
            3: 'most_or_all_of_the_time__5_7_days__bc0689e',
          },
        },
      },
    };

    const sharedAnswerPSu1_3 = {
      answers: {
        type: 'select',
        value: {
          score: {
            1: 'never_0845f9b',
            2: 'hardly_ever_f0c0dd8',
            3: 'sometimes_42c6b49',
            4: 'most_of_the_time_f19d4dc',
            5: 'almost_everyday_5b25027',
          },
          en: {
            score: {
              Never: 'never_0845f9b',
              'Hardly ever': 'hardly_ever_f0c0dd8',
              Sometimes: 'sometimes_42c6b49',
              'Most of the time': 'most_of_the_time_f19d4dc',
              'Almost everyday': 'almost_everyday_5b25027',
            },
          },
        },
      },
    };

    const sharedAnswerTrueorFalse = {
      answers: {
        type: 'select',
        value: {
          score: {
            0: 'false',
            1: 'true',
          },
        },
      },
    };

    const sharedAnswerCC = {
      answers: {
        type: 'select',
        value: {
          score: {
            0: 'never_happened__to_be_angry_or_displeased__7bae11d',
            1: '1_time__to_get_angry_or_resentful__61f31f3',
            2: '2_3_times__to_get_angry_or_resentful__4f0da6f',
            3: 'many_times__to_get_angry_or_resentful__d7ea22f',
            4: 'every_times__to_get_angry_or_resentful__ea8676b',
          },
        },
      },
    };

    const mappingSpecForPLH = [
      {
        source: {
          type: 'date',
          description: 'CC First assessment date',
          questionnaire_code: 'CC',
          week: 1,
          value: '',
        },
        destination: {
          type: 'date',
          value: 'assessment_date_2eb4573',
        },
        answers: {
          type: 'date',
          format: 'YYYY-MM-DD',
          value: {
            questionnaire_code: 'CC',
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 1,
          value:
            //'1. การจับตัวเด็กเขย่า: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] จับตัว [[(ชื่อเด็ก):caseFullName]] เขย่ากี่ครั้ง?',
            '1. การจับตัวเด็กเขย่า: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) จับตัว(ชื่อเด็ก)เขย่ากี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            'this_past_week__name_of_the_child_s_primary_caregiver__how_many_times_did_you_shake__child_s_name___e9ccdbd',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 1,
          value:
            //'2. ตะคอก ตะโกนดุด่า หรือกรีดร้องใส่เด็ก: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ตะคอก ตะโกนดุด่า หรือกรีดร้องใส่ [[(ชื่อเด็ก):caseFullName]] กี่ครั้ง?',
            '2. ตะคอก ตะโกนดุด่า หรือกรีดร้องใส่เด็ก: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ตะคอก ตะโกนดุด่า หรือกรีดร้องใส่(ชื่อเด็ก)กี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            'this_past_week_how_many_times_does__child_s_name__yell_or_scream_at__child_s_name___4166520',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 1,
          value:
            //'3. ตีก้นเด็กหรือตีที่อื่น: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ตีก้น [[(ชื่อเด็ก):caseFullName]] หรือตีที่อื่นกี่ครั้ง?',
            '3. ตีก้นเด็กหรือตีที่อื่น: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ตีก้น(ชื่อเด็ก)หรือตีที่อื่นกี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            'this_past_week__how_many_times_has__name_of_the_child_s_primary_caregiver__spanked___child_s_name__butt_or_somewhere_else_10d28bd',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 1,
          value:
            //'4. ใช้คำพูดที่ไม่ดีกับเด็ก: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ใช้คำพูดที่ไม่ดีกับ [[(ชื่อเด็ก):caseFullName]] กี่ครั้ง?',
            '4. ใช้คำพูดที่ไม่ดีกับเด็ก: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ใช้คำพูดที่ไม่ดีกับ(ชื่อเด็ก)กี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            'this_week_how_many_times_does__child_s_primary_caregiver__use_bad_words_to__child_s_name__4e0da86',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 1,
          value:
            //'5. บอกเด็กว่าจะส่งไปอยู่ที่อื่นหรือไล่ออกจากบ้าน: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] บอก [[(ชื่อเด็ก):caseFullName]] ว่าจะส่งไปอยู่ที่อื่นหรือไล่(ชื่อเด็ก)ออกจากบ้านกี่ครั้ง?',
              '5. บอกเด็กว่าจะส่งไปอยู่ที่อื่นหรือไล่ออกจากบ้าน: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) บอก(ชื่อเด็ก)ว่าจะส่งไปอยู่ที่อื่นหรือไล่(ชื่อเด็ก)ออกจากบ้านกี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            'during_the_past_week___name_of_primary_caregivers__told__child_s_name__that_s_he_will_be_sent_to_leave_in_other_places_or_kicked__child_s_name__out_of_the_house__36f26ec',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 1,
          value:
            //'6. ขู่เด็กว่าจะตีก้นหรือตีที่อื่น: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ขู่ว่าจะตีก้น [[(ชื่อเด็ก):caseFullName]] หรือตีที่อื่นกี่ครั้ง?',
             '6. ขู่เด็กว่าจะตีก้นหรือตีที่อื่น: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ขู่ว่าจะตีก้น(ชื่อเด็ก)หรือตีที่อื่นกี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            'this_past_week__how_many_times_have__name_of_the_child_s_primary_caregiver__threatening_to_spank__child_s_name__or_hit_somewhere_else__607f5ec',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 1,
          value:
            //'7. ใช้ฝ่ามือฟาดเด็กที่มือ แขน หรือขา: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ใช้ฝ่ามือฟาด [[(ชื่อเด็ก):caseFullName]] ที่ มือ แขน หรือขากี่ครั้ง?',
              '7. ใช้ฝ่ามือฟาดเด็กที่มือ แขน หรือขา: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ใช้ฝ่ามือฟาด(ชื่อเด็ก)ที่ มือ แขน หรือขากี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            'during_the_past_week__how_many_times_has__name_of_primary_caregiver__used_his_her_palm_to_hit__child_s_name__s_arm_or_leg__a01eac4',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 1,
          value:
            //'8. หยิกเด็กเมื่อเขาทำอะไรผิด: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] หยิก [[(ชื่อเด็ก):caseFullName]] เมื่อเธอทำอะไรผิดกี่ครั้ง?',
              '8. หยิกเด็กเมื่อเขาทำอะไรผิด: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) หยิก(ชื่อเด็ก)เมื่อเธอทำอะไรผิดกี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            'how_many_times_does__child_s_primary_caregiver_s_name__pinch__child_s_name__when_he_she_does_something_wrong__c8b92bc',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 1,
          value:
            //'9. ด่าว่าเด็กโง่หรือขี้เกียจ: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ด่าว่า [[(ชื่อเด็ก):caseFullName]] โง่หรือขี้เกียจกี่ครั้ง?',
              '9. ด่าว่าเด็กโง่หรือขี้เกียจ: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ด่าว่า(ชื่อเด็ก)โง่หรือขี้เกียจกี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            'this_past_week__how_many_times_have__name_of_the_child_s_primary_caretaker__scolding__child_s_name__stupid_or_lazy__f7f7a1f',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 1,
          value:
            //'10. ตบหน้าเด็ก: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ตบหน้า [[(ชื่อเด็ก):caseFullName]] กี่ครั้ง?',
              '10. ตบหน้าเด็ก: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ตบหน้า(ชื่อเด็ก)กี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            'this_past_week__how_many_times_has__name_of_the_child_s_primary_caregiver__slapped__child_s_name__face__df0b8d7',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'date',
          description: 'CC 14th assessment date',
          questionnaire_code: 'CC',
          week: 14,
          value: '',
        },
        destination: {
          type: 'date',
          //value: 'assessment_date_2eb4573',
          value: 'assessment_date_b5c03b8',
        },
        answers: {
          type: 'date',
          format: 'YYYY-MM-DD',
          value: {
            questionnaire_code: 'CC',
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 14,
          value:
            //'1. การจับตัวเด็กเขย่า: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] จับตัว [[(ชื่อเด็ก):caseFullName]] เขย่ากี่ครั้ง?',
            '1. การจับตัวเด็กเขย่า: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) จับตัว(ชื่อเด็ก)เขย่ากี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            'this_past_week__name_of_the_child_s_primary_caregiver__how_many_times_did_you_shake__child_s_name___1f21322',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 14,
          value:
            //'2. ตะคอก ตะโกนดุด่า หรือกรีดร้องใส่เด็ก: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ตะคอก ตะโกนดุด่า หรือกรีดร้องใส่ [[(ชื่อเด็ก):caseFullName]] กี่ครั้ง?',
            '2. ตะคอก ตะโกนดุด่า หรือกรีดร้องใส่เด็ก: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ตะคอก ตะโกนดุด่า หรือกรีดร้องใส่(ชื่อเด็ก)กี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
           // 'this_past_week_how_many_times_does__child_s_name__yell_or_scream_at__child_s_name___4166520',
              'this_past_week_how_many_times_does__child_s_name__yell_or_scream_at__child_s_name___cd04e17',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 14,
          value:
            //'3. ตีก้นเด็กหรือตีที่อื่น: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ตีก้น [[(ชื่อเด็ก):caseFullName]] หรือตีที่อื่นกี่ครั้ง?',
            '3. ตีก้นเด็กหรือตีที่อื่น: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ตีก้น(ชื่อเด็ก)หรือตีที่อื่นกี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            //'this_past_week__how_many_times_has__name_of_the_child_s_primary_caregiver__spanked___child_s_name__butt_or_somewhere_else_10d28bd',
              'this_past_week__how_many_times_has__name_of_the_child_s_primary_caregiver__spanked___child_s_name__butt_or_somewhere_else_e23f043',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 14,
          value:
            //'4. ใช้คำพูดที่ไม่ดีกับเด็ก: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ใช้คำพูดที่ไม่ดีกับ [[(ชื่อเด็ก):caseFullName]] กี่ครั้ง?',
             '4. ใช้คำพูดที่ไม่ดีกับเด็ก: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ใช้คำพูดที่ไม่ดีกับ(ชื่อเด็ก)กี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            //'this_week_how_many_times_does__child_s_primary_caregiver__use_bad_words_to__child_s_name__4e0da86',
              'this_week_how_many_times_does__child_s_primary_caregiver__use_bad_words_to__child_s_name__5c20fe8',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 14,
          value:
            //'5. บอกเด็กว่าจะส่งไปอยู่ที่อื่นหรือไล่ออกจากบ้าน: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] บอก [[(ชื่อเด็ก):caseFullName]] ว่าจะส่งไปอยู่ที่อื่นหรือไล่(ชื่อเด็ก)ออกจากบ้านกี่ครั้ง?',
              '5. บอกเด็กว่าจะส่งไปอยู่ที่อื่นหรือไล่ออกจากบ้าน: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) บอก(ชื่อเด็ก)ว่าจะส่งไปอยู่ที่อื่นหรือไล่(ชื่อเด็ก)ออกจากบ้านกี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
           // 'during_the_past_week___name_of_primary_caregivers__told__child_s_name__that_s_he_will_be_sent_to_leave_in_other_places_or_kicked__child_s_name__out_of_the_house__36f26ec',
              'during_the_past_week___name_of_primary_caregivers__told__child_s_name__that_s_he_will_be_sent_to_leave_in_other_places_or_kicked__child_s_name__out_of_the_house__3a26160',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 14,
          value:
            //'6. ขู่เด็กว่าจะตีก้นหรือตีที่อื่น: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ขู่ว่าจะตีก้น [[(ชื่อเด็ก):caseFullName]] หรือตีที่อื่นกี่ครั้ง?',
              '6. ขู่เด็กว่าจะตีก้นหรือตีที่อื่น: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ขู่ว่าจะตีก้น(ชื่อเด็ก)หรือตีที่อื่นกี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            //'this_past_week__how_many_times_have__name_of_the_child_s_primary_caregiver__threatening_to_spank__child_s_name__or_hit_somewhere_else__607f5ec',
              'this_past_week__how_many_times_have__name_of_the_child_s_primary_caregiver__threatening_to_spank__child_s_name__or_hit_somewhere_else__cd7d9f8',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 14,
          value:
            //'7. ใช้ฝ่ามือฟาดเด็กที่มือ แขน หรือขา: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ใช้ฝ่ามือฟาด [[(ชื่อเด็ก):caseFullName]] ที่ มือ แขน หรือขากี่ครั้ง?',
              '7. ใช้ฝ่ามือฟาดเด็กที่มือ แขน หรือขา: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ใช้ฝ่ามือฟาด(ชื่อเด็ก)ที่ มือ แขน หรือขากี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            //'during_the_past_week__how_many_times_has__name_of_primary_caregiver__used_his_her_palm_to_hit__child_s_name__s_arm_or_leg__a01eac4',
              'during_the_past_week__how_many_times_has__name_of_primary_caregiver__used_his_her_palm_to_hit__child_s_name__s_arm_or_leg__8e37a1e',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 14,
          value:
            //'8. หยิกเด็กเมื่อเขาทำอะไรผิด: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] หยิก [[(ชื่อเด็ก):caseFullName]] เมื่อเธอทำอะไรผิดกี่ครั้ง?',
              '8. หยิกเด็กเมื่อเขาทำอะไรผิด: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) หยิก(ชื่อเด็ก)เมื่อเธอทำอะไรผิดกี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
           // 'how_many_times_does__child_s_primary_caregiver_s_name__pinch__child_s_name__when_he_she_does_something_wrong__c8b92bc',
              'this_past_week__how_many_times_does__child_s_primary_caregiver_s_name__pinch__child_s_name__when_he_she_does_something_wrong__8ee6720',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 14,
          value:
            //'9. ด่าว่าเด็กโง่หรือขี้เกียจ: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ด่าว่า [[(ชื่อเด็ก):caseFullName]] โง่หรือขี้เกียจกี่ครั้ง?',
              '9. ด่าว่าเด็กโง่หรือขี้เกียจ: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ด่าว่า(ชื่อเด็ก)โง่หรือขี้เกียจกี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            //'this_past_week__how_many_times_have__name_of_the_child_s_primary_caretaker__scolding__child_s_name__stupid_or_lazy__f7f7a1f',
              'this_past_week__how_many_times_have__name_of_the_child_s_primary_caretaker__scolding__child_s_name__stupid_or_lazy__7624a3c',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CC',
          week: 14,
          value:
            //'10. ตบหน้าเด็ก: ในสัปดาห์ที่ผ่านมานี้ [[(ชื่อผู้ดูแลหลักของเด็ก):careGiverFullName]] ตบหน้า [[(ชื่อเด็ก):caseFullName]] กี่ครั้ง?',
              '10. ตบหน้าเด็ก: ในสัปดาห์ที่ผ่านมานี้ (ชื่อผู้ดูแลหลักของเด็ก) ตบหน้า(ชื่อเด็ก)กี่ครั้ง?',
        },
        destination: {
          type: 'varchar',

          value:
            //'this_past_week__how_many_times_has__name_of_the_child_s_primary_caregiver__slapped__child_s_name__face__df0b8d7',
              'this_past_week__how_many_times_has__name_of_the_child_s_primary_caregiver__slapped__child_s_name__face__46ddcc2',
        },
        ...sharedAnswerCC,
      },
      {
        source: {
          type: 'date',
          description: 'CQ1 First assessment date',
          questionnaire_code: 'CQ1',
          week: 1,
          value: '',
        },
        destination: {
          type: 'date',
          value: 'assessment_date_a745d8b',
        },
        answers: {
          type: 'date',
          format: 'YYYY-MM-DD',
          value: {
            questionnaire_code: 'CQ1',
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 1,
          value: '1. ฉันชอบตัวเอง',
        },
        destination: {
          type: 'varchar',

          value: 'i_feel_happy_with_myself_d73ec12',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 1,
          value: '2. ฉันมีความสุขที่ได้กินข้าวกับครอบครัว',
        },
        destination: {
          type: 'varchar',
          value: 'i_feel_happy_when_i_am_having_dinner_with_my_family_f8a8d82',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 1,
          value:
            '3. ฉันรู้สึกอบอุ่น และปลอดภัยเมื่ออยู่กับ [[(ระบุชื่อผู้เข้าอบรม PLH):careGiverCalledName]]',
        },
        destination: {
          type: 'varchar',
          value:
            'i_feel_warm_and_safe_when_i_stay_with__name_of_primary_caregiver_in_plh_programme___30306e2',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          week: 1,
          questionnaire_code: 'CQ1',
          value:
            '4. ฉันแบ่งปันสิ่งของ ขนม และของเล่นกับพี่น้อง เพื่อน และคนอื่น',
        },
        destination: {
          type: 'varchar',

          value:
            'i_share_things__snacks_and_toys_with_my_siblings__friends_and_others_b3c2f20',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          week: 1,
          questionnaire_code: 'CQ1',
          value:
            '5. ฉันชอบที่ [[(ระบุชื่อผู้เข้าอบรม PLH):careGiverCalledName]] เล่นกับฉัน',
        },
        destination: {
          type: 'varchar',
          value:
            'i_feel_happy_when_i_play_with__name_of_primary_caregiver_in_plh_programme___8a1d3f8',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 1,
          value: '6. ฉันอยากช่วยเหลือคนอื่นที่มีความทุกข์ ไม่สบาย หรือยากจน',
        },
        destination: {
          type: 'varchar',
          value:
            'i_want_to_help_others_who_are_suffering__sick_or_poor__5ddb0f5',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 1,
          value:
            '7. ฉันเชื่อฟัง [[(ระบุชื่อผู้เข้าอบรม PLH):careGiverCalledName]] และทำหน้าที่ เช่น เข้านอนตามเวลา ทำการบ้าน เล่นโทรศัพท์เป็นเวลา ตามที่ท่านแนะนำ',
        },
        destination: {
          type: 'varchar',
          value:
            'i_obey__name_of_primary_caregiver_in_plh_programme__and_perform_duties_such_as_going_to_bed_on_time__doing_homework__playing_on_the_phone_at_times__as_he_she_suggest_26850a9',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 1,
          value:
            '8. ฉันทำหน้าที่ของฉัน เช่น อาบน้ำ แต่งตัว งานบ้าน อ่านหนังสือ โดยไม่ต้องมีใครเตือน',
        },
        destination: {
          type: 'varchar',
          value:
            'i_do_my_duties__such_as_taking_a_shower__getting_dressed__doing_housework__and_reading__without_anyone_being_warned__5f7cb0d',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value:
            '1. บางครั้งเธอรู้สึก ... (จากภาพด้านล่าง ขอให้เลือกเพียงคำตอบเดียว และระบุเหตุผลด้วยว่าเพราะอะไรจึงรู้สึกเช่นนั้น)',
        },
        destination: {
          type: 'varchar',
          value: 'how_do_you_feel__0cce3d3',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'string',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value: 'จากภาพที่เลือกด้านบนนั้น จงบอกว่าเพราะอะไรจึงรู้สึกเช่นนั้น',
        },
        destination: {
          type: 'varchar',
          value: 'plase_describe_the_reason_from_above_question_51a384e',
        },
        answers: {
          type: 'string',
          description:
            'AUQUEI1_CQ2 - Plase describe the reason from above question',
          value: '',
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value:
            '2. บ่อยแค่ไหนที่เธอรู้สึก...ไม่มีความสุขเลย (ตามภาพหมายเลข 1 นี้)',
        },
        destination: {
          type: 'varchar',
          value: 'how_often_do_you_feel_not_happy_at_all__5db4bc0',
        },
        ...sharedAnswerAUQUEI_CQ2_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value:
            '3. บ่อยแค่ไหนที่เธอรู้สึก...ไม่มีความสุข (ตามภาพหมายเลข 2 นี้)',
        },
        destination: {
          type: 'varchar',
          value: 'how_often_do_you_feel_unhappy__ce672d4',
        },
        ...sharedAnswerAUQUEI_CQ2_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value: '4. บ่อยแค่ไหนที่เธอรู้สึก…มีความสุข (ตามภาพหมายเลข 3 นี้)',
        },
        destination: {
          type: 'varchar',
          value: 'how_often_do_you_feel_happy__ccb0fd7',
        },
        ...sharedAnswerAUQUEI_CQ2_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value: '5. บ่อยแค่ไหนที่เธอรู้สึก…มีความสุขมาก (ตามภาพหมายเลข 4 นี้)',
        },
        destination: {
          type: 'varchar',
          value: 'how_often_do_you_feel_very_happy__3dfaf8a',
        },
        ...sharedAnswerAUQUEI_CQ2_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value: '6. เธอรู้สึกอย่างไรเวลาที่นั่งกินอาหารเย็นกับครอบครัว?',
        },
        destination: {
          type: 'varchar',
          value:
            'how_do_you_feel_when_you_are_having_dinner_with_your_family__a114ee3',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value: '7. เธอรู้สึกอย่างไรเวลาเข้านอนตอนกลางคืน?',
        },
        destination: {
          type: 'varchar',
          value: 'how_do_you_feel_when_you_go_to_bed_at_night__ecfdd90',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value:
            //'8. เธอรู้สึกอย่างไรเวลาที่เธอคิดถึง [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverName]]?',
            '8. เธอรู้สึกอย่างไรเวลาที่เธอคิดถึง [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverCalledName]]?',
        },
        destination: {
          type: 'varchar',
          value:
            'how_do_you_feel_when_you_think_of__name_of_primary_caregiver_in_plh_programme___8aa2de6',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value:
            //'9. เธอรู้สึกอย่างไรเวลาที่เธอเล่นกับ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverName]]?',
          '9. เธอรู้สึกอย่างไรเวลาที่เธอเล่นกับ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverCalledName]]?',
        },
        destination: {
          type: 'varchar',
          value:
            'how_do_you_feel_when_you_play_with_name_of_primary_caregiver_in_plh_programme___5ef3917',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value:
           // '10. เธอรู้สึกอย่างไรเวลาที่ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverName]] พูดถึงเธอ?',
          '10. เธอรู้สึกอย่างไรเวลาที่ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverCalledName]] พูดถึงเธอ?',
        },
        destination: {
          type: 'varchar',
          value:
            'how_do_you_feel_when__name_of_primary_caregiver_in_plh_programme__mentions_you__93c6ed1',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 1,
          value:
           // '11. เธอรู้สึกอย่างไรเวลาที่ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverName]] บอกให้เธอทำอะไรต่างๆ?',
          '11. เธอรู้สึกอย่างไรเวลาที่ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverCalledName]] บอกให้เธอทำอะไรต่างๆ?',
        },
        destination: {
          type: 'varchar',
          value:
            'how_do_you_feel_when___name_of_primary_caregiver_in_plh_programme__tells_you_what_to_do__87aa7da',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value:
            '1. บางครั้งเธอรู้สึก ... (จากภาพด้านล่าง ขอให้เลือกเพียงคำตอบเดียว และระบุเหตุผลด้วยว่าเพราะอะไรจึงรู้สึกเช่นนั้น)',
        },
        destination: {
          type: 'varchar',
          value: 'how_do_you_feel__488a6cb',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'string',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value: 'จากภาพที่เลือกด้านบนนั้น จงบอกว่าเพราะอะไรจึงรู้สึกเช่นนั้น',
        },
        destination: {
          type: 'varchar',
          value: 'plase_describe_the_reason_from_above_question_d21b8db',
        },
        answers: {
          type: 'string',
          description:
            'AUQUEI1_CQ2 - Plase describe the reason from above question',
          value: '',
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value:
            '2. บ่อยแค่ไหนที่เธอรู้สึก...ไม่มีความสุขเลย (ตามภาพหมายเลข 1 นี้)',
        },
        destination: {
          type: 'varchar',
          value: 'how_often_do_you_feel_not_happy_at_all_eca6d98',
        },
        ...sharedAnswerAUQUEI_CQ2_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value:
            '3. บ่อยแค่ไหนที่เธอรู้สึก...ไม่มีความสุขเลย (ตามภาพหมายเลข 1 นี้)',
        },
        destination: {
          type: 'varchar',
          value: 'how_often_do_you_feel_unhappy_bef4677',
        },
        ...sharedAnswerAUQUEI_CQ2_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value: '4. บ่อยแค่ไหนที่เธอรู้สึก…มีความสุข (ตามภาพหมaายเลข 3 นี้)',
        },
        destination: {
          type: 'varchar',
          value: 'how_often_do_you_feel_happy_ac44b67',
        },
        ...sharedAnswerAUQUEI_CQ2_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value: '5. บ่อยแค่ไหนที่เธอรู้สึก…มีความสุขมาก (ตามภาพหมายเลข 4 นี้)',
        },
        destination: {
          type: 'varchar',
          value: 'how_often_do_you_feel_very_happy_0f8c058',
        },
        ...sharedAnswerAUQUEI_CQ2_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value: '6. เธอรู้สึกอย่างไรเวลาที่นั่งกินอาหารเย็นกับครอบครัว?',
        },
        destination: {
          type: 'varchar',
          value:
            'how_do_you_feel_when_you_are_having_dinner_with_your_family_426c432',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value: '7. เธอรู้สึกอย่างไรเวลาเข้านอนตอนกลางคืน?',
        },
        destination: {
          type: 'varchar',
          value: 'how_do_you_feel_when_you_go_to_bed_at_night_e2851ec',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value:
           // '8. เธอรู้สึกอย่างไรเวลาที่เธอคิดถึง [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverName]]?',
            '8. เธอรู้สึกอย่างไรเวลาที่เธอคิดถึง [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverCalledName]]?',
        },
        destination: {
          type: 'varchar',
          value:
            'how_do_you_feel_when_you_think_of__name_of_primary_caregiver_in_plh_programme___c5c225b',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value:
            //'9. เธอรู้สึกอย่างไรเวลาที่เธอเล่นกับ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverName]]?',
            '9. เธอรู้สึกอย่างไรเวลาที่เธอเล่นกับ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverCalledName]]?',
        },
        destination: {
          type: 'varchar',
          value:
            'how_do_you_feel_when_you_play_with_name_of_primary_caregiver_in_plh_programme___5e1d546',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value:
            //'10. เธอรู้สึกอย่างไรเวลาที่ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverName]] พูดถึงเธอ?',
              '10. เธอรู้สึกอย่างไรเวลาที่ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverCalledName]] พูดถึงเธอ?',
        },
        destination: {
          type: 'varchar',
          value:
            'how_do_you_feel_when__name_of_primary_caregiver_in_plh_programme__mentions_you__f8e280b',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'AUQUEI_CQ2',
          week: 14,
          value:
            //'11. เธอรู้สึกอย่างไรเวลาที่ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverName]] บอกให้เธอทำอะไรต่างๆ?',
             '11. เธอรู้สึกอย่างไรเวลาที่ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverCalledName]] บอกให้เธอทำอะไรต่างๆ?',
        },
        destination: {
          type: 'varchar',
          value:
            'how_do_you_feel_when___name_of_primary_caregiver_in_plh_programme__tells_you_what_to_do__227f1d5',
        },
        ...sharedAnswerAUQUEI_CQ2,
      },
      {
        source: {
          type: 'date',
          description: 'CQ1 14th assessment date',
          questionnaire_code: 'CQ1',
          week: 14,
          value: '',
        },
        destination: {
          type: 'date',
          value: 'assessment_date_5f07c55',
        },
        answers: {
          type: 'date',
          format: 'YYYY-MM-DD',
          value: {
            questionnaire_code: 'CQ1',
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 14,
           value: '1. ฉันชอบตัวเอง',
          //value: '1. เธอชอบตัวเอง', //Updated per Tipp's request in green  //Reverting to original upon Tipp's review
        },
        destination: {
          type: 'varchar',

          value: 'i_feel_happy_with_myself_6df7af9',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 14,
          value: '2. ฉันมีความสุขที่ได้กินข้าวกับครอบครัว',
          //value: '2. เธอมีความสุขที่ได้กินข้าวกับครอบครัว', // Updated per Tipp's mappings in green //Reverting to original upon Tipp's review
        },
        destination: {
          type: 'varchar',
          value: 'i_feel_happy_when_i_am_having_dinner_with_my_family_690fd8e',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 14,
          value: '3. ฉันรู้สึกอบอุ่น และปลอดภัยเมื่ออยู่กับ [[(ระบุชื่อผู้เข้าอบรม PLH):careGiverCalledName]]',
          //value: '3. เธอรู้สึกอบอุ่น และปลอดภัยเมื่ออยู่กับ [[ผู้ดูแลที่เข้าร่วมอบรม:careGiverCalledName]]', // Updated per Tipp's mappings in green  //Reverting to original upon Tipp's review
        },
        destination: {
          type: 'varchar',
          value:
            'i_feel_warm_and_safe_when_i_stay_with__name_of_primary_caregiver_in_plh_programme___20801be',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          week: 14,
          questionnaire_code: 'CQ1',
          value: '4. ฉันแบ่งปันสิ่งของ ขนม และของเล่นกับพี่น้อง เพื่อน และคนอื่น',
            //value: '4. เธอแบ่งปันสิ่งของ ขนม และของเล่นกับพี่น้อง เพื่อน และคนอื่น', // Updated as per Tipp's mappings in green  //Reverting to original upon Tipp's review
        },
        destination: {
          type: 'varchar',

          value:
            'i_share_things__snacks_and_toys_with_my_siblings__friends_and_others_4ab19ae',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          week: 14,
          questionnaire_code: 'CQ1',
          value:
            '5. ฉันชอบที่ [[(ระบุชื่อผู้เข้าอบรม PLH):careGiverCalledName]] เล่นกับฉัน',
        },
        destination: {
          type: 'varchar',
          value:
            'i_feel_happy_when_i_play_with__name_of_primary_caregiver_in_plh_programme___a2a3ab0',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 14,
          value: '6. ฉันอยากช่วยเหลือคนอื่นที่มีความทุกข์ ไม่สบาย หรือยากจน',
        },
        destination: {
          type: 'varchar',
          value:
            'i_want_to_help_others_who_are_suffering__sick_or_poor__ea5ac45',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 14,
          value:
            '7. ฉันเชื่อฟัง [[(ระบุชื่อผู้เข้าอบรม PLH):careGiverCalledName]] และทำหน้าที่ เช่น เข้านอนตามเวลา ทำการบ้าน เล่นโทรศัพท์เป็นเวลา ตามที่ท่านแนะนำ',
        },
        destination: {
          type: 'varchar',
          value:
            'i_obey__name_of_primary_caregiver_in_plh_programme__and_perform_duties_such_as_going_to_bed_on_time__doing_homework__playing_on_the_phone_at_times__as_he_she_suggest_d41a1c4',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'CQ1',
          week: 1,
          value:
            '8. ฉันทำหน้าที่ของฉัน เช่น อาบน้ำ แต่งตัว งานบ้าน อ่านหนังสือ โดยไม่ต้องมีใครเตือน',
        },
        destination: {
          type: 'varchar',
          value:
            'i_do_my_duties__such_as_taking_a_shower__getting_dressed__doing_housework__and_reading__without_anyone_being_warned__e11b601',
        },
        ...sharedAnswerCQ1,
      },
      {
        source: {
          type: 'date',
          questionnaire_code: 'PSu1',
          week: 1,
          value: 'วันที่ประเมิน',
        },
        destination: {
          type: 'date',
          value: 'psu_assessment_date_week_1_07d31fa',
        },
        answers: {
          type: 'date',
          format: 'YYYY-MM-DD',
          value: {
            questionnaire_code: 'PSu1',
          },
        },
      },
      {
        source: {
          type: 'string',
          questionnaire_code: 'PSu1',
          week: 1,
          value: 'ชื่อของคุณ',
        },
        destination: {
          type: 'varchar',
          value: 'plh_caregiver_first_name_93f7d52',
        },
        answers: {
          type: 'string',
          description: 'First name',
          value: '',
        },
      },
      {
        source: {
          type: 'string',
          questionnaire_code: 'PSu1',
          week: 1,
          value: 'นามสกุล',
        },
        destination: {
          type: 'varchar',
          value: 'plh_caregiver_last_name_1215238',
        },
        answers: {
          type: 'string',
          description: 'Last name',
          value: '',
        },
      },
      {
        source: {
          type: 'string',
          questionnaire_code: 'PSu1',
          week: 1,
          value: 'ที่อยู่',
        },
        destination: {
          type: 'varchar',
          value: 'plh_caregiver_address_39fa009',
        },
        answers: {
          type: 'string',
          description: 'Street Address',
          value: '',
        },
      },
      {
        source: {
          type: 'string',
          questionnaire_code: 'PSu1',
          groupDescription: 'ข้อมูลเพื่อติดต่อผู้เข้าร่วมโครงการ',
          week: 1,
          value: 'เบอร์โทรศัพท์',
        },
        destination: {
          type: 'varchar',
          value: 'plh_caregiver_contact_c216042',
        },
        answers: {
          type: 'string',
          description: 'Contact Number',
          value: '',
        },
      },
      {
        source: {
          type: 'int',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '1. คุณมีอายุเท่าใด',
        },
        destination: {
          type: 'int',
          value: 'age_60ee953',
        },
        answers: {
          type: 'int',
          description: 'Age',
          value: '',
        },
      },
      {
        source: {
          //type: 'string',
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '2. เพศ',
        },
        destination: {
          type: 'varchar',
          value: 'plh_caregiver_sex_965ffd1',
        },
        answers: {
          type: 'select',
          description: 'Sex',
          value: {
            score: {
              // 0: 'Female',
              // 1: 'Male',
              0: 'female',
              1: 'male',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '6. คุณมีความสัมพันธ์หรือเกี่ยวข้องกับเด็กอย่างไร (โปรดเลือกจากด้านล่าง)',
        },
        destination: {
          type: 'varchar',
          value: 'what_is_your_relationship_with_the_child__29056fb',
        },
        answers: {
          type: 'select',
          description: 'Relationship with child',
          value: {
            score: {
              1: 'mother_d7c92a0',
              2: 'father_7d4a7d8',
              3: 'stepfather_stepmother_a6d89ef',
              4: 'sister_brother_stepsister_stepbrother_f932b74',
              5: 'grandfather_grandmother_316381d',
              6: 'great_grandfather_great_grandmother_a011466',
              7: 'uncle_aunt_ce71116',
              8: 'cousin_b50320c',
              9: 'foster_parent_d7ba487',
              10: 'other_165616b',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '7. พ่อของเด็กอาศัยอยู่ในบ้านเดียวกันกับคุณหรือไม่?',
        },
        destination: {
          type: 'varchar',
          value: 'does_the_child_s_father_live_in_your_household__f3d9a78',
        },
        answers: {
          type: 'select',
          description: 'Father_lives_in_same_house',
          value: {
            score: {
              0: 'yes_bdaebfa',
              1: 'no__passed_away_c59f21f',
              2: 'no__lives_elsewhere_f353313',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '8. แม่ของเด็กอาศัยอยู่ในบ้านเดียวกันกับคุณหรือไม่?',
        },
        destination: {
          type: 'varchar',
          value: 'does_the_child_s_mother_live_in_your_household__05fc174',
        },
        answers: {
          type: 'select',
          description: 'Mother_lives_in_same_house',
          value: {
            score: {
              0: 'yes_bdaebfa',
              1: 'no__passed_away_c59f21f',
              2: 'no__lives_elsewhere_f353313',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '9. ในเดือนที่ผ่านมานี้ คุณมีเงินไม่พอสำหรับใช้ซื้ออาหารหรือของใช้ที่จำเป็นหรือไม่',
        },
        destination: {
          type: 'varchar',
          value:
            'plh_in_the_last_month__did_you_run_out_of_money_for_food_or_essentials__15c7a44',
        },
        answers: {
          type: 'select',
          value: {
            score: {
              0: 'sufficient_dfdce7f',
              1: 'none_sufficient_fa67c4a',
            },
            th: {
              0: 'มีพอ',
              1: 'มีไม่พอ',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '10. มีผู้ใหญ่คนหนึ่งที่ป่วยหนัก  –  ต้องเข้าโรงพยาบาลหรือนอนติดเตียงเป็นส่วนใหญ่',
        },
        destination: {
          type: 'varchar',
          value: 'plh_adult_who_is_very_unwell_3258821',
        },
        answers: {
          type: 'select',
          value: {
            score: {
              0: 'false',
              1: 'true',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '11. มีคนดื่มสุราหรือใช้ยาเสพติด',
        },
        destination: {
          type: 'varchar',
          value: 'plh__people_drinking_or_taking_drugs_fa8cff1',
        },
        answers: {
          type: 'select',
          value: {
            score: {
              0: 'false',
              1: 'true',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '12. ทะเลาะกันรุนแรงบ่อยถึงกับมีการตะโกนด่าหรือตบตีกัน',
        },
        destination: {
          type: 'varchar',
          value: 'plh_arguments_with_shouting_b8fe218',
        },
        ...sharedAnswerTrueorFalse,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '13. มีเด็กในครอบครัวที่ป่วยหนัก',
        },
        destination: {
          type: 'varchar',
          value: 'plh__a_child_who_is_very_unwell_a31e10a',
        },
        ...sharedAnswerTrueorFalse,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '14. มีเด็กที่มีปัญหาในการได้ยิน การมองเห็น การสื่อสาร การเดิน หรือมีปัญหาที่โรงเรียน',
        },
        destination: {
          type: 'varchar',
          value:
            'plh_a_child_who_has_trouble_hearing__seeing__communicating__walking__or_struggles_at_school_87579c7',
        },
        ...sharedAnswerTrueorFalse,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '15. คุณเล่นกับลูกบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'play_with_child_psu_week_1_03d1ddc',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '16. คุณปล่อยให้ลูกได้พยายามแก้ปัญหาที่เขาน่าจะทำได้ด้วยตัวเองบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'stand_back_psu_week_1_f7e5250',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '17. คุณชวนให้ลูกเล่นเกมด้วยกันหรือทำกิจกรรมสนุกร่วมกันบ่อยแค่ไหน?',
        },
        destination: {
          type: 'varchar',
          value: 'invite_to_play_psu_week_1_8eb04b9',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '18. คุณสังเกตเห็นและชมพฤติกรรมที่ดีของลูกบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'praise_child_psu_week_1_4659604',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '19. คุณสอนให้ลูกทำอะไรใหม่ๆบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'teach_new_skills_psu_week_1_19f590d',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '20. คุณช่วยให้ลูกมีส่วนร่วมในการทำงานบ้านบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'involve_in_household_chores_psu_week_1_2ecd4c1',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '21. คุณให้รางวัลลูกบ่อยแค่ไหน เมื่อเขาทำอะไรได้ดีหรือแสดงให้เห็นว่าทำอะไรใหม่ๆ ได้',
        },
        destination: {
          type: 'varchar',
          value: 'reward_child_psu_week_1_5386147',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '22. บ่อยแค่ไหนที่คุณยึดถือตามกฎและไม่เปลี่ยนใจ',
        },
        destination: {
          type: 'varchar',
          value: 'stick_to_your_rules_psu_week_1_84715c7',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '23. บ่อยแค่ไหนที่คุณพูดกับลูกอย่างสงบเมื่อคุณโกรธหรือหงุดหงิดกับเขา',
        },
        destination: {
          type: 'varchar',
          value: 'speak_calmly_psu_week_1_9bd7ba8',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '24. บ่อยแค่ไหนที่คุณอธิบายว่าคุณต้องการอะไรให้ลูกฟังอย่างง่ายๆ และชัดเจน',
        },
        destination: {
          type: 'varchar',
          value: 'explain_what_you_wanted_psu_week_1_4ca4f06',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '25. บ่อยแค่ไหนที่คุณบอกลูกว่าคุณต้องการให้เขาทำอะไร แทนที่จะบอกเขาว่าให้หยุดทำอะไร',
        },
        destination: {
          type: 'varchar',
          value: 'tell_your_child_what_you_wanted_psu_week_1_a30469f',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '26. บ่อยแค่ไหนที่คุณบอกลูกว่าคุณคาดหวังว่าเขาจะต้องทำตัวอย่างไร',
        },
        destination: {
          type: 'varchar',
          value: 'how_you_expected_them_to_behave_psu_week_1_f5a3f3f',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '27. บ่อยแค่ไหนที่คุณตั้งกฎเกี่ยวกับพฤติกรรมของลูกและคุณสามารถบังคับให้เขาทำตามนั้นได้',
        },
        destination: {
          type: 'varchar',
          value: 'set_rules_psu_week_1_fb107e2',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '28. บ่อยแค่ไหนที่คุณคอยติดตามตรวจสอบดูว่าลูกได้ทำตามกฎที่คุณตั้งไว้ตลอดเวลาหรือเกือบตลอดเวลา',
        },
        destination: {
          type: 'varchar',
          value: 'child_followed_the_rules_psu_week_1_72f9ab2',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '29. ลูกของคุณมักเล่นอยู่คนเดียว',
        },
        destination: {
          type: 'varchar',
          value: 'play_alone_psu_week_1_e7afc28',
        },
        ...sharedAnswerPSu1_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '30. ลูกของคุณมักเชื่อฟังและทำตามที่ผู้ใหญ่บอก',
        },
        destination: {
          type: 'varchar',
          value: 'obedient_psu_week_1_ce097ef',
        },
        ...sharedAnswerPSu1_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '31. ลูกของคุณมักมีท่าทางเหมือนกังวลใจ',
        },
        destination: {
          type: 'varchar',
          value: 'worried_psu_week_1_e7d30db',
        },
        ...sharedAnswerPSu1_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '32. ถ้ามีใครบาดเจ็บ ไม่สบายใจ หรือรู้สึกไม่สบาย ลูกของคุณจะพยายามช่วยเหลือ',
        },
        destination: {
          type: 'varchar',
          value: 'helpful_psu_week_1_65f4d54',
        },
        ...sharedAnswerPSu1_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '33. ลูกของคุณจะขยุกขยิกหรือนั่งบิดตัวไปมาไม่ยอมนิ่งอยู่ตลอดเวลา',
        },
        destination: {
          type: 'varchar',
          value: 'fidgeting_psu_week_1_1ab6dec',
        },
        ...sharedAnswerPSu1_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '34. ใน 4 สัปดาห์ที่ผ่านมานี้ บ่อยแค่ไหนที่คุณสั่งสอนลูกด้วยการใช้มือตี ตบ หรือทุบ',
        },
        destination: {
          type: 'varchar',
          value: 'spanking_psu_week_1_c6e0774',
        },
        ...sharedAnswerPSu1_1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '35. ใน 4 สัปดาห์ที่ผ่านมานี้ บ่อยแค่ไหนที่คุณสั่งสอนลูกด้วยการตีด้วยสิ่งของเช่นไม้เรียวหรือเข็มขัด',
        },
        destination: {
          type: 'varchar',
          value: 'stick_belt_psu_week_1_c983507',
        },
        ...sharedAnswerPSu1_1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '36. ใน 4 สัปดาห์ที่ผ่านมานี้ บ่อยแค่ไหนที่คุณตะโกนดุด่าหรือกรีดร้องใส่ลูก',
        },
        destination: {
          type: 'varchar',
          value: 'shout_psu_week_1_d9be098',
        },
        ...sharedAnswerPSu1_1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '37. ใน 4 สัปดาห์ที่ผ่านมานี้ บ่อยแค่ไหนที่ คุณพูดแรงๆกับลูกจนทำให้เขาไม่สบายใจ',
        },
        destination: {
          type: 'varchar',
          value: 'say_mean_things_psu_week_1_4f029c0',
        },
        ...sharedAnswerPSu1_1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '38. การที่จะเลี้ยงดูหรืออบรมสั่งสอนลูกให้ได้อย่างเหมาะสม เด็กจำเป็นต้องถูกตีหรือลงโทษทางร่างกายบ้าง',
        },
        destination: {
          type: 'varchar',
          value: 'needs_physically_punished_psu_week_1_19af643',
        },
        answers: {
          type: 'select',
          value: {
            score: {
              0: 'strongly_disagree_3f7bce1',
              1: 'disagree_3cddf20',
              2: 'not_sure_7dc471c',
              3: 'agree_8374b44',
              4: 'strongly_agree_ccbfaca',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '39. ในสัปดาห์ที่ผ่านมา คุณรู้สึกเศร้าบ่อยแค่ไหน?',
        },
        destination: {
          type: 'varchar',
          value: 'felt_depressed_psu_week_1_3bea0b2',
        },
        ...sharedAnswerPSu1_2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value:
            '40. ในสัปดาห์ที่ผ่านมา คุณรู้สึกว่าต้องใช้ความพยายามมากไม่ว่าจะทำอะไรบ่อยแค่ไหน?',
        },
        destination: {
          type: 'varchar',
          value: 'was_an_effort_psu_week_1_6608b52',
        },
        ...sharedAnswerPSu1_2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '41. ในสัปดาห์ที่ผ่านมา คุณรู้สึกเหงาบ่อยแค่ไหน?',
        },
        destination: {
          type: 'varchar',
          value: 'felt_lonely_psu_week_1_a875e4e',
        },
        ...sharedAnswerPSu1_2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '42. ขณะนี้ลูกของคุณเข้าเรียนในโรงเรียนใช่หรือไม่',
        },
        destination: {
          type: 'varchar',
          value: 'enrolled_in_school_psu_week_1_6849751',
        },
        ...sharedAnswerTrueorFalse,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '43. ฉันชมลูกที่ตั้งใจเรียนดี',
        },
        destination: {
          type: 'varchar',
          value: 'praise_for_working_hard_psu_week_1_5584f66',
        },
        ...sharedAnswerPSu1_3,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu1',
          week: 1,
          value: '44. ฉันพยายามทำทุกอย่างที่ทำได้เพื่อสนับสนุนการเรียนของลูก',
        },
        destination: {
          type: 'varchar',
          value: 'support_schoolwork_psu_week_1_1374138',
        },
        ...sharedAnswerPSu1_3,
      },
      {
        source: {
          type: 'date',
          description: 'PSu2 14th assessment date',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '',
        },
        destination: {
          type: 'date',
          value: 'psu_assessment_date_week_14_098ffac',
        },
        answers: {
          type: 'date',
          format: 'YYYY-MM-DD',
          value: {
            questionnaire_code: 'PSu2',
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          //JS adding group description to narrow down selected question
          groupDescription: 'ส่วนที่ 1 รายละเอียดเกี่ยวกับภูมิหลังของคุณ (6 ข้อ)',
          week: 14,
          value:
            '1. ในเดือนที่ผ่านมานี้ คุณมีเงินไม่พอสำหรับใช้ซื้ออาหารหรือของใช้ที่จำเป็นหรือไม่',
        },
        destination: {
          type: 'varchar',
          value:
            'plh2_in_the_last_month__did_you_run_out_of_money_for_food_or_essentials_a07d96f',
        },
        answers: {
          type: 'select',
          value: {
            score: {
              0: 'sufficient_dfdce7f',
              1: 'none_sufficient_fa67c4a',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '2. มีผู้ใหญ่คนหนึ่งที่ป่วยหนัก  –  ต้องเข้าโรงพยาบาลหรือนอนติดเตียงเป็นส่วนใหญ่',
        },
        destination: {
          type: 'varchar',
          value: 'plh2_an_adult_who_is_very_unwell_0a2246f',
        },
        ...sharedAnswerTrueorFalse,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '3. มีคนดื่มสุราหรือใช้ยาเสพติด',
        },
        destination: {
          type: 'varchar',
          value: 'plh2_people_drinking_or_taking_drugs_887f893',
        },
        ...sharedAnswerTrueorFalse,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '4. ทะเลาะกันรุนแรงบ่อยถึงกับมีการตะโกนด่าหรือตบตีกัน',
        },
        destination: {
          type: 'varchar',
          value: 'plh2_arguments_with_shouting_6114d9c',
        },
        ...sharedAnswerTrueorFalse,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '5. มีเด็กที่ไม่สบายมาก',
        },
        destination: {
          type: 'varchar',
          value: 'plh2_a_child_who_is_very_unwell_fcddb95',
        },
        ...sharedAnswerTrueorFalse,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '6. มีเด็กที่มีปัญหาในการได้ยิน การมองเห็น การสื่อสาร การเดิน หรือมีปัญหาที่โรงเรียน',
        },
        destination: {
          type: 'varchar',
          value:
            'plh2_a_child_who_has_trouble_hearing__seeing__communicating__walking__or_struggles_at_school_eb46359',
        },
        ...sharedAnswerTrueorFalse,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '1. คุณเล่นกับลูกบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'play_with_child_week_14_3857a65',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '2. คุณปล่อยให้ลูกได้พยายามแก้ปัญหาที่เขาน่าจะทำได้ด้วยตัวเองบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'stand_back_psu_week_14_d075b6f',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '3. คุณชวนให้ลูกเล่นเกมด้วยกันหรือทำกิจกรรมสนุกร่วมกันบ่อยแค่ไหน?',
        },
        destination: {
          type: 'varchar',
          value: 'invite_to_play_psu_week_14_f46ec6b',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '4. คุณสังเกตเห็นและชมพฤติกรรมที่ดีของลูกบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'praise_child_psu_week_14_0298ec0',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '5. คุณสอนทักษะใหม่ ๆ ให้ลูกคุณบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'teach_new_skills_psu_week_14_368c375',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '6. คุณช่วยให้ลูกมีส่วนร่วมในการทำงานบ้านบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'involve_in_household_chores_psu_week_14_04da913',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '7. คุณให้รางวัลลูกบ่อยแค่ไหน เมื่อเขาทำอะไรได้ดีหรือแสดงให้เห็นว่าทำอะไรใหม่ๆ ได้',
        },
        destination: {
          type: 'varchar',
          value: 'reward_psu_week_14_925500d',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '8. คุณยึดถือตามกฎและไม่เปลี่ยนใจบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'stick_to_your_rules_psu_week_14_231fb39',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '9. คุณพูดกับลูกอย่างสงบเมื่อคุณโกรธหรือหงุดหงิดกับเขาบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'speak_calmly_psu_week_14_4cfef23',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '10. คุณอธิบายว่าคุณต้องการอะไรให้ลูกฟังอย่างง่าย ๆ และชัดเจนบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'explain_what_you_wanted_psu_week_14_54840e7',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '11. คุณบอกลูกว่าคุณต้องการให้เขาทำอะไร แทนที่จะบอกเขาว่าให้หยุดทำอะไรบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'what_you_wanted_them_to_do_psu_week_14_2bf988e',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '12. คุณบอกลูกว่าคุณคาดหวังว่าเขาจะต้องทำตัวอย่างไรบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'how_you_expected_them_to_behave_psu_week_14_2d1b58e',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '13. คุณตั้งกฎเกี่ยวกับพฤติกรรมของลูกและคุณสามารถบังคับให้เขาทำตามนั้นได้บ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'set_rules_psu_week_14_8afeac4',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '14.คุณคอยติดตามตรวจสอบดูว่าลูกได้ทำตามกฎที่คุณตั้งไว้ตลอดเวลาหรือเกือบตลอดเวลาบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'child_followed_the_rules_psu_week_14_73af1a1',
        },
        ...sharedAnswerPSu1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '1. ลูกของคุณมักเล่นอยู่คนเดียว',
        },
        destination: {
          type: 'varchar',
          value: 'play_alone_psu_week_14_091e606',
        },
        ...sharedAnswerPSu1_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '2. ลูกของคุณมักเชื่อฟังและทำตามที่ผู้ใหญ่บอก',
        },
        destination: {
          type: 'varchar',
          value: 'obedient_psu_week_14_08658e3',
        },
        ...sharedAnswerPSu1_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '3. ลูกของคุณมักมีท่าทางเหมือนกังวลใจ',
        },
        destination: {
          type: 'varchar',
          value: 'worried_psu_week_14_2f59a0f',
        },
        ...sharedAnswerPSu1_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '4. ถ้ามีใครบาดเจ็บ ไม่สบายใจ หรือรู้สึกไม่สบาย ลูกของคุณจะพยายามช่วยเหลือ',
        },
        destination: {
          type: 'varchar',
          value: 'helpful_psu_week_14_bb86b58',
        },
        ...sharedAnswerPSu1_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '5. ลูกของคุณจะขยุกขยิกหรือนั่งบิดตัวไปมาไม่ยอมนิ่งอยู่ตลอดเวลา',
        },
        destination: {
          type: 'varchar',
          value: 'fidgeting_psu_week_14_40e94c3',
        },
        ...sharedAnswerPSu1_0,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '1. ใน 1 เดือนที่ผ่านมา คุณสั่งสอนลูกด้วยการใช้มือตี ตบ หรือทุบบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'spanking_psu_week_14_9e50568',
        },
        ...sharedAnswerPSu1_1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '2. ใน 1 เดือนที่ผ่านมา คุณสั่งสอนลูกด้วยการตีด้วยสิ่งของเช่นไม้เรียวหรือเข็มขัดบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'stick_or_a_belt_psu_week_14_5504709',
        },
        ...sharedAnswerPSu1_1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '3. ใน 1 เดือนที่ผ่านมา คุณตะโกนดุด่าหรือกรีดร้องใส่ลูกบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'shout_psu_week_14_c252c64',
        },
        ...sharedAnswerPSu1_1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '4. ใน 1 เดือนที่ผ่านมา คุณพูดแรง ๆกับลูกจนทำให้เขาไม่สบายใจบ่อยแค่ไหน',
        },
        destination: {
          type: 'varchar',
          value: 'say_mean_things_psu_week_14_ea63b59',
        },
        ...sharedAnswerPSu1_1,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '5. การที่จะเลี้ยงดูหรืออบรมสั่งสอนลูกให้ได้อย่างเหมาะสม เด็กจำเป็นต้องถูกตีหรือลงโทษทางร่างกายบ้าง',
        },
        destination: {
          type: 'varchar',
          value: 'needs_physically_punished_psu_week_14_18da4c4',
        },
        //...sharedAnswerPSu1_1,
        answers: {
          type: 'select',
          value: {
            score: {
              0: 'strongly_disagree_3f7bce1',
              1: 'disagree_3cddf20',
              2: 'not_sure_7dc471c',
              3: 'agree_8374b44',
              4: 'strongly_agree_ccbfaca',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '1. ในสัปดาห์ที่ผ่านมา คุณรู้สึกเศร้าบ่อยแค่ไหน?',
        },
        destination: {
          type: 'varchar',
          value: 'felt_depressed_psu_week_14_772fae9',
        },
        ...sharedAnswerPSu1_2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value:
            '2. ในสัปดาห์ที่ผ่านมา คุณรู้สึกว่าต้องใช้ความพยายามมากไม่ว่าจะทำอะไรบ่อยแค่ไหน?',
        },
        destination: {
          type: 'varchar',
          value: 'was_an_effort_psu_week_14_7c63447',
        },
        ...sharedAnswerPSu1_2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '3. ในสัปดาห์ที่ผ่านมา คุณรู้สึกเหงาบ่อยแค่ไหน?',
        },
        destination: {
          type: 'varchar',
          value: 'felt_lonely_psu_week_14_2e6af4f',
        },
        ...sharedAnswerPSu1_2,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '1. ขณะนี้ลูกของคุณเข้าเรียนในโรงเรียนใช่หรือไม่',
        },
        destination: {
          type: 'varchar',
          value: 'enrolled_in_school_psu_week_14_440dc25',
        },
        answers: {
          type: 'select',
          value: {
            score: {
              0: 'true',
              1: 'false',
            },
          },
        },
        //...sharedAnswerTrueorFalse,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '2. ฉันชมลูกที่ตั้งใจเรียนดี',
        },
        destination: {
          type: 'varchar',
          value: 'praise_child_psu_week_14_01d7af8',
        },
        ...sharedAnswerPSu1_3,
      },
      {
        source: {
          type: 'select',
          questionnaire_code: 'PSu2',
          week: 14,
          value: '3. ฉันพยายามทำทุกอย่างที่ทำได้เพื่อสนับสนุนการเรียนของลูก',
        },
        destination: {
          type: 'varchar',
          value: 'support_schoolwork_psu_week_14_38c0fd2',
        },
        ...sharedAnswerPSu1_3,
      },
    ];

    const magicallyBuildMapping = activities => {
      const questionnaires = activities
        .map(activity => activity.questionnaire)
        .flat();

      const getQuestionnaire = (questionnaire_code, week) => {
        const qnnaire = questionnaires.filter(
          qnare => qnare.questionnaire_code === questionnaire_code
        );

        return (
          qnnaire.length > 0 &&
          qnnaire.reduce((prev, curr) => {
            if (week === 14) {
              return prev.date > curr.date ? prev : curr;
            }
            if (week === 1) {
              return prev.date > curr.date ? curr : prev;
            }
          })
        );
      };

      return mappingSpecForPLH
        .map(item => {
          // find question
          const questionnaire = getQuestionnaire(
            item.source.questionnaire_code,
            item.source.week
          );
          const question =
            questionnaire.questionsList &&
            questionnaire.questionsList
              .map(qn => {
                if (qn.groupQuestionsList) {
                  return qn.groupQuestionsList.filter(gqn => {
                    if (item.source.groupDescription) {
                      return (
                        item.source.groupDescription === qn.groupDescription &&
                        gqn.question.trim() === item.source.value
                      );
                    }
                    return gqn.question.trim() === item.source.value;
                  });
                }
                if (qn.question === item.source.value) return qn;
                return [];
              })
              .flat()
              .reduce((a, v) => ({ ...a, ...v }), {});

          console.log(question)
          const checkIfAnswerIsEmptyArray =
            Array.isArray(question.answersList) && !question.answersList.length
              ? null
              : question.answersList;

          const checkIfAnswerExist =
            question && question.answersList ? checkIfAnswerIsEmptyArray : null;

          switch (item.answers.type) {
            case 'int':
              return {
                [item.destination.value]: parseInt(checkIfAnswerExist),
              };
            case 'string':
              return {
                [item.destination.value]: checkIfAnswerExist,
              };
            case 'select':
              const checkIfAnswerExistChecked =
                typeof question !== 'undefined' &&
                Array.isArray(question.answersList) &&
                question.answersList.filter(
                  ans => ans.checked && ans.checked === true
                );

              if (
                typeof question !== 'undefined' &&
                Array.isArray(question.answersList) &&
                !JSON.stringify(question.answersList).includes('checked')
              ) {
                console.log(
                  `answersList for '${question.question}' does not have 'checked'`
                );
                console.log(
                  'answersList',
                  JSON.stringify(question.answersList, null, 2)
                );
              }

              const answer =
                Array.isArray(checkIfAnswerExistChecked) &&
                typeof checkIfAnswerExistChecked[0] !== 'undefined'
                  ? item.answers.value.score[checkIfAnswerExistChecked[0].score]
                  : null;

              return {
                [item.destination.value]: answer,
              };
            // break;
            case 'date':
              return {
                [item.destination.value]: questionnaire.date,
              };
            // break;
            default:
          }
        })
        .flat();
    };

    const mappingSpecForRiskmodel = [
      {
        source: {
          type: 'string',
          value: 'id',
        },
        destination: {
          type: 'varchar',
          value: 'child_shield_case_id_95aaf33',
        },
        answers: {
          type: 'string',
          value: 'id',
        },
      },
      {
        source: {
          type: 'multi-selector',
          value: 'severityType',
        },
        destination: {
          type: 'varchar',
          value: 'severity_type_323dfc7',
        },
        answers: {
          type: 'array',
          value: {
            th: {
              ทางร่างกาย: 'physical_2529d27',
              ทางเพศ: 'sexual_ea92fba',
              ทางจิตใจ: 'mental_e6a1980',
              ทอดทิ้ง: 'forsake_ca4e172',
              ล่อลวง: 'beguile_bb276e6',
            },
          },
        },
      },
      {
        source: {
          type: 'string',
          value: 'mental',
        },
        destination: {
          type: 'varchar',
          value: 'mental_d2e118d',
        },
        answers: {
          type: 'string',
          value: 'mental',
        },
      },
      {
        source: {
          type: 'string',
          value: 'physical',
        },
        destination: {
          type: 'varchar',
          value: 'physical_aa3d640',
        },
        answers: {
          type: 'string',
          value: 'physical',
        },
      },
      {
        source: {
          type: 'string',
          value: 'sexual',
        },
        destination: {
          type: 'varchar',
          value: 'sexual_b2b5d48',
        },
        answers: {
          type: 'string',
          value: 'sexual',
        },
      },
      {
        source: {
          type: 'string',
          value: 'import_no',
        },
        destination: {
          type: 'varchar',
          value: 'import_number_a1a204c',
        },
        answers: {
          type: 'string',
          value: 'import_no',
        },
      },
      {
        source: {
          type: 'select',
          value: 'caseStatus',
        },
        destination: {
          type: 'varchar',
          value: 'child_shield_case_status_47a0eef',
        },
        answers: {
          type: 'select',
          value: {
            en: {
              new: 'new_df8b394',
              renew: 'renew_35576a6',
              assignedTeam: 'assigned_team_04c3f8e',
              assignedOfficer: 'assigned_officer_eff421f',
              recievedCase: 'received_case_94a86d4',
              sentCM: 'sent_cm_e29bdb2',
              completed: 'completed_785e390',
            },
          },
        },
      },
      {
        source: {
          type: 'string',
          value: 'osccTeamId',
        },
        destination: {
          type: 'varchar',
          value: 'oscc_team_id_d16244c',
        },
        answers: {
          type: 'string',
          value: 'osccTeamId',
        },
      },
      {
        source: {
          type: 'string',
          value: 'officerId',
        },
        destination: {
          type: 'varchar',
          value: 'officer_id_a575aac',
        },
        answers: {
          type: 'string',
          value: 'officerId',
        },
      },
      {
        source: {
          type: 'string',
          value: 'careGiverUser',
        },
        destination: {
          type: 'varchar',
          value: 'care_giver_user_b93a5bd',
        },
        answers: {
          type: 'string',
          value: 'careGiverUser',
        },
      },
      {
        source: {
          type: 'string',
          value: 'caseStatusBeforeRemove',
        },
        destination: {
          type: 'varchar',
          value: 'case_status_before_remove_58dd4e2',
        },
        answers: {
          type: 'string',
          value: 'caseStatusBeforeRemove',
        },
      },
      {
        source: {
          type: 'string',
          value: 'caseUserId',
        },
        destination: {
          type: 'varchar',
          value: 'case_user_id_54c9fa6',
        },
        answers: {
          type: 'string',
          value: 'caseUserId',
        },
      },
      {
        source: {
          type: 'select',
          value: 'riskLevel',
        },
        destination: {
          type: 'varchar',
          value: 'risk_level_from_child_shield_system_2df7bf4',
        },
        answers: {
          type: 'select',
          value: {
            en: {
              low: 'low_c8318d2',
              medium: 'medium_2c2d8b1',
              high: 'high_8df42a5',
              victim: 'victim_8d3885e',
              others: 'others_b99020f',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          value: 'summaryRiskLevel',
        },
        destination: {
          type: 'varchar',
          value: 'summary_risk_level_70cca8c',
        },
        answers: {
          type: 'select',
          value: {
            en: {
              low: 'low_c8318d2',
              medium: 'medium_2c2d8b1',
              high: 'high_8df42a5',
              victim: 'victim_8d3885e',
              others: 'others_b99020f',
            },
          },
        },
      },
      {
        source: {
          type: 'select',
          value: 'improveLevel',
        },
        destination: {
          type: 'varchar',
          value: 'improve_level_ac512e2',
        },
        answers: {
          type: 'select',
          value: {
            en: {
              improved: 'improved_2bae6c9',
              unchanged: 'unchanged_f10da80',
              worse: 'worse_4c8552c',
            },
          },
        },
      },
    ];

    const magicallyBuildMappingForRiskModel = rsm => {
      return mappingSpecForRiskmodel
        .map(item => {
          switch (item.answers.type) {
            case 'select':
              const selectAns = rsm[item.source.value]
                ? item.answers.value.en[rsm[item.source.value]]
                : null;

              return {
                [item.destination.value]: selectAns,
              };
            case 'string':
              const strAns = Array.isArray(rsm[item.answers.value])
                ? rsm[item.answers.value][0]
                : `${rsm[item.answers.value]}`;
              return {
                [item.destination.value]: strAns,
              };
            case 'array':
              if (Array.isArray(rsm[item.source.value])) {
                const arrAns = rsm[item.source.value].map(
                  ans => item.answers.value.th[ans]
                );
                return {
                  [item.destination.value]: arrAns,
                };
              }
              return {
                [item.destination.value]: null,
              };

            default:
          }
        })
        .flat();
    };

    let caseDetails = {
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
      nationality:
        patient.nationality && patient.nationality !== ''
          ? [state.nationalityMap[patient.nationality]]
          : [''],
      // nationality:
      //   patient.nationality && patient.nationality !== ''
      //     ? state.nationalityMap[patient.nationality]
      //     : '',
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
    // PLH mapping
    const mappingForPLH = [];
    const mappingForRiskmodel = [];
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

    if (typeof patient.riskmodel != 'undefined') {
      const buildRiskmodel = magicallyBuildMappingForRiskModel(
        patient.riskmodel
      );

      mappingForRiskmodel.push(...buildRiskmodel);
    }

    patient.interventions.forEach(intervention => {
      const { assessment, laboratory, anc, homeservice } =
        intervention.activities;

      let unique_id = `${intervention.id}${patient.cid.substring(0, 8)}`;
      unique_id = `${unique_id.substring(0, 8)}-${unique_id.substring(
        8,
        12
      )}-${unique_id.substring(12, 16)}-${unique_id.substring(
        16,
        20
      )}-${unique_id.substring(20)}`;

      if (typeof homeservice != 'undefined') {
        const buildPLH = magicallyBuildMapping(homeservice);
        return mappingForPLH.push(...buildPLH);
      }

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
              ? Number(Math.round(assessment[0].bw))
              : null
            : null,
        patient_s_height:
          assessment && assessment.length > 0
            ? assessment[0].height && assessment[0].height !== ''
              ? Number(Math.round(assessment[0].height))
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
            : null,
        //: '',
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
        anc.forEach((ancElement, i) => {
          let unique_id = `${i + 1}${ancElement.date.replace(/\-/g, '')}${
            patient.cid
          }`;
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

    caseDetails['physical_check_2'] = physical_check_2;
    caseDetails['new_pregnancy'] = new_pregnancy;
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
          let { diagtype, diag_name, icd10 } = diag;
          if (!diagType[trimDiagType(diagtype)]) diagtype = 4; // If diagtyp undefined map as 4

          if (diagnosisObj[diagType[trimDiagType(diagtype)]]) {
            // if there is anything in the diagnosisObj we are building
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
    // console.log(mappingForRiskmodel.reduce((a, v) => ({ ...a, ...v }), {}));
    const flattenMappingForPLH = mappingForPLH.reduce(
      (a, v) => ({ ...a, ...v }),
      {}
    );
    const flattenMappingForRiskModel = mappingForRiskmodel.reduce(
      (a, v) => ({ ...a, ...v }),
      {}
    );

    const extendedCaseDetails = {
      ...caseDetails,
      ...diagnosisObj,
      ...flattenMappingForPLH,
      ...flattenMappingForRiskModel,
    };

    console.log('Upserting case', JSON.stringify(extendedCaseDetails, null, 2));
    // return { ...state, extendedCaseDetails };
    return upsertCase(
      {
        externalIds: ['record_id'],
        data: extendedCaseDetails,
      },
      state => {
        console.log(state.data);
        return state;
      }
    )(state);
  })
);
