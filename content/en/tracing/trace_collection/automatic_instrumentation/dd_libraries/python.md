---
title: Tracing Python Applications
code_lang: python
type: multi-code-lang
code_lang_weight: 10
aliases:
    - /tracing/python/
    - /tracing/languages/python/
    - /agent/apm/python/
    - /tracing/setup/python
    - /tracing/setup_overview/python
    - /tracing/setup_overview/setup/python
    - /tracing/trace_collection/dd_libraries/python/
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-py'
      tag: "Source Code"
      text: 'Source code'
    - link: 'https://ddtrace.readthedocs.io/en/stable/'
      tag: 'External Site'
      text: 'API Docs'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
    - link: 'tracing/'
      tag: 'Documentation'
      text: 'Advanced Usage'
---
## Compatibility requirements
For a full list of Datadog's Python version and framework support (including legacy and maintenance versions), read the [Compatibility Requirements][1] page.

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][13].

### Instrument your application

After you install and configure your Datadog Agent, the next step is to add the tracing library directly in the application to instrument it. Read more about [compatibility information][1].

To begin tracing applications written in Python, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

**Note:** This command requires pip version `18.0.0` or greater. For Ubuntu, Debian, or another package manager, update your pip version with the following command:

```python
pip install --upgrade pip
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```shell
ddtrace-run python app.py
```

Once you've finished setup and are running the tracer with your application, you can run `ddtrace-run --info` to check that configurations are working as expected. Note that the output from this command does not reflect configuration changes made during runtime in code.

## Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][3] for details.

The connection for traces can also be configured in code:

```python
from ddtrace import tracer

# Network sockets
tracer.configure(
    https=False,
    hostname="custom-hostname",
    port="1234",
)

# Unix domain socket configuration
tracer.configure(
    uds_path="/var/run/datadog/apm.socket",
)
```

The connection for stats can also be configured in code:

```python
from ddtrace import tracer

# Network socket
tracer.configure(
  dogstatsd_url="udp://localhost:8125",
)

# Unix domain socket configuration
tracer.configure(
  dogstatsd_url="unix:///var/run/datadog/dsd.socket",
)
```

### Upgrading to v3
# **Migration Guide: Upgrading from dd-trace-py v2 to v3**

We are happy to announce the release of v3.0.0 of ddtrace. This release drops support for Python 3.7 and many previously-deprecated parts of the library interface.

The 2.x release line enters Maintenance Mode with the release of 3.0.0, meaning that it will only receive bugfix changes on its last few minor releases, and 2.21 will be the last 2.x minor version. See the [versioning policy](https://docs.datadoghq.com/tracing/trace_collection/compatibility/python/#releases) for support level definitions.

---

## **Summary of Significant Changes**

* Removed support for Python 3.7 from the library

### **CI Visibility**

* The new pytest plugin is now the default.  
* Module, suite, and test names are now parsed from `item.nodeid`.  
* Test names now include the class name (`TestClass::test_method`) for class-based tests.  
* Test skipping is now done at the suite level.  
* The `DD_PYTEST_USE_NEW_PLUGIN_BETA` environment variable is no longer used.

### **LLM Observability**

* Removed support for `DD_LLMOBS_APP_NAME`.  
* The `parameters` argument in `LLMObs.annotate()` has been removed. Use `metadata` instead.  
* Dropped support for OpenAI 0.x and Langchain v0.0.x.

### **Tracing**

* Removed all deprecated interfaces from integrations.  
* `DD_TRACE_PROPAGATION_STYLE=b3 single header` is no longer supported. Use `b3` instead.  
* Dropped support for multiple Tracer instances. The global tracer instance `ddtrace.tracer` must be used.  
* Removed deprecated parameters from `Tracer.configure(...)`.  
* Dropped support for several deprecated tracing configurations. See “Environment Variables” section below for details.

## **Recommended Pre-Upgrade Steps**

Before upgrading to v3, check for deprecation warnings in your application using the latest v2 release (**2.21.0**):

### **Detect Deprecation Warnings in Tests**

Enable warnings as errors in `pytest`:

```
pytest -W "error::ddtrace.DDTraceDeprecationWarning" tests.py
```

### **Detect Deprecation Warnings in Applications**

Set the following environment variable to enable all deprecation warnings:

```
PYTHONWARNINGS=all python app.py
```

### **Environment Variables**

The following environment variables have been removed or replaced in v3. Use the table below to update your configuration:

| v2 | Removed in v3  | Replaced/Changed in v3 |
| :---- | :---- | :---- |
| **LLM Observability** |  |  |
| `DD_LLMOBS_APP_NAME` |  | Use `DD_LLMOBS_ML_APP` instead |
| `_DD_LLMOBS_EVALUATOR_SAMPLING_RULES` |  | Use `DD_LLMOBS_EVALUATOR_SAMPLING_RULES ` instead |
| `_DD_LLMOBS_EVALUATORS ` |  | Use `DD_LLMOBS_EVALUATORS ` instead |
| **Tracing** |  |  |
| `DD_ANALYTICS_ENABLED` | No replacement, this setting is now a no-op. Datadog Analytics is no longer supported. See the [ingestion controls documentation](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=python) for more detail.|  |
| `DD_HTTP_CLIENT_TAG_QUERY_STRING` |  | Use `DD_TRACE_HTTP_CLIENT_TAG_QUERY_STRING`. |
| `DD_TRACE_ANALYTICS_ENABLED` | No replacement, this setting is now a no-op. Datadog Analytics is no longer supported. See the [ingestion controls documentation](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=python) for more detail. |  |
| `DD_TRACE_METHODS` (using `[]` notation) |  | Must use `:` notation instead, For example: `mod.submod:method1,method2;mod.submod:Class.method1`. ([docs](https://ddtrace.readthedocs.io/en/stable/configuration.html?highlight=dd_trace_methods#DD_TRACE_METHODS)) |
| `DD_TRACE_PROPAGATION_STYLE=”b3 single header”` |  | Use `DD_TRACE_PROPAGATION_STYLE=b3` for identical behavior |
| `DD_TRACE_SAMPLE_RATE` |  | Use `DD_TRACE_SAMPLING_RULES` ([docs](https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_mechanisms/?tab=python#in-tracing-libraries-user-defined-rules)). |
| `DD_TRACE_SPAN_AGGREGATOR_RLOCK` | No replacement (feature removed). Config variable is now a no-op. |  |
| **CI Visibility** |  |  |
| `DD_PYTEST_USE_NEW_PLUGIN_BETA` | No replacement (new pytest plugin is not in beta anymore). |  |

Use the following patterns to identify the deprecated environment variables in a code base:

```
git grep -P -e "DD_LLMOBS_APP_NAME" \
  -e "_DD_LLMOBS_EVALUATOR_SAMPLING_RULES" \
  -e "_DD_LLMOBS_EVALUATORS" \
  -e "DD_TRACE_PROPAGATION_STYLE=.*b3 single header" \
  -e "DD_TRACE_SAMPLE_RATE" \
  -e "DD_TRACE_API_VERSION=v0.3" \
  -e "DD_ANALYTICS_ENABLED" \
  -e "DD_TRACE_ANALYTICS_ENABLED" \
  -e "DD_HTTP_CLIENT_TAG_QUERY_STRING" \
  -e "DD_TRACE_SPAN_AGGREGATOR_RLOCK" \
  -e "DD_TRACE_METHODS=.*\[\]"
```

Replace deprecated settings with the recommended alternatives where applicable.

**NOTE**: The changes to environment variables apply only to the configuration of the dd-trace-py library and not the Datadog Agent.

### **Legacy Interfaces**

The following methods and module attributes have been removed or changed. Unless noted, removal means that the functionality pointed to by the removed interface has been disabled.

| v2 | v3 |
| :---- | :---- |
| **Tracing** |  |
| `Tracer.configure(enabled: Optional[bool] = None, hostname: Optional[str] = None, port: Optional[int] = None, uds_path: Optional[str] = None, https: Optional[bool] = None, sampler: Optional[BaseSampler] = None, context_provider: Optional[DefaultContextProvider] = None, wrap_executor: Optional[Callable] = None, priority_sampling: Optional[bool] = None, settings: Optional[Dict[str, Any]] = None, dogstatsd_url: Optional[str] = None, writer: Optional[TraceWriter] = None, partial_flush_enabled: Optional[bool] = None, partial_flush_min_spans: Optional[int] = None, api_version: Optional[str] = None, compute_stats_enabled: Optional[bool] =  appsec_enabled: Optional[bool] = None, iast_enabled: Optional[bool] = None, appsec_standalone_enabled: Optional[bool] = None, trace_processors: Optional[List[TraceProcessor]] = None )` | `Tracer.configure(context_provider: Optional[BaseContextProvider] = None, compute_stats_enabled: Optional[bool] = None, appsec_enabled: Optional[bool] = None, iast_enabled: Optional[bool] = None, apm_tracing_disabled: Optional[bool] = None, trace_processors: Optional[List[TraceProcessor]] = None)` |
| `ddtrace.opentracer.tracer.Tracer()._dd_tracer` | `ddtrace.tracer` |
| `ddtrace.tracer.sampler.rules[].choose_matcher(lambda: True)` | `ddtrace.tracer.sampler.rules[].choose_matcher(“foo”)` Callables and regex patterns are no longer allowed as arguments to `choose_matcher` |
| `Span.sampled` | `Span.context.sampling_priority > 0` |
| **LLM Observability** |  |
| `LLMObs.annotate(parameters=foo)` | `LLMObs.annotate(metadata=foo)` |

### **Python 3.13 Support**

Much of the library’s functionality has been compatible with Python 3.13 since version 2.20. Some pieces of functionality do not yet work with Python 3.13. Here’s what does not work under Python 3.13 as of dd-trace-py 3.0. 'Not tested' indicates that while the feature may be compatible with Python 3.13, its functionality has not been verified, as it is not included in our automated test coverage.

* `dd-trace-py` doesn’t work on Windows with Python 3.13  
* Appsec Threat Detection is not tested against Django, Flask, or FastAPI with 3.13  
* Automatic Service Naming is not tested with 3.13  
* The following products are not tested with 3.13:  
  * Code Coverage  
  * Appsec IAST  
  * Data Streams Monitoring  
  * CI Visibility  
  * Continuous Profiling  
* The following integrations are not tested with 3.13:  
  * `anthropic`
  * `consul`
  * `freezegun`
  * `gevent`
  * `google_generativeai`
  * `gunicorn`
  * `langchain`  
  * `mysqlclient`  
  * `opentracing`  
  * `psycopg`  
  * `psycopg2`  
  * `pymysql`  
  * `pytest` 
  * `pytest-bdd`  
  * `pytest-benchmark`  
  * `sanic`  
  * `selenium`  
  * `sqlite3`  
  * `starlette`  
  * `tornado`  
  * `vertexai`

---

By following these guidelines, you can transition to dd-trace-py v3 gradually, ensuring minimal disruption to your services while taking advantage of the latest features and improvements. Happy migrating!


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /tracing/trace_collection/library_config/python/
[4]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[5]: https://ddtrace.readthedocs.io/en/v1.0.0/release_notes.html
[11]: /tracing/trace_collection/library_injection_local/
[13]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
