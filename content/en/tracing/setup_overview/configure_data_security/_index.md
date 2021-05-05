---
title: Configure the Datadog Agent or Tracer for Data Security
kind: documentation
description: "Configure the Datadog Tracer or Agent to modify or discard spans for security or fine-tuning purposes."
aliases:
    - /security/tracing
    - /tracing/security
    - /tracing/guide/security
    - /tracing/guide/agent_obfuscation
    - /tracing/guide/agent-obfuscation
    - /tracing/custom_instrumentation/agent_customization
---
## Overview

The performance data and traces that you're collecting with Datadog can contain sensitive information that you want to filter out, obfuscate, scrub, filter, modify, or just not collect.  Additionally, it may contain synthetic traffic that might cause your error counts to be inaccurate or Datadog to not accurately indicate the health of your services.

The Datadog Agent and some tracing libraries have  options available to address these situations and modify or discard spans, and various options are described below.  These docs cover several common methods for configuring Tracer and Agent to achieve these security requirements.

If your fine-tuning needs aren't covered and you need assistance, reach out to [the Datadog support team][1].

## Filtering Baseline

Datadog enforces several filtering mechanisms on spans as a baseline, to provide sound defaults for basic security. In particular:

* **Environment variables are not collected by the Agent**
* **SQL variables are obfuscated, even when not using prepared statements**: For example, the following `sql.query` attribute: `SELECT data FROM table WHERE key=123 LIMIT 10` has its variables obfuscated, to become the following Resource name: `SELECT data FROM table WHERE key = ? LIMIT ?`
* **Numbers in Resource names (for example, request URLs) are obfuscated** For example, the following `elasticsearch` attribute:

    ```text
    Elasticsearch : {
        method : GET,
        url : /user.0123456789/friends/_count
    }
    ```

    has its number in the URL obfuscated, to become the following Resource name: `GET /user.?/friends/_count`

## Agent Trace Obfuscation

Agent [trace][2] obfuscation is disabled by default. Enable it in your `datadog.yaml` configuration file to obfuscate all information attached to your traces.

This option works with the following services:

* `mongodb`
* `elasticsearch`
* `redis`
* `memcached`
* `http`
* `remove_stack_traces`

**Note:** You can use automatic scrubbing for multiple types of services at the same time.  Configure each in the `obfuscation` section of your `datadog.yaml` file.

{{< tabs >}}
{{% tab "MongoDB" %}}

Applies to [spans][1] of type `mongodb`, more specifically: to the `mongodb.query` span tags.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    # MongoDB obfuscation rules. Applies to spans of type "mongodb".
    # More specifically, to the "mongodb.query" tag.
    mongodb:
      enabled: true
      # Values for the keys listed here will not be obfuscated.
      keep_values:
        - document_id
        - template_id
```

* `keep_values` - defines a set of keys to exclude from Agent trace obfuscation.

[1]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab "ElasticSearch" %}}

Applies to [spans][1] of type `elasticsearch`, more specifically, to the `elasticsearch.body` span tags:

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    # ElasticSearch obfuscation rules. Applies to spans of type "elasticsearch".
    # More specifically, to the "elasticsearch.body" tag.
    elasticsearch:
      enabled: true
      # Values for the keys listed here will not be obfuscated.
      keep_values:
        - client_id
        - product_id
```

[1]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab "Redis" %}}

Applies to [spans][1] of type `redis`, more specifically, to the `redis.raw_command` span tags:

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    redis:
      enabled: true
```

[1]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab "MemCached" %}}

Applies to [spans][1] of type `memcached`, more specifically, to the `memcached.command` span tags:

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    memcached:
      enabled: true
```

[1]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab "Http" %}}

HTTP obfuscation rules for `http.url` metadata in [spans][1] of type `http`:

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    http:
      remove_query_string: true
      remove_paths_with_digits: true
```

* `remove_query_string`: If true, obfuscates query strings in URLs.
* `remove_paths_with_digits`: If true, path segments in URLs containing digits are replaced by "?".


[1]: /tracing/visualization/#spans
{{% /tab %}}
{{% tab "Stack Traces" %}}

Set the `remove_stack_traces` parameter to true, to remove stack traces and replace them with `?`.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    remove_stack_traces: true
```

{{% /tab %}}
{{< /tabs >}}

## Replace rules for tag filtering

To scrub sensitive data from your [span][3]'s tags, use the `replace_tags` setting [in your datadog.yaml configuration file][4] or the `DD_APM_REPLACE_TAGS` environment variable. The value of the setting or environment variable is a list of one or more groups of parameters that specify how to replace sensitive data in your tags. These parameters are:

* `name`: The key of the tag to replace. To match all tags, use `*`. To match the resource, use `resource.name`.
* `pattern`: The regexp pattern to match against.
* `repl`: The replacement string.

For example:

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
apm_config:
  replace_tags:
    # Replace all characters starting at the `token/` string in the tag "http.url" with "?":
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

{{% /tab %}}
{{% tab "Environment Variable" %}}

```shell
DD_APM_REPLACE_TAGS=[
      {
        "name": "http.url",
        "pattern": "token/(.*)",
        "repl": "?"
      },
      {
        "name": "*",
        "pattern": "foo",
        "repl": "bar"
      },
      {
        "name": "error.stack",
        "pattern": "(?s).*"
      }
]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

**Note**: Put this environment variable in the trace-agent container if you are using the recommended [daemonset configuration][1].

```datadog-agent.yaml
- name: DD_APM_REPLACE_TAGS
  value: '[
            {
              "name": "http.url",
              "pattern": "token/(.*)",
              "repl": "?"
            },
            {
              "name": "*",
              "pattern": "foo",
              "repl": "bar"
            },
            {
              "name": "error.stack",
              "pattern": "(?s).*"
            }
          ]'
```

[1]: /agent/kubernetes/?tab=daemonset
{{% /tab %}}
{{% tab "docker-compose" %}}

```docker-compose.yaml
- DD_APM_REPLACE_TAGS=[{"name":"http.url","pattern":"token/(.*)","repl":"?"},{"name":"*","pattern":"foo","repl":"bar"},{"name":"error.stack","pattern":"(?s).*"}]
```

{{% /tab %}}
{{< /tabs >}}

## Exclude Resources from being collected

If your services include simulated traffic such as health checks, you may want to exclude these traces from being collected so the metrics for your services match production traffic.

The Agent can be configured to exclude a specific resource from traces sent by the Agent to Datadog. To prevent the submission of specific resources, use the `ignore_resources` setting in the `datadog.yaml` file . Then create a list of one or more regular expressions, specifying which resources the Agent will filter out based on their resource name.

If you are running in a containerized environment, set `DD_APM_IGNORE_RESOURCES` on the container with the Datadog Agent instead. See the [Docker APM Agent environment variables][5] for details.

```text
## @param ignore_resources - list of strings - optional
## A list of regular expressions can be provided to exclude certain traces based on their resource name.
## All entries must be surrounded by double quotes and separated by commas.
# ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
```

**Note:** The NodeJS Tracer has an additional option for request filtering that is part of the Node Tracer API.  More details can be found [here][6]

## Submit Traces directly to the Agent API

If you require tailored instrumentation for a specific application, consider using the Agent-side tracing API to select individual spans to include in traces. See the [API documentation][7] for additional information.

## Modifying Spans with the Datadog Tracer

While this page deals with modifying data once it has reached the Datadog Agent, some tracing libraries are extensible. You can write a custom post-processor to intercept spans and adjust or discard them accordingly (for example, based on a regular expression match). View the Custom Instrumentation documentation for your language for more information.

* Java: [TraceInterceptor interface][8]
* Ruby: [Processing Pipeline][9]
* Python: [Trace Filtering][10]


[1]: /tracing/help
[2]: /tracing/visualization/#trace
[3]: /tracing/visualization/#spans
[4]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[5]: /agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[6]: /tracing/custom_instrumentation/nodejs/#request-filtering
[7]: /api/v1/tracing/
[8]: /tracing/setup_overview/custom_instrumentation/java/#extending-tracers
[9]: /tracing/setup_overview/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[10]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace-filtering
