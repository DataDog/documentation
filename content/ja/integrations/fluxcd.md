---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- ''
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/fluxcd/README.md
display_name: fluxcd
draft: false
git_integration_title: fluxcd
guid: 23df9683-a49e-462e-8fa7-b04e2bfb8361
integration_id: fluxcd
integration_title: fluxcd
integration_version: 0.0.1
is_public: true
kind: integration
maintainer: melchior.moulin@blablacar.com
manifest_version: 1.0.0
metric_prefix: fluxcd.
metric_to_check: fluxcd.gotk.suspend.status
name: fluxcd
public_title: fluxcd
short_description: Fluxcd の openmetric v2 とのインテグレーション
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要
[Flux][1] は、オープンで拡張可能な Kubernetes のための継続的かつプログレッシブなデリバリーソリューションのセットです。
このチェックでは、Datadog Agent を通じて fluxcd を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

fluxcd チェックをホストにインストールするには


1. [開発ツールキット][3]をインストールします。
 どのマシンでも。

2. `ddev release build fluxcd` を実行してパッケージをビルドします。

3. [Datadog Agent をダウンロードします][4]。

4. ビルドの成果物を Agent をインストール済みのホストにアップロードし、以下を実行します。
 `datadog-agent integration install -w
 path/to/fluxcd/dist/<ARTIFACT_NAME>.whl`.

### コンフィギュレーション

1. fluxcd のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `fluxcd.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル fluxcd.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `fluxcd` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "fluxcd" >}}


### イベント

fluxcd インテグレーションには、イベントは含まれません。

### サービスのチェック

fluxcd インテグレーションには、サービスのチェック機能は含まれません。


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://fluxcd.io/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/fluxcd/datadog_checks/fluxcd/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/check/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/