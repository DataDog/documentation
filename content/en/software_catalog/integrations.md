---
title: Use Integrations with Software Catalog
aliases:
  - /tracing/software_catalog/integrations
  - /tracing/service_catalog/integrations
  - /service_catalog/integrations
further_reading:
- link: "/tracing/software_catalog/service_definition_api/"
  tag: "Documentation"
  text: "Learn about the Service Definition API"
- link: "/integrations/opsgenie/"
  tag: "Documentation"
  text: "Learn about the OpsGenie integration"
- link: "/integrations/pagerduty/"
  tag: "Documentation"
  text: "Learn about the PagerDuty integration"
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
PagerDuty and OpsGenie integrations for Software Catalog are not supported in the {{< region-param key=dd_datacenter code="true" >}} site.
</div>
{{% /site-region %}}
  
## Overview

When you configure a service account for a [Datadog integration][10], you can incorporate metadata from your integrations into service definitions in the [Software Catalog][9]. You can also use autocomplete and validation features when editing a service definition in an [integrated development environment (IDE)](#ide-integrations).

## Collaboration & Incident Management

### PagerDuty integration

You can add PagerDuty metadata to a service so that the Software Catalog displays and links to information such as who is on-call and whether there are active PagerDuty incidents for the service. Because only one on-call can be displayed, Datadog selects the first user by escalation level, then alphabetically by email.

#### Setup

You can connect any service in your [PagerDuty Service Directory][1]. You can map one PagerDuty service for each service in the Software Catalog.

1. If you have not already done so, set up the [Datadog PagerDuty integration][2].

2. Get your PagerDuty API access key as described in their [API Access Key][3] documentation.

3. Enter the API Access Key on [Pagerduty Integration Setup][4] to finish configuring it.

  {{< img src="tracing/software_catalog/pagerduty-token.png" alt="Copy and Paste the API Key to Pagerduty Setup." style="width:100%;" >}}

4. Update the service definition with the PagerDuty information. For example, pass in the following `integrations` configuration lines within the full [service definition][5]:

   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```
   
You can also create other visualizations, actions, or automations to integrate with Pagerduty by leveraging Datadog's [Action Catalog][15].


### OpsGenie

You can add OpsGenie metadata to a service so that the Software Catalog displays and links to information such as who is on-call for the service.

#### Setup

1. If you have not already done so, set up the [Datadog OpsGenie integration][12].
2. Get your OpsGenie API access key as described in their [API Key Management][13] documentation. This API key requires **configuration access** and **read** access rights.
3. Add an account in the **Accounts** section at the bottom of the [integration tile][14], paste your OpsGenie API access key, and select the region for your OpsGenie account.

   {{< img src="tracing/software_catalog/create_account1.png" alt="The Create New Account workflow in the OpsGenie integration tile" style="width:80%;" >}}
   {{< img src="tracing/software_catalog/create_account2.png" alt="The Create New Account workflow in the OpsGenie integration tile" style="width:80%;" >}}

4. Update the service definition with the OpsGenie information to link your OpsGenie service with your Datadog service. For example, pass in the following `integrations` configuration lines within the full [service definition][5]:

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

Once you've completed these steps, an **On Call** information box appears in the **Ownership** tab of a service in the Software Catalog.

{{< img src="tracing/software_catalog/oncall_information.png" alt="On Call information box displaying information from OpsGenie in the Software Catalog" style="width:85%;" >}}

You can also create other visualizations, actions, or automations to integrate with Pagerduty by leveraging Datadog's [Action Catalog][16].

## CMDB or Internal Developer Portals

### ServiceNow

To populate your Datadog Software Catalog with services from your ServiceNow Configuration Management Database (CMDB), use the Service Ingestion feature in the Datadog-ServiceNow integration.

{{< img src="integrations/servicenow/service-metadata.jpg" alt="Screenshot of the Service Configuration panel showing metadata populated from ServiceNow" >}}

You can also create other visualizations, actions, or automations to integrate with ServiceNow by leveraging Datadog's [Action Catalog][17]. These actions can be used to query & act upon incidents, cases, and more from ServiceNow.

### Backstage

If you already have data or services registered in Backstage, you can import these services into Datadog directly. 

{{< img src="/tracing/software_catalog/software-catalog-backstage-import.png" alt="Service panel highlighting backstage metadata, links and definition" style="width:90%;" >}}

To import Backstage definitions:

- **API or Terraform**: Replace the YAMLs in your requests with Backstage YAMLs. 
- **GitHub integration**: Save your Backstage YAMLs in a repository with Datadog read permissions. Datadog scans for files named [`catalog-info.yaml`][1] in your repositories.

During import, Datadog maps Backstage data to Datadog data:
| Backstage Field | Datadog Mapping |
|-----------------|-----------------|
| `kind:component` and `kind:system` | Datadog recognizes these; `kind:component` is recognized as a service |
| `metadata.name` | `dd-service` |
| `metadata.namespace` | Custom tag with format `namespace:${metadata.namespace}` |
| `spec.lifecycle` | `lifecycle` |
| `spec.owner` | `team` |
| `metadata.links` | `links` |
| Annotation `github.com/project-slug` | Link with `type=repo` and `url=https://www.github.com/${github.com/project-slug}` |
| Annotations `pagerduty.com/service-id` and `pagerduty.com/account` | Combined and mapped to `integration.pagerduty` |
| `metadata.description` | `description` |
| `spec.system` | `application` |
| `spec.dependsOn` | `dependsOn` |
| Other `spec` values | Mapped to custom tags |

<div class="alert alert-warning">
The Software Catalog processes the entire YAML file as a whole. If any section of the YAML file does not have <code>kind:component</code> or <code>kind:system</code>, the entire <code>catalog-info.yaml</code> file is rejected. Schema version v3.0 is required to use kind:system and the <code>dependsOn</code> field.
</div>

### Example YAML for catalog-info.yaml
{{< code-block lang="yaml" filename="catalog-info.yaml" collapsible="true" >}}
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: artist-web
  description: The place to be, for great artists
spec:
  type: service
  lifecycle: production
  owner: artist-relations-team
  system: artist-engagement-portal
  dependsOn:
    - service:email-service
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.pagerduty.com/docs/service-directory
[2]: /integrations/pagerduty/
[3]: https://support.pagerduty.com/docs/api-access-keys
[4]: https://app.datadoghq.com/integrations/pagerduty
[5]: /tracing/software_catalog/service_definition_api/
[6]: http://json-schema.org/
[7]: https://www.schemastore.org/json/
[8]: https://raw.githubusercontent.com/DataDog/schema/main/service-catalog/version.schema.json
[9]: /tracing/software_catalog/
[10]: /integrations/
[11]: https://app.datadoghq.com/services
[12]: /integrations/opsgenie
[13]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[14]: https://app.datadoghq.com/integrations/opsgenie
[15]: https://docs.datadoghq.com/actions/actions_catalog/?search=pagerduty
[16]: https://docs.datadoghq.com/actions/actions_catalog/?search=opsgenie
[17]: https://docs.datadoghq.com/actions/actions_catalog/?search=servicenow

