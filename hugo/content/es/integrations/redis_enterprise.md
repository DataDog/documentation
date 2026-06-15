---
app_id: redis-enterprise
app_uuid: b569beaa-dbf6-4c40-a640-fab0ea2b9cab
assets:
  dashboards:
    redis-enterprise-database: assets/dashboards/redis_enterprise_database.json
    redis-enterprise-node: assets/dashboards/redis_enterprise_node.json
    redis-enterprise-overview: assets/dashboards/redis_enterprise_overview.json
    redis-enterprise-proxy: assets/dashboards/redis_enterprise_proxy.json
    redis-enterprise-proxy-threads: assets/dashboards/redis_enterprise_proxy-threads.json
    redis-enterprise-replication: assets/dashboards/redis_enterprise_active-active.json
    redis-enterprise-shard: assets/dashboards/redis_enterprise_shard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rdse.bdb_conns
      metadata_path: metadata.csv
      prefix: rdse
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7769393
    source_type_name: Redis Enterprise V2
  logs: {}
author:
  homepage: https://redis.com/redis-enterprise-software/overview
  name: Redis, Inc.
  sales_email: press@redis.com
  support_email: support@redis.com
categories:
- ai/ml
- almacenamiento en caché
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/Datadog/integraciones-extras/blob/master/redis_enterprise/README.md
display_on_public_website: true
draft: false
git_integration_title: redis_enterprise
integration_id: redis-empresa
integration_title: Redis Enterprise
integration_version: 1.1.2
is_public: true
manifest_version: 2.0.0
name: redis_enterprise
public_title: Redis Enterprise
short_description: Integración de Redis Enterprise y Datadog
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
  - Categoría::IA/ML
  - Categoría::Almacenamiento en caché
  - Categoría::Almacenes de datos
  - Oferta::Integración
  - Tipo de datos enviados::Métricas
  configuration: README.md#Configuración
  description: Integración de Redis Enterprise y Datadog
  media:
  - caption: gráfico del uso de CPU del nodo
    image_url: images/datadog-detail-node-cpu.png
    media_type: imagen
  - caption: gráfico del uso de memoria del nodo
    image_url: images/datadog-detail-node-memory.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Redis Enterprise
---

<!--  FUENTE https://github.com/DataDog/integrations-extras -->


## Información general

Redis es un almacén de datos rápido y versátil que admite una gran variedad de estructuras de datos, como cadenas, hashes, listas, conjuntos, flujos y mucho más. También ofrece programabilidad, extensibilidad, persistencia, agrupación y alta disponibilidad. La edición comunitaria de Redis añade modelos de datos y funciones adicionales, como búsqueda de vectores, estructuras de datos probabilísticas, compatibilidad con JSON y búsquedas de texto completo.

Esta integración funciona con instalaciones on-premises y de nube privada de [Redis Enterprise][1].
La integración proporciona métricas para tres componentes de clúster críticos: bases de datos, nodos y particiones. Esto te permite monitorizar el rendimiento de bases de datos, el uso de memoria, el uso de CPU, los recuentos de conexiones, los estados de replicaciones y una variedad de métricas adicionales dentro de Datadog.
Puedes utilizar esta información para comprender el estado general de tus clústeres Redis Enterprise, diagnosticar problemas de rendimiento de la aplicación y evitar tiempos de inactividad del sistema.

Si quieres ver la lista completa de las métricas compatibles, consulta la sección [Métricas](#metrics) más abajo.

## Configuración

### Instalación

1. Ejecuta el siguiente comando para instalar la integración del Agent:
   ```shell
   datadog-agent integration install -t datadog-redis_enterprise==1.1.2
   ```

2. Configura la integración definiendo el `openmetrics_endpoint` en el nodo principal de tu clúster. Para obtener más información, consulta [Integración][2].

3. [Reinicia][3] el Agent.


### Configuración

Configura el `openmetrics_endpoint` para que apunte a tu clúster. Consulta el [ejemplo][4]. Deja `tls_verify` como falso.

Existen dos parámetros opcionales: `extra_metrics` y `excluded_metrics`, como se indica en el archivo de configuración de ejemplo.

El parámetro extra_metrics toma una lista de grupos de métricas. Los grupos disponibles son los siguientes RDSE.REPLICATION, 
RDSE.LISTENER, RDSE.PROXY, RDSE.BIGSTORE, RDSE.FLASH y RDSE.SHARDREPL. Los grupos de métricas por defecto RDSE.NODE, 
RDSE.DATABASE y RDSE.SHARD son insertados automáticamente por la integración.

El parámetro exclude_metrics toma una lista de métricas individuales para excluir, lo que significa que esta información no se
pasará a Datadog. Las métricas individuales deben despojarse de sus prefijos, por ejemplo, 'rdse.bdb_up' se convertiría 
en 'bdb_up'. La lista completa de métricas está disponible en la pestaña "Datos recopilados" de la página de la integración o a través del enlace que figura en la sección [Métricas](#metrics). 
Los siguientes grupos adicionales utilizan los prefijos asociados, que pueden utilizarse para buscar métricas individuales en 
la página de datos recopilados.

| Agrupar            | Prefijo                      | Notas                                                |
|------------------|-----------------------------|------------------------------------------------------|
| RDSE.NODE        | rdse.node_                  | Esto también devolverá las métricas bigstore y flash  |
| RDSE.DATABASE    | rdse.bdb_                   | Esto también devolverá las métricas de replicación         |
| RDSE.SHARD       | rdse.redis_                 | Esto también devolverá las métricas de replicación de particiones   |
| RDSE.REPLICATION | rdse.bdb_crdt_              |                                                      |
| RDSE.REPLICATION | rdse.bdb_replicaof_         |                                                      |
| RDSE.SHARDREPL   | rdse.redis_crdt_            |                                                      |
| RDSE.PROXY       | rdse.dmcproxy_              |                                                      |
| RDSE.LISTENER    | rdse.listener_              |                                                      |
| RDSE.BIGSTORE    | rdse.node_bigstore_         |                                                      |
| RDSE.FLASH       | rdse.node_available_flash   | Todas las métricas flash tienen el formato: rdse.node_*_flash |

### Validación

1. Asegúrate de que puedes hacer ping a la máquina, especialmente en un entorno de nube. Ejecuta `wget --no-check-certificate <endpoint>`
o `curl -k <endpoint>` para garantizar que puedas recibir métricas.

2. Comprueba el [estado][5] del Datadog Agent.


## Datos recopilados

La versión actual reúne todas las métricas para bases de datos, nodos y particiones. Opcionalmente, a través del parámetro extra_metrics 
se pueden recopilar datos de replicación, proxy, listener, etc. Consulta la lista en la sección [Configuración](#configuration).


### Métricas
{{< get-metrics-from-git "redis-enterprise" >}}



### Checks de servicio

Redis Enterprise no incluye checks de servicios.


### Eventos

Redis Enterprise no incluye eventos.


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Artie][2].

[1]: https://redis.com/redis-enterprise-software/overview/
[2]: https://docs.datadoghq.com/es/getting_started/integrations/
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-extras/blob/master/redis_enterprise/datadog_checks/redis_enterprise/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/redis_enterprise/metadata.csv
[7]: https://redis.io/support/