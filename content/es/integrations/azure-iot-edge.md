---
aliases:
- /es/integrations/azure_iot_edge
app_id: azure-iot-edge
categories:
- azure
- iot
- recopilación de logs
- red
custom_kind: integración
description: Monitoriza el estado y el rendimiento de un dispositivo y módulos de
  Azure IoT Edge.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-iot-edge-with-datadog/
  tag: blog
  text: Monitoriza Azure IoT Edge con Datadog
integration_version: 6.1.0
media: []
supported_os:
- linux
- windows
- macos
title: Azure IoT Edge
---
## Información general

[Azure IoT Edge](https://azure.microsoft.com/en-us/services/iot-edge/) es un servicio totalmente gestionado para desplegar cargas de trabajo en la nube que se ejecuten en dispositivos Edge de Internet de las Cosas (IoT) utilizando contenedores estándar.

Utiliza la integración de Datadog y Azure IoT Edge para recopilar métricas y el estado de los dispositivos IoT Edge.

**Nota**: Este integración requiere un tiempo de ejecución de IoT Edge versión 1.0.10 o superior.

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un dispositivo IoT Edge que se ejecuta en un host de dispositivo.

### Instalación

El check de Azure IoT Edge se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).

No es necesaria ninguna instalación adicional en tu dispositivo.

### Configuración

Configura el dispositivo Edge de IoT para que el Agent se ejecute como un módulo personalizado. Sigue la documentación de Microsoft sobre [implementación de módulos de Azure IoT Edge](https://docs.microsoft.com/en-us/azure/iot-edge/how-to-deploy-modules-portal) para obtener información sobre cómo instalar y trabajar con módulos personalizados para Azure IoT Edge.

Sigue los pasos que se indican a continuación para configurar el dispositivo de IoT Edge, los módulos del tiempo de ejecución y el Datadog Agent para empezar a recopilar métricas de IoT Edge.

1. Configura el módulo del tiempo de ejecución de **Edge Agent** de la siguiente manera:

   - La versión de la imagen debe ser `1.0.10` o superior.

   - En "Create Options" (Crear opciones), añade las siguientes `Labels`. Edita la etiqueta `com.datadoghq.ad.instances` según proceda. Consulta el [azure_iot_edge.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/azure_iot_edge/datadog_checks/azure_iot_edge/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles. Consulta la documentación sobre [Autodiscovery de integraciones de Docker](https://docs.datadoghq.com/agent/docker/integrations/) para obtener más información sobre la configuración de la integración basada en etiquetas.

     ```json
     "Labels": {
         "com.datadoghq.ad.check_names": "[\"azure_iot_edge\"]",
         "com.datadoghq.ad.init_configs": "[{}]",
         "com.datadoghq.ad.instances": "[{\"edge_hub_prometheus_url\": \"http://edgeHub:9600/metrics\", \"edge_agent_prometheus_url\": \"http://edgeAgent:9600/metrics\"}]"
     }
     ```

1. Configura el módulo del tiempo de ejecución de **Edge Hub** de la siguiente manera:

   - La versión de la imagen debe ser `1.0.10` o superior.

1. Instala y configura el Datadog Agent como **módulo personalizado**:

   - Configura el nombre del módulo. Por ejemplo: `datadog-agent`.

   - Configura la URL de la imagen del Agent. Por ejemplo: `datadog/agent:7`.

   - En "Variables de entorno", configura tu `DD_API_KEY`. También puedes establecer aquí una configuración adicional del Agent (consulta [Variables de entorno del Agent](https://docs.datadoghq.com/agent/guide/environment-variables/)).

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

1. Guarda e implementa los cambios en la configuración de tu dispositivo.

#### Recopilación de logs

1. La recopilación de logs está desactivada de forma predeterminada en el Datadog Agent, actívala configurando tu módulo personalizado del Datadog Agent:

   - En "Variables de entorno", configura la variable de entorno `DD_LOGS_ENABLED`:

     ```yaml
     DD_LOGS_ENABLED: true
     ```

1. Configura los módulos de **Edge Agent** y **Edge Hub**: en "Crear opciones", añade la siguiente etiqueta:

   ```json
   "Labels": {
       "com.datadoghq.ad.logs": "[{\"source\": \"azure.iot_edge\", \"service\": \"<SERVICE>\"}]",
       "...": "..."
   }
   ```

   Cambia el `service` en función de tu entorno.

   Repite esta operación para cualquier módulo personalizado para el que desees recopilar logs.

1. Guarda e implementa los cambios en la configuración de tu dispositivo.

### Validación

Una vez que el Agent se haya desplegado en el dispositivo, [ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `azure_iot_edge` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **azure.iot_edge.edge_agent.available_disk_space_bytes** <br>(gauge) | Cantidad de espacio que queda en el disco `disk_name.<br>_Se muestra como byte_ | | **azure.iot_edge.edge_agent.command_latency_seconds.count** <br>(gauge) | Recuento del tiempo que ha tardado Docker en ejecutar el comando `command`. Los comandos posibles son: create, update, remove, start, stop, restart.| | **azure.iot_edge.edge_agent.command_latency_seconds.quantile** <br>(gauge) | Cuantil del tiempo que tardó Docker en ejecutar el comando `command`. Los comandos posibles son: create, update, remove, start, stop, restart.<br>_Se muestra como segundo_ | | **azure.iot_edge.edge_agent.command_latency_seconds.sum** <br>(gauge) | Suma del tiempo que ha tardado Docker en ejecutar el comando `command`. Los comandos posibles son: create, update, remove, start, stop, restart.<br>_Se muestra como segundo_ | | **azure.iot_edge.edge_agent.created_pids_total** <br>(gauge) | Número total de procesos que ha creado el módulo `module_name`.| | **azure.iot_edge.edge_agent.deployment_time_seconds.count** <br>(gauge) | Recuento de la cantidad de tiempo que se tardó en completar un nuevo despliegue tras recibir un cambio.| | **azure.iot_edge.edge_agent.deployment_time_seconds.quantile** <br>(gauge) | Cuantil de la cantidad de tiempo que se tardó en completar un nuevo despliegue tras recibir un cambio.<br>_Se muestra como segundo_ | | **azure.iot_edge.edge_agent.deployment_time_seconds.sum** <br>(gauge) | Suma de la cantidad de tiempo que se tardó en completar un nuevo despliegue tras recibir un cambio.<br>_Se muestra como segundo_ | | **azure.iot_edge.edge_agent.direct_method_invocations_count** <br>(count) | Número total de veces que se llama a un método directo incorporado en el Agent de Edge, como Ping o Restart.| | **azure.iot_edge.edge_agent.host_uptime_seconds** <br>(gauge) | Cuánto tiempo ha estado funcionando el host.<br>_Se muestra como segundo_ | | **azure.iot_edge.edge_agent.iotedged_uptime_seconds** <br>(gauge) | Cuánto tiempo lleva funcionando`iotedged`.<br>_Se muestra como segundo_ | | **azure.iot_edge.edge_agent.iothub_syncs_total** <br>(count) | Número total de veces que el Agent de Edge intentó sincronizar su gemelo con IoT Hub, tanto con éxito como sin éxito. Incluye tanto el Agent de Edge solicitando un gemelo como IoT Hub notificando una actualización de gemelo.| | **azure.iot_edge.edge_agent.module_start_total** <br>(count) | Número de veces que el Agent de Edge pidió a Docker que iniciara el módulo `module_name`.| | **azure.iot_edge.edge_agent.module_stop_total** <br>(count) | Número de veces que el Agent de Edge pidió a Docker que detuviera el módulo `module_name`.| | **azure.iot_edge.edge_agent.total_disk_read_bytes** <br>(count) | Cantidad total de bytes leídos del disco por el módulo `module_name`.<br>_Se muestra como byte_ | | **azure.iot_edge.edge_agent.total_disk_space_bytes** <br>(gauge) | Tamaño del disco `disk_name.<br>_Se muestra como byte_ |
| **azure.iot_edge.edge_agent.total_disk_write_bytes** <br>(count) | Cantidad total de bytes escritos en el disco por el módulo `module_name`.<br>_Se muestra como byte_ |
| **azure.iot_edge.edge_agent.total_memory_bytes** <br>(gauge) | Cantidad total de RAM disponible para el módulo `module_name`.<br>_Se muestra como byte_ |
| **azure.iot_edge.edge_agent.total_network_in_bytes** <br>(count) | Cantidad total de bytes recibidos de la red por el módulo `module_name`.<br>_Se muestra como byte_ |
| **azure.iot_edge.edge_agent.total_network_out_bytes** <br>(count) | Cantidad total de bytes enviados a la red por el módulo `module_name`.<br>_Se muestra como byte_ |
| **azure.iot_edge.edge_agent.total_time_expected_running_seconds** <br>(gauge) | La cantidad de tiempo que el módulo `module_name` se especificó en el despliegue.|
| **azure.iot_edge.edge_agent.total_time_running_correctly_seconds** <br>(gauge) | La cantidad de tiempo que el módulo `module_name` se especificó en el despliegue y estuvo en estado de ejecución.|
| **azure.iot_edge.edge_agent.unsuccessful_iothub_syncs_total** <br>(count) | Número total de veces que el Agent de Edge no ha podido sincronizar su gemelo con IoT Hub.|
| **azure.iot_edge.edge_agent.used_cpu_percent.count** <br>(gauge) | Recuento del porcentaje de CPU utilizado por todos los procesos en el módulo `module_name`.|
| **azure.iot_edge.edge_agent.used_cpu_percent.quantile** <br>(gauge) | Cuantil del porcentaje de CPU utilizado por todos los procesos en el módulo `module_name`.<br>_Se muestra como porcentaje_ |
| **azure.iot_edge.edge_agent.used_cpu_percent.sum** <br>(gauge) | Suma del porcentaje de CPU utilizado por todos los procesos en el módulo `module_name`.<br>_Se muestra como porcentaje_ |
| **azure.iot_edge.edge_agent.used_memory_bytes** <br>(gauge) | Cantidad de RAM utilizada por todos los procesos en el módulo `module_name`.<br>_Se muestra como byte_ |
| **azure.iot_edge.edge_hub.client_connect_failed_total** <br>(count) | Número total de veces que los clientes no han podido conectarse a Edge Hub.|
| **azure.iot_edge.edge_hub.direct_method_duration_seconds.count** <br>(gauge) | Recuento del tiempo que se tarda en resolver un mensaje directo.|
| **azure.iot_edge.edge_hub.direct_method_duration_seconds.quantile** <br>(gauge) | Cuantil del tiempo que se tarda en resolver un mensaje directo.<br>_Se muestra como segundo_ |
| **azure.iot_edge.edge_hub.direct_method_duration_seconds.sum** <br>(gauge) | Suma del tiempo necesario para resolver un mensaje directo.<br>_Se muestra como segundo_ |
| **azure.iot_edge.edge_hub.direct_methods_total** <br>(count) | Número total de mensajes directos enviados.|
| **azure.iot_edge.edge_hub.gettwin_duration_seconds.count** <br>(gauge) | Recuento del tiempo empleado en las operaciones get twin.|
| **azure.iot_edge.edge_hub.gettwin_duration_seconds.quantile** <br>(gauge) | Cuantil del tiempo empleado en las operaciones get twin.<br>_Se muestra como segundo_ |
| **azure.iot_edge.edge_hub.gettwin_duration_seconds.sum** <br>(gauge) | Suma del tiempo empleado en las operaciones get twin.<br>_Se muestra como segundo_ |
| **azure.iot_edge.edge_hub.gettwin_total** <br>(count) | Número total de llamadas a GetTwin.|
| **azure.iot_edge.edge_hub.message_process_duration_seconds.count** <br>(gauge) | Recuento del tiempo que se tarda en procesar un mensaje de la cola.|
| **azure.iot_edge.edge_hub.message_process_duration_seconds.quantile** <br>(gauge) | Cuantil del tiempo que se tarda en procesar un mensaje de la cola.<br>_Se muestra como segundo_ |
| **azure.iot_edge.edge_hub.message_process_duration_seconds.sum** <br>(gauge) | Suma del tiempo que se tarda en procesar un mensaje de la cola.<br>_Se muestra como segundo_ |
| **azure.iot_edge.edge_hub.message_send_duration_seconds.count** <br>(gauge) | Recuento del tiempo necesario para enviar un mensaje.|
| **azure.iot_edge.edge_hub.message_send_duration_seconds.quantile** <br>(gauge) | Cuantil del tiempo que se tarda en enviar un mensaje.<br>_Se muestra como segundo_ |
| **azure.iot_edge.edge_hub.message_send_duration_seconds.sum** <br>(gauge) | Suma del tiempo empleado en enviar un mensaje.<br>_Se muestra como segundo_ |
| **azure.iot_edge.edge_hub.message_size_bytes.count** <br>(gauge) | Recuento del tamaño de los mensajes de los clientes.|
| **azure.iot_edge.edge_hub.message_size_bytes.quantile** <br>(gauge) | Cuantil del tamaño de los mensajes de los clientes.<br>_Se muestra como byte_ |
| **azure.iot_edge.edge_hub.message_size_bytes.sum** <br>(gauge) | Suma del tamaño de los mensajes de los clientes.<br>_Se muestra como byte_ |
| **azure.iot_edge.edge_hub.messages_dropped_total** <br>(count) | Número total de mensajes eliminados por `reason`.|
| **azure.iot_edge.edge_hub.messages_received_total** <br>(count) | Número total de mensajes recibidos de los clientes.|
| **azure.iot_edge.edge_hub.messages_sent_total** <br>(count) | Número total de mensajes enviados a los clientes del flujo ascendente.|
| **azure.iot_edge.edge_hub.messages_unack_total** <br>(count) | Número total de mensajes deshechos por fallo de almacenamiento.|
| **azure.iot_edge.edge_hub.offline_count_total** <br>(count) | Número total de veces que Edge Hub se desconectó.|
| **azure.iot_edge.edge_hub.offline_duration_seconds.count** <br>(gauge) | Recuento del tiempo que Edge Hub estuvo desconectado.|
| **azure.iot_edge.edge_hub.offline_duration_seconds.quantile** <br>(gauge) | Cuantil de tiempo que Edge Hub estuvo desconectado.<br>_Se muestra como segundo_ |
| **azure.iot_edge.edge_hub.offline_duration_seconds.sum** <br>(gauge) | Suma del tiempo que Edge Hub estuvo desconectado.<br>_Se muestra como segundo_ |
| **azure.iot_edge.edge_hub.operation_retry_total** <br>(count) | Número total de veces que se han reintentado las operaciones Edge.|
| **azure.iot_edge.edge_hub.queue_length** <br>(gauge) | Longitud actual de la cola del Edge Hub para una determinada `priority`.|
| **azure.iot_edge.edge_hub.reported_properties_total** <br>(count) | Total de llamadas de actualización de propiedades notificadas.|
| **azure.iot_edge.edge_hub.reported_properties_update_duration_seconds.count** <br>(gauge) | Recuento del tiempo necesario para actualizar las propiedades notificadas.|
| **azure.iot_edge.edge_hub.reported_properties_update_duration_seconds.quantile** <br>(gauge) | Cuantil del tiempo que se tarda en actualizar las propiedades notificadas.<br>_Se muestra como segundo_ |
| **azure.iot_edge.edge_hub.reported_properties_update_duration_seconds.sum** <br>(gauge) | Suma del tiempo necesario para actualizar las propiedades notificadas.<br>_Se muestra como segundo_ |

### Eventos

Azure IoT Edge no incluye ningún evento.

### Checks de servicio

**azure.iot_edge.edge_agent.prometheus.health**

Devuelve `CRITICAL` si el Agent no puede llegar al endpoint de Prometheus de métricas de Edge Agent. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

**azure.iot_edge.edge_hub.prometheus.health**

Devuelve `CRITICAL` si el Agent no puede llegar al endpoint de Prometheus de métricas de Edge Hub. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitoriza Azure IoT Edge con Datadog](https://www.datadoghq.com/blog/monitor-azure-iot-edge-with-datadog/)