---
title: Compliance Monitoring Rules
kind: documentation
further_reading:
- link: "/security_monitoring/default_rules/"
  tag: "Documentation"
  text: "Configure default Compliance Monitoring rules"
- link: "/security_monitoring/explorer/"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
---

<div class="alert alert-warning">
Compliance Monitoring is currently available for private beta. Use this <a href="https://docs.google.com/forms/d/e/1FAIpQLScTA913tNGptcAeNNdWlvgECjekYoDVJwR-OkMtZYnJnq-FWw/viewform">form</a> to request access.
</div>

## Create a New Rule

To create a new rule in Datadog, hover over **Security**, select **Security Rules**, and select the **New Rule** button in the top right corner of the page.

## Select a rule type

For Compliance Monitoring, select **Cloud Configuration** to scan the state of your cloud environment.

## Detection method

#### Threshold

Define when events exceed a user-defined threshold. For example, if you create a trigger with a threshold of `>10`, a security signal occurs when the condition is met.

## Define the configuration query

The configuration query is automatically configured and grouped by `resource_type` and `resource_id`. For example, if you are using the [AWS Cloudtrail][1] integration, all security signals are automatically tagged and populated based on that integration. There are also default rules available based on [cloud configuration][2].

Set a custom severity and notification for all rules, as detailed below, or use a default rule for better control over individual cloud configurations.

### Set severity and notifications

Set the severity of the Security Signal. The dropdown allows you to select an appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

In the “Notify” section, configure zero or more [notification targets][3] for each rule case.

## Say What's Happening

The notification box has the same Markdown and preview features as those of [monitor notifications][4].

Tag your signals with different tags, for example `security:attack` or `technique:T1110-brute-force`.

**Note**: The tag `security` is special. This tag is used to classify the security signal. The recommended options are: `attack`, `threat-intel`, `compliance`, `anomaly`, and `data-leak`.

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_monitoring/default_rules/
[2]: https://app.datadoghq.com/security/configuration/rules
[3]: /monitors/notifications/?tab=is_alert
[4]: /monitors/notifications/
