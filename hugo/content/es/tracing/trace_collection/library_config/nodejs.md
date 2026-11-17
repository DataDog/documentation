---
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: Código fuente
  text: Código fuente
- link: https://datadog.github.io/dd-trace-js
  tag: Documentación
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
title: Configuración del SDK de Node.js
type: multi-code-lang
---
Después de configurar el SDK con su código y configurar el Agent para recopilar datos de APM, configure opcionalmente el SDK como desee, incluida la configuración de [unified service tagging][1].

{{% apm-config-visibility %}}

Se recomienda que utilice `DD_ENV`, `DD_SERVICE` y `DD_VERSION` para establecer `env`, `service` y `version` para sus servicios. Revise la documentación de [unified service tagging][1] para obtener recomendaciones sobre la configuración de estas variables de entorno.

Para obtener más ejemplos sobre cómo trabajar con la biblioteca, consulte la [documentación de la API][2].

## Modo Agentless {#agentless-mode}

A partir de `dd-trace` v5.125.0 y v6.14.0, puede enviar datos directamente a Datadog sin un Datadog Agent. Para habilitar el modo Agentless, establezca las siguientes variables de entorno:

- `DD_AGENTLESS_ENABLED`: `true`
- `DD_API_KEY`: Su [clave de API][7] de Datadog
- `DD_SITE`: Su [sitio de Datadog][8]

```shell
export DD_AGENTLESS_ENABLED=true
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE={{< region-param key="dd_site" >}}
```

Si `DD_AGENTLESS_ENABLED` es `true` y `DD_API_KEY` no está establecido, el SDK registra un error y no envía trazas, solicitudes de Remote Configuration ni datos de Dynamic Instrumentation.

En el modo Agentless, el SDK envía los siguientes datos directamente a Datadog:

- Trazas
- [Remote Configuration][9]
- [Dynamic Instrumentation][10]
- Logs de Bunyan, Pino y Winston
- [Test Optimization][11]
- [LLM Observability][12]
- Configuración de [Feature Flags][16]

Las siguientes funciones requieren un Agent y están deshabilitadas en el modo Agentless:

- [Métricas de tiempo de ejecución][17]
- [Data Streams Monitoring][18]
- Métricas personalizadas de DogStatsD
- [Profiling][19], a menos que `DD_PROFILING_EXPORTERS` incluya un exportador distinto a `agent`

El modo Agentless también cambia el siguiente comportamiento:

- `DD_TRACE_SAMPLING_RULES` y `DD_TRACE_RATE_LIMIT` se ignoran. `DD_TRACE_SAMPLE_RATE` sigue aplicándose.
- Para dejar de enviar logs directamente, establezca `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` en `false`.

## Claves de configuración {#configuration-keys}

{{< partial name="apm/registry-config-list.html" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging/
[2]: https://datadog.github.io/dd-trace-js/
[3]: /es/tracing/trace_pipeline/ingestion_mechanisms/
[4]: /es/help/
[5]: /es/tracing/trace_collection/trace_context_propagation/
[6]: /es/tracing/guide/aws_payload_tagging/?code-lang=nodejs
[7]: /es/account_management/api-app-keys/#api-keys
[8]: /es/getting_started/site/
[9]: /es/remote_configuration/
[10]: /es/tracing/trace_collection/dynamic_instrumentation/
[11]: /es/tests/
[12]: /es/llm_observability/
[13]: /es/agent/configuration/network/#configure-ports
[14]: /es/opentelemetry/interoperability/environment_variable_support
[15]: /es/tracing/trace_collection/custom_instrumentation/nodejs/otel/
[16]: /es/feature_flags/
[17]: /es/tracing/metrics/runtime_metrics/
[18]: /es/data_streams/
[19]: /es/profiler/