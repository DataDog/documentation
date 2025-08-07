---
disable_toc: false
title: OpenSearch Destination
---

Observability Pipelines の OpenSearch Destination を使用して、ログを OpenSearch に送信します。

## セットアップ

[パイプラインをセットアップする][1] 際に、OpenSearch Destination とその環境変数を設定します。以下の情報は Pipelines UI で構成します。

### Set up the destination

{{% observability_pipelines/destination_settings/opensearch %}}

### 環境変数を設定する

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/opensearch %}}

## Destination の動作

### イベントのバッチ処理

以下のいずれかのパラメーターを満たすと、イベントのバッチがフラッシュされます。詳細は [イベントのバッチ処理][2] を参照してください。

| Max Events     | Max Bytes       | タイムアウト (秒)   |
|----------------|-----------------|---------------------|
| なし           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching