---
app_id: authzed-cloud
app_uuid: 01957258-b7bc-701c-b7f5-1ae15bba0209
assets:
  dashboards:
    Authzed Cloud Overview: assets/dashboards/authzed_cloud_overview.json
  integration:
    auto_install: true
    metrics:
      check:
      - authzed_cloud.metrics.up
      metadata_path: metadata.csv
      prefix: authzed_cloud
    process_signatures: []
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 42246681
    source_type_name: authzed_cloud
    supports_ddr_coordinated_failover: false
author:
  homepage: https://authzed.com
  name: AuthZed
  sales_email: sales@authzed.com
  support_email: support@authzed.com
  vendor_id: authzed
categories:
- herramientas de desarrollo
- seguridad
- nube
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/authzed_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: authzed_cloud
integration_id: authzed-cloud
integration_title: AuthZed Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: authzed_cloud
public_title: AuthZed Cloud
short_description: AuthZed Cloud es un sistema de bases de datos de núcleo abierto
  para la creación y la gestión de permisos de aplicaciones críticos para la seguridad.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Security
  - Category::Cloud
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: AuthZed Cloud es un sistema de bases de datos de núcleo abierto para
    la creación y la gestión de permisos de aplicaciones críticos para la seguridad.
  media:
  - caption: Ejemplo de dashboard
    image_url: images/dd-dashboard.png
    media_type: imagen
  - caption: Interfaz de usuario de gestión de AuthZed Cloud
    image_url: images/management-ui.png
    media_type: imagen
  - caption: Zona de juegos del esquema SpiceDB
    image_url: images/playground.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: AuthZed Cloud
  uninstallation: README.md#Uninstallation
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

[Authzed Cloud][1] es un sistema de bases de datos de núcleo abierto inspirado en [Google Zanzibar][2] para la creación y la gestión de permisos de aplicaciones críticos para la seguridad.

Los desarrolladores definen un esquema que modela sus requisitos de permisos. A continuación, utilizan cualquiera de las bibliotecas de clientes oficiales o de la comunidad para aplicar el esquema e introducir datos en la base de datos. Pueden consultar estos datos para comprobar eficazmente permisos en sus aplicaciones.

Las métricas de Authzed Cloud permiten a los desarrolladores y SRE monitorizar sus despliegues, incluyendo la latencia de las solicitudes, las métricas de caché (como el tamaño y las tasas de aciertos y errores), la conexión al almacén de datos y el rendimiento de las consultas. Estas métricas ayudan a diagnostican problemas de rendimiento y a ajustar el rendimiento de tu clúster de SpiceDB.

El envío de estas métricas a Datadog permite a los usuarios aprovechar su stack tecnológico de observabilidad existente y correlacionar las métricas de Authzed Cloud con otros eventos del sistema.

## Configuración

La integración Datadog está disponible en el dashboard de AuthZed en la pestaña "Configuración" de un sistema de permisos.

1.  Ve a la página de inicio del dashboard.
2.  Selecciona un sistema de permisos del que enviar métricas.
2.  Haz clic en la pestaña **Configuración**.
3.  Desplázate al bloque **Datadog Metrics** (Métricas de Datadog) de la interfaz de usuario de configuración.
4.  Introduce la **clave de API** de tu cuenta de Datadog.
5.  Introduce tu [sitio Datadog][3] si es diferente del predeterminado.
6.  Haz clic en **Save** (Guardar).

Para asegurarte de que el gráfico de latencia del dashboard muestra correctamente las latencias p50, p95 y p99, también tendrás que definir la configuración de **Percentiles** de la métrica `authzed.grpc.server_handling` como **ON** en la vista de **Resumen de métricas**. 

Poco después deberías ver cómo las métricas empiezan a fluir a Datadog. Si no es así, ponte en contacto con [nuestro servicio de asistencia][4].

## Desinstalación

La integración Datadog está disponible en el dashboard de AuthZed en la pestaña "Configuración" de un sistema de permisos.

1.  Ve a la página de inicio del dashboard.
2.  Selecciona un sistema de permisos del que enviar métricas.
2.  Haz clic en la pestaña **Configuración**.
3.  Desplázate al bloque **Datadog Metrics** (Métricas de Datadog) de la interfaz de usuario de configuración.
4.  Haz clic en **Remove** (Eliminar).

Esta acción desactiva la integración Datadog en tu clúster de AuthZed Cloud. Ten en cuenta que este proceso puede tardar varios minutos.

## Ayuda

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de AuthZed][5].


[1]: https://authzed.com/products/authzed-dedicated
[2]: https://authzed.com/zanzibar
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://app.datadoghq.com/support@authzed.com
[5]: mailto:support@authzed.com