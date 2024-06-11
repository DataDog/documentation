The dedupe processor removes copies of data to reduce volume and noise. It caches 5000 messages at a time and compares your incoming logs traffic against the cached messages. For example, this processor can be used to keep only unique warning logs in the case where multiple identical warning logs are sent in succession.

To set up the deduplicate processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. Deduped logs and logs that do not match the filter query are sent to the next step in the pipeline.
1. In the **Type of deduplication** dropdown menu, select whether you want to `Match` on or `Ignore` the fields specified below.
    - If `Match` is selected, then after a log passes through, future logs that have the same values for all of the fields you specify below are removed.
    - If `Ignore` is selected, then after a log passes through, future logs that have the same values for all of their fields, *except* the ones you specify below, are removed.
1.  Enter the fields you want to match on, or ignore. At least one field is required, and you can specify a maximum of three fields.
    - Use the path notation `<OUTER_FIELD>.<INNER_FIELD>` to match subfields. See [example](#path-notation-example).
1. Click **Add field** to add additional fields you want to filter on.

##### Path notation example

 For the following message structure, use `outer_key.inner_key.double_inner_key` to refer to the key with the value `double_inner_value`.
```json
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
```