---
app_id: fluentd
categories:
- log collection
- metrics
custom_kind: integración
description: Monitorizar colas de búferes de colas de búfer y counts de reintentos
  para cada complemento de Fluentd que haya enabled.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-fluentd-datadog
  tag: blog
  text: Cómo monitorizar Fluentd con Datadog
integration_version: 5.1.0
media: []
supported_os:
- linux
- windows
- macos
title: FluentD
---
![Dashboard de Fluentd](https://raw.githubusercontent.com/DataDog/integrations-core/master/fluentd/images/snapshot-fluentd.png)

## Información general

Obtén métricas de FluentD para:

- Visualizar el rendimiento de FluentD.
- Correlacionar el rendimiento de FluentD con el del resto de tus aplicaciones.

## Configuración

### Instalación

El check de Fluentd está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores Fluentd.

#### Preparación de FluentD

En tu archivo de configuración de FluentD, añade una fuente `monitor_agent`:

```text
<source>
  @type monitor_agent
  bind 0.0.0.0
  port 24220
</source>
```

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `fluentd.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus [métricas de Fluentd](#metrics). Consulta el [ejemplo de fluentd.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/fluentd/datadog_checks/fluentd/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   init_config:

   instances:
     ## @param monitor_agent_url - string - required
     ## Monitor Agent URL to connect to.
     #
     - monitor_agent_url: http://example.com:24220/api/plugins.json
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

Puedes utilizar el [complemento de Fluentd de Datadog](https://github.com/DataDog/fluent-plugin-datadog) para reenviar los logs directamente desde Fluentd a tu cuenta de Datadog.

###### Añadir metadatos a tus logs

Unos metadatos adecuados (incluidos el nombre de host y source (fuente)) son la clave para desbloquear todo el potencial de tus logs en Datadog. En forma predeterminada, los campos de nombre de host y marca de tiempo deben reasignarse correctamente con la [reasignación para atributos reservados](https://docs.datadoghq.com/logs/processing/#edit-reserved-attributes).

###### Fuente y etiquetas (tags) personalizados

Añade el atributo `ddsource` con [el nombre de la integración log](https://docs.datadoghq.com/integrations/#cat-log-collection) en tus logs para activar la [configuración automática de la integración](https://docs.datadoghq.com/logs/processing/#integration-pipelines) en Datadog.
Las [etiquetas (tags) de host](https://docs.datadoghq.com/getting_started/tagging/assigning_tags/) se configuran automáticamente en tus logs si hay un nombre de host coincidente en tu [lista de infraestructuras](https://app.datadoghq.com/infrastructure). Utiliza el atributo `ddtags` para añadir etiquetas (tags) personalizadas a sus logs:

Ejemplo de configuración:

```conf
  # Match events tagged with "datadog.**" and
  # send them to Datadog

<match datadog.**>
  @type datadog
  @id awesome_agent
  api_key <your_api_key>

  # Optional
  include_tag_key true
  tag_key 'tag'

  # Optional tags
  dd_source '<INTEGRATION_NAME>'
  dd_tags '<KEY1:VALUE1>,<KEY2:VALUE2>'

  <buffer>
          @type memory
          flush_thread_count 4
          flush_interval 3s
          chunk_limit_size 5m
          chunk_limit_records 500
  </buffer>
</match>
```

Por defecto, el complemento está configurado para enviar logs a través de HTTPS (puerto 443) utilizando la compresión gzip.
Puedes cambiar este comportamiento utilizando los siguientes parámetros:

- `use_http`: Defínelo como `false`, si quieres utilizar el reenvío TCP, y actualiza el `host` y el `port` en consecuencia (por defecto es `true`).
- `use_compression`: La compresión sólo está disponible para HTTP. Desactívala configurándola como `false` (por defecto es `true`).
- `compression_level`: Configura el nivel de compresión de HTTP. El rango es de 1 a 9, siendo 9 el mejor ratio (por defecto es `6`)

Se pueden utilizar parámetros adicionales para cambiar el endpoint utilizado para pasar por un proxy:

- `host`: Endpoint del proxy para logs no reenviados directamente a Datadog (valor por defecto: `http-intake.logs.datadoghq.com`).
- `port`: Puerto del proxy para logs no reenviados directamente a Datadog (valor por defecto: `80`).
- `ssl_port`: Puerto utilizado para logs reenviados a Datadog con una conexión TCP/SSL segura (valor por defecto: `443`).
- `use_ssl`: Indica al Agent que inicie una conexión TCP/SSL segura con Datadog (valor por defecto: `true`).
- `no_ssl_validation`: Desactiva la validación de nombres de host SSL (valor por defecto: `false`).

**Nota**: Configura el `host` y el `port` en tu región {{< region-param key="http_endpoint" code="true" >}} {{< region-param key="http_port" code="true" >}}.

```conf
<match datadog.**>

  #...
  host 'http-intake.logs.datadoghq.eu'

</match>
```

###### Etiquetas de Kubernetes y Docker

Las etiquetas de Datadog son fundamentales para poder saltar de una parte del producto a otra. Por tanto, es importante disponer de los metadatos adecuados asociados a tus logs para saltar de una vista de contenedor o de cualquier métrica de contenedor a los logs más relacionados.

Si tus logs contienen alguno de los siguientes atributos, estos se añaden a tus logs automáticamente como etiquetas de Datadog:

- `kubernetes.container_image`
- `kubernetes.container_name`
- `kubernetes.namespace_name`
- `kubernetes.pod_name`
- `docker.container_id`

Mientras que el Datadog Agent recopila los metadatos de Docker y Kubernetes automáticamente, Fluentd necesita un complemento para ello. Datadog recomienda utilizar [fluent-plugin-kubernetes_metadata_filter](https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter) para recopilar estos metadatos.

Ejemplo de configuración:

```conf
# Collect metadata for logs tagged with "kubernetes.**"
 <filter kubernetes.*>
   type kubernetes_metadata
 </filter>
```

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [ Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `fluentd`                                                         |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                     |
| `<INSTANCE_CONFIG>`  | `{"monitor_agent_url": "http://%%host%%:24220/api/plugins.json"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `fluentd` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **fluentd.buffer_available_buffer_space_ratios** <br>(medidor) | Mostrar el espacio disponible para el búfer|
| **fluentd.buffer_queue_byte_size** <br>(medidor) | Tamaño en bytes actual de los trozos de búfer en cola<br>_Mostrado como byte_ |
| **fluentd.buffer_queue_length** <br>(medidor) | La longitud de la cola del búferes para este complemento.<br>_Mostrado como búfer_ |
| **fluentd.buffer_stage_byte_size** <br>(medidor) | Tamaño en bytes actual de los trozos de búferes por etapas<br>_Mostrado como byte_ |
| **fluentd.buffer_stage_length** <br>(medidor) | La longitud de los trozos de búferes escalonados|
| **fluentd.buffer_total_queued_size** <br>(medidor) | El tamaño de la cola de búferes para este complemento.<br>_Mostrado como byte_ |
| **fluentd.emit_count** <br>(medidor) | El número total de llamadas de emisión en el complemento de salida<br>_Mostrado como unidad_ |
| **fluentd.emit_records** <br>(medidor) | El número total de registros emitidos<br>_Mostrado como registro_ |
| **fluentd.flush_time_count** <br>(medidor) | El tiempo total de descarga del búfer en milisegundos<br>_Mostrado en milisegundos_ |
| **fluentd.retry_count** <br>(medidor) | El número de reintentos para este complemento.<br>_Mostrado como tiempo_ |
| **fluentd.rollback_count** <br>(medidor) | El número total de reversiones. Se produce una reversión cuando escribir/intentar_escribir falló<br>_Mostrado como unidad_ |
| **fluentd.slow_flush_count** <br>(medidor) | El número total de descargas lentas. Este count se incrementará cuando la descarga del búferes sea más larga que el umbral_log_descarga_lenta<br>_Mostrado como unidad_. |
| **fluentd.write_count** <br>(medidor) | El número total de llamadas de escribir/intentar_escribir en el complemento de salida<br>_Mostrado como unidad_. |

### Eventos

El check de Fluentd no incluye ningún evento.

### Checks de servicio

**fluentd.is_ok**

Devuelve `OK` si fluentd y su agente de monitor se están ejecutando, de otro modo CRÍTICO.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Cómo monitorizar Fluentd con Datadog](https://www.datadoghq.com/blog/monitor-fluentd-datadog)