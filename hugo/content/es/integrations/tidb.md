---
app_id: tidb
app_uuid: 79e5c6d7-c494-4df7-98bc-c639e211c0b8
assets:
  dashboards:
    TiDB Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: tidb_cluster.tidb_executor_statement_total
      metadata_path: metadata.csv
      prefix: tidb_cluster
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10172
    source_type_name: TiDB
  logs:
    source: tidb
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: PingCAP
  sales_email: xuyifan02@pingcap.com
  support_email: xuyifan02@pingcap.com
categories:
- almacenes de datos
- nube
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tidb/README.md
display_on_public_website: true
draft: false
git_integration_title: tidb
integration_id: tidb
integration_title: TiDB
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: tidb
public_title: TiDB
short_description: Integración para el clúster TiDB
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
  - Categoría::Almacenes de datos
  - Categoría::Nube
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Integración para el clúster TiDB
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: TiDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Conecta el clúster [TiDB][1] a Datadog para:

- Recopilar métricas TiDB clave de tu clúster.
- Recopilar logs de tu clúster, como logs TiDB/TiKV/TiFlash y logs de consultas lentas.
- Visualizar el rendimiento del clúster en el dashboard proporcionado.

> **Nota**:
>
> - Se requiere TiDB v4.0 o posterior para esta integración. 
> - Para TiDB Cloud, consulta la [integración TiDB Cloud][2].

## Configuración

### Instalación

En primer lugar, [descarga e inicia el Datadog Agent][3].

A continuación, instala manualmente el check de TiDB. [Las instrucciones varían en función del entorno][4]. 

Ejecuta `datadog-agent integration install -t datadog-tidb==<INTEGRATION_VERSION>`.

### Configuración

##### Recopilación de métricas

1. Edita el archivo `tidb.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu TiDB. Para conocer todas las opciones de configuración disponibles, consulta el [tidb.d/conf.yaml de ejemplo][5].

  El [tidb.d/conf.yaml de ejemplo][5] sólo configura la instancia PD. Es necesario configurar manualmente las otras instancias en el clúster TiDB así:

  ```yaml
  init_config:

  instances:

    - pd_metric_url: http://localhost:2379/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tidb_metric_url: http://localhost:10080/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tikv_metric_url: http://localhost:20180/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tiflash_metric_url: http://localhost:8234/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tiflash_proxy_metric_url: http://localhost:20292/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01
  ```

3. [Reinicia el Agent][6].

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `tidb.d/conf.yaml` para empezar a recopilar tus logs de TiDB:

   ```yaml
   logs:
    # pd log
    - type: file
      path: "/tidb-deploy/pd-2379/log/pd*.log"
      service: "tidb-cluster"
      source: "pd"

    # tikv log
    - type: file
      path: "/tidb-deploy/tikv-20160/log/tikv*.log"
      service: "tidb-cluster"
      source: "tikv"

    # tidb log
    - type: file
      path: "/tidb-deploy/tidb-4000/log/tidb*.log"
      service: "tidb-cluster"
      source: "tidb"
      exclude_paths:
        - /tidb-deploy/tidb-4000/log/tidb_slow_query.log
    - type: file
      path: "/tidb-deploy/tidb-4000/log/tidb_slow_query*.log"
      service: "tidb-cluster"
      source: "tidb"
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_datetime
          pattern: '#\sTime:'
      tags:
        - "custom_format:tidb_slow_query"

    # tiflash log
    - type: file
      path: "/tidb-deploy/tiflash-9000/log/tiflash*.log"
      service: "tidb-cluster"
      source: "tiflash"
   ```

   Cambia la `path` y el `service` según la configuración de tu clúster. 

   Utiliza estos comandos para mostrar la ruta de todos los logs:

   ```shell
   # show deploying directories
   tiup cluster display <YOUR_CLUSTER_NAME>
   # find specific logging file path by command arguments
   ps -fwwp <TIDB_PROCESS_PID/PD_PROCESS_PID/etc.>
   ```

3. [Reinicia el Agent][6].

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `tidb` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "tidb" >}}


> Es posible utilizar la opción de configuración `metrics` para recopilar métricas adicionales de un clúster TiDB.

### Eventos

El check de TiDB no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "tidb" >}}


## Solucionar problemas

### Faltan métricas de CPU y memoria para las instancias TiKV y TiFlash en macOS

Las métricas de CPU y memoria no se proporcionan para las instancias TiKV y TiFlash en los siguientes casos:

- Ejecución de instancias TiKV o TiFlash con [tiup playground][10] en macOS.
- Ejecución de instancias TiKV o TiFlash con [docker-compose up][11] en una nueva máquina Apple M1.

### Demasiadas métricas

El check de TiDB habilita por defecto el tipo de métrica `distribution` de Datadog. Esta parte de los datos es bastante grande y puede consumir muchos recursos. Puedes modificar este comportamiento en el archivo `tidb.yml`:

- `send_distribution_buckets: false`

Debido a que en un clúster TiDB hay muchas métricas, el check de TiDB define `max_returned_metrics` en `10000` por defecto. Si es necesario, puedes reducir `max_returned_metrics` en el archivo `tidb.yml`:

- `max_returned_metrics: 1000`

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][12].

[1]: https://docs.pingcap.com/tidb/stable
[2]: https://docs.datadoghq.com/es/integrations/tidb_cloud/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/guide/community-integrations-installation-with-docker-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/tidb/datadog_checks/tidb/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/tidb/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/tidb/assets/service_checks.json
[10]: https://docs.pingcap.com/tidb/stable/tiup-playground
[11]: https://github.com/DataDog/integrations-extras/tree/master/tidb/tests/compose
[12]: https://docs.datadoghq.com/es/help/