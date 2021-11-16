---
title: Java アプリケーションのインスツルメンテーション
kind: ドキュメント
further_reading:
  - link: serverless/serverless_tagging/
    tag: Documentation
    text: サーバーレスアプリケーションのタグ付け
  - link: serverless/distributed_tracing/
    tag: Documentation
    text: サーバーレスアプリケーションのトレース
  - link: serverless/custom_metrics/
    tag: Documentation
    text: サーバーレスアプリケーションからのカスタムメトリクスの送信
aliases:
  - /ja/serverless/datadog_lambda_library/java/
---
{{< img src="serverless/java-lambda-tracing.png" alt="Datadog で Java Lambda 関数を監視"  style="width:100%;">}}

## 必須セットアップ

未構成の場合:

- [AWS インテグレーション][1]をインストールします。これにより、Datadog は AWS から Lambda メトリクスを取り込むことができます。
- AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要な [Datadog Forwarder Lambda 関数][2]をインストールします。

[AWS インテグレーション][1]と [Datadog Forwarder][2] をインストールしたら、手順に従いアプリケーションをインスツルメントし、Datadog に[拡張 Lambda メトリクス][3]、ログ、トレースを送信します。
分散型トレーシングでサーバーレスアプリケーションを完全にインスツルメントするには、Java Lambda 関数で Java 8 Corretto (`java8.al2`) または Java 11 (`java11`) ランタイムを使用している必要があります。

## コンフィギュレーション

### Install

プロジェクトのコンフィギュレーションに基づいて、以下のコードブロックのいずれかを `pom.xml` または `build.gradle` に適宜追加し、Datadog Lambda ライブラリをローカルにインストールします。以下の `VERSION` を最新のリリースで置き換えてください (先行する `v` を削除します): ![Maven Cental][4]
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

関数をインスツルメントするには、次の手順に従います。

1. 関数に Datadog Lambda レイヤーをインストールします。最新の `VERSION` は `{{< latest-lambda-layer-version layer="dd-trace-java" >}}` です。

    ```yaml
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:<VERSION>
    ```

2. 関数に以下の環境変数を構成します。

    ```yaml
    JAVA_TOOL_OPTIONS: "-javaagent:\"/opt/java/lib/dd-java-agent.jar\""
    DD_LOGS_INJECTION: "true"
    DD_JMXFETCH_ENABLED: "false"
    DD_TRACE_ENABLED: "true"
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

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブします。

1. [まだの場合は、Datadog Forwarder をインストールします][2]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][6]。

### Java Lambda 関数のコールドスタートの監視

コールドスタートは、関数が以前に非アクティブだったときや比較的一定数のリクエストを受信していたときなどを含め、サーバーレスアプリケーションで受信するトラフィックが突然増加したときに発生します。ユーザーには、コールドスタートは遅い応答時間または遅延として認識されることがあります。Datadog では、モニターに Java Lambda 関数コールドスタートを構成し、Datadog Serverless Insights を使用して[コールドスタートを最低限に保つ][7]ことを強くおすすめしています。

{{< img src="serverless/java-monitor-cold-starts.png" alt="Java Lambda 関数コールドスタートの監視"  style="width:100%;">}}

Java Lambda 関数コールドスタートに Datadog モニターを作成するには、以下の条件を使用して[モニター作成手順][8]を実行します。
- メトリクス名: `aws.lambda.enhanced.invocations`
- ソース: `runtime:java*` および `cold_start:true`
- アラートグループ: 各 `function_arn` に対し個別のアラートをトリガーするマルチアラート

### タグ

オプションではありますが、Datadog では以下の[統合サービスタグ付けのドキュメント][9]に従いサーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることを強くお勧めします。

## 確認

以上の方法で関数を構成すると、[Serverless Homepage][10] でメトリクス、ログ、トレースを確認できるようになります。

### カスタムビジネスロジックの監視

カスタムメトリクスの送信をご希望の場合は、以下のコード例をご参照ください。

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

カスタムメトリクスの送信について、詳しくは[カスタムメトリクスのドキュメント][11]を参照してください。

### ログとトレースの接続

Java Lambda 関数ログとトレースを自動接続する方法については、[Java ログとトレースの接続][12]を参照してください。

<div class="alert alert-info">正しい Java ランタイムを使用しないと、"Error opening zip file or JAR manifest missing : /opt/java/lib/dd-java-agent.jar" (zip ファイルを開くときのエラーまたは JAR マニフェストがありません : /opt/java/lib/dd-java-agent.jar) などのエラーが発生する可能性があります。上記のとおり、ランタイムとして java8.al2 または java11 を使用してください。</div>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/serverless/forwarder/
[3]: /ja/serverless/enhanced_lambda_metrics
[4]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[5]: https://github.com/DataDog/datadog-lambda-java/releases/
[6]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: /ja/serverless/insights#cold-starts
[8]: /ja/monitors/monitor_types/metric/?tab=threshold#overview
[9]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[10]: https://app.datadoghq.com/functions
[11]: /ja/serverless/custom_metrics?tab=java
[12]: /ja/tracing/connect_logs_and_traces/java/