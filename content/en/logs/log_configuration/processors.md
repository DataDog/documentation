---
title: Processors
kind: documentation
description: "Parse your logs using the Grok Processor"
aliases:
  - /logs/processing/processors/
further_reading:
- link: "/logs/log_configuration/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/logging_without_limits/"
  tag: "Documentation"
  text: "Logging without Limits*"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

## Overview

A processor executes within a [Pipeline][1] to complete a data-structuring action and generate attributes to enrich your logs.

{{< img src="logs/log_configuration/processor/processor_overview.png" alt="Processors" style="width:100%" >}}

In [log configuration settings][1], you can configure processors such as the [Grok parser](#grok-parser) or [date remapper](#remapper) to help extract, create, and remap attributes to enrich your logs and enhance faceted search.

**Notes**:

- Structured logs should be shipped in a valid format. If the structure contains invalid characters for parsing, these should be stripped at the Agent level using the [mask_sequences][2] feature.

- As a best practice, it is recommended to use at most 20 processors per pipeline.

## Grok parser

Create custom grok rules to parse the full message or a specific attribute of your raw event. For more information, see the [parsing section][2]. As a best practice, it is recommended to use at most 10 parsing rules within a grok processor.

{{< tabs >}}
{{% tab "UI" %}}

Define the Grok processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/grok_parser.png" alt="Grok Parser" style="width:80%;" >}}

Click **Parse my logs** to kickstart a set of three parsing rules for the logs flowing through the underlying pipeline. Refine attribute naming from there, and add new rules for other type of logs if needed. This feature requires that the corresponding logs are being indexed, and actually flowing in—you can temporarily deactivate or sample down exclusion filters to make this work for you.

Select a sample by clicking on it to trigger its evaluation against the parsing rule and display the result at the bottom of the screen.

Up to five samples can be saved with the processor, and each sample can be up to 5000 characters in length. All samples show a status (`match` or `no match`), which highlights if one of the parsing rules of the grok parser matches the sample.

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following Grok parser JSON payload:

```json
{
  "type": "grok-parser",
  "name": "Parsing Log message",
  "is_enabled": true,
  "source": "message",
  "samples": ["sample log 1", "sample log 2"],
  "grok": {"support_rules": "<SUPPORT_RULES>", "match_rules": "<MATCH_RULES>"}
}
```

| Parameter            | Type             | Required | Description                                             |
|----------------------|------------------|----------|---------------------------------------------------------|
| `type`               | String           | Yes      | Type of the processor.                                  |
| `name`               | String           | No       | Name of the processor.                                  |
| `is_enabled`         | Boolean          | No       | If the processors is enabled or not. Default: `false`.  |
| `source`             | String           | Yes      | Name of the log attribute to parse. Default: `message`. |
| `samples`            | Array of strings | No       | List of (up to 5) sample logs for this grok parser.     |
| `grok.support_rules` | String           | Yes      | List of Support rules for your grok parser.             |
| `grok.match_rules`   | String           | Yes      | List of Match rules for your grok parser.               |


[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Log date remapper

As Datadog receives logs, it timestamps them using the value(s) from any of these default attributes:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

If your logs have dates in an attribute that are not in this list, use the log date remapper processor to define their date attribute as the official log timestamp:

<div class="alert alert-info">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

If your logs don't have a timestamp that conforms to the formats listed above, use the grok processor to extract the epoch time from the timestamp to a new attribute. The date remapper uses the newly defined attribute.

To see how a custom date and time format can be parsed in Datadog, see [Parsing dates][3].

**Notes**:

* Log events can be submitted up to 18 hours in the past and two hours in the future.
* As of ISO 8601-1:2019, the basic format is `T[hh][mm][ss]` and the extended format is `T[hh]:[mm]:[ss]`. Earlier versions omitted the T (representing time) in both formats.
* If your logs don't contain any of the default attributes and you haven't defined your own date attribute, Datadog timestamps the logs with the date it received them.
* If multiple log date remapper processors are applied to a given log within the pipeline, the last one (according to the pipeline's order) is taken into account.

{{< tabs >}}
{{% tab "UI" %}}

Define the log date remapper processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/date_remapper.png" alt="Define a date attribute" style="width:80%;" >}}

{{< img src="logs/log_configuration/processor/date_remapper_example.png" alt="Date and time in the Log Explorer side panel" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following log date remapper JSON payload:

```json
{
  "type": "date-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official Date of the log",
  "is_enabled": false,
  "sources": ["<SOURCE_ATTRIBUTE_1>"]
}
```

| Parameter    | Type             | Required | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                |
| `name`       | String           | no       | Name of the processor.                                |
| `is_enabled` | Boolean          | no       | If the processors is enabled or not. Default: `false`. |
| `sources`    | Array of strings | Yes      | Array of source attributes.                           |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Log status remapper

Use the status remapper processor to assign attributes as an official status to your logs. For example, add a log severity level to your logs with the status remapper.

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt="Log severity after remapping" style="width:40%;" >}}

Each incoming status value is mapped as follows:

* Integers from 0 to 7 map to the [Syslog severity standards][4]
* Strings beginning with **emerg** or **f** (case-insensitive) map to **emerg (0)**
* Strings beginning with **a** (case-insensitive) map to **alert (1)**
* Strings beginning with **c** (case-insensitive) map to **critical (2)**
* Strings beginning with **e** (case-insensitive)—that do not match `emerg`—map to **error (3)**
* Strings beginning with **w** (case-insensitive) map to **warning (4)**
* Strings beginning with **n** (case-insensitive) map to **notice (5)**
* Strings beginning with **i** (case-insensitive) map to **info (6)**
* Strings beginning with **d**, **trace** or **verbose** (case-insensitive) map to **debug (7)**
* Strings beginning with **o** or **s**, or matching **OK** or **Success** (case-insensitive) map to **OK**
* All others map to **info (6)**

**Note**: If multiple log status remapper processors are applied to a given log within the pipeline, only the first one (according to the pipeline's order) is taken into account.

{{< tabs >}}
{{% tab "UI" %}}

Define the log status remapper processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/severity_remapper.png" alt="Log severity remapping" style="width:60%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following log status remapper JSON payload:

```json
{
  "type": "status-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official status of the log",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Parameter    | Type             | Required | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                |
| `name`       | String           | No       | Name of the processor.                                |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`. |
| `sources`    | Array of strings | Yes      | Array of source attributes.                           |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Service remapper

The service remapper processor assigns one or more attributes to your logs as the official service.

**Note**: If multiple service remapper processors are applied to a given log within the pipeline, only the first one (according to the pipeline's order) is taken into account.

{{< tabs >}}
{{% tab "UI" %}}

Define the log service remapper processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/service_remapper.png" alt="Service remapper processor" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following log service remapper JSON payload:

```json
{
  "type": "service-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official log service",
  "is_enabled": true,
  "sources": ["<SOURCE_ATTRIBUTE>"]
}
```

| Parameter    | Type             | Required | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                |
| `name`       | String           | No       | Name of the processor.                                |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`. |
| `sources`    | Array of strings | Yes      | Array of source attributes.                           |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Log message remapper

`message` is a key attribute in Datadog. Its value is displayed in the **Content** column of the Log Explorer to provide context on the log. You can use the search bar to find a log by the log message. 

Use the log message remapper processor to define one or more attributes as the official log message. Define more than one attribute for cases where the attributes might not exist and an alternative is available. For example, if the defined message attributes are `attribute1`, `attribute2`, and `attribute3`, and `attribute1` does not exist, then `attribute2` is used. Similarly, if `attribute2` does not exist, then `attribute3` is used.

To define message attributes, first use the [string builder processor](#string-builder-processor) to create a new string attribute for each of the attributes you want to use. Then, use the log message remapper to remap the string attributes as the message.

**Note**: If multiple log message remapper processors are applied to a given log within the pipeline, only the first one (according to the pipeline order) is taken into account.

{{< tabs >}}
{{% tab "UI" %}}

Define the log message remapper processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/message_processor.png" alt="Message processor" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following log message remapper JSON payload:

```json
{
  "type": "message-remapper",
  "name": "Define <SOURCE_ATTRIBUTE> as the official message of the log",
  "is_enabled": true,
  "sources": ["msg"]
}
```

| Parameter    | Type             | Required | Description                                           |
|--------------|------------------|----------|-------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                |
| `name`       | String           | No       | Name of the processor.                                |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`. |
| `sources`    | Array of strings | Yes      | Array of source attributes. Default: `msg`.            |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapper

The remapper processor remaps any source attribute(s) or tags to another target attribute or tag. For example, remap `user` by `firstname` to target your logs in the Log Explorer:

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="Attribute after remapping" style="width:60%;">}}

Constraints on the tag/attribute name are explained in the [attributes and tags documentation][5]. Some additional constraints, applied as `:` or `,`, are not allowed in the target tag/attribute name.

If the target of the remapper is an attribute, the remapper can also try to cast the value to a new type (`String`, `Integer` or `Double`). If the cast is not possible, the original type is kept.

**Note**: The decimal separator for `Double` need to be `.`.

{{< tabs >}}
{{% tab "UI" %}}

Define the remapper processor on the [**Pipelines** page][1]. For example, remap `user` to `user.firstname`.

{{< img src="logs/log_configuration/processor/remapper.png" alt="Attribute remapper processor" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following Remapper JSON payload:

```json
{
  "type": "attribute-remapper",
  "name": "Remap <SOURCE_ATTRIBUTE> to <TARGET_ATTRIBUTE>",
  "is_enabled": true,
  "source_type": "attribute",
  "sources": ["<SOURCE_ATTRIBUTE>"],
  "target": "<TARGET_ATTRIBUTE>",
  "target_type": "tag",
  "target_format": "integer",
  "preserve_source": false,
  "override_on_conflict": false
}
```

| Parameter              | Type             | Required | Description                                                                    |
|------------------------|------------------|----------|--------------------------------------------------------------------------------|
| `type`                 | String           | Yes      | Type of the processor.                                                         |
| `name`                 | String           | No      | Name of the processor.                                                         |
| `is_enabled`           | Boolean          | No      | If the processors is enabled or not. Default: `false`.                          |
| `source_type`          | String           | No      | Defines if the sources are from log `attribute` or `tag`. Default: `attribute`. |
| `sources`              | Array of strings | Yes      | Array of source attributes or tags                                             |
| `target`               | String           | Yes      | Final attribute or tag name to remap the sources to.                           |
| `target_type`          | String           | No      | Defines if the target is a log `attribute` or a `tag`. Default: `attribute`.    |
| `target_format`        | String           | No      | Defines if the attribute value should be cast to another type. Possible values: `auto`, `string`, or `integer`. Default: `auto`. When set to `auto`, no cast is applied.  |
| `preserve_source`      | Boolean          | No      | Remove or preserve the remapped source element. Default: `false`.               |
| `override_on_conflict` | Boolean          | No      | Override or not the target element if already set. Default: `false`.            |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## URL parser

The URL parser processor extracts query parameters and other important parameters from a URL. When setup, the following attributes are produced:

{{< img src="logs/processing/processors/url_processor.png" alt="Url Processor" style="width:80%;" >}}

{{< tabs >}}
{{% tab "UI" %}}

Define the URL parser processor on the [**Pipelines** page][1]:

{{< img src="logs/processing/processors/url_processor.png" alt="Url Processor Tile" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

```json
{
  "type": "url-parser",
  "name": "Parse the URL from http.url attribute.",
  "is_enabled": true,
  "sources": ["http.url"],
  "target": "http.url_details"
}
```

| Parameter    | Type             | Required | Description                                                                                                          |
|--------------|------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                                                                               |
| `name`       | String           | No       | Name of the processor.                                                                                               |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`.                                                                |
| `sources`    | Array of strings | No       | Array of source attributes. Default: `http.url`.                                                                      |
| `target`     | String           | Yes      | Name of the parent attribute that contains all the extracted details from the `sources`. Default: `http.url_details`. |

{{% /tab %}}
{{< /tabs >}}

## User-Agent parser

The user-agent parser processor takes a `useragent` attribute and extracts OS, browser, device, and other user data. When set up, the following attributes are produced:

{{< img src="logs/processing/processors/useragent_processor.png" alt="Useragent Processor" style="width:80%;">}}

**Note**: If your logs contain encoded user-agents (for example, IIS logs), configure this Processor to **decode the URL** before parsing it.

{{< tabs >}}
{{% tab "UI" %}}

Define the user-agent processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/useragent_processor.png" alt="Useragent Processor tile" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following user-agent parser JSON payload:

```json
{
  "type": "user-agent-parser",
  "name": "Parses <SOURCE_ATTRIBUTE> to extract all its User-Agent information",
  "is_enabled": true,
  "sources": ["http.useragent"],
  "target": "http.useragent_details",
  "is_encoded": false
}
```

| Parameter    | Type             | Required | Description                                                                                                                 |
|--------------|------------------|----------|-----------------------------------------------------------------------------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                                                                                      |
| `name`       | String           | No       | Name of the processor.                                                                                                      |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`.                                                                      |
| `sources`    | Array of strings | No       | Array of source attributes. Default: `http.useragent`.                                                                      |
| `target`     | String           | Yes      | Name of the parent attribute that contains all the extracted details from the `sources`. Default: `http.useragent_details`. |
| `is_encoded` | Boolean          | No       | Define if the source attribute is url encoded or not. Default: `false`.                                                     |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Category processor

Use the category processor to add a new attribute (without spaces or special characters in the new attribute name) to a log matching a provided search query. Then, use categories to create groups for an analytical view (for example, URL groups, machine groups, environments, and response time buckets).

**Notes**:

* The syntax of the query is the one in the [Logs Explorer][6] search bar. This query can be done on any log attribute or tag, whether it is a facet or not. Wildcards can also be used inside your query.
* Once the log has matched one of the processor queries, it stops. Make sure they are properly ordered in case a log could match several queries.
* The names of the categories must be unique.
* Once defined in the category processor, you can map categories to log status using the [log status remapper](#log-status-remapper).

{{< tabs >}}
{{% tab "UI" %}}

Define the category processor on the [**Pipelines** page][1]. For example, to categorize your web access logs based on the status code range value (`"OK" for a response code between 200 and 299, "Notice" for a response code between 300 and 399, ...`) add this processor:

{{< img src="logs/log_configuration/processor/category_processor.png" alt="category processor" style="width:80%;" >}}

This processor produces the following result:

{{< img src="logs/log_configuration/processor/category_processor_result.png" alt="category processor result" style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following category processor JSON payload:

```json
{
  "type": "category-processor",
  "name": "Assign a custom value to the <TARGET_ATTRIBUTE> attribute",
  "is_enabled": true,
  "categories": [
    {"filter": {"query": "<QUERY_1>"}, "name": "<VALUE_TO_ASSIGN_1>"},
    {"filter": {"query": "<QUERY_2>"}, "name": "<VALUE_TO_ASSIGN_2>"}
  ],
  "target": "<TARGET_ATTRIBUTE>"
}
```

| Parameter    | Type            | Required | Description                                                                                                |
|--------------|-----------------|----------|------------------------------------------------------------------------------------------------------------|
| `type`       | String          | Yes      | Type of the processor.                                                                                     |
| `name`       | String          | No       | Name of the processor.                                                                                     |
| `is_enabled` | Boolean         | No       | If the processors is enabled or not. Default: `false`                                                      |
| `categories` | Array of Object | Yes      | Array of filters to match or not a log and their corresponding `name` to assign a custom value to the log. |
| `target`     | String          | Yes      | Name of the target attribute which value is defined by the matching category.                              |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Arithmetic processor

Use the arithmetic processor to add a new attribute (without spaces or special characters in the new attribute name) to a log with the result of the provided formula. This remaps different time attributes with different units into a single attribute, or compute operations on attributes within the same log.

An arithmetic processor formula can use parentheses and basic arithmetic operators: `-`, `+`, `*`, `/`.

By default, a calculation is skipped if an attribute is missing. Select *Replace missing attribute by 0* to automatically populate missing attribute values with 0 to ensure that the calculation is done.

**Notes**:

* An attribute may be listed as missing if it is not found in the log attributes, or if it cannot be converted to a number.
* When using the operator `-`, add spaces around it because attribute names like `start-time` may contain dashes. For example, the following formula must include spaces around the `-` operator: `(end-time - start-time) / 1000`.
* If the target attribute already exists, it is overwritten by the result of the formula.
* Results are rounded up to the 9th decimal. For example, if the result of the formula is `0.1234567891`, the actual value stored for the attribute is `0.123456789`.
* If you need to scale a unit of measure, use the scale filter.

{{< tabs >}}
{{% tab "UI" %}}

Define the arithmetic processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/arithmetic_processor.png" alt="Arithmetic Processor" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following arithmetic processor JSON payload:

```json
{
  "type": "arithmetic-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "expression": "<ARITHMETIC_OPERATION>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": false
}
```

| Parameter            | Type    | Required | Description                                                                                                                                  |
|----------------------|---------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | String  | Yes      | Type of the processor.                                                                                                                       |
| `name`               | String  | No       | Name of the processor.                                                                                                                       |
| `is_enabled`         | Boolean | No       | If the processors is enabled or not. Default: `false`.                                                                                       |
| `expression`         | String  | Yes      | Arithmetic operation between one or more log attributes.                                                                                     |
| `target`             | String  | Yes      | Name of the attribute that contains the result of the arithmetic operation.                                                                  |
| `is_replace_missing` | Boolean | No       | If `true`, it replaces all missing attributes of `expression` by 0, `false` skip the operation if an attribute is missing. Default: `false`. |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## String builder processor

Use the string builder processor to add a new attribute (without spaces or special characters) to a log with the result of the provided template. This enables aggregation of different attributes or raw strings into a single attribute.

The template is defined by both raw text and blocks with the syntax `%{attribute_path}`.

**Notes**:

* This processor only accepts attributes with values or an array of values in the block (see examples in the UI section below.
* If an attribute cannot be used (object or array of object), it is replaced by an empty string or the entire operation is skipped depending on your selection.
* If a target attribute already exists, it is overwritten by the result of the template.
* Results of a template cannot exceed 256 characters.

{{< tabs >}}
{{% tab "UI" %}}

Define the string builder processor on the [**Pipelines** page][1]:

{{< img src="logs/log_configuration/processor/stringbuilder_processor.png" alt="String builder processor" style="width:80%;">}}

With the following log, use the template `Request %{http.method} %{http.url} was answered with response %{http.status_code}` to returns a result. For example:


```json
{
  "http": {
    "method": "GET",
    "status_code": 200,
    "url": "https://app.datadoghq.com/users"
  },
  "array_ids": [123, 456, 789],
  "array_users": [
    {"first_name": "John", "last_name": "Doe"},
    {"first_name": "Jack", "last_name": "London"}
  ]
}
```

Returns the following:

```text
Request GET https://app.datadoghq.com/users was answered with response 200
```

**Note**: `http` is an object and cannot be used in a block (`%{http}` fails), whereas `%{http.method}`, `%{http.status_code}`, or `%{http.url}` returns the corresponding value. Blocks can be used on arrays of values or on a specific attribute within an array. 

* For example, adding the block `%{array_ids}` returns:

   ```text
   123,456,789
   ```

* `%{array_users}` does not return anything because it is a list of objects. However, `%{array_users.first_name}` returns a list of `first_name`s contained in the array:

  ```text
  John,Jack
  ```

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following string builder processor JSON payload:

```json
{
  "type": "string-builder-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "template": "<STRING_BUILDER_TEMPLATE>",
  "target": "<TARGET_ATTRIBUTE>",
  "is_replace_missing": true
}
```

| Parameter            | Type    | Required | Description                                                                                                                                       |
|----------------------|---------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`               | String  | Yes      | Type of the processor.                                                                                                                            |
| `name`               | String  | No       | Name of the processor.                                                                                                                            |
| `is_enabled`         | Boolean | No       | If the processor is enabled or not, defaults to `false`.                                                                                          |
| `template`           | String  | Yes      | A formula with one or more attributes and raw text.                                                                                               |
| `target`             | String  | Yes      | The name of the attribute that contains the result of the template.                                                                               |
| `is_replace_missing` | Boolean | No       | If `true`, it replaces all missing attributes of `template` by an empty string. If `false`, skips the operation for missing attributes. Default: `false`. |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## GeoIP parser

The geoIP parser takes an IP address attribute and extracts continent, country, subdivision, or city information (if available) in the target attribute path.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/log_configuration/processor/geoip_processor.png" alt="GeoIP Processor" style="width:80%;">}}

Most elements contain a `name` and `iso_code` (or `code` for continent) attribute. `subdivision` is the first level of subdivision that the country uses such as "States" for the United States or "Departments" for France.

For example, the geoIP parser extracts location from the `network.client.ip` attribute and stores it into the `network.client.geoip` attribute:

{{< img src="logs/log_configuration/processor/geoip_example_blurred.png" alt="GeoIP example" style="width:60%;">}}

{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following geoIP parser JSON payload:

```json
{
  "type": "geo-ip-parser",
  "name": "Parse the geolocation elements from network.client.ip attribute.",
  "is_enabled": true,
  "sources": ["network.client.ip"],
  "target": "network.client.geoip"
}
```

| Parameter    | Type             | Required | Description                                                                                                               |
|--------------|------------------|----------|---------------------------------------------------------------------------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                                                                                    |
| `name`       | String           | No       | Name of the processor.                                                                                                    |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`.                                                                     |
| `sources`    | Array of strings | No       | Array of source attributes. Default: `network.client.ip`.                                                                  |
| `target`     | String           | Yes      | Name of the parent attribute that contains all the extracted details from the `sources`. Default: `network.client.geoip`.  |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Lookup processor

Use the lookup processor to define a mapping between a log attribute and a human readable value saved in a [Reference Table][7] or the processors mapping table.

For example, you can use the lookup processor to map an internal service ID into a human readable service name. Alternatively, you can use it to check if the MAC address that just attempted to connect to the production environment belongs to your list of stolen machines.

{{< tabs >}}
{{% tab "UI" %}}

The lookup processor performs the following actions:

* Looks if the current log contains the source attribute.
* Checks if the source attribute value exists in the mapping table.
  * If it does, creates the target attribute with the corresponding value in the table.
  * Optionally, if it does not find the value in the mapping table, it creates a target attribute with the default fallback value set in the `fallbackValue` field. You can manually enter a list of `source_key,target_value` pairs or upload a CSV file on the **Manual Mapping** tab. 
    
    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="Lookup processor" style="width:80%;">}}

    The size limit for the mapping table is 100Kb. This limit applies across all Lookup Processors on the platform. However, Reference Tables support larger file sizes.

  * Optionally, if it does not find the value in the mapping table, it creates a target attribute with the value of the reference table. You can select a value for a [Reference Table][101] on the **Reference Table** tab.
   
    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="Lookup processor" 
    style="width:80%;">}}


[101]: /integrations/guide/reference-tables/

{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following lookup processor JSON payload:

```json
{
  "type": "lookup-processor",
  "name": "<PROCESSOR_NAME>",
  "is_enabled": true,
  "source": "<SOURCE_ATTRIBUTE>",
  "target": "<TARGET_ATTRIBUTE>",
  "lookup_table": ["key1,value1", "key2,value2"],
  "default_lookup": "<DEFAULT_TARGET_VALUE>"
}
```

| Parameter        | Type             | Required | Description                                                                                                                                                              |
|------------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`           | String           | Yes      | Type of the processor.                                                                                                                                                   |
| `name`           | String           | No       | Name of the processor.                                                                                                                                                   |
| `is_enabled`     | Boolean          | Yes      | If the processor is enabled or not. Default: `false`.                                                                                                                     |
| `source`         | String           | Yes      | Source attribute used to perform the lookup.                                                                                                                             |
| `target`         | String           | Yes      | Name of the attribute that contains the corresponding value in the mapping list or the `default_lookup` if not found in the mapping list.                                |
| `lookup_table`   | Array of strings | Yes      | Mapping table of values for the source attribute and their associated target attribute values, formatted as [ "source_key1,target_value1", "source_key2,target_value2" ]. |
| `default_lookup` | String           | No       | Value to set the target attribute if the source value is not found in the list.                                                                                          |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Trace remapper

There are two ways to improve correlation between application traces and logs:

1. Follow the documentation on [how to inject a Trace ID in the application logs][8]. Log integrations take care of all the rest of the setup by default.

2. Use the trace remapper processor to define a log attribute as its associated trace ID.

{{< tabs >}}
{{% tab "UI" %}}

Define the trace remapper processor on the [**Pipelines** page][1]. Enter the Trace ID attribute path in the processor tile as follows:

{{< img src="logs/log_configuration/processor/trace_processor.png" alt="Trace ID processor" style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following trace remapper JSON payload:

```json
{
  "type": "trace-id-remapper",
  "name": "Define dd.trace_id as the official trace id associate to this log",
  "is_enabled": true,
  "sources": ["dd.trace_id"]
}
```

| Parameter    | Type             | Required | Description                                            |
|--------------|------------------|----------|--------------------------------------------------------|
| `type`       | String           | Yes      | Type of the processor.                                 |
| `name`       | String           | No       | Name of the processor.                                 |
| `is_enabled` | Boolean          | No       | If the processors is enabled or not. Default: `false`. |
| `sources`    | Array of strings | No       | Array of source attributes. Default: `dd.trace_id`.    |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

**Note**: Trace IDs and span IDs are not displayed in your logs or log attributes in the UI.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits is a trademark of Datadog, Inc.

[1]: /logs/log_configuration/pipelines/
[2]: /logs/log_configuration/parsing/
[3]: /logs/log_configuration/parsing/?tab=matchers#parsing-dates
[4]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[5]: /logs/log_collection/?tab=host#attributes-and-tags
[6]: /logs/search_syntax/
[7]: /integrations/guide/reference-tables/
[8]: /tracing/other_telemetry/connect_logs_and_traces/
