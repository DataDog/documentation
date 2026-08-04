---
aliases:
- /es/developers/events/email/
- /es/guides/eventsemail
- /es/service_management/events/guides/email/
title: Eventos con correo electrónico
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Eventos con correo electrónico no es compatible con {{< region-param key=dd_datacenter code="true" >}}</div>
{{< /site-region >}}

Si su aplicación no cuenta con una [integración de Datadog][1] existente y no desea crear un custom Agent check [2], puede enviar eventos con correo electrónico. Esto también se puede hacer con mensajes publicados en un tema de Amazon SNS; lea la guía [Crear eventos de Datadog a partir de correos electrónicos de Amazon SNS][6] para obtener más información.

## Configuración {#setup}

Antes de que pueda enviar eventos con correo electrónico, necesita una dirección de correo electrónico dedicada de Datadog:

1. Inicie sesión en su [cuenta de Datadog][3].
2. Desde el menú {{< ui >}}Account{{< /ui >}} en la parte inferior izquierda, seleccione {{< ui >}}Organization Settings{{< /ui >}}.
3. Haga clic en la pestaña {{< ui >}}Events API emails{{< /ui >}}.
4. Elija el formato para sus mensajes desde el menú desplegable {{< ui >}}Format{{< /ui >}} (`Plain text` o `JSON v2`).
5. Opcionalmente, defina cualquiera de los otros atributos enumerados en la sección de [definiciones de atributos](#attribute-definitions) de esta página.
6. Haga clic en el botón {{< ui >}}Create Email{{< /ui >}}.

La sección {{< ui >}}Events API emails{{< /ui >}} muestra todos los correos electrónicos disponibles para sus aplicaciones y quién los creó.

### Definiciones de atributos {#attribute-definitions}

| Nombre | Descripción | Ejemplo |
|---|---|---|
| Descripción | Una descripción del propósito del correo electrónico. | "Utilizado para notificaciones de MyService" |
| Etiquetas | Lista de etiquetas que se añadirán a cada evento recibido a través del correo electrónico. Si hay otras etiquetas presentes en el mensaje JSON, todas se agregan.<br>Existe un límite de **20** etiquetas por correo electrónico. | `tag1:val1`, `tag2:val2` |
| Destinatarios | Lista de identificadores que se agregarán al principio del mensaje para todos los eventos creados a través del correo electrónico, sin el prefijo `@`. Para obtener más información, consulte [Destinatarios de notificaciones][7].<br>Existe un límite de **10** destinatarios por correo electrónico. | `my@email.com`, `slack-acc-ch` |
| Tipo de alerta | Para las direcciones con formato {{< ui >}}Plain text{{< /ui >}} y {{< ui >}}JSON{{< /ui >}}, establece el tipo de alerta para los eventos. Cuando está presente, el campo `alert_type` en un correo electrónico JSON tiene prioridad sobre esta configuración. **No compatible con JSON v2**: en su lugar, establezca la categoría y los campos relacionados en el cuerpo del JSON del correo electrónico. | `Info` |

## Envío {#submission}

Hay tres formas de enviar eventos por correo electrónico, descritas en las pestañas a continuación ({{< ui >}}JSON{{< /ui >}}, {{< ui >}}Plain text{{< /ui >}} y {{< ui >}}JSON v2{{< /ui >}}). El formato `JSON` está obsoleto para nuevas direcciones de correo electrónico de eventos; no puede crear nuevas direcciones con ese formato, pero las direcciones `JSON` existentes seguirán funcionando. Para aplicaciones nuevas que envían correos electrónicos con formato JSON, use `JSON v2`.

{{< tabs >}}
{{% tab "JSON" %}}

Si tiene control total sobre el correo electrónico enviado por una aplicación, puede enviar un mensaje con formato JSON. El cuerpo del correo electrónico debe seguir la estructura JSON para [**Events API v1**][1] (`POST /api/v1/events`). Seleccione la versión de la API indicada en {{< ui >}}v1{{< /ui >}} para ver los campos del cuerpo de la solicitud. El JSON en el cuerpo del correo electrónico establece los campos de evento que se muestran en Datadog.

### Correo electrónico de origen {#source-email-1}

Con un correo electrónico en formato `JSON`, se pueden controlar los siguientes campos:

* La dirección de correo electrónico del remitente
* Todos los campos admitidos por [**Events API v1**][1] (por ejemplo, `title`, `text`, `tags` y `alert_type`)

**Nota**: Si su JSON no tiene el formato correcto, o si el correo electrónico se envía sin asunto, el evento no aparecerá en su flujo de eventos.

### Evento de Datadog {#datadog-event-1}

En un correo electrónico con formato `JSON`, el asunto del correo electrónico no aparece en el evento. El valor del atributo de título se utiliza para el título del evento. Todos los datos que aparecen en el evento deben definirse en JSON en el cuerpo del correo electrónico. Además, el cuerpo debe ser JSON puro y bien formado; de lo contrario, el mensaje se ignora. Ejemplo de evento enviado con JSON:

{{< img src="extend/events/json-event.png" alt="evento json" >}}

**Nota**: Si está probando el correo electrónico con un cliente de correo electrónico estándar, es posible que el cuerpo se convierta a HTML. Esto hace que el cuerpo ya no sea JSON puro, lo que resulta en un correo electrónico ignorado.

[1]: /es/api/latest/events/#post-an-event
{{% /tab %}}
{{% tab "Texto sin formato" %}}

Si tiene poco control sobre el correo electrónico enviado por una aplicación, utilice un mensaje con formato de texto sin formato.

### Correo electrónico de origen {#source-email-2}

Con un correo electrónico con formato de texto sin formato, los siguientes campos son controlables:

| Campo                | Requerido | Descripción                     |
|----------------------|----------|---------------------------------|
| Dirección de correo electrónico del remitente | Sí      | La dirección de correo electrónico del remitente |
| Asunto              | Sí      | El asunto del correo electrónico        |
| Cuerpo                 | Sí      | El cuerpo del correo electrónico           |

Por ejemplo, el correo electrónico a continuación es un envío válido:

```text
Sender's email: matt@datadog.com
Subject: Env:Test - System at 50% CPU - #test
Body: This is a test message showing that env:test is at 50% CPU - #test
```

### Procesamiento del cuerpo del correo electrónico {#email-body-2}
El cuerpo del correo electrónico pasa por varios pasos de limpieza para mejorar la legibilidad y la seguridad. Los cambios esperados incluyen:

- **HTML a Markdown**: El contenido HTML se convierte a su equivalente en markdown.
- **Higienización de HTML**: Por seguridad, los cuerpos de los correos electrónicos se higienizan, permitiendo solo etiquetas HTML específicas: `a`, `br`, `caption`, `code`, `div`, `em`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `hr`, `iframe`, `img`, `li`, `ol`, `p`, `pre`, `span`, `strong`, `table`, `tbody`, `td`, `tfoot`, `th`, `thead`, `tr`, `ul`. Cualquier otra etiqueta HTML, incluidas las cadenas encerradas en `<>`, se eliminan.
- **Eliminar contenido de respuesta/reenvío**: Solo se conserva el correo electrónico más reciente en un hilo, eliminando las respuestas y reenvíos más antiguos.

### Evento de Datadog {#datadog-event-2}

El asunto del correo electrónico se convierte en el título del evento y el cuerpo del correo electrónico se convierte en el mensaje del evento. El remitente del correo electrónico aparece en la parte inferior del evento. Puede agregar etiquetas usando `#` en el cuerpo del mensaje.

Datadog trunca los valores que exceden estos límites de campo predeterminados:

| Campo   | Máximo         |
|---------|-----------------|
| Título   | 300 caracteres  |
| Mensaje | 4000 caracteres |
| Etiquetas    | 200 etiquetas        |

Ejemplo de evento enviado con texto sin formato:

{{< img src="extend/events/plain-event.png" alt="evento sin formato" >}}

{{% /tab %}}
{{% tab "JSON v2" %}}

Si tiene control total sobre el correo electrónico enviado por una aplicación, puede enviar un mensaje con formato JSON. El cuerpo del correo electrónico debe seguir la estructura JSON para [**Events API v2**][1] (`POST /api/v2/events`). El JSON en el cuerpo del correo electrónico establece los campos de evento que se muestran en Datadog.

### Correo electrónico de origen {#source-email-json-v2}

Con un correo electrónico en formato `JSON v2`, los siguientes campos son controlables:

* La dirección de correo electrónico del remitente
* Todos los campos admitidos por [**Events API v2**][1] (por ejemplo `data.attributes.title`, `data.attributes.message`, `data.attributes.tags`, `data.attributes.category`)

Ejemplo de cuerpo de correo electrónico para un evento de alerta. Los eventos de cambio e información utilizan campos diferentes bajo `data.attributes.attributes`; consulte la referencia de la API para esas categorías.

```json
{
  "data": {
    "attributes": {
      "category": "alert",
      "title": "CPU threshold exceeded",
      "message": "Host prod-web-01 averaged 92% CPU for five minutes.",
      "tags": [
        "env:production",
        "region:us-east"
      ],
      "integration_id": "custom-events",
      "attributes": {
        "status": "error",
        "priority": "3"
      }
    },
    "type": "event"
  }
}
```

**Nota**: Si su JSON no tiene el formato correcto, o el correo electrónico se envía sin asunto, el evento no aparece en su flujo de eventos.

### Evento de Datadog {#datadog-event-json-v2}

En un correo electrónico con formato `JSON v2`, el asunto del correo electrónico no aparece en el evento. El valor del campo title en el cuerpo JSON se utiliza para el título del evento. Todos los datos que aparecen en el evento deben definirse en JSON en el cuerpo del correo electrónico. Además, el cuerpo debe ser JSON puro y bien formado; de lo contrario, el mensaje se ignora.

**Nota**: Si está probando el correo electrónico con un cliente de correo electrónico estándar, es posible que el cuerpo se convierta a HTML. Esto hace que el cuerpo ya no sea JSON puro, lo que resulta en un correo electrónico ignorado.

[1]: /es/api/latest/events/#post-an-event
{{% /tab %}}
{{< /tabs >}}

### Markdown {#markdown}

El texto del evento de Datadog admite [Markdown][5], pero no se admite la incrustación de HTML en Markdown. Para usar Markdown en el texto del evento, comience el bloque de texto con `%%% \n` y finalice el bloque de texto con `\n %%%`:

```json
{
  "title": "Did you hear the news today?",
  "text": "%%% \n [an example link](http://example.com/session_id \"Title\") \n %%%",
  "priority": "normal",
  "tags": ["environment:test"],
  "alert_type": "info"
}
```

Si está incrustando un enlace en un bloque de Markdown, asegúrese de que la URL esté codificada correctamente:

```text
# Not encoded
http://example.com/session_id:123456

# Encoded
http://example.com/session_id%3A123456
```

### Tamaño del correo electrónico {#email-size}
El tamaño máximo permitido del correo electrónico, incluyendo contenido y archivos adjuntos, es de 20 MB. Los correos electrónicos que exceden este límite son ignorados.

### Seguimiento de uso {#usage-tracking}
Para entender qué correos electrónicos se están utilizando y recibiendo eventos, revise la columna {{< ui >}}Last Used{{< /ui >}} en la pestaña {{< ui >}}Events API Emails{{< /ui >}} en la configuración de la organización. Esto muestra la fecha más reciente en que se procesó un correo electrónico para cada dirección, o {{< ui >}}No data{{< /ui >}} si no hay registros de que se haya utilizado.

[1]: /es/integrations/
[2]: /es/agent/agent_checks/
[3]: https://app.datadoghq.com
[5]: http://daringfireball.net/projects/markdown/syntax#lin
[6]: /es/integrations/guide/events-from-sns-emails/
[7]: /es/monitors/notify/#notification-recipients