---
description: Utiliza variables para personalizar las notificaciones de tu seguimiento
further_reading:
- link: /monitors/guide/template-variable-evaluation/
  tag: Guía
  text: Realiza operaciones aritméticas y funciones con evaluaciones de variables
    de plantilla
- link: /monitors/
  tag: Documentación
  text: Crea seguimientos
- link: /monitors/notify/
  tag: Documentación
  text: Notificaciones de seguimientos
- link: /monitors/manage/
  tag: Documentación
  text: Gestiona seguimientos
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: Centro de Aprendizaje
  text: Toma un curso para personalizar las notificaciones de seguimiento de alertas
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: Blog
  text: Dirige tus alertas de seguimiento con las reglas de notificación de seguimientos
    de Datadog
title: Variables
---
Utiliza variables en los mensajes de notificación para mostrar mensajes condicionales y dirigir la notificación a diferentes equipos utilizando [variables condicionales](#conditional-variables), o para enriquecer su contenido utilizando [variables de atributo y etiqueta](#attribute-and-tag-variables) y [variables de plantilla](#template-variables).

## Variables condicionales {#conditional-variables}

Las variables condicionales utilizan `if-else` lógica para mostrar un mensaje distinto según el estado del monitor y los detalles de cómo fue desencadenado. Estas variables pueden ser utilizadas dentro del asunto o cuerpo del mensaje de notificación.

Las siguientes variables condicionales están disponibles:

| Variable Condicional       | El texto se muestra si                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{#is_alert}}`            | The monitor alerts                                                 |
| `{{^is_alert}}`            | The monitor does not alert                                         |
| `{{#is_match}}`            | The context matches the provided substring. If a numeric value is used, it is converted to a string.|
| `{{^is_match}}`            | The context does not match the provided substring                  |
| `{{#is_exact_match}}`      | The context exactly matches the provided string.<br> If a number is used, the numeric value is considered, regardless of its type. This means that as long as two numbers have the same value, they are considered equal by the function. |
| `{{^is_exact_match}}`      | The context does not exactly match the provided string             |
| `{{#is_no_data}}`          | The monitor is triggered for missing data                          |
| `{{^is_no_data}}`          | The monitor is not triggered for missing data                      |
| `{{#is_warning}}`          | The monitor warns                                                  |
| `{{^is_warning}}`          | The monitor does not warn                                          |
| `{{#is_recovery}}`         | The monitor recovers from `ALERTA`, `ADVERTENCIA`, `DESCONOCIDO`, or `SIN DATOS`         |
| `{{^is_recovery}}`         | The monitor does not recover from `ALERTA`, `ADVERTENCIA`, `DESCONOCIDO`, or `SIN DATOS` |
| `{{#is_warning_recovery}}` | The monitor recovers from `ADVERTENCIA` to `OK`                        |
| `{{^is_warning_recovery}}` | The monitor does not recover from `ADVERTENCIA` to `OK`                |
| `{{#is_alert_recovery}}`   | The monitor recovers from `ALERTA` to `OK`                          |
| `{{^is_alert_recovery}}`   | The monitor does not recover from an ALERT to OK                   |
| `{{#is_alert_to_warning}}` | The monitor transitions from `ALERTA` to `ADVERTENCIA`                  |
| `{{^is_alert_to_warning}}` | The monitor does not transition from `ALERTA` to `ADVERTENCIA`          |
| `{{#is_no_data_recovery}}` | The monitor recovers from `SIN DATOS`                                |
| `{{^is_no_data_recovery}}` | The monitor does not recover from `SIN DATOS`                        |
| `{{#is_priority 'value'}}` | The monitor has priority `value`. Value ranges from `P1` to `P5`   |
| `{{#is_unknown}}`          | The monitor is in the unknown state                                |
| `{{^is_unknown}}`          | The monitor is not in the unknown state                            |
| `{{#is_renotify}}`         | The monitor is renotifying                                         |
| `{{^is_renotify}}`         | El monitor no está renotificando.                                    |

### Ejemplos {#examples}

Las variables condicionales deben tener un par de apertura y cierre con el texto y **@-notificaciones** en medio. Las variables basadas en el estado del monitor (como `is_alert` o `is_warning`), deben tener su propio bloque de mensaje. Debido a que un monitor solo puede estar en un estado a la vez, no puedes combinar estos. Sin embargo, puedes anidar condicionales que coincidan con atributos, consulta los `is_renotify` ejemplos.

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

Para enviar un mensaje de notificación cuando un monitor se recupera, utiliza el formato:

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

Para notificar a tu equipo de base de datos si un servidor desencadenante tiene la etiqueta `role:db_cassandra` o `role:db_postgres`, utiliza lo siguiente:

```text
{{#is_match "host.role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{/is_match}}
```

La `is_match` condición también admite la coincidencia de múltiples cadenas:

```text
{{#is_match "host.role.name" "db" "database"}}
  This displays if the host triggering the alert contains `db` or `database`
  in the role name. @db-team@company.com
{{/is_match}}
```

Para enviar una notificación diferente si la etiqueta no contiene `db`, utiliza la negación de la condición de la siguiente manera:

```text
{{^is_match "host.role.name" "db"}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```

O utiliza el `{{else}}` parámetro en el primer ejemplo:

```text
{{#is_match "host.role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{else}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```
**Nota**: Para verificar si un `<TAG_VARIABLE>` no existe o si está vacío, utiliza `is_exact_match`. Consulta la pestaña `is_exact_match` para más detalles.

{{% /tab %}}
{{% tab "is_exact_match" %}}

Busca una cadena exacta en una [variable de etiqueta](#attribute-and-tag-variables) con el formato:

```text
{{#is_exact_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This displays if <COMPARISON_STRING> is exactly <TAG_VARIABLE>.
{{/is_exact_match}}
```

Para notificar a tu equipo de desarrollo si un servidor desencadenante tiene el nombre `production`, utiliza lo siguiente:

```text
{{#is_exact_match "host.name" "production"}}
  This displays if the host that triggered the alert is exactly
  named production. @dev-team@company.com
{{/is_exact_match}}
```

La `is_exact_match` condición también admite la coincidencia de múltiples cadenas:

```text
{{#is_exact_match "host.name" "production" "staging"}}
  This displays if the host that triggered the alert is exactly
  named production or staging. @dev-team@company.com
{{/is_exact_match}}
```

La `is_exact_match` variable condicional también admite [`{{value}}` variables de plantilla](#template-variables):

```text
{{#is_exact_match "value" "<VALUE>"}}
  This displays if the value that breached the threshold of the monitor is exactly <VALUE>.
{{/is_exact_match}}
```

Para notificar a tu equipo de desarrollo si el valor que superó el umbral de tu monitor es 5 (o 5.0), utiliza lo siguiente:

```text
{{#is_exact_match "value" "5"}}
  This displays if the value that breached the threshold of the monitor is 5. @dev-team@company.com
{{/is_exact_match}}
```

La `is_exact_match` variable condicional también admite una cadena vacía para el `<COMPARISON_STRING>` para verificar si el atributo o etiqueta está vacío o no existe.

```text
{{#is_exact_match "host.datacenter" ""}}
  This displays if the attribute or tag does not exist or if it's empty
{{/is_exact_match}}
```


{{% /tab %}}
{{% tab "is_renotify" %}}

Para enviar un mensaje de escalación a un destino diferente solo para el entorno `production`:

```text
{{#is_renotify}}
{{#is_match "env" "production"}}
  This is an escalation message sent to @dev-team@company.com
{{/is_match}}
{{/is_renotify}}
```

Para enviar un mensaje de escalación diferente que no contenga los detalles del mensaje original, utiliza una combinación de `{{^is_renotify}}` and `{{#is_renotify}}` bloques:

```text
{{^is_renotify}}
This monitor is alerting and sending a first message @dev-team@company.com

To solve this monitor follow the steps:
1. Go there
2. Do this
{{/is_renotify}}

This part is generic and sent both for the first trigger and the escalation message.

{{#is_renotify}}
  This is the escalation message @dev-team@company.com
{{/is_renotify}}

```

En la renotificación del monitor, los usuarios recibirán el siguiente mensaje de escalación:

```
This part is generic and sent both for the first trigger and the escalation message.

This is the escalation message @dev-team@company.com
```

{{% /tab %}}

{{< /tabs >}}

Si configuras un bloque condicional para una transición de estado en las condiciones `alert` o `warning` con un manejador de **@-notifications**, Datadog recomienda que configures una condición correspondiente `recovery` para enviar una notificación de recuperación al manejador.

**Nota**: Cualquier texto o manejador de notificación colocado **fuera** de las variables condicionales configuradas se invoca con cada transición de estado del monitor. Cualquier texto o manejador de notificación colocado **dentro** de las variables condicionales configuradas solo se invoca si la transición de estado del monitor coincide con su condición.

## Variables de atributo y etiqueta {#attribute-and-tag-variables}

Utiliza variables de atributo y etiqueta para renderizar mensajes de alerta que sean personalizados, informativos y específicos para ayudar a entender la naturaleza de la alerta. Consulta las siguientes secciones para ejemplos y casos de uso:
- [Variables de alerta múltiple](#multi-alert-variables)
- [Variables de atributo/etiqueta coincidentes](#matching-attributetag-variables)

Etiquetas
: Adjuntas automáticamente (como nombre de servidor, nombre de contenedor, nombre de archivo de registro y nombre de función sin servidor) o añadidas a través de etiquetas personalizadas (como equipo a cargo, entorno, aplicación o versión).

Atributos
: Basados en el contenido del registro y ya sea analizados o añadidos mediante búsquedas en tablas de referencia (por ejemplo, geoip).

**Nota**: Si el monitor está configurado para recuperarse en condiciones de sin datos (por ejemplo, cuando no hay eventos que coincidan con la consulta), el mensaje de recuperación no contiene ningún dato. Para persistir información en el mensaje de recuperación, agrupa por etiquetas adicionales, que son accesibles mediante `{{tag.name}}`.

### Variables de alerta múltiple {#multi-alert-variables}

Configura las variables de alerta múltiple en [monitores de alerta múltiple][1] según la dimensión seleccionada en el cuadro de grupo de alerta múltiple. Enriquece las notificaciones incluyendo dinámicamente el valor asociado con la dimensión de agrupación en cada alerta.

**Nota**: Cuando uses el campo `group_by` en la agregación, se pueden heredar automáticamente etiquetas y alertas adicionales del monitor. Esto significa que cualquier alerta o configuración establecida en el punto de conexión monitoreado podría aplicarse a cada grupo resultante de la agregación.

{{< tabs >}}
{{% tab "Agrupar por etiqueta" %}}

Si una métrica está etiquetada con cualquier etiqueta en el formato `key:value` y la consulta del monitor está agrupada por esta etiqueta, usa la variable:

```
{{ key.name }}
```

Esta variable inserta el `value` asociado con el `key` en cada notificación de alerta. Por ejemplo, si tu monitor activa una alerta para cada `env`, entonces la variable `{{env.name}}` está disponible en tu mensaje de notificación.

Si un grupo tiene múltiples `values` asociados con el mismo `key`, el mensaje de alerta muestra una cadena de todos los valores separados por comas, en orden lexicográfico.

#### Clave de etiqueta con punto {#tag-key-with-period}

Si la clave de tu etiqueta tiene un punto, incluye corchetes alrededor de la clave completa al usar una variable de etiqueta. Por ejemplo, si tu etiqueta es `dot.key.test:five` y tu monitor está agrupado por `dot.key.test`, usa:

```text
{{[dot.key.test].name}}
```

{{% /tab %}}

{{% tab "Agrupar por faceta" %}}

Los monitores de registro, los monitores de Trace Analytics, los monitores de RUM y los monitores de eventos pueden usar facetas como variables si el monitor está agrupado por faceta. Si un monitor de registro está agrupado por `@facet_key`, usa la variable:

```text
{{ @facet_key.name }}
```

**Ejemplo**: Para incluir información específica del grupo en un monitor de registros de alertas múltiples group by `@machine_id`:

```text
This alert was triggered on {{ @machine_id.name }}
```

Si su faceta tiene puntos, use corchetes alrededor de la faceta, por ejemplo:

```text
{{ [@network.client.ip].name }}
```

{{% /tab %}}
{{< /tabs >}}

#### Personalice la notificación según el grupo {#customize-the-notification-based-on-the-group}

Cuando su consulta está agrupada por dimensiones específicas, puede enriquecer las notificaciones con metadatos dinámicos asociados con el grupo. Para ver una lista de variables de etiqueta según su selección de etiquetas, haga clic en **Usar variables de plantilla de mensaje** en la sección **Configurar notificaciones y automatizaciones**. Vea los siguientes ejemplos:

{{% collapse-content title="Consulta agrupada por servidor" level="h5" %}}

Si su monitor activa una alerta para cada `host`, entonces las variables de etiqueta `{{host.name}}` and `{{host.ip}}` están disponibles, así como cualquier etiqueta de servidor que esté disponible en este servidor.

Variables de metadatos específicos del servidor:

- Versión del agente: `{{host.metadata_agent_version}}`
- Máquina: `{{host.metadata_machine}}`
- Plataforma: `{{host.metadata_platform}}`
- Procesador: `{{host.metadata_processor}}`
{{% /collapse-content %}}

{{% collapse-content title="Consulta agrupada por kube_namespace y kube_cluster_name" level="h5" %}}
Si su monitor activa una alerta para cada `kube_namespace` y `kube_cluster_name`, entonces puede acceder a cualquier atributo del espacio de nombres.

Variables de metadatos del espacio de nombres:

- Nombre del clúster: `{{kube_namespace.cluster_name}}`
- Nombre del espacio de nombres: `{{kube_namespace.display_name}}`
- Estado del espacio de nombres: `{{kube_namespace.status}}`
- Etiquetas del espacio de nombres: `{{kube_namespace.labels}}`

La siguiente tabla contiene todos los atributos disponibles:

| Sintaxis de variable   | Atributos de primer nivel |
|-------------------|------------------------|
| `{{kube_namespace.key}}`     | `k8s_namespace_key`, `tags`, `annotations`, `cluster_id`, `cluster_name`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `finalizers`, `first_seen_at`, `group_size`, `labels`, `name`, `namespace`, `status`, `uid`|
{{% /collapse-content %}}

{{% collapse-content title="Consulta agrupada por pod_name y kube_namespace y kube_cluster_name" level="h5" %}}
Si su monitor activa una alerta para cada `pod_name` y `kube_namespace` y `kube_cluster_name`, entonces puede acceder a cualquier atributo del pod.

Variables de metadatos del pod:
- Nombre del clúster: `{{pod_name.cluster_name}}`
- Nombre del pod: `{{pod_name.name}}`
- Fase del pod: `{{pod_name.phase}}`

La siguiente tabla contiene todos los atributos disponibles:

| Sintaxis de variable   | Atributos de primer nivel |
|-------------------|------------------------|
| `{{pod_name.key}}`     | `k8s_pod_key`, `etiquetas`, `anotaciones`, `id_del_cluster`, `nombre_del_cluster`, `condiciones`, `estados_de_contenedor`, `marca_de_tiempo_de_creación`, `marca_de_tiempo_de_eliminación`, `nombre_de_visualización`, `id_externo`, `finalizadores`, `primera_vez_visto_en`, `tamaño_del_grupo`, `etiquetas`, `nombre`, `espacio_de_nombres`, `nombre_del_nodo`, `nombre_del_nodo_nominado`, `fase`, `marca_de_tiempo_de_programación_del_pod`, `nombre_de_clase_de_prioridad`, `clase_qos`, `requisitos_de_recursos`, `uid`|
{{% /collapse-content %}}


{{% collapse-content title="Consulta agrupada por servicio" level="h5" %}}

Si su monitor activa una alerta para cada `service`, entonces puede acceder a algún atributo del servicio, como se define en el [Software Catalog][10].

Variables de metadatos del servicio:

- Nombre del servicio: `{{service.name}}`
- Nombre del equipo: `{{service.team}}`
- Documentos: `{{service.docs}}`
- Enlaces: `{{service.links}}`

Para Documentos y Enlaces también puede acceder a un elemento específico con la siguiente sintaxis `[<name>]`. Por ejemplo, para servicios que tienen un esquema de definición como el definido en este [ejemplo][11], puede acceder al enlace "Runbook" utilizando la siguiente sintaxis

```text
{{service.links[Runbook]}}
```
{{% /collapse-content %}}

### Variables de atributo/etiqueta coincidentes {#matching-attributetag-variables}

Puede incluir cualquier atributo o etiqueta de un registro, traza, evento RUM, canalización CI o evento de prueba CI que coincida con la consulta del monitor. La siguiente tabla muestra ejemplos de atributos y variables que puede agregar de diferentes tipos de monitores.

<div class="alert alert-info">Para ver la lista completa de variables disponibles para su monitor, en la parte inferior de la configuración de notificación haga clic en <strong>{{&nbsp;Agregue Variable</strong> y seleccione de las opciones del menú expandido.</div>

| Tipo de monitor             | Sintaxis de variable                                         |
|--------------------------|--------------------------------------------------------|
| [Audit Trail][16]        | `{{audit.attributes.key}}` or `{{audit.message}}`      |
| [CI Pipeline][17]        | `{{cipipeline.attributes.key}}`                        |
| [CI Test][18]            | `{{citest.attributes.key}}`                            |
| [Database Monitoring][19]| `{{databasemonitoring.attributes.key}}`                |
| [Error Tracking][14]     | `{{issue.attributes.key}}`                             |
| [Log][12]                | `{{log.attributes.key}}` or `{{log.tags.key}}`         |
| [RUM][15]                | `{{rum.attributes.key}}` or `{{rum.tags.key}}`         |
| [Synthetic Monitoring][20]| `{{synthetics.attributes.key}}`                       |
| [Trace Analytics][13]    | `{{span.attributes.key}}` or `{{span.tags.key}}`       |

{{% collapse-content title="Ejemplo de uso de sintaxis" level="h4" %}}
- Para cualquier par `key:value`, la variable `{{log.tags.key}}` renders `valor` en el mensaje de alerta.
- El `@` que precede a todos los atributos no está incluido. Por ejemplo, si un monitor de registros está agrupado por `@http.status_code`, puedes incluir el mensaje de error o las etiquetas de infraestructura en el mensaje de notificación utilizando las variables:

  ```text
  {{ log.attributes.[error.message] }}
  {{ log.tags.env }}
  ...
  ```

  {{< img src="monitors/notifications/tag_attribute_variables.png" alt="Sintaxis de variable de atributo coincidente" style="width:90%;">}}
- El mensaje muestra el atributo `error.message` de un registro elegido que coincide con la consulta, **si el atributo existe**.
- Si la etiqueta está en un evento, utiliza la siguiente sintaxis:

  ```text
  {{ event.tags.[dot.key.test] }}
  ```

{{% /collapse-content %}}

#### Notas importantes {#important-notes}

- Si el evento seleccionado no incluye el atributo o la clave de etiqueta, la variable se muestra vacía en el mensaje de notificación. Para evitar notificaciones perdidas, evita usar estas variables para enrutar notificaciones con `{{#is_match}}` manejadores.
- Para monitores que utilizan Fórmulas y Funciones en consultas, los valores se resuelven en función de los eventos extraídos de la primera consulta.


#### Atributos reservados {#reserved-attributes}

Los registros, Event Management, spans, RUM, CI Pipeline y eventos de prueba CI tienen atributos reservados genéricos, que puedes usar en variables con la siguiente sintaxis:

| Tipo de monitor    | Sintaxis de variable   | Atributos de primer nivel |
|-----------------|-------------------|------------------------|
| Registro             | `{{log.key}}`     | `mensaje`, `servicio`, `estado`, `fuente`, `ID de tramo`, `marca de tiempo`, `ID de traza`, `enlace`, `servidor` |
| Trace Analytics | `{{span.key}}`    | `entorno`, `nombre de operación`, `nombre de recurso`, `servicio`, `estado`, `ID de tramo`, `marca de tiempo`, `ID de traza`, `tipo`, `enlace` |
| RUM             | `{{rum.key}}`     | `servicio`, `estado`, `marca de tiempo`, `enlace` |
| Event             | `{{event.key}}`     | `atributos`, `nombre.del.servidor`, `id`, `enlace`, `título`, `texto`, `etiquetas` |
| CI Pipeline             | `{{cipipeline.key}}`     | `servicio`, `entorno`, `nombre de recurso`, `nivel_ci`, `ID de traza`, `ID de tramo`, `huella_dactilar_de_canalización`, `nombre de operación`, `arreglo_parcial_ci`, `estado`, `marca de tiempo`, `enlace` |
| CI Test             | `{{citest.key}}`     | `servicio`, `entorno`, `nombre_de_recurso`, `id_de_traza`, `id_de_tramo`, `nombre_de_operación`, `estado`, `marca_de_tiempo`, `enlace` |

Si el evento coincidente no contiene el atributo en su definición, la variable se renderiza vacía.

#### Enlace del explorador {#explorer-link}

Usar `{{log.link}}`, `{{span.link}}`, `{{rum.link}}`, and `{{issue.link}}` para enriquecer la notificación con un enlace al Explorador de Registros, Explorador de Trazas, Explorador RUM o Error Tracking, limitado a los eventos que coinciden con la consulta.

### Verificar variables de monitor {#check-monitor-variables}

Para verificar variables de monitor (verificación personalizada y verificación de integración), la variable `{{check_message}}` está disponible y renderiza el mensaje especificado en la verificación personalizada o la verificación de integración.

### Variables de monitor compuesto {#composite-monitor-variables}

Los monitores compuestos pueden acceder al valor y estado asociados con los sub-monitores en el momento en que se activa la alerta.

Por ejemplo, si tu monitor compuesto tiene un sub-monitor `a`, puedes incluir el valor de `a` con:

```text
{{ a.value }}
```

Para recuperar el estado del sub-monitor `a`, use:

```text
{{ a.status }}
```

Los valores posibles para el estado son: `OK`, `Alert`, `Warn` y `No Data`.

Los monitores compuestos también admiten variables de etiqueta de la misma manera que sus monitores subyacentes. Siguen el mismo formato que otros monitores, siempre que los monitores subyacentes estén agrupados por la misma etiqueta o faceta.

Por ejemplo, suponga que su monitor compuesto tiene un sub-monitor `a`, que es un monitor de registros. Puede incluir el valor de cualquier etiqueta o faceta de `a` con:

```text
{{ a.log.message }} or {{ a.log.my_facet }}
```

### Escape de caracteres {#character-escape}

El contenido variable está codificado en HTML por defecto. Para mostrar contenido sin codificar, use tres llaves en lugar de dos llaves.

Por ejemplo, cuando el valor de una variable contiene una URL con parámetros de consulta, el `&` se trata de manera diferente dependiendo de si se utilizan llaves dobles o triples:

| Sintaxis | Ejemplo de salida |
--------|----------------|
| `{{template_variable}}` (double braces) | `https://status.example.com/check?service=web&amp;region=us-east` |
| `{{{template_variable}}}` (triple braces) | `https://status.example.com/check?service=web&region=us-east` |

| Sintaxis | Salida |
|--------|--------|
| `{{variable}}` | HTML-encoded (default) |
| `{{{variable}}}` | Sin codificar |

Por ejemplo, para mostrar el mensaje de verificación sin codificación HTML:

```text
{{{check_message}}}
```

Esto es particularmente relevante cuando `{{check_message}}` contains auto-generated URLs with query parameters (for example, on HTTP Check monitors). The `&` characters in those URLs are HTML-encoded by default, which can break clickable links in notifications. Use `{{{check_message}}}` para preservar las URL tal como están.

## Variables de plantilla {#template-variables}

Utiliza variables de plantilla para personalizar las notificaciones de tu monitor. Las variables integradas son:

| Variable                             | Descripción                                                                   |
|-----------------------------------   |-------------------------------------------------------------------------------|
| `{{value}}`                          | The value that breached the alert for metric based query monitors.            |
| `{{threshold}}`                      | The value of the alert threshold set in the monitor's alert conditions.       |
| `{{warn_threshold}}`                 | The value of the warning threshold set in the monitor's alert conditions.     |
| `{{alert_recovery_threshold}}`       | The value that recovered the monitor from its `ALERTA` state.                  |
| `{{warn_recovery_threshold}}`        | The value that recovered the monitor from its `ADVERTENCIA` state.                   |
| `{{ok_threshold}}`                   | The value that recovered the Service Check monitor.                           |
| `{{comparator}}`                     | The relational value set in the monitor's alert conditions.                   |
| `{{first_triggered_at}}`<br>*See section below*         | The UTC date and time when the monitor first triggered.                       |
| `{{first_triggered_at_epoch}}`<br>*See section below*   | The UTC date and time when the monitor first triggered in epoch milliseconds. |
| `{{last_triggered_at}}`<br>*See section below*          | The UTC date and time when the monitor last triggered.                        |
| `{{last_triggered_at_epoch}}`<br>*See section below*    | The UTC date and time when the monitor last triggered in epoch milliseconds.  |
| `{{triggered_duration_sec}}`         | El número de segundos que el monitor ha estado en un estado activado.              |

### Variables activadas {#triggered-variables}

 El `{{first_triggered_at}}`, `{{first_triggered_at_epoch}}`, `{{last_triggered_at}}`, and `{{last_triggered_at_epoch}}` monitor template variables reflect the values when a monitor changes state, **NOT** when a new monitor event occurs. Renotification events show the same template variable if the monitor state has not changed. Use `{{triggered_duration_sec}}` para mostrar la duración en el momento del evento del monitor.

 `{{first_triggered_at}}` is set when the monitor group goes from `OK` to a non-`OK` state or when a new group appears in a non-`OK` state. `{{last_triggered_at}}` gets set when the monitor group goes to a non-`OK` state independently from its previous state (including `ADVERTENCIA` → `ALERTA`, `ALERTA` → `ADVERTENCIA`). Additionally, `{{last_triggered_at}}` is set when a new group appears in a non-`OK` state. The difference is that `{{last_triggered_at}}` es independiente de su estado anterior.

 {{< img src="monitors/notifications/triggered_variables.png" alt="Mostrando cuatro transiciones con marcas de tiempo A: 1419 OK a ADVERTENCIA, B: 1427 ADVERTENCIA a ALERTA, C: 1445 ALERTA a SIN DATOS, D: 1449 SIN DATOS a OK" style="width:90%;">}}

**Ejemplo**: Cuando el monitor transita de `OK` → `WARN`, los valores de `{{first_triggered_at}}` and `{{last_triggered_at}}` ambos tienen la marca de tiempo A. La tabla a continuación muestra los valores hasta que el monitor se recupera.

| Transición         | first_triggered_at     | last_triggered_at      | triggered_duration_sec           |
|------------------  |--------------------------------  |--------------------------------  |--------------------------------  |
| `OK` → `WARN`      | A                                | A                                | 0                                |
| `WARN` → `ALERT`   | A                                | B                                | B - A                            |
| `ALERT` → `NO DATA`| A                                | C                                | C - A                            |
| `NO DATA` → `OK`   | A                                | C                                | D - A                            |

### Evaluación {#evaluation}

Las variables de plantilla que devuelven valores numéricos admiten operaciones y funciones, lo que te permite realizar operaciones matemáticas o cambios de formato en el valor. Para más detalles, consulta [Evaluación de Variables de Plantilla][7].

### Hora local {#local-time}

Utiliza la función `local_time` para agregar otra fecha en tu notificación en la zona horaria de tu elección. Esta función transforma una fecha en su hora local: `{{local_time 'time_variable' 'timezone'}}`.
Por ejemplo, para agregar la última hora activada del monitor en la zona horaria de Tokio en tu notificación, incluye lo siguiente en el mensaje de notificación:

```
{{local_time 'last_triggered_at' 'Asia/Tokyo'}}
```

El resultado se muestra en el formato ISO 8601: `yyyy-MM-dd HH:mm:ss±HH:mm`, por ejemplo `2021-05-31 23:43:27+09:00`.
Consulta la [lista de zonas horarias de la base de datos tz][8], particularmente la columna de nombre de la base de datos TZ, para ver la lista de valores de zona horaria disponibles.

## Avanzado {#advanced}

### Manejadores dinámicos {#dynamic-handles}

Utiliza [variables de etiqueta](#attribute-and-tag-variables) para construir dinámicamente manejadores de notificación y dirigir notificaciones al equipo o servicio correcto según el tipo de problema detectado por tu monitor.

**Ejemplo**: Si tu monitor consulta una métrica y la agrupa por una etiqueta `service`, puedes hacer que tus notificaciones se dirijan a diferentes canales de Slack dependiendo del servicio que esté fallando:

```text
@slack-{{service.name}} There is an ongoing issue with {{service.name}}.
```

Si tu monitor comienza a fallar en el grupo `service:ad-server`, la notificación se envía al canal de Slack `#ad-server` con el siguiente contenido:

```text
@slack-ad-server There is an ongoing issue with ad-server.
```

Al construir manejadores dinámicos con atributos que pueden no estar siempre presentes, puedes encontrar problemas con la entrega de notificaciones. Si falta un atributo, la variable se renderiza vacía en el mensaje de notificación, lo que resulta en un manejador inválido.

Para evitar notificaciones perdidas al usar manejadores dinámicos con estas variables, asegúrate de agregar un manejador de respaldo:

```text
{{#is_exact_match "kube_namespace.owner" ""}}
  @slack-example
  // This will notify @slack-example if the kube_namespace.owner variable is empty or does not exist.
{{/is_exact_match}}
```


### Enlaces dinámicos {#dynamic-links}

Utiliza [variables de etiqueta](#attribute-and-tag-variables) para habilitar la construcción dinámica de URL que vincule a tu equipo a un recurso apropiado. Por ejemplo, puedes proporcionar enlaces a páginas dentro de Datadog, como dashboards, el mapa de servidores y monitores.

{{< tabs >}}
{{% tab "Dashboards" %}}

Utiliza el `{{host.name}}` [variable de etiqueta](#attribute-and-tag-variables) para proporcionar un enlace a un dashboard del sistema:

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

Utiliza el `{{host.name}}` [tag variable](#attribute-and-tag-variables) and an `<INTEGRATION_NAME>` para proporcionar un enlace a un dashboard de integración:

```text
https://app.datadoghq.com/dash/integration/<INTEGRATION_NAME>?tpl_var_scope=host:{{host.name}}
```

Utiliza el `{{last_triggered_at_epoch}}` [template variable](#template-variables) as well as a `<DASHBOARD_ID>` and `<DASHBOARD_NAME>` para enlazar a dashboards con rangos de tiempo relativos desde el momento de la alerta:

```text
https://app.datadoghq.com/dashboard/<DASHBOARD_ID>/<DASHBOARD_NAME>?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

{{% /tab %}}
{{% tab "Mapa de servidores" %}}

Utiliza una [variable de etiqueta](#attribute-and-tag-variables) como `{{service.name}}` para proporcionar un enlace al mapa de servidores:

```text
https://app.datadoghq.com/infrastructure/map?filter=service:{{service.name}}
```

El enlace del mapa de servidores es personalizable con parámetros adicionales. Los más comunes son:

| Parámetro | Definido con               | Determina                           |
|-----------|----------------------------|--------------------------------------|
| `fillby`  | `fillby=avg:<METRIC_NAME>` | El color de relleno de los hexágonos de los hosts. |
| `groupby` | `groupby=<TAG_KEY>`        | Los grupos para los hexágonos de los hosts.        |
| `sizeby`  | `sizeby=avg:<METRIC_NAME>` | El tamaño de los hexágonos de los hosts.       |

{{% /tab %}}
{{% tab "Seguimientos" %}}

Utiliza el `{{host.name}}` [variable de etiqueta](#attribute-and-tag-variables) para proporcionar un enlace a todos los seguimientos relacionados con un host específico:

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

El enlace de seguimiento es personalizable con parámetros adicionales. Los más comunes son:

| Parámetro | Ejemplo        | Muestra                                                                        |
|-----------|----------------|---------------------------------------------------------------------------------|
| `status`  | `status:Alert` | Seguimientos en estado de alerta (estados adicionales: `WARN`, `NO DATA` y `OK`)   |
| `muted`   | `muted: true`  | Seguimientos silenciados (usa `false` para seguimientos no silenciados)                             |
| `type`    | `type:log`     | Monitor de registros (ver otros [tipos de seguimientos][1])                                     |



[1]: /es/monitors/types
{{% /tab %}}
{{% tab "Registros" %}}

Utiliza el `{{last_triggered_at_epoch}}` [variable de plantilla](#template-variables) para proporcionar un enlace a todos los registros que ocurren en el momento de la alerta.

```text
https://app.datadoghq.com/logs?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

El enlace de registros es personalizable con parámetros adicionales. Los más comunes son:

| Parámetro | Definido con               | Determina                             |
|-----------|----------------------------|----------------------------------------|
| `service` | `service=<SERVICE_NAME>`   | Filtrar registros de un servicio específico.  |
| `host`    | `host=<HOST_NAME>`         | Filtrar registros de un host específico      |
| `status`  | `status=<STATUS>`          | Estado de los registros: Error, Advertencia, Información, etc. |


{{% /tab %}}
{{< /tabs >}}

### Comentarios {#comments}

Para incluir un comentario en el mensaje de seguimiento, utiliza la sintaxis:

```text
{{!-- this is a comment --}}
{{!-- this is a comment }}
```

### Formato sin procesar {#raw-format}

Si tu mensaje de alerta necesita enviar llaves dobles, como `{{ <TEXT> }}`, use `{{{{raw}}}}` formato. Por ejemplo, lo siguiente:

```text
{{{{raw}}}}
{{ <TEXT_1> }} {{ <TEXT_2> }}
{{{{/raw}}}}
```

Salidas:

```text
{{ <TEXT_1> }} {{ <TEXT_2> }}
```

Los `^|#` ayudantes utilizados en [variables condicionales](#conditional-variables) no pueden ser utilizados con `{{{{raw}}}}` formatting and must be removed. For instance, to output raw text with the `{{is_match}}` variable condicional utiliza la siguiente plantilla:

```text
{{{{is_match "host.name" "<HOST_NAME>"}}}}
{{ .matched }} the host name
{{{{/is_match}}}}
```

Si `host.name` coincide con `<HOST_NAME>`, la plantilla produce:

```text
{{ .matched }} the host name
```

### Codificar URL {#url-encode}

Si tu mensaje de alerta incluye información que necesita ser codificada en una URL (por ejemplo, para redirecciones), use el `{{ urlencode "<variable>"}}` sintaxis.

**Ejemplo**: Si tu mensaje de seguimiento incluye una URL al Software Catalog filtrada a un servicio específico, usa la `service` [variable de etiqueta](#attribute-and-tag-variables) y agrega el `{{ urlencode "<variable>"}}` sintaxis a la URL:

```
https://app.datadoghq.com/services/{{urlencode "service.name"}}
```

## Lectura adicional {#further-reading}

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