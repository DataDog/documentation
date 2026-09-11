---
app_id: gsuite
categories:
- recopilación de logs
- colaboración
- seguridad
custom_kind: integración
description: Importación de tus logs de auditoría y seguridad de Google Workspace
  a Datadog
integration_version: 1.0.0
media: []
title: Google Workspace
---
## Información general

Importa tus logs de auditoría y seguridad de Google Workspace a Datadog. Cuando se habilita esta integración, Datadog empieza a extraer automáticamente logs para los siguientes servicios Google Workspace:

| Servicio              | Descripción                                                                                                                                                                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Transparencia del acceso  | Los informes de actividad de Transparencia del acceso de Google Workspace devuelven información sobre distintos tipos de eventos de actividad de Transparencia del acceso.                                                                                                                             |
| Admin                | Los informes de actividad de la aplicación Consola de administración devuelven información sobre diferentes tipos de eventos de actividad del administrador.                                                                                                                                    |
| Calendario             | Los informes de actividad de la aplicación Google Calendar devuelven información sobre diferentes eventos de actividad del Calendar.                                                                                                                                                          |
| Chrome               | El informe de actividad de Chrome devuelve información sobre la actividad de ChromeOS de todos los usuarios de tu cuenta. Cada informe utiliza la solicitud de endpoint básica y proporciona parámetros específicos del informe, como inicios de sesión, adición o eliminación de usuarios o eventos de navegación insegura.    |
| Acceso contextual | El informe de actividad de acceso contextual devuelve información sobre denegaciones de acceso a aplicaciones a los usuarios de tu cuenta. Utiliza la solicitud de endpoint de informe básico y proporciona parámetros específicos como el ID del dispositivo y la aplicación a la que se denegó el acceso. |
| Google Drive                | Los informes de actividad de la aplicación Google Drive devuelven información sobre diferentes eventos de actividad de Google Drive. El informe de actividad de Drive sólo está disponible para los clientes de Google Workspace Business.                                                                    |
| Google Chat          | El informe de actividad de Google Chat devuelve información sobre cómo los usuarios de tu cuenta utilizan y gestionan Spaces. Cada informe utiliza la solicitud de endpoint básica con parámetros específicos del informe, como cargas u operaciones de mensajes.                                                  |
| Google Cloud         | El informe de actividad de Google Cloud devuelve información sobre diferentes eventos de actividad relacionados con la API de inicio de sesión en sistemas operativos en la nube (Cloud OS).                                                                                                                                                  |
| Google Keep          | El informe de actividad de Google Keep devuelve información sobre cómo los usuarios de tu cuenta gestionan y modifican sus notas. Cada informe utiliza la solicitud de endpoint básica con parámetros específicos del informe, como información de carga de archivos adjuntos u operaciones de notas.                       |
| Google Meet          | El informe de actividad Google Meet devuelve información sobre diferentes aspectos de eventos de llamadas. Cada informe utiliza la solicitud de endpoint básica con parámetros específicos del informe, como datos de informes de abuso o datos de observación de transmisiones en directo.                                                     |
| GPlus                | Los informes de actividad de la aplicación GPlus devuelven información sobre diferentes eventos de actividad de GPlus.                                                                                                                                                                   |
| Grupos               | Los informes de actividad de la aplicación Grupos de Google proporcionan información sobre diferentes eventos de actividad de Grupos.                                                                                                                                                              |
| Grupos de empresas    | Los informes de actividad de Grupos de empresas devuelven información sobre diferentes eventos de actividad de Grupos de empresa.                                                                                                                                                              |
| Jamboard             | El informe de actividad de Jamboard devuelve información sobre los cambios en los parámetros del dispositivo Jamboard. Cada informe utiliza la solicitud de endpoint básica con parámetros específicos del informe, como la licencia o los parámetros de emparejamiento de dispositivos.                                                  |
| Inicio de sesión                | Los informes de actividad de la aplicación de Inicio de sesión devuelven información contable sobre diferentes tipos de eventos de actividad de Inicio de sesión.                                                                                                                                                    |
| Móvil               | Los informes de actividad de Auditoría móvil devuelven información sobre diferentes tipos de eventos de actividad de Auditoría móvil.                                                                                                                                                            |
| Reglas                | Los informes de actividad de Reglas devuelven información sobre diferentes tipos de eventos de actividad de Reglas.                                                                                                                                                                          |
| Token                | Los informes de actividad de la aplicación Token devuelven información contable sobre distintos tipos de eventos de actividad de Token.                                                                                                                                                    |
| SAML                 | El informe de actividad de SAML devuelve información sobre los resultados de los intentos de inicio de sesión SAML. Cada informe utiliza la solicitud de endpoint básica con parámetros específicos del informe, como el tipo de fallo y el nombre de la aplicación SAML.                                                |
| Cuentas de usuario        | Los informes de actividad de la aplicación Cuentas de usuario ofrecen información sobre diferentes tipos de eventos de actividad de Cuentas de usuario.                                                                                                                                     |
| Vault                | Los logs de las acciones realizadas en la consola de Vault, como qué usuarios editaron reglas de retención o descargaron archivos de exportación.                                                                                                                                              |

## Configuración

### Instalación

1. Consulta la documentación de [API de informes: requisitos previos](https://developers.google.com/admin-sdk/reports/v1/guides/prerequisites) para Google Workspace Admin SDK para confirmar los requisitos previos antes de configurar la integración Datadog y Google Workspace.

1. Es posible que se requieran determinados alcances de OAuth para la configuración, tal y como se documenta en la página [Solicitudes de autorización](https://developers.google.com/workspace/guides/configure-oauth-consent) de Google Workspace Admin SDK. Sigue los pasos de la sección [Configurar el consentimiento de OAuth](https://app.datadoghq.com/account/settings#integrations/gsuite) de la página para definir el alcance adecuado.<br />
   **Notas**:<br />
   \- [Elige los alcances de la API de informes](https://developers.google.com/admin-sdk/reports/v1/reference/activities/list) para proporcionar el nivel mínimo de acceso necesario.<br />
   \- **No** necesitas [crear credenciales de acceso](https://docs.datadoghq.com/help/) para la aplicación.

1. Para configurar la integración de Google Workspace en Datadog, haz clic en el botón _Connect a new Google Workspace domain_ (Conectar un nuevo dominio de Google Workspace) en tu [cuadro de integración de Datadog y Google Workspace](https://app.datadoghq.com/account/settings#integrations/gsuite) y autoriza a Datadog a acceder a la API de Google Workspace Admin.

## Datos recopilados

### Logs

Consulta la [documentación de Google Workspace Admin SDK](https://developers.google.com/admin-sdk/reports/v1/reference/activities/list) para obtener la lista completa de logs recopilados y su contenido.

**Nota**: Los logs de Groups, Grupos de empresa, Inicio de sesión, Token y Calendar se rastrean cada 90 minutos debido a una limitación en la frecuencia con la que Google sondea estos logs. Los logs de esta integración solo se envían cada 1,5-2 horas.

### Métricas

La integración Google Workspace no incluye métricas.

### Eventos

La integración Google Workspace no incluye eventos.

### Checks de servicio

La integración Google Workspace no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).