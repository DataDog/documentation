---
aliases:
- /fr/data_streams/java_manual_instrumentation
further_reading:
- link: /integrations/kafka/
  tag: Documentation
  text: Intégration Kafka
- link: /tracing/software_catalog/
  tag: Documentation
  text: Software Catalog
private: true
title: Configurer Data Streams Monitoring via l'instrumentation manuelle
---

Data Streams Monitoring (DSM) suit la façon dont les données circulent dans les files d'attente et les services. Si votre système de messagerie **n'est pas pris en charge automatiquement** (par exemple, votre technologie de file d'attente et votre langage ne sont pas instrumentés, ou la bibliothèque que vous utilisez dans le langage n'est pas instrumentée automatiquement), vous devez **enregistrer manuellement des checkpoints** pour que DSM puisse connecter les producteurs et les consommateurs.

- **Checkpoint produce** : enregistre le moment où un message est publié et injecte le contexte DSM dans le message.
- **Checkpoint consume** : enregistre le moment où un message est reçu, extrait le contexte DSM s'il existe et prépare les futurs checkpoints produce à transmettre ce contexte.

**Le contexte DSM doit voyager _avec le message_**. Si votre système prend en charge les en-têtes, stockez-le à cet endroit. Sinon, intégrez-le directement dans la charge utile.

### Installation de l'instrumentation manuelle
Assurez-vous d'utiliser l'[Agent Datadog v7.34.0 ou version ultérieure][1].


{{< tabs >}}
{{% tab "Java" %}}
## Référence de l'API

### `DataStreamsCheckpointer.get().setProduceCheckpoint(queueType, name, carrier)`
- **queueType** : système de messagerie (par exemple `kafka`, `rabbitmq`, `sqs`, `sns`, `kinesis`, `servicebus`). Les chaînes reconnues font apparaître des métriques DSM spécifiques au système ; les autres chaînes sont autorisées.
- **name** : nom de la file d'attente, du topic ou de l'abonnement.
- **carrier** : une implémentation de `DataStreamsContextCarrier`. C'est là où le contexte DSM est **stocké** avec le message (généralement un mappage d'en-têtes, mais il peut s'agir de champs de charge utile si aucun en-tête n'existe).

### `DataStreamsCheckpointer.get().setConsumeCheckpoint(queueType, name, carrier)`
- **queueType** : identique au producteur.
- **name** : identique au producteur.
- **carrier** : une implémentation de `DataStreamsContextCarrier`. C'est là où le contexte DSM est **récupéré** depuis le message.

- **Remarque** : ce checkpoint effectue deux actions : il relie le message actuel au flux de données et prépare ce consommateur à transmettre automatiquement le contexte aux messages qu'il produit ensuite.

---

## Exemples en contexte (bloc unique)

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
## Référence de l'API

### `tracer.dataStreamsCheckpointer.setProduceCheckpoint(queueType, name, carrier)`
- **queueType** : système de messagerie (par exemple `rabbitmq`, `kafka`, `sqs`, `sns`, `kinesis`, `servicebus`). Les chaînes reconnues font apparaître des métriques DSM spécifiques au système ; les autres chaînes sont autorisées.
- **name** : nom de la file d'attente, du topic ou de l'abonnement.
- **carrier** : conteneur clé/valeur accessible en écriture pour **stocker** le contexte DSM avec le message (objet d'en-têtes si pris en charge ; sinon, ajoutez des champs à la charge utile).

### `tracer.dataStreamsCheckpointer.setConsumeCheckpoint(queueType, name, carrier)`
- **queueType** : même valeur que celle utilisée par le producteur (chaînes reconnues recommandées, autres chaînes autorisées).
- **name** : même nom de file d'attente, de topic ou d'abonnement.
- **carrier** : conteneur clé/valeur accessible en lecture pour **récupérer** le contexte DSM depuis le message (objet d'en-têtes si pris en charge ; sinon, la charge utile analysée).

**Remarque** : ce checkpoint effectue deux actions : il relie le message actuel au flux de données et prépare ce consommateur à transmettre automatiquement le contexte aux messages qu'il produit ensuite.

## Exemples en contexte (bloc unique)

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
## Référence de l'API

### `set_produce_checkpoint(queue_type, name, setter)`
- **queue_type** : système de messagerie (par exemple `kafka`, `rabbitmq`, `sqs`, `sns`, `kinesis`, `servicebus`). Les chaînes reconnues font apparaître des métriques DSM spécifiques au système ; les autres chaînes sont autorisées.
- **name** : nom de la file d'attente, du topic ou de l'abonnement.
- **setter** : un callable `(key, value)` utilisé pour **stocker** le contexte DSM dans le message.
  - Si les en-têtes sont pris en charge : utilisez `headers.setdefault`.
  - Sinon, utilisez une fonction qui écrit dans la charge utile du message (comme un champ JSON).

### `set_consume_checkpoint(queue_type, name, getter)`
- **queue_type** : identique au producteur.
- **name** : identique au producteur.
- **getter** : un callable `(key)` utilisé pour **récupérer** le contexte DSM depuis le message.
  - Si les en-têtes sont pris en charge : utilisez `headers.get`.
  - Sinon, utilisez une fonction qui lit depuis la charge utile.

**Remarque** : ce checkpoint effectue deux actions : il relie le message actuel au flux de données et prépare ce consommateur à transmettre automatiquement le contexte aux messages qu'il produit ensuite. 

---

## Exemples en contexte (bloc unique)

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
## Référence de l'API

### `Datadog::DataStreams.set_produce_checkpoint(queue_type, name, &block)`
- **queue_type** : le système de messagerie (par exemple `rabbitmq`, `kafka`, `sqs`, `sns`, `kinesis`, `servicebus`). L'utilisation d'un queue_type reconnu permet de faire apparaître les métriques liées à ce système dans Data Streams, mais les autres chaînes sont autorisées si nécessaire.
- **name** : le nom de la file d'attente, du topic ou de l'abonnement.
- **block** : yield `(key, pathway_context)`. Votre bloc doit *stocker* le contexte DSM avec le message, sous la clé donnée.
  - Si les en-têtes sont pris en charge, placez-le dans les en-têtes.
  - Sinon, intégrez-le dans la charge utile.

### `Datadog::DataStreams.set_consume_checkpoint(queue_type, name, &block)`
- **queue_type** : même système de messagerie que le producteur. L'utilisation d'un queue_type reconnu permet de faire apparaître les métriques liées à ce système dans Data Streams, mais les autres chaînes sont également autorisées.
- **name** : même nom de file d'attente, de topic ou d'abonnement.
- **block** : yield `(key)`. Votre bloc doit *récupérer* le contexte DSM depuis le message.
  - Quelle que soit la méthode utilisée (en-tête ou corps du message) lors de la production du message.

**Remarque** : ce checkpoint effectue deux actions : il relie le message actuel au flux de données et prépare ce consommateur à transmettre automatiquement le contexte aux messages qu'il produit ensuite. 

---

## Exemples en contexte

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
## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent
[2]: /fr/tracing/trace_collection/dd_libraries/java/
[3]: https://pypi.org/project/confluent-kafka/
[4]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html
[5]: /fr/remote_configuration