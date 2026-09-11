---
algolia:
  tags:
  - python lambda traces
aliases:
- /ko/serverless/datadog_lambda_library/python/
- /ko/serverless/guide/python/
- /ko/serverless/installation/python
- /ko/serverless/aws_lambda/installation/python
further_reading:
- link: /serverless/configuration
  tag: 설명서
  text: Serverless Monitoring 구성
- link: /serverless/guide/troubleshoot_serverless_monitoring
  tag: 설명서
  text: Serverless Monitoring 문제 해결
- link: serverless/custom_metrics/
  tag: 설명서
  text: Serverless 애플리케이션에서 Custom Metrics 제출
title: Python Serverless 애플리케이션 계측
---
<div class="alert alert-info">Datadog Lambda Extension의 버전 67+는 콜드 스타트 시간을 대폭 단축하도록 최적화되었습니다. <a href="/serverless/aws_lambda/configuration/?tab=datadogcli#using-datadog-lambda-extension-v67">더 읽기</a>.</div>

## 설정 {#setup}

{{< tabs >}}
{{% tab "Datadog UI" %}}
Datadog 내에서 직접 Python AWS Lambda 애플리케이션을 계측할 수 있습니다. [Serverless > AWS Lambda][2] 페이지로 이동하여 [**함수 계측**][3]을 선택하세요.

자세한 내용은 [AWS Lambda의 원격 계측][1]을 참조하세요.

[1]: /ko/serverless/aws_lambda/remote_instrumentation
[2]: https://app.datadoghq.com/functions?cloud=aws
[3]: https://app.datadoghq.com/serverless/aws/lambda/setup
{{% /tab %}}
{{% tab "Datadog CLI" %}}

Datadog CLI는 기존 Lambda 함수의 구성을 수정하여 새 배포가 필요 없이 계측할 수 있게 해줍니다. 이것이 Datadog의 서버리스 모니터링을 시작하는 가장 빠른 방법입니다.

1. Datadog CLI 클라이언트 설치

    ```sh
    npm install -g @datadog/datadog-ci @datadog/datadog-ci-plugin-lambda
    ```

2. Datadog 서버리스 모니터링을 처음 사용하는 경우, Datadog CLI를 대화형 모드로 실행하여 첫 설치를 안내받으면 빨리 시작할 수 있고, 나머지 단계는 무시하면 됩니다. Datadog을 프로덕션 애플리케이션용으로 영구적으로 설치하려면, 이 단계를 건너뛰고 나머지 단계를 따라 정상 배포 _이후_에 Datadog CLI 명령을 CI/CD 파이프라인에서 실행하세요.

    ```sh
    datadog-ci lambda instrument -i
    ```

3. AWS 자격 증명 구성

    Datadog CLI에는 AWS Lambda 서비스에 대한 액세스 권한이 필요하고, [자격 증명을 확인][1]하기 위해 AWS JavaScript SDK에 의존합니다. AWS 자격 증명이 AWS CLI를 호출할 때 사용하는 것과 같은 방법으로 구성되었어야 합니다.

4. Datadog 사이트 구성

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (오른쪽에서 올바른 사이트가 선택되었는지 확인).

5. Datadog API 키 구성

    Datadog에서는 보안 및 간편한 교체를 위해 Datadog API 키를 AWS Secrets Manager에 저장할 것을 권장합니다. 키는 (JSON 블롭이 아니라) 일반 텍스트 문자열로 저장해야 합니다. Lambda 함수에 필수 `secretsmanager:GetSecretValue` IAM 권한이 있어야 합니다.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For quick testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Lambda 함수 계측

    **참고**: Lambda 함수를 먼저 dev 또는 스테이징 환경에서 계측하세요. 계측 결과가 만족스럽지 않으면 동일한 인수로 `uninstrument`를 실행하여 변경 사항을 되돌립니다.

    Lambda 함수를 계측하려면 다음 명령을 실행합니다.

    ```sh
    datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v {{< latest-lambda-layer-version layer="python" >}} -e {{< latest-lambda-layer-version layer="extension" >}}
    

```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names. Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

    Additional parameters can be found in the [CLI documentation][2].


[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless 프레임워크" %}}

[Datadog Serverless Plugin][1]이 함수가 [Datadog Lambda Extension][2]을 통해 메트릭, 트레이스 및 로그를 Datadog으로 전송하도록 자동으로 구성합니다.

Datadog Serverless Plugin을 설치하고 구성하려면 다음 단계를 따르세요.

1. Datadog Serverless Plugin 설치:

    ```sh
    serverless plugin install --name serverless-plugin-datadog
    ```

2. `serverless.yml` 업데이트:

    ```yaml
    custom:
      datadog:
        site: <DATADOG_SITE>
        apiKeySecretArn: <DATADOG_API_KEY_SECRET_ARN>
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (오른쪽에서 올바른 사이트가 선택되었는지 확인).
    - `<DATADOG_API_KEY_SECRET_ARN>`을 [Datadog API 키][3]가 안전하게 저장된 AWS 시크릿의 ARN으로 바꿉니다. 키는 (JSON 블롭이 아니라) 일반 텍스트 문자열로 저장해야 합니다. `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.

    For more information and additional settings, see the [plugin documentation][1].

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/extension
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation 매크로][1]는 Lambda 레이어를 사용하여 함수에 Datadog을 설치하기 위해 SAM 애플리케이션 템플릿을 자동으로 변환하고, 함수가 [Datadog Lambda Extension][2]을 통해 메트릭, 트레이스, 로그를 Datadog으로 전송하도록 구성합니다.

1. Datadog CloudFormation 매크로 설치

    [AWS 자격 증명][3]을 사용하여 다음 명령을 실행해 매크로 AWS 리소스를 설치하는 CloudFormation 스택을 배포하세요. 계정의 주어진 리전에 대하여 매크로를 **한 번**만 설치하면 됩니다. `create-stack`을 `update-stack`으로 바꿔 매크로를 최신 버전으로 업데이트하세요.

    ```sh
    aws cloudformation create-stack \
      --stack-name datadog-serverless-macro \
      --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
      --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
    ```

    The macro is now deployed and ready to use.

2. Lambda 함수 계측

    SAM의 `template.yml` 파일 `Transform` 섹션의 `AWS::Serverless` 변환 **뒤에** `DatadogServerless` 변환을 추가합니다.

    ```yaml
    Transform:
      - AWS::Serverless-2016-10-31
      - Name: DatadogServerless
        Parameters:
          stackName: !Ref "AWS::StackName"
          pythonLayerVersion: {{< latest-lambda-layer-version layer="python" >}}
          extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}}
          site: "<DATADOG_SITE>"
          apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (오른쪽에서 올바른 사이트가 선택되었는지 확인).
    - `<DATADOG_API_KEY_SECRET_ARN>`을 [Datadog API 키][4]가 안전하게 저장된 AWS 시크릿의 ARN으로 바꿉니다. 키는 (JSON 블롭이 아니라) 일반 텍스트 문자열로 저장해야 합니다. `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.

    More information and additional parameters can be found in the [macro documentation][1].


[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/extension
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}

{{% tab "AWS CDK" %}}
{{< lambda-install-cdk language="python" layer="python" layerParamTypescript="pythonLayerVersion" layerParamPython="python_layer_version">}}

{{% /tab %}}
{{% tab "컨테이너 이미지" %}}

1. Datadog Lambda 라이브러리 설치

    Lambda 함수를 컨테이너 이미지로 배포하는 경우, Datadog Lambda 라이브러리를 Lambda 레이어로 사용할 수 없습니다. 대신 Datadog Lambda 라이브러리를 이미지 내 함수의 종속성으로 설치해야 합니다.

    ```sh
    pip install datadog-lambda
    ```

    Note that the minor version of the `datadog-lambda` package always matches the layer version. For example, `datadog-lambda v0.5.0` matches the content of layer version 5.

2. Datadog Lambda Extension 설치

    다음을 Dockerfile에 추가하여 Datadog Lambda Extension을 컨테이너 이미지에 추가합니다.

    ```dockerfile
    COPY --from=public.ecr.aws/datadog/lambda-extension:<TAG> /opt/. /opt/
    ```

    Replace `<TAG>` with either a specific version number (for example, `{{< latest-lambda-layer-version layer="extension" >}}`) or with `latest`. Alpine is also supported with specific version numbers (such as `{{< latest-lambda-layer-version layer="extension" >}}-alpine`) or with `latest-alpine`. 가능한 태그의 전체 목록은 [Amazon ECR 리포지토리][1]에서 확인할 수 있습니다.

3. 핸들러 함수 리디렉션

    - 이미지의 `CMD` 값을 `datadog_lambda.handler.handler`로 설정합니다. 이것은 AWS에서 또는 Dockerfile에서 직접 설정할 수 있습니다. 둘 다 설정하는 경우, AWS에서 설정한 값이 Dockerfile의 값을 재정의합니다.
    - 환경 변수 `DD_LAMBDA_HANDLER`를 원본 핸들러로 설정합니다(예: `myfunc.handler`).

    **참고**: Datadog 핸들러 리디렉션과 호환되지 않는 타사 보안 또는 모니터링 도구를 사용 중인 경우, 대신 [Datadog 래퍼를 함수 코드에 적용][2]할 수 있습니다.

4. Dockerfile에서 Datadog 사이트, API 키 및 추적 구성

    - 환경 변수 `DD_SITE`를 다음으로 설정: {{< region-param key="dd_site" code="true" >}} (오른쪽에서 올바른 사이트가 선택되었는지 확인).
    - 환경 변수 `DD_API_KEY_SECRET_ARN`을 [Datadog API 키][3]가 안전하게 저장된 AWS 시크릿의 ARN으로 설정합니다. 키는 (JSON 블롭이 아니라) 일반 텍스트 문자열로 저장해야 합니다. `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.
    - 환경 변수 `DD_TRACE_ENABLED`를 `true`로 설정합니다.


[1]: https://gallery.ecr.aws/datadog/lambda-extension
[2]: https://docs.datadoghq.com/ko/serverless/guide/handler_wrapper
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Terraform" %}}

[`lambda-datadog`][1] Terraform 모듈은 [`aws_lambda_function`][2] 리소스를 래핑하고 다음과 같은 작업을 거쳐 Lambda 함수를 Datadog Serverless Monitoring에 대해 구성합니다.

- Datadog Lambda 레이어 추가
- Lambda 핸들러 리디렉션
- 메트릭, 트레이스 및 로그를 수집하여 Datadog으로 전송하도록 활성화

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
  datadog_python_layer_version = {{< latest-lambda-layer-version layer="python" >}}

  # aws_lambda_function arguments
}
```

1. `aws_lambda_function` 리소스를 `lambda-datadog` Terraform 모듈로 바꿉니다. 그런 다음, 모듈의 `source` 및 `version`을 지정합니다.

2. `aws_lambda_function` 인수 설정:

   `aws_lambda_function` 리소스에서 사용할 수 있는 모든 인수를 이 Terraform 모듈에서 사용할 수 있습니다. `aws_lambda_function` 리소스에서 블록으로 정의된 인수는 각자의 중첩된 인수를 사용하여 변수로 재정의됩니다.

   예를 들어 `aws_lambda_function`에서는, `environment`가 `variables` 인수를 포함한 블록으로 정의됩니다. `lambda-datadog` Terraform 모듈에서는 `environment_variables`의 값이 `aws_lambda_function`의 `environment.variables` 인수로 전달됩니다. 이 모듈의 변수 전체 목록은 [입력][3]을 참조하세요.

3. 환경 변수 자리표시자 채우기:

   - `<DATADOG_API_KEY_SECRET_ARN>`을 Datadog API 키가 안전하게 저장된 AWS 시크릿의 ARN으로 바꿉니다. 키는 (JSON 블롭이 아니라) 일반 텍스트 문자열로 저장해야 합니다. `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 환경 변수 `DD_API_KEY`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.
   - `<ENVIRONMENT>`를 Lambda 함수의 환경, 예를 들어 `prod` 또는 `staging`으로 바꿉니다.
   - `<SERVICE_NAME>`을 Lambda 함수의 서비스 이름으로 바꿉니다.
   - `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}}으로 바꿉니다. (이 페이지에서 올바른 [Datadog 사이트][4]가 선택되었는지 확인).
   - `<VERSION>`을 Lambda 함수의 버전 번호로 교체

4. 사용할 Datadog Extension Lambda 레이어와 Datadog Python Lambda 레이어의 버전을 선택합니다. 비워두면 최신 레이어 버전이 사용됩니다.

```
  datadog_extension_layer_version = {{< latest-lambda-layer-version layer="extension" >}}
  datadog_python_layer_version = {{< latest-lambda-layer-version layer="python" >}}
```

[1]: https://registry.terraform.io/modules/DataDog/lambda-datadog/aws/latest
[2]: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function
[3]: https://github.com/DataDog/terraform-aws-lambda-datadog?tab=readme-ov-file#inputs
[4]: /ko/getting_started/site/
{{% /tab %}}
{{% tab "SST v3" %}}

SST v3를 사용하여 Datadog을 구성하려면 다음 단계를 따릅니다.

  ```ts
  const app = new sst.aws.Function("MyApp", {
    handler: "lambda_function.lambda_handler",
    runtime: "python3.13",
    environment: {
      DD_ENV: "<ENVIRONMENT>",
      DD_SERVICE: "<SERVICE_NAME>",
      DD_VERSION: "<VERSION>",
      DATADOG_API_KEY_SECRET_ARN: "<DATADOG_API_KEY_SECRET_ARN>",
      DD_SITE: "<DATADOG_SITE>",
    },
    layers: [
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}`,
      $interpolate`arn:aws:lambda:${aws.getRegionOutput().name}:464622532012:layer:Datadog-<RUNTIME>:{{< latest-lambda-layer-version layer="python" >}}`,
    ],
  });
  ```

  1. Configure the Datadog Lambda Library and Datadog Lambda Extension layers

     - The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="python-versions" >}}.

  2. 환경 변수 자리표시자 채우기:
     - `<DATADOG_API_KEY_SECRET_ARN>`을 Datadog API 키가 안전하게 저장된 AWS 시크릿의 ARN으로 바꿉니다. 키는 (JSON 블롭이 아니라) 일반 텍스트 문자열로 저장해야 합니다. `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 환경 변수 `DD_API_KEY`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.
     - `<ENVIRONMENT>`를 Lambda 함수의 환경, 예를 들어 `prod` 또는 `staging`으로 바꿉니다.
     - `<SERVICE_NAME>`을 Lambda 함수의 서비스 이름으로 바꿉니다.
     - `<DATADOG_SITE>`를 {{< region-param key="dd_site" code="true" >}}으로 바꿉니다. (이 페이지에서 올바른 [Datadog 사이트][1]가 선택되었는지 확인).
     - `<VERSION>`을 Lambda 함수의 버전 번호로 교체

  3. [함수 코드에 Datadog 래퍼 적용][2]

[1]: /ko/getting_started/site/
[2]: https://docs.datadoghq.com/ko/serverless/guide/handler_wrapper

{{% /tab %}}
{{% tab "사용자 지정" %}}

<div class="alert alert-info">Serverless Framework 또는 AWS CDK와 같이 Datadog이 지원하는 서버리스 개발 도구를 사용하지 않는 경우, Datadog에서는 <a href="./?tab=datadogcli">Datadog CLI</a>를 사용해 서버리스 애플리케이션을 계측할 것을 강력히 권장합니다.</div>

1. Datadog Lambda 라이브러리 설치

    Datadog Lambda 라이브러리는 레이어로 가져올 수도 있고(권장) _또는_ Python 패키지로 가져올 수도 있습니다.

    `datadog-lambda` 패키지의 마이너 버전은 항상 레이어 버전과 일치합니다. 예를 들어 datadog-lambda v0.5.0은 레이어 버전 5와 일치합니다.

    - 옵션 A: 다음 형식으로 ARN을 사용하여 Lambda 함수의 [레이어를 구성][1]합니다.

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

      Replace `<AWS_REGION>` with a valid AWS region, such as `us-east-1`. The available `<RUNTIME>` options are: {{< latest-lambda-layer-version layer="python-versions" >}}.

    - Option B: If you cannot use the prebuilt Datadog Lambda layer, alternatively install the `datadog-lambda` package and its dependencies locally to your function project folder using your favorite Python package manager, such as `pip`.

      ```sh
      pip install datadog-lambda -t ./
      ```

      **Note**: `datadog-lambda` depends on `ddtrace`, which uses native extensions; therefore it must be installed and compiled in a Linux environment on the right architecture (`x86_64` or `arm64`). For example, you can use [dockerizePip][2] for the Serverless Framework and [--use-container][3] for AWS SAM. For more details, see [how to add dependencies to your function deployment package][4].

      See the [latest release][5].

2. Datadog Lambda Extension 설치

    다음 형식으로 ARN을 사용하여 Lambda 함수의 [레이어를 구성][1]합니다.

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

    - 함수의 핸들러를 `datadog_lambda.handler.handler`로 설정합니다.
    - 환경 변수 `DD_LAMBDA_HANDLER`를 원본 핸들러로 설정합니다(예: `myfunc.handler`).

    **참고**: Datadog 핸들러 리디렉션과 호환되지 않는 타사 보안 또는 모니터링 도구를 사용 중인 경우, 대신 [Datadog 래퍼를 함수 코드에 적용][6]할 수 있습니다.

4. Datadog 사이트, API 키, 트레이싱 구성

    - 환경 변수 `DD_SITE`를 다음으로 설정: {{< region-param key="dd_site" code="true" >}} (오른쪽에서 올바른 사이트가 선택되었는지 확인).
    - 환경 변수 `DD_API_KEY_SECRET_ARN`을 [Datadog API 키][7]가 안전하게 저장된 AWS 시크릿의 ARN으로 설정합니다. 키는 json 블롭 안에 있지 않고, 일반 텍스트 문자열로 저장되어야 합니다. `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `DD_API_KEY`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.
    - 환경 변수 `DD_TRACE_ENABLED`를 `true`로 설정합니다.

5. (AWS Chalice만) 미들웨어 등록

    [AWS Chalice][8]를 사용 중인 경우, `pip`를 사용하여 `datadog-lambda`를 설치해야 하고 `datadog_lambda_wrapper`를 `app.py`에 [미들웨어][9]로 등록해야 합니다.

    ```python
    from chalice import Chalice, ConvertToMiddleware
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    app = Chalice(app_name='hello-chalice')

    app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

    @app.route('/')
    def index():
        return {'hello': 'world'}
    ```

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[2]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[3]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[5]: https://pypi.org/project/datadog-lambda/
[6]: https://docs.datadoghq.com/ko/serverless/guide/handler_wrapper
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://aws.github.io/chalice/
[9]: https://aws.github.io/chalice/topics/middleware.html
{{% /tab %}}
{{< /tabs >}}

{{% svl-tracing-env %}}

## FIPS 규정 준수 {#fips-compliance}

{{% svl-lambda-fips %}}

## AWS Lambda 및 VPC {#aws-lambda-and-vpc}

{{% svl-lambda-vpc %}}

## 다음 단계는? {#whats-next}

- `DD_TAGS` 환경 변수를 사용하여 텔레메트리에 사용자 지정 태그 추가
- [페이로드 수집][12]이 함수의 JSON 요청 및 응답 페이로드를 캡처하도록 구성
- Datadog Lambda Extension을 사용 중인 경우, Datadog Forwarder의 Lambda 로그 끄기
- 더 많은 기능은 [AWS Lambda용 Serverless Monitoring 구성][3] 참조

### 사용자 지정 비즈니스 로직 모니터링 {#monitor-custom-business-logic}

사용자 지정 비즈니스 로직을 모니터링하려면 아래의 샘플 코드를 사용하여 사용자 지정 메트릭 또는 스팬을 제출하세요. 더 많은 옵션은 [서버리스 애플리케이션의 사용자 지정 메트릭 제출][4] 및 APM 가이드의 [사용자 지정 계측][5]을 참조하세요.

```python
import time
from ddtrace import tracer
from datadog_lambda.metric import lambda_metric

def lambda_handler(event, context):
    # add custom tags to the lambda function span,
    # does NOT work when X-Ray tracing is enabled
    current_span = tracer.current_span()
    if current_span:
        current_span.set_tag('customer.id', '123456')

    # submit a custom span
    with tracer.trace("hello.world"):
        print('Hello, World!')

    # submit a custom metric
    lambda_metric(
        metric_name='coffee_house.order_value',
        value=12.45,
        tags=['product:latte', 'order:online']
    )

    return {
        'statusCode': 200,
        'body': get_message()
    }

# trace a function
@tracer.wrap()
def get_message():
    return 'Hello from serverless!'
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/functions
[2]: /ko/serverless/guide/troubleshoot_serverless_monitoring/
[3]: /ko/serverless/configuration/
[4]: /ko/serverless/aws_lambda/metrics/?code-lang=python
[5]: /ko/tracing/custom_instrumentation/python/
[6]: /ko/security/application_security/serverless/
[7]: https://github.com/DataDog/datadog-lambda-extension
[8]: https://github.com/DataDog/datadog-lambda-extension/issues
[9]: /ko/serverless/aws_lambda/distributed_tracing/#span-auto-linking
[10]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[11]: /ko/serverless/aws_lambda/remote_instrumentation
[12]: /ko/serverless/aws_lambda/configuration?tab=datadogcli#collect-the-request-and-response-payloads