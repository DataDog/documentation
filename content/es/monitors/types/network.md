---
aliases:
- /es/monitors/monitor_types/network
- /es/monitors/create/types/network/
description: Comprueba el estado de los endpoints TCP/HTTP.
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Programar una caída del sistema para silenciar un monitor.
- link: /monitors/manage/status/
  tag: Documentación
  text: Comprobar el estado del monitor
title: Monitor de red
---

## Información general

Los monitores de red cubren los checks TCP y HTTP disponibles en el Agent. Para más detalles sobre la configuración del Agent, consulta la documentación [check HTTP][1] o [check TCP][2].

## Creación de un monitor

Para crear un [monitor de red][3] en Datadog, utiliza la navegación principal: *Monitors --> New Monitor --> Network* (Monitores --> Nuevo monitor --> Red).

### Estado de red

#### Elige un check

* Elige un tipo de check de red (`ssl`, `http`, o `tcp`).
* Elige un endpoint específico o `All monitored <TYPE> endpoints`.

#### Elige el contexto del monitor

Selecciona los contextos para monitorizar eligiendo nombres de host, etiquetas (tags), o elige `All Monitored Hosts`. Si necesitas excluir determinados hosts, utiliza el segundo campo para hacer una lista de nombres o etiquetas.

* El campo de inclusión utiliza la lógica `AND`. Todos los nombres de hosts y las etiquetas introducidos deben estar presentes en un host para que este se incluya.
* El campo de exclusión utiliza la lógica `OR`. Se excluye cualquier host con un nombre de host o una etiqueta introducidos.

#### Definir las condiciones de alerta

En esta sección, elige entre una **Alerta de check** o una **Alerta de clúster**:

{{< tabs >}}
{{% tab "Check Alert" %}}

Una alerta de check rastrea los estados consecutivos enviados por cada agrupación de checks y los compara con tus umbrales.

Configura la alerta de check:

1. Activa una alerta separada para cada `<GROUP>` que informa de tu check.

   La agrupación de checks se especifica a partir de una lista de agrupaciones conocidas o por tu mismo. Para los monitores de red, la agrupación por check se conoce explícitamente. Por ejemplo, el check HTTP está etiquetado con `db`, `host` y `port`.

2. Activar la alerta después de un número de fallos consecutivos: `<NUMBER>` 

   Cada ejecución de check presenta un único estado de `OK`, `WARN` o `CRITICAL`. Elige cuántas ejecuciones consecutivas con el estado `CRITICAL` desencadenan una notificación. Por ejemplo, tu check HTTP podría tener un único blip en el que falla la conexión. Si estableces este valor en `> 1`, el blip se ignora, pero un problema con más de un fallo consecutivo desencadena una notificación.

3. Resolver la alerta después de una cantidad determinada de intentos sin errores: `<NUMBER>`

    Configura cuántas veces tiene que darse el estado `OK` de forma consecutiva para que se resuelva la alerta.

{{% /tab %}}
{{% tab "Cluster Alert" %}}

Una alerta de clúster calcula el porcentaje de checks en un estado determinado y lo compara con tus umbrales.

Configura una alerta de clúster:

1. Decide si quieres agrupar o no tus checks según una etiqueta. `Ungrouped` calcula el porcentaje de estado de todas las fuentes. `Grouped` calcula el porcentaje de estado por grupo.

2. Selecciona el porcentaje para el umbral de alerta.

{{% /tab %}}
{{< /tabs >}}

#### Condiciones de alerta avanzadas

Consulta la documentación [Configuración de monitores][4] para obtener información sobre las opciones [Sin datos][5], [Resolución automática][6] y [Retraso de nuevo grupo][7].

#### Notificaciones

Para obtener instrucciones detalladas sobre la sección **Configure notifications and automations** (Configurar notificaciones y automatizaciones), consulta la página [Notificaciones][8].

### Métrica de red

Crea un monitor de métrica de red siguiendo las instrucciones de la documentación [del monitor de métrica][10]. El uso del tipo de monitor de métrica de red garantiza que el monitor pueda ser seleccionado por la faceta del tipo de monitor de red en la página [Gestionar monitores][9].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/http_check/
[2]: /es/integrations/tcp_check/
[3]: https://app.datadoghq.com/monitors#create/network
[4]: /es/monitors/configuration/#advanced-alert-conditions
[5]: /es/monitors/configuration/#no-data
[6]: /es/monitors/configuration/#auto-resolve
[7]: /es/monitors/configuration/#new-group-delay
[8]: /es/monitors/notify/
[9]: https://app.datadoghq.com/monitors/manage
[10]: /es/monitors/types/metric