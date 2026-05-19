---
title: Enable Autocomplete and Search for Ruby
description: Configure Ruby applications to enable IDE-like autocomplete and search features for Dynamic Instrumentation.
is_beta: true
private: false
code_lang: ruby
type: multi-code-lang
code_lang_weight: 60
aliases:
    - /dynamic_instrumentation/symdb/ruby
    - /tracing/dynamic_instrumentation/symdb/ruby
---
{{< beta-callout url="#" btn_hidden="true" >}}
Autocomplete and search are in Preview.
{{< /beta-callout >}}

## Requirements

- [Dynamic Instrumentation][1] is enabled for your service.
- Tracing library [`dd-trace-rb`][6] TBD or higher is installed.
- Ruby 2.7 or higher. On Ruby 2.6, parameter names are not available for autocomplete because the runtime does not expose them.

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
  bundle exec rails server
  ```

After starting your service with the required features enabled, you can use Dynamic Instrumentation's IDE-like features on the [**APM** > **Dynamic Instrumentation**][4] page.

## Additional notes

### Forking servers

When your application uses a forking server (Puma in clustered mode, Unicorn, Passenger), each worker process uploads its own symbol set after the fork. Workers that load additional code after forking continue to upload incrementally as new classes are loaded.

[1]: /dynamic_instrumentation
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-rb
