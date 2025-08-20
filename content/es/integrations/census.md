---
app_id: census
app_uuid: 7f4f3919-5b0a-4b4b-93e5-7f0c035f3887
assets:
  dashboards:
    Census Overview: assets/dashboards/census_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check:
      - census.syncs.rows_processed
      - census.syncs.sync_completed
      metadata_path: metadata.csv
      prefix: census
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10336
    source_type_name: Census
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.getcensus.com/
  name: Census
  sales_email: sales@getcensus.com
  support_email: support@getcensus.com
categories:
- automatización
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/census/README.md
display_on_public_website: true
draft: false
git_integration_title: census
integration_id: census
integration_title: Census
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: census
public_title: Census
short_description: Envía tus métricas y eventos sincronizadas de Census a Datadog.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Automatización
  - Oferta::Integración
  - Tipo de datos enviados::Eventos
  - Tipo de datos enviados::Métricas
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Envía tus métricas y eventos sincronizadas de Census a Datadog.
  media:
  - caption: Dashboard con información general de sincronización de Census
    image_url: images/census_dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Census
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Census][1] es una plataforma ETL inversa que convierte tu almacén de datos en un centro de operaciones comerciales y empresariales, proporcionando a los equipos datos fiables y procesables. Sincroniza datos desde una fuente auténtica, como un almacén de datos, a un sistema de acciones como la Gestión de la relación con clientes (CRM), una plataforma de publicidad u otra aplicación SaaS, para volver operativos los datos.

Census se integra con Datadog para ofrecer a los desarrolladores la posibilidad de monitorizar sus flujos de trabajo de Census y realizar un seguimiento del número de sincronizaciones exitosas y fallidas. Esta integración envía [métricas](##metrics) y eventos a Datadog desde Census.

## Requisitos

Para habilitar esta integración, se requiere una suscripción de nivel Census Platform (o posterior).

## Configuración

1. Inicia sesión en tu [cuenta de Census][2].
2. Ve al espacio de trabajo de Census que quieres conectar a tu cuenta de Datadog.
3. Ve a la pestaña de configuración del espacio de trabajo y haz clic en **Configure** (Configurar) en el cuadro de Datadog.
4. Haz clic en **Connect** (Conectar) para conectarte a tu cuenta de Datadog mediante OAuth2.
5. Vuelve a Datadog y abre el dashboard Census predefinido.

### Validación

Ejecuta una sincronización en tu espacio de trabajo Census y consulta las métricas y los eventos correspondientes en el dashboard Census de tu cuenta de Datadog. Tras la finalización de la sincronización, las métricas y los eventos pueden tardar hasta un par de minutos en ser transmitidos a Datadog.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "census" >}}


### Checks de servicios

Census no incluye checks de servicios.

### Eventos

Esta integración envía eventos de finalización de sincronizaciones a Datadog.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://www.getcensus.com/
[2]: https://app.getcensus.com/
[3]: https://github.com/DataDog/integrations-extras/blob/master/census/metadata.csv
[4]: https://docs.datadoghq.com/es/help/