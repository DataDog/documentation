---
title: Best Practices for Monitoring Authentication Logs
kind: guide
further_reading:
- link: "https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/"
  tag: "Blog"
  text: "Learn more about monitoring authentication logs"
---

## Overview

Being able to log, monitor, and analyze all authentication events is key for identifying security threats and managing customer records for compliance purposes. Authentication logs from different sources and parts of your environment might have different formats and be managed by different teams or implemented using different third-party services.

This guide gives best practices and tips for [managing and formatting authentication logs](#manage-and-format-authentication-logs) and how to use authentication logs to [monitor and detect security threats](#monitor-and-detect-security-threats) in Datadog.

## Manage and format authentication logs

To extract the most information from your authentication events:

- [Log everything](#log-everything) from all authentication flows
- Write logs that include [all the information](#include-enough-information) you need
- Make sure your logs use a [standardized, easily parsable format](#log-in-a-standard-parsable-format)

### Log everything

In order to gain visibility into all of your authentication activity, ensure log events for all login flows are at the application level. This eliminates gaps in your monitoring coverage. It also gives you more control over how you log authentication events and what data you are collecting.

### Include enough information

By logging [all authentication events](#log-everything) at the application level, you can ensure that your logs contain this level of information. For example:

{{< code-snippet lang="bash">}}
2020-01-01 12:00:01 google oauth login success by John Doe from 1.2.3.4
{{< /code-snippet >}}

Logs that provide the "who" (John Doe), "what" (login success), and when (2020-01-01 12:00:01) of an event provide the best detail for you to perform complex analysis.

### Log in a standard, parsable format

Ensure your application write logs in a key-value format using `=` as a separator. Using this format means that a key-value parser, such as Datadog's [Grok Parser][1], can easily process them. For example, if a log is in the following format:

{{< code-snippet lang="bash" wrap="false"  >}}
INFO 2020-01-01 12:00:01 usr.id="John Doe" evt.category=authentication evt.name="google oauth" evt.outcome=success network.client.ip=1.2.3.4
{{< /code-snippet >}}

Datadog can then parse this as the following JSON:

{{< code-snippet lang="json" wrap="false"  >}}
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
{{< /code-snippet >}}

Use the same format across all of your authentication logs. This allows you to use log attributes to slice and dice log data in Datadog. For example, you can look for which users (`usr.id`) have the highest number of failed logins (`evt.outcome:failure`).

A key-value format also makes it easy to add custom attributes to logs. For example, adding a [reCAPTCHA v3][2] score to identify possible bot activity.

Use quotes to wrap any attribute values that may contain spaces. This ensures that you capture the full value in a way that is easily parsable.

It's important to use a [standard naming convention][3] for the attributes in your logs to ensure that you can search and aggregate data across all attributes, regardless of where they come from. It is recommended that your authentication logs include the following [standard attributes][4]:

- [`usr.id`](#usrid)
- [`evt.category`](#evtcategory)
- [`evt.name`](#evtname)
- [`evt.outcome`](#evtoutcome)
- [`network.client.ip`](#networkclientip)

## Monitor and detect security threats

There are a few patterns you can look for when trying to detect common security threats. For example, if you see a significant number of failed login attempts from a single user within a short period of time, it could indicate a [**brute force attack**][5]. If those failed login attempts are followed by a successful one, it could be a successful account takeover that you should investigate immediately.

Another common authentication attack technique is [**credential stuffing**][6]. Credential stuffing is when an attacker mixes and matches breached login credentials to try to match a real user account. In order to detect this type of attack, look for logins using multiple `usr.id` values all coming from the same `network.client.ip`.

Use [Detection Rules][7] to scan your ingested logs in real time for common attacker techniques. If any log triggers one of these rules, it generates a [Security Signal][8] that includes key data about the event, such as the type of attack detected and suggestions on a response strategy. You can view, filter, and sort all of your Security Signals in the explorer to triage them and see where to focus your efforts.

{{< img src="credential-stuffing-attack-signal.png" alt="A credential stuffing attack signal in Datadog">}}

For signals triggered from the `Credential Stuffing Attack` Detection Rule, there is an [out-of-the-box runbook][9] available to help with response and remediation. This runbook guides you through investigating a potential credential stuffing attack, and includes graphs of related logs. To use this runbook, save a copy and set the the time frame, document your investigation in markdown, and share it with teammates [for commenting][10].

### Use dashboards to investigate

Datadog also provides out-of-the-box dashboards, such as the [IP investigation dashboard][11] and [User investigation dashboard][12]. These correlate key data from your authentication logs with relevant data from the rest of your environment to assist your investigations.

You can also create custom dashboards to visualize key authentication data like counts of logins by source and outcome. This provides you with a high-level view of activity across your entire user base and helps you see trends to identify suspicious spikes that you should investigate.

### Use log rehydration for future investigations

Datadog ingests and analyzes [all of your logs][13], ensuring that you can detect threats across your entire environment. You can archive any logs that you [don't want to index][14], and then quickly [rehydrate them][15] in the future for investigations, audits, and compliance purposes.

[1]: https://docs.datadoghq.com/logs/processing/parsing/?tab=matcher#key-value-or-logfmt
[2]: https://developers.google.com/recaptcha/docs/v3
[3]: https://www.datadoghq.com/blog/logs-standard-attributes/
[4]: https://docs.datadoghq.com/logs/processing/attributes_naming_convention/
[5]: https://app.datadoghq.com/security/configuration/rules?query=brute%20force%20attack&sort=rule
[6]: https://app.datadoghq.com/security/configuration/rules?query=credential%20stuffing%20attack&sort=rule
[7]: https://docs.datadoghq.com/security_monitoring/default_rules/
[8]: https://docs.datadoghq.com/security_monitoring/explorer
[9]: https://app.datadoghq.com/notebook/credentialstuffingrunbook
[10]: https://docs.datadoghq.com/notebooks/#commenting
[11]: https://app.datadoghq.com/screen/integration/security-monitoring-ip-investigation
[12]: https://app.datadoghq.com/screen/integration/security-monitoring-user-investigation
[13]: https://www.datadoghq.com/blog/logging-without-limits/
[14]: https://docs.datadoghq.com/logs/indexes/#exclusion-filters
[15]: https://www.datadoghq.com/blog/efficient-log-rehydration-with-datadog/
