---
title: Swift Tests
kind: documentation
code_lang: swift
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /continuous_integration/setup_tests/swift
  - /continuous_integration/tests/swift
  - /continuous_integration/tests/setup/swift
further_reading:
    - link: /continuous_integration/tests
      tag: Documentation
      text: Explore Test Results and Performance
    - link: /continuous_integration/intelligent_test_runner/swift
      tag: Documentation
      text: Speed up your test jobs with Intelligent Test Runner
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Troubleshooting CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
The selected Datadog site ({{< region-param key="dd_site_name" >}}) is not supported.
</div>
{{< /site-region >}}

## Compatibility

Supported languages:

| Language | Version | Notes |
|---|---|---|
| Swift | >= 5.2 | If you are using Swift Concurrency, you need Xcode >= 13.2 for precise span representation of asynchronous tasks. |
| Objective-C | >= 2.0 | |

Supported platforms:

| Platform | Version |
|---|---|
| iOS | >= 11.0 |
| macOS | >= 10.13 |
| tvOS | >= 11.0 |

## Installing the Swift testing SDK

There are three ways you can install the testing framework:

{{< tabs >}}
{{% tab "Swift Package Manager" %}}

### Using Xcode Project

1. Add `dd-sdk-swift-testing` package to your project. It is located at [`https://github.com/DataDog/dd-sdk-swift-testing`][1].

{{< img src="continuous_integration/swift_package.png" alt="Swift Package" >}}


2. Link your test targets with the library `DatadogSDKTesting` from the package.

{{< img src="continuous_integration/swift_link2.png" alt="Swift Linking SPM" >}}

3. If you run UITests, also link the app running the tests with this library.

### Using Swift Package Project

1. Add `dd-sdk-swift-testing` to your package dependencies array, for example:

{{< code-block lang="swift" >}}
.package(url: "https://github.com/DataDog/dd-sdk-swift-testing.git", from: "2.2.0")
{{< /code-block >}}

2. To add the testing framework to your testing targets' dependencies, add the following line to your test targets dependencies array:
{{< code-block lang="swift" >}}
.product(name: "DatadogSDKTesting", package: "dd-sdk-swift-testing")
{{< /code-block >}}

3. If you run UITests, also add the dependency to your applications running the tests.


[1]: https://github.com/DataDog/dd-sdk-swift-testing
{{% /tab %}}
{{% tab "Cocoapods" %}}

1. Add the `DatadogSDKTesting` dependency to the test targets of your `Podfile`:

{{< code-block lang="ruby" >}}
target 'MyApp' do
  # ...

  target 'MyAppTests' do
    inherit! :search_paths
    pod 'DatadogSDKTesting'
  end
end
{{< /code-block >}}

2. If you run UITests, also add the dependency to the app running the tests.

{{% /tab %}}
{{% tab "Framework linking" %}}

1. Download and decompress `DatadogSDKTesting.zip` from the [release][1] page.

2. Copy and link your test targets with the resulting XCFramework.

{{< img src="continuous_integration/swift_link.png" alt="Swift Linking XCFramework" >}}

3. If you run UITests, also link the app running the tests with this library.

[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{% tab "GitHub Actions" %}}

If you use GitHub, you can use the [Swift test action][1] from GitHub Marketplace to automatically configure and run your tests. By default, the rest of the configuration described on this page can be skipped (except the configuration of the action itself), but you can use the configuration environment variables for disabling or configuring additional functionality.

Compared to other methods, such as Cocoapods and Framework linking, the Swift test action option may be less flexible to configure and run, but requires no code changes.

[1]: https://github.com/marketplace/actions/swift-test-action-for-datadog
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-warning"><strong>Note</strong>: This framework is useful only for testing and should only be linked with the application when running tests. Do not distribute the framework to your users. </div>

## Instrumenting your tests

### Configuring Datadog

#### Using Xcode Project

To enable testing instrumentation, add the following environment variables to your test target or in the `Info.plist` file as [described below](#using-infoplist-for-configuration). You **must** select your main target in `Expand variables based on` or `Target for Variable Expansion` if you are using test plans:

{{< img src="continuous_integration/swift_env.png" alt="Swift Environments" >}}

<div class="alert alert-warning">You should have your main target in the variables expansion of the environment variables; if not selected, variables are not valid. </div>

For UITests, environment variables need to be set only in the test target, because the framework automatically injects these values to the application.

#### Using Swift Package Project

To enable testing instrumentation, you must set the following environment variables to your commandline execution for the tests. You can alternatively set them in the environment before running the tests or you can prepend them to the command:

<pre>
<code>
DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> DD_APPLICATION_KEY=<your APPLICATION_KEY> DD_SITE=us1 SRCROOT=$PWD swift test ...

or

DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> DD_APPLICATION_KEY=<your APPLICATION_KEY> DD_SITE=us1 SRCROOT=$PWD xcodebuild test -scheme ...
</code>
</pre>


Set all these variables in your test target:

`DD_TEST_RUNNER`
: Enables or disables the instrumentation of tests. Set this value to `$(DD_TEST_RUNNER)` so you can enable and disable test instrumentation with a environment variable defined outside of the test process (for example, in the CI build).<br/>
**Default**: `false`<br/>
**Recommended**: `$(DD_TEST_RUNNER)`

`DD_API_KEY`
: The [Datadog API key][2] used to upload the test results.<br/>
**Default**: `(empty)`

`DD_APPLICATION_KEY`
: The [Datadog Application key][5] used to upload the test results.<br/>
**Default**: `(empty)`

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
: The path to the project location. If using Xcode, use `$(SRCROOT)` for the value, because it is automatically set by it.<br/>
**Default**: `(empty)`<br/>
**Recommended**: `$(SRCROOT)`<br/>
**Example**: `/Users/ci/source/MyApp`

For more information about `service` and `env` reserved tags, see [Unified Service Tagging][8].

Additionally, configure the Datadog site to use the selected one ({{< region-param key="dd_site_name" >}}):

`DD_SITE` (Required)
: The [Datadog site][3] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

## Collecting Git metadata

{{% ci-git-metadata %}}

### Running tests

After installation, run your tests as you normally do, for example using the `xcodebuild test` command. Tests, network requests, and application crashes are instrumented automatically. Pass your environment variables when running your tests in the CI, for example:

<pre>
<code>
DD_TEST_RUNNER=1 DD_ENV=ci DD_SITE={{< region-param key="dd_site" >}} xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=x86_64" \
  test
</code>
</pre>

### UI tests

For UITests, both the test target and the application running from the UITests must link with the framework. Environment variables need to be set only in the test target, because the framework automatically injects these values to the application.

### RUM Integration

If the application being tested is instrumented using RUM, your UI tests results and their generated RUM sessions are automatically linked. Learn more about RUM in the [RUM iOS Integration][4] guide. An iOS RUM version >= 1.10 is needed.


## Additional optional configuration

For the following configuration settings:
 - `Boolean` variables can use any of: `1`, `0`, `true`, `false`, `YES`, or `NO`
 - `String` list variables accept a list of elements separated by `,` or `;`

### Enabling auto-instrumentation

`DD_ENABLE_STDOUT_INSTRUMENTATION`
: Captures messages written to `stdout` (for example, `print()`) and reports them as logs. This may impact your bill. (Boolean)

`DD_ENABLE_STDERR_INSTRUMENTATION`
: Captures messages written to `stderr` (for example, `NSLog()`, UITest steps) and reports them as logs. This may impact your bill. (Boolean)

### Disabling auto-instrumentation

The framework enables auto-instrumentation of all supported libraries, but in some cases this might not be desired. You can disable auto-instrumentation of certain libraries by setting the following environment variables (or in the `Info.plist` file as [described below](#using-infoplist-for-configuration)):

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: Disables all network instrumentation (Boolean)

`DD_DISABLE_RUM_INTEGRATION`
: Disables integration with RUM Sessions (Boolean)

`DD_DISABLE_SOURCE_LOCATION`
: Disables test source code location and Codeowners (Boolean)

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

`DD_DISABLE_NETWORK_CALL_STACK`
: Disables the call stack information in the network spans (Boolean)

`DD_ENABLE_NETWORK_CALL_STACK_SYMBOLICATED`
: Shows the call stack information with not only the method name, but also the precise file and line information. May impact your tests' performance (Boolean)

### Infrastructure test correlation

If you are running tests in your own infrastructure (macOS or simulator tests), you can correlate your tests with your infrastructure metrics by installing the Datadog Agent and setting the following:

`DD_CIVISIBILITY_REPORT_HOSTNAME`
: Reports the hostname of the machine launching the tests (Boolean)

You can also disable or enable specific auto-instrumentation in some of the tests from Swift or Objective-C by importing the module `DatadogSDKTesting` and using the class: `DDInstrumentationControl`.

## Custom tags

### Environment variables

You can use `DD_TAGS` environment variable (or in the `Info.plist` file as [described below](#using-infoplist-for-configuration)). It must contain pairs of `key:tag` separated by spaces. For example:
{{< code-block lang="bash" >}}
DD_TAGS=tag-key-0:tag-value-0 tag-key-1:tag-value-1
{{< /code-block >}}

If one of the values starts with the `$` character, it is replaced with an environment variable of the same name (if it exists), for example:
{{< code-block lang="bash" >}}
DD_TAGS=home:$HOME
{{< /code-block >}}

Using the `$` character also supports replacing an environment variable at the beginning of a value if contains non-environment variable supported characters (`a-z`,  `A-Z` or `_`), for example:
{{< code-block lang="bash" >}}
FOO = BAR
DD_TAGS=key1:$FOO-v1 // expected: key1:BAR-v1
{{< /code-block >}}

### OpenTelemetry

**Note**: Using OpenTelemetry is only supported for Swift.

Datadog Swift testing framework uses [OpenTelemetry][6] as the tracing technology under the hood. You can access the OpenTelemetry tracer using `DDInstrumentationControl.openTelemetryTracer` and use any OpenTelemetry API. For example, to add a tag or attribute:

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import OpenTelemetryApi

let tracer = DDInstrumentationControl.openTelemetryTracer as? Tracer
let span = tracer?.spanBuilder(spanName: "ChildSpan").startSpan()
span?.setAttribute(key: "OTTag2", value: "OTValue2")
span?.end()
{{< /code-block >}}

The test target needs to link explicitly with `opentelemetry-swift`.

### Reporting code coverage

When code coverage is available, the Datadog SDK (v2.2.7+) reports it under the `test.code_coverage.lines_pct` tag for your test sessions.

In Xcode, you can enable the reporting of code coverage in your Test Scheme.

You can see the evolution of the test coverage in the **Coverage** tab of a test session.

## Using Info.plist for configuration

Alternatively to setting environment variables, all configuration values can be provided by adding them to the `Info.plist` file of the Test bundle (not the App bundle). If the same setting is set both in an environment variable and in the `Info.plist` file, the environment variable takes precedence.

## CI provider environment variables

{{< tabs >}}
{{% tab "Jenkins" %}}

| Environment variable | Value                  |
| -------------------- | ---------------------- |
| `JENKINS_URL`        | `$(JENKINS_URL)`       |
| `WORKSPACE`          | `$(WORKSPACE)`         |
| `BUILD_TAG`          | `$(BUILD_TAG)`         |
| `BUILD_NUMBER`       | `$(BUILD_NUMBER)`      |
| `BUILD_URL`          | `$(BUILD_URL)`         |
| `JOB_NAME`           | `$(JOB_NAME)`          |
| `DD_CUSTOM_TRACE_ID` | `$(DD_CUSTOM_TRACE_ID)`|

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
| `CI_PROJECT_URL`     | `$(CI_PROJECT_URL)`  |


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

| Environment variable | Value                   |
| -------------------- | ----------------------- |
| `GITHUB_WORKSPACE`   | `$(GITHUB_WORKSPACE)`   |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)`  |
| `GITHUB_RUN_ID`      | `$(GITHUB_RUN_ID)`      |
| `GITHUB_RUN_NUMBER`  | `$(GITHUB_RUN_NUMBER)`  |
| `GITHUB_WORKFLOW`    | `$(GITHUB_WORKFLOW)`    |
| `GITHUB_SHA`         | `$(GITHUB_SHA)`         |
| `GITHUB_SERVER_URL`  | `$(GITHUB_SERVER_URL)`  |
| `GITHUB_RUN_ATTEMPT` | `$(GITHUB_RUN_ATTEMPT)` |

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
{{% tab "Xcode Cloud" %}}

| Environment variable    | Value                   |
| ----------------------- | ----------------------- |
| `DD_GIT_REPOSITORY_URL` | The repository URL      |
| `CI_WORKSPACE`          | `$(CI_WORKSPACE)`       |
| `CI_COMMIT`             | `$(CI_COMMIT)`          |
| `CI_BUILD_ID`           | `$(CI_BUILD_ID)`        |
| `CI_BUILD_NUMBER`       | `$(CI_BUILD_NUMBER)`    |
| `CI_WORKFLOW`           | `$(CI_WORKFLOW)`        |
| `CI_TAG`                | `$(CI_TAG)`             |
| `CI_BRANCH`             | `$(CI_BRANCH)`          |
| `CI_GIT_REF`            | `$(CI_GIT_REF)`         |

{{% /tab %}}
{{< /tabs >}}

## Manual testing API

If you use XCTests with your Swift projects, the `DatadogSDKTesting` framework automatically instruments them and sends the results to the Datadog backend. If you don't use XCTest, you can instead use the Swift/Objective-C manual testing API, which also reports test results to the backend.

The API is based around three concepts: *test module*, *test suites*, and *tests*.

### Test module

A test module represents the load of a library or bundle that includes the tests.

To start a test module, call `DDTestModule.start()` and pass the name of the module or bundle to test.

When all your tests have finished, call `module.end()`, which forces the library to send all remaining test results to the backend.

### Test Suites

A test suite comprises a set of tests that share common functionality. They can share a common initialization and teardown, and can also share some variables.

Create test suites in the test module by calling `module.suiteStart()` and passing the name of the test suite.

Call `suite.end()` when all the related tests in the suite have finished their execution.

### Tests

Each test runs inside a suite and must end in one of these three statuses: `pass`, `fail`, or `skip`. A test can optionally have additional information like attributes or error information.

Create tests in a suite by calling `suite.testStart()` and passing the name of the test. When a test ends, one of the predefined statuses must be set.

### API interface

{{< code-block lang="swift" >}}
class DDTestModule {
    // Starts the module.
    // - Parameters:
    //   - bundleName: Name of the module or bundle to test.
    //   - startTime: Optional. The time the module started.
    static func start(bundleName: String, startTime: Date? = nil) -> DDTestModule
    //
    // Ends the module.
    // - Parameters:
    //   - endTime: Optional. The time the module ended.
    func end(endTime: Date? = nil)
    // Adds a tag/attribute to the test module. Any number of tags can be added.
    // - Parameters:
    //   - key: The name of the tag. If a tag with the same name already exists,
    //     its value will be replaced by the new value.
    //   - value: The value of the tag. Can be a number or a string.
    func setTag(key: String, value: Any)
    //
    // Starts a suite in this module.
    // - Parameters:
    //   - name: Name of the suite.
    //   - startTime: Optional. The time the suite started.
    func suiteStart(name: String, startTime: Date? = nil) -> DDTestSuite
}
    //
public class DDTestSuite : NSObject {
    // Ends the test suite.
    // - Parameters:
    //   - endTime: Optional. The time the suite ended.
    func end(endTime: Date? = nil)
    // Adds a tag/attribute to the test suite. Any number of tags can be added.
    // - Parameters:
    //   - key: The name of the tag. If a tag with the same name already exists,
    //     its value will be replaced by the new value.
    //   - value: The value of the tag. Can be a number or a string.
    func setTag(key: String, value: Any)
    //
    // Starts a test in this suite.
    // - Parameters:
    //   - name: Name of the test.
    //   - startTime: Optional. The time the test started.
    func testStart(name: String, startTime: Date? = nil) -> DDTest
}
    //
public class DDTest : NSObject {
    // Adds a tag/attribute to the test. Any number of tags can be added.
    // - Parameters:
    //   - key: The name of the tag. If a tag with the same name already exists,
    //     its value will be replaced by the new value.
    //   - value: The value of the tag. Can be a number or a string.
    func setTag(key: String, value: Any)
    //
    // Adds error information to the test. Only one errorInfo can be reported by a test.
    // - Parameters:
    //   - type: The type of error to be reported.
    //   - message: The message associated with the error.
    //   - callstack: Optional. The callstack associated with the error.
    func setErrorInfo(type: String, message: String, callstack: String? = nil)
    //
    // Ends the test.
    // - Parameters:
    //   - status: The status reported for this test.
    //   - endTime: Optional. The time the test ended.
    func end(status: DDTestStatus, endTime: Date? = nil)
}
    //
// Possible statuses reported by a test:
enum DDTestStatus {
  // The test passed.
  case pass
  //
  //The test failed.
  case fail
  //
  //The test was skipped.
  case skip
}
{{< /code-block >}}

### Code example

The following code represents a simple usage of the API:

{{< code-block lang="swift" >}}
import DatadogSDKTesting
let module = DDTestModule.start(bundleName: "ManualModule")
let suite1 = module.suiteStart(name: "ManualSuite 1")
let test1 = suite1.testStart(name: "Test 1")
test1.setTag(key: "key", value: "value")
test1.end(status: .pass)
let test2 = suite1.testStart(name: "Test 2")
test2.SetErrorInfo(type: "Error Type", message: "Error message", callstack: "Optional callstack")
test2.end(test: test2, status: .fail)
suite1.end()
let suite2 = module.suiteStart(name: "ManualSuite 2")
..
..
module.end()
{{< /code-block >}}

Always call `module.end()` at the end so that all the test info is flushed to Datadog.

## Best practices

Follow these practices to take full advantage of the testing framework and CI Visibility.

### Generate symbols file when building

Build your code in Xcode using `DWARF with dSYM File` (or `-Xswiftc -debug-info-format=dwarf` if building with `swift`)

The testing framework uses symbol files for some of its functionality, including: symbolicating crashes, reporting test source location, and reporting code owners. It automatically generates the symbol file when debug symbols are embedded in the binaries, but it can take some extra time to load.

### Disable sandbox for UI Tests on macOS

In some Xcode versions, UI Test bundles are built with a sandbox by default. The settings that come with a sandbox prevent the testing framework from being run by some system commands with `xcrun`, so you need to disable it.

Disable the sandbox by adding Entitlements to the UI Test runner bundle, then adding `App Sandbox = NO` to them. You can also create an `.entitlement` file and add it to the Signing Build Settings. This file should should include the following content:

{{< code-block lang="xml" >}}
<key>com.apple.security.app-sandbox</key>
 <false/>
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/#test-suite-level-visibility
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /getting_started/site/
[4]: /continuous_integration/guides/rum_swift_integration
[5]: https://app.datadoghq.com/organization-settings/application-keys
[6]: https://opentelemetry.io/
[7]: /continuous_integration/intelligent_test_runner/
[8]: /getting_started/tagging/unified_service_tagging
