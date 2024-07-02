---
aliases:
- /es/monitors/monitor_types/integration
- /es/monitors/create/types/integration/
description: Valores de métrica de monitor o estado de una integración específica
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor
- link: /monitors/manage/status/
  tag: Documentación
  text: Comprobar el estado del monitor
title: Monitor de integración
---

## Información general

Utiliza un monitor de integración para comprobar si se está ejecutando una [integración][1] instalada. Para una monitorización más detallada, se puede utilizar un monitor de métrica para obtener información específica sobre una integración.

## Creación de un monitor

Para crear un [monitor de integración][2] en Datadog:

1. Utiliza la navegación principal: *Monitors --> New Monitor --> Integration* (Monitores --> Nuevo monitor --> Integración).
2. Busca una integración o selecciónala en la lista o en las imágenes.

### Métrica de integración

Crea un monitor de métrica de integración siguiendo las instrucciones de la documentación [del monitor de métrica][3]. El uso del tipo de monitor de métrica de integración garantiza que el monitor pueda ser seleccionado por la faceta de tipo de monitor de integración en la página [Gestionar monitores][4].

**Nota**: Para configurar un monitor de integración, asegúrate de que la integración presenta métricas o checks de servicio.

#### Elige un check

Si solo hay un check para la integración, no es necesaria ninguna selección. En caso contrario, selecciona el check para tu monitor.

#### Elige el contexto del monitor

Selecciona el contexto para monitorizar eligiendo nombres de host, etiquetas (tags), o elija `All Monitored Hosts`. Si necesitas excluir determinados hosts, utiliza el segundo campo para hacer una lista de nombres o etiquetas.

* El campo include (incluir) utiliza la lógica `AND`. Todos los nombres de host y etiquetas de la lista deben estar presentes en un host para que se incluya.
* El campo exclude (excluir) utiliza la lógica `OR`. Se excluye cualquier host con un nombre de host o etiqueta de la lista.

#### Definir tus condiciones de alerta

En esta sección, elige entre una **Alerta de check** o una **Alerta de clúster**:

{{< tabs >}}
{{% tab "Check Alert" %}}

Una alerta de check rastrea los estados consecutivos enviados por cada agrupación de checks y los compara con tus umbrales.

Configura la alerta de check:

1. Activa una alerta separada para cada `<GROUP>` que informa de tu check.

   La agrupación de checks se especifica a partir de una lista de agrupaciones conocidas o por tu mismo. Para los monitores de integración, la agrupación por check se conoce explícitamente. Por ejemplo, la integración de Postgres está etiquetada con `db`, `host` y `port`.

2. Activar la alerta después de un número de fallos consecutivos: `<NUMBER>` 

    Cada ejecución de check presenta un único estado de `OK`, `WARN`, `CRITICAL` o `UNKNOWN`. Elige cuántas ejecuciones consecutivas con el estado `CRITICAL` desencadenan una notificación. Por ejemplo, tu base de datos podría tener un único blip en el que falla la conexión. Si estableces este valor en `> 1`, el blip se ignora, pero un problema con más de un fallo consecutivo desencadena una notificación.

3. Si el check de integración informa de un estado `UNKNOWN`, elige `Do not notify` o `Notify` para el estado Unknown (Desconocido).

   Si está activada, una transición de estado a `UNKNOWN` desencadena una notificación. En la [página de estado del monitor][1], la barra de estado de un grupo en estado `UNKNOWN` utiliza el gris `NODATA`. El estado general del monitor permanece en `OK`.

4. Resolver la alerta después de una cantidad consecutiva determinada de intentos sin errores: `<NUMBER>`

    Configura cuántas veces tiene que darse el estado `OK` de forma consecutiva para que se resuelva la alerta.


[1]: /es/monitors/manage/status
{{% /tab %}}
{{% tab "Cluster Alert" %}}

Una alerta de clúster calcula el porcentaje de checks con un estado determinado y lo compara con tus umbrales.

Configura una alerta de clúster:

1. Decide si quieres agrupar o no tus checks según una etiqueta. `Ungrouped` calcula el porcentaje de estado de todas las fuentes. `Grouped` calcula el porcentaje de estado por grupo.

2. Selecciona el porcentaje para el umbral de alerta.

Cada check etiquetado con una combinación distinta de etiquetas se considera un check distinto en el clúster. Solo el estado del último check de cada combinación de etiquetas se tiene en cuenta en el cálculo del porcentaje del clúster.

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="Umbrales de check de clúster" style="width:90%;">}}

Por ejemplo, un monitor de check de clúster agrupado por entornos puede enviar alertas si más del 70% de los checks en cualquiera de los entornos presentan un estado `CRITICAL` y avisa si más del 50% de los checks en cualquiera de los entornos presentan un estado `WARN`.
{{% /tab %}}
{{< /tabs >}}

#### Condiciones de alerta avanzadas

Consulta la documentación [Configuración de monitores][5] para obtener información sobre las opciones [Sin datos][6], [Resolución automática][7] y [Retraso de nuevo grupo][8].

#### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones), consulta la página [Notificaciones][9].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/
[2]: https://app.datadoghq.com/monitors#create/integration
[3]: /es/monitors/types/metric/
[4]: https://app.datadoghq.com/monitors/manage
[5]: /es/monitors/configuration/#advanced-alert-conditions
[6]: /es/monitors/configuration/#no-data
[7]: /es/monitors/configuration/#auto-resolve
[8]: /es/monitors/configuration/#new-group-delay
[9]: /es/monitors/notify/