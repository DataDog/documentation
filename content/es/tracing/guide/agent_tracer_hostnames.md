---
title: Comprender la diferencia entre el host del Agent y el host del rastreador
---

## Información general

En Datadog APM , la etiqueta `host` correlaciona tramos (spans) y trazas (traces) con los datos de monitorización de infraestructura, por lo que las métricas de host están asociadas con hosts de tramos y trazas.

## Nombre de host del Datadog Agent frente al rastreador

El **host de Agent** es el host en el que se está ejecutando el Datadog Agent. El **host de rastreador** es el host en el que se está ejecutando la aplicación instrumentada con la biblioteca de rastreo.

El host de Agent y el host de rastreador pueden diferir en función de cómo despliegues el Datadog Agent en tu infraestructura:


Cuando el Agent se despliega en el mismo host que la aplicación (por ejemplo, utilizando un [DaemonSet][1]), el host del Agent y el host del rastreador son los mismos.

{{< img src="/tracing/guide/agent_tracer_hostnames/agent_host.png" alt="Agent desplegado en el mismo host que la aplicación" style="width:80%;" >}}

Cuando el Agent se despliega en un host remoto, el host de Agent es diferente al del rastreador.

{{< img src="/tracing/guide/agent_tracer_hostnames/remote_host.png" alt="Agent desplegado en un host remoto, diferente del de la aplicación" style="width:80%;" >}}

### ¿Cuándo están el host del rastreado y el Agent en tramos?

- El nombre de host del Datadog Agent se establece siempre en tramos.
- El nombre de host del rastreador se establece en tramos si `DD_TRACE_REPORT_HOSTNAME` es `true` (por defecto es `false`).

 Idioma | Configuración | Variable de entorno
----------|--------|---------------------
Ruby | `tracing.report_hostname` | `DD_TRACE_REPORT_HOSTNAME`
C++ | `dd.trace.report-hostname` | `DD_TRACE_REPORT_HOSTNAME`
Node.js | `reportHostname` | `DD_TRACE_REPORT_HOSTNAME`
Go | - | `DD_TRACE_REPORT_HOSTNAME`
Python | - | `DD_TRACE_REPORT_HOSTNAME`
PHP | `datadog.trace.report_hostname` | `DD_TRACE_REPORT_HOSTNAME`
Java |  `dd.trace.report-hostname` | `DD_TRACE_REPORT_HOSTNAME`

### ¿Cuándo utiliza APM la información del host?

APM utiliza la información del host cuando se crean [filtros de retención][2], cuando se generan [métricas a partir de tramos][3] o cuando se crean [reglas de escaneo de datos confidenciales][4] utilizando los filtros de etiqueta de host en las consultas. Por ejemplo, los filtros de etiqueta de host como `availability-zone` y `cluster-name` se mejoran con la información de host del Datadog Agent.






[1]: /es/containers/kubernetes/apm/?tab=daemonset
[2]: /es/tracing/trace_pipeline/trace_retention
[3]: /es/tracing/trace_pipeline/generate_metrics
[4]: /es/sensitive_data_scanner/