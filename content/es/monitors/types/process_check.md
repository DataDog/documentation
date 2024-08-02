---
aliases:
- /es/monitors/monitor_types/process_check
- /es/monitors/create/types/process_check/
description: Comprobar si un proceso se está ejecutando en un host
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
title: Monitor de check de proceso
---

## Información general

Un monitor de check del proceso observa el estado producido por el check del Agent `process.up`. En el nivel del Agent puedes [Configurar tus umbrales de check][1] en función del número de procesos coincidentes.

## Creación de un monitor

Para crear un [monitor de check de proceso][6] en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> Process Check* (Monitores > Nuevo monitor > Check de proceso).

### Elige un proceso

En la lista desplegable, selecciona un proceso para monitorizar. Filtra la lista introduciendo tus criterios de búsqueda.

### Elige el contexto del monitor

Selecciona los hosts para monitorizar eligiendo nombres de host, etiquetas (tags), o elige `All Monitored Hosts`. Solo se muestran los hosts o etiquetas que informan de un estado para el proceso seleccionado. Si necesitas excluir determinados hosts, utiliza el segundo campo para hacer una lista de nombres o etiquetas.

* El campo include (incluir) utiliza la lógica `AND`. Todos los nombres de host y etiquetas de la lista deben estar presentes en un host para que se incluya.
* El campo exclude (excluir) utiliza la lógica `OR`. Se excluye cualquier host con un nombre o etiqueta de la lista.

### Definir las condiciones de alerta

{{< tabs >}}
{{% tab "Check Alert" %}}

Una alerta de check rastrea los estados consecutivos enviados por grupo de check y los compara con tus umbrales. Para monitores de check de proceso, los grupos son estáticos: `host` y `process`.

Configura la alerta de check:

1. Activar la alerta después de un número de fallos consecutivos: `<NUMBER>` 

    Cuando que se ejecuta un check se envía un estado de `OK`, `WARN` o `CRITICAL`. Elige cuántas veces tiene que darse un estado `WARN` y `CRITICAL` para que se envíe una notificación. Por ejemplo, es posible que se produzca un error puntual en tu proceso y falle la conexión. Si tienes este valor establecido como `> 1`, el fallo se ignorará, pero si el error se da más veces, se enviará una notificación.

2. Resolver la alerta después de una cantidad determinada de intentos sin errores: `<NUMBER>`

    Configura cuántas veces tiene que darse el estado `OK` para resolver la alerta.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

Una alerta de clúster calcula el porcentaje de checks de proceso en un estado determinado y lo compara con tus umbrales.

Configura una alerta de clúster:

1. Decide si quieres agrupar o no tus checks de proceso según una etiqueta. `Ungrouped` calcula el porcentaje de estado de todas las fuentes. `Grouped` calcula el porcentaje de estado por grupo.

2. Selecciona el porcentaje para los umbrales de alerta y de advertencia. Solo se requiere un parámetro (alerta o advertencia).

Cada check etiquetado con una combinación distinta de etiquetas se considera un check distinto en el clúster. Solo el estado del último check de cada combinación de etiquetas se tiene en cuenta en el cálculo del porcentaje del clúster.

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="Umbrales de check del clúster" style="width:90%;">}}

Por ejemplo, un monitor de check de clúster agrupado por entornos puede enviar alertas si más del 70% de los checks en cualquiera de los entornos presentan un estado `CRITICAL` y avisa si más del 70% de los checks en cualquiera de los entornos presentan un estado `WARN`.
{{% /tab %}}
{{< /tabs >}}

#### Condiciones de alerta avanzadas

Consulta la documentación [Configuración de monitores][3] para obtener información sobre las opciones [Sin datos][4], [Resolución automática][5] y [Retraso de nuevo grupo][6].

### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones), consulta la página [Notificaciones][7].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/process/
[2]: https://app.datadoghq.com/monitors#create/process
[3]: /es/monitors/configuration/#advanced-alert-conditions
[4]: /es/monitors/configuration/#no-data
[5]: /es/monitors/configuration/#auto-resolve
[6]: /es/monitors/configuration/#new-group-delay
[7]: /es/monitors/notify/