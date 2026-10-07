---
app_id: ping-one
app_uuid: 5fce4e84-ab6e-4ba6-b996-ac85e134642e
assets:
  dashboards:
    PingOne: assets/dashboards/ping_one.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18081106
    source_type_name: PingOne
  logs:
    source: ping-one
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
- https://github.com/DataDog/integrations-core/blob/master/ping_one/README.md
display_on_public_website: true
draft: false
git_integration_title: ping_one
integration_id: ping-one
integration_title: PingOne
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: ping_one
public_title: PingOne
short_description: Conoce mejor los logs de PingOne.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Setup
  description: Conoce mejor los logs de PingOne.
  media:
  - caption: PingOne
    image_url: images/ping_one.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: PingOne
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

[PingOne][1] es una oferta de identidad como servicio (IDaaS) de Ping Identity. Es una plataforma de identidad basada en la nube que provee una gama de servicios relacionados con la gestión de identidades y accesos (IAM), incluido el inicio de sesión único (SSO), la autenticación multifactor (MFA), la gestión de usuarios, etc.

Esta integración ingiere los siguientes logs:

- Auditoría: Representa todas las acciones realizadas en la consola de administración PingOne y PingDirectory. Se pueden utilizar para documentar un registro histórico de la actividad con fines de cumplimiento y otras aplicaciones de políticas empresariales.

La integración de PingOne recopila sin problemas los datos de logs de auditoría de PingOne utilizando las API REST. Utilizando el pipeline de logs predefinido, los logs se analizan y enriquecen para facilitar la búsqueda y el análisis. Esta integración incluye varios dashboards que visualizan el total de eventos de Auditoría, el total de intentos de inicio de sesión exitosos y fallidos, el total de intentos de inicio de sesión kerberos exitosos y fallidos, etc.

## Configurar

### Generar credenciales de API en PingOne

1. Inicia sesión en tu [cuenta PingOne][2].
2. En la barra lateral de navegación, amplía la sección **Aplicaciones** y selecciona **Aplicaciones**.
3. Haz clic en **+** (más) para empezar a crear una nueva aplicación.
4. Introduce un **Nombre de aplicación**.
5. Selecciona **Worker** como tipo de aplicación.
6. En el menú desplegable de la aplicación, asegúrate de que el conmutador de alternancia del encabezado esté activado para habilitar la aplicación.
7. Selecciona la pestaña **Roles** del menú desplegable de la aplicación.
8. Haz clic en el botón **Conceder roles**.
9. En **Responsabilidades disponibles**, en la **Sección de entorno administrativo**, selecciona los entornos a los que deseas conceder acceso y, a continuación, haz clic en **Guardar**.
10. Selecciona la pestaña **Configuración** y haz clic en **Editar**, cambia el **Método de autenticación del endpoint del token** a **Publicación de secreto del cliente** y, a continuación, haz clic en **Guardar**.
11. Selecciona la pestaña **Configuración** del menú desplegable de la aplicación para obtener el **ID del cliente**, el **Secreto del cliente** y el **ID del entorno**.

### Conecta tu cuenta PingOne a Datadog

1. Añade tus credenciales PingOne.

    | Parámetros PingOne | Descripción                                                                |
    | ----------------------------- | ----------------------------------------------------------------|
    | Dominio | El dominio de nivel superior de PingOne.                              |
    | ID del entorno | El ID del entorno de PingOne.                                |
    | ID del cliente | El ID del cliente de PingOne.                                     |
    | Secreto del cliente | El secreto del cliente de PingOne.                                 |

2. Haz clic en el botón **Guardar** para guardar la configuración.

## Datos recopilados

### Logs

Esta integración recopila y reenvía los logs de auditoría PingOne a Datadog.

### Métricas

La integración de PingOne no incluye ninguna métrica.

### Eventos

La integración de PingOne no incluye ningún evento.

## Asistencia

Para obtener más ayuda, ponte en contacto con [Asistencia técnica de Datadog][3].

[1]: https://www.pingidentity.com/en.html
[2]: https://www.pingidentity.com/bin/ping/signOnLink
[3]: https://docs.datadoghq.com/es/help/