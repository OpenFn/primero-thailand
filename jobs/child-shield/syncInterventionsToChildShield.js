//To update when spec for Flow 1 , job #3 submitted
fn(state => {
  const { translations, locationsMap} = state;
  
  console.log('Lookups translations', translations); 
  console.log('Location translations', locationsMap); 
  return state; 
})