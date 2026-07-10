---
description: Despliegue y gestión de monitores de Datadog utilizando la definición
  de recursos personalizados de monitor de Datadog con el Datadog Operator
further_reading:
- link: https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor
  tag: API de Datadog
  text: 'Referencia de la API: Crear un monitor de Datadog'
- link: https://github.com/DataDog/helm-charts/blob/main/crds/datadoghq.com_datadogmonitors.yaml
  tag: GitHub
  text: CRD para monitores de Datadog
title: CRD para monitores de Datadog
---

Para desplegar un monitor de Datadog, puedes utilizar el Datadog Operator y la definición de recursos personalizados (CRD) `DatadogMonitor`.

## Requisitos previos
- [Helm][1]
- [CLI `kubectl`][2]
- [Datadog Operator][3] v0.6 o posterior

## Configuración

1. Crea un archivo con las especificaciones de configuración de despliegue de tu `DatadogMonitor`.

   **Ejemplo**:

   La siguiente especificación crea un [monitor de métricas][4] que alerta sobre la consulta `avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5`.

   {{< code-block lang="yaml" filename="datadog-metric-monitor.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogMonitor
   metadata:
     name: datadog-monitor-test
     namespace: datadog
   spec:
     query: "avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5"
     type: "metric alert"
     name: "Test monitor made from DatadogMonitor"
     message: "1-2-3 testing"
     tags:
       - "test:datadog"
     priority: 5
     controllerOptions:
       disableRequiredTags: false
     options:
       evaluationDelay: 300
       includeTags: true
       locked: false
       newGroupDelay: 300
       notifyNoData: true
       noDataTimeframe: 30
       renotifyInterval: 1440
       thresholds:
         critical: "0.5"
         warning: "0.28"
   {{< /code-block >}}

   Consulta la [lista completa de campos de configuración](#all-available-configuration-fields).

2. Despliega tu `DatadogMonitor`:

   ```shell
   kubectl apply -f /path/to/your/datadog-metric-monitor.yaml
   ```

## Ejemplos adicionales

### Monitores de métrica
- [Hay un pod en CrashLoopBackOff][6]
- [Hay un pod en ImagePullBackOff][8]
- [Los pods de más de una réplica de despliegue están inactivos][7]
- [Los pods de más de una réplica de StatefulSet están inactivos][12]
- [Más del 20 % de los nodos de un clúster no son programables][9].
- [Más de 10 pods están fallando en un clúster][10]
- [Los pods se están reiniciando varias veces en los últimos cinco minutos][11]


### Otros monitores
- [Monitor de auditoría][13]
- [Monitor de eventos][14]
- [Monitor de eventos V2][15]
- [Monitores de logs][16]
- [Monitor de proceso][17]
- [Monitor RUM][18]
- [Monitor de checks de servicios][19]
- [Monitor de SLO][20]
- [Monitor de análisis de trazas (traces)][21]

## Todos los campos de configuración disponibles

La siguiente tabla enumera todos los campos de configuración disponibles para el recurso personalizado `DatadogMonitor`.

`message`
: **obligatorio**: _cadena_
<br/>Un mensaje para incluir con las notificaciones para este monitor.

`name`
: **obligatorio**: _cadena_
<br/>El nombre del monitor.

`query`
: **obligatorio**: _cadena_
<br/>La consulta del monitor.

`type`
: **obligatorio**: _enumeración_
<br/>El tipo de monitor. 
<br/>Valores de enumeración permitidos: `metric alert`, `query alert`, `service check`, `event alert`, `log alert`, `process alert`, `rum alert`, `trace-analytics alert`, `slo alert`, `event-v2 alert`, `audit alert`, `composite`

`controllerOptions.disableRequiredTags`
: _booleano_
<br/>Desactiva la adición automática de etiquetas requeridas a los monitores.

`priority`
: _int64_
<br/>Un número entero de 1 (alto) a 5 (bajo) que indica la gravedad de la alerta.

`restrictedRoles`
: _[cadena]_
<br/>Una lista de identificadores únicos de roles para definir qué roles pueden editar el monitor. Los identificadores únicos de todos los roles pueden extraerse de la [API de roles][22] y se encuentran en el campo `data.id`.

`tags`
: _[cadena]_
<br/>Etiquetas asociadas a tu monitor.

`options`
: _objeto_
<br/>Lista de opciones asociadas a tu monitor. Consulta las [Opciones](#options).

### Opciones

Los siguientes campos se establecen en la propiedad `options`.

Por ejemplo:

{{< highlight yaml "hl_lines=11-15" >}}
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMonitor
metadata:
  name: datadog-monitor-test
  namespace: datadog
spec:
  query: "avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5"
  type: "metric alert"
  name: "Test monitor made from DatadogMonitor"
  message: "1-2-3 testing"
  options:
    enableLogsSample: true
    thresholds:
      critical: "0.5"
      warning: "0.28"
{{< /highlight >}}

`enableLogsSample`
: _booleano_
<br/>Enviar o no una muestra de log cuando se dispara el monitor de logs.

`escalationMessage`
: _cadena_
<br/>Un mensaje para incluir con una nueva notificación.

`evaluationDelay`
: _int64_
<br/>Tiempo (en segundos) para retrasar la evaluación, como un entero no negativo. Por ejemplo: si el valor se establece en 300 (5min), el marco temporal se establece en `last_5m`, y la hora es 7:00, entonces el monitor evalúa los datos de 6:50 a 6:55. Esto es útil para AWS CloudWatch y otras métricas de relleno para asegurar que el monitor siempre tiene datos durante la evaluación.

`groupRetentionDuration`
: _cadena_
<br/>El tramo de tiempo tras el cual los grupos con datos perdidos se eliminan del estado del monitor. El valor mínimo es una hora y el máximo 72 horas. Los valores de ejemplo son: `60m`, `1h` y `2d`. Esta opción solo está disponible para los monitores de APM Trace Analytics, Audit Trail, CI, Error Tracking, Evento, Logs y RUM.

`groupbySimpleMonitor`
: _booleano_
<br/>OBSOLETO: si el monitor de alerta de log activa una alerta única o múltiples alertas cuando algún grupo supera un umbral. Utiliza `notifyBy` en su lugar.

`includeTags`
: _booleano_
<br/>Un booleano que indica si las notificaciones de este monitor insertan automáticamente sus etiquetas desencadenantes en el título.

`locked`
: _booleano_
<br/>OBSOLETO: si el monitor está bloqueado o no (solo editable por el creador y los administradores). Utiliza `restrictedRoles` en su lugar.

`newGroupDelay`
: _int64_
<br/>Tiempo (en segundos) para permitir que un host arranque y que las aplicaciones se inicien completamente antes de comenzar la evaluación de los resultados de monitor. Debe ser un entero no negativo.

`noDataTimeframe`
: _int64_
<br/>El número de minutos antes de que el monitor notifique después de que los datos dejen de informar. Datadog recomienda al menos 2 veces el plazo del monitor para alertas de métricas o 2 minutos para checks de servicio. Si se omite, se utiliza el doble del plazo de evaluación para las alertas de métricas y 24 horas para los checks de servicio.

`notificationPresetName`
: _enumeración_
<br/>Activa la visualización del contenido adicional enviado en la notificación del monitor. 
<br/>Valores permitidos: `show_all`, `hide_query`, `hide_handles`, `hide_all`
<br/>Por defecto: `show_all`

`notifyAudit`
: _booleano_
<br/>Un booleano que indica si los usuarios etiquetados son notificados de los cambios en este monitor.

`notifyBy`
: _[cadena]_
<br/>Cadena que indica la granularidad con la que alerta un monitor. Solo disponible para monitores con agrupaciones. Por ejemplo, si tienes un monitor agrupado por clúster, espacio de nombres y pod, y establece `notifyBy` en `["cluster"]`, entonces tu monitor solo notifica en cada nuevo clúster que infrinja las condiciones de alerta. 
<br/>Las etiquetas mencionadas en `notifyBy` deben ser un subconjunto de las etiquetas de agrupación de la consulta. Por ejemplo, una consulta agrupada por clúster y espacio de nombres no puede notificar sobre la región. 
<br/>Si se define `notifyBy` como `[*]`, el monitor notificará como una alerta simple.

`notifyNoData`
: _booleano_
<br/>Un booleano que indica si este monitor notifica cuando los datos dejan de informar. 
<br/>Por defecto: `false`.

`onMissingData`
: _enumeración_
<br/>Controla cómo se tratan los grupos o monitores si una evaluación no devuelve ningún punto de datos. La opción por defecto tiene un comportamiento diferente según el tipo de consulta de monitor. Para los monitores que utilizan consultas Count, una evaluación de monitor vacía se trata como 0 y se compara con las condiciones de umbral. Para los monitores que utilizan cualquier tipo de consulta que no sea Count, por ejemplo Gauge, Measure o Rate, el monitor muestra el último estado conocido. Esta opción solo está disponible para los monitores de APM Trace Analytics, Audit Trail, CI, Error Tracking, Evento, Logs y RUM. 
<br/>Valores de enumeración permitidos: `default`, `show_no_data`, `show_and_notify_no_data`, `resolve`

`renotifyInterval`
: _int64_
<br/>Número de minutos transcurridos desde la última notificación antes de que el monitor vuelva a notificar sobre el estado actual. Solo vuelve a notificar si no se ha resuelto.

`renotifyOccurrences`
: _int64_
<br/>El número de veces que se debe enviar mensajes de nueva notificación sobre el estado actual en el intervalo de nueva notificación proporcionado.

`renotifyStatuses`
: _[cadena]_
<br/>Los tipos de estados del monitor para los que se envían mensajes de nueva notificación. 
<br/>Si `renotifyInterval` es nulo, por defecto es nulo. 
<br/>Si `renotifyInterval` no es nulo, por defecto es `["Alert", "No Data"]`
<br/>Valores para el estado del monitor: `Alert`, `No Data`, `Warn`

`requireFullWindow`
: _booleano_
<br/>Booleano que indica si el monitor necesita una ventana completa de datos antes de ser evaluada. Datadog recomienda encarecidamente que se establezca en `false` para métricas dispersas; de lo contrario, se omitirán algunas evaluaciones. 
<br/>Por defecto: `false`.

`schedulingOptions`
: _objeto_
<br/>Opciones de configuración para la programación de horarios:

  `customSchedule`
  : _object_
 <br/>Opciones de configuración para la costumbre schedule (horario):

    `recurrence`
    : _[objeto]_
    <br/>Matriz de recurrencias de horario personalizado.

      `rrule`
      : _cadena_
      <br/>La regla de recurrencia en formato iCalendar. Por ejemplo, `FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1`.

      `start`
      : _cadena_
      <br/>La fecha de inicio de la regla de recurrencia definida en el formato `YYYY-MM-DDThh:mm:ss`. Si se omite, se utiliza la fecha de creación del monitor.

      `timezone`
      : _cadena_
      <br/>La zona horaria en formato `tz database`, en la que se define la regla de recurrencia. Por ejemplo, `America/New_York` o `UTC`.

  `evaluationWindow`
  : _objeto_
  <br/>Opciones de configuración de la ventana de evaluación. Si se define `hour_starts`, no se puede definir ningún otro campo. En caso contrario, `day_starts` and `month_starts`deben configurarse en conjunto. 

    `dayStarts`
    : _string_
    <br/>La hora del día en la que inicia un intervalo de evaluación acumulativa de un día. Debe definirse en formato UTC `HH:mm `.

    `hourStarts`
    : _entero_
    <br/>La hora del día en la que inicia un intervalo de evaluación acumulativa de una hora.

    `monthStarts`
    : _entero_
    <br/>El día del mes en el que inicia un intervalo de evaluación acumulativa de un mes.

`thresholdWindows`
: _objeto_
<br/>Opciones de intervalo de tiempo de alerta:

  `recoveryWindow`
  : _cadena_
  <br/>Describe el tiempo que una métrica anómala debe ser normal antes de que la alerta se recupere.

  `triggerWindow`
  : _cadena_
  <br/>Describe el tiempo que una métrica debe ser anómala antes de que se active una alerta.

`thresholds`
: _objeto_
<br/>Lista de los diferentes umbrales de monitor disponibles:

  `critical`
  : _cadena_
  <br/>El umbral CRÍTICO del monitor.

  `criticalRecovery`
  : _cadena_
  <br/>El umbral de recuperación CRÍTICO del monitor.

  `ok`
  : _cadena_
  <br/>El umbral OK del monitor.

  `unknown`
  : _cadena_
  <br/>El umbral DESCONOCIDO del monitor.

  `warning`
  : _cadena_
  <br/>El umbral ADVERTENCIA del monitor.

  `warningRecovery`
  : _cadena_
  <br/>El umbral de recuperación ADVERTENCIA del monitor.

`timeoutH`
: _int64_
<br/>El número de horas en las que el monitor no informa de datos antes de que se resuelva automáticamente desde un estado activado.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /es/containers/kubernetes/installation?tab=datadogoperator#installation
[4]: /es/monitors/types/metric/?tab=threshold
[5]: /es/api/latest/monitors/#create-a-monitor
[6]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-crashloopbackoff.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-deployment-replicas.yaml
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-imagepullbackoff.yaml
[9]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-nodes-unavailable.yaml
[10]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-pods-failed-state.yaml
[11]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-pods-restarting.yaml
[12]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-statefulset-replicas.yaml
[13]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/audit-alert-monitor-test.yaml
[14]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/event-alert-monitor-test.yaml
[15]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/event-v2-alert-monitor-test.yaml
[16]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/log-alert-monitor-test.yaml
[17]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/process-alert-monitor-test.yaml
[18]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/rum-alert-monitor-test.yaml
[19]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/service-check-monitor-test.yaml
[20]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/slo-alert-monitor-test.yaml
[21]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/trace-analytics-alert-monitor-test.yaml
[22]: /es/api/latest/roles/#list-roles