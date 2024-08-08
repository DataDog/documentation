---
title: Tests in Containers
aliases:
  - /continuous_integration/setup_tests/containers
  - /continuous_integration/tests/containers
further_reading:
- link: "/tests"
  tag: "Documentation"
  text: "Learn about Test Visibility"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Test Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

If you run your tests inside a container that you launch yourself within the build (for example, using [`docker run`][1] or [`docker-compose`][2]), forward the following environment variables to the container depending on your CI provider. This enables the Datadog tracer to autodetect the build information.

Additionally, you need to pass in the environment variables required to configure the tracer as described in the [per-language test instrumentation instructions][3] (such as `DD_SERVICE`, `DD_ENV`, and a valid `DD_TRACE_AGENT_URL` that is accessible from within the container).

## Manage environment variables

This table provides a non-exhaustive list of environment variables available for configuring the tracer:

{{< tabs >}}
{{% tab "AppVeyor" %}}

| Environment Variable                          | Description                                                                                                 |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `APPVEYOR`                                   | Indicates if the build is running in the AppVeyor environment. Set to `True` (or `true` on Ubuntu image).    |
| `APPVEYOR_BUILD_ID`                          | A unique identifier for the AppVeyor build.                                                                  |
| `APPVEYOR_BUILD_NUMBER`                      | The build number assigned by AppVeyor, which increments with each new build.                                  |
| `APPVEYOR_BUILD_FOLDER`                      | The path to the directory where the repository is cloned.                                                     |
| `APPVEYOR_REPO_PROVIDER`                     | Specifies the source control provider for the repository, such as `github`, `bitbucket`, or `kiln`.         |
| `APPVEYOR_REPO_NAME`                         | The name of the repository in the format `owner-name/repo-name`.                                              |
| `APPVEYOR_REPO_BRANCH`                       | The branch of the repository being built. For pull requests, it is the base branch the PR is merging into.    |
| `APPVEYOR_REPO_COMMIT`                       | The commit ID (SHA) of the current build.                                                                     |
| `APPVEYOR_REPO_TAG_NAME`                     | The tag name for builds started by a tag. This variable is undefined if the build is not triggered by a tag.  |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH`     | The branch of the repository from which the pull request originated.                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE`               | The commit message associated with the current build.                                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`      | The extended commit message, including any text after the first line break.                                   |
| `APPVEYOR_REPO_COMMIT_AUTHOR`                | The name of the author of the commit.                                                                         |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`          | The email address of the commit author.                                                                       |

For a comprehensive list of environment variables set by AppVeyor for every build, see the [official AppVeyor documentation][101].


[101]: https://www.appveyor.com/docs/environment-variables/

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| Environment Variable                  | Description                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `TF_BUILD`                                | Indicates that the build is running in Azure Pipelines.                                                     |
| `BUILD_DEFINITIONNAME`                    | The name of the build pipeline.                                                                             |
| `BUILD_BUILDID`                           | The ID of the record for the completed build.                                                               |
| `BUILD_SOURCESDIRECTORY`                  | The local path on the agent where your source code files are downloaded.                                     |
| `BUILD_REPOSITORY_URI`                    | The URL for the triggering repository.                                                                      |
| `BUILD_SOURCEBRANCH`                      | The branch of the triggering repo the build was queued for.                                                 |
| `BUILD_SOURCEVERSION`                     | The latest version control change of the triggering repo that is included in this build.                    |
| `BUILD_SOURCEVERSIONMESSAGE`              | The comment of the commit or changeset for the triggering repo.                                             |
| `BUILD_REQUESTEDFORID`                    | The ID of the user who triggered the build.                                                                 |
| `BUILD_REQUESTEDFOREMAIL`                 | The email of the user who triggered the build.                                                              |
| `SYSTEM_TEAMFOUNDATIONSERVERURI`          | The URI for the Team Foundation Server or Azure DevOps Services account.                                    |
| `SYSTEM_TEAMPROJECTID`                    | The ID of the team project for the build.                                                                   |
| `SYSTEM_JOBID`                            | The ID of the job being executed.                                                                           |
| `SYSTEM_TASKINSTANCEID`                   | The ID of the task instance within the job.                                                                 |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI`  | The URL of the source repository for the pull request.                                                      |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH`         | The source branch of the pull request.                                                                      |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID`       | The commit ID of the source branch in the pull request.                                                     |
| `SYSTEM_STAGEDISPLAYNAME`                 | The display name of the stage in the pipeline.                                                              |
| `SYSTEM_JOBDISPLAYNAME`                   | The display name of the job in the pipeline.                                                                |

For a comprehensive list of environment variables set by Azure DevOps Pipelines for every build, see the [official Azure documentation][101].


[101]: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops
{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

| Environment Variable               | Description                                                                                                                                                      |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BITBUCKET_PIPELINE_UUID`          | The UUID of the pipeline.                                                                                                                                        |
| `BITBUCKET_BUILD_NUMBER`           | The unique identifier for a build. It increments with each build and can be used to create unique artifact names.                                                |
| `BITBUCKET_CLONE_DIR`              | The absolute path of the directory that the repository is cloned into within the Docker container.                                                                |
| `BITBUCKET_REPO_FULL_NAME`         | The full name of the repository (everything that comes after http://bitbucket.org/).                                                                             |
| `BITBUCKET_GIT_SSH_ORIGIN`         | Your SSH origin, for example: `git@bitbucket.org:/<workspace>/<repo>.git`.                                                                                       |
| `BITBUCKET_COMMIT`                 | The commit hash of a commit that kicked off the build.                                                                                                           |
| `BITBUCKET_BRANCH`                 | The source branch. This value is only available on branches. Not available for builds against tags, or custom pipelines.                                         |
| `BITBUCKET_TAG`                    | The tag of a commit that kicked off the build. This value is only available on tags. Not available for builds against branches.                                  |


For a comprehensive list of environment variables set by Bitbucket for every build, see the [official Bitbucket documentation][101].

[101]: https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/

{{% /tab %}}
{{% tab "Bitrise" %}}

| Environment Variable                | Description                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `BITRISE_BUILD_SLUG`                | The slug that uniquely identifies a build on bitrise.io. It’s part of the build URL.                             |
| `BITRISE_TRIGGERED_WORKFLOW_ID`     | The ID of the Workflow that was triggered, exposed regardless of whether the Workflow was triggered manually or automatically. |
| `BITRISE_BUILD_NUMBER`              | Build number of the build on bitrise.io.                                                                         |
| `BITRISE_BUILD_URL`                 | The URL of the build on bitrise.io.                                                                              |
| `BITRISE_SOURCE_DIR`                | Path to the base working directory. By default, it’s the directory where Bitrise runs, unless you provide a different value. |
| `GIT_REPOSITORY_URL`                | The URL of the Git repository that hosts your app.                                                               |
| `BITRISE_GIT_COMMIT`                | The commit hash of the Git commit that triggered the build, when applicable.                                     |
| `GIT_CLONE_COMMIT_HASH`             | The hash of the commit that the build uses (the cloned commit).                                                  |
| `BITRISEIO_GIT_BRANCH_DEST`         | The destination or target branch of the pull request that triggered the build, used only with builds triggered by pull requests. |
| `BITRISE_GIT_BRANCH`                | The git branch that is built by Bitrise, for example, `main`.                                                    |
| `BITRISE_GIT_TAG`                   | If a build is triggered by a Git tag, this environment variable stores the tag used.                                          |
| `BITRISE_GIT_MESSAGE`               | The commit message, pull request title, or the message you specified if you triggered the build manually.        |
| `BITRISE_APP_TITLE`                 | The title of your app on bitrise.io.                                                                             |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT`  | The subject of the commit message of the cloned commit.                                                          |
| `GIT_CLONE_COMMIT_MESSAGE_BODY`     | The body (content) of the commit message of the cloned commit.                                                   |
| `GIT_CLONE_COMMIT_AUTHOR_NAME`      | The name of the author of the cloned commit.                                                                     |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL`     | The email of the author of the cloned commit.                                                                    |
| `GIT_CLONE_COMMIT_COMMITER_NAME`    | The name of the committer of the cloned commit.                                                                  |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL`   | The email of the committer of the cloned commit.                                                                 |


For a comprehensive list of environment variables set by Bitrise for every build, see the [official Bitrise documentation][101].


[101]: https://devcenter.bitrise.io/en/references/available-environment-variables.html

{{% /tab %}}
{{% tab "Buildkite" %}}

| Environment Variable          | Description                                                                                     |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| `BUILDKITE`                   | Always true.                                                                                   |
| `BUILDKITE_PIPELINE_SLUG`     | The pipeline slug on Buildkite as used in URLs.                                                 |
| `BUILDKITE_JOB_ID`            | The internal UUID Buildkite uses for this job.                                                   |
| `BUILDKITE_BUILD_ID`          | The UUID of the build.                                                                          |
| `BUILDKITE_BUILD_NUMBER`      | The build number. This number increases with every build and is unique within each pipeline.   |
| `BUILDKITE_BUILD_URL`         | The URL for this build on Buildkite.                                                             |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | The path where the agent has checked out your code for this build.                             |
| `BUILDKITE_REPO`              | The repository of your pipeline.                                                                  |
| `BUILDKITE_COMMIT`            | The git commit object of the build.                                                              |
| `BUILDKITE_BRANCH`            | The branch being built.                                                                         |
| `BUILDKITE_TAG`               | The name of the tag being built, if this build was triggered from a tag.                        |
| `BUILDKITE_MESSAGE`           | The message associated with the build, usually the commit message.                             |
| `BUILDKITE_BUILD_AUTHOR`      | The name of the user who authored the commit being built.                                      |
| `BUILDKITE_BUILD_AUTHOR_EMAIL`| The notification email of the user who authored the commit being built.                        |
| `BUILDKITE_BUILD_CREATOR`     | The name of the user who created the build.                                                     |
| `BUILDKITE_BUILD_CREATOR_EMAIL` | The notification email of the user who created the build.                                     |
| `BUILDKITE_AGENT_ID`          | The UUID of the agent.                                                                          |
| `BUILDKITE_AGENT_META_DATA_*` | The value of each agent tag. The tag name is appended to the end of the variable name.           |


For a comprehensive list of environment variables set by Buildkite for every build, see the [official Buildkite documentation][101].

[101]: https://buildkite.com/docs/pipelines/environment-variables

{{% /tab %}}
{{% tab "CircleCI" %}}

| Environment Variable         | Description                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CIRCLECI`                    | Indicates if the build is running in CircleCI. Always set to `true`.                                |
| `CIRCLE_PROJECT_REPONAME`     | The name of the repository being built.                                                               |
| `CIRCLE_BUILD_NUM`           | The number of the current job. Job numbers are unique for each job.                                  |
| `CIRCLE_BUILD_URL`           | The URL for the current job on CircleCI.                                                              |
| `CIRCLE_WORKFLOW_ID`         | A unique identifier for the workflow instance of the current job.                                      |
| `CIRCLE_WORKING_DIRECTORY`   | The path to the working directory where the code is checked out.                                       |
| `CIRCLE_REPOSITORY_URL`      | The URL of the repository being built.                                                                 |
| `CIRCLE_SHA1`                | The SHA1 hash of the last commit of the current build.                                                 |
| `CIRCLE_BRANCH`              | The branch of the repository being built.                                                              |
| `CIRCLE_TAG`                 | The tag name if the current build is triggered by a tag; otherwise, it is empty.                      |
| `CIRCLE_JOB`                 | The name of the current job.                                                                          |


For a comprehensive list of environment variables set by CircleCI for every build, see the [official CircleCI documentation][101].


[101]: https://circleci.com/docs/variables/

{{% /tab %}}
{{% tab "Codefresh" %}}

| Environment Variable         | Description                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CF_BUILD_ID`                | The unique ID of the build.                                                                           |
| `CF_PIPELINE_NAME`           | The full path of the pipeline, including the project to which it is assigned, if any.                 |
| `CF_BUILD_URL`               | The URL to the build in Codefresh.                                                                    |
| `CF_STEP_NAME`               | The name of the step, for example, "MyUnitTests".                                                     |
| `CF_BRANCH`                  | The branch name or tag of the Git repository associated with the main pipeline at the time of execution. |
| `CF_REVISION`                | The revision of the Git repository of the main pipeline, at the time of execution.                   |


For a comprehensive list of environment variables set by Codefresh for every build, see the [official Codefresh documentation][101].


[101]: https://codefresh.io/docs/docs/pipelines/variables/

{{% /tab %}}
{{% tab "GitHub Actions" %}}

| Environment Variable       | Description                                                                                           |
|----------------------------|-------------------------------------------------------------------------------------------------------|
| `CI`                       | Always set to `true`, indicating a CI environment.                                                   |
| `GITHUB_ACTION`            | The name of the action currently running, or the id of a step. For example: `repo-owner_name-of-action-repo`. |
| `GITHUB_ACTION_PATH`       | The path where an action is located (only supported in composite actions).                           |
| `GITHUB_ACTION_REPOSITORY` | The owner and repository name of the action being executed. For example: `actions/checkout`.              |
| `GITHUB_ACTIONS`           | Always set to `true` when GitHub Actions is running the workflow.                                    |
| `GITHUB_ACTOR`             | The name of the person or app that initiated the workflow. For example: `octocat`.                       |
| `GITHUB_ACTOR_ID`          | The account ID of the person or app that triggered the workflow. For example: `1234567`.                 |
| `GITHUB_API_URL`           | The API URL. For example: `https://api.github.com`.                                                      |
| `GITHUB_BASE_REF`          | The base ref or target branch of the pull request (only set for `pull_request` or `pull_request_target` events). For example: `main`. |
| `GITHUB_ENV`               | The path to the file that sets environment variables from workflow commands.                         |
| `GITHUB_EVENT_NAME`        | The name of the event that triggered the workflow. For example: `workflow_dispatch`.                     |
| `GITHUB_EVENT_PATH`        | The path to the file containing the full event webhook payload.                                      |
| `GITHUB_GRAPHQL_URL`       | The GraphQL API URL. For example: `https://api.github.com/graphql`.                                      |
| `GITHUB_HEAD_REF`          | The head ref or source branch of the pull request (only set for `pull_request` or `pull_request_target` events). For example: `feature-branch-1`. |
| `GITHUB_JOB`               | The job ID of the current job. For example: `greeting_job`.                                              |
| `GITHUB_OUTPUT`            | The path to the file that sets the current step's outputs from workflow commands.                    |
| `GITHUB_PATH`              | The path to the file that sets system PATH variables from workflow commands.                         |
| `GITHUB_REF`               | The fully-formed ref of the branch or tag that triggered the workflow. For example: `refs/heads/feature-branch-1`. |
| `GITHUB_REF_NAME`          | The short ref name of the branch or tag that triggered the workflow. For example: `feature-branch-1`.     |
| `GITHUB_REF_PROTECTED`     | `true` if branch protections or rulesets are configured for the ref that triggered the workflow run. |
| `GITHUB_REF_TYPE`          | The type of ref that triggered the workflow. Valid values are `branch` or `tag`.                     |
| `GITHUB_REPOSITORY`        | The owner and repository name. For example: `octocat/Hello-World`.                                        |
| `GITHUB_REPOSITORY_ID`     | The ID of the repository. For example: `123456789`.                                                      |
| `GITHUB_REPOSITORY_OWNER`  | The repository owner's name. For example: `octocat`.                                                     |
| `GITHUB_REPOSITORY_OWNER_ID` | The repository owner's account ID. For example: `1234567`.                                              |
| `GITHUB_RETENTION_DAYS`    | The number of days that workflow run logs and artifacts are kept. For example: `90`.                     |
| `GITHUB_RUN_ATTEMPT`       | A unique number for each attempt of a particular workflow run. For example: `3`.                         |
| `GITHUB_RUN_ID`            | A unique number for each workflow run within a repository. For example: `1658821493`.                    |
| `GITHUB_RUN_NUMBER`        | A unique number for each run of a particular workflow in a repository. For example: `3`.                 |
| `GITHUB_SERVER_URL`        | The URL of the GitHub server. For example: `https://github.com`.                                         |
| `GITHUB_SHA`               | The commit SHA that triggered the workflow. For example: `ffac537e6cbbf934b08745a378932722df287a53`.    |
| `GITHUB_STEP_SUMMARY`      | The path to the file that contains job summaries from workflow commands.                             |
| `GITHUB_TRIGGERING_ACTOR`  | The username of the user that initiated the workflow run.                                            |
| `GITHUB_WORKFLOW`          | The name of the workflow. For example: `My test workflow`.                                               |
| `GITHUB_WORKFLOW_REF`      | The ref path to the workflow. For example: `octocat/hello-world/.github/workflows/my-workflow.yml@refs/heads/my_branch`. |
| `GITHUB_WORKFLOW_SHA`      | The commit SHA for the workflow file.                                                                 |
| `GITHUB_WORKSPACE`         | The default working directory on the runner for steps. For example: `/home/runner/work/my-repo-name/my-repo-name`. |
| `RUNNER_ARCH`              | The architecture of the runner executing the job. Possible values are `X86`, `X64`, `ARM`, `ARM64`. |
| `RUNNER_DEBUG`             | Set to `1` if debug logging is enabled.                                                             |
| `RUNNER_ENVIRONMENT`       | The environment of the runner executing the job. Possible values are `github-hosted` or `self-hosted`. |
| `RUNNER_NAME`              | The name of the runner executing the job. For example: `Hosted Agent`.                                   |
| `RUNNER_OS`                | The operating system of the runner executing the job. Possible values are `Linux`, `Windows`, `macOS`.|
| `RUNNER_TEMP`              | The path to a temporary directory on the runner. For example: `D:\a\_temp`.                             |
| `RUNNER_TOOL_CACHE`        | The path to the directory containing preinstalled tools for GitHub-hosted runners. For example: `C:\hostedtoolcache\windows`. |


For a comprehensive list of environment variables set by GitHub Actions for every build, see the [official GitHub documentation][101].


[101]: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/variables#default-environment-variables

{{% /tab %}}
{{% tab "GitLab CI" %}}

| Variable              | Description                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `GITLAB_CI`           | Available for all jobs executed in CI/CD. `true` when available.                                        |
| `CI_PIPELINE_ID`      | The instance-level ID of the current pipeline. This ID is unique across all projects on the GitLab instance. |
| `CI_PIPELINE_URL`     | The URL for the pipeline details.                                                                       |
| `CI_PIPELINE_IID`     | The project-level IID (internal ID) of the current pipeline. Unique only within the current project.      |
| `CI_PROJECT_PATH`     | The project namespace with the project name included.                                                     |
| `CI_PROJECT_DIR`      | The full path the repository is cloned to, and where the job runs from.                                   |
| `CI_JOB_STAGE`        | The name of the job’s stage.                                                                            |
| `CI_JOB_NAME`         | The name of the job.                                                                                     |
| `CI_JOB_URL`          | The job details URL.                                                                                     |
| `CI_JOB_ID`           | The internal ID of the job, unique across all jobs in the GitLab instance.                               |
| `CI_RUNNER_ID`        | The unique ID of the runner being used.                                                                  |
| `CI_RUNNER_TAGS`      | A comma-separated list of the runner tags.                                                              |
| `CI_REPOSITORY_URL`   | The full path to Git clone (HTTP) the repository with a CI/CD job token.                                  |
| `CI_COMMIT_SHA`       | The commit revision the project is built for.                                                            |
| `CI_COMMIT_REF_NAME`  | The branch or tag name for which project is built.                                                        |
| `CI_COMMIT_BRANCH`    | The commit branch name. Available in branch pipelines.                                                   |
| `CI_COMMIT_TAG`       | The commit tag name. Available only in pipelines for tags.                                               |
| `CI_COMMIT_AUTHOR`    | The author of the commit in Name <email> format.                                                         |
| `CI_COMMIT_MESSAGE`   | The full commit message.                                                                               |
| `CI_COMMIT_TIMESTAMP` | The timestamp of the commit in the ISO 8601 format. For example, 2022-01-31T16:47:55Z. UTC by default.  |


For a comprehensive list of environment variables set by GitLab CI for every build, see the [official GitLab documentation][101].


[101]: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
{{% /tab %}}
{{% tab "Jenkins" %}}

| Variable              | Description                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `JENKINS_URL`         | The URL of the Jenkins master that's running the build.                                                 |
| `BUILD_TAG`           | A string of the form `jenkins-${JOB_NAME}-${BUILD_NUMBER}` for easier identification.                    |
| `BUILD_NUMBER`        | The current build number, such as "153".                                                                 |
| `BUILD_URL`           | The URL where the results of this build can be found (such as http://buildserver/jenkins/job/MyJobName/666/).|
| `WORKSPACE`           | The absolute path of the workspace.                                                                       |
| `JOB_NAME`            | The name of the project for this build.                                                                  |
| `JOB_URL`             | The URL for the job details.                                                                            |
| `GIT_URL`             | The Git URL used for the repository (such as git@github.com:user/repo.git or https://github.com/user/repo.git).|
| `GIT_URL_1`           | The URL of the first Git repository if multiple repositories are configured.                            |
| `GIT_COMMIT`          | The Git hash of the commit checked out for the build.                                                    |
| `GIT_BRANCH`          | The Git branch that was checked out for the build.                                                       |
| `NODE_NAME`           | The name of the node the build is running on. Equals 'master' for the master node.                       |
| `NODE_LABELS`         | A comma-separated list of labels assigned to the node.                                                   |
| `DD_CUSTOM_TRACE_ID`  | Custom variable set by the Jenkins Datadog Plugin for trace IDs.                                        |
| `DD_CUSTOM_PARENT_ID` | Custom variable set by the Jenkins Datadog Plugin for parent IDs.                                        |


For a comprehensive list of environment variables set by Jenkins for every build, see the [official Jenkins documentation][101].


[101]: https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables
[102]: https://github.com/jenkinsci/datadog-plugin

{{% /tab %}}
{{% tab "TeamCity" %}}

| Variable                     | Description                                                                                                  |
|------------------------------|--------------------------------------------------------------------------------------------------------------|
| `TEAMCITY_VERSION`           | The version of the TeamCity server.                                                                        |
| `TEAMCITY_BUILDCONF_NAME`    | The name of the build configuration the current build belongs to.                                           |
| `BUILD_URL`                  | The link to the current build.                                                                             |
| `DATADOG_BUILD_ID`           | Custom variable set by the [Datadog TeamCity Integration][102].                                             |

For a comprehensive list of environment variables set by TeamCity for every build, see the [official TeamCity documentation][101].


[101]: https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html
[102]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration

{{% /tab %}}
{{% tab "Travis CI" %}}

| Variable                     | Description                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `TRAVIS`                     | Always set to `true` to indicate that the build is running on Travis CI.                            |
| `TRAVIS_BUILD_ID`            | The ID of the current build used internally by Travis CI.                                            |
| `TRAVIS_BUILD_NUMBER`        | The number of the current build (such as “4”).                                                         |
| `TRAVIS_BUILD_WEB_URL`       | URL to the build log.                                                                               |
| `TRAVIS_BUILD_DIR`           | The absolute path to the directory where the repository being built has been copied on the worker.   |
| `TRAVIS_JOB_WEB_URL`         | URL to the job log.                                                                                  |
| `TRAVIS_REPO_SLUG`           | The slug (in form: owner_name/repo_name) of the repository currently being built.                    |
| `TRAVIS_COMMIT`              | The commit that the current build is testing.                                                         |
| `TRAVIS_BRANCH`             | For push builds, the name of the branch. For PR builds, the name of the branch targeted by the PR.   |
| `TRAVIS_TAG`                 | If the current build is for a git tag, this variable is set to the tag’s name, otherwise it is empty.|
| `TRAVIS_PULL_REQUEST_SLUG`   | If the current job is a pull request, the slug of the repository from which the PR originated.        |
| `TRAVIS_PULL_REQUEST_BRANCH` | If the current job is a pull request, the name of the branch from which the PR originated.            |
| `TRAVIS_COMMIT_MESSAGE`      | The commit subject and body, unwrapped.                                                               |
| `TRAVIS_ALLOW_FAILURE`       | Set to `true` if the job is allowed to fail, `false` otherwise.                                       |
| `TRAVIS_APP_HOST`            | The name of the server compiling the build script.                                                   |
| `TRAVIS_COMMIT_RANGE`        | The range of commits included in the push or pull request.                                           |
| `TRAVIS_COMPILER`            | Indicates the compiler used by the current job (such as clang, gcc).                                   |
| `TRAVIS_DEBUG_MODE`          | Set to `true` if the job is running in debug mode.                                                    |
| `TRAVIS_DIST`                | Indicates the distribution the current job is running on.                                            |
| `TRAVIS_EVENT_TYPE`          | Indicates how the build was triggered. Possible values are `push`, `pull_request`, `api`, `cron`.   |
| `TRAVIS_JOB_ID`              | The ID of the current job used internally by Travis CI.                                              |
| `TRAVIS_JOB_NAME`            | The job name if it was specified, or `""`.                                                             |
| `TRAVIS_JOB_NUMBER`          | The number of the current job (such as “4.1”).                                                          |
| `TRAVIS_OS_NAME`             | On multi-OS builds, this value indicates the platform the job is running on (such as `linux`, `osx`). |
| `TRAVIS_CPU_ARCH`            | On multi-arch builds, this value indicates the CPU architecture (such as `amd64`, `arm64`).           |
| `TRAVIS_OSX_IMAGE`           | The `osx_image` value configured in `.travis.yml`.                                                    |
| `TRAVIS_PULL_REQUEST`        | The pull request number if the current job is a pull request, `false` if it’s not a pull request.    |
| `TRAVIS_PULL_REQUEST_SHA`    | The commit SHA of the HEAD commit of the PR if the job is a pull request.                            |
| `TRAVIS_PULL_REQUEST_IS_DRAFT` | Set to `true` if the PR is in a draft state, `false` if it is not.                                    |
| `TRAVIS_SECURE_ENV_VARS`     | Set to `true` if there are any encrypted environment variables, `false` otherwise.                   |
| `TRAVIS_SUDO`                | `true` or `false` based on whether `sudo` is enabled.                                                 |
| `TRAVIS_TEST_RESULT`         | `0` if all commands in the script section have exited with zero, `1` otherwise.                     |
| `TRAVIS_BUILD_STAGE_NAME`    | The build stage. If a build does not use build stages, this variable is empty.                       |
| `TRAVIS_JOB_RESTARTED`       | Set to `true` if the build is restarted, `false` otherwise.                                           |
| `TRAVIS_JOB_RESTARTED_BY`    | The login of the user triggering the restart.                                                         |


For a comprehensive list of environment variables set by Travis CI for every build, see the [official Travis CI documentation][101].


[101]: https://docs.travis-ci.com/user/environment-variables/#default-environment-variables

{{% /tab %}}
{{% tab "Buddy CI" %}}

| Variable                                | Description                                                                                           |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| `BUDDY`                                 | Represents whether the current environment is a Buddy environment. For example: `true`.    |
| `BUDDY_SCM_URL`                         | The URL of the repository synchronized with the project. For example: `https://github.com/githubaccount/repository`. |
| `BUDDY_EXECUTION_REVISION`              | The SHA1 hash of the commit of the current pipeline run. For example: `46c360492d6372e5335300776806af412755871`. |
| `BUDDY_EXECUTION_BRANCH`                | The name of the Git branch of the current pipeline run. For example: `master`.             |
| `BUDDY_EXECUTION_TAG`                   | The name of the Git tag of the current pipeline run (if tagged). For example: `v1.0.1`.    |
| `BUDDY_PIPELINE_ID`                     | The ID of the run pipeline. For example: `1`.                                             |
| `BUDDY_EXECUTION_ID`                    | The ID of the current pipeline run. For example: `1`.                                     |
| `BUDDY_PIPELINE_NAME`                   | The name of the run pipeline. For example: `Deploy to Production`.                        |
| `BUDDY_EXECUTION_URL`                   | The URL of the current pipeline run. For example: `https://app.buddy.works/my-workspace/my-project/pipelines/pipeline/1`. |
| `BUDDY_EXECUTION_REVISION_MESSAGE`      | The commit message of the currently run revision. For example: `we need to write unit tests!`. |
| `BUDDY_EXECUTION_REVISION_COMMITTER_NAME` | The name of the committer of the currently run revision. For example: `Mike Benson`.      |
| `BUDDY_EXECUTION_REVISION_COMMITTER_EMAIL` | The email address of the committer of the currently run revision. For example: `mike.benson@buddy.works`. |


</br>

For a comprehensive list of environment variables set by Buddy CI for every build, see the [official Buddy CI documentation][101].


[101]: https://buddy.works/docs/pipelines/environment-variables#default-environment-variables
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/engine/reference/run/
[2]: https://docs.docker.com/compose/reference/
[3]: /tests/#setup
