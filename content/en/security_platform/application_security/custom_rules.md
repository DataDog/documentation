---
title: Custom Detection Rules
kind: documentation
further_reading:
- link: "/security_platform/application_security/"
  tag: "Documentation"
  text: "Monitoring threats with Datadog Application Security"
- link: "/security_platform/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshoot common Datadog Application Security issues"
---

## Overview

Application Security comes with a set of [out-of-the-box detection rules][1] which aim to catch attack attempts and vulnerability triggers that impact your production systems.

However, there are situations where you may want to customize a rule based on your environment. For example, you may want to customize a detection rule that catches attack attempts on a pre-production development route that accepts SQL and returns the results. Catching SQL attempts is noisy, as the route is restricted to internal developers; therefore you can customize this rule to exclude these patterns.

Another example is customizing a rule to exclude an internal security scanner. Application Security detects its activity as expected. However, you may not want to be notified of its regularly occurring scan.

In these situations, a custom detection rule can be created to exclude such events. This guide shows you how to create a custom detection rule for Application Security.

## Configuration

To customize an OOTB detection rule, you must first clone an existing rule. Navigate to your [Detection Rules][2] and select a rule. Scroll to the bottom of the rule and click the Clone Rule button. This now enables you to edit the existing rule.

### Define AppSec query

Construct an Application Security query. For example, create a query to monitor an endpoint for SQL injection attempts: `@appsec.type:sql_injection -@http.url_details.path:"/debug-endpoint-executing-sql" env:production`.

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given timeframe. The defined group-by generates a signal for each group-by value. Typically, the group-by is an entity (like user or IP). The group-by is also used to [join the queries together](#joining-queries).

You can add additional queries with the Add Query button.

##### Advanced options

Click the **Advanced** option to add queries that will **Only trigger a signal when:** a value is met, or **Never trigger a signal when:** a value is met. For example, if a service is triggering a signal, but the action is benign and you no longer want signals triggered from this service, create a logs query that excludes `Service` under the **Never trigger a signal when:** option.

##### Joining queries

Joining queries to span a timeframe can increase the confidence or severity of the Security Signal. For example, to detect a successful attack, both successful and unsuccessful triggers can be correlated for a service.

Queries are correlated together by using a `group by` value. The `group by` value is typically an entity (for example, `IP address` or `Service`), but can be any attribute.

For example, create opposing queries that search for the same `sql_injection` activity, but append opposing HTTP path queries for successful and unsuccessful attempts:

Query 1: `@appsec.type:sql_injection -@http.url_details.path:"/debug-endpoint-executing-sql" env:production`.

Query 2: `@appsec.type:sql_injection @http.url_details.path:"/debug-endpoint-executing-sql" env:production`.

In this instance, the joined queries technically hold the same attribute value: the value must be the same for the case to be met. If a `group by` value doesn’t exist, the case will never be met. A Security Signal is generated for each unique `group by` value when a case is matched.

### Set a rule case

#### Trigger

Rule cases, such as `successful trigger > 0`, are evaluated as case statements. Thus, the first case to match generates the signal. Create one or multiple rule cases, and click on the grey area next to them to drag and manipulate their orderings.

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

Provide a **name** for each rule case. This name is appended to the rule name when a signal is generated.

#### Severity and notification

Set the severity of the signal. The dropdown allows you to select an appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

In the "Notify" section, configure zero or more [notification targets][3] for each rule case.

You can also create [notification rules][4] to alleviate manual edits to notification preferences for individual detection rules.

### Time windows

An `evaluation window` is specified to match when at least one of the cases matches true. This is a sliding window and evaluates in real time.

When a signal is generated, it remains "open" if a case is matched at least once within this `keep alive` window. Each time a new event matches any of the cases, the *last updated* timestamp is updated for the signal.

A signal will "close" regardless of the query being matched once the time exceeds the `maximum signal duration`. This time is calculated from the first seen timestamp.

Additional cases can be added by clicking the **Add Case** button.

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

### Say what's happening

The **Rule name** section allows you to configure the rule name that appears in the rules list view, as well as the title of the signal.

The notification box has the same Markdown and preview features.

#### Template variables

Detection rules support template variables within the Markdown notification box. Template variables permit injection of dynamic context from traces directly into a security signal and its associated notifications.

Template variables also permit deep linking into Datadog or a partner portal for quick access to next steps for investigation. For example:

```text
* [Investigate service in the services dashboard](https://app.datadoghq.com/example/integration/application-security---service-events?tpl_var_service={{@service}})
```

Epoch template variables create a human-readable string or math-friendly number within a notification. For example, use values such as `first_seen`, `last_seen`, or `timestamp` (in milliseconds) within a function to receive a readable string in a notification. For example:

```text
{{eval "first_seen_epoch-15*60*1000"}}
```

The attributes can be seen on a signal in the JSON dropdown, and you can access the attributes with the following syntax: `{{@attribute}}`. You can access inner keys of the event attributes by using JSON dot notation (for example, `{{@attribute.inner_key}}`).

**Note**: You can copy the raw JSON directly from a security signal. Select any security signal in the Signals Explorer to view its details. Click the export button in the top left corner, and select **Copy raw JSON to clipboard**.

This JSON object is an example of event attributes which may be associated with a security signal:

```json
{
  "attributes":{
    "title":"Security scanner detected",
    "http":{
      "url":"http://www.example.com"
    },
    "rule":{
      "detectionMethod":"threshold",
      "name":"Your rule name"
    },
    "events_matched":2,
    "first_seen":"2022-01-26T13:23:33.000Z",
    "last_seen":"2022-01-27T04:01:57.000Z"
  },
  "groupByPaths":[
    "service"
  ]
}
```

For this attribute, use the following in the “say what’s happening” section:

```
Real routes targeted for {{@service}}.
```

This renders your service name in any notifications you receive.

```
Real routes targeted for `your_service_name`.
```

You can also use if-else logic to see if an attribute exists with the notation:

```
{{#if @network.client.ip}}The attribute IP attribute exists.{{/if}}
```

Or use if-else logic to see if an attribute matches a value:

```
{{#is_exact_match "@network.client.ip" "1.2.3.4"}}The ip matched.{{/is_exact_match}}
```

Tag your signals with different tags, for example, `attack:sql-injection-attempt`.

**Note**: The tag `security` is special. This tag is used to classify the security signal. The recommended options are: `attack`, `threat-intel`, `compliance`, `anomaly`, and `data-leak`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security_platform/default_rules/#cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /monitors/notify/?tab=is_alert#integrations
[4]: /security_platform/notification_rules/
