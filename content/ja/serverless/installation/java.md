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
## 必須セットアップ

未構成の場合:

- [AWS インテグレーション][1]をインストールします。これにより、Datadog は AWS から Lambda メトリクスを取り込むことができます。
- AWS Lambda トレース、拡張メトリクス、カスタムメトリクス、ログの取り込みに必要な [Datadog Forwarder Lambda 関数][2]をインストールします。

[AWS インテグレーション][1]と [Datadog Forwarder][2] をインストールしたら、手順に従ってアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## コンフィギュレーション

### Datadog Lambda ライブラリのインストール

以下のブロックのいずれかをプロジェクトのコンフィギュレーションに基づいて `pom.xml` または `build.gradle` に適宜追加し、Datadog Lambda ライブラリをローカルにインストールします。以下の `n.n.n` を最新のリリースで置き換えてください (先行する `v` を削除します): ![Bintray][3]

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
  <version>n.n.n</version>
  <type>pom</type>
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
  implementation 'com.datadoghq:datadog-lambda-java:n.n.n'
}
```
{{% /tab %}}
{{< /tabs >}}

### 関数の構成

1. Lambda 関数の [AWS X-Ray アクティブトレース][4]を有効にします。
2. Datadog Lambda ライブラリが提供するラッパーを使用して、Lambda ハンドラー関数をラップします。
    ```java
    public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
        public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
            DDLambda dd = new DDLambda(request, lambda);
        }
    }
    ```

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][2]。
2. [Datadog Forwarder を関数のロググループにサブスクライブします][5]。

### 統合サービスタグ付け

これはオプションですが、Datadog は、[統合サービスタグ付けのドキュメント][6]に従って、サーバーレスアプリケーションに `env`、`service`、`version` タグをタグ付けすることを強くお勧めします。

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless Homepage][7] でメトリクス、ログ、トレースを確認できるようになるはずです。

## カスタムビジネスロジックの監視

カスタムメトリクスの送信をご希望の場合は、以下のコード例をご参照ください。


```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, lambda);

        Map<String,String> myTags = new HashMap<String, String>();
            myTags.put("product", "latte");
            myTags.put("order","online");

        // カスタムメトリクスを送信
        dd.metric(
            "coffee_house.order_value", // メトリクス名
            12.45,                      // メトリクスの値
            myTags);                    // 関連するタグ

        URL url = new URL("https://example.com");
        HttpURLConnection hc = (HttpURLConnection)url.openConnection();

        // Datadog 分散型トレーシングヘッダを追加
        hc = (HttpURLConnection) dd.addTraceHeaders(hc);

        hc.connect();
    }
}
```

カスタムメトリクスの送信について、詳しくは[こちら][8]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_web_services/
[2]: /ja/serverless/forwarder/
[3]: https://img.shields.io/bintray/v/datadog/datadog-maven/datadog-lambda-java
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[5]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: /ja/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[7]: https://app.datadoghq.com/functions
[8]: /ja/serverless/custom_metrics?tab=java