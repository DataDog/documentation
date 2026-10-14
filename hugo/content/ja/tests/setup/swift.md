---
aliases:
- /ja/continuous_integration/setup_tests/swift
- /ja/continuous_integration/tests/swift
- /ja/continuous_integration/tests/setup/swift
code_lang: swift
code_lang_weight: 50
further_reading:
- link: /tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを調べる
- link: /tests/test_impact_analysis/swift
  tag: ドキュメント
  text: Test Impact Analysis を使用してテストジョブを高速化する
- link: /tests/troubleshooting/
  tag: ドキュメント
  text: Test Optimization のトラブルシューティング
title: Swift テスト
type: multi-code-lang
---
## 互換性{#compatibility}

サポート対象言語:

| 言語    | バージョン |
| ----------- | ------- |
| Swift       | 6.2 以上|
| Objective-C | 2.0 以上|
| Xcode       | 26.0 以上|

サポート対象プラットフォーム:

| プラットフォーム     | バージョン  |
| ------------ | -------- |
| iOS / iPadOS | 15.0 以上|
| macOS        | 11.0 以上|
| tvOS         | 15.0 以上|
| macCatalyst  | 13.0 以上|

サポート対象テストフレームワーク:

| フレームワーク     | SDK バージョン  | サポートレベル                                     |
| ------------- | ------------ | ------------------------------------------------- |
| XCTest        | すべてのバージョン | 完全サポート                                      |
| Swift Testing | 2.7.0 以上  | 2.7.1 以上で完全サポート。2.7.0 は監視のみ |

## Swift テスト SDK のインストール{#installing-the-swift-testing-sdk}

テストフレームワークをインストールする方法は、3 つあります。

{{< tabs >}}
{{% tab "Swift Package Manager" %}}

### Xcode プロジェクトの使用{#using-xcode-project}

1. `dd-sdk-swift-testing` パッケージをプロジェクトに追加します。[`https://github.com/DataDog/dd-sdk-swift-testing`][1] にあります。

{{< img src="continuous_integration/swift_package.png" alt="Swift パッケージ" >}}


2. テストターゲットをパッケージからのライブラリ `DatadogSDKTesting` にリンクします。

{{< img src="continuous_integration/swift_link2.png" alt="Swift から SPM にリンク" >}}

3. UI テストを実行し、RUM を使用しない場合は、テストを実行するアプリケーションに依存関係を追加することも行います。

### Swift パッケージプロジェクトの使用{#using-swift-package-project}

1. `dd-sdk-swift-testing` をパッケージの依存関係配列に追加します。たとえば、以下のようにします。

{{< code-block lang="swift" >}}
.package(url: "https://github.com/DataDog/dd-sdk-swift-testing.git", from: "2.5.3")
{{< /code-block >}}

2. テストフレームワークをテストターゲットの依存関係に追加するには、テストターゲットの依存関係配列に次の行を追加します。
{{< code-block lang="swift" >}}
.product(name: "DatadogSDKTesting", package: "dd-sdk-swift-testing")
{{< /code-block >}}


[1]: https://github.com/DataDog/dd-sdk-swift-testing
{{% /tab %}}
{{% tab "CocoaPods" %}}

1. `Podfile` のテストターゲットに `DatadogSDKTesting` 依存関係を追加します:

{{< code-block lang="ruby" >}}
target 'MyApp' do
  # ...

  target 'MyAppTests' do
    inherit! :search_paths
    pod 'DatadogSDKTesting'
  end
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "フレームワークのリンク" %}}

1. [リリース][1] ページから `DatadogSDKTesting.zip` をダウンロードして解凍します。

2. テストターゲットをコピーし、結果の XCFramework とリンクします。

{{< img src="continuous_integration/swift_link.png" alt="Swift から XCFramework にリンク" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">このフレームワークはテスト専用であり、テスト実行時にのみアプリケーションとリンクする必要があります。このフレームワークをユーザーに配布しないでください。</div>

## テストのインスツルメンテーション{#instrumenting-your-tests}

### Swift Testing フレームワーク{#swift-testing-framework}

Datadog SDK は、バージョン 2.7.0 (監視のみ) から Swift Testing フレームワークをサポートしており、バージョン 2.7.1 以上ではすべての高度な機能を完全にサポートしています。

#### Swift Testing 監視の設定{#setting-up-swift-testing-observation}

Swift Testing テストの監視を有効にするには、以下の手順に従います。

1. テストソースファイルに `DatadogSDKTesting` をインポートします:

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import Testing
{{< /code-block >}}

2. テストスイートまたはスタンドアロンのテスト関数に `.datadogTesting` トレイトを追加します:

{{< code-block lang="swift" >}}
@Suite(.datadogTesting)
struct MyTestSuite {
    @Test func myTest() {
        // ...
    }
}

// For standalone test functions:
@Test(.datadogTesting) func myStandaloneTest() {
    // ...
}
{{< /code-block >}}

### SDK の構成{#configuring-sdk}

#### Xcode プロジェクトの使用{#using-xcode-project-1}

テストのインスツルメンテーションを有効にするには、[以下で説明する](#using-infoplist-for-configuration)ように、以下の環境変数をテストターゲットまたは `Info.plist` ファイルに追加します。テストプランを使用している場合は、**必ず** {{< ui >}}Expand variables based on{{< /ui >}} または {{< ui >}}Target for Variable Expansion{{< /ui >}} でメインターゲットを選択してください。

{{< img src="continuous_integration/swift_env.png" alt="Swift 環境" >}}

<div class="alert alert-danger">環境変数の変数展開にメインターゲットを含める必要があります。選択されていない場合、変数は無効になります。</div>

UI テストの場合、フレームワークがこれらの値をアプリケーションに自動的にインジェクトするため、環境変数はテストターゲットにのみ設定する必要があります。

#### Swift パッケージプロジェクトの使用 {#using-swift-package-project-1}

テストのインスツルメンテーションを有効にするには、テストのコマンドライン実行に以下の環境変数を設定する必要があります。あるいは、テストを実行する前に環境に設定するか、コマンドの先頭に付加することもできます。

<pre>
<code>
DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> SRCROOT=$PWD swift test ...

or

DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> SRCROOT=$PWD xcodebuild test -scheme ...
</code>
</pre>


テストターゲットにこれらすべての変数を設定します。

`DD_TEST_RUNNER`
: テストのインスツルメンテーションを有効または無効にします。この値を `$(DD_TEST_RUNNER)` に設定すると、テストプロセス外 (CI ビルドなど) で定義された環境変数を使用して、テストのインスツルメンテーションを有効または無効にできます。<br/>
**デフォルト**: `false`<br/>
**推奨**: `$(DD_TEST_RUNNER)`

`DD_API_KEY` (必須)
: テスト結果のアップロードを認証するために使用される [Datadog API キー][2]。<br/>
**デフォルト**: `(empty)`

`DD_TEST_SESSION_NAME` (オプション)
: テストのグループ (`unit-tests`、`integration-tests`、`smoke-tests` など) を識別します。<br/>
**デフォルト**: CI ジョブ名とテストコマンド、または CI ジョブ名が利用できない場合はテストコマンド。<br/>
**例**: `unit-tests`、`integration-tests`、`smoke-tests`

`DD_SERVICE` (オプション)
: テスト対象のサービスまたはライブラリの名前。<br/>
**デフォルト**: リポジトリ名<br/>
**例**: `my-ios-app`

`DD_ENV` (オプション)
: テストが実行されている環境の名前。<br/>
**デフォルト**: `ci` (CI プロバイダーが検出される場合)。それ以外の場合は `none`。<br/>
**推奨**: `$(DD_ENV)`<br/>
**例**: `local`、`ci`

`SRCROOT`
: プロジェクトの場所へのパス。Xcode を使用している場合は、自動的に設定されるため、値に `$(SRCROOT)` を使用してください。<br/>
**デフォルト**: `(empty)`<br/>
**推奨**: `$(SRCROOT)`<br/>
**例**: `/Users/ci/source/MyApp`

`service` および `env` の予約タグの詳細については、[unified service tagging][8] を参照してください。

`DD_SITE` を構成します。サイト ({{< region-param key="dd_site_name" >}}) のためです。

`DD_SITE` (オプション)
: 結果のアップロード先となる [Datadog サイト][3]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択されたサイト**:{{< region-param key="dd_site" code="true" >}}

## Git のメタデータを収集する {#collecting-git-metadata}

{{% ci-git-metadata %}}

### テストの実行 {#running-tests}

インストール後、通常通りテストを実行します。たとえば、`xcodebuild test` コマンドを使用します。テスト、ネットワークリクエスト、アプリケーションのクラッシュは自動的にインスツルメンテーションされます。CI でテストを実行する際は、環境変数を渡します。たとえば、以下のようにします。

<pre>
<code>
DD_TEST_RUNNER=1 DD_SITE={{< region-param key="dd_site" >}} xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=arm64" \
  test
</code>
</pre>

### UI テスト {#ui-tests}

### RUM インテグレーション {#rum-integration}

テスト対象のアプリケーションが RUM を使用してインスツルメンテーションされている場合、UI テストの結果と生成された RUM セッションが自動的にリンクされます。RUM の詳細については、[RUM iOS インテグレーション][4] ガイドを参照してください。iOS RUM バージョン 1.10 以上が必要です。

フレームワークがこれらの値をアプリケーションに自動的に注入するため、環境変数はテストターゲットにのみ設定する必要があります。

### Test Optimisation SDK{#test-optimisation-sdk}

RUM を使用しない場合は、アプリケーションターゲットを Test SDK にリンクできます。SDK はアプリケーションに自動インスツルメンテーションを追加し、ネットワークリクエストとログを収集して、それらをテストトレースに添付します。

フレームワークがこれらの値をアプリケーションに自動的に注入するため、環境変数はテストターゲットにのみ設定する必要があります。

## 追加のオプション構成 {#additional-optional-configuration}

以下の構成設定において、
 - `Boolean` 変数には、: `1`、`0`、`true`、`false`、`YES`、または `NO` のいずれかを使用できます
 - `String` リスト変数には、`,` または `;` で区切られた要素のリストが許可されます

### 自動インスツルメンテーションの有効化 {#enabling-auto-instrumentation}

`DD_ENABLE_STDOUT_INSTRUMENTATION`
: `stdout` (たとえば `print()`) に書き込まれたメッセージをキャプチャし、ログとして報告します。これは請求額に影響する可能性があります。(ブール値)

`DD_ENABLE_STDERR_INSTRUMENTATION`
: `stderr` (たとえば `NSLog()`、UITest ステップ) に書き込まれたメッセージをキャプチャし、ログとして報告します。これは請求額に影響する可能性があります。(ブール値)

### 自動インスツルメンテーションの無効化 {#disabling-auto-instrumentation}

このフレームワークは、サポートされているすべてのライブラリの自動インスツルメンテーションを有効にしますが、場合によってはこれが望ましくないこともあります。以下の環境変数を設定することで (または[後述する](#using-infoplist-for-configuration)ように `Info.plist` ファイルで)、特定のライブラリの自動インスツルメンテーションを無効にできます。

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: すべてのネットワークインスツルメンテーションを無効にします (ブール値)

`DD_DISABLE_RUM_INTEGRATION`
: RUM セッションとの統合を無効にします (ブール値)

`DD_DISABLE_SOURCE_LOCATION`
: テストのソースコードの場所と Codeowners を無効にします (ブール値)

`DD_DISABLE_CRASH_HANDLER`
: クラッシュ処理とクラッシュレポートを無効にします。(ブール値)
<div class="alert alert-danger">クラッシュレポートを無効にすると、クラッシュしたテストは一切レポートされず、テストの失敗としても表示されません。いずれかのテストでクラッシュ処理を無効にする必要がある場合は、それらを別のターゲットとして実行してください。そうすることで、他のテストのクラッシュ処理を無効にせずに済みます。</div>

### ネットワークの自動インスツルメンテーション {#network-auto-instrumentation}

ネットワークの自動インスツルメンテーションについては、以下の追加設定を構成できます。

`DD_DISABLE_HEADERS_INJECTION`
: トレーシングヘッダーのすべてのインジェクションを無効にします (ブール値)

`DD_INSTRUMENTATION_EXTRA_HEADERS`
: ログに記録する特定の追加ヘッダー (文字列一覧)

`DD_EXCLUDED_URLS`
: ログの作成またはヘッダーの挿入を行わない URL (文字列一覧)

`DD_ENABLE_RECORD_PAYLOAD`
: リクエストおよび応答内のペイロードのサブセット (1024 バイト) のレポートを有効化します (ブール値)

`DD_MAX_PAYLOAD_SIZE`
: ペイロードからレポートされる最大サイズを設定します。デフォルト `1024` (整数)

`DD_DISABLE_NETWORK_CALL_STACK`
: ネットワークスパン内のコールスタック情報を無効にします (ブール値)

`DD_ENABLE_NETWORK_CALL_STACK_SYMBOLICATED`
: メソッド名だけでなく、正確なファイルおよび行情報を含むコールスタック情報を表示します。テストのパフォーマンスに影響が出る可能性があります (ブール値)

### インフラストラクチャーのテスト相関 {#infrastructure-test-correlation}

自身のインフラストラクチャーでテストを実行している場合 (macOS やシミュレータのテスト)、Datadog Agent をインストールして以下を設定することで、テストをインフラストラクチャーのメトリクスに関連付けることができます。

`DD_CIVISIBILITY_REPORT_HOSTNAME`
: テストを実行するマシンのホスト名をレポートします (ブール値)

モジュール `DatadogSDKTesting` をインポートし、クラス `DDInstrumentationControl` を使用することで、Swift または Objective-C の一部のテストで特定の自動インスツルメンテーションを有効または無効にすることもできます。

## カスタムタグ {#custom-tags}

### 環境変数 {#environment-variables}

`DD_TAGS` 環境変数を使用できます (または[後述する](#using-infoplist-for-configuration)ように`Info.plist`ファイル内で)。これには、スペースで区切られた `key:tag` のペアが含まれている必要があります。たとえば、以下のとおりです。
{{< code-block lang="bash" >}}
DD_TAGS=tag-key-0:tag-value-0 tag-key-1:tag-value-1
{{< /code-block >}}

値の 1 つが `$` の文字で始まる場合、同じ名前の環境変数が存在すれば、その環境変数に置換されます。たとえば、以下のようにです。
{{< code-block lang="bash" >}}
DD_TAGS=home:$HOME
{{< /code-block >}}

`$` 文字を使用すると、値に環境変数でサポートされる文字 (`a-z`、`A-Z`、または `_`) 以外が含まれている場合でも、値の先頭にある環境変数を置換できます。たとえば、以下のようにです。
{{< code-block lang="bash" >}}
FOO = BAR
DD_TAGS=key1:$FOO-v1 // expected: key1:BAR-v1
{{< /code-block >}}

### テストメソッド内 {#inside-a-test-method}

テストメソッド内にカスタムタグを追加できます。静的プロパティ `DDTest.current` は、テストメソッドのスコープ内で呼び出された場合、現在のテストインスタンスを返します。

{{< code-block lang="swift" >}}
// Somewhere inside the test method
DDTest.current?.setTag(key: "key1", value: "value1")
// test continues normally
// ...
{{< /code-block >}}

### OpenTelemetry {#opentelemetry}

**注**: OpenTelemetry の使用は Swift でのみサポートされています。

Datadog Swift テストフレームワークは、内部でトレーシング技術として [OpenTelemetry][6] を使用しています。`DDInstrumentationControl.openTelemetryTracer` を使用して OpenTelemetry トレーサーにアクセスし、任意の OpenTelemetry API を使用できます。たとえば、タグまたは属性を追加するには、次のようにします。

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import OpenTelemetryApi

let tracer = DDInstrumentationControl.openTelemetryTracer as? Tracer
let span = tracer?.spanBuilder(spanName: "ChildSpan").startSpan()
span?.setAttribute(key: "OTTag2", value: "OTValue2")
span?.end()
{{< /code-block >}}

テストターゲットは `opentelemetry-swift` と明示的にリンクする必要があります。

### コードカバレッジを報告する {#reporting-code-coverage}

コードカバレッジが利用できる場合、Datadog SDK (v2.2.7+) は、テストセッションの `test.code_coverage.lines_pct` タグでそれを報告します。

Xcode では、プロジェクト構成に応じて、テストプランまたはテストスキームでコードカバレッジの収集を有効にできます。

テストセッションの {{< ui >}}Coverage{{< /ui >}} タブで、テストカバレッジの推移を見ることができます。

## Info.plist を使用した構成 {#using-infoplist-for-configuration}

環境変数を設定する代わりに、すべての構成値をテストバンドル (アプリバンドルではない) の `Info.plist` ファイルに追加することで構成値を提供できます。同じ設定が環境変数と `Info.plist` ファイルの両方に設定されている場合、環境変数が優先されます。

## CI プロバイダーの環境変数 {#ci-provider-environment-variables}

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

物理デバイスでテストするための追加 Git 構成:

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

物理デバイスでテストするための追加 Git 構成:

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


物理デバイスでテストするための追加 Git 構成:

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

物理デバイスでテストするための追加 Git 構成:

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

物理デバイスでテストするための追加 Git 構成:

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

物理デバイスでテストするための追加 Git 構成:

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

物理デバイスでテストするための追加 Git 構成:

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

物理デバイスでテストするための追加 Git 構成:

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

物理デバイスでテストするための追加 Git 構成:

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

物理デバイスでテストするための追加 Git 構成:

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
| `DD_GIT_REPOSITORY_URL` | リポジトリ URL|
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

## ベストプラクティス{#best-practices}

テストフレームワークと Test Optimization を最大限に活用するために、以下のプラクティスに従ってください。

### ビルド時にシンボルファイルを生成する{#generate-symbols-file-when-building}

Xcode でコードをビルドする場合は `DWARF with dSYM File` (または、`swift` でビルドする場合は `-Xswiftc -debug-info-format=dwarf`) を使用します。

テストフレームワークは、クラッシュのシンボル化、テストソースの場所の報告、コード所有者の報告など、一部の機能でシンボルファイルを使用します。デバッグシンボルがバイナリに埋め込まれている場合、シンボルファイルは自動的に生成されますが、読み込みに追加の時間がかかることがあります。

### macOS の UI テストのサンドボックスを無効化する{#disable-sandbox-for-ui-tests-on-macos}

一部の Xcode バージョンでは、UI テストバンドルはデフォルトでサンドボックス付きでビルドされます。サンドボックスに伴う設定により、`xcrun` を使用する一部のシステムコマンドでテストフレームワークを実行できなくなるため、無効にすることが必要になります。

UI テストランナーバンドルに Entitlements を追加し、そこに `App Sandbox = NO` を追加すると、サンドボックスが無効になります。`.entitlement` ファイルを作成し、それを署名ビルド設定に追加することもできます。このファイルには、以下の内容を含める必要があります。

{{< code-block lang="xml" >}}
<key>com.apple.security.app-sandbox</key>
 <false/>
{{< /code-block >}}

### テストセッション名 `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

`DD_TEST_SESSION_NAME` を使用してテストセッションの名前と関連するテストグループを定義します。このタグの値の例は次のとおりです。

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

`DD_TEST_SESSION_NAME` が指定されていない場合、デフォルトで CI ジョブ名とテストコマンドになります。CI ジョブ名が利用できない場合は、テストコマンドが使用されます。

異なるテストグループを区別しやすくするため、テストセッション名はリポジトリ内で一意でなければなりません。

#### `DD_TEST_SESSION_NAME` を使用するタイミング{#when-to-use-dd-test-session-name}

Datadog がテストセッション間の対応関係を確立するためにチェックするパラメーターのセットがあります。テストの実行に使用されるテストコマンドもその 1 つです。一時フォルダーなど、実行ごとに変化する文字列がテストコマンドに含まれる場合、Datadog はそれらのセッションを互いに無関係なものとみなします。たとえば、以下のとおりです。

- `swift test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

テストコマンドが実行ごとに異なる場合、Datadog は `DD_TEST_SESSION_NAME` を使用することを推奨します。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/tests/#test-suite-level-visibility
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ja/getting_started/site/
[4]: /ja/tests/swift_tests/
[5]: https://app.datadoghq.com/organization-settings/application-keys
[6]: https://opentelemetry.io/
[7]: /ja/tests/test_impact_analysis/
[8]: /ja/getting_started/tagging/unified_service_tagging