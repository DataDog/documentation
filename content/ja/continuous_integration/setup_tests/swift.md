---
further_reading:
- link: /continuous_integration/explore_tests
  tag: ドキュメント
  text: テスト結果とパフォーマンスを調べる
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
kind: documentation
title: Swift テスト
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
選択された Datadog サイト ({{< region-param key="dd_site_name" >}}) はサポートされていません。
</div>
{{< /site-region >}}

## 互換性

対応言語:
* Swift >= 5.2
* Objective-C >= 2.0

対応プラットフォーム:
* iOS >= 11.0
* macOS >= 10.13
* tvOS >= 11.0

**注**: Swift Concurrency を使用している場合、非同期タスクの正確なスパン表現のために Xcode >= 13.2 が必要です。

## Swift テスト用 SDK のインストール

テストフレームワークのインストール方法は 3 つあります。

{{< tabs >}}
{{% tab "Swift パッケージマネージャー" %}}

1. プロジェクトに `dd-sdk-swift-testing` パッケージを追加します。これは、[`https://github.com/DataDog/dd-sdk-swift-testing`][1] にあります。

{{< img src="continuous_integration/swift_package.png" alt="Swift パッケージ" >}}


2. パッケージに含まれるライブラリ `DatadogSDKTesting` とテストターゲットをリンクします。

{{< img src="continuous_integration/swift_link2.png" alt="Swift Linking SPM" >}}

3. UITests を実行する場合は、テストを実行するアプリもこのライブラリでリンクします。


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
{{< /tabs >}}
<div class="alert alert-warning"><strong>注</strong>: このフレームワークはテストにのみ有用であり、テストを実行するときのみアプリケーションとリンクさせる必要があります。フレームワークをユーザーに配布しないでください。 </div>



## テストのインスツルメンテーション

### Datadog の構成

テストのインスツルメンテーションを有効にするには、テストターゲットに以下の環境変数を（または[以下で説明](#using-infoplist-for-configuration)されているとおり `Info.plist` ファイルに）追加します。また、テストプランを使用する場合は、`Expand variables based on` コンボまたは `Target for Variable Expansion` でメインターゲットを選択する必要があります。

{{< img src="continuous_integration/swift_env.png" alt="Swift 環境" >}}

UITests では、フレームワークにより自動的に値がアプリケーションに挿入されるため、環境変数はテストターゲットのみに設定する必要があります。

テストターゲットにこれらすべての変数を設定します。

`DD_TEST_RUNNER`
: テストのインスツルメンテーションを有効または無効にします。この値を `$(DD_TEST_RUNNER)` に設定すると、テストプロセスの外部 (CI ビルドなど) で定義された環境変数を使用してテストインスツルメンテーションを有効または無効にできます。<br/>
**デフォルト**: `false`<br/>
**推奨**: `$(DD_TEST_RUNNER)`

`DD_API_KEY`
: テスト結果のアップロードに使用される [Datadog API キー][1]。<br/>
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
: プロジェクト SRCROOT 環境変数へのパス。Xcode によって自動的に設定されるため、値には `$(SRCROOT)` を使用します。<br/>
**デフォルト**: `(empty)`<br/>
**推奨**: `$(SRCROOT)`<br/>
**例**: `/Users/ci/source/MyApp`

さらに、選択したサイトを使用するように Datadog サイトを構成します ({{< region-param key="dd_site_name" >}}):

`DD_SITE` (必須)
: 結果をアップロードする [Datadog サイト][2]。<br/>
**デフォルト**: `datadoghq.com`<br/>
**選択したサイト**: {{< region-param key="dd_site" code="true" >}}

### Git のメタデータを収集する

Datadog は Git の情報を使ってテスト結果を可視化し、リポジトリ、ブランチ、コミットごとにグループ化します。Git メタデータは CI プロバイダー環境変数を使用して自動的に収集され、テストアプリケーションに転送する必要があります (完全なリストについては、以下のセクション [CI プロバイダー環境変数](#CI-provider-environment-variables)を参照してください)。

シミュレーターでテストを実行すると、ローカルの `.git` フォルダーを使用して完全な Git メタデータが収集されます。この場合、Git 関連の環境変数を転送する必要はありません。

サポートされていない CI プロバイダーでテストを実行する場合や、`.git` フォルダがない場合は、環境変数を使って Git の情報を手動で設定することができます。これらの環境変数は、自動検出された情報よりも優先されます。Git の情報を提供するために、以下の環境変数を設定します。

`DD_GIT_REPOSITORY_URL`
: コードが格納されているリポジトリの URL。HTTP と SSH の両方の URL に対応しています。<br/>
**例**: `git@github.com:MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: テスト中の Git ブランチ。タグ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `develop`

`DD_GIT_TAG`
: テストされる Git タグ (該当する場合)。ブランチ情報を指定する場合は、空のままにしておきます。<br/>
**例**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: フルコミットハッシュ。<br/>
**例**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: コミットのメッセージ。<br/>
**例**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: コミット作成者名。<br/>
**例**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: コミット作成者メールアドレス。<br/>
**例**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: ISO 8601 形式のコミット作成者の日付。<br/>
**例**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: コミットのコミッター名。<br/>
**例**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: コミットのコミッターのメールアドレス。<br/>
**例**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: ISO 8601 形式のコミットのコミッターの日付。<br/>
**例**: `2021-03-12T16:00:28Z`

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

UITests では、テストターゲットと UITests から実行されるアプリケーションの両方がフレームワークとリンクしている必要があります。フレームワークにより自動的に値がアプリケーションに挿入されるため、環境変数はテストターゲットのみに設定する必要があります。

### RUM インテグレーション

テスト対象のアプリケーションが RUM を使用してインスツルメントされている場合、UI テストの結果と生成された RUM セッションは自動的にリンクされます。RUM の詳細については、[RUM iOS インテグレーション][3]ガイドを参照してください。iOS RUM バージョン &gt;= 1.10 が必要です。


## 追加のオプションコンフィギュレーション

以下のコンフィギュレーション設定の場合:
 - `Boolean` 変数には `1`、`0`、`true`、`false`、`YES`、`NO` のいずれかを使用できます
 - `String` リスト変数には `,` または `;` で区切られた要素の一覧が許可されます

### 自動インスツルメンテーションの有効化

`DD_ENABLE_STDOUT_INSTRUMENTATION`
: `stdout` に書き込まれたメッセージ (例えば `print()`) をキャプチャして、ログとして報告します。これは請求額に影響を与えるかもしれません。(ブール値)

`DD_ENABLE_STDERR_INSTRUMENTATION`
: `stderr` に書き込まれたメッセージ (例えば `NSLog()` や UITest のステップ) をキャプチャして、ログとして報告します。これは請求額に影響を与えるかもしれません。(ブール値)

### 自動インスツルメンテーションの無効化

このフレームワークでは、サポートされているすべてのライブラリの自動インスツルメンテーションが可能ですが、これが望ましくない場合もあります。次の環境変数を（または[以下で説明](#using-infoplist-for-configuration)されているとおり `Info.plist` ファイルに）設定することにより、特定のライブラリの自動インスツルメンテーションを無効にできます。

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: すべてのネットワークインスツルメンテーションを無効化します (Boolean)

`DD_DISABLE_RUM_INTEGRATION`
: RUMセッションとのインテグレーションを無効にします (Boolean)

`DD_DISABLE_CRASH_HANDLER`
: クラッシュの処理およびレポートを無効化します (Boolean)
<div class="alert alert-warning"><strong>重要</strong>: クラッシュレポートを無効にすると、クラッシュしたテストはまったく報告されず、テストの失敗として表示されません。いずれかのテストでクラッシュ処理を無効にする必要がある場合は、それらを個別のターゲットとして実行し、他のテストでは無効にしないようにします。</div>

### ネットワークの自動インスツルメンテーション

ネットワークの自動インスツルメンテーションでは、以下の追加設定を構成します。

`DD_DISABLE_HEADERS_INJECTION`
: トレースヘッダーのすべての挿入を無効化します (Boolean)

`DD_INSTRUMENTATION_EXTRA_HEADERS`
: ログを作成する特定の追加ヘッダー (文字列リスト)

`DD_EXCLUDED_URLS`
: ログの作成またはヘッダーの挿入を行わない URL (文字列リスト)

`DD_ENABLE_RECORD_PAYLOAD`
: リクエストおよび応答内のペイロードのサブセット (1024 バイト) のレポートを有効化します (Boolean)

`DD_MAX_PAYLOAD_SIZE`
: ペイロードからのレポート最大サイズを設定します。デフォルトは `1024` (整数)

`DD_DISABLE_NETWORK_CALL_STACK`
: ネットワークスパンのコールスタック情報を無効にします (ブール値)

`DD_ENABLE_NETWORK_CALL_STACK_SYMBOLICATED`
: メソッド名だけでなく、正確なファイルや行の情報を含むコールスタック情報を表示します。テストのパフォーマンスに影響を与える可能性があります (ブール値)


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

`$` 文字の使用は、非環境変数対応文字 (`a-z`、`A-Z` または `_`) を含む場合、値の始まりの環境変数の置換もサポートします。例:
{{< code-block lang="bash" >}}
FOO = BAR
DD_TAGS=key1:$FOO-v1 // expected: key1:BAR-v1
{{< /code-block >}}

### OpenTelemetry

**注**: OpenTelemetry の使用は Swift でのみサポートされています。

Datadog Swift テストフレームワークは、内部的に [OpenTelemetry][4] をトレーシングテクノロジーとして使用します。OpenTelemetry トレーサーには、`DDInstrumentationControl.openTelemetryTracer` を使用してアクセスでき、OpenTelemetry API を使用します。たとえば、タグまたは属性を追加するには、

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import OpenTelemetryApi

let tracer = DDInstrumentationControl.openTelemetryTracer as? Tracer
let span = tracer?.spanBuilder(spanName: "ChildSpan").startSpan()
span?.setAttribute(key: "OTTag2", value: "OTValue2")
span?.end()
{{< /code-block >}}

テストターゲットは、`opentelemetry-swift` で明示的にリンクする必要があります。


## コンフィギュレーションに Info.plist を使用する

または、環境変数を設定する代わりに、コンフィギュレーションの値を（アプリバンドルではなく）テストバンドルの `Info.plist` ファイルに追加して提供することも可能です。環境変数と `Info.plist` ファイルに同じ設定がされている場合は、環境変数が優先されます。

## CI プロバイダーの環境変数

{{< tabs >}}
{{% tab "Jenkins" %}}

| 環境変数 | 値             |
| -------------------- | ----------------- |
| `JENKINS_URL`        | `$(JENKINS_URL)`  |
| `WORKSPACE`          | `$(WORKSPACE)`    |
| `BUILD_TAG`          | `$(BUILD_TAG)`    |
| `BUILD_NUMBER`       | `$(BUILD_NUMBER)` |
| `BUILD_URL`          | `$(BUILD_URL)`    |
| `JOB_NAME`           | `$(JOB_NAME)`     |

物理デバイスのテスト用追加 Git コンフィギュレーション:

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

物理デバイスのテスト用追加 Git コンフィギュレーション:

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

物理デバイスのテスト用追加 Git コンフィギュレーション:

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

物理デバイスのテスト用追加 Git コンフィギュレーション:

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

物理デバイスのテスト用追加 Git コンフィギュレーション:

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

物理デバイスのテスト用追加 Git コンフィギュレーション:

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

物理デバイスのテスト用追加 Git コンフィギュレーション:

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

物理デバイスのテスト用追加 Git コンフィギュレーション:

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

物理デバイスのテスト用追加 Git コンフィギュレーション:

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

物理デバイスのテスト用追加 Git コンフィギュレーション:

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
{{< /tabs >}}

## 手動テスト API

Swift プロジェクトで XCTests を使用している場合、`DatadogSDKTesting`フレームワークが自動的にインスツルメントし、Datadog バックエンドに結果を送信します。XCTest を使用しない場合、代わりに Swift/Objective-C の手動テスト API を使用することができ、これもバックエンドにテスト結果を報告します。

この API は、*テストセッション*、*テストスイート*、*テスト*の 3 つの概念に基づいています。

### テストセッション

テストセッションには、ユーザーがテストプロセスを起動してから、最後のテストが終了して結果が報告されるまでの、テスト実行の全プロセスが含まれます。また、テストセッションには、テストが実行される環境とプロセスの起動も含まれます。

テストセッションを開始するには、`DDTestSession.start()` を呼び出して、テストするモジュールまたはバンドルの名前を渡します。

すべてのテストが終了したら、`session.end()` を呼び出して、残りのテスト結果をすべてバックエンドに送信するようにします。

### テストスイート

テストスイートは、共通の機能を持つテストのセットで構成されます。これらのテストは、共通の初期化および終了を共有することができ、また、いくつかの変数を共有することができます。

テストスイートは `session.suiteStart()` を呼び出してテストスイートの名前を渡すことでテストセッションに作成します。

スイートの中の関連するテストがすべて実行を終えたら `suite.end()` を呼び出します。

### テスト

各テストはスイート内で実行され、`pass`、`fail`、`skip` の 3 つのステータスのうち 1 つで終了する必要があります。テストは、オプションで属性やエラー情報などの追加情報を持つことができます。

`suite.testStart()` を呼び出し、テストの名前を渡すことで、スイート内のテストを作成します。テストが終了したら、定義済みのステータスのいずれかを設定する必要があります。

### API インターフェイス

{{< code-block lang="swift" >}}
class DDTestSession {
    // セッションを開始します。
    // - パラメーター:
    //   - bundleName: テストするモジュールまたはバンドルの名前。
    //   - startTime: オプション。セッションが開始された時間。
    static func start(bundleName: String, startTime: Date? = nil) -> DDTestSession
    //
    // セッションを終了します。
    // - パラメーター:
    //   - endTime: オプション。セッションが終了した時間。
    func end(endTime: Date? = nil)
    // テストセッションにタグ/属性を追加します。タグはいくつでも追加可能です。
    // - パラメーター:
    //   - key: タグの名前。同じ名前のタグが既に存在する場合、
    //     その値は新しい値で置き換えられます。
    //   - value: タグの値。数値または文字列を指定することができます。
    func setTag(key: String, value: Any)
    //
    // このセッションでスイートを開始します。
    // - パラメーター:
    //   - name: スイートの名前。
    //   - startTime: オプション。スイートの開始時間。
    func suiteStart(name: String, startTime: Date: Date? = nil) -> DDTestSuite
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
    func testStart(name: String, startTime: Date: Date? = nil) -> DDTest
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
    func end(status: DDTestStatus, endTime: Date: Date? = nil)
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
let session = DDTestSession.start(bundleName: "ManualSession")
let suite1 = session.suiteStart(name: "ManualSuite 1")
let test1 = suite1.testStart(name: "Test 1")
test1.setTag(key: "key", value: "value")
test1.end(status: .pass)
let test2 = suite1.testStart(name: "Test 2")
test2.SetErrorInfo(type: "Error Type", message: "Error message", callstack: "Optional callstack")
test2.end(test: test2, status: .fail)
suite1.end()
let suite2 = session.suiteStart(name: "ManualSuite 2")
..
..
session.end()
{{< /code-block >}}

最後に必ず `session.end()` を呼び出し、すべてのテスト情報を Datadog に流すようにします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/
[3]: /ja/continuous_integration/guides/rum_swift_integration
[4]: https://opentelemetry.io/