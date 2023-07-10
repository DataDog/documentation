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

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}

{{% ci-agent %}}

{{% /tab %}}

{{% tab "Cloud CI provider (Agentless)" %}}

<div class="alert alert-info">Agentless mode is available in Datadog Java library versions >= 0.101.0</div>

{{% ci-agentless %}}

{{% /tab %}}
{{< /tabs >}}

## Downloading tracer library

You only need to download the tracer library once for each server.

If the tracer library is already available locally on the server, you can proceed directly to running the tests.

{{< tabs >}}
{{% tab "Maven" %}}

Declare `DD_TRACER_VERSION` variable with the latest version of the artifacts accessible from the [Maven Repository][1] (without the preceding `v`: ![Maven Central][2]):

{{< code-block lang="shell" >}}
DD_TRACER_VERSION=... // e.g. 1.14.0
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
DD_TRACER_VERSION=... // e.g. 1.14.0
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
* Define the environment where the tests are being run using the `dd.env property` (for example `local` when running tests on a developer workstation or `ci` when running them on a CI provider).
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

Make sure to set the `DD_TRACER_VERSION` environment variable to the tracer version you have previously downloaded, and the `DD_TRACER_FOLDER` variable to the path where you have downloaded the tracer.

Run your tests using the `org.gradle.jvmargs` system property to specify the path to the Datadog Java Tracer JAR.

When specifying tracer arguments, include the following:

* Enable CI visibility by setting the `dd.civisibility.enabled` property to `true`.
* Define the environment where the tests are being run using the `dd.env property` (for example `local` when running tests on a developer workstation or `ci` when running them on a CI provider).
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

[Datadog Tracer configuration][2] options can be used for fine-tuning the tracer behavior.

{{% ci-git-metadata %}}

{{% ci-information-collected %}}

## Troubleshooting

### The tests are not appearing in Datadog after enabling CI Visibility in the tracer

Ensure that you are using the latest version of the tracer.

Verify that your build system and testing framework are supported by CI Visibility. See the list of [supported build systems and test frameworks](#compatibility).

Ensure that the `dd.civisibility.enabled` property is set to `true` in the tracer arguments.

Check the build output for any errors that indicate tracer misconfiguration, such as an unset `DD_API_KEY` environment variable.

### Tests or source code compilation fails when building a project with the tracer attached

By default, CI Visibility runs Java code compilation with a compiler plugin attached.

The plugin is optional, as it only serves to reduce the performance overhead.

Depending on the build configuration, adding the plugin can sometimes disrupt the compilation process.

If the plugin interferes with the build, disable it by adding `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` to the list of `-javaagent` arguments.

### Tests fail when building a project with the tracer attached

In some cases attaching the tracer can break tests, especially if they run asserts on the internal state of the JVM or instances of third-party libraries' classes.

While the best approach is such cases is to update the tests, there is also a quicker option of disabling the tracer's third-party library integrations.

The integrations provide additional insights into what happens in the tested code and are especially useful in integration tests, to monitor things like HTTP requests or database calls.
They are enabled by default.

To disable a specific integration, refer to the [Datadog Tracer Compatibility][3] table for the relevant configuration property names.
For example, to disable `OkHttp3` client request integration, add `dd.integration.okhttp-3.enabled=false` to the list of `-javaagent` arguments.

To disable all integrations, augment the list of `-javaagent` arguments with `dd.trace.enabled=false`.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags
[2]: /tracing/trace_collection/library_config/java/?tab=containers#configuration
[3]: /tracing/trace_collection/compatibility/java#integrations
