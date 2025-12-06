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
    - /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
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

Version 4.0.0 drops support for Python 3.8, removes deprecated APIs, and changes default behaviors for frameworks like Django.

For a complete migration guide, see [Migrate to dd-trace-py v4][20].

## Upgrading to dd-trace-py v3

Version 3.0.0 drops support for Python 3.7, removes deprecated APIs, and cleans up configuration names.

For a complete migration guide, see [Migrate to dd-trace-py v3][21].

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
[20]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/migrate/python/v4
[21]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/migrate/python/v3

