---
aliases:
- /es/tracing/troubleshooting/apm_rate_limits
title: Límites de tasa del Agent
---

## Límite máximo de conexión

Si encuentras el siguiente mensaje de error en tus logs del Agent, se ha superado el límite de conexión por defecto de 2000 en APM:

```
ERROR | (pkg/trace/logutil/throttled.go:38 in log) | http.Server: http: Accept error: request has been rate-limited; retrying in 80ms
```

Para aumentar el límite de conexión de APM para el Agent, configura el atributo `connection_limit` dentro del archivo de configuración del Agent (debajo de la sección `apm_config:`). Para despliegues en contenedores (por ejemplo, Docker o Kubernetes), utiliza la variable de entorno `DD_APM_CONNECTION_LIMIT`.

## Límite máximo de memoria

Si encuentras el siguiente mensaje de error en tus logs del Agent, significa que el Agent ha excedido el uso máximo de memoria en un 150%:

```
CRITICAL | (pkg/trace/api/api.go:703 in watchdog) | Killing process. Memory threshold exceeded: 8238.08M / 715.26M
CRITICAL | (pkg/trace/osutil/file.go:39 in Exitf) | OOM
```

Para aumentar el límite máximo de memoria para el Agent, configura el atributo `max_memory` en la sección `apm_config` del archivo de configuración del Agent. Para despliegues en contenedores (por ejemplo, Docker o Kubernetes), utiliza la variable de entorno `DD_APM_MAX_MEMORY`.

Si deseas que tu orquestador (como Kubernetes) gestione tus límites de memoria, puedes desactivar este límite configurándolo en `0` desde el Datadog Agent 7.23.0.

## Porcentaje máximo de CPU

Este ajuste define el porcentaje máximo de CPU que el Agent de APM debe utilizar. En entornos que no son de Kubernetes es por defecto 50, que equivale a 0,5 núcleos (100 = 1 núcleo). Una vez alcanzado este límite, las cargas útiles serán rechazadas hasta que el uso de la CPU vuelva a ser inferior al límite. Esto se refleja en `datadog.trace_agent.receiver.ratelimit`, que representa el porcentaje de cargas útiles que se están descartando actualmente (un valor de 1 significa que no se descarga ninguna traza). Esto también puede observarse en la [Vista de tabla de servicio][1] como una advertencia `Limited Resource`.

Si deseas que tu orquestador (o un servicio externo) gestione las limitaciones de recursos para el Datadog Agent, Datadog recomienda desactivar esta opción estableciendo la variable de entorno `DD_APM_MAX_CPU_PERCENT` en `0` (compatible desde el Datadog Agent 7.23.0).

[1]: /es/tracing/trace_pipeline/ingestion_controls/#service-table-view