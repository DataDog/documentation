---
title: Enabling ASM for AWS Lambda
kind: documentation
is_beta: true
code_lang: serverless
type: multi-code-lang
code_lang_weight: 90
aliases:
  - /security/application_security/getting_started/serverless
further_reading:
    - link: "/security/application_security/how-appsec-works/"
      tag: "Documentation"
      text: "How Application Security Works"
    - link: "/security/default_rules/#cat-application-security"
      tag: "Documentation"
      text: "OOTB Application Security Management Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting Application Security Management"
    - link: "/security/application_security/threats/"
      tag: "Documentation"
      text: "Application Threat Monitoring and Protection"
---

<div class="alert alert-info">ASM support for AWS Lambda is in beta. Threat detection is done by using the Lambda extension.</div>

You can monitor your functions running in AWS Lambda with Datadog Application Security Management (ASM). See [Setup and Configure][4] for information about what ASM features are supported for serverless functions.

In general, setting up ASM for AWS Lambda involves:

1. Identifying functions that are vulnerable or are under attack, which would most benefit from ASM. Find them on [the Security tab of your Service Catalog][1].
2. Setting up ASM instrumentation by using the [Datadog Serverless Framework plugin][6] or manually setting the different layers.
3. Triggering security signals in your application and seeing how Datadog displays the resulting information.

## Prerequisites

- [Serverless APM][2] is configured on the Lambda function to send traces directly to Datadog. The X-Ray integration for sending trace data to APM does not support the data ASM needs to monitor functions.

## Get started

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Framework plugin][1] automatically configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

To install and configure the Datadog Serverless Framework plugin:

1. Install the Datadog Serverless Framework plugin:
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```
2. Enable ASM by updating your `serverless.yml` (or whichever way you set environment variables for your function):
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```
   For **Go functions only** also add:
   ```yaml
   environment:
     DD_UNIVERSAL_INSTRUMENTATION: true
   ```
   For **NodeJS or Python functions** also add:
   ```yaml
   environment:
     DD_EXPERIMENTAL_ENABLE_PROXY: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```
3. Redeploy the function and invoke it. After a few minutes, it appears in [ASM views][3].

[1]: /serverless/serverless_integrations/plugin
[2]: /serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}

{{% tab "Custom" %}}

1. Install the Datadog tracer:
   - **Java**: [Configure the layers][1] for your Lambda function using the ARN in one of the following formats, depending on where your Lambda is deployed. Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`:
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:8
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:8
     ```
   - **Go**: The Go tracer doesn't rely on a layer and is a regular Go module. You can upgrade to its latest version with:
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET**: [Configure the layers][1] for your Lambda function using the ARN in one of the following formats, depending on where your Lambda is deployed. Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`:
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:6
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet-ARM:6
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:6
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:6
     ```
2. Install the Datadog Lambda Extension by configuring the layers for your Lambda function using the ARN in one of the following formats. Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`:
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:36
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:36
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:36
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:36
   ```

3. Enable ASM by adding the following environment variables on your function deployment:
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```
   For **Go functions only** also add:
   ```yaml
   environment:
     DD_UNIVERSAL_INSTRUMENTATION: true
   ```
   For **NodeJS or Python functions** also add:
   ```yaml
   environment:
     DD_EXPERIMENTAL_ENABLE_PROXY: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```
4. Redeploy the function and invoke it. After a few minutes, it appears in [ASM views][3].

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

To see Application Security Management threat detection in action, send known attack patterns to your application. For example, send an HTTP header with value `acunetix-product` to trigger a [security scanner attack][5] attempt:
   ```sh
   curl -H 'My-ASM-Test-Header: acunetix-product' https://your-function-url/existing-route
   ```
A few minutes after you enable your application and exercise it, **threat information appears in the [Application Signals Explorer][3]**.

{{< img src="/security/application_security/application-security-signal.png" alt="Security Signal details page showing tags, metrics, suggested next steps, and attacker IP addresses associated with a threat." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?env=prod&hostGroup=%2A&lens=Security
[2]: /serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /security/application_security/threats/setup_and_configure/?code-lang=serverless
[5]: /security/default_rules/security-scan-detected/
[6]: /serverless/libraries_integrations/plugin/
