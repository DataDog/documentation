When you set up a custom mapping, if you try to close or exit the modal, you are prompted to export your mapping. Datadog recommends that you export your mapping to save what you have set up so far. The exported mapping is saved as a JSON file.

To set up a custom mapping:

1. Optionally, add a name for the mapping. The default name is `Custom Authentication`.
1. Define a [filter query](#filter-query-syntax). Only logs that match the specified filter query are remapped. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. Select the OCSF event category from the dropdown menu.
1. Select the OCSF event class from the dropdown menu.
1. Enter a log sample so that you can reference it when you add fields.
1. Click **Continue**.
1. Select any OCSF profiles that you want to add. See [OCSF Schema Browser][10181] for more information.
1. All required fields are shown. Enter the required **Source Logs Fields** and **Fallback Values** for them. If you want to manually add additional fields, click **+ Field**. Click the trash can icon to delete a field. **Note**: Required fields cannot be deleted.
    - The fallback value is used for the OCSF field if the log doesn't have the source log field.
    - You can add multiple fields for **Source Log Fields**. For example, Okta's `user.system.start` logs have either the `eventType` or `legacyEventType` field. You can map both fields to the same OCSF field.
    - If you have your own OCSF mappings in JSON or saved a previous mapping that you want to use, click **Import Configuration File**.
1. Click **Continue**.
1. Some log source values must be mapped to OCSF values. For example, the values of a source log's severity field that is mapped to the OCSF's `severity_id` field, must be mapped to the OCSF `severity_id`'s values. See `severity_id` in [Authentication][10182] for a list of OCSF values. An example of mapping severity values:
    | Log source value | OCSF value      |
    | ---------------- | --------------- |
    | `INFO`           | `Informational` |
    | `WARN`           | `Medium`        |
    | `ERROR`          | `High`          |
1. All values that are required to be mapped to an OCSF value are listed. Click **+ Add Row** if you want to map additional values.
1. Click **Save Mapping**.

[10181]: https://schema.ocsf.io/
[10182]: https://schema.ocsf.io/1.4.0/classes/authentication?extensions=