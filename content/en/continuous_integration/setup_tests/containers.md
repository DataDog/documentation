---
title: Tests in Containers
kind: documentation
---

If you run your tests inside a container that you launch yourself within the build (for example, using [`docker run`][1] or [`docker-compose`][2]), forward the following environment variables to the container depending on your CI provider. This enables the Datadog tracer to autodetect the build information.

Additionally, you need to pass in the environment variables required to configure the tracer as described in the [per-language test instrumentation instructions][3] (such as `DD_SERVICE`, `DD_ENV`, and a valid `DD_TRACE_AGENT_URL` that is accessible from within the container).

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

[Full list of build environment variables provided by AppVeyor][1]


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
- `BUILD_SOURCEBRANCH`
- `BUILD_SOURCEVERSION`
- `SYSTEM_TEAMFOUNDATIONSERVERURI`
- `SYSTEM_TEAMPROJECT`
- `SYSTEM_JOBID`
- `SYSTEM_TASKINSTANCEID`
- `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI`
- `SYSTEM_PULLREQUEST_SOURCEBRANCH`
- `SYSTEM_PULLREQUEST_SOURCECOMMITID`

[Full list of build environment variables provided by Azure Pipelines][1]


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

[Full list of build environment variables provided by Bitbucket Pipelines][1]


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

[Full list of build environment variables provided by Buildkite][1]


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

[Full list of build environment variables provided by CircleCI][1]


[1]: https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables
{{% /tab %}}
{{% tab "GitHub Actions" %}}

- `GITHUB_ACTION`
- `GITHUB_RUN_ID`
- `GITHUB_RUN_NUMBER`
- `GITHUB_WORKFLOW`
- `GITHUB_WORKSPACE`
- `GITHUB_REPOSITORY`
- `GITHUB_SHA`
- `GITHUB_HEAD_REF`
- `GITHUB_REF`

[Full list of build environment variables provided by GitHub Actions][1]


[1]: https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables#default-environment-variables
{{% /tab %}}
{{% tab "GitLab CI" %}}

- `GITLAB_CI`
- `CI_PIPELINE_ID`
- `CI_PIPELINE_URL`
- `CI_PIPELINE_IID`
- `CI_PROJECT_PATH`
- `CI_PROJECT_DIR`
- `CI_JOB_URL`
- `CI_REPOSITORY_URL`
- `CI_COMMIT_SHA`
- `CI_COMMIT_BRANCH`
- `CI_COMMIT_TAG`

[Full list of build environment variables provided by GitLab CI][1]


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

[Full list of build environment variables provided by Jenkins][1]


[1]: https://wiki.jenkins.io/display/JENKINS/Building+a+software+project
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

[Full list of build environment variables provided by Travis CI][1]


[1]: https://docs.travis-ci.com/user/environment-variables/#default-environment-variables
{{% /tab %}}
{{< /tabs >}}

[1]: https://docs.docker.com/engine/reference/run/
[2]: https://docs.docker.com/compose/reference/
[3]: /continuous_integration/setup_tests/
