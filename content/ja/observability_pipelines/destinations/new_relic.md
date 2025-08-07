---
disable_toc: false
title: New Relic Destination
---

Observability Pipelines の New Relic Destination を使用して、ログを New Relic に送信します。

## セットアップ

[パイプラインをセットアップする][1] 際に、New Relic Destination とその環境変数を設定します。以下の情報は Pipelines UI で構成します。

### Set up the destination

{{% observability_pipelines/destination_settings/new_relic %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/new_relic %}}

## How the destination works

### イベントのバッチ処理

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | タイムアウト (秒)   |
|----------------|-----------------|---------------------|
| 100            | 1,000,000       | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching