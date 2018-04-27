---
title: APM Setup
kind: Documentation
aliases:
  - /tracing/languages/
further_reading:
- link: "tracing/setup/environment"
  tag: "Documentation"
  text: "Learn more about environment configuration"
- link: "tracing/setup/docker"
  tag: "Documentation"
  text: Docker setup
- link: "tracing/setup/go"
  tag: "Documentation"
  text: Go language instrumentation
- link: "tracing/setup/java"
  tag: "Documentation"
  text: Java language instrumentation
- link: "tracing/setup/python"
  tag: "Documentation"
  text: Python language instrumentation
- link: "tracing/setup/ruby"
  tag: "Documentation"
  text: Ruby language instrumentation
---

This documentation covers Agent v6 only, to know how to set up APM tracing with Agent v5, [refer to the dedicated APM with Agent v5 doc][1].

## Setup process

With our infrastructure monitoring, metrics are sent to the Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Agent: the application code instrumentation flushes to the Agent every 1 s ([see here for the Python client](https://github.com/DataDog/dd-trace-py/blob/69693dc7cdaed3a2b6a855325109fa100e42e254/ddtrace/writer.py#L159) for instance) and the Agent flushes to the [Datadog API every 10s][2].

To start tracing your application:

1. **Install the Datadog Agent**:
  Install and configure the latest [Datadog Agent][3]. For additional information, reference the [getting started guide][4].

2. **Install the Trace Agent**:

  * On **Linux**,**Windows**, and **[Docker][5]** the Trace Agent is pre-packaged with the standard Datadog Agent and no extra configuration is needed.

  * On **macOS** , install and run the [Trace Agent][6] in addition to the Datadog Agent.
  See the [macOS Trace Agent][7] and [Windows Trace Agent][8] dedicated documentation.

  * On Heroku, Deploy the Datadog Trace Agent via the [Datadog Heroku Buildpack][9].

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

The APM Agent (also known as *trace Agent*) is shipped by default with the
Agent 6 in the Linux, MacOS, and Windows packages. The APM Agent is enabled by default on Linux. To enable the check on other platforms or disable it on Linux, update the `apm_config` key in your `datadog.yaml`:

```
apm_config:
  enabled: true
```

{{% table responsive="true" %}}
| File setting            | Environment variable | Description                                                                                                                                                      |
|------------------------------|----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `apm_enabled`           | `DD_APM_ENABLED`     | The Datadog Agent accepts trace metrics when the value is set to `true`. The default value is `true`.                                                            |
| `extra_sample_rate`     | -                    | Use this setting to adjust the trace sample rate. The value should be a float between `0` (no sampling) and `1` (normal sampling). The default value is `1`. |
| `max_traces_per_second` | -                    | The maximum number of traces to sample per second. To disable the limit (*not recommended*), set to `0`. The default value is `10`.                              |
| `receiver_port`         | `DD_RECEIVER_PORT`   | The port that the Datadog Agent's trace receiver should listen on. The default value is `8126`.                                                                  |
| `connection_limit`      | -                    | The number of unique client connections to allow during one 30 second lease period. The default value is `2000`.                                                 |
| `resource`              | `DD_IGNORE_RESOURCE` | A blacklist of regular expressions to filter out Traces by their resource name.                                                                                  |
| `replace_tags`          |                      | A list of tag replacement rules. See the [Scrubbing sensitive information](#scrubbing-sensitive-information) section.                                            |
{{% /table %}}

For more information about the Datadog Agent, see the [dedicated doc page][18] or refer to the [`datadog.yaml` templates][19].

[Reference the dedicated documentation to setup tracing with Docker][5].

## Scrubbing sensitive information

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
[2]: https://github.com/DataDog/datadog-trace-agent/blob/master/config/agent.go#L170
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/datadog-trace-agent/tree/master/config#agent-configuration
[5]: /tracing/setup/docker
[6]: https://github.com/DataDog/datadog-trace-agent
[7]: https://github.com/DataDog/datadog-trace-agent#run-on-osx
[8]: https://github.com/DataDog/datadog-trace-agent/#run-on-windows
[9]: https://github.com/DataDog/heroku-buildpack-datadog
[10]: /tracing/setup/environment
[11]: /tracing/setup/go
[12]: /tracing/setup/java
[13]: /tracing/setup/python
[14]: /tracing/setup/ruby
[15]: /developers/libraries/#community-tracing-apm-libraries
[16]: https://app.datadoghq.com/apm/home?env=
[17]: /tracing/visualization
[18]: /agent/
[19]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
