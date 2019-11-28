---
assets:
  dashboards:
    Harbor Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/harbor/README.md'
display_name: Harbor
git_integration_title: harbor
guid: 8fcaa5d7-a121-45ea-bde2-f12d55bc6286
integration_id: harbor
integration_title: Harbor
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: harbor.
metric_to_check: harbor.projects.count
name: harbor
public_title: Datadog-Harbor インテグレーション
short_description: Harbor コンテナレジストリの健全性を監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [Harbor][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Harbor チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. Harbor のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `harbor.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル harbor.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

構成では任意のタイプのユーザーを指定できますが、ディスクメトリクスを取得するには、管理者アクセス許可を持つアカウントが必要です。メトリクス `harbor.projects.count` には、指定されたユーザーがアクセスできるプロジェクトの数だけが反映されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

    ```yaml
    logs_enabled: true
    ```

2. Harbor のログの収集を開始するには、次の構成ブロックを `harbor.d/conf.yaml` ファイルに追加します。

    ```
      logs:
        - type: file
          path: /var/log/harbor/*.log
          source: harbor
          service: <SERVICE_NAME>
    ```

3. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `harbor` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "harbor" >}}


### サービスのチェック

- `harbor.can_connect`
Harbor API が到達可能で、認証が成功する場合は `OK` を返し、それ以外の場合には `CRITICAL` を返します。

- `harbor.status`
指定された Harbor コンポーネントが健全な場合は `OK` を返し、それ以外の場合は `CRITICAL` を返します。Harbor <1.5 では `UNKNOWN` を返します。

- `harbor.registry.status`
サービスが健全な場合は `OK` を返し、それ以外の場合は `CRITICAL` を返します。レプリケーション用に Harbor によって使用される外部レジストリの健全性を監視します。


### イベント

Harbor インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

[1]: https://goharbor.io
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files
[5]: https://github.com/DataDog/integrations-core/blob/master/harbor/datadog_checks/harbor/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/harbor/metadata.csv
[9]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}