---
aliases:
- /es/data_streams/java_manual_instrumentation
further_reading:
- link: /integrations/kafka/
  tag: Documentación
  text: Integración de Kafka
- link: /tracing/software_catalog/
  tag: Documentación
  text: Catálogo de software
private: true
title: Configurar Data Streams Monitoring a través de la instrumentación manual
---

Data Streams Monitoring (DSM) propaga el contexto a través de los encabezados de los mensajes. Realiza la instrumentación manual para configurar DSM si utilizas una de las siguientes opciones:
- una tecnología de cola de mensajes no compatible con DSM;
- una tecnología de cola de mensajes sin encabezados, como Kinesis;
- Lambdas.

### Instalación con instrumentación manual

1. Asegúrate de estar utilizando el [Datadog Agent v7.34.0 o posterior][1].

2. En servicios al enviar o consumir mensajes, declara los tipos admitidos. Por ejemplo:
{{< code-block lang="text" >}}
kinesis, kafka, rabbitmq, sqs, sns, servicebus
{{< /code-block >}}

3. Llama a los puntos de control de Data Streams Monitoring cuando se produzcan mensajes y cuando se consuman, como se muestra en el siguiente código de ejemplo:
{{< tabs >}}
{{% tab "Java" %}}
{{< code-block lang="java" >}}
import datadog.trace.api.experimental.*;

​Carrier headersAdapter = new Carrier(headers);
​
// antes de la llamada de producción
DataStreamsCheckpointer.get().setProduceCheckpoint("<datastream-type>", "<queue-or-topic-name>", headersAdapter);
​
// después de la llamada de consumo
DataStreamsCheckpointer.get().setConsumeCheckpoint("<datastream-type>", "<queue-or-topic-name>", headersAdapter);
​
// ejemplo: la generación de un log de un punto de control de consumo de Kafka en el tema "customer-checkout" sería la siguiente
DataStreamsCheckpointer.get().setConsumeCheckpoint("kafka", "customer-checkout", headersAdapter);
​
// sustituye los encabezados por lo que estés usando para pasar el contexto
private class Carrier implements DataStreamsContextCarrier {
    private Headers headers;

    public Carrier(Headers headers) {
        this.headers = headers;
    }
​
    public Set<Entry<String, Object>> entries() {
        return this.headers.entrySet();
    }
​
    public void set(String key, String value){
        this.headers.put(key, value);
    }
}
{{< /code-block >}}
{{% /tab %}}
{{% tab "Node.js" %}}
{{< code-block lang="javascript" >}}
const tracer = require('dd-trace').init({})

// antes de la llamada de producción
const headers = {}
tracer.dataStreamsCheckpointer.setProduceCheckpoint(
"<datastream-type>", "<queue-name>", headers
)

// después de la llamada de consumo
tracer.dataStreamsCheckpointer.setConsumeCheckpoint(
"<datastream-type>", "<queue-name>", headers
)

{{< /code-block >}}
{{% /tab %}}
{{% tab "Python" %}}
{{< code-block lang="Python" >}}
from ddtrace.data_streams import set_consume_checkpoint
from ddtrace.data_streams import set_produce_checkpoint

# antes de la llamada de producción
headers = {}
set_produce_checkpoint(
"<datastream-type>", "<datastream-name>", headers.setdefault
)

# después de la llamada de consumo
set_consume_checkpoint(
"<datastream-type>", "<datastream-name>", headers.get
)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}
## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent
[2]: /es/tracing/trace_collection/dd_libraries/java/
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: /es/remote_configuration