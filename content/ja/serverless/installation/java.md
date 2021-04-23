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
---
{{< img src="serverless/java-lambda-tracing.png" alt="Datadog で Java Lambda 関数を監視"  style="width:100%;">}}

## 必須セットアップ

未構成の場合:

- [AWS インテグレーション][1]をインストールします。これにより、Datadog は AWS から Lambda メトリクスを取り込むことができます。
- AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要な [Datadog Forwarder Lambda 関数][2]をインストールします。

[AWS インテグレーション][1]と [Datadog Forwarder][2] をインストールしたら、手順に従いアプリケーションをインスツルメントし、Datadog に[拡張 Lambda メトリクス][3]、ログ、トレースを送信します。
分散型トレーシングでサーバーレスアプリケーションを完全にインスツルメントするには、Java Lambda 関数で Java 8 Corretto (`java8.al2`) または Java 11 (`java11`) ランタイムを使用している必要があります。

## コンフィギュレーション

### Datadog Lambda ライブラリのインストール

プロジェクトのコンフィギュレーションに基づいて、以下のコードブロックのいずれかを `pom.xml` または `build.gradle` に適宜追加し、Datadog Lambda ライブラリをローカルにインストールします。以下の `VERSION` を最新のリリースで置き換えてください (先行する `v` を削除します): ![Bintray][4]
{{< tabs >}}
{{% tab "Maven" %}}

`pom.xml` に以下の依存関係を含めます。

```xml
<repositories>
  <repository>
    <id>datadog-maven</id>
    <url>https://dl.bintray.com/datadog/datadog-maven</url>
  </repository>     
</repositories>
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
repositories {
  maven { url "https://dl.bintray.com/datadog/datadog-maven" }
}
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```
{{% /tab %}}
{{< /tabs >}}

### 関数をインスツルメントする

1. 関数に Datadog Lambda レイヤーをインストールします。`VERSION` については、最新[リリース][5]をご確認ください。

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

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][2]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][6]。

### Java Lambda 関数のコールドスタートの監視

コールドスタートは、関数が以前に非アクティブだったときや比較的一定数のリクエストを受信していたときなどを含め、サーバーレスアプリケーションで受信するトラフィックが突然増加したときに発生します。ユーザーには、コールドスタートは遅い応答時間または遅延として認識されることがあります。Datadog では、モニターに Java Lambda 関数コールドスタートを構成し、Datadog Serverless Insights を使用して[コールドスタートを最低限に保つ][7]ことを強くおすすめしています。

{{< img src="serverless/java-monitor-cold-starts.png" alt="Java Lambda 関数コールドスタートの監視"  style="width:100%;">}}

Java Lambda 関数コールドスタートに Datadog モニターを作成するには、以下の条件を使用して[モニター作成手順][8]を実行します。
- メトリクス名: `aws.lambda.enhanced.invocations`
- ソース: `runtime:java*` および `cold_start:true`
- アラートグループ: 各 `function_arn` に対し個別のアラートをトリガーするマルチアラート

### 統合サービスタグ付け

オプションではありますが、Datadog では以下の[統合サービスタグ付けのドキュメント][9]に従いサーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることを強くお勧めします。

## Datadog サーバーレスモニタリングの利用

上記の手順で関数を構成すると、[サーバーレスホームページ][10]にメトリクス、ログ、トレースが表示されるようになります。

### カスタムビジネスロジックの監視

カスタムメトリクスの送信をご希望の場合は、以下のコード例をご参照ください。

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda ddl = new DDLambda(request, context);

        Map<String,String> myTags = new HashMap<String, String>();
            myTags.put("product", "latte");
            myTags.put("order","online");

        // カスタムメトリクスを送信
        dd.metric(
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

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/serverless/forwarder/
[3]: /ja/serverless/enhanced_lambda_metrics
[4]: https://img.shields.io/bintray/v/datadog/datadog-maven/datadog-lambda-java
[5]: https://github.com/DataDog/datadog-lambda-java/releases/
[6]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: /ja/serverless/insights#cold-starts
[8]: /ja/monitors/monitor_types/metric/?tab=threshold#overview
[9]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[10]: https://app.datadoghq.com/functions
[11]: /ja/serverless/custom_metrics?tab=java
[12]: /ja/tracing/connect_logs_and_traces/java/