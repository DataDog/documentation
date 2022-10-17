---
code_lang: java
code_lang_weight: 10
further_reading:
- link: agent
  tag: ドキュメント
  text: Datadog Agent の概要
is_beta: true
kind: ドキュメント
private: true
title: Java のダイナミックインスツルメンテーションを有効にする
type: multi-code-lang
---

ダイナミックインスツルメンテーションは、Datadog のトレーシングライブラリをサポートする機能です。すでに [APM を使用してアプリケーションのトレースを収集][1]している場合は、Agent とトレーシングライブラリが必要なバージョンであることを確認し、ステップ 4 のダイナミックインスツルメンテーションの有効化に直接進みます。

## 要件

Datadog ダイナミックインスツルメンテーションライブラリは、JDK バージョン 8 以降でサポートされています。

## APM に Datadog Agent を構成する

1. Agent をバージョン [7.39.1][2]+ にインストールまたはアップグレードします。
2. まだ APM を有効にしていない場合は、Agent の構成で `DD_APM_ENABLED` 環境変数を `true` に設定し、ポート `8126/TCP` をリッスンします。

3. `dd-java-agent.jar` をダウンロードします。

   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
   **注**: ダイナミックインスツルメンテーションは、バージョン 0.109.0 以降の `dd-java-agent.jar` ライブラリで利用可能です。

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
    -Ddd.remote_config.enabled=true \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{% tab "環境変数" %}}

```shell
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
export DD_REMOTE_CONFIG_ENABLED=true
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

## コンフィギュレーション

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

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[4]: https://app.datadoghq.com/dynamic-instrumentation
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/tracing/dynamic_instrumentation/