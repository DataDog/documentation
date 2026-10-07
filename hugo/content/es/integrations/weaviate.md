---
app_id: weaviate
app_uuid: 3bb2d803-0608-4da3-8987-e6f7feb4e481
assets:
  dashboards:
    Weaviate Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: weaviate.go.goroutines
      metadata_path: metadata.csv
      prefix: weaviate.
    process_signatures:
    - weaviate
    - /bin/weaviate
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10371
    source_type_name: Weaviate
  monitors:
    Weaviate Node in unhealthy state: assets/monitors/node_status.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ia/ml
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/weaviate/README.md
display_on_public_website: true
draft: false
git_integration_title: weaviate
integration_id: weaviate
integration_title: Weaviate
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: weaviate
public_title: Weaviate
short_description: Base de datos vectorial de código abierto para crear aplicaciones
  basadas en IA.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Data Stores
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: Base de datos vectorial de código abierto para crear aplicaciones basadas
    en IA.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/ai-integrations/
  support: README.md#Support
  title: Weaviate
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


![Dashboard de información general de Weaviate][1]

## Información general

Weaviate es una base de datos vectorial de código abierto nativa de IA que ayuda a crear aplicaciones potenciadas por IA. Con la integración de Weaviate de Datadog, puedes:

- Monitoriza las estadísticas de uso (como la duración de las operaciones de inserción, eliminación y mantenimiento) para identificar posibles problemas de almacenamiento, cuellos de botella y evaluar el impacto de las modificaciones de datos en la capacidad de respuesta del sistema.
- Realiza un seguimiento de la latencia de las consultas, la velocidad y las solicitudes de lectura/escritura concurrentes para obtener información sobre la capacidad de respuesta general de la base de datos vectorial y las capacidades de gestión de la carga.
- Optimiza las cargas de trabajo de escritura intensiva con estadísticas de objetos, como el tiempo medio que tardan las operaciones "put" (escritura).
- Garantiza una ingesta de datos fluida y eficaz con métricas relacionadas con la importación que ofrecen información sobre operaciones como el proceso de carga de datos.

Este check monitoriza [Weaviate][2] a través del Datadog Agent. Para más información, consulta [Monitorización de Weaviate][3]. Para saber más sobre el conjunto de integraciones de IA de Datadog, consulta este [blog][4].

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][5] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

A partir de la versión 7.47.0 del Agent, el check de Weaviate se incluye en el paquete del [Datadog Agent ][3].

**Nota**: Este check requiere el Agent v7.47.0 o posterior.

### Configuración

Weaviate puede configurarse para exponer métricas con formato Prometheus. El Datadog Agent puede recopilar estas métricas utilizando la integración descrita a continuación. Sigue las instrucciones para configurar la recopilación de datos para tus instancias de Weaviate. Para las configuraciones requeridas para exponer las métricas de Prometheus, ve la página [Monitorización][6] de la documentación de Weaviate.

Además, se puede recopilar un pequeño subconjunto de métricas comunicándose con diferentes [endpoints de la API][7]. En concreto:
- `/v1/meta`: información sobre la versión
- `/v1/nodes`: métricas específicas del nodo como objetos y fragmentos
- `/v1/.well-known/live`: tiempo de respuesta HTTP y actividad del servicio 

**Nota**: Este check utiliza [OpenMetrics][8] para la recopilación de métricas, que requiere Python 3.

#### Contenedores
##### Recopilación de métricas

Asegúrate de que las métricas con formato Prometheus estén expuestas en tu clúster de Weaviate. Puedes configurar y personalizarlas siguiendo las instrucciones de la página [Monitorización][6] de la documentación de Weaviate. Para que el Agent comience a recopilar métricas, los pods de Weaviate deben estar anotados. Para más información sobre anotaciones, consulta la guía [plantillas de integración de Autodiscovery][5]. Puedes encontrar opciones adicionales de configuración revisando el [weaviate.d/conf.yaml de ejemplo][9]

**Nota**: Las métricas mencionadas solo pueden recopilarse si están disponibles. Algunas métricas solo se generan cuando se realizan determinadas acciones. Por ejemplo, la métrica de eliminación de objetos solo se expone cuando se elimina un objeto.

Los dos parámetros más importantes para configurar el check de Weaviate son los siguientes:
- `openmetrics_endpoint`: este parámetro debe establecerse en la localización en la que las métricas con formato Prometheus están expuestas. El puerto por defecto es `2112`, pero puede configurarse utilizando la [variable de entorno][6] `PROMETHEUS_MONITORING_PORT`. En entornos en contenedores, `%%host%%` debe ser utilizado para la [autodetección de hosts][5]. 
- `weaviate_api_endpoint`: este parámetro es opcional. Por defecto, este parámetro se establece en `<hostname>:8080` y especifica la configuración de la [API de RESTful][7].

Si se requiere autenticación para los endpoints de la API de RESTful, el check puede configurarse para proporcionar una clave de API como parte del [encabezado de solicitud][10].


```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/weaviate.checks: |
      {
        "weaviate": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:2112/metrics",
              "weaviate_api_endpoint": "http://%%host%%:8080",
              "headers": {'Authorization': 'Bearer if_needed_for_auth'}
            }
          ]
        }
      }
    # (...)
spec:
  containers:
    - name: 'weaviate'
# (...)
```

**Nota**: Puedes establecer estas anotaciones directamente en tu [Helm chart de Weaviate][11] usando la clave `annotations`.

### Validación

[Ejecuta el subcomando de estado del Agent][12] y busca `weaviate` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "weaviate" >}}


### Eventos

La integración de Weaviate no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "weaviate" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][15].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Integration roundup: Monitoring your AI stack][4]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/weaviate/images/weaviate_dashboard.png
[2]: https://weaviate.io/developers/weaviate
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://www.datadoghq.com/blog/ai-integrations/
[5]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[6]: https://weaviate.io/developers/weaviate/configuration/monitoring
[7]: https://weaviate.io/developers/weaviate/api/rest
[8]: https://docs.datadoghq.com/es/integrations/openmetrics/
[9]: https://github.com/DataDog/integrations-core/blob/master/weaviate/datadog_checks/weaviate/data/conf.yaml.example
[10]: https://github.com/DataDog/integrations-core/blob/7.46.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L544-L546
[11]: https://github.com/weaviate/weaviate-helm/blob/576f613bad3f8e25015c61a7143800123ab378d3/weaviate/values.yaml#L1196
[12]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-core/blob/master/weaviate/metadata.csv
[14]: https://github.com/DataDog/integrations-core/blob/master/weaviate/assets/service_checks.json
[15]: https://docs.datadoghq.com/es/help/