---
title: Best Practices for Monitoring Authentication Logs
kind: guide
further_reading:
- link: "https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/"
  tag: "Blog"
  text: "Learn more about monitoring authentication logs"
---

## Overview

Being able to log, monitor, and analyze all authentication events is key for identifying security threats and managing customer records for compliance purposes. Authentication logs from different sources and parts of your environment might have different formats and be managed by different teams or implemented using multiple third-party services.

This guide walks you through best practices and tips for [managing and formatting authentication logs](#manage-and-format-authentication-logs) so you can use authentication log data to [monitor and detect security threats](#monitor-and-detect-security-threats) with [Datadog Security and Compliance Monitoring][1].

## Manage and format authentication logs

To extract the most information from your authentication events:

- [Log everything](#log-everything) from all authentication flows
- Write logs that include [all the information](#include-enough-information) you need
- Make sure your logs use a [standardized, easily parsable format](#log-in-a-standard-parsable-format)

### Log everything

In order to gain visibility into all of your authentication activity, ensure log events for all login flows are at the application level. This eliminates gaps in your monitoring coverage. It also gives you more control over how you log authentication events and what data you are collecting.

### Include enough information

By logging [all authentication events](#log-everything) at the application level, you can ensure that your logs contain the most useful data for [monitoring and detecting security threats](#monitor-and-detect-security-threats).

{{< code-block lang="bash" >}}
2020-01-01 12:00:01 google oauth login success by John Doe from 1.2.3.4
{{< /code-block >}}

Logs that contain the "who" (John Doe), "what" (login success), and when (2020-01-01 12:00:01) of an event provide the best detail for you to perform complex analysis in Datadog.

### Log in a standard, parsable format

Ensure your application writes logs in a key-value format using `=` as a separator. Using this format means that a key-value parser, such as Datadog's [Grok Parser][2], can easily process them. For example, if a log is in the following format:

{{< code-block lang="bash" >}}
INFO 2020-01-01 12:00:01 usr.id="John Doe" evt.category=authentication evt.name="google oauth" evt.outcome=success network.client.ip=1.2.3.4
{{< /code-block >}}

Datadog can then parse this as the following JSON:

{{< code-block lang="json" >}}
{
  "usr": {
    "id": "John Doe"
  },
  "evt": {
    "category": "authentication",
    "name": "google oauth",
    "outcome": "success",
  },
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  }
}
{{< /code-block >}}

It's important to use a [standard naming convention][3] for the attributes in your logs to ensure that you can search and aggregate data across all attributes, regardless of where they come from. It is recommended that your authentication logs include the following [standard attributes][4]:

- [`usr.id`][5]
- [`evt.category`][6]
- [`evt.name`][6]
- [`evt.outcome`][6]
- [`network.client.ip`][7]

Use the same format across all of your authentication logs so you can properly use log attributes to filter and organize log data in Datadog. For example, with standard attributes you can look for which users (`usr.id`) have the highest number of failed logins (`evt.outcome:failure`).

A key-value format also makes it easy to add custom attributes to logs. For example, adding a [reCAPTCHA v3][8] score to identify possible bot activity. Use quotes to wrap any attribute values that may contain spaces. This ensures that you capture the full value in a way that is easily parsable.

## Monitor and detect security threats

To properly monitor and detect security threats, there are key patterns you should take note of. For example, if you see a significant number of failed login attempts from a single user within a short period of time, it could indicate a [**brute force attack**][9]. If those failed login attempts are followed by a successful one, it could be a successful account takeover that you should investigate immediately.

Another common authentication attack technique is [**credential stuffing**][10]. Credential stuffing is when an attacker mixes and matches breached login credentials to try to match a real user account. In order to detect this type of attack, look for logins using multiple `usr.id` values all coming from the same `network.client.ip`.

{{< img src="credential-stuffing-attack-signal.png" alt="A credential stuffing attack signal in the Security Signals Explorer">}}

Datadog offers pre-configured [Detection Rules][11] which scan your ingested logs in real time for common attacker techniques like these two. If any log triggers one of these rules, it automatically generates a [Security Signal][12] which includes key data about the event, such as the type of attack detected and suggestions on how to respond and remedy the situation. You can view, filter, and sort all of your Security Signals in the explorer to triage them and see where to best focus your efforts.

For signals triggered from the `Credential Stuffing Attack` Detection Rule, there is an [out-of-the-box runbook][13] available to help with response and remediation. This runbook guides you through investigating a potential credential stuffing attack, and includes graphs of related logs. To use this runbook, save a copy and set the the time frame, document your investigation in markdown, and share it with teammates [for commenting][14].

### Use dashboards to investigate

Datadog provides out-of-the-box dashboards, such as the [IP investigation dashboard][15] and [User investigation dashboard][16]. These correlate key data from your authentication logs with relevant data from the rest of your environment to assist in your investigations.

The IP dashboard gives you detailed information like the amount of security signals related to an IP address over time, security signals by status (info, low, medium, high, or critical), and security signals that are correlated with a specific rule. This information is helpful when investigating a potential security attack or breach.

For example, if a specific IP address is setting off multiple security signals, click on the IP address in the dashboard and select **View related Security Signals**. This populates all triggered security signals for that IP address in the Security Signals Explorer. Click on any rule and review the triage and response information in the **Message** to properly assess and remedy the situation.

{{< img src="investigation-dashboard-example.gif" alt="Analyze triggered security signals in the IP investigation dashboard">}}

You can also create custom dashboards to visualize key authentication data like counts of logins by source and outcome. This provides you with a high-level view of activity across your entire user base and helps you see trends to identify suspicious spikes that you should investigate.

### Use Log Rehydration&trade; for future investigations

Datadog ingests and analyzes [all of your logs][17], ensuring that you can detect threats across your entire environment. You can archive any logs that you [don't want to index][18], and then quickly [rehydrate them][19] in the future for investigations, audits, and compliance purposes.

[1]: /security_monitoring/
[2]: logs/processing/parsing/?tab=matcher#key-value-or-logfmt
[3]: https://www.datadoghq.com/blog/logs-standard-attributes/
[4]: /logs/processing/attributes_naming_convention/
[5]: /logs/processing/attributes_naming_convention/#user-related-attributes
[6]: https://docs.datadoghq.com/logs/processing/attributes_naming_convention/#events
[7]: /logs/processing/attributes_naming_convention/#network
[8]: https://developers.google.com/recaptcha/docs/v3
[9]: https://app.datadoghq.com/security/configuration/rules?query=brute%20force%20attack&sort=rule
[10]: https://app.datadoghq.com/security/configuration/rules?query=credential%20stuffing%20attack&sort=rule
[11]: /security_monitoring/default_rules/
[12]: /security_monitoring/explorer
[13]: https://app.datadoghq.com/notebook/credentialstuffingrunbook
[14]: /notebooks/#commenting
[15]: https://app.datadoghq.com/screen/integration/security-monitoring-ip-investigation
[16]: https://app.datadoghq.com/screen/integration/security-monitoring-user-investigation
[17]: https://www.datadoghq.com/blog/logging-without-limits/
[18]: /logs/indexes/#exclusion-filters
[19]: https://www.datadoghq.com/blog/efficient-log-rehydration-with-datadog/
