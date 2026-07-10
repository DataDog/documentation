---
app_id: tenable-io
app_uuid: 18788ece-f752-4584-a4e9-6652eaad80b5
assets:
  dashboards:
    Tenable.io - Activity Summary: assets/dashboards/tenable_io_activity_summary.json
    Tenable.io - Vulnerability Summary: assets/dashboards/tenable_io_vulnerability_summary.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 32769000
    source_type_name: Tenable.io
  logs:
    source: tenable-io
  monitors:
    Automatic asset age out activity detected: assets/monitors/automatic_asset_age_out_activity.json
    Multiple asset deletion activities detected: assets/monitors/asset_deletion_activity.json
    Multiple user impersonation activities detected: assets/monitors/user_impersonation_activity.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
- conformidad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tenable_io/README.md
display_on_public_website: true
draft: false
git_integration_title: tenable_io
integration_id: tenable-io
integration_title: Tenable.io
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tenable_io
public_title: Tenable.io
short_description: Obtén información sobre logs de Tenable.io.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Category::Compliance
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Obtén información sobre logs de Tenable.io.
  media:
  - caption: Tenable.io - Resumen de la actividad
    image_url: images/tenable_io_activity_summary.png
    media_type: imagen
  - caption: Tenable.io - Resumen de vulnerabilidades
    image_url: images/tenable_io_vulnerability_summary.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Tenable.io
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


## Información general

[Tenable.io][1] es una plataforma en la nube que proporciona una gran capacidad de detección, evaluación, creación de informes y priorización de vulnerabilidades en todos los sistemas y servicios. Mejora la visibilidad con la detección de recursos y ayuda a las organizaciones a gestionar su postura de seguridad de forma eficaz.

La integración Tenable.io recopila los siguientes tipos de logs:

- **Actividad**: Este endpoint contiene información sobre acciones de usuarios, eventos del sistema, análisis y tareas de control de seguridad, como gestión de permisos, asignación de roles y manejo de eventos de seguridad.
- **Vulnerabilidad**: Este endpoint contiene información sobre vulnerabilidades y recursos vulnerables asociados.

Esta integración recopila logs de las fuentes enumeradas anteriormente y los envía a Datadog.

## Configuración

### Generar credenciales de API en Tenable.io

1. Inicia sesión en tu cuenta de [Tenable.io][2].
2. Haz clic en el icono del perfil y selecciona **My Profile** (Mi perfil).
3. Ve a la sección **API Keys** (Claves de API).
4. Haz clic en el botón **Generate** (Generar) situado en la esquina inferior derecha de la página.
5. Revisa el mensaje en el cuadro de diálogo de advertencia y haz clic en **Continue** (Continuar) para generar la **Clave de acceso** y la **Clave secreta**.

### Conectar tu cuenta de Tenable.io a Datadog

1. Añadir tu clave de acceso y tu clave secreta
    |Parámetros | Descripción |
    |--------------------|--------------------|
    | Clave de acceso | Clave de acceso para tu cuenta de Tenable.io.|
    | Clave secreta | La clave secreta de tu cuenta de Tenable.io.|
2. Haz clic en el botón **Save** (Guardar) para guardar la configuración.

## Datos recopilados

### Logs 

La integración Tenable.io recopila logs y los reenvía a Datadog.

### Métricas

La integración Tenable.io no incluye métricas.

### Eventos

La integración Tenable.io no incluye eventos.

## Ayuda

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://www.tenable.com/
[2]: https://cloud.tenable.com/tio/app.html#/login
[3]: https://docs.datadoghq.com/es/help/