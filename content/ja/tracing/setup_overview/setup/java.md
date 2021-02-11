---
title: Java アプリケーションのトレース
kind: documentation
aliases:
  - /ja/tracing/java
  - /ja/tracing/languages/java
  - /ja/agent/apm/java/
  - /ja/tracing/setup/java
  - /ja/tracing/setup_overview/java
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-java'
    tag: GitHub
    text: Datadog Java APM ソースコード
  - link: tracing/visualization/
    tag: Documentation
    text: サービス、リソース、トレースを調査する
---
## 互換性要件

Java Tracing Library は、バージョン 7 以降のすべてのプラットフォームですべての JVM をサポートします。[Continuous Profiler][1] でトレースを利用するには、OpenJDK 11 以降、Oracle Java 11 以降、ほとんどのベンダー向けの OpenJDK 8 (バージョン8u262 以降)、および Zulu Java 8 以降 (マイナーバージョン 1.8.0_212 以降) がサポートされています。バージョン 8u272 以降、すべてのベンダーがプロファイラーでサポートされるようになります。

Scala (バージョン 2.10.x - 2.13.x)、Groovy、Kotlin、Clojure などのすべての JVM ベースの言語が、Java トレーサーとプロファイラーでサポートされています。サポート対象のライブラリの一覧については、[互換性要件][2]ページをご覧ください。

## インストールと利用開始

### アプリ内のドキュメントに従ってください (推奨)

Datadog アプリ内の[クイックスタート手順][3]に従って、最高のエクスペリエンスを実現します。例:

- デプロイコンフィギュレーション (ホスト、Docker、Kubernetes、または Amazon ECS) を範囲とする段階的な手順。
- `service`、`env`、`version` タグを動的に設定します。
- セットアップ中に Continuous Profiler、トレースの 100% の取り込み、およびトレース ID 挿入を有効にします。

### Java のインストール手順

もしくは、各言語で作成されたアプリケーションをトレースする場合は以下の操作を行ってください。

1. 最新の Agent クラスファイルが含まれる `dd-java-agent.jar` をダウンロードします:

   ```shell
   wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```
   トレーサーの特定のバージョンにアクセスするには、Datadog の [Maven リポジトリ][16]を参照してください。

2. アプリケーションの起動時に IDE、Maven または Gradle アプリケーションスクリプト、または `java -jar` コマンドに次の JVM 引数を追加します:

   ```text
    -javaagent:/path/to/the/dd-java-agent.jar
   ```

3. トレース用の[コンフィギュレーションオプション](#コンフィギュレーション)を追加し、特に、サービス、環境、ログインジェクション、プロファイリング、およびオプションでランタイムメトリクス (使用予定のすべてのメトリクス) に対して、環境変数を設定しているか、システムプロパティを JVM 引数として渡していることを確認します。以下の例を参照してください。なお、アプリ内クイックスタート手順を使用すると、これらが生成されます。

### APM に Datadog Agent を構成する

インスツルメントされたアプリケーションからトレースを受信するように Datadog Agent をインストールして構成します。デフォルトでは、Datadog Agent は `datadog.yaml` ファイルの `apm_enabled: true` で有効になっており、`localhost:8126` でトレーストラフィックをリッスンします。コンテナ化環境の場合、以下のリンクに従って、Datadog Agent 内でトレース収集を有効にします。

{{< tabs >}}
{{% tab "コンテナ" %}}

1. メインの [`datadog.yaml` コンフィギュレーションファイル][1]で `apm_non_local_traffic: true` を設定します

2. コンテナ化された環境でトレースを受信するように Agent を構成する方法については、それぞれの説明を参照してください。

{{< partial name="apm/apm-containers.html" >}}
</br>

3. アプリケーションをインスツルメント化した後、トレースクライアントはデフォルトでトレースを `localhost:8126` に送信します。これが正しいホストとポートでない場合は、以下の環境変数を設定して変更します。

`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT`

```bash
java -javaagent:<DD-JAVA-エージェントパス>.jar -jar <アプリケーションパス>.jar
```

システムプロパティを使うこともできます:

```bash
java -javaagent:<DD-JAVA-エージェントパス>.jar \
     -Ddd.agent.host=$DD_AGENT_HOST \
     -Ddd.agent.port=$DD_TRACE_AGENT_PORT \
     -jar <アプリケーションパス>.jar
```


[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

AWS Lambda で Datadog APM を設定するには、[サーバーレス関数のトレース][1]ドキュメントを参照してください。


[1]: /ja/tracing/serverless_functions/
{{% /tab %}}
{{% tab "その他の環境" %}}

トレースは、[Heroku][1]、[Cloud Foundry][2]、[AWS Elastic Beanstalk][3]、[Azure App Services Extension][4] など、他の多くの環境で利用できます。

その他の環境については、その環境の[インテグレーション][5]のドキュメントを参照し、セットアップの問題が発生した場合は[サポートにお問い合わせ][6]ください。

[1]: /ja/agent/basic_agent_usage/heroku/#installation
[2]: /ja/integrations/cloud_foundry/#trace-collection
[3]: /ja/integrations/amazon_elasticbeanstalk/
[4]: /ja/infrastructure/serverless/azure_app_services/#overview
[5]: /ja/integrations/
[6]: /ja/help/
{{% /tab %}}
{{< /tabs >}}

### Java トレーサーを JVM に追加する

アプリケーションサーバーのドキュメントを使用して、`-javaagent` およびその他の JVM 引数を渡す正しい方法を確認してください。一般的に使用されるフレームワークの手順は次のとおりです。

{{< tabs >}}
{{% tab "Spring Boot" %}}

アプリの名前が `my_app.jar` の場合は、以下を含む `my_app.conf` を作成します。

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

詳細については、[Spring Boot のドキュメント][1]を参照してください。


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

Tomcat 起動スクリプトファイル (たとえば、Linux では `setenv.sh`) を開き、次を追加します。

```text
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

Windows では、`setenv.bat`:

```text
set CATALINA_OPTS_OPTS=%CATALINA_OPTS_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
```
`setenv` ファイルが存在しない場合は、Tomcat プロジェクトフォルダーの `./bin` ディレクトリで作成します。

{{% /tab %}}
{{% tab "JBoss" %}}

`standalone.sh` の末尾に次の行を追加します。

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

Windows では、`standalone.conf.bat` の末尾に次の行を追加します。

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

詳細については、[JBoss のドキュメント][1]を参照してください。


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

`jetty.sh` を使用して Jetty をサービスとして開始する場合は、編集して次を追加します。

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

`start.ini` を使用して Jetty を起動する場合は、次の行を追加します(`--exec` の下に。まだ存在しない場合は `--exec` 行を追加します)。

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

管理コンソールで:

1. **Servers** を選択します。**Server Type** で、**WebSphere application servers** を選択し、サーバーを選択します。
2. **Java and Process Management > Process Definition** を選択します。
3. **Additional Properties** セクションで、**Java Virtual Machine** をクリックします。
4. **Generic JVM arguments** テキストフィールドに次のように入力します。

```text
-javaagent:/path/to/dd-java-agent.jar
```

詳細とオプションについては、[WebSphere のドキュメント][1]を参照してください。

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**注**

- `-javaagent` 引数を `java -jar` コマンドに追加する場合は、`-jar` 引数の_前_に追加する必要があります。つまり、アプリケーション引数としてではなく、JVM オプションとして追加する必要があります。例:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

  詳細については、[Oracle のドキュメント][4]を参照してください。

- classpath に `dd-java-agent` を追加しないでください。予期せぬ挙動が生じる場合があります。

## 自動でデータと収集

Java の自動インスツルメンテーションは、[JVM によって提供される][5] `java-agent` インスツルメンテーション機能を使用します。`java-agent` が登録されている場合は、ロード時にクラスファイルを変更することができます。

インスツルメンテーションの由来は自動インスツルメンテーション、OpenTracing api、または両者の混合になる場合があります。一般的に、インスツルメンテーションは次の情報を取得します:

- OpenTracing API からタイムスタンプが提供されない限り、JVM のナノタイムクロックを使ってタイミング時間が取得されます
- キー/値タグペア
- アプリケーションによって処理されていないエラーとスタックトレース
- システムを通過するトレース (リクエスト) の合計数

## コンフィギュレーション

以下のすべてのコンフィギュレーションオプションには、同等のシステムプロパティと環境変数があります。
両方に同じキータイプが設定されている場合は、システムプロパティコンフィギュレーションが優先されます。
システムプロパティは、JVM フラグとして設定できます。


| システムプロパティ                        | 環境変数                   | デフォルト                           | 説明                                                                                                                                                                                                                                                           |
| -------------------------------------- | -------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dd.service`                      | `DD_SERVICE`                      | `unnamed-java-app`                | 同一のジョブを実行するプロセスセットの名前。アプリケーションの統計のグループ化に使われます。バージョン 0.50.1 以降で利用可能。                                                                                                                                                                    |
| `dd.tags`                              | `DD_TAGS`                              | `null`                            | (例: `layer:api,team:intake`) すべてのスパン、プロファイル、JMX メトリクスに追加されるデフォルトタグのリスト。DD_ENV または DD_VERSION が使用される場合、DD_TAGS で定義される env または version タグをオーバーライドします。バージョン 0.50.1 以降で利用可能。  |
|`dd.env`                              | `DD_ENV`                              | `none`                            | アプリケーション環境（例、production、staging など）。0.48+ 以降のバージョンで利用可能。                                                    |
| `dd.version`                              | `DD_VERSION`                              | `null`                            | アプリケーションバージョン（例、2.5、202003181415、1.3-alpha など）。0.48+ 以降のバージョンで利用可能。             |
| `dd.logs.injection`                    | `DD_LOGS_INJECTION`                    | false                             | Datadog トレース ID とスパン ID に対する自動 MDC キー挿入の有効化。詳しくは、[高度な使用方法][6]を参照してください。   |
| `dd.trace.config`                      | `DD_TRACE_CONFIG`                      | `null`                            | 構成プロパティが行ごとに 1 つ提供されている、ファイルへのオプションパス。たとえば、ファイルパスは `-Ddd.trace.config=<ファイルパス>.properties` 経由として、ファイルのサービス名に `dd.service=<SERVICE_NAME>` を設定して提供することができます。 |
| `dd.service.mapping`                   | `DD_SERVICE_MAPPING`                   | `null`                            | (例: `mysql:my-mysql-service-name-db, postgres:my-postgres-service-name-db`) コンフィギュレーション経由でサービス名を動的に変更します。サービス間でデータベースの名前を区別する場合に便利です。                                                                                                       |
| `dd.writer.type`                       | `DD_WRITER_TYPE`                       | `DDAgentWriter`                   | デフォルト値はトレースを Agent に送信します。代わりに `LoggingWriter` で構成すると、トレースがコンソールに書き出されます。                       |
| `dd.agent.host`                        | `DD_AGENT_HOST`                        | `localhost`                       | トレースの送信先のホスト名。コンテナ化された環境を使う場合は、これを構成してホスト IP にします。詳しくは、[Docker アプリケーションのトレース][7]を参照してください。                                                                                                  |
| `dd.trace.agent.port`                  | `DD_TRACE_AGENT_PORT`                  | `8126`                            | 構成されたホストに対して Agent がリッスンしているポート番号。                                                                                |
| `dd.trace.agent.unix.domain.socket`    | `DD_TRACE_AGENT_UNIX_DOMAIN_SOCKET`    | `null`                            | これは、トレーストラフィックをプロキシに送り、その後リモート Datadog Agent に送信するために使うことができます。                                                            |
| `dd.trace.agent.url`                   | `DD_TRACE_AGENT_URL`                   | `null`                            | トレースを送信する URL。`http://` (HTTP を使用) もしくは `unix://` ( Unix ドメインソケットを使用）のいずれかで始まります。この設定は `DD_AGENT_HOST` および `DD_TRACE_AGENT_PORT` よりも優先されます。バージョン 0.65 以上で使用可能です。 |
| `dd.trace.agent.timeout`               | `DD_TRACE_AGENT_TIMEOUT`               | `10`                              | Datadog Agent とのネットワークインタラクションのタイムアウト (秒)。                                                                                                                                                                                                   |
| `dd.trace.header.tags`                 | `DD_TRACE_HEADER_TAGS`                 | `null`                            | (例: `CASE-insensitive-Header:my-tag-name,User-ID:userId`) 名前をタグ付けするヘッダーキーのマップ。ヘッダー値がトレースのタグとして自動的に提供されます。                                                                                                               |
| `dd.trace.annotations`                 | `DD_TRACE_ANNOTATIONS`                 | ([こちらを参照][8])               | (例: `com.some.Trace;io.other.Trace`) `@Trace` として処理するメソッドアノテーションのリスト。                                            |
| `dd.trace.methods`                     | `DD_TRACE_METHODS`                     | `null`                            | (例: `"package.ClassName[method1,method2,...];AnonymousClass$1[call];package.ClassName[*]"`) トレースするクラス/インターフェイスとメソッドのリスト。`@Trace` の追加と似ていますが、コードの変更はありません。**注:** ワイルドカード型メソッドのサポート (`[*]`) は、コンストラクター、get アクセス操作子、set アクセス操作子、synthetic、toString、等号、ハッシュコード、またはファイナライザーメソッドのコールに対応しません。    |
| `dd.trace.partial.flush.min.spans`     | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`     | `1000`                            | フラッシュする部分スパンの数を設定します。大量のトラフィック処理や長時間のトレース実行時にメモリのオーバーヘッドを軽減する際に役立ちます。     |
| `dd.trace.split-by-tags`               | `DD_TRACE_SPLIT_BY_TAGS`               | `null`                            | (例: `aws.service`) 対応するサービスタグで特定されるよう、スパンの名前を変えるために使われます                                       |
| `dd.trace.db.client.split-by-instance` | `DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE` | `false`                           | `true` に設定すると、db スパンにインスタンス名がサービス名として割り当てられます                                                                     |
| `dd.trace.health.metrics.enabled`      | `DD_TRACE_HEALTH_METRICS_ENABLED`      | `false`                           | `true` に設定すると、トレーサーヘルスメトリクスが送信されます                                                                                             |
| `dd.trace.health.metrics.statsd.host`  | `DD_TRACE_HEALTH_METRICS_STATSD_HOST`  | `dd.jmxfetch.statsd.host` と同じ | ヘルスメトリクスの送信先の Statsd ホスト                                                                                                     |
| `dd.trace.health.metrics.statsd.port`  | `DD_TRACE_HEALTH_METRICS_STATSD_PORT`  | `dd.jmxfetch.statsd.port` と同じ | ヘルスメトリクスの送信先の Statsd ポート                                                                                                    |
| `dd.http.client.tag.query-string`      | `DD_HTTP_CLIENT_TAG_QUERY_STRING`      | `false`                           | `true` に設定すると、クエリ文字列パラメーターとフラグメントがウェブクライアントスパンに追加されます                                                    |
| `dd.http.client.error.statuses`        | `DD_HTTP_CLIENT_ERROR_STATUSES`        | `400-499`                           | 許容可能なエラーの範囲。デフォルトで 4xx エラーは HTTP クライアントのエラーとしてレポートされます。このコンフィギュレーションはこれをオーバーライドします。例: `dd.http.client.error.statuses=400-499`                                                                                                    |
| `dd.http.server.error.statuses`        | `DD_HTTP_SERVER_ERROR_STATUSES`        | `500-599`                           | 許容可能なエラーの範囲。デフォルトで 5xx ステータスコードは HTTP サーバーのエラーとしてレポートされます。このコンフィギュレーションはこれをオーバーライドします。例: `dd.http.server.error.statuses=500-599`                                                                                                    |
| `dd.http.server.tag.query-string`      | `DD_HTTP_SERVER_TAG_QUERY_STRING`      | `false`                           | `true` に設定すると、クエリ文字列パラメーターとフラグメントがウェブサーバースパンに追加されます                                                     |
| `dd.trace.enabled`                     | `DD_TRACE_ENABLED`                     | `true`                            | `false` トレースエージェントが無効の時                                                                                                 |
| `dd.jmxfetch.enabled`                  | `DD_JMXFETCH_ENABLED`                  | `true`                            | Java トレースエージェントによる JMX メトリクスの収集を有効にします。                                                                                  |
| `dd.jmxfetch.config.dir`               | `DD_JMXFETCH_CONFIG_DIR`               | `null`                            | (例: `/opt/datadog-agent/etc/conf.d`) JMX メトリクスコレクションの追加構成ディレクトリ。Java エージェントは `yaml` ファイルの `instance` セクションの `jvm_direct:true` を探してコンフィギュレーションを変更します。                                            |
| `dd.jmxfetch.config`                   | `DD_JMXFETCH_CONFIG`                   | `null`                            | (例: `activemq.d/conf.yaml,jmx.d/conf.yaml`) JMX メトリクスコレクションの追加メトリクス構成ファイル。Java エージェントは `yaml` ファイルの `instance` セクションの `jvm_direct:true` を探してコンフィギュレーションを変更します。                                  |
| `dd.jmxfetch.check-period`             | `DD_JMXFETCH_CHECK_PERIOD`             | `1500`                            | JMX メトリクスの送信頻度 (ms)。                                                                                                   |
| `dd.jmxfetch.refresh-beans-period`     | `DD_JMXFETCH_REFRESH_BEANS_PERIOD`     | `600`                             | 利用可能な JMX Bean のリストのリフレッシュ頻度 (秒)。                                                                             |
| `dd.jmxfetch.statsd.host`              | `DD_JMXFETCH_STATSD_HOST`              | `agent.host` と同じ              | JMX メトリクスの送信先の Statsd ホスト。Unix Domain Sockets を使用している場合、'unix://PATH_TO_UDS_SOCKET' のような引数を使用します。例、`unix:///var/datadog-agent/dsd.socket`                                                                                                            |
| `dd.jmxfetch.statsd.port`              | `DD_JMXFETCH_STATSD_PORT`              | 8125                              | JMX メトリクスの送信先の StatsD ポート。Unix Domain Sockets を使用している場合、0 を入力します。                                                                                                                                                                                                                              |
| `dd.integration.opentracing.enabled`              | `DD_INTEGRATION_OPENTRACING_ENABLED`              | true                              | デフォルトで、トレーシングクライアントは GlobalTracer がロードされており、トレーサーを動的に登録しているかどうかを検知します。これを false に設定すると、OpenTracing 上のトレーサーの依存関係がすべて消去されます。                                                                                                                                                                                                                              |
| `dd.hystrix.tags.enabled` | `DD_HYSTRIX_TAGS_ENABLED` | 偽 | デフォルトでは、Hystrix のグループ、コマンド、サーキット状態のタグは有効になっていません。このプロパティにより有効になります。 |
| `dd.trace.servlet.async-timeout.error` | `DD_TRACE_SERVLET_ASYNC_TIMEOUT_ERROR` | 真 | デフォルトでは、長時間実行されている非同期リクエストはエラーとしてマークされます。この値を false に設定すると、すべてのタイムアウトを成功したリクエストとしてマークできます。 |
| `dd.trace.startup.logs`                | `DD_TRACE_STARTUP_LOGS`                | 真 | `false` の場合は起動ログの収集が無効化されます。バージョン 0.64 以上で使用可能です。 |
| `dd.trace.servlet.principal.enabled`                | `DD_TRACE_SERVLET_PRINCIPAL_ENABLED`                | 偽 | `true` の場合は、ユーザープリンシパルが収集されます。バージョン 0.61 以降で使用可能です。 |


**注**:

- 両方に同じキータイプが設定された場合、システムプロパティコンフィギュレーションが優先されます。
- システムプロパティは JVM パラメーターとして使用できます。
- デフォルトで、アプリケーションからの JMX メトリクスは、DogStatsD によりポート `8125` で Datadog Agent に送信されます。[DogStatsD が Agent に対して有効になっている][9]ことを確認してください。

  - Agent をコンテナとして実行している場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC` が [`true` に設定されている][10]ことと、Agent コンテナでポート `8125` が開いていることを確認してください。
  - Kubernetes の場合は、[DogStatsD ポートをホストポートにバインドします][11]。ECS の場合は、[タスク定義で適当なフラグを設定します][12]。

### インテグレーション

インテグレーションを無効にする方法については、[インテグレーション][13]の互換性セクションを参照してください。

### 例

#### `dd.service.mapping`

**システムプロパティの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.service.mapping=postgresql:web-app-pg -jar path/to/application.jar
```

{{< img src="tracing/setup/java/service_mapping.png" alt="サービスマッピング"  >}}

#### `dd.tags`

**スパンと JMX メトリクスにグローバルな env を設定**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_global_tags.png" alt="グローバルタグのトレース"  >}}

#### `dd.trace.span.tags`

**すべてのスパンに project:test を追加する例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_span_tags.png" alt="スパンタグのトレース"  >}}

#### `dd.trace.jmx.tags`

**JMX メトリクスに custom.type:2 を設定**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.span.tags=project:test -Ddd.trace.jmx.tags=custom.type:2 -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_jmx_tags.png" alt="JMX タグのトレース"  >}}

#### `dd.trace.methods`

**システムプロパティの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.trace.methods="hello.GreetingController[doSomeStuff,doSomeOtherStuff];hello.Randomizer[randomize]" -jar path/to/application.jar
```

{{< img src="tracing/setup/java/trace_methods.png" alt="メソッドのトレース"  >}}

#### `dd.trace.db.client.split-by-instance`

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.env=dev -Ddd.service=web-app -Ddd.trace.db.client.split-by-instance=TRUE -jar path/to/application.jar
```

これで、DB インスタンス 1 である `webappdb` に、`db.instance` スパンのメタデータと同じサービス名が付けられます:

{{< img src="tracing/setup/java/split_by_instance_1.png" alt="インスタンス 1"  >}}

これで、DB インスタンス 2 である `secondwebappdb` に、`db.instance` スパンのメタデータと同じサービス名が付けられます:

{{< img src="tracing/setup/java/split_by_instance_2.png" alt="インスタンス 2"  >}}

同様に、サービスマップで、1 つの Web アプリが 2 つの異なる Postgres データベースに呼び出しを行っていることがわかります。

#### `dd.http.server.tag.query-string`

システムプロパティの例:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.service=web-app -Ddd.env=dev -Ddd.http.server.tag.query-string=TRUE -jar path/to/application.jar
```

{{< img src="tracing/setup/java/query_string.png" alt="クエリ文字列"  >}}

#### `dd.trace.enabled`

**システムプロパティとデバッグアプリのモードの例**:

```shell
java -javaagent:/path/to/dd-java-agent.jar -Ddd.trace.enabled=false -Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug -jar path/to/application.jar
```

デバッグアプリのログに、`Tracing is disabled, not installing instrumentations.` と表示されます。

#### `dd.jmxfetch.config.dir` and `dd.jmxfetch.config`

構成サンプル

- 以下のいずれかのコンビネーションを使用: `DD_JMXFETCH_CONFIG_DIR=<ディレクトリパス>` + `DD_JMXFETCH_CONFIG=conf.yaml`
- または直接指定: `DD_JMXFETCH_CONFIG=<ディレクトリパス>/conf.yaml`

`conf.yaml` で以下の内容を使用します。

```yaml
init_config:
instances:
    - jvm_direct: true
      port: '<PORT>'
      conf:
          - include:
                bean:
                    - java.lang:type=MemoryPool,name=Metaspace
                attribute:
                    Usage.used:
                        metric_type: gauge
                        alias: sb.usage.used
```

次の結果が生成されます。

{{< img src="tracing/setup/java/jmxfetch_example.png" alt="JMX のフェッチ例"  >}}

JMX フェッチを使った Java メトリクス収集についての詳細は [Java インテグレーションドキュメント][14]を参照してください。

### B3 ヘッダーの抽出と挿入

Datadog APM トレーサーは、分散型トレーシングの [B3 ヘッダーの抽出][15]と挿入をサポートしています。

分散したヘッダーの挿入と抽出は、挿入/抽出スタイルを構成することで制御されます。現在、次の 2 つのスタイルがサポートされています:

- Datadog: `Datadog`
- B3: `B3`

挿入スタイルは次を使って構成できます:

- システムプロパティ: `-Ddd.propagation.style.inject=Datadog,B3`
- 環境変数: `DD_PROPAGATION_STYLE_INJECT=Datadog,B3`

プロパティまたは環境変数の値は、挿入が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 挿入スタイルのみが有効になっています。

抽出スタイルは次を使って構成できます:

- システムプロパティ: `-Ddd.propagation.style.extract=Datadog,B3`
- 環境変数: `DD_PROPAGATION_STYLE_EXTRACT=Datadog,B3`

プロパティまたは環境変数の値は、抽出が有効になっているヘッダースタイルのカンマ (またはスペース) 区切りリストです。デフォルトでは、Datadog 抽出スタイルのみが有効になっています。

複数の抽出スタイルが有効になっている場合、抽出試行はスタイルの構成順で実行され、最初に成功した抽出値が使われます。

## トレースのレポート

Datadog にトレースをレポートすると、次のことが発生します:

- トレースが完了します
- トレースはトレースの非同期キューにプッシュされます
    - キューのサイズには制限があり、設定された上限である 7000 件のトレースを超えて拡大することはありません
    - サイズの上限に達すると、トレースは破棄されます
    - 正確なスループットを実現するため、トレースの合計数が取得されます
- 独立したレポートスレッドで、トレースキューがフラッシュされ、トレースが msgpack 経由でエンコードされ、その後 http 経由で Datadog Agent に送信されます
- キューのフラッシュが 1 秒に 1 回のスケジュールで発生します

Datadog がサポートするライブラリやフレームワークの実際のコード、ドキュメント、使用例を確認したい場合は、[インテグレーション](#インテグレーション)セクションの Java アプリケーションの自動インスツルメンテーションされたコンポーネントの全一覧を参照してください。

### トレースアノテーション

プロジェクトに `dd-trace-api` 依存関係を追加します。Maven の場合、次を `pom.xml` に追加します:

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>{バージョン}</version>
</dependency>
```

Gradle の場合は、次を追加します:

```gradle
implementation group: 'com.datadoghq', name: 'dd-trace-api', version: {バージョン}
```

次に `@Trace` をメソッドに追加して、`dd-java-agent.jar` での実行時にメソッドがトレースされるようにします。Agent が添付されていない場合は、このアノテーションはアプリケーションに影響しません。

`@Trace` アノテーションにはデフォルトのオペレーション名 `trace.annotation` がある一方、トレースされるメソッドにはデフォルトでリソースがあります。

## パフォーマンス

Java APM がアプリケーションのオーバーヘッドに与える影響は最小限です:

- Java APM によって維持されるコレクションがメモリで無制限に拡大することはありません
- トレースのレポートによってアプリケーションスレッドがブロックされることはありません
- Java APM は、トレースコレクションとライブラリのインスツルメンテーションのために追加クラスをロードします
- 通常、Java APM による CPU 使用率の上昇は 3% 以内です
- 通常、Java APM による JVM ヒープ使用率の上昇は 3% 以内です


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/profiler/getting_started/?tab=java
[2]: /ja/tracing/compatibility_requirements/java
[3]: https://app.datadoghq.com/apm/docs
[4]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[5]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[6]: /ja/tracing/connect_logs_and_traces/java/
[7]: /ja/tracing/setup/docker/
[8]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/instrumentation/trace-annotation/src/main/java/datadog/trace/instrumentation/trace_annotation/TraceAnnotationsInstrumentation.java#L37
[9]: /ja/developers/dogstatsd/#setup
[10]: /ja/agent/docker/#dogstatsd-custom-metrics
[11]: /ja/developers/dogstatsd/
[12]: /ja/integrations/amazon_ecs/?tab=python#create-an-ecs-task
[13]: /ja/tracing/compatibility_requirements/java#disabling-integrations
[14]: /ja/integrations/java/?tab=host#metric-collection
[15]: https://github.com/openzipkin/b3-propagation
[16]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent