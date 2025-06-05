---
title: Get started with Bits AI SRE
---

## Overview

Bits AI SRE is an autonomous AI agent that investigates alerts and coordinates incident response. When a monitor triggers, Bits proactively generates multiple hypotheses, queries relevant telemetry, and reasons over the data to help on-call engineers quickly identify the root cause. If the alert escalates to an incident, Bits supports the response by managing stakeholder communications, surfacing relevant knowledge base content, highlighting related incidents, and accelerating the postmortem and incident follow-up process. By reducing manual effort, Bits ensures smoother and more efficient on-call operations.

## Get started with alert investigations

Bits helps automate alert investigations so you can triage issues faster and reduce manual troubleshooting. Here's how to get started:

### Enable Bits on monitors for automated investigations

There are two main ways to enable Bits for automated investigations: 
- **Option 1: Use the Bits-Optimized Monitors list**
  - In Bits AI, go to the [**Monitor Management**][1] page. In the **Monitors** list, select one or more monitors, then click **Enable Bits AI**.
- **Option 2: Add the Bits AI tag to a monitor**
  1. In the [Monitor List][2], select one or more monitors to edit.
     - To edit one monitor, click the monitor to open it, then click **Edit**.
     - To edit multiple monitors, select them, then click **Edit tags**.
  1. Add the `bitsai:enabled` tag to your selected monitors.

You can also add the tag to your desired monitors using the Datadog API or Terraform. 

<div class="alert alert-info">Bits only supports metric (including anomaly, outlier, and integration), APM, and log monitors.</div>

### Configure where investigation results are sent

Bits can send investigation results to several destinations. By default, results appear in two places:
  - **Full investigation results** are available on the [Bits AI Investigations][3] page.
  - **A summary of the results** is available on the status page for the monitor.

In your [monitor notification settings][8], if you already have `@slack`, `@oncall`, or `@case` configured, Bits automatically writes to those places. If not, you can add them as destinations for investigation results to appear:

{{% collapse-content title="Slack" level="h5" expanded=false id="slack" %}}
1. Ensure the [Datadog Slack app][4] is installed in your workspace.
1. Go to [**Bits AI** > **Settings** > **Integrations**][5] and connect your Slack workspace.
1. Go to a monitor. Under **Configure notifications and automations**, add the `@slack-{channel-name}` handle to send results to Slack.
{{% /collapse-content %}}
{{% collapse-content title="On-Call" level="h5" expanded=false id="on-call" %}}
If you have [Page notifications][6] configured in Datadog On-Call, you can see a summary of Bits' results on the On-Call page.
{{% /collapse-content %}}
{{% collapse-content title="Case Management" level="h5" expanded=false id="case-management" %}}
Add the `@case-{project-name}` handle in the **Configure notifications and automations** section. 
{{% /collapse-content %}}

### Manually start an investigation

Alternatively, you can manually invoke Bits on an individual monitor event. 

<!-- TKTK CAN'T SEE BUTTON YET -->
- **Option 1: Monitor Status Page**
  -  In the [Monitor List][2], on a monitor status page, on an alert event, click the **Investigate with Bits AI** button.
- **Option 2: Slack**
  - Under a monitor notification in Slack, type, `@Datadog Investigate this alert`.

For best results, see [Optimize monitors for Bits AI SRE](#optimize-monitors-for-bits-ai-sre) below.

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
    - A Confluence page

### Restrict access to Bits investigations

To access investigations, users need the `bits_investigations_read` permission. This permission is included in the Datadog Read Only Role by default. If your organization uses custom roles, add this permission to the appropriate role. For more information on managing permissions, see [Access Control][7].

**Note**: Your organization's third-party AI enablement status is always respected, even when users have this permission. 

[1]: https://app.datadoghq.com/bits-ai/monitors/all
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/bits-ai/investigations
[4]: https://docs.datadoghq.com/integrations/slack/?tab=datadogforslack
[5]: https://app.datadoghq.com/bits-ai/settings/integrations
[6]: /service_management/on-call/pages/#page-from-notifications
[7]: /account_management/rbac
[8]: /monitors/notify