---
author: Trevor Veralrud
further_reading:
- link: /integrations/webhooks/
  tag: Documentación
  text: Integración de webhooks
title: Tickets en Freshservice utilizando webhooks
---

Esta guía te muestra cómo utilizar la integración de webhooks de Datadog para abrir nuevos tickets en Freshservice cuando un monitor envía alertas.

## Configuración

Para empezar, abre el [cuadro de la integración de webhooks][1], ve a la pestaña Configuración y desplázate hasta el formulario inferior para añadir un nuevo webhook.

### Nombre

Proporciona un nombre a tu webhook. Este nombre se utiliza en tu mensaje de monitor (consulta [Uso](#usage)) con `@webhook-<NAME>`. Por ejemplo, si nombras a tu webhook Freshservice, puedes abrir un ticket desde tu monitor mencionando `@webhook-freshservice` en el mensaje de monitor.

### URL

Freshservice tiene 2 versiones de API diferentes. Esta guía utiliza la versión 2, pero es posible utilizar la versión 1 con ligeras modificaciones en tu carga útil JSON.

En el campo URL introduce el siguiente endpoint:

`https://<YOUR_DOMAIN>.freshservice.com/api/v2/tickets`

### Carga útil

Introduce una nueva carga útil JSON del ticket. El siguiente ejemplo utiliza sólo los campos obligatorios, así que consulta el [endpoint del ticket de Freshservice][2] para obtener más opciones de personalización de tu carga útil:

```json
{
  "email": "[email address to associate with ticket]",
  "subject": "$EVENT_TITLE",
  "description": "<img src=\"$SNAPSHOT\" /><hr/>$TEXT_ONLY_MSG",
  "status": 2,
  "priority": 2
}
```

**Nota**:

* Valores como `$EVENT_TITLE` son variables utilizadas por la integración de webhooks. Para obtener una lista de estas variables y su significado, consulta el cuadro de la integración del webhook o la [documentación de la integración de webhooks][3].
* Introduce manualmente una dirección de correo electrónico para el campo de correo electrónico, en lugar de utilizar la variable de `$EMAIL`, que sólo se rellena cuando se menciona el webhook en un comentario del *Flujo (stream) de eventos* y no se utiliza dentro de las *Alertas de monitor*.
* El campo `description` de la carga útil acepta HTML. La variable `$EVENT_MSG` representa tu mensaje de monitor en Markdown, que no es compatible con la API Freshservice, por lo que `$TEXT_ONLY_MSG` se utiliza en su lugar, junto con un snapshot del gráfico.
* Los campos `status` y `priority` son números asignados a diferentes valores. Para ver estos valores, consulta el [endpoint del ticket de Freshservice][2].

### Autenticación

La API Freshservice utiliza la [Autenticación de acceso básica][4]. Tus credenciales codificadas en Base64 deben enviarse en la cabecera de la solicitud de `Authorization`. Las credenciales aceptadas son tu nombre de usuario y tu contraseña en formato `username:password` o tu clave de API Freshservice.

Para configurar esto en tu webhook, añade lo siguiente a tu sección **Headers** (Cabeceras):

```json
{"Authorization": "Basic <BASE64_ENCODED_CREDENTIALS>"}
```

### Para terminar

En el cuadro de la integración de webhooks, haz clic en **Install Integration** (Instalar integración) o en **Update Configuration** (Actualizar Configuración) (si has introducido previamente una definición de webhook) para guardar los cambios.

## Uso

Añade el `@webhook-<NAME>` a tu mensaje de monitor. El webhook se activa cuando el monitor cambia de estado.

Se recomienda añadir tu @-mención dentro de `{{#is_alert}}` o `{{#is_warning}}` condicionales, por ejemplo:

```text
{{#is_alert}}
    {{host.name}} is down!
    @webhook-freshservice
{{/is_alert}}
```

Cuando tu monitor activa una alerta, aparece un nuevo ticket en tu dashboard de Freshservice. Si decides no utilizar una sentencia condicional, se crea un nuevo ticket cuando el monitor se recupera, ya que el webhook se activa nuevamente.

## Limitaciones

### Creación de tickets

La integración de webhooks sólo puede crear tickets. La actualización de un ticket existente requiere un método `PUT` y la integración de webhooks sólo admite métodos `POST`.

### Estado y prioridad

Las variables `$ALERT_STATUS` y `$PRIORITY` devuelven cadenas (como `ALERT` y `NORMAL`), en lugar de un valor numérico esperado por la API Freshservice. Para configurar diferentes niveles de estado y prioridades, crea webhooks duplicados con campos de estado y prioridad codificados. Luego, `@-mention` esos webhooks dentro de sentencias condicionales relacionadas, por ejemplo:

```text
{{#is_warning}}
    El uso de espacio en el disco es superior al 80%
    @webhook-freshservice-warning
{{/is_warning}}
{{#is_alert}}
    El uso de espacio en el disco es inferior al 95%
    @webhook-freshservice-alert
{{/is_alert}}
```

### Etiquetado

El etiquetado es compatible con la API Freshservice, pero ten en cuenta lo siguiente:

* El parámetro de etiquetas (tags) de tu carga útil JSON debe ser una matriz. Esto significa que no puedes utilizar la variable de webhook `$TAGS`, ya que devuelve una lista de cadenas separada por comas.
* Las etiquetas añadidas a tu carga útil JSON no deben contener un carácter `:`, por lo que es posible que no puedas asignar todas tus etiquetas de Datadog a Freshservice. Si existe un carácter `:` en tus etiquetas, tu solicitud fallará.
* Para conocer más variables que pueden ser útiles para etiquetas de Freshservice, consulta la [documentación de la integración de webhooks][3]. En el siguiente ejemplo, se utilizan `$HOSTNAME` y `$ORG_ID`:

```json
{
  "email": "<EMAIL_ADDRESS_TO_ASSOCIATE_WITH_TICKET>",
  "subject": "$EVENT_TITLE",
  "description": "<img src=\"$SNAPSHOT\" /><hr/>$TEXT_ONLY_MSG",
  "status": 2,
  "priority": 2,
  "tags": ["$HOSTNAME", "$ORG_ID"]
}
```

### Solucionar problemas

Si tus webhooks no se envían después de la activación de tu monitor, ve a tu flujo de eventos y busca `sources:webhooks` `status:error`. Esta acción busca eventos con webhooks fallidos que contengan información sobre la resolución de problemas, por ejemplo:

``text
- El código de estado de respuesta fue: HTTP 401
- El contenido de la respuesta fue:
  {"code":"invalid_credentials","message":"You have to be logged in to perform this action."}
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/webhooks
[2]: https://api.freshservice.com/v2/#create_ticket
[3]: /es/integrations/webhooks/#usage
[4]: https://en.wikipedia.org/wiki/Basic_access_authentication