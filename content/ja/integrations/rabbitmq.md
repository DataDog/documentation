---
last_modified: 2015/07/16
translation_status: complete
language: ja
title: Datadog-RabbitMQ Integration
integration_title: RabbitMQ
doclevel: basic
kind: integration
---

<!-- ### Overview
{:#int-overview}

Connect RabbitMQ to Datadog in order to:

- Visualize RabbitMQ performance and utilization.
- Correlate the performance of RabbitMQ with the rest of your applications. -->

### 概要
{:#int-overview}

次の目的の為に、RabbitMQのメトリクスをDatadogに送信します:

- RabbitMQのパフォーマンスの可視化する
- RabbitMQのパフォーマンス情報と他のアプリケーションの情報を連携し状況を把握する


<!-- From the open-source Agent:

* [RabbitMQ YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/rabbitmq.yaml.example)
* [RabbitMQ checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/rabbitmq.py) -->

Datadog Agentの設定ファイルサンプルとメトリクス取得プログラム:

* [RabbitMQインテグレーションの設定ファイルサンプル](https://github.com/DataDog/dd-agent/blob/master/conf.d/rabbitmq.yaml.example)
* [RabbitMQインテグレーション　checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/rabbitmq.py)


<!-- The following metrics are collected by default with the RabbitMQ integration:

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
    rabbitmq.queue.messages_unacknowledged -->

RabbitMQインテグレーションがデフォルトで取得しているメトリクス:

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


<!-- By default, `queue` metrics are tagged by queue and `node` metrics are tagged by node.

If you have a Datadog account you can see the integration installation instructions [here](https://app.datadoghq.com/account/settings#integrations/rabbitmq). -->

初期設定で、`queue`メトリクスは"queue"、`node`メトリクスは"node"とタグ付けされています。

### 設定
{:#configuration}

*RabbitMQインテグレーションを利用する為には、Datadog Agent >= 3.5.0が必要です。*

1. RabbitMQには、[Management Plugin](http://www.rabbitmq.com/management.html)が設定されている必要があります。

2. Datadog Agentの設定ファイルを編集し、RabbitMQに接続できるように設定します。

    conf.d/rabbitmq.yaml編集します。

        init_config:

        instances:
            -  rabbitmq_api_url: http://localhost:15672/api/
               rabbitmq_user: username # defaults to 'guest'
               rabbitmq_pass: password # defaults to 'guest'

2. Datadog Agentを再起動します。

        sudo /etc/init.d/datadog-agent restart

3. infoコマンドを実行し、設定を確認します。

        sudo /etc/init.d/datadog-agent info

    コマンド出力に次のようなセクションが含まれていれば、設定は完了しています。

        Checks
        ======

          [...]

          rabbitmq
          --------
              - instance #0 [OK]
              - Collected 8 metrics & 0 events
