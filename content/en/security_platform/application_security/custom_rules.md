---
title: Writing Custom Detection Rules
kind: documentation
---

## Overview

To create a custom detection rule in Datadog, hover over **Security**, select **Detection Rules**, and select the **New Rule** button in the top right corner of the page.

## Rule Type

Select **Application Security** to detect threats impacting web services in real-time.

## Choose a detection method

### Threshold

Define when events exceed a user-defined threshold. For example, if you create a trigger with a threshold of `>10`, a security signal occurs when the condition is met.

### Anomaly

<div class="alert alert-warning">
Anomaly detection is currently in <a href="https://app.datadoghq.com/security/configuration/rules/new">public beta</a>.
</div>

When configuring a specific threshold isn't an option, you can define an anomaly detection rule instead. With anomaly detection, a dynamic threshold is automatically derived from the past observations of the events.

## Define a search query

{{< tabs >}}
{{% tab "Threshold" %}}

### Search query

{{< img src="security_platform/security_monitoring/detection_rules/threshold.png" alt="Define the search query" >}}

Construct an Application Security query. For example, NEED QUERY EXAMPLE HERE.

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given timeframe. The defined group-by generates a signal for each group by value. Typically, the group by is an entity (like user, or IP). The group-by is also used to [join the queries together](#joining-queries).

Add additional queries with the Add Query button.

#### Advanced options

Click the **Advanced** option to add queries that will **Only trigger a signal when:** a value is met, or **Never trigger a signal when:** a value is met. For example, if a service is triggering a signal, but the actions is benign and you no longer want signals triggered from this service, create a logs query that excludes `Service` under the **Never trigger a signal when:** option.

#### Joining queries

Joining queries to span a timeframe can increase the confidence or severity of the Security Signal. For example, to detect a successful attack, both successful and unsuccessful tiggers can be correlated for a service.

Queries are correlated together by using a `group by` value. The `group by` value is typically an entity (for example, `IP address` or `Service`), but can be any attribute. In this instance, joined queries technically hold same attribute value because the value must be the same for the case to be met. If a `group by` value doesn’t exist, the case will never be met. A Security Signal is generated for each unique `group by` value when a case is matched.

For example, create a query that searches for the same `Service` activity, but append opposing HTTP status code queries:

Query `successful_attack_trigger`: `security_activity_to_monitor -@http_status_code:[500-599]`.

Query `failed_attack_trigger`: `security_activity_to_monitor @http_status_code:[500-599]`.

Set `group by` for both to `Service` and create rule cases for each.

{{% /tab %}}

{{% tab "Anomaly" %}}

Construct a new Application Security query.

Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given timeframe. The defined `group by` option generates a signal for each `group by` value. Typically, `group by` is an entity (like `IP` or `Service`).

Anomaly detection inspects how the `group by` attribute has behaved in the past. If a `group by` attribute is seen for the first time (for example, the first time an IP is communicating with your system) and is anomalous, it will not generate a security signal because the anomaly detection algorithm has no historical data to base its decision on.

{{% /tab %}}
{{< /tabs >}}

## Set a rule case

{{< tabs >}}
{{% tab "Threshold" %}}

### Trigger

Rule cases, such as `successful trigger > 0`, are evaluated as case statements. Thus, the first case to match generates the signal. Create one or multiple rule cases, and click on the grey area next to them to drag and manipulate their ordering.

A rule case contains logical operations (`>, >=, &&, ||`) to determine if a signal should be generated based on the event counts in the previously defined queries.

**Note**: The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.

Provide a **name**, for example "No HTTP errors returned" and "5xx errors generated", for each rule case. This name is appended to the rule name when a signal is generated.

### Severity and notification

Set the severity of the signal. The dropdown allows you to select an appropriate severity level (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

In the “Notify” section, configure zero or more [notification targets][1] for each rule case.

You can also create [notification rules][2] to eleviate manual edits to notification preferences for individual detection rules.

### Time windows

An `evaluation window` is specified to match when at least one of the cases matches true. This is a sliding window and evaluates in real-time.

Once a signal is generated, the signal will remain “open” if a case is matched at least once within this `keep alive` window. Each time a new event matches any of the cases, the *last updated* timestamp is updated for the signal.

A signal will “close” regardless of the query being matched once the time exceeds the `maximum signal duration`. This time is calculated from the first seen timestamp.

Additional cases can be added by clicking the **Add Case** button.

**Note**: The `evaluation window` must be less than or equal to the `keep alive` and `maximum signal duration`.

[1]: /monitors/notify/?tab=is_alert#integrations
[2]: /security_platform/notification_rules/
{{% /tab %}}

{{% tab "Anomaly" %}}

### Severity and notification

Select an appropriate severity level for the security signal (`INFO`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).

In the “Notify” section, configure zero or more [notification targets][1].

You can also create [notification rules][2] to eleviate manual edits to notification preferences for individual detection rules.

### Time windows

Datadog automatically detects the seasonality of the data and will generate a signal when the data is determined to be anomalous.

Once a signal is generated, the signal will remain "open" if the data remains anomalous and the last updated timestamp will be updated for the anomalous duration.

A signal will "close" regardless of whether or not the anomaly is still anomalous once the time exceeds the maximum signal duration. This time is calculated from the first seen timestamp.

[1]: /monitors/notify/?tab=is_alert#integrations
[2]: /security_platform/notification_rules/
{{% /tab %}}
{{< /tabs >}}

## Say what's happening

The **Rule name** section allows you to configure the rule name that appears in the rules list view, as well as the title of the signal.

The notification box has the same Markdown and preview features as those of [monitor notifications][1].

### Template variables

Security rules support template variables within the markdown notification box. Template variables permit injection of dynamic context from traces directly into a security signal and its associated notifications.

Template variables also permit deep linking into Datadog or a partner portal for quick access to next steps for investigation.

```text
* [Investigate service in the services dashboard](https://app.datadoghq.com/example/integration/application-security---service-events?tpl_var_service={{@service}})
```

Epoch template variables create a human-readable string or math-friendly number within a notification. For example, use values such as `first_seen`, `last_seen`, or `timestamp` (in milliseconds) within a function to receive a readable string in a notification.

```text
{{eval "first_seen_epoch-15*60*1000"}}
```

The attributes can be seen on a signal in the JSON dropdown, and you can access the attributes with the following syntax: `{{@attribute}}`. You can access inner keys of the event attributes by using JSON dot notation (for example, `{{@attribute.inner_key}}`).

**Note**: You can copy the raw JSON directly from a security signal. Select any security signal in the Signals Explorer to view its details. Click the export button in the top left corner, and select **Copy raw JSON to clipboard**.

This JSON object is an example of event attributes which may be associated with a security signal:

```json
{
  ...
	"attributes": {
			"title": "Security scanner detected",
			"http": {
				"url": "http://www.example.com"
			},
			...
				"rule": {
					"detectionMethod": "threshold",
					"name": "Your rule name",
				},
				"events_matched": 2,
				"first_seen": "2022-01-26T13:23:33.000Z",
				"last_seen": "2022-01-27T04:01:57.000Z"
			},
			"groupByPaths": [
				"service"
			]
		}
	}
}
```

You could use the following in the “say what’s happening” section:

```
Real routes targeted for {{@service}}.
```

And this would be rendered as the following:

```
Real routes targeted for `your_service_name`.
```

You can use if-else logic to see if an attribute exists with the notation:

```
{{#if @network.client.ip}}The attribute IP attribute exists.{{/if}}
```

You can use if-else logic to see if an attribute matches a value:

```
{{#is_exact_match "@network.client.ip" "1.2.3.4"}}The ip matched.{{/is_exact_match}}
```

Tag your signals with different tags, for example, `security:attack`.

**Note**: The tag `security` is special. This tag is used to classify the security signal. The recommended options are: `attack`, `threat-intel`, `compliance`, `anomaly`, and `data-leak`.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /monitors/notify/?tab=is_alert
