---
app_id: flume
app_uuid: 9e349061-5665-482d-9a5a-f3a07999bfae
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: flume.channel.capacity
      metadata_path: metadata.csv
      prefix: flume.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10133
    source_type_name: flume
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: kealan.maas@datadoghq.com
  support_email: kealan.maas@datadoghq.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/flume/README.md
display_on_public_website: true
draft: false
git_integration_title: flume
integration_id: flume
integration_title: flume
integration_version: 0.0.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: flume
public_title: flume
short_description: Apache Flume Agent のシンク、チャンネル、ソースを追跡
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  configuration: README.md#Setup
  description: Apache Flume Agent のシンク、チャンネル、ソースを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: flume
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは [Apache Flume][1] を監視します。

## 計画と使用

Flume チェックは [Datadog Agent][2] パッケージに含まれていないため、お客様自身でインストールする必要があります。

### インフラストラクチャーリスト

Agent v7.21 / v6.21 以降の場合は、下記の手順に従い Flume チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][3]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

   ```shell
   datadog-agent integration install -t datadog-flume==<INTEGRATION_VERSION>
   ```

2. コアの[インテグレーション][4]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. 以下の JVM 引数を [flume-env.sh][5] に追加して、Flume Agent を構成し JMX を有効にします。

```
export JAVA_OPTS="-Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=5445 -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false"

```

2. Flume パフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `flume.d/conf.yaml` ファイルを編集します
   。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル `flume.d/conf.yaml`][6] ファイルを参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、ステータス出力に表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスのカスタマイズの詳細については、[JMX Checks のドキュメント][7]を参照してください。
   制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][8]までお問い合わせください。

3. [Agent を再起動します][9]

### 検証

[Agent の `status` サブコマンドを実行][10]し、Checks セクションで `flume` を探します。

### コンポーネントメトリクス

このチェックによって取得されるメトリクスは、Flume Agent が使用するソース、チャネル、シンクによって異なります。各コンポーネントによって公開されるメトリクスの完全なリストについては、Apache Flume ドキュメントの[利用可能なコンポーネントメトリクス][9]を確認してください。Datadog に表示されるメトリクスのリストについては、このページの[メトリクス](#metrics)セクションを参照してください。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "flume" >}}


### ヘルプ

Flume には、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "flume" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://flume.apache.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/ja/getting_started/integrations/
[5]: https://flume.apache.org/FlumeUserGuide.html#jmx-reporting
[6]: https://github.com/DataDog/integrations-extras/blob/master/flume/datadog_checks/flume/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/integrations/java/
[8]: https://docs.datadoghq.com/ja/help/
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/flume/metadata.csv
[12]: https://github.com/DataDog/integrations-extras/blob/master/flume/assets/service_checks.json