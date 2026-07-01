---
title: Enabling Dynamic Instrumentation
description: Enable Dynamic Instrumentation for your applications to add probes and capture runtime data without code changes.
type: multi-code-lang
aliases:
    - /dynamic_instrumentation/enabling/
    - /tracing/dynamic_instrumentation/enabling
private: false
further_reading:
    - link: '/agent/'
      tag: 'Documentation'
      text: 'Getting Started with Datadog Agent'
---

Dynamic Instrumentation is a feature of supporting Datadog SDKs. If you are already using [APM to collect traces][1] for your application, ensure your SDK is up-to-date and then enable Dynamic Instrumentation for your application.

Select your runtime below to learn how to enable Dynamic Instrumentation for your application:

{{< card-grid card_width="170px" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/python" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/dotnet" src="integrations_logos/dotnet-core.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/dotnet" src="integrations_logos/dotnet-framework.png" alt="Dotnet" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/nodejs" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/php" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="/dynamic_instrumentation/enabling/go" src="integrations_logos/go-metro.png" alt="Go" >}}
{{< /card-grid >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
