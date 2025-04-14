---
app_id: auth0
app_uuid: 0c91d12e-f01e-47d9-8a07-4dba1cde4b67
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: auth0.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10098
    source_type_name: Auth0
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Auth0
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- rum
- recopilación de logs
- seguridad
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/auth0/README.md
display_on_public_website: true
draft: false
git_integration_title: auth0
integration_id: auth0
integration_title: Auth0
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: auth0
public_title: Auth0
short_description: Visualiza y analiza tus eventos Auth0.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Incidentes
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Setup
  description: Visualiza y analiza tus eventos Auth0.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Auth0
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Auth0 es una plataforma de identidad para equipos de desarrollo que proporciona a desarrolladores y empresas los elementos básicos que necesitan para proteger sus aplicaciones.


Esta integración aprovecha la transmisión de logs de Auth0 para enviar logs directamente a Datadog. Los logs se envían en tiempo real a medida que se generan en Auth0, ofreciendo a los clientes información actualizada sobre sus inquilinos Auth0. Una de las principales ventajas de utilizar esta integración es la capacidad de recopilar y visualizar datos para identificar tendencias. Los equipos de ingeniería la utilizan para visualizar las tasas de error y los datos de tráfico. Los equipos de seguridad la utilizan para visualizar el tráfico de autorizaciones y establecer alertas para acciones de alto riesgo.

### Casos de uso clave

#### Correlacionar la actividad con los datos de identidad para detectar tendencias

Los datos de identidad proporcionan información esencial sobre quién ha realizado qué actividad. Esto permite a los equipos comprender mejor el comportamiento de los usuarios en su sistema.

#### Decisiones sobre la arquitectura y el desarrollo del sistema

Mediante el seguimiento de las tendencias de identidad a lo largo del tiempo, los equipos pueden tomar decisiones informadas sobre el desarrollo de productos y la arquitectura de los sistemas. Por ejemplo, los equipos podrían priorizar el desarrollo basándose en el seguimiento de las horas pico de inicio de sesiones, las actividades de autenticación y las actividades geográficas.

#### Responder rápidamente a los incidentes de rendimiento y seguridad

La información sobre identidades puede utilizarse para identificar rápidamente incidentes de rendimiento y seguridad. Por ejemplo, los picos masivos de intentos fallidos de inicio de sesión podrían indicar un ataque de relleno de credenciales en curso, una de las amenazas más comunes dirigidas a los sistemas de identidad.

Mediante la configuración de umbrales, los equipos de seguridad pueden establecer alertas que les avisen cuando se producen eventos sospechosos, lo que les permite responder más rápidamente a los incidentes de seguridad.

## Configuración

Toda la configuración tiene lugar en el [dashboard de Auth0][1]. 

1. Inicia sesión en el [dashboard de Auth0][1].
2. Ve a **Logs** > **Flujos**.
3. Haz clic en **+ Create Stream** (+ Crear flujo).
4. Selecciona Datadog e introduce un nombre único para tu nuevo flujo de eventos de Datadog.
5. En la siguiente pantalla, introduce los siguientes parámetros para tu flujo de eventos de Datadog:


    | Configuración    | Descripción |
    | ---------------- | ---------------------------------------------------------- |
    | `API Key`       | Introduce tu [clave de API Datadog][2].                           |
    | `Region`        | Tu [sitio Datadog][3]. Por ejemplo, `EU` para app.datadoghq.eu, `US1` para app.datadoghq.com y `US3` para us3.datadoghq.com. |


6. Haz clic en **Save** (Guardar).

Cuando Auth0 escribe el log del siguiente inquilino, recibe una copia de ese evento de log en Datadog con el origen y servicio configurado en `auth0`.

### Validación

Visualiza logs en Datadog:

1. Ve a **Logs** > **Live Tail**.
2. Consulta logs Auth0 configurando `source:auth0`.

## Datos recopilados

### Recopilación de logs

Los logs Auth0 se recopilan y se envían a Datadog. Los tipos de logs que podrían devolverse se describen en [Códigos de tipos de eventos de logs][4].

### Métricas

auth0 no incluye métricas.

### Checks de servicio

auth0 no incluye checks de servicios.

### Eventos

auth0 no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].
Para obtener más información sobre integración, consulta nuestra [entrada de blog][6].

[1]: https://manage.auth0.com
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/es/getting_started/site/
[4]: https://auth0.com/docs/logs/references/log-event-type-codes
[5]: https://docs.datadoghq.com/es/help/
[6]: https://www.datadoghq.com/blog/monitor-auth0-with-datadog/