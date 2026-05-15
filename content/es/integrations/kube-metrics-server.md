---
aliases:
- /es/integrations/kube_metrics_server
app_id: kube-metrics-server
categories:
- rastreo
- kubernetes
- orquestación
custom_kind: integración
description: Monitorización del servidor de métricas Kubernetes
integration_version: 6.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Servidor de métricas Kubernetes
---
## Información general

Este check monitoriza [Kube_metrics_server](https://github.com/kubernetes-incubator/metrics-server) v0.3.0+, un componente utilizado por el plano de control de Kubernetes.

## Configuración

### Instalación

El check de Kube_metrics_server está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `kube_metrics_server.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de kube_metrics_server. Consulta el [kube_metrics_server.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/kube_metrics_server/datadog_checks/kube_metrics_server/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery para Kubernetes](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                |
| -------------------- | ---------------------------------------------------- |
| `<INTEGRATION_NAME>` | `kube_metrics_server `                                         |
| `<INIT_CONFIG>`      | en blanco o `{}`                                        |
| `<INSTANCE_CONFIG>`  | `{"prometheus_url": "https://%%host%%:443/metrics"}` |

{{% /tab %}}

{{< /tabs >}}

#### SSL

Si tu endpoint es seguro, se requiere una configuración adicional:

1. Identifica el certificado utilizado para proteger la métrica del endpoint.

1. Monta el archivo del certificado relacionado en el pod del Agent.

1. Aplica tu configuración SSL. Consulta el [archivo de configuración por defecto](https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example) para obtener más información.

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kube_metrics_server` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kube_metrics_server.authenticated_user.requests** <br>(count) | Contador de solicitudes autenticadas desglosadas por nombre de usuario|
| **kube_metrics_server.go.gc_duration_seconds.count** <br>(gauge) | Número de la invocación de recopilación de elementos no usados|
| **kube_metrics_server.go.gc_duration_seconds.quantile** <br>(gauge) | Cuantiles de duración de las invocaciones de recopilación de elementos no usados|
| **kube_metrics_server.go.gc_duration_seconds.sum** <br>(gauge) | Suma de duraciones de la invocación de recopilación de elementos no usados|
| **kube_metrics_server.go.goroutines** <br>(gauge) | Número de goroutines que existen actualmente|
| **kube_metrics_server.kubelet_summary_request_duration.count** <br>(gauge) | Número de solicitudes de resumen de Kubelet|
| **kube_metrics_server.kubelet_summary_request_duration.sum** <br>(gauge) | La suma de las latencias de las solicitudes de resumen de Kubelet|
| **kube_metrics_server.kubelet_summary_scrapes_total** <br>(count) | Número total de intentos de "summary API scrapes" realizados por Metrics Server|
| **kube_metrics_server.manager_tick_duration.count** <br>(gauge) | El tiempo total dedicado a recopilar y almacenar métricas|
| **kube_metrics_server.manager_tick_duration.sum** <br>(gauge) | El tiempo total dedicado a recopilar y almacenar métricas|
| **kube_metrics_server.process.max_fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos|
| **kube_metrics_server.process.open_fds** <br>(gauge) | Número de descriptores de archivo abiertos|
| **kube_metrics_server.scraper_duration.count** <br>(gauge) | Tiempo dedicado a la búsqueda de fuentes|
| **kube_metrics_server.scraper_duration.sum** <br>(gauge) | Tiempo dedicado a la búsqueda de fuentes|
| **kube_metrics_server.scraper_last_time** <br>(gauge) | Última vez que metrics-server realizó una búsqueda desde unix epoch|

### Eventos

kube_metrics_server no incluye eventos.

### Checks de servicio

**kube_metrics_server.prometheus.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas.

_Estados: ok, critical_

**kube_metrics_server.up**

Devuelve `CRITICAL` si Kubernetes Metrics Server no está en buen estado.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).