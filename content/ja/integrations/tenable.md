---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: tenable
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/tenable/README.md'
display_name: Tenable
draft: false
git_integration_title: tenable
guid: 303a1ba9-5136-4d23-9785-e36ea0d6caab
integration_id: tenable
integration_title: Tenable Nessus
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: tenable.
metric_to_check: ''
name: tenable
public_title: Datadog-Tenable Nessus インテグレーション
short_description: Nessus のバックエンドと Web サーバーのログを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このインテグレーションは、Datadog Agent を通じて [Tenable Nessus][1] のログを監視します。

## セットアップ

以下の手順に従って、ホストで稼働中の Agent に対して、このインテグレーションを構成します。

### インストール

Tenable インテグレーションのコンフィギュレーションを Agent にインストールします。

**注**: Agent のバージョンが 7.18.0 以上であれば、この手順は必要ありません。

1. 1.0 のリリースを[インストール][2]します（`tenable==1.0.0`）。

### コンフィギュレーション

Agent は Tenable Nessus の `webserver` と `backend` のログを追跡し、Nessus スキャンのデータを収集します。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. `tenable.d/conf.yaml` の一番下のコンフィギュレーションブロックをコメント解除し、編集します。

   使用可能なコンフィギュレーションオプションの詳細については、[tenable.d/conf.yaml のサンプル][3]を参照してください。

   ```yaml
      logs:
       - type: file
         path: /opt/nessus/var/nessus/logs/backend.log
         service: nessus_backend
         source: tenable

       - type: file
         path: /opt/nessus/var/nessus/logs/www_server.log
         service: nessus_webserver
         source: tenable
   ```

    必要であれば、`path` パラメーターと `service` パラメーターの値を、環境に合わせて変更してください。

3. [Agent を再起動します][4]。

#### 収集されるログデータ

1. Nessus のバックエンドログには、スキャン名、開始時間、停止時間、期間、ターゲットに関するデータが収集されます。
2. Nessus Web サーバーログには、クライアント IP、ユーザーエージェント、ログインの試行、成功、失敗など、Nessus Web サーバーに対するアクセスログのデータが収集されます。

### メトリクス

このインテグレーションには、メトリクスは含まれません。

### イベント

このインテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://www.tenable.com/products/nessus
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/#install
[3]: https://github.com/DataDog/integrations-core/blob/master/tenable/datadog_checks/tenable/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/help/