---
app_id: purefa
categories:
- almacenes de datos
- sistema operativo y sistema
custom_kind: integración
description: Monitorización del rendimiento y el uso de FlashArrays Pure Storage
integration_version: 1.3.0
media:
- caption: Dashboard de FlashArray Pure Storage - Información general (arriba)
  image_url: images/FA-overview-1.png
  media_type: imagen
- caption: Dashboard de FlashArray Pure Storage - Información general (arriba)
  image_url: images/FA-overview-2.png
  media_type: imagen
- caption: Dashboard de FlashArray Pure Storage - Información general (abajo)
  image_url: images/FA-overview-3.png
  media_type: imagen
supported_os:
- Linux
- Windows
- macOS
title: FlashArray Pure Storage
---
## Información general

Este check monitoriza [Pure Storage FlashArray](https://www.purestorage.com/products.html) a través del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) y el [exportador OpenMetrics de Pure Storage](https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter).

La integración puede proporcionar datos de rendimiento a nivel de matriz, host, volumen y pod, así como información muy clara sobre capacidad y configuración.

Puedes monitorizar múltiples FlashArrays y agregarlos en un único dashboard o agruparlos según el entorno definido por el cliente.

**Esta integración requiere lo siguiente**:

- Agent v7.26.x o posterior para utilizar OpenMetrics BaseCheckV2
- Python 3
- El exportador OpenMetrics de Pure Storage se instala y ejecuta en un entorno contenedorizado. Consulta el [repositorio de GitHub](https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter) para obtener instrucciones de instalación.
  - En FlashArrays que ejecutan Purity//FA versión 6.7.0 y posteriores, el exportador OpenMetrics se ejecuta de forma nativa en la matriz. Consulta Configuración para obtener más información.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las plantillas de integración de Autodiscovery para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

1. [Descarga e inicia el Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
1. Instala manualmente la integración Pure FlashArray. Consulta [Uso de integraciones comunitarias](https://docs.datadoghq.com/agent/guide/community-integrations-installation-with-docker-agent) para obtener más información en función de tu entorno.

#### Host

Para configurar este check para un Agent que se ejecuta en un host, ejecuta `sudo -u dd-agent -- datadog-agent integration install -t datadog-purefa==<INTEGRATION_VERSION>`.

Nota: `<INTEGRATION_VERSION>` se puede encontrar dentro del [CHANGELOG.md](https://github.com/DataDog/integrations-extras/blob/master/purefa/CHANGELOG.md) para Datadog Integration Extras.

- Por ejemplo `sudo -u dd-agent -- datadog-agent integration install -t datadog-purefa==1.3.0`

### Configuración

1. Crea un usuario local en tu FlashArray con el rol de sólo lectura y genera un token de API para este usuario.
   ![Generar una clave API](https://raw.githubusercontent.com/DataDog/integrations-extras/master/purefa/images/API.png)
1. Añade el siguiente bloque de configuración al archivo `purefa.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de PureFA. Consulta el ejemplo [purefa.d/conf.yaml](https://github.com/datadog/integrations-extras/blob/master/purefa/datadog_checks/purefa/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

> **Nota**: La creación de tu archivo de configuración requiere el endpoint `/array` como mínimo absoluto.

#### (Preferido) Para uso con el exportador nativo OpenMetrics de Pure Storage (Purity//FA v6.7.0 o posteriores)

```yaml
init_config:
   timeout: 60

instances:

  - openmetrics_endpoint: https://<array_ip_or_fqdn>/metrics/array?namespace=purefa
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120
    # If you have not configured your Purity management TLS certifcate, you may skip TLS verification. For other TLS options, please see conf.yaml.example.
    # tls_verify: false
    # tls_ignore_warning: true

  - openmetrics_endpoint: https://<array_ip_or_fqdn>/metrics/volumes?namespace=purefa
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120
    # If you have not configured your Purity management TLS certifcate, you may skip TLS verification. For other TLS options, please see conf.yaml.example.
    # tls_verify: false
    # tls_ignore_warning: true

  - openmetrics_endpoint: https://<array_ip_or_fqdn>/metrics/hosts?namespace=purefa
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120
    # If you have not configured your Purity management TLS certifcate, you may skip TLS verification. For other TLS options, please see conf.yaml.example.
    # tls_verify: false
    # tls_ignore_warning: true

  - openmetrics_endpoint: https://<array_ip_or_fqdn>/metrics/pods?namespace=purefa
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120
    # If you have not configured your Purity management TLS certifcate, you may skip TLS verification. For other TLS options, please see conf.yaml.example.
    # tls_verify: false
    # tls_ignore_warning: true

  - openmetrics_endpoint: https://<array_ip_or_fqdn>/metrics/directories?namespace=purefa
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120
    # If you have not configured your Purity management TLS certifcate, you may skip TLS verification. For other TLS options, please see conf.yaml.example.
    # tls_verify: false
    # tls_ignore_warning: true
```

#### Para su uso con el exportador externo [OpenMetrics de Pure Storage(https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter) (Purity //FA v\<6.7.0)

```yaml
init_config:
   timeout: 60

instances:

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/array?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/volumes?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/hosts?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/pods?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/directories?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120
```

2. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `purefa` en la sección Checks.

### Actualización a nuevas versiones de esta integración

#### A partir del check del Agent PureFA v1.0.x a v1.1.x

1.1.x admite tanto el [exportador OpenMetrics de Pure Storage](https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter) como el obsoleto [exportador Prometheus de Pure Storage](https://github.com/PureStorage-OpenConnect/pure-exporter).

El dashboard del obsoleto [exportador Prometheus de Pure Storage](https://github.com/PureStorage-OpenConnect/pure-exporter) ha sido renombrado como `Pure FlashArray - Overview (Legacy Exporter)`.

En [metrics.py](https://github.com/datadog/integrations-extras/blob/master/purefa/datadog_checks/purefa/metrics.py) encontrarás una lista de métricas compartidas y exclusivas de los distintos exportadores. Es posible que tengas que actualizar tus dashboards o tus alertas para que coincidan con los nuevos nombres de métricas al migrar del [exportador Prometheus de Pure Storage](https://github.com/PureStorage-OpenConnect/pure-exporter) al [exportador OpenMetrics de Pure Storage](https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter). Si tienes alguna pregunta, ponte en contacto con Pure Storage con la información de la pestaña Asistencia.

Al migrar del [exportador Prometheus de Pure Storage](https://github.com/PureStorage-OpenConnect/pure-exporter) al [exportador OpenMetrics de Pure Storage](https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter), los endpoints ya no tendrán `/flasharray` en el URI del endpoint.

En futuras versiones del check del Agent PureFA, se eliminarán los nombres de métricas del exportador Prometheus Pure Storage.

### Solucionar problemas

#### Las matrices no se muestran en el dashboard

Los dashboards incluidos en esta integración utilizan las etiquetas (tags) `env` y `fa_array_name`. Asegúrate de configurarlas para cada instancia. `host` también debe configurarse para los endpoints `/array` y `/pods` en `purefa.d/conf.yaml`.

```yaml
- tags:
   - env:<env>
   - fa_array_name:<full_fqdn>
   - host:<full_fqdn>
```

#### Aumento del intervalo de recopilación

El check de FlashArray Pure Storage configura `min_collection_interval` como `120` por defecto y el valor mínimo recomendado es `20`. Si es necesario:, puedes aumentar/disminuir `min_collection_interval` en el archivo `purefa.d/conf.yaml`:

```yaml
min_collection_interval: 120
```

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **purefa.alerts.open** <br>(gauge) | Eventos de alerta de FlashArray abiertos.|
| **purefa.alerts.total** <br>(gauge) | (Legacy) Número de eventos de alerta.|
| **purefa.array.performance_average_bytes** <br>(gauge) | Tamaño medio de las operaciones de la matriz FlashArray en bytes.<br>_Se muestra como bytes_ |
| **purefa.array.performance_avg_block_bytes** <br>(gauge) | (Legacy) Tamaño medio de bloque de FlashArray.<br>_Se muestra como bytes_ |
| **purefa.array.performance_bandwidth_bytes** <br>(gauge) | Rendimiento de la matriz FlashArray en bytes por segundo.<br>_Se muestra como bytes_ |
| **purefa.array.performance_iops** <br>(gauge) | (Legacy) IOPS FlashArray.<br>_Se muestra como operación_ |
| **purefa.array.performance_latency_usec** <br>(gauge) | Latencia de la matriz FlashArray en microsegundos.<br>_Se muestra como microsegundos_ |
| **purefa.array.performance_qdepth** <br>(gauge) | (Legacy) Profundidad de la cola de FlashArray.|
| **purefa.array.performance_queue_depth_ops** <br>(gauge) | Tamaño de la profundidad de la cola de la matriz FlashArray.<br>_Se muestra como operación_ |
| **purefa.array.performance_throughput_iops** <br>(gauge) | Rendimiento de la matriz FlashArray en IOPS.<br>_Se muestra como operación_ |
| **purefa.array.space_bytes** <br>(gauge) | Espacio de la matriz FlashArray en bytes.<br>_Se muestra como bytes_ |
| **purefa.array.space_capacity_bytes** <br>(gauge) | (Legacy) Capacidad de espacio total de FlashArray.<br>_Se muestra como bytes_ |
| **purefa.array.space_data_reduction_ratio** <br>(gauge) | Reducción de datos del espacio de la matriz FlashArray.|
| **purefa.array.space_datareduction_ratio** <br>(gauge) | (Legacy) Reducción global de datos de FlashArray.|
| **purefa.array.space_provisioned_bytes** <br>(gauge) | (Legacy) Espacio total aprovisionado de FlashArray.<br>_Se muestra como bytes_ |
| **purefa.array.space_used_bytes** <br>(gauge) | (Legacy) Espacio total utilizado de FlashArray.<br>_Se muestra como bytes_ |
| **purefa.array.space_utilization** <br>(gauge) | Uso del espacio de la matriz FlashArray en porcentaje.<br>_Se muestra como porcentaje_ |
| **purefa.directory.performance_average_bytes** <br>(gauge) | Tamaño medio de las operaciones del directorio FlashArray en bytes.<br>_Se muestra como bytes_ |
| **purefa.directory.performance_bandwidth_bytes** <br>(gauge) | Rendimiento del directorio FlashArray en bytes por segundo.<br>_Se muestra como bytes_ |
| **purefa.directory.performance_latency_usec** <br>(gauge) | Latencia del directorio FlashArray en microsegundos.<br>_Se muestra como microsegundos_ |
| **purefa.directory.performance_throughput_iops** <br>(gauge) | Rendimiento del directorio FlashArray en IOPS.<br>_Se muestra como operación_ |
| **purefa.directory.space_bytes** <br>(gauge) | Espacio del directorio FlashArray en bytes.<br>_Se muestra como bytes_ |
| **purefa.directory.space_data_reduction_ratio** <br>(gauge) | Reducción de datos del espacio del directorio FlashArray.|
| **purefa.drive.capacity_bytes** <br>(gauge) | Capacidad de la unidad FlashArray en bytes.<br>_Se muestra como bytes_ |
| **purefa.hardware.chassis_health** <br>(gauge) | (Legacy) Estado de salud del chasis de hardware de FlashArray.|
| **purefa.hardware.component_health** <br>(gauge) | (Legacy) Estado de salud del componente de hardware de FlashArray.|
| **purefa.hardware.controller_health** <br>(gauge) | (Legacy) Estado de salud del controlador de hardware de FlashArray.|
| **purefa.hardware.power_volts** <br>(gauge) | (Legacy) Tensión de alimentación del hardware de FlashArray.<br>_Se muestra como voltios_ |
| **purefa.hardware.temperature_celsius** <br>(gauge) | (Legacy) Sensores de temperatura del hardware de FlashArray.<br>_Se muestra como grados celsius_ |
| **purefa.host.connections_info** <br>(gauge) | Conexiones de volúmenes del host FlashArray.|
| **purefa.host.connectivity_info** <br>(gauge) | Información de conectividad del host FlashArray.|
| **purefa.host.performance_average_bytes** <br>(gauge) | Tamaño medio de las operaciones del host FlashArray en bytes.<br>_Se muestra como bytes_ |
| **purefa.host.performance_bandwidth_bytes** <br>(gauge) | Ancho de banda del host FlashArray en bytes por segundo.<br>_Se muestra como bytes_ |
| **purefa.host.performance_iops** <br>(gauge) | (Legacy) IOPS de host FlashArray.<br>_Se muestra como operación_ |
| **purefa.host.performance_latency_usec** <br>(gauge) | Latencia del host FlashArray en microsegundos.<br>_Se muestra como microsegundos_ |
| **purefa.host.performance_throughput_iops** <br>(gauge) | Rendimiento del host FlashArray en IOPS.<br>_Se muestra como operación_ |
| **purefa.host.space_bytes** <br>(gauge) | Espacio del host FlashArray en bytes.<br>_Se muestra como bytes_ |
| **purefa.host.space_data_reduction_ratio** <br>(gauge) | Reducción de datos del espacio del host FlashArray.|
| **purefa.host.space_datareduction_ratio** <br>(gauge) | (Legacy) Ratio de reducción de datos de los volúmenes del host FlashArray.|
| **purefa.host.space_size_bytes** <br>(gauge) | Tamaño de los volúmenes del host FlashArray.<br>_Se muestra como bytes_ |
| **purefa.hw.component_status** <br>(gauge) | Estado del componente de hardware de FlashArray.|
| **purefa.hw.component_temperature_celsius** <br>(gauge) | Temperatura del componente de hardware de FlashArray en °C.<br>_Se muestra como grados celsius_ |
| **purefa.hw.component_voltage_volt** <br>(gauge) | Tensión del componente de hardware de FlashArray.<br>_Se muestra como voltios_ |
| **purefa.hw.controller_info** <br>(gauge) | Información del controlador FlashArray|
| **purefa.hw.controller_mode_since_timestamp_seconds** <br>(gauge) | Tiempo de actividad del controlador de hardware de FlashArray en segundos<br>_Se muestra como segundos_ |
| **purefa.info** <br>(gauge) | Información del sistema FlashArray.|
| **purefa.network.interface_performance_bandwidth_bytes** <br>(gauge) | Ancho de banda de la interfaz de red de FlashArray en bytes por segundo<br>_Se muestra como bytes_ |
| **purefa.network.interface_performance_errors** <br>(gauge) | Errores de la interfaz de red de FlashArray en errores por segundo<br>_Se muestra como error_ |
| **purefa.network.interface_performance_throughput_pkts** <br>(gauge) | Rendimiento de la interfaz de red de FlashArray en paquetes por segundo.<br>_Se muestra como paquete_ |
| **purefa.network.interface_speed_bandwidth_bytes** <br>(gauge) | Velocidad de la interfaz de red de FlashArray en bytes por segundo<br>_Se muestra como bytes_ |
| **purefa.network.port_info** <br>(gauge) | Información del puerto de red de FlashArray|
| **purefa.pod.mediator_status** <br>(gauge) | (Legacy) Estado del mediador de pods de FlashArray.|
| **purefa.pod.performance_average_bytes** <br>(gauge) | Tamaño medio de las operaciones de pods de FlashArray.<br>_Se muestra como bytes_ |
| **purefa.pod.performance_bandwidth_bytes** <br>(gauge) | Rendimiento de pods de FlashArray en bytes por segundo.<br>_Se muestra como bytes_ |
| **purefa.pod.performance_iops** <br>(gauge) | (Legacy) IOPS de pods de FlashArray.<br>_Se muestra como operación_ |
| **purefa.pod.performance_latency_usec** <br>(gauge) | Latencia de pods de FlashArray en microsegundos.<br>_Se muestra como microsegundos_ |
| **purefa.pod.performance_replication_bandwidth_bytes** <br>(gauge) | Ancho de banda de replicación de pods de FlashArray.<br>_Se muestra como bytes_ |
| **purefa.pod.performance_throughput_iops** <br>(gauge) | Rendimiento de pods de FlashArray en IOPS.<br>_Se muestra como operación_ |
| **purefa.pod.replica_links_lag_average_msec** <br>(gauge) | Retraso medio de enlaces de pods de FlashArray en milisegundos.<br>_Se muestra como segundos_ |
| **purefa.pod.replica_links_lag_average_sec** <br>(gauge) | Retraso medio de enlaces de pods de FlashArray en milisegundos.<br>_Se muestra como segundos_ |
| **purefa.pod.replica_links_lag_max_msec** <br>(gauge) | Retraso máximo de enlaces de pods de FlashArray en milisegundos.<br>_Se muestra como segundos_ |
| **purefa.pod.replica_links_lag_max_sec** <br>(gauge) | Retraso máximo de enlaces de pods de FlashArray en milisegundos.<br>_Se muestra como segundos_ |
| **purefa.pod.replica_links_performance_bandwidth_bytes** <br>(gauge) | Ancho de banda de enlaces de pods de FlashArray.<br>_Se muestra como bytes_ |
| **purefa.pod.space_bytes** <br>(gauge) | Espacio de pods de FlashArray en bytes.<br>_Se muestra como bytes_ |
| **purefa.pod.space_data_reduction_ratio** <br>(gauge) | Reducción de datos en el espacio de pods de FlashArray.|
| **purefa.pod.space_datareduction_ratio** <br>(gauge) | (Legacy) Ratio de reducción de datos de pods de FlashArray.|
| **purefa.pod.space_size_bytes** <br>(gauge) | (Legacy) Tamaño de pods de FlashArray.<br>_Se muestra como bytes_ |
| **purefa.pod.status** <br>(gauge) | (Legacy) Estado de pods de FlashArray.|
| **purefa.volume.performance_average_bytes** <br>(gauge) | Tamaño medio de las operaciones de volúmenes de FlashArray en bytes.<br>_Se muestra como bytes_ |
| **purefa.volume.performance_bandwidth_bytes** <br>(gauge) | Rendimiento de volúmenes de FlashArray en bytes por segundo.<br>_Se muestra como bytes_ |
| **purefa.volume.performance_iops** <br>(gauge) | (Legacy) IOPS de volúmenes de FlashArray.<br>_Se muestra como operación_ |
| **purefa.volume.performance_latency_usec** <br>(gauge) | Latencia de volúmenes de FlashArray en microsegundos.<br>_Se muestra como microsegundos_ |
| **purefa.volume.performance_throughput_bytes** <br>(gauge) | (Legacy) Rendimiento de volúmenes de FlashArray.<br>_Se muestra como bytes_ |
| **purefa.volume.performance_throughput_iops** <br>(gauge) | Rendimiento de volúmenes de FlashArray en IOPS.<br>_Se muestra como operación_ |
| **purefa.volume.space_bytes** <br>(gauge) | Espacio de volúmenes de FlashArray en bytes.<br>_Se muestra como bytes_ |
| **purefa.volume.space_data_reduction_ratio** <br>(gauge) | Reducción del espacio de datos de volúmenes de FlashArray.|
| **purefa.volume.space_datareduction_ratio** <br>(gauge) | (Legacy) Ratio de reducción de datos de volúmenes de FlashArray.|
| **purefa.volume.space_size_bytes** <br>(gauge) | (Legacy) Tamaño de volúmenes de FlashArray.<br>_Se muestra como bytes_ |

### Eventos

La integración PureFA no incluye eventos.

### Checks de servicio

**purefa.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics o `OK` en caso contrario.

_Estados: ok, crítico_

## Soporte

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Pure Storage utilizando los siguientes métodos:

- Correo electrónico: pure-observability@purestorage.com
- Slack: [Código Pure Storage//Canal de observabilidad](https://code-purestorage.slack.com/messages/C0357KLR1EU).