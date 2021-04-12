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
draft: false
git_integration_title: flume
guid: 39644ce3-222b-4b97-81b4-55dd8a1db3ea
integration_id: flume
integration_title: flume
is_public: true
kind: integration
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

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Flume チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

3. [Datadog Agent をダウンロードします][5]。

2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-flume==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][6]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. 以下の JVM 引数を [flume-env.sh][7] に追加して、Flume Agent を構成し JMX を有効にします。

```
export JAVA_OPTS=”-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=5445 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false”

```

2. Flume パフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `flume.d/conf.yaml` ファイルを編集します
   。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル  `flume.d/conf.yaml`][8] ファイルを参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][9]で詳細な手順を参照してください。
   制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][10]までお問い合わせください。

3. [Agent を再起動します][11]。

### 検証

[Agent の `status` サブコマンドを実行][12]し、Checks セクションで `flume` を探します。

### コンポーネントメトリクス

このチェックによって取得されるメトリクスは、Flume Agent が使用するソース、チャネル、シンクによって異なります。各コンポーネントによって公開されるメトリクスの完全なリストについては、Apache Flume ドキュメントの[利用可能なコンポーネントメトリクス][11]を確認してください。Datadog に表示されるメトリクスのリストについては、このページの[メトリクス](#metrics)セクションを参照してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "flume" >}}


### サービスのチェック

**flume.can_connect**:

Agent が監視対象の Flume インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

Flume には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://flume.apache.org/
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/ja/getting_started/integrations/
[7]: https://flume.apache.org/FlumeUserGuide.html#jmx-reporting
[8]: https://github.com/DataDog/integrations-extras/blob/master/flume/datadog_checks/flume/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/integrations/java/
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-extras/blob/master/flume/metadata.csv