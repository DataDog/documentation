---
aliases:
- /ja/tracing/profiler/enabling/go/
code_lang: go
code_lang_weight: 30
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
title: Go プロファイラーの有効化
type: multi-code-lang
---

プロファイラーは、Datadog トレースライブラリ内で送信されます。アプリケーションですでに [APM を使用してトレースを収集][1]している場合は、ライブラリのインストールをスキップして、プロファイラーの有効化に直接進むことができます。

## 要件

Datadog Profiler には Go 1.12 以降が必要です。

Continuous Profiler は、AWS Lambda などのサーバーレスプラットフォームには対応していません。

## インストール

アプリケーションのプロファイリングを開始するには

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][2] 以降または [6.20.2][3] 以降にアップグレードしてください。

2. 以下のコマンドを使用して、`dd-trace-go` を取得します。

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1/profiler
    ```

     **注**: プロファイラは、バージョン 1.23.0 以降の `dd-trace-go` ライブラリで利用できます。

3. アプリケーションの開始時に、[プロファイラ][4]をインポートします。

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

4. 1〜2 分後、[Datadog APM > Profiler ページ][5]でプロファイルを視覚化します。

**注**: デフォルトでは、CPU とヒーププロファイルのみが有効になっています。その他の[プロファイルタイプ][7]を有効にするには、[profiler.WithProfileTypes][6] を使用します。

## コンフィギュレーション

以下の関数で、コードにプロファイラーパラメーターを設定できます。

| 関数 | タイプ          | 説明                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | 文字列        | Datadog [サービス][8]名 (例: `my-web-app`)。             |
|  WithEnv         | 文字列        | Datadog [環境][9]名 (例: `production`)。         |
|  WithVersion     | 文字列        | アプリケーションのバージョン                                                                             |
|  WithTags        | 文字列のリスト        | アップロードされたプロファイルに適用されるタグのリスト。タグは `<KEY>:<VALUE>` という形式で指定する必要があります。 |

または、環境変数を使用してプロファイラーコンフィギュレーションを設定することも可能です。

| 環境変数                             | タイプ          | 説明                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                                         | 文字列        | [環境][8]名 (例: `production`)。 |
| `DD_SERVICE`                                     | 文字列        | [サービス][8]名 (例: `web-backend`)。 |
| `DD_VERSION`                                     | 文字列        | サービスの[バージョン][8]。 |
| `DD_TAGS`                                        | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、コンマ区切り形式のリストである必要があります（例、`layer:api,team:intake`）。   |

## 次のステップ

[プロファイラーの概要][9]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[5]: https://app.datadoghq.com/profiling
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithProfileTypes
[7]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#ProfileType
[8]: /ja/getting_started/tagging/unified_service_tagging
[9]: /ja/getting_started/profiler/