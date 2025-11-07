---
app_id: dcgm
app_uuid: 7e03132a-939d-4bae-8114-dfcdf9056646
assets:
  dashboards:
    DCGM Exporter (Nvidia GPU Monitoring) Overview: assets/dashboards/dcgm_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: dcgm.temperature
      metadata_path: metadata.csv
      prefix: dcgm.
    process_signatures:
    - dcgm-exporter
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10374
    source_type_name: dcgm
  monitors:
    GPU memory usage is high: assets/monitors/memory_usage.json
    GPU temperature is high: assets/monitors/gpu_temperature.json
    XID errors detected: assets/monitors/xid_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ia/ml
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/dcgm/README.md
display_on_public_website: true
draft: false
git_integration_title: dcgm
integration_id: dcgm
integration_title: Nvidia DCGM Exporter
integration_version: 3.3.0
is_public: true
manifest_version: 2.0.0
name: dcgm
public_title: Nvidia DCGM Exporter
short_description: Monitoriza las métricas de GPU expuestas aprovechadas por Nvidia
  DCGM Exporter
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza las métricas de GPU expuestas aprovechadas por Nvidia DCGM
    Exporter
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nvidia DCGM Exporter
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check envía las métricas expuestas por [NVIDIA DCGM Exporter][1] en formato de Datadog Agent. Para obtener más información sobre NVIDIA Data Center GPU Manager (DCGM), consulta [NVIDIA DCGM][2].

## Configuración

### Instalación

A partir de la versión 7.47.0 del Agent, el check DCGM viene incluido en el paquete del [Datadog Agent][3]. Sin embargo, es necesario poner en marcha el contenedor del exportador DCGM para exponer las métricas de GPU con el fin de que el Agent recopile estos datos. Dado que los contadores por defecto no son suficientes, Datadog recomienda utilizar la siguiente configuración de DCGM para cubrir el mismo terreno que la integración NVML, además de tener métricas útiles. Esta integración es totalmente compatible con el Agent v7.59 o posterior. Es posible que algunas telemetrías no estén disponibles para versiones anteriores del Agent.

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

1. Crea el archivo `$PWD/default-counters.csv` que contiene los campos predeterminados de NVIDIA `etc/default-counters.csv`, así como otros campos recomendados por Datadog. Para agregar más campos para la recopilación, sigue [estas instrucciones][1]. Para obtener la lista completa de campos, consulta el [manual de referencia de la API de DCGM][2].
2. Ejecuta el contenedor Docker usando el siguiente comando:
   ```shell
   sudo docker run --pid=host --privileged -e DCGM_EXPORTER_INTERVAL=5000 --gpus all -d -v /proc:/proc -v $PWD/default-counters.csv:/etc/dcgm-exporter/default-counters.csv -p 9400:9400 --name dcgm-exporter nvcr.io/nvidia/k8s/dcgm-exporter:3.1.7-3.1.4-ubuntu20.04
   ```

[1]: https://github.com/NVIDIA/dcgm-exporter/tree/main#changing-metrics
[2]: https://docs.nvidia.com/datacenter/dcgm/latest/dcgm-api/dcgm-api-field-ids.html
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes (chart Helm de DCGM Exporter)

El DCGM Exporter se puede instalar rápidamente en un entorno Kubernetes mediante el chart Helm de NVIDIA DCGM Exporter. Las instrucciones que aparecen a continuación derivan de la plantilla proporcionada por NVIDIA [aquí][1].

1. Añade el repositorio Helm de NVIDIA DCGM Exporter y asegúrate de que esté actualizado:
   ```shell
   helm repo add gpu-helm-charts https://nvidia.github.io/dcgm-exporter/helm-charts && helm repo update
   ```
2. Crea un `ConfigMap` que contenga las métricas recomendadas por Datadog de [Instalación](#Installation), así como el `RoleBinding` y el `Role` utilizados por los pods de DCGM para recuperar el `ConfigMap` usando el manifiesto a continuación:
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
3. Crea tu chart Helm de DCGM Exporter `dcgm-values.yaml` con el siguiente contenido:
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
4. Instala el chart Helm de DCGM Exporter en el espacio de nombres `default` con el siguiente comando, mientras te encuentras en el directorio con tu `dcgm-values.yaml`:
   ```shell
   helm install dcgm-datadog gpu-helm-charts/dcgm-exporter -n default -f dcgm-values.yaml
   ```

**Nota**: Puedes modificar el nombre de la versión `dcgm-datadog` así como el espacio de nombres, pero debes modificar en consecuencia el manifiesto del paso 1.

[1]: https://github.com/NVIDIA/dcgm-exporter#quickstart-on-kubernetes
{{% /tab %}}
{{% tab "Operator" %}}

#### Kubernetes (NVIDIA GPU Operator)

El DCGM Exporter se puede instalar en un entorno Kubernetes mediante NVIDIA GPU Operator. Las instrucciones que aparecen a continuación derivan de la plantilla proporcionada por NVIDIA [aquí][1].

1. Añade el repositorio Helm de NVIDIA GPU Operator y asegúrate de que esté actualizado:
   ```shell
   helm repo add nvidia https://helm.ngc.nvidia.com/nvidia && helm repo update
   ```
2. Sigue las instrucciones de [Configuración de métricas personalizadas][2] con el CSV de [Instalación](#installation):
    * Obtén el archivo de métricas y guárdalo como `dcgm-metrics.csv`: `curl https://raw.githubusercontent.com/NVIDIA/dcgm-exporter/main/etc/dcp-metrics-included.csv > dcgm-metrics.csv`
    * Edita el archivo de métricas reemplazando su contenido con la asignación proporcionada por Datadog.
    * Crea un espacio de nombres `gpu-operator` si aún no existe: `kubectl create namespace gpu-operator`.
    * Crea un ConfigMap utilizando el archivo editado anteriormente: `kubectl create configmap metrics-config -n gpu-operator --from-file=dcgm-metrics.csv`
3. Crea tu chart Helm de GPU Operator `dcgm-values.yaml` con el siguiente contenido:
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
4. Instala el chart Helm de DCGM Exporter en el espacio de nombres `default` con el siguiente comando, mientras te encuentras en el directorio con tu `dcgm-values.yaml`:
   ```bash
   helm install datadog-dcgm-gpu-operator -n gpu-operator nvidia/gpu-operator -f dcgm-values.yaml
   ```

[1]: https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html
[2]: https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html#custom-metrics-config
{{% /tab %}}
{{< /tabs >}}


### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

##### Recopilación de métricas

1. Edita el archivo `dcgm.d/conf.yaml` (ubicado en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent) para comenzar a recopilar tus métricas de GPU. Consulta el [dcgm.d/conf.yaml de muestra][1] para ver todas las opciones de configuración disponibles.

   ```
   instances:

      ## @param openmetrics_endpoint - string - required
      ## The URL exposing metrics in the OpenMetrics format.
      ##
      ## Set this to <listenAddress>/<handlerPath> as configured in your DCGM Server
      #
      - openmetrics_endpoint: http://localhost:9400/metrics
   ```

Utiliza el campo de configuración `extra_metrics` para añadir métricas que vayan más allá de las que Datadog [admite de forma predefinida][2]. Consulta los [documentos de NVIDIA][3] para obtener la lista completa de métricas que dcgm-exporter puede recopilar. Asegúrate de [habilitar estos campos en la configuración de dcgm-exporter][4] también.

[1]: https://github.com/DataDog/integrations-core/blob/master/dcgm/datadog_checks/dcgm/data/conf.yaml.example
[2]: https://github.com/DataDog/integrations-core/blob/master/dcgm/metadata.csv
[3]: https://docs.nvidia.com/datacenter/dcgm/latest/dcgm-api/dcgm-api-field-ids.html
[4]: https://github.com/NVIDIA/dcgm-exporter/tree/main#changing-metrics
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

##### Recopilación de métricas

Establece [Plantillas de integraciones de Autodiscovery][1] como etiquetas de Docker en tu contenedor de DCGM Exporter:

```yaml
LABEL "com.datadoghq.ad.check_names"='["dcgm"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint": "http://%%host%%:9400/metrics"}]'
```

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

**Nota**: Si seguiste las instrucciones para el [chart Helm de DCGM Exporter](#kubernetes-dcgm-exporter-helm-chart) o [GPU Operator](#kubernetes-nvidia-gpu-operator), las anotaciones ya se aplican a los pods y puedes ignorar las siguientes instrucciones.

1. Para Configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [plantillas de integraciones de Autodiscovery][1] como anotaciones de pod en el contenedor de tu aplicación. Además de esto, las plantillas también se pueden configurar con [un archivo, un ConfigMap o un almacén de clave-valor][2].

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

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/?tab=kubernetes#configuration
{{% /tab %}}
{{< /tabs >}}

Cuando hayas terminado de hacer cambios en la configuración, [reinicia el Agent][4].

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `dcgm` en la sección Checks.


### Ajuste de los monitores

Los monitores predefinidos que vienen con esta integración tienen algunos valores predeterminados según sus umbrales de alerta. Por ejemplo, la temperatura de la GPU se determina según un [rango aceptable para dispositivos industriales][6].
Sin embargo, Datadog recomienda que verifiques que estos valores se ajusten a tus necesidades particulares.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "dcgm" >}}


### Eventos

La integración de DCGM no incluye ningún evento.

### Checks de servicio

Consulta [service_checks.json][7] para obtener una lista de los checks de servicio que proporciona esta integración.

## Solucionar problemas

### Asignación de métricas

Si has añadido algunas métricas que no aparecen en el archivo [metadata.csv][8] anterior, pero que aparecen en tu cuenta con el formato `DCGM_FI_DEV_NEW_METRIC`, reasigna estas métricas en el archivo de configuración [dcgm.d/conf.yaml][9]:
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

Si un campo no se recopila incluso después de habilitarlo en `default-counters.csv` y realizar una solicitud `curl` a `host:9400/metrics`, los [desarrolladores de dcgm-exporter recomiendan][10] consultar el archivo de log en `var/log/nv-hostengine.log`.

**Nota:** `dcgm-exporter` es un wrapper que contiene las bibliotecas y controladores de nivel inferior que realizan los informes reales.

### Mayor consumo de recursos

En algunos casos, la métrica `DCGM_FI_DEV_GPU_UTIL` puede provocar un mayor consumo de recursos. Si estás experimentando este problema:

1. Deshabilita `DCGM_FI_DEV_GPU_UTIL` en `default-counters.csv`.
2. Asegúrate de que los siguientes campos están habilitados en `default-counters.csv`:
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
3. Reinicia tanto dcgm-exporter como el Datadog Agent.

### ¿Necesitas ayuda?

Ponte en contacto con el [soporte de Datadog][11].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:


[1]: https://github.com/NVIDIA/dcgm-exporter
[2]: https://developer.nvidia.com/dcgm
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://en.wikipedia.org/wiki/Operating_temperature
[7]: https://github.com/DataDog/integrations-core/blob/master/dcgm/assets/service_checks.json
[8]: https://github.com/DataDog/integrations-core/blob/master/dcgm/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/dcgm/datadog_checks/dcgm/data/conf.yaml.example
[10]: https://github.com/NVIDIA/dcgm-exporter/issues/163#issuecomment-1577506512
[11]: https://docs.datadoghq.com/es/help/