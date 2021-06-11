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

Supported Test frameworks:
* JUnit 4.10+
* JUnit 5.3+
* TestNG 6.4+
* Frameworks that are based on JUnit, such as Spock Framework and Cucumber-Junit

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

## Prerequisites

[Install the Datadog Agent to collect tests data][1].

## Installing the Java tracer

### Using Maven

Add a new Maven profile in your root `pom.xml` configuring the Datadog Java tracer dependency and the `javaagent` arg property, replacing `$VERSION` with the latest version of the tracer accessible from the [Maven Repository][2]: 

{{< code-block lang="xml" >}}
<profile>
  <id>ci-app</id>
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

### Using Gradle

Add the `ddTracerAgent` entry to the `configurations` task block, and add the Datadog Java tracer dependency, replacing `$VERSION` with the latest version of the tracer available in the [Maven Repository][2].

{{< code-block lang="groovy" >}}
configurations {
    ddTracerAgent
}

dependencies {
    ddTracerAgent "com.datadoghq:dd-java-agent:$VERSION"
}
{{< /code-block >}}

## Instrumenting your tests

### Using Maven

Configure the [Maven Surefire Plugin][3] and/or the [Maven Failsafe Plugin][4] to use Datadog Java agent (use `-Ddd.integration.testng.enabled=true` if your testing framework is TestNG rather than JUnit):

{{< code-block lang="xml" >}}
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <argLine>${dd.java.agent.arg} -Ddd.prioritization.type=ENSURE_TRACE -Ddd.jmxfetch.enabled=false -Ddd.integrations.enabled=false -Ddd.integration.junit.enabled=true</argLine>
  </configuration>
</plugin>

<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-failsafe-plugin</artifactId>
  <configuration>
     <argLine>${dd.java.agent.arg} -Ddd.prioritization.type=ENSURE_TRACE -Ddd.jmxfetch.enabled=false -Ddd.integrations.enabled=false -Ddd.integration.junit.enabled=true</argLine>
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

Run your tests using the `ci-app` profile, for example:

{{< code-block lang="bash" >}}
mvn clean verify -P ci-app
{{< /code-block >}}

### Using Gradle

Configure the `test` Gradle task by adding to the `jvmArgs` attribute the `-javaagent` argument targeting the Datadog Java tracer based on the `configurations.ddTracerAgent` property (use `-Ddd.integration.testng.enabled=true` if your testing framework is TestNG rather than JUnit):

{{< code-block lang="groovy" >}}
test {
    jvmArgs = ["-javaagent:${configurations.ddTracerAgent.asPath}", "-Ddd.prioritization.type=ENSURE_TRACE", "-Ddd.jmxfetch.enabled=false", "-Ddd.integrations.enabled=false", "-Ddd.integration.junit.enabled=true"]
}
{{< /code-block >}}

Run your tests as you normally do, for example:

{{< code-block lang="bash" >}}
./gradlew cleanTest test --rerun-tasks
{{< /code-block >}}

**Important:** As Gradle builds can be customizable programmatically, you may need to adapt these steps to your specific build configuration.

## Configuration options

The following system properties set configuration options and have environment variable equivalents. If the same key type is set for both, the system property configuration takes priority. System properties can be set as JVM flags.

`dd.integration.junit.enabled`
: When `true`, tests based on JUnit runners are reported.<br/>
**Environment variable**: `DD_INTEGRATION_JUNIT_ENABLED`<br/>
**Default**: `false`

`dd.integration.testng.enabled`
: When `true`, tests based on TestNG are reported.<br/>
**Environment variable**: `DD_INTEGRATION_TESTNG_ENABLED`<br/>
**Default**: `false`

Additionally, set the tracer prioritization type to `EnsureTrace` to avoid dropping test spans.

`dd.prioritization.type`
: Set to `ENSURE_TRACE` to avoid dropping tests spans by the tracer.<br/>
**Environment variable**: `DD_PRIORITIZATION_TYPE`<br/>
**Default**: `FAST_LANE`

All [Datadog tracer configuration][5] options can be used during the test phase.

### Recommended configuration

To improve the Datadog Java Agent startup, follow these configuration settings:

System property: `dd.service`
: **Environment variable**: `DD_SERVICE`<br/>
**Default**: `unnamed-java-app`</br>
**Set to**: The name of the Test Service that will appear in the CI Tests tab.

System property: `dd.agent.host`
: **Environment variable**: `DD_AGENT_HOST`<br/>
**Default**: `localhost`</br>
**Set to**: The Datadog Agent host.

System property: `dd.trace.agent.port`
: **Environment variable**: `DD_TRACE_AGENT_PORT`<br/>
**Default**: `8126`</br>
**Set to**: The Datadog Agent port.

System property: `dd.integrations.enabled`
: **Environment variable**: `DD_INTEGRATIONS_ENABLED`<br/>
**Default**: `true`</br>
**Recommendation**: `false`

System property: `dd.integration.junit.enabled` or `dd.integration.testng.enabled`
: **Environment variable**: `DD_INTEGRATION_JUNIT_ENABLED` or `DD_INTEGRATION_TESTNG_ENABLED`<br/>
**Default**: `false`</br>
**Recommendation**: `true`

System property: `dd.prioritization.type`
: **Environment variable**: `DD_PRIORITIZATION_TYPE`<br/>
**Default**: `FAST_LANE`</br>
**Recommendation**: `ENSURE_TRACE`

System property: `dd.jmxfetch.enabled`
: **Environment variable**: `DD_JMXFETCH_ENABLED`<br/>
**Default**: `true`</br>
**Recommendation**: `false`

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
