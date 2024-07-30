---
title: Enabling ASM for Serverless
aliases:
  - /security/application_security/getting_started/serverless
further_reading:
    - link: "/security/application_security/how-appsec-works/"
      tag: "Documentation"
      text: "How Application Security Works"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB Application Security Management Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting Application Security Management"
    - link: "/security/application_security/threats/"
      tag: "Documentation"
      text: "Application Threat Management"
    - link: "https://www.datadoghq.com/blog/datadog-security-google-cloud/"
      tag: "Blog"
      text: "Datadog Security extends compliance and threat protection capabilities for Google Cloud"
---

{{< partial name="security-platform/appsec-serverless.html" >}}</br>

See [compatibility requirements][4] for information about what ASM features are available for serverless functions.

## AWS Lambda

Configuring ASM for AWS Lambda involves:

1. Identifying functions that are vulnerable or are under attack, which would most benefit from ASM. Find them on [the Security tab of your Service Catalog][1].
2. Setting up ASM instrumentation by using the [Datadog CLI](https://docs.datadoghq.com/serverless/serverless_integrations/cli), [AWS CDK](https://github.com/DataDog/datadog-cdk-constructs), [Datadog Serverless Framework plugin][6], or manually by using the Datadog tracing layers.
3. Triggering security signals in your application and seeing how Datadog displays the resulting information.

### Prerequisites

- [Serverless APM Tracing][apm-lambda-tracing-setup] is setup on the Lambda function to send traces directly to Datadog.
  X-Ray tracing, by itself, is not sufficient for ASM and requires APM Tracing to be enabled.

### Get started

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Framework plugin][1] can be used to automatically configure and deploy your lambda with ASM.

To install and configure the Datadog Serverless Framework plugin:

1. Install the Datadog Serverless Framework plugin:
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```

2. Enable ASM by updating your `serverless.yml` with the `enableASM` configuration parameter:
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
   See also the complete list of [plugin parameters][4] to further configure your lambda settings.

4. Redeploy the function and invoke it. After a few minutes, it appears in [ASM views][3].

[1]: https://docs.datadoghq.com/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[4]: https://docs.datadoghq.com/serverless/libraries_integrations/plugin/#configuration-parameters

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
        api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>", // or api_key
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
{{% tab "Custom" %}}

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Install the Datadog tracer:
   - **Python**
       ```sh
       # Use this format for x86-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for x86-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:72
          ```
          Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`. The available `RUNTIME` options are `Python37`, `Python38` and `Python39`.

   - **Node**
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
         ```
         Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`. The available RUNTIME options are {{< latest-lambda-layer-version layer="node-versions" >}}.

   - **Java**: [Configure the layers][1] for your Lambda function using the ARN in one of the following formats, depending on where your Lambda is deployed. Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`:
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     ```
   - **Go**: The Go tracer doesn't rely on a layer and is a regular Go module. You can upgrade to its latest version with:
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET**: [Configure the layers][1] for your Lambda function using the ARN in one of the following formats, depending on where your Lambda is deployed. Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`:
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     ```
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
   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

{{< site-region region="ap1" >}}
1. Install the Datadog tracer:
   - **Python**
       ```sh
       # Use this format for x86-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS commercial regions
          arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for x86-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}

          # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
          arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>-ARM:{{< latest-lambda-layer-version layer="python" >}}
          ```
          Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`. The available `RUNTIME` options are {{< latest-lambda-layer-version layer="python-versions" >}}
.

   - **Node**
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
         ```
         Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`. The available RUNTIME options are {{< latest-lambda-layer-version layer="node-versions" >}}.


   - **Java**: [Configure the layers][1] for your Lambda function using the ARN in one of the following formats, depending on where your Lambda is deployed. Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`:
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     ```
   - **Go**: The Go tracer doesn't rely on a layer and is a regular Go module. You can upgrade to its latest version with:
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET**: [Configure the layers][1] for your Lambda function using the ARN in one of the following formats, depending on where your Lambda is deployed. Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`:
     ```sh
     # x86-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda in AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # x86-based Lambda in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     # arm64-based Lambda  in AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-dotnet-ARM:{{< latest-lambda-layer-version layer="dd-trace-dotnet" >}}
     ```
2. Install the Datadog Lambda Extension by configuring the layers for your Lambda function using the ARN in one of the following formats. Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`:
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # x86-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # arm64-based Lambda in AWS GovCloud regions
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```

   [1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
{{< /site-region >}}

3. Enable ASM by adding the following environment variables on your function deployment:
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```

4. For **Node** and **Python** functions only, double-check that the function's handler is set correctly:
    - **Node**: Set your function's handler to `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler`.
       - Also, set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.
    - **Python**: Set your function's handler to `datadog_lambda.handler.handler`.
       - Also, set the environment variable `DD_LAMBDA_HANDLER` to your original handler, for example, `myfunc.handler`.

5. Redeploy the function and invoke it. After a few minutes, it appears in [ASM views][3].

[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

## Google Cloud Run

<div class="alert alert-info">ASM support for Google Cloud Run is in beta.</a></div>

### How `serverless-init` works

The `serverless-init` application wraps your process and executes it as a subprocess. It starts a DogStatsD listener for metrics and a Trace Agent listener for traces. It collects logs by wrapping the stdout/stderr streams of your application. After bootstrapping, `serverless-init` then launches your command as a subprocess.

To get full instrumentation, ensure you are calling `datadog-init` as the first command that runs inside your Docker container. You can do this by setting it as the entrypoint, or by setting it as the first argument in CMD.

### Get started

{{< tabs >}}
{{% tab "NodeJS" %}}
Add the following instructions and arguments to your Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.

   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copy the Datadog Node.JS tracer into your Docker image.

   ```dockerfile
   COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
   ```

   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.

   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-nodejs
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-node).

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
   ```
#### Alternative configuration {#alt-node}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/nodejs/bin/node", "/path/to/your/app.js"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/your_entrypoint.sh", "/nodejs/bin/node", "/path/to/your/app.js"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Python" %}}

Add the following instructions and arguments to your Dockerfile.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Install the Datadog Python tracer.
   ```dockerfile
   RUN pip install --target /dd_tracer/python/ ddtrace
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-python
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-python).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint, launched by the Datadog trace library. Adapt this line to your needs.
   ```dockerfile
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
   ```
#### Alternative configuration {#alt-python}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Java" %}}

Add the following instructions and arguments to your Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["./mvnw", "spring-boot:run"]
```
#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Add the Datadog Java tracer to your Docker image.
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-java
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-java).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["./mvnw", "spring-boot:run"]
   ```

#### Alternative configuration {#alt-java}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/java/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Go" %}}

[Manually install][1] the Go tracer before you deploy your application. Compile your go binary with the "appsec" tag enabled (`go build --tags "appsec" ...`). Add the following instructions and arguments to your Dockerfile:

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENTRYPOINT ["/app/datadog-init"]
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-go).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-go
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["/path/to/your-go-binary"]
   ```

#### Alternative configuration {#alt-go}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/path/to/your-go-binary"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/path/to/your-go-binary"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/go

{{% /tab %}}
{{% tab ".NET" %}}

Add the following instructions and arguments to your Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["dotnet", "helloworld.dll"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copy the Datadog .NET tracer into your Docker image.
   ```dockerfile
   COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-dotnet
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-dotnet).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["dotnet", "helloworld.dll"]
   ```
#### Alternative configuration {#alt-dotnet}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "dotnet", "helloworld.dll"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "dotnet", "helloworld.dll"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation

{{% /tab %}}
{{% tab "Ruby" %}}

[Manually install][1] the Ruby tracer before you deploy your application. See the [example application][2].

Add the following instructions and arguments to your Dockerfile.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

#### Explanation

1. Copy the Datadog `serverless-init` into your Docker image.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (Optional) add Datadog tags
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_APPSEC_ENABLED=1
   ENV DD_VERSION=1
   ```

3. This environment variable is needed for trace propagation to work properly in Cloud Run. Ensure that you set this variable for all Datadog-instrumented downstream services.
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-ruby).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your binary application wrapped in the entrypoint. Adapt this line to your needs.
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
#### Alternative configuration {#alt-ruby}
If you already have an entrypoint defined inside your Dockerfile, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

{{% /tab %}}
{{% tab "PHP" %}}

Add the following instructions and arguments to your Dockerfile.
```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# use the following for an Apache and mod_php based image
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["apache2-foreground"]

# use the following for an Nginx and php-fpm based image
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD php-fpm; nginx -g daemon off;
```

**Note**: The `datadog-init` entrypoint wraps your process and collects logs from it. To get logs working properly, ensure that your Apache, Nginx, or PHP processes are writing output to `stdout`.

#### Explanation


1. Copy the Datadog `serverless-init` into your Docker image.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copy and install the Datadog PHP tracer.
   ```dockerfile
   ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
   RUN php /datadog-setup.php --php-bin=all
   ```
   If you install the Datadog tracer library directly in your application, as outlined in the [manual tracer instrumentation instructions][1], omit this step.

3. (Optional) Add Datadog tags.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-php
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Change the entrypoint to wrap your application in the Datadog `serverless-init` process.
   **Note**: If you already have an entrypoint defined inside your Dockerfile, see the [alternative configuration](#alt-php).
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Execute your application.

   Use the following for an Apache and mod_php based image:
   ```dockerfile
   RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
   EXPOSE 8080
   CMD ["apache2-foreground"]
   ```

   Use the following for an Nginx and php-fpm based image:
   ```dockerfile
   RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
   EXPOSE 8080
   CMD php-fpm; nginx -g daemon off;
   ```
#### Alternative configuration {#alt-php}
If you already have an entrypoint defined inside your Dockerfile, and you are using an Apache and mod_php based image, you can instead modify the CMD argument.

{{< highlight dockerfile "hl_lines=9" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["/app/datadog-init", "apache2-foreground"]
{{< /highlight >}}

If you require your entrypoint to be instrumented as well, you can swap your entrypoint and CMD arguments instead. For more information, see [How `serverless-init` works](#how-serverless-init-works).

{{< highlight dockerfile "hl_lines=7 12 17" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# use the following for an Apache and mod_php based image
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["your_entrypoint.sh", "apache2-foreground"]

# use the following for an Nginx and php-fpm based image
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD your_entrypoint.sh php-fpm; your_entrypoint.sh nginx -g daemon off;
{{< /highlight >}}

As long as your command to run is passed as an argument to `datadog-init`, you will receive full instrumentation.

[1]: /tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension

{{% /tab %}}
{{< /tabs >}}

## Azure App Service

### Setup
#### Set application settings
To enable ASM on your application, begin by adding the following key-value pairs under **Application Settings** in your Azure configuration settings.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service Configuration: the Application Settings, under the Configuration section of Settings in the Azure UI. Three settings are listed: DD_API_KEY, DD_SERVICE, and DD_START_APP." style="width:80%;" >}}

- `DD_API_KEY` is your Datadog API key.
- `DD_CUSTOM_METRICS_ENABLED` (optional) enables [custom metrics](#custom-metrics).
- `DD_SITE` is the Datadog site [parameter][2]. Your site is {{< region-param key="dd_site" code="true" >}}. This value defaults to `datadoghq.com`.
- `DD_SERVICE` is the service name used for this program. Defaults to the name field value in `package.json`.
- `DD_START_APP` is the command used to start your application. For example, `node ./bin/www` (unnecessary for applications running in Tomcat).
- `DD_APPSEC_ENABLED` value should be 1 in order to enable Application Security

### Identifying your startup command

Linux Azure App Service Web Apps built using the code deployment option on built-in runtimes depend on a startup command that varies by language. The default values are outlined in [Azure's documentation][7]. Examples are included below.

Set these values in the `DD_START_APP` environment variable. Examples below are for an application named `datadog-demo`, where relevant.

| Runtime   | `DD_START_APP` Example Value                                                               | Description                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | Runs the [Node PM2 configuration file][12], or your script file.                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | Runs a `.dll` file that uses your Web App name by default. <br /><br /> **Note**: The `.dll` file name in the command should match the file name of your `.dll` file. In certain cases, this might not match your Web App.         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | Copies script to correct location and starts application.                                                                                                                                                                           |
| Python    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | Custom [startup script][13]. This example shows a Gunicorn command for starting a Django app.                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | The command to start your app. This is not required for applications running in Tomcat.                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up


**Note**: The application restarts when new settings are saved.

#### Set General Settings

{{< tabs >}}
{{% tab "Node, .NET, PHP, Python" %}}
Go to **General settings** and add the following to the **Startup Command** field:

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.4.0/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Azure App Service Configuration: the Stack settings, under the Configuration section of Settings in the Azure UI. Underneath the stack, major version, and minor version fields is a 'Startup Command' field that is populated by the above curl command." style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
Download the [`datadog_wrapper`][8] file from the releases and upload it to your application with the Azure CLI command:

```
  az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}


## Testing threat detection

To see Application Security Management threat detection in action, send known attack patterns to your application. For example, send a request with the user agent header set to `dd-test-scanner-log` to trigger a [security scanner attack][5] attempt:
   ```sh
   curl -A 'dd-test-scanner-log' https://your-function-url/existing-route
   ```
A few minutes after you enable your application and exercise it, **threat information appears in the [Application Signals Explorer][3]**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /security/application_security/enabling/compatibility/serverless
[5]: /security/default_rules/security-scan-detected/
[6]: /serverless/libraries_integrations/plugin/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/
