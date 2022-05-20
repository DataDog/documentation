---
further_reading:
- link: /tracing/troubleshooting
  tag: Documentation
  text: APM トラブルシューティング
kind: ドキュメント
title: プロファイラのトラブルシューティング
---

{{< programming-lang-wrapper langs="java,python,go,ruby,dotnet,php,linux" >}}
{{< programming-lang lang="java" >}}

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
<div class="alert alert-info">Java ヒーププロファイラー機能はベータ版です。</div>
<div class="aler alert-info">この機能には、Java 11.0.12、15.0.4、16.0.2、17.0.3、または 18 以降が必要です</div>
ヒーププロファイラーを有効にするには、`-Ddd.profiling.heap.enabled=true` JVM 設定または `DD_PROFILING_HEAP_ENABLED=true` 環境変数を使用してアプリケーションを起動します。

または、`jfp` [オーバーライドテンプレートファイル](#creating-and-using-a-jfr-template-override-file)で次のイベントを有効にすることもできます。

```
jdk.OldObjectSample#enabled=true
```

[オーバーライドテンプレートの使用方法はこちら。](#creating-and-using-a-jfr-template-override-file)

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

メモリリーク検出をオフにするには、`jfp` [オーバーライドテンプレートファイル](#creating-and-using-a-jfr-template-override-file)で次のイベントを無効にします。

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

ベンダーがリストにない場合は、他のベンダーが開発中またはベータ版サポートに対応している可能性があるため、[サポートチケットを開いてください][2]。

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

[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/
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

この問題は [`dd-trace-rb` バージョン `0.54.0`][3] からは発生しないと思われます。
それでも問題が解決しない場合は、エラーに至るまでのバックトレースを添えて、[サポートチケットを作成][2]してください。

`0.54.0` より前のバージョンでは、プロファイラーはスレッド生成を追跡するために Ruby VM をインスツルメントする必要があり、他の gem による同様のインスツルメンテーションと衝突していました。

以下の gem のいずれかを使用している場合

* `rollbar`: バージョン 3.1.2 以降を使用していることを確認します。
* `logging`: `LOGGING_INHERIT_CONTEXT` 環境変数を `false` に設定して、 `logging` のスレッドコンテキストの継承を
  無効にします。

## レスキュージョブのプロファイルがありません

[Resque][4] のジョブをプロファイリングする場合、[Resque のドキュメント][5]にあるように、`RUN_AT_EXIT_HOOKS` 環境変数を `1` に設定する必要があります。

このフラグがないと、短期間の Resque ジョブのプロファイルは使用できなくなります。


[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/
[3]: https://github.com/DataDog/dd-trace-rb/releases/tag/v0.54.0
[4]: https://github.com/resque/resque
[5]: https://github.com/resque/resque/blob/v2.0.0/docs/HOOKS.md#worker-hooks
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}

## プロファイル検索ページにないプロファイル

プロファイラーを構成してもプロファイル検索ページにプロファイルが表示されない場合、確認すべき設定をいくつか紹介します。

1. Agent がインストールされ、起動していること、および Windows サービスパネルに表示されていることを確認します。

2. プロファイルのエクスポート結果を確認します。

   1. アプリケーションの環境変数 `DD_TRACE_DEBUG` を設定することで、デバッグログを有効化します。

   2. アプリケーションを再起動します。

   3. `%ProgramData%\Datadog-APM\logs\` フォルダにある `DD-Dotnet-Profiler.<Application Name>` ログファイルを開きます。

   4. `Profile data was NOT successfully exported via HTTP POST` (HTTP POST 経由でプロファイルデータが正常にエクスポートされませんでした)というエントリーを探します。

   5. 以下のフィールドにエラーがないか確認します。
      ```
      ["response.StatusCode"]=...,
      ["response.Error"]="...",
      ```

   6. 以下のフィールドに、適切な URL が使用されていることをご確認ください。デフォルトのコンフィギュレーション設定を使用する場合は:
      ```
      ["_profilesIngestionEndpoint_url"]="http://127.0.0.1:8126/profiling/v1/input",
      ```
      コンフィギュレーションで、 `DD_TRACE_AGENT_URL` または `DD_AGENT_HOST` および `DD_TRACE_AGENT_PORT` 環境変数を使用する別のトレース Agent URL を特定する場合、このフィールドはその値と一致する必要があります。たとえば、
      ```
      ["_profilesIngestionEndpoint_url"]="http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>/profiling/v1/input",
      ```

正しくない場合は、[デバッグモード][1]をオンにして、デバッグファイルと以下の情報を添えて[サポートチケットの発行][2]を行います。
- オペレーティングシステムのタイプとバージョン (例: Windows Server 2019)。
- ランタイムのタイプとバージョン (例: .NET Core 6.0)。
- アプリケーションのタイプ (例: IIS で動作する Web アプリケーション)。


[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

## プロファイル検索ページにないプロファイル

プロファイラーを構成しても、プロファイル検索ページにプロファイルが表示されない場合は、`phpinfo()` 関数を実行します。プロファイラーは `phpinfo()` をフックして診断を実行します。Web サーバーに問題がある場合は、コマンドラインからではなく、Web サーバーから `phpinfo()` を実行すると、各サーバー API (SAPI) を個別に構成することができます。

以下の内容で[サポートチケットを発行][1]します。

- オペレーティングシステムのタイプとバージョン (例: Linux Ubuntu 20.04)
- `phpfo()` の出力。PHP のバージョン、SAPI のタイプ、Datadog ライブラリのバージョン、そしてプロファイラーの診断が含まれます。


[1]: /ja/help/
{{< /programming-lang >}}

{{< programming-lang lang="linux" >}}

## プロファイル検索ページにないプロファイル

プロファイラを設定してもプロファイル検索ページにプロファイルが表示されない場合は、[冗長ロギング][1]をオンにし、ログファイルと次の情報で[サポートチケットを開いてください][2]。

- Linux カーネルバージョン (`uname -r`)
- libc バージョン (`ldd --version`)
- `/proc/sys/kernel/perf_event_paranoid` の値
- プロファイラーとアプリケーションの両方の引数を含む完全なコマンドライン

また、必要に応じて、冗長ログを有効にし、以下のセクションを確認することでトラブルシューティングを行うことができます。

### "\<ERROR\> Error calling perfopen on watcher"

このエラーは、通常、プロファイラーを作動させるのに十分な権限がない場合に発生します。最も一般的な理由は、必要なオペレーティングシステムの機能が無効になっており、プロファイリングに失敗することです。これは通常、ホストレベルの構成であり、個々のポッドやコンテナのレベルでは設定できません。

`perf_event_paranoid` が再起動後も持続するように設定することは、分布に依存します。診断の手順として、以下を試してみてください。

```shell
echo 1 | sudo tee /proc/sys/kernel/perf_event_paranoid

```

**注**: これは `/proc/sys/kernel/perf_event_paranoid` オブジェクトが存在し、書き込み可能なマウントネームスペースから実行する必要があります。典型的には、これはルートマウントのネームスペース、言い換えれば、通常のコンテナではなく、ホストとなります。

`perf_event_paranoid` の値をオーバーライドするために使用できる機能は 2 つあります。
- `CAP_SYS_ADMIN` (多くの権限を追加するので、組織によっては推奨されない場合があります)
- `CAP_PERFMON` (Linux v5.8 以降で使用可能)

あまり一般的ではない権限の問題がいくつかあります。
- プロファイラーは、起動時に UID が変更されるプロセスをインスツルメントできないことがあります。これは多くの Web サーバーやデータベースでよくあることです。
- プロファイラーは `perf_event_open()` システムコールに依存していますが、コンテナランタイムによってはこれが許可されない場合があります。そのようなことがあるかどうかは、適切なドキュメントをチェックしてください。
- seccomp のプロファイルの中には `perf_event_open()` を禁止しているものがあります。お使いのシステムでそのような構成が行われている場合、プロファイラーを実行できないことがあります。

### "\<WARNING\> Could not finalize watcher"

この警告は、システムがプロファイラーに十分なロックされたメモリーを割り当てられない場合に発生する可能性があります。この現象は、特定のホストでプロファイラーのインスタンスが多すぎる場合 (多くのコンテナ型サービスが同じホストで個別にインスツルメントされている場合など) によく発生します。この問題は、`mlock()` のメモリ制限を増やすか、インスツルメントされるアプリケーションの数を減らすことで解決できます。

他のプロファイリングツールも同様の制限に寄与する可能性があります。

### "\<WARNING\> Failure to establish connection"

このエラーは、通常、プロファイラーが Datadog Agent に接続できないことを意味します。プロファイラーがアップロードに使用するホスト名とポート番号を特定するには、[コンフィギュレーションロギング][3]を有効にしてください。さらに、エラーメッセージの内容から、使用されるホスト名とポートがリレーされる場合があります。これらの値をお使いの Agent の構成と比較してください。プロファイラーの入力パラメーターとデフォルト値の詳細については、[プロファイラーを有効にする][4]を参照してください。

## プロファイルが空またはまばらである

プロファイルが空であったり ("No CPU time reported")、フレーム数が少なかったりすることがあります。これは、アプリケーションのシンボル化情報が貧弱な場合に発生することがあります。プロファイラーは、インスツルメントされたアプリケーションが CPU 上でスケジュールされている場合にのみ起動します。

プロファイルのルートは、アプリケーション名を括弧で囲んでアノテーションをつけたフレームです。このフレームに大量の CPU 時間が表示され、子フレームがない場合、アプリケーションのプロファイリング忠実度が低い可能性があります。次のようなことを考えてみてください。
- ストリップされたバイナリはシンボルが使用できません。ストリップされていないバイナリや、縮小されていないコンテナイメージを使ってみてください。
- 特定のアプリケーションやライブラリは、そのデバッグパッケージがインストールされていると便利です。これは、リポジトリのパッケージマネージャーなどでインストールされたサービスにも当てはまります。

## 共有ライブラリのロード中のエラー

Continuous Profiler for Linux を動的ライブラリとして使用している場合、以下のエラーでアプリケーションが起動しないことがあります。

```
error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

これは、アプリケーションが `libdd_profiling.so` の依存関係で構築されている場合に発生しますが、依存関係の調整中のランタイムでは見られません。以下のいずれかを実行することで修正できます。

- 静的ライブラリを使用してアプリケーションを再構築。一部の構築システムでは、動的ライブラリと静的ライブラリの選択があいまいなため、`ldd` を使用して `libdd_profiling.so` で結果のバイナリに不要な動的依存関係が含まれるかどうかを確認します。
- 動的リンカーの検索パスでディレクトリの 1 つに `libdd_profiling.so` をコピー。ほとんどの Linux システムで、`ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n` を実行することでこのディレクトリのリストを獲得できます。

[1]: /ja/tracing/troubleshooting/#tracer-debug-logs
[2]: /ja/help/
[3]: /ja/tracing/profiler/enabling/linux/?tab=environmentvariables#configuration
[4]: /ja/tracing/profiler/enabling/linux/
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}