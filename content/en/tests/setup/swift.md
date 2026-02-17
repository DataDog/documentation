---
title: Swift Tests
code_lang: swift
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /continuous_integration/setup_tests/swift
  - /continuous_integration/tests/swift
  - /continuous_integration/tests/setup/swift
further_reading:
    - link: "/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/tests/test_impact_analysis/swift"
      tag: "Documentation"
      text: "Speed up your test jobs with Test Impact Analysis"
    - link: "/tests/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting Test Optimization"
---

## Compatibility

Supported languages:

| Language    | Version |
| ----------- | ------- |
| Swift       | >= 5.9  |
| Objective-C | >= 2.0  |
| Xcode       | >= 16.0 |

Supported platforms:

| Platform     | Version  |
| ------------ | -------- |
| iOS / iPadOS | >= 12.0  |
| macOS        | >= 10.13 |
| tvOS         | >= 12.0  |
| macCatalyst  | >= 13.0  |

## Installing the Swift testing SDK

There are three ways you can install the testing framework:

{{< tabs >}}
{{% tab "Swift Package Manager" %}}

### Using Xcode Project

1. Add `dd-sdk-swift-testing` package to your project. It is located at [`https://github.com/DataDog/dd-sdk-swift-testing`][1].

{{< img src="continuous_integration/swift_package.png" alt="Swift Package" >}}


2. Link your test targets with the library `DatadogSDKTesting` from the package.

{{< img src="continuous_integration/swift_link2.png" alt="Swift Linking SPM" >}}

3. If you run UI Tests and don't use RUM, also add the dependency to your applications running the tests.

### Using Swift Package Project

1. Add `dd-sdk-swift-testing` to your package dependencies array, for example:

{{< code-block lang="swift" >}}
.package(url: "https://github.com/DataDog/dd-sdk-swift-testing.git", from: "2.5.3")
{{< /code-block >}}

2. To add the testing framework to your testing targets' dependencies, add the following line to your test targets dependencies array:
{{< code-block lang="swift" >}}
.product(name: "DatadogSDKTesting", package: "dd-sdk-swift-testing")
{{< /code-block >}}


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

{{% /tab %}}
{{% tab "Framework linking" %}}

1. Download and decompress `DatadogSDKTesting.zip` from the [release][1] page.

2. Copy and link your test targets with the resulting XCFramework.

{{< img src="continuous_integration/swift_link.png" alt="Swift Linking XCFramework" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">This framework is useful only for testing and should only be linked with the application when running tests. Do not distribute the framework to your users. </div>

## Instrumenting your tests

### Configuring SDK

#### Using Xcode Project

To enable testing instrumentation, add the following environment variables to your test target or in the `Info.plist` file as [described below](#using-infoplist-for-configuration). You **must** select your main target in `Expand variables based on` or `Target for Variable Expansion` if you are using test plans:

{{< img src="continuous_integration/swift_env.png" alt="Swift Environments" >}}

<div class="alert alert-danger">You should have your main target in the variables expansion of the environment variables; if not selected, variables are not valid. </div>

For UI Tests, environment variables need to be set only in the test target, because the framework automatically injects these values to the application.

#### Using Swift Package Project

To enable testing instrumentation, you must set the following environment variables to your commandline execution for the tests. You can alternatively set them in the environment before running the tests or you can prepend them to the command:

<pre>
<code>
DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> SRCROOT=$PWD swift test ...

or

DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> SRCROOT=$PWD xcodebuild test -scheme ...
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

`DD_TEST_SESSION_NAME`
: Identifies a group of tests, such as `integration-tests`, `unit-tests` or `smoke-tests`.<br/>
**Environment variable**: `DD_TEST_SESSION_NAME`<br/>
**Default**: (CI job name + test command)<br/>
**Example**: `unit-tests`, `integration-tests`, `smoke-tests`

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
DD_TEST_RUNNER=1 DD_SITE={{< region-param key="dd_site" >}} xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=arm64" \
  test
</code>
</pre>

### UI tests

### RUM Integration

If the application being tested is instrumented using RUM, your UI tests results and their generated RUM sessions are automatically linked. Learn more about RUM in the [RUM iOS Integration][4] guide. An iOS RUM version >= 1.10 is needed.

Environment variables need to be set only in the test target, because the framework automatically injects these values to the application.

### Test Optimisation SDK

If you don't use RUM, you can link your application target with the Test SDK. The SDK adds auto-instrumentation to your application, gathers network requests and logs, and attaches them to the test traces.

Environment variables need to be set only in the test target, because the framework automatically injects these values to the application.

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
<div class="alert alert-danger">If you disable crash reporting, tests that crash are not reported at all, and don't appear as test failures. If you need to disable crash handling for any of your tests, run them as a separate target, so you don't disable it for the others.</div>

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

### Inside a test method

You can add custom tags inside your test methods. The static property `DDTest.current` will return the current test instance if called inside the test method scope.

{{< code-block lang="swift" >}}
// Somewhere inside the test method
DDTest.current?.setTag(key: "key1", value: "value1")
// test continues normally
// ...
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

In Xcode, you can enable gathering of code coverage in your Test Plan or Test Scheme, depending on your project configuration.

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

## Best practices

Follow these practices to take full advantage of the testing framework and Test Optimization.

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

### Test session name `DD_TEST_SESSION_NAME`

Use `DD_TEST_SESSION_NAME` to define the name of the test session and the related group of tests. Examples of values for this tag would be:

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

If `DD_TEST_SESSION_NAME` is not specified, the default value used is a combination of the:

- CI job name
- Command used to run the tests (such as `swift test`)

The test session name needs to be unique within a repository to help you distinguish different groups of tests.

#### When to use `DD_TEST_SESSION_NAME`

There's a set of parameters that Datadog checks to establish correspondence between test sessions. The test command used to execute the tests is one of them. If the test command contains a string that changes for every execution, such as a temporary folder, Datadog considers the sessions to be unrelated to each other. For example:

- `swift test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recommends using `DD_TEST_SESSION_NAME` if your test commands vary between executions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/#test-suite-level-visibility
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /getting_started/site/
[4]: /tests/swift_tests/
[5]: https://app.datadoghq.com/organization-settings/application-keys
[6]: https://opentelemetry.io/
[7]: /tests/test_impact_analysis/
[8]: /getting_started/tagging/unified_service_tagging
