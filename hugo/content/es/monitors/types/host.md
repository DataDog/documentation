---
aliases:
- /es/monitors/monitor_types/host
- /es/monitors/create/types/host/
description: Verifique si uno o más servidores están reportando a Datadog
further_reading:
- link: /infrastructure/
  tag: Documentación
  text: Infrastructure Monitoring
- link: /monitors/notify/
  tag: Documentación
  text: Configure las notificaciones de seguimiento
- link: /monitors/downtimes/
  tag: Documentación
  text: Programe un tiempo de inactividad para silenciar un seguimiento
- link: /monitors/status/
  tag: Documentación
  text: Consulte el estado de su seguimiento
title: Host Monitor
---
## Descripción general {#overview}

El monitoreo de infraestructura proporciona visibilidad de todo su entorno de TI, incluidos servidores alojados en la nube y locales, a través de muchas integraciones. Utilice el monitor de servidor para mantenerse informado sobre qué servidores están enviando datos y cuáles no, para garantizar una visibilidad continua.

Cada Datadog Agent reporta una verificación de servicio llamada `datadog.agent.up` con el estado `OK`. Puede monitorear esta verificación en uno o más servidores utilizando un monitor de servidor.

<div class="alert alert-info">Los servidores que ejecutan el Datadog UNIX Agent heredado en AIX no reportan la <code>datadog.agent.up</code> verificación de servicio. Puede utilizar la métrica <code>datadog.agent.running</code> para monitorear el tiempo de actividad de un UNIX Agent. La métrica emite un valor de <code>1</code> si el Agent está reportando a Datadog. El Agent 7 en AIX reporta la <code>datadog.agent.up</code> verificación de servicio como los Agents en otras plataformas.</div>

## Creación de un seguimiento {#monitor-creation}

Para crear un [monitor de servidor][1] en Datadog, utilice la navegación principal: {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Host{{< /ui >}}.

### Elija servidores por nombre o etiqueta {#pick-hosts-by-name-or-tag}

Seleccione los servidores que desea monitorear por nombre o etiqueta, o elija {{< ui >}}All Monitored Hosts{{< /ui >}}. Si necesita excluir ciertos servidores, utilice el segundo campo para listar nombres o etiquetas.

- El campo de inclusión utiliza lógica `AND`. Todos los nombres y etiquetas listados deben estar presentes en un servidor para que se incluya.
- El campo de exclusión utiliza lógica `OR`. Se excluye cualquier servidor que tenga uno de los nombres o etiquetas listados.

#### Ejemplos {#examples}

| Monitorear                                                | Incluir               | Excluir     |
|--------------------------------------------------------|-----------------------|-------------|
| Incluir todos los servidores con la etiqueta `env:prod`              | `env:prod`            | dejar vacío |
| Incluir todos los servidores excepto los que tengan la etiqueta `env:test` | `All Monitored Hosts` | `env:test`  |

### Establecer condiciones de alerta {#set-alert-conditions}

En esta sección, elija entre un {{< ui >}}Check Alert{{< /ui >}} o {{< ui >}}Cluster Alert{{< /ui >}}:

{{< tabs >}}
{{% tab "Check Alert" %}}

Una alerta de verificación rastrea si un servidor deja de reportar durante un tiempo determinado. Que haya pasado demasiado tiempo desde la ejecución de una verificación puede ser señal de problemas con el envío de datos desde el servidor.

Ingrese la cantidad de minutos para verificar si faltan datos. El valor predeterminado es 2 minutos.

Si `datadog.agent.up` deja de informar un estado `OK` durante más de los minutos especificados, se activa una alerta.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

Una alerta de clúster rastrea si cierto porcentaje de servidores ha dejado de informar durante una cantidad de tiempo determinada.

Para configurar una alerta de clúster:

1. Decida si desea agrupar o no sus servidores de acuerdo con una etiqueta. {{< ui >}}Ungrouped{{< /ui >}} calcula el porcentaje de estado entre todos los servidores incluidos. {{< ui >}}Grouped{{< /ui >}} calcula el porcentaje de estado por grupo.
2. Seleccione el porcentaje para los umbrales de alerta y advertencia. Solo se requiere una configuración (alerta o advertencia).
3. Ingrese la cantidad de minutos para verificar si faltan datos. El valor predeterminado es 2 minutos.

Si `datadog.agent.up` deja de informar un estado `OK` durante más de los minutos especificados y se alcanza el umbral de porcentaje, se activa una alerta.

{{% /tab %}}
{{< /tabs >}}

### Condiciones de alerta avanzadas {#advanced-alert-conditions}

Para obtener instrucciones detalladas sobre las opciones de alerta avanzadas (resolución automática, retraso de nuevo grupo, etc.), consulte la página de [Monitor Configuration][2].

### Notifications {#notifications}

Para obtener instrucciones detalladas sobre la sección {{< ui >}}Configure notifications and automations{{< /ui >}}, consulte la página de [Notifications][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/host
[2]: /es/monitors/configuration/#advanced-alert-conditions
[3]: /es/monitors/notify/