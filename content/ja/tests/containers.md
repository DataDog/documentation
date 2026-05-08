---
aliases:
- /ja/continuous_integration/setup_tests/containers
- /ja/continuous_integration/tests/containers
further_reading:
- link: /tests
  tag: ドキュメント
  text: Test Optimization について
title: コンテナ内のテスト
---

## 概要

ビルド内で自分で起動したコンテナ内でテストを実行する場合 (たとえば、[`docker run`][1] または [`docker-compose`][2] を使用)、使用している CI プロバイダーに応じて以下の環境変数をコンテナに転送します。これにより、Datadog トレーサーによるビルド情報の自動検出が可能になります。

さらに、[言語別のテストインスツルメンテーション手順][3]に記載されているとおり、トレーサーの構成に必要な環境変数で渡す必要があります (`DD_SERVICE`、`DD_ENV`、およびコンテナ内からアクセス可能な、有効な `DD_TRACE_AGENT_URL` など)。

## 環境変数の管理

以下の表では、トレーサーを構成するために利用できる環境変数の一覧 (網羅的ではありません) を紹介しています。 

{{< tabs >}}
{{% tab "AppVeyor" %}}

| 環境変数                          | 説明                                                                                                  |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `APPVEYOR`                                   | ビルドが AppVeyor 環境で実行されているかどうかを示します。`True` (Ubuntu イメージの場合は `true`) に設定します。    |
| `APPVEYOR_BUILD_ID`                          | AppVeyor ビルドの一意の識別子。                                                                  |
| `APPVEYOR_BUILD_NUMBER`                      | AppVeyor によって割り当てられたビルド番号で、新しいビルドが作成されるたびにインクリメントされます。                                  |
| `APPVEYOR_BUILD_FOLDER`                      | リポジトリがクローンされるディレクトリへのパス。                                                     |
| `APPVEYOR_REPO_PROVIDER`                     | `github`、`bitbucket`、`kiln` など、リポジトリのソース管理プロバイダーを指定します。         |
| `APPVEYOR_REPO_NAME`                         | `owner-name/repo-name` の形式で表現したリポジトリの名前。                                              |
| `APPVEYOR_REPO_BRANCH`                       | ビルド対象のリポジトリのブランチ。プル リクエストの場合は、PR のマージ先となるベース ブランチです。    |
| `APPVEYOR_REPO_COMMIT`                       | 現在のビルドのコミット ID (SHA)。                                                                     |
| `APPVEYOR_REPO_TAG_NAME`                     | タグによって開始されるビルドのタグ名。ビルドがタグによってトリガーされない場合、この変数は未定義となります。  |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH`     | プル リクエストの送信元リポジトリのブランチ。                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE`               | 現在のビルドに関連するコミット メッセージ。                                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`      | 最初の改行以降のテキストも含む拡張されたコミット メッセージ。                                   |
| `APPVEYOR_REPO_COMMIT_AUTHOR`                | コミット作成者の名前。                                                                         |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`          | コミット作成者のメールアドレス。                                                                       |

AppVeyor がビルドごとに設定する環境変数の詳細な一覧については、[AppVeyor の公式ドキュメント][101]を参照してください。


[101]: https://www.appveyor.com/docs/environment-variables/

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| 環境変数                  | 説明                                                                                              |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `TF_BUILD`                                | ビルドが Azure Pipelines で実行されていることを示しています。                                                     |
| `BUILD_DEFINITIONNAME`                    | ビルド パイプラインの名前。                                                                             |
| `BUILD_BUILDID`                           | 完了したビルドのレコードの ID。                                                               |
| `BUILD_SOURCESDIRECTORY`                  | ソース コード ファイルがダウンロードされるエージェントのローカル パス。                                     |
| `BUILD_REPOSITORY_URI`                    | トリガーするリポジトリの URL。                                                                      |
| `BUILD_SOURCEBRANCH`                      | ビルドがキューに入れられた、トリガーするリポジトリのブランチ。                                                 |
| `BUILD_SOURCEVERSION`                     | このビルドに含まれる、トリガーするリポジトリの最新のバージョン コントロールの変更。                    |
| `BUILD_SOURCEVERSIONMESSAGE`              | トリガーするリポジトリのコミットまたは変更セットのコメント。                                             |
| `BUILD_REQUESTEDFORID`                    | ビルドをトリガーしたユーザーの ID。                                                                 |
| `BUILD_REQUESTEDFOREMAIL`                 | ビルドをトリガーしたユーザーのメール アドレス。                                                              |
| `SYSTEM_TEAMFOUNDATIONSERVERURI`          | Team Foundation Server または Azure DevOps Services アカウントの URI。                                    |
| `SYSTEM_TEAMPROJECTID`                    | ビルドが属するチーム プロジェクトの ID。                                                                   |
| `SYSTEM_JOBID`                            | 実行中のジョブの ID。                                                                           |
| `SYSTEM_TASKINSTANCEID`                   | ジョブ内のタスク インスタンスの ID。                                                                 |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI`  | プル リクエストの送信元リポジトリの URL。                                                      |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH`         | プル リクエストのソース ブランチ。                                                                      |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID`       | プル リクエストのソース ブランチのコミット ID。                                                     |
| `SYSTEM_STAGEDISPLAYNAME`                 | パイプライン内のステージの表示名。                                                              |
| `SYSTEM_JOBDISPLAYNAME`                   | パイプライン内のジョブの表示名。                                                                |

Azure DevOps Pipelines がビルドごとに設定する環境変数の詳細な一覧については、[Azure の公式ドキュメント][101]を参照してください。


[101]: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops
{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

| 環境変数               | 説明                                                                                                                                                       |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BITBUCKET_PIPELINE_UUID`          | パイプラインの UUID。                                                                                                                                        |
| `BITBUCKET_BUILD_NUMBER`           | ビルドの一意の識別子。ビルドごとにインクリメントされ、一意のアーティファクト名を作成するために使用できます。                                                |
| `BITBUCKET_CLONE_DIR`              | Docker コンテナ内でリポジトリがクローンされるディレクトリの絶対パス。                                                                |
| `BITBUCKET_REPO_FULL_NAME`         | リポジトリのフル ネーム (http://bitbucket.org/ の後のすべての文字列)。                                                                             |
| `BITBUCKET_GIT_SSH_ORIGIN`         | SSH の origin (例: `git@bitbucket.org:/<workspace>/<repo>.git`)。                                                                                       |
| `BITBUCKET_COMMIT`                 | ビルドを開始したコミットのハッシュ。                                                                                                           |
| `BITBUCKET_BRANCH`                 | ソース ブランチ。この値はブランチでのみ使用できます。タグに対するビルドやカスタム パイプラインでは使用できません。                                         |
| `BITBUCKET_TAG`                    | ビルドを開始したコミットのタグ。この値はタグでのみ使用できます。ブランチに対するビルドでは使用できません。                                  |


Bitbucket がビルドごとに設定する環境変数の詳細な一覧については、[Bitbucket の公式ドキュメント][101]を参照してください。

[101]: https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/

{{% /tab %}}
{{% tab "Bitrise" %}}

| 環境変数                | 説明                                                                                                       |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `BITRISE_BUILD_SLUG`                | bitrise.io 上でビルドを一意に識別するスラッグ。ビルド URL の一部です。                             |
| `BITRISE_TRIGGERED_WORKFLOW_ID`     | トリガーされたワークフローの ID で、ワークフローが手動でトリガーされたか自動でトリガーされたかに関係なく公開されます。 |
| `BITRISE_BUILD_NUMBER`              | bitrise.io 上のビルド番号。                                                                         |
| `BITRISE_BUILD_URL`                 | bitrise.io 上のビルドの URL。                                                                              |
| `BITRISE_SOURCE_DIR`                | ベースとなる作業ディレクトリへのパス。デフォルトでは、別の値を指定しない限り、Bitrise が実行されるディレクトリになります。 |
| `GIT_REPOSITORY_URL`                | アプリをホストしている Git リポジトリの URL。                                                               |
| `BITRISE_GIT_COMMIT`                | ビルドをトリガーした Git コミットのハッシュ (該当する場合)。                                     |
| `GIT_CLONE_COMMIT_HASH`             | ビルドが使用するコミット (クローンされたコミット) のハッシュ。                                                  |
| `BITRISEIO_GIT_BRANCH_DEST`         | ビルドをトリガーしたプル リクエストの宛先ブランチまたはターゲット ブランチ。プル リクエストでトリガーされたビルドでのみ使用します。 |
| `BITRISE_GIT_BRANCH`                | Bitrise によってビルドされる Git ブランチ (例: `main`)。                                                    |
| `BITRISE_GIT_TAG`                   | ビルドが Git タグによってトリガーされる場合、この環境変数には使用されたタグが格納されます。                                          |
| `BITRISE_GIT_MESSAGE`               | コミット メッセージ、プル リクエストのタイトル、または手動でビルドをトリガーした場合に指定したメッセージ。        |
| `BITRISE_APP_TITLE`                 | bitrise.io 上でのアプリのタイトル。                                                                             |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT`  | クローンされたコミットのコミット メッセージの件名。                                                          |
| `GIT_CLONE_COMMIT_MESSAGE_BODY`     | クローンされたコミットのコミット メッセージの本文 (内容)。                                                   |
| `GIT_CLONE_COMMIT_AUTHOR_NAME`      | クローンされたコミットの作成者名。                                                                     |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL`     | クローンされたコミットの作成者のメール アドレス。                                                                    |
| `GIT_CLONE_COMMIT_COMMITER_NAME`    | クローンされたコミットのコミッターの名前。                                                                  |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL`   | クローンされたコミットのコミッターのメール アドレス。                                                                 |


Bitrise がビルドごとに設定する環境変数の詳細な一覧については、[Bitrise の公式ドキュメント][101]を参照してください。


[101]: https://devcenter.bitrise.io/en/references/available-environment-variables.html

{{% /tab %}}
{{% tab "Buildkite" %}}

| 環境変数          | 説明                                                                                      |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| `BUILDKITE`                   | 常に true。                                                                                   |
| `BUILDKITE_PIPELINE_SLUG`     | Buildkite 上でパイプラインを識別するスラッグ (URLで使用)。                                                 |
| `BUILDKITE_JOB_ID`            | Buildkite がこのジョブに使用する内部 UUID。                                                   |
| `BUILDKITE_BUILD_ID`          | ビルドの UUID。                                                                          |
| `BUILDKITE_BUILD_NUMBER`      | ビルド番号。この番号はビルドごとに増加し、各パイプライン内で一意となります。   |
| `BUILDKITE_BUILD_URL`         | Buildkite 上でのこのビルドの URL。                                                             |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | エージェントがこのビルド用のコードをチェックアウトしたパス。                             |
| `BUILDKITE_REPO`              | パイプラインのリポジトリ。                                                                  |
| `BUILDKITE_COMMIT`            | ビルドの Git コミット オブジェクト。                                                              |
| `BUILDKITE_BRANCH`            | ビルドされるブランチ。                                                                         |
| `BUILDKITE_TAG`               | ビルドされるタグの名前 (このビルドがタグからトリガーされた場合)。                        |
| `BUILDKITE_MESSAGE`           | ビルドに関連付けられたメッセージ (通常はコミット メッセージ)。                             |
| `BUILDKITE_BUILD_AUTHOR`      | ビルドされるコミットを作成したユーザーの名前。                                      |
| `BUILDKITE_BUILD_AUTHOR_EMAIL`| ビルドされるコミットを作成したユーザーの通知用メール アドレス。                        |
| `BUILDKITE_BUILD_CREATOR`     | ビルドを作成したユーザーの名前。                                                     |
| `BUILDKITE_BUILD_CREATOR_EMAIL` | ビルドを作成したユーザーの通知用メール アドレス。                                     |
| `BUILDKITE_AGENT_ID`          | エージェントの UUID。                                                                          |
| `BUILDKITE_AGENT_META_DATA_*` | 各エージェント タグの値。タグ名は変数名の末尾に付加されます。           |


Buildkite がビルドごとに設定する環境変数の詳細な一覧については、[Buildkite の公式ドキュメント][101]を参照してください。

[101]: https://buildkite.com/docs/pipelines/environment-variables

{{% /tab %}}
{{% tab "CircleCI" %}}

| 環境変数         | 説明                                                                                            |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CIRCLECI`                    | ビルドが CircleCI で実行されているかどうかを示します。常に `true` に設定します。                                |
| `CIRCLE_PROJECT_REPONAME`     | ビルドされるリポジトリの名前。                                                               |
| `CIRCLE_BUILD_NUM`           | 現在のジョブ番号。ジョブ番号はジョブごとに一意です。                                  |
| `CIRCLE_BUILD_URL`           | CircleCI 上での現在のジョブの URL。                                                              |
| `CIRCLE_WORKFLOW_ID`         | 現在のジョブのワークフロー インスタンスの一意の識別子。                                      |
| `CIRCLE_WORKING_DIRECTORY`   | コードがチェックアウトされる作業ディレクトリへのパス。                                       |
| `CIRCLE_REPOSITORY_URL`      | ビルドされるリポジトリの URL。                                                                 |
| `CIRCLE_SHA1`                | 現在のビルドで使用されるコミットの SHA1 ハッシュ。                                                 |
| `CIRCLE_BRANCH`              | ビルド対象のリポジトリのブランチ。                                                              |
| `CIRCLE_TAG`                 | 現在のビルドがタグによってトリガーされる場合はタグ名。そうでない場合は空になります。                      |
| `CIRCLE_JOB`                 | 現在のジョブの名前。                                                                          |


CircleCI がビルドごとに設定する環境変数の詳細な一覧については、[CircleCI の公式ドキュメント][101]を参照してください。


[101]: https://circleci.com/docs/variables/

{{% /tab %}}
{{% tab "Codefresh" %}}

| 環境変数         | 説明                                                                                            |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CF_BUILD_ID`                | ビルドの一意の識別子。                                                                           |
| `CF_PIPELINE_NAME`           | パイプラインのフル パス (パイプラインが割り当てられているプロジェクトがあれば、そのプロジェクトも含む)。                 |
| `CF_BUILD_URL`               | Codefresh 上のビルドの URL。                                                                    |
| `CF_STEP_NAME`               | ステップの名前 (例: 「MyUnitTests」)。                                                     |
| `CF_BRANCH`                  | 実行時のメイン パイプラインに関連付けられている Git リポジトリのブランチ名またはタグ。 |
| `CF_REVISION`                | 実行時におけるメイン パイプラインの Git リポジトリのリビジョン。                   |


Codefresh がビルドごとに設定する環境変数の詳細な一覧については、[Codefresh の公式ドキュメント][101]を参照してください。


[101]: https://codefresh.io/docs/docs/pipelines/variables/

{{% /tab %}}
{{% tab "GitHub Actions" %}}

| 環境変数       | 説明                                                                                            |
|----------------------------|-------------------------------------------------------------------------------------------------------|
| `GITHUB_ACTION`            | 現在実行中のアクションの名前、またはステップの ID。例: `repo-owner_name-of-action-repo`。 |
| `GITHUB_SERVER_URL`        | GitHub サーバーの URL。例: `https://github.com`                                       |
| `GITHUB_RUN_ID`            | リポジトリ内で実行される各ワークフローに固有の番号。例: `1658821493`。                 |
| `GITHUB_RUN_NUMBER`        | リポジトリ内の特定のワークフローの各実行に固有の番号。例: `3`。              |
| `GITHUB_RUN_ATTEMPT`       | 特定のワークフローの実行に対する試行ごとに振られる固有の番号。例: `3`。                      |
| `GITHUB_WORKFLOW`          | ワークフローの名前。例: `My test workflow`。                                            |
| `GITHUB_WORKSPACE`         | ステップを実行するランナーのデフォルトの作業ディレクトリ。例: `/home/runner/work/my-repo-name/my-repo-name`。 |
| `GITHUB_REPOSITORY`        | オーナーおよびリポジトリ名。例: `octocat/Hello-World`。                                    |
| `GITHUB_SHA`               | ワークフローをトリガーしたコミットの SHA。例: `ffac537e6cbbf934b08745a378932722df287a53`。 |
| `GITHUB_HEAD_REF`          | プル リクエストの head ref またはソース ブランチ (`pull_request` または `pull_request_target` イベントに対してのみ設定)。例: `feature-branch-1`。 |
| `GITHUB_REF`               | ワークフローをトリガーしたブランチまたはタグの完全な形式の参照名。例: `refs/heads/feature-branch-1`。 |
| `GITHUB_JOB`               | 現在のジョブ ID。例: `greeting_job`。                                           |


GitHub Actions がビルドごとに設定する環境変数の詳細な一覧については、[GitHub の公式ドキュメント][101]を参照してください。


[101]: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/variables#default-environment-variables

{{% /tab %}}
{{% tab "GitLab CI" %}}

| 環境変数              | 説明                                                                                               |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `GITLAB_CI`           | CI/CD で実行されるすべてのジョブで利用できます。利用可能な場合は `true` になります。                                         |
| `CI_PIPELINE_ID`      | 現在のパイプラインのインスタンス レベルの ID。この ID は、GitLab インスタンス上のすべてのプロジェクトで一意です。 |
| `CI_PIPELINE_URL`     | パイプラインの詳細の URL。                                                                       |
| `CI_PIPELINE_IID`     | 現在のパイプラインのプロジェクト レベルの IID (内部 ID)。現在のプロジェクト内でのみ一意となります。      |
| `CI_PROJECT_PATH`     | プロジェクト名を含むプロジェクトのネーム スペース。                                                     |
| `CI_PROJECT_DIR`      | リポジトリがクローンされ、ジョブが実行されるディレクトリのフル パス。                                   |
| `CI_JOB_STAGE`        | ジョブのステージ名。                                                                            |
| `CI_JOB_NAME`         | ジョブの名前。                                                                                     |
| `CI_JOB_URL`          | ジョブの詳細の URL。                                                                                     |
| `CI_JOB_ID`           | ジョブの内部 ID で、GitLab インスタンス内のすべてのジョブで一意です。                               |
| `CI_RUNNER_ID`        | 使用されるランナーの一意の ID。                                                                  |
| `CI_RUNNER_TAGS`      | ランナー タグのカンマ区切りのリスト。                                                              |
| `CI_REPOSITORY_URL`   | CI/CD ジョブ トークンを使用してリポジトリを Git clone (HTTP) するためのフル パス。                                  |
| `CI_COMMIT_SHA`       | プロジェクトのビルドの対象となるコミットのリビジョン。                                                            |
| `CI_COMMIT_REF_NAME`  | プロジェクトのビルドの対象となるブランチ名またはタグ名。                                                        |
| `CI_COMMIT_BRANCH`    | コミットのブランチ名。ブランチ パイプラインでのみ利用できます。                                                   |
| `CI_COMMIT_TAG`       | コミットのタグ名。タグのパイプラインでのみ使用できます。                                               |
| `CI_COMMIT_AUTHOR`    | コミットの作成者 (Name <email> 形式で表現)。                                                         |
| `CI_COMMIT_MESSAGE`   | コミット メッセージの全文。                                                                               |
| `CI_COMMIT_TIMESTAMP` | ISO 8601 形式で表現されたコミットのタイム スタンプ。例: 2022-01-31T16:47:55Z。デフォルトは UTC。  |


GitLab CI がビルドごとに設定する環境変数の詳細な一覧については、[GitLab の公式ドキュメント][101]を参照してください。


[101]: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
{{% /tab %}}
{{% tab "Jenkins" %}}

| 環境変数              | 説明                                                                                               |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `JENKINS_URL`         | ビルドを実行している Jenkins マスターの URL。                                                 |
| `BUILD_TAG`           | 識別を容易にする `jenkins-${JOB_NAME}-${BUILD_NUMBER}` という形式の文字列。                    |
| `BUILD_NUMBER`        | 現在のビルド番号 (例: 153)。                                                                 |
| `BUILD_URL`           | このビルドの結果を確認できる URL (例: http://buildserver/jenkins/job/MyJobName/666/)。|
| `WORKSPACE`           | ワーク スペースの絶対パス。                                                                       |
| `JOB_NAME`            | ビルドが属するプロジェクトの名前。                                                                  |
| `JOB_URL`             | ジョブの詳細の URL。                                                                            |
| `GIT_URL`             | リポジトリに対して使用される Git URL (git@github.com:user/repo.git や https://github.com/user/repo.git など)。|
| `GIT_URL_1`           | 複数のリポジトリが構成されている場合は、最初の Git リポジトリの URL。                            |
| `GIT_COMMIT`          | ビルド用にチェックアウトしたコミットの Git ハッシュ。                                                    |
| `GIT_BRANCH`          | ビルド用にチェックアウトされた Git ブランチ。                                                       |
| `NODE_NAME`           | ビルドが実行されているノードの名前。マスター ノードの場合は 'master' に等しくなります。                       |
| `NODE_LABELS`         | ノードに割り当てられたラベルのカンマ区切りのリスト。                                                   |
| `DD_CUSTOM_TRACE_ID`  | トレース ID 用に Jenkins Datadog プラグインによって設定されるカスタム変数。                                        |
| `DD_CUSTOM_PARENT_ID` | 親 ID 用に Jenkins Datadog プラグインによって設定されるカスタム変数。                                        |


Jenkins がビルドごとに設定する環境変数の詳細な一覧については、[Jenkins の公式ドキュメント][101]を参照してください。


[101]: https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables
[102]: https://github.com/jenkinsci/datadog-plugin

{{% /tab %}}
{{% tab "TeamCity" %}}

| 環境変数                     | 説明                                                                                                   |
|------------------------------|--------------------------------------------------------------------------------------------------------------|
| `TEAMCITY_VERSION`           | TeamCity サーバーのバージョン。                                                                        |
| `TEAMCITY_BUILDCONF_NAME`    | 現在のビルドが属するビルド構成の名前。                                           |
| `BUILD_URL`                  | 現在のビルドへのリンク。                                                                             |
| `DATADOG_BUILD_ID`           | [Datadog TeamCity インテグレーション][102] によって設定されるカスタム変数。                                             |

TeamCity がビルドごとに設定する環境変数の詳細な一覧については、[TeamCity の公式ドキュメント][101]を参照してください。


[101]: https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html
[102]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration

{{% /tab %}}
{{% tab "Travis CI" %}}

| 環境変数                     | 説明                                                                                            |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `TRAVIS`                     | ビルドが Travis CI 上で実行されていることを示すために、常に `true` に設定します。                              |
| `TRAVIS_BUILD_ID`            | Travis CI が内部的に使用する現在のビルドの ID。                                             |
| `TRAVIS_BUILD_NUMBER`        | 現在のビルド番号。例: `4`。                                                    |
| `TRAVIS_BUILD_WEB_URL`       | ビルド ログへの URL。                                                                                 |
| `TRAVIS_BUILD_DIR`           | ビルド中のリポジトリがコピーされたワーカー上のディレクトリへの絶対パス。    |
| `TRAVIS_JOB_WEB_URL`         | ジョブ ログへの URL。                                                                                   |
| `TRAVIS_REPO_SLUG`           | 現在ビルド中のリポジトリのスラッグ (形式: `owner_name/repo_name`)。                   |
| `TRAVIS_COMMIT`              | 現在のビルドがテストしているコミット。                                                         |
| `TRAVIS_BRANCH`              | プッシュ ビルドの場合は、ブランチの名前。PR ビルドの場合は、PR の対象となるブランチの名前。    |
| `TRAVIS_TAG`                 | 現在のビルドが Git タグを対象としている場合、この変数にはタグ名が設定されます。そうでない場合は空になります。 |
| `TRAVIS_PULL_REQUEST_SLUG`   | 現在のジョブがプル リクエストの場合、PR の作成元となったリポジトリのスラッグ。        |
| `TRAVIS_PULL_REQUEST_BRANCH` | 現在のジョブがプル リクエストの場合、PR の作成元となったブランチの名前。            |
| `TRAVIS_COMMIT_MESSAGE`      | コミット メッセージの件名と本文 (折り返しなし)。                                                               |



Travis CI がビルドごとに設定する環境変数の詳細な一覧については、[Travis CI の公式ドキュメント][101]を参照してください。


[101]: https://docs.travis-ci.com/user/environment-variables/#default-environment-variables

{{% /tab %}}
{{% tab "Buddy CI" %}}

| 環境変数                                | 説明                                                                                            |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| `BUDDY`                                 | 現在の環境が Buddy 環境かどうかを表します。例: `true`。    |
| `BUDDY_SCM_URL`                         | プロジェクトと同期しているリポジトリの URL。例: `https://github.com/githubaccount/repository` |
| `BUDDY_EXECUTION_REVISION`              | 現在のパイプライン実行のコミットの SHA1 ハッシュ。例: `46c360492d6372e5335300776806af412755871`。 |
| `BUDDY_EXECUTION_BRANCH`                | 現在のパイプライン実行の Git ブランチの名前。例: `main`。             |
| `BUDDY_EXECUTION_TAG`                   | 現在のパイプライン実行の Git タグの名前 (タグ付けされている場合)。例: `v1.0.1`。    |
| `BUDDY_PIPELINE_ID`                     | 実行されるパイプラインの ID。例: `1`。                                             |
| `BUDDY_EXECUTION_ID`                    | 現在のパイプライン実行の ID。例: `1`。                                     |
| `BUDDY_PIPELINE_NAME`                   | 実行されるパイプラインの名前。例: `Deploy to Production`。                        |
| `BUDDY_EXECUTION_URL`                   | 現在のパイプライン実行の URL。例: `https://app.buddy.works/my-workspace/my-project/pipelines/pipeline/1` |
| `BUDDY_EXECUTION_REVISION_MESSAGE`      | 現在実行中のリビジョンのコミット メッセージ。例: `we need to write unit tests!`。 |
| `BUDDY_EXECUTION_REVISION_COMMITTER_NAME` | 現在実行中のリビジョンのコミッターの名前。例: `Mike Benson`。      |
| `BUDDY_EXECUTION_REVISION_COMMITTER_EMAIL` | 現在実行中のリビジョンのコミッターのメール アドレス。例: `mike.benson@buddy.works`。 |


</br>

Buddy CI がビルドごとに設定する環境変数の詳細な一覧については、[Buddy CI の公式ドキュメント][101]を参照してください。


[101]: https://buddy.works/docs/pipelines/environment-variables#default-environment-variables
{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/engine/reference/run/
[2]: https://docs.docker.com/compose/reference/
[3]: /ja/tests/#setup