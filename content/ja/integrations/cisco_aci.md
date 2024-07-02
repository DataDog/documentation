---
"app_id": "cisco-aci"
"app_uuid": "fab40264-45aa-434b-9f9f-dc0ab609dd49"
"assets":
  "dashboards":
    "cisco_aci": "assets/dashboards/cisco_aci_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": true
    "metrics":
      "check": "cisco_aci.fabric.node.health.cur"
      "metadata_path": "metadata.csv"
      "prefix": "cisco_aci."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "210"
    "source_type_name": "Cisco ACI"
  "monitors":
    "[Cisco ACI] Average CPU usage high alert": "assets/monitors/cpu_high.json"
    "[Cisco ACI] Critical health alert": "assets/monitors/critical_health_score.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "network"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/cisco_aci/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "cisco_aci"
"integration_id": "cisco-aci"
"integration_title": "CiscoACI"
"integration_version": "2.8.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "cisco_aci"
"public_title": "CiscoACI"
"short_description": "Cisco ACI のパフォーマンスと使用状況を追跡。"
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::ネットワーク"
  "configuration": "README.md#Setup"
  "description": "Cisco ACI のパフォーマンスと使用状況を追跡。"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "CiscoACI"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Cisco ACI インテグレーションを使用すると、以下のことが可能です。

- ネットワークの状態と健全性を追跡できます。
- ACI の容量を追跡できます。
- スイッチおよびコントローラー自体を監視できます。

## セットアップ

### インストール

Cisco ACI チェックは Agent にパッケージ化されているので、ネットワーク内のサーバーに [Agent をインストール][1]するだけです。

### 構成

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

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

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/cisco_aci/datadog_checks/cisco_aci/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cisco_aci`                                                            |
| `<INIT_CONFIG>`      | 空白または `{}`                                                          |
| `<INSTANCE_CONFIG>`  | `{"aci_url":"%%host%%", "username":"<ユーザー名>", "pwd": "<パスワード>"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][2]し、Checks セクションで `cisco_aci` を探します。

## ベンダープロファイル

このインテグレーションでサポートされている具体的なベンダープロファイルは、[ネットワークベンダー][3]のページで確認できます。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cisco_aci" >}}


### イベント

Cisco ACI チェックはテナントの障害をイベントとして送信します。

### サービスチェック
{{< get-service-checks-from-git "cisco_aci" >}}


## トラブルシューティング

### `cisco_aci.tenant.*` メトリクスの欠落
もし `cisco_aci.tenant.*` メトリクスがない場合は、`test/cisco_aci_query.py` スクリプトを実行して、テナントエンドポイントに手動でクエリを実行することが可能です。

`apic_url`、`apic_username`、`apic_password` を構成情報に変更し、`apic_url` にテナント URL を入力します。

エンドポイントを cURL して得られた出力が `datadog_checks/cisco_aci/aci_metrics.py` で収集されたメトリクスのいずれかと一致するか確認します。どの統計も一致しない場合、これは、統合が収集できる統計情報をエンドポイントが発信していないことを意味します。

### 実行時間が長い

このチェックは、メトリクスを返す前にリストされたすべてのテナント、アプリ、およびエンドポイントに問い合わせるため、このインテグレーションによる実行時間が長くなることがあります。

  ```yaml
    cisco_aci (2.2.0)
  -----------------
    Instance ID: cisco_aci:d3a2958f66f46212 [OK]
    Configuration Source: file:/etc/datadog-agent/conf.d/cisco_aci.d/conf.yaml
    Total Runs: 1
    Metric Samples: Last Run: 678, Total: 678
    Events: Last Run: 0, Total: 0
    Service Checks: Last Run: 1, Total: 1
    Average Execution Time : 28m20.95s
    Last Execution Date : 2023-01-04 15:58:04 CST / 2023-01-04 21:58:04 UTC (1672869484000)
    Last Successful Execution Date : 2023-01-04 15:58:04 CST / 2023-01-04 21:58:04 UTC (1672869484000)
  ```

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/network_monitoring/devices/#vendor-profiles
[4]: https://docs.datadoghq.com/help/
