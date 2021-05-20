---
title: Python Tests
kind: documentation
further_reading:
    - link: "/ci/filename/"
      tag: "Documentation"
      text: "linktext"
---
## Supported CI providers

* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI

## Prerequisites

The Datadog Agent must be accessible by the environment you're using to run your tests on. Get one-step installation commands from the [Datadog app][1].

## Installing tracing

Follow the [installation instructions][2] for `dd-trace-py`, the Datadog trace library for Python.

## Enabling and configuring Pytest instrumentation

The `pytest` integration traces test executions.

Enable traced execution of tests using `pytest` runner by running `pytest --ddtrace` or by modifying any configuration file read by pytest (such as `pytest.ini` or `setup.cfg`) as follows:

```
[pytest]
ddtrace = 1
```
Set the following configuration settings:

`ddtrace.config.pytest["service"]`
: The service name reported by default for pytest traces. This option can also be set with the `DD_PYTEST_SERVICE` environment variable. 
: Default: `"pytest"`

`ddtrace.config.pytest["operation_name"]`
: The operation name reported by default for pytest traces. This option can also be set with the `DD_PYTEST_OPERATION_NAME` environment variable. 
: Default: `"pytest.test"`



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /tracing/setup_overview/setup/python/
