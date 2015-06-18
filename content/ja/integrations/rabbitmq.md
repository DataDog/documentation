---
last_modified: 2015/03/31
translation_status: original
language: ja
last_modified: 2015/03/31
title: Datadog-RabbitMQ Integration
---

### Overview
{:#int-overview}

Connect RabbitMQ to Datadog in order to:

- Visualize RabbitMQ performance and utilization.
- Correlate the performance of RabbitMQ with the rest of your applications.


From the open-source Agent:

* [RabbitMQ YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/rabbitmq.yaml.example)
* [RabbitMQ checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/rabbitmq.py)

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


By default, `queue` metrics are tagged by queue and `node` metrics are tagged by node.

If you have a Datadog account you can see the integration installation instructions [here](https://app.datadoghq.com/account/settings#integrations/rabbitmq).
