---
aliases:
- /ja/xenserver
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: citrix_hypervisor
  metrics_metadata: metadata.csv
  monitors:
    Host CPU high: assets/recommended_monitors/host_cpu_high.json
    VM CPU high: assets/recommended_monitors/vm_cpu_high.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- cloud
- ログの収集
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/README.md
display_name: Citrix Hypervisor
draft: false
git_integration_title: citrix_hypervisor
guid: d6c1911b-f7fd-4537-af4f-1aa40dae40c2
integration_id: citrix-hypervisor
integration_title: Citrix Hypervisor
integration_version: 2.1.0
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: citrix_hypervisor.
metric_to_check: citrix_hypervisor.host.cpu
name: citrix_hypervisor
public_title: Citrix Hypervisor
short_description: Citrix Hypervisor ホストの健全性とパフォーマンスを監視します。
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Datadog Agent を通じて [Citrix Hypervisor][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Citrix Hypervisor チェックは、[Datadog Agent][3] のパッケージに含まれています。
サーバーに追加でインストールする必要はありません。 
Citrix Hypervisor を監視する推奨方法は、各ハイパーバイザーに 1 つの Datadog Agent をインストールすることです。

#### Datadog ユーザー

Citrix Hypervisor とのインテグレーションでは、サービスを監視するために、少なくとも [`read-only`][4] のアクセス権を持つユーザーが必要です。

### コンフィギュレーション

#### ホスト

1. Citrix Hypervisor のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `citrix_hypervisor.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル citrix_hypervisor.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。`datadog.yaml` で有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Citrix Hypervisor ログの収集を開始するには、次のコンフィギュレーションブロックを `citrix_hypervisor.d/conf.yaml` ファイルに追加します。
    ```yaml
    logs:
    - type: file
      path: /var/log/xensource.log
      source: citrix_hypervisor
    ```
    `path` の値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル  `citrix_hypervisor.d/conf.yaml` ファイル][5]を参照してください。

3. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `citrix_hypervisor` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "citrix_hypervisor" >}}


### イベント

Citrix Hypervisor インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "citrix_hypervisor" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://www.citrix.com/products/citrix-hypervisor/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.citrix.com/en-us/xencenter/7-1/rbac-roles.html
[5]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/datadog_checks/citrix_hypervisor/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/