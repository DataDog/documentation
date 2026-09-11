---
aliases:
- /es/security_platform/notifications/variables
further_reading:
- link: /security/detection_rules/
  tag: Documentación
  text: Explorar las reglas de detección de seguridad
- link: /security/notifications/
  tag: Documentación
  text: Más información sobre las notificación de seguridad
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: Variables
---

{{< product-availability >}}

## Información general

Al [crear una nueva regla de detección o modificar una existente][1], utiliza [variables de plantilla](#template-variables) (como atributos y etiquetas (tags) de señal) y [variables condicionales](#conditional-variables) para personalizar el mensaje de notificación de una regla. Cuando se genera una señal a partir de la regla, las variables se rellenan con valores relacionados con esa señal. 

## Variables de plantilla

Utiliza variables de plantilla para inyectar contexto dinámico desde logs o trazas (traces) activados directamente en una señal de seguridad y sus notificaciones asociadas.

Están disponibles las siguientes variables:

| Variable                                           | Descripción                                                                                   |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `{{severity}}`                                     | La gravedad del caso de la regla desencadenante (entero, 0-4).                                      |
| `{{timestamp}}`                                    | Hora de creación de la señal. Por ejemplo, `Mon Jan 01 00:00:00 UTC 1970`.                     |
| `{{timestamp_epoch}}`                              | Hora de creación de la señal, en milisegundos desde la medianoche del 1 de enero de 1970.                 |
| `{{first_seen}}`                                   | Hora a la que se vio la señal por primera vez. Por ejemplo, `Mon Jan 01 00:00:00 UTC 1970`.                  |
| `{{first_seen_epoch}}`                             | Hora en que se vio la señal por primera vez, en milisegundos desde la medianoche del 1 de enero de 1970.              |
| `{{last_seen}}`                                    | Hora a la que se activó la señal más recientemente. Por ejemplo, `Mon Jan 01 00:00:00 UTC 1970`.     |
| `{{last_seen_epoch}}`                              | Hora en que se activó la señal más recientemente, en milisegundos, desde la medianoche del 1 de enero de 1970.|
| `{{rule_name}}`                                    | Nombre de la regla asociada.                                                                  |
| `{{case_name}}`                                    | Nombre del caso de la regla desencadenante.                                                             |
| `{{events_matched}}`                               | Número de eventos que han coincidido con la regla asociada.                                       |
| `{{events_matched_per_query.<name_of_the_query>}}` | Número de eventos que han coincidido con la consulta de la regla asociada `<name_of_the_query>`.           |

Cuando un gran número de logs coinciden con una regla, el título y el mensaje de la regla no se renderizan para cada nuevo log. En estos casos, los valores renderizados de `{{events_matched}}` y `{{events_matched_per_query.<name_of_the_query>}}` podrían estar por debajo de los valores mostrados en la pestaña de Información general del panel lateral de la señal.

### Enlaces dinámicos

Utiliza variables de plantilla para enlazar dinámicamente con un recurso relacionado con tu investigación.

Por ejemplo, si una señal detecta un inicio de sesión de usuario sospechoso, utiliza `{{@user.id}}` para crear un enlace dinámico a otro recurso:

```
* [Investigate user in the authentication dashboard](https://app.datadoghq.com/example/integration/security-monitoring---authentication-events?tpl_var_username={{@usr.id}})
```

O, si una señal está etiquetada con un servicio específico, utiliza la variable `{{@service}}` para crear un enlace dinámico:

```
* [Investigate service in the services dashboard](https://app.datadoghq.com/example/integration/application-security---service-events?tpl_var_service={{@service}})
```

### Evaluación de valores numéricos

Para las variables de plantilla que devuelven valores numéricos, utiliza `eval` para realizar operaciones matemáticas o cambiar el formato del valor. Para obtener más información, consulta [Evaluación de variables de plantilla][2].

### Epoch

Las variables de plantilla con epoch crean una cadena en lenguaje natural o un número matemático en las notificaciones. Por ejemplo, puedes usar valores como `first_seen`, `last_seen` y `timestamp` (en milisegundos) en una función para recibir una cadena legible en las notificaciones. Por ejemplo:

```
{{eval "first_seen_epoch-15*60*1000"}}
```

Para más información sobre la función `eval`, consulta [Evaluación de variables de plantilla][2].

### Hora local

Utiliza la función `local_time` para añadir otra fecha en tu notificación en la zona horaria de tu elección. Esta función transforma una fecha en su hora local: `{{local_time "time_variable" "timezone"}}`.

Por ejemplo, para añadir la última hora de activación de la señal en la zona horaria de Tokio en tu notificación, incluye lo siguiente en el mensaje de notificación:

```
{{local_time "last_triggered_at" "Asia/Tokyo"}}
```

El resultado se muestra en el formato ISO 8601: `yyyy-MM-dd HH:mm:ss±HH:mm`, por ejemplo, `2021-05-31 23:43:27+09:00`. Consulta la [lista de zonas horarias de la base de datos de TZ][3], concretamente la columna `TZ database name`, para ver la lista de valores de zonas horarias disponibles.

## Variables de atributos

<div class="alert alert-danger">
Las organizaciones de Datadog habilitadas por la HIPAA solo tienen acceso a <a href="#template-variables">Variables de plantilla</a> para las notificaciones de seguridad. No se admiten variables de atributos.
</div>

Utiliza variables de atributo para personalizar las notificaciones de señal con información específica sobre la señal activada. 

Para ver la lista de atributos de eventos de una señal, haz clic en **JSON** en la parte inferior de la pestaña **Overview** (Información general) en el panel lateral de la señal. Utiliza la siguiente sintaxis para añadir estos atributos de evento en tus notificaciones de regla: `{{@attribute}}`. Para acceder a las claves internas de los atributos de evento, utiliza la notación de puntos JSON, por ejemplo, `{{@attribute.inner_key}})`.

Si el JSON de la señal no contiene un atributo que esté presente en el JSON del log relacionado, utiliza la sintaxis descrita anteriormente con el nombre del atributo del JSON del log. Este atributo se incluirá tanto en el JSON de la señal como en las notificaciones de la señal.

A continuación, se muestra un ejemplo de objeto JSON con atributos de evento que pueden asociarse a una señal de seguridad:

{{< tabs >}}
{{% tab "Cloud SIEM" %}}

```json
{
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  },
  "usr": {
    "id": "user@domain.com"
  },
  "evt": {
    "category": "authentication",
    "outcome": "success"
  },
  "used_mfa": "false"
}
```

Si utilizas lo siguiente en la sección **Say what's happening** (Di lo que está pasando):

```
{{@usr.id}} just logged in without MFA from {{@network.client.ip}}.
```
Este es el aspecto del mensaje de notificación:

```
user@domain.com just logged in without MFA from 1.2.3.4.
```

{{% /tab %}}

{{% tab "App and API Protection" %}}

```json
{
  "attributes":{
    "title":"Security scanner detected",
    "http":{
      "url":"http://www.example.com"
    },
    "rule":{
      "detectionMethod":"threshold",
      "name":"Your rule name"
    },
    "events_matched":2,
    "first_seen":"2022-01-26T13:23:33.000Z",
    "last_seen":"2022-01-27T04:01:57.000Z"
  },
  "groupByPaths":[
    "service"
  ]
}
```

Si utilizas lo siguiente en la sección Say what's happening (Di lo que está pasando):

```
Real routes targeted for {{@service}}.
```

La notificación muestra el nombre de servicio en el mensaje de la siguiente manera:

```
Real routes targeted for your_service_name.
```

{{% /tab %}}
{{< /tabs >}}

### Más ejemplos

Utiliza `{{@network.client.ip}}` para mostrar las direcciones IP asociadas a la señal.

Si una regla de seguridad detecta que un usuario inicia sesión desde una dirección IP que se sabe que es maliciosa, utiliza las variables de plantilla `{{@usr.id}}` y `{{@network.client.ip}}` para ver qué usuario y dirección IP desencadena la señal. Por ejemplo:

```
The user {{@usr.id}} just successfully authenticated from {{@network.client.ip}} which is a known malicious IP address.
```
## Variables de etiqueta

Utiliza la siguiente sintaxis para añadir una variable de etiqueta al mensaje de notificación de tu regla: `{{tag_name}}`.

Para las etiquetas que siguen la sintaxis `key:value`, utiliza la variable: `{{key.name}}`. De este modo, se muestra el valor asociado a la clave en el mensaje de notificación. Por ejemplo, si una señal tiene la clave de etiqueta `region`, utiliza la variable `{{region.name}}` en tu mensaje de notificación.

No es necesario utilizar `@` para acceder al valor de etiqueta.

Si una clave de etiqueta incluye un punto, coloca paréntesis alrededor de la clave completa cuando utilices una variable de etiqueta. Por ejemplo, si tu etiqueta es `dot.key.test:five`, utiliza `{{[dot.key.test].name}}`.

### Identificadores dinámicos

Utiliza variables de etiqueta para crear dinámicamente identificadores de notificación y notificaciones de ruta para un equipo específico o servicio basado en la señal de seguridad generada.
Por ejemplo, si una señal tiene una etiqueta `service`, puedes hacer que tus notificaciones se enruten a diferentes canales de Slack basándose en el servicio que falla:
```
@slack-{{service.name}} There is a security issue with {{service.name}}.
```

Por ejemplo, si la señal tiene el `service:ad-server`, la notificación se envía al canal de Slack `#ad-server` con el siguiente contenido:

```
@slack-ad-server There is an ongoing issue with ad-server.
```

## Variables condicionales

Las variables condicionales utilizan la lógica if-else para mostrar un mensaje en función de los detalles de la señal desencadenada. Estas variables pueden utilizarse en el título o en el mensaje de notificación.

Están disponibles las siguientes variables condicionales:

| Variable              | Descripción                                               |
| --------------------- | --------------------------------------------------------- |
| `{{#is_match}}`       | El contexto coincide con la subcadena proporcionada.               |
| `{{^is_match}}`       | El contexto no coincide con la subcadena proporcionada.        |
| `{{#is_exact_match}}` | El contexto coincide exactamente con la cadena proporcionada.          |
| `{{^is_exact_match}}` | El contexto no coincide exactamente con la cadena proporcionada.   |
| `{{#if}}`             | El atributo existe.                                     |

Las variables condicionales deben tener un par de apertura y cierre con el texto y **@-notifications** en medio. Por ejemplo:
```
{{#is_match "<tag_variable>.name" "<comparison_string>"}}
  This displays if <comparison_string> is included in <tag_variable>.
{{/is_match}}
```

### Ejemplos

Utiliza la lógica if-else para ver si un atributo existe::

```
{{#if @network.client.ip}}The attribute IP attribute exists.{{/if}}
```

Utiliza la lógica if-else para ver si un atributo coincide con un valor:

```
{{#is_exact_match "@network.client.ip" "1.2.3.4"}}The ip matched.{{/is_exact_match}}
```

## Información adicional

### Formato sin procesar

Utiliza el formato `{{{{raw}}}}` si tu notificación de señal necesita enviar llaves dobles, como `{{ <TEXT> }}`. Por ejemplo, la sintaxis siguiente:

```
{{{{raw}}}}
{{ <TEXT_1> }} {{ <TEXT_2> }}
{{{{/raw}}}}
```

Salidas:

```
{{ <TEXT_1> }} {{ <TEXT_2> }}
```

Los auxiliares `^|#` utilizados en variables condicionales no pueden utilizarse con el formato `{{{{raw}}}}` y deben eliminarse. Por ejemplo, para mostrar texto sin formato con la variable condicional `{{is_match}}`, utiliza la siguiente plantilla:

```
{{{{is_match "host.name" "<HOST_NAME>"}}}}
{{ .matched }} the host name
{{{{/is_match}}}}
```

Si `host.name` coincide con `<HOST_NAME>`, la plantilla muestra:

```
{{ .matched }} the host name
```

### Codificación URL

Si tu notificación de señal incluye información que debe codificarse en una URL (por ejemplo, para redireccionamientos), utiliza la sintaxis `{{ urlencode "<variable>"}}`.

**Ejemplo**: Si tu mensaje de señal incluye una URL al Catálogo de software filtrado por un servicio específico, utiliza la [variable de etiqueta] `service` (#attribute-and-tag-variables) y añade la sintaxis `{{ urlencode "<variable>"}}` a la URL:

```
https://app.datadoghq.com/services/{{urlencode "service.name"}}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/detection_rules/#creating-and-managing-detection-rules
[2]: /es/monitors/guide/template-variable-evaluation/
[3]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones