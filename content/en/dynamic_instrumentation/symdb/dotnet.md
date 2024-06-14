---
title: Enable autocomplete and search for .NET
kind: Documentation
aliases:
    - /tracing/dynamic_instrumentation/enabling/dotnet/
is_beta: false
private: false
code_lang: dotnet
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'agent'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

{{< beta-callout url="#" btn_hidden="true" >}}
Autocomplete and search are in public beta.
{{< /beta-callout >}}

## Requirements

- [Dynamic Instrumentation][1] is enabled for your service.
- Tracing library [`dd-trace-dotnet`][1] 2.54.0 or higher is installed.

## Installation

Run your service with Dynamic Instrumentation enabled, and additionally enable autocomplete and search:

1. Set the `DD_SYMBOL_DATABASE_UPLOAD_ENABLED` environment variable to `true`.
1. Specify the `DD_SERVICE` and `DD_VERSION` [Unified Service Tags][2] as environment variables.
1. After starting your service with Dynamic Instrumentation with autocomplete and search enabled, you can use Dynamic Instrumentation's IDE-like features on the [APM > Dynamic Instrumentation page][3].

## Additional configuration

### Third party detection

Autocomplete and search use a heuristic to filter out third-party code. If it does not provide the autocomplete suggestions you are expecting, it may be due to your code being recognized as third-party.

If your code is accidentally recognized as third-party code or third-party code is accidentally recognized as user code, you can configure the third-party detection with these settings:

```
export DD_THIRD_PARTY_DETECTION_EXCLUDES=<LIST_OF_USER_CODE_PACKAGE_PREFIXES>
export DD_THIRD_PARTY_DETECTION_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES>
```

[1]: /dynamic_instrumentation
[2]: /getting_started/tagging/unified_service_tagging
[3]: https://app.datadoghq.com/dynamic-instrumentation
