---
title: Enabling App and API Protection for AWS Lambda functions in Node.js
further_reading:
    - link: "/security/application_security/how-it-works/"
      tag: "Documentation"
      text: "How App and API Protection Works"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
    - link: "/security/application_security/threats/"
      tag: "Documentation"
      text: "App and API Protection"
    - link: "https://www.datadoghq.com/blog/datadog-security-google-cloud/"
      tag: "Blog"
      text: "Datadog Security extends compliance and threat protection capabilities for Google Cloud"
---

Configuring App and API Protection (AAP) for AWS Lambda involves:

1. Identifying functions that are vulnerable or are under attack, which would most benefit from AAP. Find them on [the Security tab of your Software Catalog][1].
2. Setting up AAP instrumentation by using either the [Datadog CLI](https://docs.datadoghq.com/serverless/serverless_integrations/cli), [AWS CDK](https://github.com/DataDog/datadog-cdk-constructs), [Datadog Serverless Framework plugin][2], or manually by using the Datadog tracing layers.
3. Triggering security signals in your application and seeing how Datadog displays the resulting information.

## Prerequisites

- [Serverless APM Tracing][apm-lambda-tracing-setup] is setup on the Lambda function to send traces directly to Datadog.
  X-Ray tracing, by itself, is not sufficient for AAP and requires APM Tracing to be enabled.

## Compatibility

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][3] to block IPs in your [WAF][4].

If you bundle your Node.js functions using webpack or esbuild, follow the [bundler guidance][5] to ensure compatibility with Datadog App and API Protection.

## Supported trigger types
Threat Detection supports HTTP requests as function input only, as that channel has the highest likelihood of attackers exploiting a serverless application. HTTP requests typically come from AWS services such as:
- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- Function URL

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, fill out this <a href="https://forms.gle/gHrxGQMEnAobukfn7">form</a> to send feedback.</div>


## Get started

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Framework plugin][2] can be used to automatically configure and deploy your lambda with AAP.

To install and configure the Datadog Serverless Framework plugin:

1. Install the Datadog Serverless Framework plugin:
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```

2. Enable AAP by updating your `serverless.yml` with the `enableASM` configuration parameter:
   ```yaml
   custom:
     datadog:
       enableASM: true
   ```

   Overall, your new `serverless.yml` file should contain at least:
   ```yaml
   custom:
     datadog:
       apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}" # or apiKey
       enableDDTracing: true
       enableASM: true
   ```
   See also the complete list of [plugin parameters][6] to further configure your lambda settings.

4. Redeploy the function and invoke it. After a few minutes, it appears in [AAP views][7].

{{% /tab %}}
{{% tab "Datadog CLI" %}}

The Datadog CLI modifies existing Lambda function configurations to enable instrumentation without requiring a new deployment. It is the quickest way to get started with Datadog's serverless monitoring.

**If you are configuring initial tracing for your functions**, perform the following steps:

1. Install the Datadog CLI client:

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. If you are new to Datadog serverless monitoring, launch the Datadog CLI in interactive mode to guide your first installation for a quick start, and you can ignore the remaining steps. To permanently install Datadog for your production applications, skip this step and follow the remaining ones to run the Datadog CLI command in your CI/CD pipelines after your normal deployment.

    ```sh
    datadog-ci lambda instrument -i --appsec
    ```

3. Configure the AWS credentials:

    Datadog CLI requires access to the AWS Lambda service, and depends on the AWS JavaScript SDK to [resolve the credentials][8]. Ensure your AWS credentials are configured using the same method you would use when invoking the AWS CLI.

4. Configure the Datadog site:

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct **Datadog site** is selected on the right-hand side of this page).

5. Configure the Datadog API key:

    Datadog recommends saving the Datadog API key in AWS Secrets Manager for security. The key needs to be stored as a plaintext string (not a JSON blob). Ensure your Lambda functions have the required `secretsmanager:GetSecretValue` IAM permission.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Instrument your Lambda functions:

    To instrument your Lambda functions, run the following command.

    ```sh
    datadog-ci lambda instrument --appsec -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
    - Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

   **Note**: Instrument your Lambda functions in a development or staging environment first. If the instrumentation result is unsatisfactory, run `uninstrument` with the same arguments to revert the changes.

    Additional parameters can be found in the [CLI documentation][9].

{{% /tab %}}
{{% tab "AWS CDK" %}}

The [Datadog CDK Construct][10] automatically installs Datadog on your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the Datadog Lambda Extension.

1. Install the Datadog CDK constructs library:

    ```sh
    # For AWS CDK v1
    npm install datadog-cdk-constructs --save-dev

    # For AWS CDK v2
    npm install datadog-cdk-constructs-v2 --save-dev
    ```

2. Instrument your Lambda functions

    ```javascript
    // For AWS CDK v1
    import { Datadog } from "datadog-cdk-constructs";
    // NOT SUPPORTED IN V1

    // For AWS CDK v2
    import { Datadog } from "datadog-cdk-constructs-v2";

    const datadog = new Datadog(this, "Datadog", {
        node_layer_version: {{< latest-lambda-layer-version layer="node" >}},
        extension_layer_version: {{< latest-lambda-layer-version layer="extension" >}},
        site: "<DATADOG_SITE>",
        api_key_secret_arn: "<DATADOG_API_KEY_SECRET_ARN>", // or api_key
        enable_asm: true,
      });
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>]);
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
    - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][11] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can use `apiKey` instead and set the Datadog API key in plaintext.

    More information and additional parameters can be found on the [Datadog CDK documentation][10].

{{% /tab %}}
{{% tab "Custom" %}}

1. Install the Datadog tracer:
   ```sh
   # Use this format for AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

   # Use this format for AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
   ```
   Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`. The available `<RUNTIME>` options are {{< latest-lambda-layer-version layer="node-versions" >}}.

2. Install the Datadog Lambda Extension by configuring the layers for your Lambda function using the ARN in one of the following formats. Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`:
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```

3. Enable AAP by adding the following environment variables on your function deployment:
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```

4. Double-check that the function's handler is set correctly:
    - Set your function's handler to `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler`.
    - Set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.

5. Redeploy the function and invoke it. After a few minutes, it appears in [AAP views][7].


{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[3]: /actions/workflows/
[4]: /security/application_security/waf-integration/
[5]: https://docs.datadoghq.com/serverless/guide/serverless_tracing_and_bundlers/
[6]: https://docs.datadoghq.com/serverless/libraries_integrations/plugin/#configuration-parameters
[7]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[8]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[9]: https://docs.datadoghq.com/serverless/serverless_integrations/cli
[10]: https://github.com/DataDog/datadog-cdk-constructs
[11]: https://app.datadoghq.com/organization-settings/api-keys
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/
