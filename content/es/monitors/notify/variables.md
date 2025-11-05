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
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Dirige tus alertas de monitor con las reglas de notificación de monitor de
    Datadog
title: Variables
---

Utiliza variables en los mensajes de notificación para mostrar mensajes condicionales y dirigir la notificación a diferentes equipos utilizando [variables condicionales](#conditional-variables), o para enriquecer tu contenido utilizando [variables de atributo y etiqueta (tag)](#attribute-and-tag-variables) y [variables de plantilla](#template-variables).

## Variables condicionales

Las variables condicionales utilizan la lógica de `if-else` para mostrar un mensaje diferente dependiendo del estado del monitor y de los detalles de cómo se activó. Estas variables pueden utilizarse dentro del asunto o del cuerpo del mensaje de notificación.

Están disponibles las siguientes variables condicionales:

| Variable condicional       | El texto se muestra si                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{#is_alert}}`            | El monitor alerta                                                 |
| `{{^is_alert}}`            | El monitor no alerta                                         |
| `{{#is_match}}`            | El contexto coincide con la subcadena proporcionada. Si se utiliza un valor numérico, se convierte en una cadena.|
| `{{^is_match}}`            | El contexto no coincide con la subcadena proporcionada                  |
| `{{#is_exact_match}}`      | El contexto coincide exactamente con la cadena proporcionada.<br> Si se utiliza un número, se considera el valor numérico, independientemente de su tipo. Esto significa que mientras dos números tengan el mismo valor, la función los considerará iguales. |
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

Para enviar un mensaje de notificación cuando un monitor alerta, utiliza el formato:

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
  This displays if <COMPARISON_STRING> is included in <TAG_VARIABLE>.
{{/is_match}}
```

Para notificar a tu equipo de base de datos si un host desencadenante tiene la etiqueta `role:db_cassandra` o `role:db_postgres`, utiliza lo siguiente:

```text
{{#is_match "role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{/is_match}}
```

La condición `is_match` también permite unir varias cadenas:

```text
{{#is_match "role.name" "db" "database"}}
  This displays if the host triggering the alert contains `db` or `database`
  in the role name. @db-team@company.com
{{/is_match}}
```

Para enviar una notificación diferente si la etiqueta no contiene `db`, utiliza la negación de la condición como se indica a continuación:

```text
{{^is_match "role.name" "db"}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```

O utiliza el parámetro `{{else}}` del primer ejemplo:

```text
{{#is_match "role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{else}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```
**Nota**: Para comprobar si uns `<TAG_VARIABLE>` no existe o si está vacía, utiliza `is_exact_match`. Consulta la pestaña `is_exact_match` para más detalles.

{{% /tab %}}
{{% tab "is_exact_match" %}}

Busca una cadena exacta en una [variable de etiqueta](#attribute-and-tag-variables) con el formato:

```text
{{#is_exact_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This displays if <COMPARISON_STRING> is exactly <TAG_VARIABLE>.
{{/is_exact_match}}
```

Para notificar a tu equipo de desarrollo si un host desencadenante tiene el nombre `production`, utiliza lo siguiente:

```text
{{#is_exact_match "host.name" "production"}}
  This displays if the host that triggered the alert is exactly
  named production. @dev-team@company.com
{{/is_exact_match}}
```

La condición `is_exact_match` también permite buscar varias cadenas:

```text
{{#is_exact_match "host.name" "production" "staging"}}
  This displays if the host that triggered the alert is exactly
  named production or staging. @dev-team@company.com
{{/is_exact_match}}
```

La variable condicional `is_exact_match` también admite [variables de plantilla `{{value}}`](#template-variables):

```text
{{#is_exact_match "value" "<VALUE>"}}
  This displays if the value that breached the threshold of the monitor is exactly <VALUE>.
{{/is_exact_match}}
```

Para notificar a tu equipo de desarrollo si el valor que ha superado el umbral de tu monitor es 5 (o 5,0), utiliza lo siguiente:

```text
{{#is_exact_match "value" "5"}}
  This displays if the value that breached the threshold of the monitor is 5. @dev-team@company.com
{{/is_exact_match}}
```

La variable condicional `is_exact_match` también admite una cadena vacía para que `<COMPARISON_STRING>` compruebe si el atributo o etiqueta está vacío o no existe.
```text
{{#is_exact_match "host.datacenter" ""}}
  This displays if the attribute or tag does not exist or if it's empty
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

Utiliza variables de atributos y etiquetas para mostrar mensajes de alerta personalizados, informativos y específicos que ayuden a comprender la naturaleza de la alerta. Consulta las siguientes secciones para ver ejemplos y casos de uso:
- [Variables de alerta múltiple](#multi-alert-variables)
- [Variables de atributo/etiqueta coincidentes](#matching-attributetag-variables)

Etiquetas
: se adjuntan automáticamente (como nombre de host, nombre de contenedor, nombre de archivo de log y nombre de función sin servidor) o se añaden mediante etiquetas personalizadas (como equipo responsable, entorno, aplicación o versión).

Atributos
: basados en el contenido de log y analizados o añadidos mediante búsquedas en tablas de referencia (por ejemplo, geoip).

**Nota**: Si el monitor está configurado para recuperarse en condiciones sin datos (por ejemplo, cuando no hay eventos que coincidan con la consulta), el mensaje de recuperación no contiene datos. Para mantener la información en el mensaje de recuperación, agrupa por etiquetas adicionales, a las que se puede acceder mediante `{{tag.name}}`.

### Variables de alerta múltiple

Configura variables de multialertas en [monitores de multialertas][1] en función de la dimensión seleccionada en el cuadro de grupo de multialertas. Enriquece las notificaciones incluyendo dinámicamente en cada alerta el valor asociado a la dimensión agrupada.

**Nota**: Cuando se utiliza el campo `group_by` en la agregación, las etiquetas y alertas adicionales del monitor pueden heredarse automáticamente. Esto significa que cualquier alerta o configuración establecida en el endpoint supervisado podría aplicarse a cada grupo resultante de la agregación.

{{< tabs >}}
{{% tab "Agrupar por etiqueta" %}}

Si una métrica está etiquetada con cualquier etiqueta en el formato `key:value` y la consulta de monitor está agrupada por esta etiqueta, utiliza la variable:

```
{{ key.name }}
```

Esta variable inserta el `value` asociado al `key` en cada notificación de alerta. Por ejemplo, si tu monitor activa una alerta para cada `env`, entonces la variable `{{env.name}}` está disponible en tu mensaje de notificación.

Si un grupo tiene varios `values` asociados a la misma `key`, el mensaje de alerta muestra una cadena separada por comas de todos los valores, en orden lexicográfico.

#### Clave de etiqueta con punto

Si la clave de tu etiqueta contiene un punto, pon entre paréntesis la clave completa cuando utilices una variable de etiqueta. Por ejemplo, si tu etiqueta es `dot.key.test:five` y tu monitor está agrupado por `dot.key.test`, utiliza:

```text
{{[dot.key.test].name}}
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

Cuando tu consulta está agrupada por dimensiones específicas, puedes mejorar las notificaciones con metadatos dinámicos asociados al grupo. Para ver una lista de variables de etiqueta basadas en tu selección de etiquetas, haz clic en **Use message template variables** (Utilizar variables de plantilla de mensaje) en la sección **Configure notifications & automations** (Configurar notificaciones y automatizaciones). Consulta los siguientes ejemplos:

{{% collapse-content title="Grupo de consulta por host" level="h5" %}}

Si tu monitor activa una alerta para cada `host`, entonces las variables de etiqueta `{{host.name}}` y `{{host.ip}}` están disponibles, así como cualquier etiqueta de host que esté disponible en este host.

Variables de metadatos específicas de host:

- Versión del Agent: `{{host.metadata_agent_version}}`
- Máquina: `{{host.metadata_machine}}`
- Plataforma: `{{host.metadata_platform}}`
- Procesador: `{{host.metadata_processor}}`
{{% /collapse-content %}}

{{% collapse-content title="Grupo de consulta por kube_namespace y kube_cluster_name" level="h5" %}}
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
{{% /collapse-content %}}

{{% collapse-content title="Grupo de consulta por pod_name y kube_namespace y kube_cluster_name" level="h5" %}}
Si tu monitor activa una alerta para cada `pod_name` y `kube_namespace` y `kube_cluster_name`, entonces puedes acceder a cualquier atributo del pod.

Variables de metadatos del pod:
- Nombre del clúster: `{{pod_name.cluster_name}}`
- Nombre del pod: `{{pod_name.name}}`
- Fase del pod: `{{pod_name.phase}}`

La siguiente tabla contiene todos los atributos disponibles:

| Sintaxis de la variable   | Atributos de primer nivel |
|-------------------|------------------------|
| `{{pod_name.key}}`     | `k8s_pod_key`, `tags`, `annotations`, `cluster_id`, `cluster_name`, `conditions`, `container_statuses`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `finalizers`, `first_seen_at`, `host_id`, `host_key`, `hostname`, `init_container_statuses`, `ip`, `labels`, `name`, `namespace`, `node_name`, `nominated_node_name`, `phase`, `pod_scheduled_timestamp`, `priority_class_name`, `qosclass`, `resource_requirements`, `uid`|
{{% /collapse-content %}}


{{% collapse-content title="Grupo de consulta por servicio" level="h5" %}}

Si tu monitor activa una alerta para cada `service`, entonces puedes acceder a algún atributo del servicio, tal y como se define en el [Software Catalog][10].

Variables de metadatos de servicio:

- Nombre del servicio: `{{service.name}}`
- Nombre del equipo: `{{service.team}}`
- Documentos: `{{service.docs}}`
- Enlaces: `{{service.links}}`

Para documentos y enlaces también puedes acceder a un elemento específico con la siguiente sintaxis `[<name>]`. Por ejemplo, para los servicios que tienen un esquema de definición como el definido en este [ejemplo][11], puedes acceder al enlace "Runbook" utilizando la siguiente sintaxis

```text
{{service.links[Runbook]}}
```
{{% /collapse-content %}}

### Unión de variables de atributo/etiqueta

Puedes incluir cualquier atributo o etiqueta de un log, tramo de traza, evento RUM, CI pipeline, o evento de CI test que coincida con la consulta de monitor. La siguiente tabla muestra ejemplos de atributos y variables que puedes añadir de diferentes tipos de monitor.

<div class="alert alert-info">Para ver la lista completa de variables disponibles para tu monitor, en la parte inferior de la configuración de notificaciones, haz clic en <strong>Add Variable</strong> (Añadir variable) y selecciona una de las opciones del menú desplegado.</div>

| Tipo de monitor             | Sintaxis de la variable                                         |
|--------------------------|--------------------------------------------------------|
| [Audit Trail][16]        | `{{audit.attributes.key}}` o `{{audit.message}}`      |
| [CI Pipeline][17]        | `{{cipipeline.attributes.key}}`                        |
| [CI Test][18]            | `{{citest.attributes.key}}`                            |
| [Database Monitoring][19]| `{{databasemonitoring.attributes.key}}`                |
| [Error Tracking][14]     | `{{issue.attributes.key}}`                             |
| [Log][12]                | `{{log.attributes.key}}` o `{{log.tags.key}}`         |
| [RUM][15]                | `{{rum.attributes.key}}` o `{{rum.tags.key}}`         |
| [Synthetic Monitoring][20]| `{{synthetics.attributes.key}}`                       |
| [Trace Analytics][13]    | `{{span.attributes.key}}` o `{{span.tags.key}}`       |

{{% collapse-content title="Ejemplo de uso de sintaxis" level="h4" %}}
- Para cualquier par `key:value`, la variable `{{log.tags.key}}` se convierte en `value` en el mensaje de alerta.
- No se incluye el `@` que precede a todos los atributos. Por ejemplo, si un monitor de logs está agrupado por `@http.status_code`, puedes incluir el mensaje de error o las etiquetas de infraestructura en el mensaje de notificación utilizando las variables:

  ```text
  {{ log.attributes.[error.message] }}
  {{ log.tags.env }}
  ...
  ```

  {{< img src="monitors/notifications/tag_attribute_variables.png" alt="Unir la sintaxis de variable de atributo" style="width:90%;">}}
- El mensaje muestra el atributo `error.message` de un log elegido que coincide con la consulta, **si el atributo existe**.
- Si la etiqueta está en un evento, utiliza la siguiente sintaxis:

  ```text
  {{ event.tags.[dot.key.test] }}
  ```

{{% /collapse-content %}}

#### Notas importantes

- Si el evento seleccionado no incluye la clave de atributo o etiqueta, la variable aparece vacía en el mensaje de notificación. Para evitar que se pierdan notificaciones, evita utilizar estas variables para enrutar notificaciones con indicadores `{{#is_match}}`.
- Para los monitores que utilizan fórmulas y funciones en las consultas, los valores se resuelven en función de los eventos extraídos de la primera consulta.


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

El contenido de las variables se fuga por defecto. Para evitar que se fugue contenido como JSON o código, utiliza llaves triples en lugar de dobles, por ejemplo: `{{{event.text}}}`.

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

Las variables de plantilla de monitor `{{first_triggered_at}}`, `{{first_triggered_at_epoch}}`, `{{last_triggered_at}}` y `{{last_triggered_at_epoch}}` reflejan los valores cuando un monitor cambia de estado, **NO** cuando se produce un nuevo evento de monitor. Los eventos de renotificación muestran la misma variable de plantilla si el estado del monitor no ha cambiado. Utiliza `{{triggered_duration_sec}}` para mostrar la duración en el momento del evento del monitor.

 `{{first_triggered_at}}` se establece cuando el grupo de monitor pasa de `OK` a un estado distinto de `OK` o cuando aparece un nuevo grupo en un estado distinto de `OK`. `{{last_triggered_at}}` se establece cuando el grupo de monitor pasa a un estado distinto de `OK` independientemente de su estado anterior (incluido `WARN` → `ALERT`, `ALERT` → `WARN`). Además, `{{last_triggered_at}}` se establece cuando un nuevo grupo aparece en un estado distinto a `OK`. La diferencia es que `{{last_triggered_at}}` es independiente de su estado anterior.

 {{< img src="monitors/notifications/triggered_variables.png" alt="Muestra cuatro transiciones con marcas temporales A: 1419 OK a WARN, B: 1427 WARN a ALERT, C: 1445 ALERT a NO DATA, D: 1449 NO DATA a OK" style="width:90%;">}}

**Ejemplo**: Cuando el monitor pasa de `OK` → `WARN`, los valores de `{{first_triggered_at}}` y `{{last_triggered_at}}` tienen ambos la marca temporal A. La tabla siguiente muestra los valores hasta que el monitor se recupere.

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

Cuando se crean indicadores dinámicos con atributos que pueden no estar siempre presentes, pueden surgir problemas con la entrega de notificaciones. Si falta un atributo, la variable se muestra vacía en el mensaje de notificación, lo que da lugar a un indicador no válido.

Para evitar notificaciones perdidas al usar identificadores dinámicos con estas variables, asegúrate de agregar un identificador alternativo:

```text
{{#is_exact_match "kube_namespace.owner" ""}}
  @slack-example
  // This will notify @slack-example if the kube_namespace.owner variable is empty or does not exist.
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

Para incluir un comentario en el mensaje de monitor, utiliza la sintaxis:

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

**Ejemplo**: Si tu mensaje de monitor incluye una URL al Software Catalog filtrada a un servicio específico, utiliza la [variable de etiqueta](#attribute-and-tag-variables) `service` y añade la sintaxis `{{ urlencode "<variable>"}}` a la URL:

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
[9]: /es/monitors/types/error_tracking/
[10]: /es/software_catalog/service_definitions/
[11]: https://docs.datadoghq.com/es/software_catalog/service_definitions/v2-2/#example-yaml
[12]: /es/monitors/types/log/
[13]: /es/monitors/types/apm/?tab=analytics
[14]: /es/monitors/types/error_tracking/
[15]: /es/monitors/types/real_user_monitoring/
[16]: /es/monitors/types/audit_trail/
[17]: /es/monitors/types/ci/?tab=tests
[18]: /es/monitors/types/ci/?tab=pipelines
[19]: /es/monitors/types/database_monitoring/
[20]: /es/synthetics/notifications/template_variables/