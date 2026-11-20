1. In the dropdown menu, select the library rule you want to use.
1. Recommended keywords are automatically added based on the library rule selected. After the scanning rule has been added, you can [add additional keywords or remove recommended keywords](#add-additional-keywords).
1. In the **Define rule target and action** section, select if you want to scan the **Entire Event**, **Specific Attributes**, or **Exclude Attributes** in the dropdown menu.
    - If you are scanning the entire event, you can optionally exclude specific attributes from getting scanned. Use [path notation](#path-notation-example-lib) (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is excluded.
    - If you are scanning specific attributes, specify which attributes you want to scan. Use [path notation](#path-notation-example-lib) (`outer_key.inner_key`) to access nested keys. For specified attributes with nested data, all nested data is scanned.
1. For **Define actions on match**, select the action you want to take for the matched information. **Note**: Redaction, partial redaction, and hashing are all irreversible actions.
    - **Redact**: Replaces all matching values with the text you specify in the **Replacement text** field.
    - **Partially Redact**: Replaces a specified portion of all matched data. In the **Redact** section, specify the number of characters you want to redact and which part of the matched data to redact.
    - **Hash**: Replaces all matched data with a unique identifier. The UTF-8 bytes of the match are hashed with the 64-bit fingerprint of FarmHash.
1. Optionally, click **Add Field** to add tags you want to associate with the matched events.
1. Add a name for the scanning rule.
1. Optionally, add a description for the rule.
1. Click **Save**.

##### Path notation example {#path-notation-example-lib}

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

##### Add additional keywords

After adding scanning rules from the library, you can edit each rule separately and add additional keywords to the keyword dictionary.

1. Navigate to your [pipeline][10141].
1. In the Sensitive Data Scanner processor with the rule you want to edit, click **Manage Scanning Rules**.
1. Toggle **Use recommended keywords** if you want the rule to use them. Otherwise, add your own keywords to the **Create keyword dictionary** field. You can also require that these keywords be within a specified number of characters of a match. By default, keywords must be within 30 characters before a matched value.
1. Click **Update**.

[10141]: https://app.datadoghq.com/observability-pipelines