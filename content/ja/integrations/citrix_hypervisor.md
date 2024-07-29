---
app_id: citrix-hypervisor
app_uuid: cf4ad6ea-85ae-4f7d-8e79-7b8d36924425
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: citrix_hypervisor.host.cpu
      metadata_path: metadata.csv
      prefix: citrix_hypervisor.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10198
    source_type_name: Citrix Hypervisor
  logs:
    source: citrix_hypervisor
  monitors:
    Host CPU high: assets/monitors/host_cpu_high.json
    VM CPU high: assets/monitors/vm_cpu_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- cloud
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/README.md
display_on_public_website: true
draft: false
git_integration_title: citrix_hypervisor
integration_id: citrix-hypervisor
integration_title: Citrix Hypervisor
integration_version: 3.2.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: citrix_hypervisor
public_title: Citrix Hypervisor
short_description: Citrix Hypervisor ホストの健全性とパフォーマンスを監視します。
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
  - Category::Cloud
  - Category::Log Collection
  configuration: README.md#Setup
  description: Citrix Hypervisor ホストの健全性とパフォーマンスを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Citrix Hypervisor
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Citrix Hypervisor][1] を監視します。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

Citrix Hypervisor チェックは、[Datadog Agent][3] のパッケージに含まれています。
サーバーに追加でインストールする必要はありません。 
Citrix Hypervisor を監視する推奨方法は、各ハイパーバイザーに 1 つの Datadog Agent をインストールすることです。

#### Datadog ユーザー

Citrix Hypervisor とのインテグレーションでは、サービスを監視するために、少なくとも [`read-only`][4] のアクセス権を持つユーザーが必要です。

### ブラウザトラブルシューティング

#### メトリクスベース SLO

1. Citrix Hypervisor のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `citrix_hypervisor.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル citrix_hypervisor.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

#### 収集データ

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

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "citrix_hypervisor" >}}


### ヘルプ

Citrix Hypervisor インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "citrix_hypervisor" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Citrix Hypervisor パフォーマンスの監視][11]

[1]: https://www.citrix.com/products/citrix-hypervisor/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.citrix.com/en-us/xencenter/7-1/rbac-roles.html
[5]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/datadog_checks/citrix_hypervisor/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/citrix_hypervisor/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/monitor-citrix-hypervisor-datadog/