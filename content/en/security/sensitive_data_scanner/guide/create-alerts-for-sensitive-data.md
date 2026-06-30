---
title: Create Alerts for Sensitive Data
description: Create alerts for Sensitive Data Scanner findings with Security Notification Rules for logs, and create monitors for sensitive data matches in APM traces and RUM events.
aliases:
  - /security/sensitive_data_scanner/guide/create-monitors-for-sensitive-data/
further_reading:
  - link: /security/sensitive_data_scanner/
    tag: Documentation
    text: Set up Sensitive Data Scanner
  - link: /security/notifications/rules/
    tag: Documentation
    text: Learn more about security notification rules
  - link: /security/sensitive_data_scanner/scanning_rules/library_rules
    tag: Documentation
    text: Learn more about out-of-the-box library rules
  - link: /monitors/types/apm/
    tag: Documentation
    text: Learn to set up APM monitors
  - link: /monitors/types/real_user_monitoring/
    tag: Documentation
    text: Learn to set up RUM monitors
---
## Overview

After setting up Sensitive Data Scanner to detect and redact sensitive information in your telemetry data, you can create alerts when sensitive data is detected. This helps you:

- Detect when sensitive data is being logged or transmitted unexpectedly
- Alert security and compliance teams to potential data exposure
- Track sensitive data volume trends over time
- Identify services or teams that need additional security guidance

Use the alerting flow that matches the data type:

- **Logs**: Use [Security Notification Rules][8] for pattern-based Sensitive Data Scanner findings.
- **APM and RUM**: Use telemetry monitors based on tags that Sensitive Data Scanner adds when it detects matches.

## Prerequisites

Before creating alerts for sensitive data, ensure you have:

- Sensitive Data Scanner configured with scanning groups and scanning rules. See [Set up Sensitive Data Scanner][1] for more information.
- The appropriate permissions in your Datadog account:
    - For log finding alerts, Security Notification Rules Read and Write permissions. To view Sensitive Data Scanner findings, you also need the Data Scanner Read permission.
    - For APM and RUM monitors, [monitor creation permissions][6].
- An understanding of which types of sensitive data are most critical for your organization to monitor.

## Create alerts by data type

Sensitive Data Scanner works across multiple Datadog products. The alerting flow differs depending on which data type you're monitoring.

### Logs

To create a notification rule for log findings:

1. Navigate to the [Sensitive Data Scanner Findings page][9].
2. In the Logs Findings explorer, filter findings to the scope you want to alert on. For example, filter by severity, `service`, `env`, `team`, or scanning rule.
3. Click {{< ui >}}Notify{{< /ui >}} from the explorer or from an open finding.
4. In the new notification rule, keep {{< ui >}}Finding{{< /ui >}} as the source type and scope the rule to Sensitive Data Scanner findings.
5. Review or adjust the prefilled filters. The {{< ui >}}Preview of Matching Results{{< /ui >}} panel shows which findings match the rule.
6. Choose whether to aggregate matching findings over a time frame or trigger immediately for each individual finding.
7. Under {{< ui >}}Destination{{< /ui >}}, add notification recipients, such as teams, users, cases, Jira, PagerDuty, Slack, Microsoft Teams, webhooks, or other integrations.
8. Click {{< ui >}}Save{{< /ui >}}.

Sensitive Data Scanner finding notifications include finding context, such as the rule, severity, service, environment, team, and a link to the finding. Notifications do not include log samples.

### APM

To create an APM monitor for sensitive data in traces:

1. Navigate to {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > [APM][3].
2. Select {{< ui >}}Trace Analytics{{< /ui >}} as the monitor type.
3. In the {{< ui >}}Define the search query{{< /ui >}} section, add the `sensitive_data:*` tag to scope your monitor to traces containing sensitive data.
    - Use `sensitive_data_category:*` tags to scope to specific categories of sensitive data.
4. Configure the alert conditions:
    - **Threshold**: Set appropriate thresholds based on your expected trace volume.
    - **Group by**: Group by `service`, `resource`, or `env` to identify which services or endpoints are transmitting sensitive data.
5. Configure [notifications][7] and add a monitor message with remediation guidance.

#### Monitor for API keys in APM spans

Use this query to monitor for credentials detected in APM spans: `sensitive_data_category:credentials env:prod`.

If you want to scope to specific credential types, such as API keys or AWS access keys, use this query: `(sensitive_data:aws_access_key OR sensitive_data:api_key) service:checkout-service`

### RUM

To create a RUM monitor for sensitive data in events:

1. Navigate to {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > [RUM][4].
2. In the {{< ui >}}Define the search query{{< /ui >}} section, add the `sensitive_data:*` tag to scope your monitor to RUM events containing sensitive data.
3. Configure the alert conditions:
    - **Threshold**: Set appropriate thresholds for sensitive data matches in user sessions.
    - **Group by**: Group by `application.name`, `view.name`, or `geo.country` to identify where sensitive data is being captured.
4. Configure [notifications][7] and add a monitor message.

#### Monitor for email addresses in RUM events

Use this query to monitor for email addresses detected in RUM events: `sensitive_data:email_address application.name:checkout-app`

## Best practices

### Scope alerts to high-value findings

To avoid alert fatigue from false positives, start with findings that represent the highest risk for your organization. For example:

- **Financial services**: Alert on payment card findings.
- **PII**: Alert on personally identifiable information findings.
- **SaaS applications**: Alert on credentials, API keys, and tokens.

For log finding alerts, use notification rule filters such as severity, `service`, `env`, `team`, or scanning rule. For APM and RUM monitors, use domain-specific tags such as `sensitive_data_category:payment_card`, `sensitive_data_category:pii`, or `sensitive_data_category:credentials`.

### Combine with service and team context

Combine sensitive data conditions with ownership or runtime context. For example, scope alerts to production services or teams responsible for customer-facing applications.

This approach helps you:

- Reduce noise by focusing on high-risk services
- Route alerts to the appropriate teams
- Identify patterns in which services are leaking or transmitting sensitive data

### Set appropriate thresholds for monitors

For APM and RUM monitors, start with conservative thresholds and adjust based on your baseline:

1. Monitor sensitive data matches for 1-2 weeks without alerts to establish a baseline.
2. Set thresholds above your normal baseline to catch anomalies.
3. For critical data types (for example, payment cards and SSNs), consider setting thresholds lower or alerting on any match.

### Use Case Management to track investigations

When a sensitive data alert triggers, use [Case Management][5] to:
- Track the investigation process
- Document remediation steps taken
- Link related incidents or findings
- Collaborate with security and engineering teams

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/sensitive_data_scanner/setup/telemetry_data/
[3]: https://app.datadoghq.com/monitors/create/apm
[4]: https://app.datadoghq.com/monitors/create/rum
[5]: /service_management/case_management/
[6]: /account_management/rbac/permissions/#monitors
[7]: /monitors/notify/
[8]: /security/notifications/rules/
[9]: https://app.datadoghq.com/sensitive-data-scanner/telemetry
