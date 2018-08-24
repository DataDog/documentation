---
title: APM Setup
kind: Documentation
aliases:
  - /tracing/languages/
further_reading:
- link: "tracing/setup/first_class_dimensions"
  tag: "Documentation"
  text: "Learn more about first class dimensions"
- link: "tracing/setup/dotnet"
  tag: "Documentation"
  text: .NET language instrumentation
- link: "tracing/setup/docker"
  tag: "Documentation"
  text: Docker setup
- link: "tracing/setup/kubernetes"
  tag: "Documentation"
  text: Kubernetes setup
- link: "tracing/setup/go"
  tag: "Documentation"
  text: Go language instrumentation
- link: "tracing/setup/java"
  tag: "Documentation"
  text: Java language instrumentation
- link: "tracing/setup/nodejs"
  tag: "Documentation"
  text: Node.js language instrumentation
- link: "tracing/setup/php"
  tag: "Documentation"
  text: PHP language instrumentation
- link: "tracing/setup/python"
  tag: "Documentation"
  text: Python language instrumentation
- link: "tracing/setup/ruby"
  tag: "Documentation"
  text: Ruby language instrumentation
---

This documentation covers Agent v6 only, to know how to set up APM tracing with Agent v5, [refer to the dedicated APM with Agent v5 doc][1].

{{< wistia ps2vn2rask >}}

## Setup process

With our infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation flushes to the Agent every 1 s ([see here for the Python client](https://github.com/DataDog/dd-trace-py/blob/69693dc7cdaed3a2b6a855325109fa100e42e254/ddtrace/writer.py#L159) for instance) and the Agent flushes to the [Datadog API every 10s][2].

To start tracing your application:

1. **Install the Datadog Agent**:
  Install and configure the latest [Datadog Agent][3]. For additional information, reference the [getting started guide][4].

2. **Install the [Trace Agent][6]**:

  * On **Linux** and **Windows**, the Trace Agent is pre-packaged with the standard Datadog Agent and no extra configuration is needed. See the [Linux Trace Agent][20] and [Windows Trace Agent][8] documentation for more information.

  * On **macOS**, install and run the Trace Agent in addition to the Datadog Agent. See the [macOS Trace Agent][7]  documentation for more information.
  
  * On **Docker**, enable the Trace Agent in the `datadog/agent` container by passing `DD_APM_ENABLED=true` as an environment variable. See the [APM and Docker][5] documentation for more information.

  * On **Heroku**, Deploy the Trace Agent via the [Datadog Heroku Buildpack][9].

3. **Configure your environment**:
  An environment is a first class dimension used to scope a whole Datadog APM application. A common use case is to disaggregate metrics from stage environments such as production, staging, and pre-production. [Learn how to configure environments][10].
  **Note**: if you do not configure your own environments, all data will default to `env:none`.

4. **Instrument your application**:
  Select one of the following supported languages:

  - [Go][11]
  - [Java][12]
  - [Python][13]
  - [Ruby][14]

    To instrument an application written in a language that does not yet have official library support, visit our list of [community tracing libraries][15].

5. Start monitoring your app's performance: Within a few minutes of running APM, you will start to see your services appear in [the APM home page][16]. See [Using the APM UI][17] to learn more.

## Agent configuration

The APM Agent (also known as *Trace Agent*) is shipped by default with the
Agent 6 in the Linux, MacOS, and Windows packages. The APM Agent is enabled by default on Linux. To enable the check on other platforms or disable it on Linux, update the `apm_config` key in your `datadog.yaml`:

```
apm_config:
  enabled: true
```

| File setting            | Type      | Environment variable     | Description                                                                                                                                                      |
|-------------------------|-----------|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enabled`               | boolean   | `DD_APM_ENABLED`           | When set to `true`, the Datadog Agent accepts trace metrics. Default value is `true`.                                                            |
| `apm_dd_url`            | string    | `DD_APM_DD_URL`            | Datadog API endpoint where traces are sent.                                                                                                       |
| `env`                   | string    | -                        | Default environment to which traces should be registered under (e.g. *staging*, *production*, etc..).                                                             |
| `extra_sample_rate`     | float     | -                        | Use this setting to adjust the trace sample rate. The value should be a float between `0` (no sampling) and `1` (normal sampling). Default value is `1`.     |
| `max_traces_per_second` | float     | -                        | Maximum number of traces to sample per second. Set to `0` to disable the limit (*not recommended*). The default value is `10`.                              |
| `ignore_resources`      | list      | `DD_IGNORE_RESOURCE`       | A list of resources that the agent should ignore. If using the environment variable, this should be a comma-separated list.                                                     |
| `log_file`              | string    | -                        | Location of the log file.                                                                                                                                    |
| `replace_tags`          | list      |                          | A list of tag replacement rules. See the [Scrubbing sensitive information](#scrubbing-sensitive-information) section.                                            |
| `receiver_port`         | number    | `DD_RECEIVER_PORT`         | Port that the Datadog Agent's trace receiver listen on. Default value is `8126`.                                                                  |
| `apm_non_local_traffic` | boolean   | `DD_APM_NON_LOCAL_TRAFFIC` | Allows the agent to receive outside connections. It then listen on all interfaces.                                                                               |
| `max_memory`            | float     | -                        | Maximum memory that the agent is allowed to occupy. When this is exceeded the process is killed.                                                        |
| `max_cpu_percent`       | float     | -                        | Maximum CPU percentage that the agent should use. The agent automatically adjusts its pre-sampling rate to stay below this number.                           |
| `max_connections`       | number    | -                        | Maximum number of network connections that the agent is allowed to use. When this is exceeded the process is killed.                                    |

To get a an overview of all the possible settings for APM, take a look at the Trace Agent's [`datadog.example.yaml`][21] configuration file.
For more information about the Datadog Agent, see the [dedicated doc page][18] or refer to the [`datadog.yaml` templates][19].

[Reference the dedicated documentation to setup tracing with Docker][5].

## Scrubbing sensitive information

### Automatic scrubbing

Automatic scrubbing is available for some services, such as ElasticSearch, MongoDB, Redis, Memcached, and HTTP server and client request URLs. Below is an example configuration snippet documenting all the available options.

```
apm_config:
  # Defines obfuscation rules for sensitive data. Disabled by default.
  obfuscation:
    # ElasticSearch obfuscation rules. Applies to spans of type "elasticsearch".
    # More specifically, to the "elasticsearch.body" tag.
    elasticsearch:
      enabled: true
      # Values for the keys listed here will not be obfuscated.
      keep_values:
        - client_id
        - product_id

    # MongoDB obfuscation rules. Applies to spans of type "mongodb".
    # More specifically, to the "mongodb.query" tag.
    mongodb:
      enabled: true
      # Values for the keys listed here will not be obfuscated.
      keep_values:
        - document_id
        - template_id

    # HTTP obfuscation rules for "http.url" tags in spans of type "http".
    http:
      # If true, query strings in URLs will be obfuscated.
      remove_query_string: true
      # If true, path segments in URLs containing digits will be replaced by "?"
      remove_paths_with_digits: true

    # When enabled, stack traces will be removed (replaced by "?").
    remove_stack_traces: true

    # Obfuscation rules for spans of type "redis". Applies to the "redis.raw_command" tags.
    redis:
      enabled: true

    # Obfuscation rules for spans of type "memcached". Applies to the "memcached.command" tag.
    memcached:
      enabled: true
```

### Replace rules

To scrub sensitive data from your span's tags, use the `replace_tags` setting. It is a list containing one or more groups of parameters that describe how to perform replacements of sensitive data within your tags. These parameters are:

* `name`: The key of the tag to replace. To match all tags, use `*`. To match the resource, use `resource.name`.
* `pattern`: The regexp pattern to match against.
* `repl`: The replacement string.

For example:

```
apm_config:
  replace_tags:
    # Replace all numbers following the `token/` string in the tag "http.url" with "?":
    - name: "http.url"
      pattern: "token/(.*)"
      repl: "?"
    # Replace all the occurrences of "foo" in any tag with "bar":
    - name: "*"
      pattern: "foo"
      repl: "bar"
    # Remove all "error.stack" tag's value.
    - name: "error.stack"
      pattern: "(?s).*"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/faq/agent-5-tracing-setup
[2]: https://github.com/DataDog/datadog-trace-agent/blob/master/config/agent.go#L95
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/datadog-trace-agent/tree/master/config#agent-configuration
[5]: /tracing/setup/docker
[6]: https://github.com/DataDog/datadog-trace-agent
[7]: https://github.com/DataDog/datadog-trace-agent#run-on-osx
[8]: https://github.com/DataDog/datadog-trace-agent/#run-on-windows
[9]: https://github.com/DataDog/heroku-buildpack-datadog
[10]: /tracing/setup/first_class_dimensions#environment
[11]: /tracing/setup/go
[12]: /tracing/setup/java
[13]: /tracing/setup/python
[14]: /tracing/setup/ruby
[15]: /developers/libraries/#community-tracing-apm-libraries
[16]: https://app.datadoghq.com/apm/home?env=
[17]: /tracing/visualization
[18]: /agent/
[19]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[20]: https://github.com/DataDog/datadog-trace-agent/#run-on-linux
[21]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
