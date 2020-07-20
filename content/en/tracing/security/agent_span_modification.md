---
title: Agent Span Modification
kind: documentation
description: "Configure the Datadog Agent to modify or discard spans for security or fine-tuning purposes."
aliases:
    - /tracing/guide/agent_obfuscation
---

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

Agent [trace][1] obfuscation is disabled by default. Enable it in your `datadog.yaml` configuration file to obfuscate all information attached to your traces.

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

To scrub sensitive data from your [span][2]'s tags, use the `replace_tags` setting [in your datadog.yaml configuration file][3] or the `DD_APM_REPLACE_TAGS` environment variable. The value of the setting or environment variable is a list of one or more groups of parameters that specify how to replace sensitive data in your tags. These parameters are:

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
{{< /tabs >}}

## Resource filtering

The Agent can be configured to exclude a specific resource from traces sent by the Agent to Datadog. To prevent the submission of specific resources, use the `ignore_resources` setting in the `datadog.yaml` file . Then create a list of one or more regular expressions, specifying which resources the Agent will filter out based on their resource name.

If you are running in a containerized environment, set `DD_APM_IGNORE_RESOURCES` on the container with the Datadog Agent instead. See the [Docker APM Agent environment variables][4] for details.

Excluding resources for traces from the calculation of metrics for your services is useful for health checks or simulated traffic .
```text
## @param ignore_resources - list of strings - optional
## A list of regular expressions can be provided to exclude certain traces based on their resource name.
## All entries must be surrounded by double quotes and separated by commas.
# ignore_resources: ["(GET|POST) /healthcheck"]
```

**Note:** The NodeJS Tracer has an additional option for request filtering that is part of the Node Tracer API.  More details can be found [here][5]

## Submit Traces directly to the Agent API

If a customer requires tailored instrumentation for a specific application, they should consider relying on the Agent-side tracing API to select individual Spans to include in Traces submitted to Datadog. See the [API documentation][6] for additional information.


[1]: /tracing/visualization/#trace
[2]: /tracing/visualization/#spans
[3]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[4]: /agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[5]: /tracing/custom_instrumentation/nodejs/#request-filtering
[6]: /api/v1/tracing/
