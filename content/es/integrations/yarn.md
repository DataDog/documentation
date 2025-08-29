---
"app_id": "yarn"
"app_uuid": "427f8f08-00a1-455a-a0e5-9b2ec7ffb0a5"
"assets":
  "dashboards":
    "hadoop": "assets/dashboards/hadoop_dashboard.json"
    "yarn": "assets/dashboards/yarn_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "yarn.metrics.total_mb"
      "metadata_path": "metadata.csv"
      "prefix": "yarn."
    "process_signatures":
    - "java org.apache.hadoop.yarn.server.resourcemanager.ResourceManager"
    - "java org.apache.hadoop.yarn.server.nodemanager.NodeManager"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "134"
    "source_type_name": "Yarn"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/yarn/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "yarn"
"integration_id": "yarn"
"integration_title": "Yarn"
"integration_version": "7.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "yarn"
"public_title": "Yarn"
"short_description": "Recopila métricas del estado de todo el clúster y realiza un seguimiento del progreso de la aplicación"
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Recopilación de logs"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Offering::Integración"
  "configuration": "README.md#Configuración"
  "description": "Recopila métricas del estado de todo el clúster y realiza un seguimiento del progreso de la aplicación"
  "media": []
  "overview": "README.md#Información general"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/hadoop-architecture-overview"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitor-hadoop-metrics"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/collecting-hadoop-metrics"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog"
  "support": "README.md#Soporte"
  "title": "Yarn"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Hadoop Yarn][1]

## Información general

Este check recopila métricas de tu YARN ResourceManager, incluyendo (pero no limitado a):

- Métricas de todo el clúster, como el número de aplicaciones en ejecución, de contenedores en ejecución y de nodos insalubres, etc.
- Métricas por aplicación, como el progreso de la aplicación, el tiempo de ejecución transcurrido, los contenedores en ejecución, el uso de memoria, etc.
- Métricas de nodo, como los vCores disponibles, la hora de la última actualización de estado, etc.

### Aviso de obsolescencia

Las métricas `yarn.apps.<METRIC>` quedan obsoletas en favor de las métricas `yarn.apps.<METRIC>_gauge`, ya que las métricas `yarn.apps` se informan incorrectamente como `RATE` en lugar de `GAUGE`.

## Configuración

### Instalación

El check de YARN está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tu YARN ResourceManager.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `yarn.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1].

   ```yaml
   init_config:

   instances:
     ## @param resourcemanager_uri - string - required
     ## The YARN check retrieves metrics from YARNS's ResourceManager. This
     ## check must be run from the Master Node and the ResourceManager URI must
     ## be specified below. The ResourceManager URI is composed of the
     ## ResourceManager's hostname and port.
     ## The ResourceManager hostname can be found in the yarn-site.xml conf file
     ## under the property yarn.resourcemanager.address
     ##
     ## The ResourceManager port can be found in the yarn-site.xml conf file under
     ## the property yarn.resourcemanager.webapp.address
     #
     - resourcemanager_uri: http://localhost:8088

       ## @param cluster_name - string - required - default: default_cluster
       ## A friendly name for the cluster.
       #
       cluster_name: default_cluster
   ```

   Consulta la [configuración de check de ejemplo][2] para obtener listas y descripciones completas de otras opciones de check.

2. [Reinicia el Agent][3] para empezar a enviar métricas de YARN a Datadog.

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `yarn`                                                                                  |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                           |
| `<INSTANCE_CONFIG>`  | `{"resourcemanager_uri": "http://%%host%%:%%port%%", "cluster_name": "<CLUSTER_NAME>"}` |

##### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Descomenta y edita el bloque de configuración de logs en tu archivo `yarn.d/conf.yaml`. Cambia los valores de los parámetros `type`, `path` y `service` en función de tu entorno. Consulta el [yarn.d/conf.yaml de ejemplo][2] para conocer todas las opciones de configuración disponibles.

    ```yaml
    logs:
      - type: file
        path: <LOG_FILE_PATH>
        source: yarn
        service: <SERVICE_NAME>
        # To handle multi line that starts with yyyy-mm-dd use the following pattern
        # log_processing_rules:
        #   - type: multi_line
        #     pattern: \d{4}\-\d{2}\-\d{2} \d{2}:\d{2}:\d{2},\d{3}
        #     name: new_log_start_with_date
    ```

3. [Reinicia el Agent][3].

Para habilitar los logs para entornos de Docker, consulta [Recopilación de logs de Docker][4].

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/integrations-core/blob/master/yarn/datadog_checks/yarn/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/agent/docker/log/
{{% /tab%}}
{{< /tabs>}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `yarn` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "yarn" >}}


### Eventos

El check de Yarn no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "yarn" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Referencias adicionales

- [Información general de la arquitectura Hadoop][5]
- [Monitorización de métricas de Hadoop][6]
- [Recopilación de métricas de Hadoop][7]
- [Monitorización de Hadoop con Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/yarn/images/yarn_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/hadoop-architecture-overview
[6]: https://www.datadoghq.com/blog/monitor-hadoop-metrics
[7]: https://www.datadoghq.com/blog/collecting-hadoop-metrics
[8]: https://www.datadoghq.com/blog/monitor-hadoop-metrics-datadog
