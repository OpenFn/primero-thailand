get(
    `${state.configuration.url}/api/v2/forms`,
    {
        headers: { 'content-type': 'application/json' },
        authentication: {
            username: state.configuration.user,
            password: state.configuration.password
        },
        strictSSL: false,
    },
    state => {
        const response_data = state.data.data

        // return state.data;

        // Assume we have the select fields tab in the state
        const select_fields = state.fields_references
        let option_strings_source = []

        // lookup build when missing option_strings_source
        const build_resp = field => {
            let newResp = {
                key: value
            }

            newResp["key"] = field.name;
            newResp["value"] = field.option_strings_text;

            return rewResp;
        }

        // Lookup fn Search for all 139 field listed in fields tab
        // Search for the field using this path data[*].fields[*].name

        const lookup = fields => {
            for (var i = 0, len = fields.length; i < len; i++) {

                if (select_fields.includes(fields[i].name)) {
                    console.log(`Yeey!: field ${fields[i].name} was found in our current select fields`)
                    console.log(typeof (fields[i].option_strings_source))

                    option_strings_source.push(
                        fields[i].option_strings_source ? fields[i].option_strings_source.replace("lookup ", "") : `${fields[i].name} option_strings_text response `
                    )
                } else {
                    // throw new Error(
                    //     `field ${fields[i].name} not found in our current select fields`
                    // );

                    console.log(`Error: field ${fields[i].name} not found in our current select fields`)
                }
            }
            // console.log({ "option_strings_source": option_strings_source })
            return option_strings_source;
        }

        response_data.forEach(data => {
            lookup(data.fields)

        });

        // return { "data": response_data, "option_strings_source": option_strings_source };
        return { "option_strings_source": option_strings_source };
    }
);
