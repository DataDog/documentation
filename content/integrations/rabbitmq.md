---
title: Datadog-RabbitMQ Integration
integration_title: RabbitMQ

kind: integration
---

<div id="int-overview">
<h3>Overview</h3>

Connect RabbitMQ to Datadog in order to:
<ul>
<li> Visualize RabbitMQ performance and utilization.</li>
<li> Correlate the performance of RabbitMQ with the rest of your applications.</li>
</ul>
</div>

From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/rabbitmq.yaml.example">
RabbitMQ YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/rabbitmq.py">
RabbitMQ checks.d</a>

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


By default, <code>queue</code> metrics are tagged by queue and <code>node</code> metrics are tagged by node.

If you have a Datadog account you can see the integration installation instructions
<a href="https://app.datadoghq.com/account/settings#integrations/rabbitmq">here</a>.


