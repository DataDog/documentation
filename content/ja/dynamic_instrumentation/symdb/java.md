---
code_lang: java
code_lang_weight: 10
is_beta: true
private: false
title: Enable Autocomplete and Search for Java
type: multi-code-lang
---
{{< beta-callout url="#" btn_hidden="true" >}}
オートコンプリートと検索は公開ベータ版です。
{{< /beta-callout >}}

## 要件

- サービスで[ダイナミックインスツルメンテーション][1]が有効になっていること。
- Tracing library [`dd-trace-java`][6] 1.34.0 or higher is installed.

## インストール

Run your service with Dynamic Instrumentation enabled, and additionally enable autocomplete and search:

1. Set the `-Ddd.symbol.database.upload.enabled=true` flag or the `DD_SYMBOL_DATABASE_UPLOAD_ENABLED=true` environment variable.
2. [統合サービスタグ][5]の `dd.service` と `dd.version` を指定します。

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

3. After starting your service with Dynamic Instrumentation and autocomplete and search enabled, you can use Dynamic Instrumentation's IDE-like features on the [**APM** > **Dynamic Instrumentation**][4] page.

## 追加構成

### Third party detection

If autocomplete suggestions do not appear for your package or module, it may be incorrectly recognized as third-party code. The autocomplete and search features use a heuristic to filter out third-party code, which can sometimes lead to accidental misclassification.

To ensure that your code is properly recognized and to enable accurate autocomplete and search functionality, you can configure the third-party detection settings using the following options:

```
export DD_THIRD_PARTY_EXCLUDES=<LIST_OF_USER_CODE_PACKAGE_PREFIXES>
export DD_THIRD_PARTY_INCLUDES=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES>
```

または

```
  -Ddd.third.party.excludes=<LIST_OF_USER_CODE_PACKAGE_PREFIXES> \
  -Ddd.third.party.includes=<LIST_OF_ADDITIONAL_THIRD_PARTY_PACKAGE_PREFIXES> \
```

Where a list means a comma separated list of package prefixes, for example

```
export DD_THIRD_PARTY_EXCLUDES=com.mycompany,io.mycompany
```

[1]: /ja/dynamic_instrumentation
[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: https://github.com/DataDog/dd-trace-java

