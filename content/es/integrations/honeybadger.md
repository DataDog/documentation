---
app_id: honeybadger
app_uuid: 385c386e-6394-41f4-8c92-5944e6b203f5
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 130
    source_type_name: Honeybadger
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- event management
- issue tracking
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: honeybadger
integration_id: honeybadger
integration_title: Honeybadger
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: honeybadger
public_title: Honeybadger
short_description: Visualiza, busca y analiza excepciones de Honeybadger en tu flujo
  de eventos.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Event Management
  - Category::Issue Tracking
  - Offering::Integration
  configuration: README.md#Configuración
  description: Visualiza, busca y analiza excepciones de Honeybadger en tu flujo de
    eventos.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Honeybadger
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

Honeybadger proporciona monitorización de excepciones y tiempo de actividad para mantener tus aplicaciones web libres de errores. Conecta Honeybadger a Datadog para recibir alertas de Honeybadger en tu flujo de eventos de Datadog.

## Configuración

### Instalación

Para capturar errores de Honeybadger:

1. Abre tu [lista de proyectos][1] de Honeybadger.
2. Haz clic en «Settings» (Configuración) del proyecto que deseas monitorizar.
3. Haz clic en «Alerts & Integrations» (Alertas e integraciones).
4. Selecciona «Datadog» como integración nueva.
5. Añade tu [clave de API][2].
6. Guarda la integración.
7. Haz clic en el botón **Install Integration** (Instalar integración) del [cuadro de integración de Honeybadger][3].

## Datos recopilados

### Métricas

La integración de Honeybadger no incluye métricas.

### Eventos

La integración de Honeybadger recopila eventos.

### Checks de servicio

La integración de Honeybadger no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://app.honeybadger.io/users/sign_in
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/account/settings#integrations/honeybadger
[4]: https://docs.datadoghq.com/es/help/