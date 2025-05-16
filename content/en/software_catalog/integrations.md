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

When you configure a service account for a [Datadog integration][10], you can incorporate metadata from your integrations into service definitions in the [Software Catalog][9]. You can leverage Datadog's [Action Catalog][24] to both query external data and take action directly.

{{< callout url="https://forms.gle/PzXWxrnGaQPiVf9M8" d_target="#signupModal" btn_hidden="false" header="Request a new integration" >}}
{{< /callout >}}

## Collaboration, Incident Management, and Ticketing

### PagerDuty

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
   
You can also create other visualizations, actions, or automations to integrate with Pagerduty by leveraging Datadog's [Action Catalog][15]. These actions can be used to query & act upon services, incidents, schedules, and more from PagerDuty.


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

You can also create other visualizations, actions, or automations to integrate with OpsGenie by leveraging Datadog's [Action Catalog][16].  These actions can be used to query & act upon services, schedules, incidents, and more from OpsGenie.

### Atlassian Statuspage

Atlassian Statuspage integration to create and update status incidents and components. You can automatically post incidents to your Statuspage, retrieve incident details, and update component status to keep users informed. Learn more about configuring the [integration][18]. You can also leverage Datadog's [Action Catalog][19] to query & act upon pages and incidents.

### Freshservice

Freshservice (Freshworks) service desk integration for IT incident tickets. Allows Datadog to create, update, and query Freshservice tickets—for example, opening a new incident in Freshservice when a monitor alerts. Learn more about configuring the integration. You can also explore Datadog’s Action Catalog for available Freshservice actions.

### Slack

Slack collaboration integration to send incident alerts or updates to Slack channels (and perform channel management). Datadog can post messages to Slack, create channels, invite users, and more—ideal for setting up incident war rooms. Learn more in the integration documentation, or explore Slack-specific workflows in the Action Catalog.

### Microsoft Teams

Microsoft Teams integration for incident collaboration. Enables Datadog to send messages or prompts to Teams channels—for example, notifying on-call responders. Read more in the integration documentation and browse the Teams actions in Datadog’s Action Catalog.

### Jira

Atlassian Jira integration to create and update issues directly from Datadog. Common actions include creating tickets, adding comments, or updating status fields when a monitor triggers. Read more in the integration documentation and find Jira actions in the Action Catalog.

### Asana

Asana project management integration for task tracking and post-incident workflows. Datadog can create and update Asana tasks, assign users, and apply tags. Full setup is described in the integration guide, and Asana actions are available in the Action Catalog.

### LaunchDarkly

Track feature flag changes, let developers make changes without leaving the platform, and drive automation based on changes. Full setup is described in the integration guide, and LaunchDarkly actions are available in the Action Catalog.

## Source Code Management

### GitHub
GitHub integration that supports creating issues or PRs, managing repo files, and automating team access. This is useful for tying alert workflows to code changes. Full setup steps are in the integration documentation, and the GitHub actions are detailed in the Action Catalog.

#### Metadata Ingestion

Configure the [GitHub integration][20] to directly link from where you view the service's definition in the Software Catalog to where it's stored and editable in GitHub. Datadog scans for the `service.datadog.yaml` and `entity.datadog.yaml` files throughout each repository with read permissions.

To install the GitHub integration:
1. Navigate to the [integration tile][21].
2. Click **Link GitHub Account** in the **Repo Configuration** tab.

When the GitHub integration is set up for your definitions, an **Edit in GitHub** button appears in the service's **Definition** tab and links you to GitHub to commit changes.

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="An Edit in GitHub button appears in the Definition tab of a service in the Software Catalog" style="width:90%;" >}}

After you update the YAML files for your repositories, your changes propagate to the Software Catalog. You can register multiple services in one YAML file by creating multiple YAML documents. Separate each document with three dashes (`---`).

To prevent accidental overwriting, create and modify your definition files with either the GitHub integration or the [Definition API endpoints][22]. Updating the same service using both the GitHub and the API may result in unintended overwriting.

### GitLab
GitLab integration covers issues, merge requests, branches, and commits. Datadog actions include creating MRs, commenting, managing branches, and querying pipeline status. Get started with the integration setup and explore available GitLab actions in the Action Catalog.

### Other Source Code Providers
Bitbucket & Azure DevOps repositories are not natively supported in Datadog’s Software or Action Catalog. If you use Bitbucket or other git platforms, you can use the generic HTTP action to call their APIs (for example, to create issues or commits via Bitbucket’s REST API) (Similarly, Azure DevOps Repos can be automated via HTTP requests if needed, since Datadog currently focuses on ADO pipelines.)

## CI/CD

### Github Actions
GitHub Actions integration to view, launch, and coordinate CI/CD workflows on GitHub. Datadog actions allow you to trigger a GitHub Actions workflow dispatch and fetch workflow run statuses programmatically.

### Gitlab Pipelines

GitLab CI/CD integration covering projects, pipelines, and jobs. You can trigger GitLab project pipelines, cancel or retry jobs, and query pipeline results.

### Jenkins

Jenkins CI server integration that allows you to trigger and manage Jenkins jobs from Datadog. You can submit new builds, delete jobs, or fetch job status as part of a workflow. See the full integration setup and Jenkins actions in the Action Catalog.

### CircleCI

CircleCI integration to interact with your CI pipelines. Datadog can approve workflows and retrieve pipeline/job details (e.g. job artifacts or status), enabling automated pipeline control. Read more in the integration docs and CircleCI section of the Action Catalog.

### Azure DevOps Pipelines

Integration for Azure DevOps Pipelines (ADO). You can trigger pipelines and fetch run data—ideal for launching deployments or QA workflows based on monitor activity. Configure it via the integration guide and reference pipeline actions in the Action Catalog.

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

## Cloud Resources

Datadog's Infrastructure integrations and [Resource Catalog][23] provides a comprehensive inventory of integrations across AWS, Azure, and GCP. You can also leverage Datadog's 1000+ actions in the [Action Catalog][24] to create custom visualizations, actions, and automations.

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
[18]: https://docs.datadoghq.com/integrations/statuspage/
[19]: https://docs.datadoghq.com/actions/actions_catalog/?search=statuspage
[20]: /integrations/github/
[21]: https://app.datadoghq.com/integrations/github
[22]: /api/latest/software-catalog/
[23]: https://app.datadoghq.com/infrastructure/catalog
[24]: https://docs.datadoghq.com/actions/actions_catalog/
