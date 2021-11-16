---
title: Swift テスト
kind: documentation
further_reading:
    - link: /continuous_integration/explore_tests
      tag: ドキュメント
      text: テスト結果とパフォーマンスを調べる
    - link: /continuous_integration/troubleshooting/
      tag: ドキュメント
      text: トラブルシューティング CI
---

## 互換性

サポート対象言語:
* Swift 5.2+
* Objective-C 2.0+

サポート対象プラットフォーム:
* iOS 12.0+
* macOS 10.13+
* tvOS 12.0+

サポートされている CI プロバイダー:
* Appveyor
* Azure Pipelines
* BitBucket
* BuildKite
* CircleCI
* GitHub Actions
* GitLab
* Jenkins
* TravisCI
* Bitrise

## SPM を使用した Swift テスト SDK のインストール

1. プロジェクトに `dd-sdk-swift-testing` パッケージを追加します（[`https://github.com/DataDog/dd-sdk-swift-testing`][1] にあります）。

2. テストターゲットをパッケージのライブラリ `DatadogSDKTesting` とリンクします。

3. UITest を実行する場合は、テストを実行するアプリもこのライブラリとリンクします。

## バイナリリンク

1. リリースページから `DatadogSDKTesting.zip` をダウンロードして解凍します。

2. テストターゲットをコピーして結果の XCFramework とリンクします。

3. UITest を実行する場合は、テストを実行するアプリもこのライブラリとリンクします。

    ソースコードから XCFramework を構築することも可能です。[dd-sdk-swift-testing][1] でプロジェクトをダウンロードし、`make release` を実行します。結果のフレームワーク `DatadogSDKTesting.xcframework` は、`./build/xcframework` にあります。

## テストのインスツルメンテーション

### Datadog の構成

テストのインスツルメンテーションを有効にするには、テストターゲットに以下の環境変数を追加します。また、テストプランを使用する場合は、`Expand variables based on:` コンボまたは `Target for Variable Expansion` でメインターゲットを選択する必要があります。

UITests では、フレームワークにより自動的に値がアプリケーションに挿入されるため、環境変数はテストターゲットのみに設定する必要があります。

| 環境変数     | 値                       |
|--------------------------|-----------------------------|
| `DD_TEST_RUNNER`           | `true`                         |
| `DATADOG_CLIENT_TOKEN`     | 現在の Datadog クライアントトークン  |
| `DD_ENDPOINT`            | Datadog アカウントのサーバーエンドポイント: `us` (デフォルト)、`us3`、`eu`、`gov`             |
| `SRCROOT`                  | `$(SRCROOT)`                  |


オプションで、この環境変数を以下に設定することも可能です。

| 環境変数     | 値                       |
|--------------------------|-----------------------------|
|`DD_ENV `                   | レポートする環境              |
|`DD_SERVICE`                | レポートするサービスの名前      |


### CI サービスの構成

CI サービスに次の環境変数を設定します。MacOS、iOS、または tvOS テストの実行にシミュレーターを使用する場合、Git 情報が自動的に収集されることにご留意ください。物理デバイスでテストする場合は、Git に関連する追加の環境変数を設定します。

#### Jenkins

| 環境変数     | 値                       |
|--------------------------|-----------------------------|
|`JENKINS_URL`            | `$(JENKINS_URL)`            |
|`WORKSPACE`              | `$(WORKSPACE)`              |
|`BUILD_TAG`               | `$(BUILD_TAG)`            |
|`BUILD_NUMBER`           | `$(BUILD_NUMBER)`           |
|`BUILD_URL`           | `$(BUILD_URL)`           |
|`JOB_NAME` | `$(JOB_NAME)` |

物理デバイスのテスト用追加 Git コンフィギュレーション:

| 環境変数     | 値                       |
|--------------------------|-----------------------------|
| `GIT_COMMIT`             | `$(GIT_COMMIT)`             |
| `GIT_URL`                | `$(GIT_URL)`                |
| `GIT_BRANCH`             | `$(GIT_BRANCH)`             |

#### CircleCI

| 環境変数       | 値                         |
|--------------------------- |-------------------------------|
|`CIRCLECI`                 | `$(CIRCLECI)`                 |
|`CIRCLE_WORKING_DIRECTORY` | `$(CIRCLE_WORKING_DIRECTORY)` |
|`CIRCLE_BUILD_NUM`         | `$(CIRCLE_BUILD_NUM)`         |
|`CIRCLE_BUILD_URL`         | `$(CIRCLE_BUILD_URL)`         |
|`CIRCLE_WORKFLOW_ID` | `$(CIRCLE_WORKFLOW_ID)` |
|`CIRCLE_PROJECT_REPONAME` | `$(CIRCLE_PROJECT_REPONAME)` |

物理デバイスのテスト用追加 Git コンフィギュレーション:

| 環境変数     | 値                         |
|--------------------------- |-------------------------------|
| `CIRCLE_SHA1`              | `$(CIRCLE_SHA1)`              |
| `CIRCLE_REPOSITORY_URL`    | `$(CIRCLE_REPOSITORY_URL)`    |
| `CIRCLE_BRANCH`            | `$(CIRCLE_BRANCH)`            |
| `CIRCLE_TAG` | `$(CIRCLE_TAG)` |

#### GitLab CI

| 環境変数 | 値             |
| -------------------  | ----------------- |
|`GITLAB_CI`          | `$(GITLAB_CI)`          |
|`CI_PROJECT_DIR`     | `$(CI_PROJECT_DIR)`     |
|`CI_JOB_STAGE`       | `$(CI_JOB_STAGE)`       |
|`CI_JOB_NAME`        | `$(CI_JOB_NAME)`        |
|`CI_JOB_URL`         | `$(CI_JOB_URL)`         |
|`CI_PIPELINE_ID`     | `$(CI_PIPELINE_ID)`     |
|`CI_PIPELINE_IID`    | `$(CI_PIPELINE_IID)`    |
|`CI_PIPELINE_URL`    | `$(CI_PIPELINE_URL)`    |
|`CI_PROJECT_PATH`    | `$(CI_PROJECT_PATH)`    |

物理デバイスのテスト用追加 Git コンフィギュレーション:

| 環境変数     | 値             |
| -------------------  | ----------------- |
| `CI_COMMIT_SHA`      | `$(CI_COMMIT_SHA)`      |
| `CI_REPOSITORY_URL`  | `$(CI_REPOSITORY_URL)`  |
| `CI_COMMIT_BRANCH`   | `$(CI_COMMIT_BRANCH)`   |
| `CI_COMMIT_TAG`      | `$(CI_COMMIT_TAG)`      |
| `CI_COMMIT_MESSAGE` | `$(CI_COMMIT_MESSAGE)` |


#### Travis

| 環境変数         | 値                           |
| ---------------------------- | ------------------------------- |
|`TRAVIS`                     | `$(TRAVIS)`                     |
|`TRAVIS_BUILD_DIR`           | `$(TRAVIS_BUILD_DIR)`           |
|`TRAVIS_BUILD_ID`            | `$(TRAVIS_BUILD_ID)`            |
|`TRAVIS_BUILD_NUMBER`        | `$(TRAVIS_BUILD_NUMBER)`        |
|`TRAVIS_BUILD_WEB_URL`       | `$(TRAVIS_BUILD_WEB_URL)`       |
|`TRAVIS_JOB_WEB_URL`       | `$(TRAVIS_JOB_WEB_URL)`       |
| `TRAVIS_REPO_SLUG`           | `$(TRAVIS_REPO_SLUG)`           |
| `TRAVIS_PULL_REQUEST_SLUG` | `$(TRAVIS_PULL_REQUEST_SLUG)` |

物理デバイスのテスト用追加 Git コンフィギュレーション:

| 環境変数     | 値                           |
| ---------------------------- | ------------------------------- |
| `TRAVIS_PULL_REQUEST_BRANCH` | `$(TRAVIS_PULL_REQUEST_BRANCH)` |
| `TRAVIS_BRANCH`              | `$(TRAVIS_BRANCH)`              |
| `TRAVIS_COMMIT`              | `$(TRAVIS_COMMIT)`              |
| `TRAVIS_TAG`           | `$(TRAVIS_TAG)`           |
| `TRAVIS_COMMIT_MESSAGE`           | `$(TRAVIS_COMMIT_MESSAGE)`           |


#### GitHub Actions

| 環境変数  | 値                  |
| --------------------- | ---------------------- |
|`GITHUB_WORKSPACE`  | `$(GITHUB_WORKSPACE)`  |
|`GITHUB_REPOSITORY` | `$(GITHUB_REPOSITORY)` |
|`GITHUB_RUN_ID`     | `$(GITHUB_RUN_ID)`     |
|`GITHUB_RUN_NUMBER` | `$(GITHUB_RUN_NUMBER)` |
|`GITHUB_WORKFLOW` | `$(GITHUB_WORKFLOW)` |
| `GITHUB_SHA`        | `$(GITHUB_SHA)`        |

物理デバイスのテスト用追加 Git コンフィギュレーション:

| 環境変数     | 値                  |
| ------------------- | ---------------------- |
| `GITHUB_REF`        | `$(GITHUB_REF)`        |
| `GITHUB_HEAD_REF` | `$(GITHUB_HEAD_REF)` |
| `GITHUB_REPOSITORY` | `$(GITHUB_REPOSITORY)` |


#### Buildkite

| 環境変数            | 値                              |
| ------------------------------- | ---------------------------------- |
| `BUILDKITE`           | `$(BUILDKITE)`  |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | `$(BUILDKITE_BUILD_CHECKOUT_PATH)` |
| `BUILDKITE_BUILD_ID`            | `$(BUILDKITE_BUILD_ID)`            |
| `BUILDKITE_BUILD_NUMBER`        | `$(BUILDKITE_BUILD_NUMBER)`        |
| `BUILDKITE_BUILD_URL`           | `$(BUILDKITE_BUILD_URL)`           |
| `BUILDKITE_PIPELINE_SLUG` | `$(BUILDKITE_PIPELINE_SLUG)` |
| `BUILDKITE_JOB_ID` | `$(BUILDKITE_JOB_ID)` |

物理デバイスのテスト用追加 Git コンフィギュレーション:

| 環境変数     | 値                              |
| ------------------------------- | ---------------------------------- |
| `BUILDKITE_COMMIT`              | `$(BUILDKITE_COMMIT)`              |
| `BUILDKITE_REPO`                | `$(BUILDKITE_REPO)`                |
| `BUILDKITE_BRANCH`              | `$(BUILDKITE_BRANCH)`              |
| `BUILDKITE_TAG` | `$(BUILDKITE_TAG)` |
| `BUILDKITE_MESSAGE` | `$(BUILDKITE_MESSAGE)` |
| `BUILDKITE_BUILD_AUTHOR` | `$(BUILDKITE_BUILD_AUTHOR)` |
| `BUILDKITE_BUILD_AUTHOR_EMAIL` | `$(BUILDKITE_BUILD_AUTHOR_EMAIL)` |

#### Bitbucket pipelines

| 環境変数     | 値                              |
| -------------------------- | ---------------------------------- |
| `BITBUCKET_CLONE_DIR`      | `$(BITBUCKET_CLONE_DIR)`          |
| `BITBUCKET_BUILD_NUMBER`   | `$(BITBUCKET_BUILD_NUMBER)`        |
| `BITBUCKET_PIPELINE_UUID`   | `$(BITBUCKET_PIPELINE_UUID)`        |
| `BITBUCKET_REPO_FULL_NAME` | `$(BITBUCKET_REPO_FULL_NAME)` |

物理デバイスのテスト用追加 Git コンフィギュレーション:

| 環境変数     | 値                              |
| -------------------------- | ---------------------------------- |
| `BITBUCKET_COMMIT`         | `$(BITBUCKET_COMMIT)`              |
| `BITBUCKET_GIT_SSH_ORIGIN` | `$(BITBUCKET_GIT_SSH_ORIGIN)`      |
| `BITBUCKET_BRANCH`         | `$(BITBUCKET_BRANCH)`              |
| `BITBUCKET_TAG` | `$(BITBUCKET_TAG)` |

#### AppVeyor

| 環境変数     | 値                                     |
| -------------------------------------- | ----------------------------------------- |
| `APPVEYOR`                               | `$(APPVEYOR)`                               |
| `APPVEYOR_BUILD_FOLDER`                  | `$(APPVEYOR_BUILD_FOLDER)`                  |
| `APPVEYOR_BUILD_ID`                      | `$(APPVEYOR_BUILD_ID)`                      |
| `APPVEYOR_BUILD_NUMBER`                  | `$(APPVEYOR_BUILD_NUMBER)`                  |
| `APPVEYOR_REPO_TAG_NAME`                 | `$(APPVEYOR_REPO_TAG_NAME)`                 |
| `APPVEYOR_REPO_NAME`                     | `$(APPVEYOR_REPO_NAME)`                     |

物理デバイスのテスト用追加 Git コンフィギュレーション:

| 環境変数     | 値                                     |
| -------------------------------------- | ----------------------------------------- |
| `APPVEYOR_REPO_COMMIT`                   | `$(APPVEYOR_REPO_COMMIT)`                   |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH` | `$(APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH)` |
| `APPVEYOR_REPO_BRANCH`                   | `$(APPVEYOR_REPO_BRANCH)`                   |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`                   | `$(APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED)`                   |
| `APPVEYOR_REPO_COMMIT_AUTHOR`                   | `$(APPVEYOR_REPO_COMMIT_AUTHOR)`                   |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`                   | `$(APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL)`                   |

#### Azure pipelines

| 環境変数     | 値                                   |
| ------------------------------------ | --------------------------------------- |
| `TF_BUILD`                | `$(TF_BUILD)`                |
| `BUILD_SOURCESDIRECTORY`             | `$(BUILD_SOURCESDIRECTORY)`             |
| `BUILD_BUILDID`                      | `$(BUILD_BUILDID)`                      |
| `BUILD_DEFINITIONNAME` | `$(BUILD_DEFINITIONNAME)` |
| `SYSTEM_TEAMPROJECTID`                 | `$(SYSTEM_TEAMPROJECTID)`                 |
| `SYSTEM_TEAMFOUNDATIONSERVERURI` | `$(SYSTEM_TEAMFOUNDATIONSERVERURI)` |
| `SYSTEM_JOBID |$(SYSTEM_JOBID)` |
| `SYSTEM_TASKINSTANCEID` | `$(SYSTEM_TASKINSTANCEID)` |

物理デバイスのテスト用追加 Git コンフィギュレーション:

| 環境変数     | 値                                   |
| ------------------------------------ | --------------------------------------- |
| `BUILD_SOURCEVERSION`                | `$(BUILD_SOURCEVERSION)`                |
| `BUILD_REPOSITORY_URI`               | `$(BUILD_REPOSITORY_URI)`               |
| `BUILD_SOURCEBRANCH`                 | `$(BUILD_SOURCEBRANCH)`                 |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID` | `$(SYSTEM_PULLREQUEST_SOURCECOMMITID)` |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH` | `$(SYSTEM_PULLREQUEST_SOURCEBRANCH)` |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI` | `$(SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI)` |
| `BUILD_SOURCEVERSIONMESSAGE` | `$(BUILD_SOURCEVERSIONMESSAGE)` |
| `BUILD_REQUESTEDFORID` | `$(BUILD_REQUESTEDFORID)` |
| `BUILD_REQUESTEDFOREMAIL` | `$(BUILD_REQUESTEDFOREMAIL)` |

#### Bitrise

| 環境変数     | 値                                   |
| ------------------------------------ | --------------------------------------- |
| `BITRISE_SOURCE_DIR`               | `$(BITRISE_SOURCE_DIR)`               |
| `BITRISE_APP_TITLE`             | `$(BITRISE_APP_TITLE)`             |
| `BITRISE_BUILD_SLUG`             | `$(BITRISE_BUILD_SLUG)`             |
| `BITRISE_BUILD_NUMBER`                 | `$(BITRISE_BUILD_NUMBER)`                 |
| `BITRISE_BUILD_URL`                      | `$(BITRISE_BUILD_URL)`                      |

物理デバイスのテスト用追加 Git コンフィギュレーション:

| 環境変数     | 値                                   |
| ------------------------------------ | --------------------------------------- |
| `GIT_REPOSITORY_URL`                          | `$(GIT_REPOSITORY_URL)`                          |
| `BITRISE_GIT_COMMIT`                | `$(BITRISE_GIT_COMMIT)`                |
| `BITRISE_GIT_BRANCH`                 | `$(BITRISE_GIT_BRANCH)`                 |
| `BITRISE_GIT_TAG` | `$(BITRISE_GIT_TAG)` |
| `GIT_CLONE_COMMIT_HASH` | `$(GIT_CLONE_COMMIT_HASH)` |
| `BITRISE_GIT_MESSAGE` | `$(BITRISE_GIT_MESSAGE)` |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT` | `$(GIT_CLONE_COMMIT_MESSAGE_SUBJECT)` |
| `GIT_CLONE_COMMIT_MESSAGE_BODY` | `$(GIT_CLONE_COMMIT_MESSAGE_BODY)` |
| `GIT_CLONE_COMMIT_AUTHOR_NAME` | `$(GIT_CLONE_COMMIT_AUTHOR_NAME)` |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL` | `$(GIT_CLONE_COMMIT_AUTHOR_EMAIL)` |
| `GIT_CLONE_COMMIT_COMMITER_NAME` | `$(GIT_CLONE_COMMIT_COMMITER_NAME)` |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL` | `$(GIT_CLONE_COMMIT_COMMITER_EMAIL)` |

## テストの実行

インストールしたら、通常通りに、たとえば `xcodebuild test` コマンドを使用して、テストを実行します。テスト、ネットワークリクエスト、アプリケーションログは自動的にインスツルメントされます。

## UI テスト

UITests では、テストターゲットと UITests から実行されるアプリケーションの両方がフレームワークとリンクしている必要があります。フレームワークにより自動的に値がアプリケーションに挿入されるため、環境変数はテストターゲットのみに設定する必要があります。

## クラッシュの処理

テストライブラリは、テストの実行中にクラッシュハンドラをインストールします。実行中にテストがクラッシュすると、このクラッシュハンドラがクラッシュログをキャプチャし、テスト結果にログを追加します。macOS または iOS シミュレーターで実行中のテストの場合、クラッシュログは完全にシンボル化されます。その他テストでは部分的にシンボル化されます。

### クラッシュハンドラの無効化

自身のクラッシュハンドラをテストするなど、*非常に稀なケース*ではありますが、テストのクラッシュレポートを無効化する場合があります。

<div class="alert alert-warning"><strong>重要</strong>: クラッシュレポートを無効化すると、テストのクラッシュがバックエンドへレポートされず、失敗として表示されません。テストのクラッシュハンドラを無効にする必要がある場合は、別のターゲットとして実行すると、他のテストに無効化されなくなります。</div>

`DD_DISABLE_CRASH_HANDLER`
: クラッシュの処理およびレポートを無効化します (Boolean)

## 追加のオプションコンフィギュレーション

以下のコンフィギュレーション設定の場合:
 - `Boolean` 変数には `1`、`0`、`true`、`false`、`YES`、`NO` のいずれかを使用できます
 - `String` リスト変数には `,` または `;` で区切られた要素の一覧が許可されます

### 自動インスツルメンテーションの無効化

フレームワークは、可能な限りの情報を自動的にキャプチャしますが、状況やテストによってはこれが生産的でない場合があります。環境変数を次のように設定することで、すべてのテストで自動インスツルメンテーションの一部を無効化することができます。

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: すべてのネットワークインスツルメンテーションを無効化します (Boolean)

`DD_DISABLE_STDOUT_INSTRUMENTATION`
: すべての `stdout` インスツルメンテーションを無効化します (Boolean)

`DD_DISABLE_STDERR_INSTRUMENTATION`
: すべての `stderr` インスツルメンテーションを無効化します (Boolean)

`DD_DISABLE_SDKIOS_INTEGRATION`
: `dd-sdk-ios` ログおよびトレースのあるインテグレーションを無効化します (Boolean)

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

モジュール `DatadogSDKTesting` をインポートしクラス: `DDInstrumentationControl` を使用することで、Swift または Objective-C の一部のテストで特定の自動インスツルメンテーションを有効/無効にすることも可能です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing
