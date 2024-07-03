---
aliases:
- /ja/tracing/dynamic_instrumentation/enabling/java/
code_lang: java
code_lang_weight: 10
further_reading:
- link: agent
  tag: Documentation
  text: Getting Started with Datadog Agent
is_beta: false
private: false
title: Enable Dynamic Instrumentation for Java
type: multi-code-lang
---

ダイナミックインスツルメンテーションは、Datadog のトレーシングライブラリをサポートする機能です。すでに [APM を使用してアプリケーションのトレースを収集][1]している場合は、Agent とトレーシングライブラリが必要なバージョンであることを確認し、ステップ 4 のダイナミックインスツルメンテーションの有効化に直接進みます。

## 要件

Datadog ダイナミックインスツルメンテーションライブラリは、JDK バージョン 8 以降でサポートされています。

## インストール

1. Agent のバージョン[7.44.0][2] 以上をインストールするか、アップグレードします。
2. まだ APM を有効にしていない場合は、Agent の構成で `DD_APM_ENABLED` 環境変数を `true` に設定し、ポート `8126/TCP` をリッスンします。

3. `dd-java-agent.jar` をダウンロードします。
 {{< tabs >}}
 {{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}

   **Note**: Dynamic Instrumentation is available in the `dd-java-agent.jar` library in versions 1.24.0 and later.

3. `-Ddd.dynamic.instrumentation.enabled` フラグ、または `DD_DYNAMIC_INSTRUMENTATION_ENABLED` 環境変数を `true` に設定し、ダイナミックインスツルメンテーションを有効にしてサービスを稼働させます。`dd.service`、`dd.env`、`dd.version` の統合サービスタグを指定すると、プローブをフィルターしたりグループ化したり、アクティブなクライアントをこれらの次元でターゲットにすることができるようになります。
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
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{% tab "環境変数" %}}

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{< /tabs >}}

**注**: `-javaagent` 引数は `-jar` ファイルより前にあり、アプリケーション引数ではなく JVM オプションとして追加される必要があります。詳しくは、[Oracle ドキュメント][3]を参照してください。

   ```shell
   # 良い:
   java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
   # 悪い:
   java -jar my-service.jar -javaagent:dd-java-agent.jar ...
   ```

4. ダイナミックインスツルメンテーションを有効にした状態でサービスを起動すると、[APM > ダイナミックインスツルメンテーションページ][4]でダイナミックインスツルメンテーションの利用を開始することができます。

## 構成

以下の環境変数を使用してダイナミックインスツルメンテーションを構成します。

| 環境変数                             | タイプ          | 説明                                                                                                               |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `DD_DYNAMIC_INSTRUMENTATION_ENABLED`             | Boolean       | 引数 `-Ddd.dynamic.instrumentation.enabled` の代替。ダイナミックインスツルメンテーションを有効にするには、`true` に設定します。           |
| `DD_SERVICE`                                     | 文字列        | [サービス][5]名 (例: `web-backend`)。                                                                        |
| `DD_ENV`                                         | 文字列        | [環境][5]名 (例: `production`)。                                                                     |
| `DD_VERSION`                                     | 文字列        | サービスの[バージョン][5]。                                                                                         |
| `DD_TAGS`                                        | 文字列        | 生成されたデータに適用するタグ。タグは `<key>:<value>` をカンマで区切ったリストである必要があります。例: `layer:api,team:intake`   |

## 次にやるべきこと

スナップショットやメトリクスプローブの設定、データの参照やインデックス作成については、[ダイナミックインスツルメンテーション][6]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/tracing/dynamic_instrumentation/