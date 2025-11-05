---
disable_toc: false
title: Elasticsearch Destination
---

Observability Pipelines の Elasticsearch Destination を使用して、ログを Elasticsearch に送信します。

## セットアップ

[パイプラインをセットアップする][1] 際に、Elasticsearch Destination とその環境変数を設定します。以下の情報は Pipelines UI で構成します。

### Destination を設定する

{{% observability_pipelines/destination_settings/elasticsearch %}}

### 環境変数を設定する

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/elasticsearch %}}

## Destination の動作

### イベントのバッチ処理

以下のいずれかのパラメーターを満たすと、イベントのバッチがフラッシュされます。詳細は [イベントのバッチ処理][2] を参照してください。

| Max Events     | Max Bytes       | タイムアウト (秒)   |
|----------------|-----------------|---------------------|
| なし           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching