---
title: Instrumenting Java Serverless Applications
kind: documentation
further_reading:
    - link: '/serverless/configuration'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring'
    - link: '/serverless/guide/troubleshoot_serverless_monitoring'
      tag: 'Documentation'
      text: 'Troubleshoot Serverless Monitoring'
    - link: 'serverless/custom_metrics/'
      tag: 'Documentation'
      text: 'Submitting Custom Metrics from Serverless Applications'
aliases:
    - /serverless/datadog_lambda_library/java/
---

<div class="alert alert-warning">To fully instrument your serverless application with distributed tracing, your Java Lambda functions must be using the Java 8 Corretto (<code>java8.al2</code>) or Java 11 (<code>java11</code>) runtimes.</div>

<div class="alert alert-warning">If your Lambda functions are deployed in a VPC without access to the public internet, you can send data either <a href="/agent/guide/private-link/">using AWS PrivateLink</a> for the <code>datadoghq.com</code> <a href="/getting_started/site/">Datadog site</a>, or <a href="/agent/proxy/">using a proxy</a> for all other sites.</div>

<div class="alert alert-warning">If you previously set up your Lambda functions using the Datadog Forwarder, see <a href="https://docs.datadoghq.com/serverless/guide/datadog_forwarder_java">instrumenting using the Datadog Forwarder</a>.</div>

## Installation

Datadog offers many different ways to enable instrumentation for your serverless applications. Choose a method below that best suits your needs. Datadog generally recommends using the Datadog CLI.

{{< tabs >}}
{{% tab "Container image" %}}

1. Install the Datadog Lambda Extension

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/extensions/ /opt/extensions
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. You can see a complete list of possible tags in the [Amazon ECR repository][1].

2. Install the Datadog Java APM client

    ```dockerfile
    RUN yum -y install tar wget gzip
    RUN wget -O /opt/dd-java-agent.jar https://dtdg.co/latest-java-tracer
    ```

3. Install the Datadog Lambda library
    
    If you are using Maven, include the following dependency in your `pom.xml`, and replace `VERSION` with the latest release (omitting the preceeding `v`): ![Maven Cental][2]:

    ```xml
    <dependency>
      <groupId>com.datadoghq</groupId>
      <artifactId>datadog-lambda-java</artifactId>
      <version>VERSION</version>
    </dependency>
    ```
    
    If you are using Gradle, include the following dependency in your `build.gradle`, and replace `VERSION` with the latest release (omitting the preceeding `v`): ![Maven Cental][2]:

    ```groovy
    dependencies {
      implementation 'com.datadoghq:datadog-lambda-java:VERSION'
    }
    ```

4. Set the required environment variables

    - Set `JAVA_TOOL_OPTIONS` to `-javaagent:"/opt/java/lib/dd-java-agent.jar" -XX:+TieredCompilation -XX:TieredStopAtLevel=1`
    - Set `DD_JMXFETCH_ENABLED` to `false`
    - Set `DD_TRACE_ENABLED` to `true`
    - Set `DD_SITE` to your [Datadog site][3] to send the telemetry to.
    - Set `DD_API_KEY_SECRET_ARN` to the ARN of the AWS secret where your [Datadog API key][4] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can use `DD_API_KEY` instead and set the Datadog API key in plaintext.

[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[3]: https://docs.datadoghq.com/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Custom" %}}

1. Install the Datadog Lambda Extension

    [Configure the layers][1] for your Lambda function using the ARN in the following format:

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`

2. Install the Datadog Java APM client

    [Configure the layers][1] for your Lambda function using the ARN in the following format:

    `arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}`

3. Install the Datadog Lambda library
    
    If you are using Maven, include the following dependency in your `pom.xml`, and replace `VERSION` with the latest release (omitting the preceeding `v`): ![Maven Cental][2]:

    ```xml
    <dependency>
      <groupId>com.datadoghq</groupId>
      <artifactId>datadog-lambda-java</artifactId>
      <version>VERSION</version>
    </dependency>
    ```
    
    If you are using Gradle, include the following dependency in your `build.gradle`, and replace `VERSION` with the latest release (omitting the preceeding `v`): ![Maven Cental][2]:

    ```groovy
    dependencies {
      implementation 'com.datadoghq:datadog-lambda-java:VERSION'
    }
    ```

4. Set the required environment variables

    - Set `JAVA_TOOL_OPTIONS` to `-javaagent:"/opt/java/lib/dd-java-agent.jar" -XX:+TieredCompilation -XX:TieredStopAtLevel=1`
    - Set `DD_JMXFETCH_ENABLED` to `false`
    - Set `DD_TRACE_ENABLED` to `true`
    - Set `DD_SITE` to your [Datadog site][3] to send the telemetry to.
    - Set `DD_API_KEY_SECRET_ARN` to the ARN of the AWS secret where your [Datadog API key][4] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can use `DD_API_KEY` instead and set the Datadog API key in plaintext.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[3]: https://docs.datadoghq.com/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

## What's next?

- You can now view metrics, logs, and traces on the [Serverless Homepage][1].
- Submit a [custom metric][2] or [APM span][3] to monitor your business logic.
- See the [troubleshooting guide][4] if you have trouble collecting the telemetry
- See the [advanced configurations][5] to
    - connect your telemetry using tags
    - collect telemetry for AWS API Gateway, SQS, etc.
    - capture the Lambda request and response payloads
    - link errors of your Lambda functions to your source code
    - filter or scrub sensitive information from logs or traces

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/metrics/dogstatsd_metrics_submission/
[3]: /tracing/custom_instrumentation/java/
[4]: /serverless/guide/troubleshoot_serverless_monitoring/
[5]: /serverless/configuration/
