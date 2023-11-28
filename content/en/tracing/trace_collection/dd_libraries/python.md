---
title: Tracing Python Applications
kind: documentation
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
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-py'
      tag: 'GitHub'
      text: 'Source code'
    - link: 'https://ddtrace.readthedocs.io/en/stable/'
      tag: 'Pypi'
      text: 'API Docs'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Advanced Usage'
      text: 'Advanced Usage'
---
## Compatibility requirements
The latest Python Tracer supports CPython versions 2.7 and 3.5-3.11.

For a full list of Datadog's Python version and framework support (including legacy and maintenance versions), read the [Compatibility Requirements][1] page.

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][13].

### Choose your instrumentation method

After you deploy or install and configure your Datadog Agent, the next step is to instrument your application. You can do this in the following ways, depending on the infrastructure your app runs on, the language it's written in, and the level of configuration you require.

See the following pages for supported deployment scenarios and languages:

- [Inject the instrumentation library locally][11] (at the Agent);
- [Inject the instrumentation library from the Datadog UI][12] (beta); or
- Add the tracing library directly in the application, as described in the [Install the tracer](#install-the-tracer) section. Read more about [compatibility information][1].

### Instrument your application

<div class="alert alert-info">If you are collecting traces from a Kubernetes application, as an alternative to the following instructions, you can inject the tracing library into your application using the Cluster Agent Admission Controller. Read <a href="/tracing/trace_collection/library_injection_local">Injecting Libraries Using Admission Controller</a> for instructions.</div>

Once the agent is installed, to begin tracing applications written in Python, install the Datadog Tracing library, `ddtrace`, using pip:

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

### Upgrading to v1

If you are upgrading to ddtrace v1, review the [upgrade guide][4] and the [release notes][5] in the library documentation for full details.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/python
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /tracing/trace_collection/library_config/python/
[4]: https://ddtrace.readthedocs.io/en/stable/upgrading.html#upgrade-0-x
[5]: https://ddtrace.readthedocs.io/en/stable/release_notes.html#v1-0-0
[11]: /tracing/trace_collection/library_injection_local/
[12]: /tracing/trace_collection/library_injection_remote/
[13]: /tracing/trace_collection#install-and-configure-the-agent
