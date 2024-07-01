---
title: Python Log Collection
kind: documentation
aliases:
  - /logs/languages/python
further_reading:
- link: "https://www.datadoghq.com/blog/python-logging-best-practices/"
  tag: Blog
  text: How to collect, customize, and centralize Python logs
- link: /logs/log_configuration/processors
  tag: Documentation
  text: Learn how to process your logs
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: Learn more about parsing
- link: /logs/explorer/
  tag: Documentation
  text: Learn how to explore your logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: Documentation
  text: Log Collection Troubleshooting Guide
- link: "/glossary/#tail"
  tag: Glossary
  text: Glossary entry for "tail"  
---

## Overview

To send your Python logs to Datadog, configure a Python logger to log to a file on your host and then [tail][12] that file with the Datadog Agent.

## Configure your logger

Python logs can be complex to handle because of tracebacks. Tracebacks cause logs to be split into multiple lines, which makes them difficult to associate with the original log event. To address this issue, Datadog strongly recommends using a JSON formatter when logging so that you can:

* Ensure each stack trace is wrapped into the correct log.
* Ensure all the attributes of a log event are correctly extracted (severity, logger name, thread name, and so on).

See the setup examples for the following logging libraries:

* [JSON-log-formatter][1]
* [Python-json-logger][2]
* [django-datadog-logger][3]*

*The [Python logger][6] has an `extra` parameter for adding custom attributes. Use `DJANGO_DATADOG_LOGGER_EXTRA_INCLUDE` to specify a regex that matches the name of the loggers for which you want to add the `extra` parameter.

## Configure the Datadog Agent

Once [log collection][7] is enabled, set up [custom log collection][8] to tail your log files and send them to Datadog by doing the following:

1. Create a `python.d/` folder in the `conf.d/` Agent configuration directory. 
2. Create a file `conf.yaml` in the `conf.d/python.d/` directory with the following content:
    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "<PATH_TO_PYTHON_LOG>.log"
        service: "<SERVICE_NAME>"
        source: python
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
3. [Restart the Agent][5].
4. Run the [Agent's status subcommand][9] and look for `python` under the `Checks` section to confirm that logs are successfully submitted to Datadog.

If logs are in JSON format, Datadog automatically [parses the log messages][10] to extract log attributes. Use the [Log Explorer][11] to view and troubleshoot your logs.

## Connect your service across logs and traces

If APM is enabled for this application, connect your logs and traces by automatically adding trace IDs, span IDs, `env`, `service`, and `version` to your logs by [following the APM Python instructions][4].

**Note**: If the APM tracer injects `service` into your logs, it overrides the value set in the agent configuration.

Once this is done, the log should have the following format:

```xml
2019-01-07 15:20:15,972 DEBUG [flask.app] [app.py:100] [dd.trace_id=5688176451479556031 dd.span_id=4663104081780224235] - this is an example
```

If logs are in JSON format, trace values are automatically extracted if the values are at the top level or in the top level `extra` or `record.extra` blocks. The following are examples of valid JSON logs where trace values are automatically parsed.

```json
{
  "message":"Hello from the private method",
  "dd.trace_id":"18287620314539322434",
  "dd.span_id":"8440638443344356350",
  "dd.env":"dev",
  "dd.service":"logs",
  "dd.version":"1.0.0"
}
```

```json
{
  "message":"Hello from the private method",
  "extra":{
    "dd.trace_id":"18287620314539322434",
    "dd.span_id":"8440638443344356350",
    "dd.env":"dev",
    "dd.service":"logs",
    "dd.version":"1.0.0"
  }
}
```

```json
{
"message":"Hello from the private method",
  "record":{
    "extra":{
      "dd.trace_id":"1734396609740561719",
      "dd.span_id":"17877262712156101004",
      "dd.env":"dev",
      "dd.service":"logs",
      "dd.version":"1.0.0"
    }
  }
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.python.org/pypi/JSON-log-formatter/
[2]: https://github.com/madzak/python-json-logger
[3]: https://pypi.org/project/django-datadog-logger/
[4]: /tracing/other_telemetry/connect_logs_and_traces/python
[5]: /agent/configuration/agent-commands/
[6]: https://docs.python.org/3/library/logging.html#logging
[7]: /agent/logs/?tab=tailfiles#activate-log-collection
[8]: /agent/logs/?tab=tailfiles#custom-log-collection
[9]: /agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: /logs/log_configuration/parsing/
[11]: /logs/explorer/#overview
[12]: /glossary/#tail
