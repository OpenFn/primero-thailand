// Set up a manual cursor
fn(state => {
  console.log('Last sync end date:', state.lastRunDateTime);
  
  const manualCursor = '2023-01-27T00:00:00.000Z';

  const cursor =
    state.lastRunDateTime != null && state.lastRunDateTime != ''
      ? state.lastRunDateTime
      : manualCursor;

  console.log(`Cursor is at ${cursor}`);

  return { ...state, cursor };
});

// Fetch cases from Primero where 'last_updated_at' >= date of last sync
fn(state => {
  return getCases(
    {
      //remote: true,
      last_updated_at: `${state.cursor}..`,
    },
    state => ({
      ...state,
      cases: state.data,
    })
  )(state);
});

// Filter valid cases
fn(state => {
  const cases = state.data;
  const cursor = state.cursor;

  console.log('Last sync end date:', cursor);

  console.log('ALL CASES:');
  console.log(cases.length);
  console.log(JSON.stringify(cases, null, 4));

  const filteredCases = cases
    .filter(
      c =>
        (c.status == 'closed' &&
          c.assessment_requested_on != null &&
          c.date_closure >= cursor.split('T')[0]) ||
        (c.statuc != 'closed' &&
          c.assessment_requested_on >= cursor.split('T')[0])
    )
    .flat();

  console.log('CASES WHICH WILL BE SYNCED TO CHILD SHIELD :');
  console.log(filteredCases.length);
  console.log(JSON.stringify(filteredCases, null, 4));
  return { ...state, filteredCases };
});

// After job completes successfully, update cursor
fn(state => {
  const { filteredCases } = state;
  const noop = filteredCases.length > 0 ? false : true;
  console.log('No data to sync? :', noop);
  let lastRunDateTime = filteredCases
    .map(c => c.last_updated_at)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  lastRunDateTime =
    new Date(lastRunDateTime) > new Date()
      ? lastRunDateTime
      : new Date().toISOString();

  console.log('Next sync start date:', lastRunDateTime);
  return { ...state, data: {}, references: [], lastRunDateTime, noop };
});