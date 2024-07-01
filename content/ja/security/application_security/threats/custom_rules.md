---
title: Custom Detection Rules
aliases:
  - /security_platform/application_security/custom_rules
  - /security/application_security/custom_rules
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Protect against threats with Datadog Application Security Management
- link: /security/application_security/event_rules/
  tag: Documentation
  text: Creating event rules
- link: /security/application_security/troubleshooting
  tag: Documentation
  text: Troubleshoot common Datadog Application Security Management issues
- link: /security/notifications/variables/
  tag: Documentation
  text: Learn more about Security notification variables
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentation
  text: Syntax for defining the ASM query
---

## Overview

Application Security Management (ASM) comes with a set of [out-of-the-box detection rules][1] which aim to catch attack attempts, vulnerabilities found by attacker, and business logic abuse that impact your production systems.

However, there are situations where you may want to customize a rule based on your environment or workload. For example, you may want to customize a detection rule that detects users performing sensitive actions from a geolocation where your business doesn't operate.

Another example is customizing a rule to exclude an internal security scanner. ASM detects its activity as expected. However, you may not want to be notified of its regularly occurring scan.

In these situations, a custom detection rule can be created to exclude such events. This guide shows you how to create a custom detection rule for ASM.

## Business logic abuse detection rule

ASM offers out of the box rules to detect business logic abuse (for example, resetting a password through brute force). Those rules require [adding business logic information to traces][7].

Recent Datadog Tracing Libraries attempt to detect and send user login and signup events automatically without needing to modify the code. If needed, you can [opt out of the automatic user activity event tracking][8].

You can filter the rules, and identify which business logic to start tracking. Additionally, you can use these rules as a blueprint to create custom rules based on your own business logic. 

See the section below to see how to configure your rules.

## Configuration

To customize an OOTB detection rule, you must first clone an existing rule. Navigate to your [Detection Rules][2] and select a rule. Scroll to the bottom of the rule and click the Clone Rule button. This now enables you to edit the existing rule.

### Define an ASM query

Construct an ASM query using the [same query syntax as in the ASM Trace Explorer][3]. For example, create a query to monitor login successes from outside of the United States: `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given timeframe. The defined group-by generates a signal for each group-by value. Typically, the group-by is an entity (like user, IP, or service). The group-by is also used to [join the queries together](#joining-queries).

Use the preview section to see which ASM traces match the search query. You can also add additional queries with the Add Query button.

##### Joining queries

Joining queries to span a timeframe can increase the confidence or severity of the Security Signal. For example, to detect a successful attack, both successful and unsuccessful triggers can be correlated for a service.

Queries are correlated together by using a `group by` value. The `group by` value is typically an entity (for example, `IP` or `Service`), but can be any attribute.

For example, create opposing queries that search for the same `business_logic.users.login.success` activity, but append opposing HTTP path queries for successful and unsuccessful attempts:

Query 1: `@appsec.security_activity:business_logic.users.login.success @actor.ip_details.country.iso_code:US`.

Query 2: `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

In this instance, the joined queries technically hold the same attribute value: the value must be the same for the case to be met. If a `group by` value doesn't exist, the case will never be met. A Security Signal is generated for each unique `group by` value when a case is matched.

### Exclude benign activity with suppression queries

In the **Only generate a signal if there is a match** field, you have the option to enter a query so that a trigger is only generated when a value is met.

In the **This rule will not generate a signal if there is a match** field, you have the option to enter suppression queries so that a trigger is not generated when the values are met. For example, if a service is triggering a signal, but the action is benign and you no longer want signals triggered from this service, create a query that excludes `service`.

### Set a rule case

#### Trigger

Rule cases, such as `successful login > 0`, are evaluated as case statements. Thus, the first case to match generates the signal. Create one or multiple rule cases, and click on the grey area next to them to drag and manipulate their orderings.

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

Provide a **name** for each rule case. This name is appended to the rule name when a signal is generated.

#### Severity and notification

{{% security-rule-severity-notification %}}

### Time windows

{{% security-rule-time-windows %}}

Click **Add Case** to add additional cases.

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

### Say what's happening

{{% security-rule-say-whats-happening %}}

Use the **Tag resulting signals** dropdown menu to add tags to your signals. For example, `attack:sql-injection-attempt`.

**Note**: The tag `security` is special. This tag is used to classify the security signal. The recommended options are: `attack`, `threat-intel`, `compliance`, `anomaly`, and `data-leak`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/default_rules/?category=cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /tracing/trace_explorer/query_syntax/
[4]: /monitors/notify/?tab=is_alert#integrations
[5]: /security/notifications/variables/
[6]: /security/notifications/variables/#template-variables
[7]: /security/application_security/threats/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[8]: /security/application_security/threats/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking

