---
aliases:
- /es/dynamic_instrumentation/enabling/
further_reading:
- link: /agent/
  tag: Documentación
  text: Empezando con Datadog Agent
private: false
title: Activar Dynamic Instrumentation
type: multi-code-lang
---

Dynamic Instrumentation es una función de las bibliotecas de rastreo compatibles con Datadog. Si ya estás utilizando [APM para recopilar traces (trazas)][1] para tu aplicación, asegúrate de que tu biblioteca de rastreo esté actualizada y, a continuación, activa Dynamic Instrumentation para tu aplicación.

Selecciona a continuación tu tiempo de ejecución para saber cómo activar Dynamic Instrumentation para tu aplicación:

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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_collection/