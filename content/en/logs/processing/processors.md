---
title: Processors
kind: documentation
description: "Parse your logs using the Grok Processor"
further_reading:
- link: "/logs/processing/pipelines/"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "/logs/logging_without_limits/"
  tag: "Documentation"
  text: "Logging without limit"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

## Overview

{{< img src="logs/processing/processors/processing_overview.png" alt="Processors" >}}

A [Processor][1] executes within a [Pipeline][2] to complete a data-structuring action ([Remapping an attribute][3], [Grok parsing][4], etc.) on a log.

**Note**: Structured logs should be shipped in a valid format. If the structure contains invalid characters for parsing, these should be stripped at the Agent level using the [mask_sequences][5] feature.

As a best practice, it is recommended to use at most 20 Processors per Pipeline.

## Grok parser

Create custom grok rules to parse the full message or [a specific attribute of your raw event][1]. For more information, see the [parsing section][3]. As a best practice, it is recommended to use at most 10 parsing rules within a grok Processor.

{{< tabs >}}
{{% tab "UI" %}}

Define the Grok processor in the [Datadog Log configuration page][1]:

{{< img src="logs/processing/processors/parser.png" alt="Parser" style="width:80%;" >}}

Up to five samples can be saved with the processor, and each sample can be up to 5000 characters in length. All samples show a status (`match` or `no match`), which highlights if one of the parsing rules of the grok parser matches the sample. Select a sample by clicking on it to trigger its evaluation against the parsing rule and display the result at the bottom of the screen.

Click **Parse my logs** to kickstart a set of three parsing rules for the logs flowing through the underlying pipeline. Fine tune attribute naming from there, and add new rules for other type of logs if needed. This feature requires that the corresponding logs are being indexed, and actually flowing in—you can temporarily deactivate or sample down exclusion filters to make this work for you.

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
| `type`               | String           | yes      | Type of the processor.                                  |
| `name`               | String           | no       | Name of the processor.                                  |
| `is_enabled`         | Boolean          | no       | If the processors is enabled or not, default: `false`.  |
| `source`             | String           | yes      | Name of the log attribute to parse, default: `message`. |
| `samples`            | Array of Strings | no       | List of (up to 5) sample logs for this grok parser.     |
| `grok.support_rules` | String           | yes      | List of Support rules for your grok parser.             |
| `grok.match_rules`   | String           | yes      | List of Match rules for your grok parser.               |


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

If your logs put their dates in an attribute not in this list, use the log date Remapper Processor to define their date attribute as the official log timestamp:

<div class="alert alert-info">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>


**Note**:

* **Log events can be submitted up to 18h in the past and 2h in the future**.
* If your logs don't contain any of the default attributes and you haven't defined your own date attribute, Datadog timestamps the logs with the date it received them.
* If multiple log date remapper processors can be applied to a given log, only the first one (according to the pipelines order) is taken into account.

{{< tabs >}}
{{% tab "UI" %}}

Define the Log Date remapper processor in the [Datadog Log configuration page][1]:

{{< img src="logs/processing/processors/log_date_remapper.png" alt="Log date Remapper"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following Log Date Remapper JSON payload:

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
| `type`       | String           | yes      | Type of the processor.                                |
| `name`       | String           | no       | Name of the processor.                                |
| `is_enabled` | Boolean          | no       | If the processors is enabled or not, default: `false` |
| `sources`    | Array of Strings | yes      | Array of source attributes.                           |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Log status remapper

Use this Processor if you want to assign some attributes as the official status. For example, it can transform this log:

{{< img src="logs/processing/processors/log_pre_severity.png" alt=" Log pre severity "  style="width:40%;">}}

Into this log:

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt=" Log post severity bis"  style="width:40%;" >}}

Each incoming status value is mapped as follows:

* Integers from 0 to 7 map to the [Syslog severity standards][6]
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

**Note**: If multiple log status remapper processors can be applied to a given log, only the first one (according to the pipelines order) is taken into account.

{{< tabs >}}
{{% tab "UI" %}}

Define the Log status remapper processor in the [Datadog Log configuration page][1]:

{{< img src="logs/processing/processors/severity_remapper_processor_tile.png" alt="Severity Remapper Processor tile"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following Log Status Remapper JSON payload:

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
| `type`       | String           | yes      | Type of the processor.                                |
| `name`       | String           | no       | Name of the processor.                                |
| `is_enabled` | Boolean          | no       | If the processors is enabled or not, default: `false` |
| `sources`    | Array of Strings | yes      | Array of source attributes.                           |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Service remapper

Use this processor if you want to assign one or more attributes as the official service.

**Note**: If multiple service remapper processors can be applied to a given log, only the first one (according to the pipeline order) is taken into account.

{{< tabs >}}
{{% tab "UI" %}}

Define the Log Service remapper processor in the [Datadog Log configuration page][1]:

{{< img src="logs/processing/processors/service_remapper_processor_tile.png" alt="Service Remapper Processor tile"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following Log Service Remapper JSON payload:

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
| `type`       | String           | yes      | Type of the processor.                                |
| `name`       | String           | no       | Name of the processor.                                |
| `is_enabled` | Boolean          | no       | If the processors is enabled or not, default: `false` |
| `sources`    | Array of Strings | yes      | Array of source attributes.                           |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Log message remapper

The message is a key attribute in Datadog. It is displayed in the message column of the Log Explorer and you can do full string search on it. Use this Processor to define one or more attributes as the official log message.

**Note**: If multiple log message remapper processors can be applied to a given log, only the first one (according to the pipeline order) is taken into account.

{{< tabs >}}
{{% tab "UI" %}}

Define the Log Message remapper processor in the [Datadog Log configuration page][1]:

{{< img src="logs/processing/processors/message_processor.png" alt="Message Processor"  style="width:80%;">}}

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
| `type`       | String           | yes      | Type of the processor.                                |
| `name`       | String           | no       | Name of the processor.                                |
| `is_enabled` | Boolean          | no       | If the processors is enabled or not, default: `false` |
| `sources`    | Array of Strings | yes      | Array of source attributes, default: `msg`            |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Remapper

The remapper processor remaps any source attribute(s) or tag to another target attribute or tag. It transforms this log:

{{< img src="logs/processing/processors/attribute_pre_remapping.png" alt="attribute pre remapping "  style="width:40%;">}}

Into this log:

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="attribute post remapping "  style="width:40%;">}}

Constraints on the tag/attribute name are explained in the [Tagging documentation][7]. Some additional constraints are applied as `:` or `,` are not allowed in the target tag/attribute name.

If the target of the remapper is an attribute, the remapper can also try to cast the value to a new type (`String`, `Integer` or `Double`). If the cast is not possible, the original type is kept (note: The decimal separator for `Double` need to be `.`)

{{< tabs >}}
{{% tab "UI" %}}

Define the remapper processor in the [Datadog Log configuration page][1]. For example, here, it remaps `user` to `user.firstname`

{{< img src="logs/processing/processors/attribute_remapper_processor_tile.png" alt="Attribute Remapper Processor tile"  style="width:80%;" >}}

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
| `type`                 | String           | yes      | Type of the processor.                                                         |
| `name`                 | String           | no       | Name of the processor.                                                         |
| `is_enabled`           | Boolean          | no       | If the processors is enabled or not, default: `false`                          |
| `source_type`          | String           | no       | Defines if the sources are from log `attribute` or `tag`, default: `attribute` |
| `sources`              | Array of Strings | yes      | Array of source attributes or tags                                             |
| `target`               | String           | yes      | Final attribute or tag name to remap the sources to.                           |
| `target_type`          | String           | no       | Defines if the target is a log `attribute` or a `tag`, default: `attribute`    |
| `target_format`        | String           | no       | Defines if the attribute value should be cast to another type. possible value: `auto`, `string`, `long`  or `integer`, default: `auto`. When set to `auto`, no cast is applied.  |
| `preserve_source`      | Boolean          | no       | Remove or preserve the remapped source element, default: `false`               |
| `override_on_conflict` | Boolean          | no       | Override or not the target element if already set, default: `false`            |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## URL parser

This Processor extracts query parameters and other important parameters from a URL. When setup, the following attributes are produced:

{{< img src="logs/processing/processors/url_processor.png" alt="Url Processor"  style="width:80%;" >}}

{{< tabs >}}
{{% tab "UI" %}}

Define the URL parser processor in the [Datadog Log configuration page][1]:

{{< img src="logs/processing/processors/url_processor_tile.png" alt="Url Processor Tile"  style="width:80%;" >}}

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
| `type`       | String           | yes      | Type of the processor.                                                                                               |
| `name`       | String           | no       | Name of the processor.                                                                                               |
| `is_enabled` | Boolean          | no       | If the processors is enabled or not, default: `false`                                                                |
| `sources`    | Array of Strings | no       | Array of source attributes, default: `http.url`                                                                      |
| `target`     | String           | yes      | Name of the parent attribute that contains all the extracted details from the `sources`, default: `http.url_details` |

{{% /tab %}}
{{< /tabs >}}

## User-Agent parser

The User-Agent parser takes a User-Agent attribute and extracts the OS, browser, device, and other user data. It recognizes major bots like the Google Bot, Yahoo Slurp, and Bing. When set up, the following attributes are produced:

{{< img src="logs/processing/processors/useragent_processor.png" alt="Useragent Processor"  style="width:80%;">}}

**Note**: If your logs contain encoded User-Agents (for example, IIS logs), configure this Processor to **decode the URL** before parsing it.

{{< tabs >}}
{{% tab "UI" %}}

Define the User-Agent processor in the [Datadog Log configuration page][1]:

{{< img src="logs/processing/processors/useragent_processor_tile.png" alt="Useragent Processor tile"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following User-Agent parser JSON payload:

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
| `type`       | String           | yes      | Type of the processor.                                                                                                      |
| `name`       | String           | no       | Name of the processor.                                                                                                      |
| `is_enabled` | Boolean          | no       | If the processors is enabled or not, default: `false`.                                                                      |
| `sources`    | Array of Strings | no       | Array of source attributes, default: `http.useragent`.                                                                      |
| `target`     | String           | yes      | Name of the parent attribute that contains all the extracted details from the `sources`, default: `http.useragent_details`. |
| `is_encoded` | Boolean          | no       | Define if the source attribute is url encoded or not, default: `false`.                                                     |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Category processor

Use the category processor to add a new attribute (without spaces or special characters in the new attribute name) to a log matching a provided search query.
Use categories to create groups for an analytical view (for example, URL groups, machine groups, environments, and response time buckets).

**Note**:

* The syntax of the query is the one of [Logs Explorer][8] search bar. The query can be done on any log attribute or tag, whether it is a facet or not. Wildcards can also be used inside your query.
* Once the log has matched one of the Processor queries, it stops. Make sure they are properly ordered in case a log could match several queries.
* The names of the categories must be unique.
* Once defined in the Category Processor, you can map categories to log status using the [Log Status Remapper][9].

{{< tabs >}}
{{% tab "UI" %}}

Define the Category Processor in the [Datadog Log configuration page][1]. For example, to categorize your web access logs based on the status code range value ("OK" for a response code between 200 and 299, "Notice" for a response code between 300 and 399, ...) add this Processor:

{{< img src="logs/processing/processors/category_processor.png" alt="Category Processor"  style="width:80%;" >}}

It produces the following result:

{{< img src="logs/processing/processors/category_processor_result.png" alt="Category Processor result"  style="width:80%;" >}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following Category processor JSON payload:

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
| `type`       | String          | yes      | Type of the processor.                                                                                     |
| `name`       | String          | no       | Name of the processor.                                                                                     |
| `is_enabled` | Boolean         | no       | If the processors is enabled or not, default: `false`                                                      |
| `categories` | Array of Object | yes      | Array of filters to match or not a log and their corresponding `name` to assign a custom value to the log. |
| `target`     | String          | yes      | Name of the target attribute which value is defined by the matching category.                              |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Arithmetic processor

Use the Arithmetic Processor to add a new attribute (without spaces or special characters in the new attribute name) to a log with the result of the provided formula.
This enables you to remap different time attributes with different units into a single attribute, or to compute operations on attributes within the same log.

The formula can use parentheses and the basic arithmetic operators: `-`, `+`, `*`, `/`.

By default, the calculation is skipped if an attribute is missing. Select "Replace missing attribute by 0" to automatically populate missing attribute values with 0 to ensure that the calculation is done.
An attribute is missing if it is not found in the log attributes, or if it cannot be converted to a number.

**Notes**:

* The operator `-` needs to be space split in the formula as it can also be contained in attribute names.
* If the target attribute already exists, it is overwritten by the result of the formula.
* Results are rounded up to the 9th decimal. For example, if the result of the formula is `0.1234567891`, the actual value stored for the attribute is `0.123456789`.
* If you need to scale a unit of measure, see [Scale Filter][10].

{{< tabs >}}
{{% tab "UI" %}}

Define the Arithmetic Processor in the [Datadog Log configuration page][1]:

{{< img src="logs/processing/processors/arithmetic_processor.png" alt="Arithmetic Processor"  style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following Arithmetic processor JSON payload:

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
| `type`               | String  | yes      | Type of the processor.                                                                                                                       |
| `name`               | String  | no       | Name of the processor.                                                                                                                       |
| `is_enabled`         | Boolean | no       | If the processors is enabled or not, default: `false`.                                                                                       |
| `expression`         | String  | yes      | Arithmetic operation between one or more log attributes.                                                                                     |
| `target`             | String  | yes      | Name of the attribute that contains the result of the arithmetic operation.                                                                  |
| `is_replace_missing` | Boolean | no       | If `true`, it replaces all missing attributes of `expression` by 0, `false` skip the operation if an attribute is missing. Default: `false`. |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## String builder processor

Use the string builder processor to add a new attribute (without spaces or special characters) to a log with the result of the provided template.
This enables aggregation of different attributes or raw strings into a single attribute.

The template is defined by both raw text and blocks with the syntax: `%{attribute_path}`.

**Notes**:

* The processor only accepts attributes with values or an array of values in the blocks (see examples in the [UI section](?tab=ui#string-builder-processor)).
* If an attribute cannot be used (object or array of object), it is replaced by an empty string or the entire operation is skipped depending on your selection.
* If the target attribute already exists, it is overwritten by the result of the template.
* Results of the template cannot exceed 256 characters.

{{< tabs >}}
{{% tab "UI" %}}

Define the string builder processor on the [Datadog log configuration page][1]:

{{< img src="logs/processing/processors/stringbuilder_processor.png" alt="String Builder Processor"  style="width:80%;">}}

**Example**

With the following log:

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

You can use the template: `Request %{http.method} %{http.url} was answered with response %{http.status_code}`, which returns the result:

```text
Request GET https://app.datadoghq.com/users was answered with response 200
```

**Objects**:

In the example log `http` is an object and cannot be used in a block (`%{http}` fails), whereas `%{http.method}`, `%{http.status_code}`, or `%{http.url}` returns the corresponding value.

**Arrays**:

Blocks can be used on arrays of values or on a specific attribute within an array. For the example log, adding the block `%{array_ids}` returns:

```text
123,456,789
```

Whereas `%{array_users}` does not return anything because it is a list of objects.
However, `%{array_users.first_name}` returns a list of `first_name` contained in the array:

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
| `is_replace_missing` | Boolean | No       | If `true`, it replaces all missing attributes of `template` by an empty string. If `false` (default), skips the operation for missing attributes. |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## GeoIP parser

The GeoIP parser takes an IP address attribute and extracts if available the Continent, Country, Subdivision, and City information in the target attribute path.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/processing/processors/geoip_processor.png" alt="GeoIP Processor"  style="width:80%;">}}

Most elements contains a `name` and `iso_code` (or `code` for continent) attribute. `subdivision` is the first level of subdivision that the country uses such as "States" for the United States or "Departments" for France.

Find below an example of the GeoIP Parser that extracts gelocation from the `network.client.ip` attribute and stores it into the `network.client.geoip` attribute:

{{< img src="logs/processing/processors/geoip_example.png" alt="GeoIP example"  style="width:60%;">}}

**Note**: This processor uses GeoLite2 data created by [MaxMind][1].

[1]: https://www.maxmind.com
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following Geo-IP parser JSON payload:

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
| `type`       | String           | yes      | Type of the processor.                                                                                                    |
| `name`       | String           | no       | Name of the processor.                                                                                                    |
| `is_enabled` | Boolean          | no       | If the processors is enabled or not, default: `false`                                                                     |
| `sources`    | Array of Strings | no       | Array of source attributes, default: `network.client.ip`                                                                  |
| `target`     | String           | yes      | Name of the parent attribute that contains all the extracted details from the `sources`, default: `network.client.geoip`  |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Lookup processor

Use the lookup processor to define a mapping between a log attribute and a human readable value saved in an [Enrichment Table (beta)][11] or the processors mapping table.
For example, you can use the lookup processor to map an internal service ID into a human readable service name.
Alternatively, you could also use it to check if the MAC address that just attempted to connect to the production environment belongs to your list of stolen machines.

{{< tabs >}}
{{% tab "UI" %}}

{{< img src="logs/processing/processors/lookup_processor.png" alt="Lookup processor"  style="width:80%;">}}

The processor performs the following actions:

* Looks if the current log contains the source attribute.
* Checks if the source attribute value exists in the mapping table.
  * If it does, creates the target attribute with the corresponding value in the table.
  * Optionally, if it does not find the value in the mapping table, creates a target attribute with the filled default value.

You can fill the mapping table by selecting an enrichment table or manually by entering a list of `source_key,target_value` pairs, or uploading a CSV file.

The size limit for the mapping table is 100Kb. This limit applies across all Lookup Processors on the platform, however, Enrichment tables support larger file sizes.

{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following Lookup Processor JSON payload:

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
| `type`           | String           | yes      | Type of the processor.                                                                                                                                                   |
| `name`           | String           | no       | Name of the processor.                                                                                                                                                   |
| `is_enabled`     | Boolean          | yes      | If the processor is enabled or not. Default: `false`                                                                                                                     |
| `source`         | String           | yes      | Source attribute used to perform the lookup.                                                                                                                             |
| `target`         | String           | yes      | Name of the attribute that contains the corresponding value in the mapping list or the `default_lookup` if not found in the mapping list.                                |
| `lookup_table`   | Array of strings | yes      | Mapping table of values for the source attribute and their associated target attribute values, formatted as [ "source_key1,target_value1", "source_key2,target_value2" ] |
| `default_lookup` | String           | no       | Value to set the target attribute if the source value is not found in the list.                                                                                          |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Trace remapper

There are two ways to improve correlation between application traces and logs:

1. Follow the documentation on [how to inject a Trace ID in the application logs][12] and by default log integrations take care of all the rest of the setup.

2. Use the Trace remapper processor to define a log attribute as its associated trace ID.

{{< tabs >}}
{{% tab "UI" %}}

Define the Trace remapper processor in the [Datadog Log configuration page][1]. Enter the Trace ID attribute path in the Processor tile as follows:

{{< img src="logs/processing/processors/trace_processor.png" alt="Trace Id Processor"  style="width:80%;">}}

[1]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "API" %}}

Use the [Datadog Log Pipeline API endpoint][1] with the following Trace remapper JSON payload:

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
| `type`       | String           | yes      | Type of the processor.                                 |
| `name`       | String           | no       | Name of the processor.                                 |
| `is_enabled` | Boolean          | no       | If the processors is enabled or not, default: `false`. |
| `sources`    | Array of Strings | no       | Array of source attributes, default: `dd.trace_id`.    |

[1]: /api/v1/logs-pipelines/
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/parsing/#advanced-settings
[2]: /logs/processing/pipelines/
[3]: /logs/processing/parsing/
[4]: /logs/processing/processors/?tab=ui#grok-parser
[5]: https://docs.datadoghq.com/agent/logs/advanced_log_collection/?tab=configurationfile#scrub-sensitive-data-from-your-logs
[6]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[7]: /logs/guide/log-parsing-best-practice/
[8]: /logs/search_syntax/
[9]: /logs/processing/processors/?tab=ui#log-status-remapper
[10]: /logs/processing/parsing/?tab=filter#matcher-and-filter
[11]: /logs/guide/enrichment-tables/
[12]: /tracing/connect_logs_and_traces/
