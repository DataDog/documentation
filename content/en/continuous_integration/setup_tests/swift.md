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

## Compatibility

Supported languages:
* Swift 5.2+
* Objective-C 2.0+

Supported platforms:
* iOS 12.0+
* macOS 10.13+
* tvOS 12.0+

Supported CI providers:
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

## Installing the Swift testing SDK using SPM

1. Add `dd-sdk-swift-testing` package to your project. It is located at [`https://github.com/DataDog/dd-sdk-swift-testing`][1].

2. Link your test targets with the library `DatadogSDKTesting` from the package. 

3. If you run UITests, also link the app running the tests with this library.

## Binary linking

1. Download and decompress `DatadogSDKTesting.zip` from the release page. 

2. Copy and link your test targets with the resulting XCFramework.

3. If you run UITests, also link the app running the tests with this library.

    Alternatively, you can build the XCFramework from source code. Download the project at [dd-sdk-swift-testing][1] and run `make release`. The resulting framework `DatadogSDKTesting.xcframework` can be found at `./build/xcframework`.

## Instrumenting your tests

### Configuring Datadog

To enable testing instrumentation, add the following environment variables to your test target. You must also select your main target in the `Expand variables based on:`  combo or `Target for Variable Expansion` if using test plans.

For UITests, environment variables need to be set only in the test target, because the framework automatically injects these values to the application.

| Environment variable     | Value                       |
|--------------------------|-----------------------------|
| `DD_TEST_RUNNER`           | `true`                         |
| `DATADOG_CLIENT_TOKEN`     | Your current Datadog client token  |
| `DD_ENDPOINT`            | The server endpoint of your Datadog Account: `us` (default), `us3`, `eu`, `gov`             |
| `SRCROOT`                  | `$(SRCROOT)`                  |


Optionally, set these environment variables also:

| Environment variable     | Value                       |
|--------------------------|-----------------------------|
|`DD_ENV `                   | The environment you want to report              |
|`DD_SERVICE`                | The name of the service you want to report      |


### Configuring your CI service

Set the following environment variables for your CI service. Note that Git information is automatically collected if you use a simulator to perform your MacOS, iOS, or tvOS tests. However, If you do testing on physical devices, set the additional Git-related environment variables.

#### Jenkins

| Environment variable     | Value                       |
|--------------------------|-----------------------------|
|`JENKINS_URL`            | `$(JENKINS_URL)`            |
|`WORKSPACE`              | `$(WORKSPACE)`              |
|`BUILD_TAG`               | `$(BUILD_TAG)`            |
|`BUILD_NUMBER`           | `$(BUILD_NUMBER)`           |
|`BUILD_URL`           | `$(BUILD_URL)`           |
|`JOB_NAME` | `$(JOB_NAME)` |

Additional Git configuration for physical device testing:

| Environment variable     | Value                       |
|--------------------------|-----------------------------|
| `GIT_COMMIT`             | `$(GIT_COMMIT)`             |
| `GIT_URL`                | `$(GIT_URL)`                |
| `GIT_BRANCH`             | `$(GIT_BRANCH)`             |

#### CircleCI

| Environment variable       | Value                         |
|--------------------------- |-------------------------------|
|`CIRCLECI`                 | `$(CIRCLECI)`                 |
|`CIRCLE_WORKING_DIRECTORY` | `$(CIRCLE_WORKING_DIRECTORY)` |
|`CIRCLE_BUILD_NUM`         | `$(CIRCLE_BUILD_NUM)`         |
|`CIRCLE_BUILD_URL`         | `$(CIRCLE_BUILD_URL)`         |
|`CIRCLE_WORKFLOW_ID` | `$(CIRCLE_WORKFLOW_ID)` |
|`CIRCLE_PROJECT_REPONAME` | `$(CIRCLE_PROJECT_REPONAME)` |

Additional Git configuration for physical device testing:

| Environment variable     | Value                         |
|--------------------------- |-------------------------------|
| `CIRCLE_SHA1`              | `$(CIRCLE_SHA1)`              |
| `CIRCLE_REPOSITORY_URL`    | `$(CIRCLE_REPOSITORY_URL)`    |
| `CIRCLE_BRANCH`            | `$(CIRCLE_BRANCH)`            |
| `CIRCLE_TAG` | `$(CIRCLE_TAG)` |

#### GitLab CI

| Environment variable | Value             |
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

Additional Git configuration for physical device testing:

| Environment variable     | Value             |
| -------------------  | ----------------- |
| `CI_COMMIT_SHA`      | `$(CI_COMMIT_SHA)`      |
| `CI_REPOSITORY_URL`  | `$(CI_REPOSITORY_URL)`  |
| `CI_COMMIT_BRANCH`   | `$(CI_COMMIT_BRANCH)`   |
| `CI_COMMIT_TAG`      | `$(CI_COMMIT_TAG)`      |
| `CI_COMMIT_MESSAGE` | `$(CI_COMMIT_MESSAGE)` |


#### Travis

| Environment variable         | Value                           |
| ---------------------------- | ------------------------------- |
|`TRAVIS`                     | `$(TRAVIS)`                     |
|`TRAVIS_BUILD_DIR`           | `$(TRAVIS_BUILD_DIR)`           |
|`TRAVIS_BUILD_ID`            | `$(TRAVIS_BUILD_ID)`            |
|`TRAVIS_BUILD_NUMBER`        | `$(TRAVIS_BUILD_NUMBER)`        |
|`TRAVIS_BUILD_WEB_URL`       | `$(TRAVIS_BUILD_WEB_URL)`       |
|`TRAVIS_JOB_WEB_URL`       | `$(TRAVIS_JOB_WEB_URL)`       |
| `TRAVIS_REPO_SLUG`           | `$(TRAVIS_REPO_SLUG)`           |
| `TRAVIS_PULL_REQUEST_SLUG` | `$(TRAVIS_PULL_REQUEST_SLUG)` |

Additional Git configuration for physical device testing:

| Environment variable     | Value                           |
| ---------------------------- | ------------------------------- |
| `TRAVIS_PULL_REQUEST_BRANCH` | `$(TRAVIS_PULL_REQUEST_BRANCH)` |
| `TRAVIS_BRANCH`              | `$(TRAVIS_BRANCH)`              |
| `TRAVIS_COMMIT`              | `$(TRAVIS_COMMIT)`              |
| `TRAVIS_TAG`           | `$(TRAVIS_TAG)`           |
| `TRAVIS_COMMIT_MESSAGE`           | `$(TRAVIS_COMMIT_MESSAGE)`           |


#### GitHub Actions

| Environment variable  | Value                  |
| --------------------- | ---------------------- |
|`GITHUB_WORKSPACE`  | `$(GITHUB_WORKSPACE)`  |
|`GITHUB_REPOSITORY` | `$(GITHUB_REPOSITORY)` |
|`GITHUB_RUN_ID`     | `$(GITHUB_RUN_ID)`     |
|`GITHUB_RUN_NUMBER` | `$(GITHUB_RUN_NUMBER)` |
|`GITHUB_WORKFLOW` | `$(GITHUB_WORKFLOW)` |
| `GITHUB_SHA`        | `$(GITHUB_SHA)`        |

Additional Git configuration for physical device testing:

| Environment variable     | Value                  |
| ------------------- | ---------------------- |
| `GITHUB_REF`        | `$(GITHUB_REF)`        |
| `GITHUB_HEAD_REF` | `$(GITHUB_HEAD_REF)` |
| `GITHUB_REPOSITORY` | `$(GITHUB_REPOSITORY)` |


#### Buildkite

| Environment variable            | Value                              |
| ------------------------------- | ---------------------------------- |
| `BUILDKITE`           | `$(BUILDKITE)`  |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | `$(BUILDKITE_BUILD_CHECKOUT_PATH)` |
| `BUILDKITE_BUILD_ID`            | `$(BUILDKITE_BUILD_ID)`            |
| `BUILDKITE_BUILD_NUMBER`        | `$(BUILDKITE_BUILD_NUMBER)`        |
| `BUILDKITE_BUILD_URL`           | `$(BUILDKITE_BUILD_URL)`           |
| `BUILDKITE_PIPELINE_SLUG` | `$(BUILDKITE_PIPELINE_SLUG)` |
| `BUILDKITE_JOB_ID` | `$(BUILDKITE_JOB_ID)` |

Additional Git configuration for physical device testing:

| Environment variable     | Value                              |
| ------------------------------- | ---------------------------------- |
| `BUILDKITE_COMMIT`              | `$(BUILDKITE_COMMIT)`              |
| `BUILDKITE_REPO`                | `$(BUILDKITE_REPO)`                |
| `BUILDKITE_BRANCH`              | `$(BUILDKITE_BRANCH)`              |
| `BUILDKITE_TAG` | `$(BUILDKITE_TAG)` |
| `BUILDKITE_MESSAGE` | `$(BUILDKITE_MESSAGE)` |
| `BUILDKITE_BUILD_AUTHOR` | `$(BUILDKITE_BUILD_AUTHOR)` |
| `BUILDKITE_BUILD_AUTHOR_EMAIL` | `$(BUILDKITE_BUILD_AUTHOR_EMAIL)` |

#### Bitbucket Pipelines

| Environment variable     | Value                              |
| -------------------------- | ---------------------------------- |
| `BITBUCKET_CLONE_DIR`      | `$(BITBUCKET_CLONE_DIR)`          |
| `BITBUCKET_BUILD_NUMBER`   | `$(BITBUCKET_BUILD_NUMBER)`        |
| `BITBUCKET_PIPELINE_UUID`   | `$(BITBUCKET_PIPELINE_UUID)`        |
| `BITBUCKET_REPO_FULL_NAME` | `$(BITBUCKET_REPO_FULL_NAME)` |

Additional Git configuration for physical device testing:

| Environment variable     | Value                              |
| -------------------------- | ---------------------------------- |
| `BITBUCKET_COMMIT`         | `$(BITBUCKET_COMMIT)`              |
| `BITBUCKET_GIT_SSH_ORIGIN` | `$(BITBUCKET_GIT_SSH_ORIGIN)`      |
| `BITBUCKET_BRANCH`         | `$(BITBUCKET_BRANCH)`              |
| `BITBUCKET_TAG` | `$(BITBUCKET_TAG)` |


#### AppVeyor

| Environment variable     | Value                                     |
| -------------------------------------- | ----------------------------------------- |
| `APPVEYOR`                               | `$(APPVEYOR)`                               |
| `APPVEYOR_BUILD_FOLDER`                  | `$(APPVEYOR_BUILD_FOLDER)`                  |
| `APPVEYOR_BUILD_ID`                      | `$(APPVEYOR_BUILD_ID)`                      |
| `APPVEYOR_BUILD_NUMBER`                  | `$(APPVEYOR_BUILD_NUMBER)`                  |
| `APPVEYOR_REPO_TAG_NAME`                 | `$(APPVEYOR_REPO_TAG_NAME)`                 |
| `APPVEYOR_REPO_NAME`                     | `$(APPVEYOR_REPO_NAME)`                     |

Additional Git configuration for physical device testing:

| Environment variable     | Value                                     |
| -------------------------------------- | ----------------------------------------- |
| `APPVEYOR_REPO_COMMIT`                   | `$(APPVEYOR_REPO_COMMIT)`                   |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH` | `$(APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH)` |
| `APPVEYOR_REPO_BRANCH`                   | `$(APPVEYOR_REPO_BRANCH)`                   |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`                   | `$(APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED)`                   |
| `APPVEYOR_REPO_COMMIT_AUTHOR`                   | `$(APPVEYOR_REPO_COMMIT_AUTHOR)`                   |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`                   | `$(APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL)`                   |


#### Azure Pipelines

| Environment variable     | Value                                   |
| ------------------------------------ | --------------------------------------- |
| `TF_BUILD`                | `$(TF_BUILD)`                |
| `BUILD_SOURCESDIRECTORY`             | `$(BUILD_SOURCESDIRECTORY)`             |
| `BUILD_BUILDID`                      | `$(BUILD_BUILDID)`                      |
| `BUILD_DEFINITIONNAME` | `$(BUILD_DEFINITIONNAME)` |
| `SYSTEM_TEAMPROJECTID`                 | `$(SYSTEM_TEAMPROJECTID)`                 |
| `SYSTEM_TEAMFOUNDATIONSERVERURI` | `$(SYSTEM_TEAMFOUNDATIONSERVERURI)` |
| `SYSTEM_JOBID |$(SYSTEM_JOBID)` |
| `SYSTEM_TASKINSTANCEID` | `$(SYSTEM_TASKINSTANCEID)` |

Additional Git configuration for physical device testing:

| Environment variable     | Value                                   |
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

| Environment variable     | Value                                   |
| ------------------------------------ | --------------------------------------- |
| `BITRISE_SOURCE_DIR`               | `$(BITRISE_SOURCE_DIR)`               |
| `BITRISE_APP_TITLE`             | `$(BITRISE_APP_TITLE)`             |
| `BITRISE_BUILD_SLUG`             | `$(BITRISE_BUILD_SLUG)`             |
| `BITRISE_BUILD_NUMBER`                 | `$(BITRISE_BUILD_NUMBER)`                 |
| `BITRISE_BUILD_URL`                      | `$(BITRISE_BUILD_URL)`                      |

Additional Git configuration for physical device testing:

| Environment variable     | Value                                   |
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


## Running tests 

After installation, you can run your tests as you normally do, for example using the `xcodebuild test` command. Tests, network requests, and application logs will be instrumented automatically.

## UI Tests

For UITests, both the test target and the application running from the UITests must link with the framework. Environment variables need to be set only in the test target, because the framework automatically injects these values to the application.

## Handling crashes

The testing library installs a crash handler while running your tests. If a test crashes while running, this crash handler captures the crash log and adds the log to the test result. If the tests are running on macOS or iOS simulator, the crash log is fully symbolicated; otherwise they are partially symbolicated.

### Disabling the crash handler

In some *very rare cases*. such as testing your own crash handler, you may want to disable crash reporting for tests.

<div class="alert alert-warning"><strong>Important</strong>: If you disable crash reporting, crashing tests won't be reported to the backend and won't appear as failures. If you need to disable crash handling for any of your tests, run it as a separate target, so you don't disable it for the rest of the tests.</div>

`DD_DISABLE_CRASH_HANDLER`
: Disables crash handling and reporting. (Boolean)

## Additional optional configuration

For the following configuration settings:
 - `Boolean` variables can use any of: `1`, `0`, `true`, `false`, `YES`, or `NO` 
 - `String` list variables accept a list of elements separated by `,` or `;`

### Disabling auto-instrumentation

The framework automatically captures the most information possible, but for some situations or tests this can be counter-productive. You can disable some of the auto-instrumentation for all the tests by setting environment variables:

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: Disables all network instrumentation (Boolean)

`DD_DISABLE_STDOUT_INSTRUMENTATION`
: Disables all `stdout` instrumentation (Boolean)

`DD_DISABLE_STDERR_INSTRUMENTATION`
: Disables all `stderr` instrumentation (Boolean)

`DD_DISABLE_SDKIOS_INTEGRATION`
: Disables integration with `dd-sdk-ios` logs and traces (Boolean)

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing
