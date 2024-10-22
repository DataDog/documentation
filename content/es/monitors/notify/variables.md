---
description: Utiliza variables para personalizar tus notificaciones de monitor
further_reading:
- link: /monitors/guide/template-variable-evaluation/
  tag: Guía
  text: Realiza operaciones aritméticas y funciones con evaluaciones de variables
    de plantilla
- link: /monitors/
  tag: Documentación
  text: Crear monitores
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de monitor
- link: /monitors/manage/
  tag: Documentación
  text: Gestionar los monitores
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: Centro de aprendizaje
  text: Realiza un curso para personalizar las notificaciones del monitor de alertas
title: Variables
---

Utiliza variables en los mensajes de notificación para mostrar mensajes condicionales y dirigir la notificación a diferentes equipos utilizando [variables condicionales](#conditional-variables), o para enriquecer tu contenido utilizando [variables de atributo y etiqueta](#attribute-and-tag-variables) y [variables de plantilla](#template-variables).

## Variables condicionales

Las variables condicionales utilizan la lógica de `if-else` para mostrar un mensaje diferente dependiendo del estado del monitor y de los detalles de cómo se activó. Estas variables pueden utilizarse dentro del asunto o del cuerpo del mensaje de notificación.

Están disponibles las siguientes variables condicionales:

| Variable condicional       | El texto se muestra si                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{#is_alert}}`            | El monitor alerta                                                 |
| `{{^is_alert}}`            | El monitor no alerta                                         |
| `{{#is_match}}`            | El contexto coincide con la subcadena proporcionada                         |
| `{{^is_match}}`            | El contexto no coincide con la subcadena proporcionada                  |
| `{{#is_exact_match}}`      | El contexto coincide exactamente con la cadena proporcionada                    |
| `{{^is_exact_match}}`      | El contexto no coincide exactamente con la cadena proporcionada             |
| `{{#is_no_data}}`          | El monitor se activa si faltan datos                          |
| `{{^is_no_data}}`          | El monitor no se activa si faltan datos                      |
| `{{#is_warning}}`          | El monitor advierte                                                  |
| `{{^is_warning}}`          | El monitor no advierte                                          |
| `{{#is_recovery}}`         | El monitor se recupera de `ALERT`, `WARNING`, `UNKNOWN`, o `NO DATA`         |
| `{{^is_recovery}}`         | El monitor no se recupera de `ALERT`, `WARNING`, `UNKNOWN`, o `NO DATA` |
| `{{#is_warning_recovery}}` | El monitor se recupera de `WARNING` a `OK`                        |
| `{{^is_warning_recovery}}` | El monitor no se recupera de `WARNING` a `OK`                |
| `{{#is_alert_recovery}}`   | El monitor se recupera de `ALERT` a `OK`                          |
| `{{^is_alert_recovery}}`   | El monitor no se recupera de ALERT a OK                   |
| `{{#is_alert_to_warning}}` | El monitor pasa de `ALERT` a `WARNING`                  |
| `{{^is_alert_to_warning}}` | El monitor no pasa de `ALERT` a `WARNING`          |
| `{{#is_no_data_recovery}}` | El monitor se recupera de `NO DATA`                                |
| `{{^is_no_data_recovery}}` | El monitor no se recupera de `NO DATA`                        |
| `{{#is_priority 'value'}}` | El monitor tiene prioridad `value`. El valor oscila entre `P1` y `P5`   |
| `{{#is_unknown}}`          | El monitor está en estado unknown                                |
| `{{^is_unknown}}`          | El monitor no está en estado unknown                            |
| `{{#is_renotify}}`         | El monitor hace renotificación                                         |
| `{{^is_renotify}}`         | El monitor no hace renotificación                                    |

### Ejemplos

La variable condicional debe tener un par de apertura y cierre con el texto y **@-notifications** en medio.

{{< tabs >}}
{{% tab "is_alert" %}}

Para enviar un mensaje e3 notificación cuando un monitor alerta, utiliza el formato:

```text
{{#is_alert}}
  <ALERT_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_alert}}
```

{{% /tab %}}
{{% tab "is_warning" %}}

Para enviar un mensaje de notificación cuando un monitor advierte, utiliza el formato:

```text
{{#is_warning}}
  <WARNING_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_warning}}
```

{{% /tab %}}
{{% tab "is_recovery" %}}

Para enviar un mensaje de notificación cuando se recupere un monitor, utiliza el formato:

```text
{{#is_recovery}}
  <RECOVERY_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_recovery}}
```

{{% /tab %}}
{{% tab "is_match" %}}

Busca una subcadena en una [variable de etiqueta](#attribute-and-tag-variables) con el formato:

```text
{{#is_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  Esto aparece si <COMPARISON_STRING> se incluye en <TAG_VARIABLE>.
{{/is_match}}
```

Para notificar a tu equipo de base de datos si un host desencadenante tiene la etiqueta `role:db_cassandra` o `role:db_postgres`, utiliza lo siguiente:

```text
{{#is_match "role.name" "db"}}
  Esto aparece si el host que activa la alerta contiene `db`
  en el nombre de rol. @db-team@company.com
{{/is_match}}
```

La condición `is_match` también permite unir varias cadenas:

```text
{{#is_match "role.name" "db" "database"}}
  Esto aparece si el host que activa la alerta contiene `db` o `database`
  en el nombre de rol. @db-team@company.com
{{/is_match}}
```

Para enviar una notificación diferente si la etiqueta no contiene `db`, utiliza la negación de la condición como se indica a continuación:

```text
{{^is_match "role.name" "db"}}
  Esto aparece si la etiqueta del rol no contiene `db`.
  @slack-example
{{/is_match}}
```

O utiliza el parámetro `{{else}}` del primer ejemplo:

```text
{{#is_match "role.name" "db"}}
  Esto aparece si el host que activa la alerta contiene `db`
  en el nombre de rol. @db-team@company.com
{{else}}
  Esto aparece si la etiqueta del rol no contiene `db`.
  @slack-example
{{/is_match}}
```

**Nota**: Para comprobar si `<TAG_VARIABLE>` **NO** está vacía, utiliza una cadena vacía para `<COMPARISON_STRING>`.

{{% /tab %}}
{{% tab "is_exact_match" %}}

Busca una cadena exacta en una [variable de etiqueta](#attribute-and-tag-variables) con el formato:

```text
{{#is_exact_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  Esto aparece si <COMPARISON_STRING> es exactamente <TAG_VARIABLE>.
{{/is_exact_match}}
```

Para notificar a tu equipo de desarrollo si un host desencadenante tiene el nombre `production`, utiliza lo siguiente:

```text
{{#is_exact_match "host.name" "production"}}
  Esto aparece si el host que activó la alerta se llama exactamente
producción. @dev-team@company.com
{{/is_exact_match}}
```

La condición `is_exact_match` también permite buscar varias cadenas:

```text
{{#is_exact_match "host.name" "production" "staging"}}
  Esto aparece si el host que activó la alerta se llama exactamente
  producción o staging. @dev-team@company.com
{{/is_exact_match}}
```

La variable condicional `is_exact_match` también admite [variables de plantilla `{{value}}`](#template-variables):

```text
{{#is_exact_match "value" "<VALUE>"}}
  Esto aparece si el valor que infringió el umbral del monitor es exactamente <VALUE>.
{{/is_exact_match}}
```

Para notificar a tu equipo de desarrollo si el valor que ha superado el umbral de tu monitor es 5, utiliza lo siguiente:

```text
{{#is_exact_match "value" "5"}}
  Esto aparece si el valor que ha superado el umbral del monitor es 5. @dev-team@company.com
{{/is_exact_match}}
```

{{% /tab %}}
{{% tab "is_renotify" %}}

Para enviar un mensaje de escalada a un destino diferente solo para el entorno `production`:

```text
{{#is_renotify}}
{{#is_match "env" "production"}}
  Este es un mensaje de escalada enviado a @dev-team@company.com
{{/is_match}}
{{/is_renotify}}
```

Para enviar un mensaje de escalada diferente que no contenga los detalles del mensaje original, utiliza una combinación de bloques `{{^is_renotify}}` y `{{#is_renotify}}`:

```text
{{^is_renotify}}
Este monitor alerta y envía un primer mensaje a @dev-team@company.com

Para resolver este monitor sigue los pasos:
1. Go there
2. Do this
{{/is_renotify}}

Esta parte es genérica y se envía para el primer desencadenante y el mensaje de escalada.

{{#is_renotify}}
  Este es el mensaje de escalada @dev-team@company.com
{{/is_renotify}}

```

En la renotificación del monitor, los usuarios recibirán el siguiente mensaje de escalada:

```
Esta parte es genérica y se envía tanto para el primer desencadenante como para el mensaje de escalada.

Este es el mensaje de escalada @dev-team@company.com
```

{{% /tab %}}
{{< /tabs >}}

Si configuras un bloque condicional para una transición de estado en condiciones `alert` o `warning` con un identificador **@-notifications**, se recomienda configurar una condición `recovery` correspondiente para que se envíe una notificación de recuperación al identificador.

**Nota**: Cualquier texto o identificador de notificación colocado **fuera** de las variables condicionales configuradas se invoca con cada transición de estado del monitor. Cualquier texto o identificador de notificación colocado **dentro** de las variables condicionales configuradas solo se invoca si la transición de estado del monitor coincide con su condición.

## Variables de atributos y etiquetas

Utiliza variables de atributo y etiqueta para mostrar mensajes de alerta personalizados, informativos y específicos para ayudar a comprender la naturaleza de la alerta.

**Nota**: Si el monitor está configurado para recuperarse en condiciones sin datos (por ejemplo, cuando no hay eventos que coincidan con la consulta), el mensaje de recuperación no contiene datos. Para mantener la información en el mensaje de recuperación, agrupa por etiquetas adicionales, a las que se puede acceder mediante `{{tag.name}}`.

### Variables de alerta múltiple

Configura variables de alertas múltiples en [monitores de alerta múltiple][1] en función de la dimensión seleccionada en el cuadro de grupo de alertas múltiples. Enriquecer la notificación para incluir dinámicamente el valor asociado al grupo por dimensión en cada alerta.

{{< tabs >}}
{{% tab "Agrupar por etiqueta" %}}

Si una métrica está etiquetada con cualquier etiqueta siguiendo la sintaxis `key:value` y la consulta del monitor está agrupada por esta etiqueta, utiliza la variable:

```text
{{ key.name }}
```

En cada alerta se muestra el `value` asociado a la notificación `key`. Si un grupo está etiquetado con varios `values` asociados a la misma `key`, el mensaje de alerta muestra una cadena separada por comas de todos los valores, en orden lexicográfico.

**Ejemplo**: Si tu monitor activa una alerta para cada `env`, entonces la variable `{{env.name}}` está disponible en tu mensaje de notificación.

{{< img src="monitors/notifications/multi_alert_variable.png" alt="Sintaxis de variable de alerta múltiple" style="width:90%;">}}

#### Clave de etiqueta con punto

Si tu clave de etiqueta tiene un punto en ella, incluye corchetes alrededor de la clave completa cuando se utiliza una variable de etiqueta.
Por ejemplo, si tu etiqueta es `dot.key.test:five` y tu monitor está agrupado por `dot.key.test`, utiliza:

```text
{{[dot.key.test].name}}
```

Si la etiqueta está en un evento y estás utilizando un monitor de evento, utiliza:

```text
{{ event.tags.[dot.key.test] }}
```

{{% /tab %}}

{{% tab "Agrupar por faceta" %}}

Monitores de logs, monitores de Trace Analytics, monitores RUM y monitores de eventos pueden usar facetas como variables si el monitor está agrupado por facetas. Si un monitor de log está agrupado por `@facet_key`, utiliza la variable:

```text
{{ @facet_key.name }}
```

**Ejemplo**: Para incluir información específica de un grupo en un monitor de log de alerta múltiple agrupado por `@machine_id`:

```text
Esta alerta se activó en {{ @machine_id.name }}
```

Si tu faceta tiene puntos, utiliza corchetes alrededor de la faceta, por ejemplo:

```text
{{ [@network.client.ip].name }}
```

{{% /tab %}}
{{< /tabs >}}

#### Personalización de las notificaciones en función del grupo

Cuando tu consulta está agrupada por dimensiones específicas, puedes enriquecer las notificaciones con metadatos dinámicos asociados con el grupo.

##### Grupo de consulta por host

Si tu monitor activa una alerta para cada `host`, entonces las variables de etiqueta `{{host.name}}` y `{{host.ip}}` están disponibles así como cualquier etiqueta de host que esté disponible en este host. Para ver una lista de las variables de etiqueta según tu selección de etiquetas, haz clic en **Use message template variables** en la sección **Say what's happening**.

Variables de metadatos específicas de host:

- Versión del Agent: `{{host.metadata_agent_version}}`
- Máquina: `{{host.metadata_machine}}`
- Plataforma: `{{host.metadata_platform}}`
- Procesador: `{{host.metadata_processor}}`

##### Consulta agrupada por kube_namespace y kube_cluster_name

Si tu monitor activa una alerta para cada `kube_namespace` y `kube_cluster_name`, entonces puedes acceder a cualquier atributo del espacio de nombres. 

Variables de metadatos del espacio de nombres:

- Nombre del clúster: `{{kube_namespace.cluster_name}}`
- Nombre del espacio de nombres: `{{kube_namespace.display_name}}`
- Estado del espacio de nombres: `{{kube_namespace.status}}`
- Etiquetas del espacio de nombres: `{{kube_namespace.labels}}`

La siguiente tabla contiene todos los atributos disponibles:

| Sintaxis de la variable   | Atributos de primer nivel |
|-------------------|------------------------|
| `{{kube_namespace.key}}`     | `k8s_namespace_key`, `tags`, `annotations`, `cluster_id`, `cluster_name`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `finalizers`, `first_seen_at`, `group_size`, `labels`, `name`, `namespace`, `status`, `uid`|

##### Consulta agrupada por pod_name, kube_namespace y kube_cluster_name

Si tu monitor activa una alerta para cada `pod_name`,`kube_namespace` y `kube_cluster_name`, entonces puedes acceder a cualquier atributo del pod.

Variables de metadatos del pod:
- Nombre del clúster: `{{pod_name.cluster_name}}`
- Nombre del pod: `{{pod_name.name}}`
- Fase del pod: `{{pod_name.phase}}`

La siguiente tabla contiene todos los atributos disponibles:

| Sintaxis de la variable   | Atributos de primer nivel |
|-------------------|------------------------|
| `{{pod_name.key}}`     | `k8s_pod_key`, `tags`, `annotations`, `cluster_id`, `cluster_name`, `conditions`, `container_statuses`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `finalizers`, `first_seen_at`, `host_id`, `host_key`, `hostname`, `init_container_statuses`, `ip`, `labels`, `name`, `namespace`, `node_name`, `nominated_node_name`, `phase`, `pod_scheduled_timestamp`, `priority_class_name`, `qosclass`, `resource_requirements`, `uid`|



### Unión de variables de atributo/etiqueta

_Disponible para [monitores de log][2], [monitores de Trace Analytics][3] (APM), [monitores RUM][4], [monitores CI][5] y [monitores de Database Monitoring][6]_.

Para incluir **cualquier** atributo o etiqueta de un log, un tramo de traza, un evento RUM, un CI Pipeline, o un evento de CI Test que coincida con la consulta del monitor, utiliza las siguientes variables:

| Tipo de monitor    | Sintaxis de la variable                                  |
|-----------------|--------------------------------------------------|
| Log             | `{{log.attributes.key}}` o `{{log.tags.key}}`   |
| Trace Analytics | `{{span.attributes.key}}` o `{{span.tags.key}}` |
| Error Tracking  | Trazas: `{{span.attributes.[error.message]}}`<br>Eventos RUM: `{{rum.attributes.[error.message]}}`<br> Logs: `{{log.attributes.[error.message]}}`             |
| RUM             | `{{rum.attributes.key}}` o `{{rum.tags.key}}`   |
| Audit Trail     | `{{audit.attributes.key}}` o `{{audit.message}}`    |
| CI Pipeline     | `{{cipipeline.attributes.key}}`                  |
| CI Test         | `{{citest.attributes.key}}`                      |
| Database Monitoring | `{{databasemonitoring.attributes.key}}`      |

Para cualquier par `key:value`, la variable `{{log.tags.key}}` se convierte en `value` en el mensaje de alerta.

**Ejemplo**: Si un monitor de log está agrupado por `@http.status_code`, para incluir el mensaje de error o etiquetas de infraestructura en el mensaje de notificación, utiliza las variables:

```text
{{ log.attributes.[error.message] }}
{{ log.tags.env }}
...
```

{{< img src="monitors/notifications/tag_attribute_variables.png" alt="Unir la sintaxis de variable de atributo" style="width:90%;">}}

El mensaje muestra el atributo `error.message` de un log elegido que coincide con la consulta, **si el atributo existe**.

<div class="alert alert-info"><strong>Nota</strong>: Si el evento seleccionado no contiene el atributo o la etiqueta de clave, la variable aparece vacía en el mensaje de notificación. Para evitar que se pierdan notificaciones, no utilices estas variables para enrutar notificaciones con identificadores <code>{{#is_match}}</code>.</div>

Si un monitor utiliza formulas y funciones en sus consultas, los valores se resuelven con eventos que se extraen de la primera consulta.

#### Atributos reservados

Los eventos de logs, Event Management, tramos, RUM, CI Pipeline y CI Test tienen atributos reservados genéricos, que puedes usar en variables con la siguiente sintaxis:

| Tipo de monitor    | Sintaxis de la variable   | Atributos de primer nivel |
|-----------------|-------------------|------------------------|
| Log             | `{{log.key}}`     | `message`, `service`, `status`, `source`, `span_id`, `timestamp`, `trace_id`, `link`, `host` |
| Trace Analytics | `{{span.key}}`    | `env`, `operation_name`, `resource_name`, `service`, `status`, `span_id`, `timestamp`, `trace_id`, `type`, `link` |
| RUM             | `{{rum.key}}`     | `service`, `status`, `timestamp`, `link` |
| Evento             | `{{event.key}}`     | `attributes`, `host.name`, `id`, `link`, `title`, `text`, `tags` |
| CI Pipeline             | `{{cipipeline.key}}`     | `service`, `env`, `resource_name`, `ci_level`, `trace_id`, `span_id`, `pipeline_fingerprint`, `operation_name`, `ci_partial_array`, `status`, `timestamp`, `link` |
| CI Test             | `{{citest.key}}`     | `service`, `env`, `resource_name`, `trace_id`, `span_id`, `operation_name`, `status`, `timestamp`, `link` |

Si el evento coincidente no contiene el atributo en su definición, la variable se muestra vacía.

#### Enlace de explorador

Utiliza `{{log.link}}`, `{{span.link}}`, `{{rum.link}}` y `{{issue.link}}` para fortalecer la notificación con un enlace a Log Explorer, Trace Explorer, RUM Explorer o Error Tracking, en el contexto de eventos que coincida con la consulta.

### Comprobar variables de monitor

Para comprobar las variables de monitor (check personalizado y check de integración), la variable `{{check_message}}` está disponible y muestra el mensaje especificado en el check personalizado o el check de integración.

### Variables compuestas de monitor

Los monitores compuestos pueden acceder al valor y al estado asociados a los submonitores en el momento en que se activa la alerta.

Por ejemplo, si tu monitor compuesto tiene el submonitor `a`, puedes incluir el valor de `a` con:

```text
{{ a.value }}
```

Para recuperar el estado del submonitor `a`, utiliza:

```text
{{ a.status }}
```

Los valores posibles para el estado son: `OK`, `Alert`, `Warn` y `No Data`.

Los monitores compuestos también admiten variables de etiqueta del mismo modo que sus monitores subyacentes. Siguen el mismo formato que otros monitores, siempre que los monitores subyacentes estén agrupados por la misma etiqueta o faceta.

Por ejemplo, supón que tu monitor compuesto tiene un submonitor `a` , que es un monitor de logs. Puedes incluir el valor de cualquier etiqueta o faceta de `a` con:

```text
{{ a.log.message }} o {{ a.log.my_facet }}
```

### Fuga de caracteres

El contenido de las variables se fuga por defecto. Para evitar que se fuge contenido como JSON o código, utiliza llaves triples en lugar de dobles, por ejemplo: `{{{event.text}}}`.

## Variables de plantilla

Utiliza variables de plantilla para personalizar tus notificaciones de monitor. Las variables incorporadas son:

| Variable                             | Descripción                                                                   |
|-----------------------------------   |-------------------------------------------------------------------------------|
| `{{value}}`                          | El valor que infringió la alerta para los monitores de consulta basados en métricas.            |
| `{{threshold}}`                      | El valor del umbral de alerta establecido en las condiciones de alerta del monitor.       |
| `{{warn_threshold}}`                 | Valor del umbral de advertencia establecido en las condiciones de alerta del monitor.     |
| `{{alert_recovery_threshold}}`       | El valor que recuperó el monitor de su estado `ALERT`.                  |
| `{{warn_recovery_threshold}}`        | El valor que recuperó el monitor de su estado `WARN`.                   |
| `{{ok_threshold}}`                   | El valor que recuperó el monitor del check de servicio.                           |
| `{{comparator}}`                     | El valor relacional establecido en las condiciones de alerta del monitor.                   |
| `{{first_triggered_at}}`<br>*Consulta la sección siguiente*         | La fecha y hora UTC en que se activó el monitor por primera vez.                       |
| `{{first_triggered_at_epoch}}`<br>*Consulta la sección siguiente*   | La fecha y hora UTC en que el monitor se activó por primera vez en milisegundos epoch. |
| `{{last_triggered_at}}`<br>*Consulta la sección siguiente*          | La fecha y hora UTC en que se activó el monitor por última vez.                        |
| `{{last_triggered_at_epoch}}`<br>*Consulta la sección siguiente*    | La fecha y hora UTC en que el monitor se activó por última vez en milisegundos epoch.  |
| `{{triggered_duration_sec}}`         | El número de segundos que el monitor ha estado en estado activado.              |

### Variables activadas

Las variables de plantilla de monitor `{{first_triggered_at}}`, `{{first_triggered_at_epoch}}`, `{{last_triggered_at}}` y `{{last_triggered_at_epoch}}` reflejan los valores cuando un monitor cambia de estado, **NO** cuando se produce un nuevo evento de monitor. La renotificación de eventos muestran la misma variable de plantilla si el estado del monitor no ha cambiado. Utiliza `{{triggered_duration_sec}}` para mostrar la duración en el momento del evento del monitor.

 `{{first_triggered_at}}` se establece cuando el grupo de monitor pasa de `OK` a un estado distinto de `OK` o cuando aparece un nuevo grupo en un estado distinto de `OK`. `{{last_triggered_at}}` se establece cuando el grupo de monitor pasa a un estado distinto de `OK` independientemente de su estado anterior (incluido `WARN` → `ALERT`, `ALERT` → `WARN`). Además, `{{last_triggered_at}}` se establece cuando un nuevo grupo aparece en un estado distinto a `OK`. La diferencia es que `{{last_triggered_at}}` es independiente de su estado anterior.

 {{< img src="monitors/notifications/triggered_variables.png" alt="Muestra cuatro transiciones con marcas temporales A: 1419 OK a WARN, B: 1427 WARN a ALERT, C: 1445 ALERT a NO DATA, D: 1449 NO DATA a OK" style="width:90%;">}}

**Ejemplo**: Cuando el monitor pasa de `OK` → `WARN`, los valores de `{{first_triggered_at}}` y `{{last_triggered_at}}` tienen ambos la marca temporal A. La tabla siguiente muestra los valores hasta que el monitor se recupera.

| Transición         | first_triggered_at     | last_triggered_at      | triggered_duration_sec           |
|------------------  |--------------------------------  |--------------------------------  |--------------------------------  |
| `OK` → `WARN`      | A                                | A                                | 0                                |
| `WARN` → `ALERT`   | A                                | B                                | B - A                            |
| `ALERT` → `NO DATA`| A                                | C                                | C - A                            |
| `NO DATA` → `OK`   | A                                | C                                | D - A                            |

### Evaluación

Las variables de plantilla que devuelven valores numéricos admiten operaciones y funciones, que permiten realizar operaciones matemáticas o cambios de formato en el valor. Para más detalles, consulta [Evaluación de variables de plantilla][7].

### Hora local

Utiliza la función `local_time` para añadir otra fecha en tu notificación en la zona horaria de elección. Esta función transforma una fecha en su hora local: `{{local_time 'time_variable' 'timezone'}}`.
Por ejemplo, para añadir la última hora activada del monitor en la zona horaria de Tokio en tu notificación, incluye lo siguiente en el mensaje de notificación:

```
{{local_time 'last_triggered_at' 'Asia/Tokyo'}}
```

El resultado se muestra en el formato ISO 8601: `yyyy-MM-dd HH:mm:ss±HH:mm`, por ejemplo `2021-05-31 23:43:27+09:00`.
Consulta la [lista de zonas horarias de la base de datos tz][8], en particular la columna de nombre de la base de datos TZ, para ver la lista de valores de zonas horarias disponibles.

## Avanzado

### Identificadores dinámicos

Utiliza [variables de etiqueta](#attribute-and-tag-variables) para crear dinámicamente identificadores de notificación y notificaciones de ruta al equipo o servicio correcto basado en el tipo de problema detectado por tu monitor.

**Ejemplo**: Si tu monitor consulta una métrica y la agrupa por una etiqueta de `service`, puedes hacer que tus notificaciones se enruten a diferentes canales de Slack según el servicio que falle:

```text
@slack-{{service.name}} Hay un problema en curso con {{service.name}}.
```

Si tu monitor empieza a fallar en el grupo `service:ad-server`, la notificación se envía al canal de Slack `#ad-server` con el siguiente contenido:

```text
@slack-ad-server Hay un problema en curso con ad-server.
```

Al crear identificadores dinámicos con atributos que no siempre están presentes, pueden surgir problemas con la entrega de notificaciones. Si falta un atributo, la variable se muestra vacía en el mensaje de notificación, lo que genera un identificador no válido.

Para evitar notificaciones perdidas al usar identificadores dinámicos con estas variables, asegúrate de agregar un identificador alternativo:

```text
{{#is_match "kube_namespace.owner" ""}}
  @slack-example
{{/is_match}}
```


### Enlaces dinámicos

Utiliza [variables de etiqueta](#attribute-and-tag-variables) para permitir la creación de URL dinámicas que enlacen a tu equipo con un recurso apropiado. Por ejemplo, puedes proporcionar enlaces a páginas dentro de Datadog como dashboards, mapa de host y monitores.

{{< tabs >}}
{{% tab "Dashboards" %}}

Utiliza la [variable de etiqueta](#attribute-and-tag-variables) `{{host.name}}` para proporcionar un enlace a un dashboard de sistema:

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

Utiliza la [variable de etiqueta](#attribute-and-tag-variables) `{{host.name}}` y `<INTEGRATION_NAME>` para proporcionar un enlace a un dashboard de integración:

```text
https://app.datadoghq.com/dash/integration/<INTEGRATION_NAME>?tpl_var_scope=host:{{host.name}}
```

Utiliza la [variable de plantilla] `{{last_triggered_at_epoch}}` así como `<DASHBOARD_ID>` y  `<DASHBOARD_NAME>`para vincular a dashboards con rangos temporales relativos desde el momento de la alerta:

```text
https://app.datadoghq.com/dashboard/<DASHBOARD_ID>/<DASHBOARD_NAME>?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

{{% /tab %}}
{{% tab "Mapa de host" %}}

Utiliza una [variable de etiqueta](#attribute-and-tag-variables) como `{{service.name}}` para proporcionar un enlace al mapa de host:

```text
https://app.datadoghq.com/infrastructure/map?filter=service:{{service.name}}
```

El enlace del mapa de host se puede personalizar con parámetros adicionales. Los más comunes son:

| Parámetro | Definido con               | Determina                           |
|-----------|----------------------------|--------------------------------------|
| `fillby`  | `fillby=avg:<METRIC_NAME>` | El color de relleno de los hexágonos de host. |
| `groupby` | `groupby=<TAG_KEY>`        | Los grupos para hexágonos de host.        |
| `sizeby`  | `sizeby=avg:<METRIC_NAME>` | El tamaño de los hexágonos de host.       |

{{% /tab %}}
{{% tab "Monitores" %}}

Utiliza la [variable de etiqueta](#attribute-and-tag-variables) `{{host.name}}` para proporcionar un enlace a todos los monitores relacionados con un host específico:

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

El enlace de monitores se puede personalizar con parámetros adicionales. Los más comunes son:

| Parámetro | Ejemplo        | Muestra                                                                        |
|-----------|----------------|---------------------------------------------------------------------------------|
| `status`  | `status:Alert` | Monitores en estado de alerta (estados adicionales: `WARN`, `NO DATA` y `OK`)   |
| `muted`   | `muted: true`  | Monitores silenciados (utiliza `false` para monitores no silenciados)                             |
| `type`    | `type:log`     | Monitores de logs (consulta otros [tipos de monitores][1])                                     |



[1]: /es/monitors/types
{{% /tab %}}
{{% tab "Logs" %}}

Utiliza la [variable de plantilla] `{{last_triggered_at_epoch}}` (#template-variables) para proporcionar un enlace a todos los logs que estén ocurriendo en el momento de la alerta.

```text
https://app.datadoghq.com/logs?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

El enlace de logs se puede personalizar con parámetros adicionales. Los más comunes son:

| Parámetro | Definido con               | Determina                             |
|-----------|----------------------------|----------------------------------------|
| `service` | `service=<SERVICE_NAME>`   | Filtro en logs de un servicio específico.  |
| `host`    | `host=<HOST_NAME>`         | Filtro en logs de un host específico      |
| `status`  | `status=<STATUS>`          | Estado de logs: Error, Warn, Info, etc. |


{{% /tab %}}
{{< /tabs >}}

### Comentarios

Para incluir un comentario en el mensaje de monitor que solo aparezca en la pantalla de edición del monitor, utiliza la sintaxis:

```text
{{!-- this is a comment --}}
{{!-- this is a comment }}
```

### Formato sin procesar

Si tu mensaje de alerta necesita enviar llaves dobles, como `{{ <TEXT> }}`, utiliza el formato `{{{{raw}}}}`. Por ejemplo, el siguiente:

```text
{{{{raw}}}}
{{ <TEXT_1> }} {{ <TEXT_2> }}
{{{{/raw}}}}
```

Salidas:

```text
{{ <TEXT_1> }} {{ <TEXT_2> }}
```

Las ayudas `^|#` utilizadas en las [variables condicionales](#conditional-variables) no pueden utilizarse con el formato `{{{{raw}}}}` y deben eliminarse. Por ejemplo, para mostrar texto sin formato con la variable condicional `{{is_match}}`, utiliza la siguiente plantilla:

```text
{{{{is_match "host.name" "<HOST_NAME>"}}}}
{{ .matched }} the host name
{{{{/is_match}}}}
```

Si `host.name` coincide con `<HOST_NAME>`, la plantilla muestra:

```text
{{ .matched }} the host name
```

### Codificación URL

Si tu mensaje de alerta incluye información que debe codificarse en una URL (por ejemplo, para redireccionamientos), utiliza la sintaxis `{{ urlencode "<variable>"}}`.

**Ejemplo**: Si tu mensaje de monitor incluye una URL al catálogo de servicio filtrado a un servicio específico, utiliza la [variable de etiqueta](#attribute-and-tag-variables) `service` y añade la sintaxis `{{ urlencode "<variable>"}}` a la URL:

```
https://app.datadoghq.com/services/{{urlencode "service.name"}}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/configuration/#alert-grouping
[2]: /es/monitors/types/log/
[3]: /es/monitors/types/apm/?tab=analytics
[4]: /es/monitors/types/real_user_monitoring/
[5]: /es/monitors/types/ci/
[6]: /es/monitors/types/database_monitoring/
[7]: /es/monitors/guide/template-variable-evaluation/
[8]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones