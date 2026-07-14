---
app_id: forcepoint-security-service-edge
app_uuid: 2a8fcdbf-9f07-4729-9f65-b4b60794e6b8
assets:
  dashboards:
    Forcepoint Security Service Edge - Access Logs: assets/dashboards/forcepoint_security_service_edge_access_logs.json
    Forcepoint Security Service Edge - Admin Logs: assets/dashboards/forcepoint_security_service_edge_admin_logs.json
    Forcepoint Security Service Edge - Cloud Logs: assets/dashboards/forcepoint_security_service_edge_cloud_logs.json
    Forcepoint Security Service Edge - Health Logs: assets/dashboards/forcepoint_security_service_edge_health_logs.json
    Forcepoint Security Service Edge - Overview: assets/dashboards/forcepoint_security_service_edge_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 35705978
    source_type_name: Forcepoint Security Service Edge
  logs:
    source: forcepoint-security-service-edge
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
- https://github.com/DataDog/integrations-core/blob/master/forcepoint_security_service_edge/README.md
display_on_public_website: true
draft: false
git_integration_title: forcepoint_security_service_edge
integration_id: forcepoint-security-service-edge
integration_title: Forcepoint Security Service Edge
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: forcepoint_security_service_edge
public_title: Forcepoint Security Service Edge
short_description: Obtén información sobre los logs de Forcepoint Security Service
  Edge
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Configuración
  description: Obtén información sobre los logs de Forcepoint Security Service Edge
  media:
  - caption: 'Forcepoint Security Service Edge: logs de acceso'
    image_url: images/forcepoint_security_service_edge_access_logs.png
    media_type: imagen
  - caption: 'Forcepoint Security Service Edge: logs de administración'
    image_url: images/forcepoint_security_service_edge_admin_logs.png
    media_type: imagen
  - caption: 'Forcepoint Security Service Edge: logs en la nube'
    image_url: images/forcepoint_security_service_edge_cloud_logs.png
    media_type: imagen
  - caption: 'Forcepoint Security Service Edge: logs de estado'
    image_url: images/forcepoint_security_service_edge_health_logs.png
    media_type: imagen
  - caption: 'Forcepoint Security Service Edge: información general'
    image_url: images/forcepoint_security_service_edge_overview.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Forcepoint Security Service Edge
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->
## Información general

[Forcepoint Security Service Edge][1] simplifica la seguridad en el perímetro proporcionando acceso seguro y protección de datos. Security Service Edge (SSE) elimina las lagunas en la cobertura unificando la configuración de políticas, la aplicación y la generación de informes en una única plataforma.


Esta integración ingiere los siguientes logs:

- **Logs en la nube (CloudSummary, CloudAudit)**: logs relacionados con el estado actual de los archivos de las aplicaciones en la nube y los resultados del análisis de cada archivo de la cuenta.
- **Logs de acceso**: logs relacionados con diversas actividades de la aplicación.
- **Logs de administración**: eventos de administración realizados dentro del portal de administración.
- **Logs de estado (HealthProxy, HealthApi, HealthSystem)**: logs relacionados con el estado del sistema, la API y el proxy. 


La integración de Forcepoint Security Service Edge recopila estos logs y los reenvía a Datadog para un análisis sin fisuras. Datadog aprovecha sus pipelines de log integrados para analizar y enriquecer estos logs, facilitando una búsqueda sencilla e información detallada. Con dashboards preconfigurados y predefinidos, la integración ofrece una visibilidad clara de las actividades dentro de la plataforma de Forcepoint Security Service Edge. Además, incluye reglas de detección predefinidas en Cloud SIEM para mejorar la supervisión y la seguridad.


## Configurar

### Generar un token de OAuth en Forcepoint Security Service Edge:
1. Inicia sesión en la plataforma de Forcepoint ONE Security Service Edge.
2. Ve a **SETTINGS > API Interface > OAuth** (AJUSTES > Interfaz de la API > OAuth).
3. En la página abierta **REST API OAuth Configuration** (Configuración de OAuth de la API de REST), añade y configura diferentes niveles de permisos de API.
4. Haz clic en los iconos **verdes** más para añadir una nueva configuración.
5. En el cuadro de diálogo **Edit Application** (Editar aplicación), rellena la información de la siguiente manera:

    a. **Nombre**: nombre para la nueva configuración de la aplicación.

    b. **Permisos**: selecciona la opción **Access your Forcepoint logs (logs api)** (Acceder a tus logs de Forcepoint [API de logs]).

    c. **Grupo de usuarios permitidos**: por defecto es **All** (Todos). Selecciónalo en función de tus necesidades.

    d. Haz clic en **Ok** para guardar los cambios. Deberías ver tu aplicación añadida a la lista, pero como **Pending** (Pendiente) en estado.

6. Selecciona el nombre de tu aplicación en la columna **Application** (Aplicación) para entrar en **Edit Application** (Editar aplicación).

    a. En el cuadro de diálogo **Edit Application** (Editar aplicación), haz clic en **Token Authorization URL** (URL de autorización del token) para autorizar tu permiso actual y obtener el token de acceso.

    b. En la página **Requested Access** (Acceso solicitado) envía esta URL a cada usuario permitido has que **Approve** (Aprueben) su acceso. La página **Requested Access** (Acceso solicitado) te permite **Approve** (Aprobar) o **Deny** (Denegar) los ajustes de permisos de la aplicación.

7. Después de que el usuario aprueba, se le da un **Token de acceso** que es único para ese usuario. El usuario debe conservar este token de acceso, es necesario para configurar integraciones en Datadog. El token es válido para siempre y debe incluirse en cada solicitud de autorización.
8. Una vez aprobado el acceso, observarás que **Status** (Estado) cambia a **Authorized** (Autorizado).


Para más información, consulta la documentación de [Configuración de un token de OAuth][2].

### Conectar tu cuenta de Forcepoint Security Service Edge a Datadog

1. Añade tu token de acceso.
   | Parámetros          | Descripción                                                                           |
   | ------------------- | ------------------------------------------------------------------------------------- |
   | Token de acceso        | Token de acceso de Forcepoint Security Service Edge                         |

2. Haz clic en **Save** (Guardar).

## Datos recopilados

### Logs

La integración de Forcepoint Security Service Edge recopila y reenvía logs de nube (CloudSummary, CloudAudit), logs de acceso, logs de administración y logs de estado (HealthProxy, HealthApi, HealthSystem) a Datadog. 

### Métricas

La integración de Forcepoint Security Service Edge no incluye ninguna métrica.

### Eventos

La integración de Forcepoint Security Service Edge no incluye ningún evento.

## Soporte

Si necesitas más ayuda, ponte en contacto con el [soporte de Datadog][2].

[2]:https://help.forcepoint.com/fpone/sse_admin/prod/oxy_ex-1/deployment_guide/guid-18f77855-8dc9-436a-9fba-179f06a81066.html
[1]: https://www.forcepoint.com/use-case/security-service-edge-sse
[2]: https://docs.datadoghq.com/es/help/