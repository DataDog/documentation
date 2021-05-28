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

[Install the Datadog Agent to collect tests data][1].

## Installing tracing

Install the Python tracer by running:

```bash
pip install ddtrace
```

For more information, see the [Python tracer installation documentation][2].

## Instrumenting your Pytest tests

To enable instrumentation of `pytest` tests, add the `--ddtrace` option when running `pytest`:

```bash
pytest --ddtrace
```

You can also add the following configuration to any file used to configure `pytest` (such as `pytest.ini` or `setup.cfg`):

```ini
[pytest]
ddtrace = 1
```

## Configuration parameters

| Parameter  | Environment variable  | Default | Description       |
|------------|-----------------------|---------|-------------------|
| `ddtrace.config.pytest["service"]` | `DD_PYTEST_SERVICE` | `"pytest"` | The service name reported by default for pytest traces. |
| `ddtrace.config.pytest["operation_name"]` | `DD_PYTEST_OPERATION_NAME` | `"pytest.test"` | The operation name reported by default for pytest traces. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/python/
