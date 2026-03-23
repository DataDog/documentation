---
disable_toc: false
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Destino Kafka
---

{{< product-availability >}}

## Información general

Utiliza el destino Kafka de Observability Pipelines para enviar logs a temas Kafka.

### Cuándo utilizar este destino

Escenarios frecuentes en los que puedes utilizar este destino:
- Para enrutar logs a los siguientes destinos:
    - [Clickhouse][1]: Sistema abierto de gestión de bases de datos orientado a columnas utilizado para analizar grandes volúmenes de logs.
    - [Snowflake][2]: Almacén de datos utilizado para el almacenamiento y la consulta.
        - La integración de la API de Snowflake utiliza Kafka como método de ingesta de logs en tu plataforma.
    - [Databricks][3]: Lago de datos para el análisis y el almacenamiento.
    - [Azure Event Hub][4]: Servicio de ingesta y procesamiento en el ecosistema de Microsoft y Azure.
- Para enrutar datos a Kafka y utilizar el ecosistema Kafka Connect.
- Para procesar y normalizar tus datos con Observability Pipelines antes de enrutarlos a Apache Spark con Kafka para analizar datos y ejecutar cargas de trabajo de machine learning.

## Instalación

Configura el destino Kafka y sus variables de entorno cuando [configures un pipeline][5]. La siguiente información se configura en la interfaz de usuario del pipeline.

### Configurar el destino

1. Introduce el nombre del tema al que quieres enviar logs.
1. En el menú desplegable **Encoding** (Codificación), selecciona `JSON` o `Raw message` como formato de salida.

{{< img src="observability_pipelines/destinations/kafka_settings.png" alt="Destino Kafka con valores de ejemplo" style="width:30%;" >}}

#### Ajustes opcionales

##### Activar TLS

Alterna al interruptor para activar TLS** (Activar TLS). Se requieren los siguientes archivos de certificados y claves.<br>**Nota**: Todas las rutas a los archivos son relativas al directorio de datos de configuración, que es `/var/lib/observability-pipelines-worker/config/` por defecto. Consulta [Configuraciones avanzadas del worker][6] para obtener más información. El archivo debe ser propiedad del usuario `observability-pipelines-worker group` y `observability-pipelines-worker` o al menos debe ser legible por el grupo o el usuario.
- `Server Certificate Path`: La ruta al archivo del certificado que ha sido firmado por el archivo raíz de tu autoridad de certificación (CA) en DER o PEM (X.509).
- `CA Certificate Path`: La ruta al archivo del certificado que es el archivo raíz de tu autoridad de certificación (CA) en DER o PEM (X.509).
- `Private Key Path`: la ruta al archivo de clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS#8).

##### Activar la autenticación SASL

1. Alterna el interruptor para activar la **Autenticación SASL**.
1. Selecciona el mecanismo (**PLAIN**, **SCHRAM-SHA-256** o **SCHRAM-SHA-512**) en el menú desplegable.

##### Activar la compresión

1. Alterna a la opción **Enable Compression** (Activar compresión).
1. En el menú desplegable **Compression Algorithm** (Algoritmo de compresión), selecciona un algoritmo de compresión (**gzip**, **zstd**, **lz4** o **snappy**).
1. (Opcional) Selecciona un **nivel de compresión** en el menú desplegable. Si no se especifica el nivel, se utiliza el nivel por defecto del algoritmo.

##### Opciones de almacenamiento en buffer

{{% observability_pipelines/destination_buffer %}}

##### Opciones avanzadas

Haz clic en **Advanced** (Avanzado) si quieres configurar alguno de los siguientes campos:

1. **Campo clave del mensaje**: Especifica qué campo de log contiene la clave del mensaje para particionar, agrupar y ordenar.
1. **Clave de cabecera**: Especifica qué campo de log contiene tus cabeceras Kafka. Si se deja en blanco, no se escribe ninguna cabecera.
1. **Tiempo de espera del mensaje (ms)**: Tiempo de espera del mensaje local en milisegundos. Por defecto es `300,000 ms`.
1. **Tiempo de espera del socket (ms)**: Tiempo de espera por defecto en milisegundos para solicitudes de red. Por defecto es `60,000 ms`.
1. **Eventos de límite de frecuencia**: Número máximo de solicitudes que el cliente Kafka puede enviar dentro de la ventana de tiempo de límite de frecuencia. Por defecto no hay límite de frecuencia.
1. **Ventana de tiempo de límite de frecuencia (segundos)**: Ventana de tiempo utilizada para la opción de límite de frecuencia.
    - Este ajuste no tiene ningún efecto si no se define el límite de frecuencia para eventos.
    - El valor por defecto es `1 second` si **Rate Limit Events** (Eventos de límite de frecuencia) está configurado, pero **Rate Limit Time Window** (Ventana de tiempo límite de frecuencia) no está configurado.
1. Para añadir [opciones librdkafka](#librdkafka-options) adicionales, haz clic en **Add Option** (Añadir opción) y selecciona una opción en el menú desplegable.
    1. Introduce un valor para esa opción.
    1. Comprueba tus valores en la [documentación de librdkafka][7] para asegurarte de que tienen el tipo correcto y están dentro del rango establecido.
    1. Haz clic en **Add Option** (Añadir opción) para añadir otra opción librdkafka.

### Configurar secretos

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "Gestión de secretos" %}}

- Identificador de servidores de arranque Kafka:
    - Hace referencia al servidor de arranque que el cliente utiliza para conectarse al clúster Kafka y detectar todos los demás hosts del clúster.
    - En tu gestor de secretos, el host y el puerto deben introducirse en el formato `host:port`, como `10.14.22.123:9092`. Si hay más de un servidor, utiliza comas para separarlos.
    - El identificador por defecto es `DESTINATION_KAFKA_BOOTSTRAP_SERVERS`.
- Identificador de frase de contraseña TLS de Kafka (cuando TLS está activado):
    - El identificador por defecto es `DESTINATION_KAFKA_KEY_PASS`.
- Autenticación SASL (si está activada):
    - Identificador de nombre de usuario SASL de Kafka:
        - El identificador por defecto es `DESTINATION_KAFKA_SASL_USERNAME`.
    - Identificador de contraseña SASL de Kafka:
        - El identificador por defecto es `DESTINATION_KAFKA_SASL_PASSWORD`.

{{% /tab %}}

{{% tab "Environment Variables" %}}

{{< img src="observability_pipelines/destinations/kafka_env_var.png" alt="Página de instalación que muestra el campo de la variable de entorno de Kafka" style="width:70%;" >}}

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/kafka %}}

{{% /tab %}}
{{< /tabs >}}

## Opciones de librdkafka

Estas son las opciones de librdkafka disponibles:

- client.id
- queue.buffering.max_messages
- transactional.id
- enable.idempotence
- acks

Consulta la [documentación de librdkafka][7] para obtener más información y asegurarte de que tus valores tienen el tipo correcto y están dentro del rango.

## Métricas

Consulte las [métricas de Observability Pipelines][8] para ver una lista completa de métricas de salud disponibles.

### Métricas de salud de workers

#### Métricas de componente

{{% observability_pipelines/metrics/component %}}

### Métricas de buffer (cuando están activadas)

{{% observability_pipelines/metrics/buffer/destinations %}}

#### Métricas de buffer obsoletas

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

### Procesamiento de eventos por lotes

Un lote de eventos se descarga cuando se cumple uno de estos parámetros. Consulta el [procesamiento de eventos por lotes][9] para obtener más información.

| Eventos máximos | Tamaño máximo (MB) | Tiempo de espera (segundos)   |
|----------------|-------------------|---------------------|
| 10,000         | 1                 | 1                   |

[1]: https://clickhouse.com/docs/engines/table-engines/integrations/kafka
[2]: https://docs.snowflake.com/en/user-guide/kafka-connector
[3]: https://docs.databricks.com/aws/en/connect/streaming/kafka
[4]: https://learn.microsoft.com/en-us/azure/event-hubs/azure-event-hubs-apache-kafka-overview
[5]: https://app.datadoghq.com/observability-pipelines
[6]: /es/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
[7]: https://docs.confluent.io/platform/current/clients/librdkafka/html/md_CONFIGURATION.html
[8]: /es/observability_pipelines/monitoring/metrics/
[9]: /es/observability_pipelines/destinations/#event-batching