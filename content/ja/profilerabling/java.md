---
aliases:
- /ja/tracing/profiler/enabling/java/
code_lang: java
code_lang_weight: 10
further_reading:
- link: getting_started/profiler
  tag: ドキュメント
  text: プロファイラーの概要
- link: profiler/search_profiles
  tag: ドキュメント
  text: 使用可能なプロファイルタイプの詳細
- link: profiler/profiler_troubleshooting
  tag: ドキュメント
  text: プロファイラの使用中に発生する問題を修正
kind: ドキュメント
title: Java プロファイラーの有効化
type: multi-code-lang
---

プロファイラーは、Datadog トレースライブラリ内で送信されます。アプリケーションですでに [APM を使用してトレースを収集][1]している場合は、ライブラリのインストールをスキップして、プロファイラーの有効化に直接進むことができます。

## 要件

Datadog Profiler を使用するには、[JDK Flight Recorder][2] が必要です。Datadog Profiler ライブラリは、OpenJDK 11+、Oracle JDK 11+、[OpenJDK 8 (バージョン 1.8.0.262/8u262+)][3] と Azul Zulu 8 (バージョン 1.8.0.212/8u212+) でサポートされています。OpenJ9 では、[JDK Flight Recorder][2] に対応していないため、サポートされていません。

LTS 以外の JDK バージョンには、Datadog Profiler ライブラリに関連する安定性とパフォーマンスの修正が含まれていない可能性があるため、Long Term Support JDK のバージョン8、11、17 を使用してください。

Java、Scala、Groovy、Kotlin、Clojure など、すべての JVM ベースの言語をサポートしています。

Continuous Profiler は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

## インストール

アプリケーションのプロファイリングを開始するには

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][4] 以降または [6.20.2][5] 以降にアップグレードしてください。まだ APM を有効にしていない場合で Datadog にデータを送信するようにアプリケーションを設定するには、ご利用中の Agent で `DD_APM_ENABLED` 環境変数を `true` に設定し、ポート `8126/TCP` をリッスンします。

2. Java Agent クラスファイルを含む `dd-java-agent.jar` をダウンロードします。

    ```shell
    wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
    ```

   **注**: Profiler は、0.55 以降のバージョンの `dd-java-agent.jar` ライブラリで利用できます。

3. `Ddd.profiling.enabled` フラグまたは `DD_PROFILING_ENABLED` 環境変数を `true` に設定し、プロファイラーを有効にします。`dd.service`、`dd.env`、`dd.version` を指定して、プロファイルをこれらの次元でフィルタリングしたりグループ化したりできるようにします。
   {{< tabs >}}
{{% tab "コマンド引数" %}}

サービスを呼び出します。
```diff
java \
    -javaagent:dd-java-agent.jar \
    -Ddd.service=<YOUR_SERVICE> \
    -Ddd.env=<YOUR_ENVIRONMENT> \
    -Ddd.version=<YOUR_VERSION> \
    -Ddd.profiling.enabled=true \
    -XX:FlightRecorderOptions=stackdepth=256 \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}
{{% tab "環境変数" %}}

```diff
export DD_SERVICE=<YOUR_SERVICE>
export DD_ENV=<YOUR_ENV>
export DD_VERSION=<YOUR_VERSION>
export DD_PROFILING_ENABLED=true
java \
    -javaagent:dd-java-agent.jar \
    -XX:FlightRecorderOptions=stackdepth=256 \
    -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

{{% /tab %}}
{{< /tabs >}}

    **注**: `javaagent` 引数は `-jar` の前に置く必要があり、アプリケーションの引数ではなく、JVM のオプションとして追加されます。詳細については、[Oracleドキュメント][6]を参照してください。

    ```shell
    # 良い:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # 悪い:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

4. 1〜2 分後、[Datadog APM > Profiling ページ][7]でプロファイルを視覚化することができます。

## 割り当てプロファイラーの有効化

dd-java-agent v0.84.0 以降および Java 15 以前では、割り当てが多いアプリケーションで過剰な CPU を使用する可能性があるため、割り当てプロファイラーはデフォルトでオフになっています。これは一般的ではないため、ステージング環境で試して、アプリケーションに影響するかどうかを確認することをお勧めします。有効にするには、[割り当てプロファイラーの有効化][8]を参照してください。

## コンフィギュレーション

次の環境変数を使用してプロファイラーを構成できます。

| 環境変数                             | タイプ          | 説明                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | `-Ddd.profiling.enabled` 引数の代替。`true` に設定してプロファイラを有効にします。               |
| `DD_PROFILING_ALLOCATION_ENABLED`                | Boolean       | `-Ddd.profiling.allocation.enabled` 引数の代わりになります。割り当てプロファイラーを有効にするには、`true` に設定します。プロファイラーがすでに有効になっている必要があります。 |
| `DD_ENV`                                         | 文字列        | [環境][9]名 (例: `production`)。 |
| `DD_SERVICE`                                     | 文字列        | [サービス][9]名 (例: `web-backend`)。 |
| `DD_VERSION`                                     | 文字列        | サービスの[バージョン][9]。 |
| `DD_TAGS`                                        | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、コンマ区切り形式のリストである必要があります（例、`layer:api, team:intake`）。  |

## 次のステップ

[プロファイラーの概要][10]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[3]: /ja/profiler/profiler_troubleshooting/#java-8-support
[4]: https://app.datadoghq.com/account/settings#agent/overview
[5]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: https://app.datadoghq.com/profiling
[8]: /ja/profiler/profiler_troubleshooting/#enabling-the-allocation-profiler
[9]: /ja/getting_started/tagging/unified_service_tagging
[10]: /ja/getting_started/profiler/