---
disable_toc: false
title: Splunk HTTP Event Collector (HEC) Destination
---

Observability Pipelines の Splunk HTTP Event Collector (HEC) Destination を使用して、ログを Splunk HEC に送信します。

## セットアップ

[パイプラインをセットアップする][1] 際に、Splunk HEC Destination とその環境変数を設定します。以下の情報は Pipelines UI で構成します。

### Set up the destination

{{% observability_pipelines/destination_settings/splunk_hec %}}

### 環境変数を設定する

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/splunk_hec %}}

### Destination の動作

#### イベントのバッチ処理

以下のいずれかのパラメーターを満たすと、イベントのバッチがフラッシュされます。詳細は [イベントのバッチ処理][2] を参照してください。

| Max Events     | Max Bytes       | タイムアウト (秒)   |
|----------------|-----------------|---------------------|
| なし           | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching