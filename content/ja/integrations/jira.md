---
"categories":
- "collaboration"
- "developer tools"
- "issue tracking"
- "notifications"
"custom_kind": "integration"
"dependencies": []
"description": "This integration allows you to create tickets from triggered alerts in Datadog, and update existing tickets with new information as it arises. Additionally, you can see Jira ticket creations as events within Datadog to overlay with all of your metrics."
"doc_link": "https://docs.datadoghq.com/integrations/jira/"
"draft": false
"git_integration_title": "jira"
"has_logo": true
"integration_id": ""
"integration_title": "Jira"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "jira"
"public_title": "Datadog-Jira Integration"
"short_description": "Have your Datadog alerts auto-generate and later update Jira tickets."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

Jira is an issue and project tracking system for software teams. The Datadog Jira integration allows you to create issues from triggered alerts, incidents, and cases in Datadog and view issues created in Jira as Datadog events.

## Setup

### Create an application link in Jira

1. Navigate to Jira.
1. Click the Gear icon in the right corner and select **Products**.
1. In the left menu under **Integrations**, click **Application links**, and then click **Create link**.
1. Select the **Direct application link** checkbox, enter the URL `https://{{< region-param key="dd_full_site" code="true" >}}` and click **Continue**.
1. Ignore the warning "No response was received from the URL you entered" and click **Continue**.
1. Fill in the form as follows and click **Continue**.

    | Field                 | Input                          |
    |-----------------------|--------------------------------|
    | Application Name      | `{Enter a name (e.g. Datadog)}`|
    | Application Type      | Generic Application            |
    | Service Provider Name | `{leave blank}`                |
    | Consumer key          | `{leave blank}`                |
    | Shared secret         | `{leave blank}`                |
    | Request Token URL     | `{leave blank}`                |
    | Access token URL      | `{leave blank}`                |
    | Authorize URL         | `{leave blank}`                |
    | Create incoming link  | Check the box                  |

7. Fill in the next form as follows and click **Continue**. To find the public key in the [Datadog Jira integration tile][1], click **Add Account**.

    | Field         | Input                                                      |
    |---------------|------------------------------------------------------------|
    | Consumer Key  | `{Enter a key name (e.g. datadog)}`                        |
    | Consumer Name | Datadog                                                    |
    | Public Key    | `{Enter the public key from Datadog Jira integration tile}`|

### Connect Datadog to your Jira instance

1. Navigate to the [Datadog Jira integration tile][1] and click **Add Account**.
2. Enter the URL of your Jira instance and the consumer key of the application link you previously created.
3. Click **Connect** and follow the instructions on the Jira authorization page. Datadog recommends having a dedicated (non-personal) Jira service account specifically for this integration for optimal and more consistent results. Be sure to log into this account before hitting **Connect**.
**Note**: The Datadog Jira integration can connect to On-Prem/Jira Server and Jira Data Center instances. However, many of these instances blacklist IP ranges. For the integration to work, follow the IP filtering documentation below.

### IP filtering

If your Jira instance filters traffic by IP address, you need to allow connections from the **Webhooks** 
IP prefixes belonging to Datadog in order for the integration to work. For a list of **Webhooks** IP prefixes for your region, see [Datadog IP Ranges][2].

### Further configuration

To configure automated Jira issue creation with bidirectional syncing in Case Management, see the instructions for [Configuring a Jira webhook](#configure-a-jira-webhook) and the [Case Management][3] documentation. 

To create Jira issues from Datadog monitor alerts, see [Configure an issue template](#configure-an-issue-template). 

## Configure a Jira webhook

Configuring a webhook enables cases created in Case Management to automatically create issues in Jira and keep both resources synced. 

To create a Jira webhook:
1. In Jira, click the **Gear** icon in the top right corner and select **System**.
1. In the left menu under *Advanced*, click **Webhooks**.
1. Click **Create a Webhook** in the right corner.
1. Enter `Datadog Webhook` as the webhook name.
1. Keep the status as **Enabled**.
1. Navigate to the [Datadog Jira integration tile][4].
1. Under the Webhooks section, copy the webhook URL.
1. Navigate back to Jira and paste the webhook URL under *URL*.
1. Enable the following issue-related events. If you only want to send a subset of issue events, you can use JQL to filter them. In this example we are filtering only for projects AB and CD.
    {{< img src="integrations/jira/jira_issue_events.png" alt="Jira Issue Events" style="width:80%;">}}
1. Enable the `deleted` project-related events.
1. Leave everything else unchecked.
1. Click the **Create** button at the bottom of the page.

## Configure an issue template

Issue templates define how issues are created in Jira from Datadog alert events.

To create an issue template:

1. In Datadog, click **New Issue Template** in the **Connect Jira to Monitor Notifications** section.
2. Enter a name for your issue template. This name, prefixed with `jira-`, becomes the handle you can use in your monitor to send notifications to (such as `jira-my-issue-template-name`).
3. Select a Jira account.
4. Select the project and issue type (such as **Story**, **Epic**, **Task**, or **Bug**).
5. A list of configurable fields appears. Enter values in the desired fields and click **Save**.

### Configure issue fields

Issue template fields define the data that is included when creating issues in Jira. For example, you can configure your template to create issues with a specific priority or a default assignee.

You can use data from the alert event to populate values in the issue fields using template variables such as `${EVENT_TITLE}`. For a list of possible variables, see the [Datadog Webhooks integration][5]. 

## Usage

#### Automatically create issues from Datadog alerts

To create Jira issues from Datadog alert events, enter the notification handle of one or more issue templates such as `@jira-my-issue-template` when creating a monitor in the **Notify your team** or **Say what's happening** sections.

Issues are created when the monitor triggers. New issues are not created by the monitor until the monitor is resolved.

## Data Collected

### Metrics

The Jira integration does not include any metrics.

### Events

All created Jira issues appear as events within Datadog.

### Service Checks

The Jira integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][6].

[1]: https://app.datadoghq.com/integrations/jira
[2]: https://docs.datadoghq.com/api/latest/ip-ranges/
[3]: https://docs.datadoghq.com/service_management/case_management/settings/#jira
[4]: https://app.datadoghq.com/account/settings#integrations/jira
[5]: https://docs.datadoghq.com/integrations/webhooks/
[6]: https://docs.datadoghq.com/help/

