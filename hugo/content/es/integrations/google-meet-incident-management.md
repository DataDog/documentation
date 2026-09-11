---
aliases:
- /es/integrations/google_meet_incident_management
app_id: google-meet-incident-management
categories:
- colaboración
- rum
custom_kind: integración
description: Activar funciones de Google Meet en Datadog Incident Management
media: []
supported_os:
- linux
- windows
- macos
title: Google Meet Incident Management
---
## Información general

Integración con Google Meet Incident Management para permitir la creación de espacios de reunión de Google con un solo clic y en función de criterios para incidentes de Datadog.

**Datos recopilados**. Esta integración recopila el nombre del espacio de reuniones de Google, meetingUri y meetingCode, para crear una reunión de Google en tu nombre. Datadog no conserva ni utiliza estos datos obtenidos a través de las API de Google Workspace para desarrollar, mejorar o entrenar modelos generalizados de IA o ML.

## Configuración

### Instalación

1. Ve al [cuadro de la integración con Google Meet Incident Management](https://app.datadoghq.com/integrations?integrationId=google-meet-incident-management).
1. Para iniciar la instalación, haz clic en la pestaña "Configure" (Configurar).
1. Después de leer las instrucciones del modal, haz clic en **Authorize** (Autorizar) y se te redirigirá a una página de inicio de sesión de Google.
1. Inicia sesión en Google con una cuenta de usuario genérica. Este usuario se utilizará para crear todos los espacios de reunión de Google.
1. Aparece una pantalla de autorización en la que se solicita acceso para permitir que Datadog cree espacios de reunión de Google en nombre de este usuario. Haz clic en **Allow** (Permitir).
1. Una vez aceptados los permisos, se te redirigirá de nuevo al cuadro de la integración con Google Meet Incident Management y podrás empezar a utilizar las funciones de Google Meet para incidentes de Datadog.

## Permisos

Google Meet Incident Management requiere los siguientes contextos de OAuth.

### Contextos

| Contextos                                                   | Motivo de la solicitud                                                                                                 |
|----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `https://www.googleapis.com/auth/meetings.space.created` | Crea, edita y consulta información de tus conferencias de Google Meet creadas por la aplicación.                       |

## Utilización

### Habilitar espacios de reunión de Google con un solo clic

Para habilitar espacios de reunión de Google con un solo clic para incidentes:

1. Ve a la [configuración de la integración para incidentes](https://app.datadoghq.com/incidents/settings?section=integrations).
1. Desplázate hasta la sección Google Meet.
1. Activa la opción **Enable Google Meet creation** (Activar la creación de Google Meet).
1. Haz clic en **Save** (Guardar).

Tras habilitar los espacios de reunión de Google con un solo clic, inicia un espacio de reunión de Google haciendo clic en **Start Google Meet** (Iniciar Google Meet) en el encabezado del incidente.

Se te redirige para unirte instantáneamente a la reunión a través del navegador.

![Se crea un espacio de reunión de Google para un incidente](images/creating-one-click-google-meetings.png)

### Activar la creación automática

Para habilitar espacios de reunión de Google automáticos y basados en criterios para incidentes:

1. Ve a la [configuración de la integración para incidentes](https://app.datadoghq.com/incidents/settings?section=integrations).
1. Desplázate hasta la sección Google Meet.
1. Activa la opción **Enable Google Meet creation** (Activar la creación de Google Meet).
   1. Activa la opción **Automatically create Google Meet meetings** (Crear automáticamente reuniones de Google Meet).
   1. (Opcional) Especifica los criterios para incidentes que crea un espacio de reunión de Google. Si se deja en blanco, cualquier cambio en un incidente sin un espacio de reunión de Google existente creará un espacio de reunión de Google.
1. Haz clic en **Save** (Guardar).

![Activar la creación automática](images/enabling-google-meet-automatic-creation.png)

### Marcador Slack

Añade enlaces importantes de Google Meet a los marcadores del canal Slack de incidentes:

1. Ve a la [configuración de la integración para incidentes](https://app.datadoghq.com/incidents/settings?section=integrations).
1. Desplázate hasta la sección Slack.
1. Activa la opción **Add important links to the incident channel’s bookmarks** (Añadir enlaces importantes a los marcadores del canal de incidentes).

Si existe un canal Slack de incidentes, esta función añade un marcador para el espacio de reuniones de Google a ese canal.

Para obtener más información sobre funciones de Slack, consulta la documentación [Integraciones - Funciones de Slack](https://docs.datadoghq.com/service_management/incident_management/incident_settings/integrations#slack-features) documentation.

### Eliminar la aplicación

Para desinstalar la integración con Google Meet Incident Management, accede al cuadro de Google Meet Incident Management y haz clic en la pestaña "Configure" (Configurar). Haz clic en **Uninstall Integration** (Desinstalar integración).

## Datos recopilados

Google Meet Incident Management recopila `name`, `meetingUri` y `meetingCode` de la API de [creación de espacios de reunión](https://developers.google.com/meet/api/reference/rest/v2/spaces/create) de Google Meet para mostrarlos en el producto Incident Management.

### Métricas

Google Meet Incident Management no incluye métricas.

### Checks de servicio

Google Meet Incident Management no incluye checks de servicio.

### Eventos

Google Meet Incident Management no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).