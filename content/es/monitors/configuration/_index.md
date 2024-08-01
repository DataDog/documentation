---
aliases:
- /es/monitors/create/configuration
description: Describe la página de creación de monitores.
further_reading:
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de los monitores
- link: /monitors/manage/
  tag: Documentación
  text: Gestionar los monitores
- link: /monitors/manage/status/
  tag: Documentación
  text: Estado de los monitores
title: Configurar monitores
---

## Información general

Para empezar a configurar un monitor, debes hacer lo siguiente:

* **Definir la consulta de búsqueda:** crea una consulta para contar eventos, medir métricas, agrupar por una o varias dimensiones, etc.
* **Establecer las condiciones de alerta:** configura los umbrales de alertas y avisos, los intervalos de evaluación y las opciones de alerta avanzadas.
* **Configurar notificaciones y automatizaciones:** escribe un título y un mensaje de notificación personalizados con variables. Elige cómo se envían las notificaciones a tus equipos (correo electrónico, Slack o PagerDuty). Incluye automatizaciones de flujo de trabajo o casos en la notificación de alerta.

## Definir la consulta de búsqueda

Para aprender a crear una consulta de búsqueda, consulta las páginas de documentación para cada uno de los [tipos de monitores][1]. El gráfico de vista previa situado sobre los campos de búsqueda se actualiza a medida que vas modificando tu consulta.

{{< img src="/monitors/create/preview_graph_monitor.mp4" alt="Gráfico de vista previa" video=true style="width:90%;">}}

## Definir condiciones de alerta

Las condiciones de alerta varían en función del [tipo de monitor][1]. Puedes configurar los monitores para que activen una alerta si el valor de la consulta traspasa un umbral o si un determinado número de checks consecutivos falla.

{{< tabs >}}
{{% tab "Threshold alert" %}}

* Enviar una alerta cuando las variables `average`, `max`, `min` o `sum` de la métrica tengan un valor
* `above`, `above or equal to`, `below` o `below or equal to` con respecto al umbral 
* durante los últimos `5 minutes`, `15 minutes`, `1 hour`, o `custom` para fijar un valor entre 1 minuto y 48 horas (1 mes para los monitores de métrica)

### Método de agregación

La consulta devuelve una serie de puntos. Sin embargo, el monitor solo necesita un único valor para compararlo con el umbral, por lo que debe reducir los datos del intervalo de evaluación a un solo valor.

| Opción                  | Descripción                                            |
|-------------------------|--------------------------------------------------------|
| average         | Se hace una media para obtener un único valor que se compara con el umbral. Esta opción añade la función `avg()` a la consulta de tu monitor. |
| max | Si uno de los valores de la serie supera el umbral, se genera una alerta. Esta opción añade la función `max()` a la consulta de tu monitor.* |
| min  | Si todos los puntos del intervalo de evaluación para tu consulta superan el umbral, se envía una alerta. Esta opción añade la función `min()` a la consulta de tu monitor.* |
| sum | Si la suma de todos los puntos de la serie supera el umbral, se envía una alerta. Esta opción añade la función `sum()` a la consulta de tu monitor. |

\* Estas descripciones de max y min suponen que el monitor envía una alerta cuando métrica está _por encima_ del umbral. Para los monitores que alertan cuando se está _por debajo_ del umbral, el comportamiento de max y min se invierte. Para ver más ejemplos, consulta la guía [Agregadores del monitor][5].

**Nota**: Pueden darse diferentes comportamientos al utilizar `as_count()`. Consulta [as_count() en las evaluaciones de los monitores][1] para obtener más información.

### Intervalo de evaluación

Un monitor se puede evaluar utilizando intervalos continuos o fijos. Los intervalos continuos funcionan mejor para consultas que necesitan examinar datos históricos, como "¿Cuál es la suma de los datos disponibles hasta este momento concreto?". Los intervalos fijos son mejores para responder preguntas que no necesitan este contexto, por ejemplo "¿Cuál es la media de los últimos _N_ puntos de datos?".

La figura a continuación ilustra la diferencia entre los intervalos continuos y los intervalos fijos.

{{< img src="/monitors/create/rolling_vs_expanding.png" alt="Dos gráficos que muestran los intervalos continuos frente a los fijos. Los intervalos continuos se repiten en el tiempo mientras que los fijos sirven para evaluar momentos particulares." style="width:100%;">}}

#### Intervalos fijos

Los intervalos fijos tienen una duración fija, pero su punto de inicio cambia con el tiempo. Los monitores permiten examinar los últimos `5 minutes`, `15 minutes` o `1 hour`, y también se pueden usar para analizar un intervalo específico.

#### Intervalos continuos
Un intervalo continuo tiene un punto de inicio fijo y se repite a lo largo del tiempo. Los monitores son compatibles con tres intervalos de este tipo:

- `Current hour`: un intervalo de una hora como máximo que comienza en el minuto que elijas. Por ejemplo, monitoriza la cantidad de llamadas que recibe un endpoint HTTP en una hora comenzando por el minuto 0.
- `Current day`: un intervalo con un máximo de 24 horas que empieza en la hora y el minuto que configures. Por ejemplo, crea un monitor de la [cuota de índice de logs diarios][2] para el intervalo `current day` que empieza a las 14:00 UTC.
- `Current month`: analiza el último mes desde el primer día del mes a las 00:00 UTC. Esta opción representa un intervalo de un mes hasta la fecha y solo está disponible para los monitores de métricas.

{{< img src="/monitors/create/cumulative_window_example.png" alt="Captura de pantalla que muestra cómo se configuran los intervalos en la interfaz de Datadog. El usuario ha buscado aws.sqs.number_of_messages_received. Las opciones están configuradas para evaluar la suma (SUM) de la consulta durante el mes actual (CURRENT MONTH)." style="width:100%;">}}

Un intervalo fijo se reinicia cuando se alcanza su tramo (span) temporal máximo. Por ejemplo, un intervalo fijo de `current month` se reinicia el primer día de cada mes a medianoche UTC. Alternativamente, un intervalo continuo de `current hour`, que comienza en el minuto 30, se reinicia cada hora. Por ejemplo, a las 6:30, 7:30 y 8:30.

### Frecuencia de evaluación

La frecuencia de evaluación define con qué frecuencia Datadog lanza una consulta al monitor. En la mayoría de configuraciones, la frecuencia de evaluación es `1 minute`, lo que quiere decir que cada minuto, el monitor consulta la [fecha seleccionada](#define-the-search-query) durante el [intervalo de evaluación configurado] y compara el valor acumulado con los [umbrales que tengas definidos](#thresholds).

Por defecto, las frecuencias de evaluación dependen del [intervalo de evaluación](#evaluation-window) que se utilice. Un intervalo más largo resulta en frecuencias de evaluación más bajas. La siguiente tabla ilustra cómo se controla la frecuencia de evaluación mediante intervalos más largos:

| Rangos de evaluación        | Frecuencia de evaluación  |
|---------------------------------|-----------------------|
| intervalo < 24 horas               | 1 minuto              |
| 24 horas <= intervalo < 48 horas   | 10 minutos            |
| intervalo >= 48 horas              | 30 minutos            |

La frecuencia de evaluación también puede configurarse para que el estado de alerta del monitor se compruebe diaria, semanal o mensualmente. En esta configuración, la frecuencia de evaluación ya no depende del intervalo de evaluación, sino del horario configurado.

Para obtener más información, consulta la guía sobre cómo [Personalizar las frecuencias de evaluación del monitor][4].

### Umbrales

Usa los umbrales para definir un valor numérico a partir del cual se activará una alerta. En función de la métrica que elijas, el editor muestra la unidad utilizada (`byte`, `kibibyte`, `gibibyte`, etc).

Datadog puede enviar dos tipos de notificaciones (alertas y avisos). Los monitores se recuperan automáticamente en función del umbral de alerta o de aviso que elijas, aunque también puedes configurar otras condiciones. Para obtener más información sobre los umbrales de recuperación, consulta [¿Qué son los umbrales de recuperación?][3]. Por ejemplo, si un monitor envía una alerta cuando la métrica supera `3` y no has definido ningún umbral de recuperación, el monitor se recuperará cuando el valor de la métrica vuelva a estar por debajo de `3`.

| Opción                                   | Descripción                    |
|------------------------------------------|--------------------------------|
| Alert&nbsp;threshold&nbsp;**(obligatorio)** | El valor que se utiliza para activar una notificación de alerta. |
| Warning&nbsp;threshold                   | El valor que se utiliza para activar una notificación de aviso. |
| Alert&nbsp;recovery&nbsp;threshold       | Un umbral opcional para indicar una condición adicional que envía una alerta cuando el monitor se recupera. |
| Warning&nbsp;recovery&nbsp;threshold     | Un umbral opcional para indicar una condición adicional que envía un aviso cuando el monitor se recupera. |

Si modificas un umbral, la vista previa del gráfico en el editor muestra un marcador indicando el punto de corte.

{{< img src="/monitors/create/preview_graph_thresholds.png" alt="Vista previa del gráfico de umbrales" style="width:100%;">}}

**Nota**: Cuando introduces valores decimales para los umbrales, si el valor es `<1`, añade un `0` antes del número. Por ejemplo, usa `0.5`, no `.5`.


[1]: /es/monitors/guide/as-count-in-monitor-evaluations/
[2]: https://docs.datadoghq.com/es/logs/log_configuration/indexes/#set-daily-quota
[3]: /es/monitors/guide/recovery-thresholds/
[4]: /es/monitors/guide/custom_schedules
[5]: /es/monitors/guide/monitor_aggregators/
{{% /tab %}}
{{% tab "Check alert" %}}

Una alerta de check hace un seguimiento de los estados consecutivos enviados por cada grupo de check y los compara con tus umbrales. Configura una alerta de check para:

1. Activar la alerta después de un número de fallos consecutivos: `<NUMBER>` 

   Cuando se ejecuta el check, envía un estado de `OK`, `WARN` o `CRITICAL`. Elige cuántas veces tiene que darse un estado `WARN` y `CRITICAL` para que se envíe una notificación. Por ejemplo, pongamos que se produce un error puntual en tu proceso y falla la conexión. Si tienes este valor establecido como `> 1`, el fallo se ignorará, pero si el error se da más veces, se activará el envío de una notificación.

    {{< img src="/monitors/create/check_thresholds_alert_warn.png" alt="Umbrales de avisos/alertas de check" style="width:90%;">}}

2. Resolver la alerta después de una cantidad consecutiva determinada de intentos sin errores: `<NUMBER>`

    Configura cuántas veces tiene que darse el estado `OK` para que se resuelva la alerta.

    {{< img src="/monitors/create/check_thresholds_recovery.png" alt="Umbrales de recuperación del check" style="width:90%;">}}

Consulta la documentación sobre los monitores de [check de proceso][1], [check de integración][2] y [check personalizado][3] para obtener más información sobre cómo configurar alertas de checks.



[1]: /es/monitors/types/process_check/
[2]: /es/monitors/types/integration/?tab=checkalert#integration-status
[3]: /es/monitors/types/custom_check/
{{% /tab %}}
{{< /tabs >}}

### Condiciones de alerta avanzadas

#### Sin datos

Las notificaciones en caso de que falten datos son útiles si se espera que una métrica siempre envíe datos en condiciones normales. Por ejemplo, si un host con el Agent instalado debe estar siempre disponible, la métrica `system.cpu.idle` no debería dejar de enviar datos.

En este caso, deberías activar el envío de notificaciones en caso de que dejen de recibirse esos datos. Las siguientes secciones te explican cómo proceder en cada caso particular.

**Nota**: El monitor debe poder evaluar los datos antes de enviar una alerta sobre la falta de datos. Por ejemplo, si creas un monitor para `service:abc` y los datos de ese `service` no se están enviando, el monitor no enviará las alertas.


{{< tabs >}}
{{% tab "Metric-based monitors" %}}

Si está Monitorización a métrica sobre un grupo de autoescalado de hosts que se detiene y se inicia automáticamente, la notificación para `no data` produce una gran cantidad de notificaciones. En este caso, no debería habilitar notificaciones para los datos que faltan. Esta opción no funciona a menos que se habilite en un momento en el que los datos hayan estado notificando durante un largo periodo.

| Opción                                                     | Descripción                                                                                                                                        | Notas        |
| ---------------------------------------------------------  | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| **No notificar** si faltan datos                       | No se envía notificación si faltan datos                                                                                                         | <u>Alerta simple</u>: el monitor omite las evaluaciones y permanece en verde hasta que vuelven datos que cambiarían el estado de OK. <br><u>Alerta múltiple</u>: si un grupo no comunica datos, el monitor omite las evaluaciones y eventualmente abandona el grupo. Durante este periodo, la barra de la página de resultados permanece verde. Cuando hay datos y los grupos empiezan a informar de nuevo, la barra verde muestra el estado OK y se rellena para que parezca que no ha habido interrupción.|
| **Notificar** si faltan datos durante más de **N** minutos. | Se te notifica si faltan datos. La notificación se produce cuando no se han recibido datos durante el intervalo configurado.| Datadog recomienda fijar el intervalo de datos faltantes en al menos dos veces el periodo de evaluación. |


{{% /tab %}}

{{% tab "Other monitor types" %}}

Si los datos faltan durante `N` minutos, selecciona una de estas opciones del menú desplegable:

{{< img src="/monitors/create/on_missing_data.png" alt="Sin opciones de datos" style="width:70%;">}}

- `Evaluate as zero` / `Show last known status`
- `Show NO DATA`
- `Show NO DATA and notify`
- `Show OK`.

El comportamiento seleccionado se aplicará cuando la consulta de un monitor no devuelva ningún dato. A diferencia de la opción `Do not notify`, el intervalo de ausencia de datos **no** se puede configurar.

| Opción                    | Estado y notificaciones del monitor                                             |
|---------------------------|---------------------------------------------------------------------------|
| `Evaluate as zero`        | Un resultado vacío se sustituye por cero y se compara con los umbrales de alerta o aviso. Por ejemplo, si el umbral de alerta se define como `> 10`, un cero no activará esa condición y el estado del monitor se configura como `OK`.   |
| `Show last known status`  | Se configura el último estado conocido de un grupo o un monitor.                        |
| `Show NO DATA`            | El estado del monitor se configura como `NO DATA`.                                       |
| `Show NO DATA and notify` | El estado del monitor se configura como `NO DATA` y se envía una notificación.        |
| `Show OK`                 | El monitor se resuelve y el estado se define como `OK`.                            |

Las opciones `Evaluate as zero` y `Show last known status` se muestran en función del tipo de consulta:

- **Evaluate as zero:** esta opción está disponible para monitores que utilizan consultas `Count` sin la función `default_zero()`.
- **Show last known status:** esta opción está disponible para monitores que usan consultas distintas de `Count`, por ejemplo `Gauge`, `Rate` y `Distribution`, así como consultas `Count` con `default_zero()`.

{{% /tab %}}
{{< /tabs >}}

#### Resolución automática

`[Never]`, `After 1 hour`, `After 2 hours` y así sucesivamente. resuelve automáticamente este evento a partir de un estado activado.

La resolución automática se aplica cuando se dejan de enviar datos. Los monitores no se resuelven automáticamente si tienen un estado ALERT o WARN y los datos siguen enviándose. En este caso, puedes utilizar la función de [renotificación][2] para que el equipo sepa que hay algún problema sin resolver.

En el caso de las métricas que envían datos de forma periódica, tiene sentido que las alertas se resuelvan automáticamente una vez transcurrido un tiempo determinado. Por ejemplo, si tienes una métrica de contador que solo envía datos cuando se registra un log de un error, la alerta no se resuelve nunca porque la métrica nunca envía `0` errores. En este caso, puedes configurarla para que se resuelva después de un tiempo determinado de inactividad en la métrica. **Nota**: Si un monitor se resuelve de forma automática y el valor de la consulta no está dentro del umbral de recuperación en la siguiente evaluación, activará una nueva alerta.

En la mayoría de los casos esta configuración no es útil porque sólo se desea que una alerta se resuelva después de que se haya solucionado realmente. Así que, en general, tiene sentido dejarlo como `[Never]` para que las alertas sólo se resuelvan cuando métrica esté por encima o por debajo del umbral establecido.

#### Duración de retención de un grupo

Puede eliminar el grupo del estado Monitor después de `N` horas de falta de datos. El plazo puede ser como mínimo de 1 hora y como máximo de 72 horas. Para la alerta múltiple monitors, seleccione **Eliminar el grupo no informante después de `N (length of time)`**.

{{< img src="/monitors/create/group_retention_time.png" alt="Opción de duración de retención de un grupo" style="width:70%;">}}

Igual que la opción de [resolución automática][3], la opción de retención del grupo se aplica cuando ya no se envían datos. Controla cuánto tiempo conserva el grupo el estado del monitor una vez que los datos dejan de enviarse. Por omisión, un grupo mantiene el estado durante 24 horas y luego se excluye. La hora de inicio de la retención del grupo y la opción de resolución automática son **idénticas** siempre y cuando la consulta del monitor no devuelva ningún dato.

El uso de la duración de retención de un grupo puede resultar útil cuando: 

- Quieres excluir un grupo justo cuando deje de enviar datos o poco después.
- Quieres que el grupo conserve el estado del monitor todo el tiempo que tardes en solucionar los problemas.

**Nota**: Para configurar el tiempo de retención de un grupo, debes utilizar un monitor de alertas múltiples compatible con la opción [`On missing data`][4], por ejemplo, monitores de análisis de trazas (traces) APM, logs de auditoría, pipelines de CI, seguimiento de errores, logs y RUM.

#### Retraso para los nuevos grupos

Retrasa el comienzo de la evaluación de los nuevos grupos durante `N` segundos.

Este tiempo corresponde con la duración (en segundos) después de la que se debe empezar a enviar las alertas. Permite que los nuevos grupos se carguen y se inicien las aplicaciones. Su valor debe ser un número entero positivo.

Por ejemplo, si utilizas una arquitectura contenorizada, el retraso para los nuevos grupos evita que los grupos del monitor que pertenezcan a contenedores se activen debido a un alto uso de los recursos o a una alta latencia cuando se crea un nuevo contenedor. El retraso se aplica a todos los grupos nuevos (con una antigüedad inferior a 24 horas) y de forma predeterminada es de `60` segundos.

La opción está disponible en la modalidad de alerta múltiple.

#### Retraso de la evaluación

<div class="alert alert-info"> Datadog recomienda un retraso de 15 minutos en el caso de métricas en la nube que reponen proveedores de servicio. Además, si utilizas una fórmula de división, un retraso de 60 segundos resulta útil para garantizar que el monitor evalúa valores completos. Consulta los tiempos de retraso estimados en la página <a href="https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/
">Tiempo de respuesta de las métricas en la nube</a>.</div>

Retraso de la evaluación `N` segundos.

El tiempo (en segundos) que se retrasa la evaluación. Debe ser un número entero positivo. De esta forma, si el retraso se configura en 900 segundos (15 minutos), la evaluación se realiza durante los últimos `5 minutes`. Si se configura la evaluación de los datos para las 7:00, el monitor la hará de 6:40 a 6:45. El retraso máximo que puedes configurar es de 86 400 segundos (24 horas).

## Configurar notificaciones y automatizaciones

Configura tus mensajes de notificación para que incluyan la información que más te interesa. Especifica a qué equipos se van a enviar estas alertas así como para qué atributos se deben enviar.

### Mensaje

Usa esta sección para configurar las notificaciones que recibe tu equipo y cómo enviarlas:

  - [Configura tus notificaciones con las variables de plantilla][5]
  - [Envía notificaciones a tu equipo por correo electrónico, Slack o PagerDuty][6]

Para obtener más información sobre las opciones de configuración para los mensajes de notificación, consulta [Notificaciones de alerta][7].

### Añadir metadatos

<div class="alert alert-info">Monitor etiquetas (tags) son independientes de etiquetas (tags) enviados por Agent o integraciones. Consulte la <a href="/monitors/manage/">documentación de gestionar monitores</a>.</div>

1. Utiliza el menú desplegable **Tags** (Etiquetas) para asociar las [etiquetas][9] a tu monitor.
1. Usa el desplegable **Teams** (Equipos) para asociar los [equipos][10] a tu monitor.
1. Selecciona una **Priority** (Prioridad).

### Establecer la agregación de alertas

Las alertas se clasifican de forma automática en función de lo que selecciones en el paso `group by` al definir tu consulta. Si la consulta no pertenece a ninguna clasificación, de forma predeterminada se clasifica como `Simple Alert`. Si la consulta pertenece a cualquier dimensión, la clasificación cambia a `Multi Alert`.

{{< img src="/monitors/create/notification-aggregation.png" alt="Opciones de configuración para agrupar las notificaciones del monitor" style="width:100%;">}}

#### Alerta única

`Simple Alert` activa una notificación agregando todas las fuentes de información. Recibirás **una alerta** cuando el valor agregado cumpla las condiciones establecidas. Por ejemplo, puedes configurar un monitor para que te notifique si el uso medio de la CPU de todos los servidores supera un determinado umbral. Si se alcanza ese umbral, recibirás una única notificación, independientemente del número de servidores individuales que hayan alcanzado el umbral. Esto puede ser útil para la monitorización de tendencias o comportamientos generales del sistema.


{{< img src="/monitors/create/simple-alert.png" alt="Diagrama que ilustra cómo se envían las notificaciones del monitor en el modo de alerta simple" style="width:90%;">}}

#### Alerta múltiple

Un monitor `Multi Alert` activa notificaciones individuales para cada entidad de un monitor que alcance el umbral de alerta.

{{< img src="/monitors/create/multi-alert.png" alt="Diagrama que ilustra cómo se envían las notificaciones de monitor en el modo de alerta múltiple" style="width:90%;">}}

Por ejemplo, al configurar un monitor para que te notifique si la latencia P99, agregada por servicio, supera un determinado umbral, recibirías una **alerta** independiente por cada servicio individual cuya latencia P99 superase el umbral de alerta. Esto puede ser útil para identificar y tratar casos específicos de problemas del sistema o de la aplicación. Te permite rastrear problemas en un nivel más detallado.

Cuando Monitorización de un gran grupo de entidades, las alertas múltiples pueden dar lugar a ruidos monitors. Para mitigar esto, personalice qué dimensiones activan las alertas. Esto reduce el ruido y le permite centrarse en las alertas que más importan. Por ejemplo, usted está Monitorización del uso medio de CPU de todos sus hosts. Si agrupa su consulta por `service` y `host` pero sólo desea que se envíen alertas una vez por cada atributo `service` que alcance el umbral, elimine el atributo `host` de sus opciones de multialerta y reduzca el número de notificaciones que se envían.

{{< img src="/monitors/create/multi-alert-aggregated.png" alt="Diagram of how notificaciones are sent when set to specific dimensions in multi alerts" style="width:90%;">}}

Al agregar notificaciones en el modo `Multi Alert`, las dimensiones que no se agregan pasan a ser `Sub Groups` en la interfaz de usuario.

**Nota**: Si su métrica sólo está informando por `host` sin `service` etiquetar , no es detectado por el Monitor. métricas con ambos `host` y `service` etiquetas (tags) son detectados por el Monitor.

Si configuras etiquetas o dimensiones en tu consulta, los valores están disponibles para cada grupo que se evalúa en la alerta múltiple para que las notificaciones se completen con un contexto útil. Consulta las [variables de atributos y etiquetas][8] para saber cómo hacer referencia a los valores de las etiquetas en el mensaje de la notificación.

| Agrupar por                       | Modalidad de alerta única | Modalidad de alerta múltiple |
|-------------------------------------|------------------------|-----------------------|
| _(todo)_                      | Un único grupo activa una única notificación | N/A |
| 1&nbsp;or&nbsp;more&nbsp;dimensions | Se envía una notificación si uno o más grupos cumplen las condiciones de la alerta | Se envía una notificación por cada grupo que cumpla las condiciones de alerta |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types
[2]: /es/monitors/notify/#renotify
[3]: /es/monitors/configuration/?tab=thresholdalert#auto-resolve
[4]: /es/monitors/configuration/?tabs=othermonitortypes#no-data
[5]: /es/monitors/notify/variables/
[6]: /es/monitors/notify/#configure-notifications-and-automations
[7]: /es/monitors/notify/#say-whats-happening
[8]: /es/monitors/notify/variables/?tab=is_alert#attribute-and-tag-variables
[9]: /es/getting_started/tagging/
[10]: /es/account_management/teams/