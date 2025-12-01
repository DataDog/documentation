---
title: Configure integrations and settings
---

## Configure where Bits sends investigation findings

By default, all investigations are listed on the [Bits AI Investigations][1] page.

For monitor alert investigations, a summary of the findings is available on the monitor's status page. If your monitor already has `@slack`, `@case`, or `@oncall` [notifications][2] configured, Bits automatically posts its findings to those destinations. If not, you can set up those integrations using the instructions below. 


### Slack

1. Ensure the [Datadog Slack app][3] is installed in your Slack workspace.
1. In your monitor, go to **Configure notifications and automations** and add the `@slack-{channel-name}` handle. This sends monitor notifications to your chosen Slack channel.
1. Lastly, go to [**Bits AI SRE** > **Settings** > **Integrations**][4] and connect your Slack workspace. This allows Bits to write its findings directly under the monitor notification in Slack.
   <div class="alert alert-info">Each Slack workspace can only be connected to one Datadog organization.</div>

### Datadog Case Management

Datadog Case Management provides a centralized workspace for triaging, tracking, and remediating issues detected by Datadog and third-party integrations. Bits AI SRE automatically delivers its investigation findings to Jira and ServiceNow through Case Management. 

To set up Case Management, and the Jira and ServiceNow integrations:
1. Create a [Case Management project][5] for your team.
1. In Datadog, go to [**Case Management** > **Settings**][6]. In the list of projects, expand your project, go to **Integrations** > **Datadog Monitors**, and turn on the **Enable Datadog Monitors integration for this project** toggle. This generates your project's unique handle: `@case-{project_name}`.
1. On the same page, under **Integrations**, set up the Case Management Jira and/or ServiceNow integrations. When a new case is created, Case Management can automatically open the corresponding Jira ticket or ServiceNow incident.
1. In your monitor, go to **Configure notifications and automations** and add the `@case-{project_name}` handle. When the monitor triggers:
   - Datadog automatically creates a new case
   - The case creates a linked Jira ticket or ServiceNow incident
   - Bits writes its investigation findings directly to the case, which gets appended to Jira as a timeline comment or ServiceNow as a work note

### Datadog On-Call

Datadog On-Call is a paging solution that unifies monitoring, paging, and incident response in a single platform. 

To set up On-Call, in your monitor, go to **Configure notifications and automations** and add the `@oncall-{team}` handle. Bits' findings can then appear on the On-Call page in the Datadog mobile app, helping your teams triage issues on the go.

## Configure knowledge base integrations

Bits AI SRE integrates with Confluence to:
- Find relevant documentation and runbooks to support its monitor alert investigations
- Let you interact with your Confluence content directly through chat

To set up Bits AI SRE to use Confluence:

1. Connect your Confluence Cloud account by following the instructions in the [Confluence integration tile][7].
1. Optionally, enable account crawling to make Confluence a data source within Bits' chat interface. If you don't enable account crawling, Bits can still use Confluence to inform its investigation plan.
1. Add a link to a Confluence page in your monitor's message. Bits reads the page to extract Datadog telemetry links and other context when forming its investigation plan.
1. You can view all connected Confluence accounts on the [Bits Settings page][4].

### Best practices: Optimize Bits' understanding of your knowledge

Help Bits interpret and act on your documentation by following these best practices:
- Include relevant Datadog telemetry links in your Confluence pages. Bits queries these links to extract information for its investigation.
- Provide clear, step-by-step instructions for resolving monitor issues. Bits follows these instructions precisely, so being specific leads to more accurate outcomes.
- Document the services or systems involved in detail. Bits uses this information to understand the environment and guide investigations effectively.

<div class="alert alert-tip">The more precisely your Confluence page matches the issue at hand, the more helpful Bits can be.</div>

## Configure permissions

There are two RBAC permissions that apply to Bits AI SRE:

| Name                                                    | Description                            | Default role           |
|:--------------------------------------------------------|:---------------------------------------|:-----------------------|
| Bits Investigations Read (`bits_investigations_read`)   | Read Bits investigations.              | Datadog Read Only Role |
| Bits Investigations Write (`bits_investigations_write`) | Run and configure Bits investigations. | Datadog Standard Role  |

These permissions are added by default to Managed Roles. If your organization uses Custom Roles or has previously modified the default roles, an admin with the User Access Manage permission needs to manually add these permissions to the appropriate roles. For details, see [Access Control][8].

## Configure rate limits

Rate limits define the maximum number of automatic investigations Bits AI SRE can run in a rolling 24-hour period. After you reach a rate limit, you can continue to trigger [manual investigations][9].


### Types of rate limits

Per monitor limit
: Controls how often investigations are automatically triggered from a single monitor within a rolling 24-hour window.
: **Default:** Each monitor can trigger one automatic investigation per 24 hours.

Organization limit
: Defines the total number of automatic investigations Bits AI SRE can run across your entire organization within 24 hours.
: **Default:** No limit.

### Set a rate limit

To set a rate limit:
1. Navigate to [**Bits AI SRE** > **Settings** > **Rate Limits**][10].
2. Toggle on the rate limit you want to enable.
3. Set the maximum number of investigations you want to run within a rolling 24-hour window.
4. Click **Save**.

{{< img src="bits_ai/rate_limits.png" alt="Options to set a rate limit" style="width:60%;" >}}

## Audit Trail

You can monitor user-initiated actions with [Audit Trail][11]. Events are sent when:
- A user manually starts an investigation and when the investigation completes
- A tool call is executed in a manual investigation
- A user enables or disables automatic investigations for a monitor
- A user modifies the monitor rate limit



[1]: https://app.datadoghq.com/bits-ai/investigations
[2]: /monitors/notify
[3]: https://docs.datadoghq.com/integrations/slack/?tab=datadogforslack
[4]: https://app.datadoghq.com/bits-ai/settings/integrations
[5]: /service_management/case_management/projects
[6]: https://app.datadoghq.com/cases/settings
[7]: https://app.datadoghq.com/integrations/confluence
[8]: /account_management/rbac
[9]: /bits_ai/bits_ai_sre/investigate_issues#manually-start-an-investigation
[10]: https://app.datadoghq.com/bits-ai/settings/rate-limits
[11]: /account_management/audit_trail/events/#bits-ai-sre