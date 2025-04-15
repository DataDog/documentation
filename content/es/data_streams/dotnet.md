---
title: Configurar Data Streams Monitoring para .NET
---

### Requisitos previos

* [Datadog Agent v7.34.0 o más reciente][1]

### Bibliotecas compatibles

| Tecnología        | Biblioteca                         | Versión mínima del rastreador | Versión recomendada del rastreador |
|-------------------|---------------------------------|------------------------|----------------------------|
| Kafka             | [Confluent.Kafka][3]            | 2.28.0                 | 2.41.0 o posterior            |
| RabbitMQ          | [RabbitMQ.Client][4]            | 2.28.0                 | 2.37.0 o posterior            |
| Amazon SQS        | [SDK de Amazon SQS][5]             | 2.48.0                 | 2.48.0 o posterior            |
| Amazon SNS        | [SDK de Amazon SNS][6]             | 3.6.0                  | 3.6.0 o posterior             |
| IBM MQ            | [IBMMQDotnetClient][7]          | 2.49.0                 | 2.49.0 o posterior            |
| Bus de servicio de Azure | [Azure.Messaging.ServiceBus][8] | 2.38.0                 | 2.38.0 o posterior            |

### Instalación

.NET usa instrumentación automática para inyectar y extraer meta datos adicionales que requiere la Monitorización de Secuencias de Datos para medir latencias de extremo a extremo y la relación entre colas y servicios. Para activar la Monitorización de Secuencias de Datos, configura la variable de entorno `DD_DATA_STREAMS_ENABLED` como `true` en aquellos servicios que envían mensajes a (o consumen mensajes de) Kafka o RabbitMQ.

Por ejemplo:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

### Monitorización de pipelines de SQS
Data Streams Monitoring utiliza un [atributo de mensaje][2] para rastrear la ruta de un mensaje a través de una cola SQS. Como Amazon SQS tiene un límite máximo de 10 atributos de mensaje permitidos por mensaje, todos los mensajes transmitidos a través de los pipelines de datos deben tener 9 o menos atributos de mensaje establecidos, lo que deja el atributo restante para Data Streams Monitoring.

### Monitorización de pipelines SNS a SQS
Para monitorizar un pipeline de datos en el que Amazon SNS habla directamente con Amazon SQS, debes habilitar [la entrega de mensajes sin formato de Amazon SNS][9].


[1]: /es/agent
[2]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[3]: https://www.nuget.org/packages/Confluent.Kafka
[4]: https://www.nuget.org/packages/RabbitMQ.Client
[5]: https://www.nuget.org/packages/AWSSDK.SQS
[6]: https://www.nuget.org/packages/AWSSDK.SimpleNotificationService
[7]: https://www.nuget.org/packages/IBMMQDotnetClient
[8]: https://www.nuget.org/packages/Azure.Messaging.ServiceBus
[9]: https://docs.aws.amazon.com/sns/latest/dg/sns-large-payload-raw-message-delivery.html