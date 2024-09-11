---
title: Variables
aliases:
  - /security_platform/notifications/variables
further_reading:
- link: "/security/detection_rules/"
  tag: "Documentation"
  text: "Explore security detection rules"
- link: "/security/notifications/"
  tag: "Documentation"
  text: "Learn more about Security notifications"
products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: Cloud Security Management
  url: /security/cloud_security_management/
  icon: cloud-security-management
- name: Application Security Management
  url: /security/application_security/
  icon: app-sec
---

{{< product-availability >}}

## Overview

When [creating a new detection rule or modifying an existing one][1], use [template variables](#template-variables) (such as attributes and signal tags) and [conditional variables](#conditional-variables) to customize a rule's notification message. When a signal is generated from the rule, the variables are populated with values related to that signal. 

## Template Variables

Use template variables to inject dynamic context from triggered logs or traces directly into a security signal and its associated notifications.

The following variables are available:

| Variable                                           | Description                                                                                   |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `{{severity}}`                                     | The severity of the triggering rule case (integer, 0-4).                                      |
| `{{timestamp}}`                                    | Time the signal was created. For example, `Mon Jan 01 00:00:00 UTC 1970`.                     |
| `{{timestamp_epoch}}`                              | Time the signal was created, in milliseconds since midnight, January 1, 1970.                 |
| `{{first_seen}}`                                   | Time the signal was first seen. For example, `Mon Jan 01 00:00:00 UTC 1970`.                  |
| `{{first_seen_epoch}}`                             | Time the signal was first seen, in milliseconds since midnight, January 1, 1970.              |
| `{{last_seen}}`                                    | Time the signal was most recently triggered. For example, `Mon Jan 01 00:00:00 UTC 1970`.     |
| `{{last_seen_epoch}}`                              | Time the signal was most recently triggered, in milliseconds, since midnight, January 1, 1970.|
| `{{rule_name}}`                                    | Name of the associated rule.                                                                  |
| `{{case_name}}`                                    | Name of the triggering rule case.                                                             |
| `{{events_matched}}`                               | Number of events that have matched the associated rule.                                       |
| `{{events_matched_per_query.<name_of_the_query>}}` | Number of events that have matched the associated rule query `<name_of_the_query>`.           |

When a large number of logs match a rule, the rule's title and message are not rendered for every new log. In these cases, the rendered values of `{{events_matched}}` and `{{events_matched_per_query.<name_of_the_query>}}` could be below the values displayed in the Overview tab of the signal's side panel.

### Dynamic links

Use template variables to dynamically link to a related resource for your investigation. 

For example, if a signal detects a suspicious user login, use `{{@user.id}}` to create a dynamic link to another resource:

```
* [Investigate user in the authentication dashboard](https://app.datadoghq.com/example/integration/security-monitoring---authentication-events?tpl_var_username={{@usr.id}})
```

Or, if a signal is tagged with a specific service, use the `{{@service}}` variable to create a dynamic link:

```
* [Investigate service in the services dashboard](https://app.datadoghq.com/example/integration/application-security---service-events?tpl_var_service={{@service}})
```

### Evaluation of numerical values

For template variables that return numerical values, use `eval` to perform mathematical operations or change the value's format. For more information, see [Template Variable Evaluation][2].

### Epoch

Epoch template variables create a human-readable string or math-friendly number within a notification. For example, use values such as `first_seen`, `last_seen`, or `timestamp` (in milliseconds) within a function to receive a readable string in a notification. For example:

```
{{eval "first_seen_epoch-15*60*1000"}}
```

For more information on the `eval` function, see [Template Variable Evaluation][2].

### Local time

Use the `local_time` function to add another date in your notification in the time zone of your choice. This function transforms a date into its local time: `{{local_time "time_variable" "timezone"}}`.

For example, to add the last triggered time of the signal in the Tokyo time zone in your notification, include the following in the notification message:

```
{{local_time "last_triggered_at" "Asia/Tokyo"}}
```

The result is displayed in the ISO 8601 format: `yyyy-MM-dd HH:mm:ss±HH:mm`, for example, `2021-05-31 23:43:27+09:00`. See the [list of TZ database time zones][3], specifically the `TZ database name` column, to see the list of available time zone values.

## Attribute variables

<div class="alert alert-warning">
HIPAA-enabled Datadog organizations have access to only <a href="#template-variables">template variables</a> for security notifications. Attribute variables are not supported.
</div>

Use attribute variables to customize signal notifications with specific information about the triggered signal. 

To see a signal's list of event attributes, click **JSON** at the bottom of the **Overview** tab in the signal's side panel. Use the following syntax to add these event attributes in your rule notifications: `{{@attribute}}`. To access inner keys of the event attributes, use JSON dot notation, for example, `{{@attribute.inner_key}})`.

If the signal's JSON does not contain an attribute that is present in the related log's JSON, use the previously outlined syntax with the attribute name from the log's JSON. This attribute is then included in both the signal's JSON and the signal notifications.

The following is an example JSON object with event attributes that may be associated with a security signal:

{{< tabs >}}
{{% tab "Cloud SIEM" %}}

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

If you use the following in the **Say what's happening** section:

```
{{@usr.id}} just logged in without MFA from {{@network.client.ip}}.
```
This is what the notification message looks like:

```
user@domain.com just logged in without MFA from 1.2.3.4.
```

{{% /tab %}}

{{% tab "Application Security Management" %}}

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

If you use the following in the Say What's Happening section:

```
Real routes targeted for {{@service}}.
```

The notification shows the service name in the message as follows:

```
Real routes targeted for your_service_name.
```

{{% /tab %}}
{{< /tabs >}}

### More examples

Use `{{@network.client.ip}}` to display the IP address(es) associated with the signal.

If a security rule detects a user logging in from an IP address known to be malicious, use the template variables `{{@usr.id}}` and `{{@network.client.ip}}` to see which user and IP address triggered the signal. For example:

```
The user {{@usr.id}} just successfully authenticated from {{@network.client.ip}} which is a known malicious IP address.
```
## Tag variables

Use the following syntax to add a tag variable to your rule's notification message: `{{tag_name}}`. 

For tags following the `key:value` syntax, use the variable: `{{key.name}}`. This renders the value associated with the key in the notification. For example, if a signal has the tag key `region`, use the variable `{{region.name}}` in your notification message.

There is no need to use `@` to access the tag value.

If a tag key includes a period, use brackets around the full key when using a tag variable. For example, if your tag is `dot.key.test:five`, use `{{[dot.key.test].name}}`.

### Dynamic handles

Use tag variables to dynamically build notification handles and route notifications to a specific team or service based on the security signal generated.
For example, if a signal has a `service` tag, you can have your notifications routed to different Slack channels based on the failing service:
```
@slack-{{service.name}} There is a security issue with {{service.name}}.
```

For example, if the signal has the `service:ad-server`, the notification is sent to the `#ad-server` Slack channel with the following content:

```
@slack-ad-server There is an ongoing issue with ad-server.
```

## Conditional variables

Conditional variables use if-else logic to display a message based on the details of the signal triggered. These variables can be used in the title or notification message.

The following conditional variables are available:

| Variable              | Description                                               |
| --------------------- | --------------------------------------------------------- |
| `{{#is_match}}`       | The context matches the provided substring.               |
| `{{^is_match}}`       | The context does not match the provided substring.        |
| `{{#is_exact_match}}` | The context exactly matches the provided string.          |
| `{{^is_exact_match}}` | The context does not exactly match the provided string.   |
| `{{#if}}`             | The attribute exists.                                     |

Conditional variables must have an opening and closing pair with the text and @-notifications in between. For example:
```
{{#is_match "<tag_variable>.name" "<comparison_string>"}}
  This displays if <comparison_string> is included in <tag_variable>.
{{/is_match}}
```

### Examples

Use if-else logic to see if an attribute exists::

```
{{#if @network.client.ip}}The attribute IP attribute exists.{{/if}}
```

Use if-else logic to see if an attribute matches a value:

```
{{#is_exact_match "@network.client.ip" "1.2.3.4"}}The ip matched.{{/is_exact_match}}
```

## Additional information

### Raw format

Use the `{{{{raw}}}}` format if your signal notification needs to send double curly braces, such as `{{ <TEXT> }}`. For example, the following syntax:

```
{{{{raw}}}}
{{ <TEXT_1> }} {{ <TEXT_2> }}
{{{{/raw}}}}
```

Outputs:

```
{{ <TEXT_1> }} {{ <TEXT_2> }}
```

The `^|#` helpers used in conditional variables cannot be used with the `{{{{raw}}}}` format and must be removed. For instance, to output raw text with the `{{is_match}}` conditional variable, use the following template:

```
{{{{is_match "host.name" "<HOST_NAME>"}}}}
{{ .matched }} the host name
{{{{/is_match}}}}
```

If `host.name` matches `<HOST_NAME>`, the template outputs:

```
{{ .matched }} the host name
```

### URL Encode

If your signal notification includes information that needs to be encoded in a URL (for example, for redirections), use the `{{ urlencode "<variable>"}}` syntax.

**Example**: If your signal message includes a URL to the Service Catalog filtered to a specific service, use the `service` [tag variable](#attribute-and-tag-variables) and add the `{{ urlencode "<variable>"}}` syntax to the URL:

```
https://app.datadoghq.com/services/{{urlencode "service.name"}}
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/detection_rules/#creating-and-managing-detection-rules
[2]: /monitors/guide/template-variable-evaluation/
[3]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones