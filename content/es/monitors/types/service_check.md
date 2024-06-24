---
aliases:
- /es/monitors/monitor_types/custom_check
- /es/monitors/create/types/custom_check/
- /es/monitors/types/custom_check/
description: Monitoriza el estado de checks de servicios arbitrarios.
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar un tiempo de inactividad para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Consultar el estado de tu monitor
kind: Documentación
title: Monitor de checks de servicios
---

## Información general

Los monitores de checks de servicios incluyen cualquier check de servicios no informado por una de las [más de {{< translate key="integration_count" >}} integraciones][1] incluidas con el Agent. Los checks de servicios pueden enviarse a Datadog utilizando un [check del Agent personalizado][2], [DogStatsD][3], o la [API][4]. Para obtener más información, consulta [Información general en la sección Check de servicios][5].

## Creación de un monitor

Para crear un [monitor de check de servicios][6] en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> Service Check* (Monitores > Nuevo monitor > Check de servicios).

### Elegir un check de servicios

Elige un check de servicios en el menú desplegable.

### Seleccionar el contexto del monitor

Selecciona el contexto de la monitorización eligiendo nombres de hosts, etiquetas (tags) o elige `All Monitored Hosts`. Si necesitas excluir determinados hosts, utiliza el segundo campo para introducir nombres o etiquetas.

* El campo de inclusión utiliza la lógica `AND`. Todos los nombres de hosts y las etiquetas introducidos deben estar presentes en un host para que este se incluya.
* El campo de exclusión utiliza la lógica `OR`. Se excluye cualquier host con un nombre de host o una etiqueta introducidos.

### Definir condiciones de alerta

En esta sección, elige entre una **Alerta de check** o una **Alerta de clúster**:

{{< tabs >}}
{{% tab "Check Alert" (Alerta de check) %}}

Una alerta de check rastrea los estados consecutivos enviados por cada agrupación de checks y los compara con tus umbrales.

Configura la alerta de check:

1. Activa una alerta separada para cada `<GROUP>` que informa de tu check.
    * La agrupación de checks se especifica a partir de una lista de agrupaciones conocidas o puedes especificarla tú. En los monitores de checks de servicios la agrupación por checks es desconocida, por lo que debes especificarla.

2. Activar la alerta después de un número de fallos consecutivos: `<NUMBER>`
    * Elige cuántas ejecuciones consecutivas con el estado `CRITICAL` activan una notificación. Por ejemplo, para ser notificado inmediatamente cuando falla tu check, activa la alerta de monitor con el estado `1` crítico.

3. Selecciona `Do not notify` o `Notify` para el estado desconocido.
    * Si se selecciona `Notify`, una transición de estado a `UNKNOWN` activa una notificación. En la [página de estado del monitor][1], la barra de estado de un grupo en estado `UNKNOWN` utiliza el gris para `NODATA`. El estado general del monitor permanece en `OK`.

4. Resuelve la alerta después de seleccionar intentos sin errores consecutivos: `<NUMBER>`.
    * Elige cuántas ejecuciones consecutivas con el estado `OK` resuelven la alerta. Por ejemplo, para asegurarte de que se soluciona un problema, resuelve el monitor con los estados `4` `OK` .


[1]: /es/monitors/manage/status
{{% /tab %}}
{{% tab "Cluster Alert" (Alerta de clúster" %}}

Una alerta de clúster calcula el porcentaje de checks con un estado determinado y lo compara con tus umbrales.

Cada check etiquetado con una combinación distinta de etiquetas se considera un check distinto en el clúster. Sólo el estado del último check de cada combinación de etiquetas se tiene en cuenta en el cálculo de porcentaje del clúster.

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="Umbrales de checks de clúster" style="width:90%;">}}

Por ejemplo, un monitor de checks de clúster agrupado por entornos puede enviar alertas si más del 70% de los checks en cualquiera de los entornos presentan un estado `CRITICAL` y avisa si más del 70% de los checks en cualquiera de los entornos presentan un estado `WARN`.

Para configurar una alerta de clúster:

1. Decide si quieres agrupar o no tus checks según una etiqueta. `Ungrouped` calcula el porcentaje de estado de todas las fuentes. `Grouped` calcula el porcentaje de estado por grupo.

2. Selecciona el porcentaje para los umbrales de alerta y de advertencia. Sólo se requiere un parámetro (alerta o advertencia).

{{% /tab %}}
{{< /tabs >}}

#### Condiciones de alerta avanzadas

Consulta la documentación [Configuración de monitores][7] para obtener información sobre las opciones [Sin datos][8], [Resolución automática][9] y [Retraso de nuevo grupo][10].

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configurar notificaciones y automatizaciones**, consulta la página [Notificaciones][11].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/
[2]: /es/developers/custom_checks/write_agent_check/
[3]: /es/developers/dogstatsd/
[4]: /es/api/v1/service-checks/
[5]: /es/developers/service_checks/#overview
[6]: https://app.datadoghq.com/monitors/create/custom
[7]: /es/monitors/configuration/#advanced-alert-conditions
[8]: /es/monitors/configuration/#no-data
[9]: /es/monitors/configuration/#auto-resolve
[10]: /es/monitors/configuration/#new-group-delay
[11]: /es/monitors/notify/