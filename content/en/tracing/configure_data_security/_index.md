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

**Note:** Client IP are not collected by default and must be enabled.

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

{{% /tabs %}}

If you use Datadog Application Security Management (ASM), the tracing libraries collect HTTP request data to help you understand the nature of a suspicious request. Datadog ASM automatically redacts certain data, and you can configure your own detection rules. Learn more about these defaults and configuration options in the Datadog ASM [data privacy][13] documentation.

## Agent

### Resource names

Datadog spans include a resource name attribute that may contain sensitive data. The Datadog Agent implements obfuscation for several known cases:

* **SQL numeric literals and bind variables are obfuscated**: For example, the following query `SELECT data FROM table WHERE key=123 LIMIT 10` is obfuscated to `SELECT data FROM table WHERE key = ? LIMIT ?` before setting the resource name for the query span.
* **SQL literal strings are identified using standard ANSI SQL quotes**: This means strings should be surrounded in single quotes (`'`). Some SQL variants optionally support double-quotes (`"`) for strings, but most treat double-quoted things as identifiers. The Datadog obfuscator treats these as identifiers rather than strings and does not obfuscate them.
* **Redis queries are quantized by selecting only command tokens**: For example, the following query `MULTI\nSET k1 v1\nSET k2 v2` is quantized to `MULTI SET SET`.

### Trace obfuscation

Agent [trace][2] obfuscation is disabled by default. Enable it in your `datadog.yaml` configuration file to obfuscate all information attached to your traces.

This option works with the following services:

* `mongodb`
* `elasticsearch`
* `redis`
* `memcached`
* `http`
* `remove_stack_traces`

**Note:** You can use automatic scrubbing for multiple types of services at the same time. Configure each in the `obfuscation` section of your `datadog.yaml` file.
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

[1]: /tracing/glossary/#spans
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

[1]: /tracing/glossary/#spans
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
      # If true, replaces all arguments with a single "?".
      remove_all_args: true
```

[1]: /tracing/glossary/#spans
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

[1]: /tracing/glossary/#spans
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


[1]: /tracing/glossary/#spans
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

Put this environment variable in the trace-agent container if you are using the [daemonset configuration][1], or use `agents.containers.traceAgent.env` in the `values.yaml` file if you are using [helm chart][2].

```datadog-agent.yaml
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

[1]: /containers/kubernetes/installation/?tab=daemonset
[2]: /containers/kubernetes/installation/?tab=helm
{{% /tab %}}
{{% tab "docker-compose" %}}

```docker-compose.yaml
- DD_APM_REPLACE_TAGS=[{"name":"http.url","pattern":"token/(.*)","repl":"?"},{"name":"resource.name","pattern":"(.*)\/$","repl": "$1"},{"name":"*","pattern":"foo","repl":"bar"},{"name":"error.stack","pattern":"(?s).*"}, {"name": "error.msg", "pattern": "[0-9]{10}", "repl": "[REDACTED]"}]
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
PCI compliance for APM is only available for new Datadog organizations created in the <a href="/getting_started/site/">US1 site</a>.
</div>

PCI compliance for APM is available when you create a new Datadog organization. To set up a PCI-compliant Datadog org, follow these steps:

1. Set up a new Datadog org in the [US1 site][1]. PCI DSS compliance is only supported for new orgs created in US1.
2. Contact [Datadog support][2] or your [Customer Success Manager][3] to request that the new org be configured as a PCI-compliant org.
3. Enable [Audit Trail][4] in the new org. Audit Trail must be enabled and remain enabled for PCI DSS compliance.
4. After Datadog support or Customer Success confirms that the new org is PCI DSS compliant, configure the Agent configuration file to send spans to the dedicated PCI-compliant endpoint (`https://trace-pci.agent.datadoghq.com`):
    ```
    apm_config:
      apm_dd_url: <https://trace-pci.agent.datadoghq.com>
    ```

To enable PCI compliance for logs, see [PCI DSS compliance for Log Management][5].

[1]: /getting_started/site/
[2]: /help/
[3]: mailto:success@datadoghq.com
[4]: /account_management/audit_trail/
[5]: /data_security/logs/#pci-dss-compliance-for-log-management


{{< /site-region >}}

{{< site-region region="us2,us3,us5,eu,gov" >}}
PCI compliance for APM is not available for the {{< region-param key="dd_site_name" >}} site.
{{< /site-region >}}

[1]: /help/
[2]: /tracing/glossary/#trace
[3]: /tracing/trace_collection/tracing_naming_convention/#http-requests
[4]: /tracing/glossary/#spans
[5]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[6]: /tracing/guide/ignoring_apm_resources/
[7]: /agent/docker/apm/?tab=standard#docker-apm-agent-environment-variables
[8]: /tracing/guide/send_traces_to_agent_by_api/
[9]: /tracing/trace_collection/custom_instrumentation/java/#extending-tracers
[10]: /tracing/trace_collection/custom_instrumentation/ruby/?tab=activespan#post-processing-traces
[11]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#trace-filtering
[12]: /sensitive_data_scanner/
[13]: /security/application_security/how-appsec-works/#data-privacy
