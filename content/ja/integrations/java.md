---
aliases:
  - /ja/agent/faq/docker-jmx
categories:
  - languages
ddtype: チェック
dependencies: []
description: Yammer メトリクスを使用して、アプリケーションからカスタムメトリクスを収集します library.
doc_link: 'https://docs.datadoghq.com/integrations/java/'
further_reading:
  - link: 'https://docs.datadoghq.com/integrations/faq/i-have-a-matching-bean-for-my-jmx-integration-but-nothing-on-collect'
    tag: よくあるご質問
    text: JMX インテグレーションに一致する Bean がありますが収集できません
  - link: 'https://docs.datadoghq.com/integrations/faq/view-jmx-data-in-jconsole-and-set-up-your-jmx-yaml-to-collect-them/'
    tag: よくあるご質問
    text: jConsole の JMX データを表示し、収集するように jmx.yaml をセットアップするには
  - link: 'https://docs.datadoghq.com/integrations/faq/jmx-yaml-error-include-section/'
    tag: よくあるご質問
    text: 'jmx.yaml エラー: セクションの include'
  - link: 'https://docs.datadoghq.com/integrations/faq/collecting-composite-type-jmx-attributes/'
    tag: よくあるご質問
    text: 複合タイプ JMX 属性の収集
  - link: 'https://docs.datadoghq.com/integrations/faq/how-to-run-jmx-commands-in-windows/'
    tag: よくあるご質問
    text: JMX コマンドの Windows での実行方法
git_integration_title: java
has_logo: true
integration_title: JMX
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: java
public_title: Datadog-JMX インテグレーション
short_description: Yammer を使用して、アプリケーションからカスタムメトリクスを収集します Metrics library.
version: '1.0'
---
## 概要

<div class="alert alert-warning">
  JMXFetch は、Java 1.7 以上とのみ互換性があります。
</div>

JMX インテグレーションは、[JMX][1] メトリクスを公開するアプリケーションからメトリクスを収集します。

JMXFetch という名前の軽量の Java プラグインが Datadog Agent によって呼び出され、MBean Server に接続してメトリクスを収集し、監視対象のインスタンスのステータスを報告するサービスチェックを送信します。

このプラグインは、Agent 内で実行される DogStatsD サーバーを使用してメトリクスを Datadog Agent に送信します。また、これらのインテグレーションは JMX メトリクスも使用します。

* ActiveMQ 
* Cassandra
* Solr
* Tomcat
* Kafka

**注**: デフォルトで、JMX チェックには、インスタンスあたり 350 メトリクスの制限があります。メトリクスの追加が必要な場合は、[Datadog のサポートチーム][8]にお問い合わせください。

## セットアップ
### インストール

[JMX リモート接続][3]を開くことができることを確認します。リモート接続は、Datadog Agent を JVM に接続するために必要です。両方が同じホスト上にある場合でも同様です。

### コンフィグレーション

Agent をホスト上のバイナリとして実行している場合は、JMX チェックを[別の Agent インテグレーション][11]として構成します。Agent を Kubernetes の DaemonSet として実行している場合は、[オートディスカバリー](?tab=docker#configuration)を使用して JMX チェックを構成します。

{{< tabs >}}
{{% tab "Host" %}}

JMX を使用して、接続する Agent を構成し、必要に合わせて編集します。以下はサンプルファイル `jmx.d/conf.yaml` です。

```
init_config:
  #custom_jar_paths:
  #  - <CUSTOM_JAR_FILE_PATH>.jar
  #is_jmx: true

instances:
  - host: <JMX_INSTANCE_ENDPOINT>
    port: <JMX_PORT>
    user: <USER_NAME>
    password: <PASSWORD>

    jmx_url: "service:jmx:rmi:///jndi/rmi://myhost.host:9999/<CUSTOM_PATH>" # 任意

    name: <JMX_INSTANCE_NAME>
    java_bin_path: <JAVA_PATH>
    java_options: "-Xmx200m -Xms50m"
    trust_store_path: <TRUST_STORE_PATH>.jks
    trust_store_password: <PASSWORD>

    process_name_regex: .*<PROCESS_NAME>.*
    tools_jar_path: /usr/lib/jvm/java-7-openjdk-amd64/lib/tools.jar
    refresh_beans: 600
    tags:
      env: stage
      <TAG_KEY>:<TAG_VALUE>

    conf:
      - include:
          domain: <DOMAIN_NAME_1>
          tags:
              simple: $attr0
              raw_value: <CHOOSEN_VALUE>
              multiple: $attr0-$attr1
          bean:
            - <BEAN_NAME_1>
            - <BEAN_NAME_2>
          attribute:
            attribute1:
              metric_type: counter
              alias: jmx.<METRIC_NAME_ATTRIBUTE_1>
            attribute2:
              metric_type: gauge
              alias: jmx.<METRIC_NAME_ATTRIBUTE_2>
            attribute3:
              metric_type: monotonic_count
              alias: jmx.<METRIC_NAME_ATTRIBUTE_3>

      - include:
          domain: <DOMAIN_NAME_2>
        exclude:
          bean:
            - <EXCLUDED_BEAN_NAME>
      - include:
          domain_regex: <DOMAIN_REGEX>
        exclude:
          bean_regex:
            - <EXCLUDED_BEAN_NAME_REGEX>
      - include:
          bean_regex: regex_topic=(.*?)
          attribute:
            atteibute1:
              metric_type: gauge
              alias: jmx.<ATTRIBUTE_NAME_WITH_REGEX_TAG>

          ## 以下は、jmx.<ATTRIBUTE_NAME_WITH_REGEX_TAG> Bean とタグを送信します。
          ## `hostregex:<beanParameter>`
          ## `typeregex:<beanParameter>`
          ## `contextregex<beanParameter>`
          ## `optional:tag`
          tags:
              TypeRegex: $1
              HostRegex: $2
              contextRegex: $3
              optional: tag
```

**注**: 複数の JMX チェックを実行するには、構成ファイルを `jmx_<INDEX>.d/conf.yaml` の形式で作成します (`jmx_1.d/conf.yaml`、`jmx_2.d/conf.yaml` など)。各フォルダーは、`conf.d` ディレクトリに保存する必要があります。これらの構成ファイルには、`is_jmx` を `true` に設定したオプションを含めます。

{{% /tab %}}
{{% tab "Docker" %}}

[Datadog Agent コンテナ][1]を実行するための標準 `datadog/agent:latest` イメージに JMX はインストールされていません。**`datadog/agent:latest-jmx` イメージ**を使用してください。このイメージは `datadog/agent:latest` に基づいていますが、Agent が [jmxfetch][3] を実行するために必要な JVM を含んでいます。

コンテナの 1 つに JMX チェックを実行するには、以下の手順を実行します。

1. JMX チェック構成ファイルを作成します。それには、[ホスト](?tab=host)を参照するか、Datadog が公式にサポートしている以下の JMX インテグレーションの JMX チェック構成ファイルを使用します。
  * [ActiveMQ][3]
  * [Cassandra][4]
  * [Solr][5]
  * [Tomcat][6]
  * [Kafka][7]

2. `-v <HOST_FOLDER_PATH>:/conf.d` を使用して、Datadog Agent の `conf.d/` フォルダー内にファイルをマウントします。詳細については、[チェックテンプレートの設定][8]に関するドキュメントを参照してください。

**注**: `%%port%%` を使用すると問題が多いことがわかっています。問題が発生した場合の最善の回避策は、`%%port%%` の代わりに、JMX ポートをハードコーディングすることです。

[1]: https://app.datadoghq.com/account/settings#agent/docker
[2]: https://github.com/DataDog/jmxfetch
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[5]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[6]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[7]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/autodiscovery/?tab=files#setting-up-check-templates
{{% /tab %}}
{{< /tabs >}}

#### 構成オプション

| オプション                                        | 必須 | 説明                                                                                                                                                                                                                                                                                                                               |
|-----------------------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `custom_jar_paths`                            | なし       | Agent の JVM のクラスパスに追加されるカスタムの jar を指定できます。                                                                                                                                                                                                                                                         |
| `jmx_url`                                     | なし       | Agent がデフォルト以外の JMX URL に接続する必要がある場合は、ホストとポートの代わりにここで指定します。これを使用する場合は、`name` などを指定する必要があります。                                                                                                                                                                        |
| `is_jmx`                                      | なし       | 1 つの長い JMX ファイルを使用する代わりに、各アプリケーションの各構成ファイルを作成できます。[構成](#configuration)セクションの注で説明したように、各構成ファイルにオプションを含めます。                                                                                                     |
| `collect_default_metrics`                     | なし       | 各インテグレーションは、収集するデフォルトの Bean のリストを含む `metrics.yaml` ファイルを含みます。これを `True` に設定すると、明示的に yaml ファイルに追加しなくても、これらのメトリクスが自動的に収集されます。通常、これを Autodiscovery とのセットアップに使用するには、構成オブジェクトのサイズを小さくします。 |
| `name`                                        | なし       | `jmx_url` とともに構成で使用されます。                                                                                                                                                                                                                                                                                                       |
| `java_bin_path`                               | なし       | Agent が Java 実行可能ファイルを検出できない場合に設定する必要があります。                                                                                                                                                                                                                                                                              |
| `java_options`                                | なし       | Java JVM オプション                                                                                                                                                                                                                                                                                                                          |
| `trust_store_path` および `trust_store_password` | なし       | SSL が有効な場合に設定する必要があります。                                                                                                                                                                                                                                                                                                          |
| `process_name_regex`                          | なし       | ホストとポートまたは `jmx_url` を指定する代わりに、Agent は接続 API を使用して接続できます。これには、JDK をインストールして `tools.jar` のパスを設定する必要があります。                                                                                                                                                              |
| `tools_jar_path`                              | なし       | `process_name_regex` が設定される場合に設定されます。                                                                                                                                                                                                                                                                                               |
| `refresh_beans`                               | なし       | 一致する MBeans リストを更新する更新期間。デフォルトは 600 秒です。この値を小さくすると、CPU 使用率が増えることがあります。                                                                                                                                                                                                |

`conf` パラメーターは、辞書のリストです。この辞書では、次の 2 つのキーのみが許可されます。

| キー       | 必須 | 説明                                                                                                                                |
|-----------|----------|--------------------------------------------------------------------------------------------------------------------------------------------|
| `include` | はい      | フィルターの辞書 - これらのフィルターに一致する属性は、"exclude" フィルターにも一致している場合を除き、収集されます (以下を参照)。 |
| `exclude` | なし       | フィルターの辞書 - これらのフィルターと一致する属性は収集されません。                                                          |

タグは実際の MBean 名に基づいてメトリクスに自動的に追加されます。明示的に補足タグを指定できます。たとえば、次の MBean が監視対象のアプリケーションで公開されているとします。

```
mydomain:attr0=val0,attr1=val1
```

`mydomain` というメトリクス (または Bean 内の属性によるそのバリエーション) をタグ `attr0:val0、attr1:val1、domain:mydomain、simple:val0、raw_value:my_chosen_value、multiple:val0-val1` で作成します。

`include` キー内の指定したエイリアスがキャメルケースとして書式設定されている場合、スネークケースに変換されます。たとえば `MyMetricName` は、Datadog では `my_metric_name` と表示されます。

#### フィルターの説明

各 `include` または `exclude` 辞書は次のキーをサポートします。

| キー                   | 説明                                                                                                                                                                              |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `domain`              | ドメイン名のリスト (`java.lang`)。                                                                                                                                               |
| `domain_regex`        | ドメイン名の正規表現のリスト (`java\.lang.*` など)。                                                                                                                              |
| `bean` または `bean_name` | 完全な Bean 名のリスト (例: `java.lang:type=Compilation`)。                                                                                                                           |
| `bean_regex`          | 完全な Bean 名の正規表現によるリスト (例: `java\.lang.*[,:]type=Compilation.*`)。正規表現でキャプチャグループを使用して、タグ値として指定できます。上の構成例を参照してください。 |
| `attribute`           | 属性名のリストまたは辞書 (詳細については以下を参照)。                                                                                                                  |

`domain_regex` と `bean_regex` で定義されている正規表現は、[Java の正規表現形式][4]に従う必要があります。

`domain_regex` および `bean_regex` フィルターはバージョン 5.5.0 で追加されました。

これらのパラメーターに加えて、フィルターは Bean パラメーターで絞り込むことができる「カスタム」キーをサポートします。たとえば、Cassandra キャッシュに関するメトリクスを収集する場合は、`type: - Caches` フィルターを使用することが考えられます。

```yaml
conf:
- include:
    domain: org.apache.cassandra.db
    type:
      - Caches
```

### 属性フィルター

`attribute` フィルターは、次の 2 種類の値を受け入れます。

* キーが属性名の辞書。

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


この場合、メトリクスのエイリアスを指定でき、それが Datadog でのメトリクス名になります。メトリクスタイプには `gauge`、`histogram`、`counter`/`rate` 、`monotonic_count` があり、いずれかを指定することもできます。`counter` を選択した場合は、このメトリクスの 1 秒あたりの `rate` が計算され、`gauge` として送信されます。

* 属性名のリスト。

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

  この場合、

    * メトリクスタイプはゲージです。
    * メトリクス名は `jmx.<DOMAIN_NAME>.<ATTRIBUTE_NAME>` です。

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
    ...


    # 古い Datadog Agent バージョン
      conf:
        - include:
            domain: domain_name
            bean: first_bean_name
        - include:
            domain: domain_name
            bean: second_bean_name
    ...
```

### 検証

[Agent の status サブコマンドを実行][5]し、JMXFetch セクションの JMX チェックを探します。

さらに、JMX チェックのデフォルト構成では、JMX アプリケーションから 11 のメトリクスを収集します。`jvm.heap_memory`、`jvm.non_heap_memory`、または `jvm.gc.cms.count` については、[Metrics Explorer][6] を参照してください。

## 収集データ
### メトリクス

{{< get-metrics-from-git >}}

**注**: [jmx.d/conf.yaml][12] で `new_gc_metrics: true` と設定すると、次のメトリクスが置き換えられます。

```
jvm.gc.cms.count   => jvm.gc.minor_collection_count
                      jvm.gc.major_collection_count
jvm.gc.parnew.time => jvm.gc.minor_collection_time
                      jvm.gc.major_collection_time
```

## トラブルシューティング

[JMX トラブルシューティングのコマンドと FAQ ][7]のリストを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://www.oracle.com/technetwork/java/javase/tech/javamanagement-140525.html
[3]: http://docs.oracle.com/javase/1.5.0/docs/guide/management/agent.html
[4]: http://docs.oracle.com/javase/6/docs/api/java/util/regex/Pattern.html
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/graphing/metrics/explorer
[7]: https://docs.datadoghq.com/ja/integrations/faq/troubleshooting-jmx-integrations
[8]: https://docs.datadoghq.com/ja/help
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#restart-the-agent
[10]: https://tomcat.apache.org/tomcat-7.0-doc/config/listeners.html#JMX_Remote_Lifecycle_Listener_-_org.apache.catalina.mbeans.JmxRemoteLifecycleListener
[11]: https://docs.datadoghq.com/ja/getting_started/integrations/#setting-up-an-integration
[12]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/jmx.d/conf.yaml.example


{{< get-dependencies >}}