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
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/flume/README.md'
display_name: flume
draft: true
git_integration_title: flume
guid: 39644ce3-222b-4b97-81b4-55dd8a1db3ea
integration_id: flume
integration_title: flume
is_public: false
kind: インテグレーション
maintainer: kealan.maas@datadoghq.com
manifest_version: 1.0.0
metric_prefix: flume.
metric_to_check: ''
name: flume
public_title: flume
short_description: Apache Flume Agent のシンク、チャンネル、ソースを追跡
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは [Apache Flume][1] を監視します。

## セットアップ

### インストール

Flume チェックをホストにインストールするには

1. [開発ツールキット][2]をインストールします。

2. `ddev release build flume` を実行してパッケージをビルドします。

3. [Datadog Agent をダウンロードします][3]。

4. ビルドの成果物を Agent をインストール済みのホストにアップロードし、以下を実行します。
 `datadog-agent integration install -w
 path/to/flume/dist/<ARTIFACT_NAME>.whl`.

### コンフィギュレーション

1. 以下の JVM 引数を [flume-env.sh][4] に追加して、Flume Agent を構成し JMX を有効にします。

```
export JAVA_OPTS=”-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=5445 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false”

```

2. Flume パフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `flume.d/conf.yaml` ファイルを編集します
   。
    使用可能なすべてのコンフィギュレーションオプションについては、[サンプル  `flume.d/conf.yaml`][5] ファイルを参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][6]で詳細な手順を参照してください。
   制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][7]までお問い合わせください。

3. [Agent を再起動します][8]。

### 検証

[Agent の `status` サブコマンドを実行][9]し、Checks セクションで `flume` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "flume" >}}
は、Flume Agent が使用するソース、チャンネル、シンクに依存します。
各コンポーネントが公開するメトリクス一覧は、Apache Flume ドキュメントの[使用可能なコンポーネントメトリクス][11] で確認できます。

### サービスのチェック

**flume.can_connect**:

Agent が監視対象の Flume インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

Flume には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。


[1]: https://flume.apache.org/
[2]: https://docs.datadoghq.com/ja/developers/integrations/new_check_howto/#developer-toolkit
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://flume.apache.org/FlumeUserGuide.html#jmx-reporting
[5]: https://github.com/DataDog/integrations-extras/blob/master/flume/datadog_checks/flume/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/integrations/java/
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-extras/blob/master/flume/metadata.csv
[11]: https://flume.apache.org/FlumeUserGuide.html#available-component-metrics