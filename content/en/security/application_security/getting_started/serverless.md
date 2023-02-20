---
title: AWS Lambda Getting Started with ASM
kind: documentation
is_beta: true
code_lang: serverless
type: multi-code-lang
code_lang_weight: 90
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
    - link: "/security/application_security/risk_management/"
      tag: "Documentation"
      text: "Application Risk Management"
---

{{< callout url="#" header="ASM support for AWS Lambda is in beta" btn_hidden="true" >}}
  Threat detection is done by using the Lambda extension.
{{< /callout >}}

You can monitor your functions running in AWS Lambda with Datadog Application Security Management (ASM). 

In general, setting up ASM for AWS Lambda involves:

1. Identifying functions that are vulnerable or are under attack, which would most benefit from ASM. Find them on [the Security tab of your Service Catalog][1].
2. Set up ASM instrumentation via the serverless plugin or manually setting the ARN.
3. Enabling the library to collect the application security data from the functions and send it to Datadog.
4. Triggering security signals in your application and seeing how Datadog displays the resulting information.

## Prerequisites

- [Serverless APM][2] is configured to send traces directly to Datadog (can’t use X-Ray integration) 

## Get started

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless plugin][1] automatically configures your functions to send metrics, traces, and logs to Datadog through the [Datadog Lambda Extension][2].

To install and configure the Datadog Serverless plugin:

1. Install the Datadog Serverless plugin:
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
   DD_UNIVERSAL_INSTRUMENTATION:
     environment:
       DD_UNIVERSAL_INSTRUMENATION: true
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
   - **Go**: The Go tracer doesn't rely on a layer and is a regular Go module. You you can upgrade to its latest version with:
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

3. Enable ASM by updating your `serverless.yml` (or whichever way you set environment variables for your function):
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```
   For **Go functions only** also add:
   ```yaml
   DD_UNIVERSAL_INSTRUMENTATION:
     environment:
       DD_UNIVERSAL_INSTRUMENATION: true
   ```
3. Redeploy the function and invoke it. After a few minutes, it appears in [ASM views][3].

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

To see Application Security Management threat detection in action, send known attack patterns to your application. For example, with an HTTP header with value `acunetix-product` to trigger a [security scanner attack][5] attempt:
   ```sh
   curl -H 'My-ASM-Test-Header: acunetix-product' https://your-application-url/existing-route
   ```
A few minutes after you enable your application and exercise it, **threat information appears in the [Application Signals Explorer][3]** and **vulnerability information appears in the [Vulnerability Explorer][4]**.

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /serverless/distributed_tracing/?tab=python
[3]: https://app.datadoghq.com/security/appsec
[4]: https://app.datadoghq.com/security/appsec/vm/
[5]: /security/default_rules/security-scan-detected/
