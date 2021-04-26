---
title: Connecting Python Logs and Traces
kind: documentation
description: "Connect your Python logs and traces to correlate them in Datadog."
further_reading:
- link: "/tracing/manual_instrumentation/"
  tag: 'Documentation'
  text: "Instrument manually your application to create traces."
- link: "/tracing/opentracing/"
  tag: 'Documentation'
  text: "Implement Opentracing across your applications."
- link: "/tracing/visualization/"
  tag: 'Documentation'
  text: "Explore your services, resources, and traces"
- link: "https://www.datadoghq.com/blog/request-log-correlation/"
  tag: "Blog"
  text: "Correlate request logs with traces automatically"
---

## Automatically Inject Trace and Span IDs

Enable injection with the environment variable `DD_LOGS_INJECTION=true` when using `ddtrace-run`.
If you have configured your tracer with `DD_ENV`, `DD_SERVICE`, and `DD_VERSION`, then `env`, `service`, and `version` will also be added automatically. Learn more about [unified service tagging][1].

**Note**: The standard library `logging` is supported for auto-injection. Any libraries, such as `json_log_formatter`, that extend the standard library module are also supported for auto-injection. `ddtrace-run` calls `logging.basicConfig` before executing your application. If the root logger has a handler configured, your application must modify the root logger and handler directly.

## Manually Inject Trace and Span IDs

### With Standard Library Logging

If you prefer to manually correlate your [traces][2] with your logs, patch your `logging` module by updating your log formatter to include the ``dd.trace_id`` and ``dd.span_id`` attributes from the log record.

Similarly, include ``dd.env``, ``dd.service``, and ``dd.version`` as attributes for your log record.

The configuration below is used by the automatic injection method and is supported by default in the Python Log Integration:

``` python
from ddtrace import patch_all; patch_all(logging=True)
import logging
from ddtrace import tracer

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')
logging.basicConfig(format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

@tracer.wrap()
def hello():
    log.info('Hello, World!')

hello()
```

### Without Standard Library Logging

If you are not using the standard library `logging` module, you can use the `ddtrace.helpers.get_correlation_ids()` to inject tracer information into your logs.
As an illustration of this approach, the following example defines a function as a *processor* in `structlog` to add tracer fields to the log output:

``` python
import ddtrace
from ddtrace.helpers import get_correlation_ids

import structlog

def tracer_injection(logger, log_method, event_dict):
    # get correlation ids from current tracer context
    trace_id, span_id = get_correlation_ids()

    # add ids to structlog event dictionary
    event_dict['dd.trace_id'] = trace_id or 0
    event_dict['dd.span_id'] = span_id or 0

    # add the env, service, and version configured for the tracer
    event_dict['dd.env'] = ddtrace.config.env or ""
    event_dict['dd.service'] = ddtrace.config.service or ""
    event_dict['dd.version'] = ddtrace.config.version or ""

    return event_dict

structlog.configure(
    processors=[
        tracer_injection,
        structlog.processors.JSONRenderer()
    ]
)
log = structlog.get_logger()
```

Once the logger is configured, executing a traced function that logs an event yields the injected tracer information:

```text
>>> traced_func()
{"event": "In tracer context", "dd.trace_id": 9982398928418628468, "dd.span_id": 10130028953923355146, "dd.env": "dev", "dd.service": "hello", "dd.version": "abc123"}
```

**Note**: If you are not using a [Datadog Log Integration][3] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id` and `dd.span_id` are being parsed as strings. More information can be found in the [FAQ on this topic][4].

[See the Python logging documentation][3] to ensure that the Python Log Integration is properly configured so that your Python logs are automatically parsed.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging
[2]: /tracing/visualization/#trace
[3]: /logs/log_collection/python/#configure-the-datadog-agent
[4]: /tracing/faq/why-cant-i-see-my-correlated-logs-in-the-trace-id-panel/?tab=custom
