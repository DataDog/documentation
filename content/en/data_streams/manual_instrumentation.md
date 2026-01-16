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

Data Streams Monitoring (DSM) tracks how data flows through queues and services. If your message system is **not automatically supported** (for example, your queue technology and language is not instrumented or the library you use in the language isn't automatically instrumented), you must **manually record checkpoints** so DSM can connect producers and consumers.

- **Produce checkpoint**: records when a message is published, injects DSM context into the message.
- **Consume checkpoint**: records when a message is received, extracting the DSM context if it exists, and prepares future produce checkpoints to carry that context forward.

**The DSM context must travel _with the message_**. If your system supports headers, store it there. Otherwise, embed it directly in the payload.

### Manual instrumentation installation
Ensure you're using the [Datadog Agent v7.34.0 or later][1].


{{< tabs >}}
{{% tab "Java" %}}
## API reference

### `DataStreamsCheckpointer.get().setProduceCheckpoint(queueType, name, carrier)`
- **queueType**: message system (for example `kafka`, `rabbitmq`, `sqs`, `sns`, `kinesis`, `servicebus`). Recognized strings surface system-specific DSM metrics; other strings are allowed.
- **name**: queue, topic, or subscription name.
- **carrier**: an implementation of `DataStreamsContextCarrier`. This is where DSM context is **stored** with the message (typically a headers map, but could be payload fields if no headers exist).

### `DataStreamsCheckpointer.get().setConsumeCheckpoint(queueType, name, carrier)`
- **queueType**: same as producer.
- **name**: same as producer.
- **carrier**: an implementation of `DataStreamsContextCarrier`. This is where DSM context is **retrieved** from the message.

- **Note**: This checkpoint does two things: it links the current message to the data stream, and it prepares this consumer to automatically pass the context to any messages it produces next.

---

## Examples in context (single block)

{{< code-block lang="java" >}}
import datadog.trace.api.experimental.*;
import java.util.*;

// ==========================
// producer-service.java
// ==========================
public class ProducerService {
    private final Channel channel;   // your MQ/Kafka/etc. client

    public ProducerService(Channel channel) {
        this.channel = channel;
    }

    public void publishOrder(Order order) {
        Headers headers = new Headers(); // your header structure
        Carrier headersAdapter = new Carrier(headers);

        // Mark DSM produce checkpoint right before sending the message.
        DataStreamsCheckpointer.get().setProduceCheckpoint(
            "kafka",     // queueType
            "orders",    // name
            headersAdapter
        );

        // Send the message with DSM context attached.
        String payload = serialize(order);
        channel.send("orders", payload, headers);
    }
}

// ==========================
// consumer-service.java
// ==========================
public class ConsumerService {
    public void handleMessage(String payload, Headers headers) {
        Carrier headersAdapter = new Carrier(headers);

        // Mark DSM consume checkpoint when receiving the message.
        DataStreamsCheckpointer.get().setConsumeCheckpoint(
            "kafka",     // queueType (match producer)
            "orders",    // name (match producer)
            headersAdapter
        );

        // Continue with your application logic.
        Order order = deserialize(payload);
        processOrder(order);
    }
}

// ==========================
// carrier implementation
// ==========================
private class Carrier implements DataStreamsContextCarrier {
    private Headers headers;

    public Carrier(Headers headers) {
        this.headers = headers;
    }

    @Override
    public Set<Map.Entry<String, Object>> entries() {
        return this.headers.entrySet();
    }

    @Override
    public void set(String key, String value) {
        this.headers.put(key, value);
    }
}
{{< /code-block >}}
{{% /tab %}}
{{% tab "Node.js" %}}
## API reference

### `tracer.dataStreamsCheckpointer.setProduceCheckpoint(queueType, name, carrier)`
- **queueType**: message system (for example `rabbitmq`, `kafka`, `sqs`, `sns`, `kinesis`, `servicebus`). Recognized strings surface system-specific DSM metrics; other strings are allowed.
- **name**: queue, topic, or subscription name.
- **carrier**: writeable key/value container to **store** DSM context with the message (headers object if supported; otherwise add fields to the payload).

### `tracer.dataStreamsCheckpointer.setConsumeCheckpoint(queueType, name, carrier)`
- **queueType**: same value used by the producer (recognized strings preferred, other strings allowed).
- **name**: same queue, topic, or subscription name.
- **carrier**: readable key/value container to **retrieve** DSM context from the message (headers object if supported; otherwise the parsed payload).

**Note**: This checkpoint does two things: it links the current message to the data stream, and it prepares this consumer to automatically pass the context to any messages it produces next.

## Examples in context (single block)

{{< code-block lang="js" >}}
// ==========================
// producer-service.js
// ==========================
const tracer = require('dd-trace').init({}) // init in the producer service

async function publishOrder(order, channel) {
  // Use headers if supported; otherwise embed context in the payload.
  const headers = {}

  // Mark DSM produce checkpoint right before sending the message.
  tracer.dataStreamsCheckpointer.setProduceCheckpoint(
    'rabbitmq',   // queueType
    'orders',     // name
    headers       // carrier: where DSM context will be stored
  )

  // Send the message with DSM context attached.
  const payload = JSON.stringify(order)
  publisher.publish('orders', Buffer.from(payload), { headers })
}

// ==========================
// consumer-service.js
// ==========================
const tracer = require('dd-trace').init({}) // init in the consumer service

function handleMessage(msg) {
  // Retrieve DSM context at the top of your handler.
  // If headers aren't supported, build a carrier that reads from your payload.
  const headers = msg.properties?.headers || {}

  tracer.dataStreamsCheckpointer.setConsumeCheckpoint(
    'rabbitmq',   // queueType (match producer)
    'orders',     // name (match producer)
    headers       // carrier: where DSM context was stored
  )

  // Continue with application logic.
  const body = JSON.parse(msg.content.toString())
  processOrder(body)
}
{{< /code-block >}}
{{% /tab %}}
{{% tab "Python" %}}
## API reference

### `set_produce_checkpoint(queue_type, name, setter)`
- **queue_type**: message system (for example `kafka`, `rabbitmq`, `sqs`, `sns`, `kinesis`, `servicebus`). Recognized strings surface system-specific DSM metrics; other strings are allowed.
- **name**: queue, topic, or subscription name.
- **setter**: a callable `(key, value)` used to **store** DSM context in the message.
  - If headers are supported: use `headers.setdefault`.
  - If not: use a function that writes into the message payload (like a JSON field).

### `set_consume_checkpoint(queue_type, name, getter)`
- **queue_type**: same as producer.
- **name**: same as producer.
- **getter**: a callable `(key)` used to **retrieve** DSM context from the message.
  - If headers are supported: use `headers.get`.
  - If not: use a function that reads from the payload.

**Note**: This checkpoint does two things: it links the current message to the data stream, and it prepares this consumer to automatically pass the context to any messages it produces next.

---

## Examples in context (single block)

{{< code-block lang="python" >}}
# ==========================
# producer_service.py
# ==========================
from ddtrace.data_streams import set_produce_checkpoint

def publish_order(order, channel):
    headers = {}

    # Mark DSM produce checkpoint before sending the message.
    set_produce_checkpoint(
        "rabbitmq",     # queue_type
        "orders",       # name
        headers.setdefault  # setter: store DSM context in headers or payload
    )

    # Send the message with DSM context attached.
    payload = order.to_json()
    publisher.publish(topic="orders", body=payload, properties=headers)


# ==========================
# consumer_service.py
# ==========================
from ddtrace.data_streams import set_consume_checkpoint

def handle_message(message, properties):
    headers = getattr(properties, "headers", {})

    # Mark DSM consume checkpoint when receiving the message.
    set_consume_checkpoint(
        "rabbitmq",     # queue_type (match producer)
        "orders",       # name (match producer)
        headers.get     # getter: retrieve DSM context from headers or payload
    )

    # Continue with your application logic.
    process_order(message)
{{< /code-block >}}
{{% /tab %}}
{{% tab "Ruby" %}}
## API reference

### `Datadog::DataStreams.set_produce_checkpoint(queue_type, name, &block)`
- **queue_type**: the message system (for example `rabbitmq`, `kafka`, `sqs`, `sns`, `kinesis`, `servicebus`). Using a recognized queue_type helps surface metrics related to that system in Data Streams, but other strings are allowed if needed.
- **name**: the queue, topic, or subscription name.
- **block**: yields `(key, pathway_context)`. Your block must *store* the DSM context with the message, under the given key
  - If headers are supported: put it in headers.
  - If not: embed it in the payload.

### `Datadog::DataStreams.set_consume_checkpoint(queue_type, name, &block)`
- **queue_type**: same message system as the producer. Using a recognized queue_type helps surface metrics related to that system in Data Streams, but other strings are also allowed.
- **name**: same queue, topic, or subscription name.
- **block**: yields `(key)`. Your block must *retrieve* the DSM context from the message.
  - Whichever method (header or message body), the message was produced with

**Note**: This checkpoint does two things: it links the current message to the data stream, and it prepares this consumer to automatically pass the context to any messages it produces next.

---

## Examples in context

{{< code-block lang="ruby" >}}
# Producer side

def publish_order(order)
  headers = {}

  # Mark DSM produce checkpoint before sending the message.
  Datadog::DataStreams.set_produce_checkpoint("rabbitmq", "orders") do |key, pathway_context|
    # Store DSM context in the message
    # - If headers supported: headers[key] = pathway_context
    # - If no headers: message[key] = pathway_context
    headers[key] = pathway_context
  end

  # Send the message with DSM context attached
  @publisher.publish(topic: "orders", payload: orders.to_json, headers: headers)
end

# Consumer side

def handle_message(message)
  # Mark DSM consume checkpoint when receiving the message.
  Datadog::DataStreams..set_consume_checkpoint("rabbitmq", "orders") do |key|
    # Retrieve DSM context from the message
    # - If headers supported pull them from there
    # - If no headers:  parsed_message[key]
    message.headers[key]
  end

  # Continue with application logic
  process_order(message.body)
end
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
