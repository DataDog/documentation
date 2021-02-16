---
aliases:
  - /ja/agent/faq/docker-jmx
categories:
  - languages
ddtype: チェック
dependencies: []
description: Yammer メトリクスライブラリを使用して、アプリケーションからカスタムメトリクスを収集します。
doc_link: 'https://docs.datadoghq.com/integrations/java/'
draft: false
further_reading:
  - link: 'https://docs.datadoghq.com/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect'
    tag: よくあるご質問
    text: JMX インテグレーションに一致する Bean がありますが、データが収集できません。
  - link: 'https://docs.datadoghq.com/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/'
    tag: よくあるご質問
    text: jConsole で JMX データを表示し、jmx.yaml でデータの収集をセットアップする
  - link: 'https://docs.datadoghq.com/integrations/faq/jmx-yaml-error-include-section/'
    tag: よくあるご質問
    text: 'jmx.yaml error: Include Section'
  - link: 'https://docs.datadoghq.com/integrations/faq/collecting-composite-type-jmx-attributes/'
    tag: よくあるご質問
    text: 複合型の JMX 属性を収集する
  - link: 'https://docs.datadoghq.com/integrations/faq/how-to-run-jmx-commands-in-windows/'
    tag: よくあるご質問
    text: Windows で JMX コマンドを実行する
git_integration_title: java
has_logo: true
integration_title: JMX
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: java
public_title: Datadog-JMX インテグレーション
short_description: Yammer メトリクスライブラリを使用して、アプリケーションからカスタムメトリクスを収集。
version: '1.0'
---
## 概要

Java インテグレーションを利用して、Java アプリケーションからメトリクス、トレース、ログを収集できます。

## セットアップ

### メトリクスの収集

アプリケーションで [JMX][1] メトリクスが公開されている場合、Datadog Agent から軽量の Java プラグインである JMXFetch (Java 1.7 以上とのみ互換) が呼び出され、MBean サーバーに接続してアプリケーションのメトリクスを収集します。また、監視対象のインスタンスのステータスを報告するサービスチェックを送信することも可能です。このプラグインは、Agent 内で稼働する [DogStatsD][2] サーバーを使用して Datadog Agent にメトリクスを送信します。このインテグレーションでは以下の JMX メトリクスも同様に使用されます。

- ActiveMQ 
- Cassandra
- Solr
- Tomcat
- Kafka

**注**: JMX チェックには、デフォルトでインスタンスあたり 350 メトリクスの制限が設けられています。メトリクスの追加が必要な場合は、[Datadog のサポートチーム][3]にお問い合わせください。

#### インストール

[JMX リモート接続を開く][4]ことができるかをご確認ください。Datadog Agent が JVM に接続するためには、両者が同じホスト上にある場合でもリモート接続が必要です。セキュリティ上の理由から、リスニングアドレスには `0.0.0.0` を使用しないことをお勧めします。同じ場所に配置された JVM と Agent には `com.sun.management.jmxremote.host=127.0.0.1` を使用することをお勧めします。

#### コンフィギュレーション

Agent をホスト上のバイナリとして実行している場合は、JMX チェックを[別の Agent インテグレーション][5]として構成します。Agent を Kubernetes の DaemonSet として実行している場合は、[オートディスカバリー](?tab=docker#configuration)を使用して JMX チェックを構成します。

{{< tabs >}}
{{% tab "Host" %}}

- JMX に接続するように Agent を構成します。[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `jmx.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションについては、以下の[コンフィギュレーションオプション](#configuration-options) または [init_config][2] と [instance][3] テンプレートを参照してください。

    ```yaml
      init_config:
        is_jmx: true
        collect_default_metrics: true
        # custom_jar_paths:
        #  - <CUSTOM_JAR_FILE_PATH>.jar

      instances:
        - host: localhost
          port: port
          user: username
          password: password
          name: jmx_instance_name
    ```

- [Agent を再起動します][4]。

**注**: 複数の JMX チェックを実行するには、コンフィギュレーションファイルを `jmx_<INDEX>.d/conf.yaml` の形式で作成します (`jmx_1.d/conf.yaml`、`jmx_2.d/conf.yaml` など)。各フォルダーは、`conf.d` ディレクトリに保存し、コンフィギュレーションファイルに、`is_jmx` を `true` に設定したオプションを含める必要があります。


[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/init_config/jmx.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/datadog_checks_dev/datadog_checks/dev/tooling/templates/configuration/instances/jmx.yaml
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

[Datadog Agent コンテナ][1]を実行するための標準 `gcr.io/datadoghq/agent:latest` イメージには JMX がインストールされていません。**`gcr.io/datadoghq/agent:latest-jmx` イメージ**を使用してください。このイメージは `gcr.io/datadoghq/agent:latest` に基づいていますが、Agent が [jmxfetch][2] を実行するために必要な JVM が含まれています。

いずれかのコンテナで JMX チェックを実行するには、以下の手順を実行します。

1. JMX チェック構成ファイルを作成します。それには、[ホスト](?tab=host)を参照するか、Datadog が公式にサポートしている以下の JMX インテグレーションの JMX チェック構成ファイルを使用します。

    - [ActiveMQ][2]
    - [Cassandra][3]
    - [Solr][4]
    - [Tomcat][5]
    - [Kafka][6]

2. `-v <HOST_FOLDER_PATH>:/conf.d` を使用して、Datadog Agent の `conf.d/` フォルダー内にファイルをマウントします。詳細は、[チェックテンプレートの設定][7]ドキュメントを参照してください。

**注**: `%%port%%` を使用すると問題が多いことがわかっています。問題が発生した場合の最善の回避策は、`%%port%%` の代わりに、JMX ポートをハードコーディングすることです。


[1]: https://app.datadoghq.com/account/settings#agent/docker
[2]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[5]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[6]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=file#configuration
{{% /tab %}}
{{< /tabs >}}

##### コンフィギュレーションオプション

| オプション                                        | 必須 | 説明                                                                                                                                                                                                                                                                                                                                                                                                             |
|-----------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `custom_jar_paths`                            | ✕       | Agent の JVM のクラスパスに追加されるカスタムの jar を指定できます。                                                                                                                                                                                                                                                                                                                                       |
| `jmx_url`                                     | ✕       | Agent がデフォルト以外の JMX URL に接続する必要がある場合は、ホストとポートの代わりにここで指定します。これを使用する場合は、`name` などを指定する必要があります。                                                                                                                                                                                                                                                      |
| `is_jmx`                                      | ✕       | 1 つの長い JMX ファイルを使用する代わりに、各アプリケーションの各構成ファイルを作成できます。[構成](#configuration)セクションの注で説明したように、各構成ファイルにオプションを含めます。                                                                                                                                                                                   |
| `collect_default_jvm_metrics`                 | ✕       | インテグレーションでデフォルトの JVM メトリクス (`jvm.*`) を収集するよう指示します。デフォルトは true です。                                                                                                                                                                                                                                                                                                                                 |
| `collect_default_metrics`                     | ✕       | 各インテグレーションは、収集するデフォルトの Bean のリストを含む `metrics.yaml` ファイルを含みます。これを `True` に設定すると、明示的に yaml ファイルに追加しなくても、これらのメトリクスが自動的に収集されます。通常、これを Autodiscovery とのセットアップに使用するには、コンフィギュレーションオブジェクトのサイズを小さくします。[JMX メトリクスを Java トレースエージェントで][6]収集する場合は、適用されません。 |
| `java_bin_path`                               | ✕       | Agent がJava 実行可能ファイルまたはバイナリを検出できない場合、パスを指定します（たとえば `C:/path/to/java.exe` または `/etc/alternatives/java`）                                                                                                                                                                                                                                                                          |
| `java_options`                                | ✕       | Java JVM オプション                                                                                                                                                                                                                                                                                                                                                                                                        |
| `name`                                        | ✕       | `jmx_url` とともに構成で使用されます。                                                                                                                                                                                                                                                                                                                                                                                     |
| `new_gc_metrics`                              | ✕       | ガベージコレクションメトリクスに、より適したメトリクス名を使用するには true に設定します。デフォルトは `false` です                                                                                                                                                                                                                                                                                                                               |
| `process_name_regex`                          | ✕       | ホストとポートまたは `jmx_url` を指定する代わりに、Agent は接続 API を使用して接続できます。これには、JDK をインストールして `tools.jar` のパスを設定する必要があります。                                                                                                                                                                                                                                            |
| `refresh_beans`                               | ✕       | 一致する MBeans リストを更新する更新期間。デフォルトは 600 秒です。この値を小さくすると、CPU 使用率が増加する場合があります。                                                                                                                                                                                                                                                                                |
| `refresh_beans_initial`                       | ✕       | 一致する MBeans リストを初期化直後に更新する更新期間。デフォルト値は `refresh_beans`。                                                                                                                                                                                                                                                                                        |
| `rmi_connection_timeout`                      | ✕       | `host` と `port` または `jmx_url` を使用して JVM に接続するときの接続タイムアウト (ミリ秒単位)。                                                                                                                                                                                                                                                                                                               |
| `rmi_client_timeout`                          | ✕       | 接続された JVM からの応答がない期間をミリ秒単位で指定します。その後、Agent は既存の接続を放棄して再試行します。                                                                                                                                                                                                                                                                      |
| `service`                                     | ✕       | このインテグレーショにより送信されるすべてのメトリクス、イベント、サービスチェックに `service:<SERVICE>` タグをアタッチします。                                                                                                                                                                                                                                                                                                                 |
| `service_check_prefix`                        | ✕       | サービスチェックのカスタムプレフィックス。たとえば `my_prefix` は、`my_prefix.can_connect` というサービスチェックを取得します。設定しない場合は、インテグレーション名がデフォルトで使用されます。                                                                                                                                                                                                                                                                |
| `tools_jar_path`                              | ✕       | `process_name_regex` が設定される場合に設定されます。                                                                                                                                                                                                                                                                                                                                                                             |
| `trust_store_path` および `trust_store_password` | ✕       | SSL が有効な場合に設定する必要があります。                                                                                                                                                                                                                                                                                                                                                                                        |

`conf` パラメーターは、辞書のリストです。この辞書では、次の 2 つのキーのみが許可されます。

| キー       | 必須 | 説明                                                                                                                                |
|-----------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `include` | 〇      | フィルターの辞書 - これらのフィルターに一致する属性は、"exclude" フィルターにも一致している場合を除き、収集されます (以下を参照)。 |
| `exclude` | ✕       | フィルターの辞書 - これらのフィルターと一致する属性は収集されません。                                                           |

タグは実際の MBean 名に基づいてメトリクスに自動的に追加されます。明示的に補足タグを指定できます。たとえば、次の MBean が監視対象のアプリケーションで公開されているとします。

```text
mydomain:attr0=val0,attr1=val1
```

`mydomain` というメトリクス (または Bean 内の属性によるそのバリエーション) をタグ `attr0:val0、attr1:val1、domain:mydomain、simple:val0、raw_value:my_chosen_value、multiple:val0-val1` で作成します。

`include` キー内の指定したエイリアスが_キャメルケース_として書式設定されている場合、_スネークケース_に変換されます。たとえば `MyMetricName` は、Datadog では `my_metric_name` と表示されます。

##### フィルターの説明

各 `include` または `exclude` 辞書は次のキーをサポートします。

| キー                   | 説明                                                                                                                                                                                                      |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `domain`              | ドメイン名またはドメイン名のリスト (例: `java.lang`)。                                                                                                                                                        |
| `domain_regex`        | ドメイン名に一致する正規表現のパターンまたはパターンリスト (例: `java\.lang.*`)。                                                                                                                              |
| `bean` または `bean_name` | Bean 名または完全な Bean 名のリスト (例: `java.lang:type=Compilation`)。                                                                                                                                      |
| `bean_regex`          | 完全な Bean名に一致する正規表現のパターンまたはパターンリスト (例: `java\.lang.*[,:]type=Compilation.*`)。正規表現でキャプチャグループを使用して、タグ値として指定できます。上記のコンフィギュレーション例を参照してください。 |
| `class`               | クラス名のリストのクラス (例: `org.datadog.jmxfetch.SimpleTestJavaApp`)。                                                                                                                                  |
| `class_regex`         | クラス名に一致する正規表現のパターンまたはパターンリスト (例: `org\.datadog\.jmxfetch\.SimpleTestJavaApp`)。                                                                                                 |
| `exclude_tags`        | 最終メトリクスから削除するタグキーのリスト。メトリクスタグの粒度の向上に使用します (例: `["attr1", "id", "partition-id"]`)。                                                           |
| `attribute`           | 属性名のリストまたは辞書 (詳細については以下を参照)。                                                                                                                                          |

**注**:

- `domain_regex` および `bean_regex` で定義された正規表現は、[Java の正規表現形式][7]に従う必要があります。このフィルターはバージョン 5.5.0 で追加されました。
- 正規表現のパターン以外のすべての値では、大文字と小文字が区別されます。

これらのパラメーターに加えて、フィルターは Bean パラメーターで絞り込むことができる「カスタム」キーをサポートします。たとえば、Cassandra キャッシュに関するメトリクスを収集する場合は、`type: - Caches` フィルターを使用することが考えられます。

```yaml
conf:
    - include:
          domain: org.apache.cassandra.db
          type:
              - Caches
```

#### 属性フィルター

`attribute` フィルターは、次の 2 種類の値を受け入れます。

- キーが、ターゲット属性の名前と一致する辞書:

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

    - Datadog でメトリクス名になる属性の `alias` を指定できます。
    - また、メトリクスタイプ（`gauge`、`histogram`、`counter`/`rate`、`monotonic_count`）も指定できます。`counter` を選択すると、メトリクスに対して 1 秒あたりの `rate` が計算され、`gauge` として送信されます。

- ターゲット属性名のリスト:

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

    - メトリクスタイプはデフォルトで gauge です。
    - メトリクス名は `jmx.<DOMAIN_NAME>.<ATTRIBUTE_NAME>` です。

これは別のフィルタリングの例です。

```yaml
instances:
    - host: 127.0.0.1
      name: jmx_instance
      port: 9999

init_config:
    conf:
        - include:
              bean: org.apache.cassandra.metrics:type=ClientRequest,scope=Write,name=Latency
              attribute:
                  - OneMinuteRate
                  - 75thPercentile
                  - 95thPercentile
                  - 99thPercentile
```

#### 検証

[Agent の status サブコマンドを実行][8]し、JMXFetch セクションの JMX チェックを探します。

さらに、JMX チェックには、JMX アプリケーションからメトリクスを収集するデフォルトのコンフィギュレーションがあります。[Metrics Explorer][9] で `jvm.heap_memory`、`jvm.non_heap_memory`、`jvm.gc.cms.count` をチェックします。

### ログの収集

_Agent v6.0 以上で使用可能_

[Java のログコレクションをセットアップ][10]して Datadog にログを送信するには、 個別のドキュメントを参照してください。

### トレースの収集

[Agent でトレースコレクションを有効化][11]した後、[Java アプリケーションのインスツルメンテーション][12]に関するドキュメントを参照して Datadog にトレースを送信します。

## 収集データ

### メトリクス

{{< get-metrics-from-git >}}

**注**: [jmx.d/conf.yaml][13] で `new_gc_metrics: true` と設定すると、次のメトリクスが置き換えられます。

```text
jvm.gc.cms.count   => jvm.gc.minor_collection_count
                      jvm.gc.major_collection_count
jvm.gc.parnew.time => jvm.gc.minor_collection_time
                      jvm.gc.major_collection_time
```

## トラブルシューティング

[JMX トラブルシューティングのコマンドと FAQ ][14]のリストを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html
[2]: https://docs.datadoghq.com/ja/developers/dogstatsd
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://docs.oracle.com/en/java/javase/14/management/monitoring-and-management-using-jmx-technology.html
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/#setting-up-an-integration
[6]: 14
[7]: http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.datadoghq.com/ja/metrics/explorer/
[10]: https://docs.datadoghq.com/ja/logs/log_collection/java/
[11]: https://docs.datadoghq.com/ja/tracing/send_traces/
[12]: https://docs.datadoghq.com/ja/tracing/setup/java/
[13]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jmx.d/conf.yaml.example
[14]: https://docs.datadoghq.com/ja/integrations/faq/troubleshooting-jmx-integrations/