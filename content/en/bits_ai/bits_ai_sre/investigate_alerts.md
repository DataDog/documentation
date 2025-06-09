---
title: Investigate Alerts
---

## Get started with alert investigations

### Enable Bits on monitors for automated investigations

There are two main ways to enable Bits for automated investigations: 
- **Option 1: Use the Bits-Enabled Monitors list**
  1. In Bits AI, go to the [**Bits-Enabled Monitors**][5] page. 
  1. In the **Monitors** tab, select one or more monitors, then click **Enable Bits AI**.
- **Option 2: Add the Bits AI tag to a monitor**
  1. In the [Monitor List][6], select one or more monitors to edit.
     - To edit one monitor, click the monitor to open it, then click **Edit**.
     - To edit multiple monitors, select them, then click **Edit tags**.
  1. Add the `bitsai:enabled` tag to your selected monitors.

You can also add the tag to your desired monitors using the Datadog API or Terraform. 

<div class="alert alert-info">Bits only supports metric, logs, APM, anomaly, forecast, integration, and outlier monitors for investigations.</div>

### Configure where investigation results are sent

Bits can send investigation results to several destinations. By default, results appear in two places:
  - **Full investigation results** are available on the [Bits AI Investigations][2] page.
  - **A summary of the results** is available on the status page for the monitor.

Additionally, if you have already configured `@slack`, `@oncall`, or `@case` [notifications in your monitor][8], Bits automatically writes to those places. If not, you can add them as destinations for investigation results to appear:

{{% collapse-content title="Slack" level="h5" expanded=false id="slack" %}}
1. Ensure the [Datadog Slack app][7] is installed in your workspace.
1. Go to [**Bits AI** > **Settings** > **Integrations**][9] and connect your Slack workspace.
1. Go to a monitor. Under **Configure notifications and automations**, add the `@slack-{channel-name}` handle to send results to Slack.
{{% /collapse-content %}}
{{% collapse-content title="On-Call" level="h5" expanded=false id="on-call" %}}
In the **Configure notifications and automations** section, add the @oncall-{team} handle.
{{% /collapse-content %}}
{{% collapse-content title="Case Management" level="h5" expanded=false id="case-management" %}}
In the **Configure notifications and automations** section, add the `@case-{project-name}` handle.
{{% /collapse-content %}}

### Manually start an investigation

Alternatively, you can manually invoke Bits on an individual monitor event. 

<!-- TKTK CAN'T SEE BUTTON YET -->
- **Option 1: Monitor Status Page**
  -  On the monitor status page for an alert event, click **Investigate with Bits AI**.
- **Option 2: Slack**
  - Under a monitor notification in Slack, type, `@Datadog Investigate this alert`.

For best results, see [Optimize monitors for Bits AI SRE](#optimize-monitors-for-bits-ai-sre).

### Optimize monitors for Bits AI SRE

To help Bits produce the most accurate and helpful investigation results, follow these guidelines:

- Scope the monitor to a service by either filtering the query to a specific service or grouping it by service, where appropriate. 
- Tag the monitor with a service, where appropriate. 
- Add relevant troubleshooting steps to the monitor message to give Bits a starting point. Think of the first page you'd visit in Datadog if this monitor were to fire. Consider including:
  - Plain-language instructions 
  - At least one helpful link to:
    - A Datadog dashboard
    - A logs query 
    - A trace query
    - A Datadog notebook with key graphs or instructions 

{{< img src="bits_ai/optimization_example.png" alt="Example monitor with optimization steps applied" style="width:100%;" >}}

<!-- ### Restrict access to Bits investigations

To access investigations, users need the `bits_investigations_read` permission. This permission is included in the Datadog Read Only Role by default. If your organization uses custom roles, add this permission to the appropriate role. For more information on managing permissions, see [Access Control][11].

**Note**: Your organization's third-party AI enablement status is always respected, even when users have this permission.  -->

## How Bits AI SRE investigates

Investigations happen in two phases:

1. **Initial context gathering**
   1. Bits begins by looking at any troubleshooting steps, Confluence pages, or Datadog links that you've added to the monitor's message, and uses them to make relevant queries.
   1. It also automatically scans your Datadog environment for additional context.
   1. Thirdly, if you've interacted with a previous investigation for the same monitor, Bits will recall any [memories](#help-bits-ai-sre-learn) associated with the monitor. 
1. **Root cause hypothesis generation and testing**
   - Using the gathered context, Bits performs a more thorough investigation by building multiple root cause hypotheses and testing them in parallel. Today, Bits is able to query:
      - Metrics
      - Traces
      - Logs
      - Dashboards
      - [Change events][4]
      - Watchdog insights
      - Monitor alerts
      - Incidents
   - Hypotheses can end in one of three states: validated, invalidated, or inconclusive. 

For best results, see [Optimize monitors for Bits AI SRE](#optimize-monitors-for-bits-ai-sre).

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
| Search for information in Confluence           | `Find me the runbook in Confluence to rollback deployments for {example-service}.` | Confluence                           |

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
Every piece of feedback you give generates a **memory**. Bits uses these memories to enhance future investigations by recalling relevant patterns, queries, and corrections. You can navigate to [Bits-Enabled Monitors][3] to view and delete memories in the **Memories** column.

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