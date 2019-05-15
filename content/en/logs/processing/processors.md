---
title: Processors
kind: documentation
description: "Parse your logs using the Grok Processor"
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Discover Datadog Pipelines"
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: "Logging without limit"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

{{< img src="logs/processing/processors/processors_overview.png" alt="original log" responsive="true">}}

A Processor executes within a [pipeline][1] a data-structuring action ([Remapping an attribute](#remapper), [Grok parsing](#grok-parser)...) on a log.

The different kinds of Processors are explained below.

## Grok Parser
{{< tabs >}}
{{% tab "UI" %}}

Create custom grok rules to parse the full message or a specific attribute of your raw event:

{{< img src="logs/processing/processors/parser.png" alt="Parser" responsive="true" style="width:80%;" >}}

Read more about this in the [parsing section][1]

[1]: 
{{% /tab %}}
{{% tab "API" %}}

```javascript
{
type: grok-parser
name: ''
enabled: true
source: message // name of the log attribute that is parsed (defaulted to `message`)
grok: list of SupportRules (optional) and Match rules
  supportRules: |
    _date %{date("yyyy-MM-dd HH:mm:ss"):timestamp}
    _date_ms %{date("yyyy-MM-dd HH:mm:ss,SSS"):timestamp}
    _date_slf4j %{date("yyyy-MM-dd HH:mm:ss.SSS"):timestamp}
    _duration %{integer:duration}
    _thread_name %{notSpace:logger.thread_name}
    _status %{word:level}
    _logger_name %{notSpace:logger.name}
    _context %{notSpace:logger.context}
    _line %{integer:line}
  matchRules: |
    java_slf4j %{_date_slf4j}\s+\[%{_thread_name}\]\s+%{_status}\s+%{_logger_name}\s*(%{_context}\s*)?- (?>%{word:dd.trace_id} %{word:dd.span_id} - )?%{data:message}((\n|\t)%{data:error.stack})?

    #this is a comment
    java_log4j %{_date} %{_status}\s+%{_logger_name}:%{_line}\s+- (?>%{word:dd.trace_id} %{word:dd.span_id} - )?%{data:message}((\n|\t)%{data:error.stack})?
}
```

{{% /tab %}}
{{< /tabs >}}

## Log Date Remapper

{{< tabs >}}
{{% tab "UI" %}}
As Datadog receives logs, it timestamps them using the value(s) from any of these default attributes:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

If your logs put their dates in an attribute not in this list, use the log date Remapper Processor to define their date attribute as the official log timestamp:

{{< img src="logs/processing/processors/log_date_remapper.png" alt="Log date Remapper" responsive="true" style="width:80%;" >}}

If your logs don't contain any of the default attributes and you haven't defined your own date attribute, Datadog timestamps the logs with the date it received them.

<div class="alert alert-info">
The recognized date formats are: <a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>, <a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (the milliseconds EPOCH format)</a>, and <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a>.
</div>

{{% /tab %}}
{{% tab "API" %}}

```json
{
"type": "date-remapper"
"name": "Define timestamp as the official timestamp of the log"
"enabled": true
"sources": ["timestamp"] // list of source attributes, the first existing one is used
}
```

{{% /tab %}}
{{< /tabs >}}

## Log Status Remapper

{{< tabs >}}
{{% tab "UI" %}}
Use this Processor if you want to assign some attributes as the official status. Just enter the attribute path in the Processor tile as follows:

{{< img src="logs/processing/processors/severity_remapper_processor_tile.png" alt="Severity Remapper Processor tile" responsive="true" style="width:80%;" >}}

It transforms this log:

{{< img src="logs/processing/processors/log_pre_severity.png" alt=" Log pre severity " responsive="true" style="width:40%;">}}

Into this log:

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt=" Log post severity bis" responsive="true" style="width:40%;" >}}

However, be aware that each incoming status value is mapped as follows:

* Integers from 0 to 7 map to the [Syslog severity standards][1]
* Strings beginning with **emerg** or **f** (case-insensitive) map to **emerg (0)**
* Strings beginning with **a** (case-insensitive) map to **alert (1)**
* Strings beginning with **c** (case-insensitive) map to **critical (2)**
* Strings beginning with **err** (case-insensitive) map to **error (3)**
* Strings beginning with **w** (case-insensitive) map to **warning (4)**
* Strings beginning with **n** (case-insensitive) map to **notice (5)**
* Strings beginning with **i** (case-insensitive) map to **info (6)**
* Strings beginning with **d**, **trace** or **verbose** (case-insensitive) map to **debug (7)**
* Strings matching **OK** or **Success** (case-insensitive) map to **OK**
* All others map to **info (6)**

[1]: 
{{% /tab %}}
{{% tab "API" %}}

```json
{
   "type": "status-remapper",
   "name": "Define level as the official status of the log",
   "enabled": true,
   "sources": [
      "level"
   ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Service Remapper

{{< tabs >}}
{{% tab "UI" %}}

Use this Processor if you want to assign one or more attributes as the official service. Define the attribute(s) in the Processor tile as follows:

{{< img src="logs/processing/processors/service_remapper_processor_tile.png" alt="Service Remapper Processor tile" responsive="true" style="width:80%;" >}}

{{% /tab %}}
{{% tab "API" %}}

```json
{
   "type": "service-remapper",
   "name": "Define appname as the official log service",
   "enabled": true,
   "sources": [
      "appname"
   ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Log Message Remapper

{{< tabs >}}
{{% tab "UI" %}}

The message is a key attribute in Datadog. It is displayed in the message column of the Log Explorer and you can do full string search on it. Use this Processor to define one or more attributes as the official log message. Define the attribute(s) in the Processor tile as follows:

{{< img src="logs/processing/processors/message_processor.png" alt="Message Processor" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{% tab "API" %}}

```json
{
   "type": "message-remapper",
   "name": "Define msg as the official message of the log",
   "enabled": true,
   "sources": [
      "msg"
   ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Remapper

{{< tabs >}}
{{% tab "UI" %}}

This Processor remaps any source attribute(s) or tag to another target attribute or tag. For instance, here, it remaps `user` to `user.firstname`

{{< img src="logs/processing/processors/attribute_remapper_processor_tile.png" alt="Attribute Remapper Processor tile" responsive="true" style="width:80%;" >}}

It transforms this log:

{{< img src="logs/processing/processors/attribute_pre_remapping.png" alt="attribute pre remapping " responsive="true" style="width:40%;">}}

Into this log:

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="attribute post remapping " responsive="true" style="width:40%;">}}

Constraints on the tag/attribute name are explained in the [Tag Best Practice documentation][1]. Some additional constraints are applied as `:` or `,` are not allowed in the target tag/attribute name.

[1]: 
{{% /tab %}}
{{% tab "API" %}}

```json
{
"type": "attribute-remapper"
"sourceType": "attribute" // (Optional) defaulted to `attribute`, defines if the sources are from log attributes or tags
"sources": ["dyno"] // list of source, can be a list of attributes or tags, the first existing one is used
"target": "dyno" // Final attribute or tag name for the first source element that exist
"targetType": "tag" // (Optional) defaulted to `attribute`, define if the target is a log attribute or a tag
"preserveSource": false // `true` or `false`, remove or preserve the remapped source element
"overrideOnConflict": false // `true` or `false`, override or not the target element if already set
}
```

{{% /tab %}}
{{< /tabs >}}

## URL Parser

{{< tabs >}}
{{% tab "UI" %}}

This Processor extracts query parameters and other important parameters from a URL. To use it, just enter the source attribute of your url:

These settings:

{{< img src="logs/processing/processors/url_processor_tile.png" alt="Url Processor Tile" responsive="true" style="width:80%;" >}}

Give the following results:

{{< img src="logs/processing/processors/url_processor.png" alt="Url Processor" responsive="true" style="width:80%;" >}}

{{% /tab %}}
{{% tab "API" %}}
```javascript
{
"type": url-parser
"name": "<PROCESSOR_NAME>"
"enabled": true
"sources": ["http.url"] // list of sources attribute, the first existing one is used
"target": "http.url_details" //  Name of the parent attribute that will contain all the extracted details from the source
}
```

{{% /tab %}}
{{< /tabs >}}

## User-Agent parser

{{< tabs >}}
{{% tab "UI" %}}

The User-Agent parser takes a User-Agent attribute and does its best to extract the OS, browser, device, etc...
It recognizes major bots like the Google Bot, Yahoo Slurp, Bing, and others.

If your logs contain encoded User-Agents (as, for example, IIS logs do), configure this Processor to **decode the URL** before parsing it.

These settings:

{{< img src="logs/processing/processors/useragent_processor_tile.png" alt="Useragent Processor tile" responsive="true" style="width:80%;" >}}

Give the following results:

{{< img src="logs/processing/processors/useragent_processor.png" alt="Useragent Processor" responsive="true" style="width:80%;">}}

{{% /tab %}}
{{% tab "API" %}}

```json
{
"type": "user-agent-parser",
"name": "",
"enabled": true,
"sources": ["http.useragent"], // list of sources attribute, the first existing one is used
"target": "http.useragent_details", // Name of the parent attribute that will contain all the extracted details from the source
"encoded": false // `true` or `false`, define if the source attribute is url encoded or not
}
```


{{% /tab %}}
{{< /tabs >}}

## Category Processor

{{< tabs >}}
{{% tab "UI" %}}

Use the Category Processor to add a new attribute (without spaces or special characters in the new attribute name) to a log matching a provided search query.
Categories are very useful to create meaningful groups which can be used in any analytical view (e.g. URL groups, Machine groups, environments, response time buckets, etc....).

For example to categorize your web access logs depending of the status code range value (2xx for a response code between 200 and 299, 3xx for a response code between 300 and 399, ...) add this Processor:

{{< img src="logs/processing/processors/category_processor.png" alt="Category Processor" responsive="true" style="width:80%;" >}}

It produces the following result:

{{< img src="logs/processing/processors/category_processor_result.png" alt="Category Processor result" responsive="true" style="width:80%;" >}}

**Important Note**: The query can be done on any log attribute or tag, whether it is a facet or not. Wildcards can also be used inside your query.
Once the log has matched one of the Processor queries, it stops. Make sure they are properly ordered in case a log could match several queries.

{{% /tab %}}
{{% tab "API" %}}

```json
{
   "type": "category-processor",
   "name": "",
   "enabled": true,
   "categories": [ // list of filter and corresponding name
      {
         "filter": {
            "query": "@http.status_code:[200 TO 299]"
         },
         "name": "OK"
      },
      {
         "filter": {
            "query": "@http.status_code:[300 TO 399]"
         },
         "name": "notice"
      },
      {
         "filter": {
            "query": "@http.status_code:[400 TO 499]"
         },
         "name": "warning"
      },
      {
         "filter": {
            "query": "@http.status_code:[500 TO 599]"
         },
         "name": "error"
      }
   ],
   "target": "http.status_category" // Name of the target attribute which value is defined by the matching category
}
```

{{% /tab %}}
{{< /tabs >}}

## Arithmetic processor

{{< tabs >}}
{{% tab "UI" %}}

Use the Arithmetic Processor to add a new attribute (without spaces or special characters in the new attribute name) to a log with the result of the provided formula.
This enables you to remap different time attributes with different units into a single attribute, or to compute operations on attributes within the same log.

The formula can use parentheses and the basic arithmetic operators: `-`, `+`, `*`, `/`.

Example:

{{< img src="logs/processing/processors/arithmetic_processor.png" alt="Arithmetic Processor" responsive="true" style="width:80%;">}}

By default, the calculation is skipped if an attribute is missing. Select "Replace missing attribute by 0" to automatically populate missing attribute values with 0 to ensure that the calculation is done.
An attribute is missing if it is not found in the log attributes, or if it cannot be converted to a number.

**Notes**:

* The operator `-` needs to be space split in the formula as it can also be contained in attribute names.
* If the target attribute already exists, it is overwritten by the result of the formula.

{{% /tab %}}
{{% tab "API" %}}

```json
{
"type": "arithmetic-processor"
"name": "<PROCESSOR_NAME>"
"enabled": true
"expression": "(attribute1 - attribute2)" // Arithmetic operation between log attributes
"target": "<TARGET_ATTRIBUTE>" // Name of the attribute that contains the result of the arithmetic operation
"replaceMissing": false // `true` replaces all missing element of the expression by 0, `false` skip the operation if an attribute is missing
}
```

{{% /tab %}}
{{< /tabs >}}

## Trace Remapper

{{< tabs >}}
{{% tab "UI" %}}

There are two ways to improve correlation between application traces and logs:

1. Follow the documentation on [how to inject a trace id in the application logs][1] and by default log integrations take care of all the rest of the setup.

2. Use the Trace Remapper processor to define a log attribute as its associated trace id by entering the attribute path in the Processor tile as follows:

{{< img src="logs/processing/processors/trace_processor.png" alt="Trace Id Processor" responsive="true" style="width:80%;">}}

[1]: 
{{% /tab %}}
{{% tab "API" %}}

```json
{
   "type": "trace-id-remapper",
   "name": "Define dd.trace_id as the official trace id associate to this log",
   "enabled": true,
   "sources": [
      "dd.trace_id"
   ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/pipelines
