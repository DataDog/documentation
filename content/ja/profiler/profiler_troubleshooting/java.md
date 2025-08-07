---
code_lang: java
code_lang_weight: 10
further_reading:
- link: /tracing/troubleshooting
  tag: Documentation
  text: APM トラブルシューティング
title: Java プロファイラーのトラブルシューティング
type: multi-code-lang
---

## プロファイル検索ページにないプロファイル

プロファイラを設定してもプロファイル検索ページにプロファイルが表示されない場合は、[デバッグモード][1]をオンにし、デバッグファイルと次の情報で[サポートチケットを開いてください][2]。

- オペレーティングシステムのタイプとバージョン (例: Linux Ubuntu 20.04)
- ランタイムのタイプ、バージョン、ベンダー (例: Java OpenJDK 11 AdoptOpenJDK)


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

## 割り当てプロファイラーの有効化

Java 15 以下では、割り当てが多いアプリケーションでプロファイラーが圧倒される可能性があるため、割り当てプロファイラーはデフォルトでオフになっています。

割り当てプロファイラーを有効にするには、`-Ddd.profiling.allocation.enabled=true` JVM 設定または `DD_PROFILING_ALLOCATION_ENABLED=true` 環境変数を使用してアプリケーションを起動します。

または、`jfp` [オーバーライドテンプレートファイル](#creating-and-using-a-jfr-template-override-file)で次のイベントを有効にすることもできます。

```
jdk.ObjectAllocationInNewTLAB#enabled=true
jdk.ObjectAllocationOutsideTLAB#enabled=true
```

[オーバーライドテンプレートの使用方法はこちら。](#creating-and-using-a-jfr-template-override-file)

## ヒーププロファイラーの有効化
<div class="aler alert-info">この機能を使用するには、少なくとも Java 11.0.12、15.0.4、16.0.2、17.0.3、または 18 以降が必要です</div>
ヒープ プロファイラーを有効化するには、アプリケーションを `-Ddd.profiling.heap.enabled=true` JVM 設定または `DD_PROFILING_HEAP_ENABLED=true` 環境変数を指定して起動します。

代わりに、`jfp` [オーバーライド テンプレート ファイル](#creating-and-using-a-jfr-template-override-file) で次のイベントを有効化できます。

```
jdk.OldObjectSample#enabled=true
```

[オーバーライド テンプレートの使用方法を確認してください。](#creating-and-using-a-jfr-template-override-file)

## ヒープ ヒストグラム メトリクスの有効化
<div class="aler alert-info">この機能を使用するには、少なくとも Java 17.0.9 以降が必要で、ZGC では動作しません</div>

ヒープ ヒストグラム メトリクスを有効化するには、アプリケーションを `-Ddd.profiling.heap.histogram.enabled=true` JVM 設定または `DD_PROFILING_HEAP_HISTOGRAM_ENABLED=true` 環境変数を指定して起動します。

## プロファイルからの機密情報の削除

システムプロパティにユーザー名やパスワードなどの機密情報が含まれている場合は、`jdk.InitialSystemProperty` を無効にして `jfp` [オーバーライドテンプレートファイル](#creating-and-using-a-jfr-template-override-file) を作成し、システムプロパティイベントをオフにします。

```
jdk.InitialSystemProperty#enabled=false
```

[オーバーライドテンプレートの使用方法はこちら。](#creating-and-using-a-jfr-template-override-file)

## プロファイラを圧倒する大きな割り当て

割り当てプロファイリングをオフにするには、`jfp` [オーバーライドテンプレートファイル](#creating-and-using-a-jfr-template-override-file)で次のイベントを無効にします。

```
jdk.ObjectAllocationInNewTLAB#enabled=false
jdk.ObjectAllocationOutsideTLAB#enabled=false
```

[オーバーライドテンプレートの使用方法はこちら。](#creating-and-using-a-jfr-template-override-file)

## ガベージコレクターの速度を低下させるメモリリーク検出
{{< tabs >}}
{{% tab "JFR" %}}
メモリ リーク検出をオフにするには、`jfp` [オーバーライド テンプレート ファイル](#creating-and-using-a-jfr-template-override-file) 内で次のイベントを無効化します:

```
jdk.OldObjectSample#enabled=false
```

[オーバーライドテンプレートの使用方法はこちら。](#creating-and-using-a-jfr-template-override-file)

{{% /tab %}}
{{% tab "Datadog Profiler" %}}
ライブ ヒープ プロファイリングのアルファ機能を使用している場合、追跡するアロケーション サンプルの割合を変更することでオーバーヘッドを調整できます。
```shell
# アロケーション サンプルの 10% のみをトラッキングします
java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.profiling.ddprof.liveheap.enabled=true -Ddd.profiling.ddprof.liveheap.sample_percent=10 -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
```
{{% /tab %}}
{{< /tabs >}}

## プロファイラを圧倒する例外

Datadog 例外プロファイラは通常の条件下では、フットプリントとオーバーヘッドが小さくなります。ただし、多くの例外が作成されてスローされると、プロファイラに大きなオーバーヘッドが発生することがあります。これは、コントロールフローに例外を使用した場合などに発生する可能性があります。例外率が異常に高い場合は、例外の原因を修正するまで、例外プロファイリングを一時的にオフにします。

例外プロファイリングを無効にするには、`-Ddd.integration.throwables.enabled=false` JVM 設定でトレーサーを開始します。

より一般的な例外率に戻った後は、この設定をオンに戻すことを忘れないでください。

## Java 8 のサポート

次の OpenJDK 8 ベンダーでは、最新バージョンに JDK Flight Recorder が含まれているため、Continuous Profiling がサポートされます。

| ベンダー                      | Flight Recorder を含む JDK バージョン |
| --------------------------- | ----------------------------------------- |
| Azul                        | u212 (u262 推奨)                |
| AdoptOpenJDK                | u262                                      |
| RedHat                      | u262                                      |
| Amazon (Corretto)           | u262                                      |
| Bell-Soft (Liberica)        | u262                                      |
| すべてのベンダーのアップストリームビルド | u272                                      |

お使いのベンダーがリストにない場合は、[サポート チケットを開く][2] ことでご連絡ください。ほかのベンダーは開発中、またはプレビュー サポートとして利用可能な場合があります。

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
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -Ddd.logs.injection=true -Ddd.profiling.jfr-template-override-file=</path/to/override.jfp> -jar path/to/your/app.jar
    ```

## tmp フォルダ関連の問題管理

Continuous Profiler は、システム `/tmp` ディレクトリの使用に起因するエラーに遭遇することがあります。特に Docker、Kubernetes、SELinux 有効環境など、セキュリティ制約や実行権限が限られた環境で発生しやすく、以下の問題につながる可能性があります。

- プロファイラー起動失敗
- ネイティブ `.so` ライブラリを読み込めない
- JVM 再起動やクラッシュ時に古い一時ファイルが蓄積される

これらの問題を解決するための基本的なトラブルシューティング手順を以下に示します。

- dd-trace-java Version 1.47.0 以降を使用する
  v1.47.0 以降では、プロファイラーは設定済みの一時ディレクトリ内に PID 固有のサブディレクトリを使用します。これにより、JVM プロセスが予期せず終了した際に残る孤立ファイルによる混乱や競合が減少します。

- 実行可能なカスタム一時ディレクトリを指定する
  複数の環境で確実に動作させるため、以下の JVM オプションを使用して書き込み可能かつ実行可能な一時ディレクトリを明示的に設定してください。
   ```
   -Ddd.profiling.tempdir=<path_to_writable_exec_enabled_directory>
   ```
  ディレクトリ要件:
  -  JVM プロセスが書き込み可能であること
  -  パスのすべての階層に実行権限があること
  -  SELinux が適用されている場合は、そのポリシーに準拠していること

   例:
    ```
    mkdir -p /opt/datadog-profiler-tmp
    chmod 755 /opt/datadog-profiler-tmp
    java -Ddd.profiling.tempdir=/opt/datadog-profiler-tmp -javaagent:/path/to/dd-java-agent.jar ...
    ```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/troubleshooting/#debugging-and-logging
[2]: /ja/help/