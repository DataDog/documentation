---
aliases:
- /ko/serverless/datadog_lambda_library/nodejs/
- /ko/serverless/guide/nodejs/
- /ko/serverless/installation/nodejs
- /ko/serverless/aws_lambda/installation/nodejs
further_reading:
- link: /serverless/configuration
  tag: 설명서
  text: Serverless Monitoring 구성
- link: /serverless/guide/serverless_tracing_and_bundlers/
  tag: 설명서
  text: Node.js Lambda 트레이싱 및 번들러 호환성
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: 설명서
  text: Serverless Monitoring 문제 해결
- link: serverless/custom_metrics/
  tag: 설명서
  text: 서버리스 애플리케이션에서 Custom Metrics 제출
title: Node.js 서버리스 애플리케이션 계측
---
<div class="alert alert-info">Datadog Lambda Extension의 버전 67+는 콜드 스타트 시간을 크게 줄이도록 최적화되었습니다. <a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">자세히 읽기</a>.</div>

## 설정 {#setup}

{{< tabs >}}
{{% tab "Datadog UI" %}}
Node.js AWS Lambda 애플리케이션을 Datadog 내에서 직접 계측할 수 있습니다. [Serverless > AWS Lambda][2] 페이지로 이동하여 [**함수 계측**][3]을 선택합니다.

자세한 내용은 [AWS Lambda에 대한 원격 계측][1]을 참조하세요.

[1]: /ko/serverless/aws_lambda/remote_instrumentation
[2]: https://app.datadoghq.com/functions?cloud=aws
[3]: https://app.datadoghq.com/serverless/aws/lambda/setup
{{% /tab %}}
{{% tab "Datadog CLI" %}}

Datadog CLI는 기존 Lambda 함수의 구성을 수정하여 새로운 배포 없이 계측을 가능하게 합니다. Datadog의 Serverless Monitoring을 시작하는 가장 빠른 방법입니다.

1. Datadog CLI 클라이언트를 설치합니다.

    ```sh
    npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-lambda
    ```

2. Datadog Serverless Monitoring이 처음이라면, 첫 설치를 안내하기 위해 대화형 모드에서 Datadog CLI를 실행하여 빠르게 시작할 수 있으며, 나머지 단계는 무시할 수 있습니다. 생산 애플리케이션에 Datadog을 영구적으로 설치하려면 이 단계를 건너뛰고 나머지 단계를 따라 CI/CD 파이프라인에서 Datadog CLI 명령을 실행하세요 _배포 후_.

    ```sh
    datadog-ci lambda instrument -i
    ```

3. AWS 자격증명을 구성합니다.

    Datadog CLI는 AWS Lambda 서비스에 대한 접근이 필요하며, [자격증명을 해결하기 위해][1] AWS JavaScript SDK에 의존합니다. AWS 자격증명이 AWS CLI를 호출할 때 사용하는 것과 동일한 방법으로 구성되어 있는지 확인하세요.

4. Datadog 사이트를 구성합니다.

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (오른쪽에서 올바른 SITE가 선택되어 있는지 확인하세요).

5. Datadog API 키를 구성합니다.

    Datadog은 보안 및 손쉬운 회전을 위해 Datadog API 키를 AWS Secrets Manager에 저장할 것을 권장합니다. 키는 일반 텍스트 문자열로 저장되어야 합니다(JSON 블롭이 아님). Lambda 함수에 필요한 `secretsmanager:GetSecretValue` IAM 권한이 있는지 확인하세요.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For quick testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Lambda 함수를 계측합니다.

    **참고**: 먼저 개발 또는 스테이징 환경에서 Lambda 함수를 계측하세요! 계측 결과가 만족스럽지 않으면, 동일한 인수로 `uninstrument`를 실행하여 변경 사항을 되돌리세요.

    Lambda 함수를 계측하려면 다음의 명령어를 실행하세요.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="node" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    

```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names. Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

    Additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

<div class="alert alert-info">대신 JavaScript 파일에서 JSON 객체를 기본적으로 내보내기해 Serverless Framework 앱을 배포하는 경우 <a href="https://www.serverless.com/framework/docs/providers/aws/guide/intro"></a>(예: <code>serverless.ts</code> 파일 사용), <a href="./?tab=custom">사용자 정의 설치 지침</a>을 따르세요.</div>

[Datadog Serverless Plugin][1]이 [Datadog Lambda Extension][2]을 통해 메트릭, 트레이스, 로그를 Datadog로 전송하도록 함수를 자동 설정합니다.

Datadog Serverless Plugin을 설치하고 설정하려면 다음 절차를 따라주세요.

1. Datadog Serverless Plugin 설치:

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. 다음 `serverless.yml`를 업데이트하세요.

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (오른쪽에서 올바른 SITE가 선택되어 있는지 확인하세요).
    - `<DATADOG_API_KEY_SECRET_ARN>`을 [Datadog API 키][3]가 안전하게 저장된 AWS 암호의 ARN으로 교체하세요. 키는 일반 텍스트 문자열로 저장되어야 합니다(JSON 블롭이 아님). `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.

    For more information and additional settings, see the [plugin documentation][1].

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation 매크로][1]는 Lambda 레이어를 사용하여 함수에 Datadog 설치하기 위한 SAM 애플리케이션 템플릿을 자동으로 변환합니다. 또한 함수를 설정해 [Datadog Lambda Extension][2]을 통해 Datadog에 메트릭, 트레이스 및 로그를 전송할 수 있습니다.

1. Datadog CloudFormation 매크로 설치

    다음 명령을 [AWS 자격 증명][3]으로 실행하여 매크로 AWS 리소스를 설치하는 CloudFormation 스택을 배포하세요. 주어진 리전에 대해 매크로를 **한 번만** 설치하면 됩니다. 매크로를 최신 버전으로 업데이트하려면 `create-stack`를 `update-stack`으로 교체하세요.

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

    The macro is now deployed and ready to use.

2. Lambda 함수를 계측합니다.

    SAM `template.yml`에서 `Transform` 섹션의 `AWS::Serverless` 변환 **뒤에** `DatadogServerless` 변환을 추가합니다.

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          nodeLayerVersion: {{< latest-lambda-layer-version layer="node" >}}
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (오른쪽에서 올바른 SITE가 선택되어 있는지 확인하세요).
    - `<DATADOG_API_KEY_SECRET_ARN>`을 [Datadog API 키][4]가 안전하게 저장된 AWS 암호의 ARN으로 교체하세요. 키는 일반 텍스트 문자열로 저장되어야 합니다(JSON 블롭이 아님). `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.

    More information and additional parameters can be found in the [macro documentation][1].


[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "AWS CDK" %}}
{{< lambda-install-cdk language="node" layer="node" layerParamTypescript="nodeLayerVersion" layerParamPython="node_layer_version">}}
{{% /tab %}}

{{% tab "컨테이너 이미지" %}}

1. Datadog Lambda 라이브러리를 설치합니다.

    이미지 내에 Datadog Lambda 및 SDK 패키지 포함:

    ```sh
    npm install datadog-lambda-js dd-trace
    ```

    Note that the minor version of the `datadog-lambda-js` package always matches the layer version. For example, `datadog-lambda-js v0.5.0` matches the content of layer version 5.

    You cannot install the Datadog Lambda Library as a layer if you are deploying your Lambda function as a container image.

2. Datadog Lambda Extension 설치

    다음을 Docker 파일에 추가하여 Datadog Lambda Extension을 컨테이너 이미지에 추가합니다.

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. Alpine is also supported with specific version numbers (such as `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) or with `latest-alpine`. [Amazon ECR 리포지토리][1]에서 가능한 태그의 전체 목록을 확인할 수 있습니다.

3. 핸들러 함수 리디렉션

    - 이미지의 `CMD` 값을 `node_modules/datadog-lambda-js/dist/handler.handler`로 설정하세요. AWS 또는 Dockerfile에서 직접 설정할 수 있습니다. AWS에서 설정한 값이 Dockerfile의 값을 덮어씁니다. 두 가지를 모두 설정하는 경우 주의하세요.
    - 환경 변수 `DD_LAMBDA_HANDLER`를 원래 핸들러로 설정하세요. 예를 들어, `myfunc.handler`와 같이 설정합니다.
    - 컨테이너와 함께 ESModule을 사용하는 경우 `handler.js` 파일을 제거해야 합니다. 이 파일은 Node 12에 존재하며 AWS가 Node 12 지원을 중단할 때 제거됩니다.
      ```dockerfile
      RUN rm node_modules/datadog-lambda-js/dist/handler.js
      CMD ["node_modules/datadog-lambda-js/dist/handler.handler"]
      ```

    **Note**: If your Lambda function runs on `arm64`, you must either build your container image in an arm64-based Amazon Linux environment or [apply the Datadog wrapper in your function code][2] instead. You may also need to do that if you are using a third-party security or monitoring tool that is incompatible with the Datadog handler redirection.

4. Datadog 사이트 및 API 키 설정

    - 환경 변수 `DD_SITE`를 다음으로 설정하세요. {{< region-param key="dd_site" code="true" >}} (오른쪽에서 올바른 SITE가 선택되어 있는지 확인하세요).
    - `DD_API_KEY_SECRET_ARN`환경 변수를 [Datadog API 키][3]가 안전하게 저장된 AWS 암호의 ARN으로 설정하세요. 키는 일반 텍스트 문자열로 저장되어야 합니다(JSON 블롭이 아님). `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://docs.datadoghq.com/ko/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

[`lambda-datadog`][1] Terraform 모듈은 [`aws_lambda_function`][2] 리소스를 래핑하고 Datadog Serverless Monitoring을 위해 Lambda 함수를 자동으로 구성합니다.

- Datadog Lambda 레이어 추가
- Lambda 핸들러 리디렉션
- 메트릭, 트레이스 및 로그를 Datadog으로 수집하고 전송하도록 설정합니다.

```tf
module "lambda-datadog" {
  source  = "DataDog/lambda-datadog/aws"
  version = "4.0.0"

  environment_variables = {
    "DD_API_KEY_SECRET_ARN" : "<DATADOG_API_KEY_SECRET_ARN>"
    "DD_ENV" : "<ENVIRONMENT>"
    "DD_SERVICE" : "<SERVICE_NAME>"
    "DD_SITE": "<DATADOG_SITE>"
    "DD_VERSION" : "<VERSION>"
  }

  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_node_layer_version = {{< latest-lambda-layer-version layer="node" >}}

  # aws_lambda_function arguments
}
```

1. `aws_lambda_function` 리소스를 `lambda-datadog` Terraform 모듈로 교체한 다음 모듈의 `source` 및 `version`를 지정합니다.

2. `aws_lambda_function` 인수를 설정하세요.

   `aws_lambda_function` 리소스에서 사용할 수 있는 모든 인수가 이 Terraform 모듈에서도 사용할 수 있습니다. `aws_lambda_function` 리소스에서 블록으로 정의된 인수는 중첩된 인수와 함께 변수로 재정의됩니다.

   예를 들어, `aws_lambda_function`에서 `environment`은 `variables` 인수를 가진 블록으로 정의됩니다. `lambda-datadog` Terraform 모듈에서 `environment_variables`의 값은 `aws_lambda_function`의 `environment.variables` 인수로 전달됩니다. 이 모듈의 변수 전체 목록은 [입력][3]을 참조하세요.

3. 환경 변수 자리 표시자를 다음과 같이 채웁니다.

   - `<DATADOG_API_KEY_SECRET_ARN>`를 Datadog API 키가 안전하게 저장된 AWS 암호의 ARN으로 교체하세요. 키는 일반 텍스트 문자열로 저장되어야 합니다(JSON 블롭이 아님). `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 환경 변수 `DD_API_KEY`을 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.
   - `<ENVIRONMENT>`를 Lambda 함수의 환경, 예를 들어 `prod` 또는 `staging`으로 교체합니다.
   - `<SERVICE_NAME>`을 Lambda 함수의 서비스 이름으로 교체합니다.
   - `<DATADOG_SITE>`로 교체하세요. {{< region-param key="dd_site" code="true" >}}. (이 페이지에서 올바른 [Datadog 사이트][4]가 선택되었는지 확인하세요).
   - `<VERSION>`를 Lambda 함수의 버전 번호로 교체하세요.

4.  사용할 Datadog Extension Lambda 레이어 및 Datadog Node.js Lambda 레이어의 버전을 선택합니다. 기본값은 최신 레이어 버전입니다.

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_node_layer_version = {{< latest-lambda-layer-version layer="node" >}}
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /ko/getting_started/site/
{{% /tab %}}
{{% tab "SST v3" %}}

SST v3를 사용하여 Datadog을 구성하려면 다음 단계를 따르세요.

  ```ts
  const app = new sst.aws.Function("MyApp", {
    handler: "index.handler",
    nodejs : {
      install: [
        "datadog-lambda-js",
        "dd-trace",
      ]
    },
    environment: {
      DD_ENV: "<ENVIRONMENT>",
      DD_SERVICE: "<SERVICE_NAME>",
      DD_VERSION: "<VERSION>",
      DATADOG_API_KEY_SECRET_ARN: "<DATADOG_API_KEY_SECRET_ARN>",
      DD_SITE: "<DATADOG_SITE>",
    },
    layers: [
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`,
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}`,
    ],
  });
  ```

  1. Configure the Datadog Lambda Library and Datadog Lambda Extension layers

     - The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="node-versions" >}}.

  2.  `dd-trace`와 `datadog-lambda-js`를 `nodejs.install` 목록에 추가합니다.

  3. 환경 변수 자리 표시자를 다음과 같이 채웁니다.

     - `<DATADOG_API_KEY_SECRET_ARN>`를 Datadog API 키가 안전하게 저장된 AWS 암호의 ARN으로 교체하세요. 키는 일반 텍스트 문자열로 저장되어야 합니다(JSON 블롭이 아님). `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 환경 변수 `DD_API_KEY`을 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.
     - `<ENVIRONMENT>`를 Lambda 함수의 환경, 예를 들어 `prod` 또는 `staging`으로 교체합니다.
     - `<SERVICE_NAME>`을 Lambda 함수의 서비스 이름으로 교체합니다.
     - `<DATADOG_SITE>`로 교체하세요. {{< region-param key="dd_site" code="true" >}}. (이 페이지에서 올바른 [Datadog 사이트][1]가 선택되었는지 확인하세요)
     - `<VERSION>`을 Lambda 함수의 버전 번호로 바꾸세요.

  4. [함수 코드에 Datadog 래퍼를 적용하세요][2]

[1]: /ko/getting_started/site/
[2]: https://docs.datadoghq.com/ko/serverless/guide/handler_wrapper
{{% /tab %}}
{{% tab "Custom" %}}

<div class="alert alert-info">서버리스 프레임워크 또는 AWS CDK와 같이 Datadog이 지원하는 서버리스 개발 도구를 사용하지 않는 경우, Datadog에서는 <a href="./?tab=datadogcli">Datadog CLI</a>를 사용하여 서버리스 애플리케이션을 계측할 것을 강력히 권장합니다.</div>

1. Datadog Lambda 라이브러리를 설치합니다.

    Datadog Lambda 라이브러리는 레이어(권장) _또는_ JavaScript 패키지로 가져올 수 있습니다.

    `datadog-lambda-js` 패키지의 마이너 버전은 항상 레이어 버전과 일치합니다. 예를 들어, datadog-lambda-js v0.5.0은 레이어 버전 5의 내용과 일치합니다.

    - 옵션 A: 다음 형식의 ARN을 사용하여 Lambda 함수의 [레이어를 설정하세요][1]:

      ```sh
      # Use this format for AWS commercial regions
      arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}

      # Use this format for AWS GovCloud regions
      arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="node" >}}
      ```

      Replace `<AWS_REGION>` with a valid AWS region such as `us-east-1`. The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="node-versions" >}}.

    - Option B: If you cannot use the prebuilt Datadog Lambda layer, alternatively you can install the packages `datadog-lambda-js` and `dd-trace` using your favorite package manager.

      ```
      npm install datadog-lambda-js dd-trace
      ```

2. Datadog Lambda Extension 설치

    다음 형식에 맞추어 ARN을 사용해 Lambda 함수의 [레이어를 설정합니다][1].

    ```sh
    # Use this format for x86-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for arm64-based Lambda deployed in AWS commercial regions
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for x86-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}

    # Use this format for arm64-based Lambda deployed in AWS GovCloud regions
    arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
    

```

    Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`.

3. 핸들러 함수 리디렉션

    - 레이어를 사용하는 경우 `/opt/nodejs/node_modules/datadog-lambda-js/handler.handler`로 함수의 핸들러를 설정하거나 패키지를 사용하는 경우 `node_modules/datadog-lambda-js/dist/handler.handler`로 설정하세요.
    - 환경 변수 `DD_LAMBDA_HANDLER`를 원래 핸들러로 설정하세요. 예를 들어, `myfunc.handler`와 같이 설정합니다.

    **참고**: Lambda 함수가 `arm64`에서 실행되고 `datadog-lambda-js` 라이브러리가 NPM 패키지로 설치된 경우(1단계의 옵션 B), 대신 [함수 코드에 Datadog 래퍼를 적용하세요][2]. Datadog 핸들러 리디렉션과 호환되지 않는 타사 보안 또는 모니터링 도구를 사용하는 경우에도 그렇게 해야 할 수 있습니다.

4. Datadog 사이트 및 API 키를 설정합니다.

    - 환경 변수 `DD_SITE`를 다음으로 설정하세요. {{< region-param key="dd_site" code="true" >}} (오른쪽에서 올바른 SITE가 선택되어 있는지 확인하세요).
    - `DD_API_KEY_SECRET_ARN`환경 변수를 [Datadog API 키][3]가 안전하게 저장된 AWS 암호의 ARN으로 설정하세요. 키는 일반 텍스트 문자열로 저장되어야 합니다(JSON 블롭이 아님). `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://docs.datadoghq.com/ko/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

<div class="alert alert-danger">Datadog Lambda 라이브러리를 <i> 레이어 및 </i> JavaScript 패키지로 설치하지 마세요. Datadog Lambda 라이브러리를 레이어로 설치한 경우, <code>datadog-lambda-js</code> 를 <code>package.json</code>에 포함하지 마세요. 또는 개발 종속성으로 설치하고 배포하기 전에 <code>npm install --production</code> 을 실행하세요.</div>

## FIPS 규정 준수 {#fips-compliance}

{{% svl-lambda-fips %}}

## AWS Lambda 및 VPC {#aws-lambda-and-vpc}

{{% svl-lambda-vpc %}}

## 다음 단계는 무엇입니까? {#whats-next}

- 환경 변수 `DD_TAGS`를 사용하여 텔레메트리에 사용자 정의 태그를 추가하세요.
- [페이로드 수집][12]을 구성하여 함수의 JSON 요청 및 응답 페이로드를 캡처하세요.
- Datadog Lambda Extension을 사용하는 경우, Datadog Forwarder의 Lambda 로그를 해제하세요.
- [AWS Lambda에 대한 Serverless Monitoring 구성][3]을 참조하여 추가 기능을 확인하세요.

### 커스텀 비즈니스 로직을 모니터링하세요 {#monitor-custom-business-logic}

커스텀 비즈니스 로직을 모니터링하려면 아래 샘플 코드를 사용하여 사용자 정의 메트릭 또는 스팬을 제출하세요. 추가 옵션에 대해서는 [서버리스 애플리케이션을 위한 사용자 정의 메트릭 제출][4] 및 [사용자 정의 계측][5]에 대한 APM 가이드를 참조하세요.

```javascript
const { sendDistributionMetric, sendDistributionMetricWithDate } = require('datadog-lambda-js');
const tracer = require('dd-trace');

// submit a custom span named "sleep"
const sleep = tracer.wrap('sleep', (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
});

exports.handler = async (event) => {
    // add custom tags to the lambda function span,
    // does NOT work when X-Ray tracing is enabled
    const span = tracer.scope().active();
    span.setTag('customer_id', '123456');

    await sleep(100);

    // submit a custom span
    const sandwich = tracer.trace('hello.world', () => {
        console.log('Hello, World!');
    });

    // submit a custom metric
    sendDistributionMetric(
        'coffee_house.order_value', // metric name
        12.45, // metric value
        'product:latte', // tag
        'order:online' // another tag
    );

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from serverless!')
    };
    return response;
};
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /ko/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /ko/serverless/configuration/
[4]: /ko/serverless/custom_metrics?tab=nodejs
[5]: /ko/tracing/custom_instrumentation/nodejs/
[6]: /ko/security/application_security/serverless/
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/datadog-lambda-extension/issues
[9]: /ko/serverless/aws_lambda/distributed_tracing/#span-auto-linking
[10]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[11]: /ko/serverless/aws_lambda/remote_instrumentation
[12]: /ko/serverless/aws_lambda/configuration?tab=datadogcli#collect-the-request-and-response-payloads