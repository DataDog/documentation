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

## Upgrading to dd-trace-py v3

Version 3.0.0 of `dd-trace-py` drops support for Python 3.7 and removes previously deprecated APIs. This guide provides steps to help you upgrade your application.

With the release of `v3.0.0`, the `2.x` release line is in maintenance mode. Only critical bug fixes should be backported. For more details, see the [versioning support policy][14].

### Step 1: Detect deprecations

To ensure a smooth transition, first upgrade to the latest v2 release (`2.21.0`) and use the following tools to find any deprecated code that will break in v3.

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

After identifying potential issues, review the following breaking changes. Update your code to be compatible with v3 before proceeding with the upgrade.

#### Environment variable changes

The following environment variables have been removed or replaced. Update your configuration with the new variables where applicable.

You can use the following command to find all occurrences of these deprecated variables in your codebase:

```sh
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

| Deprecation                                     | Action Required                                                                                                                        |
|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `DD_ANALYTICS_ENABLED`                          | Removed. This is a no-op. See [Ingestion Controls][15] for alternatives.                                                           |
| `DD_HTTP_CLIENT_TAG_QUERY_STRING`               | Use `DD_TRACE_HTTP_CLIENT_TAG_QUERY_STRING` instead.                                                                                   |
| `DD_LLMOBS_APP_NAME`                            | Use `DD_LLMOBS_ML_APP` instead.                                                                                                        |
| `_DD_LLMOBS_EVALUATOR_SAMPLING_RULES`           | Use `DD_LLMOBS_EVALUATOR_SAMPLING_RULES` instead (without the leading underscore).                                                     |
| `_DD_LLMOBS_EVALUATORS`                         | Use `DD_LLMOBS_EVALUATORS` instead (without the leading underscore).                                                                   |
| `DD_PYTEST_USE_NEW_PLUGIN_BETA`                 | Removed. The new pytest plugin is the default and is no longer in beta.                                                            |
| `DD_TRACE_ANALYTICS_ENABLED`                    | Removed. This is a no-op. See [Ingestion Controls][15] for alternatives.                                                           |
| `DD_TRACE_METHODS` (using `[]` notation)        | You must use the `:` notation. For example: `mod.submod:method2;mod.submod:Class.method1`. See the [DD_TRACE_METHODS][16] for details. |
| `DD_TRACE_PROPAGATION_STYLE="b3 single header"` | Use `DD_TRACE_PROPAGATION_STYLE=b3` for identical behavior.                                                                            |
| `DD_TRACE_SAMPLE_RATE`                          | Use `DD_TRACE_SAMPLING_RULES` instead. See [User-Defined Rules][17] for details.            |
| `DD_TRACE_SPAN_AGGREGATOR_RLOCK`                | Removed. This feature has been removed and the variable is a no-op.                                                                    |

<div class="alert alert-info">These changes only apply to <code>dd-trace-py</code> configuration and not the Datadog Agent.</div>

#### API and interface changes

The following methods, attributes, and behaviors have been removed or changed.

##### General

- **Python 3.7 Support**: Support for Python 3.7 is removed.

##### Tracing

- **Multiple Tracer Instances**: Support for multiple `Tracer` instances is removed. You must use the global `ddtrace.tracer` instance.
- `Tracer.configure()`: Deprecated parameters have been removed. Use environment variables to configure Agent connection details (`hostname`, `port`), sampling, and other settings.
- `Span.sampled`: This attribute is removed. Use `span.context.sampling_priority > 0` to check if a span is sampled.
- `ddtrace.opentracer`: The `_dd_tracer` attribute is removed. Use the global `ddtrace.tracer` instead.
- `LLMObs.annotate()`: The `parameters` argument is removed. Use `metadata` instead.
- `choose_matcher()`: Callables and regex patterns are no longer allowed as arguments to `ddtrace.tracer.sampler.rules[].choose_matcher`. You must pass a string.

##### LLM Observability

- **OpenAI and Langchain**: Support for OpenAI v0.x and Langchain v0.0.x is dropped.

##### CI Visibility

- The new pytest plugin is the default.
- Module, suite, and test names are parsed from `item.nodeid`.
- Test names for class-based tests include the class name (for example, `TestClass::test_method`).
- Test skipping is performed at the suite level.

### Step 3: Upgrade the library

After you have updated your code to address the breaking changes, you can upgrade to the latest v3 release.

```sh
pip install --upgrade ddtrace
```

#### Python 3.13 compatibility

Full support for Python 3.13 is in active development. While the core tracing library is compatible, some integrations may not be fully tested or supported in the latest version.

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
