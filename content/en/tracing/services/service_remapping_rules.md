---
title: Service remapping rules
site_support_id: service_remapping_rules
---

{{< callout url="https://www.datadoghq.com/product-preview/service-remapping-rules/"
 btn_hidden="false" header="Join the Preview!">}}
Service remapping rules are in Preview.
{{< /callout >}}

## Overview

Update how your services appear across Datadog without changing tracer configuration or redeploying code. Service remapping rules allow you to rename, merge, or split services; or create new services based on infrastructure tags from the Datadog UI. You can also create remapping rules for other entity types, such as datastores and queues.

<div class="alert alert-info">Each organization can contain up to 100 remapping rules.</div>

## Prerequisites

You must have the `apm_service_renaming_write` permission to create remapping rules. See [Permissions][1] for details on Datadog role-based access control.

### Tracer version requirements

You can create service remapping rules only for services instrumented with supported tracer versions. If a service is reporting from an older tracer version, upgrade the tracer before creating remapping rules for that service.

| Language   | Minimum supported tracer version |
|------------|----------------------------------|
| Dotnet     | [3.4.0][3]                       |
| Go         | [1.55.0][6]                      |
| Java       | [1.20.0][2]                      |
| JavaScript | [4.16.0][4]                      |
| PHP        | [0.94.1][7]                      |
| Python     | [1.19.0][5]                      |
| Ruby       | [1.15.0][8]                      |

## Create a service remapping rule 

### Step 1: Select remapping action and entities to target

1. In Datadog, navigate to **APM** > **Software Catalog** > **Manage** > [**Manage Remapping Rules**][13] and click **+ Add Rule**. 

   Alternatively, navigate to **APM** > [**Software Catalog**][14] and click on a service to open the service side panel. From there, click **Service Page** > **Service Remapping**.
   {{< img src="tracing/services/renaming_rules/service-side-panel.png" alt="The side panel for a service, showing the Service Page dropdown menu with a Service Remapping option" style="width:100%;" >}}
1. Choose a remapping action to perform for your new remapping rule.
   - Select **Remap services** to split a single entity, rename an entity, merge multiple entities together, or rename several entities.
   - Select **Correlate telemetry** to identify a service based on an infrastructure tag.
1. Use the search bar to select the entities you want to remap.
   - You can select one or more entities, but all must be of the same type (service, inferred service, datastore, or queue). Select services based on their `service` or `peer.service` tag, not by their Display Name metadata.
   - As you select entities, a span query is built in the background. To edit the query, select **Build Advanced Query**.
       - Select **Service Rule** to remap services. Select **Inferred Service Rule** to remap inferred services, datastores, or queues.
       - Select **Add Condition** to add an `AND` condition to your query.
       - Add multiple values in the **Value** section to create an `OR` condition.
   - If you're correlating a service with infrastructure tags, you can only select _one_ service. Choose infra tag(s) to correlate telemetry on. All telemetry with the same infra tag(s) as the service chosen will be remapped to a single unified service name.

### Step 2: Specify new entity name

In the text box, enter a unique name for the selected entity (or entities). Alternatively, use tag values with the `{{tagName}}` syntax to remap based on an entity's tags.
   1. If tag values follow a pattern, apply a regular expression to extract only the portion you want in the name.
**Note**: The preview is not an exhaustive list. If you are remapping a service based on a tag with several values, only the values with the most spans appear in the preview. 

### Step 3: Name your rule and review

1. Optionally, enter a descriptive name for the remapping rule so you can identify it later.
1. Review and save your remapping rule. Note: It may take a minute for the remapping rule to take effect.

## Remapping rules behavior

Remapping rules work by overriding the `service` tag for remapping services, or the `peer.service` tag for remapping inferred services, datastores, and queues. Services are remapped at intake, and any preexisting configuration specifying a service name does not change when a remapping rule is created. Service remapping rules take precedence over all other service name configurations.

Remapping rules are applied across APM, Logs, Metrics, USM, DSM, DJM, DBM, Profiling, NPM, Live Processes, Live Containers, Kubernetes, and Events.

- **Historical data:** Changes made by remapping rules affect only telemetry ingested while a rule is active, and past data is not updated retroactively. Deleting or modifying a rule stops it from applying to new data, but does not revert names on previously ingested data.
- **Logs service remapper:** Service remapping rules occur before logs pipelines. If the logs service remapper and remapping rules are both applied to a service, the remapping rules take precedence. 
- **Dashboards and monitors:** Existing queries that reference old service names are not automatically updated. Review and update these manually.
- **Integration overrides:** Remapping rules apply to base services; integration overrides are not remapped. [Remove integration overrides][15] for the best APM experience.

[1]: /account_management/rbac/permissions
[2]: https://github.com/DataDog/dd-trace-java/releases/tag/v1.20.0
[3]: https://github.com/DataDog/dd-trace-dotnet/releases/tag/v3.4.0
[4]: https://github.com/DataDog/dd-trace-js/releases/tag/v4.16.0
[5]: https://github.com/DataDog/dd-trace-py/releases/tag/v1.19.0
[6]: https://github.com/DataDog/dd-trace-go/releases/tag/v1.55.0
[7]: https://github.com/DataDog/dd-trace-php/releases/tag/0.94.1
[8]: https://github.com/DataDog/dd-trace-rb/releases/tag/v1.15.0
[9]: /tracing/services/
[10]: /internal_developer_portal/software_catalog/
[11]: /logs/explorer/
[12]: /metrics/explorer/
[13]: https://app.datadoghq.com/software/settings/service-rename
[14]: https://app.datadoghq.com/software
[15]: /tracing/services/service_override_removal
