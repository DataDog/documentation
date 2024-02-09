---
title: Custom Grouping
kind: documentation
description: Customize how error spans are grouped into issues.
---

## Overview

Error Tracking intelligently groups similar errors into issues with a default strategy. By using _custom fingerprinting_, you can gain full control over the grouping decision and customize the grouping behavior for your error spans.

You can customize grouping by providing an `error.fingerprint` for the error. The fingerprint is provided in an attribute or tag, depending on the error source (see [Setup](#setup) for details). While the value of `error.fingerprint` does not have any particular format or requirement, the content must be a string.

If `error.fingerprint` is provided, the grouping behavior follows these rules:

* Custom grouping takes precedence over the default strategy.
* Custom grouping can be applied only to a subset of your errors and can coexist with the default strategy.
* The content of `error.fingerprint` is used as-is without any modification.
* Errors from the same service and with the same `error.fingerprint` attribute are grouped into the same issue.
* Errors with different `service` attributes are grouped into different issues.

## Setup

{{< tabs >}}
{{% tab "APM" %}}
Custom grouping only needs an error span and an `error.fingerprint` string span tag.

If you aren't already collecting APM traces with Datadog, see the [APM documentation][1] to set up APM.

### Example

If you're already sending APM spans, add a new `error.fingerprint` tag to your error span.

Here's an example in Python:

```python
with tracer.trace("throws.an.error") as span:
  span.set_tag('error.fingerprint', 'my-custom-grouping-material')
  raise Exception("Something went wrong")
```

Exception information is captured and attached to a span if there is one active when the exception is raised.
In this case, `my-custom-grouping-material` is used to group these error spans into a single
issue in Error Tracking.

[1]: /tracing/
{{% /tab %}}

{{% tab "Logs" %}}
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

[1]: /logs/log_collection/
{{% /tab %}}

{{% tab "RUM" %}}
In order to use custom grouping, you need the Datadog Browser SDK [v4.42.0 or later][3], a [browser RUM error][2], and an additional string attribute.

If you aren't already collecting Browser RUM events with Datadog, see the [Browser Monitoring setup documentation][1].

### Example

If you're already [collecting browser errors][2], it's possible to add the attribute by either:

* Adding a `dd_fingerprint` attribute to the error object:

```javascript
import { datadogRum } from '@datadog/browser-rum';
// Send a custom error with context
const error = new Error('Something went wrong');
error.dd_fingerprint = 'my-custom-grouping-fingerprint'
datadogRum.addError(error);
```

* Or, using the `beforeSend` callback with an `error.fingerprint` attribute:

```javascript
DD_RUM.init({
  ...
  beforeSend: () => {
    if (event.type === 'error') {
      event.error.fingerprint = 'my-custom-grouping-fingerprint'
    }
  },
})
```

In both cases, `my-custom-grouping-material` is used to group the Browser RUM errors into a single issue in Error Tracking.

[1]: /real_user_monitoring/
[2]: /real_user_monitoring/browser/collecting_browser_errors/
[3]: https://github.com/DataDog/browser-sdk/releases/tag/v4.42.0
[4]: /real_user_monitoring/error_tracking
{{% /tab %}}
{{< /tabs >}}