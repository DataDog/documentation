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

The tracing library can be configured through environment variables. This is the recommended approach for setting the Agent host, port, and other settings.

For a comprehensive list of configuration options, including Unified Service Tagging, see the [Library Configuration][3] documentation.

## Upgrading to dd-trace-py v4

Version 4.0.0 of `dd-trace-py` drops support for Python 3.8 and 32-bit linux. It also removes previously deprecated APIs. This guide provides steps to help you upgrade your application.

With the release of `v4.0.0`, the `3.x` release line is in maintenance mode. Only critical bug fixes are backported. For more details, see the [versioning support policy][14].

### Step 1: Detect deprecations

To ensure a smooth transition, first upgrade to the latest v3 release (`3.19.0`) and use the following tools to find any deprecated code that breaks in v4.

#### In tests

Run `pytest` with warnings enabled as errors to identify areas in your test suite that need updates:

```sh
pytest -W "error::ddtrace.DDTraceDeprecationWarning" tests.py
```

#### In applications

Set the`PYTHONWARNINGS` environment variable to surface deprecation warnings when you run your application.

```sh
PYTHONWARNINGS=all python app.py
```

### Step 2: Address breaking changes

After identifying potential issues, review the following breaking changes. Update your code to be compatible with v4 before proceeding with the upgrade.

- Starting with ddtrace v4.0.0, Datadog Agent v7.63.0 or newer is required.
- Support for ddtrace with Python 3.8 is removed after being deprecated in the 3.0 release line. Use ddtrace 4.x with Python 3.9 or newer.
- 32-bit linux is no longer supported. Contact support@datadoghq.com if this blocks upgrading dd-trace-py.
- mongoengine
  - Drops support for the `ddtrace.Pin` object with mongoengine. With this change, the ddtrace library no longer directly supports mongoengine. Mongoengine is supported through the `pymongo` integration.
- CI Visibility
  - Removed deprecated entry points for the `pytest_benchmark` and `pytest_bdd` integrations. These plugins are supported by the regular `pytest` integration.
- dynamic instrumentation
  - removed the deprecated `DD_DYNAMIC_INSTRUMENTATION_UPLOAD_FLUSH_INTERVAL` variable.
- exception replay
  - removed the deprecated `DD_EXCEPTION_DEBUGGING_ENABLED` variable.
- tracing
  - Deprecated methods have been removed
    - `Span.set_tag_str` has been removed, use `Span.set_tag` instead.
    - `Span.set_struct_tag` has been removed.
    - `Span.get_struct_tag` has been removed.
    - `Span._pprint` has been removed
    - `Span.finished` setter was removed, use `Span.finish()` method instead.
    - `Tracer.on_start_span` method has been removed.
    - `Tracer.deregister_on_start_span` method has been removed.
    - `ddtrace.trace.Pin` has been removed.
    - `Span.finish_with_ancestors` was removed with no replacement.
  - Some methods have had their type signatures changed
    - `Span.set_tag` typing is `set_tag(key: str, value: Optional[str] = None) -> None`
    - `Span.get_tag` typing is `get_tag(key: str) -> Optional[str]`
    - `Span.set_tags` typing is `set_tags(tags: dict[str, str]) -> None`
    - `Span.get_tags` typing is `get_tags() -> dict[str, str]`
    - `Span.set_metric` typing is `set_metric(key: str, value: int | float) -> None`
    - `Span.get_metric` typing is `get_metric(key: str) -> Optional[int | float]`
    - `Span.set_metrics` typing is `set_metrics(metrics: Dict[str, int | float]) -> None`
    - `Span.get_metrics` typing is `get_metrics() -> dict[str, int | float]`
  - `Span.record_exception`'s `timestamp` and `escaped` parameters are removed
- LLM Observability
  - manual instrumentation methods, including `LLMObs.annotate()`, `LLMObs.export_span()`, `LLMObs.submit_evaluation()`, `LLMObs.inject_distributed_headers()`, and `LLMObs.activate_distributed_headers()` raise exceptions instead of logging. LLM Observability auto-instrumentation is not affected.
  - `LLMObs.submit_evaluation_for()` has been removed. Use `LLMObs.submit_evaluation()` instead for submitting evaluations. To migrate:
    - `LLMObs.submit_evaluation_for(...)` users: rename to `LLMObs.submit_evaluation(...)`
    - `LLMObs.submit_evaluation_for(...)` users: rename the `span_context` argument to `span`, i.e. `LLMObs.submit_evaluation(span_context={"span_id": ..., "trace_id": ...}, ...)` to `LLMObs.submit_evaluation(span={"span_id": ..., "trace_id": ...}, ...)`
- profiling
  - this updates echion (the Python stack sampler) to the latest version, which introduces an experimental faster memory copy function.
  - The V1 stack profiler is removed. V2 has been enabled by default since v2.20.0. `DD_PROFILING_STACK_V2_ENABLED` is removed.
- freezegun
  - The deprecated `freezegun` integration is removed.
- opentracer
  - This change removes the deprecated `opentracer` package
- aioredis
  - The aioredis integration has been removed.
- google_generativeai
  - The `google_generativeai` integration has been removed as the `google_generativeai` library has reached end-of-life.
  As an alternative, you can use the recommended `google_genai` library and corresponding integration instead.
- openai
  - Streamed chat/completions no longer have token counts computed using the `tiktoken` library, and instead
  default to having their token counts estimated if not explicitly provided in the OpenAI response object. To guarantee accurate streamed token metrics, set `stream_options={"include_usage": True}` in the OpenAI request.
- django
  - This upgrades the default tracing behavior to enable minimal tracing mode by default (``DD_DJANGO_TRACING_MINIMAL`` defaults to ``true``). Django ORM, cache, and template instrumentation are disabled by default to eliminate duplicate span creation since library integrations for database drivers (psycopg, MySQLdb, sqlite3), cache clients (redis, memcached), template renderers (Jinja2), and other supported libraries continue to be traced. This reduces performance overhead by removing redundant Django-layer instrumentation. To restore all Django instrumentation, set ``DD_DJANGO_TRACING_MINIMAL=false``, or enable individual features using ``DD_DJANGO_INSTRUMENT_DATABASES=true``, ``DD_DJANGO_INSTRUMENT_CACHES=true``, and ``DD_DJANGO_INSTRUMENT_TEMPLATES=true``.
  - When ``DD_DJANGO_INSTRUMENT_DATABASES=true`` (default ``false``), database instrumentation merges Django-specific tags into database driver spans created by supported integrations (psycopg, sqlite3, MySQLdb, etc.) instead of creating duplicate Django database spans. If the database cursor is not already wrapped by a supported integration, Django wraps it and creates a span. This change reduces overhead and duplicate spans while preserving visibility into database operations.
- Other
  - This change removes the `ddtrace.settings` package. Environment variables should be used to adjust settings.
  - This change removes the deprecated non_active_span parameter to `HttpPropagator.inject`
  - This change removes the deprecated environment variable `DEFAULT_RUNTIME_METRICS_INTERVAL`.

#### Environment variable changes

The following environment variables have been removed or replaced. Update your configuration with the new variables where applicable.

You can use the following command to find all occurrences of these deprecated variables in your codebase:

```sh
git grep -P -e "DD_DYNAMIC_INSTRUMENTATION_UPLOAD_FLUSH_INTERVAL" \
-e "DD_EXCEPTION_DEBUGGING_ENABLED" \
-e "DD_PROFILING_STACK_V2_ENABLED" \
-e "DEFAULT_RUNTIME_METRICS_INTERVAL"
```

<div class="alert alert-info">These changes only apply to <code>dd-trace-py</code> configuration and not the Datadog Agent.</div>


#### Python 3.14 compatibility

Full support for Python 3.14 is in active development. While the core tracing library is compatible, some integrations may not be fully tested or supported in the latest version.

For the most current compatibility details for a specific integration, see the library's [latest release notes][19].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /tracing/trace_collection/library_config/python/
[4]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[5]: https://ddtrace.readthedocs.io/en/v1.0.0/release_notes.html
[11]: /tracing/trace_collection/library_injection_local/
[13]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[14]: /tracing/trace_collection/compatibility/python/#releases
[15]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=python
[16]: https://ddtrace.readthedocs.io/en/stable/configuration.html?highlight=dd_trace_methods#DD_TRACE_METHODS
[17]: /tracing/trace_pipeline/ingestion_mechanisms/?tab=python#in-tracing-libraries-user-defined-rules
[18]: https://github.com/DataDog/dd-trace-py
[19]: https://github.com/DataDog/dd-trace-py/releases
