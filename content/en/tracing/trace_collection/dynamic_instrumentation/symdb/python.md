---
title: Enable Autocomplete and Search for Python
description: Configure Python applications to enable IDE-like autocomplete and search features for Dynamic Instrumentation.
is_beta: true
private: false
code_lang: python
type: multi-code-lang
code_lang_weight: 20
aliases:
    - /dynamic_instrumentation/symdb/python
    - /tracing/dynamic_instrumentation/symdb/python
---
{{< beta-callout url="#" btn_hidden="true" >}}
Autocomplete and search are in Preview.
{{< /beta-callout >}}

## Requirements

- [Dynamic Instrumentation][1] is enabled for your service.
- Tracing library [`dd-trace-py`][6] 2.9.0 or higher is installed.

## Installation

Run your service with Dynamic Instrumentation enabled, and additionally enable autocomplete and search:

1. Run your service with Dynamic Instrumentation enabled by setting the `DD_DYNAMIC_INSTRUMENTATION_ENABLED` environment variable to `true`.
2. Specify `DD_SERVICE` and `DD_VERSION` [Unified Service Tags][5].
3. Invoke your service:

  ```shell
  export DD_SERVICE=<YOUR_SERVICE>
  export DD_ENV=<YOUR_ENV>
  export DD_VERSION=<YOUR_VERSION>
  export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
  export DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true
  ddtrace-run python -m myapp
  ```

After starting your service with the required features enabled, you can use Dynamic Instrumentation's IDE-like features on the [**APM** > **Dynamic Instrumentation**][4] page.

## Additional configuration

### Third party detection

If autocomplete suggestions do not appear for your package or module, it may be incorrectly recognized as third-party code. The autocomplete and search features use a heuristic to filter out third-party code, which can sometimes lead to accidental misclassification.

To ensure that your code is properly recognized, and to enable accurate autocomplete and search functionality, configure your third-party detection settings to use the following options:

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=<LIST_OF_USER_CODE_MODULES>
export DD_THIRD_PARTY_DETECTION_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>
```

where `<LIST_OF_USER_CODE_MODULES>` and `<LIST_OF_ADDITIONAL_THIRD_PARTY_MODULES>` are comma separated lists of package prefixes. For example:

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=shopping,database
```

[1]: /dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-py
