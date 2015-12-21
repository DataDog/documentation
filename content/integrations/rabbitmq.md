---
title: Datadog-RabbitMQ Integration
integration_title: RabbitMQ

kind: integration
---

### Overview

Connect RabbitMQ to Datadog in order to:

  * Visualize RabbitMQ performance and utilization.
  * Correlate the performance of RabbitMQ with the rest of your applications.

From the open-source Agent:

* [ RabbitMQ YAML example][1]
* [ RabbitMQ checks.d][2]

The following metrics are collected by default with the RabbitMQ integration:


    rabbitmq.node.fd_used
    rabbitmq.node.mem_used
    rabbitmq.node.run_queue
    rabbitmq.node.sockets_used
    rabbitmq.queue.active_consumers
    rabbitmq.queue.consumers
    rabbitmq.queue.consumer_utilisation
    rabbitmq.queue.memory
    rabbitmq.queue.messages
    rabbitmq.queue.messages.ack.count
    rabbitmq.queue.messages.ack.rate
    rabbitmq.queue.messages.deliver.count
    rabbitmq.queue.messages.deliver.rate
    rabbitmq.queue.messages.deliver_get.count
    rabbitmq.queue.messages.deliver_get.rate
    rabbitmq.queue.messages.publish.count
    rabbitmq.queue.messages.publish.rate
    rabbitmq.queue.messages.rate
    rabbitmq.queue.messages_ready
    rabbitmq.queue.messages_ready.rate
    rabbitmq.queue.messages.redeliver.count
    rabbitmq.queue.messages.redeliver.rate
    rabbitmq.queue.messages_unacknowledged
    rabbitmq.queue.messages_unacknowledged.rate

By default, `queue` metrics are tagged by queue and `node` metrics are tagged by node. If you have a Datadog account you can see the integration installation instructions [here][3].

   [1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/rabbitmq.yaml.example
   [2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/rabbitmq.py
   [3]: https://app.datadoghq.com/account/settings#integrations/rabbitmq


