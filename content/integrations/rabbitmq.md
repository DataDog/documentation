---
title: Datadog-RabbitMQ Integration
integration_title: RabbitMQ
git_integration_title: rabbitmq
kind: integration
newhlevel: true
updated_for_agent: 5.8.5
---
## Overview

{{< img src="rabbitmqdashboard.png" alt="RabbitMQ Dashboard" >}}

Connect RabbitMQ to Datadog in order to:

* Visualize RabbitMQ performance and utilization.
* Correlate the performance of RabbitMQ with the rest of your applications.

## Installation

The RabbitMQ check requires the Management Plugin. Refer to [the RabbitMQ documentation](https://www.rabbitmq.com/management.html) for information on how to install the plugin.

## Configuration

1.  Configure the Agent to connect to RabbitMQ. Edit conf.d/rabbitmq.yaml

        init_config:

        instances:
          - rabbitmq_api_url: http://localhost:15672/api/
            rabbitmq_user: guest
            rabbitmq_pass: guest
            tag_families: true
            nodes:
              - rabbit@localhost
            queues:
              - queue1
            vhosts:
              - vhost1



1.  Restart the Agent

### Configuration Options

* `rabbitmq_api_url` - **required** - Points to the api url of the [RabbitMQ Managment Plugin](http://www.rabbitmq.com/management.html)
* `rabbitmq_user` - **optional** - Defaults to 'guest'
* `rabbitmq_pass` - **optional** - Defaults to 'guest'
* `tag_families` - **optional** - Defaults to false - Tag queue "families" based off of regex matching
* `nodes` or `nodes_regexes` - **optional** - Use the `nodes` or `nodes_regexes` parameters to specify the nodes you'd like to collect metrics on (up to 100 nodes). If you have less than 100 nodes, you don't have to set this parameter, the metrics will be collected on all the nodes by default. See the link to the example YAML below for more.
* `queues` or `queues_regexes` - **optional** - Use the `queues` or `queues_regexes` parameters to specify the queues you'd like to collect metrics on (up to 200 queues). If you have less than 200 queues, you don't have to set this parameter, the metrics will be collected on all the queues by. default. If you have set up vhosts, set the queue names as `vhost_name/queue_name`. If you have `tag_families` enabled, the first captured group in the regex will be used as the queue_family tag.  See the link to the example YAML below for more.
* `vhosts` - **optional** - By default a list of all vhosts is fetched and each one will be checked using the aliveness API. If you prefer only certain vhosts to be monitored with service checks then you can list the vhosts you care about.

{{< insert-example-links >}}


## Validation

1.  Execute the info command and verify that the integration check has passed. The output of the command should contain a section similar to the following:

        Checks
        ======

        [...]

        rabbitmq
        --------
          - instance #0 [OK]
          - Collected 8 metrics & 0 events

## Metrics

{{< get-metrics-from-git >}}



By default, `queue` metrics are tagged by queue and `node` metrics are tagged by node. If you have a Datadog account you can see the integration installation instructions [here][3].

   [3]: https://app.datadoghq.com/account/settings#integrations/rabbitmq


