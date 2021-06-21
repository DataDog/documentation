---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    NS1: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - モニタリング
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/ns1/README.md'
display_name: NS1
draft: false
git_integration_title: ns1
guid: 7c7c7d80-d307-4ffd-ac60-1a7180d932e3
integration_id: ns1
integration_title: ns1
is_public: true
kind: integration
maintainer: dblagojevic@daitan.com
manifest_version: 1.0.0
metric_prefix: ns1.
metric_to_check: ns1.qps
name: ns1
public_title: ns1
short_description: NS1 メトリクスを収集する Datadog インテグレーション
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [ns1][1] を監視します。

![Snap][2]

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

### インストール

[コミュニティインテグレーションのインストール][4]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][5]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-ns1==0.0.2
   ```

3. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。



### コンフィギュレーション

1. ns1 のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `ns1.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル ns1.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

収集されるすべてのパフォーマンスデータの詳しい説明は、NS1 ヘルプセンターの [NS1 + Datadog インテグレーション][9]をご参照ください。

### 検証

[Agent の status サブコマンドを実行][10]し、Checks セクションで `ns1` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ns1" >}}


### サービスのチェック

ns1 には、サービスのチェック機能は含まれません。

### イベント

ns1 には、イベントは含まれません。

### 開発

Agent ベースのインテグレーションのテストおよび開発方法については、[Datadog 開発者用ドキュメント][12]を参照してください。

ns1 チェックをホストにインストールするには

1. マシンに[開発ツールキット][13]をインストールします。

2. `ddev release build ns1` を実行してパッケージをビルドします。

3. [Datadog Agent をダウンロードします][5]。

4. ビルドの成果物を Agent をインストール済みのホストにアップロードし、以下を実行します。
 `datadog-agent integration install -w path/to/ns1/dist/<ARTIFACT_NAME>.whl` を実行します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。

[1]: https://ns1.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ns1/images/overview.png
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentabovev68
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/ja/getting_started/integrations/
[7]: datadog_checks/ns1/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://help.ns1.com/hc/en-us/articles/360020473994-NS1-Datadog-Integration
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: metadata.csv
[12]: https://docs.datadoghq.com/ja/developers/
[13]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[14]: https://docs.datadoghq.com/ja/help/