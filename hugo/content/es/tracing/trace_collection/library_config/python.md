---
code_lang: python
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-trace-py
  tag: Código fuente
  text: Código fuente
- link: https://ddtrace.readthedocs.io/en/stable/
  tag: Sitio externo
  text: Documentación de la API
- link: /tracing/trace_collection/trace_context_propagation/
  tag: Documentación
  text: Propagación del contexto de trazas
- link: tracing/glossary/
  tag: Documentación
  text: Explore sus servicios, recursos y trazas
- link: tracing/
  tag: Documentación
  text: Uso avanzado
- link: /opentelemetry/interoperability/environment_variable_support
  tag: Documentación
  text: Configuraciones de variables de entorno de OpenTelemetry
title: Configuración del SDK de Python
type: multi-code-lang
---
Después de configurar el SDK con su código y configurar el Datadog Agent para recopilar datos de APM, configure opcionalmente el SDK como desee, incluida la configuración de [unified service tagging][1].

{{% apm-config-visibility %}}

## Modo Agentless {#agentless-mode}

A partir de `ddtrace` v4.15.0, puede enviar datos directamente a Datadog sin un Datadog Agent. Para habilitar el modo Agentless, establezca las siguientes variables de entorno:

- `DD_AGENTLESS_ENABLED`: `true`
- `DD_API_KEY`: Su [clave de API][3] de Datadog
- `DD_SITE`: Su [sitio de Datadog][4]

```shell
export DD_AGENTLESS_ENABLED=true
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" >}}
```

Si `DD_AGENTLESS_ENABLED` es `true` y `DD_API_KEY` no está configurado, el SDK genera un error al iniciarse.

En el modo Agentless, el SDK envía los siguientes datos directamente a Datadog:

- Trazas
- [Remote Configuration][5]
- [Dynamic Instrumentation][6]
- [Test Optimization][7]
- [LLM Observability][8]

Las siguientes funciones requieren un Datadog Agent y no tienen efecto en el modo Agentless:

- [Runtime metrics][9]
- [Profiling][10]
- Tracer flares

`DD_CIVISIBILITY_AGENTLESS_ENABLED` y `DD_LLMOBS_AGENTLESS_ENABLED` tienen como valor predeterminado el valor de `DD_AGENTLESS_ENABLED`. Establezca explícitamente cualquiera de los dos para anular el modo Agentless para ese producto.

Al usar **ddtrace-run**, se pueden utilizar las siguientes [opciones de variables de entorno][2]:

## Claves de configuración {#configuration-keys}

{{< partial name="apm/registry-config-list.html" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging
[2]: https://ddtrace.readthedocs.io/en/stable/advanced_usage.html#ddtracerun
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/getting_started/site/
[5]: /es/remote_configuration/
[6]: /es/tracing/trace_collection/dynamic_instrumentation/
[7]: /es/tests/
[8]: /es/llm_observability/
[9]: /es/tracing/metrics/runtime_metrics/
[10]: /es/profiler/