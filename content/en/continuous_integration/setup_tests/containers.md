---
title: Tests in Containers
kind: documentation
---

If you run your tests inside a container that you launch yourself within the build (for example, from a Docker Compose file), forward the following environment variables depending on your CI provider, so the Datadog tracer can autodetect the build information.

Additionally, forward all environment variables used to configure the Datadog tracer (such as `DD_SERVICE` or `DD_AGENT_HOST`). 

Forwarding environment variables is not required if the CI provider itself launches the container, because in that case all environment variables are set and available to the tracer.

## [Appveyor][1]

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

## [Azure pipelines][2]

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

## [BitBucket][3]

- `BITBUCKET_PIPELINE_UUID`
- `BITBUCKET_BUILD_NUMBER`
- `BITBUCKET_CLONE_DIR`
- `BITBUCKET_REPO_FULL_NAME`
- `BITBUCKET_GIT_SSH_ORIGIN`
- `BITBUCKET_COMMIT`
- `BITBUCKET_BRANCH`
- `BITBUCKET_TAG`

## [BuildKite][4]

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

## [CircleCI][5]
`
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

## [GitHub Actions][6]

- `GITHUB_ACTION`
- `GITHUB_RUN_ID`
- `GITHUB_RUN_NUMBER`
- `GITHUB_WORKFLOW`
- `GITHUB_WORKSPACE`
- `GITHUB_REPOSITORY`
- `GITHUB_SHA`
- `GITHUB_HEAD_REF`
- `GITHUB_REF`

## [GitLab][7]

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

## [Jenkins][8]

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

## [TravisCI][9]

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


[1]: https://www.appveyor.com/docs/environment-variables/
[2]: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops
[3]: https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/
[4]: https://buildkite.com/docs/pipelines/environment-variables
[5]: https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables
[6]: https://docs.github.com/en/free-pro-team@latest/actions/reference/environment-variables#default-environment-variables
[7]: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
[8]: https://wiki.jenkins.io/display/JENKINS/Building+a+software+project
[9]: https://docs.travis-ci.com/user/environment-variables/#default-environment-variables
