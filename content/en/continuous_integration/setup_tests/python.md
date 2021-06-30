---
title: Python Tests
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---
## Compatibility

Supported Python interpreters:
* Python >= 2.7 and >= 3.5

Supported test frameworks:
* pytest >= 3.0

## Prerequisites

[Install the Datadog Agent to collect tests data][1].

## Installing tracing

Install the Python tracer by running:

{{< code-block lang="bash" >}}
pip install "ddtrace>=0.50.0rc4"
{{< /code-block >}}

For more information, see the [Python tracer installation documentation][2].

## Instrumenting your pytest tests

To enable instrumentation of `pytest` tests, add the `--ddtrace` option when running `pytest`:

{{< code-block lang="bash" >}}
pytest --ddtrace
{{< /code-block >}}

You can also add the following configuration to any file used to configure `pytest` (such as `pytest.ini` or `setup.cfg`):

{{< code-block lang="ini" >}}
[pytest]
ddtrace = 1
{{< /code-block >}}

## Configuration parameters

`ddtrace.config.pytest["service"]`
: The service name reported by default for pytest traces.<br/>
**Environment variable**: `DD_PYTEST_SERVICE`<br/>
**Default**: `"pytest"`

`ddtrace.config.pytest["operation_name"]`
: The operation name reported by default for pytest traces.<br/>
**Environment variable**: `DD_PYTEST_OPERATION_NAME`<br/>
**Default**: `"pytest.test"`

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/python/
