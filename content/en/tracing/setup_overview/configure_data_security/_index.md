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
    - /tracing/faq/if-i-instrument-a-database-with-datadog-apm-will-there-be-sensitive-database-data-sent-to-datadog
---
## Overview

The performance data and traces that you're collecting with Datadog can contain sensitive information that you want to filter out, obfuscate, scrub, filter, modify, or just not collect.  Additionally, it may contain synthetic traffic that might cause your error counts to be inaccurate or Datadog to not accurately indicate the health of your services.

The Datadog Agent and some tracing libraries have  options available to address these situations and modify or discard spans, and various options are described below.  These docs cover several common methods for configuring Tracer and Agent to achieve these security requirements.

If your fine-tuning needs aren't covered and you need assistance, reach out to [the Datadog support team][1].

## HTTP data collected

To understand data security concerns it's important to understand what data is being collected. Datadog is in the process of standardizing the tags collected for web spans across all of it's APM libraries. When this standardization is complete the following tags will be collected for each server side web span:

*  `http.status_code` - the requests response status code
*  `http.method` - the method or http verb
*  `http.version` - the protocol version
*  `http.url` - the full url, including the query string
*  `http.useragent` - the browser's user agent field, if available
*  `http.server_name` - The primary server name of the matched virtual host/host
*  `http.route` - The matched route (path template)
*  `http.client_ip` - The IP address of the original client behind all proxies, if known (discovered from headers such as X-Forwarded-For).
*  `http.request.content_length` - The size of the request payload body in bytes.
*  `http.request.content_length_uncompressed` - The size of the uncompressed request payload body after transport decoding.
*  `http.request.headers.*` - The request http headers. None will be collected by default, users can opt-in configure them.
*  `http.response.content_length` - The size of the response payload body in bytes.
*  `http.response.content_length_uncompressed` - The size of the uncompressed request payload body after transport decoding.
*  `http.response.headers.*` - The response http headers. None will be collected by default, users can opt-in configure them.

Some libraries may not yet implement all of these tags. Please check your libraries release notes for their availability.

### Configuring HTTP data

Datadog will automatically try and resolve `http.client_ip` from a number of well known headers, such as X-Forwarded-For. If you use a custom header for this field, or whish to bypass the resolution algorithm, you can set the environment variable `DD_TRACE_CLIENT_IP_HEADER` and the library will only look in the specified header for the client IP.

If you do not whish to collect this value, because you consider it sensitive data, or for any other reason, you can set the environment variable `DD_TRACE_CLIENT_IP_HEADER_DISABLED` to true. It is false by default.

The full url is placed in `http.url`, including the query string. The query string could contain sensitive data and therefore automatically parsed by a regex and any suspicious looking values are redacted by default. This redaction process is configurable, to modify the regex used for redaction set the environment variable to `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP` to a valid regex of your choice. The regex are platform specific.

If you do not wish to collect the query string you can set the environment variable `DD_HTTP_SERVER_TAG_QUERY_STRING` to false. The default value is true.

If you wish to collect `DD_TRACE_HEADER_TAGS` this accepts a map of case-insensitive header keys to tag names and automatically applies matching header values as tags on root spans. Also accepts entries without a specified tag name. **Example**: `CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name`

## Generalizing resource names and filtering baseline

Datadog enforces several filtering mechanisms on spans as a baseline, to provide sound defaults for basic security and generalize resource names to facilitate grouping during analysis. In particular:

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

## Agent trace obfuscation

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

## Scrub sensitive data from your spans

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

## Exclude resources from being collected

For an in depth overview of the options to avoid tracing specific resources, see [Ignoring Unwanted Resources][5].

If your services include simulated traffic such as health checks, you may want to exclude these traces from being collected so the metrics for your services match production traffic.

The Agent can be configured to exclude a specific resource from traces sent by the Agent to Datadog. To prevent the submission of specific resources, use the `ignore_resources` setting in the `datadog.yaml` file . Then create a list of one or more regular expressions, specifying which resources the Agent will filter out based on their resource name.

If you are running in a containerized environment, set `DD_APM_IGNORE_RESOURCES` on the container with the Datadog Agent instead. See the [Docker APM Agent environment variables][6] for details.

```text
## @param ignore_resources - list of strings - optional
## A list of regular expressions can be provided to exclude certain traces based on their resource name.
## All entries must be surrounded by double quotes and separated by commas.
# ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]
```

## Submit Traces directly to the Agent API

If you require tailored instrumentation for a specific application, consider using the Agent-side tracing API to select individual spans to include in traces. See the [API documentation][7] for additional information.

## Modifying spans with the Datadog tracer

While this page deals with modifying data once it has reached the Datadog Agent, some tracing libraries are extensible. You can write a custom post-processor to intercept spans and adjust or discard them accordingly (for example, based on a regular expression match). View the Custom Instrumentation documentation for your language for more information.

* Java: [TraceInterceptor interface][8]
* Ruby: [Processing Pipeline][9]
* Python: [Trace Filtering][10]


[1]: /help/
[2]: /tracing/visualization/#trace
[3]: /tracing/visualization/#spans
[4]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[5]: /tracing/guide/ignoring_apm_resources/
[6]: /agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[7]: /tracing/guide/send_traces_to_agent_by_api/
[8]: /tracing/setup_overview/custom_instrumentation/java/#extending-tracers
[9]: /tracing/setup_overview/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[10]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace-filtering
