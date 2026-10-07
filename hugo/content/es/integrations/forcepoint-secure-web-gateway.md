---
aliases:
- /es/integrations/forcepoint_secure_web_gateway
app_id: forcepoint-secure-web-gateway
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Obtén información sobre los logs de Forcepoint Secure Web Gateway
integration_version: 1.0.0
media:
- caption: Forcepoint Secure Web Gateway - Información general
  image_url: images/forcepoint_secure_web_gateway_overview.png
  media_type: imagen
- caption: Forcepoint Secure Web Gateway - Logs de DLP web
  image_url: images/forcepoint_secure_web_gateway_web_dlp_logs.png
  media_type: imagen
- caption: Forcepoint Secure Web Gateway - Logs web
  image_url: images/forcepoint_secure_web_gateway_web_logs.png
  media_type: imagen
title: Forcepoint Secure Web Gateway
---
## Información general

[Forcepoint Secure Web Gateway](https://www.forcepoint.com/product/secure-web-gateway-swg) aplica políticas de seguridad web en la nube o en el endpoint con aplicación distribuida para un acceso seguro y de alta velocidad a la web, dondequiera que esté tu personal. También ofrece funciones avanzadas de prevención de pérdida de datos (DLP) para evitar que la información confidencial se filtre en los sitios web.

Esta integración ingiere los siguientes logs:

- **Logs web**: Logs generados a partir de la actividad general de tráfico web de los usuarios.
- **Logs de DLP web**: Logs generados a partir de acciones de políticas de prevención de pérdida de datos (DLP).

La integración de Forcepoint Secure Web Gateway recopila estos logs y los reenvía a Datadog para un análisis directo. Datadog aprovecha sus pipelines de logs incorporados para analizar y enriquecer estos logs, facilitando la búsqueda avanzada y una información detallada. Con dashboards predefinidos, la integración ofrece visibilidad de las actividades web. Además, incluye reglas de detección predefinidas en Cloud SIEM para mejorar la monitorización y la seguridad.

## Configuración

### Generar un token OAuth para Forcepoint Secure Web Gateway

1. Iniciar sesión en la plataforma Forcepoint ONE Security Service Edge.

1. Ve a **SETTINGS > API Interface > OAuth** (PARÁMETROS > Interfaz de API > OAuth).

1. Se abre la page (página) **REST API OAuth Configuration** (Configuración de REST API OAuth), que te permite añadir y configurar diferentes niveles de permisos de API.

1. Para añadir una nueva configuración, haz clic en el icono del signo más verde.

1. En el cuadro de diálogo **Edit Application** (Editar aplicación), rellena la siguiente información:

   a. **Nombre**: Introduzce un nombre para la nueva configuración de la aplicación.

   b. **Permisos**: Selecciona **Access your Forcepoint logs (api logs)** (Acceder a tus logs de Forcepoint (logs de api).

   c. **Grupos de usuarios permitidos**: Selecciona la configuración que desees. En forma predeterminada es **All** (Todas).

   d. Haz clic en **OK** (ACEPTAR) para guardar los cambios. Tu solicitud se añade a la lista, pero su estado sigue siendo **Pending** (Pendiente).

1. Selecciona el nombre de tu aplicación en la columna **Application** (Aplicación) para abrir el cuadro de diálogo **Edit Application** (Editar aplicación).

   a. Haz clic en **Token Authorization URL** (URL de autorización de token) para autorizar tu permiso actual y obtener un token de acceso.

   b. En la page (página) **Requested Access** (Acceso solicitado), selecciona **Approve** (Aprobar) para los parámetros de permisos de la aplicación.

   c. Para cada usuario autorizado, envíale la URL de autorización de token y pídele que apruebe tu acceso.

1. Tras la aprobación, el usuario recibe un token de acceso que es único para él y que debe conservar. Este token de acceso es necesario para configurar la integración con Datadog. El token es válido para siempre y debe incluirse en cada solicitud de autorización.

1. Una vez aprobado el acceso, el estado de la solicitud cambia a **Authorized** (Autorizado).

Para obtener más información, consulta la documentación de Forcepoint sobre [Configuración de un token OAuth](https://help.forcepoint.com/fpone/sse_admin/prod/oxy_ex-1/deployment_guide/guid-18f77855-8dc9-436a-9fba-179f06a81066.html).

### Conecta tu Forcepoint Secure Web Gateway Edge a Datadog

1. Añade tu token de acceso.
   | Parámetros          | Descripción                                                                           |
   | ------------------- | ------------------------------------------------------------------------------------- |
   | Token de acceso | Token de acceso generado anteriormente |

1. Haz clic en el botón Save (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración de Forcepoint Secure Web Gateway recopila y reenvía logs Web y logs de DLP web a Datadog.

### Métricas

La integración de Forcepoint Secure Web Gateway no incluye ninguna métrica.

### Eventos

La integración de Forcepoint Secure Web Gateway no incluye ningún evento.

## Soporte

Si necesitas más ayuda, ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).