---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cisco_aci/README.md'
display_name: Cisco ACI
git_integration_title: cisco_aci
guid: 8a20f56b-2e25-4a0b-a252-f5187dddeeef
integration_id: cisco-aci
integration_title: CiscoACI
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cisco_aci.
metric_to_check: cisco_aci.fabric.node.health.cur
name: cisco_aci
public_title: Datadog-CiscoACI インテグレーション
short_description: Cisco ACI のパフォーマンスと使用状況を追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Cisco ACI インテグレーションを使用すると、以下のことが可能です。

* ネットワークの状態と健全性を追跡できます。
* ACI の容量を追跡できます。
* スイッチおよびコントローラー自体を監視できます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

Cisco ACI チェックは Agent にパッケージ化されているので、ネットワーク内のサーバーに [Agent をインストール][2]するだけです。

### コンフィグレーション

1. [Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `cisco_aci.d/conf.yaml` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル cisco_aci.d/conf.yaml][4] を参照してください。

    ```yaml
      init_config:
          # This check makes a lot of API calls
          # it could sometimes help to add a minimum collection interval
          # min_collection_interval: 180
      instances:
          - aci_url: localhost # the url of the aci controller
            username: datadog
            pwd: datadog
            timeout: 15
            # if it's an ssl endpoint that doesn't have a certificate, use this to ensure it can still connect
            ssl_verify: True
            tenant:
              - WebApp
              - Database
              - Datadog
    ```

2. [Agent を再起動][5]すると、Datadog への Cisco ACI メトリクスの送信が開始されます。

### 検証

[Agent の `status` サブコマンドを実行][6]し、Checks セクションで `cisco_aci` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "cisco_aci" >}}


### イベント
Cisco ACI チェックはテナントの障害をイベントとして送信します。

### サービスのチェック

`cisco_aci.can_connect`:

Agent が Cisco ACI API に接続してメトリクスを収集できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/cisco_aci/datadog_checks/cisco_aci/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/cisco_aci/metadata.csv
[8]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}