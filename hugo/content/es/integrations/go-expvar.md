---
aliases:
- /es/integrations/go_expvar
app_id: go-expvar
categories:
- lenguajes
custom_kind: integración
description: Recopila métricas instrumentadas por Expvar y estadísticas de memoria
  de tu servicio Go.
further_reading:
- link: https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog
  tag: blog
  text: Instrumentar tus aplicaciones Go con Expvar y Datadog
integration_version: 5.0.0
media: []
supported_os:
- linux
- macos
- windows
title: Go-Expvar
---
![Gráfico de Go](https://raw.githubusercontent.com/DataDog/integrations-core/master/go_expvar/images/go_graph.png)

## Información general

Realiza un seguimiento del uso de memoria de tus servicios Go y recopila métricas instrumentadas desde el paquete Expvar Go.

Si prefieres instrumentar tu código Go utilizando únicamente [dogstats-go](https://github.com/DataDog/datadog-go), puedes seguir utilizando esta integración para recopilar métricas relacionadas con la memoria.

## Configuración

### Instalación

El check de Go Expvar esta incluido en el paquete del Agent, por lo que solo tienes que [instalar el Agent](https://app.datadoghq.com/account/settings/agent/latest) dondequiera que ejecutes servicios Go para recopilar métricas.

### Configuración

#### Preparación del servicio

Si tu servicio Go no utiliza ya el [paquete expvar](https://golang.org/pkg/expvar), impórtalo (`import "expvar"`). Si no quieres instrumentar tus propias métricas con expvar; es decir, si solo quieres recopilar métricas de memoria de tu servicio, importa el paquete utilizando el identificador en blanco (`import _ "expvar"`). Si tu servicio aún no escucha solicitudes HTTP (con el paquete http), [haz que escuche](https://golang.org/pkg/net/http/#ListenAndServe) localmente solo el Datadog Agent.

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Conexión del Agent

1. Edita el archivo `go_expvar.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [ejemplo go_expvar.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   **Nota**: Si no configuras una lista de `metrics`, el Agent sigue recopilando métricas memstat. Utiliza `metrics` para indicar al Agent qué variables expvar debe recopilar.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**Nota**: La integración Go Expvar puede potencialmente emitir [métricas personalizadas](https://docs.datadoghq.com/developers/metrics/custom_metrics/), lo que puede afectar a tu [facturación](https://docs.datadoghq.com/account_management/billing/custom_metrics/). Por defecto, hay un límite de 350 métricas. Si necesitas métricas adicionales, ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                    |
| -------------------- | ---------------------------------------- |
| `<INTEGRATION_NAME>` | `go_expvar`                              |
| `<INIT_CONFIG>`      | en blanco o `{}`                            |
| `<INSTANCE_CONFIG>`  | `{"expvar_url": "http://%%host%%:8080"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `go_expvar` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **go_expvar.memstats.alloc** <br>(gauge) | Bytes asignados y aún no liberados<br>_Se muestra en bytes_ |
| **go_expvar.memstats.frees** <br>(gauge) | Número de libres<br>_Se muestra como operación_ |
| **go_expvar.memstats.heap_alloc** <br>(gauge) | Bytes asignados y aún no liberados<br>_Se muestra en bytes_ |
| **go_expvar.memstats.heap_idle** <br>(gauge) | Bytes en tramos inactivos<br>_Se muestra en bytes_ |
| **go_expvar.memstats.heap_inuse** <br>(gauge) | Bytes en tramos no inactivos<br>_Se muestra en bytes_ |
| **go_expvar.memstats.heap_objects** <br>(gauge) | Número total de objetos asignados<br>_Se muestra como elemento_ |
| **go_expvar.memstats.heap_released** <br>(gauge) | Bytes liberados al SO<br>_Se muestra en bytes_ |
| **go_expvar.memstats.heap_sys** <br>(gauge) | Bytes obtenidos del sistema<br>_Se muestra en bytes_ |
| **go_expvar.memstats.lookups** <br>(gauge) | Número de búsquedas de punteros<br>_Se muestra como operación_ |
| **go_expvar.memstats.mallocs** <br>(gauge) | Número de mallocs<br>_Se muestra como operación_ |
| **go_expvar.memstats.num_gc** <br>(gauge) | Número de recolecciones de basura<br>_Se muestra como recolección de basura_ |
| **go_expvar.memstats.pause_ns.95percentile** <br>(gauge) | Percentil 95 de las duraciones de pausas de recolección de basura recientes<br>_Se muestra en nanosegundos_ |
| **go_expvar.memstats.pause_ns.avg** <br>(gauge) | Media de las últimas pausas de recolección de basura<br>_Se muestra en nanosegundos_ |
| **go_expvar.memstats.pause_ns.count** <br>(rate) | Número de duraciones de las pausas de recolección de basura enviadas<br>_Se muestra como muestra_ |
| **go_expvar.memstats.pause_ns.max** <br>(gauge) | Duración máxima de la pausa de recolección de basura<br>_Se muestra en nanosegundos_ |
| **go_expvar.memstats.pause_ns.median** <br>(gauge) | Mediana de la duración de la pausa de recolección de basura<br>_Se muestra en nanosegundos_ |
| **go_expvar.memstats.pause_total_ns** <br>(gauge) | Duración total de la pausa de recolección de basura a lo largo de la vida del proceso<br>_Se muestra en nanosegundos_ |
| **go_expvar.memstats.total_alloc** <br>(gauge) | Bytes asignados (incluso liberados)<br>_Se muestra en bytes_ |
| **go_expvar.memstats.total_alloc.count** <br>(count) | Bytes asignados (incluso liberados) como recuento monotónico<br>_Se muestra en bytes_ |

### Eventos

El check de Expvar Go no incluye eventos.

### Checks de servicio

El check de Expvar Go no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Instrumentar tus aplicaciones Go con Expvar y Datadog](https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog)