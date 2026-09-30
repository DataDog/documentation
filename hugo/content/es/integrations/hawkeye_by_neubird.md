---
app_id: hawkeye-by-neubird
app_uuid: 0195aa67-c4bc-714b-a2e7-0230fb1055e7
assets:
  dashboards:
    Hawkeye by Neubird Overview: assets/dashboards/hawkeye_by_neubird_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    process_signatures: []
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 42321382
    source_type_name: neubird_hawkeye
    supports_ddr_coordinated_failover: false
  oauth: assets/oauth_clients.json
author:
  homepage: https://neubird.ai
  name: NeuBird Inc.
  sales_email: sales@neubird.ai
  support_email: hawkeye@neubird.ai
  vendor_id: neubird-inc
categories:
- ai/ml
- rum
- colaboración
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hawkeye_by_neubird/README.md
display_on_public_website: true
draft: false
git_integration_title: hawkeye_by_neubird
integration_id: hawkeye-by-neubird
integration_title: Hawkeye by NeuBird
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: hawkeye_by_neubird
public_title: Hawkeye by NeuBird
short_description: Investigación de incidentes basada en IA para monitores Datadog
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Categoría::Incidentes
  - Category::Collaboration
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Tipo de datos consultados::Trazas
  - Queried Data Type::Incidents
  - Queried Data Type::Events
  - Tipo de datos consultados::Métricas
  - Tipo de datos enviados::Eventos
  configuration: README.md#Setup
  description: Investigación de incidentes basada en IA para monitores Datadog
  media:
  - caption: Dashboard de Hawkeye
    image_url: images/Hawkeye-Dashboard.png
    media_type: imagen
  - caption: Configurar sesiones automatizadas
    image_url: images/DD-automated.png
    media_type: imagen
  - caption: Consultar un resumen de la investigación
    image_url: images/DD_Summary.jpg
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Hawkeye by NeuBird
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Hawkeye by NeuBird acelera la resolución de incidentes diagnosticando incidentes y automatizando el análisis de sus causas. Esta integración permite a Hawkeye buscar monitores de Datadog activados y, a continuación, investigar de forma autónoma la causa. Una vez finalizada la investigación, se añade un enlace al análisis de la investigación directamente a la página de incidentes de Datadog relacionada, lo que acelera la resolución y reduce el tiempo medio de recuperación.

## Configuración

1.  En Datadog, ve a **Integrations** (Integraciones), selecciona el cuadro de Hawkeye y haz clic en **Install Integration** (Instalar integración).

2. Haz clic en **Connect Accounts** (Conectar cuentas) para iniciar el proceso de autorización. Se te redirigirá a Hawkeye para finalizar la configuración.

3.  Una vez autorizado, Hawkeye comienza a enviar los resultados de la investigación a Datadog.


## Desinstalación

En Datadog, ve a **Integrations** (Integraciones), selecciona el cuadro de Hawkeye y haz clic en **Uninstall Integration** (Desinstalar integración).

- Una vez que desinstales esta integración, se revocarán todas las autorizaciones anteriores.

- Además, asegúrate de que todas las claves de API asociadas a esta integración se hayan deshabilitado, buscando el nombre de la integración en la [página de gestión de las claves de API][1].


## Asistencia técnica

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de NeuBird][2].


[1]: https://app.datadoghq.com/organization-settings/api-keys?filter=Hawkeye
[2]: https://neubird.ai/neubird-support/