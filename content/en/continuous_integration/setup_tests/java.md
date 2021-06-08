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

```xml
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
```

### Using Gradle

Add the `ddTracerAgent` entry to the `configurations` task block, and add the Datadog Java tracer dependency, replacing `$VERSION` with the latest version of the tracer available in the [Maven Repository][2].

```groovy
configurations {
    ddTracerAgent
}

dependencies {
    ddTracerAgent "com.datadoghq:dd-java-agent:$VERSION"
}
```

## Instrumenting your tests

### Using Maven

Configure the [Maven Surefire Plugin][3] and/or the [Maven Failsafe Plugin][4] to use Datadog Java agent (use `-Ddd.integration.testng.enabled=true` if your testing framework is TestNG rather than JUnit):

```xml
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
```

Run your tests using the `ci-app` profile, for example:
```
mvn clean verify -P ci-app
```
### Using Gradle

Configure the `test` Gradle task by adding to the `jvmArgs` attribute the `-javaagent` argument targeting the Datadog Java tracer based on the `configurations.ddTracerAgent` property (use `-Ddd.integration.testng.enabled=true` if your testing framework is TestNG rather than JUnit):

```groovy
test {
    jvmArgs = ["-javaagent:${configurations.ddTracerAgent.asPath}", "-Ddd.prioritization.type=ENSURE_TRACE", "-Ddd.jmxfetch.enabled=false", "-Ddd.integrations.enabled=false", "-Ddd.integration.junit.enabled=true"]
}
```

Run your tests as you normally do, for example:

```
./gradlew cleanTest test --rerun-tasks
```

**Important:** As Gradle builds can be customizable programmatically, you may need to adapt these steps to your specific build configuration.

## Configuration options

All configuration options below have system property and environment variable equivalents. If the same key type is set for both, the system property configuration takes priority. System properties can be set as JVM flags.

| System property                 | Environment variable            | Default | Description                                             |
|---------------------------------|---------------------------------|---------|---------------------------------------------------------|
| `dd.integration.junit.enabled`  | `DD_INTEGRATION_JUNIT_ENABLED`  | `false` | When `true`, tests based on JUnit runners are reported. |
| `dd.integration.testng.enabled` | `DD_INTEGRATION_TESTNG_ENABLED` | `false` | When `true`, tests based on TestNG are reported.        |

Additionally, set the tracer prioritization type to `EnsureTrace` to avoid dropping test spans.

| System property          | Environment variable            | Default | Description                                                       |
|--------------------------|--------------------------|------------|-------------------------------------------------------------------|
| `dd.prioritization.type` | `DD_PRIORITIZATION_TYPE` | `FAST_LANE` | Set to `ENSURE_TRACE` to avoid dropping tests spans by the tracer. |

All [Datadog tracer configuration][5] options can be used during the test phase.

### Recommended configuration

To improve the Datadog Java Agent startup, follow these recommended configuration settings:

| System property          | Environment variable            | Default | Recommendation                                                         |
|--------------------------------|--------------------------------|--------------------|------------------------------------------------------------------------|
| `dd.service`                   | `DD_SERVICE`                   | `unnamed-java-app` | The name of the Test Service that will appear in the CI Tests tab.  |
| `dd.agent.host`                | `DD_AGENT_HOST`                | `localhost`        | Make sure this property targets the Datadog Agent host.                |
| `dd.trace.agent.port`          | `DD_TRACE_AGENT_PORT`          | `8126`             | Make sure this property targets the Datadog Agent port.                |
| `dd.integrations.enabled`      | `DD_INTEGRATIONS_ENABLED`      | `true`             | `false`                                                                |
| `dd.integration.junit.enabled` | `DD_INTEGRATION_JUNIT_ENABLED` | `false`            | `true`                                                                 |
| `dd.prioritization.type`       | `DD_PRIORITIZATION_TYPE`       | `FAST_LANE`        | `ENSURE_TRACE`                                                         |
| `dd.jmxfetch.enabled`          | `DD_JMXFETCH_ENABLED`          | `true`             | `false`                                                                |

Change the `dd.integration` property or variable from `junit` to `testng` to correspond to your test integration.

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
