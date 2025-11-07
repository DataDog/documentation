---
app_id: forcepoint-secure-web-gateway
app_uuid: 183f1ae8-8bc0-4135-8b17-e6ff2b449f9c
assets:
  dashboards:
    Forcepoint Secure Web Gateway - Overview: assets/dashboards/forcepoint_secure_web_gateway_overview.json
    Forcepoint Secure Web Gateway - Web DLP Logs: assets/dashboards/forcepoint_secure_web_gateway_web_dlp_logs.json
    Forcepoint Secure Web Gateway - Web Logs: assets/dashboards/forcepoint_secure_web_gateway_web_logs.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 36227438
    source_type_name: Forcepoint Secure Web Gateway
  logs:
    source: forcepoint-secure-web-gateway
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/forcepoint_secure_web_gateway/README.md
display_on_public_website: true
draft: false
git_integration_title: forcepoint_secure_web_gateway
integration_id: forcepoint-secure-web-gateway
integration_title: Forcepoint Secure Web Gateway
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: forcepoint_secure_web_gateway
public_title: Forcepoint Secure Web Gateway
short_description: Obtener información sobre logs de Forcepoint Secure Web Gateway
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Tipo de datos enviados::Logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Obtener información sobre logs de Forcepoint Secure Web Gateway
  media:
  - caption: Forcepoint Secure Web Gateway - Información general
    image_url: images/forcepoint_secure_web_gateway_overview.png
    media_type: imagen
  - caption: Forcepoint Secure Web Gateway - Logs DLP web
    image_url: images/forcepoint_secure_web_gateway_web_dlp_logs.png
    media_type: imagen
  - caption: Forcepoint Secure Web Gateway - Logs web
    image_url: images/forcepoint_secure_web_gateway_web_logs.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Forcepoint Secure Web Gateway
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

[Forcepoint Secure Web Gateway][1] aplica políticas de seguridad web en la nube o en el endpoint con aplicación distribuida para un acceso seguro y de alta velocidad a la web, dondequiera que esté tu personal. También ofrece funciones avanzadas de prevención de pérdida de datos (DLP) para evitar que la información confidencial se filtre en sitios web.



Esta integración ingiere los siguientes logs:

- **Logs web**: Logs generados a partir de la actividad general de tráfico web de los usuarios.
- **Logs DLP web**: Logs generados a partir de acciones de políticas de prevención de pérdida de datos (DLP).


La integración de Forcepoint Secure Web Gateway recopila estos logs y los reenvía a Datadog para un análisis continuo. Datadog aprovecha sus pipelines de logs incorporados para analizar y enriquecer estos logs, facilitando la búsqueda avanzada y una visión detallada. Con dashboards predefinidos preconfigurados, la integración ofrece visibilidad de las actividades web. Además, incluye reglas de detección listas para utilizar en Cloud SIEM para mejorar la monitorizzación y la seguridad.


## Configuración

### Generar un token OAuth para Forcepoint Secure Web Gateway
1. Inicia sesión en la plataforma Forcepoint ONE Security Service Edge.
2. Ve a **SETTINGS > API Interface > OAuth** (AJUSTES > Interfaz de API > OAuth).
3. Se abre la página **REST API OAuth Configuration** (Configuración OAuth de la API REST), que te permite añadir y configurar diferentes niveles de permisos de API.
4. Para añadir una nueva configuración, haz clic en el icono verde del signo más.
5. En el cuadro de diálogo **Edit Application** (Editar aplicación), rellena la siguiente información:

    a. **Nombre**: Introduce un nombre para la configuración de la nueva aplicación.

    b. **Permisos**: Selecciona **Access your Forcepoint logs (logs api)** (Acceder a tus logs de Forcepoint (api logs)).

    c. **Grupos de usuarios permitidos**: Selecciona la configuración deseada. Por defecto es **All** (Todo).

    d. Haz clic en **Ok** para guardar los cambios. Tu aplicación se añade a la lista, pero su estado sigue siendo **Pendiente**.
6. Selecciona el nombre de tu aplicación en la columna **Application** (Aplicación) para abrir el cuadro de diálogo **Edit Application** (Editar aplicación).

    a. Haz clic en **Token Authorization URL** (URL de autorización de token) para autorizar tu permiso actual y obtener un token de acceso.

    b. En la página **Acceso solicitado**, selecciona **Approve** (Aprobar) para la configuración de permisos de la aplicación.

    c. Para cada usuario autorizado, envíale la URL de autorización de token y pídele que apruebe su acceso.
7. Tras la aprobación, el usuario recibe un token de acceso que es único para él y que debe conservar. Este token de acceso es necesario para configurar la integración con Datadog. El token es válido para siempre y debe incluirse en cada solicitud de autorización.
8. Una vez aprobado el acceso, el estado de la solicitud cambia a **Autorizada**.


Para obtener más información, consulta la documentación de Forcepoint sobre [Configuración de un token OAuth][2].

### Conectar tu Forcepoint Secure Web Gateway Edge a Datadog

1. Añade tu token de acceso.
   | Parámetros          | Descripción                                                                           |
   | ------------------- | ------------------------------------------------------------------------------------- |
   | Token de acceso | Token de acceso generado más arriba  |

2. Haz clic en el botón "Save" (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración de Forcepoint Secure Web Gateway recopila y reenvía logs web y logs DLP web a Datadog.

### Métricas

La integración de Forcepoint Secure Web Gateway no incluye métricas.

### Eventos

La integración de Forcepoint Secure Web Gateway no incluye eventos.

## Soporte

Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][2].

[2]:https://help.forcepoint.com/fpone/sse_admin/prod/oxy_ex-1/deployment_guide/guid-18f77855-8dc9-436a-9fba-179f06a81066.html
[1]: https://www.forcepoint.com/product/secure-web-gateway-swg
[2]: https://docs.datadoghq.com/es/help/