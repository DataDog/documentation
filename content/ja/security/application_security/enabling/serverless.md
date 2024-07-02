---
title: Enabling ASM for Serverless
aliases:
  - /security/application_security/getting_started/serverless
further_reading:
    - link: /security/application_security/how-appsec-works/
      tag: Documentation
      text: How Application Security Works
    - link: /security/default_rules/?category=cat-application-security
      tag: Documentation
      text: OOTB Application Security Management Rules
    - link: /security/application_security/troubleshooting
      tag: Documentation
      text: Troubleshooting Application Security Management
    - link: /security/application_security/threats/
      tag: Documentation
      text: Application Threat Management
    - link: "https://www.datadoghq.com/blog/datadog-security-google-cloud/"
      tag: Blog
      text: Datadog Security extends compliance and threat protection capabilities for Google Cloud
---

{{< partial name="security-platform/appsec-serverless.html" >}}</br>

See [compatibility requirements][4] for information about what ASM features are available for serverless functions.

## AWS Lambda

Configuring ASM for AWS Lambda involves:

1. ASM の恩恵を最も受けられる脆弱な関数や攻撃を受けている関数を特定する。[サービスカタログの Security タブ][1]で検索してください。
2. Setting up ASM instrumentation by using the [Datadog CLI](https://docs.datadoghq.com/serverless/serverless_integrations/cli), [AWS CDK](https://github.com/DataDog/datadog-cdk-constructs), [Datadog Serverless Framework plugin][6], or manually by using the Datadog tracing layers.
3. アプリケーションでセキュリティシグナルをトリガーし、その結果の情報を Datadog がどのように表示するかを確認する。

### 前提条件

- [Serverless APM Tracing][apm-lambda-tracing-setup] is setup on the Lambda function to send traces directly to Datadog.
  X-Ray tracing, by itself, is not sufficient for ASM and requires APM Tracing to be enabled.

### 詳細はこちら

{{< tabs >}}
{{% tab "Serverless Framework" %}}

The [Datadog Serverless Framework plugin][1] can be used to automatically configure and deploy your lambda with ASM.

Datadog Serverless Framework プラグインをインストールして構成するには

1. Datadog Serverless Framework プラグインをインストールします。
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

4. 関数を再デプロイして呼び出します。数分後、[ASM ビュー][3]に表示されます。

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

2. Datadog サーバーレスモニタリングに慣れていない場合は、クイックスタートとして最初のインストールを導くためにインタラクティブモードで Datadog CLI を起動し、残りのステップを無視することができます。本番アプリケーションに Datadog を恒久的にインストールするには、このステップをスキップし、残りのステップに従って通常のデプロイメントの後に CI/CD パイプラインで Datadog CLI コマンドを実行します。

    ```sh
    datadog-ci lambda instrument -i --appsec
    ```

3. Configure the AWS credentials:

   Datadog CLI は、AWS Lambda サービスへのアクセスを必要とし、AWS JavaScript SDK に依存して[資格情報を解決][1]します。AWS CLI を呼び出すときに使用するのと同じ方法を使用して、AWS の資格情報が構成されていることを確認します。

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

   Lambda 関数をインスツルメントするには、次のコマンドを実行します。

    ```sh
    datadog-ci lambda instrument --appsec -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    ```

   プレースホルダーを埋めるには
    - `<functionname>` と `<another_functionname>` を Lambda 関数名に置き換えます。
    - Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - `<aws_region>` を AWS リージョン名に置き換えます。

   **Note**: Instrument your Lambda functions in a development or staging environment first. If the instrumentation result is unsatisfactory, run `uninstrument` with the same arguments to revert the changes.

    Additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/cli

{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog CDK コンストラクト][1] は、Lambda レイヤーを使用して Datadog を関数に自動的にインストールし、Datadog Lambda 拡張機能を介してメトリクス、トレース、ログを Datadog に送信するように関数を構成します。

1. Install the Datadog CDK constructs library:

    ```sh
    # For AWS CDK v1
    pip install datadog-cdk-constructs

    # For AWS CDK v2
    pip install datadog-cdk-constructs-v2
    ```

2. Lambda 関数をインスツルメントする

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

   プレースホルダーを埋めるには
    - `<DATADOG_SITE>` を {{< region-param key="dd_site" code="true" >}} に置き換えます。(右側で正しい SITE が選択されていることを確認してください)。
    - `<DATADOG_API_KEY_SECRET_ARN>` を、[Datadog API キー][2]が安全に保存されている AWS シークレットの ARN に置き換えます。キーはプレーンテキスト文字列として保存する必要があります (JSON blob ではありません)。また、`secretsmanager:GetSecretValue`権限が必要です。迅速なテストのために、代わりに `apiKey` を使用して、Datadog API キーをプレーンテキストで設定することができます。

    [Datadog CDK のドキュメント][1]に詳細と追加のパラメーターがあります。

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Custom" %}}

{{< site-region region="us,us3,us5,eu,gov" >}}
1. Datadog トレーサーをインストールします。
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
          `<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えてください。`RUNTIME` オプションは、`Python37`、`Python38` または `Python39` が利用可能です。

   - **Node**
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
         ```
         `<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えてください。RUNTIME オプションは、{{< latest-lambda-layer-version layer="node-versions" >}} が利用可能です。

   - **Java**: Lambda がデプロイされている場所に応じて、以下のいずれかの形式の ARN を使用して Lambda 関数の[レイヤーを構成します][1]。`<AWS_REGION>` は `us-east-1` などの有効な AWS リージョンに置き換えてください。
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     ```
   - **Go**: Go トレーサーはレイヤーに依存せず、通常の Go モジュールとして使用できます。以下で最新バージョンにアップグレードできます。
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET**: Lambda がデプロイされている場所に応じて、以下のいずれかの形式の ARN を使用して Lambda 関数の[レイヤーを構成します][1]。`<AWS_REGION>` は `us-east-1` などの有効な AWS リージョンに置き換えてください。
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
2. 以下のいずれかの関数で ARN を使用して Lambda 関数のレイヤーを構成し、Datadog Lambda 拡張機能をインストールします。`<AWS_REGION>` は、`us-east-1` など有効な AWS リージョンに置き換えてください。
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
1. Datadog トレーサーをインストールします。
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
          `<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えてください。`RUNTIME` オプションは、{{< latest-lambda-layer-version layer="python-versions" >}} が利用可能です。
.

   - **Node**
       ``` sh
       # Use this format for AWS commercial regions
         arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

         # Use this format for AWS GovCloud regions
         arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
         ```
         `<AWS_REGION>` を `us-east-1` などの有効な AWS リージョンに置き換えてください。RUNTIME オプションは、{{< latest-lambda-layer-version layer="node-versions" >}} が利用可能です。


   - **Java**: Lambda がデプロイされている場所に応じて、以下のいずれかの形式の ARN を使用して Lambda 関数の[レイヤーを構成します][1]。`<AWS_REGION>` は `us-east-1` などの有効な AWS リージョンに置き換えてください。
     ```sh
     # In AWS commercial regions
     arn:aws:lambda:<AWS_REGION>:417141415827:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     # In AWS GovCloud regions
     arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:dd-trace-java:{{< latest-lambda-layer-version layer="dd-trace-java" >}}
     ```
   - **Go**: Go トレーサーはレイヤーに依存せず、通常の Go モジュールとして使用できます。以下で最新バージョンにアップグレードできます。
     ```sh
     go get -u github.com/DataDog/datadog-lambda-go
     ```
   - **.NET**: Lambda がデプロイされている場所に応じて、以下のいずれかの形式の ARN を使用して Lambda 関数の[レイヤーを構成します][1]。`<AWS_REGION>` は `us-east-1` などの有効な AWS リージョンに置き換えてください。
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
2. 以下のいずれかの関数で ARN を使用して Lambda 関数のレイヤーを構成し、Datadog Lambda 拡張機能をインストールします。`<AWS_REGION>` は、`us-east-1` など有効な AWS リージョンに置き換えてください。
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

3. 関数のデプロイ時に以下の環境変数を追加して、ASM を有効にします。
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```

4. **Node** 関数と **Python** 関数のみ、関数のハンドラーが正しく設定されていることを再確認してください。
    - **Node**: Set your function's handler to `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler`.
       - また、元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。
    - **Python**: 関数のハンドラーを `datadog_lambda.handler.handler` に設定します。
       - また、元のハンドラーに、環境変数 `DD_LAMBDA_HANDLER` を設定します。例: `myfunc.handler`。

5. 関数を再デプロイして呼び出します。数分後、[ASM ビュー][3]に表示されます。

[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

## Google Cloud Run

<div class="alert alert-info">ASM support for Google Cloud Run is in beta.</a></div>

### `serverless-init` の動作

The `serverless-init` application wraps your process and executes it as a subprocess. It starts a DogStatsD listener for metrics and a Trace Agent listener for traces. It collects logs by wrapping the stdout/stderr streams of your application. After bootstrapping, `serverless-init` then launches your command as a subprocess.

To get full instrumentation, ensure you are calling `datadog-init` as the first command that runs inside your Docker container. You can do this by setting it as the entrypoint, or by setting it as the first argument in CMD.

### 詳細はこちら

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

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。

   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Copy the Datadog Node.JS tracer into your Docker image.

   ```dockerfile
   COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
   ```

   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。

   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-nodejs
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-node)を参照してください。

   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["/nodejs/bin/node", "/path/to/your/app.js"]
   ```
#### 代替構成 {#alt-node}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/
ENV DD_SERVICE=datadog-demo-run-nodejs
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/nodejs/bin/node", "/path/to/your/app.js"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

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

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /tracing/trace_collection/dd_libraries/nodejs/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Python" %}}

Dockerfile に以下の指示と引数を追加します。
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

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Install the Datadog Python tracer.
   ```dockerfile
   RUN pip install --target /dd_tracer/python/ ddtrace
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-python
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-python)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. Datadog トレーシングライブラリによって起動されたエントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
   ```
#### 代替構成 {#alt-python}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
RUN pip install --target /dd_tracer/python/ ddtrace
ENV DD_SERVICE=datadog-demo-run-python
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/dd_tracer/python/bin/ddtrace-run", "python", "app.py"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

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

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /tracing/trace_collection/dd_libraries/python/?tab=containers#instrument-your-application

{{% /tab %}}
{{% tab "Java" %}}

Dockerfile に以下の指示と引数を追加します。

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
#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Add the Datadog Java tracer to your Docker image.
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-java
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-java)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["./mvnw", "spring-boot:run"]
   ```

#### 代替構成 {#alt-java}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD 'https://dtdg.co/latest-java-tracer' /dd_tracer/java/dd-java-agent.jar
ENV DD_SERVICE=datadog-demo-run-java
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "./mvnw", "spring-boot:run"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

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

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

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

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-go)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

3. (オプション) Datadog タグを追加します。
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-go
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["/path/to/your-go-binary"]
   ```

#### 代替構成 {#alt-go}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=6" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "/path/to/your-go-binary"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

{{< highlight dockerfile "hl_lines=6-7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-go
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "/path/to/your-go-binary"]
{{< /highlight >}}

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /tracing/trace_collection/dd_libraries/go

{{% /tab %}}
{{% tab ".NET" %}}

Dockerfile に以下の指示と引数を追加します。

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

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog .NET トレーサーを Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-dotnet
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ENV DD_APPSEC_ENABLED=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-dotnet)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["dotnet", "helloworld.dll"]
   ```
#### 代替構成 {#alt-dotnet}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-dotnet-init /datadog-init/monitoring-home/ /dd_tracer/dotnet/
ENV DD_SERVICE=datadog-demo-run-dotnet
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
CMD ["/app/datadog-init", "dotnet", "helloworld.dll"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

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

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /tracing/trace_collection/dd_libraries/dotnet-core/?tab=linux#custom-instrumentation

{{% /tab %}}
{{% tab "Ruby" %}}

アプリケーションをデプロイする前に、Ruby トレーサーを[手動でインストール][1]します。[サンプルアプリケーション][2]を参照してください。

Dockerfile に以下の指示と引数を追加します。

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

#### 説明

1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (オプション) Datadog タグを追加します
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_APPSEC_ENABLED=1
   ENV DD_VERSION=1
   ```

3. この環境変数は、 トレース伝搬が Cloud Run で正しく動作するために必要です。Datadog でインスツルメンテーションされたすべてのダウンストリームサービスにこの変数を設定してください。
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-ruby)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. エントリポイントにラップされたバイナリアプリケーションを実行します。この行は必要に応じて変更してください。
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
#### 代替構成 {#alt-ruby}
Dockerfile 内にすでにエントリーポイントが定義されている場合は、代わりに CMD 引数を変更することができます。

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

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

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

{{% /tab %}}
{{% tab "PHP" %}}

Dockerfile に以下の指示と引数を追加します。
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

**注**: `datadog-init` エントリーポイントはプロセスをラップし、そこからログを収集します。ログを正しく取得するには、Apache、Nginx、PHP プロセスが `stdout` に出力を書いていることを確認する必要があります。

#### 説明


1. Datadog `serverless-init` を Docker イメージにコピーします。
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. Datadog PHP トレーサーをコピーしてインストールします。
   ```dockerfile
   ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
   RUN php /datadog-setup.php --php-bin=all
   ```
   [手動トレーサーインスツルメンテーションの説明][1]で説明したように、Datadog トレーサーライブラリをアプリケーションに直接インストールする場合は、このステップを省略してください。

3. (オプション) Datadog タグを追加します。
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-php
   ENV DD_ENV=datadog-demo
   ENV DD_VERSION=1
   ```

4. Datadog `serverless-init` プロセスでアプリケーションをラップするようにエントリポイントを変更します。
   **注**: Dockerfile 内にすでにエントリーポイントが定義されている場合は、[代替構成](#alt-php)を参照してください。
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. アプリケーションを実行します。

   Apache と mod_php ベースのイメージには以下を使用します。
   ```dockerfile
   RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
   EXPOSE 8080
   CMD ["apache2-foreground"]
   ```

   Nginx と php-fpm ベースのイメージには以下を使用します。
   ```dockerfile
   RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
   EXPOSE 8080
   CMD php-fpm; nginx -g daemon off;
   ```
#### 代替構成 {#alt-php}
Dockerfile 内にすでにエントリーポイントが定義されていて、Apache と mod_php ベースのイメージを使用している場合は、代わりに CMD 引数を変更することができます。

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

エントリーポイントもインスツルメンテーションする必要がある場合は、代わりにエントリーポイントと CMD 引数を入れ替えることができます。詳しくは、[`serverless-init` の動作](#how-serverless-init-works)を参照してください。

{{< highlight dockerfile "hl_lines=7 12 17" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ADD https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php /datadog-setup.php
RUN php /datadog-setup.php --php-bin=all
ENV DD_SERVICE=datadog-demo-run-php
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENTRYPOINT ["/app/datadog-init"]

# Apache と mod_php ベースのイメージには以下を使用します
RUN sed -i "s/Listen 80/Listen 8080/" /etc/apache2/ports.conf
EXPOSE 8080
CMD ["your_entrypoint.sh", "apache2-foreground"]

# Nginx と php-fpm ベースのイメージには以下を使用します
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
EXPOSE 8080
CMD your_entrypoint.sh php-fpm; your_entrypoint.sh nginx -g daemon off;
{{< /highlight >}}

実行するコマンドが `datadog-init` の引数として渡される限り、完全なインスツルメンテーションを受け取ります。

[1]: /tracing/trace_collection/dd_libraries/php/?tab=containers#install-the-extension

{{% /tab %}}
{{< /tabs >}}

## Azure App Service

### セットアップ
#### アプリケーションの設定を行う
To enable ASM on your application, begin by adding the following key-value pairs under **Application Settings** in your Azure configuration settings.

{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service の構成: Azure UI の Settings の Configuration セクションの下にある Application Settings です。DD_API_KEY、DD_SERVICE、DD_START_APP の 3 つの設定が記載されています。" style="width:80%;" >}}

- `DD_API_KEY` は Datadog の API キーです。
- `DD_CUSTOM_METRICS_ENABLED` (オプション) は[カスタムメトリクス](#custom-metrics)を有効にします。
- `DD_SITE` は Datadog サイト[パラメーター][2]です。サイトは {{< region-param key="dd_site" code="true" >}} です。この値のデフォルトは `datadoghq.com` です。
- `DD_SERVICE` はこのプログラムで使用するサービス名です。デフォルトは `package.json` の名前フィールドの値です。
- `DD_START_APP` はアプリケーションの起動に使用するコマンドです。例えば、`node ./bin/www` です (Tomcat で動作するアプリケーションでは不要です)。
- `DD_APPSEC_ENABLED` value should be 1 in order to enable Application Security

### 起動コマンドを特定する

Linux Azure App Service の Web アプリは、組み込みランタイムのコードデプロイオプションを使用して構築され、言語によって異なる起動コマンドに依存しています。デフォルト値の概要は、[Azure のドキュメント][7]に記載されています。以下に例を示します。

これらの値を `DD_START_APP` 環境変数に設定します。以下の例は、関連する場合、`datadog-demo` という名前のアプリケーションの場合です。

| ランタイム   | `DD_START_APP` 値の例                                                               | 説明                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | [Node PM2 構成ファイル][12]、またはスクリプトファイルを実行します。                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | Runs a `.dll` file that uses your Web App name by default. <br /><br /> **Note**: The `.dll` file name in the command should match the file name of your `.dll` file. In certain cases, this might not match your Web App.         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | スクリプトを正しい場所にコピーし、アプリケーションを起動します                                                                                                                                                                           |
| Python    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | カスタム[起動スクリプト][13]。この例では、Django アプリを起動するための Gunicorn コマンドを示します。                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | アプリを起動するためのコマンドです。Tomcat で動作するアプリケーションでは不要です。                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up


**注**: 新しい設定を保存すると、アプリケーションは再起動します。

#### 一般設定を行う

{{< tabs >}}
{{% tab "Node、.NET、PHP、Python" %}}
**General settings** で、**Startup Command** のフィールドに以下を追加します。

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.4.0/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Azure App Service の構成: Azure UI の Settings の Configuration セクションにある、Stack の設定です。スタック、メジャーバージョン、マイナーバージョンのフィールドの下には、上記の curl コマンドで入力される Startup Command フィールドがあります。" style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
リリースから [`datadog_wrapper`][8] ファイルをダウンロードし、Azure CLI コマンドでアプリケーションにアップロードします。

```
  az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}


## Testing threat detection

Application Security Management の脅威検出を実際に確認するためには、既知の攻撃パターンをアプリケーションに送信してください。例えば、ユーザーエージェントヘッダーに `dd-test-scanner-log` を設定したリクエストを送信して、[セキュリティスキャナ攻撃][5]の試行をトリガーすることができます。
   ```sh
   curl -A 'dd-test-scanner-log' https://your-function-url/existing-route
   ```
アプリケーションを有効にして実行すると、数分後に[アプリケーションシグナルエクスプローラー][3]に脅威情報が表示されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /security/application_security/enabling/compatibility/serverless
[5]: /security/default_rules/security-scan-detected/
[6]: /serverless/libraries_integrations/plugin/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/
