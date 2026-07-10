---
disable_toc: false
title: Amazon OpenSearch Destination
---

Observability Pipelines の Amazon OpenSearch Destination を使用して、ログを Amazon OpenSearch に送信します。

## セットアップ

[パイプラインをセットアップする][1] 際に、Amazon OpenSearch Destination とその環境変数を設定します。以下の情報は Pipelines UI で構成します。

### Set up the destination

{{% observability_pipelines/destination_settings/amazon_opensearch %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/amazon_opensearch %}}

## Destination の動作

### イベントのバッチ処理

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | タイムアウト (秒)   |
|----------------|-----------------|---------------------|
| なし           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching