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

You can monitor your functions running in AWS Lambda with Datadog Application Security Management (ASM). See [Compatibility][4] for information about what ASM features are supported for serverless functions.

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
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```
3. Redeploy the function and invoke it. After a few minutes, it appears in [ASM views][3].

[1]: /serverless/serverless_integrations/plugin
[2]: /serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}

{{% tab "Custom" %}}

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Install the Datadog tracer:
   - **Python** 
       ```sh
       # Use this format for x86-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:72

          # Use this format for arm64-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:72

          # Use this format for x86-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:72

          # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:72
          ```
          Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`. The available `RUNTIME` options are `Python37`, `Python38` and `Python39`.

   - **Node**   
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:91

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:91
         ```  
         Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`. The available RUNTIME options are `Node12-x`, `Node14-x`, `Node16-x` and         `Node18-x`.
        
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
   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

{{< site-region region="ap1" >}}
1. Install the Datadog tracer:
   - **Python** 
       ```sh
       # Use this format for x86-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:72

          # Use this format for arm64-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:72

          # Use this format for x86-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:72

          # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:72
          ```
          Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`. The available `RUNTIME` options are `Python37`, `Python38`, `Python39`, `Python310`, and `Python311`.

   - **Node**   
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:91

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:91
         ```  
         Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`. The available RUNTIME options are `Node12-x`, `Node14-x`, `Node16-x` and         `Node18-x`.
  

   - **Java**: [Configure the layers][1] for your Lambda function using the ARN in one of the following formats, depending on where your Lambda is deployed. Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`:
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-java:8
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
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet:6
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet-ARM:6
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:6
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:6
     ```
2. Install the Datadog Lambda Extension by configuring the layers for your Lambda function using the ARN in one of the following formats. Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`:
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension:36
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension-ARM:36
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:36
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:36
   ```

   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

3. Enable ASM by adding the following environment variables on your function deployment:
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```
   For **NodeJS or Python functions** also add:
   ```yaml
   environment:
     DD_TRACE_ENABLED: true
   ```
4. For **Node** and **Python** functions only, double-check that the function's handler is set correctly:
    - **Node**: Set your function's handler to `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler`. 
       - Also, set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
    - **Python**: Set your function's handler to `datadog_lambda.handler.handler`.
       - Also, set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.

5. Redeploy the function and invoke it. After a few minutes, it appears in [ASM views][3].

[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

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

    Datadog CLI requires access to the AWS Lambda service, and depends on the AWS JavaScript SDK to [resolve the credentials][1]. Ensure your AWS credentials are configured using the same method you would use when invoking the AWS CLI.

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
    datadog-ci lambda instrument --appsec -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names. 
    - Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

   **Note**: Instrument your Lambda functions in a development or staging environment first. If the instrumentation result is unsatisfactory, run `uninstrument` with the same arguments to revert the changes.

    Additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/cli

{{% /tab %}}
{{% tab "AWS CDK" %}}

The [Datadog CDK Construct][1] automatically installs Datadog on your functions using Lambda Layers, and configures your functions to send metrics, traces, and logs to Datadog through the Datadog Lambda Extension.

1. Install the Datadog CDK constructs library:

    ```sh
    # For AWS CDK v1
    pip install datadog-cdk-constructs

    # For AWS CDK v2
    pip install datadog-cdk-constructs-v2
    ```

2. Instrument your Lambda functions

    ```python
    # For AWS CDK v1
    from datadog_cdk_constructs import Datadog
    # NOT SUPPORTED IN V1

    # For AWS CDK v2
    from datadog_cdk_constructs_v2 import Datadog

    datadog = Datadog(self, "Datadog",
        python_layer_version={{< latest-lambda-layer-version layer="python" >}},
        extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
        site="<DATADOG_SITE>",
        api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>",
        enable_asm=True,
      )
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
    - Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][2] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). The `secretsmanager:GetSecretValue` permission is required. For quick testing, you can use `apiKey` instead and set the Datadog API key in plaintext.

    More information and additional parameters can be found on the [Datadog CDK documentation][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Serverless Plugin" %}}

Set the `enableASM` configuration parameter to `true` in your `serverless.yml` file. See the [Serverless integration][6] docs for more information.

[6]: https://docs.datadoghq.com/serverless/libraries_integrations/plugin/#configuration-parameters

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
[4]: /security/application_security/enabling/compatibility/serverless
[5]: /security/default_rules/security-scan-detected/
[6]: /serverless/libraries_integrations/plugin/
