---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - データストア
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/vespa/README.md'
display_name: Vespa
git_integration_title: vespa
guid: 810e2a6e-4aa4-4b03-b5a4-563f3752f0eb
integration_id: vespa
integration_title: Vespa
is_public: true
kind: インテグレーション
maintainer: dd@vespa.ai
manifest_version: 1.0.0
metric_prefix: vespa.
metric_to_check: vespa.mem.heap.free.average
name: vespa
public_title: Datadog-Vespa インテグレーション
short_description: ビッグデータサービングエンジン Vespa の健全性とパフォーマンスの監視
support: contrib
supported_os:
  - linux
---
## 概要

[Vespa][1] システムからメトリクスをリアルタイムに取得して、以下のことを実施できます。

- Vespa のステータスとパフォーマンスを視覚化して監視する
- 健全性と可用性に関するアラートを生成する

## セットアップ

Vespa チェックは [Datadog Agent][2] パッケージに含まれていません。

### インストール

チェックをホストにインストールするには

1. マシンに[開発ツールキット][7]をインストールします。
2. `ddev release build vespa` を実行してパッケージをビルドします。
3. [Datadog Agent をダウンロードします][2]。
4. ビルドの成果物を Agent をインストール済みのホストにアップロードし、実行します。

   ```shell
   datadog-agent integration install -w path/to/vespa/dist/<ARTIFACT_NAME>.whl
   ```

### コンフィギュレーション

Vespa チェックを構築するには

1. [Agent のコンフィギュレーションディレクトリ][8]のルートにある `conf.d/` フォルダーに `vespa.d/` フォルダーを作成します。
2. 上記のステップで作成した `vespa.d/` フォルダーに `conf.yaml` ファイルを作成します。
3. [vespa.d/conf.yaml のサンプル][10]ファイルを参考にして、`conf.yaml` ファイルのコンテンツをコピーします。
4. `conf.yaml` ファイルを編集して `consumer` を構成します。これにより、チェックによって転送されるメトリクスを決定します。
   - `consumer`: Vespa アプリケーションの services.xml からメトリクスを収集するコンシューマー。`default` コンシューマーまたは[カスタムコンシューマー][9]の
     いずれか。
5. [Agent を再起動します][3]。

### 検証

[Agent のステータスサブコマンドを実行][4]し、Checks セクションで `vespa` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "vespa" >}}


### サービスチェック

**vespa.metrics_health**:<br>
Vespa [Node メトリクス API][11] からレスポンスがない場合、`CRITICAL`を返します。Vespa [Node メトリクス API][11] からレスポンスがあるものの処理中にエラーが発生した場合、`WARNING` を返します。それ以外の場合は `OK` を返します。

**vespa.process_health**:<br>
Vespa の各プロセスについて、プロセスがダウンしていると思われる (Vespa [Node メトリクス API][11] がプロセスに接続できない) 場合、`CRITICAL` を返します。プロセスのステータスが不明な (Vespa [Node メトリクス API][11] がプロセスに接続できるものの、レスポンスにエラーが含まれる) 場合、`WARNING` を返します。それ以外の場合は `OK` を返します。

### イベント

Vespa インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://vespa.ai/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help
[6]: https://github.com/DataDog/integrations-extras/blob/master/vespa/metadata.csv
[7]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://docs.vespa.ai/documentation/reference/services-admin.html#metrics
[10]: https://github.com/DataDog/integrations-extras/blob/master/vespa/datadog_checks/vespa/data/conf.yaml.example
[11]: https://docs.vespa.ai/documentation/reference/metrics.html#node-metrics-api