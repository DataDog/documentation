---
title: Integrations
aliases:
  - /tracing/software_catalog/integrations
  - /tracing/service_catalog/integrations
  - /service_catalog/integrations
  - /software_catalog/integrations
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
<div class="alert alert-danger">
PagerDuty and OpsGenie integrations for Internal Developer Portal are not supported in the {{< region-param key=dd_datacenter code="true" >}} site.
</div>
{{% /site-region %}}
  
## Overview

When you configure a service account for a [Datadog integration][1], you can incorporate metadata from your integrations into [Software Catalog][16] entity definitions. From there, you can use the [Action Catalog][31] to query external systems or trigger actions—such as creating incidents or updating tickets—without leaving Datadog.

{{< callout url="https://forms.gle/PzXWxrnGaQPiVf9M8" d_target="#signupModal" btn_hidden="false" header="Request a new integration" >}}
{{< /callout >}}

## Collaboration, incident management, and ticketing

| Integration  | Description    | Example actions (Action Catalog) |
|--------------|----------------|----------------------------------|
| [PagerDuty][2] | Add PagerDuty metadata to a service so that the Software Catalog displays and links to information such as who is on-call and whether there are active PagerDuty incidents for the service. | `Get current on-call`, `Trigger incident` <br> [See all available actions.][32] |
| [OpsGenie][3] | Add OpsGenie metadata to a service so that the Software Catalog displays and links to information such as who is on-call for the service. | `Acknowledge alert`, `Get current on call` <br> [See all available actions.][33] |
| [StatusPage][4] | Create, update, and retrieve details about incidents and components. | `Create an incident`, `Update component status` <br> [See all available actions.][34] |
| [Freshservice][5] | Create, update, and query Freshservice tickets. | `List tickets`, `Update ticket` <br> [See all available actions.][35] |
| [Slack][6] | Send incident alerts or updates to Slack channels, and perform channel management. | `Invite users to channel`, `Set channel topic` <br> [See all available actions.][36] |
| [Microsoft Teams][7] | Send messages or prompts to Teams channels for incident collaboration. | `Make a decision`, `Send a message` <br> [See all available actions.][37] |
| [Jira][8] | create and update issues directly from Datadog. | `Create issue`, `Add comment` <br> [See all available actions.][38] |
| [Asana][9] | Create and update Asana tasks, assign users, and apply tags. | `Add tag to task`, `Update task completed status` <br> [See all available actions.][39] |
| [LaunchDarkly][10] | Track feature flag changes, let developers make changes without leaving the platform, and drive automation based on changes | `Add expire user target date`, `Toggle feature flag` <br> [See all available actions.][40] |

### Setup examples

{{% collapse-content title="PagerDuty" level="h4" expanded=false id="id-for-anchoring" %}}

You can connect any service in your [PagerDuty Service Directory][63]. You can map one PagerDuty service to each service in Software Catalog.

1. If you have not already done so, set up the [Datadog PagerDuty integration][2].
1. Obtain your [PagerDuty API Access Key][61].
1. Paste the key on the [PagerDuty Integration Setup][52] page.

   {{< img src="tracing/software_catalog/pagerduty-token.png" alt="PagerDuty integration setup form with the API key field highlighted." style="width:100%;" >}}

1. Add PagerDuty information to the [entity definition][82]:
   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

{{% /collapse-content %}}

{{% collapse-content title="OpsGenie" level="h4" expanded=false id="id-for-anchoring" %}}

To add OpsGenie metadata to an entity definition: 

1. If you have not already done so, set up the [Datadog OpsGenie integration][3].
1. Obtain your [OpsGenie API Access Key][62] and ensure it has **configuration access** and **read** permissions.
3. At the bottom of the [integration tile][55], add an account, paste your OpsGenie API access key, and select the region for your OpsGenie account.

   {{< img src="tracing/software_catalog/create_account1.png" alt="The Create New Account workflow in the OpsGenie integration tile" style="width:80%;" >}}
   {{< img src="tracing/software_catalog/create_account2.png" alt="The Create New Account workflow in the OpsGenie integration tile" style="width:80%;" >}}

4. Update the [entity definition][82] with OpsGenie metadata. For example:

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

Once you've completed these steps, an **On Call** information box appears in the **Ownership** tab for services in Software Catalog.

{{< img src="tracing/software_catalog/oncall_information.png" alt="On Call information box displaying information from OpsGenie in the Software Catalog" style="width:85%;" >}}

{{% /collapse-content %}}


## Source code management

| Integration  | Description    | Example actions (Action Catalog) |
|--------------|----------------|----------------------------------|
| [GitHub][11] | Create issues or PRs, manage repo files, and automate team access. | `Add labels to pull request`, `Get team membership` <br> [See all available actions.][41] |
| [GitLab][12] | Manage issues, merge requests, branches, and commits. | `Approve merge request`, `Cherry pick commit` <br> [See all available actions.][42] |
| Other (Bitbucket, Azure Repos) | Interact with platforms not natively supported in Datadog Software Catalog or Action Catalog. | N/A; use HTTP actions and reqeusts to call platform APIs |

You can also use GitHub to manage entity definitions and configure the GitHub integration to automatically pull definitions into Software Catalog. Learn more about [creating entity definitions and importing them from GitHub][83].

## CI/CD

| Integration  | Description    | Example actions (Action Catalog) |
|--------------|----------------|----------------------------------|
| [GitHub Actions][11] | View, launch, and coordinate CI/CD workflows on GitHub. | `Get latest workflow run`, `Trigger github actions workflow run` <br> [See all available actions.][47] |
| [GitLab Pipelines][12] | Manage GitLab project pipelines, cancel or retry jobs, and query pipeline results. | `Get latest pipeline`, `Retry jobs in a pipeline` <br> [See all available actions.][48] |
| [Jenkins][13] |  Trigger and manage Jenkins jobs. | `Submit Jenkins job`, `Get Jenkins job status` <br> [See all available actions.][43] |
| [CircleCI][14] | Interact with your CI pipelines. | `Approve workflow job`, `Get job details` <br> [See all available actions.][44] |
| [Azure DevOps Pipelines (ADO)][15] | Trigger pipelines and fetch run data—ideal for launching deployments or QA workflows based on monitor activity. | `Get pipeline`, `Run pipeline` <br> [See all available actions.][45] |

## CMDBs and internal developer portals


You can import entities from ServiceNow and Backstage into Datadog's Software Catalog. Refer to the following documentation for details:

- [Import entries from ServiceNow][84]
- [Import entries from Backstage][85]


## Cloud Resources

Datadog's Infrastructure integrations and [Resource Catalog][54] provides a comprehensive inventory of integrations across AWS, Azure, and GCP. You can also leverage Datadog's 1000+ actions in the [Action Catalog][31] to create custom visualizations, actions, and automations.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/
[2]: /integrations/pagerduty/
[3]: /integrations/opsgenie
[4]: /integrations/statuspage/
[5]: /integrations/guide/freshservice-tickets-using-webhooks/
[6]: /integrations/slack
[7]: /integrations/microsoft_teams
[8]: /integrations/jira
[9]: /integrations/asana
[10]: /integrations/launchdarkly
[11]: /integrations/github
[12]: /integrations/gitlab
[13]: /integrations/jenkins
[14]: /integrations/circleci
[15]: /integrations/azure_devops/
[16]: /internal_developer_portal/software_catalog/
[31]: /actions/actions_catalog/
[32]: /actions/actions_catalog/?search=pagerduty
[33]: /actions/actions_catalog/?search=opsgenie
[34]: /actions/actions_catalog/?search=statuspage
[35]: /actions/actions_catalog/?search=freshservice
[36]: /actions/actions_catalog/?search=slack
[37]: /actions/actions_catalog/?search=microsoft+teams
[38]: /actions/actions_catalog/?search=jira
[39]: /actions/actions_catalog/?search=asana
[40]: /actions/actions_catalog/?search=launchdarkly
[41]: /actions/actions_catalog/?search=github
[42]: /actions/actions_catalog/?search=gitlab
[43]: /actions/actions_catalog/?search=jenkins
[44]: /actions/actions_catalog/?search=circleci
[45]: /actions/actions_catalog/?search=azure+devops
[47]: /actions/actions_catalog/?search=github+actions
[48]: /actions/actions_catalog/?search=gitlab+pipelines
[51]: https://app.datadoghq.com/services
[52]: https://app.datadoghq.com/integrations/pagerduty
[53]: https://app.datadoghq.com/integrations/github
[54]: https://app.datadoghq.com/infrastructure/catalog
[55]: https://app.datadoghq.com/integrations/opsgenie
[61]: https://support.pagerduty.com/docs/api-access-keys
[62]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[63]: https://support.pagerduty.com/docs/service-directory
[82]: /internal_developer_portal/software_catalog/entity_model
[83]: /internal_developer_portal/software_catalog/set_up/create_entities#github-integration
[84]: /internal_developer_portal/software_catalog/set_up/import_entities#import-from-servicenow
[85]: /internal_developer_portal/software_catalog/set_up/import_entities#import-from-backstage


