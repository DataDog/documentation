---
"app_id": "spark"
"app_uuid": "5cb22455-9ae2-44ee-ae05-ec21c27b3292"
"assets":
  "dashboards":
    "Databricks Spark Overview": "assets/dashboards/databricks_overview.json"
    "spark": "assets/dashboards/spark_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "spark.job.count"
      "metadata_path": "metadata.csv"
      "prefix": "spark."
    "process_signatures":
    - "java org.apache.spark.deploy.SparkSubmit"
    - "java org.apache.spark.deploy.worker.Worker"
    - "java org.apache.spark.deploy.master.Master"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "142"
    "source_type_name": "Spark"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/spark/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "spark"
"integration_id": "spark"
"integration_title": "Spark"
"integration_version": "6.4.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "spark"
"public_title": "Spark"
"short_description": "Rastrea los índices de tareas fallidas, bytes aleatorios y mucho más."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Log Collection"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Rastrea los índices de tareas fallidas, bytes aleatorios y mucho más."
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/data-jobs-monitoring/"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/data-observability-monitoring/"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitoring-spark"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/spark-emr-monitoring/"
  "support": "README.md#Support"
  "title": "Spark"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


<div class="alert alert-warning">
<a href="https://docs.datadoghq.com/data_jobs/">Data Jobs Monitoring</a> te ayuda a observar, solucionar problemas y optimizar los costes de tus trabajos de Spark y Databricks y clústeres.<br/><br/>
Esta página solo documenta cómo ingerir métricas y logs de Spark. 
</div>

![Gráfico de Spark][1]

## Información general

Este check monitoriza [Spark][2] a través del Datadog Agent. Recopila métricas de Spark para:

- Controladores y ejecutores: bloques RDD, memoria utilizada, disco utilizado, duración, etc.
- RDDs: recuento de particiones, memoria utilizada y disco utilizado.
- Tareas: número de tareas activas, omitidas, fallidas y totales.
- Estado del trabajo: número de trabajos activos, completados, omitidos y fallidos.

## Configuración

### Instalación

El check de Spark está incluido en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tu nodo maestro de Mesos (para Spark on Mesos), YARN ResourceManager (para Spark on YARN), o nodo maestro de Spark (para Spark Standalone).

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `spark.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la [raíz del directorio de configuración del Agent][1]. Puede que sea necesario actualizar los siguientes parámetros. Para conocer todas las opciones de configuración disponibles, consulta el [spark.d/conf.yaml de ejemplo][2].

   ```yaml
   init_config:

   instances:
     - spark_url: http://localhost:8080 # Spark master web UI
       #   spark_url: http://<Mesos_master>:5050 # Mesos master web UI
       #   spark_url: http://<YARN_ResourceManager_address>:8088 # YARN ResourceManager address

       spark_cluster_mode: spark_yarn_mode # default
       #   spark_cluster_mode: spark_mesos_mode
       #   spark_cluster_mode: spark_yarn_mode
       #   spark_cluster_mode: spark_driver_mode

       # required; adds a tag 'cluster_name:<CLUSTER_NAME>' to all metrics
       cluster_name: "<CLUSTER_NAME>"
       # spark_pre_20_mode: true   # if you use Standalone Spark < v2.0
       # spark_proxy_enabled: true # if you have enabled the spark UI proxy
   ```

2. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/spark/datadog_checks/spark/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

Para entornos en contenedores, consulta las plantillas de integración de Autodiscovery, ya sea para [Docker][1] o [Kubernetes][2], para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `spark`                                                           |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                     |
| `<INSTANCE_CONFIG>`  | `{"spark_url": "%%host%%:8080", "cluster_name":"<CLUSTER_NAME>"}` |

[1]: https://docs.datadoghq.com/containers/docker/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

      ```yaml
       logs_enabled: true
     ```

2. Anula los comentarios y edita el bloque de configuración de logs en tu archivo `spark.d/conf.yaml`. Cambia los valores de los parámetros `type`, `path` y `service` en función de tu entorno. Consulta [spark.d/.yaml de ejemplo][4] para conocer todas las opciones disponibles de configuración.

      ```yaml
       logs:
         - type: file
           path: <LOG_FILE_PATH>
           source: spark
           service: <SERVICE_NAME>
           # To handle multi line that starts with yyyy-mm-dd use the following pattern
           # log_processing_rules:
           #   - type: multi_line
           #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           #     name: new_log_start_with_date
     ```

3. [Reinicia el Agent][5].

Para habilitar los logs para entornos de Docker, consulta [recopilación de logs de Docker][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `spark` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "spark" >}}


### Eventos

El check de Spark no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "spark" >}}


## Solucionar problemas

### Spark en Amazon EMR

Para recibir métricas para Spark en Amazon EMR, [utiliza acciones de arranque][8] para instalar el [Agent][9]:

Para Agent v5, crea el archivo de configuración `/etc/dd-agent/conf.d/spark.yaml` con los [valores adecuados en cada nodo de EMR][10].

Para Agent v6/7, crea el archivo de configuración `/etc/datadog-agent/conf.d/spark.d/conf.yaml` con los [valores adecuados en cada nodo de EMR][10].

### Check finalizado con éxito, pero no se recopilaron métricas 

La integración de Spark solo recopila métricas sobre las aplicaciones en ejecución. Si no tienes ninguna aplicación en ejecución, el check se limitará a enviar un check de estado.

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorización de Hadoop y Spark con Datadog][11]
- [Monitorización de aplicaciones de Apache Spark ejecutadas en Amazon EMR][12]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/spark/images/sparkgraph.png
[2]: https://spark.apache.org/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/spark/datadog_checks/spark/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/docker/log/
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-plan-bootstrap.html
[9]: https://docs.datadoghq.com/agent/
[10]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-connect-master-node-ssh.html
[11]: https://www.datadoghq.com/blog/monitoring-spark
[12]: https://www.datadoghq.com/blog/spark-emr-monitoring/
