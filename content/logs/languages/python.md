---
title: Python log collection
kind: documentation
further_reading:
- link: "/logs/processing"
  tag: "Documentation"
  text: Learn how to process your logs
- link: "/logs/parsing"
  tag: "Documentation"
  text: Learn more about parsing
- link: "/logs/explore"
  tag: "Documentation"
  text: Learn how to explore your logs
- link: /logs/faq/log-collection-troubleshooting-guide
  tag: "FAQ"
  text: Log Collection Troubleshooting Guide
---

<div class="alert alert-info">
Datadog's Logs is currently available via public beta. You can apply for inclusion in the beta via <a href="https://www.datadoghq.com/log-management/">this form</a>.
</div>

## Overview

Use your favorite python logger to log into a file on your host. Then [monitor this file with your Datadog agent](/logs/languages/python/#configure-the-Datadog-agent) to send your logs to Datadog.

## Setup
We strongly recommend to use a JSON formatter when logging in order to fully benefits from Datadog functionalities, please refer to the two following loggers for JSON formatting:

- [JSON-log-formatter](https://pypi.python.org/pypi/JSON-log-formatter/0.1.0)
- [Python-json-logger](https://github.com/madzak/python-json-logger)

### Log into a file

Usage example with [JSON-log-formatter](https://pypi.python.org/pypi/JSON-log-formatter/0.1.0):

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

### Configure the Datadog agent

Create a file `conf.yaml` in the Agent's `python.d/` directory with the following content:

```
init_config:

instances:
    [{}]

#Log section
logs:

    # - type : (mandatory) type of log input source (tcp / udp / file)
    #   port / path : (mandatory) Set port if type is tcp or udp. Set path if type is file
    #   service : (mandatory) name of the service owning the log
    #   source : (mandatory) attribute that defines which integration is sending the logs
    #   sourcecategory : (optional) Multiple value attribute. Can be used to refine the source attribtue
    #   tags: (optional) add tags to each logs collected

  - type: file
    path: /path/to/your/python/log.log
    service: myapplication
    source: python
    sourcecategory: sourcecode
```

Then [Restart the Agent](/agent/faq/start-stop-restart-the-datadog-agent) to apply the configuration change.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}