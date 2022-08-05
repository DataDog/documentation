---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    hyper-v: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- azure
- cloud
- モニター
- OS & システム
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hyperv/README.md
display_name: HyperV
draft: false
git_integration_title: hyperv
guid: 412a75c1-b752-4b20-b046-4195dfaaf6ec
integration_id: hyper-v
integration_title: HyperV
integration_version: 1.7.0
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: hyperv.
metric_to_check: hyperv.hypervisor_logical_processor.total_run_time
name: hyperv
public_title: Datadog-HyperV インテグレーション
short_description: Microsoft の Hyper-V 仮想化テクノロジーを監視
support: コア
supported_os:
- windows
---



## 概要

このチェックは、Datadog Agent を通じて [Hyper-V][1] を監視します。

## セットアップ

### インストール

Hyper-V チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. Hyper-V のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `hyperv.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hyperv.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

**注**: このチェックのバージョン 1.5.0 以降では、メトリクスの収集に新しい実装を使用し、これには Python 3 が必要です。Python 3 の使用が不可能なホストの場合や、このチェックのレガシーバージョンを使用する場合は、以下の[コンフィグ][5]を参照してください。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `hyperv` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "hyperv" >}}


### サービスのチェック

Hyper-V には、サービスのチェック機能は含まれません。

### イベント

Hyper-V には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Microsoft Hyper-V の監視][9]

[1]: https://docs.microsoft.com/en-us/windows-server/virtualization/hyper-v/hyper-v-on-windows-server
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-core/blob/master/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://github.com/DataDog/integrations-core/blob/7.33.x/hyperv/datadog_checks/hyperv/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/hyperv/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://www.datadoghq.com/blog/monitor-microsoft-hyperv-with-datadog