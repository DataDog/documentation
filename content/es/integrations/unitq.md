---
app_id: unitq
app_uuid: 7781542f-b4a2-40e2-86cd-9987980a0ead
assets:
  dashboards:
    unitQ: assets/dashboards/unitq_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: unitq.user_feedback
      metadata_path: metadata.csv
      prefix: unitq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10303
    source_type_name: unitQ
author:
  homepage: https://www.unitq.com/
  name: unitQ
  sales_email: hello@unitq.com
  support_email: hello@unitq.com
categories:
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/unitq/README.md
display_on_public_website: true
draft: false
git_integration_title: unitq
integration_id: unitq
integration_title: unitQ
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: unitq
public_title: unitQ
short_description: Aprovecha el poder de las opiniones de los usuarios para mejorar
  la calidad de los productos.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Aprovecha el poder de las opiniones de los usuarios para mejorar la
    calidad de los productos.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: unitQ
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

unitQ es tu plataforma consolidada y consultable para las opiniones de los usuarios. Nuestra tecnología de IA extrae información basada en datos de lo que dicen los usuarios para aumentar la calidad del producto.

La integración de unitQ Datadog permite reenviar métricas de unitQ a Datadog. Al enviar las métricas de unidadQ a Datadog, los usuarios pueden aprovechar las funciones de crear gráficas y alertas de Datadog para realizar un seguimiento de los comentarios de los usuarios, lo que garantiza una base de clientes satisfechos.

## Configuración

### Configuración

1. En unitQ, ve a **Integrations** (Integraciones).
2. Selecciona el cuadro de Datadog
3. Rellena los siguientes datos:
   - **Sitio de Datadog**:
     - Introduce `https://api.datadoghq.com` si utilizas la región de EE.UU. de Datadog.
     - Introduce `https://api.datadoghq.eu` si utilizas la región de la UE de Datadog.
   - **Clave de API**: introduce tu [clave de API de Datadog][1].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "unitq" >}}


### Checks de servicio

unitQ no incluye ningún check de servicio.

### Eventos

unitQ no incluye ningún evento.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][3].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://github.com/DataDog/integrations-extras/blob/master/unitq/metadata.csv
[3]: https://docs.datadoghq.com/es/help/