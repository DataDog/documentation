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
* pytest >= 4.0.0

## Prerequisites

[Install the Datadog Agent to collect tests data][1].

## Installing the Python tracer

Install the Python tracer by running:

{{< code-block lang="bash" >}}
pip install "ddtrace>=0.50.0rc4"
{{< /code-block >}}

For more information, see the [Python tracer installation documentation][2].

## Instrumenting your tests

To enable instrumentation of `pytest` tests, add the `--ddtrace` option when running `pytest`, specifiying the name of the service or library under test in the `DD_SERVICE` environment variable, and the environment where tests are being run (i.e. `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable:

{{< code-block lang="bash" >}}
DD_SERVICE=my-python-app DD_ENV=ci pytest --ddtrace
{{< /code-block >}}

Instead of passing the `--ddtrace` option to `pytest`, you can also add the following configuration to any file used to configure `pytest` (such as `pytest.ini` or `setup.cfg`):

{{< code-block lang="ini" filename="pytest.ini" >}}
[pytest]
ddtrace = 1
{{< /code-block >}}

## Additional configuration settings

The following is a list of the most important configuration settings that can be used with the tracer, either in code or using environment variables:

`ddtrace.config.service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: `"pytest"`<br/>
**Example**: `my-python-app`

`ddtrace.config.env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `(empty)`<br/>
**Examples**: `local`, `ci`

The following configuration settings can be passed in as parameters to `tracer.configure()`, or using environment variables:

`enabled`
: Setting this to `false` completely disables the instrumentation.<br/>
**Environment variable**: `DD_TRACE_ENABLED`<br/>
**Default**: `true`

`hostname`
: The Datadog Agent hostname.<br/>
**Environment variable**: `DD_AGENT_HOST`<br/>
**Default**: `localhost`

`port`
: The Datadog Agent trace collection port.<br/>
**Environment variable**: `DD_TRACE_AGENT_PORT`<br/>
**Default**: `8126`

All other [Datadog Tracer configuration][3] options can also be used.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/python/
[3]: /tracing/setup_overview/setup/python/?tab=containers#configuration
