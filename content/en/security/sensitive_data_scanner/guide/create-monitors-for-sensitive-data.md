---
title: Create Monitors to Alert on Sensitive Data
description: Best practices for creating monitors to alert on sensitive data matches detected by Sensitive Data Scanner across logs, APM traces, and RUM events.
further_reading:
  - link: /security/sensitive_data_scanner/
    tag: Documentation
    text: Set up Sensitive Data Scanner
  - link: /security/sensitive_data_scanner/scanning_rules/library_rules
    tag: Documentation
    text: Learn more about out-of-the-box library rules
  - link: /monitors/types/log/
    tag: Documentation
    text: Log monitors
  - link: /monitors/types/apm/
    tag: Documentation
    text: APM monitors
---
## Overview

After setting up Sensitive Data Scanner to detect and redact sensitive information in your telemetry data, you can create monitors to alert when sensitive data matches are detected. This helps you:

- Detect when sensitive data is being logged or transmitted unexpectedly
- Alert security and compliance teams to potential data exposure
- Track sensitive data volume trends over time
- Identify services or teams that need additional security guidance

When Sensitive Data Scanner detects a match, it automatically adds tags to the data that you can use to create targeted monitors. This guide shows you how to create monitors that alert on sensitive data detected across logs, APM traces, and RUM events.

## Prerequisites

Before creating monitors that alert on sensitive data, ensure you have:

- Sensitive Data Scanner configured with scanning groups and scanning rules. See [Set up Sensitive Data Scanner][1] for more information.
- The appropriate monitor creation permissions in your Datadog account.
- An understanding of which types of sensitive data are most critical for your organization to monitor.

## Create monitors by data type

Sensitive Data Scanner works across multiple Datadog products: Logs, APM, and RUM. The process for creating monitors differs slightly depending on which data type you're monitoring.

### Logs

To create a log monitor for sensitive data matches:

1. Navigate to [**Monitors > New Monitor > Logs**][2].
2. In the **Define the search query** section, add the `sensitive_data:*` tag to scope your monitor to all logs that contain sensitive data matches.
  - To scope to specific types of sensitive data, use domain-specific tags such as `sensitive_data_category:credit_card` for financial data or `sensitive_data_category:pii` for PII.
3. Configure the alert conditions based on your needs:
  - **Threshold**: Set a threshold for the number of matches over a time period (for example, alert when more than 10 sensitive data matches occur in 5 minutes).
  - **Group by**: Group by `service`, `env`, or `team` to identify which services are logging sensitive data.
4. Configure notifications to alert the appropriate security or compliance teams.
5. Add a descriptive monitor message that includes:
  - Which type of sensitive data was detected
  - Recommended remediation steps (for example, "Review application code to remove sensitive data from logs")
  - Links to relevant documentation or runbooks

#### Example: Monitor for credit card data in production logs

```
sensitive_data_category:credit_card env:prod
```

This query monitors all production logs for credit card matches. If you want to be more specific, you can use individual rule tags:

```
sensitive_data:visa_credit_card env:prod
```

#### Example: Monitor for multiple PII types

To reduce false positives, scope your query to multiple specific rule types within a domain:

```
(sensitive_data:us_social_security_number OR sensitive_data:us_passport) env:prod
```

### APM

To create an APM monitor for sensitive data in traces:

1. Navigate to [**Monitors > New Monitor > APM**][3].
2. Select **Trace Analytics** as the monitor type.
3. In the **Define the search query** section, add the `sensitive_data:*` tag to scope your monitor to traces containing sensitive data.
  - Use `sensitive_data_category:*` tags to scope to specific categories of sensitive data.
4. Configure the alert conditions:
  - **Threshold**: Set appropriate thresholds based on your expected trace volume.
  - **Group by**: Group by `service`, `resource`, or `env` to identify which services or endpoints are transmitting sensitive data.
5. Configure notifications and add a monitor message with remediation guidance.

#### Example: Monitor for API keys in APM spans

```
sensitive_data_category:credentials env:prod
```

To scope to specific credential types:

```
(sensitive_data:aws_access_key OR sensitive_data:api_key) service:checkout-service
```

### RUM

To create a RUM monitor for sensitive data in events:

1. Navigate to [**Monitors > New Monitor > RUM**][4].
2. In the **Define the search query** section, add the `sensitive_data:*` tag to scope your monitor to RUM events containing sensitive data.
3. Configure the alert conditions:
  - **Threshold**: Set appropriate thresholds for sensitive data matches in user sessions.
  - **Group by**: Group by `application.name`, `view.name`, or `geo.country` to identify where sensitive data is being captured.
4. Configure notifications and add a monitor message.

#### Example: Monitor for email addresses in RUM events

```
sensitive_data:email_address application.name:checkout-app
```

## Best practices

### Scope to domain-specific rule sets

To avoid alert fatigue from false positives, scope your monitors to specific domains relevant to your organization:

- **Financial services**: Use `sensitive_data_category:credit_card` to monitor payment card data.
- **PII**: Use `sensitive_data_category:pii` to monitor for personally identifiable data.
- **SaaS applications**: Use `sensitive_data_category:credentials` to monitor API keys and tokens.

### Combine with service tags

Combine sensitive data tags with service-specific tags to create targeted monitors:

```
sensitive_data_category:credit_card service:payment-service env:prod
```

This approach helps you:
- Reduce noise by focusing on high-risk services
- Route alerts to the appropriate teams
- Identify patterns in which services are logging sensitive data

### Set appropriate thresholds

Start with conservative thresholds and adjust based on your baseline:

1. Monitor sensitive data matches for 1-2 weeks without alerts to establish a baseline.
2. Set thresholds above your normal baseline to catch anomalies.
3. For critical data types (for example, credit cards, SSNs), consider setting thresholds lower or alerting on any match.

### Leverage case management

When a sensitive data monitor triggers, use [Case Management][5] to:
- Track the investigation process
- Document remediation steps taken
- Link related incidents or findings
- Collaborate with security and engineering teams

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/sensitive_data_scanner/setup/telemetry_data/
[2]: https://app.datadoghq.com/monitors/create/log
[3]: https://app.datadoghq.com/monitors/create/apm
[4]: https://app.datadoghq.com/monitors/create/rum
[5]: /service_management/case_management/
