---
title: Java アプリケーションのインスツルメンテーション
kind: ドキュメント
further_reading:
  - link: serverless/installation/node
    tag: Documentation
    text: Node.js サーバーレスモニタリングのインストール
  - link: serverless/installation/ruby
    tag: Documentation
    text: Ruby サーバーレスモニタリングのインストール
  - link: serverless/installation/python
    tag: Documentation
    text: Python サーバーレスモニタリングのインストール
  - link: serverless/installation/dotnet
    tag: Documentation
    text: .NET サーバーレスモニタリングのインストール
  - link: serverless/installation/go
    tag: Documentation
    text: Go サーバーレスモニタリングのインストール
---
[AWS インテグレーションをインストール][1]したら、以下のいずれかの方法に従いアプリケーションをインスツルメントし、Datadog にメトリクス、ログ、トレースを送信します。

## 構成

### Datadog Lambda ライブラリのインストール

プロジェクトのコンフィギュレーションに基づき以下のいずれかのコマンドを実行することで、Datadog Lambda ライブラリをローカルにインストールできます。最新のバージョンに関しては、[最新のリリース][2]を参照してください。

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
  <version>0.0.5</version>
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
  implementation 'com.datadoghq:datadog-lambda-java:0.0.5'
}
```
{{% /tab %}}
{{< /tabs >}}

### 関数の構成

1. Lambda 関数の [AWS X-Ray アクティブトレース][3]を有効にします。

### Datadog Forwarder をロググループにサブスクライブ

メトリクス、トレース、ログを Datadog へ送信するには、関数の各ロググループに Datadog Forwarder Lambda 関数をサブスクライブする必要があります。

1. [まだの場合は、Datadog Forwarder をインストールします][4]。
2. [DdFetchLambdaTags のオプションが有効であることを確認します[5]。
3. [Datadog Forwarder を関数のロググループにサブスクライブします][6]。

## Datadog サーバーレスモニタリングの利用

以上の方法で関数を構成すると、[Serverless ページ][7]でメトリクス、ログ、トレースを確認できるようになるはずです。カスタムメトリクスを送信する必要がある場合は、以下のコード例をご参照ください。


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

[1]: /ja/serverless/#1-install-the-cloud-integration
[2]: https://github.com/DataDog/datadog-lambda-java/releases
[3]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[4]: https://docs.datadoghq.com/ja/serverless/troubleshooting/installing_the_forwarder
[5]: https://docs.datadoghq.com/ja/serverless/troubleshooting/installing_the_forwarder/#experimental-optional
[6]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=automaticcloudformation#send-aws-service-logs-to-datadog
[7]: https://app.datadoghq.com/functions