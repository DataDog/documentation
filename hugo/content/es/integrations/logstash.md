---
app_id: logstash
categories:
- log collection
custom_kind: integración
description: Monitorización y recopilación de métricas del tiempo de ejecución de
  una instancia Logstash
integration_version: 1.2.0
media: []
supported_os:
- linux
- macos
- windows
title: Logstash
---
## Información general

Obtén métricas de Logstash en tiempo real para:

- Visualiza y monitoriza estados de Logstash.
- Recibe notificaciones sobre eventos de Logstash.

## Configuración

### Instalación

El check de Logstash no está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que necesitas instalarlo.

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para el Agent v7.21/v6.21 y posteriores, sigue las siguientes instrucciones para instalar el check de Logstash en tu host. Para versiones anteriores del Agent, consulta el [uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/).

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-logstash==<INTEGRATION_VERSION>
   ```

1. Configura tu integración de forma similar a las [integraciones] centrales (https://docs.datadoghq.com/getting_started/integrations/).

{{% /tab %}}

{{% tab "Contenedorizado" %}}

#### En contenedores

Utiliza el siguiente archivo Docker para crear una imagen personalizada del Datadog Agent que incluya la integración Logstash.

```dockerfile
FROM gcr.io/datadoghq/agent:latest
RUN datadog-agent integration install -r -t datadog-logstash==<INTEGRATION_VERSION>
```

Si utilizas Kubernetes, actualiza la configuración de tu Datadog Operator o tu Helm chart para extraer esa imagen personalizada del Datadog Agent.

Para obtener más contexto, consulta el [uso de integraciones de la comunidad](https://docs.datadoghq.com/agent/guide/use-community-integrations/).

{{% /tab %}}

{{< /tabs >}}

### Configuración

#### Recopilación de métricas

{{< tabs >}}

{{% tab "Host" %}}

##### host

1. Edita el archivo `logstash.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory).

   ```yaml
   init_config:

   instances:
     # The URL where Logstash provides its monitoring API.
     # This will be used to fetch various runtime metrics about Logstash.
     #
     - url: http://localhost:9600
   ```

   Consulta el [ejemplo de logstash.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Contenedorizado" %}}

##### En contenedores

Para entornos contenedorizados, utiliza una plantilla de Autodiscovery con los siguientes parámetros:

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `logstash`                           |
| `<INIT_CONFIG>`      | en blanco o `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:9600"}` |

Para ver cómo aplicar esta plantilla, consulta las [integraciones Docker](https://docs.datadoghq.com/containers/docker/integrations) o las [integraciones Kubernetes](https://docs.datadoghq.com/containers/kubernetes/integrations/).

Consulta el [ejemplo de logstash.d/conf.yaml](https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

{{% /tab %}}

{{< /tabs >}}

#### Recopilación de logs

Datadog cuenta con un [complemento de salida](https://github.com/DataDog/logstash-output-datadog_logs) para Logstash que se encarga de enviar tus logs a tu plataforma Datadog.

Para instalar este complemento ejecuta el siguiente comando:

- `logstash-plugin install logstash-output-datadog_logs`

A continuación, configura el complemento `datadog_logs` con tu [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys):

```conf
output {
    datadog_logs {
        api_key => "<DATADOG_API_KEY>"
    }
}
```

Por defecto, el complemento está configurado para enviar logs a través de HTTPS (puerto 443) utilizando la compresión gzip.
Puedes cambiar este comportamiento utilizando los siguientes parámetros:

- `use_http`: Configúralo como `false` si quieres utilizar el reenvío TCP y actualiza el `host` y el `port` en consecuencia (por defecto es `true`).
- `use_compression`: La compresión solo está disponible para HTTP. Deshabilítala configurándola como `false` (por defecto es `true`).
- `compression_level`: Define el nivel de compresión de HTTP. El rango es de 1 a 9, siendo 9 la mejor proporción (por defecto es `6`).

Se pueden utilizar parámetros adicionales para cambiar el endpoint utilizado para pasar por un [proxy](https://docs.datadoghq.com/agent/proxy/#proxy-for-logs):

- `host`: Endpoint del proxy para logs no reenviados directamente a Datadog (valor por defecto: `http-intake.logs.datadoghq.com`).
- `port`: Puerto del proxy para logs no reenviados directamente a Datadog (valor por defecto: `80`).
- `ssl_port`: Puerto utilizado para logs reenviados a Datadog con una conexión TCP/SSL segura (valor por defecto: `443`).
- `use_ssl`: Indica al Agent que inicie una conexión TCP/SSL segura con Datadog (valor por defecto: `true`).
- `no_ssl_validation`: Desactiva la validación de nombres de host SSL (valor por defecto: `false`).

**Nota**: Configura el `host` y el `port` en tu región {{< region-param key="http_endpoint" code="true" >}} {{< region-param key="http_port" code="true" >}}.

```conf
output {
   datadog_logs {
       api_key => "<DATADOG_API_KEY>"
       host => "http-intake.logs.datadoghq.eu"
   }
}
```

##### Añadir metadatos a tus logs

Para lograr el mejor uso de tus logs en Datadog, es importante asociar los metadatos apropiados a tus logs, incluyendo el nombre de host y la fuente. Por defecto, el nombre de host y la marca de tiempo deben reasignarse correctamente gracias a la [reasignación de atributos reservados](https://docs.datadoghq.com/logs/#edit-reserved-attributes) por defecto de Datadog. Para asegurarte de que el servicio se reasigna correctamente, añade el valor de su atributo a la lista de reasignación de servicios.

##### Fuente

Configure un filtro de Logstash para definir el (nombre de la integración Datadog) de origen en tus logs.

```conf
filter {
  mutate {
    add_field => {
 "ddsource" => "<MY_SOURCE_VALUE>"
       }
    }
 }
```

Esto activa la [configuración automática de la integración](https://docs.datadoghq.com/logs/processing/#integration-pipelines) en Datadog.

##### Etiquetas personalizadas

Las [etiquetas (tags) de host](https://docs.datadoghq.com/getting_started/tagging/assigning_tags) se configuran automáticamente en tus logs si hay un nombre de host coincidente en tu [lista de infraestructuras](https://app.datadoghq.com/infrastructure). Utiliza el atributo `ddtags` para añadir etiquetas personalizadas a tus logs:

```conf
filter {
  mutate {
    add_field => {
        "ddtags" => "env:test,<KEY:VALUE>"
       }
    }
 }
```

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#service-status) y busca `logstash` en la sección Checks.

## Compatibilidad

El check de Logstash es compatible con las versiones 5.x, 6.x y 7.x de Logstash. También es compatible con las nuevas métricas de pipelines múltiples, introducidas en Logstash v6.0. Probado con las versiones 5.6.15, 6.3.0 y 7.0.0 de Logstash.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **logstash.process.open_file_descriptors** <br>(gauge) | Número de descriptores de archivo abiertos utilizados por este proceso.|
| **logstash.process.peak_open_file_descriptors** <br>(gauge) | Número máximo de descriptores de archivo abiertos utilizados por este proceso.|
| **logstash.process.max_file_descriptors** <br>(gauge) | Número máximo de descriptores de archivo utilizados por este proceso.|
| **logstash.process.mem.total_virtual_in_bytes** <br>(gauge) | Memoria virtual total asignada a este proceso.<br>_Se muestra como byte_ |
| **logstash.process.cpu.total_in_millis** <br>(gauge) | Tiempo de CPU en milisegundos.<br>_Se muestra como milisegundo_ |
| **logstash.process.cpu.percent** <br>(gauge) | Uso de CPU en porcentaje.<br>_Se muestra como porcentaje_ |
| **logstash.process.cpu.load_average.1m** <br>(gauge) | Carga media de CPU durante 1 minuto.|
| **logstash.process.cpu.load_average.5m** <br>(gauge) | Carga media de CPU durante 5 minutos|
| **logstash.process.cpu.load_average.15m** <br>(gauge) | Carga media de CPU durante 15 minutos.|
| **logstash.jvm.threads.count** <br>(gauge) | Número de subprocesos utilizados por la JVM.<br>_Se muestra como subproceso_ |
| **logstash.jvm.threads.peak_count** <br>(gauge) | Número máximo de subprocesos utilizados por la JVM.<br>_Se muestra como subproceso_ |
| **logstash.jvm.mem.heap_used_percent** <br>(gauge) | Total de memoria heap de Java utilizada.<br>_Se muestra como porcentaje_ |
| **logstash.jvm.mem.heap_committed_in_bytes** <br>(gauge) | Total de memoria heap de Java utilizada.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.heap_max_in_bytes** <br>(gauge) | Tamaño máximo de memoria heap de Java.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.heap_used_in_bytes** <br>(gauge) | Total de memoria heap de Java utilizada.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.non_heap_used_in_bytes** <br>(gauge) | Total de memoria no heap de Java utilizada.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.non_heap_committed_in_bytes** <br>(gauge) | Total de memoria no heap de Java comprometida.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.survivor.peak_used_in_bytes** <br>(gauge) | Pico de memoria Java utilizada en el espacio Survivor.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.survivor.used_in_bytes** <br>(gauge) | Memoria Java utilizada en el espacio Survivor.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.survivor.peak_max_in_bytes** <br>(gauge) | Pico máximo de memoria Java utilizada en el espacio Survivor.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.survivor.max_in_bytes** <br>(gauge) | Máximo de memoria Java ¿utilizada en el espacio Survivor.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.survivor.committed_in_bytes** <br>(gauge) | Memoria Java comprometida utilizada en el espacio Survivor.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.old.peak_used_in_bytes** <br>(gauge) | Pico de memoria Java utilizada en la generación anterior.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.old.used_in_bytes** <br>(gauge) | Memoria Java utilizada en la generación anterior.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.old.peak_max_in_bytes** <br>(gauge) | Pico máximo de memoria Java utilizada en la generación anterior.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.old.max_in_bytes** <br>(gauge) | Máximo de memoria Java utilizada en la generación anterior.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.old.committed_in_bytes** <br>(gauge) | Memoria Java comprometida utilizada en la generación anterior.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.young.peak_used_in_bytes** <br>(gauge) | Pico de memoria Java utilizada en la generación joven.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.young.used_in_bytes** <br>(gauge) | Memoria Java utilizada en la generación joven.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.young.peak_max_in_bytes** <br>(gauge) | Pico máximo de memoria Java utilizado en la generación joven.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.young.max_in_bytes** <br>(gauge) | Máximo de memoria Java utilizada en la generación joven.<br>_Se muestra como byte_ |
| **logstash.jvm.mem.pools.young.committed_in_bytes** <br>(gauge) | Memoria Java comprometida utilizada en la generación joven.<br>_Se muestra como byte_ |
| **logstash.jvm.gc.collectors.old.collection_time_in_millis** <br>(gauge) | Tiempo de recopilación de basura transcurrido en la generación anterior.<br>_Se muestra como milisegundo_ |
| **logstash.jvm.gc.collectors.old.collection_count** <br>(gauge) | Recopilación de basura en la generación anterior.|
| **logstash.jvm.gc.collectors.young.collection_time_in_millis** <br>(gauge) | Tiempo de recopilación de basura transcurrido en la generación joven.<br>_Se muestra como milisegundo_ |
| **logstash.jvm.gc.collectors.young.collection_count** <br>(gauge) | Recopilación de basura en la generación joven.|
| **logstash.reloads.successes** <br>(gauge) | Número de recargas de configuración exitosas.|
| **logstash.reloads.failures** <br>(gauge) | Número de recargas de configuración fallidas|
| **logstash.pipeline.dead_letter_queue.queue_size_in_bytes** <br>(gauge) | Tamaño total de la cola de mensajes no entregados.<br>_Se muestra como byte_ |
| **logstash.pipeline.events.duration_in_millis** <br>(gauge) | Duración de los eventos en el pipeline.<br>_Se muestra como milisegundo_ |
| **logstash.pipeline.events.in** <br>(gauge) | Número de eventos en el pipeline.|
| **logstash.pipeline.events.out** <br>(gauge) | Número de eventos fuera del pipeline.|
| **logstash.pipeline.events.filtered** <br>(gauge) | Número de eventos filtrados.|
| **logstash.pipeline.reloads.successes** <br>(gauge) | Número de recargas de pipeline exitosas.|
| **logstash.pipeline.reloads.failures** <br>(gauge) | Número de recargas de pipeline fallidas.|
| **logstash.pipeline.plugins.inputs.events.out** <br>(gauge) | Número de eventos salientes del complemento de entrada.|
| **logstash.pipeline.plugins.inputs.events.queue_push_duration_in_millis** <br>(gauge) | Duración del push de cola en el complemento de entrada.<br>_Se muestra como milisegundo_ |
| **logstash.pipeline.plugins.outputs.events.in** <br>(gauge) | Número de eventos en el complemento de salida.|
| **logstash.pipeline.plugins.outputs.events.out** <br>(gauge) | Número de eventos emitidos por el complemento de salida.|
| **logstash.pipeline.plugins.outputs.events.duration_in_millis** <br>(gauge) | Duración de los eventos en el complemento de salida.<br>_Se muestra como milisegundo_ |
| **logstash.pipeline.plugins.filters.events.in** <br>(gauge) | Número de eventos en el complemento de filtrado.|
| **logstash.pipeline.plugins.filters.events.out** <br>(gauge) | Número de eventos salientes del complemento de filtrado.|
| **logstash.pipeline.plugins.filters.events.duration_in_millis** <br>(gauge) | Duración de los eventos en el complemento de filtrado.<br>_Se muestra como milisegundo_ |
| **logstash.pipeline.queue.capacity.max_queue_size_in_bytes** <br>(gauge) | Capacidad máxima en bytes de una cola persistente.<br>_Se muestra como byte_ |
| **logstash.pipeline.queue.capacity.max_unread_events** <br>(gauge) | Máximo de eventos no leídos permitidos en una cola persistente.|
| **logstash.pipeline.queue.capacity.page_capacity_in_bytes** <br>(gauge) | Capacidad de página de cola en bytes de una cola persistente.<br>_Se muestra como byte_ |
| **logstash.pipeline.queue.capacity.queue_size_in_bytes** <br>(gauge) | Disco utilizado en bytes de una cola persistente.<br>_Se muestra como byte_ |
| **logstash.pipeline.queue.events** <br>(gauge) | Número de eventos en una cola persistente.|

### Eventos

El check de Logstash no incluye eventos.

### Checks de servicio

**logstash.can_connect**

Devuelve `Critical` si el Agent no puede conectarse a Logstash para recopilar métricas, si no devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

### No se puede conectar el Agent

```text
    logstash
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

Verifica que la `url` en `conf.yaml` es correcta.

Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog](http://docs.datadoghq.com/help).