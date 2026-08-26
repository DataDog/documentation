---
app_id: cortex
app_uuid: 15baccdd-d89c-4591-ab45-e6378d8c174f
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: cortex.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10178
    source_type_name: corteza
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Cortex
  sales_email: support@getcortexapp.com
  support_email: support@getcortexapp.com
categories:
- rum
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cortex/README.md
display_on_public_website: true
draft: false
git_integration_title: cortex
integration_id: cortex
integration_title: Cortex
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cortex
public_title: Cortex
short_description: Crea incidentes en Datadog directamente desde el dashboard de Cortex.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Incidentes
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Crea incidentes en Datadog directamente desde el dashboard de Cortex.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Cortex
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

La integración [Cortex][1] permite activar incidentes en Datadog directamente desde el dashboard de Cortex.

## Configuración

Para configurar esta integración, debes tener una cuenta de Cortex, junto con una API y claves de aplicación Datadog.

### Configuración

1. Si aún no eres cliente, ponte en contacto con Cortex para obtener una demostración.
2. Crea una [clave de API Datadog][2].
3. Crea una [clave de aplicación Datadog][3].
4. Añade una API y claves de aplicación Datadog a la [integración de Cortex en Datadog][4].

### Validación

1. Ve a la [página de inicio de Cortex][5].
2. Haz clic en un servicio existente o [crea un nuevo servicio][6].
3. En la barra lateral, en "INTEGRATIONS" (Integraciones), haz clic en "See all" (Ver todo) y elige "Datadog".
4. Haz clic en el botón rojo "Trigger Incident" (Activar incidente), situado arriba de "Incidents" (Incidentes).
5. Rellena la información del formulario y haz clic en el botón verde "Trigger Incident" (Activar incidente).
6. Debería aparecer un mensaje en la pantalla que dice: "¡Se ha activado un incidente! Haz clic aquí para verlo en Datadog."
7. Además, el nuevo incidente debería aparecer en "Incidents" (Incidentes).

## Datos recopilados

### Métricas

Cortex no incluye métricas.

### Checks de servicio

Cortex no incluye checks de servicio.

### Eventos

Cortex no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://www.getcortexapp.com/
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/es/account_management/api-app-keys/#application-keys
[4]: https://app.getcortexapp.com/admin/settings/datadog
[5]: https://app.getcortexapp.com/admin/index
[6]: https://app.getcortexapp.com/admin/service/new
[7]: mailto:support@getcortexapp.com