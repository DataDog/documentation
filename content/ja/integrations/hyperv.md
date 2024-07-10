---
app_id: hyper-v
app_uuid: 6024e97b-c3c6-45e3-ba71-a48adeebc191
assets:
  dashboards:
    hyper-v: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hyperv.hypervisor_logical_processor.total_run_time
      metadata_path: metadata.csv
      prefix: hyperv.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10046
    source_type_name: HyperV
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- クラウド
- OS & システム
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hyperv/README.md
display_on_public_website: true
draft: false
git_integration_title: hyperv
integration_id: hyper-v
integration_title: HyperV
integration_version: 1.11.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: hyperv
public_title: HyperV
short_description: Microsoft の Hyper-V 仮想化テクノロジーを監視
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::OS & System
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Microsoft の Hyper-V 仮想化テクノロジーを監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HyperV
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Hyper-V][1] を監視します。

## 計画と使用

### インフラストラクチャーリスト

Hyper-V チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. Hyper-V のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `hyperv.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hyperv.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

**注**: このチェックのバージョン 1.5.0 以降では、メトリクスの収集に新しい実装を使用し、これには Python 3 が必要です。Python 3 の使用が不可能なホストの場合や、このチェックのレガシーバージョンを使用する場合は、以下の[コンフィグ][5]を参照してください。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `hyperv` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "hyperv" >}}


### ヘルプ

Hyper-V には、サービスのチェック機能は含まれません。

### ヘルプ

Hyper-V には、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Microsoft Hyper-V の監視][9]

[1]: https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-on-windows-server
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/hyperv/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://www.datadoghq.com/blog/monitor-microsoft-hyperv-with-datadog