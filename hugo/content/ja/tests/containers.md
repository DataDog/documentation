---
aliases:
- /ja/continuous_integration/setup_tests/containers
- /ja/continuous_integration/tests/containers
further_reading:
- link: /tests
  tag: ドキュメント
  text: Test Optimization について
title: コンテナでのテスト
---
## 概要 {#overview}

CI ジョブが [`docker run`][1] や [`docker-compose`][2] などコマンドを使用して別のテストコンテナでテストプロセスを起動する場合に、このガイドを使用します。Datadog SDK がビルド情報を検出できるように、CI プロバイダーの環境変数をテストコンテナに転送します。

CI プロバイダーの組み込み Docker ベースのエグゼキューターが、ジョブの主要な実行環境です。このガイドは、そのジョブ内のコマンドが別のコンテナでテストを起動しない限り適用されません。また、コンテナがデータベースなどのサポートサービスのみを提供する場合にも適用されません。

[言語別のテストインスツルメンテーション手順][3] で必要なすべての変数を転送します。以下のものが含まれます。

- SDK 構成 (`DD_SERVICE`、`DD_ENV`、およびコンテナがアクセスできる有効な `DD_TRACE_AGENT_URL` など)
- ランタイムインジェクション変数 (`RUBYOPT`、`NODE_OPTIONS`、または Java ツールオプションなど)

CI ジョブで設定された変数や自動インスツルメンテーションステップでエクスポートされた変数は、そのジョブによって起動されたコンテナ内では自動的に利用可能になりません。

## インスツルメンテーション方法の選択 {#choose-an-instrumentation-method}

自動インスツルメンテーションは CI エグゼキューター上で実行され、別途起動されるテストコンテナには自動的に引き継がれません。

- **現在の CI ジョブでビルドされたイメージ:** イメージビルドの前に自動インスツルメンテーションを実行します。この方法は、インテグレーションによって生成されたトレーサーアーティファクトや依存関係の変更がビルドによってコピーされ、ユーザーがそのランタイム変数を転送する場合にのみ使用してください。それ以外の場合は、手動インスツルメンテーションを使用してください。
- **事前ビルド済みイメージ:** ジョブがイメージタグまたはダイジェストをプルまたは参照するだけの場合は、手動インスツルメンテーションを使用します。リポジトリ内の Dockerfile は、ジョブがそのファイルを使用してテストイメージをビルドしない限り、カウントされません。

## 環境変数の管理 {#manage-environment-variables}

次の表に、SDK の構成に使用できる環境変数の一部を示します。

{{< tabs >}}
{{% tab "AppVeyor" %}}

| 環境変数                          | 説明                                                                                                 |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `APPVEYOR`                                   | ビルドが AppVeyor 環境で実行されているかどうかを示します。`True` (Ubuntu イメージの場合は`true`) に設定します。   |
| `APPVEYOR_BUILD_ID`                          | AppVeyor ビルドの一意の識別子。                                                                 |
| `APPVEYOR_BUILD_NUMBER`                      | AppVeyor によって割り当てられたビルド番号。新しいビルドごとに増加します。                                 |
| `APPVEYOR_BUILD_FOLDER`                      | リポジトリがクローンされるディレクトリのパス。                                                    |
| `APPVEYOR_REPO_PROVIDER`                     | リポジトリのソースコントロールプロバイダーを指定します (`github`、`bitbucket`、`kiln`など)。        |
| `APPVEYOR_REPO_NAME`                         | `owner-name/repo-name` 形式のリポジトリ名。                                             |
| `APPVEYOR_REPO_BRANCH`                       | ビルド対象のリポジトリのブランチ。プルリクエストの場合、PR がマージされるベースブランチです。   |
| `APPVEYOR_REPO_COMMIT`                       | 現在のビルドのコミット ID (SHA)。                                                                    |
| `APPVEYOR_REPO_TAG_NAME`                     | タグによって開始されたビルドのタグ名。タグによってビルドがトリガーされていない場合、この変数は未定義です。 |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH`     | プルリクエストの送信元リポジトリのブランチ。                                        |
| `APPVEYOR_REPO_COMMIT_MESSAGE`               | 現在のビルドに関連付けられているコミットメッセージ。                                                        |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`      | 最初の改行以降のテキストを含む、拡張コミットメッセージ。                                  |
| `APPVEYOR_REPO_COMMIT_AUTHOR`                | コミット作成者の名前。                                                                        |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`          | コミット作成者のメールアドレス。                                                                      |

AppVeyor によってすべてのビルドに設定される環境変数の包括的なリストについては、[AppVeyor の公式ドキュメント][101] を参照してください。


[101]: https://www.appveyor.com/docs/environment-variables/

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| 環境変数                  | 説明                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `TF_BUILD`                                | ビルドが Azure Pipelines で実行されていることを示します。                                                    |
| `BUILD_DEFINITIONNAME`                    | ビルドパイプラインの名前。                                                                            |
| `BUILD_BUILDID`                           | 完了したビルドのレコードの ID。                                                              |
| `BUILD_SOURCESDIRECTORY`                  | ソースコードファイルのダウンロード先であるエージェントのローカルパス。                                    |
| `BUILD_REPOSITORY_URI`                    | トリガーリポジトリの URL。                                                                     |
| `BUILD_SOURCEBRANCH`                      | ビルドがキューに入れられたトリガーリポジトリのブランチ。                                                |
| `BUILD_SOURCEVERSION`                     | このビルドに含まれるトリガーリポジトリの最新のバージョン管理変更。                   |
| `BUILD_SOURCEVERSIONMESSAGE`              | トリガーリポジトリのコミットまたはチェンジセットのコメント。                                            |
| `BUILD_REQUESTEDFORID`                    | ビルドをトリガーしたユーザーの ID。                                                                |
| `BUILD_REQUESTEDFOREMAIL`                 | ビルドをトリガーしたユーザーのメールアドレス。                                                             |
| `SYSTEM_TEAMFOUNDATIONSERVERURI`          | Team Foundation Server または Azure DevOps Services アカウントの URI。                                   |
| `SYSTEM_TEAMPROJECTID`                    | ビルドのチームプロジェクト ID。                                                                  |
| `SYSTEM_JOBID`                            | 実行中のジョブの ID。                                                                          |
| `SYSTEM_TASKINSTANCEID`                   | ジョブ内のタスクインスタンスの ID。                                                                |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI`  | プルリクエストのソースリポジトリの URL。                                                     |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH`         | プルリクエストのソースブランチ。                                                                     |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID`       | プルリクエストのソースブランチのコミット ID。                                                    |
| `SYSTEM_STAGEDISPLAYNAME`                 | パイプライン内のステージの表示名。                                                             |
| `SYSTEM_JOBDISPLAYNAME`                   | パイプライン内のジョブの表示名。                                                               |

Azure DevOps Pipelines によってすべてのビルドに設定される環境変数の包括的なリストについては、[Azure の公式ドキュメント][101] を参照してください。


[101]: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops
{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

| 環境変数               | 説明                                                                                                                                                      |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BITBUCKET_PIPELINE_UUID`          | パイプラインの UUID。                                                                                                                                       |
| `BITBUCKET_BUILD_NUMBER`           | ビルドの一意の識別子。これはビルドごとに増加します。一意のアーティファクト名を作成するために使用できます。                                               |
| `BITBUCKET_CLONE_DIR`              | Docker コンテナ内でリポジトリのクローン先となるディレクトリの絶対パス。                                                               |
| `BITBUCKET_REPO_FULL_NAME`         | リポジトリのフルネーム (http://bitbucket.org/ の後に続くすべて)。                                                                            |
| `BITBUCKET_GIT_SSH_ORIGIN`         | SSH origin。例: `git@bitbucket.org:/<workspace>/<repo>.git`。                                                                                      |
| `BITBUCKET_COMMIT`                 | ビルドを開始したコミットのコミットハッシュ。                                                                                                          |
| `BITBUCKET_BRANCH`                 | ソースブランチ。この値はブランチでのみ利用可能です。タグやカスタムパイプラインに対するビルドでは利用できません。                                        |
| `BITBUCKET_TAG`                    | ビルドを開始したコミットのタグ。この値はタグでのみ利用可能です。ブランチに対するビルドでは利用できません。                                 |


Bitbucket によってすべてのビルドに設定される環境変数の包括的なリストについては、[Bitbucket の公式ドキュメント][101] を参照してください。

[101]: https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/

{{% /tab %}}
{{% tab "Bitrise" %}}

| 環境変数                | 説明                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `BITRISE_BUILD_SLUG`                | bitrise.io のビルドを一意に識別するスラッグ。これはビルド URL の一部です。                            |
| `BITRISE_TRIGGERED_WORKFLOW_ID`     | トリガーされたワークフローの ID。ワークフローが手動と自動のいずれでトリガーされたかに関係なく公開されます。|
| `BITRISE_BUILD_NUMBER`              | bitrise.io のビルドのビルド番号。                                                                        |
| `BITRISE_BUILD_URL`                 | bitrise.io のビルドの URL。                                                                             |
| `BITRISE_SOURCE_DIR`                | ベース作業ディレクトリのパス。別の値を指定しない限り、デフォルトでは Bitrise が実行されるディレクトリになります。|
| `GIT_REPOSITORY_URL`                | アプリをホストしている Git リポジトリの URL。                                                              |
| `BITRISE_GIT_COMMIT`                | ビルドをトリガーした Git コミットのコミットハッシュ (該当する場合)。                                    |
| `GIT_CLONE_COMMIT_HASH`             | ビルドが使用するコミットのハッシュ (クローンされたコミット)。                                                 |
| `BITRISEIO_GIT_BRANCH_DEST`         | ビルドをトリガーしたプルリクエストの宛先またはターゲットブランチ。プルリクエストによってトリガーされたビルドでのみ使用されます。|
| `BITRISE_GIT_BRANCH`                | Bitrise によってビルドされる Git ブランチ (例: `main`)。                                                   |
| `BITRISE_GIT_TAG`                   | Git タグによってビルドがトリガーされた場合、この環境変数には使用されたタグが格納されます。                                         |
| `BITRISE_GIT_MESSAGE`               | コミットメッセージ、プルリクエストのタイトル、または手動でビルドをトリガーした場合に指定したメッセージ。       |
| `BITRISE_APP_TITLE`                 | bitrise.io のアプリのタイトル。                                                                            |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT`  | クローンされたコミットのコミットメッセージの件名。                                                         |
| `GIT_CLONE_COMMIT_MESSAGE_BODY`     | クローンされたコミットのコミットメッセージの本文 (内容)。                                                  |
| `GIT_CLONE_COMMIT_AUTHOR_NAME`      | クローンされたコミットの作成者の名前。                                                                    |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL`     | クローンされたコミットの作成者のメールアドレス。                                                                   |
| `GIT_CLONE_COMMIT_COMMITER_NAME`    | クローンされたコミットのコミッターの名前。                                                                 |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL`   | クローンされたコミットのコミッターのメールアドレス。                                                                |


Bitrise によってすべてのビルドに設定される環境変数の包括的なリストについては、[Bitrise の公式ドキュメント][101] を参照してください。


[101]: https://devcenter.bitrise.io/en/references/available-environment-variables.html

{{% /tab %}}
{{% tab "Buildkite" %}}

| 環境変数          | 説明                                                                                     |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| `BUILDKITE`                   | 常に true。                                                                                  |
| `BUILDKITE_PIPELINE_SLUG`     | URL で使用される Buildkite のパイプラインスラッグ。                                                |
| `BUILDKITE_JOB_ID`            | Buildkite がこのジョブに使用する内部 UUID。                                                  |
| `BUILDKITE_BUILD_ID`          | ビルドの UUID。                                                                         |
| `BUILDKITE_BUILD_NUMBER`      | ビルド番号。この番号はビルドごとに増加し、各パイプライン内で一意です。  |
| `BUILDKITE_BUILD_URL`         | Buildkite のこのビルドの URL。                                                            |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | エージェントがこのビルドのコードをチェックアウトしたパス。                            |
| `BUILDKITE_REPO`              | パイプラインのリポジトリ。                                                                 |
| `BUILDKITE_COMMIT`            | ビルドの Git コミットオブジェクト。                                                             |
| `BUILDKITE_BRANCH`            | ビルド対象のブランチ。                                                                        |
| `BUILDKITE_TAG`               | ビルド対象のタグの名前 (ビルドがタグからトリガーされた場合)。                       |
| `BUILDKITE_MESSAGE`           | ビルドに関連付けられているメッセージ。通常はコミットメッセージです。                            |
| `BUILDKITE_BUILD_AUTHOR`      | ビルド対象のコミットを作成したユーザーの名前。                                     |
| `BUILDKITE_BUILD_AUTHOR_EMAIL`| ビルド対象のコミットを作成したユーザーの通知用メールアドレス。                       |
| `BUILDKITE_BUILD_CREATOR`     | ビルドを作成したユーザーの名前。                                                    |
| `BUILDKITE_BUILD_CREATOR_EMAIL` | ビルドを作成したユーザーの通知用メールアドレス。                                    |
| `BUILDKITE_AGENT_ID`          | エージェントの UUID。                                                                         |
| `BUILDKITE_AGENT_META_DATA_*` | 各エージェントタグの値。タグは変数名の末尾に追加されます。          |


Buildkite によってすべてのビルドに設定される環境変数の包括的なリストについては、[Buildkite 公式ドキュメント][101] を参照してください。

[101]: https://buildkite.com/docs/pipelines/environment-variables

{{% /tab %}}
{{% tab "CircleCI" %}}

| 環境変数         | 説明                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CIRCLECI`                    | ビルドが CircleCI で実行されているかどうかを示します。常に `true` に設定されます。                               |
| `CIRCLE_PROJECT_REPONAME`     | ビルド対象のリポジトリの名前。                                                              |
| `CIRCLE_BUILD_NUM`           | 現在のジョブの番号。ジョブ番号はジョブごとに一意です。                                 |
| `CIRCLE_BUILD_URL`           | CircleCI の現在のジョブの URL。                                                             |
| `CIRCLE_WORKFLOW_ID`         | 現在のジョブのワークフローインスタンスの一意の識別子。                                     |
| `CIRCLE_WORKING_DIRECTORY`   | コードのチェックアウト先作業ディレクトリのパス。                                      |
| `CIRCLE_REPOSITORY_URL`      | ビルド対象のリポジトリの URL。                                                                |
| `CIRCLE_SHA1`                | 現在のビルドの最後のコミットの SHA1 ハッシュ。                                                |
| `CIRCLE_BRANCH`              | ビルド対象のリポジトリのブランチ。                                                             |
| `CIRCLE_TAG`                 | 現在のビルドがタグによってトリガーされた場合のタグ名。それ以外の場合は空になります。                     |
| `CIRCLE_JOB`                 | 現在のジョブの名前。                                                                         |


CircleCI によってすべてのビルドに設定される環境変数の包括的なリストについては、[CircleCI の公式ドキュメント][101] を参照してください。


[101]: https://circleci.com/docs/variables/

{{% /tab %}}
{{% tab "Codefresh" %}}

| 環境変数         | 説明                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CF_BUILD_ID`                | ビルドの一意の ID。                                                                          |
| `CF_PIPELINE_NAME`           | パイプラインのフルパス (割り当てられているプロジェクトがある場合はそれを含みます)。                |
| `CF_BUILD_URL`               | Codefresh 内のビルドの URL。                                                                   |
| `CF_STEP_NAME`               | ステップの名前 (例:"MyUnitTests")。                                                    |
| `CF_BRANCH`                  | 実行時にメインパイプラインに関連付けられている Git リポジトリのブランチ名またはタグ。|
| `CF_REVISION`                | 実行時のメインパイプラインの Git リポジトリのリビジョン。                  |


Codefresh によってすべてのビルドに設定される環境変数の包括的なリストについては、[Codefresh の公式ドキュメント][101] を参照してください。


[101]: https://codefresh.io/docs/docs/pipelines/variables/

{{% /tab %}}
{{% tab "GitHub Actions" %}}

| 環境変数       | 説明                                                                                           |
|----------------------------|-------------------------------------------------------------------------------------------------------|
| `GITHUB_ACTION`            | 現在実行中のアクションの名前、またはステップの ID。例: `repo-owner_name-of-action-repo`。|
| `GITHUB_SERVER_URL`        | GitHub サーバーの URL。例: `https://github.com`。                                      |
| `GITHUB_RUN_ID`            | リポジトリ内の各ワークフロー実行の一意の番号。例: `1658821493`。                |
| `GITHUB_RUN_NUMBER`        | リポジトリ内の特定のワークフローの各実行の一意の番号。例: `3`。             |
| `GITHUB_RUN_ATTEMPT`       | 特定のワークフロー実行の各試行の一意の番号。例: `3`。                     |
| `GITHUB_WORKFLOW`          | ワークフローの名前。例: `My test workflow`。                                           |
| `GITHUB_WORKSPACE`         | ランナー上のステップのデフォルトの作業ディレクトリ。例: `/home/runner/work/my-repo-name/my-repo-name`。|
| `GITHUB_REPOSITORY`        | オーナーとリポジトリの名前。例: `octocat/Hello-World`。                                   |
| `GITHUB_SHA`               | ワークフローをトリガーしたコミット SHA。例: `ffac537e6cbbf934b08745a378932722df287a53`。|
| `GITHUB_HEAD_REF`          | プルリクエストのヘッド参照またはソースブランチ (`pull_request` または `pull_request_target` イベントの場合のみ設定されます)。例: `feature-branch-1`。|
| `GITHUB_REF`               | ワークフローをトリガーしたブランチまたはタグの完全な形式の参照。例: `refs/heads/feature-branch-1`。|
| `GITHUB_JOB`               | 現在のジョブのジョブ ID。例: `greeting_job`。                                          |
| `JOB_CHECK_RUN_ID`         | 現在のジョブのチェックラン ID。Datadog Test Optimization GitHub Action は、後続のステップのためにこの変数をエクスポートします。手動インスツルメンテーションの場合は、`JOB_CHECK_RUN_ID: ${{ job.check_run_id }}` を設定します。|


GitHub Actions によってすべてのビルドに設定される環境変数の包括的なリストについては、[GitHub の公式ドキュメント][101] を参照してください。


[101]: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/variables#default-environment-variables

{{% /tab %}}
{{% tab "GitLab CI" %}}

| 環境変数              | 説明                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `GITLAB_CI`           | CI/CD で実行されるすべてのジョブで使用可能です。使用可能な場合は `true` です。                                       |
| `CI_PIPELINE_ID`      | 現在のパイプラインのインスタンスレベルの ID。この ID は、GitLab インスタンス上のすべてのプロジェクトで一意です。|
| `CI_PIPELINE_URL`     | パイプライン詳細の URL。                                                                      |
| `CI_PIPELINE_IID`     | 現在のパイプラインのプロジェクトレベルの IID (内部 ID)。現在のプロジェクト内でのみ一意です。     |
| `CI_PROJECT_PATH`     | プロジェクト名を含むプロジェクトネームスペース。                                                    |
| `CI_PROJECT_URL`      | プロジェクトの HTTP(S) アドレス。                                                                      |
| `CI_PROJECT_DIR`      | リポジトリのクローン先のフルパスであり、ジョブが実行される場所。                                  |
| `CI_JOB_STAGE`        | ジョブのステージの名前。                                                                           |
| `CI_JOB_NAME`         | ジョブの名前。                                                                                    |
| `CI_JOB_URL`          | ジョブ詳細の URL。                                                                                    |
| `CI_JOB_ID`           | ジョブの内部 ID。GitLab インスタンス内のすべてのジョブで一意です。                              |
| `CI_RUNNER_ID`        | 使用されているランナーの一意の ID。                                                                 |
| `CI_RUNNER_TAGS`      | ランナータグのカンマ区切りリスト。                                                             |
| `CI_REPOSITORY_URL`   | CI/CD ジョブトークンを使用してリポジトリを Git クローン (HTTP) するためのフルパス。                                 |
| `CI_COMMIT_SHA`       | プロジェクトのビルド対象となるコミットリビジョン。                                                           |
| `CI_COMMIT_REF_NAME`  | プロジェクトのビルド対象となるブランチまたはタグの名前。                                                       |
| `CI_COMMIT_BRANCH`    | コミットブランチの名前。ブランチパイプラインで使用可能です。                                                  |
| `CI_COMMIT_TAG`       | コミットタグ名。タグのパイプラインでのみ使用可能です。                                              |
| `CI_COMMIT_AUTHOR`    | 「名前 <email>」形式のコミット作成者。                                                        |
| `CI_COMMIT_MESSAGE`   | 完全なコミットメッセージ。                                                                              |
| `CI_COMMIT_TIMESTAMP` | ISO 8601 形式のコミットのタイムスタンプ。例: 2022-01-31T16:47:55Z。デフォルトでは UTC です。 |


GitLab CI によってすべてのビルドに設定される環境変数の包括的なリストについては、[GitLab の公式ドキュメント][101] を参照してください。


[101]: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
{{% /tab %}}
{{% tab "Jenkins" %}}

| 環境変数              | 説明                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `JENKINS_URL`         | ビルドを実行している Jenkins マスターの URL。                                                |
| `BUILD_TAG`           | 識別を容易にするための `jenkins-${JOB_NAME}-${BUILD_NUMBER}` 形式の文字列。                   |
| `BUILD_NUMBER`        | 現在のビルド番号 ("153" など)。                                                                |
| `BUILD_URL`           | このビルドの結果を確認できる URL (http://buildserver/jenkins/job/MyJobName/666/ など)。|
| `WORKSPACE`           | ワークスペースの絶対パス。                                                                      |
| `JOB_NAME`            | このビルドのプロジェクトの名前。                                                                 |
| `JOB_URL`             | ジョブ詳細の URL。                                                                           |
| `GIT_URL`             | リポジトリに使用される Git URL (git@github.com:user/repo.git や https://github.com/user/repo.git など)。|
| `GIT_URL_1`           | 複数のリポジトリが構成されている場合の、最初の Git リポジトリの URL。                           |
| `GIT_COMMIT`          | ビルド用にチェックアウトされたコミットの Git ハッシュ。                                                   |
| `GIT_BRANCH`          | ビルド用にチェックアウトされた Git ブランチ。                                                      |
| `NODE_NAME`           | ビルドが実行されているノードの名前。マスターノードの場合は 'master' と等しくなります。                      |
| `NODE_LABELS`         | ノードに割り当てられたラベルのカンマ区切りリスト。                                                  |
| `DD_CUSTOM_TRACE_ID`  | トレース ID 用に Jenkins Datadog Plugin で設定されるカスタム変数。                                       |
| `DD_CUSTOM_PARENT_ID` | 親 ID 用に Jenkins Datadog Plugin で設定されるカスタム変数。                                       |


Jenkins によってすべてのビルドに設定される環境変数の包括的なリストについては、[Jenkins の公式ドキュメント][101] を参照してください。


[101]: https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables
[102]: https://github.com/jenkinsci/datadog-plugin

{{% /tab %}}
{{% tab "TeamCity" %}}

| 環境変数                     | 説明                                                                                                  |
|------------------------------|--------------------------------------------------------------------------------------------------------------|
| `TEAMCITY_VERSION`           | TeamCity サーバーのバージョン。                                                                       |
| `TEAMCITY_BUILDCONF_NAME`    | 現在のビルドが属するビルド構成の名前。                                          |
| `BUILD_URL`                  | 現在のビルドへのリンク。                                                                            |
| `DATADOG_BUILD_ID`           | [Datadog TeamCity インテグレーション][102] で設定されるカスタム変数。                                            |

TeamCity によってすべてのビルドに設定される環境変数の包括的なリストについては、[TeamCity の公式ドキュメント][101] を参照してください。


[101]: https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html
[102]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration

{{% /tab %}}
{{% tab "Travis CI" %}}

| 環境変数                     | 説明                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `TRAVIS`                     | ビルドが Travis CI 上で実行されていることを示すため、常に `true` に設定されます。                             |
| `TRAVIS_BUILD_ID`            | Travis CI が内部で使用する現在のビルドの ID。                                            |
| `TRAVIS_BUILD_NUMBER`        | 現在のビルドの番号。例: `4`。                                                   |
| `TRAVIS_BUILD_WEB_URL`       | ビルドログの URL。                                                                                |
| `TRAVIS_BUILD_DIR`           | ワーカー上でビルド対象のリポジトリがコピーされたディレクトリの絶対パス。   |
| `TRAVIS_JOB_WEB_URL`         | ジョブログの URL。                                                                                  |
| `TRAVIS_REPO_SLUG`           | 現在ビルドされているリポジトリのスラッグ (形式: `owner_name/repo_name`)。                  |
| `TRAVIS_COMMIT`              | 現在のビルドがテストしているコミット。                                                        |
| `TRAVIS_BRANCH`              | プッシュビルドの場合、ブランチ名。PR ビルドの場合、PR のターゲットとなるブランチの名前。   |
| `TRAVIS_TAG`                 | 現在のビルドが Git タグを対象としている場合、この変数にはタグ名が設定されます。それ以外の場合は空です。|
| `TRAVIS_PULL_REQUEST_SLUG`   | 現在のジョブがプルリクエストの場合、PR の送信元リポジトリのスラッグ。       |
| `TRAVIS_PULL_REQUEST_BRANCH` | 現在のジョブがプルリクエストの場合、PR の送信元ブランチの名前。           |
| `TRAVIS_COMMIT_MESSAGE`      | コミットの件名と本文 (折り返しなし)。                                                              |



Travis CI によってすべてのビルドに設定される環境変数の包括的なリストについては、[Travis CI の公式ドキュメント][101] を参照してください。


[101]: https://docs.travis-ci.com/user/environment-variables/#default-environment-variables

{{% /tab %}}
{{% tab "Buddy CI" %}}

| 環境変数                                | 説明                                                                                           |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| `BUDDY`                                 | 現在の環境が Buddy 環境であるかどうかを表します。例: `true`。   |
| `BUDDY_SCM_URL`                         | プロジェクトと同期されているリポジトリの URL。例: `https://github.com/githubaccount/repository`。|
| `BUDDY_EXECUTION_REVISION`              | 現在のパイプライン実行のコミットの SHA1 ハッシュ。例: `46c360492d6372e5335300776806af412755871`。|
| `BUDDY_EXECUTION_BRANCH`                | 現在のパイプライン実行の Git ブランチ名。例: `main`。            |
| `BUDDY_EXECUTION_TAG`                   | 現在のパイプライン実行の Git タグの名前 (タグ付けされている場合)。例: `v1.0.1`。   |
| `BUDDY_PIPELINE_ID`                     | 実行パイプラインの ID。例: `1`。                                            |
| `BUDDY_EXECUTION_ID`                    | 現在のパイプライン実行の ID。例: `1`。                                    |
| `BUDDY_PIPELINE_NAME`                   | 実行パイプラインの名前。例: `Deploy to Production`。                       |
| `BUDDY_EXECUTION_URL`                   | 現在のパイプライン実行の URL。例: `https://app.buddy.works/my-workspace/my-project/pipelines/pipeline/1`。|
| `BUDDY_EXECUTION_REVISION_MESSAGE`      | 現在実行されているリビジョンのコミットメッセージ。例: `we need to write unit tests!`。|
| `BUDDY_EXECUTION_REVISION_COMMITTER_NAME` | 現在実行されているリビジョンのコミッターの名前。例: `Mike Benson`。     |
| `BUDDY_EXECUTION_REVISION_COMMITTER_EMAIL` | 現在実行されているリビジョンのコミッターのメールアドレス。例: `mike.benson@buddy.works`。|


</br>

Buddy CI によってすべてのビルドに設定される環境変数の包括的なリストについては、[Buddy CI の公式ドキュメント][101] を参照してください。


[101]: https://buddy.works/docs/pipelines/environment-variables#default-environment-variables
{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/engine/reference/run/
[2]: https://docs.docker.com/compose/reference/
[3]: /ja/tests/#setup