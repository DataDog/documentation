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
{{% tab "Cloud CI provider (Agentless)" %}}

Datadog recommends configuring the library to use the Agentless mode so certain features such as Test Session Level Visibility are available. For this, set the following environment variables:

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
{{% tab "On-Premises CI provider (Datadog Agent)" %}}

If you are running tests on an on-premises CI provider such as Jenkins or self-managed GitLab CI, you can install the Datadog Agent on each worker node by following the [Agent installation instructions][1]. You can also run CI Visibility on an on-premises CI provider with Agentless mode.

If the CI provider is using a container-based executor, set the `DD_AGENT_HOST` environment variable on all builds (which defaults to `http://localhost:8126`) to an endpoint that is accessible from within build containers, because `localhost` inside the build references the container itself, not the underlying worker node where the Datadog Agent is running.

If you are using a Kubernetes executor, Datadog recommends using the [Datadog Admission Controller][2], which automatically sets the `DD_AGENT_HOST` environment variable in the build pods to communicate with the local Datadog Agent.


[1]: /agent/
[2]: https://docs.datadoghq.com/agent/cluster_agent/admission_controller/

{{% /tab %}}
{{< /tabs >}}

## Installing the Java tracer

Install and enable the Java tracer v0.101.0 or later.

{{< tabs >}}
{{% tab "Maven" %}}

Add a Maven profile in your root `pom.xml` configuring the Datadog Java tracer dependency and the `javaagent` arg property, replacing `$VERSION` with the latest version of the tracer accessible from the [Maven Repository][1] (without the preceding `v`: ![Maven Central][2]), and specifying the name of the service or library under test with the `-Ddd.service` property:

{{< code-block lang="xml" filename="pom.xml" >}}
<profile>
  <id>dd-civisibility</id>
  <activation>
    <activeByDefault>false</activeByDefault>
  </activation>
  <properties>
    <dd.java.agent.arg>-javaagent:${settings.localRepository}/com/datadoghq/dd-java-agent/$VERSION/dd-java-agent-$VERSION.jar -Ddd.service=my-java-app -Ddd.civisibility.enabled=true</dd.java.agent.arg>
  </properties>
  <dependencies>
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-java-agent</artifactId>
        <version>$VERSION</version>
        <scope>provided</scope>
    </dependency>
  </dependencies>
</profile>
{{< /code-block >}}


[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-java-agent
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-java-agent?style=flat-square
{{% /tab %}}
{{% tab "Gradle" %}}

Add the `ddTracerAgent` entry to the `configurations` task block, and add the Datadog Java tracer dependency, replacing `$VERSION` with the latest version of the tracer available in the [Maven Repository][1] (without the preceding `v`: ![Maven Central][2]):

{{< code-block lang="groovy" filename="build.gradle" >}}
configurations {
    ddTracerAgent
}
dependencies {
    ddTracerAgent "com.datadoghq:dd-java-agent:$VERSION"
}
{{< /code-block >}}


[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-java-agent
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-java-agent?style=flat-square
{{% /tab %}}
{{< /tabs >}}

### Installing the Java compiler plugin

The Java compiler plugin works in combination with the Java tracer, and provides it with additional source code information. Installing the plugin is an optional step that improves performance and accuracy of certain CI visibility features.

The plugin works with the standard `javac` compiler. Eclipse JDT compiler is not supported.

If the configuration is successful, you should see the line `DatadogCompilerPlugin initialized` in your compiler's output.

{{< tabs >}}
{{% tab "Maven" %}}

Include the snippets below in the relevant sections of the same Maven profile that you have added to your root `pom.xml` for the tracer configuration.
Replace `$VERSION` with the latest version of the artifacts accessible from the [Maven Repository][1] (without the preceding `v`: ![Maven Central][2]):

{{< code-block lang="xml" filename="pom.xml" >}}
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>dd-javac-plugin-client</artifactId>
    <version>$VERSION</version>
</dependency>
{{< /code-block >}}

{{< code-block lang="xml" filename="pom.xml" >}}
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.5</version>
            <configuration>
                <annotationProcessorPaths>
                    <annotationProcessorPath>
                        <groupId>com.datadoghq</groupId>
                        <artifactId>dd-javac-plugin</artifactId>
                        <version>$VERSION</version>
                    </annotationProcessorPath>
                </annotationProcessorPaths>
                <compilerArgs>
                    <arg>-Xplugin:DatadogCompilerPlugin</arg>
                </compilerArgs>
            </configuration>
        </plugin>
    </plugins>
</build>
{{< /code-block >}}

The Maven compiler plugin supports the [`annotationProcessorPaths`][3] property starting with version 3.5. If you have to use an older version, declare the Datadog compiler plugin as a regular dependency in your project.

Additionally, if you are using JDK 16 or later, add the following lines to the [`.mvn/jvm.config`][4] file in your project's base directory:

{{< code-block lang="properties" filename=".mvn/jvm.config" >}}
--add-exports=jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED
--add-exports=jdk.compiler/com.sun.tools.javac.code=ALL-UNNAMED
--add-exports=jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED
--add-exports=jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED
{{< /code-block >}}

[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-javac-plugin
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-javac-plugin?style=flat-square
[3]: https://maven.apache.org/plugins/maven-compiler-plugin/compile-mojo.html#annotationProcessorPaths
[4]: https://maven.apache.org/configure.html#mvn-jvm-config-file

{{% /tab %}}
{{% tab "Gradle" %}}

Add the plugin-client JAR to the project's classpath, add the plugin JAR to the compiler's annotation processor path, and pass the plugin argument to the tasks that compile Java classes.

Replace `$VERSION` with the latest version of the artifacts accessible from the [Maven Repository][1] (without the preceding `v`: ![Maven Central][2]):

{{< code-block lang="groovy" filename="build.gradle" >}}
if (project.hasProperty("dd-civisibility")) {
    dependencies {
        implementation 'com.datadoghq:dd-javac-plugin-client:$VERSION'
        annotationProcessor 'com.datadoghq:dd-javac-plugin:$VERSION'
        testAnnotationProcessor 'com.datadoghq:dd-javac-plugin:$VERSION'
    }

    tasks.withType(JavaCompile).configureEach {
        options.compilerArgs.add('-Xplugin:DatadogCompilerPlugin')
    }
}
{{< /code-block >}}

Additionally, if you are using JDK 16 or later, add the following lines to your [gradle.properties][3] file:

{{< code-block lang="properties" filename="gradle.properties" >}}
org.gradle.jvmargs=\
--add-exports=jdk.compiler/com.sun.tools.javac.api=ALL-UNNAMED  \
--add-exports=jdk.compiler/com.sun.tools.javac.code=ALL-UNNAMED \
--add-exports=jdk.compiler/com.sun.tools.javac.tree=ALL-UNNAMED \
--add-exports=jdk.compiler/com.sun.tools.javac.util=ALL-UNNAMED
{{< /code-block >}}

[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-javac-plugin
[2]: https://img.shields.io/maven-central/v/com.datadoghq/dd-javac-plugin?style=flat-square
[3]: https://docs.gradle.org/current/userguide/build_environment.html#sec:gradle_configuration_properties

{{% /tab %}}
{{< /tabs >}}

## Instrumenting your tests

{{< tabs >}}
{{% tab "Maven" %}}

Configure the [Maven Surefire Plugin][1] or the [Maven Failsafe Plugin][2] (or both if you use both) to use the Datadog Java Agent:

* If using the [Maven Surefire Plugin][1]:

{{< code-block lang="xml" filename="pom.xml" >}}
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <argLine>${dd.java.agent.arg}</argLine>
  </configuration>
</plugin>
{{< /code-block >}}

* If using the [Maven Failsafe Plugin][2]:

{{< code-block lang="xml" filename="pom.xml" >}}
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-failsafe-plugin</artifactId>
  <configuration>
     <argLine>${dd.java.agent.arg}</argLine>
  </configuration>
  <executions>
      <execution>
        <goals>
           <goal>integration-test</goal>
           <goal>verify</goal>
        </goals>
      </execution>
  </executions>
</plugin>
{{< /code-block >}}

[1]: https://maven.apache.org/surefire/maven-surefire-plugin/
[2]: https://maven.apache.org/surefire/maven-failsafe-plugin/
{{% /tab %}}
{{% tab "Gradle" %}}

Configure the `test` Gradle task by adding to the `jvmArgs` attribute the `-javaagent` argument targeting the Datadog Java tracer based on the `configurations.ddTracerAgent` property, specifying the name of the service or library under test with the `-Ddd.service` property:

{{< code-block lang="groovy" filename="build.gradle" >}}
test {
  if(project.hasProperty("dd-civisibility")) {
    jvmArgs = ["-javaagent:${configurations.ddTracerAgent.asPath}", "-Ddd.service=my-java-app", "-Ddd.civisibility.enabled=true"]
  }
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Running your tests

{{< tabs >}}
{{% tab "Maven" %}}

Run your tests using the `MAVEN_OPTS` environment variable to specify a path to the Datadog Java Tracer JAR.

In the tracer arguments, specify the following:

* CI Visibility is enabled by setting the `dd.civisibility.enabled` property to `true`.
* The environment where tests are being run (for example, `local` when running tests on a developer workstation or `ci` when running them on a CI provider) is defined in the `dd.env` property.
* The name of the service or library that is being tested is defined in the `dd.service` property.

For example:

{{< code-block lang="shell" >}}
MAVEN_OPTS=-javaagent:$HOME/.m2/repository/com/datadoghq/dd-java-agent/${VERSION}/dd-java-agent-${VERSION}.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app \
mvn clean verify -Pdd-civisibility
{{< /code-block >}}

{{% /tab %}}
{{% tab "Gradle" %}}

Run your tests using the `org.gradle.jvmargs` system property to specify a path to the Datadog Java Tracer JAR.

In the tracer arguments, specify the following:

* CI Visibility is enabled by setting the `dd.civisibility.enabled` property to `true`.
* The environment where tests are being run (for example, `local` when running tests on a developer workstation or `ci` when running them on a CI provider) is defined in the `dd.env` property.
* The name of the service or library that is being tested is defined in the `dd.service` property.

For example:

{{< code-block lang="shell" >}}
./gradlew cleanTest test -Pdd-civisibility --rerun-tasks -Dorg.gradle.jvmargs=\
-javaagent:$HOME/.m2/repository/com/datadoghq/dd-java-agent/${VERSION}/dd-java-agent-${VERSION}.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app
{{< /code-block >}}

**Note:** As Gradle builds can be customizable programmatically, you may need to adapt these steps to your specific build configuration.

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
