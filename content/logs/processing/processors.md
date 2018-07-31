---
title: Processors
kind: documentation
description: "Parse your logs using the Grok Processor"
---

{{< img src="logs/processing/processors/processors_overview.png" alt="original log" responsive="true">}}

A processor executes within a [pipeline][1] a data-structuring action ([Remapping an attribute](#remapper), [Grok parsing](#grok-parser)...) on a log.

The different kinds of processors are explained below.

## Grok Parser

Create custom grok rules to parse the full message or a specific attribute of your raw event:

{{< img src="logs/processing/processors/parser.png" alt="Parser" responsive="true" style="width:80%;" >}}

Read more about this in the [parsing section][2]

## Log Date Remapper

As Datadog receives logs, it timestamps them using the value(s) from any of these default attributes:

* `timestamp`
* `date`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `published_date`

If your logs put their dates in an attribute not in this list, use the log date Remapper processor to define their date attribute as the official log timestamp:

{{< img src="logs/processing/processors/log_date_remapper.png" alt="Log date Remapper" responsive="true" style="width:80%;" >}}

If your logs don't contain any of the default attributes and you haven't defined your own date attribute, Datadog timestamps the logs with the date it received them.  

## Log Status Remapper

Use this processor if you want to assign some attributes as the official status, just enter the attribute path in the processor tile as follow:

{{< img src="logs/processing/processors/severity_remapper_processor_tile.png" alt="Severity Remapper processor tile" responsive="true" style="width:80%;" >}}

It transforms this log:

{{< img src="logs/processing/processors/log_pre_severity.png" alt=" Log pre severity " responsive="true" style="width:40%;">}}

Into this log:

{{< img src="logs/processing/processors/log_post_severity_bis.png" alt=" Log post severity bis" responsive="true" style="width:40%;" >}}

However, beware that each incoming status value is mapped as follows:

* Integers from 0 to 7 map to the [Syslog severity standards][3]
* Strings beginning with **emerg** or **f** (case-insensitive) map to **emerg (0)**
* Strings beginning with **a** (case-insensitive) map to **alert (1)**
* Strings beginning with **c** (case-insensitive) map to **critical (2)**
* Strings beginning with **err** (case-insensitive) map to **error (3)**
* Strings beginning with **w** (case-insensitive) map to **warning (4)**
* Strings beginning with **n** (case-insensitive) map to **notice (5)**
* Strings beginning with **i** (case-insensitive) map to **info (6)**
* Strings beginning with **d**, **trace** or **verbose** (case-insensitive) map to **debug (7)**
* Strings matching **OK** or **Sucess** (case-insensitive) map to **OK**
* All others map to **info (6)**

## Remapper

This processor remaps any source attribute(s) or tag to another target attribute or tag, for instance here it remaps `user` to `user.firstname`

{{< img src="logs/processing/processors/attribute_remapper_processor_tile.png" alt="Attribute Remapper processor tile" responsive="true" style="width:80%;" >}}

It transforms this log:

{{< img src="logs/processing/processors/attribute_pre_remapping.png" alt="attribute pre remapping " responsive="true" style="width:40%;">}}

Into this log:

{{< img src="logs/processing/processors/attribute_post_remapping.png" alt="attribute post remapping " responsive="true" style="width:40%;">}}

Constraints on the tag/attribute name are explained in the [Tag Best Practice documentation][4]. Some additional constraints are applied as `:`, `/` or `,` are not allowed in the target tag/attribute name.

## URL Parser

This processor extracts query parameters and other important parameters from a URL. To use it, just enter the source attribute of your url:

These settings:

{{< img src="logs/processing/processors/url_processor_tile.png" alt="Url Processor Tile" responsive="true" style="width:80%;" >}}

Give the following results:

{{< img src="logs/processing/processors/url_processor.png" alt="Url Processor" responsive="true" style="width:80%;" >}}

## Useragent parser

UserAgent parser takes a useragent attribute and does its best to extract the OS, browser, device, etc...
It recognizes major bots like the Google Bot, Yahoo Slurp, Bing and others.

If your logs contain encoded useragents (as, for example, IIS logs do), configure this processor to **decode the URL** before parsing it.

These settings:

{{< img src="logs/processing/processors/useragent_processor_tile.png" alt="Useragent processor tile" responsive="true" style="width:80%;" >}}

Give the following results:

{{< img src="logs/processing/processors/useragent_processor.png" alt="Useragent processor" responsive="true" style="width:80%;">}}

## Category Processor

Use the Category Processor to add a new attribute (without space or special characters in the new attribute name) to a log matching a provided search query.
Categories are very useful to create meaningful groups which can be used in any analytical view (e.g. URL groups, Machine groups, environments, response time buckets, etc....).

For example to categories your web access logs depending of the status code range value (2xx for a response code between 200 and 299, 3xx for a response code between 300 and 399, ...) add this processor:

{{< img src="logs/processing/processors/category_processor.png" alt="Category processor" responsive="true" style="width:80%;" >}}

It produces the following result:

{{< img src="logs/processing/processors/category_processor_result.png" alt="Category processor result" responsive="true" style="width:80%;" >}}

**Important Note**: The query can be done on any log attribute or tag no matter if it is a facet or not, wildcards can also be used inside your query.
Once the log has matched one of the processor query, it stops. Make sure they are properly ordered in case a log could match several queries.

## Log Message Remapper

The message is a key attribute in Datadog. It is displayed in the message column of the log explorer and you can do full string search on it. Use this processor to define some attributes as the official log message, just enter the attribute path in the processor tile as follows:

{{< img src="logs/processing/processors/message_processor.png" alt="Message processor" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/pipelines
[2]: /logs/processing/parsing
[3]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[4]: /getting_started/tagging/#tags-best-practices