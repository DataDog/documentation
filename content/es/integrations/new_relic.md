---
"app_id": "new-relic"
"app_uuid": "82c7d333-a23e-44f9-a6c5-cd22fb541022"
"assets":
  "integration":
    "auto_install": false
    "events":
      "creates_events": true
    "metrics":
      "check":
      - "new_relic.application_summary.apdex_score"
      - "new_relic.apdex.score"
      "metadata_path": "metadata.csv"
      "prefix": "new_relic."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "54"
    "source_type_name": "New Relic"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "notifications"
- "event management"
"custom_kind": "integración"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "new_relic"
"integration_id": "new-relic"
"integration_title": "New Relic"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "new_relic"
"public_title": "New Relic"
"short_description": "New Relic es un servicio de monitorización de aplicación para aplicaciones web y móviles"
"supported_os": []
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Notifications"
  - "Category::Event Management"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "New Relic es un servicio de monitorización de aplicación para aplicaciones web y móviles"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "New Relic"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->

## Información general

<div class="alert alert-warning">La integración de New Relic APM está obsoleta y tiene una funcionalidad reducida. Las etiquetas de métrica de APM no están disponibles.</div>

<div class="alert alert-danger">A partir del 1 de marzo de 2025, la API REST v2 de NewRelic ya no acepta claves de la API REST.

Con el fin de mantener la funcionalidad de esta integración, reemplaza tu clave de la API REST existente con una clave de la API de usuario en la configuración de integración.</div>

Conéctate a New Relic para ver las alertas de New Relic en tu flujo de eventos.

## Configuración

### Alertas de New Relic en flujo de eventos

Completa los siguientes pasos en **New Relic**.

1. En la pestaña "Alerts & AI" (Alertas e IA), navega a "Notification Channels" (Canales de notificación).
2. Selecciona "New Notification Channel" (Nuevo canal de notificación).
3. Selecciona "Webhook" como tipo de canal.
4. Nombra tu canal "Datadog".
5. Introduce esta URL base:

    ```text
    https://app.datadoghq.com/intake/webhook/newrelic?api_key=<DATADOG_API_KEY>
    ```

6. Haz clic en "Custom Payload" (Carga útil personalizada) y asegúrate de que la carga útil está en formato JSON.
**Nota:** Consulta la sección siguiente para obtener instrucciones sobre la inclusión de etiquetas (tags) personalizadas en JSON.
7. Haz clic en "Create Channel" (Crear canal).
8. Haz clic en "Alert Policies" (Políticas de alerta).
9. Selecciona las políticas de alerta que deseas que se envíen a Datadog.

### Formato de Webhook requerido

Esta sección describe los distintos tipos de alertas de New Relic que se pueden procesar en Datadog, detallando los campos obligatorios para cada tipo de alerta. Si falta alguno de los campos obligatorios, evento se rechazará y no aparecerá en el Event Explorer.

#### Notificación de despliegue 

Si "despliegue" está en la carga útil del webhook, se tratará como evento INFO.

Campos obligatorios:

1. fecha_de_creación
2. revisión
3. descripción
4. desplegado_por
5. registro de cambios

#### Alerta

Si "alerta" está en la carga útil del webhook, el tipo de evento se determinará a partir de la descripción corta de acuerdo con las siguientes reglas:
1. ÉXITO si en la descripción aparece "finalizado", "cerrado" o "recuperado".
2. INFO si "reconocido" está en la descripción
3. ERROR en todos los demás casos

Campos obligatorios
1. descripción_breve
2. mensaje
3. url_dd_alerta
4. fecha_de_creación
5. gravedad

#### Valor predeterminado

Si no se cumplen los criterios anteriores, el campo de gravedad se asignará a un tipo de alerta.

Campos obligatorios:
1. id_de_cuenta
2. nombre_de_cuenta
3. id_de_condición
4. nombre_de_condición
5. estado_actual
6. detalles
7. ltipo_de_evento
8. url_reconocimiento_incidente
9. objetivos
10. id_de_incidente
11. url_del_incidente
12. nombre_de_la_política
13. URL_de_la_política
14. Gravedad - Este campo debe ser uno de los siguientes: información ,advertencia o crítico. Se asignará a un tipo de evento de información, advertencia y error.
15. marca de tiempo


### Incluye una etiqueta personalizada en las alertas beta

Puedes incluir etiquetas personalizadas con la opción "Use Custom Payload" (Usar carga útil personalizada) a través de la función de alertas beta de New Relic. Para configurar esto, navega a tu cuenta de New Relic y haz clic en el botón 'Alerts Beta' (Alertas beta) en la esquina superior derecha de la pantalla. A continuación, selecciona la sección 'Notification channels' (Canal de notificación) y busca el webhook que has configurado para Datadog. Aquí debería haber una sección llamada "Use Custom Payload" (Usar carga útil personalizada) y, una vez seleccionada, se expande para mostrar una carga útil JSON. Tienes que modificar esta carga añadiendo un atributo "tags". Por ejemplo, una carga útil modificada podría tener este aspecto:

```json
{
    "account_id": "$ACCOUNT_ID",
    "account_name": "$ACCOUNT_NAME",
    "condition_id": "$CONDITION_ID",
    "condition_name": "$CONDITION_NAME",
    "current_state": "$EVENT_STATE",
    "details": "$EVENT_DETAILS",
    "event_type": "$EVENT_TYPE",
    "incident_acknowledge_url": "$INCIDENT_ACKNOWLEDGE_URL",
    "incident_id": "$INCIDENT_ID",
    "incident_url": "$INCIDENT_URL",
    "owner": "$EVENT_OWNER",
    "policy_name": "$POLICY_NAME",
    "policy_url": "$POLICY_URL",
    "runbook_url": "$RUNBOOK_URL",
    "severity": "$SEVERITY",
    "targets": "$TARGETS",
    "timestamp": "$TIMESTAMP",
    "tags": ["application:yourapplication", "host:yourhostname", "sometag"]
}
```

Una vez finalizadas las modificaciones, selecciona **Update Channel** (Actualizar canal) para guardar los cambios.

## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de soporte de Datadog][1].

[1]: https://docs.datadoghq.com/help/

