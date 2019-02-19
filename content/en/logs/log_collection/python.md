---
title: Python log collection
kind: documentation
aliases:
  - /logs/languages/python
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/faq/log-collection-troubleshooting-guide"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
---

## Overview

Use your favorite python logger to log into a file on your host. Then [monitor this file with your Datadog Agent][1] to send your logs to Datadog.

## Setup

Python logs are quite complex to handle, mainly because of tracebacks. They are split into multiple lines which make them difficult to associate with the original log event.  
To address this use case we strongly recommend you use a JSON formatter when logging in order to:

* Ensure each stack_trace is properly wrapped into the correct log
* Ensure that all the attributes of a log event are properly extracted (severity, logger name, thread name, etc...)
 
Here are setup examples for the two following logging libraries:

- [JSON-log-formatter][2]
- [Python-json-logger][3]

### Inject trace IDs in your logs

If APM is enabled for this application and you wish to improve the correlation between application logs and traces, [follow these instructions][4] to automatically add trace and span ids in your logs.

Once this is done, the log should have the following format:

```xml
2019-01-07 15:20:15,972 DEBUG [flask.app] [app.py:100] [dd.trace_id=5688176451479556031 dd.span_id=4663104081780224235] - this is an example
```

Then [configure the Datadog Agent](#configure-the-datadog-agent) to collect python logs from the file.

### Log into a file

{{< tabs >}}
{{% tab "JSON_log-formatter" %}}

Usage example with [JSON-log-formatter][1]:

```python
import logging

import json_log_formatter

formatter = json_log_formatter.JSONFormatter()

json_handler = logging.FileHandler(filename='/var/log/my-log.json')
json_handler.setFormatter(formatter)

logger = logging.getLogger('my_json')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)

logger.info('Sign up', extra={'referral_code': '52d6ce'})
```

The log file will contain the following log record (inline).
```json
{
    "message": "Sign up",
    "time": "2015-09-01T06:06:26.524448",
    "referral_code": "52d6ce"
}
```
[1]: https://pypi.python.org/pypi/JSON-log-formatter/0.1.0
{{% /tab %}}
{{% tab "Python-json-logger" %}}

Usage example with [Python-json-logger][1]:

```python
    import logging
    from pythonjsonlogger import jsonlogger

    logger = logging.getLogger()

    logHandler = logging.StreamHandler()
    formatter = jsonlogger.JsonFormatter()
    logHandler.setFormatter(formatter)
    logger.addHandler(logHandler)
```
 
Once the [handler is configured][2], the log file contains the following log record (inline):

```json
{
    "threadName": "MainThread",
    "name": "root",
    "thread": 140735202359648,
    "created": 1336281068.506248,
    "process": 41937,
    "processName": "MainProcess",
    "relativeCreated": 9.100914001464844,
    "module": "tests",
    "funcName": "testFormatKeys",
    "levelno": 20,
    "msecs": 506.24799728393555,
    "pathname": "tests/tests.py",
    "lineno": 60,
    "asctime": ["12-05-05 22:11:08,506248"],
    "message": "testing logging format",
    "filename": "tests.py",
    "levelname": "INFO",
    "special": "value",
    "run": 12
}
```

[1]: https://github.com/madzak/python-json-logger
[2]: https://github.com/madzak/python-json-logger#customizing-fields
{{% /tab %}}
{{< /tabs >}}

### Configure the Datadog Agent

Create a file `conf.yaml` in the Agent's `python.d/` directory with the following content:

```yaml
init_config:

instances:

##Log section
logs:

    ## - type : file (mandatory) type of log input source (tcp / udp / file)
    ##   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    ##   service : (mandatory) name of the service owning the log
    ##   source : (mandatory) attribute that defines which integration is sending the logs
    ##   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribute
    ##   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/python/log.log
    service: myapplication
    source: python
    sourcecategory: sourcecode
    # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

Then [Restart the Agent][5] to apply the configuration change.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/python/#configure-the-Datadog-agent
[2]: https://pypi.python.org/pypi/JSON-log-formatter/0.1.0
[3]: https://github.com/madzak/python-json-logger
[4]: https://docs.datadoghq.com/tracing/advanced_usage/?tab=python#correlate-traces-and-logs
[5]: /agent/faq/agent-commands
