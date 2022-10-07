---
title: Signal Correlation Rules
type: documentation
further_reading:
- link: "/cloud_siem/explorer/"
  tag: "Documentation"
  text: "Learn about the Security Signals Explorer"
- link: "/security_platform/notifications/variables/"
  tag: "Documentation"
  text: "Learn more about Security notification variables"
---

## Overview

Signal correlation rules combine multiple signals together to generate a new signal so that you can alert on more complex use cases and reduce alert fatigue. For example, you can correlate events or signals to identify a specific issue or generate an alert only if a specific `low` severity signal is combined with a specific `high` severity signal.

As another example, you can create a signal by combining these two rules:

1. Detect if an access attempt was made from an expired account
2. Detect if there was an attempt to authenticate into a host or resource

And use the `expired account ID` attribute to correlate the two rules. 

You can correlate log detection rules, as well as log detection rules with Cloud Workload Security and Application Security Monitoring rules.

## Create a Signal Correlation rule

Navigate to [Detection Rules][1] and click **+ New Rule**. In the *Select a rule type* section, click **Signal Correlation**.

### Set rules

1. Select a rule for **Rule a**. Click the pencil icon to rename the rule. Use the **correlated by** dropdown to define the correlating attribute. You can select multiple attributes (maximum of 3) to correlate the selected rules. See [Time windows](#time-windows) for more information about the sliding window.

2. Select a rule for **Rule b** in the second Rule editor’s dropdown. Click the pencil icon to rename the rule. The attributes and sliding window time frame is set to what was selected for **Rule a**.

### Set rule cases

#### Trigger

{{< img src="security_platform/security_monitoring/detection_rules/define_rule_case.png" alt="The set rule cases section showing the trigger, severity, and notification fields" >}}

Rule cases are evaluated as case statements. Thus, the first case to match generates the signal. An example of a rule case is`a > 3`, where `a` is the rule name. Click and drag your rule cases to manipulate their ordering.

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries. The ASCII lowercase [rule names](#set-rules) are referenced in this section.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

Provide a **name**, for example "Case 1", for each rule case. This name is appended to the rule name when a signal is generated.

#### Severity and notification

Set the severity of the Security Signal. The dropdown allows you to select an appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

In the **Notify** section, optionally, configure [notification targets][2] for each rule case.

#### Time windows

An `evaluation window` is specified to match when at least one of the cases matches true. This is a sliding window and evaluates in real-time.

Once a signal is generated, the signal remains “open” if a case is matched at least once within the `keep alive` window. Each time a new event matches any of the cases, the *last updated* timestamp is updated for the signal.

A signal is “close” regardless of the query being matched once the time exceeds the `maximum signal duration`. This time is calculated from the first seen timestamp.

Click **Add Case** to add additional cases.

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

### Say what's happening

The **Rule name** section allows you to configure the rule name that appears in the detection rules list view, as well as the title of the Security Signal.

Use [notification variables][3] and Markdown to customize the notifications sent when a signal is generated. You can reference the tags associated with the signal and the event attributes in the notification. The list of available attributes is in the **JSON** section of the **Overview** tab in the signal panel. Use the following syntax to add the attributes to the notification: `{{@attribute}}`. Use the JSON dot notation to access the inner keys of the event attributes, for example, `{{@attribute.inner_key}}`.

This JSON object is an example of event attributes that may be associated with a security signal:

```json
{
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  },
  "usr": {
    "id": "user@domain.com"
  },
  "evt": {
    "category": "authentication",
    "outcome": "success"
  },
  "used_mfa": "false"
}

```

You could use the following in the **Say what’s happening** section:

```
{{@usr.id}} just logged in without MFA from {{@network.client.ip}}.
```

And this would be rendered as the following:

```
user@domain.com just logged in without MFA from 1.2.3.4.
```

You can use if-else logic to see if an attribute exists with the notation:

```
{{#if @network.client.ip}}The attribute IP attribute exists.{{/if}}
```

You can use if-else logic to see if an attribute matches a value:

```
{{#is_exact_match "@network.client.ip" "1.2.3.4"}}The ip matched.{{/is_exact_match}}
```

See [Notification Variables][3] for more information.

Use the **Tag resulting signals** dropdown to tag your signals with different tags. For example, `security:attack` or `technique:T1110-brute-force`.

**Note**: The tag `security` is special. This tag is used to classify the security signal. The recommended options are: `attack`, `threat-intel`, `compliance`, `anomaly`, and `data-leak`.

### Template variables

Use [template variables][4] in the notification to inject dynamic context from triggered logs directly into a security signal and its associated notifications.

For example, if a security rule detects when a user logs in from an IP address known to be malicious, the message states which user and IP address triggered a given signal when using the specified template variable.

```text
The user {{@usr.id}} just successfully authenticated from {{@network.client.ip}} which is a known malicious IP address.
```

Template variables also permit deep linking into Datadog or a partner portal for quick access to next steps for investigation.

```text
* [Investigate user in the authentication dashboard](https://app.datadoghq.com/example/integration/security-monitoring---authentication-events?tpl_var_username={{@usr.id}})
```

Epoch template variables create a human-readable string or math-friendly number within a notification. For example, use values such as `first_seen`, `last_seen`, or `timestamp` (in milliseconds) within a function to receive a readable string in a notification.

```text
{{eval "first_seen_epoch-15*60*1000"}}
```

See [Template Variables][4] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/rules
[2]: /security_platform/notifications/#integrations
[3]: /security_platform/notifications/variables/
[4]: /security_platform/notifications/variables/#template-variables
