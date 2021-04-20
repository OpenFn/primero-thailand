alterState(state => {
  console.log(state.data);
  const data = {
    mark_synced: true,
    mark_synced_url:
      'https://www.openfn.org/inbox/7b080edf-4466-4041-a4b3-9dbfdf02daee',
    record_id: state.record_id, //upserting by record_id now
  };

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
});
