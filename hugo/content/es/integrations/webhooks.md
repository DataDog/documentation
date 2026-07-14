---
categories:
- developer tools
- notifications
custom_kind: integración
dependencies: []
description: Utiliza cualquier webhook como canal de notificación en alertas y eventos
  de Datadog.
doc_link: https://docs.datadoghq.com/integrations/webhooks/
draft: false
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/webhook
  tag: Terraform
  text: Crear y gestionar webhooks con Terraform
git_integration_title: webhooks
has_logo: true
integration_id: ''
integration_title: Webhooks
integration_version: ''
is_public: true
manifest_version: '1.0'
name: webhooks
public_title: Integración de webhooks en Datadog.
short_description: Utiliza cualquier webhook como canal de notificación en alertas
  y eventos de Datadog.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Información general

Los webhooks te permiten:

-   Conectarte a tus servicios.
-   Alertar a tus servicios cuando se activa una alerta de métrica.

## Configuración

Ve al [cuadro de la integración de webhooks][1] e introduce la URL y el nombre del webhook que quieres utilizar.

## Uso

Para utilizar tu webhook, añade `@webhook-<WEBHOOK_NAME>` en el texto de la alerta de métrica que quieras que active el webhook. Esto activa una solicitud POST a la URL que definas con el siguiente contenido en formato JSON.

Datadog sólo realiza un reintento si se produce un error interno (mensaje de notificación mal formado) o si Datadog recibe una respuesta 5XX del endpoint del webhook. El tiempo de espera para cualquier solicitud individual es de 15 segundos y las conexiones perdidas se reintentan 5 veces.

**Notas**: 

- Los encabezados personalizados deben estar en formato JSON. Para añadir tus propios campos personalizados a la solicitud, también puedes especificar tu propia carga útil en el campo Payload (Carga útil). Si quieres que tu carga útil esté codificada como URL, selecciona la casilla **Encode as form** (Codificar como formulario) y especifica tu carga útil en formato JSON. Utiliza las variables de la sección siguiente.
- Datadog no envía notificaciones de seguridad a través de webhooks debido a las restricciones de la HIPAA. En tus notificaciones de Datadog, si haces referencia a cualquier debilidad de seguridad en **Finding** (Búsqueda) o a cualquier producto de seguridad en **Signals** (Señales), no puedes utilizar `@webhook...` en la configuración **Notify the following recipients** (Notificar a los siguientes destinatarios). Las alertas de seguridad no serán enviadas al webhook para cuentas en conformidad con la HIPAA. Si deseas que se envíen estas alertas, ponte en contacto con tu equipo de cuentas de Datadog para solicitar una excepción.

### Variables

$AGGREG_KEY
: ID para agregar eventos que deben estar juntos.<br />
**Ejemplo**: `9bd4ac313a4d1e8fae2482df7b77628`

$ALERT_CYCLE_KEY
: ID para vincular eventos desde que se activa una alerta hasta que se resuelve.

$ALERT_ID
: ID del monitor que emite alertas.<br />
**Ejemplo**: `1234`

$ALERT_METRIC
: Nombre de la métrica si se trata de una alerta.<br />
**Ejemplo**: `system.load.1`

$ALERT_PRIORITY
: Prioridad del monitor que emite alertas.<br />
**Ejemplo**: `P1`, `P2`

$ALERT_QUERY
: Consulta del monitor que activó el webhook.

$ALERT_SCOPE
: Lista de etiquetas (tags) separada por comas que activa la alerta.<br />
**Ejemplo**: `availability-zone:us-east-1a, role:computing-node`

$ALERT_STATUS
: Resumen del estado de la alerta.<br />
**Ejemplo**: `system.load.1 over host:my-host was > 0 at least once during the last 1m`
**Nota**: Para rellenar esta variable en las cargas útiles del webhook a partir de alertas del monitor de logs, `$ALERT_STATUS` debe añadirse manualmente en el cuadro de la integración del webhook.

$ALERT_TITLE
: Título de la alerta.<br />
**Ejemplo**: `[Triggered on {host:ip-012345}] Host is Down`

$ALERT_TRANSITION
: Tipo de notificación de alerta.<br />
**Ejemplo**: `Recovered`, `Triggered`/`Re-Triggered`, `No Data`/`Re-No Data`, `Warn`/`Re-Warn`, `Renotify`

$ALERT_TYPE
: Tipo de la alerta.<br />
**Ejemplo**: `error`, `warning`, `success`, `info`

$DATE
: Fecha _(epoch)_ en la que ocurrió el evento.<br />
**Ejemplo**: `1406662672000`

$EMAIL
: Correo electrónico del usuario que publicó el evento que activó el webhook.

$EVENT_MSG
: Texto del evento.<br />
**Ejemplo**: `@webhook-url Sending to the webhook`

$EVENT_TITLE
: Título del evento.<br />
**Ejemplo**: `[Triggered] [Memory Alert]`

$EVENT_TYPE
: Tipo de evento.<br />
Consulta la lista de [tipos de eventos](#event-types) en [Ejemplos](#examples)

$HOSTNAME
: Nombre de host del servidor asociado al evento, si existe uno.

$ID
: ID del evento.<br />
**Ejemplo**: `1234567`

$INCIDENT_ATTACHMENTS
: Lista de objetos JSON con los adjuntos del incidente, como postmortem y documentos.<br />
**Ejemplo**: `[{"attachment_type": "postmortem", "attachment": {"documentUrl": "https://app.datadoghq.com/notebook/123","title": "Postmortem IR-1"}}]` 

$INCIDENT_COMMANDER
: Objeto JSON con el indicador, el uuid, el nombre, el correo electrónico y el icono del gestor de incidentes.

$INCIDENT_CUSTOMER_IMPACT
: Objeto JSON con el estado del impacto, la duración y el contexto del cliente de un incidente.<br />
**Ejemplo**: `{"customer_impacted": true, "customer_impact_duration": 300 ,"customer_impact_scope": "scope here"}`

$INCIDENT_FIELDS
: Objeto JSON que asigna cada uno de los campos de un incidente a sus valores.<br />
**Ejemplo**: `{"state": "active", "datacenter": ["eu1", "us1"]}`

$INCIDENT_INTEGRATIONS
: Lista de objetos JSON con las integraciones del incidente, como Slack y Jira.<br />
**Ejemplo**: `[{"uuid": "11a15def-eb08-52c8-84cd-714e6651829b", "integration_type": 1, "status": 2, "metadata": {"channels": [{"channel_name": "#incident-1", "channel_id": "<channel_id>", "team_id": "<team_id>", "redirect_url": "<redirect_url>"}]}}]`

$INCIDENT_MSG
: Mensaje de notificación del incidente.<br />

$INCIDENT_PUBLIC_ID
: ID público del incidente asociado.<br />
**Ejemplo**: `123`

$INCIDENT_SEVERITY
: Gravedad del incidente.

$INCIDENT_STATUS
: Estado del incidente.

$INCIDENT_TITLE
: Título del incidente.

$INCIDENT_TODOS
: Lista de objetos JSON con las tareas de reparación del incidente.<br />
**Ejemplo**: `[{"uuid": "01c03111-172a-50c7-8df3-d61e64b0e74b", "content": "task description", "due_date": "2022-12-02T05:00:00+00:00", "completed": "2022-12-01T20:15:00.112207+00:00", "assignees": []}]`

$INCIDENT_URL
: URL del incidente.<br />
**Ejemplo**: `https://app.datadoghq.com/incidents/1`

$INCIDENT_UUID
: UUID del incidente asociado.<br />
**Ejemplo**: `01c03111-172a-50c7-8df3-d61e64b0e74b`

$LAST_UPDATED
: Fecha de la última actualización del evento.

$LINK
: URL del evento.<br />
**Ejemplo**: `https://app.datadoghq.com/event/jump_to?event_id=123456`

$LOGS_SAMPLE
: Objeto JSON que contiene una muestra de logs de las alertas de monitores de logs. La longitud máxima del mensaje de muestra es de 500 caracteres.<br />
**Example**:<br />
: {{< code-block lang="json">}}
{
  "columns": [
    "Time",
    "Host"
  ],
  "label": "Sample Logs",
  "rows": [
    {
      "items": [
        "15:21:18 UTC",
        "web"
      ],
      "message": "[14/Feb/2023:15:21:18 +0000] \"GET / HTTP/1.1\" 200"
    },
    {
      "items": [
        "15:21:13 UTC",
        "web00"
      ],
      "message": "[14/Feb/2023:15:21:13 +0000] \"GET / HTTP/1.1\" 200"
    }
  ]
}
{{< /code-block >}}

$METRIC_NAMESPACE
: Espacio de nombres de la métrica si se trata de una alerta.

$ORG_ID
: ID de tu organización.<br />
**Ejemplo**: `11023`

$ORG_NAME
: Nombre de tu organización.<br />
**Ejemplo**: `Datadog`

$PRIORITY
: Prioridad del evento.<br />
**Ejemplo**: `normal` o `low`

$SECURITY_RULE_NAME
: Nombre de la regla de seguridad.

$SECURITY_SIGNAL_ID
: Identificador único de la señal.<br />
**Ejemplo**: `AAAAA-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`

$SECURITY_SIGNAL_SEVERITY
: Gravedad de la señal de seguridad.<br />
**Ejemplo**: `medium`

$SECURITY_SIGNAL_TITLE
: Ttítulo de la señal de seguridad.

$SECURITY_SIGNAL_MSG
: Mensaje de la señal de seguridad.

$SECURITY_SIGNAL_ATTRIBUTES
: Atributos de la señal de seguridad.<br />
**Ejemplo**: `{"network":{"client":{"ip":"1.2.3.4"}}, "service": ["agent"]}`

$SECURITY_RULE_ID
: ID de la regla de seguridad.<br />
**Ejemplo**: `aaa-aaa-aaa`

$SECURITY_RULE_MATCHED_QUERIES
: Consultas asociadas a la regla de seguridad.<br />
**Ejemplo**: `["@evt.name:authentication"]`

$SECURITY_RULE_GROUP_BY_FIELDS
: Grupo de seguridad por pares clave-valor.<br />
**Ejemplo**: `{"@usr.name":"john.doe@your_domain.com"}`

$SECURITY_RULE_TYPE
: Tipo de regla de seguridad.<br />
**Ejemplo**: `log_detection`

$SNAPSHOT
: URL de la imagen si el evento contiene una snapshot.<br />
**Ejemplo**: `https://p.datadoghq.com/path-to-snapshot`

$SYNTHETICS_TEST_NAME
: Nombre del test Synthetic.

$SYNTHETICS_FIRST_FAILING_STEP_NAME 
: Nombre del primer paso fallido del test Synthetic.

$SYNTHETICS_SUMMARY
: Resumen de la información sobre tests Synthetic.<br />
**Ejemplo**:
: {{< code-block lang="json">}}
{
  "result_id": "1871796423670117676",
  "test_type": "browser",
  "test_name": "Test name",
  "date": "Nov 05, 2021, 09:49AM UTC",
  "test_url": "https://app.datadoghq.com/synthetics/edit/apc-ki3-jwx",
  "result_url": "https://app.datadoghq.com/synthetics/details/anc-ki2-jwx?resultId=1871796423670117676",
  "location": "Frankfurt (AWS)",
  "browser": "Chrome",
  "device": "Laptop Large",
  "failing_steps": [
    {
      "error_message": "Error: Element's content should contain given value.",
      "name": "Test span #title content",
      "is_critical": true,
      "number": "3.1"
    }
  ]
}
{{< /code-block >}}

$TAGS
: Lista separada por comas de las etiquetas del evento.<br />
**Ejemplo**: `monitor, name:myService, role:computing-node`

$TAGS[key]
: Valor de la etiqueta `key`. Si no hay una etiqueta `key` o si la etiqueta `key` no tiene valor, esta expresión se evalúa como una cadena vacía.
**Ejemplo**: Si `$TAGS` incluye `role:computing-node`, entonces `$TAGS[role]` se evalúa como `computing-node`

$TEXT_ONLY_MSG
: Texto de evento sin formato Markdown.

$USER
: Usuario que publica el evento que activó el webhook.<br />
**Ejemplo**: `rudy`

$USERNAME
: Nombre de usuario del usuario que publica el evento que activó el webhook.

### Variables personalizadas

Además de la lista de variables incorporadas, puedes crear tus propias variables personalizadas en el cuadro de la integración. Puedes utilizar estas variables en las URL de webhooks, cargas útiles y cabeceras personalizadas. Un caso de uso común es el almacenamiento de credenciales, como nombres de usuario y contraseñas.

También puedes ocultar los valores de las variables personalizadas para mayor seguridad. Para ocultar un valor, selecciona la casilla **hide from view** (ocultar de la vista) cuando edites o añadas una variable personalizada:

{{< img src="/integrations/webhooks/webhook_hidefromview.png" alt="La casilla **hide from view** (ocultar de la vista) oculta valores de variables personalizadas" style="width:100%;" >}}

### Autenticación

#### Autenticación HTTP básica

Si quieres publicar tus webhooks en un servicio que requiere autenticación, puedes utilizar la autenticación HTTP básica modificando tu URL de `https://my.service.example.com` a `https://<USERNAME>:<PASSWORD>@my.service.example.com`.

#### Autenticación OAuth 2.0

Si quieres publicar tus webhooks en un servicio que requiera autenticación OAuth 2.0, puedes configurar un Método de autenticación. Un Método de autenticación incluye toda la información necesaria para obtener un token OAuth de tu servicio. Una vez que el Método de autenticación esté configurado y asociado a un webhook, Datadog se encargará de obtener el token OAuth, actualizarlo si es necesario y añadirlo a la solictud del webhook como token de portador.

Para añadir un Método de autenticación, haz clic en la pestaña Métodos de autenticación y, a continuación, haz clic en el botón New Auth Method (Nuevo método de autenticación). Asigna un nombre descriptivo al método de autenticación e introduce la siguiente información:

* URL del token de acceso
* ID de cliente
* Secreto de cliente
* Contexto (opcional)
* Público (opcional)

Haz clic en Save (Guardar) para crear el Método de autenticación. Para aplicar este Método de autenticación a un webhook, vuelve a la pestaña Configuración y selecciona una configuración de webhook existente y haz clic en el botón Edit (Editar). El Método de autenticación que has creado debería aparecer ahora en la lista de selección de Métodos de autenticación.

### Múltiples webhooks

En una alerta de monitor, si se notifican 2 o más endpoints de webhook, se crea una cola de webhook a nivel de servicio individual. Por ejemplo, si te comunicas con PagerDuty y Slack, un reintento en el webhook de Slack no afecta al de PagerDuty.

Sin embargo, en el contexto de PagerDuty, ciertos eventos siempre van antes que otros. Específicamente, una carga útil "Acknowledge" (Reconocimiento) siempre va antes que "Resolution" (Resolución). Si un ping "Acknowledge" falla, el ping "Resolution" se pone en la cola debido a la lógica del reintento.

## Ejemplos

### Envío de SMS a través de Twilio

Uso como URL:
`https://<ACCOUNT_ID>:<AUTH_TOKEN>@api.twilio.com/2010-04-01/Accounts/<ACCOUNT_ID>/Messages.json`

y como carga útil:

```json
{
    "To": "+1347XXXXXXX",
    "From": "+1347XXXXXX",
    "Body": "$EVENT_TITLE \n Related Graph: $SNAPSHOT"
}
```

Sustituye `To` por tu número de teléfono y `From` por el que Twilio te asignó. Comprueba la casilla **Encode as form** (Codificar como formulario).

### Crear una incidencia en Jira

Uso como URL:
`https://<JIRA_USER_NAME>:<JIRA_PASSWORD>@<YOUR_DOMAIN>.atlassian.net/rest/api/2/issue`

y como carga útil:

```json
{
    "fields": {
        "project": {
            "key": "YOUR-PROJECT-KEY"
        },
        "issuetype": {
            "name": "Task"
        },
        "description": "There's an issue. See the graph: $SNAPSHOT and event: $LINK",
        "summary": "$EVENT_TITLE"
    }
}
```

No selecciones la casilla **Encode as form** (Codificar como formulario).

### Lista de tipos de eventos en la carga útil de webhooks {#event-types}

| Tipo de evento | Monitores asociados |
| ---------  | ------------------- |
| `ci_pipelines_alert` | Pipelines CI |
| `ci_tests_alert` | Tests CI |
| `composite_monitor` | Compuesto |
| `error_tracking_alert` | Error Tracking |
| `event_alert` | Evento que utiliza el endpoint V1 |
| `event_v2_alert` | Evento que utiliza el endpoint V2 |
| `log_alert` | Logs |
| `monitor_slo_alert` | SLOs basados en monitores |
| `metric_slo_alert` | SLOs basados en métricas |
| `outlier_monitor` | Outlier |
| `process_alert` | Process |
| `query_alert_monitor` | Métrica, Anomalía, Predicción |
| `rum_alert` | RUM |
| `service_check` | Host, Check de servicio |
| `synthetics_alert` | Synthetics |
| `trace_analytics_alert` | Trace Analytics |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/webhooks