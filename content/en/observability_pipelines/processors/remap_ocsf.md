---
title: Remap to OCSF Processor
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use this processor to remap logs to Open Cybersecurity Schema Framework (OCSF) events. OCSF schema event classes are set for a specific log source and type. You can add multiple mappings to one processor. **Note**: Datadog recommends that the OCSF processor be the last processor in your pipeline, so that remapping is done after the logs have been processed by all the other processors.

## Setup

To set up this processor:

Click **Manage mappings**. This opens a modal:

- If you have already added mappings, click on a mapping in the list to edit or delete it. You can use the search bar to find a mapping by its name. Click **Add Mapping** if you want to add another mapping. Select **Library Mapping** or **Custom Mapping** and click **Continue**.
- If you have not added any mappings yet, select **Library Mapping** or **Custom Mapping**. Click **Continue**.

{{% collapse-content title="Library mapping" level="h5" expanded=false id="library_mapping" %}}

#### Add a mapping

1. Select the log type in the dropdown menu.
1. Define a [filter query](#filter-query-syntax). Only logs that match the specified filter query are remapped. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. Review the sample source log and the resulting OCSF output.
1. Click **Save Mapping**.

#### Library mappings

These are the library mappings available:

| Log Source             | Log Type                                      | OCSF Category                 | Supported OCSF versions|
|------------------------|-----------------------------------------------|-------------------------------| -----------------------|
| AWS CloudTrail         | Type: Management<br>EventName: ChangePassword | Account Change (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | SetIamPolicy                                  | Account Change (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | CreateSink                                    | Account Change (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | UpdateSync                                    | Account Change (3001)         | 1.3.0<br>1.1.0         |
| Google Cloud Audit     | CreateBucket                                  | Account Change (3001)         | 1.3.0<br>1.1.0         |
| GitHub                 | Create User                                   | Account Change (3001)         | 1.1.0                  |
| Google Workspace Admin | addPrivilege                                  | User Account Management (3005)| 1.1.0                  |
| Okta                   | User session start                            | Authentication (3002)         | 1.1.0                  |
| Microsoft 365 Defender | Incident                                      | Incident Finding (2005)        | 1.3.0<br>1.1.0 |
| Palo Alto Networks     | Traffic                                       | Network Activity (4001)       | 1.1.0                  |

{{% /collapse-content %}}

{{% collapse-content title="Custom mapping" level="h5" expanded=false id="custom_mapping" %}}

When you set up a custom mapping, if you try to close or exit the modal, you are prompted to export your mapping. Datadog recommends that you export your mapping to save what you have set up so far. The exported mapping is saved as a JSON file.

To set up a custom mapping:

1. Optionally, add a name for the mapping. The default name is `Custom Authentication`.
1. Define a [filter query](#filter-query-syntax). Only logs that match the specified filter query are remapped. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. Select the OCSF event category from the dropdown menu.
1. Select the OCSF event class from the dropdown menu.
1. Enter a log sample so that you can reference it when you add fields.
1. Click **Continue**.
1. Select any OCSF profiles that you want to add. See [OCSF Schema Browser][1] for more information.
1. All required fields are shown. Enter the required **Source Logs Fields** and **Fallback Values** for them. If you want to manually add additional fields, click **+ Field**. Click the trash can icon to delete a field. **Note**: Required fields cannot be deleted.
    - The fallback value is used for the OCSF field if the log doesn't have the source log field.
    - You can add multiple fields for **Source Log Fields**. For example, Okta's `user.system.start` logs have either the `eventType` or `legacyEventType` field. You can map both fields to the same OCSF field.
    - If you have your own OCSF mappings in JSON or saved a previous mapping that you want to use, click **Import Configuration File**.
1. Click **Continue**.
1. Some log source values must be mapped to OCSF values. For example, the values of a source log's severity field that is mapped to the OCSF's `severity_id` field, must be mapped to the OCSF `severity_id`'s values. See `severity_id` in [Authentication][2] for a list of OCSF values. An example of mapping severity values:
    | Log source value | OCSF value      |
    | ---------------- | --------------- |
    | `INFO`           | `Informational` |
    | `WARN`           | `Medium`        |
    | `ERROR`          | `High`          |
1. All values that are required to be mapped to an OCSF value are listed. Click **+ Add Row** if you want to map additional values.
1. Click **Save Mapping**.

[1]: https://schema.ocsf.io/
[2]: https://schema.ocsf.io/1.4.0/classes/authentication?extensions=

{{% /collapse-content %}}

{{% observability_pipelines/processors/filter_syntax %}}

