---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/kyototycoon/README.md'
display_name: Kyoto Tycoon
git_integration_title: kyototycoon
guid: 2661668b-d804-4c8d-96a7-8019525add8c
integration_id: kyoto-tycoon
integration_title: Kyoto Tycoon
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: kyototycoon.
metric_to_check: kyototycoon.records
name: kyototycoon
process_signatures:
  - ktserver
public_title: Datadog-Kyoto Tycoon インテグレーション
short_description: 取得/設定/削除操作の追跡とレプリケーションラグの監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Agent の KyotoTycoon チェックは、取得/設定/削除の操作を追跡し、レプリケーションラグを監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

KyotoTycoon チェックは [Datadog Agent][2] パッケージに含まれています。KyotoTycoon サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. [Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `kyototycoon.d/conf.yaml` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル kyototycoon.d/conf.yaml][4] を参照してください。

    ```yaml
    init_config:

    instances:
        #  Each instance needs a report URL.
        #  name, and optionally tags keys. The report URL should
        #  be a URL to the Kyoto Tycoon "report" RPC endpoint.
        #
        #  Complete example:
        #
        - report_url: http://localhost:1978/rpc/report
        #   name: my_kyoto_instance
        #   tags:
        #     foo: bar
        #     baz: bat
    ```

2. [Agent を再起動][5]すると、Datadog への Kong メトリクスの送信が開始されます。


### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `kyototycoon` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "kyototycoon" >}}


### イベント
KyotoTycoon チェックには、イベントは含まれません。

### サービスのチェック

`kyototycoon.can_connect`:

Agent が KyotoTycoon に接続してメトリクスを収集できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/datadog_checks/kyototycoon/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/kyototycoon/metadata.csv
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}