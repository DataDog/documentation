---
title: Datadog-RabbitMQ Integration
integration_title: RabbitMQ
git_integration_title: rabbitmq
kind: integration
---

### Overview

Connect RabbitMQ to Datadog in order to:

  * Visualize RabbitMQ performance and utilization.
  * Correlate the performance of RabbitMQ with the rest of your applications.

From the open-source Agent:

* [ RabbitMQ YAML example][1]
* [ RabbitMQ checks.d][2]

## Metrics

<%= get_metrics_from_git() %>



By default, `queue` metrics are tagged by queue and `node` metrics are tagged by node. If you have a Datadog account you can see the integration installation instructions [here][3].

   [1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/rabbitmq.yaml.example
   [2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/rabbitmq.py
   [3]: https://app.datadoghq.com/account/settings#integrations/rabbitmq


