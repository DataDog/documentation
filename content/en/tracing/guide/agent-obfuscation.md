---
title: Agent Trace Obfuscation
kind: guide
private: true
---

Agent [trace][1] obfuscation is disabled by default. Enable it in your `datadog.yaml` configuration file to obfuscate all information attached to your traces.

Currently this options only works with the following services:

* `mongodb`
* `elasticsearch`
* `redis`
* `memcached`
* `http`
* `remove_stack_traces`

{{< tabs >}}
{{% tab "MongoDB" %}}

Applies to [spans][1] of type `mongodb`, more specifically: to the `mongodb.query` span tags.

```yaml
apm_config:
  enabled: true

  ## (...)

  obfuscation:
    mongodb:
      enabled: true
      keep_values:
        - uid
        - cat_id
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
    elasticsearch:
      enabled: true
      keep_values:
        - user_id
        - category_id
```

* `keep_values` - defines a set of keys to exclude from Agent trace obfuscation.
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

[1]: /tracing/visualization/#trace
