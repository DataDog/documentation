---
aliases:
- /ja/continuous_integration/setup_tests/swift
- /ja/continuous_integration/tests/swift
- /ja/continuous_integration/tests/setup/swift
code_lang: swift
code_lang_weight: 50
further_reading:
- link: /continuous_integration/tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを確認する
- link: /continuous_integration/intelligent_test_runner/swift
  tag: ドキュメント
  text: Intelligent Test Runner でテストジョブを高速化する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
kind: ドキュメント
title: Swift テスト
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
選択された Datadog サイト ({{< region-param key="dd_site_name" >}}) はサポートされていません。
</div>
{{< /site-region >}}

## 互換性

対応言語:

| 言語 | バージョン | 注 |
|---|---|---|
| Swift | >= 5.2 | Swift Concurrency を使用している場合、非同期タスクの正確なスパン表現には Xcode 13.2 以上が必要です。 |
| Objective-C | >= 2.0 | |

対応プラットフォーム:

| プラットフォーム | バージョン |
|---|---|
| iOS | >= 11.0 |
| macOS | >= 10.13 |
| tvOS | >= 11.0 |

## Swift テスト用 SDK のインストール

テストフレームワークのインストール方法は 3 つあります。

{{< tabs >}}
{{% tab "Swift パッケージマネージャー" %}}

### Xcode プロジェクトの使用

1. プロジェクトに `dd-sdk-swift-testing` パッケージを追加します。これは、[`https://github.com/DataDog/dd-sdk-swift-testing`][1] にあります。

{{< img src="continuous_integration/swift_package.png" alt="Swift パッケージ" >}}


2. パッケージに含まれるライブラリ `DatadogSDKTesting` とテストターゲットをリンクします。

{{< img src="continuous_integration/swift_link2.png" alt="Swift Linking SPM" >}}

3. UITests を実行する場合は、テストを実行するアプリもこのライブラリでリンクします。

### Swift パッケージプロジェクトの使用

1. パッケージの依存関係の配列に `dd-sdk-swift-testing` を追加します。例:

{{< code-block lang="swift" >}}
.package(url: "https://github.com/DataDog/dd-sdk-swift-testing.git", from: "2.2.0")
{{< /code-block >}}

2. テスト対象の依存関係にテストフレームワークを追加するには、以下の行をテスト対象の依存関係の配列に追加します。
{{< code-block lang="swift" >}}
.product(name: "DatadogSDKTesting", package: "dd-sdk-swift-testing")
{{< /code-block >}}

3. UITests を実行する場合は、テストを実行するアプリケーションにも依存関係を追加します。


[1]: https://github.com/DataDog/dd-sdk-swift-testing
{{% /tab %}}
{{% tab "Cocoapods" %}}

1. `DatadogSDKTesting` 依存関係を `Podfile` のテストターゲットに追加します。

{{< code-block lang="ruby" >}}
target 'MyApp' do
  # ...

  target 'MyAppTests' do
    inherit! :search_paths
    pod 'DatadogSDKTesting'
  end
end
{{< /code-block >}}

2. UITests を実行する場合は、テストを実行するアプリにも依存関係を追加します。

{{% /tab %}}
{{% tab "フレームワークのリンク" %}}

1. [リリース][1]のページから `DatadogSDKTesting.zip` をダウンロードし、解凍します。

2. 出来上がった XCFramework にテストターゲットをコピーしてリンクします。

{{< img src="continuous_integration/swift_link.png" alt="Swift Linking XCFramework" >}}

3. UITests を実行する場合は、テストを実行するアプリもこのライブラリでリンクします。

[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{% tab "GitHub Actions" %}}

GitHub を使用している場合、GitHub Marketplace から [Swift テストアクション][1]を使用して、テストを自動的に構成して実行することができます。デフォルトでは、このページで説明されている残りの構成はスキップできますが (アクション自体の構成を除く)、設定環境変数を使って、追加機能の無効化や設定をすることができます。

Cocoapods やフレームワークのリンクなど他の方法と比較して、Swift テストアクションオプションは設定や実行の柔軟性に欠ける可能性がありますが、コードの変更は必要ありません。

[1]: https://github.com/marketplace/actions/swift-test-action-for-datadog
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-warning"><strong>注</strong>: このフレームワークはテストにのみ有用であり、テストを実行するときのみアプリケーションとリンクさせる必要があります。フレームワークをユーザーに配布しないでください。 </div>




## テストのインスツルメンテーション

### Datadog の構成

#### Xcode プロジェクトの使用

テストのインスツルメンテーションを有効にするには、テストターゲットに以下の環境変数を追加するか、または[以下で説明](#using-infoplist-for-configuration)されているとおり `Info.plist` ファイルに追加します。テストプランを使用している場合は、`Expand variables based on` または `Target for Variable Expansion` でメインターゲットを選択する**必要があります**。

{{< img src="continuous_integration/swift_env.png" alt="Swift 環境" >}}

<div class="alert alert-warning">環境変数の変数展開にはメインターゲットを設定する必要があります。選択されていない場合、変数は無効になります。 </div>

UITests の場合、フレームワークがこれらの値をアプリケーションに自動で注入するため、環境変数はテストターゲットにのみ設定する必要があります。

#### Swift パッケージプロジェクトの使用

テストのインスツルメンテーションを有効にするには、以下の環境変数をテストのコマンドライン実行に設定する必要があります。代わりに、テストを実行する前に環境に設定することもできますし、コマンドに前置きすることもできます。

<pre>
<code>
DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> DD_APPLICATION_KEY=<your APPLICATION_KEY> DD_SITE=us1 SRCROOT=$PWD swift test ...

or

DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> DD_APPLICATION_KEY=<your APPLICATION_KEY> DD_SITE=us1 SRCROOT=$PWD xcodebuild test -scheme ...
</code>
</pre>


テストターゲットにこれらすべての変数を設定します。

`DD_TEST_RUNNER`
: テストのインスツルメンテーションを有効または無効にします。この値を `$(DD_TEST_RUNNER)` に設定すると、テストプロセスの外部 (CI ビルドなど) で定義された環境変数を使用してテストインスツルメンテーションを有効または無効にできます。<br/>
**デフォルト**: `false`<br/>
**推奨**: `$(DD_TEST_RUNNER)`

`DD_API_KEY`
: テスト結果のアップロードに使用される [Datadog API キー][2]。<br/>
**デフォルト**: `(empty)`

`DD_APPLICATION_KEY`
: テスト結果のアップロードに使用される [Datadog アプリケーションキー][5]。<br/>
**デフォルト**: `(empty)`

`DD_SERVICE`
: テスト対象のサービスまたはライブラリの名前。<br/>
**デフォルト**: リポジトリ名<br/>
**例**: `my-ios-app`

`DD_ENV`
: テストが実行されている環境の名前。この値を `$(DD_ENV)` に設定して、実行時に環境変数を使用して設定できるようにします。<br/>
**デフォルト**: `none`<br/>
**推奨**: `$(DD_ENV)`<br/>
**例**: `ci`、`local`

`SRCROOT`
: プロジェクトの場所へのパス。Xcode を使用している場合、この値は自動的に設定されるため、`$(SRCROOT)` を使用します。<br/>
**デフォルト**: `(empty)`<br/>
**推奨**: `$(SRCROOT)`<br/>
**例**: `/Users/ci/source/MyApp`

`service` と `env` の予約タグの詳細については、[統合サービスタグ付け][8]を参照してください。

さらに、選択したサイトを使用するように Datadog サイトを構成します ({{< region-param key="dd_site_name" >}}):

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][3]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

## Git のメタデータを収集する

{{% ci-git-metadata %}}

### テストの実行

インストール後、通常どおりにテストを実行します。たとえば、`xcodebuild test` コマンドを使用します。テスト、ネットワークリクエスト、アプリケーションクラッシュは自動的に記録されます。CI でテストを実行するときに、環境変数を渡します。次に例を示します。

<pre>
<code>
DD_TEST_RUNNER=1 DD_ENV=ci DD_SITE={{< region-param key="dd_site" >}} xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=x86_64" \
  test
</code>
</pre>

### UI テスト

UITests では、テストターゲットと UITests から実行されるアプリケーションの両方がフレームワークとリンクしている必要があります。フレームワークがこれらの値をアプリケーションに自動で注入するため、環境変数はテストターゲットにのみ設定する必要があります。

### RUM インテグレーション

テスト対象のアプリケーションが RUM を使用してインスツルメンテーションされている場合、UI テストの結果と生成された RUM セッションは自動的にリンクされます。RUM の詳細については、[RUM iOS インテグレーション][4]ガイドを参照してください。iOS RUM バージョン 1.10 以上が必要です。


## 追加のオプション構成

以下の構成設定の場合:
 - `Boolean` 変数には `1`、`0`、`true`、`false`、`YES`、`NO` のいずれかを使用できます
 - `String` リスト変数には `,` または `;` で区切られた要素の一覧が許可されます

### 自動インスツルメンテーションの有効化

`DD_ENABLE_STDOUT_INSTRUMENTATION`
: `stdout` に書き込まれたメッセージ (例えば `print()`) をキャプチャして、ログとして報告します。これは請求額に影響を与える可能性があります。(ブール値)

`DD_ENABLE_STDERR_INSTRUMENTATION`
: `stderr` に書き込まれたメッセージ (例えば `NSLog()` や UITest のステップ) をキャプチャして、ログとして報告します。これは請求額に影響を与える可能性があります。(ブール値)

### 自動インスツルメンテーションの無効化

このフレームワークでは、サポートされているすべてのライブラリの自動インスツルメンテーションが可能ですが、これが望ましくない場合もあります。次の環境変数を（または[以下で説明](#using-infoplist-for-configuration)されているとおり `Info.plist` ファイルに）設定することにより、特定のライブラリの自動インスツルメンテーションを無効にできます。

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: すべてのネットワークインスツルメンテーションを無効化します (Boolean)

`DD_DISABLE_RUM_INTEGRATION`
: RUMセッションとのインテグレーションを無効にします (Boolean)

`DD_DISABLE_SOURCE_LOCATION`
: テストのソースコードの場所と Codeowners を無効にします (ブール値)

`DD_DISABLE_CRASH_HANDLER`
: クラッシュの処理およびレポートを無効化します (Boolean)
<div class="alert alert-warning"><strong>重要</strong>: クラッシュレポートを無効にすると、クラッシュしたテストはまったく報告されず、テストの失敗として表示されません。いずれかのテストでクラッシュ処理を無効にする必要がある場合は、それらを個別のターゲットとして実行し、他のテストでは無効にしないようにします。</div>

### ネットワークの自動インスツルメンテーション

ネットワークの自動インスツルメンテーションでは、以下の追加設定を構成できます。

`DD_DISABLE_HEADERS_INJECTION`
: トレースヘッダーのすべての挿入を無効化します (Boolean)

`DD_INSTRUMENTATION_EXTRA_HEADERS`
: ログを作成する特定の追加ヘッダー (文字列リスト)

`DD_EXCLUDED_URLS`
: ログの作成またはヘッダーの挿入を行わない URL (文字列リスト)

`DD_ENABLE_RECORD_PAYLOAD`
: リクエストおよび応答内のペイロードのサブセット (1024 バイト) のレポートを有効化します (Boolean)

`DD_MAX_PAYLOAD_SIZE`
: ペイロードから報告される最大サイズを設定します。デフォルトは `1024` (整数)

`DD_DISABLE_NETWORK_CALL_STACK`
: ネットワークスパンのコールスタック情報を無効にします (ブール値)

`DD_ENABLE_NETWORK_CALL_STACK_SYMBOLICATED`
: メソッド名だけでなく、正確なファイルや行の情報を含むコールスタック情報を表示します。テストのパフォーマンスに影響を与える可能性があります (ブール値)

### インフラストラクチャーテストの相関

自身のインフラストラクチャーでテストを実行している場合 (macOS やシミュレータのテスト)、Datadog Agent をインストールして以下を設定することで、テストとインフラストラクチャーのメトリクスを関連付けることができます。

`DD_CIVISIBILITY_REPORT_HOSTNAME`
: テストを開始するマシンのホスト名を報告します (ブール値)

モジュール `DatadogSDKTesting` をインポートしクラス: `DDInstrumentationControl` を使用することで、Swift または Objective-C の一部のテストで特定の自動インスツルメンテーションを有効/無効にすることも可能です。

## カスタムタグ

### 環境変数

`DD_TAGS` 環境変数を（または[以下で説明](#using-infoplist-for-configuration)されているとおり `Info.plist` ファイルに）使用できます。スペース区切りの `key:tag` のペアを含む必要があります。例:
{{< code-block lang="bash" >}}
DD_TAGS=tag-key-0:tag-value-0 tag-key-1:tag-value-1
{{< /code-block >}}

値の 1 つが `$` の文字で始まる場合、同じ名前（存在する場合）の環境変数に置換されます。例:
{{< code-block lang="bash" >}}
DD_TAGS=home:$HOME
{{< /code-block >}}

`$` 文字を使うことで、値の先頭にある環境変数を置換することもサポートされます。ただし、その値には環境変数に対応しない文字 (`a-z`、`A-Z` または `_`) が含まれている必要があります。例:
{{< code-block lang="bash" >}}
FOO = BAR
DD_TAGS=key1:$FOO-v1 // expected: key1:BAR-v1
{{< /code-block >}}

### OpenTelemetry

**注**: OpenTelemetry の使用は Swift でのみサポートされています。

Datadog Swift テストフレームワークは、内部的に [OpenTelemetry][6] をトレーシングテクノロジーとして使用します。OpenTelemetry トレーサーには、`DDInstrumentationControl.openTelemetryTracer` を使用してアクセスでき、OpenTelemetry API を使用します。たとえば、タグまたは属性を追加するには、

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import OpenTelemetryApi

let tracer = DDInstrumentationControl.openTelemetryTracer as? Tracer
let span = tracer?.spanBuilder(spanName: "ChildSpan").startSpan()
span?.setAttribute(key: "OTTag2", value: "OTValue2")
span?.end()
{{< /code-block >}}

テストターゲットは、`opentelemetry-swift` で明示的にリンクする必要があります。

### コードカバレッジを報告する

コードカバレッジが利用できる場合、Datadog SDK (v2.2.7+) は、テストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

Xcode では、Test Scheme でコードカバレッジの報告を有効にすることができます。

テストセッションの **Coverage** タブで、テストカバレッジの推移を見ることができます。

## 構成に Info.plist を使用する

または、環境変数を設定する代わりに、構成の値を（アプリバンドルではなく）テストバンドルの `Info.plist` ファイルに追加して提供することも可能です。環境変数と `Info.plist` ファイルに同じ設定がされている場合は、環境変数が優先されます。

## CI プロバイダーの環境変数

{{< tabs >}}
{{% tab "Jenkins" %}}

| 環境変数 | 値                  |
| -------------------- | ---------------------- |
| `JENKINS_URL`        | `$(JENKINS_URL)`       |
| `WORKSPACE`          | `$(WORKSPACE)`         |
| `BUILD_TAG`          | `$(BUILD_TAG)`         |
| `BUILD_NUMBER`       | `$(BUILD_NUMBER)`      |
| `BUILD_URL`          | `$(BUILD_URL)`         |
| `JOB_NAME`           | `$(JOB_NAME)`          |
| `DD_CUSTOM_TRACE_ID` | `$(DD_CUSTOM_TRACE_ID)`|

物理デバイスのテストのための追加 Git 構成:

| 環境変数 | 値           |
| -------------------- | --------------- |
| `GIT_COMMIT`         | `$(GIT_COMMIT)` |
| `GIT_URL`            | `$(GIT_URL)`    |
| `GIT_URL_1`          | `$(GIT_URL_1)`  |
| `GIT_BRANCH`         | `$(GIT_BRANCH)` |

{{% /tab %}}
{{% tab "CircleCI" %}}

| 環境変数       | 値                         |
| -------------------------- | ----------------------------- |
| `CIRCLECI`                 | `$(CIRCLECI)`                 |
| `CIRCLE_WORKING_DIRECTORY` | `$(CIRCLE_WORKING_DIRECTORY)` |
| `CIRCLE_BUILD_NUM`         | `$(CIRCLE_BUILD_NUM)`         |
| `CIRCLE_BUILD_URL`         | `$(CIRCLE_BUILD_URL)`         |
| `CIRCLE_WORKFLOW_ID`       | `$(CIRCLE_WORKFLOW_ID)`       |
| `CIRCLE_PROJECT_REPONAME`  | `$(CIRCLE_PROJECT_REPONAME)`  |

物理デバイスのテストのための追加 Git 構成:

| 環境変数    | 値                      |
| ----------------------- | -------------------------- |
| `CIRCLE_SHA1`           | `$(CIRCLE_SHA1)`           |
| `CIRCLE_REPOSITORY_URL` | `$(CIRCLE_REPOSITORY_URL)` |
| `CIRCLE_BRANCH`         | `$(CIRCLE_BRANCH)`         |
| `CIRCLE_TAG`            | `$(CIRCLE_TAG)`            |

{{% /tab %}}
{{% tab "GitLab CI" %}}

| 環境変数 | 値                |
| -------------------- | -------------------- |
| `GITLAB_CI`          | `$(GITLAB_CI)`       |
| `CI_PROJECT_DIR`     | `$(CI_PROJECT_DIR)`  |
| `CI_JOB_STAGE`       | `$(CI_JOB_STAGE)`    |
| `CI_JOB_NAME`        | `$(CI_JOB_NAME)`     |
| `CI_JOB_URL`         | `$(CI_JOB_URL)`      |
| `CI_PIPELINE_ID`     | `$(CI_PIPELINE_ID)`  |
| `CI_PIPELINE_IID`    | `$(CI_PIPELINE_IID)` |
| `CI_PIPELINE_URL`    | `$(CI_PIPELINE_URL)` |
| `CI_PROJECT_PATH`    | `$(CI_PROJECT_PATH)` |
| `CI_PROJECT_URL`     | `$(CI_PROJECT_URL)`  |


物理デバイスのテストのための追加 Git 構成:

| 環境変数 | 値                  |
| -------------------- | ---------------------- |
| `CI_COMMIT_SHA`      | `$(CI_COMMIT_SHA)`     |
| `CI_REPOSITORY_URL`  | `$(CI_REPOSITORY_URL)` |
| `CI_COMMIT_BRANCH`   | `$(CI_COMMIT_BRANCH)`  |
| `CI_COMMIT_TAG`      | `$(CI_COMMIT_TAG)`     |
| `CI_COMMIT_MESSAGE`  | `$(CI_COMMIT_MESSAGE)` |
| `CI_COMMIT_AUTHOR`  | `$(CI_COMMIT_AUTHOR)` |
| `CI_COMMIT_TIMESTAMP`  | `$(CI_COMMIT_TIMESTAMP)` |

{{% /tab %}}
{{% tab "Travis" %}}

| 環境変数       | 値                         |
| -------------------------- | ----------------------------- |
| `TRAVIS`                   | `$(TRAVIS)`                   |
| `TRAVIS_BUILD_DIR`         | `$(TRAVIS_BUILD_DIR)`         |
| `TRAVIS_BUILD_ID`          | `$(TRAVIS_BUILD_ID)`          |
| `TRAVIS_BUILD_NUMBER`      | `$(TRAVIS_BUILD_NUMBER)`      |
| `TRAVIS_BUILD_WEB_URL`     | `$(TRAVIS_BUILD_WEB_URL)`     |
| `TRAVIS_JOB_WEB_URL`       | `$(TRAVIS_JOB_WEB_URL)`       |
| `TRAVIS_REPO_SLUG`         | `$(TRAVIS_REPO_SLUG)`         |
| `TRAVIS_PULL_REQUEST_SLUG` | `$(TRAVIS_PULL_REQUEST_SLUG)` |

物理デバイスのテストのための追加 Git 構成:

| 環境変数         | 値                           |
| ---------------------------- | ------------------------------- |
| `TRAVIS_PULL_REQUEST_BRANCH` | `$(TRAVIS_PULL_REQUEST_BRANCH)` |
| `TRAVIS_BRANCH`              | `$(TRAVIS_BRANCH)`              |
| `TRAVIS_COMMIT`              | `$(TRAVIS_COMMIT)`              |
| `TRAVIS_TAG`                 | `$(TRAVIS_TAG)`                 |
| `TRAVIS_COMMIT_MESSAGE`      | `$(TRAVIS_COMMIT_MESSAGE)`      |

{{% /tab %}}
{{% tab "GitHub Actions" %}}

| 環境変数 | 値                   |
| -------------------- | ----------------------- |
| `GITHUB_WORKSPACE`   | `$(GITHUB_WORKSPACE)`   |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)`  |
| `GITHUB_RUN_ID`      | `$(GITHUB_RUN_ID)`      |
| `GITHUB_RUN_NUMBER`  | `$(GITHUB_RUN_NUMBER)`  |
| `GITHUB_WORKFLOW`    | `$(GITHUB_WORKFLOW)`    |
| `GITHUB_SHA`         | `$(GITHUB_SHA)`         |
| `GITHUB_SERVER_URL`  | `$(GITHUB_SERVER_URL)`  |
| `GITHUB_RUN_ATTEMPT` | `$(GITHUB_RUN_ATTEMPT)` |

物理デバイスのテストのための追加 Git 構成:

| 環境変数 | 値                  |
| -------------------- | ---------------------- |
| `GITHUB_REF`         | `$(GITHUB_REF)`        |
| `GITHUB_HEAD_REF`    | `$(GITHUB_HEAD_REF)`   |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)` |

{{% /tab %}}
{{% tab "Buildkite" %}}

| 環境変数            | 値                              |
| ------------------------------- | ---------------------------------- |
| `BUILDKITE`                     | `$(BUILDKITE)`                     |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | `$(BUILDKITE_BUILD_CHECKOUT_PATH)` |
| `BUILDKITE_BUILD_ID`            | `$(BUILDKITE_BUILD_ID)`            |
| `BUILDKITE_BUILD_NUMBER`        | `$(BUILDKITE_BUILD_NUMBER)`        |
| `BUILDKITE_BUILD_URL`           | `$(BUILDKITE_BUILD_URL)`           |
| `BUILDKITE_PIPELINE_SLUG`       | `$(BUILDKITE_PIPELINE_SLUG)`       |
| `BUILDKITE_JOB_ID`              | `$(BUILDKITE_JOB_ID)`              |

物理デバイスのテストのための追加 Git 構成:

| 環境変数           | 値                             |
| ------------------------------ | --------------------------------- |
| `BUILDKITE_COMMIT`             | `$(BUILDKITE_COMMIT)`             |
| `BUILDKITE_REPO`               | `$(BUILDKITE_REPO)`               |
| `BUILDKITE_BRANCH`             | `$(BUILDKITE_BRANCH)`             |
| `BUILDKITE_TAG`                | `$(BUILDKITE_TAG)`                |
| `BUILDKITE_MESSAGE`            | `$(BUILDKITE_MESSAGE)`            |
| `BUILDKITE_BUILD_AUTHOR`       | `$(BUILDKITE_BUILD_AUTHOR)`       |
| `BUILDKITE_BUILD_AUTHOR_EMAIL` | `$(BUILDKITE_BUILD_AUTHOR_EMAIL)` |

{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

| 環境変数       | 値                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_CLONE_DIR`      | `$(BITBUCKET_CLONE_DIR)`      |
| `BITBUCKET_BUILD_NUMBER`   | `$(BITBUCKET_BUILD_NUMBER)`   |
| `BITBUCKET_PIPELINE_UUID`  | `$(BITBUCKET_PIPELINE_UUID)`  |
| `BITBUCKET_REPO_FULL_NAME` | `$(BITBUCKET_REPO_FULL_NAME)` |

物理デバイスのテストのための追加 Git 構成:

| 環境変数       | 値                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_COMMIT`         | `$(BITBUCKET_COMMIT)`         |
| `BITBUCKET_GIT_SSH_ORIGIN` | `$(BITBUCKET_GIT_SSH_ORIGIN)` |
| `BITBUCKET_BRANCH`         | `$(BITBUCKET_BRANCH)`         |
| `BITBUCKET_TAG`            | `$(BITBUCKET_TAG)`            |

{{% /tab %}}
{{% tab "AppVeyor" %}}

| 環境変数     | 値                       |
| ------------------------ | --------------------------- |
| `APPVEYOR`               | `$(APPVEYOR)`               |
| `APPVEYOR_BUILD_FOLDER`  | `$(APPVEYOR_BUILD_FOLDER)`  |
| `APPVEYOR_BUILD_ID`      | `$(APPVEYOR_BUILD_ID)`      |
| `APPVEYOR_BUILD_NUMBER`  | `$(APPVEYOR_BUILD_NUMBER)`  |
| `APPVEYOR_REPO_TAG_NAME` | `$(APPVEYOR_REPO_TAG_NAME)` |
| `APPVEYOR_REPO_NAME`     | `$(APPVEYOR_REPO_NAME)`     |

物理デバイスのテストのための追加 Git 構成:

| 環境変数                     | 値                                       |
| ---------------------------------------- | ------------------------------------------- |
| `APPVEYOR_REPO_COMMIT`                   | `$(APPVEYOR_REPO_COMMIT)`                   |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH` | `$(APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH)` |
| `APPVEYOR_REPO_BRANCH`                   | `$(APPVEYOR_REPO_BRANCH)`                   |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`  | `$(APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED)`  |
| `APPVEYOR_REPO_COMMIT_AUTHOR`            | `$(APPVEYOR_REPO_COMMIT_AUTHOR)`            |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`      | `$(APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL)`      |

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| 環境変数             | 値                               |
| -------------------------------- | ----------------------------------- |
| `TF_BUILD`                       | `$(TF_BUILD)`                       |
| `BUILD_SOURCESDIRECTORY`         | `$(BUILD_SOURCESDIRECTORY)`         |
| `BUILD_BUILDID`                  | `$(BUILD_BUILDID)`                  |
| `BUILD_DEFINITIONNAME`           | `$(BUILD_DEFINITIONNAME)`           |
| `SYSTEM_TEAMPROJECTID`           | `$(SYSTEM_TEAMPROJECTID)`           |
| `SYSTEM_TEAMFOUNDATIONSERVERURI` | `$(SYSTEM_TEAMFOUNDATIONSERVERURI)` |
| `SYSTEM_JOBID`                   | `$(SYSTEM_JOBID)`                   |
| `SYSTEM_TASKINSTANCEID`          | `$(SYSTEM_TASKINSTANCEID)`          |
| `SYSTEM_JOBDISPLAYNAME`          | `$(SYSTEM_JOBDISPLAYNAME)`          |
| `SYSTEM_STAGEDISPLAYNAME`          | `$(SYSTEM_STAGEDISPLAYNAME)`          |

物理デバイスのテストのための追加 Git 構成:

| 環境変数                     | 値                                       |
| ---------------------------------------- | ------------------------------------------- |
| `BUILD_SOURCEVERSION`                    | `$(BUILD_SOURCEVERSION)`                    |
| `BUILD_REPOSITORY_URI`                   | `$(BUILD_REPOSITORY_URI)`                   |
| `BUILD_SOURCEBRANCH`                     | `$(BUILD_SOURCEBRANCH)`                     |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID`      | `$(SYSTEM_PULLREQUEST_SOURCECOMMITID)`      |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH`        | `$(SYSTEM_PULLREQUEST_SOURCEBRANCH)`        |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI` | `$(SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI)` |
| `BUILD_SOURCEVERSIONMESSAGE`             | `$(BUILD_SOURCEVERSIONMESSAGE)`             |
| `BUILD_REQUESTEDFORID`                   | `$(BUILD_REQUESTEDFORID)`                   |
| `BUILD_REQUESTEDFOREMAIL`                | `$(BUILD_REQUESTEDFOREMAIL)`                |

{{% /tab %}}
{{% tab "Bitrise" %}}

| 環境変数   | 値                     |
| ---------------------- | ------------------------- |
| `BITRISE_SOURCE_DIR`   | `$(BITRISE_SOURCE_DIR)`   |
| `BITRISE_TRIGGERED_WORKFLOW_ID`  | `$(BITRISE_TRIGGERED_WORKFLOW_ID)`  |
| `BITRISE_BUILD_SLUG`   | `$(BITRISE_BUILD_SLUG)`   |
| `BITRISE_BUILD_NUMBER` | `$(BITRISE_BUILD_NUMBER)` |
| `BITRISE_BUILD_URL`    | `$(BITRISE_BUILD_URL)`    |

物理デバイスのテストのための追加 Git 構成:

| 環境変数               | 値                                 |
| ---------------------------------- | ------------------------------------- |
| `GIT_REPOSITORY_URL`               | `$(GIT_REPOSITORY_URL)`               |
| `BITRISE_GIT_COMMIT`               | `$(BITRISE_GIT_COMMIT)`               |
| `BITRISE_GIT_BRANCH`               | `$(BITRISE_GIT_BRANCH)`               |
| `BITRISE_GIT_TAG`                  | `$(BITRISE_GIT_TAG)`                  |
| `GIT_CLONE_COMMIT_HASH`            | `$(GIT_CLONE_COMMIT_HASH)`            |
| `BITRISE_GIT_MESSAGE`              | `$(BITRISE_GIT_MESSAGE)`              |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT` | `$(GIT_CLONE_COMMIT_MESSAGE_SUBJECT)` |
| `GIT_CLONE_COMMIT_MESSAGE_BODY`    | `$(GIT_CLONE_COMMIT_MESSAGE_BODY)`    |
| `GIT_CLONE_COMMIT_AUTHOR_NAME`     | `$(GIT_CLONE_COMMIT_AUTHOR_NAME)`     |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL`    | `$(GIT_CLONE_COMMIT_AUTHOR_EMAIL)`    |
| `GIT_CLONE_COMMIT_COMMITER_NAME`   | `$(GIT_CLONE_COMMIT_COMMITER_NAME)`   |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL`  | `$(GIT_CLONE_COMMIT_COMMITER_EMAIL)`  |

{{% /tab %}}
{{% tab "Xcode Cloud" %}}

| 環境変数    | 値                   |
| ----------------------- | ----------------------- |
| `DD_GIT_REPOSITORY_URL` | リポジトリ URL      |
| `CI_WORKSPACE`          | `$(CI_WORKSPACE)`       |
| `CI_COMMIT`             | `$(CI_COMMIT)`          |
| `CI_BUILD_ID`           | `$(CI_BUILD_ID)`        |
| `CI_BUILD_NUMBER`       | `$(CI_BUILD_NUMBER)`    |
| `CI_WORKFLOW`           | `$(CI_WORKFLOW)`        |
| `CI_TAG`                | `$(CI_TAG)`             |
| `CI_BRANCH`             | `$(CI_BRANCH)`          |
| `CI_GIT_REF`            | `$(CI_GIT_REF)`         |

{{% /tab %}}
{{< /tabs >}}

## 手動テスト API

Swift プロジェクトで XCTests を使用している場合、`DatadogSDKTesting`フレームワークが自動的にインスツルメントし、Datadog バックエンドに結果を送信します。XCTest を使用しない場合、代わりに Swift/Objective-C の手動テスト API を使用することができ、これもバックエンドにテスト結果を報告します。

この API は、*テストモジュール*、*テストスイート*、*テスト*の 3 つの概念に基づいています。

### テストモジュール

テストモジュールは、テストを含むライブラリやバンドルの読み込みを表します。

テストモジュールを開始するには、`DDTestModule.start()` を呼び出して、テストするモジュールまたはバンドルの名前を渡します。

すべてのテストが終了したら、`module.end()` を呼び出し、これによりライブラリは残っているテスト結果をすべてバックエンドに送信します。

### テストスイート

テストスイートは、共通の機能を共有するテストのセットで構成されます。これらのテストは、共通の初期化および終了を共有することができ、また、いくつかの変数を共有することができます。

`module.suiteStart()` を呼び出し、テストスイートの名前を渡すことでテストモジュール内にテストスイートを作成します。

スイートの中の関連するテストがすべて実行を終えたら `suite.end()` を呼び出します。

### テスト

各テストはスイート内で実行され、`pass`、`fail`、`skip` のいずれかのステータスで終了する必要があります。テストは、オプションで属性やエラー情報などの追加情報を持つことができます。

`suite.testStart()` を呼び出し、テストの名前を渡すことで、スイート内のテストを作成します。テストが終了したら、定義済みのステータスのいずれかを設定する必要があります。

### API インターフェイス

{{< code-block lang="swift" >}}
class DDTestModule {
    // モジュールを開始します。
    // - パラメーター:
    //   - bundleName: テストするモジュールまたはバンドルの名前。
    //   - startTime: オプション。モジュールが開始された時間。
    static func start(bundleName: String, startTime: Date? = nil) -> DDTestModule
    //
    // モジュールを終了します。
    // - パラメーター:
    //   - endTime: オプション。モジュールが終了した時間。
    func end(endTime: Date? = nil)
    // テストモジュールにタグ/属性を追加します。タグはいくつでも追加可能です。
    // - パラメーター:
    //   - key: タグの名前。同じ名前のタグが既に存在する場合、
    //     その値は新しい値で置き換えられます。
    //   - value: タグの値。数値または文字列を指定することができます。
    func setTag(key: String, value: Any)
    //
    // このモジュールでスイートを開始します。
    // - パラメーター:
    //   - name: スイートの名前。
    //   - startTime: オプション。スイートの開始時間。
    func suiteStart(name: String, startTime: Date? = nil) -> DDTestSuite
}
    //
public class DDTestSuite : NSObject {
    // テストスイートを終了します。
    // - パラメーター:
    //   - endTime: オプション。スイートが終了した時間。
    func end(endTime: Date? = nil)
    // タグ/属性をテストスイートに追加します。タグはいくつでも追加することができます。
    // - パラメーター:
    //   - key: タグの名前。同じ名前のタグが既に存在する場合、
    //     その値は新しい値で置き換えられます。
    //   - value: タグの値。数値または文字列を指定することができます。
    func setTag(key: String, value: Any)
    //
    // このスイートのテストを開始します。
    // - パラメーター:
    //   - name: テストの名前。
    //   - startTime: オプション。テストが開始された時間。
    func testStart(name: String, startTime: Date? = nil) -> DDTest
}
    //
public class DDTest : NSObject {
    // テストにタグ/属性を追加します。タグはいくつでも追加することができます。
    // - パラメーター:
    //   - key: タグの名前。同じ名前のタグが既に存在する場合、
    //     その値は新しい値で置き換えられます。
    //   - value: タグの値。数値または文字列を指定することができます。
    func setTag(key: String, value: Any)
    //
    // テストにエラー情報を追加します。1 つのテストが報告できるエラー情報は 1 つだけです。
    // - パラメーター:
    //   - type: 報告されるエラーのタイプ。
    //   - message: エラーに関連するメッセージ。
    //   - callstack: オプション。エラーに関連するコールスタック。
    func setErrorInfo(type: String, message: String, callstack: String? = nil)
    //
    // テストを終了します。
    // - パラメーター:
    //   - status: このテストについて報告されたステータス。
    //   - endTime: オプション。テストが終了した時間。
    func end(status: DDTestStatus, endTime: Date? = nil)
}
    //
// テストによって報告される可能性のあるステータス:
enum DDTestStatus {
  // テストは合格しました。
  case pass
  //
  // テストは失敗しました。
  case fail
  //
  // テストはスキップされました。
  case skip
}
{{< /code-block >}}

### コード例

次のコードは、API の簡単な使い方を表しています。

{{< code-block lang="swift" >}}
import DatadogSDKTesting
let module = DDTestModule.start(bundleName: "ManualModule")
let suite1 = module.suiteStart(name: "ManualSuite 1")
let test1 = suite1.testStart(name: "Test 1")
test1.setTag(key: "key", value: "value")
test1.end(status: .pass)
let test2 = suite1.testStart(name: "Test 2")
test2.SetErrorInfo(type: "Error Type", message: "Error message", callstack: "Optional callstack")
test2.end(test: test2, status: .fail)
suite1.end()
let suite2 = module.suiteStart(name: "ManualSuite 2")
..
..
module.end()
{{< /code-block >}}

最後に必ず `module.end()` を呼び出し、すべてのテスト情報を Datadog に流すようにします。

## ベストプラクティス

テストフレームワークと CI 表示を最大限に活用するために、以下のプラクティスに従ってください。

### ビルド時にシンボルファイルを生成する

Xcode で `DWARF with dSYM File` (または `swift` でビルドする場合は `-Xswiftc -debug-info-format=dwarf`) を使用してコードをビルドします

テストフレームワークは、クラッシュのシンボル化、テストソースの位置の報告、コードの所有者の報告など、いくつかの機能でシンボルファイルを使用します。デバッグシンボルがバイナリに埋め込まれている場合、シンボルファイルを自動的に生成しますが、読み込みに余分な時間がかかることがあります。

### macOS の UI テストのサンドボックスを無効化する

一部の Xcode のバージョンでは、UI Test バンドルはデフォルトでサンドボックス付きでビルドされています。サンドボックスに付属する設定は、一部のシステムコマンドで `xcrun` を使ってテストフレームワークを実行することを妨げるので、それを無効にする必要があります。

UI Test ランナーバンドルに Entitlements を追加し、それらに `App Sandbox = NO` を追加してサンドボックスを無効にします。また、`.entitlement` ファイルを作成し、Signing Build Settings に追加することができます。このファイルには、以下の内容を含める必要があります。

{{< code-block lang="xml" >}}
<key>com.apple.security.app-sandbox</key>
 <false/>
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/#test-suite-level-visibility
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ja/getting_started/site/
[4]: /ja/continuous_integration/guides/rum_swift_integration
[5]: https://app.datadoghq.com/organization-settings/application-keys
[6]: https://opentelemetry.io/
[7]: /ja/continuous_integration/intelligent_test_runner/
[8]: /ja/getting_started/tagging/unified_service_tagging