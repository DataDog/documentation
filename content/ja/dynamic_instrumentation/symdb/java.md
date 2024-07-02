---
code_lang: java
code_lang_weight: 10
is_beta: true
private: true
title: Java で Symbol Database を有効にする
type: multi-code-lang
---

{{< beta-callout-private url="https://forms.gle/UG9EELAy8Li6z2jW8" >}}
ダイナミックインスツルメンテーションプローブ作成時のユーザーエクスペリエンスの改善にご興味がおありですか？こちらから、Symbol Database 非公開データ版に参加しましょう。
{{< /beta-callout-private >}}

[Symbol Database][6] は、ダイナミックインスツルメンテーションの非公開ベータ版の機能です。

## 要件

- サービスで[ダイナミックインスツルメンテーション][1]が有効になっていること。
- トレーシングライブラリ [`dd-trace-java`][6] 1.25.0 以上がインストールされていること。

## インフラストラクチャーリスト

ダイナミックインスツルメンテーションを有効にしてサービスを実行し、さらに Symbol Database のアップロードを有効にするには:

1. `-Ddd.symbol.database.upload.enabled` フラグ、または `DD_SYMBOL_DATABASE_UPLOAD_ENABLED` 環境変数を `true` に設定します。
2. `-Ddd.symbol.database.includes` フラグ、または `DD_SYMBOL_DATABASE_INCLUDES` 環境変数を利用しているパッケージのプレフィックス (例: `com.datadoghq`) に設定します。設定にはカンマ区切りリストを使用し、複数のプレフィックスを追加できます。
3. [統合サービスタグ][5]の `dd.service` と `dd.version` を指定します。

{{< tabs >}}
{{% tab "コマンド引数" %}}

サービス起動コマンドの例:
```shell
java \
    -javaagent:dd-java-agent.jar \
    -Ddd.service=<YOUR_SERVICE> \
    -Ddd.env=<YOUR_ENVIRONMENT> \
    -Ddd.version=<YOUR_VERSION> \
    -Ddd.dynamic.instrumentation.enabled=true \
    -Ddd.symbol.database.upload.enabled=true \
    -Ddd.symbol.database.includes=<YOUR_PACKAGE_PREFIX> \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}

{{% tab "環境変数" %}}

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
export DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true
export DD_SYMBOL_DATABASE_INCLUDES=<YOUR_PACKAGE_PREFIX>
java \
    -javaagent:dd-java-agent.jar \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{< /tabs >}}

**注**: `-javaagent` 引数は `-jar` ファイルより前にあり、アプリケーション引数ではなく JVM オプションとして追加される必要があります。詳しくは、[Oracle ドキュメント][3]を参照してください。

   ```
   # Correct:
   $ java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags

   # Incorrect:
   $ java -jar my-service.jar -javaagent:dd-java-agent.jar ...
   ```

2. Symbol Database を有効にした状態でサービスを起動すると、[APM > ダイナミックインスツルメンテーションページ][4]で Symbol Database の IDE 同様の機能を利用することができます。

[1]: /ja/dynamic_instrumentation
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/dynamic_instrumentation/symdb