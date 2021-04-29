---
title: Swift Tests
kind: documentation
further_reading:
    - link: "/ci/filename/"
      tag: "Documentation"
      text: "linktext"
---
## Supported CI providers

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

## Installing using SPM

1. Add `dd-sdk-swift-testing` package to your project. It is located at [`https://github.com/DataDog/dd-sdk-swift-testing`][1].

2. Link your test targets with the library `DatadogSDKTesting` from the package. 

3. If you run UITests, also link the app running the tests with this library.

## Binary linking

1. Download and decompress `DatadogSDKTesting.zip` from the release page. 

2. Copy and link your test targets with the resulting XCFramework.

3. If you run UITests, also link the app running the tests with this library.

    Alternatively, you can build the XCFramework from source code. Download the project at [dd-sdk-swift-testing][1] and run `make release`. The resulting framework `DatadogSDKTesting.xcframework` can be found at `./build/xcframework`.

## Enabling tracing instrumentation

### Configuring Datadog

To enable testing instrumentation, add the following environment variables to your test target. You must also select your main target in the `Expand variables based on:`  combo or `Target for Variable Expansion` if using test plans.

For UITests, environment variables need to be set only in the test target, because the framework automatically injects these values to the application.

| Environment variable     | Value                       |
|--------------------------|-----------------------------|
| `DD_TEST_RUNNER`           | `true`                         |
| `DATADOG_CLIENT_TOKEN`     | Your current Datadog client token  |
| `SRCROOT`                  | `$(SRCROOT)`                  |


Optionally, set these environment variables also:

| Environment variable     | Value                       |
|--------------------------|-----------------------------|
|`DD_ENV `                   | The environment you want to report              |
|`DD_SERVICE`                | The name of the service you want to report      |


### Configuration CI

Set the following environment variables for your CI service:

#### Jenkins

| Environment variable     | Value                       |
|--------------------------|-----------------------------|
|`JENKINS_URL`            | `$(JENKINS_URL)`            |
|`WORKSPACE`              | `$(WORKSPACE)`              |
|`BUILD_TAG`               | `$(BUILD_TAG)`            |
|`BUILD_NUMBER`           | `$(BUILD_NUMBER)`           |
|`BUILD_URL`           | `$(BUILD_URL)`           |
|`JOB_NAME` | `$(JOB_NAME)` |


#### CircleCI

| Environment variable       | Value                         |
|--------------------------- |-------------------------------|
|`CIRCLECI`                 | `$(CIRCLECI)`                 |
|`CIRCLE_WORKING_DIRECTORY` | `$(CIRCLE_WORKING_DIRECTORY)` |
|`CIRCLE_BUILD_NUM`         | `$(CIRCLE_BUILD_NUM)`         |
|`CIRCLE_BUILD_URL`         | `$(CIRCLE_BUILD_URL)`         |
|`CIRCLE_WORKFLOW_ID` | `$(CIRCLE_WORKFLOW_ID)` |
|`CIRCLE_PROJECT_REPONAME` | `$(CIRCLE_PROJECT_REPONAME)` |


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


#### Travis

| Environment variable         | Value                           |
| ---------------------------- | ------------------------------- |
|`TRAVIS`                     | `$(TRAVIS)`                     |
|`TRAVIS_BUILD_DIR`           | `$(TRAVIS_BUILD_DIR)`           |
|`TRAVIS_BUILD_ID`            | `$(TRAVIS_BUILD_ID)`            |
|`TRAVIS_BUILD_NUMBER`        | `$(TRAVIS_BUILD_NUMBER)`        |
|`TRAVIS_BUILD_WEB_URL`       | `$(TRAVIS_BUILD_WEB_URL)`       |
|`TRAVIS_JOB_WEB_URL`       | `$(TRAVIS_JOB_WEB_URL)`       |


#### GitHub Actions

| Environment variable  | Value                  |
| --------------------- | ---------------------- |
|`GITHUB_WORKSPACE`  | `$(GITHUB_WORKSPACE)`  |
|`GITHUB_REPOSITORY` | `$(GITHUB_REPOSITORY)` |
|`GITHUB_RUN_ID`     | `$(GITHUB_RUN_ID)`     |
|`GITHUB_RUN_NUMBER` | `$(GITHUB_RUN_NUMBER)` |
|`GITHUB_WORKFLOW` | `$(GITHUB_WORKFLOW)` |

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

#### Bitbucket Pipelines

| Environment variable     | Value                              |
| -------------------------- | ---------------------------------- |
| `BITBUCKET_CLONE_DIR`      | `$(BITBUCKET_CLONE_DIR)`          |
| `BITBUCKET_BUILD_NUMBER`   | `$(BITBUCKET_BUILD_NUMBER)`        |
| `BITBUCKET_PIPELINE_UUID`   | `$(BITBUCKET_PIPELINE_UUID)`        |
| `BITBUCKET_REPO_FULL_NAME` | `$(BITBUCKET_REPO_FULL_NAME)` |

#### AppVeyor

| Environment variable     | Value                                     |
| -------------------------------------- | ----------------------------------------- |
| `APPVEYOR`                               | `$(APPVEYOR)`                               |
| `APPVEYOR_BUILD_FOLDER`                  | `$(APPVEYOR_BUILD_FOLDER)`                  |
| `APPVEYOR_BUILD_ID`                      | `$(APPVEYOR_BUILD_ID)`                      |
| `APPVEYOR_BUILD_NUMBER`                  | `$(APPVEYOR_BUILD_NUMBER)`                  |
| `APPVEYOR_REPO_TAG_NAME`                 | `$(APPVEYOR_REPO_TAG_NAME)`                 |

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

#### Bitrise

| Environment variable     | Value                                   |
| ------------------------------------ | --------------------------------------- |
| `BITRISE_SOURCE_DIR`               | `$(BITRISE_SOURCE_DIR)`               |
| `BITRISE_APP_TITLE`             | `$(BITRISE_APP_TITLE)`             |
| `BITRISE_BUILD_SLUG`             | `$(BITRISE_BUILD_SLUG)`             |
| `BITRISE_BUILD_NUMBER`                 | `$(BITRISE_BUILD_NUMBER)`                 |
| `BITRISE_BUILD_URL`                      | `$(BITRISE_BUILD_URL)`                      |


### Git information
If you run MacOS tests, or iOS or tvOS tests on a simulator, Git information is automatically read from your repository info. If that is not the case the following environment variables must also be set in your test target, depending on your CI service:

#### Jenkins

| Key                      | Value                       |
|--------------------------|-----------------------------|
|GIT_COMMIT             |$(GIT_COMMIT)             |
|GIT_URL                |$(GIT_URL)                |
|GIT_BRANCH             |$(GIT_BRANCH)             |

#### CircleCI

| Key                        | Value                         |
|--------------------------- |-------------------------------|
|CIRCLE_SHA1              |$(CIRCLE_SHA1)              |
|CIRCLE_REPOSITORY_URL    |$(CIRCLE_REPOSITORY_URL)    |
|CIRCLE_BRANCH            |$(CIRCLE_BRANCH)            |
|CIRCLE_TAG |$(CIRCLE_TAG) |


#### GitLab CI

| Key                  | Value             |
| -------------------  | ----------------- |
|CI_COMMIT_SHA      |$(CI_COMMIT_SHA)      |
|CI_REPOSITORY_URL  |$(CI_REPOSITORY_URL)  |
|CI_COMMIT_BRANCH   |$(CI_COMMIT_BRANCH)   |
|CI_COMMIT_TAG      |$(CI_COMMIT_TAG)      |

#### Travis

| Key                          | Value                           |
| ---------------------------- | ------------------------------- |
|TRAVIS_REPO_SLUG           |$(TRAVIS_REPO_SLUG)           |
|TRAVIS_PULL_REQUEST_SLUG |$(TRAVIS_PULL_REQUEST_SLUG) |
|TRAVIS_PULL_REQUEST_BRANCH |$(TRAVIS_PULL_REQUEST_BRANCH) |
|TRAVIS_BRANCH              |$(TRAVIS_BRANCH)              |
|TRAVIS_COMMIT              |$(TRAVIS_COMMIT)              |
|TRAVIS_TAG           |$(TRAVIS_TAG)           |


#### GitHub Actions

| Key                 | Value                  |
| ------------------- | ---------------------- |
|GITHUB_SHA        |$(GITHUB_SHA)        |
|GITHUB_REF        |$(GITHUB_REF)        |
|GITHUB_HEAD_REF |$(GITHUB_HEAD_REF) |
|GITHUB_REPOSITORY |$(GITHUB_REPOSITORY) |

#### Buildkite

| Key                             | Value                              |
| ------------------------------- | ---------------------------------- |
|BUILDKITE_COMMIT              |$(BUILDKITE_COMMIT)              |
|BUILDKITE_REPO                |$(BUILDKITE_REPO)                |
|BUILDKITE_BRANCH              |$(BUILDKITE_BRANCH)              |
|BUILDKITE_TAG |$(BUILDKITE_TAG) |

#### Bitbucket Pipelines

| Key                        | Value                              |
| -------------------------- | ---------------------------------- |
|BITBUCKET_COMMIT         |$(BITBUCKET_COMMIT)              |
|BITBUCKET_GIT_SSH_ORIGIN |$(BITBUCKET_GIT_SSH_ORIGIN)      |
|BITBUCKET_BRANCH         |$(BITBUCKET_BRANCH)              |
|BITBUCKET_TAG |$(BITBUCKET_TAG) |

#### AppVeyor

| Key                                    | Value                                     |
| -------------------------------------- | ----------------------------------------- |
| APPVEYOR_REPO_COMMIT                   | $(APPVEYOR_REPO_COMMIT)                   |
| APPVEYOR_REPO_NAME                     | $(APPVEYOR_REPO_NAME)                     |
| APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH | $(APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH) |
| APPVEYOR_REPO_BRANCH                   | $(APPVEYOR_REPO_BRANCH)                   |

#### Azure Pipelines

| Key                                  | Value                                   |
| ------------------------------------ | --------------------------------------- |
|BUILD_SOURCEVERSION                |$(BUILD_SOURCEVERSION)                |
|BUILD_REPOSITORY_URI               |$(BUILD_REPOSITORY_URI)               |
|BUILD_SOURCEBRANCH                 |$(BUILD_SOURCEBRANCH)                 |
|SYSTEM_PULLREQUEST_SOURCECOMMITID |$(SYSTEM_PULLREQUEST_SOURCECOMMITID) |
|SYSTEM_PULLREQUEST_SOURCEBRANCH |$(SYSTEM_PULLREQUEST_SOURCEBRANCH) |
|SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI |$(SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI) |

#### Bitrise

| Key                                  | Value                                   |
| ------------------------------------ | --------------------------------------- |
|GIT_REPOSITORY_URL                          |$(GIT_REPOSITORY_URL)                          |
|BITRISE_GIT_COMMIT                |$(BITRISE_GIT_COMMIT)                |
|BITRISE_GIT_BRANCH                 |$(BITRISE_GIT_BRANCH)                 |
|BITRISEIO_GIT_BRANCH_DEST |$(BITRISEIO_GIT_BRANCH_DEST) |
|BITRISE_GIT_TAG |$(BITRISE_GIT_TAG) |
|GIT_CLONE_COMMIT_HASH |$(GIT_CLONE_COMMIT_HASH) |
|BITRISE_GIT_MESSAGE |$(BITRISE_GIT_MESSAGE) |
|GIT_CLONE_COMMIT_MESSAGE_SUBJECT |$(GIT_CLONE_COMMIT_MESSAGE_SUBJECT) |
|GIT_CLONE_COMMIT_MESSAGE_BODY |$(GIT_CLONE_COMMIT_MESSAGE_BODY) |
|GIT_CLONE_COMMIT_AUTHOR_NAME |$(GIT_CLONE_COMMIT_AUTHOR_NAME) |
|GIT_CLONE_COMMIT_AUTHOR_EMAIL |$(GIT_CLONE_COMMIT_AUTHOR_EMAIL) |
|GIT_CLONE_COMMIT_COMMITER_NAME |$(GIT_CLONE_COMMIT_COMMITER_NAME) |
|GIT_CLONE_COMMIT_COMMITER_EMAIL |$(GIT_CLONE_COMMIT_COMMITER_EMAIL) |

## Running tests 

After installation, you can run your tests as you normally do, for example using the `xcodebuild test` command. 

Tests, network requests and application logs will be instrumented automatically.

## UI Tests

For UITests, both the test target and the application running from the UITests must link with the framework. Environment variables only need to be set in the test target, since the framework automatically injects these values to the application.

## Crash handler

Testing library install a crash handler while running your tests, if a test crashes while being run, this crash handler will capture the crash log and will add this crash log along with your test result. If the tests are being run on macOS or iOS simulator, crash log will be fully symbolicated, in other cases they will only be partially symbolicated.

### Disable crash handler

You should never need to do it, but in some ***very specific cases*** you may want to disable crash reporting for tests (e.g. you want to test your own crash handler, ... ):
{% highlight txt %}
DD_DISABLE_CRASH_HANDLER # Disables crash handling and reporting. (Boolean) WARNING, read note below
{% endhighlight %}

> You must know that if you disable crash reporting, crashing tests won't be reported to the backend and wont appear as a failure. If you really, really need to do this for any of your tests, run it as a totally separated target, so you don't disable it for the rest of the tests.

## Extra configuration

### Disabling Auto Instrumentation

The framework automatically tries to capture the most information possible, but for some situations or tests it can be counter-productive. You can disable some of the autoinstrumentation for all the tests by setting the following environment variables:

> `Boolean` variables can use any of: `1`, `0`, `true`, `false`, `YES` or `NO` 
>
> `String` list variables accept a list of elements separated by `,` or `;`

{% highlight txt %}
DD_DISABLE_NETWORK_INSTRUMENTATION # Disables all network instrumentation (Boolean)
DD_DISABLE_STDOUT_INSTRUMENTATION # Disables all stdout instrumentation (Boolean)
DD_DISABLE_STDERR_INSTRUMENTATION # Disables all stderr instrumentation (Boolean)
DD_DISABLE_SDKIOS_INTEGRATION # Disables integration with dd-sdk-ios logs and traces (Boolean)
{% endhighlight %}

### Network Auto Instrumentation

For Network autoinstrumentation there are other settings that you can configure

{% highlight txt %}
DD_DISABLE_HEADERS_INJECTION # Disables all injection of tracing headers (Boolean)
DD_INSTRUMENTATION_EXTRA_HEADERS # Specific extra headers that you want to log (String List)
DD_EXCLUDED_URLS # Urls that you don't want to log or inject headers into (String List)
DD_ENABLE_RECORD_PAYLOAD # It enables reporting a subset (512 bytes) of the payloads in 
                        requests and responses (Boolean)
DD_MAX_PAYLOAD_SIZE # It sets the maximum size that will be reported from the payload, 1024 by default (Integer)
{% endhighlight %}

You can also disable or enable specific autoinstrumentation in some of the tests from Swift or Objective-C by importing the module `DatadogSDKTesting` and using the class: `DDInstrumentationControl`.


## Supported versions

The Swift test instrumentation is compatible with the following platforms:

| PLATFORM    | VERSION |
| ----------- | ----- |
| iOS         |  11.0+  |
| macOS       |  10.13+ |
| tvOS        |  11.0+  |

and the following languages:

| PLATFORM    | VERSION |
| ----------- | ----- |
| Swift       |  5.3+   |
| Objective-C |  2.0+   |



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing
