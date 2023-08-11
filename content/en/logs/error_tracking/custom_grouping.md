---
title: Custom Grouping
kind: documentation
description: Customize how error logs are grouped into issues.
further_reading:
  - link: 'https://www.datadoghq.com/blog/error-tracking/'
    tag: 'Blog'
    text: 'Make sense of application issues with Datadog Error Tracking'
  - link: '/logs/error_tracking/'
    tag: 'Documentation'
    text: 'Learn about Error Tracking for Logs'
---

## Overview

Error Tracking intelligently groups similar errors into issues with a default strategy. By using _custom fingerprinting_, you can gain full control over the grouping decision and customize the grouping behavior for your error logs.

Provide an `error.fingerprint` attribute that Error Tracking can use to group error logs into issues. While the value of the `error.fingerprint` attribute does not have any particular format or requirement, the content must be a string.

If `error.fingerprint` is provided, the grouping behavior follows these rules:

* Custom grouping takes precedence over the default strategy.
* Custom grouping can be applied only to a subset of your error logs and can coexist with the default strategy.
* The content of `error.fingerprint` is used as-is without any modification.
* Logs from the same service and with the same `error.fingerprint` attribute are grouped into the same issue.
* Logs with different `service` attributes are grouped into different issues.

## Setup

Custom grouping only needs an error log and an `error.fingerprint` string attribute.

If you aren't already collecting logs with Datadog, see the [Logs documentation][1] to set up logs.
Ensure that the `source` tag (specifying language) is properly configured.

### Example

If you're already logging in JSON format, add a new `error.fingerprint` attribute to your error log.

Here's an example in Python for a JSON-formatted logger:

```python
import logging
import json_log_formatter

formatter = json_log_formatter.JSONFormatter()

json_handler = logging.FileHandler(filename='/var/log/my-log.json')
json_handler.setFormatter(formatter)

logger = logging.getLogger('my_json')
logger.addHandler(json_handler)
logger.setLevel(logging.INFO)

logger.error('Error processing request', extra={'error.fingerprint': 'my-custom-grouping-material'})
```

In this case, `my-custom-grouping-material` is used to group these error logs into a single
issue in Error Tracking.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/log_collection/
