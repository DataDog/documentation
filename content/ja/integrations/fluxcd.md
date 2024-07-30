---
app_id: fluxcd
app_uuid: 11cc5047-83aa-44df-b7ca-9c6e1c32b723
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: fluxcd.gotk.suspend.status
      metadata_path: metadata.csv
      prefix: fluxcd.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: fluxcd
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: melchior.moulin@blablacar.com
  support_email: melchior.moulin@blablacar.com
categories:
- kubernetes
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/fluxcd/README.md
display_on_public_website: true
draft: false
git_integration_title: fluxcd
integration_id: fluxcd
integration_title: fluxcd
integration_version: 0.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: fluxcd
public_title: fluxcd
short_description: Fluxcd の openmetric v2 とのインテグレーション
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Kubernetes
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Fluxcd の openmetric v2 とのインテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: fluxcd
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
[8]: https://github.com/DataDog/integrations-extras/blob/master/fluxcd/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/