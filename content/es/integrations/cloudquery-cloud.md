---
app_id: cloudquery-cloud
app_uuid: 727e53a9-0bbe-4277-8ed0-9e9425fe34de
assets:
  oauth: assets/oauth_clients.json
author:
  homepage: https://cloud.cloudquery.io/
  name: CloudQuery
  sales_email: hello@cloudquery.io
  support_email: support@cloudquery.io
categories:
- herramientas de desarrollo
- nube
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cloudquery-cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: cloudquery-cloud
integration_id: cloudquery-cloud
integration_title: CloudQuery Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cloudquery-cloud
public_title: CloudQuery Cloud
short_description: Movimiento de datos sencillo, rápido y ampliable
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Categoría::Herramientas de desarrollo
  - Offering::Integration
  - Category::Cloud
  - Queried Data Type::Metrics
  - Queried Data Type::Logs
  - Queried Data Type::Events
  configuration: README.md#Setup
  description: Movimiento de datos sencillo, rápido y ampliable
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CloudQuery Cloud
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

[CloudQuery][1] es un marco de integración de datos de código abierto y alto rendimiento creado para desarrolladores y compatible con una amplia gama de complementos.

CloudQuery extrae, transforma y carga configuración desde las APIs de la nube a una variedad de destinos compatibles, como bases de datos, lagos de datos o plataformas de streaming para su posterior análisis.

[CloudQuery Cloud][2] es una gran manera de empezar con CloudQuery y sincronizar datos desde la fuente al destino sin necesidad de desplegar tu propia infraestructura. También es mucho más fácil conectarte a fuentes y destinos con el soporte integrado de autenticación OAuth. Sólo tienes que seleccionar un complemento de origen y destino y CloudQuery se encargará del resto.

## Configuración

### Instalación

1. Regístrate gratis en [cloud.cloudquery.io][2]. 
2. En Datadog, navega hasta el cuadro de integración de CloudQuery Cloud
3. Haz clic en **Connect Accounts** (Conectar cuentas).
4. Serás redirigido a CloudQuery para iniciar sesión
5. Ve a la página **Sources** (Fuentes) y añade una fuente de Datadog 
6. En la sección **Authentication** (Autenticación), utiliza el botón **Authenticate** (Autenticar) para conceder acceso a tu cuenta de Datadog utilizando el flujo OAuth2.

Para más información sobre el uso de CloudQuery Cloud, consulta la [guía de inicio rápido][3].

### Configuración

La documentación detallada de la fuente de Datadog de CloudQuery está disponible [aquí][4].

## Desinstalación

1. Ve a la página **Sources** (Fuentes) en [CloudQuery Cloud][2] y busca la fuente de Datadog que has configurado previamente. 
2. En la pestaña **Edit source** (Editar fuente), haz clic en el botón **Delete this source** (Eliminar esta fuente).

## Asistencia

Para obtener asistencia, ponte en contacto con [CloudQuery][1] o [CloudQuery Community][5].

[1]: https://www.cloudquery.io/
[2]: https://cloud.cloudquery.io/
[3]: https://docs.cloudquery.io/docs/quickstart/cloudquery-cloud
[4]: https://hub.cloudquery.io/plugins/source/cloudquery/datadog/latest/docs
[5]: https://community.cloudquery.io/