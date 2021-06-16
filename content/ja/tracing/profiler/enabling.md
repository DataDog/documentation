---
title: プロファイラーの有効化
kind: ドキュメント
aliases:
  - /ja/tracing/profiling/getting_started
  - /ja/tracing/profiler/getting_started
further_reading:
  - link: getting_started/profiler
    tag: ドキュメント
    text: プロファイラーの概要
  - link: tracing/profiler/search_profiles
    tag: ドキュメント
    text: 使用可能なプロファイルタイプの詳細
  - link: tracing/profiler/profiler_troubleshooting
    tag: ドキュメント
    text: プロファイラの使用中に発生する問題を修正
  - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
    tags: ブログ
    text: Datadog に常時接続型の本番環境プロファイリングが登場
---
Profiler は、次のトレースライブラリに同梱されています。アプリケーションのプロファイラを有効にする方法を確認するには、以下で言語を選択してください。

**Node**、**PHP**、**.NET** プロファイラーの非公開ベータ版が利用可能になった場合に通知するには、[こちらから新規登録][1]してください。

{{< programming-lang-wrapper langs="java,python,go,ruby" >}}
{{< programming-lang lang="java" >}}

Datadog Profiler には [JDK Flight Recorder][1] が必要です。Datadog Profiler ライブラリは、OpenJDK 11 以降、Oracle Java 11以降、[OpenJDK 8 (バージョン 8u262以降)][2]、Zulu Java 8 以降 (マイナーバージョン 1.8.0_212 以降)でサポートされています。Scala、Groovy、Kotlin、Clojure など、JVM ベースのすべての言語がサポートされています。アプリケーションのプロファイリングを開始するには、

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][3] 以降または [6.20.2][4] 以降にアップグレードしてください。まだ APM を有効にしていない場合で Datadog にデータを送信するようにアプリケーションを設定するには、ご利用中の Agent で `DD_APM_ENABLED` 環境変数を `true` に設定し、ポート `8126/TCP` をリッスンします。

2. Java Agent クラスファイルを含む `dd-java-agent.jar` をダウンロードします。

    ```shell
    wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
    ```

   **注**: Profiler は、0.55 以降のバージョンの `dd-java-agent.jar` ライブラリで利用できます。

3. `-Ddd.profiling.enabled` フラグまたは `DD_PROFILING_ENABLED` 環境変数を `true` に設定します。次のようにサービス呼び出しを更新します。

    ```diff
    java -javaagent:dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -jar <YOUR_SERVICE>.jar <YOUR_SERVICE_FLAGS>
    ```

4. 1〜2 分後、[Datadog APM > Profiling ページ][5]でプロファイルを視覚化することができます。


**注**:

- `-javaagent` 引数は `-jar` ファイルより前にあり、アプリケーション引数ではなく JVM オプションとして追加される必要があります。詳しくは、[Oracle ドキュメント][6]を参照してください。

    ```shell
    # Good:
    java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
    # Bad:
    java -jar my-service.jar -javaagent:dd-java-agent.jar ...
    ```

- `service` および `version` を指定すると、プロファイルのさまざまな側面をすばやく詳細に解明できるため、Datadog では指定することをお勧めしています。環境変数を使用してパラメータを設定します。

| 環境変数                             | タイプ          | 説明                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_PROFILING_ENABLED`                           | Boolean       | `-Ddd.profiling.enabled` 引数の代替。`true` に設定してプロファイラを有効にします。               |
| `DD_SERVICE`                                     | 文字列        | [サービス][3]名（例、`web-backend`）。     |
| `DD_ENV`                                         | 文字列        | [環境][7]名（例: `production`）。|
| `DD_VERSION`                                     | 文字列        | サービスのバージョン                             |
| `DD_TAGS`                                        | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、コンマ区切り形式のリストである必要があります（例、`layer:api, team:intake`）。  |


[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[2]: /ja/tracing/profiler/profiler_troubleshooting/#java-8-support
[3]: https://app.datadoghq.com/account/settings#agent/overview
[4]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[5]: https://app.datadoghq.com/profiling
[6]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[7]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

**要件**

Datadog Profiler には Python 2.7+ と Agent バージョン [7.20.2][1] 以降または
[6.20.2][2] 以降が必要です。

以下のプロファイリング機能は、お使いの Python のバージョンに応じて利用可能です。

|      機能         | サポート対象の Python バージョン          |
|----------------------|------------------------------------|
| Wall Time プロファイリング  | Python 2.7 以降                      |
| CPU タイムプロファイリング   | POSIX プラットフォームの Python 2.7 以降   |
| 例外プロファイリング  | POSIX プラットフォームの Python 3.7 以降   |
| ロックプロファイリング       | Python 2.7 以降                      |
| メモリプロファイリング     | Python 3.5 以降                      |

**インストール**

トレーシングとプロファイリング機能の双方を提供する `ddtrace` をインストールします。

```shell
pip install ddtrace
```

**注**: プロファイリングには `ddtrace` ライブラリのバージョン 0.40+ が必要です。

`ddtrace` のバイナリディストリビューションに対応していないプラットフォームを使用している場合は、開発環境をインストールしてください。

たとえば、Alpine Linux では以下を実行します。
```shell
apk install gcc musl-dev linux-headers
```

**使用方法**

コードを自動的にプロファイリングするには、`ddtrace-run` を使用する際に、`DD_PROFILING_ENABLED` 環境変数を `true` に設定します。

    DD_PROFILING_ENABLED=true \
    DD_ENV=prod \
    DD_SERVICE=my-web-app \
    DD_VERSION=1.0.3 \
    ddtrace-run python app.py

`service` や `version` のようなタグを追加すると、プロファイルのさまざまな側面をすばやく詳細に解明できるため、強くお勧めします。以下の[コンフィギュレーション]を参照してください。

数分後、[Datadog APM > Profiler ページ][3]でプロファイルを視覚化します。

プロファイラのライフサイクルを手動で制御するには、`ddtrace.profiling.profiler.Profiler` オブジェクトを使用します。

```python
from ddtrace.profiling import Profiler

prof = Profiler(
    env="prod",  # if not specified, falls back to environment variable DD_ENV
    service="my-web-app",  # if not specified, falls back to environment variable DD_SERVICE
    version="1.0.3",   # if not specified, falls back to environment variable DD_VERSION
)
prof.start()
```

**注意事項**

プロセスが `os.fork` を使用してフォークすると、プロファイラは子プロセスで停止するため、
再起動する必要があります。Unix プラットフォームで Python 3.7 以降を
使用している場合、新規プロファイラーが自動的に起動します。

Python 3.7 以降をお使いの場合、または Unix 以外のプラットフォームで実行する場合は、子プロセスで
新規プロファイラーを手動で開始する必要があります。

```python
# For ddtrace-run users, call this in your child process
ddtrace.profiling.auto.start_profiler()

# Alternatively, for manual instrumentation,
# create a new profiler in your child process:
from ddtrace.profiling import Profiler

prof = Profiler()
prof.start()
```

**コンフィギュレーション**

次の環境変数を使用してプロファイラーを構成できます。

| 環境変数    | `Profiler` へのキーワード引数 | タイプ                       | 説明                                                         |
| ------------------------|------------------------------- | -------------------------- | --------------------------------------------------------------------|
| `DD_PROFILING_ENABLED`  |                                | Boolean                    | プロファイラを有効にするには、`true` に設定します。                                   |
| `DD_SERVICE`            | `service`                      | 文字列                     | Datadog [サービス][4]名。                                      |
| `DD_ENV`                | `env`                          | 文字列                     | Datadog [環境][5]名（例、`production`）。       |
| `DD_VERSION`            | `version`                      | 文字列                     | アプリケーションのバージョン                                    |
| `DD_TAGS`               | `tags`                         | 文字列 / 辞書        | アップロードされたプロファイルに適用されるタグ。環境変数と共に設定する場合は、`layer:api,team:intake` のようにカンマで区切られた `<key>:<value>` のリスト形式にする必要があります。キーワード引数で設定する場合は、`{"layer": "api", "team": "intake"}` のようにキーがタグ名、値がタグの値を表す辞書形式で記述します。  |



[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://app.datadoghq.com/profiling
[4]: /ja/tracing/visualization/#services
[5]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}


Datadog Profiler には Go 1.12 以降が必要です。アプリケーションのプロファイリングを開始するには、

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][1] 以降または [6.20.2][2] 以降にアップグレードしてください。

2. 以下のコマンドを使用して、`dd-trace-go` を取得します。

    ```shell
    go get gopkg.in/DataDog/dd-trace-go.v1/profiler
    ```

     **注**: プロファイラは、バージョン 1.23.0 以降の `dd-trace-go` ライブラリで利用できます。

3. アプリケーションの開始時に、[プロファイラ][3]をインポートします。

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

4. 1〜2 分後、[Datadog APM > Profiler ページ][4]でプロファイルを視覚化します。

**注**:

- デフォルトでは、CPU とヒーププロファイルのみが有効になっています。その他の[プロファイルタイプ][6]を有効にするには、[profiler.WithProfileTypes][5] を使用します。

- 以下の関数で、コードにプロファイラーパラメーターを設定できます。

| 関数 | タイプ          | 説明                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
|  WithService     | 文字列        | Datadog [サービス][7]名（例: `my-web-app`）。             |
|  WithEnv         | 文字列        | Datadog [環境][8]名（例: `production`）。         |
|  WithVersion     | 文字列        | アプリケーションのバージョン                                                                             |
|  WithTags        | 文字列        | アップロードされたプロファイルに適用するタグ。`<キー1>:<値1>,<キー2>:<値2>` 形式のリストである必要があります。 |

- または、環境変数を使用してプロファイラーコンフィギュレーションを設定することも可能です。

| 環境変数                             | タイプ          | 説明                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_SERVICE`                                     | 文字列        | Datadog [サービス][7]名。     |
| `DD_ENV`                                         | 文字列        | Datadog [環境][8]名（例: `production`）。 |
| `DD_VERSION`                                     | 文字列        | アプリケーションのバージョン                             |
| `DD_TAGS`                                        | 文字列        | アップロードされたプロファイルに適用するタグ。`<key>:<value>` のように、コンマ区切り形式のリストである必要があります（例、`layer:api,team:intake`）。   |



[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/profiler#pkg-constants
[4]: https://app.datadoghq.com/profiling
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#WithProfileTypes
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/profiler#ProfileType
[7]: /ja/tracing/visualization/#services
[8]: /ja/tracing/guide/setting_primary_tags_to_scope/#environment
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

<div class="alert alert-warning">
Datadog Ruby Profiler は公開ベータ版です。Datadog では、本番環境にデプロイする前に重要でない環境でプロファイラを評価することを推奨しています。
</div>

Datadog Profiler には MRI Ruby 2.1+ が必要です。**ウォールタイムプロファイリングは、すべてのプラットフォーム（macOS および Windows を含む）のユーザーに利用可能ですが、CPU タイムプロファイルは、現在 Linux ぷらっとふぉ0無でのみご利用いただけます**。アプリケーションのプロファイリングを開始するには:

1. すでに Datadog を使用している場合は、Agent をバージョン [7.20.2][1] 以降または [6.20.2][2] 以降にアップグレードしてください。

2. `ddtrace` および `google-protobuf` gem を `Gemfile` または `gems.rb` ファイルに追加します。

    ```ruby
    gem 'ddtrace', '>= 0.49.0'
    gem 'google-protobuf', '~> 3.0'
    ```

2. `bundle install` で gem をインストールします。

3. 環境変数を使用してプロファイラーを自動的に有効にできます。

    ```shell
    DD_PROFILING_ENABLED=true
    DD_ENV=prod
    DD_SERVICE=my-web-app
    DD_VERSION=1.0.3
    ```

    コードの場合は次のようになります。

    ```ruby
    Datadog.configure do |c|
      c.profiling.enabled = true
      c.env = 'prod'
      c.service = 'my-web-app'
      c.version = '1.0.3'
    end
    ```

    **注**: Rails アプリケーションの場合は、上記のコードコンフィギュレーションで `config/initializers/datadog.rb` ファイルを作成できます。


4. Ruby アプリケーションの起動コマンドに `ddtracerb exec` コマンドを追加します。

    ```shell
    bundle exec ddtracerb exec ruby myapp.rb
    ```

    Rails の例:

    ```shell
    bundle exec ddtracerb exec bin/rails s
    ```

    **注**

    アプリケーションを `ddtracerb exec` で起動する選択肢がない（Phusion Passenger ウェブサーバーを使用している）場合、ウェブアプリケーションの `config.ru` などのアプリケーションエントリポイントに以下を追加してプロファイラを起動することも可能です。

    ```ruby
    require 'ddtrace/profiling/preload'
    ```


4. Ruby アプリケーションの起動 1〜2 分後、[Datadog APM > Profiler ページ][3]にプロファイルが表示されます。

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://app.datadoghq.com/profiling
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## 次のステップ

[プロファイラーの概要][2]ガイドでは、パフォーマンスの問題があるサンプルサービスを例に、Continuous Profiler を使用して問題を理解し修正する方法を確認します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.google.com/forms/d/e/1FAIpQLScb9GKmKfSoY6YNV2Wa5P8IzUn02tA7afCahk7S0XHfakjYQw/viewform
[2]: /ja/getting_started/profiler/