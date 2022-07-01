---
title: はじめに
kind: Documentation
further_reading:
  - link: tracing/profiling/search_profiles
    tag: Documentation
    text: 使用可能なプロファイルタイプの詳細
  - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
    tags: ブログ
    text: Datadog に常時接続型の本番環境プロファイリングが登場。
---
Profiling は、次のトレースライブラリに同梱されています。アプリケーションのプロファイリングを有効にする方法を確認するには、以下で言語を選択してください。

{{< tabs >}}
{{% tab "Java" %}}

Datadog Profiler には [JDK Flight Recorder][1] が必要です。Datadog Profiling ライブラリは、OpenJDK 11 以降、Oracle Java 11以降、Zulu Java 8 以降 (マイナーバージョン 1.8.0_212 以降)でサポートされています。Scala、Groovy、Kotlin、Clojure など、JVM ベースのすべての言語がサポートされています。アプリケーションのプロファイリングを開始するには、

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][2] 以降または [6.20.2][2] 以降にアップグレードしてください。まだ APM を有効にしていない場合で Datadog にデータを送信するようにアプリケーションを設定するには、ご利用中の Agent で `DD_APM_ENABLED` 環境変数を `true` に設定し、ポート `8126/TCP` をリッスンします。

2. Java Agent クラスファイルを含む `dd-java-agent.jar` をダウンロードします。

    ```shell
    wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
    ```

   **注**: プロファイリングは、0.55 以降のバージョンの `dd-java-agent.jar` ライブラリで利用できます。

3. `-Ddd.profiling.enabled` フラグまたは `DD_PROFILING_ENABLED` 環境変数を `true` に設定します。次のようにサービス呼び出しを更新します。

    ```diff
    java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
    ```

4. 1〜2 分後、[Datadog APM > Profiling ページ][3]でプロファイルを視覚化します。


**注**:

- `-javaagent` 引数は `-jar` ファイルより前にあり、アプリケーション引数ではなく JVM オプションとして追加される必要があります。詳しくは、[Oracle ドキュメント][4]を参照してください。

    ```shell
    # Good:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # Bad:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

- `service` および `version` を指定すると、プロファイルのさまざまな側面をすばやく詳細に解明できるため、指定することをお勧めします。環境変数を使用してパラメータを設定します。

| 環境変数                             | タイプ          | 説明                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | `-Ddd.profiling.enabled` 引数の代替。`true` に設定してプロファイルを有効にします。               |
| `DD_SERVICE`                                     | 文字列        | [サービス][2]名（例、`web-backend`）。     |
| `DD_ENV`                                         | 文字列        | [環境][5]名（例、`production`）。|
| `DD_VERSION`                                     | 文字列        | サービスのバージョン                             |
| `DD_TAGS`                                        | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、コンマ区切り形式のリストである必要があります（例、`layer:api, team:intake`）。  |


[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/profiling
[4]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[5]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{% tab "Python" %}}

Datadog Profiler には Python 2.7 以降が必要です。メモリプロファイリングは、Python 3.5 以降でご利用になれます。アプリケーションのプロファイリングを開始するには、

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][1] 以降または [6.20.2][1] 以降にアップグレードしてください。

2. トレースとプロファイリングの両方を含む `ddtrace` をインストールします。

    ```shell
    pip install ddtrace
    ```

   **注**: プロファイリングは、バージョン 0.36 以降の `ddtrace` ライブラリで利用できます。

3. コードを自動的にプロファイリングするには、`ddtrace-run` を使用する際に、`DD_PROFILING_ENABLED` 環境変数を `true` に設定します。

    ```
    DD_PROFILING_ENABLED=true ddtrace-run python app.py
    ```
    **注:** `DD_PROFILING_ENABLED` は `dd-trace` 0.40 以降のバージョンでのみサポートされます。それ以前の `dd-trace` を実行している場合は、別の方法をご利用ください。

    **別の方法**

    コードを使いプロファイラをインスツルメントするには、`ddtrace.profile.auto` をインポートします。インポート後、プロファイラが起動します。

    ```python
    import ddtrace.profiling.auto
    ```

4. 1〜2 分後、[Datadog APM > Profiling ページ][2]でプロファイルを視覚化します。

**注**:

- または、ラッパー `pyddprofile` で実行してサービスをプロファイルします。

    ```shell
    $ pyddprofile server.py
    ```

- `service` や `version` のようなタグ追加すると、プロファイルのさまざまな側面をすばやく詳細に解明でき操作性の向上につながるため、強くお勧めします。環境変数を使用してパラメータを設定します。

| 環境変数                             | タイプ          | 説明                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | プロファイリングを有効にするには、`true` に設定します。トラッカーのバージョン 0.40 以降からサポートされます。              |
| `DD_SERVICE`                                     | 文字列        | Datadog [サービス][3]名。     |
| `DD_ENV`                                         | 文字列        | Datadog [環境][4]名前（例、`production`）。 |
| `DD_VERSION`                                     | 文字列        | アプリケーションのバージョン                             |
| `DD_TAGS`                                        | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、コンマ区切り形式のリストである必要があります（例、`layer:api,team:intake`）。   |

<div class="alert alert-info">
高度な使用方法にのみ推奨されます。
</div>

- プロセスが `os.fork` を使用してフォークすると、プロファイラは子プロセスで停止します。

  POSIX プラットフォームの Python 3.7 以降では、`pyddprofile` または `ddtrace.profiling.auto` を介してプロファイラを有効にすると、新しいプロファイラが起動します。

  `Profiler()` を手動で作成する場合、Python 3.6 未満を使用する場合、または非 POSIX プラットフォームで実行する場合、以下を使用し子のプロファイラーを手動で再起動します。

   ```python
   ddtrace.profiling.auto.start_profiler()
   ```

- プロファイラのライフサイクルを手動で制御するには、`ddtrace.profiling.profiler.Profiler` オブジェクトを使用します。

    ```python
    from ddtrace.profiling import Profiler

    prof = Profiler()
    prof.start()

    # At shutdown
    prof.stop()
    ```

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/profiling
[3]: /ja/tracing/visualization/#services
[4]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{% tab "Go" %}}

Datadog Profiler には Go 1.12 以降が必要です。アプリケーションのプロファイリングを開始するには、

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][1] 以降または [6.20.2][1] 以降にアップグレードしてください。

2. 以下のコマンドを使用して、`dd-trace-go` を取得します。

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1
    ```

     **注**: プロファイリングは、バージョン 1.23.0 以降の `dd-trace-go` ライブラリで利用できます。

3. アプリケーションの開始時に、[プロファイラ][2]をインポートします。

    ```Go
    import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
    ```

4. 次のスニペットを追加し、プロファイラを起動します。

    ```Go
    err := profiler.Start(
        profiler.WithService("<SERVICE_NAME>"),
        profiler.WithEnv("<ENVIRONMENT>"),
        profiler.WithVersion("<APPLICATION_VERSION>"),
        profiler.WithTags("<KEY1>:<VALUE1>,<KEY2>:<VALUE2>"),
    )
    if err != nil {
        log.Fatal(err)
    }
    defer profiler.Stop()
    ```

4. 1〜2 分後、[Datadog APM > Profiling ページ][3]でプロファイルを視覚化します。

**注**:

- `service` や `version` のようなタグ追加すると、プロファイルのさまざまな側面をすばやく詳細に解明でき操作性の向上につながるため、強くお勧めします。プロファイラコンフィギュレーションを使用してパラメータを設定します。

| メソッド | タイプ          | 説明                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | 文字列        | Datadog [サービス][4] 名（例、`my-web-app`）。             |
|  WithEnv         | 文字列        | Datadog [環境][5]名（例、`production`）。         |
|  WithVersion     | 文字列        | アプリケーションのバージョン                                                                             |  
|  WithTags        | 文字列        | アップロードされたプロファイルに適用するタグ。`<キー1>:<値1>,<キー2>:<値2>` 形式のリストである必要があります。 |

- または、環境変数を使いプロファイラコンフィギュレーションを設定することもできます。

| 環境変数                             | タイプ          | 説明                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_SERVICE`                                     | 文字列        | Datadog [サービス][4]名。     |
| `DD_ENV`                                         | 文字列        | Datadog [環境][5]名（例、`production`）。 |
| `DD_VERSION`                                     | 文字列        | アプリケーションのバージョン                             |
| `DD_TAGS`                                        | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、コンマ区切り形式のリストである必要があります（例、`layer:api,team:intake`）。   |

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[3]: https://app.datadoghq.com/profiling
[4]: /ja/tracing/visualization/#services
[5]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{% tab "Node" %}}

Datadog Profiler には Node 10.12 以降が必要です。アプリケーションのプロファイリングを開始するには、

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][1] 以降または [6.20.2][1] 以降にアップグレードしてください。　

2. トレースとプロファイリングの両方を含む `dd-trace` をインストールします。

    ```shell
    npm install --save dd-trace
    ```

   **注**: プロファイリングは、バージョン 0.23.2 以降の `dd-trace` ライブラリで利用できます。

3. コードを自動的にプロファイルするには、プロファイリングが有効な状態で `dd-trace` をインポートして初期化します。

    ```javascript
    require('dd-trace').init({
      profiling: true
    })
    ```

4. 1〜2 分後、[Datadog APM > Profiling ページ][2]でプロファイルを視覚化します。

**注**:

- `service` や `version` などのタグも利用できます。環境変数を使用してパラメーターを設定します。

| 環境変数                             | タイプ          | 説明                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | プロファイリングを有効にするには、`true` に設定します。               |
| `DD_SERVICE`                                     | 文字列        | Datadog [サービス][3]名。     |
| `DD_ENV`                                         | 文字列        | Datadog [環境][4]名前（例、`production`）。|
| `DD_VERSION`                                     | 文字列        | アプリケーションのバージョン                              |
| `DD_TAGS`                                        | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、コンマ区切り形式のリストである必要があります（例、`layer:api, team:intake`）。  |

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/profiling
[3]: /ja/tracing/visualization/#services
[4]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
{{% /tab %}}

{{< /tabs >}}

## トラブルシューティング

プロファイラを設定しても[プロファイル検索ページ](#search-profiles)にプロファイルが表示されない場合は、[デバッグモード][1]をオンにし、デバッグファイルと次の情報で[サポートチケットを開いてください][2]。

- OS タイプとバージョン（例: Linux Ubuntu 14.04.3）
- ランタイムのタイプ、バージョン、ベンダー（例: Java OpenJDK 11 AdoptOpenJDK）


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
[1]: /ja/tracing/troubleshooting/#tracer-debug-mode
[2]: /ja/help/
