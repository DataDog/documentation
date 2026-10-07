---
app_id: ambari
categories:
- recopilación de logs
- network
custom_kind: integración
description: Obtener métricas por host o servicio para todos los clústeres gestionados
  de Ambari
integration_version: 6.1.0
media: []
supported_os:
- Linux
- macOS
title: Ambari
---
## Información general

Este check monitoriza [Ambari](https://ambari.apache.org) a través del Datadog Agent.

## Configuración

### Instalación

El check de Ambari se incluye en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest). No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `ambari.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de Ambari. Ve el [ambari.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/ambari/datadog_checks/ambari/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## The URL of the Ambari Server, include http:// or https://
     #
     - url: localhost
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Edita tu `ambari.d/conf.yaml` y quita los comentarios de las líneas `logs` de la parte inferior. Actualiza `path` con la ruta correcta a tus archivos de logs de Ambari.

   ```yaml
     logs:
       - type: file
         path: /var/log/ambari-server/ambari-alerts.log
         source: ambari
         service: ambari
         log_processing_rules:
             - type: multi_line
               name: new_log_start_with_date
               # 2019-04-22 15:47:00,999
               pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
     ...
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                        |
| -------------------- | ---------------------------- |
| `<INTEGRATION_NAME>` | `ambari`                     |
| `<INIT_CONFIG>`      | en blanco o `{}`                |
| `<INSTANCE_CONFIG>`  | `{"url": "http://%%host%%"}` |

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ambari", "service": "<SERVICE_NAME>", "log_processing_rules":{"type":"multi_line","name":"new_log_start_with_date","pattern":"\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])"}}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `ambari` en la sección Checks.

## Datos recopilados

Esta integración recopila para cada host de cada clúster las siguientes métricas del sistema:

- boottime
- la cpu
- el disco
- la memoria
- la carga
- red
- el proceso

Si se habilita la recopilación de métricas de servicio con `collect_service_metrics`, esta integración recopila para cada componente de servicio incluido las métricas con encabezados en la lista de inclusión.

### Métricas

| | |
| --- | --- |
| **ambari.boottime** <br>(gauge) | Tiempo de arranque del host.<br>_Se muestra en milisegundos_ |
| **ambari.cpu.cpu_idle** <br>(gauge) | CPU inactiva del host.<br>_Se muestra en porcentaje_ |
| **ambari.cpu.cpu_nice** <br>(gauge) | CPU activa de host.<br>_Se muestra como porcentaje_ |
| **ambari.cpu.cpu_num** <br>(gauge) | CPU inactiva de host.|
| **ambari.cpu.cpu_system** <br>(gauge) | CPU del sistema de host.<br>_Se muestra en porcentaje_ |
| **ambari.cpu.cpu_user** <br>(gauge) | CPU de usuario de host.<br>_Se muestra en porcentaje_ |
| **ambari.cpu.cpu_wio** <br>(gauge) | CPU del host en espera de E/S.<br>_Se muestra en porcentaje_ |
| **ambari.disk.disk_free** <br>(gauge) | Espacio libre en disco.<br>_Se muestra como byte_ |
| **ambari.disk.disk_total** <br>(gauge) | Tamaño total del disco.<br>_Se muestra como byte_ |
| **ambari.disk.read_bytes** <br>(gauge) | Bytes de lectura.<br>_Se muestra como byte_ |
| **ambari.disk.read_count** <br>(gauge) | Recuento de lectura.|
| **ambari.disk.read_time** <br>(gauge) | Tiempo de lectura del disco.<br>_Se muestra en milisegundos_ |
| **ambari.disk.write_bytes** <br>(gauge) | Bytes de escritura.<br>_Se muestra como byte_ |
| **ambari.disk.write_count** <br>(gauge) | Recuento de escrituras.|
| **ambari.disk.write_time** <br>(gauge) | Tiempo de escritura en disco.<br>_Se muestra en milisegundos_ |
| **ambari.load_fifteen** <br>(gauge) | Carga quince.<br>_Se muestra como porcentaje_ |
| **ambari.load_five** <br>(gauge) | Carga Cinco.<br>_Se muestra como porcentaje_ |
| **ambari.load_one** <br>(gauge) | Carga uno.<br>_Se muestra como porcentaje_ |
| **ambari.memory.mem_cached** <br>(gauge) | Memoria caché.<br>_Se muestra como byte_ |
| **ambari.memory.mem_free** <br>(gauge) | Memoria libre.<br>_Se muestra como byte_ |
| **ambari.memory.mem_shared** <br>(gauge) | Memoria compartida.<br>_Se muestra como byte_ |
| **ambari.memory.mem_total** <br>(gauge) | Memoria total<br>_Se muestra como byte_ |
| **ambari.memory.swap_free** <br>(gauge) | Intercambio libre<br>_Se muestra como byte_ |
| **ambari.memory.swap_total** <br>(gauge) | Intercambio total<br>_Se muestra como byte_ |
| **ambari.network.bytes_in** <br>(gauge) | Bytes de red entrantes.<br>_Se muestra como byte_ |
| **ambari.network.bytes_out** <br>(gauge) | Bytes de red salientes.<br>_Se muestra como byte_ |
| **ambari.network.pkts_in** <br>(gauge) | Paquetes de red entrantes.<br>_Se muestra como byte_ |
| **ambari.network.pkts_out** <br>(gauge) | Paquetes de red salientes.<br>_Se muestra como byte_ |
| **ambari.process.proc_run** <br>(gauge) | Ejecución de proceso.|
| **ambari.process.proc_total** <br>(gauge) | Total de proceso.|

### Eventos

Ambari no incluye ningún evento.

### Checks de servicio

**ambari.can_connect**

Devuelve `OK` si el clúster es accesible, `CRITICAL` en caso contrario.

_Estados: ok, critical_

**ambari.state**

Devuelve `OK` si el servicio está instalado o en ejecución, `WARNING` si el servicio se está deteniendo o desinstalando, `CRITICAL` si el servicio está desinstalado o detenido.

_Estados: ok, warning, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).