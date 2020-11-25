---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ネットワーク
  - 監視
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/zabbix/README.md'
display_name: Zabbix
draft: true
git_integration_title: zabbix
guid: bf1fa08e-3df3-40b7-ab1d-1ba685c3057d
integration_id: zabbix
integration_title: zabbix
is_public: false
kind: インテグレーション
maintainer: KosukeKamiya@users.noreply.github.com
manifest_version: 1.0.0
metric_prefix: zabbix.
metric_to_check: ''
name: zabbix
public_title: zabbix
short_description: Zabbix API によりアイテムの履歴を収集し、メトリクスとして Datadog にレポート。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [Zabbix][1] を監視します。

## セットアップ

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### インストール

Zabbix チェックをホストにインストールするには

1. マシンに[開発ツールキット][2]をインストールします。
2. `ddev release build zabbix` を実行してパッケージをビルドします。
3. [Datadog Agent をダウンロードします][3]。
4. ビルドアーティファクトを Agent のあるホストにアップロードし、`datadog-agent integration install -w path/to/zabbix/dist/<ARTIFACT_NAME>.whl` を実行します。

### コンフィギュレーション

1. Zabbix のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `zabbix.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル zabbix.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `zabbix` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "zabbix" >}}


### サービスのチェック

`zabbix.can_connect`: Agent が Zabbix API に接続できない場合は `CRITICAL`、それ以外の場合は OK を返します。

### イベント

Zabbix には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://www.zabbix.com/
[2]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/datadog_checks/zabbix/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/zabbix/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/