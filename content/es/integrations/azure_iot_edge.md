---
app_id: azure-iot-edge
app_uuid: 9c4d7121-eed1-429c-bd86-18952b11d3f5
assets:
  dashboards:
    azure_iot_edge: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: azure.iot_edge.edge_agent.iotedged_uptime_seconds
      metadata_path: metadata.csv
      prefix: azure.iot_edge.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10125
    source_type_name: Azure IoT Edge
  monitors:
    Device is running out of disk space: assets/monitors/disk_usage.json
    Device is running out of memory: assets/monitors/memory_usage.json
    Edge Hub operation retries is higher than usual: assets/monitors/edgehub_retries.json
    Unsuccessful syncs are high: assets/monitors/iothub_syncs.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- iot
- recopilación de logs
- network
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/README.md
display_on_public_website: true
draft: false
git_integration_title: azure_iot_edge
integration_id: azure-iot-edge
integration_title: Azure IoT Edge
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: azure_iot_edge
public_title: Azure IoT Edge
short_description: Monitoriza el estado y el rendimiento de un dispositivo y módulos
  de Azure IoT Edge.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Azure
  - Category::IoT
  - Categoría::Recopilación de logs
  - Categoría::Red
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza el estado y el rendimiento de un dispositivo y módulos de
    Azure IoT Edge.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-azure-iot-edge-with-datadog/
  support: README.md#Soporte
  title: Azure IoT Edge
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

[Azure IoT Edge][1] es un servicio totalmente gestionado servicio que permite implementar cargas de trabajo en la nube para que se ejecuten en dispositivos Edge de Internet de las Cosas (IoT) utilizando contenedores estándar.

Utiliza la integración de Datadog y Azure IoT Edge para recopilar métricas y el estado de los dispositivos IoT Edge.

**Nota**: Este integración requiere un tiempo de ejecución de IoT Edge versión 1.0.10 o superior.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un dispositivo IoT Edge que se ejecuta en un host de dispositivo.

### Instalación

El check de Azure IoT Edge se incluye en el paquete del [Datadog Agent][2].

No es necesaria ninguna instalación adicional en tu dispositivo.

### Configuración

Configura el dispositivo IoT Edge de modo que el Agent se ejecute como un módulo personalizado. Sigue la documentación de Microsoft sobre [implementación de módulos de Azure IoT Edge][3] para obtener información sobre cómo instalar y trabajar con módulos personalizados para Azure IoT Edge.

Sigue los pasos que se indican a continuación para configurar el dispositivo de IoT Edge, los módulos del tiempo de ejecución y el Datadog Agent para empezar a recopilar métricas de IoT Edge.

1. Configura el módulo del tiempo de ejecución de **Edge Agent** de la siguiente manera:
    - La versión de la imagen debe ser `1.0.10` o superior.
    - En "Crear opciones", añade las siguientes `Labels`. Edita la etiqueta `com.datadoghq.ad.instances` según proceda. Consulta el [ejemplo de azure_iot_edge.d/conf.yaml][4] para ver todas las opciones disponibles de configuración. Consulta la documentación sobre [Autodiscovery de integraciones de Docker][5] para obtener más información sobre la configuración de integración basada en etiquetas.

        ```json
        "Labels": {
            "com.datadoghq.ad.check_names": "[\"azure_iot_edge\"]",
            "com.datadoghq.ad.init_configs": "[{}]",
            "com.datadoghq.ad.instances": "[{\"edge_hub_prometheus_url\": \"http://edgeHub:9600/metrics\", \"edge_agent_prometheus_url\": \"http://edgeAgent:9600/metrics\"}]"
        }
        ```

2. Configura el módulo del tiempo de ejecución de **Edge Hub** de la siguiente manera:
    - La versión de la imagen debe ser `1.0.10` o superior.

3. Instala y configura el Datadog Agent como **módulo personalizado**:
    - Configura el nombre del módulo. Por ejemplo: `datadog-agent`.
    - Configura la URL de la imagen del Agent. Por ejemplo: `datadog/agent:7`.
    - En "Variables de entorno", configura tu `DD_API_KEY`. También puedes configurar aquí una configuración adicional del Agent (consulta [Variables de entorno del Agent][6]).
    - En "Opciones para crear el contenedor", introduce la siguiente configuración en función del sistema operativo de tu dispositivo. **Nota**: `NetworkId` debe corresponder al nombre de la red configurado en el archivo `config.yaml` del dispositivo.

        - Linux:
            ```json
            {
                "HostConfig": {
                    "NetworkMode": "default",
                    "Env": ["NetworkId=azure-iot-edge"],
                    "Binds": ["/var/run/docker.sock:/var/run/docker.sock"]
                }
            }
            ```
        - Windows:
            ```json
            {
                "HostConfig": {
                    "NetworkMode": "default",
                    "Env": ["NetworkId=nat"],
                    "Binds": ["//./pipe/iotedge_moby_engine:/./pipe/docker_engine"]
                }
            }
            ```

    - Guarda el módulo personalizado del Datadog Agent.

4. Guarda e implementa los cambios en la configuración de tu dispositivo.

#### Recopilación de logs

1. La recopilación de logs está desactivada de forma predeterminada en el Datadog Agent, actívala configurando tu módulo personalizado del Datadog Agent:
    - En "Variables de entorno", configura la variable de entorno `DD_LOGS_ENABLED`:

        ```yaml
        DD_LOGS_ENABLED: true
        ```

2. Configura los módulos de **Edge Agent** y **Edge Hub**: en "Crear opciones", añade la siguiente etiqueta:

    ```json
    "Labels": {
        "com.datadoghq.ad.logs": "[{\"source\": \"azure.iot_edge\", \"service\": \"<SERVICE>\"}]",
        "...": "..."
    }
    ```

   Cambia el `service` en función de tu entorno.

   Repite esta operación para cualquier módulo personalizado para el que desees recopilar logs.

3. Guarda e implementa los cambios en la configuración de tu dispositivo.

### Validación

Una vez que Agent se haya implementado en el dispositivo, [ejecuta el subcomando de estado del Agent][7] y busca `azure_iot_edge` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_iot_edge" >}}


### Eventos

Azure IoT Edge no incluye ningún evento.

### Checks de servicios
{{< get-service-checks-from-git "azure_iot_edge" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

- [Monitoriza Azure IoT Edge con Datadog][11]

[1]: https://azure.microsoft.com/en-us/services/iot-edge/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.microsoft.com/en-us/azure/iot-edge/how-to-deploy-modules-portal
[4]: https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/datadog_checks/azure_iot_edge/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/docker/integrations/
[6]: https://docs.datadoghq.com/es/agent/guide/environment-variables/
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.datadoghq.com/blog/monitor-azure-iot-edge-with-datadog/