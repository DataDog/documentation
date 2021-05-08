---
title: Java Tests
kind: documentation
further_reading:
    - link: "/ci/filename/"
      tag: "Documentation"
      text: "linktext"
---

## Supported Test frameworks

* JUnit 4.10+
* JUnit 5.3+
* TestNG 6.4+

Additionally, we support the test frameworks which are based on JUnit, such as Spock Framework and Cucumber-Junit.

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

## Installing tracing with Maven

Add a new Maven profile in your root `pom.xml` configuring the Datadog Java tracer dependency and the `javaagent` arg property, replacing `$VERSION` with the latest version of the tracer accessible via [Maven Repository][1]: 

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

### Instrumenting your tests

Configure the [Maven Surefire Plugin][2] and/or the [Maven Failsafe Plugin][3] to use Datadog Java agent:

```xml
<plugin>
  <groupId>org.apache.maven.plugins</groupId>
  <artifactId>maven-surefire-plugin</artifactId>
  <configuration>
    <argLine>${dd.java.agent.arg}</argLine>
  </configuration>
</plugin>

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
```

ARun your tests using the `ci-app` profile, for example:
```
mvn clean verify -Pci-app
```

## Installing tracing with Gradle

Add the `ddTracerAgent` entry to the `configurations` task block and add the Datadog Java tracer dependency, replacing `$VERSION` with the latest version of the tracer accessible via [Maven Repository][1]:

```groovy
configurations {
    ddTracerAgent
}

dependencies {
    ddTracerAgent "com.datadoghq:dd-java-agent:$VERSION"
}
```

### Instrumenting your tests

Configure the `test` Gradle task by adding to the `jvmArgs` attribute the `-javaagent` argument targeting the Datadog Java tracer based on the `configurations.ddTracerAgent` property:

```groovy
test {
    jvmArgs = ["-javaagent:${configurations.ddTracerAgent.asPath}"]
}
```

Run your tests as you normally do, for example:

```
./gradlew cleanTest test --rerun-tasks
```

**Important:** As Gradle builds can be customizable programmatically, you may need to adapt these steps to your specific build configuration.

## Enabling

All configuration options below have system property and environment variable equivalents. If the same key type is set for both, the system property configuration takes priority. System properties can be set as JVM flags.

| System property                 | Environment variable            | Default | Description                                             |
|---------------------------------|---------------------------------|---------|---------------------------------------------------------|
| `dd.integration.junit.enabled`  | `DD_INTEGRATION_JUNIT_ENABLED`  | `false` | When `true`, tests based on JUnit runners are reported. |
| `dd.integration.testng.enabled` | `DD_INTEGRATION_TESTNG_ENABLED` | `false` | When `true`, tests based on TestNG are reported.        |

Additionally, set the tracer prioritization type to `EnsureTrace` to avoid dropping test spans.

| System property          | Environment variable            | Default | Description                                                       |
|--------------------------|--------------------------|------------|-------------------------------------------------------------------|
| `dd.prioritization.type` | `DD_PRIORITIZATION_TYPE` | `FAST_LANE` | Set to `ENSURE_TRACE` to avoid dropping tests spans by the tracer. |

All [Datadog Tracer configuration][4] options can be used to during test phase.

### Recommended configuration

To improve the Datadog Java Agent startup, follow these recommended configuration settings:

| System property          | Environment variable            | Default | Recommendation                                                         |
|--------------------------------|--------------------------------|--------------------|------------------------------------------------------------------------|
| `dd.service`                   | `DD_SERVICE`                   | `unnamed-java-app` | The name of the Test Service that will appear in the CI/CD Tests tab.  |
| `dd.agent.host`                | `DD_AGENT_HOST`                | `localhost`        | Make sure this property targets the Datadog Agent host.                |
| `dd.trace.agent.port`          | `DD_TRACE_AGENT_PORT`          | `8126`             | Make sure this property targets the Datadog Agent port.                |
| `dd.integrations.enabled`      | `DD_INTEGRATIONS_ENABLED`      | `true`             | `false`                                                                |
| `dd.integration.junit.enabled` | `DD_INTEGRATION_JUNIT_ENABLED` | `false`            | `true`                                                                 |
| `dd.prioritization.type`       | `DD_PRIORITIZATION_TYPE`       | `FAST_LANE`        | `ENSURE_TRACE`                                                         |
| `dd.jmxfetch.enabled`          | `DD_JMXFETCH_ENABLED`          | `true`             | `false`                                                                |

You can change the test integration from `JUnit` to `TestNG` modifying the corresponding option.

**Important:** You may want to enable more integrations if you have integration tests. To enable all default integrations, leave the `DD_INTEGRATIONS_ENABLED` property unset.

## Datadog Agent 

The Datadog Agent must to be accessible by the environment you're using to run your tests on.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://mvnrepository.com/artifact/com.datadoghq/dd-java-agent
[2]: https://maven.apache.org/surefire/maven-surefire-plugin/
[3]: https://maven.apache.org/surefire/maven-failsafe-plugin/
[4]: /tracing/setup_overview/setup/java/?tab=containers#configuration
