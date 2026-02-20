---
aliases:
- /es/integrations/atlassian_audit_records
app_id: atlassian-audit-records
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Monitorizar, asegurar y optimizar entornos de Jira y Confluence de Atlassian
media: []
supported_os:
- linux
- windows
- macos
title: Registros de auditoría de Jira y Confluence
---
## Información general

Los registros de auditoría de [Jira](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records) de Atlassian y [Confluence](https://developer.atlassian.com/cloud/confluence/rest/v1/api-group-audit/#api-group-audit) proporcionan registros completos de actividades significativas a través de la gestión de usuarios, la configuración de proyectos y espacios, ajustes del sistema y eventos de autenticación. Además de estos eventos de usuario específicos de cada producto, recomendamos instalar la integración **Atlassian Organization Audit Logs** para obtener una visibilidad completa de los eventos en todos los productos de tu organización de Atlassian.

Esta integración lleva estos logs de auditoría a Datadog, lo que te permite gestionar los riesgos, comprender las tendencias operativas y proteger tus entornos de Atlassian de forma más eficaz con [Cloud SIEM](https://www.datadoghq.com/product/cloud-siem/). Además, puedes:

- Controlar la retención de datos de Jira y Confluence.
- Crear widgets y dashboards personalizados.
- Definir reglas de detección que activen acciones específicas.
- Hacer referencia cruzada de eventos de Jira y Confluence con los datos de otros servicios.

Estos logs incluyen información sobre:

- **Gestión de usuarios**: creación, eliminación y modificación de cuentas de usuario. Esto incluye cambios de contraseña, cambios de pertenencia a grupos y cambios en los permisos de usuario.
- **Configuración de proyecto**: creación, eliminación y actualización de proyectos, incluidos los cambios en los roles del proyecto, los flujos de trabajo, los tipos de problemas y los permisos del proyecto.
- **Actividades en espacios y páginas**: creación, eliminación y actualización de espacios y páginas. Esto puede incluir cambios en los permisos de espacios, ediciones de páginas y movimientos.
- **Configuración del sistema**: cambios en la configuración de Jira y Confluence, como configuraciones generales, permisos globales, enlaces de aplicaciones y configuración de complementos.
- **Autenticación y autorización**: intentos de inicio de sesión (con éxito y fallidos), eventos de cierre de sesión y cambios en las listas de control de acceso.

Después del parseo de logs de Jira y Confluence, Datadog rellena los dashboards de registros de auditoría de Jira y Confluence con información relacionada con los eventos de seguridad. Los widgets incluyen listas principales que muestran los intentos de inicio de sesión más frecuentes y eventos poco frecuentes y un mapa de geolocalización que muestra el país de origen de los intentos de inicio de sesión.

Buscar `source:jira-audit-records` para ver tus registros de auditoría de Jira en el [producto Logs Management](https://docs.datadoghq.com/logs/) de Datadog.
Buscar `source:confluence-audit-records` para ver tus registros de auditoría de Confluence en el [producto Logs Management](https://docs.datadoghq.com/logs/) de Datadog.

## Configuración

1. En la pestaña **Configuration** (Configuración) del cuadro Registros de auditoría de Atlassian, haz clic en el botón **Add Atlassian Account** (Añadir cuenta de Atlassian).
1. Sigue las instrucciones del cuadro de Atlassian Audit Records para autenticar la integración mediante OAuth con una cuenta de administrador de Atlassian.

### Instalación

## Datos recopilados

### Métricas

Registro de auditoría de Atlassian no incluye ninguna métrica.

### Checks de servicio

Registro de auditoría de Atlassian no incluye ningún check de servicio.

### Eventos

Registro de auditoría de Atlassian no incluye ningún evento.

### Logs

La integración de Atlassian Audit Records de Datadog recopila logs mediante la [API de registros de auditoría de Jira](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records), la [API de registros de auditoría de Confluence](https://developer.atlassian.com/cloud/confluence/rest/v1/api-group-audit/#api-group-audit), o ambas, que generan logs relacionados con la actividad de los usuarios que permiten obtener información:

- Qué usuarios realizan solicitudes en Jira, Confluence o ambos
- Qué tipo de solicitudes se realizan
- El número total de solicitudes presentadas

Para obtener más detalles sobre las propiedades incluidas en cada log, visita la [sección de respuesta de los documentos de la API de registros de auditoría de Confluence](https://developer.atlassian.com/cloud/confluence/rest/v1/api-group-audit/#api-group-audit) o la [sección de respuesta de los documentos de la API de registros de auditoría de Jira](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records). Para ver estas categorías en los documentos vinculados anteriormente, sigue estos pasos:

1. En la sección **Response** (Respuesta) debajo de **AuditRecords
   Container** (Contenedor de AuditRecords) para una lista de registros de auditoría, haz clic en el botón **Show child properties** (Mostrar propiedades secundarias). Aparecerá una lista de propiedades secundarias para la respuesta de la API.
1. Haz clic en la flecha situada junto a **Records** (Registros).
1. Haz clic en el botón **Show child properties** (Mostrar propiedades secundarias) que aparece.
1. Aparecerá otra lista de propiedades secundarias incluidas en cada log. A continuación, puedes hacer clic en el menú desplegable situado junto a cada clave de log para obtener más información.

## Solucionar problemas

#### Después de hacer clic en Authorize (Autorizar), recibo mensajes de error de Atlassian

Si seleccionas un tipo de log al que tu cuenta no tiene acceso, es posible que aparezca una pantalla de error de Atlassian con el mensaje:

```
Something went wrong 
Close this page and try again, or raise a support request.
```

En este caso, navega de nuevo al cuadro de Atlassian en Datadog. A continuación, selecciona el tipo de log al que puede acceder tu cuenta y vuelve a autorizarla.

#### Estoy autenticado en una cuenta, pero no veo logs de todos los entornos.

Actualmente, tienes que autenticarte para cada sitio por separado. Por ejemplo, si eres administrador de varios sitios, tendrás que autenticarte en cada uno de ellos por separado, lo cual es un [problema conocido de Atlassian] (https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#known-issues).

#### ¿Se admite el uso de la lista de permitidos de CORS?

Sí, para más detalles, consulta [esta sección](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/#is-cors-whitelisting-supported-) de los documentos de Atlassian.

#### He instalado esta integración antes del 07/02/2024 y no veo ningún log.

Si instalaste esta integración antes del 07/02/2024, es posible que esté afectado por un error conocido. Para resolverlo, es posible que tengas que volver a instalar la integración. Esto implica eliminar la cuenta actual y volver a autenticarse utilizando una cuenta con privilegios de administrador para Confluence, Jira o ambos.

¿Necesitas ayuda?

- Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).
- Ponte en contacto con Atlassian a través de sus [Recursos para desarrolladores](https://developer.atlassian.com/cloud/confluence/rest/v1/api-group-audit/#api-group-audit).