The remap processor can add, drop, or rename fields within your individual log data. Use this processor to enrich your logs with additional context, remove low-value fields to reduce volume, and standardize naming across important attributes. Select **add field**, **drop field**, or **rename field** in the dropdown menu to get started.

##### Add field
Use **add field** to append a new key-value field to your log.

To set up the add field processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. Enter the key and value you want to add. To specify a nested field for your key, use the [path notation](#path-notation-example): `<OUTER_FIELD>.<INNER_FIELD>`. All values are stored as strings.   
    **Note**: If the key you specify already exists, that key's original value is overwritten.

##### Drop field

Use **drop field** to drop a field from logging data that matches the filter you specify below.

To set up the drop field processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. Enter the key of the field you want to drop. To specify a nested field for your specified key, use the [path notation](#path-notation-example): `<OUTER_FIELD>.<INNER_FIELD>`.   
    **Note**: If your specified key does not exist, your log will be unimpacted.

##### Rename field

Use **rename field** to rename a field within your log.

To set up the rename field processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. Enter the name of the field you want to rename in the **Source key** field. To specify a nested field for your key, use the [path notation](#path-notation-example): `<OUTER_FIELD>.<INNER_FIELD>`. Once renamed, your original field is deleted unless you enable the **Preserve source tag** checkbox described below.   
    **Note**: If the source key you specify doesn't exist, a default `null` value is applied to your target.
1. In the **Target key** field, enter the name you want the source field to be renamed to. To specify a nested field for your specified key, use the [path notation](#path-notation-example): `<OUTER_FIELD>.<INNER_FIELD>`.   
    **Note**: If the target key you specify already exists, then that key's original value is overwritten.
1. Optionally, check the **Preserve source tag** box if you want to retain the original source field and duplicate the information from your source key to your specified target key. If this box is not checked, the source key is dropped after it is renamed.

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