<div class="alert alert-warning">The Remap to OCSF processor is in Preview. Complete this <a href="https://www.datadoghq.com/product-preview/remap-logs-to-the-ocsf-format/">form</a> to request access.
</div>

Use this processor to remap logs to Open Cybersecurity Schema Framework (OCSF) events.  OCSF schema event classes are set for a specific log source and type. You can add multiple mappings to one processor. **Note**: Datadog recommends that the OCSF processor be the last processor in your pipeline, so that remapping is done after the logs have been processed by all the other processors.

To set up this processor:

Click **Manage mappings**. This opens a side panel:

- If you have not added any mappings yet, enter the mapping parameters as described in [Add a mapping](#add-a-mapping).
- If you have already added mappings, click on a mapping in the list to edit or delete it. Use the search bar to find a mapping by its name. Click **Add Mapping** to add another mapping.

#### Add a mapping

1. Select the log type in the dropdown menu.
1.  Define a filter query. Only logs that match the specified filter query are remapped. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. Click **Add Mapping**.

#### Mappings

These are the mappings available:

| Log Source             | Log Type                                      | OCSF Category                 |
|------------------------|-----------------------------------------------|-------------------------------|
| AWS CloudTrail         | Type: Management<br>EventName: ChangePassword | Account Change (3001)         |
| Okta                   | User session start                            | Authentication (3002)         |
| Palo Alto Networks     | Traffic                                       | Network Activity (4001)       |
| Google Workspace Admin | addPrivilege                                  | User Account Management (3005)|