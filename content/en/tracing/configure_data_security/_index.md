---
title: Data Security
kind: documentation
description: "Configure the Client library or Agent to control the collection of sensitive data in traces."
aliases:
    - /tracing/security
    - /tracing/guide/security
    - /tracing/guide/agent_obfuscation
    - /tracing/guide/agent-obfuscation
    - /tracing/custom_instrumentation/agent_customization
    - /tracing/faq/if-i-instrument-a-database-with-datadog-apm-will-there-be-sensitive-database-data-sent-to-datadog
    - /tracing/setup_overview/configure_data_security/
further_reading:
- link: "/data_security/pci_compliance/"
  tag: "Documentation"
  text: "Set up a PCI-compliant Datadog organization"
---
## Overview

Datadog tracing libraries collect data from an instrumented application. That data is sent to Datadog as traces and it may contain sensitive data such as personally identifiable information (PII). If you are ingesting sensitive data as traces into Datadog, remediations can be added at ingestion with [Sensitive Data Scanner][12]. You can also configure the Datadog Agent or the tracing library to remediate sensitive data at collection before traces are sent to Datadog.

If the configurations described here do not cover your compliance requirements, reach out to [the Datadog support team][1].

### Personal information in trace data

Datadog's APM tracing libraries collect relevant observability data about your applications. Because these libraries collect hundreds of unique attributes in trace data, this page describes categories of data, with a focus on attributes that may contain personal information about your employees and end-users. 

The table below describes the personal data categories collected by the automatic instrumentation provided by the tracing libraries, with some common examples listed. 

| Category            | Description                                                                                                            |
|:--------------------|:-----------------------------------------------------------------------------------------------------------------------|
| Name                | The full name of an internal user (your employee) or end-user.                                                         |
| Email               | The email address of an internal user (your employee) or end-user.                                                     |
| Client IP           | The IP address of your end-user associated with an incoming request or the external IP address of an outgoing request. |
| Database statements | The literal, sequence of literals, or bind variables used in an executed database statement.                           |
| Geographic location | Longitude and latitude coordinates that can be used to identify an individual or household.                            |
| URI parameters      | The parameter values in the variable part of the URI path or the URI query.                                            |
| URI userinfo        | The userinfo subcomponent of the URI that may contain the user name.                                                   |

The table below describes the default behavior of each language tracing library with regard to whether a data category is collected and whether it is obfuscated by default.

{{% tabs %}}

{{% tab ".NET" %}}

| Category            | Collected                       | Obfuscated                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Name                | <i class="icon-check-bold"></i> |                                 |
| Email               | <i class="icon-check-bold"></i> |                                 |
| Client IP           | <i class="icon-check-bold"></i> |                                 |
| Database statements | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Geographic location |                                 |                                 |
| URI parameters      | <i class="icon-check-bold"></i> |                                 |
| URI userinfo        |                                 |                                 |

{{% /tab %}}

{{% tab "Java" %}}

**Note:** Database statements are not collected by default and must be enabled.

| Category            | Collected                       | Obfuscated                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Name                | <i class="icon-check-bold"></i> |                                 |
| Email               | <i class="icon-check-bold"></i> |                                 |
| Client IP           | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Database statements | <i class="icon-check-bold"></i> |                                 |
| Geographic location |                                 |                                 |
| URI parameters      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| URI userinfo        |                                 |                                 |

{{% /tab %}}

{{% tab "Node.js" %}}

**Note:** URI parameters are not collected by default and must be enabled.

| Category            | Collected                       | Obfuscated                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Name                | <i class="icon-check-bold"></i> |                                 |
| Email               | <i class="icon-check-bold"></i> |                                 |
| Client IP           | <i class="icon-check-bold"></i> |                                 |
| Database statements | <i class="icon-check-bold"></i> |                                 |
| Geographic location |                                 |                                 |
| URI parameters      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| URI userinfo        |                                 |                                 |

{{% /tab %}}

{{% tab "PHP" %}}

**Note:** Name and email are not collected by default and must be enabled.

| Category            |            Collected            |           Obfuscated            |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Name                | <i class="icon-check-bold"></i> |                                 |
| Email               | <i class="icon-check-bold"></i> |                                 |
| Client IP           | <i class="icon-check-bold"></i> |                                 |
| Database statements | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Geographic location |                                 |                                 |
| URI parameters      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| URI userinfo        | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |

{{% /tab %}}

{{% tab "Python" %}}

**Note:** Client IP, geographic location, and URI parameters are not collected by default and must be enabled.

| Category            | Collected                       | Obfuscated                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Name                | <i class="icon-check-bold"></i> |                                 |
| Email               | <i class="icon-check-bold"></i> |                                 |
| Client IP           | <i class="icon-check-bold"></i> |                                 |
| Database statements | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Geographic location | <i class="icon-check-bold"></i> |                                 |
| URI parameters      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| URI userinfo        |                                 |                                 |

[1]: /tracing/trace_collection/compatibility/python/#datastore-compatibility
{{% /tab %}}

{{% tab "Ruby" %}}

**Note:** Client IPs are not collected by default and must be enabled.

| Category            | Collected                       | Obfuscated                      |
|:--------------------|:-------------------------------:|:-------------------------------:|
| Name                | <i class="icon-check-bold"></i> |                                 |
| Email               | <i class="icon-check-bold"></i> |                                 |
| Client IP           | <i class="icon-check-bold"></i> |                                 |
| Database statements | <i class="icon-check-bold"></i> |                                 |
| Geographic location |                                 |                                 |
| URI parameters      | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| URI userinfo        |                                 |                                 |

{{% /tab %}}

{{% tab "Go" %}}

**Note:** Client IPs are not collected by default and must be enabled. Database statements are obfuscated by the Datadog Agent.

| Category                | Collected                       | Obfuscated                      |
|:------------------------|:-------------------------------:|:-------------------------------:|
| Name                    |                                 |                                 |
| Email                   |                                 |                                 |
| Client IP               | <i class="icon-check-bold"></i> |                                 |
| Database statements     | <i class="icon-check-bold"></i> |                                 |
| Geographic location     |                                 |                                 |
| Client URI path         | <i class="icon-check-bold"></i> |                                 |
| Client URI query string | <i class="icon-check-bold"></i> |                                 |
| Server URI path         | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| Server URI query string | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| HTTP body               | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| HTTP cookies            | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |
| HTTP headers            | <i class="icon-check-bold"></i> | <i class="icon-check-bold"></i> |

{{% /tab %}}

{{% tab "Nginx" %}}

| Category                | Collected                       | Obfuscated |
|:------------------------|:-------------------------------:|:----------:|
| Name                    |                                 |            |
| Email                   |                                 |            |
| Client IP               | <i class="icon-check-bold"></i> |            |
| Database statements     |                                 |            |
| Geographic location     |                                 |            |
| Client URI path         | <i class="icon-check-bold"></i> |            |
| Client URI query string | <i class="icon-check-bold"></i> |            |
| Server URI path         |                                 |            |
| Server URI query string |                                 |            |
| HTTP body               |                                 |            |
| HTTP cookies            |                                 |            |
| HTTP headers            |                                 |            |

{{% /tab %}}

{{% tab "Kong" %}}

| Category                | Collected                       | Obfuscated |
|:------------------------|:-------------------------------:|:----------:|
| Name                    |                                 |            |
| Email                   |                                 |            |
| Client IP               | <i class="icon-check-bold"></i> |            |
| Database statements     |                                 |            |
| Geographic location     |                                 |            |
| Client URI path         | <i class="icon-check-bold"></i> |            |
| Client URI query string |                                 |            |
| Server URI path         |                                 |            |
| Server URI query string |                                 |            |
| HTTP body               |                                 |            |
| HTTP cookies            |                                 |            |
| HTTP headers            |                                 |            |

{{% /tab %}}

{{% tab "Envoy" %}}

| Category                | Collected                       | Obfuscated |
|:------------------------|:-------------------------------:|:----------:|
| Name                    |                                 |            |
| Email                   |                                 |            |
| Client IP               | <i class="icon-check-bold"></i> |            |
| Database statements     |                                 |            |
| Geographic location     |                                 |            |
| Client URI path         |                                 |            |
| Client URI query string |                                 |            |
| Server URI path         |                                 |            |
| Server URI query string |                                 |            |
| HTTP body               |                                 |            |
| HTTP cookies            |                                 |            |
| HTTP headers            |                                 |            |

{{% /tab %}}

{{% /tabs %}}

If you use Datadog Application Security Management (ASM), the tracing libraries collect HTTP request data to help you understand the nature of a security trace. Datadog ASM automatically redacts certain data, and you can configure your own detection rules. Learn more about these defaults and configuration options in the Datadog ASM [data privacy][13] documentation.

## Agent

### Resource names

Datadog spans include a resource name attribute that may contain sensitive data. The Datadog Agent implements obfuscation of resource names for several known cases:

* **SQL numeric literals and bind variables are obfuscated**: For example, the following query `SELECT data FROM table WHERE key=123 LIMIT 10` is obfuscated to `SELECT data FROM table WHERE key = ? LIMIT ?` before setting the resource name for the query span.
* **SQL literal strings are identified using standard ANSI SQL quotes**: This means strings should be surrounded in single quotes (`'`). Some SQL variants optionally support double-quotes (`"`) for strings, but most treat double-quoted things as identifiers. The Datadog obfuscator treats these as identifiers rather than strings and does not obfuscate them.
* **Redis queries are quantized by selecting only command tokens**: For example, the following query `MULTI\nSET k1 v1\nSET k2 v2` is quantized to `MULTI SET SET`.

### Trace obfuscation

The Datadog Agent also obfuscates sensitive [trace][2] data that is not within the resource name. You can configure the obfuscation rules using environment variables or the `datadog.yaml` configuration file.

The following metadata can be obfuscated:

* MongoDB queries
* ElasticSearch request bodies
* Redis commands
* MemCached commands
* HTTP URLs
* Stack traces

**Note:** Obfuscation can have a performance impact on your system, or could redact important information that is not sensitive. Consider what obfuscation you need for your setup, and customize your configuration appropriately.

**Note:** You can use automatic scrubbing for multiple types of services at the same time. Configure each in the `obfuscation` section of your `datadog.yaml` file.
{{< tabs >}}

{{% tab "MongoDB" %}}

MongoDB queries within a [span][1] of type `mongodb` are obfuscated by default.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    mongodb:
      ## Configures obfuscation rules for spans of type "mongodb". Enabled by default.
      enabled: true
      keep_values:
        - document_id
        - template_id
      obfuscate_sql_values:
        - val1
```

This can also be disabled with the environment variable `DD_APM_OBFUSCATION_MONGODB_ENABLED=false`.

* `keep_values` or environment variable `DD_APM_OBFUSCATION_MONGODB_KEEP_VALUES` - defines a set of keys to exclude from Datadog Agent trace obfuscation. If not set, all keys are obfuscated.
* `obfuscate_sql_values` or environment variable `DD_APM_OBFUSCATION_MONGODB_OBFUSCATE_SQL_VALUES` - defines a set of keys to include in Datadog Agent trace obfuscation. If not set, all keys are obfuscated.

[1]: /tracing/glossary/#spans
{{% /tab %}}
{{% tab "ElasticSearch" %}}

ElasticSearch request bodies within a [span][1] of type `elasticsearch` are obfuscated by default.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    elasticsearch:
      ## Configures obfuscation rules for spans of type "elasticsearch". Enabled by default.
      enabled: true
      keep_values:
        - client_id
        - product_id
      obfuscate_sql_values:
        - val1
```

This can also be disabled with the environment variable `DD_APM_OBFUSCATION_ELASTICSEARCH_ENABLED=false`.

* `keep_values` or environment variable `DD_APM_OBFUSCATION_ELASTICSEARCH_KEEP_VALUES` - defines a set of keys to exclude from Datadog Agent trace obfuscation. If not set, all keys are obfuscated.
* `obfuscate_sql_values` or environment variable `DD_APM_OBFUSCATION_ELASTICSEARCH_OBFUSCATE_SQL_VALUES` - defines a set of keys to include in Datadog Agent trace obfuscation. If not set, all keys are obfuscated.

[1]: /tracing/glossary/#spans
{{% /tab %}}
{{% tab "Redis" %}}

Redis commands within a [span][1] of type `redis` are obfuscated by default.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    ## Configures obfuscation rules for spans of type "redis". Enabled by default.
    redis:
      enabled: true
      remove_all_args: true
```

This can also be disabled with the environment variable `DD_APM_OBFUSCATION_REDIS_ENABLED=false`.

* `remove_all_args` or environment variable `DD_APM_OBFUSCATION_REDIS_REMOVE_ALL_ARGS` - replaces all arguments of a redis command with a single "?" if true. Disabled by default.

[1]: /tracing/glossary/#spans
{{% /tab %}}
{{% tab "MemCached" %}}

MemCached commands within a [span][1] of type `memcached` are obfuscated by default.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    memcached:
      ## Configures obfuscation rules for spans of type "memcached". Enabled by default.
      enabled: true
```

This can also be disabled with the environment variable `DD_APM_OBFUSCATION_MEMCACHED_ENABLED=false`.

[1]: /tracing/glossary/#spans
{{% /tab %}}
{{% tab "Http" %}}

HTTP URLs within a [span][1] of type `http` or `web` are not obfuscated by default.

**Note:** Passwords within the Userinfo of a URL are not collected by Datadog.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    http:
      ## Enables obfuscation of query strings in URLs. Disabled by default.
      remove_query_string: true
      remove_paths_with_digits: true
```

* `remove_query_string` or environment variable `DD_APM_OBFUSCATION_HTTP_REMOVE_QUERY_STRING`: If true, obfuscates query strings in URLs (`http.url`).
* `remove_paths_with_digits` or environment variable `DD_APM_OBFUSCATION_HTTP_REMOVE_PATHS_WITH_DIGITS`: If true, path segments in URLs (`http.url`) containing only digits are replaced by "?".

[1]: /tracing/glossary/#spans
{{% /tab %}}
{{% tab "Stack Traces" %}}

Disabled by default.

Set the `remove_stack_traces` parameter to true to remove stack traces and replace them with `?`.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    ## Enables removing stack traces to replace them with "?". Disabled by default.
    remove_stack_traces: true # default false
```

This can also be enabled with the environment variable `DD_APM_OBFUSCATION_REMOVE_STACK_TRACES=true`.

{{% /tab %}}
{{< /tabs >}}

### Replace tags

To scrub sensitive data from your [span][4]'s tags, use the `replace_tags` setting [in your datadog.yaml configuration file][5] or the `DD_APM_REPLACE_TAGS` environment variable. The value of the setting or environment variable is a list of one or more groups of parameters that specify how to replace sensitive data in your tags. These parameters are:

* `name`: The key of the tag to replace. To match all tags, use `*`. To match the resource, use `resource.name`.
* `pattern`: The regexp pattern to match against.
* `repl`: The replacement string.

For example:

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
apm_config:
  replace_tags:
    # Replace all characters starting at the `token/` string in the tag "http.url" with "?"
    - name: "http.url"
      pattern: "token/(.*)"
      repl: "?"
    # Remove trailing "/" character in resource names
    - name: "resource.name"
      pattern: "(.*)\/$"
      repl: "$1"
    # Replace all the occurrences of "foo" in any tag with "bar"
    - name: "*"
      pattern: "foo"
      repl: "bar"
    # Remove all "error.stack" tag's value
    - name: "error.stack"
      pattern: "(?s).*"
    # Replace series of numbers in error messages
    - name: "error.msg"
      pattern: "[0-9]{10}"
      repl: "[REDACTED]"
```

{{% /tab %}}
{{% tab "Environment Variable" %}}

```json
DD_APM_REPLACE_TAGS=[
      {
        "name": "http.url",
        "pattern": "token/(.*)",
        "repl": "?"
      },
      {
        "name": "resource.name",
        "pattern": "(.*)\/$",
        "repl": "$1"
      },
      {
        "name": "*",
        "pattern": "foo",
        "repl": "bar"
      },
      {
        "name": "error.stack",
        "pattern": "(?s).*"
      },
      {
        "name": "error.msg",
        "pattern": "[0-9]{10}",
        "repl": "[REDACTED]"
      }
]
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Set the `DD_APM_REPLACE_TAGS` environment variable:
- For Datadog Operator, in `override.nodeAgent.env` in your `datadog-agent.yaml`
- For Helm, in `agents.containers.traceAgent.env` in your `datadog-values.yaml`
- For manual configuration, in the `trace-agent` container section of your manifest

```yaml
- name: DD_APM_REPLACE_TAGS
  value: '[
            {
              "name": "http.url",
              "pattern": "token/(.*)",
              "repl": "?"
            },
            {
              "name": "resource.name",
              "pattern": "(.*)\/$",
              "repl": "$1"
            },
            {
              "name": "*",
              "pattern": "foo",
              "repl": "bar"
            },
            {
              "name": "error.stack",
              "pattern": "(?s).*"
            },
            {
              "name": "error.msg",
              "pattern": "[0-9]{10}",
              "repl": "[REDACTED]"
            }
          ]'
```

#### Examples

Datadog Operator:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_APM_REPLACE_TAGS
          value: '[
                   {
                     "name": "http.url",
                  # (...)
                  ]'
```

Helm:

```yaml
agents:
  containers:
    traceAgent:
      env:
        - name: DD_APM_REPLACE_TAGS
          value: '[
                   {
                     "name": "http.url",
                  # (...)
                  ]'
```

[1]: /containers/kubernetes/installation/?tab=daemonset
[2]: /containers/kubernetes/installation/?tab=helm
{{% /tab %}}
{{% tab "docker-compose" %}}

```docker-compose.yaml
- DD_APM_REPLACE_TAGS=[{"name":"http.url","pattern":"token/(.*)","repl":"?"},{"name":"resource.name","pattern":"(.*)\/$","repl":"$1"},{"name":"*","pattern":"foo","repl":"bar"},{"name":"error.stack","pattern":"(?s).*"},{"name":"error.msg","pattern":"[0-9]{10}","repl":"[REDACTED]"}]
```

{{% /tab %}}
{{< /tabs >}}

### Ignore resources

For an in depth overview of the options to avoid tracing specific resources, see [Ignoring Unwanted Resources][6].

If your services include simulated traffic such as health checks, you may want to exclude these traces from being collected so the metrics for your services match production traffic.

The Agent can be configured to exclude a specific resource from traces sent by the Agent to Datadog. To prevent the submission of specific resources, use the `ignore_resources` setting in the `datadog.yaml` file . Then create a list of one or more regular expressions, specifying which resources the Agent filters out based on their resource name.

If you are running in a containerized environment, set `DD_APM_IGNORE_RESOURCES` on the container with the Datadog Agent instead. See the [Docker APM Agent environment variables][7] for details.

```text
###### @param ignore_resources - list of strings - optional

###### A list of regular expressions can be provided to exclude certain traces based on their resource name.

###### All entries must be surrounded by double quotes and separated by commas.

###### ignore_resources: ["(GET|POST) /healthcheck","API::NotesController#index"]

```

## Library

### HTTP

Datadog is standardizing [span tag semantics][3] across tracing libraries. Information from HTTP requests are added as span tags prefixed with `http.`. The libraries have the following configuration options to control sensitive data collected in HTTP spans.
    
#### Redact query strings

The `http.url` tag is assigned the full URL value, including the query string. The query string could contain sensitive data, so by default Datadog parses it and redacts suspicious-looking values. This redaction process is configurable. To modify the regular expression used for redaction, set the `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP` environment variable to a valid regex of your choice. Valid regex is platform-specific. When the regex finds a suspicious key-value pair, it replaces it with `<redacted>`.

If you do not want to collect the query string, set the `DD_HTTP_SERVER_TAG_QUERY_STRING` environment variable to `false`. The default value is `true`.

#### Collect headers

To collect trace header tags, set the `DD_TRACE_HEADER_TAGS` environment variable with a map of case-insensitive header keys to tag names. The library applies matching header values as tags on root spans. The setting also accepts entries without a specified tag name, for example:

```
DD_TRACE_HEADER_TAGS=CASE-insensitive-Header:my-tag-name,User-ID:userId,My-Header-And-Tag-Name
```

### Processing 

Some tracing libraries provide an interface for processing spans to manually modify or remove sensitive data collected in traces:

* Java: [TraceInterceptor interface][9]
* Ruby: [Processing Pipeline][10]
* Python: [Trace Filtering][11]

## Telemetry collection

Datadog may gather environmental and diagnostic information about your tracing libraries for processing; this may include information about the host running an application, operating system, programming language and runtime, APM integrations used, and application dependencies. Additionally, Datadog may collect information such as diagnostic logs, crash dumps with obfuscated stack traces, and various system performance metrics.

You can disable this telemetry collection using either of these settings:

{{< tabs >}}
{{% tab "datadog.yaml" %}}

```yaml
apm_config:
  telemetry:
    enabled: false
```

{{% /tab %}}
{{% tab "Environment variables" %}}

```bash
export DD_INSTRUMENTATION_TELEMETRY_ENABLED=false
```

{{% /tab %}}
{{< /tabs >}}

## PCI DSS compliance for compliance for APM

{{< site-region region="us" >}}

<div class="alert alert-warning">
PCI compliance for APM is only available for Datadog organizations in the <a href="/getting_started/site/">US1 site</a>.
</div>

To set up a PCI-compliant Datadog org, follow these steps:

{{% pci-apm %}}

See [PCI DSS Compliance][1] for more information. To enable PCI compliance for logs, see [PCI DSS compliance for Log Management][2].

[1]: /data_security/pci_compliance/
[2]: /data_security/pci_compliance/?tab=logmanagement

{{< /site-region >}}

{{< site-region region="us2,us3,us5,eu,gov" >}}
PCI compliance for APM is not available for the {{< region-param key="dd_site_name" >}} site.
{{< /site-region >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /tracing/glossary/#trace
[3]: /tracing/trace_collection/tracing_naming_convention/#http-requests
[4]: /tracing/glossary/#spans
[5]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[6]: /tracing/guide/ignoring_apm_resources/
[7]: /agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[8]: /tracing/guide/send_traces_to_agent_by_api/
[9]: /tracing/trace_collection/custom_instrumentation/java/#extending-tracers
[10]: /tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[11]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace-filtering
[12]: /sensitive_data_scanner/
[13]: /security/application_security/how-appsec-works/#data-privacy
