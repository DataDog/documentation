---
algolia:
  tags:
  - logs y trazas
aliases:
- /es/tracing/advanced/connect_logs_and_traces/
- /es/tracing/connect_logs_and_traces/
description: Conecta tus logs y trazas (traces) para correlacionarlos en Datadog.
kind: documentación
title: Correlacionar logs y trazas
type: multi-code-lang
---

{{< img src="tracing/connect_logs_and_traces/trace_id_injection.png" alt="Logs en trazas" style="width:100%;">}}

La correlación entre Datadog APM y Datadog Log Management se mejora mediante la inyección de IDs de traza, IDs de tramo, `env`, `service` y `version` como atributos en tus logs. Con estos campos puedes encontrar los logs exactos asociados a un servicio y versión específicos, o todos los logs correlacionados con una [traza][1] observada.

Es recomendado configurar el rastreador de tu aplicación con `DD_ENV`, `DD_SERVICE` y `DD_VERSION`. Esto proporcionará la mejor experiencia para añadir `env`, `service`, y `version`. Consulta la documentación [etiquetado de servicios unificado][2] para más detalles.

Antes de correlacionar trazas con logs, asegúrate de que tus logs se envían como JSON, o [que los analiza el procesador de log en el nivel de lenguaje correcto][3]. Tus logs de nivel de lenguaje _deben_ convertirse en atributos de Datadog para que la correlación de trazas y logs funcione.

Para obtener más información sobre la conexión automática o manual de tus logs a tus trazas, selecciona tu lenguaje a continuación:

{{< partial name="apm/apm-connect-logs-and-traces.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/agent/logs/#enabling-log-collection-from-integrations