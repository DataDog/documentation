---
aliases:
- /es/monitors/create/configuration
description: Aprenda a configurar y personalizar los seguimientos utilizando la página
  de creación de seguimientos en Datadog.
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Notifications de seguimientos
- link: /monitors/manage/
  tag: Documentación
  text: Administre seguimientos.
- link: /monitors/status/
  tag: Documentación
  text: Estado del seguimiento
- link: https://www.datadoghq.com/blog/manage-monitors-with-datadog-teams/
  tag: Blog
  text: Administre sus seguimientos de manera más eficiente con Datadog Teams.
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: Centro de aprendizaje
  text: Personalice las Notifications del seguimiento de alerta.
title: Configure los seguimientos.
---
## Descripción general {#overview}

Para comenzar a configurar el seguimiento, complete lo siguiente:

* {{< ui >}}Define the search query{{< /ui >}}: Construya una consulta para contar eventos, medir métricas, agrupar por una o varias dimensiones y más.
* {{< ui >}}Set alert conditions{{< /ui >}}: Defina los umbrales de alerta y de advertencia, los periodos de tiempo de evaluación y configure las opciones avanzadas de alerta.
* {{< ui >}}Configure notifications and automations{{< /ui >}}: Escriba un título y un mensaje de notificación personalizados con variables. Elija cómo se envían las Notifications a sus equipos (correo electrónico, Slack o PagerDuty). Incluya automatizaciones de flujo de trabajo o casos en la notificación de alerta.
* {{< ui >}}Define permissions and audit notifications{{< /ui >}}: Configure controles de acceso granulares y designe roles y usuarios específicos que puedan editar un seguimiento. Habilite las Notifications de auditoría para alertar si se modifica un seguimiento.

## Defina la consulta de búsqueda {#define-the-search-query}

Para aprender a construir la consulta de búsqueda, consulte las páginas de [tipos de seguimiento][1] individuales.

## Vista previa de gráficos {#preview-graphs}

A medida que crea o modifica su consulta, el gráfico de vista previa en la parte superior de la configuración se actualiza dinámicamente para reflejar los resultados en tiempo real.

{{< tabs >}}
{{% tab "Datos evaluados" %}}

{{< img src="/monitors/configuration/evaluated_data_preview_high_error_rate.png" alt="Gráfico de vista previa de datos evaluados" style="width:100%;" >}}

El gráfico {{< ui >}}Evaluated Data{{< /ui >}} muestra cómo su seguimiento habría evaluado los datos usando su consulta y umbrales actuales. Con la vista previa de evaluación, puede
- Vea las transiciones de estado históricas (por ejemplo, `OK` → `ALERT`).
- Entienda cómo se habría comportado su seguimiento.
- Obtenga una vista previa de quién sería notificado (incluyendo las reglas de notificación)
- Detecte rápidamente configuraciones erróneas antes de guardar.

Esta función es compatible con seguimientos de Metrics, Logs, APM, RUM, Eventos, Auditoría, Base de datos, Agent Observability y Despliegue.

{{% /tab %}}

{{% tab "Datos de fuente" %}}

{{< img src="/monitors/configuration/source_data_graph_high_error_rate.png" alt="Gráfico de vista previa de datos de fuente" style="width:100%;" >}}

El gráfico {{< ui >}}Source Data{{< /ui >}} muestra las series temporales sin procesar o el resultado de la consulta para su seguimiento, sin ninguna evaluación de umbral o lógica de alerta aplicada. Esto le permite:

- Visualice los datos subyacentes que su seguimiento está evaluando.
- Correlacione los cambios de estado de alerta con las tendencias de datos reales.
- Identifique anomalías, brechas o patrones inesperados en sus datos antes de configurar las condiciones de alerta.

Utilice el gráfico {{< ui >}}Source Data{{< /ui >}} para asegurarse de que su consulta devuelva los resultados esperados y para ayudar a refinar sus umbrales de alerta y ventanas de evaluación.

{{% /tab %}}
{{< /tabs >}}

## Establezca condiciones de alerta {#set-alert-conditions}

Las condiciones de alerta varían según el [tipo de seguimiento][1]. Configure los seguimientos para que se activen si el valor de la consulta cruza un umbral, o si un cierto número de comprobaciones consecutivas fallaron.

{{< tabs >}}
{{% tab "Alerta de umbral" %}}

* Activar cuando el {{< ui >}}average{{< /ui >}}, {{< ui >}}max{{< /ui >}}, {{< ui >}}min{{< /ui >}} o {{< ui >}}sum{{< /ui >}} de la métrica sea
* {{< ui >}}above{{< /ui >}}, {{< ui >}}above or equal to{{< /ui >}}, {{< ui >}}below{{< /ui >}} o {{< ui >}}below or equal to{{< /ui >}} el umbral
* durante los últimos {{< ui >}}5 minutes{{< /ui >}}, {{< ui >}}15 minutes{{< /ui >}}, {{< ui >}}1 hour{{< /ui >}} o {{< ui >}}custom{{< /ui >}} para establecer un valor entre 1 minuto y 48 horas (1 mes para seguimientos de métricas)

### Método de agregación {#aggregation-method}

La consulta devuelve una serie de puntos, pero se necesita un solo valor para comparar con el umbral. El seguimiento debe reducir los datos en la ventana de evaluación a un solo valor.

| Opción                  | Descripción                                            |
|-------------------------|--------------------------------------------------------|
| {{< ui >}}average{{< /ui >}}         | La serie se promedia para producir un solo valor que se compara con el umbral. Agrega la función `avg()` a la consulta de su seguimiento. |
| {{< ui >}}max{{< /ui >}} | Si cualquier valor individual en la serie generada supera el umbral, se activa una alerta. Agrega la función `max()` a la consulta de su seguimiento.* |
| {{< ui >}}min{{< /ui >}}  | Si todos los puntos en la ventana de evaluación de su consulta superan el umbral, se activa una alerta. Agrega la función `min()` a la consulta de su seguimiento.* |
| {{< ui >}}sum{{< /ui >}} | Si la suma de cada punto en la serie supera el umbral, se activa una alerta. Agrega la función `sum()` a la consulta de su seguimiento. |

* Estas descripciones de máx. y mín. asumen que el seguimiento alerta cuando la métrica _supera_ el umbral. Para los seguimientos que alertan cuando está _por debajo_ del umbral, el comportamiento de máx. y mín. se invierte.

<div class="alert alert-info">Para obtener un desglose de cómo funciona cada método de agregación con ejemplos, consulte la <a href="/monitors/guide/monitor_aggregators/">guía de agregadores de seguimientos</a>.</div>

**Nota**: Existen diferentes comportamientos al utilizar `as_count()`. Consulte [as_count() en Evaluaciones de seguimiento][2] para obtener más detalles.

### Ventana de evaluación {#evaluation-window}

Un seguimiento puede evaluarse utilizando ventanas de tiempo acumulativas o ventanas de tiempo móviles. Las ventanas de tiempo acumulativas son más adecuadas para preguntas que requieren contexto histórico, como: "¿Cuál es la suma de todos los datos disponibles hasta este momento?" Las ventanas de tiempo móviles son más adecuadas para responder preguntas que no requieren este contexto, como: "¿Cuál es el promedio de los últimos _N_ puntos de datos?"

La siguiente figura ilustra la diferencia entre las ventanas de tiempo acumulativas y móviles.

{{< img src="/monitors/create/rolling_vs_expanding.png" alt="Dos gráficos que muestran ventanas de tiempo acumulativas frente a móviles. Las ventanas de tiempo acumulativas continúan expandiéndose a medida que pasa el tiempo. Las ventanas de tiempo móviles cubren momentos particulares en el tiempo." style="width:100%;">}}

#### Ventanas de tiempo móviles {#rolling-time-windows}

Una ventana de tiempo móvil tiene un tamaño fijo y desplaza su punto de inicio con el paso del tiempo. Los seguimientos pueden analizar los últimos {{< ui >}}5 minutes{{< /ui >}}, {{< ui >}}15 minutes{{< /ui >}}, {{< ui >}}1 hour{{< /ui >}}, o una ventana de tiempo personalizada de hasta 1 mes.

**Nota**: Los [monitores de Logs][6] tienen una ventana de tiempo móvil máxima de `2 days`.

#### Ventanas de tiempo acumulativas {#cumulative-time-windows}
Una ventana de tiempo acumulativa tiene un punto de inicio fijo y se expande con el paso del tiempo. Los seguimientos admiten tres ventanas de tiempo acumulativas diferentes:

- {{< ui >}}Current hour{{< /ui >}}: Una ventana de tiempo con un máximo de una hora que comienza en un minuto configurable de la hora. Por ejemplo, haga un seguimiento de la cantidad de llamadas que recibe un punto de conexión HTTP en una hora comenzando en el minuto 0.
- {{< ui >}}Current day{{< /ui >}}: Una ventana de tiempo con un máximo de 24 horas que comienza en una hora y un minuto configurables del día. Por ejemplo, haga un seguimiento de una [cuota de índice de registros diaria][3] usando la ventana de tiempo {{< ui >}}Current day{{< /ui >}} y permitiendo que comience a las 2:00pm UTC.
- {{< ui >}}Current month{{< /ui >}}: Analiza el mes actual comenzando en un día configurable del mes a una hora y un minuto configurables. Esta opción representa una ventana de tiempo de mes a la fecha y solo está disponible para seguimientos de métricas.

{{< img src="/monitors/create/cumulative_window_example_more_options.png" alt="Captura de pantalla de cómo se configura una ventana acumulativa en la interfaz de Datadog. El usuario ha buscado aws.sqs.number_of_messages_received. Las opciones están configuradas para evaluar la SUMA de la consulta durante el MES ACTUAL." style="width:100%;">}}

Una ventana de tiempo acumulativa se restablece después de alcanzar su lapso de tiempo máximo. Por ejemplo, una ventana de tiempo acumulativa que observa el {{< ui >}}Current month{{< /ui >}} se restablece el primer día de cada mes a la medianoche UTC. Alternativamente, una ventana de tiempo acumulativa de {{< ui >}}Current hour{{< /ui >}}, que comienza en el minuto 30, se restablece cada hora. Por ejemplo, a las 6:30am, 7:30am, 8:30am.

### Frecuencia de evaluación {#evaluation-frequency}

La frecuencia de evaluación define con qué frecuencia Datadog realiza la consulta del seguimiento. Para la mayoría de las configuraciones, la frecuencia de evaluación es `1 minute`, lo que significa que cada minuto, el seguimiento consulta los [datos seleccionados](#define-the-search-query) durante la [ventana de evaluación seleccionada](#evaluation-window) y compara el valor agregado con los [umbrales definidos](#thresholds).

De forma predeterminada, las frecuencias de evaluación dependen de la [ventana de evaluación](#evaluation-window) que se utilice. Una ventana más larga resulta en frecuencias de evaluación más bajas. La siguiente tabla ilustra cómo la frecuencia de evaluación es controlada por ventanas de tiempo más grandes:

| Rangos de ventana de evaluación        | Frecuencia de evaluación  |
|---------------------------------|-----------------------|
| ventana < 24 horas               | 1 minuto              |
| 24 horas <= ventana < 48 horas   | 10 minutos            |
| ventana >= 48 horas              | 30 minutos            |

La frecuencia de evaluación también se puede configurar para que la condición de alerta del seguimiento se verifique de forma diaria, semanal o mensual. En esta configuración, la frecuencia de evaluación ya no depende de la ventana de evaluación, sino del horario configurado.

Para obtener más información, consulte la guía sobre cómo [Personalizar las frecuencias de evaluación del seguimiento][4].

### Umbrales {#thresholds}

Utilice umbrales para establecer un valor numérico para activar una alerta. Dependiendo de la métrica elegida, el editor muestra la unidad utilizada (`byte`, `kibibyte`, `gibibyte`, etc.).

Datadog tiene dos tipos de notificaciones (alerta y advertencia). Los seguimientos se recuperan automáticamente según el umbral de alerta o advertencia, pero se pueden especificar condiciones adicionales. Para obtener información adicional sobre los umbrales de recuperación, consulte [¿Qué son los umbrales de recuperación?][5]. Por ejemplo, si un seguimiento alerta cuando la métrica está por encima de `3` y no se especifican umbrales de recuperación, el seguimiento se recupera una vez que el valor de la métrica vuelve a estar por debajo de `3`.

| Opción                                   | Descripción                    |
|------------------------------------------|--------------------------------|
| {{< ui >}}Alert threshold{{< /ui >}} (obligatorio) | El valor utilizado para activar una notificación de alerta. |
| {{< ui >}}Warning threshold{{< /ui >}}                   | El valor utilizado para activar una notificación de advertencia. |
| {{< ui >}}Alert recovery threshold{{< /ui >}}       | Un umbral opcional para indicar una condición adicional para la recuperación de la alerta. |
| {{< ui >}}Warning recovery threshold{{< /ui >}}     | Un umbral opcional para indicar una condición adicional para la recuperación de la alerta. |

A medida que cambia un umbral, el gráfico de vista previa en el editor muestra un marcador que indica el punto de corte.

{{< img src="/monitors/create/preview_graph_thresholds.png" alt="Gráfico de vista previa de umbrales" style="width:100%;">}}

**Nota**: Al ingresar valores decimales para los umbrales, si su valor es `<1`, agregue un `0` inicial al número. Por ejemplo, use `0.5`, no `.5`.


[1]: /es/monitors/guide/monitor_aggregators/
[2]: /es/monitors/guide/as-count-in-monitor-evaluations/
[3]: https://docs.datadoghq.com/es/logs/log_configuration/indexes/#set-daily-quota
[4]: /es/monitors/guide/custom_schedules
[5]: /es/monitors/guide/recovery-thresholds/
[6]: /es/monitors/types/log/
{{% /tab %}}
{{% tab "Alerta de verificación" %}}

Una alerta de verificación rastrea los estados consecutivos enviados por grupo de verificación y los compara con sus umbrales. Configure la alerta de verificación para:

1. Activar la alerta después de las fallas consecutivas seleccionadas: `<NUMBER>`

    Cada ejecución de verificación envía un único estado de `OK`, `WARN` o `CRITICAL`. Elija cuántas ejecuciones consecutivas con el estado `WARN` y `CRITICAL` activan una notificación. Por ejemplo, su proceso podría tener una pequeña interrupción donde la conexión falla. Si establece este valor en `> 1`, la interrupción se ignora, pero un problema con más de una falla consecutiva activa una notificación.

    {{< img src="/monitors/create/check_thresholds_alert_warn.png" alt="Umbrales de verificación Alerta/Advertencia" style="width:90%;">}}

2. Resolver la alerta después de los éxitos consecutivos seleccionados: `<NUMBER>`

    Elija cuántas ejecuciones consecutivas con el estado `OK` resuelven la alerta.

    {{< img src="/monitors/create/check_thresholds_recovery.png" alt="Umbrales de verificación Recuperación" style="width:90%;">}}

Consulte la documentación de los seguimientos de [verificación de proceso][1], [verificación de integración][2] y [verificación personalizada][3] para obtener más información sobre la configuración de alertas de verificación.



[1]: /es/monitors/types/process_check/
[2]: /es/monitors/types/integration/?tab=checkalert#integration-metric
[3]: /es/monitors/types/custom_check/
{{% /tab %}}
{{< /tabs >}}

### Condiciones de alerta avanzadas {#advanced-alert-conditions}

#### Sin datos {#no-data}

Las notificaciones de datos faltantes son útiles si espera que una métrica siempre reporte datos en circunstancias normales. Por ejemplo, si un servidor con el Agent debe estar activo continuamente, puede esperar que la métrica `system.cpu.idle` siempre reporte datos.

En este caso, debe habilitar las notificaciones de datos faltantes. Las secciones a continuación explican cómo lograr esto con cada opción.

**Nota**: El seguimiento debe poder evaluar los datos antes de alertar sobre los datos faltantes. Por ejemplo, si crea un seguimiento para `service:abc` y los datos de ese `service` no se están reportando, el seguimiento no envía alertas.

Si faltan datos durante `N` minutos, seleccione una opción del menú desplegable:

{{< img src="/monitors/create/on_missing_data.png" alt="Opciones sin datos" style="width:70%;">}}

- {{< ui >}}Evaluate as zero{{< /ui >}} / {{< ui >}}Show last known status{{< /ui >}}
- {{< ui >}}Show NO DATA{{< /ui >}}
- {{< ui >}}Show NO DATA and notify{{< /ui >}}
- {{< ui >}}Show OK{{< /ui >}}.

El comportamiento seleccionado se aplica cuando la consulta de un seguimiento no devuelve ningún dato. A diferencia de la opción {{< ui >}}Do not notify{{< /ui >}}, la ventana de datos faltantes **no** es configurable.

| Opción                    | Estado del seguimiento y notificación                                             |
|---------------------------|---------------------------------------------------------------------------|
| {{< ui >}}Evaluate as zero{{< /ui >}}        | El resultado vacío se reemplaza con cero y se compara con los umbrales de alerta/advertencia. Por ejemplo, si el umbral de alerta está establecido en `> 10`, un cero no activaría esa condición y el estado del seguimiento se establecería en `OK`.   |
| {{< ui >}}Show last known status{{< /ui >}}  | Se establece el último estado conocido del grupo o seguimiento.                        |
| {{< ui >}}Show NO DATA{{< /ui >}}            | El estado del seguimiento se establece en `NO DATA`.                                       |
| {{< ui >}}Show NO DATA and notify{{< /ui >}} | El estado del seguimiento se establece en `NO DATA` y se envía una notificación.        |
| {{< ui >}}Show OK{{< /ui >}}                 | El seguimiento se resuelve y el estado se establece en `OK`.                            |

El uso de default_zero() en una consulta bloquea el comportamiento de datos faltantes al valor predeterminado de ese tipo de consulta y deshabilita las otras opciones:

- Para consultas con `default_zero()`, los datos faltantes siempre se evalúan como cero y los otros comportamientos de datos faltantes no están disponibles.
- Para consultas sin `default_zero()`, las consultas `Count` tienen como valor predeterminado {{< ui >}}Evaluate as zero{{< /ui >}}, mientras que otros tipos de consulta tienen como valor predeterminado {{< ui >}}Show last known status{{< /ui >}}. Todos los comportamientos de datos faltantes permanecen disponibles.

#### Resolución automática {#auto-resolve}

{{< ui >}}[Never]{{< /ui >}}, {{< ui >}}After 1 hour{{< /ui >}}, {{< ui >}}After 2 hours{{< /ui >}} y así sucesivamente. resolver automáticamente este evento desde un estado activado.

La resolución automática funciona cuando ya no se envían datos. Los seguimientos no se resuelven automáticamente desde un estado de ALERTA o ADVERTENCIA si los datos siguen reportándose. Si los datos siguen enviándose, la función [renotify][2] puede utilizarse para informar a su equipo cuando un problema no se ha resuelto.

Para algunas métricas que se reportan periódicamente, puede tener sentido que las alertas activadas se resuelvan automáticamente después de un cierto período de tiempo. Por ejemplo, si tiene un contador que solo reporta cuando se registra un error, la alerta nunca se resuelve porque la métrica nunca reporta `0` como el número de errores. En este caso, configure su alerta para que se resuelva después de un cierto tiempo de inactividad en la métrica. **Nota**: Si un seguimiento se resuelve automáticamente y el valor de la consulta no cumple con el umbral de recuperación en la siguiente evaluación, el seguimiento activa una alerta nuevamente.

En la mayoría de los casos, esta configuración no es útil porque solo desea que una alerta se resuelva después de que realmente se haya solucionado. Por lo tanto, en general, tiene sentido dejar esto como {{< ui >}}[Never]{{< /ui >}} para que las alertas solo se resuelvan cuando la métrica esté por encima o por debajo del umbral establecido.

#### Tiempo de retención del grupo {#group-retention-time}

La retención de grupo controla cuánto tiempo se mantiene un grupo de seguimiento en el estado del seguimiento después de que los datos dejan de reportarse. Después de que pasa el período de retención, el grupo caduca y se elimina del estado del seguimiento.

De forma predeterminada, un grupo mantiene el estado durante 24 horas antes de ser eliminado. Los seguimientos de servidor y las comprobaciones de servicio que notifican sobre la falta de datos mantienen el estado durante 48 horas.

Para los tipos de seguimiento de alertas múltiples que admiten retención personalizada, puede establecer un valor entre 1 hora y 72 horas. Seleccione {{< ui >}}Remove the non-reporting group after N (length of time){{< /ui >}}.

{{< img src="/monitors/create/group_retention_time.png" alt="Opción de tiempo de retención de grupo" style="width:70%;">}}

Similar a la [opción de resolución automática][3], la retención de grupo funciona cuando ya no se envían datos. La hora de inicio de la retención de grupo y la opción de resolución automática son **idénticas** tan pronto como la consulta del seguimiento no devuelve datos.

Algunos casos de uso para definir un tiempo de retención de grupo personalizado incluyen:

- Cuando desee eliminar el grupo inmediatamente o poco después de que los datos dejen de reportarse
- Cuando desee mantener el grupo en el estado durante el tiempo que usualmente le toma solucionar problemas

**Nota**: La opción de tiempo de retención de grupo personalizado requiere un seguimiento de alertas múltiples que admita la opción [`On missing data`][4]. Estos tipos de seguimiento son APM Trace Analytics, Audit Logs, CI Pipelines, Error Tracking, Events, Logs y seguimientos RUM.

<div class="alert alert-info"><strong>Vista previa: Retención de grupo dinámica</strong><p>La retención de grupo dinámica está en vista previa y se aplica a los seguimientos creados recientemente. Para seguimientos con una gran cantidad de grupos, Datadog acorta automáticamente el tiempo que se mantiene un grupo después de que deja de reportar datos. Cuanto más frecuentemente aparecen y desaparecen los grupos, más corto se vuelve este período, manteniendo el seguimiento rápido y eficiente. Esto solo afecta a los grupos que han quedado en silencio; los grupos que reportan datos activamente nunca se eliminan.</p></div>

#### Retraso de grupo nuevo {#new-group-delay}

Retrase el inicio de la evaluación por `N` segundos para grupos nuevos.

El tiempo (en segundos) de espera antes de comenzar con Alerting, para permitir que los grupos recién creados inicien y que las aplicaciones arranquen por completo. Este debe ser un número entero no negativo.

Por ejemplo, si utiliza una arquitectura en contenedores, establecer un retraso de grupo evita que los grupos de seguimiento basados en contenedores se activen debido al alto uso de recursos o a la alta latencia cuando se crea un nuevo contenedor. El retraso se aplica a cada grupo nuevo (que no se ha visto en las últimas 24 horas) y es de `60` segundos de forma predeterminada.

La opción está disponible con el modo de alerta múltiple.

#### Retraso en la evaluación {#evaluation-delay}

<div class="alert alert-info"> Datadog recomienda un retraso de 15 minutos para las métricas de la nube, las cuales son rellenadas por los proveedores de servicios. Además, al usar una fórmula de división, un retraso de 60 segundos es útil para asegurar que su seguimiento evalúe valores completos. Consulte la <a href="https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/">
\">Página de Cloud Metric Delay</a> para tiempos de retardo estimados.</div>

Retrase la evaluación por `N` segundos.

El tiempo (en segundos) para retrasar la evaluación. Este debe ser un número entero no negativo. Entonces, si el retraso se establece en 900 segundos (15 minutos), la evaluación del seguimiento es durante los últimos `5 minutes`, y la hora es las 7:00, el seguimiento evalúa los datos de 6:40 a 6:45. El retraso de evaluación máximo configurable es de 86400 segundos (24 horas).

## Configure Notifications y automatizaciones {#configure-notifications-and-automations}

Configure sus mensajes de Notifications para incluir la información que más le interesa. Especifique a qué equipos enviar estas alertas, así como los atributos para activar las alertas.

### Mensaje {#message}

Utilice esta sección para configurar las Notifications para su equipo y configurar cómo enviar estas alertas:

  - [Configure su Notifications con variables de plantilla][5]
  - [Envíe Notifications a su equipo a través de correo electrónico, Slack o PagerDuty][6]

Para obtener más información sobre las opciones de configuración del mensaje de notificación, consulte [Alerting Notifications][7].

### Agregar metadatos {#add-metadata}

<div class="alert alert-info">Las etiquetas de seguimiento son independientes de las etiquetas enviadas por el Agent o las integraciones. Consulte la documentación de <a href="/monitors/manage/">Administrar seguimientos</a>.</div>

1. Use el menú desplegable {{< ui >}}Tags{{< /ui >}} para asociar [etiquetas][8] con su seguimiento.
1. Use el menú desplegable {{< ui >}}Teams{{< /ui >}} para asociar [equipos][9] con su seguimiento.
1. Elija un {{< ui >}}Priority{{< /ui >}}.

### Establecer agregación de alertas {#set-alert-aggregation}

Las Alerts se agrupan automáticamente según su selección de la agregación seleccionada para su consulta (por ejemplo, `avg by service`). Si la consulta no tiene agrupación, se establece de forma predeterminada en {{< ui >}}Simple Alert{{< /ui >}}. Si la consulta está agrupada por cualquier dimensión, la agrupación cambia a {{< ui >}}Multi Alert{{< /ui >}}.

{{< img src="/monitors/create/notification-aggregation.png" alt="Opciones de configuración para la agregación de notificaciones de seguimiento" style="width:100%;">}}

#### Alerta simple {#simple-alert}

{{< ui >}}Simple Alert{{< /ui >}}El modo activa una notificación agregando todos los orígenes que informan. Usted recibe **una alerta** cuando el valor agregado cumple con las condiciones establecidas. Por ejemplo, puede configurar un seguimiento para que le notifique si el uso promedio de CPU de todos los servidores supera un cierto umbral. Si se alcanza ese umbral, recibirá una sola notificación, independientemente de la cantidad de servidores individuales que hayan alcanzado el umbral. Esto puede ser útil para supervisar tendencias o comportamientos generales del sistema.


{{< img src="/monitors/create/simple-alert.png" alt="Diagrama que muestra cómo se envían las notificaciones de seguimiento en modo de alerta simple" style="width:90%;">}}

#### Alerta múltiple {#multi-alert}

Un seguimiento {{< ui >}}Multi Alert{{< /ui >}} activa notificaciones individuales para cada entidad en un seguimiento que cumple con el umbral de alerta.

{{< img src="/monitors/create/multi-alert.png" alt="Diagrama de cómo se envían las notificaciones de seguimiento en modo de alerta múltiple" style="width:90%;">}}

Por ejemplo, al configurar un seguimiento para que le notifique si la latencia P99, agregada por servicio, supera un cierto umbral, recibiría una alerta **separada** para cada servicio individual cuya latencia P99 superara el umbral de alerta. Esto puede ser útil para identificar y abordar instancias específicas de problemas del sistema o de la aplicación. Le permite hacer un seguimiento de los problemas a un nivel más granular.

##### Agrupación de notificaciones {#notification-grouping}

Al hacer un seguimiento de un grupo grande de entidades, las alertas múltiples pueden generar seguimientos ruidosos. Para mitigar esto, personalice qué dimensiones activan las alertas. Esto reduce el ruido y le permite concentrarse en las alertas que más importan. Por ejemplo, está haciendo un seguimiento del uso promedio de CPU de todos sus hosts. Si agrupa su consulta por `service` y `host` pero solo desea que se envíen alertas una vez por cada atributo `service` que cumpla con el umbral, elimine el atributo `host` de sus opciones de alerta múltiple y reduzca la cantidad de notificaciones que se envían.

{{< img src="/monitors/create/multi-alert-aggregated.png" alt="Diagrama de cómo se envían las notificaciones cuando se configuran dimensiones específicas en alertas múltiples" style="width:90%;">}}

Al agregar notificaciones en {{< ui >}}Multi Alert{{< /ui >}}modo, las dimensiones que no se agregan se vuelven {{< ui >}}Sub Groups{{< /ui >}} en la interfaz de usuario.

**Nota**: Si su métrica solo informa por `host` sin ninguna etiqueta `service`, el seguimiento no la detecta. Las métricas con etiquetas `host` y `service` son detectadas por el seguimiento.

Si configura etiquetas o dimensiones en su consulta, estos valores estarán disponibles para cada grupo evaluado en la alerta múltiple para completar dinámicamente las notificaciones con contexto útil. Consulte [Variables de atributo y etiqueta][10] para aprender cómo hacer referencia a los valores de etiqueta en el mensaje de notificación.

| Agrupar por                       | Modo de alerta simple | Modo de alerta múltiple |
|-------------------------------------|------------------------|-----------------------|
| _(todo)_                      | Un solo grupo que activa una notificación | N/A |
| 1 o más dimensiones | Una notificación si uno o más grupos cumplen las condiciones de alerta | Una notificación por grupo que cumpla las condiciones de alerta |

## Permisos {#permissions}

Todos los usuarios pueden visualizar todos los seguimientos, independientemente del equipo o rol con el que estén asociados. De forma predeterminada, solo los usuarios vinculados a roles con el [permiso de escritura de seguimientos][11] pueden editar seguimientos. El [rol de Datadog Admin y el rol estándar de Datadog][12] tienen el permiso de escritura de seguimientos de forma predeterminada. Si su organización utiliza [roles personalizados][13], otros roles personalizados pueden tener el permiso de escritura de seguimientos. Para obtener más información sobre cómo configurar RBAC para seguimientos y migrar seguimientos de la configuración bloqueada al uso de restricciones de roles, consulte la guía sobre [Cómo configurar RBAC para seguimientos][14].

Puede restringir aún más su seguimiento especificando una lista de [equipos][17], [roles][15] o usuarios autorizados para editarlo. El creador del seguimiento tiene derechos de edición sobre el seguimiento de forma predeterminada. La edición incluye cualquier actualización a la configuración del seguimiento, eliminar el seguimiento y silenciar el seguimiento por cualquier cantidad de tiempo.

**Nota**: Las limitaciones se aplican tanto en la interfaz de usuario como en la API.

### Controles de acceso granulares {#granular-access-controls}

Utilice [controles de acceso granulares][16] para limitar los equipos, roles o usuarios que pueden editar un seguimiento:
1. Mientras edita o configura un seguimiento, busque la sección {{< ui >}}Define permissions and audit notifications{{< /ui >}}.
  {{< img src="monitors/configuration/define_permissions_audit_notifications.png" alt="Opciones de configuración del seguimiento para definir permisos" style="width:70%;" >}}
1. Haga clic en {{< ui >}}Edit Access{{< /ui >}}.
1. Haga clic en {{< ui >}}Restrict Access{{< /ui >}}.
1. El cuadro de diálogo se actualiza para mostrar que los miembros de su organización tienen acceso {{< ui >}}Viewer{{< /ui >}} de forma predeterminada.
1. Use el menú desplegable para seleccionar uno o más equipos, roles o usuarios que puedan editar el seguimiento.
1. Haga clic en {{< ui >}}Add{{< /ui >}}.
1. El cuadro de diálogo se actualiza para mostrar que el rol que seleccionó tiene el permiso {{< ui >}}Editor{{< /ui >}}.
1. Haga clic en {{< ui >}}Done{{< /ui >}}.

**Nota:** Para mantener su acceso de edición al seguimiento, el sistema requiere que incluya al menos un rol o equipo del que usted sea miembro antes de guardar.

Para restaurar el acceso general a un seguimiento con acceso restringido, siga los pasos a continuación:
1. Mientras visualiza un seguimiento, haga clic en el menú desplegable {{< ui >}}More{{< /ui >}}.
1. Seleccione {{< ui >}}Permissions{{< /ui >}}.
1. Haga clic en {{< ui >}}Restore Full Access{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types
[2]: /es/monitors/notify/#renotify
[3]: /es/monitors/configuration/?tab=thresholdalert#auto-resolve
[4]: /es/monitors/configuration/?tabs=othermonitortypes#no-data
[5]: /es/monitors/notify/variables/
[6]: /es/monitors/notify/#configure-notifications-and-automations
[7]: /es/monitors/notify/
[8]: /es/getting_started/tagging/
[9]: /es/account_management/teams/
[10]: /es/monitors/notify/variables/?tab=is_alert#attribute-and-tag-variables
[11]: /es/account_management/rbac/permissions/#monitors
[12]: /es/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[13]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[14]: /es/monitors/guide/how-to-set-up-rbac-for-monitors/
[15]: /es/account_management/rbac/
[16]: /es/account_management/rbac/granular_access
[17]: /es/account_management/teams/