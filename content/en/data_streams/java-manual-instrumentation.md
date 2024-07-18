---
title: Setup Data Streams Monitoring for Java through Manual Instrumentation
further_reading:
    - link: '/integrations/kafka/'
      tag: 'Documentation'
      text: 'Kafka Integration'
    - link: '/tracing/service_catalog/'
      tag: 'Documentation'
      text: 'Service Catalog'
---

Data Streams Monitoring propagates context through message headers. If you use a message queue technology that is not yet supported by DSM, a technology without headers like Kinesis, or lambdas, use manual instrumentation to set up Data Streams Monitoring. Manual instrumentation is currently available for Java. For a list of technologies supported in Java today. visit [here][6].

If you’re interested in manual instrumentation for additional languages, reach out to support@datadoghq.com. 


### Installation

To use manual instrumentation for Data Streams Monitoring:

1. Ensure you're using the [Datadog Agent v7.34.0 or later][1]

2. Declare supported types, for example:
```
  kinesis, kafka, rabbitmq, sqs, sns
```

2. Call the Data Streams Monitoring checkpoints at the point of when messages are produced and when they are consumed. Below are example code snippets:
   
```bash
import datadog.trace.api.experimental.*;
​​
Carrier headersAdapter = new Carrier(headers);
​
# before calling database PUT
DataStreamsCheckpointer.get().setProduceCheckpoint("<database-type>", "<topic-name>", headersAdapter);
​
# after calling database GET
DataStreamsCheckpointer.get().setConsumeCheckpoint("<database-type>", "<topic-name>", headersAdapter);

# replace Headers with whatever you're using to pass the context
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

```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /tracing/trace_collection/dd_libraries/java/
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[6]: /data_streams/#setup
