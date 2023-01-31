---
dependencies:
- "https://github.com/DataDog/datadog-lambda-java/blob/master/README.md"
kind: ドキュメント
title: Datadog Lambda Library for Java
---
[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-java/blob/main/LICENSE)
![](https://github.com/DataDog/datadog-lambda-java/workflows/Test%20on%20Master%20branch/badge.svg)
![Bintray](https://img.shields.io/bintray/v/datadog/datadog-maven/datadog-lambda-java)

Datadog Lambda Java Client Library for Java (8 および 11) を使用すると、[拡張 Lambda メトリクス](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=awsconsole#real-time-enhanced-lambda-metrics)およびサーバーフル環境とサーバーレス環境の間の[分散型トレーシング](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=awsconsole#tracing-with-datadog-apm)が可能になり、[カスタムメトリクス](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=awsconsole#custom-metrics)を Datadog API に送信できます。


## インストール

このライブラリは、JFrog [Bintray](https://bintray.com/beta/#/datadog/datadog-maven/datadog-lambda-java) を通じて配布されます。[インストール手順](https://docs.datadoghq.com/serverless/installation/java/)に従って、Datadog で関数の拡張メトリクス、トレース、ログを表示します。

## 環境変数

### DD_LOG_LEVEL

`debug` に設定すると、Datadog Lambda ライブラリからのデバッグログが有効になります。デフォルトは `info` です。

### DD_ENHANCED_METRICS

`aws.lambda.enhanced.invocations` や `aws.lambda.enhanced.errors` などの拡張 Datadog Lambda インテグレーションメトリクスを生成します。デフォルトは `true` です。

## 拡張メトリクス

[インストール](#installation)したら、Lambda 関数の拡張メトリクスを Datadog で表示できるはずです。

[Datadog Lambda 拡張メトリクス](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=java#real-time-enhanced-lambda-metrics)の公式ドキュメントをご覧ください。

## カスタムメトリクス

[インストール](#installation)したら、Lambda 関数からカスタムメトリクスを送信できるはずです。

[AWS Lambda 関数からカスタムメトリクスを送信する](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=java#custom-metrics)手順を確認してください。

## 分散型トレーシング

アウトバウンド HTTP リクエストをトレースヘッダーでラップして、APM のコンテキストで Lambda を確認します。
Lambda Java Client Library は、インスツルメントされた HTTP 接続オブジェクトと、以下のライブラリのいずれかで作成された HTTP 接続をインスツルメントするヘルパーメソッドを提供します。

- java.net.HttpUrlConnection
- Apache HTTP クライアント
- OKHttp3

お気に入りのクライアントが見つからない場合は、問題を開いてリクエストしてください。Datadog は常にこのライブラリの追加に取り組んでいます。

### HttpUrlConnection の例

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        URL url = new URL("https://example.com");
        HttpURLConnection instrumentedUrlConnection = dd.makeUrlConnection(url); //含まれるトレースヘッダー

        instrumentedUrlConnection.connect();

        return 7;
    }
}
```

あるいは、さらに複雑なことをしたい場合

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        URL url = new URL("https://example.com");
        HttpURLConnection hc = (HttpURLConnection)url.openConnection();

        //分散型トレーシングヘッダーを追加
        hc = (HttpURLConnection) dd.addTraceHeaders(hc);

        hc.connect();

        return 7;
    }
}
```

### Apache HTTP クライアントの例

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        HttpClient client = HttpClientBuilder.create().build();

        HttpGet hg = dd.makeHttpGet("https://example.com"); //含まれるトレースヘッダー

        HttpResponse hr = client.execute(hg);
        return 7;
    }
}
```

あるいは、さらに複雑なことをしたい場合

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        HttpClient client = HttpClientBuilder.create().build();
        HttpGet hg = new HttpGet("https://example.com");

        //分散型トレーシングヘッダーを追加
        hg = (HttpGet) dd.addTraceHeaders(hg);

        HttpResponse hr = client.execute(hg);
        return 7;
    }
}
```


### OKHttp3 クライアントの例

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        HttpClient client = HttpClientBuilder.create().build();
        OkHttpClient okHttpClient = new OkHttpClient.Builder().build();
        Request okHttpRequest = dd.makeRequestBuilder() // 含まれるトレースヘッダー
            .url("https://example.com")
            .build(); 

        Response resp = okHttpClient.newCall(okHttpRequest).execute();

        return 7;
    }
}
```

あるいは

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, context);

        HttpClient client = HttpClientBuilder.create().build();
        OkHttpClient okHttpClient = new OkHttpClient.Builder().build();
        Request okHttpRequest = new Request.Builder()
            .url("https://example.com")
            .build();

        //分散型トレーシングヘッダーを追加
        okHttpRequest = dd.addTraceHeaders(okHttpRequest);

        Response resp = okHttpClient.newCall(okHttpRequest).execute();

        return 7;
    }
}
```

### トレースとログの相関

トレースをログと相関付けるには、ログメッセージにトレースコンテキストを挿入する必要があります。Datadog では、キー `dd.trace_context` の slf4j MDC にこれらを追加し、自動的にトレースコンテキストを取得できる便利なメソッドを提供しています。トレースコンテキストは、`new DDLambda(...)` のインスタンス化という副作用として MDC に追加されます。

トレースコンテキストの例です。`[dd.trace_id=3371139772690049666 dd.span_id=13006875827893840236]`

#### JSON のログ

JSON ログを使用している場合は、`dd.trace_id` キーと `dd.span_id` キーを使用して、トレース ID とスパン ID を各ログメッセージに追加します。トレース ID とスパン ID を含むマップを取得するには、`DDLambda.getTraceContext()` を呼び出します。このマップを記録された JSON データと結合します。

#### プレーンテキストのログ

プレーンテキストログを使用している場合は、既存の Lambda パイプラインを複製して、新しい[パーサー](https://docs.datadoghq.com/logs/processing/parsing/?tab=matcher)を作成する必要があります。 新しいパーサーにより、ログの正しい位置からトレースコンテキストを抽出できます。ヘルパー `_trace_context` を使用して、トレースコンテキストを抽出します。ログインが次のような場合、

```
INFO 2020-11-11T14:00:00Z LAMBDA_REQUEST_ID [dd.trace_id=12345 dd.span_id=67890] This is a log message
```

パーサー規則は次のようになります。

```
my_custom_rule \[%{word:level}\]?\s+%{_timestamp}\s+%{notSpace:lambda.request_id}%{_trace_context}?.*
```

#### Log4j / SLF4J

Datadog では、キー `dd.trace_context` の slf4j MDC にトレース ID が追加されました。`%X{dd.trace_context}` 演算子を使用してアクセスできます。以下は `log4j.properties` の例です。

```
log = .
log4j.rootLogger = DEBUG, LAMBDA

log4j.appender.LAMBDA=com.amazonaws.services.lambda.runtime.log4j.LambdaAppender
log4j.appender.LAMBDA.layout=org.apache.log4j.PatternLayout
log4j.appender.LAMBDA.layout.conversionPattern=%d{yyyy-MM-dd HH:mm:ss} %X{dd.trace_context} %-5p %c:%L - %m%n
```

ログラインは次のようになります。`2020-11-13 19:21:53 [dd.trace_id=1168910694192328743 dd.span_id=3204959397041471598] INFO  com.serverless.Handler:20 - Test Log Message`

前のセクションの**プレーンテキストログ**と同様に、トレースコンテキストを正しくパースするには、新しい[パーサー](https://docs.datadoghq.com/logs/processing/parsing/?tab=matcher)を作成する必要があります。


#### その他のロギングソリューション

他のロギングソリューションを使用している場合は、メソッド  `DDLambda.getTraceContextString()` を使用してトレース ID にアクセスできます。この場合、あらゆるログメッセージに追加できる文字列としてトレース ID が返されます。

## 問題を開く

このパッケージでバグが発生した場合は、お知らせください。新しい問題を開く前に、重複を避けるために既存の問題を検索してください。

問題を開くときは、Datadog Lambda Layer のバージョン、Java のバージョン、および取得できる場合はスタックトレースを含めてください。さらに、必要に応じて再現手順を含めてください。

機能リクエストの問題を開くこともできます。

## 寄稿

このパッケージに問題が見つかり、修正された場合は、[手順](https://github.com/DataDog/dd-lambda-layer-java/blob/main/CONTRIBUTING.md)に従ってプルリクエストを開いてください。

## ライセンス

特に明記されていない限り、このリポジトリ内のすべてのファイルは、Apache License Version 2.0 の下でライセンスされます。

この製品には、Datadog(https://www.datadoghq.com/) で開発されたソフトウェアが含まれています。Copyright 2020 Datadog, Inc.
