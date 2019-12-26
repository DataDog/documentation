---
title: APM と分散型トレーシングのセキュリティ
kind: documentation
aliases:
  - /ja/tracing/security/
further_reading:
  - link: /security/
    tag: Documentation
    text: Datadog に送信されるデータの主要カテゴリを確認する
---
この記事は、[データセキュリティに関するドキュメントシリーズ][1]の一部です。

APM 製品は、複数のライブラリをサポートし、ほぼどのようなデータポイントでも選択して送信することができる、柔軟性のある拡張可能なツールを提供しています。ここでは、どのような APM データを Datadog に送信するかを制御できる主なフィルター機能について説明します。

## 基本的フィルター

妥当なデフォルト設定を提供するために、以下のような基本的フィルターメカニズムが適用されます。

**環境変数は Agent によって収集されません。**

**プリペアドステートメントを使用しない場合でも、SQL 変数はデフォルトで難読化されます。**

たとえば、
`SELECT data FROM table WHERE key=123 LIMIT 10`
という `sql.query` 属性は、変数が難読化されて、
`SELECT data FROM table WHERE key = ? LIMIT ?` というリソース名になります。

**リソース名 (リクエスト URL など) 内の数字は、デフォルトで難読化されます。**

たとえば、次の `elasticsearch` 属性は
```
Elasticsearch : {
    method : GET,
    url : /user.0123456789/friends/_count
}
```
URL 内の数字が難読化されて、
`GET /user.?/friends/_count` というリソース名になります。

上記の基本的フィルターに加えて、[サポートされるトレーサー][2]から提供されるすべてのインテグレーションとフレームワークを含めた APM デプロイを確認および構成して、どのデータを Datadog に送信するかを適切に制御する必要があります。

## タグフィルター

バージョン 6 を使用している場合は、スパンに関連付けられているタグをタグの名前とパターンに基づいて難読化し、ユーザー定義の文字列で置き換えるように Agent を構成できます。特定のタグが送信されないようにするには、`replace_tags` [設定][3]を使用します。これで、1 つ以上の正規表現からなるリストを作成することで、タグ内の機密データを編集するように Agent に指示できます。

## リソースフィルター

バージョン 6 を使用している場合は、Agent から Datadog アプリケーションに送信されるトレースから特定のリソースを除外するように Agent を設定できます。特定のリソースが送信されないようにするには、`ignore_resources` [設定][3]を使用します。これで、1 つ以上の正規表現からなるリストを作成することで、リソース名に基づいて一部のトレースを除外するように Agent に指示できます。

## トレーサーの拡張

トレーシングライブラリは拡張できるように設計されています。スパンを捕捉して適宜 (正規表現などを使用して) 調整または除去するカスタムポストプロセッサーを作成することもできます。それには、以下のようなメカニズムを使用します。

* Java | [TraceInterceptor インターフェイス][4]
* Ruby | [処理パイプライン][5]
* Python | [トレースフィルター][6]

## カスタムインスツルメンテーション

特定のアプリケーション用にカスタマイズされたインスツルメンテーションが必要な場合は、Agent 側のトレース API を使用して、Datadog に送信されるトレースに含めるスパンを個別に選択することを検討してください。詳細については、[API に関するドキュメント][7]を参照してください。

### その他の参照先

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security
[2]: /ja/tracing/setup
[3]: https://github.com/DataDog/datadog-agent/blob/780caa2855a237fa731b78a1bb3ead5492f0e5c6/pkg/config/config_template.yaml#L472-L490
[4]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/interceptor/TraceInterceptor.java
[5]: http://gems.datadoghq.com/trace/docs/#Processing_Pipeline
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#trace-filtering
[7]: /ja/api/?lang=python#tracing