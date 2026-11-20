---
app_id: dcgm
categories:
- ia/ml
custom_kind: integración
description: Monitoriza las métricas de GPU expuestas aprovechadas por Nvidia DCGM
  Exporter
integration_version: 4.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Nvidia DCGM Exporter
---
## Información general

Este check envía las métricas expuestas por el [NVIDIA DCGM Exporter](https://github.com/NVIDIA/dcgm-exporter) en eñ formato del Datadog Agent. Para obtener más información sobre NVIDIA Data Center GPU Manager (DCGM), consulta [NVIDIA DCGM](https://developer.nvidia.com/dcgm).

## Configuración

### Instalación

A partir de la versión 7.47.0 del Agent, el check de DCGM se incluye en el paquete del [Datadog Agent ](https://app.datadoghq.com/account/settings/agent/latest). Sin embargo, para que el Agent pueda recopilar estos datos, es necesario poner en marcha el contenedor de DCGM Exporter para exponer las métricas de la GPU. Como los contadores predeterminados no son suficientes, Datadog recomienda utilizar la siguiente configuración de DCGM para cubrir el mismo terreno que la integración de NVML además de disponer de métricas útiles. Esta integración es totalmente compatible con el Agent 7.59+. Algunas telemetrías pueden no estar disponibles para versiones anteriores del Agent.

```
# Format
# If line starts with a '#' it is considered a comment
# DCGM FIELD                                                      ,Prometheus metric type ,help message

# Clocks
DCGM_FI_DEV_SM_CLOCK                                              ,gauge                  ,SM clock frequency (in MHz).
DCGM_FI_DEV_MEM_CLOCK                                             ,gauge                  ,Memory clock frequency (in MHz).

# Temperature
DCGM_FI_DEV_MEMORY_TEMP                                           ,gauge                  ,Memory temperature (in C).
DCGM_FI_DEV_GPU_TEMP                                              ,gauge                  ,GPU temperature (in C).

# Power
DCGM_FI_DEV_POWER_USAGE                                           ,gauge                  ,Power draw (in W).
DCGM_FI_DEV_TOTAL_ENERGY_CONSUMPTION                              ,counter                ,Total energy consumption since boot (in mJ).

# PCIE
DCGM_FI_DEV_PCIE_REPLAY_COUNTER                                   ,counter                ,Total number of PCIe retries.

# Utilization (the sample period varies depending on the product)
DCGM_FI_DEV_GPU_UTIL                                              ,gauge                  ,GPU utilization (in %).
DCGM_FI_DEV_MEM_COPY_UTIL                                         ,gauge                  ,Memory utilization (in %).
DCGM_FI_DEV_ENC_UTIL                                              ,gauge                  ,Encoder utilization (in %).
DCGM_FI_DEV_DEC_UTIL                                              ,gauge                  ,Decoder utilization (in %).

# Errors and violations
DCGM_FI_DEV_XID_ERRORS                                            ,gauge                  ,Value of the last XID error encountered.

# Memory usage
DCGM_FI_DEV_FB_FREE                                               ,gauge                  ,Framebuffer memory free (in MiB).
DCGM_FI_DEV_FB_USED                                               ,gauge                  ,Framebuffer memory used (in MiB).

# NVLink
DCGM_FI_DEV_NVLINK_BANDWIDTH_TOTAL                                ,counter                ,Total number of NVLink bandwidth counters for all lanes.

# VGPU License status
DCGM_FI_DEV_VGPU_LICENSE_STATUS                                   ,gauge                  ,vGPU License status

# Remapped rows
DCGM_FI_DEV_UNCORRECTABLE_REMAPPED_ROWS                           ,counter                ,Number of remapped rows for uncorrectable errors
DCGM_FI_DEV_CORRECTABLE_REMAPPED_ROWS                             ,counter                ,Number of remapped rows for correctable errors
DCGM_FI_DEV_ROW_REMAP_FAILURE                                     ,gauge                  ,Whether remapping of rows has failed

# DCP metrics
DCGM_FI_PROF_PCIE_TX_BYTES                                        ,counter                ,The number of bytes of active pcie tx data including both header and payload.
DCGM_FI_PROF_PCIE_RX_BYTES                                        ,counter                ,The number of bytes of active pcie rx data including both header and payload.
DCGM_FI_PROF_GR_ENGINE_ACTIVE                                     ,gauge                  ,Ratio of time the graphics engine is active (in %).
DCGM_FI_PROF_SM_ACTIVE                                            ,gauge                  ,The ratio of cycles an SM has at least 1 warp assigned (in %).
DCGM_FI_PROF_SM_OCCUPANCY                                         ,gauge                  ,The ratio of number of warps resident on an SM (in %).
DCGM_FI_PROF_PIPE_TENSOR_ACTIVE                                   ,gauge                  ,Ratio of cycles the tensor (HMMA) pipe is active (in %).
DCGM_FI_PROF_DRAM_ACTIVE                                          ,gauge                  ,Ratio of cycles the device memory interface is active sending or receiving data (in %).
DCGM_FI_PROF_PIPE_FP64_ACTIVE                                     ,gauge                  ,Ratio of cycles the fp64 pipes are active (in %).
DCGM_FI_PROF_PIPE_FP32_ACTIVE                                     ,gauge                  ,Ratio of cycles the fp32 pipes are active (in %).
DCGM_FI_PROF_PIPE_FP16_ACTIVE                                     ,gauge                  ,Ratio of cycles the fp16 pipes are active (in %).

# Datadog additional recommended fields
DCGM_FI_DEV_COUNT                                                 ,counter                ,Number of Devices on the node.
DCGM_FI_DEV_FAN_SPEED                                             ,gauge                  ,Fan speed for the device in percent 0-100.
DCGM_FI_DEV_SLOWDOWN_TEMP                                         ,gauge                  ,Slowdown temperature for the device.
DCGM_FI_DEV_POWER_MGMT_LIMIT                                      ,gauge                  ,Current power limit for the device.
DCGM_FI_DEV_PSTATE                                                ,gauge                  ,Performance state (P-State) 0-15. 0=highest
DCGM_FI_DEV_FB_TOTAL                                              ,gauge                  ,
DCGM_FI_DEV_FB_RESERVED                                           ,gauge                  ,
DCGM_FI_DEV_FB_USED_PERCENT                                       ,gauge                  ,
DCGM_FI_DEV_CLOCK_THROTTLE_REASONS                                ,gauge                  ,Current clock throttle reasons (bitmask of DCGM_CLOCKS_THROTTLE_REASON_*)

DCGM_FI_PROCESS_NAME                                              ,label                  ,The Process Name.
DCGM_FI_CUDA_DRIVER_VERSION                                       ,label                  ,
DCGM_FI_DEV_NAME                                                  ,label                  ,
DCGM_FI_DEV_MINOR_NUMBER                                          ,label                  ,
DCGM_FI_DRIVER_VERSION                                            ,label                  ,
DCGM_FI_DEV_BRAND                                                 ,label                  ,
DCGM_FI_DEV_SERIAL                                                ,label                  ,
```

{{< tabs >}}

{{% tab "Host | Docker" %}}

#### Docker

Para configurar el exportador en un entorno Docker:

1. Crea el archivo `$PWD/default-counters.csv` que contiene los campos predeterminados de NVIDIA `etc/default-counters.csv` así como campos adicionales recomendados por Datadog. Para añadir más campos a la recopilación, sigue [estas instrucciones](https://github.com/NVIDIA/dcgm-exporter/tree/main#changing-metrics). Para ver la lista completa de campos, consulta el [Manual de referencia de la API de DCGM](https://docs.nvidia.com/datacenter/dcgm/latest/dcgm-api/dcgm-api-field-ids.html).
1. Ejecuta el contenedor Docker usando el siguiente comando:
   ```shell
   sudo docker run --pid=host --privileged -e DCGM_EXPORTER_INTERVAL=5000 --gpus all -d -v /proc:/proc -v $PWD/default-counters.csv:/etc/dcgm-exporter/default-counters.csv -p 9400:9400 --name dcgm-exporter nvcr.io/nvidia/k8s/dcgm-exporter:3.1.7-3.1.4-ubuntu20.04
   ```

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes (chart Helm de DCGM Exporter)

El exportador de DCGM puede instalarse rápidamente en un entorno de Kubernetes con el gráfico de Helm de NVIDIA DCGM Exporter. Las instrucciones siguientes se obtienen de la plantilla proporcionada por NVIDIA [aquí](https://github.com/NVIDIA/dcgm-exporter#quickstart-on-kubernetes).

1. Añade el repositorio Helm de NVIDIA DCGM Exporter y asegúrate de que esté actualizado:
   ```shell
   helm repo add gpu-helm-charts https://nvidia.github.io/dcgm-exporter/helm-charts && helm repo update
   ```
1. Crea un `ConfigMap` que contenga las métricas recomendadas por Datadog de [Instalación](#Installation), así como el `RoleBinding` y el `Role` utilizados por los pods de DCGM para recuperar el `ConfigMap` usando el manifiesto a continuación:
   ```yaml
   apiVersion: rbac.authorization.k8s.io/v1
   kind: Role
   metadata:
     name: dcgm-exporter-read-datadog-cm
     namespace: default
   rules:
   - apiGroups: [""]
     resources: ["configmaps"]
     resourceNames: ["datadog-dcgm-exporter-configmap"]
     verbs: ["get"]
   ---
   apiVersion: rbac.authorization.k8s.io/v1
   kind: RoleBinding
   metadata:
     name: dcgm-exporter-datadog
     namespace: default
   subjects:
   - kind: ServiceAccount
     name: dcgm-datadog-dcgm-exporter
     namespace: default
   roleRef:
     kind: Role 
     name: dcgm-exporter-read-datadog-cm
     apiGroup: rbac.authorization.k8s.io
   ---
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: datadog-dcgm-exporter-configmap
     namespace: default
   data:
     metrics: |
         # Copy the content from the Installation section.
   ```
1. Crea tu gráfico de Helm de DCGM Exporter `dcgm-values.yaml` con el siguiente contenido :
   ```yaml
   # Exposing more metrics than the default for additional monitoring - this requires the use of a dedicated ConfigMap for which the Kubernetes ServiceAccount used by the exporter has access thanks to step 1.
   # Ref: https://github.com/NVIDIA/dcgm-exporter/blob/e55ec750def325f9f1fdbd0a6f98c932672002e4/deployment/values.yaml#L38
   arguments: ["-m", "default:datadog-dcgm-exporter-configmap"]

   # Datadog Autodiscovery V2 annotations
   podAnnotations:
     ad.datadoghq.com/exporter.checks: |-
       {
         "dcgm": {
           "instances": [
             {
               "openmetrics_endpoint": "http://%%host%%:9400/metrics"
             }
           ]
         }
       }
   # Optional - Disabling the ServiceMonitor which requires Prometheus CRD - can be re-enabled if Prometheus CRDs are installed in your cluster
   serviceMonitor:
     enabled: false
   ```
1. Instala el chart Helm de DCGM Exporter en el espacio de nombres `default` con el siguiente comando, mientras te encuentras en el directorio con tu `dcgm-values.yaml`:
   ```shell
   helm install dcgm-datadog gpu-helm-charts/dcgm-exporter -n default -f dcgm-values.yaml
   ```

**Nota**: Puedes modificar el nombre de la versión `dcgm-datadog` así como el espacio de nombres, pero debes modificar en consecuencia el manifiesto del paso 1.

{{% /tab %}}

{{% tab "Operator" %}}

#### Kubernetes (NVIDIA GPU Operator)

El exportador de DCGM puede instalarse en un entorno de Kubernetes con NVIDIA GPU Operator. Las instrucciones siguientes proceden de la plantilla proporcionada por NVIDIA [aquí](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html).

1. Añade el repositorio Helm de NVIDIA GPU Operator y asegúrate de que esté actualizado:
   ```shell
   helm repo add nvidia https://helm.ngc.nvidia.com/nvidia && helm repo update
   ```
1. Sigue las instrucciones de [Configuración de métricas personalizadas](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html#custom-metrics-config) con el CSV de [Instalación](#installation) :
   - Obtén el archivo de métricas y guárdalo como `dcgm-metrics.csv`: `curl https://raw.githubusercontent.com/NVIDIA/dcgm-exporter/main/etc/dcp-metrics-included.csv > dcgm-metrics.csv`
   - Edita el archivo de métricas reemplazando su contenido con la asignación proporcionada por Datadog.
   - Crea un espacio de nombres `gpu-operator` si aún no existe: `kubectl create namespace gpu-operator`.
   - Crea un ConfigMap utilizando el archivo editado anteriormente: `kubectl create configmap metrics-config -n gpu-operator --from-file=dcgm-metrics.csv`
1. Crea tu gráfico de Helm de GPU Operator `dcgm-values.yaml` con el siguiente contenido:
   ```yaml
   # Refer to NVIDIA documentation for the driver and toolkit for your GPU-enabled nodes - example below for Amazon Linux 2 g5.xlarge
   driver:
     enabled: true
   toolkit:
     version: v1.13.5-centos7
   # Using custom metrics configuration to collect recommended Datadog additional metrics - requires the creation of the metrics-config ConfigMap from the previous step
   # Ref: https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html#custom-metrics-config
   dcgmExporter:
     config:
       name: metrics-config
     env:
     - name: DCGM_EXPORTER_COLLECTORS
       value: /etc/dcgm-exporter/dcgm-metrics.csv
   # Adding Datadog autodiscovery V2 annotations
   daemonsets:
     annotations:
       ad.datadoghq.com/nvidia-dcgm-exporter.checks: |-
         {
           "dcgm": {
             "instances": [
               {
                 "openmetrics_endpoint": "http://%%host%%:9400/metrics"
               }
             ]
           }
         }
   ```
1. Instala el chart Helm de DCGM Exporter en el espacio de nombres `default` con el siguiente comando, mientras te encuentras en el directorio con tu `dcgm-values.yaml`:
   ```bash
   helm install datadog-dcgm-gpu-operator -n gpu-operator nvidia/gpu-operator -f dcgm-values.yaml
   ```

{{% /tab %}}

{{< /tabs >}}

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

##### Recopilación de métricas

1. Edita el archivo `dcgm.d/conf.yaml` (ubicado en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent) para comenzar a recopilar tus métricas de GPU. Consulta [ejemplo de dcgm.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/dcgm/datadog_checks/dcgm/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.

   ```
   instances:

      ## @param openmetrics_endpoint - string - required
      ## The URL exposing metrics in the OpenMetrics format.
      ##
      ## Set this to <listenAddress>/<handlerPath> as configured in your DCGM Server
      #
      - openmetrics_endpoint: http://localhost:9400/metrics
   ```

Utiliza el campo de configuración `extra_metrics` para añadir métricas que vayan más allá de las que Datadog [admite de fábrica](https://github.com/DataDog/integrations-core/blob/master/dcgm/metadata.csv). Consulta la [documentación de NVIDIA](https://docs.nvidia.com/datacenter/dcgm/latest/dcgm-api/dcgm-api-field-ids.html) para ver la lista completa de métricas que puede recopilar dcgm-exporter. Asegúrate también de [activar estos campos en la configuración de dcgm-exporter](https://github.com/NVIDIA/dcgm-exporter/tree/main#changing-metrics).

{{% /tab %}}

{{% tab "Docker" %}}

#### Docker

##### Recopilación de métricas

Configura [Plantillas de integraciones de Autodiscovery](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) como etiquetas Docker en tu contenedor del exportador de DCGM:

```yaml
LABEL "com.datadoghq.ad.check_names"='["dcgm"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint": "http://%%host%%:9400/metrics"}]'
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes

**Nota**: Si seguiste las instrucciones para el [chart Helm de DCGM Exporter](#kubernetes-dcgm-exporter-helm-chart) o [GPU Operator](#kubernetes-nvidia-gpu-operator), las anotaciones ya se aplican a los pods y puedes ignorar las siguientes instrucciones.

1. Para Configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes) como anotaciones de pod en tu contenedor de aplicaciones. Aparte de esto, las plantillas también se pueden configurar con [un archivo, un mapa de configuración o un almacén de valores clave](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration).

**Anotaciones v2** (para el Datadog Agent v7.47 o posterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/dcgm.checks: |
      {
        "dcgm": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9400/metrics"
            }
          ]
        }
      }
spec:
  containers:
    - name: dcgm
```

{{% /tab %}}

{{< /tabs >}}

Cuando hayas terminado de realizar los cambios de configuración, [reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `dcgm` en la sección Checks.

### Ajuste de los monitores

Los monitores predefinidos que vienen con esta integración tienen algunos valores predeterminados basados en sus umbrales de alerta. Por ejemplo, la temperatura de la GPU se determina en función de un [rango aceptable para dispositivos industriales](https://en.wikipedia.org/wiki/Operating_temperature).
Sin embargo, Datadog recomienda que compruebes si estos valores se ajustan a tus necesidades particulares.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **dcgm.clock_throttle_reasons** <br>(gauge) | Motivos actuales de aceleración del reloj (máscara de bits de DCGM_CLOCKS_THROTTLE_REASON\_\*)|
| **dcgm.correctable_remapped_rows.count** <br>(count) | Número de filas reasignadas para errores corregibles.<br>_Mostrado como fila_ |
| **dcgm.dec_utilization** <br>(gauge) | Utilización del descodificador (en %).<br>_Mostrado como porcentaje_ |
| **dcgm.device.count** <br>(count) | Cambio en el número de dispositivos en el nodo.<br>_Mostrado como dispositivo_ |
| **dcgm.device.total** <br>(gauge) | Número de dispositivos en el nodo.|
| **dcgm.dram.active** <br>(gauge) | Proporción de ciclos en los que la interfaz de memoria del dispositivo está activa enviando o recibiendo datos (en %).<br>_Mostrado como fracción_ |
| **dcgm.enc_utilization** <br>(gauge) | Utilización del codificador (en %).<br>_Mostrado como porcentaje_ |
| **dcgm.fan_speed** <br>(gauge) | Velocidad del ventilador del dispositivo en porcentaje 0-100.<br>_Mostrado como porcentaje_ |
| **dcgm.frame_buffer.free** <br>(gauge) | Búfer libre en MB.<br>_Mostrado como megabyte_ |
| **dcgm.frame_buffer.reserved** <br>(gauge) | Búfer reservado en MB.<br>_Mostrado como megabyte_ |
| **dcgm.frame_buffer.total** <br>(gauge) | Búfer total de cuadros de la GPU en MB.<br>_Mostrado como megabyte_. |
| **dcgm.frame_buffer.used** <br>(gauge) | Búfer de cuadros utilizado en MB.<br>_Mostrado como megabyte_ |
| **dcgm.frame_buffer.used_percent** <br>(gauge) | Porcentaje utilizado del búfer de cuadros: Utilizado/(Total - Reservado). Rango 0.0-1.0<br>_Mostrado como fracción_. |
| **dcgm.gpu_utilization** <br>(gauge) | Utilización de la GPU (en %).<br>_Mostrado como porcentaje_. |
| **dcgm.gr_engine_active** <br>(gauge) | Proporción de tiempo que el motor gráfico está activo (en %).<br>_Mostrado como fracción_ |
| **dcgm.mem.clock** <br>(gauge) | Frecuencia de reloj de la memoria (en MHz).<br>_Mostrado en megahercios_. |
| **dcgm.mem.copy_utilization** <br>(gauge) | Utilización de la memoria (en %).<br>_Mostrado como porcentaje_. |
| **dcgm.mem.temperature** <br>(gauge) | Temperatura de la memoria (en C).<br>_Mostrado en grados Celsius_ |
| **dcgm.nvlink_bandwidth.count** <br>(count) | Cambio en el número de contadores de ancho de banda de NVLink para todos los carriles|
| **dcgm.nvlink_bandwidth.total** <br>(gauge) | Número total de contadores de ancho de banda de NVLink para todos los carriles|
| **dcgm.pcie_replay.count** <br>(count) | Cambio en el número de reintentos de PCIe.|
| **dcgm.pcie_replay.total** <br>(gauge) | Número total de reintentos de PCIe.|
| **dcgm.pcie_rx_throughput.count** <br>(count) | Cambio en la información de utilización de PCIe Rx.|
| **dcgm.pcie_rx_throughput.total** <br>(gauge) | Información de utilización de PCIe Rx.|
| **dcgm.pcie_tx_throughput.count** <br>(count) | Cambio en la información de utilización de PCIe Tx.|
| **dcgm.pcie_tx_throughput.total** <br>(gauge) | Información de utilización de PCIe Tx|
| **dcgm.pipe.fp16_active** <br>(gauge) | Proporción de ciclos en los que los pipes fp16 están activos (en %).<br>_Mostrado como fracción_ |
| **dcgm.pipe.fp32_active** <br>(gauge) | Proporción de ciclos en los que los pipes fp32 están activas (en %).<br>_Mostrado como fracción_ |
| **dcgm.pipe.fp64_active** <br>(gauge) | Proporción de ciclos en los que los pipes fp64 están activos (en %).<br>_Mostrado como fracción_ |
| **dcgm.pipe.tensor_active** <br>(gauge) | Proporción de ciclos en los que el tubo tensor (HMMA) está activo (en %).<br>_Mostrado como fracción_ |
| **dcgm.power_management_limit** <br>(gauge) | Límite de potencia actual del dispositivo.<br>_Mostrado como vatios_ |
| **dcgm.power_usage** <br>(gauge) | Potencia absorbida (en W).<br>_Mostrado como vatios_. |
| **dcgm.pstate** <br>(gauge) | Estado de rendimiento (P-State) 0-15. 0=máximo|
| **dcgm.row_remap_failure** <br>(gauge) | Si ha fallado la reasignación de filas.|
| **dcgm.slowdown_temperature** <br>(gauge) | Temperatura de ralentización del dispositivo.<br>_Mostrado como grados Celsius_ |
| **dcgm.sm_active** <br>(gauge) | Proporción de ciclos en los que un SM tiene asignado al menos 1 urdimbre (en %).<br>_Mostrado como fracción_ |
| **dcgm.sm_clock** <br>(gauge) | Frecuencia del reloj SM (en MHz).<br>_Mostrado como megahercios_ |
| **dcgm.sm_occupancy** <br>(gauge) | Proporción del número de urdimbres residentes en un SM (en %).<br>_Mostrado como fracción_. |
| **dcgm.temperature** <br>(gauge) | Temperatura de la GPU (en C).<br>_Mostrado como grados Celsius_ |
| **dcgm.total_energy_consumption.count** <br>(count) | Cambio en el consumo de energía (en mJ).<br>_Mostrado como milijulios_. |
| **dcgm.total_energy_consumption.total** <br>(gauge) | Consumo total de energía desde el arranque (en mJ)|
| **dcgm.uncorrectable_remapped_rows.count** <br>(count) | Cambio en el número de filas reasignadas por errores no corregibles.<br>_Mostrado como fila_ |
| **dcgm.uncorrectable_remapped_rows.total** <br>(gauge) | Número total de filas reasignadas por errores no corregibles.|
| **dcgm.vgpu_license_status** <br>(gauge) | Estado de la licencia de vGPU|
| **dcgm.xid_errors** <br>(gauge) | Valor del último error de XID encontrado.|

### Eventos

La integración de DCGM no incluye ningún evento.

### Checks de servicio

**dcgm.openmetrics.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas de openmetrics del exportador de DCGM.

_Estados: ok, crítico_

## Solucionar problemas

### Asignación de métricas

Si has añadido algunas métricas que no aparecen en el archivo [metadata.csv](https://github.com/DataDog/integrations-core/blob/master/dcgm/metadata.csv) anterior, pero aparecen en tu cuenta con el formato `DCGM_FI_DEV_NEW_METRIC`, reasigna estas métricas en el archivo de configuración [dcgm.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/dcgm/datadog_checks/dcgm/data/conf.yaml.example):

```yaml
    ## @param extra_metrics - (list of string or mapping) - optional
    ## This list defines metrics to collect from the `openmetrics_endpoint`, in addition to
    ## what the check collects by default. If the check already collects a metric, then
    ## metric definitions here take precedence. Metrics may be defined in 3 ways:
    ...
```

El siguiente ejemplo añade la parte de `NEW_METRIC` a espacio de nombres (`dcgm.`), lo que da `dcgm.new_metric`:

```yaml
    extra_metrics:
    - DCGM_FI_DEV_NEW_METRIC: new_metric
```

### ¿El campo de DCGM está habilitado, pero no se envía?

Si un campo no se recopila incluso después de activarlo en `default-counters.csv` y realizar una solicitud a `curl` en `host:9400/metrics`, los [desarrolladores de dcgm-exporter recomiendan](https://github.com/NVIDIA/dcgm-exporter/issues/163#issuecomment-1577506512) consultar el archivo de logs en `var/log/nv-hostengine.log`.

**Nota:** `dcgm-exporter` es un wrapper que contiene las bibliotecas y controladores de nivel inferior que realizan los informes reales.

### Mayor consumo de recursos

En algunos casos, la métrica `DCGM_FI_DEV_GPU_UTIL` puede provocar un mayor consumo de recursos. Si estás experimentando este problema:

1. Deshabilita `DCGM_FI_DEV_GPU_UTIL` en `default-counters.csv`.
1. Asegúrate de que los siguientes campos están habilitados en `default-counters.csv`:
   - `DCGM_FI_PROF_DRAM_ACTIVE`
   - `DCGM_FI_PROF_GR_ENGINE_ACTIVE`
   - `DCGM_FI_PROF_PCIE_RX_BYTES`
   - `DCGM_FI_PROF_PCIE_TX_BYTES`
   - `DCGM_FI_PROF_PIPE_FP16_ACTIVE`
   - `DCGM_FI_PROF_PIPE_FP32_ACTIVE`
   - `DCGM_FI_PROF_PIPE_FP64_ACTIVE`
   - `DCGM_FI_PROF_PIPE_TENSOR_ACTIVE`
   - `DCGM_FI_PROF_SM_ACTIVE`
   - `DCGM_FI_PROF_SM_OCCUPANCY`
1. Reinicia tanto dcgm-exporter como el Datadog Agent.

### ¿Necesitas ayuda?

Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos: