---
kind: documentation
title: コンテナでのテスト
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

ビルド内で自分で起動したコンテナ内でテストを実行する場合 (たとえば、[`docker run`][1] または [`docker-compose`][2] を使用)、使用している CI プロバイダーに応じて以下の環境変数をコンテナに転送します。これにより、Datadog トレーサーによるビルド情報の自動検出が可能になります。

さらに、[言語別のテストインスツルメンテーション手順][3]に記載されているとおり、トレーサーの構成に必要な環境変数で渡す必要があります (`DD_SERVICE`、`DD_ENV`、およびコンテナ内からアクセス可能な、有効な `DD_TRACE_AGENT_URL` など)。

{{< tabs >}}
{{% tab "AppVeyor" %}}

- `APPVEYOR`
- `APPVEYOR_BUILD_ID`
- `APPVEYOR_BUILD_NUMBER`
- `APPVEYOR_BUILD_FOLDER`
- `APPVEYOR_REPO_PROVIDER`
- `APPVEYOR_REPO_NAME`
- `APPVEYOR_REPO_BRANCH`
- `APPVEYOR_REPO_COMMIT`
- `APPVEYOR_REPO_TAG_NAME`
- `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH`
- `APPVEYOR_REPO_COMMIT_MESSAGE`
- `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`
- `APPVEYOR_REPO_COMMIT_AUTHOR`
- `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`

[AppVeyor により提供されたビルド環境変数の完全リスト][1]


[1]: https://www.appveyor.com/docs/environment-variables/
{{% /tab %}}
{{% tab "Azure Pipelines" %}}

- `TF_BUILD`
- `BUILD_DEFINITIONNAME`
- `BUILD_BUILDID`
- `BUILD_SOURCESDIRECTORY`
- `BUILD_REPOSITORY_URI`
- `BUILD_SOURCEBRANCH`
- `BUILD_SOURCEVERSION`
- `BUILD_SOURCEVERSIONMESSAGE`
- `BUILD_REQUESTEDFORID`
- `BUILD_REQUESTEDFOREMAIL`
- `SYSTEM_TEAMFOUNDATIONSERVERURI`
- `SYSTEM_TEAMPROJECT`
- `SYSTEM_JOBID`
- `SYSTEM_TASKINSTANCEID`
- `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI`
- `SYSTEM_PULLREQUEST_SOURCEBRANCH`
- `SYSTEM_PULLREQUEST_SOURCECOMMITID`
- `SYSTEM_STAGEDISPLAYNAME`
- `SYSTEM_JOBDISPLAYNAME`

[Azure Pipelines により提供されたビルド環境変数の完全リスト][1]


[1]: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops
{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

- `BITBUCKET_PIPELINE_UUID`
- `BITBUCKET_BUILD_NUMBER`
- `BITBUCKET_CLONE_DIR`
- `BITBUCKET_REPO_FULL_NAME`
- `BITBUCKET_GIT_SSH_ORIGIN`
- `BITBUCKET_COMMIT`
- `BITBUCKET_BRANCH`
- `BITBUCKET_TAG`

[Bitbucket Pipelines により提供されたビルド環境変数の完全リスト][1]


[1]: https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/
{{% /tab %}}
{{% tab "Buildkite" %}}

- `BUILDKITE`
- `BUILDKITE_PIPELINE_SLUG`
- `BUILDKITE_JOB_ID`
- `BUILDKITE_BUILD_ID`
- `BUILDKITE_BUILD_NUMBER`
- `BUILDKITE_BUILD_URL`
- `BUILDKITE_BUILD_CHECKOUT_PATH`
- `BUILDKITE_REPO`
- `BUILDKITE_COMMIT`
- `BUILDKITE_BRANCH`
- `BUILDKITE_TAG`
- `BUILDKITE_MESSAGE`
- `BUILDKITE_BUILD_AUTHOR`
- `BUILDKITE_BUILD_AUTHOR_EMAIL`
- `BUILDKITE_BUILD_CREATOR`
- `BUILDKITE_BUILD_CREATOR_EMAIL`

[Buildkite により提供されたビルド環境変数の完全リスト][1]


[1]: https://buildkite.com/docs/pipelines/environment-variables
{{% /tab %}}
{{% tab "CircleCI" %}}

- `CIRCLECI`
- `CIRCLE_PROJECT_REPONAME`
- `CIRCLE_BUILD_NUM`
- `CIRCLE_BUILD_URL`
- `CIRCLE_WORKFLOW_ID`
- `CIRCLE_WORKING_DIRECTORY`
- `CIRCLE_REPOSITORY_URL`
- `CIRCLE_SHA1`
- `CIRCLE_BRANCH`
- `CIRCLE_TAG`
- `CIRCLE_JOB`

[CircleCI により提供されたビルド環境変数の完全リスト][1]


[1]: https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables
{{% /tab %}}
{{% tab "GitHub Actions" %}}

- `GITHUB_ACTION`
- `GITHUB_SERVER_URL`
- `GITHUB_RUN_ID`
- `GITHUB_RUN_NUMBER`
- `GITHUB_RUN_ATTEMPT`
- `GITHUB_WORKFLOW`
- `GITHUB_WORKSPACE`
- `GITHUB_REPOSITORY`
- `GITHUB_SHA`
- `GITHUB_HEAD_REF`
- `GITHUB_REF`

[GitHub Actions により提供されたビルド環境変数の完全リスト][1]


[1]: https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables#default-environment-variables
{{% /tab %}}
{{% tab "GitLab CI" %}}

- `GITLAB_CI`
- `CI_PIPELINE_ID`
- `CI_PIPELINE_URL`
- `CI_PIPELINE_IID`
- `CI_PROJECT_PATH`
- `CI_PROJECT_DIR`
- `CI_JOB_STAGE`
- `CI_JOB_NAME`
- `CI_JOB_URL`
- `CI_REPOSITORY_URL`
- `CI_COMMIT_SHA`
- `CI_COMMIT_REF_NAME`
- `CI_COMMIT_BRANCH`
- `CI_COMMIT_TAG`
- `CI_COMMIT_AUTHOR`
- `CI_COMMIT_MESSAGE`
- `CI_COMMIT_TIMESTAMP`

[GitLab CI により提供されたビルド環境変数の完全リスト][1]


[1]: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
{{% /tab %}}
{{% tab "Jenkins" %}}

- `JENKINS_URL`
- `BUILD_TAG`
- `BUILD_NUMBER`
- `BUILD_URL`
- `WORKSPACE`
- `JOB_NAME`
- `JOB_URL`
- `GIT_URL`
- `GIT_COMMIT`
- `GIT_BRANCH`

[Jenkins により提供されたビルド環境変数の完全リスト][1]


[1]: https://wiki.jenkins.io/display/JENKINS/Building+a+software+project
{{% /tab %}}

{{% tab "TeamCity" %}}

- `TEAMCITY_VERSION`
- `BUILD_VCS_NUMBER`
- `BUILD_VCS_URL`
- `BUILD_ID`
- `BUILD_NUMBER`
- `SERVER_URL`
- `BUILD_ID`
- `BUILD_CHECKOUTDIR`

[TeamCity により提供されたビルド環境変数の完全リスト][1]


[1]: https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html
{{% /tab %}}
{{% tab "Travis CI" %}}

- `TRAVIS`
- `TRAVIS_BUILD_ID`
- `TRAVIS_BUILD_NUMBER`
- `TRAVIS_BUILD_WEB_URL`
- `TRAVIS_BUILD_DIR`
- `TRAVIS_JOB_WEB_URL`
- `TRAVIS_REPO_SLUG`
- `TRAVIS_COMMIT`
- `TRAVIS_BRANCH`
- `TRAVIS_TAG`
- `TRAVIS_PULL_REQUEST_SLUG`
- `TRAVIS_PULL_REQUEST_BRANCH`
- `TRAVIS_COMMIT_MESSAGE`

[Travis CI により提供されたビルド環境変数の完全リスト][1]


[1]: https://docs.travis-ci.com/user/environment-variables/#default-environment-variables
{{% /tab %}}
{{% tab "Bitrise" %}}

- `BITRISE_BUILD_SLUG`
- `BITRISE_TRIGGERED_WORKFLOW_ID`
- `BITRISE_BUILD_NUMBER`
- `BITRISE_BUILD_URL`
- `BITRISE_SOURCE_DIR`
- `GIT_REPOSITORY_URL`
- `BITRISE_GIT_COMMIT`
- `GIT_CLONE_COMMIT_HASH`
- `BITRISEIO_GIT_BRANCH_DEST`
- `BITRISE_GIT_BRANCH`
- `BITRISE_GIT_TAG`
- `BITRISE_GIT_MESSAGE`
- `GIT_CLONE_COMMIT_MESSAGE_SUBJECT`
- `GIT_CLONE_COMMIT_MESSAGE_BODY`
- `GIT_CLONE_COMMIT_AUTHOR_NAME`
- `GIT_CLONE_COMMIT_AUTHOR_EMAIL`
- `GIT_CLONE_COMMIT_COMMITER_NAME`

[Bitrise により提供されたビルド環境変数の完全リスト][1]


[1]: https://devcenter.bitrise.io/en/references/available-environment-variables.html
{{% /tab %}}
{{< /tabs >}}

[1]: https://docs.docker.com/engine/reference/run/
[2]: https://docs.docker.com/compose/reference/
[3]: /ja/continuous_integration/setup_tests/