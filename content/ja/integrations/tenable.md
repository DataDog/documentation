---
app_id: tenable
app_uuid: 09a46b1b-a940-4aba-8e9f-bde9e5ae2c3f
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10089
    source_type_name: Tenable
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tenable/README.md
display_on_public_website: true
draft: false
git_integration_title: tenable
integration_id: tenable
integration_title: Tenable Nessus
integration_version: 1.5.0
is_public: true
manifest_version: 2.0.0
name: tenable
public_title: Tenable Nessus
short_description: Track nessus backend and webserver logs
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Log Collection
  configuration: README.md#Setup
  description: Track nessus backend and webserver logs
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Tenable Nessus
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

このインテグレーションは、Datadog Agent を通じて [Tenable Nessus][1] のログを監視します。

## セットアップ

以下の手順に従って、ホストで稼働中の Agent に対して、このインテグレーションを構成します。

### インストール

Tenable インテグレーションのコンフィギュレーションを Agent にインストールします。

**注**: Agent のバージョンが 7.18.0 以上であれば、この手順は必要ありません。

1. 1.0 のリリースを[インストール][2]します（`tenable==1.0.0`）。

### 構成

Agent は Tenable Nessus の `webserver` と `backend` のログを追跡し、Nessus スキャンのデータを収集します。

#### ログ収集

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
2. Nessus Web サーバーログには、クライアント IP、ユーザー Agent、ログインの試行、成功、失敗など、Nessus Web サーバーに対するアクセスログのデータが収集されます。

### メトリクス

このインテグレーションには、メトリクスは含まれません。

### イベント

このインテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://www.tenable.com/products/nessus
[2]: https://docs.datadoghq.com/ja/agent/guide/integration-management/#install
[3]: https://github.com/DataDog/integrations-core/blob/master/tenable/datadog_checks/tenable/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/help/