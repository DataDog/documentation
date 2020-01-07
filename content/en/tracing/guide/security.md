---
title: Security
kind: documentation
---

Sensitive information within your [traces][1] can be scrubbed [automatically](#automatic-scrubbing) or [manually](#replace-rules).

## Automatic scrubbing

Automatic scrubbing is available for some [services][2], such as ElasticSearch, MongoDB, Redis, Memcached, and HTTP server and client request URLs. Below is an example configuration snippet documenting all the available options.

```yaml
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

## Replace rules

To scrub sensitive data from your [span][3]'s tags, use the `replace_tags` setting [in your datadog.yaml configuration file][4] or the `DD_APM_REPLACE_TAGS` environment variable. It is a list containing one or more groups of parameters that describe how to perform replacements of sensitive data within your tags. These parameters are:

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

[1]: /tracing/visualization/#trace
[2]: /tracing/visualization/#services
[3]: /tracing/visualization/#spans
[4]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
