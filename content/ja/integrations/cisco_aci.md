---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    cisco_aci: assets/dashboards/cisco_aci_dashboard.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cisco_aci/README.md'
display_name: Cisco ACI
draft: false
git_integration_title: cisco_aci
guid: 8a20f56b-2e25-4a0b-a252-f5187dddeeef
integration_id: cisco-aci
integration_title: CiscoACI
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cisco_aci.
metric_to_check: cisco_aci.fabric.node.health.cur
name: cisco_aci
public_title: Datadog-CiscoACI インテグレーション
short_description: Cisco ACI のパフォーマンスと使用状況を追跡。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Cisco ACI インテグレーションを使用すると、以下のことが可能です。

- ネットワークの状態と健全性を追跡できます。
- ACI の容量を追跡できます。
- スイッチおよびコントローラー自体を監視できます。

## セットアップ

### インストール

Cisco ACI チェックは Agent にパッケージ化されているので、ネットワーク内のサーバーに [Agent をインストール][1]するだけです。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `cisco_aci.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル cisco_aci.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
        ## @param aci_url - string - required
        ## URL to query to gather metrics.
        #
      - aci_url: http://localhost

        ## @param username - string - required
        ## Authentication can use either a user auth or a certificate.
        ## If using the user auth, enter the `username` and `pwd` configuration.
        #
        username: datadog

        ## @param pwd - string - required
        ## Authentication can use either a user auth or a certificate.
        ## If using the user auth, enter the `username` and `pwd` configuration.
        #
        pwd: <PWD>

        ## @param tenant - list of strings - optional
        ## List of tenants to collect metrics data from.
        #
        # tenant:
        #   - <TENANT_1>
        #   - <TENANT_2>
   ```

   *注*: 必ずインテグレーションにテナントを指定し、アプリケーションのメトリクスや EPG などを収集します。

2. [Agent を再起動][3]すると、Datadog への Cisco ACI メトリクスの送信が開始されます。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/cisco_aci/datadog_checks/cisco_aci/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<インテグレーション名>` | `cisco_aci`                                                            |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                          |
| `<インスタンスコンフィギュレーション>`  | `{"aci_url":"%%host%%", "username":"<ユーザー名>", "pwd": "<パスワード>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][2]し、Checks セクションで `cisco_aci` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cisco_aci" >}}


### イベント

Cisco ACI チェックはテナントの障害をイベントとして送信します。

### サービスのチェック
{{< get-service-checks-from-git "cisco_aci" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/