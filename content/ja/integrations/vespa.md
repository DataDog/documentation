---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/vespa/README.md'
display_name: Vespa
draft: false
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

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Vespa チェックをインストールしてください。[バージョン 6.8 以前の Agent][4] または [Docker Agent][5] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][3]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][2]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-vespa==<INTEGRATION_VERSION>
   ```
3. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィギュレーション

Vespa チェックを構成するには

1. [Agent のコンフィギュレーションディレクトリ][7]のルートにある `conf.d/` フォルダーに `vespa.d/` フォルダーを作成します。
2. 上記のステップで作成した `vespa.d/` フォルダーに `conf.yaml` ファイルを作成します。
3. [vespa.d/conf.yaml のサンプル][8]ファイルを参考にして、`conf.yaml` ファイルのコンテンツをコピーします。
4. `conf.yaml` ファイルを編集して `consumer` を構成します。これにより、チェックによって転送されるメトリクスを決定します。
   - `consumer`: Vespa アプリケーションの services.xml からメトリクスを収集するコンシューマー。`default` コンシューマーまたは[カスタムコンシューマー][9]の
     いずれか。
5. [Agent を再起動します][3]。

### 検証

[Agent のステータスサブコマンドを実行][4]し、Checks セクションで `vespa` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "vespa" >}}


### サービスのチェック

**vespa.metrics_health**:<br>
Vespa [Node メトリクス API][10] からレスポンスがない場合、`CRITICAL`を返します。Vespa [Node メトリクス API][10] からレスポンスがあるものの処理中にエラーが発生した場合、`WARNING` を返します。それ以外の場合は `OK` を返します。

**vespa.process_health**:<br>
Vespa の各プロセスについて、プロセスがダウンしていると思われる (Vespa [Node メトリクス API][10] がプロセスに接続できない) 場合、`CRITICAL` を返します。プロセスのステータスが不明な (Vespa [Node メトリクス API][10] がプロセスに接続できるものの、レスポンスにエラーが含まれる) 場合、`WARNING` を返します。それ以外の場合は `OK` を返します。

### イベント

Vespa インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://vespa.ai/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://docs.datadoghq.com/ja/getting_started/integrations/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-extras/blob/master/vespa/datadog_checks/vespa/data/conf.yaml.example
[9]: https://docs.vespa.ai/documentation/reference/services-admin.html#metrics
[10]: https://docs.vespa.ai/documentation/reference/metrics.html#node-metrics-api