alterState(state => {
  const error = state.error;

  let status = 'failed';
  for (elt of error)
    if (elt.includes('MODEL_NOT_FOUND')) {
      status = 'not_found';
    }

  const data = {
    mark_synced: true,
    mark_synced_status: status,
    mark_synced_url:
      'https://www.openfn.org/inbox/7b080edf-4466-4041-a4b3-9dbfdf02daee',
    record_id: state.data.data.record_id, //upserting by record_id now
  };

  console.log('Upserting case', JSON.stringify(data, null, 2));
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
});
