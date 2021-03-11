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
  - モニタリング
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/pulsar/README.md'
display_name: pulsar
draft: false
git_integration_title: pulsar
guid: 799b35dd-d481-4d71-825e-83c92a5227c4
integration_id: pulsar
integration_title: Pulsar
is_public: true
kind: インテグレーション
maintainer: ming.luo@kesque.com
manifest_version: 1.0.0
metric_prefix: kesque.pulsar.
metric_to_check: kesque.pulsar.consumer.available_permits
name: pulsar
public_title: Pulsar
short_description: Apache Pulsar メトリクス
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、Datadog Agent を通じて [Pulsar][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Pulsar チェックをホストにインストールするには

1. マシンに[開発ツールキット][3]をインストールします。
2. integrations-extras リポジトリを複製します。

   ```shell
   git clone https://github.com/DataDog/integrations-extras.git.
   ```

3. `ddev` 構成を `integrations-extras/` パスで更新します。

   ```shell
   ddev config set extras ./integrations-extras
   ```

4. `Pulsar` パッケージをビルドします。

   ```shell
   ddev -e release build pulsar
   ```
5. [Datadog Agent をダウンロードします][4]。
6. ビルドの成果物を Agent をインストール済みのホストにアップロードし、実行します。
   ```shell
   datadog-agent integration install -w path/to/pulsar/dist/<ARTIFACT_NAME>.whl
   ```

### コンフィギュレーション

1. Pulsar のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `pulsar.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[pulsar.d/conf.yaml のサンプル][5]を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `pulsar` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "pulsar" >}}


### サービスのチェック

pulsar には、サービスのチェック機能は含まれません。

### イベント

pulsar には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://pulsar.apache.org/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/pulsar/datadog_checks/pulsar/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/pulsar/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/