---
title: Java Tests
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

Supported test frameworks:
* JUnit >= 4.10 and >= 5.3
  * Also includes any test framework based on JUnit, such as Spock Framework and Cucumber-Junit
* TestNG >= 6.4

## Prerequisites

[Install the Datadog Agent to collect tests data][1].

## Installing the Java tracer

{{< tabs >}}
{{% tab "Maven" %}}

Add a new Maven profile in your root `pom.xml` configuring the Datadog Java tracer dependency and the `javaagent` arg property, replacing `$VERSION` with the latest version of the tracer accessible from the [Maven Repository][1] (without the preceding `v`): ![Maven Central][2]

{{< code-block lang="xml" filename="pom.xml" >}}
<profile>
  <id>dd-civisibility</id>
  <activation>
    <activeByDefault>false</activeByDefault>
  </activation>
  <properties>
    <dd.java.agent.arg>-javaagent:${settings.localRepository}/com/datadoghq/dd-java-agent/$VERSION/dd-java-agent-$VERSION.jar -Ddd.service=my-java-app -Ddd.prioritization.type=ENSURE_TRACE -Ddd.jmxfetch.enabled=false -Ddd.integrations.enabled=false -Ddd.integration.junit.enabled=true -Ddd.integration.testng.enabled=true</dd.java.agent.arg>
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

Add the `ddTracerAgent` entry to the `configurations` task block, and add the Datadog Java tracer dependency, replacing `$VERSION` with the latest version of the tracer available in the [Maven Repository][1] (without the preceding `v`): ![Maven Central][2]

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

## Instrumenting your tests

{{< tabs >}}
{{% tab "Maven" %}}

Configure the [Maven Surefire Plugin][1] or the [Maven Failsafe Plugin][2] (or both if you use both) to use Datadog Java agent, specifying the name of the service or library under test with the `-Ddd.service` property:

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

Run your tests as you normally do, specifying the environment where tests are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

{{< code-block lang="bash" >}}
DD_ENV=ci mvn clean verify -Pdd-civisibility
{{< /code-block >}}


[1]: https://maven.apache.org/surefire/maven-surefire-plugin/
[2]: https://maven.apache.org/surefire/maven-failsafe-plugin/
{{% /tab %}}
{{% tab "Gradle" %}}

Configure the `test` Gradle task by adding to the `jvmArgs` attribute the `-javaagent` argument targeting the Datadog Java tracer based on the `configurations.ddTracerAgent` property, specifying the name of the service or library under test with the `-Ddd.service` property:

{{< code-block lang="groovy" filename="build.gradle" >}}
test {
  if(project.hasProperty("dd-civisibility")) {
    jvmArgs = ["-javaagent:${configurations.ddTracerAgent.asPath}", "-Ddd.service=my-java-app", "-Ddd.prioritization.type=ENSURE_TRACE", "-Ddd.jmxfetch.enabled=false", "-Ddd.integrations.enabled=false", "-Ddd.integration.junit.enabled=true", "-Ddd.integration.testng.enabled=true"]
  }
}
{{< /code-block >}}

Run your tests as you normally do, specifying the environment where test are being run (for example, `local` when running tests on a developer workstation, or `ci` when running them on a CI provider) in the `DD_ENV` environment variable. For example:

{{< code-block lang="bash" >}}
DD_ENV=ci ./gradlew cleanTest test -Pdd-civisibility --rerun-tasks
{{< /code-block >}}

**Note:** As Gradle builds can be customizable programmatically, you may need to adapt these steps to your specific build configuration.

{{% /tab %}}
{{< /tabs >}}

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

Git information is required for the proper visualization of test results, and used to group them by repository, branch and commit. This is automatically collected by the test instrumentation using CI provider environment variables and the local `.git` folder at the project path, if available.

If running tests in non-supported CI providers or with no `.git` folder, Git information can be set manually using environment variables. These environment variables take precedence over any autodetected information.
The supported environment variables for providing Git information are the following:

`DD_GIT_REPOSITORY_URL`
: URL of the repository where the code is stored. Both HTTP and SSH URLs are supported.
**Example**: `git@github.com:MyCompany/MyApp.git`, `https://github.com/MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Git branch being tested. Leave empty if providing tag information instead.
**Example**: `develop`

`DD_GIT_TAG`
: Git tag being tested (if applicable). Leave empty if providing branch information instead.
**Example**: `1.0.1`

`DD_GIT_COMMIT_SHA`
: Full commit hash.
**Example**: `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Commit message.
**Example**: `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Commit author name.
**Example**: `John Doe`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: Commit author email.
**Example**: `john@doe.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Commit author date in ISO 8601 format.
**Example**: `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
:Commit committer name.
**Example**: `Jane Doe`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: Commit committer email.
**Example**: `jane@doe.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Commit committer date in ISO 8601 format.
**Example**: `2021-03-12T16:00:28Z`


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/setup_tests/agent/
[2]: /tracing/setup_overview/setup/java/?tab=containers#configuration
[3]: /tracing/setup_overview/compatibility_requirements/java
