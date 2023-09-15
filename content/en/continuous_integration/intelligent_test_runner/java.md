---
title: Intelligent Test Runner for Java
kind: documentation
is_beta: true
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< callout url="#" btn_hidden="true" >}}Intelligent Test Runner for Java is in beta.{{< /callout >}}

## Compatibility

Intelligent Test Runner is supported in `dd-java-agent >= 1.21.0`.

## Setup

### Test Visibility setup

Prior to setting up Intelligent Test Runner, set up [Test Visibility for Java][1]. If you are reporting data through the Agent, use v6.40+/v7.40+.

{{% ci-itr-activation-instructions %}}

### Configuring the test runner environment

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}
{{% ci-itr-agent %}}
{{% /tab %}}

{{% tab "Cloud CI Provider (Agentless)" %}}
{{% ci-itr-agentless %}}
{{% /tab %}}

{{< /tabs >}}

After configuring the environment, run your tests as you normally do:

{{< tabs >}}
{{% tab "Gradle" %}}

{{< code-block lang="shell" >}}
./gradlew cleanTest test -Dorg.gradle.jvmargs=\
-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app
{{< /code-block >}}

{{% /tab %}}
{{% tab "Maven" %}}

{{< code-block lang="shell" >}}
MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app \
mvn clean verify
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/java
[2]: https://www.jacoco.org/jacoco/
