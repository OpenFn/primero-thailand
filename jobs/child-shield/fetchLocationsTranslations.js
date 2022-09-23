// Get locations translations
get('/api/v2/locations?per=1000000');

// location translations mapping
fn(state => {
  const locations = state.data.data;

  const locationsMap = locations.reduce((acc, v) => {
    return { ...acc, [v.name.en]: v.name.th };
  }, {});

  return { locationsMap };
});

// Post the translation to OpenFn Inbox
post(`${state.configuration.openFnInboxURL}`, {
  headers: { 'x-api-key': state.configuration.xApiKey },
  body: state => state.locationsMap,
});
