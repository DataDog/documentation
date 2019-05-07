---
title: Agent Trace Obfuscation
kind: guide
private: true
disable_toc: true
---

Agent trace obfuscation is disabled by default. Enable it in your `datadog.yaml` configuration file to obfuscate all information attached to your traces, the general format is:

```
obfuscation:
  <SERVICE_NAME>:
    enabled: true
    keep_values:
      - <VALUE_1>
      - <VALUE_2>
```

* `enabled` should be set to true to have obfuscation enabled for the specified `<SERVICE_NAME>`.
* `keep_values` are a set of keys from which the values are not obfuscated.

Find below some examples:

**ElasticSearch obfuscation rules**. Applies to spans of type `elasticsearch`, more specifically, to the `elasticsearch.body` span metadata:

```
obfuscation:
  elasticsearch:
    enabled: true
    keep_values:
      - user_id
      - category_id
```

**MongoDB obfuscation rules**. Applies to spans of type `mongodb`, more specifically: to the `mongodb.query` span metadata.

```
obfuscation:
  mongodb:
    enabled: true
    keep_values:
      - uid
      - cat_id
```

For web services, there is a specific set of boolean parameters that can be applied:

* `remove_query_string`: If true, query strings in URLs are obfuscated.
* `remove_paths_with_digits`: If true, path segments in URLs containing digits are replaced by "?".

For instance, find below an example of HTTP obfuscation rules for `http.url` metadata in spans of type `http`:

```
obfuscation:
  http:
    remove_query_string: true
    remove_paths_with_digits: true
```
