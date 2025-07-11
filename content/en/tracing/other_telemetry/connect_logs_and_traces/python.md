---
title: Correlating Python Logs and Traces
description: "Connect your Python logs and traces to correlate them in Datadog."
code_lang: python
type: multi-code-lang
code_lang_weight: 20
aliases:
  - /tracing/connect_logs_and_traces/python
further_reading:
- link: "/tracing/manual_instrumentation/"
  tag: 'Documentation'
  text: "Instrument manually your application to create traces."
- link: "/tracing/opentracing/"
  tag: 'Documentation'
  text: "Implement Opentracing across your applications."
- link: "/tracing/glossary/"
  tag: 'Documentation'
  text: "Explore your services, resources, and traces"
- link: "https://www.datadoghq.com/blog/request-log-correlation/"
  tag: "Blog"
  text: "Correlate request logs with traces automatically"
- link: '/logs/guide/ease-troubleshooting-with-cross-product-correlation/'
  tag: 'Guide'
  text: 'Ease troubleshooting with cross product correlation.'
---

## Injection

### Standard library logging

To correlate your [traces][1] with your logs, complete the following steps:

  1. [Activate automatic instrumentation](#step-1---activate-automatic-instrumentation).
  2. [Include required attributes from the log record](#step-2---include-required-attributes).
  3. [Configure log collection](#step-3---configure-log-collection).

#### Step 1 - Activate automatic instrumentation

Activate automatic instrumentation using one of the following options:
 
Option 1: [Library Injection][5]:
  1. Set the environment variable `DD_LOGS_INJECTION=true` in the application `deployment/manifest` file.
  2. Follow the instructions in [Library Injection][5] to set up tracing.

Option 2: `ddtrace-run`:
  1. Set the environment variable `DD_LOGS_INJECTION=true` in the environment where the application is running.
  2. Import **ddtrace** into the application.
  3. Run the application with `ddtrace-run` (for example, `ddtrace-run python appname.py`).
     
Option 3: `patch`:
  1. Import **ddtrace** into the application.
  2. Add `ddtrace.patch(logging=True)` to the start of the application code.

#### Step 2 - Include required attributes

Update your log format to include the required attributes from the log record.


Include the ``dd.env``, ``dd.service``, ``dd.version``, ``dd.trace_id`` and
``dd.span_id`` attributes for your log record in the format string.

Here is an example using `logging.basicConfig` to configure the log injection:

``` python
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

#### Step 3 - Configure log collection

Ensure that files being tailed by the Datadog Agent have [Logs Agent configuration][2] with `source: python` so log pipelines can parse incoming logs. If `source` is set to a value other than `python`, you may need to add a [trace remapper][3] to the appropriate log processing pipeline for the correlation to work correctly.

To learn more about logs injection, read the [ddtrace documentation][6].

### No standard library logging

By default, `ddtrace.trace.tracer.log_correlation` returns `dd.env=<ENV> dd.service=<SERVICE> dd.version=<VERSION> dd.trace_id=<TRACE_ID> dd.span_id=<SPAN_ID>`.

```python
from ddtrace import tracer

log_correlation_dict = tracer.get_log_correlation_context()
```
As an illustration of this approach, the following example defines a function as a *processor* in `structlog` to add tracer fields to the log output:

``` python
import ddtrace
from ddtrace import tracer

import structlog

def tracer_injection(logger, log_method, event_dict):
    # get correlation ids from current tracer context
    event_dict.update(tracer.get_log_correlation_context())
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

**Note**: If you are not using a [Datadog Log Integration][7] to parse your logs, custom log parsing rules need to ensure that `dd.trace_id` and `dd.span_id` are being parsed as strings and remapped using the [Trace Remapper][3]. For more information, see [Correlated Logs Not Showing Up in the Trace ID Panel][4].

[See the Python logging documentation][2] to ensure that the Python Log Integration is properly configured so that your Python logs are automatically parsed.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/glossary/#trace
[2]: /logs/log_collection/python/#configure-the-datadog-agent
[3]: /logs/log_configuration/processors/#trace-remapper
[4]: /tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[5]: /tracing/trace_collection/library_injection_local/
[6]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#logs-injection
[7]: https://docs.datadoghq.com/logs/log_collection/?tab=cloudintegration
