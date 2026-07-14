---
categories:
- gestión de eventos
- notificaciones
custom_kind: integración
dependencies: []
description: Ingiere alertas desde SolarWinds Orion a tus flujos de eventos de Datadog.
doc_link: https://docs.datadoghq.com/integrations/solarwinds/
draft: false
git_integration_title: solarwinds
has_logo: true
integration_id: ''
integration_title: SolarWinds
integration_version: ''
is_public: true
manifest_version: '1.0'
name: solarwinds
public_title: Integración de Datadog y SolarWinds
short_description: Ingiere alertas desde SolarWinds Orion a tus flujos de eventos
  de Datadog.
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Obtén alertas de SolarWinds Orion para agregar y clasificar tus alertas en una localización centralizada.

Esta integración funciona al suscribir Datadog a todas tus notificaciones de alerta de SolarWinds.

## Configuración

### Crear acciones desencadenantes

Para crear una nueva acción desencadenante en SolarWinds:

1. Ve a Alerts > Manage Alerts (Alertas > Gestionar alertas)
2. Selecciona cualquier alerta y haz clic en "Edit Alert" (Editar alerta), o crea una nueva alerta si no tienes ninguna
3. Ve a Trigger Actions > Add Action (Acciones desencadenantes > Añadir acción)
4. Selecciona “Send a GET or POST Request to a Web Server” (Enviar una solicitud GET o POST a un servidor web)
5. Haz clic en “Configure Action” (Configurar acción)
6. Rellena el Panel de acción con los siguientes detalles:

        a. Nombre de la acción: enviar alerta a Datadog (o como prefieras)
        b. URL: https://app.datadoghq.com/intake/webhook/solarwinds?api_key=<DATADOG_API_KEY>
        c. Seleccionar: usar HTTP/S POST
        d. Cuerpo del mensaje: copiar y pegar desde la plantilla de alerta
        e. Hora del día: dejar como está
        f. Configuración de ejecución: dejar como está

7. Haz clic en “Add Action” (Añadir acción)
8. Haz clic en el paso “Reset Actions” (Restablecer acciones) y repite los pasos 4 a 7, utilizando la plantilla de acción de restablecimiento en lugar de la plantilla de acción desencadenante
9. Haz clic en **Next** (Siguiente)
10. Haz clic en "Submit" (Enviar) en la página de resumen

### Asignar acciones a las alertas

1. Desde la vista del Gestor de alertas, selecciona todas las alertas que desees enviar a Datadog y, a continuación, ve a Assign Action > Assign Trigger Action (Asignar acción > Asignar acción desencadenante)
2. Selecciona la acción Send Alert to Datadog - Trigger action (Enviar alerta a Datadog - Acción desencadenante) y haz clic en Asssign (Asignar)
3. Repite Assign Action > Assign Reset Action (Asignar acción > Asignar acción de reinicio) mediante la acción Send Alert to Datadog - Reset action (Enviar alerta a Datadog - Acción de reinicio)

### Cuerpo de la acción desencadenante a publicar
``` 
{
    "acknowledged": "${N=Alerting;M=Acknowledged}",
    "acknowledged_by": "${N=Alerting;M=AcknowledgedBy}",
    "alert_description": "${N=Alerting;M=AlertDescription}",
    "alert_details_url": "${N=Alerting;M=AlertDetailsUrl}",
    "alert_id": "${N=Alerting;M=AlertDefID}",
    "alert_message": "${N=Alerting;M=AlertMessage}",
    "alert_name": "${N=Alerting;M=AlertName}",
    "alert_severity": "${N=Alerting;M=Severity}",
    "application": "${N=Generic;M=Application}",
    "device_type": "${N=SwisEntity;M=Router.Nodes.CustomProperties.Device_Type}",
    "host": "${N=SWQL;M=SELECT TOP 1 RelatedNodeCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "host_url": "${N=SWQL;M=SELECT TOP 1 RelatedNodeDetailsUrl FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "ip": "${N=SwisEntity;M=IP_Address}",
    "location": "${N=SwisEntity;M=Router.Nodes.CustomProperties.City}",
    "object": "${N=SWQL;M=SELECT TOP 1 EntityCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "object_type": "${N=Alerting;M=ObjectType}",
    "timestamp": "${N=SWQL;M=SELECT GETUTCDATE() as a1 FROM Orion.Engines}"
}
``` 

### Cuerpo de la acción de reinicio a publicar
``` 
{
    "acknowledged": "${N=Alerting;M=Acknowledged}",
    "acknowledged_by": "${N=Alerting;M=AcknowledgedBy}",
    "alert_description": "${N=Alerting;M=AlertDescription}",
    "alert_details_url": "${N=Alerting;M=AlertDetailsUrl}",
    "alert_id": "${N=Alerting;M=AlertDefID}",
    "alert_message": "${N=Alerting;M=AlertMessage}",
    "alert_name": "${N=Alerting;M=AlertName}",
    "alert_severity": "${N=Alerting;M=Severity}",
    "application": "${N=Generic;M=Application}",
    "device_type": "${N=SwisEntity;M=Router.Nodes.CustomProperties.Device_Type}",
    "host": "${N=SWQL;M=SELECT TOP 1 RelatedNodeCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "host_url": "${N=SWQL;M=SELECT TOP 1 RelatedNodeDetailsUrl FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "ip": "${N=SwisEntity;M=IP_Address}",
    "location": "${N=SwisEntity;M=Router.Nodes.CustomProperties.City}",
    "object": "${N=SWQL;M=SELECT TOP 1 EntityCaption FROM Orion.AlertObjects WHERE AlertObjectID = ${N=Alerting;M=AlertObjectID} }",
    "object_type": "${N=Alerting;M=ObjectType}",
    "timestamp": "${N=SWQL;M=SELECT GETUTCDATE() as a1 FROM Orion.Engines}",
    "reset": "true"
}
``` 

## Datos recopilados

### Métricas

La integración de SolarWinds no incluye ninguna métrica.

### Eventos

La integración de SolarWinds recopila las alertas de SolarWinds en el flujo de eventos.

### Checks de servicio

La integración de SolarWinds no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el soporte de Datadog