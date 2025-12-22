---
aliases:
- /es/integrations/atlassian_event_logs
app_id: atlassian-event-logs
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Monitoriza la actividad administrativa de la suscripción a Atlassian
  Guard de tu organización
integration_version: 1.1.0
media: []
supported_os:
- linux
- windows
- macos
title: Logs de auditoría de la organización Atlassian
---
## Información general

[Atlassian Organization Audit Logs](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-events/#api-v1-orgs-orgid-events-get) realiza un seguimiento de los cambios de los administradores en las configuraciones de grupo de tu organización y en el acceso a los productos. Esta integración proporciona visibilidad de los eventos de administración en todos los productos de Atlassian, además de Jira y Confluence. Además de estas acciones administrativas, recomendamos instalar las integraciones de **Registros de auditoría de Jira y Confluence** para obtener eventos de usuario específicos de productos más granulares.

Esta integración también se puede utilizar para establecer reglas de detección de [Cloud SIEM](https://www.datadoghq.com/product/cloud-siem/) utilizando el pipeline de logs predefinidos.

Además, puedes:

- Controlar la retención de datos de tus productos de Atlassian.
- Crear widgets y dashboards personalizados.
- Definir reglas de detección que activen acciones específicas.
- Hacer una referencia cruzada de los eventos de producto de Atlassian con los datos de otros servicios.

Los logs se recopilan mediante la [API de registros de auditoría] de Atlassian (https://developer.atlassian.com/cloud/admin/organization/rest/api-group-events/#api-v1-orgs-orgid-events-get) y registran la siguiente información:

- **Gestión de grupos**: creaciones, eliminaciones, renombramientos y modificaciones de listas de usuarios de grupos.
- **Configuración de acceso a grupos**: cambios en el acceso a productos o administración de un grupo. Esto incluye la concesión y revocación de roles de acceso.
- **Configuración de acceso a productos**: cambios en la configuración de invitaciones y usuarios permitidos para el acceso a productos o sitios. Esto incluye habilitar y deshabilitar invitaciones de cuentas de terceros, así como crear o revocar tokens de API.

Para obtener más detalles sobre las propiedades de estos logs, visita la documentación de [Track Organization Activities from the Audit log](https://support.atlassian.com/organization-administration/docs/track-organization-activities-from-the-audit-log/) de Atlassian. Si tu organización tiene [Atlassian Guard Premium Tier](https://support.atlassian.com/organization-administration/docs/track-organization-activities-from-the-audit-log/#:~:text=Atlassian%20Guard%20Standard-,Atlassian%20Guard%20Premium,-Cloud%20Enterprise), tu cuenta puede generar eventos de log de auditoría adicionales que rastrean el contenido creado por el usuario y la actividad de clasificación.

Busca `source:atlassian-event-logs` para ver Atlassian Organization Audit Logs en el [producto Logs Management](https://docs.datadoghq.com/logs/).

## Configuración

1. Desde la pestaña **Configure** (Configuración) del cuadro Logs de auditoría de la organización Atlassian, haz clic en el botón **Add New** (Añadir nuevo).
1. Sigue las instrucciones del cuadro de Logs de auditoría de la organización Atlassian para autenticarse utilizando tu **ID de organización Atlassian** y **Token de portador de API**.

### Validación

En el Log Explorer de Datadog, busca tus logs utilizando la consulta: `source:atlassian-event-logs`. Si la integración se ha instalado y autenticado correctamente, los logs deberían aparecer en breve.

## Datos recopilados

### Métricas

Logs de auditoría de la organización Atlassian no incluye ninguna métrica.

### Checks de servicio

Logs de auditoría de la organización Atlassian no incluye ningún check de servicio.

### Eventos

Logs de auditoría de la organización Atlassian no incluye ningún evento.

### Logs

Logs de auditoría de la organización Atlassian recopila logs de auditoría.

## Solucionar problemas

#### Restricciones del límite de tarifa

Las organizaciones con altos niveles de actividad administrativa pueden alcanzar el límite de velocidad de la API. Consulta la documentación de [Atlassian Audit log Rate Limit](https://developer.atlassian.com/cloud/admin/organization/rest/intro/#rate%20limits) para conocer los límites actuales. Si la tasa de ingesta de logs está cerca del umbral máximo, puede ser la causa de que falten logs.

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).