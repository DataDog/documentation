---
title: Enable Autocomplete and Search for Java
description: Configure Java applications to enable IDE-like autocomplete and search features for Dynamic Instrumentation.
is_beta: false
private: false
code_lang: java
type: multi-code-lang
code_lang_weight: 10
aliases:
    - /dynamic_instrumentation/symdb/java
---

## Requirements

- [Dynamic Instrumentation][1] is enabled for your service.
- Tracing library [`dd-trace-java`][6] 1.42.0 or higher is installed.

## Installation

Run your service with Dynamic Instrumentation enabled, autocomplete and search are automatically enabled.

## Additional configuration

### Disabling autocomplete and search

To disable autocomplete and search for your service, use the following option:

```
export DD_SYMBOL_DATABASE_UPLOAD_ENABLED=false
```

or:

```
  -Ddd.symbol.database.upload.enabled=false
```

### Third party detection

If autocomplete suggestions do not appear for your package or module, it may be incorrectly recognized as third-party code. The autocomplete and search features use a heuristic to filter out third-party code, which can sometimes lead to accidental misclassification.

To ensure that your code is properly recognized and to enable accurate autocomplete and search functionality, you can configure the third-party detection settings using the following options:

```
export DD_THIRD_PARTY_EXCLUDES=<LIST_OF_USER_CODE_PACKAGE_PREFIXES>
export DD_THIRD_PARTY_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES>
```

or:

```
  -Ddd.third.party.excludes=<LIST_OF_USER_CODE_PACKAGE_PREFIXES> \
  -Ddd.third.party.includes=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES> \
```

Where a list means a comma separated list of package prefixes, for example

```
export DD_THIRD_PARTY_EXCLUDES=com.mycompany,io.mycompany
```

[1]: /dynamic_instrumentation
[6]: https://github.com/DataDog/dd-trace-java
