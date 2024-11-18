---
app_id: neo4j
app_uuid: f2657bb8-ded4-48f3-8095-f703cc203149
assets:
  dashboards:
    Neo4j V4 Dashboard: assets/dashboards/Neo4j4.xDefaultDashboard.json
    Neo4j V5 Cluster Dashboard: assets/dashboards/Neo4j5ClusterDashboard.json
    Neo4j V5 Dashboard: assets/dashboards/Neo4j5DefaultDashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: neo4j.dbms.page_cache.hits
      metadata_path: metadata.csv
      prefix: neo4j.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10202
    source_type_name: Neo4j
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Neo4j
  sales_email: support@neotechnology.com
  support_email: support@neotechnology.com
categories:
- almacenes de datos
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neo4j/README.md
display_on_public_website: true
draft: false
git_integration_title: neo4j
integration_id: neo4j
integration_title: Neo4j
integration_version: 3.0.3
is_public: true
manifest_version: 2.0.0
name: neo4j
public_title: Neo4j
short_description: Recopila métricas de Neo4j
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopila métricas de Neo4j
  media:
  - caption: Dashboard de Neo4j 5
    image_url: images/Neo4j_5_Dashboard.png
    media_type: imagen
  - caption: Base de datos de Neo4j 5
    image_url: images/neo4j_graph.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Neo4j
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[Neo4j][1] es una base de datos gráfica empresarial que combina almacenamiento gráfico nativo, seguridad avanzada, arquitectura escalable de velocidad optimizada y conformidad con ACID para asegurar la previsibilidad y la integridad de las consultas basadas en relaciones. Neo4j almacena y gestiona los datos en su estado más natural y conectado, mediante relaciones de datos que ofrecen consultas ultrarrápidas, un contexto más detallado para el análisis y un modelo de datos modificable sin complicaciones.

Las métricas de Neo4j permite a los administradores de bases de datos monitorizar sus despliegues de Neo4j. Los administradores de bases de datos desean conocer el uso de la memoria (caché de heap y páginas), el número de transacciones, el estado del clúster, el tamaño de la base de datos (incluido el número de nodos, relaciones y propiedades) y el rendimiento de las consultas. 

Con esta integración, visualiza importantes métricas de Neo4j en nuestros dashboards predefinidos y permite a tus DBAs solucionar problemas y monitorizar el estado de tus bases de datos Neo4j.


## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Para instalar el check de neo4j en tu host:

1. Descarga e instala el [Datadog Agent][3].
2. Para instalar el check de neo4j en tu host:

   ```shell
   datadog-agent integration install -t datadog-neo4j==<INTEGRATION_VERSION>
   ```

### Configuración

1. Edita el archivo `neo4j.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de neo4j. Consulta el [neo4j.d/conf.yaml de ejemplo][4] para todas las opciones disponibles de configuración.

2. Datadog escucha en el puerto 5000 para dogstatsd_stats_port y expvar_port. En tu archivo neo4j.conf, tendrás que cambiar server.discovery.listen_address y el server.discovery.advertised_address para utilizar un puerto distinto de 5000.

3. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `neo4j` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "neo4j" >}}


### Checks de servicio

El check de servicio `neo4j.prometheus.health` se presenta en el check base

### Eventos

Neo4j no incluye ningún evento.


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Neo4j][10].

[1]: https://neo4j.com/
[2]: https://docs.datadoghq.com/es/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://neo4j.com/docs/operations-manual/4.4/monitoring/metrics/reference/
[8]: https://neo4j.com/docs/operations-manual/5/monitoring/metrics/reference/
[9]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/metadata.csv
[10]: mailto:support@neo4j.com