---
title: Java Tests
kind: documentation
aliases:
  - /continuous_integration/setup_tests/java
further_reading:
    - link: "/continuous_integration/tests/containers/"
      tag: "Documentation"
      text: "Forwarding Environment Variables for Tests in Containers"
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Compatibility

Supported test frameworks:
* JUnit >= 4.10 and >= 5.3
  * Also includes any test framework based on JUnit, such as Spock Framework and Cucumber-Junit. **Note**: Only Cucumber v1, which uses JUnit 4, is supported.
* TestNG >= 6.4

Supported build systems:
* Gradle >= 2.0
* Maven >= 3.2.1

## Configuring reporting method

To report test results to Datadog, you need to configure the Datadog Java library:

{{< tabs >}}

{{% tab "On-Premises CI provider (Datadog Agent)" %}}

If you are running tests on an on-premises CI provider, such as Jenkins or self-managed GitLab CI, install the Datadog Agent on each worker node by following the [Agent installation instructions][1]. This is the recommended option as test results are then automatically linked to the underlying host metrics.

If the CI provider is using a container-based executor, set the `DD_AGENT_HOST` environment variable on all builds (which defaults to `http://localhost:8126`) to an endpoint that is accessible from within build containers, as using `localhost` inside the build references the container itself and not the underlying worker node where the Datadog Agent is running.

If you are using a Kubernetes executor, Datadog recommends using the [Datadog Admission Controller][2], which automatically sets the `DD_AGENT_HOST` environment variable in the build pods to communicate with the local Datadog Agent.


[1]: /agent/
[2]: https://docs.datadoghq.com/agent/cluster_agent/admission_controller/
{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

<div class="alert alert-info">Agentless mode is available in Datadog Java library versions >= 0.101.0</div>

If you are using a cloud CI provider without access to the underlying worker nodes, such as GitHub Actions or CircleCI, configure the library to use the Agentless mode. For this, set the following environment variables:

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`

`DD_API_KEY` (Required)
: The [Datadog API key][1] used to upload the test results.<br/>
**Default**: `(empty)`

Additionally, configure which [Datadog site][2] to which you want to send data.

`DD_SITE` (Required)
: The [Datadog site][2] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}


[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
{{% /tab %}}

{{< /tabs >}}

## Downloading tracer library

You only need to download the tracer library once for each server.

If the tracer library is already available locally on the server, you can proceed directly to running the tests.

{{< tabs >}}
{{% tab "Maven" %}}

Declare `DD_TRACER_VERSION` variable with the latest version of the artifacts accessible from the [Maven Repository][1] (without the preceding `v`: ![Maven Central][2]):

{{< code-block lang="shell" >}}
DD_TRACER_VERSION=... // e.g. 1.13.0
{{< /code-block >}}

Run the command below to download the tracer JAR to your local Maven repository:

{{< code-block lang="shell" >}}
mvn org.apache.maven.plugins:maven-dependency-plugin:get -Dartifact=com.datadoghq:dd-java-agent:$DD_TRACER_VERSION
{{< /code-block >}}

[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-java-agent
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-java-agent?style=flat-square

{{% /tab %}}
{{% tab "Gradle" %}}

Declare `DD_TRACER_VERSION` variable with the latest version of the artifacts accessible from the [Maven Repository][1] (without the preceding `v`: ![Maven Central][2]):

{{< code-block lang="shell" >}}
DD_TRACER_VERSION=... // e.g. 1.13.0
{{< /code-block >}}

Declare `DD_TRACER_FOLDER` variable with the path to the folder where you want to store the downloaded JAR:

{{< code-block lang="shell" >}}
DD_TRACER_FOLDER=... // e.g. ~/.datadog
{{< /code-block >}}

Run the command below to download the tracer JAR to the specified folder:

{{< code-block lang="shell" >}}
curl https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent/$DD_TRACER_VERSION/dd-java-agent-$DD_TRACER_VERSION.jar --output $DD_TRACER_FOLDER/dd-java-agent-$DD_TRACER_VERSION.jar
{{< /code-block >}}

[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-java-agent
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-java-agent?style=flat-square

{{% /tab %}}
{{< /tabs >}}

## Running your tests

{{< tabs >}}
{{% tab "Maven" %}}

Make sure to set the `DD_TRACER_VERSION` environment variable to the tracer version you have previously downloaded.

Run your tests using the `MAVEN_OPTS` environment variable to specify the path to the Datadog Java Tracer JAR.

When specifying tracer arguments, include the following:

* Enable CI visibility by setting the `dd.civisibility.enabled` property to `true`.
* Define the environment where the tests are being run using the `dd.env property` (e.g. `local` when running tests on a developer workstation or `ci` when running them on a CI provider).
* Define the name of the service or library being tested in the `dd.service property`.

For example:

{{< code-block lang="shell" >}}
MVN_LOCAL_REPO=$(mvn help:evaluate -Dexpression=settings.localRepository -DforceStdout -q)
MAVEN_OPTS=-javaagent:$MVN_LOCAL_REPO/com/datadoghq/dd-java-agent/$DD_TRACER_VERSION/dd-java-agent-$DD_TRACER_VERSION.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app \
mvn clean verify -Pdd-civisibility
{{< /code-block >}}

{{% /tab %}}
{{% tab "Gradle" %}}

Make sure to set the `DD_TRACER_VERSION` environment variable to the tracer version you have previously downloaded, and `DD_TRACER_FOLDER` variable to the path where you have downloaded the tracer.

Run your tests using the `org.gradle.jvmargs` system property to specify the path to the Datadog Java Tracer JAR.

When specifying tracer arguments, include the following:

* Enable CI visibility by setting the `dd.civisibility.enabled` property to `true`.
* Define the environment where the tests are being run using the `dd.env property` (e.g. `local` when running tests on a developer workstation or `ci` when running them on a CI provider).
* Define the name of the service or library being tested in the `dd.service property`.

For example:

{{< code-block lang="shell" >}}
./gradlew cleanTest test -Pdd-civisibility --rerun-tasks -Dorg.gradle.jvmargs=\
-javaagent:$DD_TRACER_FOLDER/dd-java-agent-$DD_TRACER_VERSION.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app
{{< /code-block >}}

Specifying `org.gradle.jvmargs` in the command line overrides the value specified elsewhere. If you have this property specified in a `gradle.properties` file, be sure to replicate the necessary settings in the command line invocation.

**Note:** CI Visibility is not compatible with [Gradle Configuration Cache][1], so do not enable the cache when running your tests with the tracer.

[1]: https://docs.gradle.org/current/userguide/configuration_cache.html

{{% /tab %}}
{{< /tabs >}}

### Adding custom tags to tests

You can add custom tags to your tests by using the current active span:

```java
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test_owner", "my_team");
}
// test continues normally
// ...
```

To create filters or `group by` fields for these tags, you must first create facets. For more information about adding tags, see the [Adding Tags][1] section of the Java custom instrumentation documentation.

## Manual testing API

If you use one of the supported testing frameworks, the Java Tracer automatically instruments your tests and sends the results to the Datadog backend.

If you are using a framework that is not supported, or an ad-hoc testing solution, you can harness the manual testing API, which also reports test results to the backend.

### Adding manual API dependency

Manual API classes are available in the `com.datadoghq:dd-trace-api` artifact.

{{< tabs >}}
{{% tab "Maven" %}}

Add the trace API dependency to your Maven project, replacing `$VERSION` with the latest version of the tracer accessible from the [Maven Repository][1] (without the preceding `v`: ![Maven Central][2]):

{{< code-block lang="xml" filename="pom.xml" >}}
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-trace-api</artifactId>
    <version>$VERSION</version>
    <scope>test</scope>
</dependency>
{{< /code-block >}}

[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-trace-api?style=flat-square
{{% /tab %}}
{{% tab "Gradle" %}}

Add the trace API dependency to your Maven project, replacing `$VERSION` with the latest version of the tracer accessible from the [Maven Repository][1] (without the preceding `v`: ![Maven Central][2]):

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    testImplementation "com.datadoghq:dd-trace-api:$VERSION"
}
{{< /code-block >}}

[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-trace-api?style=flat-square
{{% /tab %}}
{{< /tabs >}}

### Domain model

The API is based around four concepts: test session, test module, test suite, and test.

#### Test session

A test session represents a project build, which typically corresponds to execution of a test command issued by a user or by a CI script.

To start a test session, call `datadog.trace.api.civisibility.CIVisibility#startSession` and pass the name of the project and the name of the testing framework you used.

When all your tests have finished, call `datadog.trace.api.civisibility.DDTestSession#end`, which forces the library to send all remaining test results to the backend.

#### Test module

A test module represents a smaller unit of work within a project build, typically corresponding to a project module. For example, a Maven submodule or Gradle subproject.

To start a test mode, call `datadog.trace.api.civisibility.DDTestSession#testModuleStart` and pass the name of the module.

When the module has finished building and testing, call `datadog.trace.api.civisibility.DDTestModule#end`.

#### Test Suite

A test suite comprises a set of tests that share common functionality.
They can share a common initialization and teardown, and can also share some variables.
A single suite usually corresponds to a Java class that contains test cases.

Create test suites in a test module by calling `datadog.trace.api.civisibility.DDTestModule#testSuiteStart` and passing the name of the test suite.

Call `datadog.trace.api.civisibility.DDTestSuite#end` when all the related tests in the suite have finished their execution.

#### Test

A test represents a single test case that is executed as part of a test suite.
Usually it corresponds to a method that contains testing logic.

Create tests in a suite by calling `datadog.trace.api.civisibility.DDTestSuite#testStart` and passing the name of the test.

Call `datadog.trace.api.civisibility.DDTest#end` when a test has finished execution.

### Code Example

The following code represents a simple usage of the API:

```java
package com.datadog.civisibility.example;

import datadog.trace.api.civisibility.CIVisibility;
import datadog.trace.api.civisibility.DDTest;
import datadog.trace.api.civisibility.DDTestModule;
import datadog.trace.api.civisibility.DDTestSession;
import datadog.trace.api.civisibility.DDTestSuite;
import java.lang.reflect.Method;

// the null arguments in the calls below are optional startTime/endTime values:
// when they are not specified, current time is used
public class ManualTest {
    public static void main(String[] args) throws Exception {
        DDTestSession testSession = CIVisibility.startSession("my-project-name", "my-test-framework", null);
        testSession.setTag("my-tag", "additional-session-metadata");
        try {
            runTestModule(testSession);
        } finally {
            testSession.end(null);
        }
    }

    private static void runTestModule(DDTestSession testSession) throws Exception {
        DDTestModule testModule = testSession.testModuleStart("my-module", null);
        testModule.setTag("my-module-tag", "additional-module-metadata");
        try {
            runFirstTestSuite(testModule);
            runSecondTestSuite(testModule);
        } finally {
            testModule.end(null);
        }
    }

    private static void runFirstTestSuite(DDTestModule testModule) throws Exception {
        DDTestSuite testSuite = testModule.testSuiteStart("my-suite", ManualTest.class, null);
        testSuite.setTag("my-suite-tag", "additional-suite-metadata");
        try {
            runTestCase(testSuite);
        } finally {
            testSuite.end(null);
        }
    }

    private static void runTestCase(DDTestSuite testSuite) throws Exception {
        Method myTestCaseMethod = ManualTest.class.getDeclaredMethod("myTestCase");
        DDTest ddTest = testSuite.testStart("myTestCase", myTestCaseMethod, null);
        ddTest.setTag("my-test-case-tag", "additional-test-case-metadata");
        ddTest.setTag("my-test-case-tag", "more-test-case-metadata");
        try {
            myTestCase();
        } catch (Exception e) {
            ddTest.setErrorInfo(e); // pass error info to mark test case as failed
        } finally {
            ddTest.end(null);
        }
    }

    private static void myTestCase() throws Exception {
        // run some test logic
    }

    private static void runSecondTestSuite(DDTestModule testModule) {
        DDTestSuite secondTestSuite = testModule.testSuiteStart("my-second-suite", ManualTest.class, null);
        secondTestSuite.setSkipReason("this test suite is skipped"); // pass skip reason to mark test suite as skipped
        secondTestSuite.end(null);
    }
}
```

Always call ``datadog.trace.api.civisibility.DDTestSession#end`` at the end so that all the test info is flushed to Datadog.

## Configuration settings

The following system properties set configuration options and have environment variable equivalents. If the same key type is set for both, the system property configuration takes priority. System properties can be set as JVM flags.

`dd.service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: `unnamed-java-app`<br/>
**Example**: `my-java-app`

`dd.env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `none`<br/>
**Examples**: `local`, `ci`

`dd.trace.agent.url`
: Datadog Agent URL for trace collection in the form `http://hostname:port`.<br/>
**Environment variable**: `DD_TRACE_AGENT_URL`<br/>
**Default**: `http://localhost:8126`

All other [Datadog Tracer configuration][2] options can also be used.

**Important:** You may want to enable more integrations if you have integration tests. To enable a specific integration, use the [Datadog Tracer Compatibility][3] table to create your custom setup for your integration tests.

For example, to enable `OkHttp3` client request integration, add `-Ddd.integration.okhttp-3.enabled=true` to your setup.

### Collecting Git metadata

Datadog uses Git information for visualizing your test results and grouping them by repository, branch, and commit. Git metadata is automatically collected by the test instrumentation from CI provider environment variables and the local `.git` folder in the project path, if available.

If you are running tests in non-supported CI providers or with no `.git` folder, you can set the Git information manually using environment variables. These environment variables take precedence over any auto-detected information. Set the following environment variables to provide Git information:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored. Both HTTP and SSH URLs are supported.<br/>
**Example**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Git branch being tested. Leave empty if providing tag information instead.<br/>
**Example**: `develop`

`DD_GIT_TAG`
: Git tag being tested (if applicable). Leave empty if providing branch information instead.<br/>
**Example**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: Full commit hash.<br/>
**Example**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Commit message.<br/>
**Example**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Commit author name.<br/>
**Example**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Commit author email.<br/>
**Example**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Commit author date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Commit committer name.<br/>
**Example**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Commit committer email.<br/>
**Example**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Commit committer date in ISO 8601 format.<br/>
**Example**: `2021-03-12T16:00:28Z`

## Information collected

When CI Visibility is enabled, the following data is collected from your project:

* Test names and durations.
* Predefined environment variables set by CI providers.
* Git commit history including the hash, message, author information, and files changed (without file contents).
* Information from the CODEOWNERS file.

## Troubleshooting

### The tests are not appearing in Datadog after enabling CI Visibility in the tracer

If the tests are not appearing in Datadog, ensure that you are using version 0.91.0 or greater of the Java tracer.
The `-Ddd.civisibility.enabled=true` configuration property is only available since that version.

If you need to use a previous version of the tracer, you can configure CI Visibility by using the following system properties:
{{< code-block lang="shell" >}}
-Ddd.prioritization.type=ENSURE_TRACE -Ddd.jmxfetch.enabled=false -Ddd.integrations.enabled=false -Ddd.integration.junit.enabled=true -Ddd.integration.testng.enabled=true
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags
[2]: /tracing/trace_collection/library_config/java/?tab=containers#configuration
[3]: /tracing/trace_collection/compatibility/java
