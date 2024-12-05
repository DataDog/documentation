---
title: Configurar Data Streams Monitoring para .NET
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Monitorización de Secuencias de Datos no es compatible con la región AP1.</a></div>
{{< /site-region >}}

### Requisitos previos

Para empezar a trabajar con la Monitorización de Secuencias de Datos, necesitas versiones recientes de las bibliotecas del Datadog Agent y .NET:
* [Datadog Agent v7.34.0 o más reciente][1]
* Rastreador de .NET ([.NET Core][2], [.NET Framework][3])
  * Kafka y RabbitMQ: versión 2.28.0 o posterior
  * Amazon SQS: versión 2.48.0

### Instalación

.NET usa instrumentación automática para inyectar y extraer meta datos adicionales que requiere la Monitorización de Secuencias de Datos para medir latencias de extremo a extremo y la relación entre colas y servicios. Para activar la Monitorización de Secuencias de Datos, configura la variable de entorno `DD_DATA_STREAMS_ENABLED` como `true` en aquellos servicios que envían mensajes a (o consumen mensajes de) Kafka o RabbitMQ.

Por ejemplo:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```
### Bibliotecas compatibles
Data Streams Monitoring es compatible con la [biblioteca confluent-kafka][4].

### Monitorización de pipelines de SQS
Data Streams Monitoring usa un [atributo de mensaje][5] para rastrear la ruta de un mensaje a través de una cola de SQS. Como Amazon SQS tiene un límite máximo de 10 atributos de mensaje permitidos por mensaje, todos los mensajes transmitidos a través de los pipelines de datos deben tener 9 o menos atributos de mensaje configurados, lo que permite el atributo restante para Data Streams Monitoring.


[1]: /es/agent
[2]: /es/tracing/trace_collection/dd_libraries/dotnet-core
[3]: /es/tracing/trace_collection/dd_libraries/dotnet-framework
[4]: https://pypi.org/project/confluent-kafka/
[5]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html