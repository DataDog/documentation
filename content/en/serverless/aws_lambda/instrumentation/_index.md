---
title: Instrument AWS Lambda applications
aliases:
    - /serverless/installation/installing_the_library/
    - /serverless/installation
    - /serverless/aws_lambda/installation
further_reading:
    - link: '/serverless/configuration/'
      tag: 'Documentation'
      text: 'Configure Serverless Monitoring'
    - link: "/integrations/amazon_lambda/"
      tag: "Documentation"
      text: "AWS Lambda Integration"
    - link: "https://learn.datadoghq.com/courses/visibility-aws-lambda"
      tag: "Learning Center"
      text: "Configure AWS Lambda for Serverless Monitoring with Datadog"
    - link: "/mcp_server/tools/#serverless_onboarding"
      tag: 'Documentation'
      text: 'Datadog MCP Server: serverless_onboarding tool'
---

## Overview

Instrument your AWS Lambda applications with a Datadog Lambda Extension to collect traces, enhanced metrics, and custom metrics. The Datadog Lambda Extension is analogous to using the Datadog Agent and Datadog SDKs for host-based infrastructure and applications.

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="A diagram that shows how Datadog receives telemetry from your instrumented AWS Lambda application. Your Lambda application, instrumented with a Datadog Lambda Library, sends logs, traces, enhanced metrics, and custom metrics to the Datadog Lambda Extension, which then pushes this data to Datadog." style="width:100%;" >}}

## Quick start

To get started, [sign up for a Datadog account][1] if you don’t already have one. Then, follow the [in-app installation flow in Fleet Automation][8] for AWS Lambda to instrument your Lambda functions. This quick-start configuration enables your functions to send real-time metrics, logs, and traces to Datadog.

A sample application is [available on GitHub][6] with instructions on how to deploy with multiple runtimes and infrastructure-as-code tools.

The quick start process configures your Lambda functions on the fly. To instrument Lambda functions permanently, see the detailed instructions in the next section.

## Instrumentation instructions

{{< card-grid card_width="30%" image_width="200" >}}
  {{< image-card href="/serverless/installation/python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/installation/nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/installation/ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/installation/java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/installation/go/" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/serverless/installation/dotnet/" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

## Advanced configurations

After you're done with instrumentation and you've set up telemetry collection, you can use [Configure Serverless Monitoring for AWS Lambda][3] to:

- connect your metrics, traces, and logs using tags
- collect telemetry from AWS resources such as API Gateway, AppSync, and Step Functions
- capture the request and response payloads for individual Lambda invocations
- link errors of your Lambda functions to your source code
- filter or scrub sensitive information from logs or traces

## Set up with agentic onboarding

Use agentic onboarding to set up monitoring for your Lambda functions with AI assistance. Agentic onboarding detects your project's frameworks, applies the required configuration in place, and verifies that data is flowing. Two complementary paths use the same Datadog account:

- **AI Setup CLI**: A standalone terminal tool. Use it when you don't want to install an MCP server.
- **MCP server**: Set up from your IDE through a coding assistant such as Claude Code or Cursor.

{{< tabs >}}
{{% tab "AI Setup CLI" %}}

Run the CLI in your project directory (requires Node.js 22+). It links your Datadog account, then instruments your Lambda function:

```shell
npx @datadog/ai-setup-cli --product serverless --serverless-compute-type=aws-lambda
```

Omit `--product` to run interactively, or add `--site` to target your Datadog site.

{{% /tab %}}
{{% tab "MCP server" %}}

Use the Datadog MCP server's [`serverless_onboarding`](https://docs.datadoghq.com/agentic_onboarding/setup/?tab=serverlessmonitoring#mcp-server) tool to set up monitoring for your Lambda functions with AI assistance. After you connect, try a prompt like:

```
Help me monitor my AWS Lambda functions with Datadog.
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/signup/
[3]: /serverless/aws_lambda/configuration/
[4]: /serverless/aws_lambda/fips-compliance/
[5]: /serverless/aws_lambda/remote_instrumentation
[6]: https://github.com/DataDog/serverless-sample-app
[8]: https://app.datadoghq.com/fleet/install-agent/latest?platform=lambda
[9]: /mcp_server/tools/#serverless_onboarding
