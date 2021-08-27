---
title: Python log collection
kind: documentation
aliases:
  - /logs/languages/python
further_reading:
- link: "https://www.datadoghq.com/blog/python-logging-best-practices/"
  tag: "Blog"
  text: "How to collect, customize, and centralize Python logs"
- link: "/logs/log_configuration/processors"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/log_configuration/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "/logs/explorer/"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "/logs/faq/log-collection-troubleshooting-guide/"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
---

## Overview

Use your favorite Python logger to log into a file on your host. Then monitor the file with the Datadog Agent to send your logs to Datadog.

## Configure your logger

Python logs are quite complex to handle, mainly because of tracebacks. They are split into multiple lines which make them difficult to associate with the original log event.
To address this use case it is strongly recommended to use a JSON formatter when logging in order to:

* Ensure each stack_trace is properly wrapped into the correct log
* Ensure all the attributes of a log event are properly extracted (severity, logger name, thread name, etc.)

Here are setup examples for the following logging libraries:

* [JSON-log-formatter][1]
* [Python-json-logger][2]
* [django-datadog-logger][3]

## Connect your service across logs and traces

If APM is enabled for this application, connect your logs and traces by automatically adding trace IDs, span IDs, `env`, `service`, and `version` to your logs by [following the APM Python instructions][4].

**Note**: If the APM tracer injects `service` into your logs, it overrides the value set in the agent configuration.

Once this is done, the log should have the following format:

```xml
2019-01-07 15:20:15,972 DEBUG [flask.app] [app.py:100] [dd.trace_id=5688176451479556031 dd.span_id=4663104081780224235] - this is an example
```

Then [configure the Datadog Agent](#configure-the-datadog-agent) to collect Python logs from the file.

### Log into a file

{{< tabs >}}
{{% tab "JSON-log-formatter" %}}

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

The log file contains the following log record (inline):

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

logHandler = logging.FileHandler(filename='/var/log/my-log.json')
formatter = jsonlogger.JsonFormatter()
logHandler.setFormatter(formatter)
logger.addHandler(logHandler)
logger.setLevel(logging.INFO)

logger.info('Sign up', extra={'referral_code': '52d6ce'})
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

Create a file `conf.yaml` in the Agent's `conf.d/python.d/` directory with the following content:

```yaml
init_config:

instances:

##Log section
logs:

  - type: file
    path: "<PATH_TO_PYTHON_LOG>.log"
    service: "<YOUR_APPLICATION>"
    source: python
    sourcecategory: sourcecode
    # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
    #log_processing_rules:
    #  - type: multi_line
    #    name: new_log_start_with_date
    #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
```

[Restart the Agent][5] to apply the configuration changes.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pypi.python.org/pypi/JSON-log-formatter/0.1.0
[2]: https://github.com/madzak/python-json-logger
[3]: https://pypi.org/project/django-datadog-logger/
[4]: /tracing/connect_logs_and_traces/python
[5]: /agent/guide/agent-commands/
