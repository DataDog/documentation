---
title: Signal Correlation Rules
type: documentation
aliases:
 - /security_platform/cloud_siem/signal_correlation_rules
further_reading:
- link: /cloud_siem/explorer/
  tag: Documentation
  text: Learn about the Security Signals Explorer
- link: /security/notifications/variables/
  tag: Documentation
  text: Learn more about Security notification variables
---

## Overview

Signal correlation rules combine multiple signals together to generate a new signal so that you can alert on more complex use cases and reduce alert fatigue. For example, you can correlate events or signals to identify a specific issue or generate an alert only if a specific `low` severity signal is combined with a specific `high` severity signal.

As another example, you can create a signal by combining these two rules:

1. Detect if an access attempt was made from an expired account
2. Detect if there was an attempt to authenticate into a host or resource

And use the `expired account ID` attribute to correlate the two rules.

You can correlate log detection rules, as well as log detection rules with Cloud Security Management Threats and Application Security Management rules.

## Create a Signal Correlation rule

Navigate to [Detection Rules][1] and click **+ New Rule**. In the *Select a rule type* section, click **Signal Correlation**.

### Set rules

1. Select a rule for **Rule a**. Click the pencil icon to rename the rule. Use the **correlated by** dropdown to define the correlating attribute. You can select multiple attributes (maximum of 3) to correlate the selected rules. See [Time windows](#time-windows) for more information about the sliding window.

2. Select a rule for **Rule b** in the second Rule editor's dropdown. Click the pencil icon to rename the rule. The attributes and sliding window time frame is set to what was selected for **Rule a**.

### Set rule cases

#### Trigger

{{< img src="security/security_monitoring/detection_rules/define_rule_case.png" alt="The set rule cases section showing the trigger, severity, and notification fields" >}}

Rule cases are evaluated as case statements. Thus, the first case to match generates the signal. An example of a rule case is`a > 3`, where `a` is the rule name. Click and drag your rule cases to manipulate their ordering.

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries. The ASCII lowercase [rule names](#set-rules) are referenced in this section.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

Provide a **name**, for example "Case 1", for each rule case. This name is appended to the rule name when a signal is generated.

#### Severity and notification

{{% security-rule-severity-notification %}}

#### Time windows

{{% security-rule-time-windows %}}

Click **Add Case** to add additional cases.

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

### Say what's happening

{{% security-rule-say-whats-happening %}}

Use the **Tag resulting signals** dropdown menu to add tags to your signals. For example, `security:attack` or `technique:T1110-brute-force`.

**Note**: the tag `security` is special. This tag is used to classify the security signal. The recommended options are: `attack`, `threat-intel`, `compliance`, `anomaly`, and `data-leak`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/rules?product=siem
