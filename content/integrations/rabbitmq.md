---
title: Datadog-RabbitMQ Integration
integration_title: RabbitMQ
integration_stub: rabbitmq
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

    rabbitmq.node.disk_free
    rabbitmq.node.disk_free_limit
    rabbitmq.node.fd_used
    rabbitmq.node.fd_total
    rabbitmq.node.mem_limit
    rabbitmq.node.mem_used
    rabbitmq.node.run_queue
    rabbitmq.node.sockets_total
    rabbitmq.node.sockets_used
    rabbitmq.queue.active_consumers
    rabbitmq.queue.consumers
    rabbitmq.queue.memory
    rabbitmq.queue.messages
    rabbitmq.queue.messages_ready
    rabbitmq.queue.messages_unacknowledged


By default, <code>queue</code> metrics are tagged by queue and <code>node</code> metrics are tagged by node.

If you have a Datadog account you can see the integration installation instructions
<a href="https://app.datadoghq.com/account/settings#integrations/rabbitmq">here</a>.


