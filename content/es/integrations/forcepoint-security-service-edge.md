---
aliases:
- /es/integrations/forcepoint_security_service_edge
app_id: forcepoint-security-service-edge
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtén información sobre los logs de Forcepoint Security Service Edge
integration_version: 1.0.0
media:
- caption: Forcepoint Security Service Edge - Logs de acceso
  image_url: images/forcepoint_security_service_edge_access_logs.png
  media_type: imagen
- caption: Forcepoint Security Service Edge - Logs de administración
  image_url: images/forcepoint_security_service_edge_admin_logs.png
  media_type: imagen
- caption: Forcepoint Security Service Edge - Logs en la nube
  image_url: images/forcepoint_security_service_edge_cloud_logs.png
  media_type: imagen
- caption: Forcepoint Security Service Edge - Logs de estado
  image_url: images/forcepoint_security_service_edge_health_logs.png
  media_type: imagen
- caption: Forcepoint Security Service Edge - Información general
  image_url: images/forcepoint_security_service_edge_overview.png
  media_type: imagen
title: Forcepoint Security Service Edge
---
## Información general

[Forcepoint Security Service Edge](https://www.forcepoint.com/use-case/security-service-edge-sse) simplifica la seguridad en el perímetro ofreciendo acceso seguro y protección de datos. Security Service Edge (SSE) elimina las lagunas en la cobertura unificando la configuración de políticas, la aplicación y la generación de informes en una única plataforma.

Esta integración ingiere los siguientes logs:

- **Logs en la nube (CloudSummary, CloudAudit)**: Logs relacionados con el estado actual de los archivos de las aplicaciones en la nube y los resultados del análisis de cada archivo de la cuenta.
- **Logs de acceso**: Logs relacionados con distintas actividades de la aplicación.
- **Logs de administración**: Eventos de administración realizados en el portal de administración.
- **Logs de estado (HealthProxy, HealthApi, HealthSystem)**: Logs relacionados con la estado del sistema, la API y el proxy.

La integración de Forcepoint Security Service Edge recopila estos logs y los reenvía a Datadog para un análisis directo. Datadog aprovecha sus pipelines de logs integrados para analizar y enriquecer estos logs, facilitando una búsqueda sencilla e información detallada. Con dashboards preconfigurados y predefinidos, la integración ofrece una visibilidad clara de las actividades en la plataforma Forcepoint Security Service Edge. Además, incluye reglas de detección predefinidas en Cloud SIEM para mejorar la monitorización y la seguridad.

## Configuración

### Genera Token OAuth en Forcepoint Security Service Edge:

1. Inicia sesión en la plataforma de Forcepoint ONE Security Service Edge.

1. Ve a **SETTINGS > API Interface > OAuth** (PARÁMETROS > Interfaz de la API > OAuth.

1. En la page (página) abierta **REST API OAuth Configuration** (Configuración de REST API OAuth), añade y configura diferentes niveles de permisos de API.

1. Haz clic en los iconos **green** (verde) más para añadir una nueva configuración.

1. En el cuadro de diálogo **Edit Application** (Editar aplicación), rellena la información de la siguiente manera:

   a. **Nombre**: Nombre para la nueva configuración de la aplicación.

   b. **Permisos**: Selecciona la opción **Access your Forcepoint logs (logs api)** (Accede a tus logs de Forcepoint (api de logs)).

   c. **Grupo de usuarios permitidos**: En forma predeterminada, es **All** (Todos). Selecciónalo en función de tus necesidades.

   d. Haz clic en **Ok** (Aceptar) para guardar los cambios. Deberías ver tu solicitud añadida a la lista, pero como **Pending** (Pendiente) en estado.

1. Selecciona el nombre de tu aplicación en la columna **Application** (Aplicación) para entrar en **Edit Application** (Editar aplicación).

   a. En el cuadro de diálogo **Edit Application** (Editar aplicación), haz clic en **Token Authorization URL** (URL de autorización de token) para autorizar tu permiso actual y obtener el token de acceso.

   b. En la page (página) **Requested Access** (Acceso Solicitado) envía esta URL a cada usuario con permiso y haz que **Approve** (Aprueben) su acceso. La page (página) **Requested Acces** (Acceso Solicitado) te permite **Approve** (Aprobar) o **Deny** (Denegar) la configuración de permisos de la aplicación.

1. Después de que el usuario aprueba, se le da un **Access Token** (Token de Acceso) que es único para ese usuario. El usuario debe conservar este token de acceso, es necesario para configurar integraciones en Datadog. El token es válido para siempre y debe incluirse en cada solicitud de autorización.

1. Una vez aprobado el acceso, observará que el **Status** (Estado) cambia a **Authorized** (Autorizado).

Para obtener más información, consulta la documentación [Configuración de un token OAuth](https://help.forcepoint.com/fpone/sse_admin/prod/oxy_ex-1/deployment_guide/guid-18f77855-8dc9-436a-9fba-179f06a81066.html).

### Conecta tu cuenta de Forcepoint Security Service Edge a Datadog

1. Añade tu token de acceso.
   | Parámetros          | Descripción                                                                           |
   | ------------------- | ------------------------------------------------------------------------------------- |
   | Token de acceso        | Token de acceso de Forcepoint Security Service Edge                         |

1. Haz clic en **Save** (Guardar).

## Datos recopilados

### Logs

La integración de Forcepoint Security Service Edge recopila y reenvía los logs en la nube (CloudSummary, CloudAudit), logs de acceso, logs de administración y logs de estado (HealthProxy, HealthApi, HealthSystem) a Datadog.

### Métricas

La integración de Forcepoint Security Service Edge no incluye ninguna métrica.

### Eventos

La integración de Forcepoint Security Service Edge no incluye ningún evento.

## Soporte

Si necesitas más ayuda, ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).