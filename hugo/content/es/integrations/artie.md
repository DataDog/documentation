---
app_id: artie
app_uuid: 3ccc5034-0902-4e00-8a69-04d007d31310
assets:
  dashboards:
    artie overview: assets/dashboards/artie_overview.json
  integration:
    auto_install: false
    metrics:
      check:
      - artie.rows_processed
      metadata_path: metadata.csv
      prefix: artie.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30415289
    source_type_name: Artie
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.artie.com/
  name: Artie
  sales_email: hi@artie.com
  support_email: hi@artie.com
categories:
- nube
- almacenes de datos
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/artie/README.md
display_on_public_website: true
draft: false
git_integration_title: artie
integration_id: artie
integration_title: Artie
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: artie
public_title: Artie
short_description: Artie ofrece replicación en tiempo real entre bases de datos y
  almacenes de datos.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Category::Cloud
  - Category::Data Stores
  - Categoría::Métricas
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Artie ofrece replicación en tiempo real entre bases de datos y almacenes
    de datos.
  media:
  - caption: Dashboard de información general de Artie
    image_url: images/artie-overview-dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Artie
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

[Artie][1] es un producto de replicación de bases de datos en tiempo real para sincronizar bases de datos desde la fuente con almacenes de datos.

Con esta integración, puedes ver métricas sobre tus despliegues de Artie directamente en Datadog para monitorizar el estado de tus pipelines de datos. Las métricas de esta integración incluyen el número de filas procesadas a lo largo del tiempo, el retraso de ingesta, el tiempo de descarga y el tamaño de la ranura de replicación. Esto puede ayudar a diagnosticar cualquier retraso en tu pipeline, ajustar la configuración de tu despliegue de Artie para optimizar el rendimiento y evitar cualquier impacto negativo en tu base de datos de origen debido al crecimiento de la ranura de replicación.

## Configuración

### Instalación

Esta integración sólo está disponible para las cuentas existentes de Artie. Si aún no utilizas Artie y deseas iniciar una prueba, envía un correo electrónico a [hi@artie.com][2].

1. En Datadog, haz clic en **Connect Accounts** (Conectar cuentas) en el cuadro de integración de Artie para conectar Datadog con Artie.
2. Inicia sesión en Artie si aún no has hecho.
3. Revisa los permisos de Datadog que se concederán a Artie y haz clic en **Authorize** (Autorizar).

### Validación

El dashboard incluido comienza a mostrar datos 5-10 minutos después de que conectes la integración siempre y cuando tengas datos fluyendo en tus despliegues de Artie.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Artie][2].

[1]: https://www.artie.com/
[2]: mailto:hi@artie.com