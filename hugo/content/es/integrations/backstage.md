---
app_id: backstage
app_uuid: 2b89148d-0938-46fc-a9dc-fd8a45e583a9
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: backstage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10281
    source_type_name: backstage
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Roadie
  sales_email: oss@roadie.io
  support_email: oss@roadie.io
categories:
- herramientas para desarrolladores
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/backstage/README.md
display_on_public_website: true
draft: false
git_integration_title: backstage
integration_id: backstage
integration_title: Backstage
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: backstage
public_title: Backstage
short_description: Integra dashboards y gráficos de Datadog en tu instancia de Backstage.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Integra dashboards y gráficos de Datadog en tu instancia de Backstage.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Backstage
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Backstage][1] es una plataforma abierta para crear portales para desarrolladores. Esta integración te permite integrar gráficos y dashboards de Datadog en tu instancia de Backstage.

## Configuración

### Instalación

1. Instala el complemento de Datadog en Backstage:

```shell
cd packages/app
yarn add @roadiehq/backstage-plugin-datadog
```

2. Añade el widget de complemento de Datadog en tu pestaña Overview (Información general) de Backstage. Consulta las [instrucciones detalladas][2] para obtener más información.
3. Busca o crea la [URL pública][3] de tu dashboard de Datadog.
4. Añade la URL del dashboard a los metadatos del complemento:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  name: sample-service
  description: |
    A sample service
  annotations:
    datadoghq.com/dashboard-url: <DATADOGURL>
```

### Verificación

Abre la pestaña Overview (Información general) de tu instancia de Backstage para confirmar que tu dashboard o gráfico de Datadog se representa como se espera.

## Datos recopilados

### Métricas

La integración de Backstage no incluye ninguna métrica.

### Checks de servicio

La integración de Backstage no incluye ningún check de servicio.

### Eventos

La integración de Backstage no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con la [Comunidad de Backstage][4].

[1]: https://backstage.io
[2]: https://roadie.io/backstage/plugins/datadog/
[3]: https://docs.datadoghq.com/es/dashboards/sharing/#share-a-dashboard-by-public-url
[4]: https://backstage.io/community