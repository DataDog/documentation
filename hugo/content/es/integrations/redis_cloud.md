---
app_id: redis-cloud
app_uuid: 0b59b80e-db72-44a6-8c2b-67475d10ad71
assets:
  dashboards:
    redis-cloud-active-active: assets/dashboards/redis_cloud_active-active.json
    redis-cloud-database: assets/dashboards/redis_cloud_database.json
    redis-cloud-networking: assets/dashboards/redis_cloud_networking.json
    redis-cloud-overview: assets/dashboards/redis_cloud_overview.json
    redis-cloud-proxy: assets/dashboards/redis_cloud_proxy.json
    redis-cloud-proxy-threads: assets/dashboards/redis_cloud_proxy-threads.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rdsc.bdb_conns
      metadata_path: metadata.csv
      prefix: rdsc
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7769531
    source_type_name: Redis Cloud
  logs: {}
author:
  homepage: https://redis.com/cloud/overview/
  name: Redis, Inc.
  sales_email: press@redis.com
  support_email: support@redis.com
categories:
- ai/ml
- almacenamiento en caché
- almacenes de datos
- nube
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/redis_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: redis_cloud
integration_id: redis-cloud
integration_title: Redis Cloud
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: redis_cloud
public_title: Redis Cloud
short_description: Integración de Redis Cloud
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::AI/ML
  - Categoría::Almacenamiento en caché
  - Category::Data Stores
  - Category::Cloud
  - Offering::Integration
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: Integración de Redis Cloud
  media:
  - caption: visualización de la información general de redis cloud
    image_url: images/datadog-cloud-overview-dashboard.png
    media_type: imagen
  - caption: detalles de clúster de redis cloud
    image_url: images/datadog-cloud-cluster-database.png
    media_type: imagen
  - caption: detalles del nodo de redis cloud
    image_url: images/datadog-cloud-node-dashboard.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Redis Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Redis es un almacén de datos rápido y versátil que admite una gran variedad de estructuras de datos, como cadenas, hashes, listas, conjuntos, flujos y mucho más. También ofrece programabilidad, extensibilidad, persistencia, agrupación y alta disponibilidad. La edición comunitaria de Redis añade modelos de datos y funciones adicionales, como búsqueda de vectores, estructuras de datos probabilísticas, compatibilidad con JSON y búsquedas de texto completo.

La integración de [Redis Cloud][1] está diseñada para su uso con los despliegues de Redis Cloud del software de Redis. No es para uso con instalaciones de Redis Enterprise. Para [Redis Enterprise][2], consulta [Integración de Datadog Redis Enterprise][3].

La integración proporciona métricas para tres componentes críticos del clúster: bases de datos, nodos y fragmentos, mediante el uso del Datadog Agent. Esto te permite monitorizar el rendimiento de la base de datos, utilización de la memoria, uso de la CPU, recuento de conexión, estado de la replicación y una variedad de métricas adicionales dentro de Datadog. Puedes utilizar esta información para comprender el estado general de tus clústeres de Redis Cloud, diagnosticar problemas de rendimiento de la aplicación y prevenir una caída del sistema.

Para ver la lista completa de métricas compatibles, consulta la sección **Metrics** (Métricas) más abajo.

## Configuración

### Instalación

1. Ejecuta el siguiente comando para instalar la integración del Agent:
- Para el Datadog Agent v6:
   ```shell
   datadog-agent integration install -t datadog-redis_cloud==1.1.0
   ```
- Para el Datadog Agent v7:
   ```shell
   agent integration install -t datadog-redis_cloud==1.1.0
   ```

2. Configura la integración estableciendo `openmetrics_endpoint` en tu nodo maestro del clúster. Consulta [Empezando con integraciones][4] para obtener más información.
3. [Reinicia][5] el Agent.


### Configuración

Configura el `openmetrics_endpoint` para que apunte a tu clúster. Consulta el [ejemplo][4]. Deja `tls_verify` en false.

Existen dos parámetros opcionales: `extra_metrics` y `excluded_metrics`, como se indica en el archivo de configuración de ejemplo.

El parámetro extra_metrics toma una lista de grupos de métrica. Están disponibles los siguientes grupos: RDSC.REPLICATION,  
RDSC.NODE, RDSC.BIGSTORE, RDSC.FLASH y RDSC.SHARDREPL. Los grupos de métricas por defecto RDSC.DATABASE, 
RDSC.PROXY, RDSC.LISTENER y RDSC.SHARD son insertados automáticamente por la integración.

El parámetro `exclude_metrics` toma una lista de métricas individuales para excluir, lo que significa que esta información no se  
envía a Datadog. Se debe sacar el prefijo de as métricas individuales, lo que significa que 'rdsc.bdb_up'  
se convierte en 'bdb_up'. La lista completa de métricas está disponible en la pestaña "Datos recopilados" de la página de integración, y en la sección [Métricas](#metrics).
Los siguientes grupos adicionales utilizan los prefijos asociados, que pueden utilizarse para buscar cada una de las métricas en 
la página Datos recogidos.

| Agrupar            | Prefijo                    | Notas                                                 |
|------------------|---------------------------|-------------------------------------------------------|
| RDSC.NODE        | rdsc.node_                | Esto también devolverá métricas bigstore y flash.  |
| RDSC.DATABASE    | rdsc.bdb_                 | Esto devolverá las métricas de replicación también.         |
| RDSC.SHARD       | rdsc.redis_               | Esto devolverá las métricas de replicación de fragmentos también.   |
| RDSC.REPLICATION | rdsc.bdb_crdt_            |                                                       |
| RDSC.REPLICATION | rdsc.bdb_replicaof_       |                                                       |
| RDSC.SHARDREPL   | rdsc.redis_crdt_          |                                                       |
| RDSC.PROXY       | rdsc.dmcproxy_            |                                                       |
| RDSC.LISTENER    | rdsc.listener_            |                                                       |
| RDSC.BIGSTORE    | rdsc.node_bigstore_       |                                                       |
| RDSC.FLASH       | rdsc.node_available_flash | Todas las métricas flash tienen la forma: rdsc.node_*_flash. |


### Validación

1. Asegúrate de que puedes hacer ping a la máquina, especialmente en un entorno de nube. Ejecuta `wget --no-check-certificate <endpoint>` o `curl -k <endpoint>` para asegurarte de que puedes recibir métricas.

2. Comprueba el [estado][6] del Datadog Agent.


## Datos recopilados

La integración de Redis reúne todas las métricas para bases de datos, nodos y fragmentos.


### Métricas
{{< get-metrics-from-git "redis-cloud" >}}



### Checks de servicio

La integración de Redis Cloud no incluye ningún check de servicio.


### Eventos

La integración de Redis Cloud no incluye ningún evento.


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [Redis Field Engineering][8].

[1]: https://redis.io/docs/latest/operate/rc/
[2]: https://redis.io/docs/latest/operate/rs/
[3]: https://app.datadoghq.com/integrations?integrationId=redis-enterprise
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/redis_cloud/metadata.csv
[8]: mailto:support@redis.com