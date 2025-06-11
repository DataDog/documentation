Use this processor to exclude or include specific tags in the Datadog tags (`ddtags`) array for logs coming from the Datadog Agent. Tags that are excluded or not included are dropped and may reduce your outbound log volume.

To set up the processor:

1. Define a filter query. Only logs that match the specified filter query are processed. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. Enter the path to the array. Use the path notation `<OUTER_FIELD>.<INNER_FIELD>` to match subfields. See the [Path notation example](#path-notation-example) below.
1. Optionally, input a Datadog tags array for the **Configure tags** section. For example: `["a:b", "c:d"]` or `["a:b", "c:d", "e"]`.
1. In the **Configure tags** section, select whether you want to **Exclude tags** or **Include tags**. In the dropdown menu, select the tag keys that you want to exclude or include. **Note**: Wild cards are supported.

##### Path notation example

For the following message structure:

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

- Use `outer_key.inner_key` to refer to the key with the value `inner_value`.
- Use `outer_key.inner_key.double_inner_key` to refer to the key with the value `double_inner_value`.

