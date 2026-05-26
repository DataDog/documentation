---
algolia:
  tags:
  - logs and traces
aliases:
- /es/tracing/advanced/connect_logs_and_traces/
- /es/tracing/connect_logs_and_traces/
description: Conecte sus registros y trazas para correlacionarlos en Datadog.
title: Correlacione registros y trazas
type: multi-code-lang
---
{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="Registros en Trazas" style="width:100%;">}}

La correlación entre Datadog APM y Datadog Log Management se mejora mediante la inyección de IDs de traza, IDs de tramo, `env`, `service` y `version` como atributos en sus registros. Con estos campos, puede encontrar los registros exactos asociados con un servicio y versión específicos, o todos los registros correlacionados con una [traza][1] observada.

Se recomienda configurar el rastreador de su aplicación con `DD_ENV`, `DD_SERVICE` y `DD_VERSION`. Esto proporcionará la mejor experiencia para agregar `env`, `service` y `version`. Consulte la documentación de [unified service tagging][2] para más detalles.

Antes de correlacionar trazas con registros, asegúrese de que sus registros se envíen como JSON, o [analizados por el procesador de registros del nivel de lenguaje adecuado][3]. Sus registros del nivel de lenguaje _ deben _ convertirse en atributos de Datadog para que la correlación de trazas y registros funcione.

**Nota**: Las trazas y los registros se muestrean de manera independiente. Incluso después de que la correlación esté configurada, un registro puede contener un ID de traza que se refiere a una traza que no fue ingerida o no se retuvo debido al [muestreo de traza][4]. Esto no indica un error de configuración. Para más información, consulte [El registro tiene un ID de traza pero la traza asociada está ausente][5].

Para aprender más sobre cómo conectar automáticamente o manualmente sus registros a sus trazas, seleccione su idioma a continuación:

{{< partial name="apm/apm-connect-logs-and-traces.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/agent/logs/#enabling-log-collection-from-integrations
[4]: /es/tracing/trace_pipeline/ingestion_controls/
[5]: /es/logs/troubleshooting/#log-has-a-trace-id-but-the-associated-trace-is-missing