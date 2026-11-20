---
app_id: cloudera
categories:
- nube
- almacenes de datos
custom_kind: integración
description: Cloudera
further_reading:
- link: https://www.datadoghq.com/blog/cloudera-integration-announcement/
  tag: blog
  text: Obtener una mayor visibilidad de tus clústeres Cloudera con Datadog
integration_version: 3.2.0
media: []
supported_os:
- linux
- windows
- macos
title: Cloudera
---
## Información general

Esta integración monitoriza tu [Cloudera Data Platform](https://www.cloudera.com/products/cloudera-data-platform.html) a través del Datadog Agent, permitiéndote enviar métricas y checks de servicio del estado de tus clústeres, hosts y roles de Cloudera Data Hub.

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Cloudera está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Requisitos

El check de Cloudera requiere la versión 7 de Cloudera Manager.

#### Preparar Cloudera Manager

1. En la plataforma de Cloudera Data, ve a la consola de gestión y haz clic en la pestaña **User Management** (Gestión de usuarios).
   ![Gestión de usuarios](https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/user_management.png)

1. Haz clic en **Actions** (Acciones), luego en **Create Machine User** (Crear usuario de máquina) para crear el usuario de máquina que consulta el Cloudera Manager a través del Datadog Agent.
   ![Crear usuario de máquina](https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/create_machine_user.png)

1. Si no se ha establecido la contraseña de la carga de trabajo, haz clic en **Set Workload Password** (Establecer la contraseña de la carga de trabajo) después de crear el usuario.
   ![Definir contraseña de carga de trabajo](https://raw.githubusercontent.com/DataDog/integrations-core/master/cloudera/images/set_workload_password.png)

{{< tabs >}}

{{% tab "Host" %}}

#### host

1. Edita el archivo `cloudera.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de clústeres y hosts Cloudera. Consulta el [ejemplo cloudera.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/cloudera/datadog_checks/cloudera/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.
   **Nota**: La `api_url` debe contener la versión de la API al final.

   ```yaml
   init_config:

      ## @param workload_username - string - required
      ## The Workload username. This value can be found in the `User Management` tab of the Management 
      ## Console in the `Workload User Name`.
      #
      workload_username: <WORKLOAD_USERNAME>

      ## @param workload_password - string - required
      ## The Workload password. This value can be found in the `User Management` tab of the Management 
      ## Console in the `Workload Password`.
      #
      workload_password: <WORKLOAD_PASSWORD>

   ## Every instance is scheduled independently of the others.
   #
   instances:

      ## @param api_url - string - required
      ## The URL endpoint for the Cloudera Manager API. This can be found under the Endpoints tab for 
      ## your Data Hub to monitor. 
      ##
      ## Note: The version of the Cloudera Manager API needs to be appended at the end of the URL. 
      ## For example, using v48 of the API for Data Hub `cluster_1` should result with a URL similar 
      ## to the following:
      ## `https://cluster1.cloudera.site/cluster_1/cdp-proxy-api/cm-api/v48`
      #
      - api_url: <API_URL>
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) para comenzar a recopilar y enviar los datos de clústeres Cloudera Data Hub a Datadog.

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cloudera`                                                                                                       |
| `<INIT_CONFIG>`      | `{"workload_username": "<WORKLOAD_USERNAME>", 'workload_password": "<WORKLOAD_PASSWORD>"}`                       |
| `<INSTANCE_CONFIG>`  | `{"api_url": <API_URL>"}`                                                                                        |

{{% /tab %}}

{{< /tabs >}}

#### Detección de clústeres

Puedes configurar cómo se detectan tus clústeres con la opción de configuración `clusters` con los siguientes parámetros:

- `limit`
  : Número máximo de elementos a detectar automáticamente.\
  **Valor por defecto**: `None` (se procesarán todos los clústeres)

- `include`
  : Asignación de claves de expresiones regulares y valores de configuración de componentes a detectar automáticamente.\
  **Valor por defecto**: asignación vacía

- `exclude`
  : Lista de expresiones regulares con los patrones de componentes a excluir de la detección automática.\
  **Valor por defecto**: lista vacía

- `interval`
  : Tiempo de validez en segundos de la última lista de clústeres obtenida a través del endpoint.\
  **Valor por defecto**: `None` (no se utiliza caché)

**Ejemplos**:

Proceso de un máximo de `5` clústeres con nombres que empiecen por `my_cluster`:

```yaml
clusters:
  limit: 5
  include:
    - 'my_cluster.*'
```

Proceso de un máximo de `20` clústeres y exclusión de aquellos cuyos nombres empiecen por `tmp_`:

```yaml
clusters:
  limit: 20
  include:
    - '.*'
  exclude:
    - 'tmp_.*'
```

#### Consultas personalizadas

Puedes configurar la integración de Cloudera para recopilar métricas personalizadas que no se recopilan por defecto ejecutando consultas de series temporales personalizadas. Estas consultas utilizan el [lenguaje tsquery](https://docs.cloudera.com/cloudera-manager/7.9.0/monitoring-and-diagnostics/topics/cm-tsquery-syntax.html) para obtener datos de Cloudera Manager.

**Ejemplo**:

Recopila la tasa de recopilación de elementos no usados de la JVM y la memoria libre de la JVM con `cloudera_jvm` como una etiqueta personalizada:

```yaml
custom_queries:
- query: select last(jvm_gc_rate) as jvm_gc_rate, last(jvm_free_memory) as jvm_free_memory
  tags: cloudera_jvm
```

Nota: Estas consultas pueden aprovechar las expresiones de métrica, dando lugar a consultas como `total_cpu_user + total_cpu_system`, `1000 * jvm_gc_time_ms / jvm_gc_count` y `max(total_cpu_user)`. Cuando utilices expresiones de métrica, asegúrate de incluir también alias para las métricas, ya que de lo contrario los nombres de métrica podrían tener un formato incorrecto. Por ejemplo, `SELECT last(jvm_gc_count)` da como resultado la métrica `cloudera.<CATEGORY>.last_jvm_gc_count`. Puedes añadir un alias como en el siguiente ejemplo: `SELECT last(jvm_gc_count) as jvm_gc_count` para generar la métrica `cloudera.<CATEGORY>.jvm_gc_count`.

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `cloudera` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **cloudera.cluster.cpu_percent_across_hosts** <br>(gauge) | Porcentaje de la métrica de uso de CPU del host, calculado en todas las entidades de host descendientes de esta entidad<br>_Se muestra como porcentaje_ |
| **cloudera.cluster.total_bytes_receive_rate_across_network_interfaces** <br>(gauge) | Suma de la métrica de bytes recibidos, calculada en todas las entidades de interfaz de red descendientes de esta entidad<br>_Se muestra en bytes_ |
| **cloudera.cluster.total_bytes_transmit_rate_across_network_interfaces** <br>(gauge) | Suma de la métrica de bytes transmitidos, calculada en todas las entidades de interfaz de red descendientes de esta entidad<br>_Se muestra en bytes_ |
| **cloudera.cluster.total_read_bytes_rate_across_disks** <br>(gauge) | Suma de la métrica de bytes de disco leídos, calculada en todas las entidades de de disco descendientes de esta entidad<br>_Se muestra en bytes_ |
| **cloudera.cluster.total_write_bytes_rate_across_disks** <br>(gauge) | Suma de la métrica de bytes de disco escritos, calculada en todas las entidades de de disco descendientes de esta entidad<br>_Se muestra en bytes_ |
| **cloudera.disk.await_read_time** <br>(gauge) | Tiempo medio de espera de lectura en disco de la entidad<br>_Se muestra en milisegundos_ |
| **cloudera.disk.await_time** <br>(gauge) | Tiempo medio de espera en disco de la entidad<br>_Se muestra en milisegundos_ |
| **cloudera.disk.await_write_time** <br>(gauge) | Tiempo medio de espera de escritura en disco de la entidad<br>_Se muestra en milisegundos_ |
| **cloudera.disk.service_time** <br>(gauge) | Tiempo medio de servicio en disco de la entidad<br>_Se muestra en milisegundos_ |
| **cloudera.host.alerts_rate** <br>(gauge) | Número de alertas por segundo<br>_Se muestra como evento_ |
| **cloudera.host.cpu_iowait_rate** <br>(gauge) | Tiempo total de espera de E/S de CPU|
| **cloudera.host.cpu_irq_rate** <br>(gauge) | Tiempo total de IRQ de CPU|
| **cloudera.host.cpu_nice_rate** <br>(gauge) | Tiempo total de CPU agradable|
| **cloudera.host.cpu_soft_irq_rate** <br>(gauge) | Tiempo total de IRQ suave de CPU|
| **cloudera.host.cpu_steal_rate** <br>(gauge) | Tiempo robado, que es el tiempo transcurrido en otros sistemas operativos cuando se ejecuta en un entorno virtualizado|
| **cloudera.host.cpu_system_rate** <br>(gauge) | CPU total del sistema|
| **cloudera.host.cpu_user_rate** <br>(gauge) | Tiempo total de uso de CPU|
| **cloudera.host.events_critical_rate** <br>(gauge) | Número de acontecimientos críticos|
| **cloudera.host.events_important_rate** <br>(gauge) | Número de acontecimientos importantes|
| **cloudera.host.health_bad_rate** <br>(gauge) | Porcentaje de tiempo con mala salud|
| **cloudera.host.health_concerning_rate** <br>(gauge) | Porcentaje de tiempo con salud preocupante|
| **cloudera.host.health_disabled_rate** <br>(gauge) | Porcentaje de tiempo con salud deshabilitada|
| **cloudera.host.health_good_rate** <br>(gauge) | Porcentaje de tiempo con buena salud|
| **cloudera.host.health_unknown_rate** <br>(gauge) | Porcentaje de tiempo con salud desconocida|
| **cloudera.host.load_1** <br>(gauge) | Carga media en 1 minuto|
| **cloudera.host.load_15** <br>(gauge) | Carga media en 15 minutos|
| **cloudera.host.load_5** <br>(gauge) | Carga media en 5 minutos|
| **cloudera.host.num_cores** <br>(gauge) | Número total de núcleos|
| **cloudera.host.num_physical_cores** <br>(gauge) | Número total de núcleos físicos|
| **cloudera.host.physical_memory_buffers** <br>(gauge) | Cantidad de memoria física dedicada al almacenamiento temporal de bloques de disco sin procesar<br>_Se muestra en bytes_ |
| **cloudera.host.physical_memory_cached** <br>(gauge) | Cantidad de memoria física utilizada para los archivos leídos del disco. Esto se conoce comúnmente como la caché de páginas<br>_Se muestra en bytes_ |
| **cloudera.host.physical_memory_total** <br>(gauge) | Memoria física total disponible<br>_Se muestra en bytes_ |
| **cloudera.host.physical_memory_used** <br>(gauge) | Cantidad total de memoria que se está utilizando, excluyendo buffers y caché<br>_Se muestra en bytes_ |
| **cloudera.host.swap_out_rate** <br>(gauge) | Memoria intercambiada al disco<br>_Se muestra como página_ |
| **cloudera.host.swap_used** <br>(gauge) | Intercambio utilizado<br>_Se muestra en bytes_ |
| **cloudera.host.total_bytes_receive_rate_across_network_interfaces** <br>(gauge) | Suma de la métrica de bytes recibidos, calculada en todas las entidades de interfaz de red descendientes de esta entidad<br>_Se muestra en bytes_ |
| **cloudera.host.total_bytes_transmit_rate_across_network_interfaces** <br>(gauge) | Suma de la métrica de bytes transmitidos, calculada en todas las entidades de interfaz de red descendientes de esta entidad<br>_Se muestra en bytes_ |
| **cloudera.host.total_phys_mem_bytes** <br>(gauge) | Memoria física total en bytes<br>_Se muestra en bytes_ |
| **cloudera.host.total_read_bytes_rate_across_disks** <br>(gauge) | Suma de la métrica de bytes de disco leídos, calculada en todas las entidades de de disco descendientes de esta entidad<br>_Se muestra en bytes_ |
| **cloudera.host.total_read_ios_rate_across_disks** <br>(gauge) | Suma de la métrica de lecturas de disco, calculada en todas las entidades de disco descendientes de esta entidad<br>_Se muestra como operación_ |
| **cloudera.host.total_write_bytes_rate_across_disks** <br>(gauge) | Suma de la métrica de bytes de disco escritos, calculada en todas las entidades de de disco descendientes de esta entidad<br>_Se muestra en bytes_ |
| **cloudera.host.total_write_ios_rate_across_disks** <br>(gauge) | Suma de la métrica de escrituras en disco, calculada en todas las entidades de disco descendientes de esta entidad<br>_Se muestra como operación_ |
| **cloudera.role.cpu_system_rate** <br>(gauge) | CPU total del sistema|
| **cloudera.role.cpu_user_rate** <br>(gauge) | Tiempo total de uso de CPU|
| **cloudera.role.mem_rss** <br>(gauge) | Memoria residente utilizada<br>_Se muestra en bytes_ |

### Eventos

La integración de Cloudera recopila eventos que se emiten desde el endpoint `/events` de la API de Cloudera Manager. Los niveles de evento se asignan de la siguiente manera:

| Cloudera                  | Datadog                        |
|---------------------------|--------------------------------|
| `UNKNOWN`                 | `error`                        |
| `INFORMATIONAL`           | `info`                         |
| `IMPORTANT`               | `info`                         |
| `CRITICAL`                | `error`                        |

### Checks de servicio

**cloudera.can_connect**

Devuelve `OK` si el check puede conectarse a la API de Cloudera Manager y recopilar métricas, si no devuelve `CRITICAL`.

_Estados: ok, crítical_

**cloudera.cluster.health**

Devuelve `OK` si el clúster muestra buena salud o se está iniciando, `WARNING` si el clúster se está deteniendo o su salud es preocupante, `CRITICAL` si el clúster está inactivo o muestra mala salud, y `UNKNOWN` en caso contrario.

_Estados: ok, critical, warning, unknown_

**cloudera.host.health**

Devuelve `OK` si el host muestra buena salud o se está iniciando, `WARNING` si el host se está deteniendo o su salud es preocupante, `CRITICAL` si el host está inactivo o muestra mala salud, y `UNKNOWN` en caso contrario.

_Estados: ok, critical, warning, unknown_

## Solucionar problemas

### Recopilación de métricas de integraciones de Datadog en hosts de Cloudera

Para instalar el Datadog Agent en un host de Cloudera, asegúrate de que el grupo de seguridad asociado al host permite el acceso SSH. 
A continuación, deberás utilizar el [usuario raíz `cloudbreak`](https://docs.cloudera.com/data-hub/cloud/access-clusters/topics/mc-accessing-cluster-via-ssh.html) cuando accedas al host con la clave SSH generada durante la creación del entorno:

```
sudo ssh -i "/path/to/key.pem" cloudbreak@<HOST_IP_ADDRESS>
```

El nombre de usuario y la contraseña de la carga de trabajo pueden utilizarse para acceder a hosts de Cloudera a través de SSH, aunque solo el usuario `cloudbreak` puede instalar el Datadog Agent. 
Intentar utilizar cualquier usuario que no sea `cloudbreak` puede dar lugar al siguiente error:

```
<NON_CLOUDBREAK_USER> is not allowed to run sudo on <CLOUDERA_HOSTNAME>.  This incident will be reported.
```

### Errores de configuración al recopilar métricas de Datadog

Si ves algo similar a lo siguiente en el estado del Agent al recopilar métricas de tu host de Cloudera:

```
  Config Errors
  ==============
    zk
    --
      open /etc/datadog-agent/conf.d/zk.d/conf.yaml: permission denied
```

Debes cambiar la propiedad de `conf.yaml` a `dd-agent`:

```
[cloudbreak@<CLOUDERA_HOSTNAME> ~]$ sudo chown -R dd-agent:dd-agent /etc/datadog-agent/conf.d/zk.d/conf.yaml
```

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Obtener una mayor visibilidad de tus clústeres Cloudera con Datadog](https://www.datadoghq.com/blog/cloudera-integration-announcement/)