---
description: Aprenda a enviar registros a temas de Kafka utilizando el Observability
  Pipelines Worker.
disable_toc: false
products:
- icon: logs
  name: Registros
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino de Kafka
---
{{< product-availability >}}

## Descripción general {#overview}

Utilice el destino de Kafka de Observability Pipelines para enviar registros a temas de Kafka.

### Cuándo utilizar este destino {#when-to-use-this-destination}

Escenarios comunes en los que podría utilizar este destino:
- Para enrutar registros a los siguientes destinos:
    - [Clickhouse][1]: Un sistema de gestión de bases de datos orientado a columnas de código abierto utilizado para analizar grandes volúmenes de registros.
    - [Snowflake][2]: Un almacén de datos utilizado para almacenamiento y consultas.
        - La integración de la API de Snowflake utiliza Kafka como método para ingerir registros en su plataforma.
    - [Databricks][3]: Un data lakehouse para análisis y almacenamiento.
    - [Azure Event Hub][4]: Un servicio de ingesta y procesamiento en el ecosistema de Microsoft y Azure.
- Para enrutar datos a Kafka y utilizar el ecosistema de Kafka Connect.
- Para procesar y normalizar sus datos con Observability Pipelines antes de enrutarlos a Apache Spark con Kafka para analizar datos y ejecutar cargas de trabajo de aprendizaje automático.

## Configuración {#setup}

<div class="alert alert-danger">Para la gestión de secretos: solo ingrese los identificadores para los servidores de arranque de Kafka y, si corresponde, el nombre de usuario y la contraseña SASL y la frase de contraseña de la clave TLS. <b>No</b> ingrese los valores reales.</div>

Configure el destino de Kafka cuando [configure un pipeline][10]. Puede configurar un pipeline en la [UI][5], utilizando la [API][11] o con [Terraform][12]. Los pasos de esta sección se configuran en la interfaz de usuario.

Después de seleccionar el destino de Kafka en la UI del pipeline:

1. Ingrese el identificador para sus servidores de arranque de Kafka. Si lo deja en blanco, se utiliza el [predeterminado](#secret-defaults).
1. Ingrese el nombre del tema al que desea enviar los registros.
1. En el menú desplegable {{< ui >}}Encoding{{< /ui >}}, seleccione {{< ui >}}JSON{{< /ui >}} o {{< ui >}}Raw message{{< /ui >}} como formato de salida.

{{< img src="observability_pipelines/destinations/kafka_settings.png" alt="El destino de Kafka con valores de ejemplo" style="width:30%;" >}}

{{% observability_pipelines/secrets_env_var_note %}}

#### Configuración opcional {#optional-settings}

##### Habilite TLS {#enable-tls}

{{% observability_pipelines/tls_settings %}}

##### Habilite la autenticación SASL {#enable-sasl-authentication}

1. Cambie el interruptor para habilitar {{< ui >}}SASL Authentication{{< /ui >}}.
1. Ingrese los identificadores para su nombre de usuario y contraseña de Kafka SASL. Si los deja en blanco, se utilizan los [predeterminados](#secret-defaults).
1. Seleccione el mecanismo ({{< ui >}}PLAIN{{< /ui >}}, {{< ui >}}SCHRAM-SHA-256{{< /ui >}} o {{< ui >}}SCHRAM-SHA-512{{< /ui >}}) en el menú desplegable.

##### Habilite la compresión {#enable-compression}

1. Cambie el interruptor a {{< ui >}}Enable Compression{{< /ui >}}.
1. En el menú desplegable {{< ui >}}Compression Algorithm{{< /ui >}}, seleccione un algoritmo de compresión ({{< ui >}}gzip{{< /ui >}}, {{< ui >}}zstd{{< /ui >}}, {{< ui >}}lz4{{< /ui >}} o {{< ui >}}snappy{{< /ui >}}).
1. (Opcional) Seleccione un {{< ui >}}Compression Level{{< /ui >}} en el menú desplegable. Si no se especifica el nivel, se utiliza el nivel predeterminado del algoritmo.

##### Almacenamiento en búfer {#buffering}

{{% observability_pipelines/destination_buffer %}}

##### Opciones avanzadas {#advanced-options}

Haga clic en {{< ui >}}Advanced{{< /ui >}} si desea configurar cualquiera de los siguientes campos:

1. {{< ui >}}Message Key Field{{< /ui >}}: Especifique qué campo de registro contiene la clave de mensaje para la partición, agrupación y ordenamiento.
1. {{< ui >}}Headers Key{{< /ui >}}: Especifique qué campo de registro contiene sus encabezados de Kafka. Si se deja en blanco, no se escriben encabezados.
1. {{< ui >}}Message Timeout (ms){{< /ui >}}: Tiempo de espera local del mensaje, en milisegundos. El valor predeterminado es `300,000 ms`.
1. {{< ui >}}Socket Timeout (ms){{< /ui >}}: Tiempo de espera predeterminado, en milisegundos, para las solicitudes de red. El valor predeterminado es `60,000 ms`.
1. {{< ui >}}Rate Limit Events{{< /ui >}}: El número máximo de solicitudes que el cliente de Kafka puede enviar dentro del intervalo de tiempo del límite de tasa. El valor predeterminado es sin límite de tasa.
1. {{< ui >}}Rate Limit Time Window (secs){{< /ui >}}: El intervalo de tiempo utilizado para la opción de límite de tasa.
    - Esta configuración no tiene efecto si no se establece el límite de tasa para los eventos.
    - El valor predeterminado es `1 second` si {{< ui >}}Rate Limit Events{{< /ui >}} está establecido, pero {{< ui >}}Rate Limit Time Window{{< /ui >}} no está establecido.
1. Para agregar [opciones de librdkafka](#librdkafka-options) adicionales, haga clic en {{< ui >}}Add Option{{< /ui >}} y seleccione una opción en el menú desplegable.
    1. Ingrese un valor para esa opción.
    1. Verifique sus valores con la [documentación de librdkafka][7] para asegurarse de que tengan el tipo correcto y estén dentro del rango establecido.
    1. Haga clic en {{< ui >}}Add Option{{< /ui >}} para agregar otra opción de librdkafka.

## Valores predeterminados de Secret {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de servidores de arranque de Kafka:
    - Hace referencia al servidor de arranque que el cliente utiliza para conectarse al clúster de Kafka y descubrir todos los demás servidores en el clúster.
	- En su administrador de secretos, el servidor y el puerto deben ingresarse en el formato de `host:port`, como `10.14.22.123:9092`. Si hay más de un servidor, utilice comas para separarlos.
	- El identificador predeterminado es `DESTINATION_KAFKA_BOOTSTRAP_SERVERS`.
- Identificador de frase de contraseña TLS de Kafka (cuando TLS está habilitado):
	- El identificador predeterminado es `DESTINATION_KAFKA_KEY_PASS`.
- Autenticación SASL (cuando está habilitada):
	- Identificador de nombre de usuario SASL de Kafka:
		- El identificador predeterminado es `DESTINATION_KAFKA_SASL_USERNAME`.
	- Identificador de contraseña SASL de Kafka:
		- El identificador predeterminado es `DESTINATION_KAFKA_SASL_PASSWORD`.

{{% /tab %}}

{{% tab "Variables de entorno" %}}

{{< img src="observability_pipelines/destinations/kafka_env_var.png" alt="La página de instalación que muestra el campo de variable de entorno de Kafka" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## Opciones de librdkafka {#librdkafka-options}

Estas son las opciones de librdkafka disponibles:

- client.id
- queue.buffering.max_messages
- transactional.id
- enable.idempotence
- acks

Consulte la [documentación de librdkafka][7] para obtener más información y asegurarse de que sus valores tengan el tipo correcto y estén dentro del rango.

## Métricas de salud {#health-metrics}

Para [métricas de componentes][13] y [métricas de búfer de destino][14] emitidas por todos los destinos, consulte la documentación de [métricas de uso de Pipelines][8].

### Métricas de Kafka {#kafka-metrics}

- Utilice la etiqueta `component_id` para filtrar o agrupar por componentes individuales.
- La etiqueta `component_type` es `kafka` para las métricas de destino de Kafka.

`pipelines.kafka_produced_messages_total`
: **Descripción**: El número de mensajes producidos y enviados a los brokers de Kafka.
: **Tipo de métrica**: conteo

`pipelines.kafka_produced_messages_bytes_total`
: **Descripción**: El número de bytes de mensaje producidos y enviados a los brokers de Kafka.
: **Tipo de métrica**: conteo

`pipelines.kafka_queue_messages`
: **Descripción**: Número actual de mensajes en la cola del productor de librdkafka.
: **Tipo de métrica**: gauge

`pipelines.kafka_queue_messages_bytes`
: **Descripción**: Tamaño total actual, en bytes, de los mensajes en la cola del productor de librdkafka.
: **Tipo de métrica**: gauge

`pipelines.kafka_requests_total`
: **Descripción**: El número de solicitudes enviadas a los brokers de Kafka.
: **Tipo de métrica**: count

`pipelines.kafka_requests_bytes_total`
: **Descripción**: El número de bytes transmitidos a los brokers de Kafka.
: **Tipo de métrica**: count

`pipelines.kafka_responses_total`
: **Descripción**: El número de respuestas recibidas de los brokers de Kafka.
: **Tipo de métrica**: count

`pipelines.kafka_responses_bytes_total`
: **Descripción**: El número de bytes recibidos de los brokers de Kafka.
: **Tipo de métrica**: count

### Procesamiento por lotes de eventos {#event-batching}

Un lote de eventos se vacía cuando se cumple uno de estos parámetros. Consulte [Destinations agrupación de eventos][9] para obtener más información.

| Máximo de eventos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| 10,000         | 1                 | 1                   |

[1]: https://clickhouse.com/docs/engines/table-engines/integrations/kafka
[2]: https://docs.snowflake.com/en/user-guide/kafka-connector
[3]: https://docs.databricks.com/aws/en/connect/streaming/kafka
[4]: https://learn.microsoft.com/en-us/azure/event-hubs/azure-event-hubs-apache-kafka-overview
[5]: https://app.datadoghq.com/observability-pipelines
[7]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[8]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/
[9]: /es/observability_pipelines/destinations/#event-batching
[10]: /es/observability_pipelines/configuration/set_up_pipelines/
[11]: /es/api/latest/observability-pipelines/
[12]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
[13]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[14]: /es/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#destination-buffer-metrics