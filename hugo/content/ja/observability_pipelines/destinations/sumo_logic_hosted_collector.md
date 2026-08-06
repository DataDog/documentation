---
disable_toc: false
title: Sumo Logic Hosted Collector Destination
---

Observability Pipelines の Sumo Logic Destination を使用して、ログを Sumo Logic Hosted Collector に送信します。

## セットアップ

[パイプラインをセットアップする][1] 際に、Sumo Logic Destination とその環境変数を設定します。以下の情報は Pipelines UI で構成します。

### Set up the destination

{{% observability_pipelines/destination_settings/sumo_logic %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/sumo_logic %}}

## How the destination works

### イベントのバッチ処理

A batch of events is flushed when one of these parameters is met. See [event batching][2] for more information.

| Max Events     | Max Bytes       | タイムアウト (秒)   |
|----------------|-----------------|---------------------|
| なし           | 10,000,000      | 1                   |

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/destinations/#event-batching