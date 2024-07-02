---
title: Datadog Forwarder を使用した Java サーバーレスアプリケーションのインスツルメンテーション
---
## 概要

<div class="alert alert-warning">
Datadog Serverless の新規ユーザーの場合、代わりに <a href="/serverless/installation/java">Datadog Lambda Extension を使用して Lambda 関数をインスツルメントする手順</a>に従ってください。Lambda がすぐに使える機能を提供する前に、Datadog Forwarder で Datadog Serverless をセットアップした場合は、このガイドを使用してインスタンスを維持してください。
</div>

<div class="alert alert-danger">
<code>datadog-lambda-java</code> の一部の古いバージョンでは、推移的依存関係として <code>log4j <=2.14.0</code> をインポートします。<a href="#upgrading">アップグレードの手順</a>は以下の通りです。
</div>

## 前提条件

[Datadog Forwarder Lambda 関数][2]は、AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要です。

分散型トレーシングでサーバーレスアプリケーションを完全にインスツルメントするには、Java Lambda 関数が Java 8 Corretto (`java8.al2`)、Java 11 (`java11`) または Java 17 (`java17`) ランタイムを使用している必要があります。

## ブラウザトラブルシューティング

### インストール

以下のコードブロックのいずれかを `pom.xml` (Maven) または `build.gradle` (Gradle) に追加し、Datadog Lambda Library をローカルにインストールします。以下の `VERSION` を最新のリリースに置き換えてください (直前の `v` は省略): ![Maven Cental][4]
{{< tabs >}}
{{% tab "Maven" %}}

`pom.xml` に以下の依存関係を含めます。

```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-lambda-java</artifactId>
  <version>VERSION</version>
</dependency>
```

{{% /tab %}}
{{% tab "Gradle" %}}

`build.gradle` に以下を含めます。

```groovy
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```
{{% /tab %}}
{{< /tabs >}}

### インスツルメントする


1. 関数に Datadog Lambda レイヤーをインストールします。最新の `VERSION` は `{{< latest-lambda-layer-version layer="dd-trace-java" >}}` です。

    ```yaml
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:<VERSION>
    ```

2. 関数に以下の環境変数を構成します。

    ```yaml
    JAVA_TOOL_OPTIONS: -javaagent:"/opt/java/lib/dd-java-agent.jar" -XX:+TieredCompilation -XX:TieredStopAtLevel=1
    DD_LOGS_INJECTION: true
    DD_JMXFETCH_ENABLED: false
    DD_TRACE_ENABLED: true
    ```

3. Datadog Lambda ライブラリが提供するラッパーを使用して、Lambda ハンドラー関数をラップします。

    ```java
    public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
        public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
            DDLambda ddl = new DDLambda(request, context); //Required to initialize the trace

            do_some_stuff();
            make_some_http_requests();

            ddl.finish(); //Required to finish the active span.
            return new ApiGatewayResponse();
        }
    }
    ```

### サブスクライブ

関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。これにより、メトリクス、トレース、ログを Datadog へ送信できるようになります。

1. [まだの場合は、Datadog Forwarder をインストールします][2]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][5]。

### Java Lambda 関数のコールドスタートの監視

コールドスタートは、関数が以前に非アクティブだったときや比較的一定数のリクエストを受信していたときなどを含め、サーバーレスアプリケーションで受信するトラフィックが突然増加したときに発生します。ユーザーには、コールドスタートは遅い応答時間または遅延として認識されることがあります。Datadog では、モニターに Java Lambda 関数コールドスタートを構成し、Datadog Serverless Insights を使用して[コールドスタートを最低限に保つ][6]ことをおすすめしています。

{{< img src="serverless/java-monitor-cold-starts.png" alt="Java Lambda 関数コールドスタートの監視" style="width:100%;">}}

Java Lambda 関数コールドスタートに Datadog モニターを作成するには、以下の条件を使用して[モニター作成手順][7]を実行します。
- メトリクス名: `aws.lambda.enhanced.invocations`
- ソース: `runtime:java*` および `cold_start:true`
- アラートグループ: 各 `function_arn` に対し個別のアラートをトリガーするマルチアラート

### タグ

オプションではありますが、Datadog ではサーバーレスアプリケーションに予約タグ `env`、`service`、`version` を付けることを推奨しています。予約タグの詳細については、[統合サービスタグ付けのドキュメント][8]を参照してください。

## 確認

以上の方法で関数を構成すると、[Serverless Homepage][9] でメトリクス、ログ、トレースを確認できるようになります。

### カスタムビジネスロジックの監視

カスタムメトリクスを送信するには、以下のコード例をご参照ください。

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda ddl = new DDLambda(request, context);

        Map<String,Object> myTags = new HashMap<String, Object>();
            myTags.put("product", "latte");
            myTags.put("order","online");

        // カスタムメトリクスを送信
        ddl.metric(
            "coffee_house.order_value", // メトリクス名
            12.45,                      // メトリクス値
            myTags);                    // 関連タグ

        URL url = new URL("https://example.com");
        HttpURLConnection hc = (HttpURLConnection)url.openConnection();
        hc.connect();

        ddl.finish();
    }
}
```

カスタムメトリクスの送信について、詳しくは[カスタムメトリクスのドキュメント][10]を参照してください。

### ログとトレースの接続

Java Lambda 関数ログとトレースを自動接続する方法については、[Java ログとトレースの接続][11]を参照してください。

<div class="alert alert-info">正しい Java ランタイムを使用しないと、<code>Error opening zip file or JAR manifest missing : /opt/java/lib/dd-java-agent.jar</code> (zip ファイルを開くときのエラーまたは JAR マニフェストがありません : /opt/java/lib/dd-java-agent.jar) などのエラーが発生する可能性があります。上記のとおり、ランタイムとして <code>java8.al2</code> または <code>java11</code> を使用してください。</div>

## アップグレード

Apache Foundation は、一般的な Java のログ記録ライブラリである log4j に [リモートでコードが実行される脆弱性][12] があることを発表しました。
`datadog-lambda-java` の一部のバージョンには、log4j への推移的な依存関係があり、脆弱性が存在する可能性があります。脆弱性のあるバージョンは以下の通りです。

-  `<=0.3.3`
-  `1.4.0`

`datadog-lambda-java` の最新バージョンは ![Maven Cental][4] です。以下のアップグレード手順を実行する場合は、このバージョンを使用してください (直前の `v` は省略)。

`1.4.x` へのアップグレードを希望しない場合、 `0.3.x` には最新の log4j セキュリティパッチも適用されています。
最新版の `0.3.x` は [`datadog-lambda-java` リポジトリ][13] にあります。

Lambda 関数の依存関係である `datadog-lambda-java` のバージョンは `pom.xml` (Maven) または `build.gradle` (Gradle) で設定されます。

{{< tabs >}}
{{% tab "Maven" %}}

`pom.xml` ファイルには、次のようなセクションが含まれています。

```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-lambda-java</artifactId>
  <version>VERSION</version>
</dependency>
```

`VERSION` を最新バージョンの `datadog-lambda-java` (上記で入手可能) に置き換えます。
その後、Lambda 関数を再デプロイしてください。

{{% /tab %}}

{{% tab "Gradle" %}}

`build.gradle` ファイルには、次のようなセクションが含まれています。

```groovy
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```

`VERSION` を最新バージョンの `datadog-lambda-java` (上記で入手可能) に置き換えます。
その後、Lambda 関数を再デプロイしてください。

{{% /tab %}}
{{< /tabs>}}

0.3.x から 1.4.x へのアップグレードで、`dd-trace-java` トレーサーを使用したい場合は、`dd-trace-java` Lambda レイヤーへの参照を見つけ、次のように変更してください。

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:4
```


[2]: /ja/serverless/forwarder/
[3]: /ja/serverless/enhanced_lambda_metrics
[4]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[5]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: /ja/serverless/insights#cold-starts
[7]: /ja/monitors/types/metric/?tab=threshold#overview
[8]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[9]: https://app.datadoghq.com/functions
[10]: /ja/serverless/custom_metrics?tab=java
[11]: /ja/tracing/other_telemetry/connect_logs_and_traces/java/
[12]: https://www.datadoghq.com/log4j-vulnerability/
[13]: https://github.com/DataDog/datadog-lambda-java/releases