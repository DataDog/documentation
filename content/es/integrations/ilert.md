---
app_id: ilert
categories:
- events
- colaboración
- rum
- rastreo de problemas
- notificaciones
custom_kind: integración
description: Recibe notificaciones de las alertas de Datadog y adopte medidas con
  ilert.
integration_version: 1.0.0
media:
- caption: lista de alertas de ilert
  image_url: images/ilert-alert-list.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: ilert
---
## Información general

La integración de [ilert](https://www.ilert.com/?utm_medium=organic&utm_source=integration&utm_campaign=datadog) envía alertas de Datadog a ilert y ayuda a los DevOps y SREs a tomar medidas inmediatas para evitar tiempos de inactividad o interrupciones operativas. ilert es la plataforma de gestión de incidentes basada en la IA que permite a Teams cubrir todas las fases del ciclo de incidente. Con ilert, Teams responde a los incidentes más rápidamente y reduce su tiempo medio de resolución.

Integra ilert para hacer lo siguiente:

- Desencadenar y resolver incidencias de Datadog
- Abordar las incidencias y establecer políticas de escalada a medida que se producen
- Establecer un recordatorio diario de quién está de guardia

## Configuración

### ilert

#### Crear un origen de alertas de Datadog

1. Ve a la pestaña **Alert Sources** (Orígenes de alertas) y haz clic en el botón "Create new alert source" (Crear nuevo origen de alertas).

1. Busca "**Datadog**", selecciona el cuadro de **Datadog** y haz clic en **Next** (Siguiente).

   ![Nueva fuente de alerta de ilert](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new.png)

1. Asígnale un nombre.

   ![Nueva fuente de alerta de ilert 2](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new-2.png)

1. Selecciona la política de derivación que desees.

   ![Nueva fuente de alerta de ilert 3](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-new-3.png)

1. En la página siguiente, se genera una **Webhook URL** (URL de webhook). Necesitarás esta URL para la configuración de la integración en Datadog.

   ![Vista de fuente de alerta de ilert](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-alert-source-view.png)

### Datadog

#### Añadir un webhook de ilert como canal de alertas

1. Desde la página de integraciones de Datadog, [**instala la integración de webhooks**](https://app.datadoghq.com/integrations/webhooks).

1. En el cuadro de la integración de Webhooks, añade un nuevo webhook:

   ![Nuevo webhook de Datadog](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-new.png)

1. Ingresa un nombre, la **URL del webhook de Datadog** generada anteriormente a partir del origen de alertas de ilert y la **carga útil de la plantilla**:

   ```json
   {
     "body": "$EVENT_MSG",
     "last_updated": "$LAST_UPDATED",
     "event_type": "$EVENT_TYPE",
     "alert_transition": "$ALERT_TRANSITION",
     "alert_id": "$ALERT_ID",
     "link": "$LINK",
     "title": "$EVENT_TITLE",
     "date": "$DATE",
     "org": {
       "id": "$ORG_ID",
       "name": "$ORG_NAME"
     },
     "id": "$ID"
   }
   ```

   ![Vista del webhook de Datadog](https://raw.githubusercontent.com/DataDog/integrations-extras/master/ilert/images/datadog-webhook-view.png)

1. Haz clic en **Save** (Guardar).

## Datos recopilados

### Métricas

La integración de ilert no incluye métricas.

### Eventos

Los eventos activados y resueltos de ilert aparecen en el dashboard de la plataforma ilert.

### Checks de servicio

La integración de ilert no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).