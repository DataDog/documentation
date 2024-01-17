---
title: Symbol Database
kind: documentation
is_beta: true
private: true
further_reading:
- link: "/dynamic_instrumentation/"
  tag: "Documentation"
  text: "Learn more about the Dynamic Instrumentation"
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">Symbol Database is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< beta-callout-private url="https://forms.gle/UG9EELAy8Li6z2jW8" >}}
Interested in an improved user experience when creating Dynamic Instrumentation probes? Join the Symbol Database private beta here.
{{< /beta-callout-private >}}

## Overview

Symbol Database uploads non-sensitive symbols and metadata from your application to the Datadog backend to enhance the user experience of [Dynamic Instrumentation][1] with IDE-like features like search and auto-complete. The uploaded data includes class and method names as well as field-, argument- and local variable names and related meta data like line numbers.

## Getting started

### Prerequisites

Symbol Database requires the following:

- You have on-boarded with [Dynamic Instrumentation][1]
- [Datadog Agent][2] 7.45.0 or higher is installed alongside your service.
- [Remote Configuration][3] is enabled in that Agent.
- For Java applications, tracing library [`dd-trace-java`][6] 1.25.0 or higher.
- [Unified Service Tagging][4] tags `service`, `env`, and `version` are applied to your deployment.

### Enable Symbol Database for your service

To learn how to enable Symbol Database for your service, select your runtime below:

{{< partial name="dynamic_instrumentation/symbol-database-languages.html" >}}

## Explore Symbol Database

With Symbol Database, the user experience of Dynamic Instrumentation is improved to behave more like an IDE.

Symbol Database provides search for class- and method names:
{{< img src="dynamic_instrumentation/symdb_method_search.png" alt="Search for methods when creating a Dynamic Instrumentation log probe" >}}

Once selected, it will highlight the selected method:
{{< img src="dynamic_instrumentation/symdb_method_highlight.png" alt="Symbol Database highlights the selected method" >}}

Symbol Database also provides auto-complete for log-templates and other places that use the [Dynamic Instrumentation expression language][5]:
{{< img src="dynamic_instrumentation/symdb_completion.png" alt="Get auto-complete suggestions for log templates" >}}

[1]: /dynamic_instrumentation/
[2]: /agent/
[3]: /agent/remote_config/
[4]: /getting_started/tagging/unified_service_tagging/
[5]: /dynamic_instrumentation/expression-language
[6]: https://github.com/DataDog/dd-trace-java
[7]: https://github.com/DataDog/dd-trace-py
[8]: https://github.com/DataDog/dd-trace-dotnet
[9]: /integrations/guide/source-code-integration/
