---
app_id: lacework
app_uuid: e23af0ca-003e-4b3d-b6c5-24894b710750
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: lacework.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10079
    source_type_name: Lacework
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories:
- seguridad
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lacework/README.md
display_on_public_website: true
draft: false
git_integration_title: lacework
integration_id: lacework
integration_title: Lacework
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: lacework
public_title: Lacework
short_description: Lacework es una plataforma de seguridad para todos tus entornos
  de nube
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Seguridad
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Lacework es una plataforma de seguridad para todos tus entornos de
    nube
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Lacework
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Utiliza la integración de Lacework con Datadog para reenviar tus logs y eventos de Lacework a Datadog.

## Configuración

Toda la configuración ocurre en el dashboard de Lacework. Encontrarás más detalles sobre cómo configurarlo en la [documentación de Lacework][1]. Datadog habilita automáticamente el pipeline de procesamiento de logs adecuado cuando detecta logs de Lacework.

### Instalación

1. En Lacework, ve a "Configuración" y selecciona "Integraciones".
2. En la sección "Saliente" (en el panel izquierdo), selecciona Datadog.
3. Rellena los siguientes datos:

   - **Nombre**: Introduce un nombre para la integración. Por ejemplo, `Datadog-Lacework`.
   - **Tipo de Datadog**: Selecciona el tipo de logs enviados a Datadog:

    | Tipo de Datadog | Descripción |
    | ---------------- | ---------------------------------------------------------- |
    | `Logs Details` | Envía logs de Lacework detallados a la plataforma de logs de Datadog. |
    | `Logs Summary` | Envía un resumen de Lacework a la plataforma de logs de Datadog.     |
    | `Events Summary` | Envía un resumen de Lacework a la plataforma de eventos de Datadog.   |

   - **Sitio Datadog**:
     - Selecciona `com` si utilizas la región Datadog US.
     - Selecciona `eu` si utilizas la región Datadog EU.
   - **CLAVE de API**: Introduce tu [clave de API Datadog][2].
   - **Nivel de seguridad de la alerta**: Selecciona el nivel de gravedad mínimo para los logs reenviados

## Datos recopilados

### Métricas

La integración de Lacework no recopila métricas.

### Checks de servicios

La integración de Lacework no incluye checks de servicios.

### Recopilación de logs

La integración de Lacework puede configurarse para enviar logs.

### Eventos

La integración de Lacework puede configurarse para enviar eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.lacework.net/onboarding/datadog
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/es/help/