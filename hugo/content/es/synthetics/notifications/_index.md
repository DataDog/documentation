---
further_reading:
- link: synthetics/notifications/template_variables
  tag: Documentación
  text: Utiliza variables de plantilla en tus notificaciones de Synthetic Monitoring
- link: synthetics/notifications/conditional_alerting
  tag: Documentación
  text: Utiliza alertas condicionales en tus notificaciones de Synthetic Monitoring
- link: /synthetics/notifications/statuspage/
  tag: Documentación
  text: Aprende a integrar los monitores de Synthetic Monitoring con Statuspage
title: Notificaciones de Synthetic Monitoring
---

## Información general

Personaliza tus alertas en [Synthetic Monitoring][1] para ofrecer a los respondedores de la llamada un contexto significativo. El sistema de plantillas de mensajes de Synthetic Monitoring te permite enriquecer las alertas con detalles de test, extraer datos de los resultados de test y dirigir las notificaciones condicionalmente en función del fallo.

<div class="alert alert-info">Las notificaciones de Synthetic Monitoring no son compatibles con tus <a href="https://docs.datadoghq.com/continuous_testing/">pipelines de Continuous Integration Continuous Delivery de Continuous Testing.</a></div>

Puedes personalizar las notificaciones utilizando:

- **[Contenido prellenado](#pre-filled-monitor-messages)**: Comienza con un punto de partida estructurado.
- **[Variables de plantilla][2]**: Enriquece tus notificaciones con contenido dinámico.
- **[Lógica condicional][3]**: Adapta los mensajes de alerta a los distintos tipos de test y procesos.
- **[Uso avanzado][4]**: Estructura mensajes complejos utilizando plantillas de manillar.
- **[Visualización de notificaciones personalizadas](#display-custom-notifications-massage)**: Muestra solo tu mensaje personalizado sin contenido enriquecido predeterminado.
- **[Notificaciones simuladas](#simulate-notifications)**: Test tus mensajes de notificación mediante el envío de notificaciones simuladas.

**Nota**: Para obtener información sobre el acceso a variables locales (configuración), consulta la sección [Variables][6].

## Mensajes de monitores (noun) prellenados 

Synthetic Monitoring proporciona mensajes prellenados con metadatos como:

- Nombre del test
- Identificador del monitor (noun)
- Ubicaciones fallidas
- Información sobre la última ejecución fallida de test 
- Es hora de que test empiece a fallar

Estos valores aparecen en forma predeterminada en la mayoría de los canales de notificación. Puedes sustituir o ampliar el mensaje con [plantillas][2].

   {{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Sección de monitores (noun) de Synthetic Monitoring, en la que se resaltan mensajes de monitores (noun) prellenados" style="width:100%;" >}}

**Ejemplos**:

{{< tabs >}}
{{% tab "Respuesta de solicitud de API" %}}

**Solicitud:**
```handlebars
{{#with synthetics.attributes.result.request}}
We made a {{method}} request to `{{{url}}}`{{#if headers}} with the following headers:

{{#each headers}}
{{@key}}={{this}}
{{/each}}

{{/if}}
{{#if body}}And the body:

{{{body}}}

{{/if}}
{{/with}}
```

**Respuesta:**
```handlebars
{{#with synthetics.attributes.result.response}}
We received an HTTP {{httpVersion}} response with a {{statusCode}} status code{{#if headers}} with the following headers:

{{#each headers}}
{{@key}}={{this}}
{{/each}}

{{/if}}
{{#if redirects}}
Redirections:
{{#each redirects}}
* {{statusCode}} redirect to `{{{location}}}`
{{/each}}
{{/if}}
The body's size was {{eval "humanize_bytes(bodySize)"}}{{#if body}} and contained:

{{{body}}}

{{/if}}
{{/with}}
```

{{% /tab %}}
{{% tab "Tests de WebSocket" %}}

```handlebars
{{! Websocket request and response details }}
{{#with synthetics.attributes.result}}
{{#if handshake }}
The handshake received a response with the {{handshake.response.statusCode}} status code.
{{/if}}
{{#if request}}
A WebSocket request was made with the message:

{{{request.message}}}

{{/if}}
{{#if response}}
and the response closed with status code {{response.close.statusCode}} and reason `{{response.close.reason}}`
{{#if response.message}}, containing the message:

{{{response.message}}}

{{else}}.{{/if}}
{{/if}}
{{/with}}
```

{{% /tab %}}
{{% tab "Variables de tests de la API" %}}

Itera sobre las variables extraídas para los tests de la API:

**Variables de configuración:**
```handlebars
{{#each synthetics.attributes.result.variables.config}}
* **Name:** {{name}}
  Type: {{type}}
  Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}{{value}}{{/if}}
{{/each}}
```

**Variables extraídas (solo visibles para notificaciones de recuperación):**
```handlebars
{{#each synthetics.attributes.result.variables.extracted}}
* **Name:** {{name}}
  Global Variable ID: {{id}}
  Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}{{val}}{{/if}}
{{/each}}
```

{{% /tab %}}
{{% tab "Variables de varios pasos de la API" %}}

Itera sobre pasos extrayendo variables para tests de varios pasos de la API:

```handlebars
{{! List extracted variables across all successful steps }}
# Extracted Variables
{{#each synthetics.attributes.result.steps}}
  {{#each variables.extracted}}
  * **Name**: `{{name}}`
    Value: {{#if secure}}*Obfuscated (value hidden)*{{else}}`{{{val}}}`{{/if}}
  {{/each}}
{{/each}}
```

{{% /tab %}}
{{% tab "Variables de tests del navegador y móviles" %}}

Itera sobre los pasos extrayendo variables para tests del navegador y móvil:

```handlebars
{{#each synthetics.attributes.result.steps}}
  {{#if extractedValue}}
  * **Name**: {{extractedValue.name}}
    **Value:** {{#if extractedValue.secure}}*Obfuscated (value hidden)*{{else}}{{extractedValue.value}}{{/if}}
  {{/if}}
{{/each}}
```

{{% /tab %}}
{{< /tabs >}}

## Mostrar un mensaje de notificación personalizado

Las notificaciones de Synthetic Monitoring admiten la posibilidad de mostrar **solo el mensaje de notificación personalizado** en las notificaciones de alertas, ocultando todo el contenido enriquecido predeterminado, como los detalles de la consulta, las etiquetas, las capturas de pantalla y los pies de página.

En forma predeterminada, todos los monitores incluyen detalles enriquecidos en el mensaje de alerta. Esto puede incluir:
- Metadatos de tests
- Información de step (UI) / paso (generic) fallido
- Capturas de pantalla
- Etiquetas
- Enlaces a los recursos de Datadog 

### Notificaciones prestablecidas

Puedes seleccionar entre las siguientes opciones para ocultar o mostrar la información pertinente para ti:

| Prestablecido            | Descripción                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| `show_all`        | (Predeterminado) Incluye todos los datos y metadatos enriquecidos.                          |                                |
| `hide_handles`    | Oculta los controladores de `@notification` (por ejemplo, `@slack-channel`).                         |
| `hide_all`        | Oculta todo el contenido adicional, excepto el mensaje personalizado y el enlace al evento.  |

{{< img src="/monitors/monitor_types/synthetic_monitoring/content_in_notification.png" alt="Page (página) de monitor (noun) de Synthetic Monitoring, que destaca el contenido mostrado en la notificación desplegable" style="width:80%;" >}}

### Ejemplo

| Canal | `show_all`  | `hide_all` |
|---------|--------------------|---------------------|
| Correo electrónico   | Información del detalle completo de test, captura de pantalla, step (UI) / paso (generic) | Solo mensaje personalizado y enlace al evento |
| Slack   | Contenido enriquecido + vista previa de la ejecución fallida | Solo mensaje personalizado |

Consulta [Notificaciones de monitor (noun)][5] para obtener más información.

## Notificaciones simuladas

Puedes test tus mensajes de notificación enviando notificaciones simuladas. Para ello:

1. Añade un controlador de notificación a tu mensaje de monitor (noun) 
2. Haz clic en el botón **Notificaciones simuladas**:

  {{< img src="/synthetics/notifications/simulate_notifications.png" alt="Pantalla de Synthetic Monitoring, que resalta el botón de Notificaciones simuladas" style="width:80%;" >}}

3. Selecciona el tipo de notificación que deseas test y haz clic en **Send** (Enviar):

   {{< img src="/synthetics/notifications/simulate_notifications_type.png" alt="Envía una notificación que simula una falla o recuperación de test." style="width:80%;" >}}

Las notificaciones simuladas incluyen **[TEST]** en sus líneas del asunto y utilizan un nombre de monitor (noun) predeterminado cuando sea necesario.

**Ejemplos:**

<table style="width:100%; border:none;">
<tr>
<td style="width:50%; text-align:center; border:none; padding:10px;">
{{< img src="/synthetics/notifications/simulated_notifications_email.png" alt="Notificación por correo electrónico que simula una falla del test." style= "width:100%;" >}}
</td>
<td style="width:50%; text-align:center; border:none; padding:10px;">
{{< img src="/synthetics/notifications/simulated_notifications_email_recovered.png" alt="Notificación por correo electrónico que simula una recuperación del test." style= "width:100%;" >}}
</td>
</tr>
</table>

**Notas importantes sobre las notificaciones simuladas:**

- Los resultados de tests utilizados en las simulaciones son datos de muestra estandarizados, no resultados reales de tu configuración específica del test.
- Los resultados varían en función del tipo de test, el subtipo (para tests de la API) y el tipo de notificación:
  - **Notificaciones de alerta**: Datos de fallos simulados
  - **Notificaciones de recuperación**: Datos de éxito simulados
- Todos los usuarios reciben los mismos datos simulados, independientemente de su configuración del test.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/synthetic_monitoring/
[2]: /es/synthetics/notifications/template_variables
[3]: /es/synthetics/notifications/conditional_alerting
[4]: /es/synthetics/notifications/advanced_notifications
[5]: /es/monitors/notifications
[6]: /es/synthetics/notifications/template_variables/?tab=testinfo#variables