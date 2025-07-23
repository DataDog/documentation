---
title: Capturing Handled Exceptions In Python Applications
code_lang: python
type: multi-code-lang
code_lang_weight: 10
---

## Compatibility requirements
This feature is available on `Python3.10+` and `ddtrace 3.8.0+`.

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][1]. You also need to [add the tracing library][2] directly in the application to instrument it.

### Automatic instrumentation

To enable automatic reporting of handled errors, you can set one of these two environment variables:

- ``DD_ERROR_TRACKING_HANDLED_ERRORS``. Accepted values are: `user`, `third_party` or ,`all`.
This environment variable enables reporting of handled errors respectively from user code, third party packages or both.
- ``DD_ERROR_TRACKING_HANDLED_ERRORS_INCLUDE`` = ``module1, module2...``.
List the modules from which handled errors should be reported. You need to specify the full name of the module. For instance, to instrument the module `security` in your `mysite` app, you need to specify
`mysite.security`

Handled errors will be reported in Error Tracking and attached to spans through [span events][3].

If you are running `Python3.10` or `Python3.11` and you want to instrument the ``__main__`` module, you need to add:

```Python
from ddtrace.errortracking._handled_exceptions.bytecode_reporting import instrument_main

if __name__ == "__main__":
  instrument_main()
```

This code should be added after the functions definitions that contain handled errors.

### Manual instrumentation

You can report handled errors manually using ``span.record_exception(e)``:

```Python
from ddtrace import tracer

try:
    raise ValueError("foo")
except ValueError as e:
    span = tracer.current_span()
    if span:
        span.record_exception(e)
```

This call will create a span event on the span with the error information and will report the error to Error Tracking.
You can also provide additional attributes using:

```Python
span.record_exception(e, {"foo": "bar"})
```

[1]: /error_tracking/backend/getting_started/#getting-started-with-backend-error-tracking
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python/
[3]: /tracing/trace_collection/custom_instrumentation/python/otel/#adding-span-events
