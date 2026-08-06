---
aliases:
- /es/developers/events/email/
- /es/guides/eventsemail
- /es/events/guides/email
title: Eventos con el correo electrónico
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Los eventos con correo electrónico no son compatibles con {{< region-param key=dd_datacenter code="true" >}}</div>
{{< /site-region >}}

Si tu aplicación no cuenta con una [integración de Datadog][1] existente, y no quieres crear un [check del Agent personalizado][2], puedes enviar eventos con el correo electrónico. Esto también se puede realizar con mensajes publicados en un tema de Amazon SNS. Lee la guía sobre cómo [Crear eventos de Datadog a partir de correos electrónicos de Amazon SNS][6] para obtener más información.

## Configuración

Antes de poder enviar eventos con el correo electrónico, necesitas una dirección de correo electrónico dedicada de Datadog:

1. Inicia sesión en tu [cuenta de Datadog][3].
2. En el menú **Account** (Cuenta) de la parte inferior izquierda, selecciona **Organization Settings** (Parámetros de la organización).
3. Haz clic en la pestaña **Events API emails** (Correos electrónicos de la API de eventos).
4. Elige el formato de tus mensajes (`Plain text` o `JSON`) en el menú desplegable **Format** (Formato).
5. Opcionalmente, define cualquiera de los otros atributos mencionados en la [sección de definiciones de atributos](#attribute-definitions) de esta página.
6. Haz clic en el botón **Create Email** (Crear correo electrónico).

En la sección **Events API emails** (Correos electrónicos de la API de eventos) se muestran todos los correos electrónicos disponibles para tus aplicaciones y quién los ha creado.

### Definiciones de atributos

| Nombre | Descripción | Ejemplo |
|---|---|---|
| Descripción | Descripción del objetivo del correo electrónico. | "Utilizado para notificaciones MyService" |
| Etiquetas (tags) | Lista de etiquetas que se añadirán a cada evento recibido a través del correo electrónico. Si hay otras etiquetas en el mensaje JSON, se añadirán todas.<br>Hay un límite de **20** etiquetas por correo electrónico. | `tag1:val1`, `tag2:val2` |
| Destinatarios | Lista de identificadores que se añadirán al principio del mensaje de todos los eventos creados a través del correo electrónico, sin el prefijo `@`. Para obtener más información, consulta [Destinatarios de notificaciones][7].<br>Hay un límite de **10** destinatarios por correo electrónico. | `my@email.com`, `slack-acc-ch` |
| Tipo de alerta | Tipo de alerta para eventos creados a partir del correo electrónico de eventos. Cuando está presente, el campo `alertType` de un correo electrónico JSON tiene prioridad sobre cualquier otro valor `alertType`. | `Info` |

## Envío

Hay dos formas diferentes de enviar eventos con el correo electrónico:

{{< tabs >}}
{{% tab "JSON" %}}

Si tienes control total sobre el correo electrónico que envía una aplicación, puedes configurar un mensaje con formato JSON. Este formato te permite configurar todo en el evento que aparece en Datadog.

### Correo electrónico de origen {#source-email-1}

Con un correo electrónico con formato JSON, se pueden controlar los siguientes campos:

* Dirección de correo electrónico del remitente
* Todos los argumentos de la [API de eventos de Datadog][1]

**Nota**: Si tu JSON no tiene el formato adecuado, o el correo electrónico se envía sin asunto, el evento no se muestra en tu flujo (stream) de eventos.

### Evento de Datadog {#datadog-event-1}

En un correo electrónico con formato JSON, el asunto del correo electrónico no aparece en el evento. El valor del atributo title (título) se utiliza para el título del evento. Todos los datos que aparecen en el evento se deben definir en JSON en el cuerpo del correo electrónico. Además, el cuerpo debe ser JSON puro y tener el formato adecuado; de lo contrario, se ignorará el mensaje. Evento de ejemplo enviado con JSON:

{{< img src="developers/events/json-event.png" alt="Evento de JSON" >}}

**Nota**: Si estás probando el correo electrónico con un cliente de correo electrónico estándar, es posible que el cuerpo se convierta a HTML. Esto hace que el cuerpo ya no sea JSON puro, lo que resulta en que se ignore el correo electrónico.

[1]: /es/api/v1/events/
{{% /tab %}}
{{% tab "Texto sin formato" %}}

Si tienes poco control sobre los correos electrónicos que envía una aplicación, utiliza un mensaje con texto sin formato.

### Correo electrónico de origen {#source-email-2}

Con un correo electrónico con texto sin formato, los siguientes campos son controlables:

| Campo                | Obligatorio | Descripción                     |
|----------------------|----------|---------------------------------|
| Dirección de correo electrónico del remitente | Sí      | La dirección de correo electrónico del remitente |
| Asunto              | Sí      | El asunto del correo electrónico        |
| Cuerpo                 | Sí      | El cuerpo del correo electrónico           |

Por ejemplo, el siguiente correo electrónico es un envío válido:

```text
Sender's email: matt@datadog.com
Subject: Env:Test - System at 50% CPU - #test
Body: This is a test message showing that env:test is at 50% CPU - #test
```

### Procesamiento del cuerpo del correo electrónico {#email-body-2}
El cuerpo del correo electrónico pasa por varios pasos de limpieza para mejorar la legibilidad y la seguridad. Los cambios previstos incluyen:

- **HTML a Markdown**: El contenido HTML se convierte a su Markdown equivalente.
- **Sanitización HTML**: Por motivos de seguridad, los cuerpos de los correos electrónicos se sanitizan, permitiendo solo etiquetas HTML específicas: `a`, `br`, `code`, `div`, `em`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `hr`, `iframe`, `img`,
`li`, `ol`, `p`, `pre`, `tramo (span)`, `strong`, `ul`. Cualquier otra etiqueta HTML, incluyendo las cadenas encerradas entre `<>`, se elimina.
- **Eliminar el contenido de respuestas/reenvíos**: Solo se conserva el correo electrónico más reciente de una conversación, y se eliminan las respuestas y los reenvíos más antiguos.

### Evento de Datadog {#datadog-event-2}

El asunto del correo electrónico se convierte en el título del evento y el cuerpo del correo electrónico se convierte en el mensaje del evento. El remitente del correo electrónico aparece en la parte inferior del evento. Se puede añadir etiquetas utilizando `#` en el cuerpo del mensaje. Ejemplo de evento enviado con texto sin formato:

{{< img src="developers/events/plain-event.png" alt="Evento de texto sin formato" >}}

{{% /tab %}}
{{< /tabs >}}

### Markdown

El texto del evento de Datadog es compatible con [Markdown][5], pero en Markdown no se admite la incrustación de HTML. Para utilizar Markdown en el texto del evento, inicia el bloque de texto con `%%% \n` y termínalo con `\n %%%`:

```json
{
  "title": "Did you hear the news today?",
  "text": "%%% \n [an example link](http://example.com/session_id \"Title\") \n %%%",
  "priority": "normal",
  "tags": ["environment:test"],
  "alert_type": "info"
}
```

Si incrustas un enlace en un bloque Markdown, asegúrate de que la URL está codificada correctamente:

```text
# Not encoded
http://example.com/session_id:123456

# Encoded
http://example.com/session_id%3A123456
```

### Tamaño del correo electrónico
El tamaño máximo permitido de un correo electrónico, incluyendo el contenido y los archivos adjuntos, es de 20 MB. Los correos electrónicos que superan este límite se ignoran.

### Seguimiento de la utilización
Para saber qué correos electrónicos se utilizan y reciben eventos, consulta la columna `Last Used` en la pestaña **Correos electrónicos de API de eventos** en los parámetros de la organización. Se muestra la fecha más reciente en la que se procesó un correo electrónico para cada dirección, o `No data`, si no hay registros de que se haya utilizado.

[1]: /es/integrations/
[2]: /es/agent/agent_checks/
[3]: https://app.datadoghq.com
[5]: http://daringfireball.net/projects/markdown/syntax#lin
[6]: /es/integrations/guide/events-from-sns-emails/
[7]: /es/monitors/notify/#notification-recipients