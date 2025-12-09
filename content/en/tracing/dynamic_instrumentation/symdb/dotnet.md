---
title: Enable Autocomplete and Search for .NET
description: Configure .NET applications to enable IDE-like autocomplete and search features for Dynamic Instrumentation.
is_beta: true
private: false
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 10
aliases:
    - /dynamic_instrumentation/symdb/dotnet
---
{{< beta-callout url="#" btn_hidden="true" >}}
Autocomplete and search are in Preview.
{{< /beta-callout >}}

## Requirements

- [Dynamic Instrumentation][1] is enabled for your service.
- Tracing library [`dd-trace-dotnet`][6] 2.58.0 or higher is installed.

## Installation

Run your service with Dynamic Instrumentation enabled, and additionally enable autocomplete and search:

1. Set the `DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true` environment variable.
2. Specify the `DD_SERVICE` and `DD_VERSION` [Unified Service Tags][5].
3. After starting your service with Dynamic Instrumentation and autocomplete and search enabled, you can use Dynamic Instrumentation's IDE-like features on the [**APM** > **Dynamic Instrumentation**][4] page.

## Additional configuration

### Third party detection

If autocomplete suggestions do not appear for your package or module, it may be incorrectly recognized as third-party code. The autocomplete and search features use a heuristic to filter out third-party code, which can sometimes lead to accidental misclassification.

To ensure that your code is properly recognized and to enable accurate autocomplete and search functionality, you can configure the third-party detection settings using the following options:

```shell
export DD_THIRD_PARTY_EXCLUDES=<LIST_OF_USER_CODE_PACKAGE_PREFIXES>
export DD_THIRD_PARTY_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES>
```

Where a list means a comma separated list of package prefixes, for example:

```shell
export DD_THIRD_PARTY_EXCLUDES=com.mycompany,io.mycompany
```

[1]: /dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-dotnet
