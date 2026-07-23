---
aliases:
- /es/monitors/create/configuration
description: Describe la página de creación de seguimiento.
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Notifications de seguimiento
- link: /monitors/manage/
  tag: Documentación
  text: Gestiona seguimientos
- link: /monitors/status/
  tag: Documentación
  text: Estado del Seguimiento
- link: https://www.datadoghq.com/blog/manage-monitors-with-datadog-teams/
  tag: Blog
  text: Gestiona tus seguimientos de manera más eficiente con Datadog Teams
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: Centro de Aprendizaje
  text: Personaliza las Notifications de seguimiento de alerta
title: Configura Seguimientos
---
## Resumen {#overview}

Para comenzar a configurar el seguimiento, completa lo siguiente:

* **Define la consulta de búsqueda:** Construye una consulta para contar eventos, medir métricas, agrupar por una o varias dimensiones, y más.
* **Establece condiciones de alerta:** Define umbrales de alerta y advertencia, períodos de evaluación y configura opciones avanzadas de alerta.
* **Configura notificaciones y automatizaciones:** Escribe un título y un mensaje de notificación personalizados con variables. Elige cómo se envían las Notifications a tus Teams. Incluye automatizaciones de flujo de trabajo o incidencias en la notificación de alerta.
* **Define permisos y notificaciones de auditoría:** Configura controles de acceso granulares y designa roles y usuarios específicos que pueden editar un seguimiento. Habilita notificaciones de auditoría para alertar si un seguimiento es modificado.

## Define la consulta de búsqueda {#define-the-search-query}

Para aprender a construir la consulta de búsqueda, consulte las páginas de los [tipos de seguimiento][1] individuales.

## Vista previa de gráficos {#preview-graphs}

A medida que construye o modifica su consulta, el gráfico de vista previa en la parte superior de la configuración se actualiza dinámicamente para reflejar los resultados en tiempo real.

{{< tabs >}}
{{% tab "Datos evaluados" %}}

{{< img src="/monitors/configuration/evaluated_data_preview_high_error_rate.png" alt="Gráfico de vista previa de datos evaluados" style="width:100%;" >}}

El gráfico de datos evaluados muestra cómo su monitor habría evaluado los datos utilizando su consulta y umbrales actuales. Con la vista previa de evaluación, puedes
- Ver transiciones de estado históricas (por ejemplo, `OK` → `ALERT`).
- Comprende cómo se habría comportado tu seguimiento.
- Vista previa de quién sería notificado (incluyendo las reglas de notificación)
- Identifica rápidamente configuraciones incorrectas antes de guardar.

Esta función es compatible con seguimientos de Métricas, Registros, APM, RUM, Eventos, Auditoría, Base de Datos, Agent Observability y Despliegue.

{{% /tab %}}

{{% tab "Datos de fuente" %}}

{{< img src="/monitors/configuration/source_data_graph_high_error_rate.png" alt="Gráfico de vista previa de datos de fuente" style="width:100%;" >}}

El gráfico de datos de fuente muestra las series temporales o la salida de consulta en bruto para su seguimiento, sin ninguna evaluación de umbrales o lógica de alerta aplicada. Esto te permite:

- Visualiza los datos subyacentes que tu seguimiento está evaluando.
- Correlaciona los cambios de estado de alerta con las tendencias de datos reales.
- Identifica anomalías, brechas o patrones inesperados en tus datos antes de configurar las condiciones de alerta.

Utiliza el gráfico de datos de fuente para asegurarte de que tu consulta esté devolviendo los resultados esperados y para ayudar a refinar tus umbrales de alerta y ventanas de evaluación.

{{% /tab %}}
{{< /tabs >}}

## Establece condiciones de alerta {#set-alert-conditions}

Las condiciones de alerta varían según el [tipo de seguimiento][1]. Configura tus seguimientos para que se activen si el valor de la consulta cruza un umbral o si un cierto número de verificaciones consecutivas fallan.

{{< tabs >}}
{{% tab "Alerta de umbral" %}}

* Activar cuando el `average`, `max`, `min` o `sum` de la métrica sea
* `above`, `above or equal to`, `below` o `below or equal to` el umbral
* durante los últimos `5 minutes`, `15 minutes`, `1 hour` o `custom` para establecer un valor entre 1 minuto y 48 horas (1 mes para seguimientos de métricas)

### Método de agregación {#aggregation-method}

La consulta devuelve una serie de puntos, pero se necesita un solo valor para comparar con el umbral. El seguimiento debe reducir los datos en la ventana de evaluación a un solo valor.

| Opción                  | Descripción                                            |
|-------------------------|--------------------------------------------------------|
| promedio         | La serie se promedia para producir un solo valor que se verifica contra el umbral. Agrega la función `avg()` a tu consulta de seguimiento. |
| máx | Si cualquier valor individual en la serie generada cruza el umbral, se activa una alerta. Agrega la función `max()` a tu consulta de seguimiento.* |
| mín  | Si todos los puntos en la ventana de evaluación para tu consulta cruzan el umbral, se activa una alerta. Agrega la función `min()` a tu consulta de seguimiento.* |
| suma | Si la suma de cada punto en la serie cruza el umbral, se activa una alerta. Agrega la función `sum()` a tu consulta de seguimiento. |

\* Estas descripciones de máximo y mínimo asumen que el seguimiento alerta cuando la métrica supera _el_ umbral. Para seguimientos que alertan cuando están _por debajo_ del umbral, el comportamiento de máximo y mínimo se invierte. Para más ejemplos, consulta la guía de [agregadores de seguimiento][1].

**Nota**: Existen diferentes comportamientos al utilizar `as_count()`. Consulta [as_count() en Evaluaciones de seguimiento][2] para más detalles.

### Ventana de evaluación {#evaluation-window}

Un seguimiento puede ser evaluado utilizando ventanas de tiempo acumulativas o ventanas de tiempo móviles. Las ventanas de tiempo acumulativas son más adecuadas para preguntas que requieren contexto histórico, como "¿Cuál es la suma de todos los datos disponibles hasta este momento?" Las ventanas de tiempo móviles son más adecuadas para responder preguntas que no requieren este contexto, como "¿Cuál es el promedio de los últimos _N_ puntos de datos?"

La figura a continuación ilustra la diferencia entre ventanas de tiempo acumulativas y móviles.

{{< img src="/monitors/create/rolling_vs_expanding.png" alt="Dos gráficos que muestran ventanas de tiempo acumulativas vs. móviles. Las ventanas de tiempo acumulativas continúan expandiéndose a medida que pasa el tiempo. Las ventanas de tiempo móviles cubren momentos particulares en el tiempo." style="width:100%;">}}

#### Ventanas de tiempo móviles {#rolling-time-windows}

Una ventana de tiempo móvil tiene un tamaño fijo y desplaza su punto de inicio con el tiempo. Los seguimientos pueden mirar hacia atrás en los últimos `5 minutes`, `15 minutes`, `1 hour`, o en una ventana de tiempo personalizada de hasta 1 mes.

**Nota**: [Seguimientos de registro][6] tienen una ventana de tiempo móvil máxima de `2 days`.

#### Ventanas de tiempo acumulativas {#cumulative-time-windows}
Una ventana de tiempo acumulativa tiene un punto de inicio fijo y se expande con el tiempo. Los seguimientos soportan tres diferentes ventanas de tiempo acumulativas:

- `Current hour`: Una ventana de tiempo con un máximo de una hora comenzando en un minuto configurable de una hora. Monitorea la cantidad de llamadas que recibe un punto de conexión HTTP en una hora, comenzando en el minuto 0.
- `Current day`: Una ventana de tiempo con un máximo de 24 horas comenzando en una hora y minuto configurables de un día. Monitorea una [cuota de índice de registro diario][3] utilizando la ventana de tiempo `current day` y dejándola comenzar a las 2:00 p.m. UTC.
- `Current month`: Mira hacia atrás en el mes actual comenzando en un día configurable del mes a una hora y minuto configurables. Esta opción representa una ventana de tiempo acumulativa hasta la fecha y solo está disponible para seguimientos de métricas.

{{< img src="/monitors/create/cumulative_window_example_more_options.png" alt="Captura de pantalla de cómo se configura una ventana acumulativa en la interfaz de Datadog. El usuario ha buscado aws.sqs.number_of_messages_received. Las opciones están configuradas para evaluar la suma de la consulta durante el CURRENT MONTH." style="width:100%;">}}

Una ventana de tiempo acumulativa se reinicia después de que se alcanza su máximo período de tiempo. Por ejemplo, una ventana de tiempo acumulativa que observa el `current month` se reinicia el primero de cada mes a la medianoche UTC. Alternativamente, una ventana de tiempo acumulativa de `current hour`, que comienza en el minuto 30, se reinicia cada hora. Por ejemplo, a las 6:30 a.m., 7:30 a.m., 8:30 a.m.

### Frecuencia de evaluación {#evaluation-frequency}

La frecuencia de evaluación define con qué frecuencia Datadog realiza la consulta del seguimiento. Para la mayoría de las configuraciones, la frecuencia de evaluación es `1 minute`, lo que significa que cada minuto, el seguimiento consulta los [datos seleccionados](#define-the-search-query) durante la [ventana de evaluación seleccionada](#evaluation-window) y compara el valor agregado contra los [umbrales definidos](#thresholds).

Por defecto, las frecuencias de evaluación dependen de la [ventana de evaluación](#evaluation-window) que se utiliza. Una ventana más larga resulta en frecuencias de evaluación más bajas. La siguiente tabla ilustra cómo la frecuencia de evaluación es controlada por ventanas de tiempo más grandes:

| Rangos de Ventana de Evaluación        | Frecuencia de Evaluación  |
|---------------------------------|-----------------------|
| ventana < 24 horas               | 1 minuto              |
| 24 horas <= ventana < 48 horas   | 10 minutos            |
| ventana >= 48 horas              | 30 minutos            |

La frecuencia de evaluación también se puede configurar para que la condición de alerta del seguimiento se verifique a diario, semanalmente o mensualmente. En esta configuración, la frecuencia de evaluación ya no depende de la ventana de evaluación, sino del horario configurado.

Para más información, consulte la guía sobre cómo [Personalizar las frecuencias de evaluación del monitor][4].

### Umbrales {#thresholds}

Utilice umbrales para establecer un valor numérico que active una alerta. Dependiendo de la métrica elegida, el editor muestra la unidad utilizada (`byte`, `kibibyte`, `gibibyte`, etc.).

Datadog tiene dos tipos de notificaciones (alerta y advertencia). Los monitores se recuperan automáticamente según el umbral de alerta o advertencia, pero se pueden especificar condiciones adicionales. Para información adicional sobre los umbrales de recuperación, consulte [¿Cuáles son los umbrales de recuperación?][5]. Por ejemplo, si un monitor emite una alerta cuando la métrica está por encima de `3` y no se especifican umbrales de recuperación, el monitor se recupera una vez que el valor de la métrica vuelve a estar por debajo de `3`.

| Opción                                   | Descripción                    |
|------------------------------------------|--------------------------------|
| Umbral&nbsp;de&nbsp;alerta&nbsp;**(requerido)** | El valor utilizado para activar una notificación de alerta. |
| Umbral&nbsp;de&nbsp;advertencia                   | El valor utilizado para activar una notificación de advertencia. |
| Umbral de recuperación de alerta | Un umbral opcional para indicar una condición adicional para la recuperación de alertas. |
| Umbral de recuperación de advertencia | Un umbral opcional para indicar una condición adicional para la recuperación de advertencias. |

A medida que cambias un umbral, el gráfico de vista previa en el editor muestra un marcador que indica el punto de corte.

{{< img src="/monitors/create/preview_graph_thresholds.png" alt="Gráfico de vista previa de umbrales" style="width:100%;">}}

**Nota**: Al ingresar valores decimales para los umbrales, si su valor es `<1`, agregue un `0` delante del número. Por ejemplo, utilice `0.5`, no `.5`.


[1]: /es/monitors/guide/monitor_aggregators/
[2]: /es/monitors/guide/as-count-in-monitor-evaluations/
[3]: https://docs.datadoghq.com/es/logs/log_configuration/indexes/#set-daily-quota
[4]: /es/monitors/guide/custom_schedules
[5]: /es/monitors/guide/recovery-thresholds/
[6]: /es/monitors/types/log/
{{% /tab %}}
{{% tab "Alerta de verificación" %}}

Una alerta de verificación rastrea los estados consecutivos enviados por grupo de verificación y los compara con sus umbrales. Configure la alerta de verificación para:

1. Active la alerta después de fallos consecutivos seleccionados: `<NUMBER>`

    Cada ejecución de verificación envía un único estado de `OK`, `WARN` o `CRITICAL`. Elija cuántas ejecuciones consecutivas con el estado `WARN` y `CRITICAL` activan una notificación. Por ejemplo, su proceso podría tener un solo fallo donde la conexión falla. Si establece este valor en `> 1`, el fallo se ignora, pero un problema con más de un fallo consecutivo activa una notificación.

    {{< img src="/monitors/create/check_thresholds_alert_warn.png" alt="Verifique los umbrales de Alerta/Advertencia" style="width:90%;">}}

2. Resuelva la alerta después de los éxitos consecutivos seleccionados: `<NUMBER>`

    Elija cuántas ejecuciones consecutivas con el estado `OK` resuelven la alerta.

    {{< img src="/monitors/create/check_thresholds_recovery.png" alt="Verificación de umbrales de recuperación" style="width:90%;">}}

Consulte la documentación para los monitores de [verificación de proceso][1], [verificación de integración][2] y [verificación personalizada][3] para obtener más información sobre la configuración de alertas de verificación.



[1]: /es/monitors/types/process_check/
[2]: /es/monitors/types/integration/?tab=checkalert#integration-metric
[3]: /es/monitors/types/custom_check/
{{% /tab %}}
{{< /tabs >}}

### Condiciones avanzadas de alerta {#advanced-alert-conditions}

#### Sin datos {#no-data}

Las notificaciones por datos faltantes son útiles si espera que una métrica siempre esté reportando datos en circunstancias normales. Por ejemplo, si un host con el Agent debe estar activo continuamente, puede esperar que la métrica `system.cpu.idle` siempre reporte datos.

En este caso, debe habilitar las Notifications por datos faltantes. Las secciones a continuación explican cómo lograr esto con cada opción.

**Nota**: El monitor debe ser capaz de evaluar datos antes de alertar sobre datos faltantes. Por ejemplo, si crea un monitor para `service:abc` y los datos de ese `service` no se están reportando, el monitor no envía alertas.

Si faltan datos durante `N` minutos, seleccione una opción del menú desplegable:

{{< img src="/monitors/create/on_missing_data.png" alt="Sin datos disponibles" style="width:70%;">}}

- `Evaluate as zero` / `Show last known status`
- `Show NO DATA`
- `Show NO DATA and notify`
- `Show OK`.

El comportamiento seleccionado se aplica cuando la consulta del monitor no devuelve ningún dato. A diferencia de la opción `Do not notify`, la ventana de datos faltantes no es **configurable**.

| Opción                    | Estado del monitor y notificación                                             |
|---------------------------|---------------------------------------------------------------------------|
| `Evaluate as zero`        | El resultado vacío se reemplaza con cero y se compara con los umbrales de alerta/advertencia. Por ejemplo, si el umbral de alerta se establece en `> 10`, un cero no activaría esa condición, y el estado del monitor se establece en `OK`.   |
| `Show last known status`  | El último estado conocido del grupo o monitor se establece.                        |
| `Show NO DATA`            | El estado del monitor se establece en `NO DATA`.                                       |
| `Show NO DATA and notify` | El estado del monitor se establece en `NO DATA` y se envía una notificación.        |
| `Show OK`                 | El monitor se resuelve y el estado se establece en `OK`.                            |

Las opciones `Evaluate as zero` y `Show last known status` se muestran según el tipo de consulta:

- **Evaluar como cero:** Esta opción está disponible para monitores que utilizan consultas `Count` sin la función `default_zero()`.
- **Mostrar último estado conocido:** Esta opción está disponible para monitores que utilizan cualquier otro tipo de consulta que no sea `Count`, por ejemplo `Gauge`, `Rate` y `Distribution`, así como para consultas `Count` con `default_zero()`.

#### Resolución automática {#auto-resolve}

`[Never]`, `After 1 hour`, `After 2 hours` y así sucesivamente. resuelve automáticamente este evento desde un estado activado.

La resolución automática funciona cuando ya no se están enviando datos. Los monitores no se resuelven automáticamente desde un estado de ALERTA o ADVERTENCIA si los datos aún se están reportando. Si los datos aún se están enviando, se puede utilizar la función [renotify][2] para informar a su equipo cuando un problema no se ha resuelto.

Para algunas métricas que reportan periódicamente, puede tener sentido que las alertas activadas se resuelvan automáticamente después de un cierto período de tiempo. Por ejemplo, si tiene un contador que solo reporta cuando se registra un error, la alerta nunca se resuelve porque la métrica nunca reporta `0` como el número de errores. En este caso, configure su alerta para que se resuelva después de un cierto tiempo de inactividad en la métrica. **Nota**: Si un monitor se resuelve automáticamente y el valor de la consulta no cumple con el umbral de recuperación en la siguiente evaluación, el monitor activa una alerta nuevamente.

En la mayoría de los casos, esta configuración no es útil porque solo desea que una alerta se resuelva después de que realmente se haya solucionado. Por lo tanto, en general, tiene sentido dejar esto como `[Never]` para que las alertas solo se resuelvan cuando la métrica está por encima o por debajo del umbral establecido.

#### Tiempo de retención del grupo {#group-retention-time}

Puede eliminar el grupo del estado del monitor después de `N` horas de datos faltantes. La duración puede ser de un mínimo de 1 hora y un máximo de 72 horas. Para monitores de múltiples alertas, seleccione **Eliminar el grupo que no reporta después de `N (length of time)`**.

{{< img src="/monitors/create/group_retention_time.png" alt="Opción de Tiempo de Retención del Grupo" style="width:70%;">}}

Similar a la [opción de resolución automática][3], la retención del grupo funciona cuando ya no se están enviando datos. Esta opción controla cuánto tiempo se mantiene el grupo en el estado del monitor una vez que los datos dejan de reportarse. Por defecto, un grupo mantiene el estado durante 24 horas antes de ser eliminado. El tiempo de inicio de la retención del grupo y la opción de Auto-resolución son **idénticos** tan pronto como la consulta del monitor no devuelve datos.

Algunos casos de uso para definir un tiempo de retención de grupo incluyen:

- Cuando desee eliminar el grupo de inmediato o poco después de que los datos dejen de reportarse
- Cuando desee mantener el grupo en el estado durante el tiempo que normalmente toma para la solución de problemas

**Nota**: La opción de tiempo de retención del grupo requiere un monitor de múltiples alertas que soporte la opción [`On missing data`][4]. Estos tipos de monitores son APM Trace Analytics, Registros de Auditoría, CI Pipelines, Error Tracking, Eventos, Registros y monitores RUM.

#### Nuevo retraso de grupo {#new-group-delay}

Retrasar el inicio de la evaluación por `N` segundos para nuevos grupos.

El tiempo (en segundos) que se debe esperar antes de comenzar a alertar, para permitir que los grupos recién creados se inicien y las aplicaciones se inicien completamente. Esto debe ser un número entero no negativo.

Por ejemplo, si está utilizando una arquitectura de contenedores, establecer un retraso de grupo evita que los grupos de monitores con contexto en contenedores se activen debido a un alto uso de recursos o alta latencia cuando se crea un nuevo contenedor. El retraso se aplica a cada nuevo grupo (que no ha sido visto en las últimas 24 horas) y por defecto es de `60` segundos.

La opción está disponible con el modo de múltiples alertas.

#### Retraso de evaluación {#evaluation-delay}

<div class="alert alert-info"> Datadog recomienda un retraso de 15 minutos para métricas en la nube, que son completadas por proveedores de servicios. Además, al usar una fórmula de división, un retraso de 60 segundos es útil para asegurar que su seguimiento evalúe en valores completos. Vea la <a href="https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/
">página de Cloud Metric Delay</a> para tiempos de retraso estimados.</div>

Retrasar la evaluación por `N` segundos.

El tiempo (en segundos) para retrasar la evaluación. Esto debe ser un número entero no negativo. Entonces, si el retraso se establece en 900 segundos (15 minutos), la evaluación del seguimiento es durante los últimos `5 minutes`, y la hora es 7:00, el seguimiento evalúa datos desde las 6:40 hasta las 6:45. El retraso máximo configurable para la evaluación es de 86400 segundos (24 horas).

## Configura notificaciones y automatizaciones {#configure-notifications-and-automations}

Configura tus mensajes de notificación para incluir la información que más te interesa. Especifica a qué equipos enviar estas alertas, así como qué atributos activar para las alertas.

### Mensaje {#message}

Utiliza esta sección para configurar notificaciones a tu equipo y configurar cómo enviar estas alertas:

  - [Configura tu notificación con Variables de Plantilla][5]
  - [Envía notificaciones a tu equipo a través de correo electrónico, Slack o PagerDuty][6]

Para más información sobre las opciones de configuración para el mensaje de notificación, consulta [Notificaciones de Alerta][7].

### Agrega metadatos {#add-metadata}

<div class="alert alert-info">Las etiquetas de seguimiento son independientes de las etiquetas enviadas por el Agente o integraciones. Consulta la <a href="/monitors/manage/">documentación de monitores</a>.</div>

1. Utiliza el desplegable **Etiquetas** para asociar [etiquetas][8] con tu monitor.
1. Utiliza el desplegable **Equipos** para asociar [equipos][9] con tu monitor.
1. Elige una **Prioridad**.

### Establece la agregación de alertas {#set-alert-aggregation}

Las alertas se agrupan automáticamente según tu selección de la agregación elegida para tu consulta (por ejemplo, `avg by service`). Si la consulta no tiene agrupamiento, se establece por defecto en `Simple Alert`. Si la consulta está agrupada por alguna dimensión, el agrupamiento cambia a `Multi Alert`.

{{< img src="/monitors/create/notification-aggregation.png" alt="Opciones de configuración para la agregación de notificaciones de monitor" style="width:100%;">}}

#### Alerta simple {#simple-alert}

El modo `Simple Alert`activa una notificación al agregar todas las fuentes de informes. Recibes **una alerta** cuando el valor agregado cumple con las condiciones establecidas. Por ejemplo, podrías configurar un monitor para que te notifique si el uso promedio de CPU de todos los servidores supera cierto umbral. Si se cumple ese umbral, recibirás una única notificación, independientemente del número de servidores individuales que cumplan con el umbral. Esto puede ser útil para monitorear las tendencias o comportamientos generales del sistema.


{{< img src="/monitors/create/simple-alert.png" alt="Diagrama que muestra cómo se envían las notificaciones del monitor en modo de alerta simple." style="width:90%;">}}

#### Alerta múltiple {#multi-alert}

Un `Multi Alert` monitor activa notificaciones individuales para cada entidad en un monitor que cumple con el umbral de alerta.

{{< img src="/monitors/create/multi-alert.png" alt="Diagrama que muestra cómo se envían las notificaciones del monitor en modo de alerta múltiple." style="width:90%;">}}

Por ejemplo, al configurar un monitor para que te notifique si la latencia P99, agregada por servicio, supera cierto umbral, recibirías una **alerta** separada para cada servicio individual cuya latencia P99 excede el umbral de alerta. Esto puede ser útil para identificar y abordar instancias específicas de problemas en el sistema o la aplicación. Permite rastrear problemas a un nivel más granular.

##### Agrupación de notificaciones {#notification-grouping}

Al monitorear un gran grupo de entidades, las alertas múltiples pueden llevar a monitores ruidosos. Para mitigar esto, personaliza qué dimensiones activan alertas. Esto reduce el ruido y te permite concentrarte en las alertas que más importan. Por ejemplo, estás monitoreando el uso promedio de CPU de todos tus hosts. Si agrupas tu consulta por `service` y `host` pero solo deseas que se envíen alertas una vez por cada atributo `service` que cumpla con el umbral, elimina el atributo `host` de tus opciones de alerta múltiple y reduce el número de notificaciones que se envían.

{{< img src="/monitors/create/multi-alert-aggregated.png" alt="Diagrama de cómo se envían las notificaciones cuando se configuran a dimensiones específicas en alertas múltiples." style="width:90%;">}}

Al agregar notificaciones en `Multi Alert`modo, las dimensiones que no se agregan se convierten en `Sub Groups` en la interfaz de usuario.

**Nota**: Si tu métrica solo informa por `host` sin la etiqueta `service`, no es detectada por el monitor. Las métricas con las etiquetas `host` y `service` son detectadas por el monitor.

Si configuras etiquetas o dimensiones en tu consulta, estos valores estarán disponibles para cada grupo evaluado en la alerta múltiple para completar dinámicamente las notificaciones con contexto útil. Consulta [Attribute and tag variables][10] para aprender cómo referenciar los valores de etiqueta en el mensaje de notificación.

| Agrupar por                       | Modo de alerta simple | Modo de alerta múltiple |
|-------------------------------------|------------------------|-----------------------|
| _(todo)_                      | Un solo grupo activando una notificación | N/A |
| 1&nbsp;o&nbsp;más&nbsp;dimensiones | Una notificación si uno o más grupos cumplen las condiciones de alerta | Una notificación por grupo que cumple las condiciones de alerta |

## Permisos {#permissions}

Todos los usuarios pueden ver todos los monitores, independientemente del equipo o rol al que estén asociados. Por defecto, solo los usuarios asignados a roles con el [permiso de escritura de monitor][11] pueden editar monitores. [Rol de Administrador de Datadog y Rol Estándar de Datadog][12] tienen, por defecto, el permiso de escritura de monitores. Si tu organización utiliza [Custom Roles][13], otros roles personalizados pueden tener el permiso de escritura de monitores. Para más información sobre cómo configurar RBAC para Monitores y migrar monitores de la configuración bloqueada a usar restricciones de rol, consulte la guía sobre [Cómo configurar RBAC para Monitores][14].

Puede restringir aún más su monitor especificando una lista de [equipos][17], [roles][15] o usuarios permitidos para editarlo. El creador del monitor tiene derechos de edición sobre el monitor por defecto. Editar incluye cualquier actualización a la configuración del monitor, eliminar el monitor y silenciar el monitor por cualquier período de tiempo.

**Nota**: Las limitaciones se aplican tanto en la interfaz de usuario como en la API.

### Controles de acceso granulares {#granular-access-controls}

Utiliza [controles de acceso granulares][16] para limitar los equipos, roles o usuarios que pueden editar un monitor:
1. Mientras editas o configuras un monitor, encuentra la sección **Definir permisos y notificaciones de auditoría**.
  {{< img src="monitors/configuration/define_permissions_audit_notifications.png" alt="Opciones de configuración del monitor para definir permisos" style="width:70%;" >}}
1. Haz clic en **Editar acceso**.
1. Haz clic en **Restringir acceso**.
1. El cuadro de diálogo se actualiza para mostrar que los miembros de tu organización tienen acceso de **Visualización** por defecto.
1. Usa el menú desplegable para seleccionar uno o más equipos, roles o usuarios que puedan editar el monitor.
1. Haz clic en **Agregar**.
1. El cuadro de diálogo se actualiza para mostrar que el rol que seleccionaste tiene el permiso de **Editor**.
1. Haz clic en **Listo**.

**Nota:** Para mantener tu acceso de edición al monitor, el sistema requiere que incluyas al menos un rol o equipo del cual seas miembro antes de guardar.

Para restaurar el acceso general a un monitor con acceso restringido, sigue los pasos a continuación:
1. Mientras visualizas un monitor, haz clic en el menú desplegable **Más**.
1. Selecciona **Permisos**.
1. Haz clic en **Restaurar acceso completo**.
1. Haz clic en **Guardar**.

## Lectura adicional {#further-reading}

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