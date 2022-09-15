// Set up a manual cursor.
fn(state => {
  // Fetch cases where 'last_updated_at' >= date of last sync
  const manualCursor = '2022-08-12T14:43:07.000Z';
  const cursor =
    state.cursor != null && state.cursor != '' ? state.cursor : manualCursor;
  return { ...state, cursor };
});

// Get cases from Primero
fn(state => {
  return getCases(
    {
      remote: true,
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
  console.log(
    `Test assessment_requested_on >= cursor ${'2022-08-16' >= cursor}`
  );

  const filteredCases = cases
    .filter(
      c =>
        (c.status == 'closed' &&
          c.assessment_requested_on != null &&
          c.date_closure >= cursor) ||
        (c.status != 'closed' && c.assessment_requested_on >= cursor)
    )
    .flat();

  return { ...state, filteredCases };
});
