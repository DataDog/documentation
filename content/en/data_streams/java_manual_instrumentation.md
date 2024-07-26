---
title: Set up Data Streams Monitoring for Java through Manual Instrumentation
private: true
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/tracing/service_catalog/'
      tag: 'Documentation'
      text: 'Service Catalog'
---

<div class="alert alert-info">Manual instrumentation is available for Java. For a list of technologies supported in Java today, see <a href="/data_streams/#setup">Data Streams Monitoring Setup</a>.<br /><br />If you're interested in manual instrumentation for additional languages, reach out to support@datadoghq.com.</div>

Data Streams Monitoring propagates context through message headers. If you use a message queue technology that is not yet supported by DSM, a technology without headers (such as Kinesis), or lambdas, use manual instrumentation to set up Data Streams Monitoring.

### Manual instrumentation installation

1. Ensure you're using the [Datadog Agent v7.34.0 or later][1].

2. On services sending or consuming messages, declare the supported types. For example:
{{< code-block lang="text" >}}
kinesis, kafka, rabbitmq, sqs, sns
{{< /code-block >}}

3. Call the Data Streams Monitoring checkpoints when messages are produced and when they are consumed, as shown in the example code below:

   {{< code-block lang="shell" >}}
import datadog.trace.api.experimental.*;
​​
Carrier headersAdapter = new Carrier(headers);
​
# Before calling database PUT
DataStreamsCheckpointer.get().setProduceCheckpoint("<database-type>", "<topic-name>", headersAdapter);
​
# After calling database GET
DataStreamsCheckpointer.get().setConsumeCheckpoint("<database-type>", "<topic-name>", headersAdapter);

# Replace Headers with whatever you're using to pass the context
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/java/
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
