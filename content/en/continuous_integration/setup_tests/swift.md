---
title: Swift Tests
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="us,eu" >}}
## Compatibility

Supported languages:
* Swift >= 5.2
* Objective-C >= 2.0

Supported platforms:
* iOS >= 12.0
* macOS >= 10.13
* tvOS >= 12.0

## Installing the Swift testing SDK

There are two ways of installing the testing framework:

{{< tabs >}}
{{% tab "Using Swift Package Manager" %}}

1. Add `dd-sdk-swift-testing` package to your project. It is located at [`https://github.com/DataDog/dd-sdk-swift-testing`][1].

{{< img src="continuous_integration/swift_package.png" alt="Swift Package" >}}


2. Link your test targets with the library `DatadogSDKTesting` from the package.

{{< img src="continuous_integration/swift_link2.png" alt="Swift Linking SPM" >}}

3. If you run UITests, also link the app running the tests with this library.


[1]: https://github.com/DataDog/dd-sdk-swift-testing
{{% /tab %}}
{{% tab "Adding the framework directly" %}}

1. Download and decompress `DatadogSDKTesting.zip` from the [release][1] page.

2. Copy and link your test targets with the resulting XCFramework.

{{< img src="continuous_integration/swift_link.png" alt="Swift Linking XCFramework" >}}

3. If you run UITests, also link the app running the tests with this library.


[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{< /tabs >}}


## Instrumenting your tests

### Configuring Datadog

To enable testing instrumentation, add the following environment variables to your test target. You must also select your main target in `Expand variables based on` or `Target for Variable Expansion` if using test plans:

{{< img src="continuous_integration/swift_env.png" alt="Swift Environments" >}}

For UITests, environment variables need to be set only in the test target, because the framework automatically injects these values to the application.

Set all these variables in your test target:

`DD_TEST_RUNNER`
: Enables or disables the instrumentation of tests. Set this value to `$(DD_TEST_RUNNER)` so you can enable and disable test instrumentation with a environment variable defined outside of the test process (for example, in the CI build).<br/>
**Default**: `false`<br/>
**Recommended**: `$(DD_TEST_RUNNER)`<br/>
**Example**: `true`

`DATADOG_CLIENT_TOKEN`
: The [Datadog Client Token][1] to use to report test results.<br/>
**Default**: `(empty)`<br/>
**Example**: `pub0zxxxyyyxxxyyxxxzzxxyyxxxyyy`

`DD_SERVICE`
: Name of the service or library under test.<br/>
**Default**: The repository name<br/>
**Example**: `my-ios-app`

`DD_ENV`
: Name of the environment where tests are being run. Set this value to `$(DD_ENV)` so you can use an environment variable at runtime for setting it.<br/>
**Default**: `none`<br/>
**Recommended**: `$(DD_ENV)`<br/>
**Examples**: `ci`, `local`

`SRCROOT`
: The path to the project SRCROOT environment variable. Use `$(SRCROOT)` for the value, because it is automatically set by Xcode.<br/>
**Default**: `(empty)`<br/>
**Recommended**: `$(SRCROOT)`<br/>
**Example**: `/Users/ci/source/MyApp`

{{< site-region region="eu" >}}
Additionally, configure the Datadog site to use the selected one ({{< region-param key="dd_site_name" >}}):

`DD_SITE` (Required)
: The [Datadog site][1] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

[1]: /getting_started/site/
{{< /site-region >}}

### Collecting Git and build metadata

Git metadata and build information is automatically collected using CI provider environment variables, that must be forwarded to the test application (see the section [CI provider environment variables](#CI-provider-environment-variables) below for a full list).

When running tests in a simulator, full Git metadata is collected using the local `.git` folder. In this case, Git-related environment variables don't have to be forwarded.

The user can also provide Git information by using custom environment variables. This is useful for adding Git information for non-supported CI providers, or for .git folders that are not available from the running process. Custom environment variables are also useful for overwriting existing Git information. If these environment variables are set, they take precedence over those coming from the CI or from the .git folder. The list of supported environment variables for Git information includes the following:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored.

`DD_GIT_BRANCH`
: Branch where this commit belongs.

`DD_GIT_TAG`
: Tag of the commit, if it has one.

`DD_GIT_COMMIT_SHA`
: Commit SHA.

`DD_GIT_COMMIT_MESSAGE`
: Commit message.

`DD_GIT_COMMIT_AUTHOR_NAME`
: Author name.

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Author email.

`DD_GIT_COMMIT_AUTHOR_DATE`
: Author date. ISO 8601 format.

`DD_GIT_COMMIT_COMMITTER_NAME`
: Committer name.

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Committer email.

`DD_GIT_COMMIT_COMMITTER_DATE`
: Committer date. ISO 8601 format.

### Running tests

After installation, run your tests as you normally do, for example using the `xcodebuild test` command. Tests, network requests, and application logs are instrumented automatically. Pass your environment variables when running your tests in the CI, for example:

{{< site-region region="us" >}}
{{< code-block lang="bash" >}}
DD_TEST_RUNNER=1 DD_ENV=ci xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=x86_64" \
  test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="eu" >}}
{{< code-block lang="bash" >}}
DD_TEST_RUNNER=1 DD_ENV=ci DD_SITE=datadoghq.eu xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=x86_64" \
  test
{{< /code-block >}}
{{< /site-region >}}

### UI tests

For UITests, both the test target and the application running from the UITests must link with the framework. Environment variables need to be set only in the test target, because the framework automatically injects these values to the application.

## Additional optional configuration

For the following configuration settings:
 - `Boolean` variables can use any of: `1`, `0`, `true`, `false`, `YES`, or `NO`
 - `String` list variables accept a list of elements separated by `,` or `;`

### Disabling auto-instrumentation

The framework enables auto-instrumentation of all supported libraries, but in some cases this might not be desired. You can disable auto-instrumentation of certain libraries by setting the following environment variables:

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: Disables all network instrumentation (Boolean)

`DD_DISABLE_STDOUT_INSTRUMENTATION`
: Disables all `stdout` instrumentation (Boolean)

`DD_DISABLE_STDERR_INSTRUMENTATION`
: Disables all `stderr` instrumentation (Boolean)

`DD_DISABLE_SDKIOS_INTEGRATION`
: Disables integration with `dd-sdk-ios` logs and traces (Boolean)

`DD_DISABLE_CRASH_HANDLER`
: Disables crash handling and reporting. (Boolean)
<div class="alert alert-warning"><strong>Important</strong>: If you disable crash reporting, tests that crash are not reported at all, and don't appear as test failures. If you need to disable crash handling for any of your tests, run them as a separate target, so you don't disable it for the others.</div>

### Network auto-instrumentation

For Network auto-instrumentation, you can configure these additional settings:

`DD_DISABLE_HEADERS_INJECTION`
: Disables all injection of tracing headers (Boolean)

`DD_INSTRUMENTATION_EXTRA_HEADERS`
: Specific extra headers that you want to log (String List)

`DD_EXCLUDED_URLS`
: URLs that you don't want to log or inject headers into (String List)

`DD_ENABLE_RECORD_PAYLOAD`
: Enables reporting a subset (1024 bytes) of the payloads in requests and responses (Boolean)

`DD_MAX_PAYLOAD_SIZE`
: Sets the maximum size reported from the payload. Default `1024` (Integer)

You can also disable or enable specific auto-instrumentation in some of the tests from Swift or Objective-C by importing the module `DatadogSDKTesting` and using the class: `DDInstrumentationControl`.

## CI provider environment variables

{{< tabs >}}
{{% tab "Jenkins" %}}

| Environment variable | Value             |
| -------------------- | ----------------- |
| `JENKINS_URL`        | `$(JENKINS_URL)`  |
| `WORKSPACE`          | `$(WORKSPACE)`    |
| `BUILD_TAG`          | `$(BUILD_TAG)`    |
| `BUILD_NUMBER`       | `$(BUILD_NUMBER)` |
| `BUILD_URL`          | `$(BUILD_URL)`    |
| `JOB_NAME`           | `$(JOB_NAME)`     |

Additional Git configuration for physical device testing:

| Environment variable | Value           |
| -------------------- | --------------- |
| `GIT_COMMIT`         | `$(GIT_COMMIT)` |
| `GIT_URL`            | `$(GIT_URL)`    |
| `GIT_URL_1`          | `$(GIT_URL_1)`  |
| `GIT_BRANCH`         | `$(GIT_BRANCH)` |

{{% /tab %}}
{{% tab "CircleCI" %}}

| Environment variable       | Value                         |
| -------------------------- | ----------------------------- |
| `CIRCLECI`                 | `$(CIRCLECI)`                 |
| `CIRCLE_WORKING_DIRECTORY` | `$(CIRCLE_WORKING_DIRECTORY)` |
| `CIRCLE_BUILD_NUM`         | `$(CIRCLE_BUILD_NUM)`         |
| `CIRCLE_BUILD_URL`         | `$(CIRCLE_BUILD_URL)`         |
| `CIRCLE_WORKFLOW_ID`       | `$(CIRCLE_WORKFLOW_ID)`       |
| `CIRCLE_PROJECT_REPONAME`  | `$(CIRCLE_PROJECT_REPONAME)`  |

Additional Git configuration for physical device testing:

| Environment variable    | Value                      |
| ----------------------- | -------------------------- |
| `CIRCLE_SHA1`           | `$(CIRCLE_SHA1)`           |
| `CIRCLE_REPOSITORY_URL` | `$(CIRCLE_REPOSITORY_URL)` |
| `CIRCLE_BRANCH`         | `$(CIRCLE_BRANCH)`         |
| `CIRCLE_TAG`            | `$(CIRCLE_TAG)`            |

{{% /tab %}}
{{% tab "GitLab CI" %}}

| Environment variable | Value                |
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

Additional Git configuration for physical device testing:

| Environment variable | Value                  |
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

| Environment variable       | Value                         |
| -------------------------- | ----------------------------- |
| `TRAVIS`                   | `$(TRAVIS)`                   |
| `TRAVIS_BUILD_DIR`         | `$(TRAVIS_BUILD_DIR)`         |
| `TRAVIS_BUILD_ID`          | `$(TRAVIS_BUILD_ID)`          |
| `TRAVIS_BUILD_NUMBER`      | `$(TRAVIS_BUILD_NUMBER)`      |
| `TRAVIS_BUILD_WEB_URL`     | `$(TRAVIS_BUILD_WEB_URL)`     |
| `TRAVIS_JOB_WEB_URL`       | `$(TRAVIS_JOB_WEB_URL)`       |
| `TRAVIS_REPO_SLUG`         | `$(TRAVIS_REPO_SLUG)`         |
| `TRAVIS_PULL_REQUEST_SLUG` | `$(TRAVIS_PULL_REQUEST_SLUG)` |

Additional Git configuration for physical device testing:

| Environment variable         | Value                           |
| ---------------------------- | ------------------------------- |
| `TRAVIS_PULL_REQUEST_BRANCH` | `$(TRAVIS_PULL_REQUEST_BRANCH)` |
| `TRAVIS_BRANCH`              | `$(TRAVIS_BRANCH)`              |
| `TRAVIS_COMMIT`              | `$(TRAVIS_COMMIT)`              |
| `TRAVIS_TAG`                 | `$(TRAVIS_TAG)`                 |
| `TRAVIS_COMMIT_MESSAGE`      | `$(TRAVIS_COMMIT_MESSAGE)`      |

{{% /tab %}}
{{% tab "GitHub Actions" %}}

| Environment variable | Value                  |
| -------------------- | ---------------------- |
| `GITHUB_WORKSPACE`   | `$(GITHUB_WORKSPACE)`  |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)` |
| `GITHUB_RUN_ID`      | `$(GITHUB_RUN_ID)`     |
| `GITHUB_RUN_NUMBER`  | `$(GITHUB_RUN_NUMBER)` |
| `GITHUB_WORKFLOW`    | `$(GITHUB_WORKFLOW)`   |
| `GITHUB_SHA`         | `$(GITHUB_SHA)`        |

Additional Git configuration for physical device testing:

| Environment variable | Value                  |
| -------------------- | ---------------------- |
| `GITHUB_REF`         | `$(GITHUB_REF)`        |
| `GITHUB_HEAD_REF`    | `$(GITHUB_HEAD_REF)`   |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)` |

{{% /tab %}}
{{% tab "Buildkite" %}}

| Environment variable            | Value                              |
| ------------------------------- | ---------------------------------- |
| `BUILDKITE`                     | `$(BUILDKITE)`                     |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | `$(BUILDKITE_BUILD_CHECKOUT_PATH)` |
| `BUILDKITE_BUILD_ID`            | `$(BUILDKITE_BUILD_ID)`            |
| `BUILDKITE_BUILD_NUMBER`        | `$(BUILDKITE_BUILD_NUMBER)`        |
| `BUILDKITE_BUILD_URL`           | `$(BUILDKITE_BUILD_URL)`           |
| `BUILDKITE_PIPELINE_SLUG`       | `$(BUILDKITE_PIPELINE_SLUG)`       |
| `BUILDKITE_JOB_ID`              | `$(BUILDKITE_JOB_ID)`              |

Additional Git configuration for physical device testing:

| Environment variable           | Value                             |
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

| Environment variable       | Value                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_CLONE_DIR`      | `$(BITBUCKET_CLONE_DIR)`      |
| `BITBUCKET_BUILD_NUMBER`   | `$(BITBUCKET_BUILD_NUMBER)`   |
| `BITBUCKET_PIPELINE_UUID`  | `$(BITBUCKET_PIPELINE_UUID)`  |
| `BITBUCKET_REPO_FULL_NAME` | `$(BITBUCKET_REPO_FULL_NAME)` |

Additional Git configuration for physical device testing:

| Environment variable       | Value                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_COMMIT`         | `$(BITBUCKET_COMMIT)`         |
| `BITBUCKET_GIT_SSH_ORIGIN` | `$(BITBUCKET_GIT_SSH_ORIGIN)` |
| `BITBUCKET_BRANCH`         | `$(BITBUCKET_BRANCH)`         |
| `BITBUCKET_TAG`            | `$(BITBUCKET_TAG)`            |

{{% /tab %}}
{{% tab "AppVeyor" %}}

| Environment variable     | Value                       |
| ------------------------ | --------------------------- |
| `APPVEYOR`               | `$(APPVEYOR)`               |
| `APPVEYOR_BUILD_FOLDER`  | `$(APPVEYOR_BUILD_FOLDER)`  |
| `APPVEYOR_BUILD_ID`      | `$(APPVEYOR_BUILD_ID)`      |
| `APPVEYOR_BUILD_NUMBER`  | `$(APPVEYOR_BUILD_NUMBER)`  |
| `APPVEYOR_REPO_TAG_NAME` | `$(APPVEYOR_REPO_TAG_NAME)` |
| `APPVEYOR_REPO_NAME`     | `$(APPVEYOR_REPO_NAME)`     |

Additional Git configuration for physical device testing:

| Environment variable                     | Value                                       |
| ---------------------------------------- | ------------------------------------------- |
| `APPVEYOR_REPO_COMMIT`                   | `$(APPVEYOR_REPO_COMMIT)`                   |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH` | `$(APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH)` |
| `APPVEYOR_REPO_BRANCH`                   | `$(APPVEYOR_REPO_BRANCH)`                   |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`  | `$(APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED)`  |
| `APPVEYOR_REPO_COMMIT_AUTHOR`            | `$(APPVEYOR_REPO_COMMIT_AUTHOR)`            |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`      | `$(APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL)`      |

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| Environment variable             | Value                               |
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

Additional Git configuration for physical device testing:

| Environment variable                     | Value                                       |
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

| Environment variable   | Value                     |
| ---------------------- | ------------------------- |
| `BITRISE_SOURCE_DIR`   | `$(BITRISE_SOURCE_DIR)`   |
| `BITRISE_TRIGGERED_WORKFLOW_ID`  | `$(BITRISE_TRIGGERED_WORKFLOW_ID)`  |
| `BITRISE_BUILD_SLUG`   | `$(BITRISE_BUILD_SLUG)`   |
| `BITRISE_BUILD_NUMBER` | `$(BITRISE_BUILD_NUMBER)` |
| `BITRISE_BUILD_URL`    | `$(BITRISE_BUILD_URL)`    |

Additional Git configuration for physical device testing:

| Environment variable               | Value                                 |
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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/client-tokens
{{< /site-region >}}
{{< site-region region="us3,gov" >}}
The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported at this time.
{{< /site-region >}}
