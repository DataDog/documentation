---
title: Enabling the Go Profiler
code_lang: go
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: getting_started/profiler
      tag: Documentation
      text: Getting Started with Profiler
    - link: profiler/profile_visualizations
      tag: Documentation
      text: Learn more about available profile visualizations
    - link: profiler/profiler_troubleshooting/go
      tag: Documentation
      text: Fix problems you encounter while using the profiler
aliases:
  - /tracing/profiler/enabling/go/
---

プロファイラーは、Datadog トレースライブラリ内で送信されます。アプリケーションですでに [APM を使用してトレースを収集][1]している場合は、ライブラリのインストールをスキップして、プロファイラーの有効化に直接進むことができます。

## 要件

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][18].

Datadog Profiler には Go 1.19 以降が必要です。

[Code Hotspots][2] と [Endpoint Profiling][3] については、`dd-trace-go` バージョン 1.37.0 以降を使用してください。

Continuous Profiler は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

## インストール

アプリケーションのプロファイリングを開始するには

1. Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][19].

2. 以下のコマンドを使用して、`dd-trace-go` を取得します。

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1/profiler
    ```

     **注**: プロファイラは、バージョン 1.23.0 以降の `dd-trace-go` ライブラリで利用できます。

3. アプリケーションの開始時に、[プロファイラ][6]をインポートします。

    ```Go
    import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
    ```

4. 次のスニペットを追加し、プロファイラを起動します。

    ```Go
    err := profiler.Start(
        profiler.WithService("<SERVICE_NAME>"),
        profiler.WithEnv("<ENVIRONMENT>"),
        profiler.WithVersion("<APPLICATION_VERSION>"),
        profiler.WithTags("<KEY1>:<VALUE1>", "<KEY2>:<VALUE2>"),
        profiler.WithProfileTypes(
          profiler.CPUProfile,
          profiler.HeapProfile,
          // The profiles below are disabled by default to keep overhead
          // low, but can be enabled as needed.

          // profiler.BlockProfile,
          // profiler.MutexProfile,
          // profiler.GoroutineProfile,
        ),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

4. オプション: [タイムライン機能][7] (ベータ版) を有効にします。[前提条件][8]を参照してください。

5. Optional: Set up [Source Code Integration][9] to connect your profiling data with your Git repositories.

6. After a minute or two, visualize your profiles in the [Datadog APM > Profiler page][10].

**Note**: By default, only the CPU and Heap profiles are enabled. Use [profiler.WithProfileTypes][11] to enable additional [profile types][12].

## 構成

以下の関数で、コードにプロファイラーパラメーターを設定できます。

| 関数 | タイプ          | 説明                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | 文字列        | The Datadog [service][13] name, for example, `my-web-app`.             |
|  WithEnv         | 文字列        | The Datadog [environment][14] name, for example, `production`.         |
|  WithVersion     | 文字列        | アプリケーションのバージョン                                                                             |
|  WithTags        | 文字列のリスト        | アップロードされたプロファイルに適用されるタグのリスト。タグは `<KEY>:<VALUE>` という形式で指定する必要があります。 |

または、環境変数を使用してプロファイラーコンフィギュレーションを設定することも可能です。

| 環境変数                             | タイプ          | 説明                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                                         | 文字列        | The [environment][13] name, for example, `production`. |
| `DD_SERVICE`                                     | 文字列        | The [service][13] name, for example, `web-backend`. |
| `DD_VERSION`                                     | 文字列        | The [version][13] of your service. |
| `DD_TAGS`                                        | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、コンマ区切り形式のリストである必要があります（例、`layer:api,team:intake`）。   |

### CPU プロファイルで C 関数呼び出しを表示する

デフォルトでは、Go の CPU プロファイラーには、Go コードの詳細情報のみが表示されます。プログラムが C コードを呼び出した場合、C コードの実行時間はプロファイルに反映されますが、コールスタックには Go 関数の呼び出しだけが表示されます。

To add detailed C function call information to CPU profiles, you may opt to use library such as [ianlancetaylor/cgosymbolizer][14]. To use this library:

1. パッケージをダウンロードします。

    ```shell
    go get github.com/ianlancetaylor/cgosymbolizer@latest
    ```

2. プログラムの任意の場所に、以下のインポートを追加します。

    ```Go
    import _ "github.com/ianlancetaylor/cgosymbolizer"
    ```

**注**: このライブラリは実験的なものと見なされています。C++ の例外を使用するプログラムや、`tcmalloc` のようなコールスタックを収集するライブラリを使用するプログラムでは、デッドロックの原因となる可能性があります (頻度は低いですが)。

## Save up to 14% CPU in production with PGO

Starting [Go 1.21][15], the Go compiler supports Profile-Guided Optimization (PGO). PGO enables additional optimizations on code identified as hot by CPU profiles of production workloads. This is compatible with Datadog Go Continuous Profiler and can be used for production builds.

Follow [this guide][16] to set it up.

## 次のステップ

The [Getting Started with Profiler][17] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: /profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[3]: /profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[4]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[5]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[7]: /profiler/connect_traces_and_profiles/#span-execution-timeline-view
[8]: /profiler/connect_traces_and_profiles/#prerequisites
[9]: /integrations/guide/source-code-integration/?tab=go
[10]: https://app.datadoghq.com/profiling
[11]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithProfileTypes
[12]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#ProfileType
[13]: /getting_started/tagging/unified_service_tagging
[14]: https://pkg.go.dev/github.com/ianlancetaylor/cgosymbolizer#pkg-overview
[15]: https://tip.golang.org/doc/go1.21
[16]: /profiler/guide/save-cpu-in-production-with-go-pgo
[17]: /getting_started/profiler/
[18]: /profiler/enabling/supported_versions/
[19]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
