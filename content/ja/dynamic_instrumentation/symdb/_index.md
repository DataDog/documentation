---
title: Symbol Database
is_beta: true
private: true
further_reading:
- link: /dynamic_instrumentation/
  tag: Documentation
  text: Learn more about Dynamic Instrumentation
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">Symbol Database is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< beta-callout-private url="https://forms.gle/UG9EELAy8Li6z2jW8" >}}
Interested in an improved user experience when creating Dynamic Instrumentation probes? Join the Symbol Database private beta here.
{{< /beta-callout-private >}}

## Overview

Symbol Database enhances the user experience of [Dynamic Instrumentation][1]  by adding IDE-like features like search and autocomplete. 

Symbol Database uploads nonsensitive symbols and metadata from your application to Datadog. The uploaded data includes the names of classes, methods, arguments, fields, and local variables, along with related metadata, like line numbers.

## Getting started

### Prerequisites

Symbol Database requires the following:

- [Dynamic Instrumentation][1] is enabled for your service.
- [Datadog Agent][2] 7.45.0 or higher is installed alongside your service.
- [Remote Configuration][3] is enabled in the Agent.
- The [Unified Service Tagging][4] tags `service`, `env`, and `version` are applied to your deployment.

### Enable Symbol Database for your service

Select your runtime below:

{{< partial name="dynamic_instrumentation/symbol-database-languages.html" >}}

## Explore Symbol Database

With Symbol Database, the user experience of Dynamic Instrumentation is improved to behave more like an IDE.

Symbol Database provides search for class and method names:
{{< img src="dynamic_instrumentation/symdb_method_search.png" alt="Search for methods when creating a Dynamic Instrumentation log probe" style="width:60%;" >}}

When you select a method in the Dynamic Instrumentation configuration, the code for that method is displayed:
{{< img src="dynamic_instrumentation/symdb_method_highlight.png" alt="Symbol Database highlights the selected method" >}}

Symbol Database also provides autocomplete for log templates and other templates that use the [Dynamic Instrumentation expression language][5]:
{{< img src="dynamic_instrumentation/symdb_completion.png" alt="Autocomplete suggestions for log templates" style="width:80%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dynamic_instrumentation/
[2]: /agent/
[3]: /agent/remote_config/
[4]: /getting_started/tagging/unified_service_tagging/
[5]: /dynamic_instrumentation/expression-language
[6]: https://github.com/DataDog/dd-trace-java
[7]: https://github.com/DataDog/dd-trace-py
[8]: https://github.com/DataDog/dd-trace-dotnet
[9]: /integrations/guide/source-code-integration/
