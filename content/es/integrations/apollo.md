---
app_id: apollo
app_uuid: b39f1239-b97f-4b3b-ab5a-7a888915eedd
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - apollo.operations.count
      - apollo.engine.operations.count
      metadata_path: metadatos.csv
      prefix: apollo.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10014
    source_type_name: Motor Apolo
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Apollo
  sales_email: sachin@apollographql.com
  support_email: sachin@apollographql.com
categories:
- almacenamiento en caché
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apollo/README.md
display_on_public_website: true
draft: false
git_integration_title: apollo
integration_id: apollo
integration_title: Apollo
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: apollo
public_title: Apollo
short_description: Monitorización del rendimiento de tu infraestructura GraphQL
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenamiento en caché
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitorización del rendimiento de tu infraestructura GraphQL
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Apollo
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

La integración Apollo en Datadog te permite reenviar métricas de rendimiento de Studio a tu cuenta Datadog. Datadog es compatible con una API de función avanzada, lo que te permite crear gráficos y alertas de métricas de GraphQL.

![Metrics][1]

Studio reenvía las siguientes métricas a Datadog:

- `apollo.operations.count` - El número de operaciones GraphQL que se ejecutaron. Esto incluye consultas, mutaciones y operaciones que dieron lugar a un error.
- `apollo.operations.error_count` - El número de operaciones GraphQL que dieron lugar a un error. Esto incluye errores de ejecución de GraphQL y errores HTTP si Studio no pudo conectarse a tu servidor.
- `apollo.operations.cache_hit_count` - Número de consultas GraphQL cuyo resultado se ha obtenido de la caché de consultas completas del servidor Apollo.
- Un histograma de los tiempos de respuesta de las operaciones GraphQL medidos en milisegundos. Debido al método de agregación de Studio (binning logarítmico), estos valores tienen una precisión de +/- 5%:

  - `apollo.operations.latency.min`
  - `apollo.operations.latency.median`
  - `apollo.operations.latency.95percentile`
  - `apollo.operations.latency.99percentile`
  - `apollo.operations.latency.max`
  - `apollo.operations.latency.avg`

Estas métricas se agregan en intervalos de 60 segundos y se etiquetan con el nombre de la operación GraphQL como `operation:<query-name>`. Las firmas de consulta única con el mismo nombre de operación se fusionan y las consultas sin nombre de operación se ignoran.

Estas métricas también se etiquetan con el ID del gráfico de Studio asociado (como `graph:<graph-id>`) y el nombre de la variante asociada (como `variant:<variant-name>`), por lo que varios gráficos de Studio pueden enviar datos a la misma cuenta Datadog. Si no has definido un nombre de variante, se utiliza `current`.

(Las integraciones configuradas antes de octubre de 2020 tienen nombres de métrica que empiezan por `apollo.engine.operations` en lugar de `apollo.operations` y utilizan una etiqueta (tag) `service` en lugar de `graph`. Puedes migrar a los nuevos nombres de métricas en la página Integraciones de tu gráfico en Apollo Studio).

## Configuración

### Configuración

La configuración con la integración Apollo en Datadog es tan simple como proporcionar una clave de API y una región de Datadog a Studio. No es necesaria ninguna otra configuración.

1. Ve a tu [página de integraciones Datadog][2] y haz clic en el cuadro Apolo. A continuación, ve a la pestaña **Configuración** y haz clic en **Install Integration** (Instalar integración) en la parte inferior.

2. Ve a tu [página de las API de Datadog][3] y crea una clave de API.

3. Determina la región de tu API de Datadog observando la barra de direcciones de tu navegador:
- Si el nombre de dominio es `app.datadoghq.com`, la región de tu API es `US`.
- Si el nombre de dominio es `app.datadoghq.eu`, la región de tu API es `EU`.

4. En [Studio][4], ve a la página Integraciones de tu gráfico:

   ![IntegrationsPage][5]

5. En la sección de reenvío de Datadog, haz clic en **Configure** (Configurar). Indica tu clave y tu región de API y luego haz clic en **Enable** (Habilitar). Dado que todas las métricas reenviadas se etiquetan con el ID del gráfico correspondiente (`graph:<graph-id>`), puedes utilizar la misma clave de API para todos tus gráficos.

   ![IntegrationsToggle][6]

6. Ve al Explorador de métricas de Datadog para ver tus métricas. Las métricas pueden tardar hasta cinco minutos para ser visibles.

### Uso

Consulta la [documentación de las integraciones Apollo][7] para obtener información más detallada sobre su uso.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "apollo" >}}


### Eventos

La integración Apollo no incluye eventos en este momento.

### Checks de servicio

La integración Apollo no incluye checks de servicios en este momento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][9].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/metrics.png
[2]: https://app.datadoghq.com/account/settings#integrations
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://www.apollographql.com/docs/studio/org/graphs/#viewing-graph-information
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-link.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-toggle.png
[7]: https://www.apollographql.com/docs/studio/datadog-integration/
[8]: https://github.com/DataDog/integrations-extras/blob/master/apollo/metadata.csv
[9]: https://docs.datadoghq.com/es/help/