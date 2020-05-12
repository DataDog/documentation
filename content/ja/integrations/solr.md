---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - autodiscovery
creates_events: false
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/solr/README.md'
display_name: Solr
git_integration_title: solr
guid: 0235124a-0207-44dd-aede-f578a6d46b26
integration_id: solr
integration_title: Solr
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: solr.
metric_to_check: solr.cache.hits
name: solr
process_signatures:
  - solr start
public_title: Datadog-Solr インテグレーション
short_description: リクエスト率、ハンドラーエラー、キャッシュミス、エビクションなどを監視
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Solr グラフ][1]

## 概要

Solr チェックは、Solr クラスターの状態とパフォーマンスを追跡します。インデックス化されたドキュメント数、キャッシュのヒット数、エビクション数、平均リクエスト時間、毎秒の平均リクエスト数などのメトリクスを収集します。

## セットアップ

### インストール

Solr チェックは [Datadog Agent][3] パッケージに含まれています。Solr ノードに追加でインストールする必要はありません。

このチェックは JMX ベースなので、Solr サーバーで JMX リモートを有効にする必要があります。詳細については、[JMX チェックに関するドキュメント][4]を参照してください。

### コンフィギュレーション

#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

1. [Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダーの `solr.d/conf.yaml` ファイルを編集します。使用可能な全構成オプションの詳細については、[サンプル solr.d/conf.yaml][6] を参照してください。

   ```yaml
   instances:
     ## @param host - string - required
     ## Solr host to connect to.
     - host: localhost

       ## @param port - integer - required
       ## Solr port to connect to.
       port: 9999
   ```

2. [Agent を再起動します][7]。

#### メトリクスのリスト

`conf` パラメーターは、インテグレーションによって収集されるメトリクスのリストです。次の 2 つのキーのみが許可されます。

- `include` (**必須**): フィルターの辞書。これらのフィルターに一致する属性は、`exclude` フィルターにも一致している場合を除き、収集されます (以下を参照)。
- `exclude` (**オプション**): フィルターの辞書。これらのフィルターに一致する属性は収集されません。

特定の Bean に対して、メトリクスは次のようにタグ付けされます。

```text
mydomain:attr0=val0,attr1=val1
```

この例では、メトリクスは `mydomain` (Bean 内の属性によっては多少異なる) になり、タグ `attr0:val0`、`attr1:val1`、`domain:mydomain` が付きます。

`include` キー内の指定したエイリアスが_キャメルケース_として書式設定されている場合、_スネークケース_に変換されます。たとえば `MyMetricName` は、Datadog では `my_metric_name` と表示されます。

##### 属性フィルター

`attribute` フィルターは、次の 2 種類の値を受け入れます。

- キーが属性名の辞書（以下を参照）。この場合、メトリクスのエイリアスを指定でき、それが Datadog でメトリクス名になります。ゲージまたはカウンターとしてメトリクスタイプを指定することもできます。カウンターを選択した場合は、メトリクスの秒あたりの速度が計算されます。

  ```yaml
  conf:
    - include:
      attribute:
        maxThreads:
          alias: tomcat.threads.max
          metric_type: gauge
        currentThreadCount:
          alias: tomcat.threads.count
          metric_type: gauge
        bytesReceived:
          alias: tomcat.bytes_rcvd
          metric_type: counter
  ```

- 属性名のリスト（以下を参照）。この場合、メトリクスタイプはゲージで、メトリクス名は `jmx.\[ドメイン名].\[属性名]` です。

  ```yaml
  conf:
    - include:
      domain: org.apache.cassandra.db
      attribute:
        - BloomFilterDiskSpaceUsed
        - BloomFilterFalsePositives
        - BloomFilterFalseRatio
        - Capacity
        - CompressionRatio
        - CompletedTasks
        - ExceptionCount
        - Hits
        - RecentHitRate
  ```

#### 以前のバージョン

フィルターのリストは、5.3.0 よりも新しい Datadog Agent でのみサポートされます。以前のバージョンを使用している場合は、代わりにシングルトンと複数の `include` ステートメントを使用します。

```yaml
# Datadog Agent > 5.3.0
  conf:
    - include:
      domain: domain_name
      bean:
        - first_bean_name
        - second_bean_name
# Older Datadog Agent versions
  conf:
    - include:
      domain: domain_name
      bean: first_bean_name
    - include:
      domain: domain_name
      bean: second_bean_name
```

#### コンテナ化

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][2]のガイドを参照してください。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `solr` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "solr" >}}


### イベント

Solr チェックには、イベントは含まれません。

### サービスのチェック

**solr.can_connect**:<br>
Agent が監視対象の SolR インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

### 使用可能なメトリクスを表示するコマンド

バージョン 4.1.0 で `datadog-agent jmx` コマンドが追加されました。

- 1 つ以上のインスタンス構成に一致する属性をリストする:
  `sudo datadog-agent jmx list matching`
- インスタンス構成の 1 つに一致するが、収集可能なメトリクス数を超えるために収集されない属性をリストする:
  `sudo datadog-agent jmx list limited`
- 現在のインスタンス構成によって収集されると予想される属性をリストします。
  `sudo datadog-agent jmx list collected`
- どのインスタンス構成にも一致しない属性をリストする:
  `sudo datadog-agent jmx list not-matching`
- JMXFetch でサポートされているタイプのすべての使用可能な属性をリストする:
  `sudo datadog-agent jmx list everything`
- 現在の構成に基づいてメトリクスの収集を開始し、コンソールに表示する:
  `sudo datadog-agent jmx collect`

## その他の参考資料

### 文字列値を数値にパースする

jmxfetch が **false** や **true** といった文字列値のみを返す場合は、それを Datadog のゲージメトリクスに変換して使用できます。たとえば、jmxfetch で次のような値を返すとします。

```text
"myJmxfetch:false" = myJmxfetch:0
"myJmxfetch:true" = myJmxfetch:1
```

次のように `attribute` フィルターを使用します。

```yaml
# ...
attribute:
  myJmxfetch:
    alias: your_metric_name
    metric_type: gauge
    values:
      "false": 0
      "true": 1
```

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/solr/images/solrgraph.png
[2]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/integrations/java
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/solr/metadata.csv