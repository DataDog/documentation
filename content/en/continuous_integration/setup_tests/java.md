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

### Maven

Add a new Maven profile in your root `pom.xml` configuring the Datadog Java tracer dependency and the `javaagent` arg property, replacing `$VERSION` with the latest version of the tracer accessible from the [Maven Repository][2] (without the preceding `v`): ![Maven Central][7]

{{< code-block lang="xml" filename="pom.xml" >}}
<profile>
  <id>dd-civisibility</id>
  <activation>
    <activeByDefault>false</activeByDefault>
  </activation>

  <properties>
    <dd.java.agent.arg>-javaagent:${settings.localRepository}/com/datadoghq/dd-java-agent/$VERSION/dd-java-agent-$VERSION.jar</dd.java.agent.arg>
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

### Gradle

Add the `ddTracerAgent` entry to the `configurations` task block, and add the Datadog Java tracer dependency, replacing `$VERSION` with the latest version of the tracer available in the [Maven Repository][2].

{{< code-block lang="groovy" filename="build.gradle" >}}
configurations {
    ddTracerAgent
}

dependencies {
    ddTracerAgent "com.datadoghq:dd-java-agent:$VERSION"
}
{{< /code-block >}}

## Instrumenting your tests

### Maven

Configure the [Maven Surefire Plugin][3] and/or the [Maven Failsafe Plugin][4] to use Datadog Java agent, specifiying the name of the service or library under test with the `-Ddd.service` property:

{{< code-block lang="xml" filename="pom.xml" >}}
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <argLine>${dd.java.agent.arg} -Ddd.service=my-java-app -Ddd.prioritization.type=ENSURE_TRACE -Ddd.jmxfetch.enabled=false -Ddd.integrations.enabled=false -Ddd.integration.junit.enabled=true -Ddd.integration.testng.enabled=true</argLine>
  </configuration>
</plugin>
{{< /code-block >}}

{{< code-block lang="xml" filename="pom.xml" >}}
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-failsafe-plugin</artifactId>
  <configuration>
     <argLine>${dd.java.agent.arg} -Ddd.service=my-java-app -Ddd.prioritization.type=ENSURE_TRACE -Ddd.jmxfetch.enabled=false -Ddd.integrations.enabled=false -Ddd.integration.junit.enabled=true -Ddd.integration.testng.enabled=true</argLine>
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
DD_ENV=ci mvn clean verify -P dd-civisibility
{{< /code-block >}}

### Gradle

Configure the `test` Gradle task by adding to the `jvmArgs` attribute the `-javaagent` argument targeting the Datadog Java tracer based on the `configurations.ddTracerAgent` property, specifiying the name of the service or library under test with the `-Ddd.service` property:

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

## Additional configuration settings

The following system properties set configuration options and have environment variable equivalents. If the same key type is set for both, the system property configuration takes priority. System properties can be set as JVM flags.

`dd.service`
: Name of the service or library under test.<br/>
**Environment variable**: `DD_SERVICE`<br/>
**Default**: `unnamed-java-app`<br/>
**Example**: `my-java-app`

`dd.env`
: Name of the environment where tests are being run.<br/>
**Environment variable**: `DD_ENV`<br/>
**Default**: `(empty)`<br/>
**Examples**: `local`, `ci`

`dd.trace.enabled`
: Setting this to `false` completely disables the instrumentation.<br/>
**Environment variable**: `DD_TRACE_ENABLED`<br/>
**Default**: `true`

`dd.agent.host`
: The Datadog Agent hostname.<br/>
**Environment variable**: `DD_AGENT_HOST`<br/>
**Default**: `localhost`

`dd.trace.agent.port`
: The Datadog Agent trace collection port.<br/>
**Environment variable**: `DD_TRACE_AGENT_PORT`<br/>
**Default**: `8126`

All other [Datadog Tracer configuration][5] options can also be used.

**Important:** You may want to enable more integrations if you have integration tests. To enable a specific integration, use the [Datadog Tracer Compatibility][6] table to create your custom setup for your integration tests.

For example, to enable `OkHttp3` client request integration, add `-Ddd.integration.okhttp-3.enabled=true` to your setup.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/setup_tests/agent/
[2]: https://mvnrepository.com/artifact/com.datadoghq/dd-java-agent
[3]: https://maven.apache.org/surefire/maven-surefire-plugin/
[4]: https://maven.apache.org/surefire/maven-failsafe-plugin/
[5]: /tracing/setup_overview/setup/java/?tab=containers#configuration
[6]: /tracing/setup_overview/compatibility_requirements/java
[7]: https://img.shields.io/maven-central/v/com.datadoghq/dd-java-agent?style=flat-square
