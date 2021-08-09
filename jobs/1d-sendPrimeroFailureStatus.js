// @ritazagoni, if you're allowed to run this on prod and log potentially
// sensitive data, my recommendation is to run this once so that you can see the
// initial state for the catch job run.

// Uncomment this operation to do so... ===================
// fn(state => {
//   console.log("Here's the initial state for this run:");
//   console.log({ ...state, configuration: 'REDACTED' });
//   return state;
// });
// ========================================================

fn(state => {
  const error = state.error || '';

  let status = 'failed';
  for (elt of error)
    if (String(elt).includes('MODEL_NOT_FOUND')) {
      status = 'not_found';
    }

  const failure = {
    mark_synced: true,
    mark_synced_status: 'failed',
    mark_synced_url:
      'https://www.openfn.org/inbox/7b080edf-4466-4041-a4b3-9dbfdf02daee',
    // This is inferred, given how the previous job finds record_id: ===========
    // https://github.com/OpenFn/primero-thailand/blob/master/jobs/1b-upsertCases.js#L342
    record_id: state.record_id, // upserting by record_id now
    // =========================================================================
  };

  console.log('Upserting case', JSON.stringify(failure, null, 2));

  return { ...state, data: { failure } };
});

upsertCase(
  {
    externalIds: ['record_id'],
    data: dataValue('failure'),
  },
  state => {
    console.log(state.data);
    return state;
  }
);
