---
aliases:
  - /ja/integrations/winservices
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/windows_service/README.md
display_name: Windows Service
draft: false
git_integration_title: windows_service
guid: 2289acf0-e413-4384-83f7-88157b430805
integration_id: windows-service
integration_title: Windows Services
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: windows_service.
name: windows_service
public_title: Datadog-Windows Services インテグレーション
short_description: Windows Service の状態を監視。
support: コア
supported_os:
  - windows
---
## 概要

このチェックは、Windows Service の状態を監視し、サービスチェックを Datadog に送信します。

## セットアップ

### インストール

Windows Service チェックは [Datadog Agent][1] パッケージに含まれています。Windows ホストに追加でインストールする必要はありません。

### コンフィギュレーション

1. [Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `windows_service.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル windows_service.d/conf.yaml][3] を参照してください。

2. サービス名は、表示名**ではなく**、`services.msc` プロパティフィールドに表示されているものを入力してください。スペースを含む名前の場合は、`"Windows Service"` のように名前全体を二重引用符で囲みます。**注**: Datadog では、スペースはアンダースコアに置き換えられます。

3. [Agent を再起動します][4]。

#### メトリクスの収集

Windows Service チェックでは[カスタムメトリクス][5]を送信することができますが、これはお客様の[課金][6]に影響します。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `windows_service` を探します。

## 収集データ

### メトリクス

Windows Service チェックには、メトリクスは含まれません。

### イベント

Windows Service チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "windows_service" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

- [Windows Server 2012 の監視][10]
- [Windows Server 2012 メトリクスの収集方法][11]
- [Datadog を使用した Windows Server 2012 の監視][12]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/windows_service/datadog_checks/windows_service/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics/
[6]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/windows_service/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[11]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[12]: https://www.datadoghq.com/blog/windows-server-monitoring