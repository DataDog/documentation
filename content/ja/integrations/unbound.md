---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/unbound/README.md'
display_name: Unbound
draft: false
git_integration_title: unbound
guid: 2b31e667-1fd9-440f-9e96-c72bea3cf3ca
integration_id: unbound
integration_title: Unbound
is_public: true
kind: インテグレーション
maintainer: david.byron@avast.com
manifest_version: 1.0.0
metric_prefix: unbound.
metric_to_check: ''
name: unbound
public_title: Datadog-Unbound インテグレーション
short_description: unbound メトリクスを収集する Datadog インテグレーション
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [Unbound][1] を監視します。

unbound サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- unbound の状態を視覚化して監視します。

## セットアップ

### インストール

Unbound チェックは [Datadog Agent][2] パッケージに**含まれていません**。

Unbound チェックをホストにインストールするには

1. マシンに[開発ツールキット][3]をインストールします。
2. `ddev release build unbound` を実行してパッケージをビルドします。
3. [Datadog Agent をインストールします][4]。
4. ビルドアーティファクトを Agent のあるホストにアップロードし、`datadog-agent integration install -w path/to/unbound/dist/<ARTIFACT_NAshellME>.whl` を実行します。

### コンフィギュレーション

1. Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `unbound.d/conf.yaml` ファイルを編集して、
   unbound メトリクスの収集を開始します。
    使用可能なすべての構成オプションの詳細については、[サンプル unbound.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `unbound` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "unbound" >}}


### サービスのチェック

**unbound.can_get_stats**
unbound-control が失敗した場合、または出力のパース中にエラーが発生した場合は CRITICAL を返します。それ以外の場合は OK を返します。

### イベント

Unbound チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://nlnetlabs.nl/documentation/unbound/unbound-control/
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/unbound/datadog_checks/unbound/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/unbound/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/