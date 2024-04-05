The dedupe processor removes copies of data to reduce volume and noise. It caches 5000 messages at a time and compares your incoming logs traffic against the cached messages. For example, this processor can be used to keep only unique warning logs in the case where multiple identical warning logs are sent in succession.

To set up the deduplicate processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) is checked for deduplication based on the rules below.
1. In the **Type of deduplication** dropdown menu, select whether you want to `Match` on or `Ignore` the fields specified below.
    - If `Match` is selected, then after a log passes through, future logs that have the same values for all of the fields you specify below is removed.
    - If `Ignore` is selected, then after a log passes through, future logs that have the same values for all of their fields, *except* the ones you specify below is removed.
1.  Enter the fields you want to match on, or ignore. Click **Add field** if you have additional fields you want to filter on. At least one field is required, and you can specify a maximum of three fields.
    - Use the path notation `outer_field.inner_field` to match sub-fields. See [example](#path-notation-example).
    
##### Path notation example

 For the following message structure, use `outer_key.inner_key.double_inner_key` to refer to the key with the value `double_inner_value`.
    ``` JSON
    {
        "outer_key": {
            "inner_key": "inner_value",
                "a": {
                        "double_inner_key": "double_inner_value",
                        "b": "b value"
                    },
                "c": "c value"
            },
            "d": "d value"
        }