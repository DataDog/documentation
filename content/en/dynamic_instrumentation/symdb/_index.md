---
<<<<<<< HEAD
title: Autocomplete and Search
kind: documentation
=======
title: Symbol Database
>>>>>>> origin/master
is_beta: true
private: false
further_reading:
- link: "/dynamic_instrumentation/"
  tag: "Documentation"
  text: "Learn more about Dynamic Instrumentation"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Autocomplete and search are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< beta-callout url="#" btn_hidden="true" >}}
Autocomplete and search are in public beta.
{{< /beta-callout >}}

## Overview

Autocomplete and search enhance the user experience of [Dynamic Instrumentation][1] by adding IDE-like features like class and method search and autocomplete for [Dynamic Instrumentation Expression Language][5].

To provide autocomplete and search, nonsensitive symbols and metadata are uploaded from your application to Datadog. The uploaded data includes the names of classes, methods, arguments, fields, and local variables, along with related metadata, like line numbers.

## Getting started

### Prerequisites

Autocomplete and search require the following:

- [Dynamic Instrumentation][1] is enabled for your service.
- [Datadog Agent][2] 7.45.0 or higher is installed alongside your service.
- [Remote Configuration][3] is enabled in the Agent.
- The [Unified Service Tagging][4] tags `service`, `env`, and `version` are applied to your deployment.

### Enable autocomplete and search for your service

Select your runtime below:

{{< partial name="dynamic_instrumentation/symbol-database-languages.html" >}}

## Explore autocomplete and search

With autocomplete and search, the user experience of Dynamic Instrumentation is improved to behave more like an IDE.

Dynamic Instrumentation provides search for class and method names:
{{< img src="dynamic_instrumentation/symdb_method_search.png" alt="Search for methods when creating a Dynamic Instrumentation log probe" style="width:60%;" >}}

When you select a method in the Dynamic Instrumentation configuration, the code for that method is displayed:
{{< img src="dynamic_instrumentation/symdb_method_highlight.png" alt="Autocomplete and search highlights the selected method" >}}

Dynamic Instrumentation also provides autocomplete for log templates and other templates that use the [Dynamic Instrumentation expression language][5]:
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
