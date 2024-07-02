---
"app_id": "boundary"
"app_uuid": "61898266-9c80-442d-89d3-22e7aeeafb94"
"assets":
  "dashboards":
    "Boundary Overview": assets/dashboards/boundary_overview.json
  "integration":
    "auto_install": true
    "configuration":
      "spec": assets/configuration/spec.yaml
    "events":
      "creates_events": false
    "metrics":
      "check": boundary.worker.proxy.websocket.active_connections
      "metadata_path": metadata.csv
      "prefix": boundary.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10280"
    "source_type_name": Boundary
  "monitors":
    "[Boundary] High active connections": assets/monitors/active_connections.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- configuration & deployment
- log collection
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/boundary/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "boundary"
"integration_id": "boundary"
"integration_title": "Boundary"
"integration_version": "2.2.2"
"is_public": true
"manifest_version": "2.0.0"
"name": "boundary"
"public_title": "Boundary"
"short_description": "Monitor Boundary controllers and workers."
"supported_os":
- linux
- windows
- macos
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Category::Configuration & Deployment"
  - "Category::Log Collection"
  "configuration": "README.md#Setup"
  "description": Monitor Boundary controllers and workers.
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Boundary
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Boundary][1] を監視するものです。Boundary の最小サポートバージョンは、`0.8.0` です。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Boundary チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### 構成

#### リスナー

メトリクスを収集できるようにするには、`config.hcl` ファイルに `ops` 目的のリスナーを設定する必要があります。以下はリスナーのスタンザの例です。

```hcl
controller {
  name = "boundary-controller"
  database {
    url = "postgresql://<username>:<password>@10.0.0.1:5432/<database_name>"
  }
}

listener "tcp" {
  purpose = "api"
  tls_disable = true
}

listener "tcp" {
  purpose = "ops"
  tls_disable = true
}
```

コントローラーがシャットダウンしているとき、`boundary.controller.health` [サービスチェック](#service-checks)は `WARNING` として送信されます。このシャットダウン猶予期間を有効にするには、`controller` ブロックを更新して、待ち時間を定義します。

```hcl
controller {
  name = "boundary-controller"
  database {
    url = "env://BOUNDARY_PG_URL"
  }
  graceful_shutdown_wait_duration = "10s"
}
```

#### Datadog Agent

1. boundary のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `boundary.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[boundary.d/conf.yaml のサンプル][4]を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `boundary` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "boundary" >}}


### イベント

Boundary インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "boundary" >}}


### ログ収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. To start collecting your Boundary logs, add this configuration block to your `boundary.d/conf.yaml` file:

    ```yaml
    logs:
       - type: file
         source: boundary
         path: /var/log/boundary/events.ndjson
    ```

    Change the `path` parameter value based on your environment. See the [sample `boundary.d/conf.yaml` file][4] for all available configuration options.

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://www.boundaryproject.io
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/boundary/datadog_checks/boundary/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/boundary/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/boundary/assets/service_checks.json
[9]: https://docs.datadoghq.com/help/

