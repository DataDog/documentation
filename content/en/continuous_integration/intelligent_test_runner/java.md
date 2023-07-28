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

{{< callout url="#" btn_hidden="true" >}}Intelligent Test Runner for Java in beta.{{< /callout >}}

## Compatibility

Intelligent Test Runner is supported in `dd-java-agent >= 1.18.0`.

## Setup

Prior to setting up Intelligent Test Runner, set up [Test Visibility for Java][1]. If you are reporting data through the Agent, use v6.40+/v7.40+.

To enable Intelligent Test Runner, set the following environment variables:

`DD_APPLICATION_KEY` (Required)
: The [Datadog Application key][2] used to query the tests to be skipped.<br/>
If you are reporting data through the Agent, then the agent process requires the key.<br/>
If you are using Agentless mode, then the tracer process uses the key.<br/>
**Default**: `(empty)`<br/>

`DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` (Optional)
: Intelligent Test Runner requires [Jacoco][4] for collecting code coverage.<br/>
Set this variable to a valid Jacoco version (such as `0.8.10`) if you want the tracer to run your build with Jacoco injected.<br/>
Omit it if your project already has Jacoco configured.<br/>
**Default**: `(empty)`

`DD_CIVISIBILITY_JACOCO_PLUGIN_INCLUDES` (Optional)
: Use this variable to configure the list of packages for which code coverage should be collected.<br/>
While this variable is optional, setting this helps reduce overhead by avoiding coverage collection for core JDK classes and third-party dependencies.<br/>
Package names should terminate with a `*` and should be separated with colons: `com.myorg.package1.*:com.myorg.package2.*:com.myorg.package3.*`
or `com.myorg.*` (if you have a common root package).<br/>
**Default**: `(empty)`

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


#### UI activation
In addition to setting the environment variables, you or a user in your organization with "Intelligent Test Runner Activation" permissions must activate the Intelligent Test Runner on the [Test Service Settings][3] page.

{{< img src="continuous_integration/itr_overview.png" alt="Intelligent test runner enabled in test service settings in the CI section of Datadog.">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_integration/tests/java
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: https://www.jacoco.org/jacoco/
