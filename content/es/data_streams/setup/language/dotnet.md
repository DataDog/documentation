---
aliases:
- /es/data_streams/dotnet
further_reading:
- link: https://www.datadoghq.com/blog/confluent-connector-dsm-autodiscovery/
  tag: Blog
  text: Detectar de forma automática conectores de Confluent Cloud y monitorizar el
    rendimiento fácilmente en Data Streams Monitoring
title: Configurar Data Streams Monitoring para .NET
---

### Requisitos previos

* [Datadog Agent v7.34.0 o posterior][10]

### Bibliotecas compatibles

| Tecnología                                                  | Biblioteca                          | Versión mínima del rastreador                                                                   | Versión recomendada del rastreador                                                                   |
|-------------------------------------------------------------|----------------------------------|------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| Kafka                                                       | [Confluent.Kafka][3]             | {{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="minimal" >}}            | {{< dsm-tracer-version lang="dotnet" lib="confluent-kafka" type="recommended" >}}            |
| RabbitMQ                                                    | [RabbitMQ.Client][4]             | {{< dsm-tracer-version lang="dotnet" lib="rabbitmq-client" type="minimal" >}}            | {{< dsm-tracer-version lang="dotnet" lib="rabbitmq-client" type="recommended" >}}            |
| Amazon SQS                                                  | [SDK de Amazon SQS][5]              | {{< dsm-tracer-version lang="dotnet" lib="amazon-sqs-sdk" type="minimal" >}}             | {{< dsm-tracer-version lang="dotnet" lib="amazon-sqs-sdk" type="recommended" >}}             |
| Amazon SNS                                                  | [SDK de Amazon SNS][6]              | {{< dsm-tracer-version lang="dotnet" lib="amazon-sns-sdk" type="minimal" >}}             | {{< dsm-tracer-version lang="dotnet" lib="amazon-sns-sdk" type="recommended" >}}             |
| Amazon Kinesis                                              | [SDK de Amazon Kinesis][7]          | {{< dsm-tracer-version lang="dotnet" lib="amazon-kinesis-sdk" type="minimal" >}}         | {{< dsm-tracer-version lang="dotnet" lib="amazon-kinesis-sdk" type="recommended" >}}         |
| IBM MQ                                                      | [IBMMQDotnetClient][8]           | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="minimal" >}}          | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="recommended" >}}          |
| Bus de servicio de Azure <br><br> (requiere [configuración adicional][9]) | [Azure.Messaging.ServiceBus][10] | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="minimal" >}} | {{< dsm-tracer-version lang="dotnet" lib="azure-messaging-servicebus" type="recommended" >}} |

### Instalación

.NET utiliza la instrumentación automática para inyectar y extraer los metadatos adicionales que necesita Data Streams Monitoring para medir las latencias de extremo a extremo y la relación entre colas y servicios. 

{{< tabs >}}
{{% tab "Rastreador de .NET >= v3.22.0 (Recomendado)" %}}

A partir de la versión 3.22.0 del rastreador .NET, Data Streams Monitoring se encuentra en un estado activado por defecto. Las aplicaciones con el rastreador de APM envían automáticamente telemetría de DSM, lo que permite a los equipos probar DSM sin sumar un paso de instrumentación. Si tu organización dispone de APM Enterprise, APM Pro o DSM en el contrato, los datos se procesan y almacenan, permitiendo vistas y métricas de DSM automáticamente.

Cuando `DD_DATA_STREAMS_ENABLED` no está configurado, entonces:

* El seguimiento de esquemas está desactivado.
* Data Streams no está habilitado cuando se ejecuta en un entorno sin servidor.
* La información de Data Streams no se propaga para ciertos mensajes que son demasiado pequeños o demasiado grandes. Consulta [Tamaños de mensajes](#message-sizes) para obtener más detalles.
* No se hace un seguimiento del tamaño de los mensajes.

Cuando `DD_DATA_STREAMS_ENABLED` se establece en `true`, entonces:

* El seguimiento de esquemas está activado.
* Data Streams está habilitado para entornos sin servidor.
* La información sobre Data Streams se envía para **todos** los mensajes.
* Se hace un seguimiento del tamaño de los mensajes.

Si `DD_DATA_STREAMS_ENABLED` está configurado como `false`, todas las funciones de Data Streams Manager están desactivadas.

Si tienes alguna pregunta sobre el comportamiento activado por defecto, ponte en contacto con tu asesor de clientes.

{{% /tab %}}
{{% tab "Rastreador de .NET < v3.22.0 (Legacy)" %}}

Para habilitar Data Streams Monitoring, establece la variable de entorno `DD_DATA_STREAMS_ENABLED` en `true` en los servicios que envían mensajes a (o consumen mensajes de) tus aplicaciones de streaming.

Por ejemplo:
```yaml
entorno:
  - DD_DATA_STREAMS_ENABLED: "true"
  - DD_TRACE_REMOVE_INTEGRATION_SERVICE_NAMES_ENABLED: "true"
```

{{% /tab %}}
{{< /tabs >}}

{{% data_streams/monitoring-kafka-pipelines %}}

{{% data_streams/monitoring-sqs-pipelines %}}

{{% data_streams/monitoring-rabbitmq-pipelines %}}

{{% data_streams/monitoring-sns-to-sqs-pipelines %}}

{{% data_streams/monitoring-azure-service-bus %}}

### Monitorización de conectores

#### Conectores de Confluent Cloud
{{% data_streams/dsm-confluent-connectors %}}

### Tamaño de los mensajes

Cuando Data Streams Monitoring está activado en el modo por defecto, algunos mensajes no se instrumentan cuando son demasiado pequeños, o demasiado grandes.

Los siguientes umbrales de tamaño se aplican cuando Data Streams Monitoring está activado en el modo por defecto:

- **Kafka**
  - Los mensajes de menos de 34 bytes no se instrumentan por defecto.

- **RabbitMQ**
  - Los mensajes de más de 128 kilobytes no se instrumentan por defecto.

- **Amazon Kinesis**
  - Los mensajes de menos de 34 bytes no se instrumentan por defecto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[10]: /es/agent
[3]: https://www.nuget.org/packages/Confluent.Kafka
[4]: https://www.nuget.org/packages/RabbitMQ.Client
[5]: https://www.nuget.org/packages/AWSSDK.SQS
[6]: https://www.nuget.org/packages/AWSSDK.SimpleNotificationService
[7]: https://www.nuget.org/packages/AWSSDK.Kinesis
[8]: https://www.nuget.org/packages/IBMMQDotnetClient
[9]: #monitoring-azure-service-bus
[10]: https://www.nuget.org/packages/Azure.Messaging.ServiceBus
[11]: https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.md#enabling-experimental-tracing-features