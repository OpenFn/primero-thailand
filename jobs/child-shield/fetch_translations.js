// Get selected fields in google sheets
get(
  `${state.configuration.spreedsheetUrl}/${state.configuration.spreedsheetId}/values/Select%20Fields?majorDimension=COLUMNS&valueRenderOption=FORMATTED_VALUE&key=${state.configuration.googleAPI_KEY} `
);

// Set selected fields to be used on Premiro job
fn(state => {
  const selectFields = state.data.values.flat();
  selectFields.splice(selectFields.indexOf('SELECT FIELDS '), 1);

  return { ...state, selectFields };
});

// get forms from Primero
get(`${state.configuration.url}/api/v2/forms`, {
  headers: { 'content-type': 'application/json' },
  authentication: {
    username: state.configuration.user,
    password: state.configuration.password,
  },
  strictSSL: false,
});

// Get a list of selected externallyDefinedOptionSets (either as IDs or objects)
fn(state => {
  const forms = state.data.data;

  // Let's use the Select Fields values  we pulled from Googlesheet UNICEF Thailand & MOPH Interoperability Mapping [MASTER]
  const selectFields = state.selectFields;

  const externallyDefinedOptionSets = forms
    .map(form =>
      form.fields
        .filter(field => {
          if (selectFields.includes(field.name)) {
            return true;
          } else {
            console.log(
              `Error: field ${field.name} not part of specified selectFields`
            );
            return false;
          }
        })
        .map(field =>
          field.hasOwnProperty('option_strings_source')
            ? {
                unique_id: field.option_strings_source.replace('lookup ', ''),
                values: [],
              }
            : {
                unique_id: field.name,
                values: field.option_strings_text,
              }
        )
        .flat()
    )
    .flat();

  // Clean up duplicates keys in externallyDefinedOptionSets to get uniqueExternallyDefinedOptionSets
  let uniqueExternallyDefinedOptionSets = [];

  for (i = 0; i < externallyDefinedOptionSets.length; i++) {
    if (
      !uniqueExternallyDefinedOptionSets.find(
        x => x.unique_id === externallyDefinedOptionSets[i].unique_id
      )
    ) {
      uniqueExternallyDefinedOptionSets.push(externallyDefinedOptionSets[i]);
    }
  }

  return { ...state, uniqueExternallyDefinedOptionSets };
});

// Get _all_ of the actual values for externallyDefinedOptionSets in Primero (they call these "lookups")
get(`${state.configuration.url}/api/v2/lookups?per=1000000&page=1`, {
  headers: { 'content-type': 'application/json' },
  authentication: {
    username: state.configuration.user,
    password: state.configuration.password,
  },
  strictSSL: false,
});

// Using the uniqueExternallyDefinedOptionSets, get the option values for each set.
fn(state => {
  const optionStringsSourceLookupNames =
    state.uniqueExternallyDefinedOptionSets;

  const lookupTranslations = state.data.data;

  // For optionStringsSourceLookupNames with existing values
  const formsTranslationsMapping = optionStringsSourceLookupNames
    .filter(optStringsSourceLookupName => {
      if (optStringsSourceLookupName.values.length !== 0) {
        return true;
      } else {
        return false;
      }
    })
    .map(optStringsSourceLookupName => {
      let desiredMappingOutput = [];

      optStringsSourceLookupName.values
        .map(val => {
          desiredMappingOutput.push({
            [val.id]: val.display_text.th,
          });
        })
        .flat();

      console.log(`Meeee ${optStringsSourceLookupName.unique_id}`);
      return {
        [optStringsSourceLookupName.unique_id]: Object.assign(
          {},
          ...desiredMappingOutput
        ),
      };
    })
    .flat();

  const lookupsTranslationsMapping = optionStringsSourceLookupNames
    .map(optStringsSourceLookupName => {
      return lookupTranslations
        .filter(lookupTranslation => {
          if (
            lookupTranslation.unique_id === optStringsSourceLookupName.unique_id
          ) {
            return true;
          } else {
            return false;
          }
        })
        .map(lookupTranslation => {
          console.log(
            `So let's build a new response ${optStringsSourceLookupName.unique_id}`
          );

          let desiredMappingOutput = [];
          // Map option values id and translations
          lookupTranslation.values
            .map(val => {
              desiredMappingOutput.push({
                [val.id]: val.display_text.th,
              });
            })
            .flat();
          return {
            [optStringsSourceLookupName.unique_id]: Object.assign(
              {},
              ...desiredMappingOutput
            ),
          };
        })
        .flat();
    })
    .flat();

  combinedTranslations = Object.assign(
    {},
    ...formsTranslationsMapping.concat(lookupsTranslationsMapping)
  );

  return { ...state, combinedTranslations };
});
