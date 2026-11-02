---
description: Logstash ソースを使用して Filebeat から Observability Pipelines にログを送信する方法について説明します。
disable_toc: false
title: Filebeat を使用した Observability Pipelines へのログ送信
---
## 概要{#overview}

Logstash ソースを使用して、Filebeat から Observability Pipelines にログを送信します。

## セットアップ{#setup}

まだセットアップしていない場合は、1. [Filebeat をセットアップ][1]します。
1. `filebeat.yml` ファイルで、
    <br>a.Elasticsearch 出力構成セクションをコメントアウトします。
    <br>b.Logstash 出力セクションのコメントを解除して構成します。
    ```
    # ------------------------------ Logstash Output -------------------------------
    output.logstash:
    # The Logstash hosts
    hosts: ["<OPW_HOST>:9997"]
    ```
    `<OPW_HOST>` is the host IP address or the load balancer URL associated with the Observability Pipelines Worker.

    For CloudFormation installs, use the `LoadBalancerDNS` CloudFormation output for the URL.

    For Kubernetes installs, you can use the internal DNS record of the Observability Pipelines Worker service. For example: `opw-observability-pipelines-worker.default.svc.cluster.local`.
1. Logstash ソースを使用して[パイプラインをセットアップ][2]します。

## 健全性メトリクス{#health-metrics}

すべてのソースから送信される[コンポーネントメトリクス][3]および[ソースバッファメトリクス][4]については、[パイプライン使用状況メトリクス][5]のドキュメントを参照してください。Filebeat ソースは Logstash ソースを使用します。Logstash ソースのメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:logstash` を使用します。

[1]: https://www.elastic.co/guide/en/beats/filebeat/current/setup-repositories.html
[2]: /ja/observability_pipelines/configuration/set_up_pipelines/
[3]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[5]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/