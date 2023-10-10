---
title: Intelligent Test Runner for Java
kind: documentation
is_beta: true
code_lang: java
type: multi-code-lang
code_lang_weight: 10
aliases:
  - continuous_integration/intelligent_test_runner/java/
further_reading:
    - link: "/continuous_integration/tests"
      tag: "Documentation"
      text: "Explore Test Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

{{< callout url="#" btn_hidden="true" >}}Intelligent Test Runner for Java in beta.{{< /callout >}}

## Compatibility

Intelligent Test Runner is supported in `dd-java-agent >= 1.18.0`.

## Setup

### Test Visibility

Prior to setting up Intelligent Test Runner, set up [Test Visibility for Java][1]. If you are reporting data through the Agent, use v6.40 and later or v7.40 and later.

### Enable Intelligent Test Runner

To enable Intelligent Test Runner, set the following environment variables:

`DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` (Optional)
: Intelligent Test Runner requires [Jacoco][2] for collecting code coverage.<br/>
Set this variable to a valid Jacoco version (such as `0.8.10`) if you want the tracer to run your build with Jacoco injected.<br/>
Omit it if your project already has Jacoco configured.<br/>
**Default**: `(empty)`

`DD_CIVISIBILITY_JACOCO_PLUGIN_INCLUDES` (Optional)
: Use this variable to configure the list of packages for which code coverage should be collected.<br/>
While this variable is optional, setting this helps reduce overhead by avoiding coverage collection for core JDK classes and third-party dependencies.<br/>
Package names should terminate with a `*` and should be separated with colons: `com.myorg.package1.*:com.myorg.package2.*:com.myorg.package3.*`
or `com.myorg.*` (if you have a common root package).<br/>
**Default**: `(empty)`

### Configure the test runner environment

{{< tabs >}}

{{% tab "On-Premises CI Provider (Datadog Agent)" %}}
{{% ci-itr-agent %}}
{{% /tab %}}

{{% tab "Cloud CI Provider (Agentless)" %}}
{{% ci-itr-agentless %}}
{{% /tab %}}

{{< /tabs >}}

{{% ci-itr-activation-instructions %}}

## Run tests with the Intelligent Test Runner enabled

After setting these environment variables, run your tests as you normally do:

{{< tabs >}}
{{% tab "Gradle" %}}

{{< code-block lang="shell" >}}
./gradlew cleanTest test --rerun-tasks -Dorg.gradle.jvmargs=\
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
