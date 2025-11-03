---
title: Investigate Alerts
description: "Configure Bits AI SRE to automatically investigate monitor alerts and provide root cause analysis for faster incident resolution."
---

## Get started with alert investigations
You can investigate alerts with Bits AI SRE in two ways:
- **Manually**: Trigger an investigation on an individual monitor alert
- **Automatically**: Configure monitors so Bits run an investigation whenever they alert

### Manually start an investigation

You can manually invoke Bits on an individual monitor alert or warn event from several entry points:

#### Option 1: Bits AI SRE Monitors list
1. Go to [**Bits AI SRE** > **Monitors** > **Supported**][5].
1. Click the **Investigate Recent Alerts** dropdown and select an alert.

#### Option 2: Monitor Status page
1. For a monitor that is ready for Bits, navigate to its status page and click **Investigate with Bits AI SRE** in the top-right corner.
1. Alternatively, select an alert from the event timeline and click **Investigate with Bits AI SRE** on the right.

#### Option 3: Monitor Event side panel
From the monitor event side panel, click **Investigate with Bits AI SRE**.

#### Option 4: Slack
In Slack, reply to a monitor notification with `@Datadog Investigate this alert`.

### Enable automatic investigations

You can configure monitors so Bits runs automatically whenever they transition to the alert state:

#### Option 1: Bits AI SRE Monitors list
1. Go to [**Bits AI SRE** > **Monitors** > **Supported**][5].
1. Toggle **Enable** under **Automatic investigations** for a single monitor, or bulk-edit multiple monitors by selecting a set of monitors, followed by **Edit automatic investigations**.

#### Option 2: Configure for a single monitor
1. Open the monitor's status page and click **Edit**.
1. Scroll to **Configure notifications & automations** and toggle **Investigate with Bits AI SRE**.

**Note**: Enabling automatic investigations using the Datadog API or Terraform is not supported.

An investigation initiates when a monitor transitions to the alert state. Transitions to the warn or no data state, [renotifications][12], and test notifications do not trigger automatic investigations.

### Supported monitors
<div class="alert alert-info">Prior to general availability, monitor requirements may change.</div>

Bits is able to run investigations on the following monitor types:
  - Metric
  - Anomaly
  - Forecast
  - Integration
  - Outlier
  - Logs
  - APM (`APM Metrics` type only)

#### Best practices: Add investigation context to your monitors
Think of onboarding Bits as you would a new teammate: the more context you provide, the better it can investigate.

1. **Include telemetry links:** Add at least one helpful telemetry link in the monitor message. This link could be a Datadog dashboard, logs query, trace query, a Datadog notebook with helpful widgets, or a [Confluence runbook page](#configure-knowledge-base-integrations) containing these links. Think about the first place you'd normally look in Datadog when this monitor triggers.
Bits uses these links during the “Executing Runbook” step of the initial investigation to identify potential problem areas. Because these links are user-defined, you have control over what Bits reviews; ensuring it focuses on the same data you would, and giving you the flexibility to tailor investigations to your team’s workflows.

2. **Add service scoping:** For monitors associated with a service, add a service tag to the monitor, or filter or group the monitor query by service.

   {{< img src="bits_ai/optimization_example.png" alt="Example monitor with optimization steps applied" style="width:100%;" >}}

For additional suggestions on how to optimize investigations, see the section on [Memories](#help-bits-ai-sre-learn).

### Configure where investigation findings are sent

By default, Bits' investigation findings appear in two places:
  - **Full investigation findings** are available on the [Bits AI Investigations][2] page.
  - **A summary of the findings** is available on the status page for the monitor.

Additionally, if you have already configured `@slack`, `@case`, or `@oncall` [notifications in your monitor][8], Bits automatically writes to those places. If not, you can add them as destinations for investigation findings to appear:

#### Slack
1. Ensure the [Datadog Slack app][7] is installed in your Slack workspace.
1. In your monitor, go to **Configure notifications and automations** and add the `@slack-{channel-name}` handle. This sends monitor notifications to your chosen Slack channel.
1. Lastly, go to [**Bits AI SRE** > **Settings** > **Integrations**][9] and connect your Slack workspace. This allows Bits to write its findings directly under the monitor notification in Slack. **Note:** Each Slack workspace can only be connected to one Datadog organization.

#### Case Management
In the **Configure notifications and automations** section, add the `@case-{project-name}` handle. Case Management also supports optional two-way syncing with [ticketing platforms like Jira and ServiceNow][14].

#### On-Call
In the **Configure notifications and automations** section, add the @oncall-{team} handle. Bits' findings appear on the On-Call page in the Datadog mobile app, helping your teams triage issues on the go.

### Configure knowledge base integrations

Bits integrates with Confluence to find relevant documentation and runbooks to support its investigations, and also allows you to interact with your Confluence content directly through chat.
1. Connect your Confluence Cloud account by following the instructions in the [Confluence integration tile][13].
1. Optionally, enable account crawling to make Confluence a data source within Bits' chat interface. This is not required for Bits to use Confluence when generating its investigation plan.
1. You can view all connected Confluence accounts on the [Bits Settings page][9].

#### Best practices: Optimize Bits' understanding of your knowledge

Help Bits interpret and act on your documentation by following these best practices:
- Include relevant Datadog telemetry links in your Confluence pages. Bits queries these links to extract information for its investigation.
- Provide clear, step-by-step instructions for resolving monitor issues. Bits follows these instructions precisely, so being specific leads to more accurate outcomes.
- Document the services or systems involved in detail. Bits uses this information to understand the environment and guide investigations effectively.

**Tip**: The more precisely your Confluence page matches the issue at hand, the more helpful Bits can be.

### Configure permissions

There are two RBAC permissions that apply to Bits AI SRE:

| Name | Description | Default Role |
| :---- | :---- | :---- |
| Bits Investigations Read (`bits_investigations_read`) | Read Bits investigations. | Datadog Read Only Role |
| Bits Investigations Write (`bits_investigations_write`) | Run and configure Bits investigations. | Datadog Standard Role |

These permissions are added by default to Managed Roles. If your organization uses Custom Roles or have previously modified the default roles, an admin with the User Access Manage permission will need to manually add the permission to the appropriate roles. For details, see [Access Control][11].

### Configure rate limits

Rate limits define the maximum number of automatic investigations Bits AI SRE can run in a rolling 24-hour period.

[Manual investigations](#manually-start-an-investigation) can still be triggered even after rate limits.

#### Types of rate limits

##### Per monitor limit

Controls how often an investigation is triggered from a single monitor alert within a rolling 24 hour window.

**Default:** Each monitor can trigger one automatic investigation per 24 hours.

##### Organization limit

The Organization limit defines the total number of investigations Bits AI SRE can run across your entire organization within 24 hours.

**Default:** No limit.

#### Set a rate limit

To set a rate limit:
1. Navigate to **Bits AI SRE** > **Settings** > [**Rate Limits**](https://app.datadoghq.com/bits-ai/settings/rate-limits).
2. Toggle on the rate limit you want to enable.
3. Set the maximum number of investigations that can run within a rolling 24-hour window.
4. Click **Save**.

{{< img src="bits_ai/rate_limits.png" alt="Options to set a rate limit" style="width:60%;" >}}

### Audit Trail
You can monitor user-initiated actions with [Audit Trail][16]. Events are sent when:
- A user manually starts an investigation and when the investigation completes
- A tool call is executed in a manual investigation
- A user enables or disables automatic investigations for a monitor
- A user modifies the monitor rate limit  

## How Bits AI SRE investigates

Investigations happen in two phases:

1. **Initial context gathering**
   - Bits begins by identifying any Datadog or Confluence links that you have added to the monitor's message and uses them as entry points into the investigation.
   - It also automatically queries your Datadog environment to gather additional context about what's happening around the alert.
   - If you have previously interacted with an investigation for the same monitor, Bits will recall any [memories](#help-bits-ai-sre-learn) associated with the monitor to inform and accelerate the current investigation.
1. **Root cause hypothesis generation and testing**
   - Using the gathered context, Bits performs a more thorough investigation by building multiple root cause hypotheses and testing them in parallel. Today, Bits is able to query:
      - Metrics
      - Traces
      - Logs
      - Dashboards
      - [Change events][4]
      - Watchdog alerts
   - Hypotheses can end in one of three states: validated, invalidated, or inconclusive.

## Chat with Bits AI SRE about the investigation

On the [Bits AI Investigations][2] page, you can chat with Bits to gather additional information about the investigation or the services involved. Click the **Suggested replies** bubble for examples.

| Functionality                                  | Example prompts                                                                    | Data source                          |
|------------------------------------------------|------------------------------------------------------------------------------------|--------------------------------------|
| Understand the status of its investigation     | `What's the latest status of the investigation?`                                   | Investigation findings               |
| Ask for elaborations of its findings           | `Tell me more about the {issue}.`                                                  | Investigation findings               |
| Look up information about a service            | `Are there any ongoing incidents for {example-service}?`                              | Software Catalog service definitions |
| Find recent changes for a service              | `Were there any recent changes on {example-service}?`                              | Change Tracking events               |
| Find a dashboard                               | `Give me the {example-service} dashboard.`                                         | Dashboards                           |
| Query APM request, error, and duration metrics | `What's the current error rate for {example-service}?`                             | APM metrics                          |

## Help Bits AI SRE learn

Reviewing Bits' findings not only validates their accuracy, but also helps Bits learn from any mistakes it makes, enabling it to produce faster and more accurate investigations in the future.

### During the investigation
You can guide Bits' learning by:
- **Improving a step**: Share a link to a better query Bits should have made.
- **Remembering a step**: Tell Bits to remember any helpful queries it generated. This instructs Bits to prioritize running these queries the next time the same monitor fires.
### After the investigation
At the end of an investigation, let Bits know if the conclusion it made was correct or not. If it was inaccurate, provide Bits with the correct root cause so that it can learn from the discrepancy.

{{< img src="bits_ai/help_bits_ai_learn.png" alt="An investigation conclusion with buttons to rate the conclusion helpful or unhelpful highlighted" style="width:100%;" >}}

### Manage memories
Every piece of feedback you give generates a **memory**. Bits uses these memories to enhance future investigations by recalling relevant patterns, queries, and corrections. You can navigate to the [Monitor Management][3] page to view and delete memories in the **Memories** column.

[2]: https://app.datadoghq.com/bits-ai/investigations
[3]: https://app.datadoghq.com/bits-ai/monitors/enabled
[4]: /change_tracking
[5]: https://app.datadoghq.com/bits-ai/monitors/all
[6]: https://app.datadoghq.com/monitors/manage
[7]: https://docs.datadoghq.com/integrations/slack/?tab=datadogforslack
[8]: /monitors/notify
[9]: https://app.datadoghq.com/bits-ai/settings/integrations
[10]: /service_management/on-call/pages/#page-from-notifications
[11]: /account_management/rbac
[12]: /monitors/notify/#renotify
[13]: https://app.datadoghq.com/integrations/confluence
[14]: /service_management/case_management/notifications_integrations/#third-party-tickets
[15]: /account_management/rbac/permissions/#bits-ai
[16]: /account_management/audit_trail/events/#bits-ai-sre


