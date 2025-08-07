---
title: Investigate Alerts
---

## Get started with alert investigations
You can configure Bits to automatically investigate when a monitor triggers an alert, or you can manually start an investigation as needed.

### Enable Bits on monitors for automated investigations

There are a few ways to enable Bits for automated investigations:
- **Option 1: Use the Bits AI SRE Monitors list**
  1. In Bits AI SRE, go to the [**Monitors**][5] page.
  1. In the **Ready for Bits** tab, select one or more monitors, then click **Enable Automatic Investigations**.
- **Option 2: Add the Bits AI tag to a single monitor**
  1. Open a monitor, click on the gear icon in the upper right corner, and select **Edit**.
  1. Add the `bitsai:enabled` tag.
  1. Save your changes.
- **Option 3: Add the Bits AI tag in bulk**
  1. In the **Monitor List**, select multiple monitors, then click **Edit tags**.
  1. Add the `bitsai:enabled` tag to the selected monitors.

You can also add the tag to your desired monitors using the Datadog API or Terraform.

An investigation initiates when a monitor transitions to the alert state. Transitions to the warn or no data state, [renotifications][12], and test notifications do not trigger automatic investigations. Additionally, noisy monitors are automatically rate-limited to avoid unnecessary investigations and protect your budget.

### Manually start an investigation

Alternatively, you can manually invoke Bits on an individual monitor alert or warn event.

- **Option 1: Monitor Status Page**
  -  On the monitor status page, select an alert event, then click **Investigate with Bits AI**.
- **Option 2: Monitor Event Side Panel**
  -  On the monitor event side panel, click **Investigate with Bits AI**.
- **Option 3: Slack**
  - In Slack, reply to a monitor notification with `@Datadog Investigate this alert`. 

### Monitor requirements for Bits AI SRE

Bits is able to run investigations on monitors that fulfill all three of the following requirements:
1. **Monitor Type**: The monitor must be a metric, logs, APM (`query_alert` type only), anomaly, forecast, integration, or outlier monitor.

2. **Service scope**: The monitor must have one of the following:
   - A monitor query filtered by a service
   - A monitor query grouped by a service
   - A service tag on the monitor

3. **Telemetry links**: For metric, anomaly, forecast, integration, and outlier monitors, the monitor message must include at least one helpful link:
   - A Datadog dashboard
   - A logs query
   - A trace query
   - A Datadog notebook with helpful widgets
   - A [Confluence page](#configure-knowledge-base-integrations)

Think of the first page you'd navigate to in Datadog if this monitor were to fire. These links provide Bits with valuable context to kickstart its investigation. Links are not required for APM and log monitors.

{{< img src="bits_ai/optimization_example.png" alt="Example monitor with optimization steps applied" style="width:100%;" >}}

### Configure where investigation results are sent

Bits can send investigation results to several destinations. By default, results appear in two places:
  - **Full investigation results** are available on the [Bits AI Investigations][2] page.
  - **A summary of the results** is available on the status page for the monitor.

Additionally, if you have already configured `@slack` or `@case` [notifications in your monitor][8], Bits automatically writes to those places. If not, you can add them as destinations for investigation results to appear:

{{% collapse-content title="Slack" level="h5" expanded=false id="slack" %}}
1. Ensure the [Datadog Slack app][7] is installed in your workspace.
1. Go to [**Bits AI** > **Settings** > **Integrations**][9] and connect your Slack workspace. 
1. Go to a monitor. Under **Configure notifications and automations**, add the `@slack-{channel-name}` handle to send results to Slack.
{{% /collapse-content %}}
{{% collapse-content title="Case Management" level="h5" expanded=false id="case-management" %}}
In the **Configure notifications and automations** section, add the `@case-{project-name}` handle.
{{% /collapse-content %}}

### Configure knowledge base integrations

Bits integrates with Confluence to find relevant documentation and runbooks to support its investigations, and also allows you to interact with your Confluence content directly through chat. 
1. Connect your Confluence Cloud account by following the instructions in the [Confluence integration tile][13].
1. Optionally, enable account crawling to make Confluence a data source within Bits' chat interface. This is not required for Bits to use Confluence when generating its investigation plan.
1. You can view all connected Confluence accounts on the [Bits Settings page][9].

#### Optimize Bits' understanding of your knowledge

Help Bits interpret and act on your documentation by following these best practices:
- Include relevant Datadog telemetry links in your Confluence pages. Bits queries these links to extract information for its investigation.
- Provide clear, step-by-step instructions for resolving monitor issues. Bits follows these instructions precisely, so being specific leads to more accurate outcomes.
- Document the services or systems involved in detail. Bits uses this information to understand the environment and guide investigations effectively.

**Tip**: The more precisely your Confluence page matches the issue at hand, the more helpful Bits can be.

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
[12]: /monitors/notify/#renotify
[13]: https://app.datadoghq.com/integrations/confluence
