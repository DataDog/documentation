---
title: プロファイラのトラブルシューティング
kind: ドキュメント
further_reading:
  - link: /tracing/troubleshooting
    tag: Documentation
    text: APM トラブルシューティング
---
{{< programming-lang-wrapper langs="java,python,go,ruby" >}}
{{< programming-lang lang="java" >}}

## プロファイル検索ページにないプロファイル

プロファイラを設定してもプロファイル検索ページにプロファイルが表示されない場合は、[デバッグモード][1]をオンにし、デバッグファイルと次の情報で[サポートチケットを開いてください][2]。

- オペレーティングシステムのタイプとバージョン (例: Linux Ubuntu 20.04)
- ランタイムのタイプ、バージョン、ベンダー (例: Java OpenJDK 11 AdoptOpenJDK)

[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/

## デフォルトの設定からオーバーヘッドを軽減する

デフォルトで設定されているオーバーヘッドを許容できない場合、プロファイラーを使用して最小限のコンフィギュレーション設定をすることができます。最小コンフィギュレーションとデフォルトの違いは以下のとおりです。

- `ThreadSleep`、`ThreadPark`、`JavaMonitorWait` イベントのサンプリングのしきい値が、デフォルトの 100ms から 500ms に増加
- `ObjectAllocationInNewTLAB`、`ObjectAllocationOutsideTLAB`、`ExceptionSample`、`ExceptionCount` イベントが無効化

最小コンフィギュレーションを使用するには、`dd-java-agent` のバージョン `0.70.0` を使用していることを確認し、サービス呼び出しを以下に変更します。

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=minimal -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

## プロファイラー情報の粒度を増加する

プロファイリングデータの粒度をより細かくするには、`comprehensive` コンフィギュレーションを指定します。この方法を取った場合、さらに細かい粒度のコストでプロファイラーオーバーヘッドが増加することにご留意ください。包括的コンフィギュレーションとデフォルトの違いは以下のとおりです。

- `ThreadSleep`、`ThreadPark`、`JavaMonitorWait` イベントのサンプリングのしきい値が、デフォルトの 100ms から 10ms に減少
- `ObjectAllocationInNewTLAB`、`ObjectAllocationOutsideTLAB`、`ExceptionSample`、`ExceptionCount` イベントが有効化

包括的コンフィギュレーションを使用するには、`dd-trace-java` のバージョン `0.70.0` を使用していることを確認し、サービス呼び出しを以下に変更します。

```
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.jfr-template-override-file=comprehensive -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```

## プロファイルからの機密情報の削除

システムプロパティにユーザー名やパスワードなどの機密情報が含まれている場合は、`jdk.InitialSystemProperty` を無効にして `jfp` [オーバーライドテンプレートファイル](#creating-and-using-a-jfr-template-override-file) を作成し、システムプロパティイベントをオフにします。

```
jdk.InitialSystemProperty#enabled=false
```

[オーバーライドテンプレートの使用方法はこちら。](#creating-and-using-a-jfr-template-override-file)

## プロファイラを圧倒する大きな割り当て

割り当てプロファイリングをオフにするには、`jfp` [オーバーライドテンプレートファイル](#large-allocation-events-overwhelming-the-profiler)で次のイベントを無効にします。

```
jdk.ObjectAllocationInNewTLAB#enabled=false
jdk.ObjectAllocationOutsideTLAB#enabled=false
jdk.OldObjectSample#enabled=false
```

[オーバーライドテンプレートの使用方法はこちら。](#creating-and-using-a-jfr-template-override-file)

## ガベージコレクターの速度を低下させるメモリリーク検出

メモリリーク検出をオフにするには、`jfp` [オーバーライドテンプレートファイル](#large-allocation-events-overwhelming-the-profiler)で次のイベントを無効にします。

```
jdk.OldObjectSample#enabled=false
```

[オーバーライドテンプレートの使用方法はこちら。](#creating-and-using-a-jfr-template-override-file)

## プロファイラを圧倒する例外

Datadog 例外プロファイラは通常の条件下では、フットプリントとオーバーヘッドが小さくなります。ただし、多くの例外が作成されてスローされると、プロファイラに大きなオーバーヘッドが発生することがあります。これは、コントロールフローに例外を使用した場合などに発生する可能性があります。例外率が異常に高い場合は、例外の原因を修正するまで、例外プロファイリングを一時的にオフにします。

例外プロファイリングを無効にするには、`-Ddd.integration.throwables.enabled=false` JVM 設定でトレーサーを開始します。

より一般的な例外率に戻った後は、この設定をオンに戻すことを忘れないでください。

## Java 8 のサポート

次の OpenJDK 8 ベンダーでは、最新バージョンに JDK Flight Recorder が含まれているため、Continuous Profiling がサポートされます。

| ベンダー                      | Flight Recorder を含む JDK バージョン                      |
| --------------------------- | -------------------------------------------------------------- |
| Azul                        | u212 (u262 推奨)                                     |
| AdoptOpenJDK                | u262                                                           |
| RedHat                      | u262                                                           |
| Amazon (Corretto)           | u262                                                           |
| Bell-Soft (Liberica)        | u262                                                           |
| すべてのベンダーのアップストリームビルド | u272                                                           |

ベンダーがリストにない場合は、[サポートチケットを開いてください][2]。サポートを計画しているかどうか、またはすでにベータサポートを提供しているかどうかをお知らせします。

## JFR テンプレートオーバーライドファイルの作成と使用

オーバーライドテンプレートを使用すると、オーバーライドするプロファイリングプロパティを指定できます。ただし、デフォルトでは、オーバーヘッドとデータ密度の間でトレードオフのバランスを程よく保ち、大部分のユースケースに対応できるように設定されています。オーバーライドファイルを使用するには、次のステップを実行します。

1. アクセス可能なディレクトリで、サービスの起動時に `dd-java-agent` を使用して、オーバーライドファイルを作成します。
    ```
    touch dd-profiler-overrides.jfp
    ```

2. 必要なオーバーライドファイルを jfp ファイルに追加します。たとえば、割り当てプロファイリングと JVM システムプロパティを無効にする場合、`dd-profiler-overrides.jfp` ファイルは次のようになります。

    ```
    jdk.ObjectAllocationInNewTLAB#enabled=false
    jdk.ObjectAllocationOutsideTLAB#enabled=false
    jdk.InitialSystemProperty#enabled=false
    ```

3. アプリケーションを `dd-java-agent` で実行している場合は、サービスの起動時に `-Ddd.profiling.jfr-template-override-file=</path/to/override.jfp>` を使用してオーバーライドファイルを指定する必要があります。たとえば、次のようになります。

    ```
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.trace.sample.rate=1 -Ddd.profiling.jfr-template-override-file=</path/to/override.jfp> -jar path/to/your/app.jar
    ```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

## プロファイル検索ページにないプロファイル

プロファイラを設定してもプロファイル検索ページにプロファイルが表示されない場合は、[デバッグモード][1]をオンにし、デバッグファイルと次の情報で[サポートチケットを開いてください][2]。

- オペレーティングシステムのタイプとバージョン (例: Linux Ubuntu 20.04)
- ランタイムのタイプ、バージョン、ベンダー (例: Python 3.9.5)

[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

## プロファイル検索ページにないプロファイル

プロファイラを設定してもプロファイル検索ページにプロファイルが表示されない場合は、[デバッグモード][1]をオンにし、デバッグファイルと次の情報で[サポートチケットを開いてください][2]。

- オペレーティングシステムのタイプとバージョン (例: Linux Ubuntu 20.04)
- ランタイムのタイプ、バージョン、ベンダー (例: Go 1.16.5)

[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

## プロファイル検索ページにないプロファイル

プロファイラを設定してもプロファイル検索ページにプロファイルが表示されない場合は、[デバッグモード][1]をオンにし、デバッグファイルと次の情報で[サポートチケットを開いてください][2]。

- オペレーティングシステムのタイプとバージョン (例: Linux Ubuntu 20.04)
- ランタイムのタイプ、バージョン、ベンダー (例: Ruby 2.7.3)

## アプリケーションが「スタックレベルが深すぎます (SystemStackError)」エラーをトリガーします

プロファイラーは、スレッドの作成を追跡するために Ruby VM をインスツルメントします。
このインスツルメンテーションは、いくつかの例外を除いて、スレッド作成もインスツルメントする他のほとんどの Ruby gem と互換性があります。

以下の gem のいずれかを使用している場合

* `rollbar`: バージョン 3.1.2 以降を使用していることを確認します。
* `logging`: `LOGGING_INHERIT_CONTEXT` 環境変数を `false` に設定して、 `logging` のスレッドコンテキストの継承を
  無効にします。

上記の手順を実行しても `SystemStackError` エラーが引き続き発生する場合は、エラーにつながる完全なバックトレースが含まれるように注意して[サポートチケットを開きます][2]。

## レスキュージョブのプロファイルがありません

[Resque](https://github.com/resque/resque) ジョブをプロファイリングするときは、[Resque ドキュメント](https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks)の説明に従って、`RUN_AT_EXIT_HOOKS` 環境変数を `1` に設定する必要があります。

このフラグがないと、短期間の Resque ジョブのプロファイルは使用できなくなります。

[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/

{{< /programming-lang >}}
{{< /programming-lang >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}