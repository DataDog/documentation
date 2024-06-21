---
aliases:
- /es/monitors/monitor_types/host
- /es/monitors/create/types/host/
description: Comprueba si uno o más hosts están informando a Datadog
further_reading:
- link: /infrastructure/
  tag: Documentación
  text: Monitorización de infraestructura
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Consultar el estado de tu monitor
kind: documentación
title: Monitor de host
---

## Información general

La monitorización de infraestructura proporciona visibilidad de todo tu entorno de TI, incluidos los servidores alojados en la nube y on-premise, a través de muchas integraciones. Utiliza el monitor de host para mantenerte informado sobre qué hosts están o no enviando datos para garantizar una visibilidad continua.

Cada Datadog Agent informa de un check de servicio llamado `datadog.agent.up` con el estado `OK`. Puedez monitorizar este check a través de uno o más hosts utilizando un monitor de host.

## Creación de un monitor

Para crear un [monitor de host][1] en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> Host* (Monitores > Nuevo monitor > Host).

### Elige hosts por nombre o etiqueta

Selecciona los hosts para monitorizar eligiendo los nombres de host, etiquetas, o elige `All Monitored Hosts`. Si necesitas excluir determinados hosts, utiliza el segundo campo para hacer una lista de nombres o etiquetas.

- El campo include (incluir) utiliza la lógica `AND`. Todos los nombres y etiquetas de la lista deben estar presentes en un host para que se incluya.
- El campo exclude (excluir) utiliza la lógica `OR`. Se excluye cualquier host con un nombre o etiqueta de la lista.

#### Ejemplos

| Monitor                                                | Include               | Exclude     |
|--------------------------------------------------------|-----------------------|-------------|
| Incluye todos los hosts con la etiqueta `env:prod`              | `env:prod`            | leave empty |
| Incluye todos los hosts excepto los hosts con la etiqueta `env:test` | `All Monitored Hosts` | `env:test`  |

### Definir tus condiciones de alerta

En esta sección, elige entre una **Alerta de check** o una **Alerta de clúster**:

{{< tabs >}}
{{% tab "Check Alert" %}}

Una alerta de check rastrea si un host deja de informar durante un tiempo determinado. Demasiado tiempo tras una ejecución de check puede ser señal de problemas con el envío de datos desde el host.

Introduce el número de minutos para comprobar los datos faltantes. El valor por defecto es de 2 minutos.

Si `datadog.agent.up` deja de informar de un estado `OK` durante más de los minutos especificados, se activa una alerta.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

Una alerta de clúster rastrea si un determinado porcentaje de hosts han dejado de informar durante un periodo determinado.

Para configurar una alerta de clúster:

1. Decide si agrupas o no tus hosts según una etiqueta. `Ungrouped` calcula el porcentaje de estado en todos los hosts incluidos. `Grouped` calcula el porcentaje de estado por grupo.
2. Selecciona el porcentaje para los umbrales de alerta y de advertencia. Solo se requiere un parámetro (alerta o advertencia).
3. Introduce el número de minutos para comprobar los datos faltantes. El valor por defecto es de 2 minutos.

Si `datadog.agent.up` deja de informar de un estado `OK` durante más de los minutos especificados y se alcanza el umbral porcentual, se activa una alerta.

{{% /tab %}}
{{< /tabs >}}

### Condiciones de alerta avanzadas

Para obtener instrucciones detalladas sobre las opciones avanzadas de alerta (resolución automática, retraso de nuevo grupo, etc.), consulta la página [Configuración de monitor][2].

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configurar notificaciones y automatizaciones**, consulta la página [Notificaciones][3].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/host
[2]: /es/monitors/configuration/#advanced-alert-conditions
[3]: /es/monitors/notify/