---
app_id: atlassian-audit-records
app_uuid: 05aefffe-837f-414d-a550-b43ed99d24c2
assets:
  dashboards:
    confluence-audit-records: assets/dashboards/confluence_audit_records_overview.json
    jira-audit-records: assets/dashboards/jira_audit_records_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10390
    source_type_name: Registros de auditoría de Atlassian
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: atlassian_audit_records
integration_id: atlassian-audit-records
integration_title: Registros de auditoría de Jira y Confluence
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: atlassian_audit_records
public_title: Registros de auditoría de Jira y Confluence
short_description: Monitorizar, asegurar y optimizar entornos de Jira y Confluence
  de Atlassian
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorizar, asegurar y optimizar entornos de Jira y Confluence de
    Atlassian
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Registros de auditoría de Jira y Confluence
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general


Los registros de auditoría de [Jira][1] y [Confluence][2] de Atlassian proporcionan registros completos de actividades significativas a través de la gestión de usuarios, proyectos y la configuración de espacios, configuración del sistema y eventos de autenticación. Además de estos eventos de usuarios específicos de producto, recomendamos instalar la integración de **Logs de auditoría de la organización de Atlassian** para una visibilidad completa en eventos a través de todos los productos en tu organización de Atlassian.

Esta integración lleva estos logs de auditoría a Datadog, lo que te permite gestionar los riesgos, comprender las tendencias operativas y proteger tus entornos de Atlassian de forma más eficaz con [Cloud SIEM][3]. Además, puedes:
- Controlar la retención de datos de Jira y Confluence.
- Crear widgets y dashboards personalizados.
- Establecer reglas de detección que desencadenen acciones específicas.
- Hacer referencia cruzada de eventos de Jira y Confluence con los datos de otros servicios.

Estos logs incluyen información sobre:
- **Gestión de usuarios**: creación, eliminación y modificación de cuentas de usuario. Esto incluye cambios de contraseña, cambios de pertenencia a grupos y cambios en los permisos de usuario.
- **Configuración de proyecto**: creación, eliminación y actualización de proyectos, incluidos los cambios en los roles del proyecto, los flujos de trabajo, los tipos de problemas y los permisos del proyecto.
- **Actividades en espacios y páginas**: creación, eliminación y actualización de espacios y páginas. Esto puede incluir cambios en los permisos de espacios, ediciones de páginas y movimientos.
- **Configuración del sistema**: cambios en la configuración de Jira y Confluence, como configuraciones generales, permisos globales, enlaces de aplicaciones y configuración de complementos.
- **Autenticación y autorización**: intentos de inicio de sesión (con éxito y fallidos), eventos de cierre de sesión y cambios en las listas de control de acceso.

Después del parseo de logs de Jira y Confluence, Datadog rellena los dashboards de registros de auditoría de Jira y Confluence con información relacionada con los eventos de seguridad. Los widgets incluyen listas principales que muestran los intentos de inicio de sesión más frecuentes y eventos poco frecuentes y un mapa de geolocalización que muestra el país de origen de los intentos de inicio de sesión.

Busca `source:jira-audit-records` para ver tus registros de auditoría de Jira en el [producto de gestión de logs][4] de Datadog.
Busca `source:confluence-audit-records` para ver tus registros de auditoría de Confluence en el [producto de gestión de logs][4] de Datadog.

## Configuración

1. En la pestaña **Configuration** (Configuración) del cuadro Registros de auditoría de Atlassian, haz clic en el botón **Add Atlassian Account** (Añadir cuenta de Atlassian).
2. Sigue las instrucciones del cuadro de Registros de auditoría de Atlassian para autenticar la integración mediante OAuth con una cuenta de administrador de Atlassian. 

### Instalación


## Datos recopilados

### Métricas

Registro de auditoría de Atlassian no incluye ninguna métrica.

### Checks de servicio

Registro de auditoría de Atlassian no incluye ningún check de servicio.

### Eventos

Registro de auditoría de Atlassian no incluye ningún evento.

### Logs

La integración de Registro de auditoría de Atlassian de Datadog recopila logs utilizando la [API de registros de auditoría de Jira][1], la [API de registros de auditoría de Confluence][2], o ambas, que generan logs relacionados con la actividad de los usuarios que permiten conocer:

- Qué usuarios realizan solicitudes en Jira, Confluence o ambos
- Qué tipo de solicitudes se hacen
- El número total de solicitudes presentadas

Para obtener detalles más detallados sobre las propiedades incluidas en cada log, visita la [Sección de respuestas de los documentos de la API de registros de auditoría de Confluence][2] o la [Sección de respuestas de los documentos de la API de registros de auditoría de Jira][1]. Para ver estas categorías en los documentos vinculados anteriormente, sigue estos pasos: 
1. En la sección **Response** (Respuesta) debajo de **AuditRecords
Container** (Contenedor de AuditRecords) para una lista de registros de auditoría, haz clic en el botón **Show child properties** (Mostrar propiedades secundarias). Aparecerá una lista de propiedades secundarias para la respuesta de la API.
2. Haz clic en la flecha situada junto a **Records** (Registros).
3. Haz clic en el botón **Show child properties** (Mostrar propiedades secundarias) que aparece.
4. Aparece otra lista de propiedades secundarias incluidas en cada log. A continuación, puedes hacer clic en el desplegable situado junto a cada clave de log para obtener más información.  

## Solucionar problemas

#### Después de hacer clic en Authorize (Autorizar), recibo mensajes de error de Atlassian

Si seleccionas un tipo de log al que tu cuenta no tiene acceso, es posible que aparezca una pantalla de error de Atlassian con el mensaje:

```
Something went wrong 
Close this page and try again, or raise a support request.
```

En este caso, navega de nuevo al cuadro de Atlassian en Datadog. A continuación, selecciona el tipo de log al que puede acceder tu cuenta y vuelve a autorizarla.


#### Estoy autenticado en una cuenta, pero no veo logs desde todos los entornos. 
Actualmente, tienes que autenticarte para cada sitio por separado. Por ejemplo, si eres administrador de varios sitios, tendrás que autenticarte en cada uno de ellos por separado, lo cual es un [problema conocido de Atlassian][5]. 

#### ¿Se admiten las listas permitidas CORS? 
Sí, para más detalles consulta [esta sección][6] de Atlassian Docs.


#### Instalé esta integración antes del 07/02/2024 y no veo ningún log. 
Si instalaste esta integración antes del 07/02/2024, es posible que esté afectado por un error conocido. Para resolverlo, es posible que tengas que volver a instalar la integración. Esto implica eliminar la cuenta actual y volver a autenticarse utilizando una cuenta con privilegios de administrador para Confluence, Jira o ambos.


¿Necesitas ayuda?
- Ponte en contacto con el [soporte de Datadog][7].
- Ponte en contacto con Atlassian a través de sus [Recursos para desarrolladores][2].



[1]: https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records
[2]: https://developer.atlassian.com/cloud/confluence/rest/v1/api-group-audit/#api-group-audit
[3]: https://www.datadoghq.com/product/cloud-siem/
[4]: https://docs.datadoghq.com/es/logs/
[5]: https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#known-issues
[6]: https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#is-cors-whitelisting-supported-
[7]: https://docs.datadoghq.com/es/help/