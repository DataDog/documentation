---
title: Set up Data Streams Monitoring through Manual Instrumentation
private: true
aliases:
  - /data_streams/java_manual_instrumentation
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/tracing/software_catalog/'
      tag: 'Documentation'
      text: 'Software Catalog'
---

Data Streams Monitoring (DSM) propagates context through message headers. Use manual instrumentation to set up DSM if you are using:
- a message queue technology that is not supported by DSM
- a message queue technology without headers, such as Kinesis
- Lambdas in .NET or Java

### Manual instrumentation installation

1. Ensure you're using the [Datadog Agent v7.34.0 or later][1].

2. On services sending or consuming messages, declare the supported types. For example:
{{< code-block lang="text" >}}
kinesis, kafka, rabbitmq, sqs, sns, servicebus
{{< /code-block >}}

3. Call the Data Streams Monitoring checkpoints when messages are produced and when they are consumed, as shown in the example code below:
{{< tabs >}}
{{% tab "Java" %}}
{{< code-block lang="java" >}}
import datadog.trace.api.experimental.*;

​Carrier headersAdapter = new Carrier(headers);
​
// before calling produce
DataStreamsCheckpointer.get().setProduceCheckpoint("<datastream-type>", "<queue-or-topic-name>", headersAdapter);
​
// after calling consume
DataStreamsCheckpointer.get().setConsumeCheckpoint("<datastream-type>", "<queue-or-topic-name>", headersAdapter);
​
// example: logging a kafka consume checkpoint on the 'customer-checkout' topic would look like
DataStreamsCheckpointer.get().setConsumeCheckpoint("kafka", "customer-checkout", headersAdapter);
​
// replace headers with whatever you're using to pass the context
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

// before calling produce
const headers = {}
tracer.dataStreamsCheckpointer.setProduceCheckpoint(
"<datastream-type>", "<queue-name>", headers
)

// after calling consume
tracer.dataStreamsCheckpointer.setConsumeCheckpoint(
"<datastream-type>", "<queue-name>", headers
)

{{< /code-block >}}
{{% /tab %}}
{{% tab "Python" %}}
{{< code-block lang="python" >}}
from ddtrace.data_streams import set_consume_checkpoint
from ddtrace.data_streams import set_produce_checkpoint

# before calling produce
headers = {}
set_produce_checkpoint(
"<datastream-type>", "<datastream-name>", headers.setdefault
)

# after calling consume
set_consume_checkpoint(
"<datastream-type>", "<datastream-name>", headers.get
)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/java/
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: /remote_configuration
