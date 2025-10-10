---
disable_toc: false
title: Syslog Destinations
---

Observability Pipelines の syslog Destination を使用して、ログを rsyslog または syslog-ng に送信します。

## セットアップ

[パイプラインをセットアップする][1] 際に、rsyslog または syslog-ng Destination とその環境変数を設定します。以下の情報は Pipelines UI で構成します。

### Set up the destination

{{% observability_pipelines/destination_settings/syslog %}}

### Set the environment variables

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

### Destination の動作

#### イベントのバッチ処理

rsyslog と syslog-ng の Destination ではイベントをバッチ処理しません。

[1]: https://app.datadoghq.com/observability-pipelines