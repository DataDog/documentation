---
title: How to remap custom severity values to the official log status?
kind: faq
further_reading:
- link: "logs/log_collection/#custom-log-collection"
  tag: "Documentation"
  text: "Learn more about Log collection with the Agent"
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/processing/parsing/"
  tag: "Documentation"
  text: "Learn more about parsing"
---

By default, the [Log Status Remapper][1] relies on the [Syslog severity standards][2].
However there might be other systems having different severity values that you might want to remap on the official log status.
This is possible thanks to the [Category Processor][3] that defines a mapping between your custom values and the expected ones.

In this article, we show how to do this with 2 examples: Bunyan levels and web access logs.

## Web access logs

The status code of the request can be used to determine the log status. Our integrations use the following mapping:

* 2xx: OK
* 3xx: Notice
* 4xx: Warning
* 5xx: Error

Let's assume the status code of your log is stored in the `http.status_code` attribute.
Add a Category Processor in your Pipeline that creates a new attribute to reflect the above mapping:

{{< img src="logs/faq/category_processor.png" alt="Category Processor "  >}}

Then add a status remapper that uses the newly created attribute:

{{< img src="logs/faq/log_status_remapper.png" alt="log status remapper"  >}}

## Bunyan levels

Bunyan levels are similar to those of Syslog, but their values are multiplied by 10.

* 10 = TRACE
* 20 = DEBUG
* 30 = INFO
* 40 = WARN
* 50 = ERROR
* 60 = FATAL

Let's assume the bunyan level is stored in the `bunyan_level` attribute.
Add a Category Processor in your Pipeline that creates a new attribute to reflect the above mapping:

{{< img src="logs/faq/category_processor_bunyan.png" alt="category Processor  bunyan"  >}}

Then add a status remapper that uses the newly created attribute:

{{< img src="logs/faq/status_remapper_bunyan.png" alt="log status remapper bunyan"  >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/processors/#log-status-remapper
[2]: https://en.wikipedia.org/wiki/Syslog#Severity_level
[3]: /logs/processing/processors/#category-processor
