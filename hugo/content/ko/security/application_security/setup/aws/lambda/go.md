---
further_reading:
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: App and API Protection의 작동 방식
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 문제 해결하기
- link: /security/application_security/threats/
  tag: 설명서
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: 블로그
  text: Datadog Security가 Google Cloud의 규정 준수 및 위협 보호 기능을 확장합니다
title: Go의 AWS Lambda 함수에 App and API Protection 활성화
---
AWS Lambda에 대한 App and API Protection 구성에는 다음이 포함됩니다.

1. App and API Protection의 효과를 가장 크게 얻을 수 있는 취약하거나 공격받고 있는 함수 식별 [Catalog의 Security 탭][1]에서 해당 함수를 찾습니다.
2. [Datadog CLI][8], [AWS CDK][9], [Datadog Serverless Framework plugin][2] 또는 Datadog 트레이싱 레이어를 사용하여 수동으로 App and API Protection 계측 설정
3. 애플리케이션에서 보안 신호를 트리거하고 그 결과 정보가 Datadog에 표시되는 방식 확인

## 지원되는 트리거 유형 {#supported-trigger-types}
Threat Detection은 함수 입력으로 HTTP 요청만 지원합니다. HTTP 요청이 공격자가 서버리스 애플리케이션을 악용할 가능성이 가장 높은 채널이기 때문입니다. HTTP 요청은 일반적으로 다음과 같은 AWS 서비스에서 전달됩니다.
- Application Load Balancer(ALB)
- API Gateway v1(Rest API)
- API Gateway v2(HTTP API)
- Function URL

<div class="alert alert-info">지원되지 않는 기능에 대한 지원이 추가되기를 원한다면 이 <a href="https://forms.gle/gHrxGQMEnAobukfn7">양식</a>을 작성하여 피드백을 보내주세요.</div>


## 시작하기 {#get-started}

{{< tabs >}}
{{% tab "Serverless Framework" %}}

[Datadog Serverless Framework plugin][1]을 사용하면 App and API Protection을 사용하도록 Lambda를 자동으로 구성하고 배포할 수 있습니다.

Datadog Serverless Framwork 플러그인을 설치하고 구성하려면 다음을 단계를 따르세요.

1. Datadog Serverless Framework 플러그인을 설치합니다.
   ```sh
   serverless plugin install --name serverless-plugin-datadog
   ```

2. `enableASM` 구성 파라미터를 사용하여 `serverless.yml`을 업데이트해 App and API Protection을 활성화합니다.
   ```yaml
   custom:
     datadog:
       appSecMode: on
   ```

   새 `serverless.yml` 파일에는 최소한 다음 항목이 포함되어야 합니다.
   ```yaml
   custom:
     datadog:
       apiKeySecretArn: "{Datadog_API_Key_Secret_ARN}" # or apiKey
       appSecMode: on
   ```
   Lambda 설정을 추가로 구성하려면 [플러그인 파라미터][2] 전체 목록도 참조하세요.

4. 함수를 다시 배포하고 호출합니다. 몇 분 후 [App and API Protection 보기][3]에 나타납니다.

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/plugin/#configuration-parameters
[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc
{{% /tab %}}
{{% tab "Datadog CLI" %}}

Datadog CLI는 새로 배포하지 않고도 계측을 활성화할 수 있도록 기존 Lambda 함수 구성을 수정합니다. Datadog의 Serverless Monitoring을 시작하는 가장 빠른 방법입니다.

**함수에 대한 초기 트레이싱을 구성하는 경우**, 다음 단계를 따르세요.

1. Datadog CLI 클라이언트를 설치합니다.

    ```sh
    npm install -g @datadog/datadog-ci
    ```

2. Datadog Serverless Monitoring을 처음 사용하는 경우 Datadog CLI를 대화형 모드로 실행하면 첫 설치 안내를 따라 빠르게 시작할 수 있으며, 나머지 단계는 건너뛸 수 있습니다. 프로덕션 애플리케이션에 Datadog을 영구적으로 설치하려면 이 단계를 건너뛰고 나머지 단계를 따라 일반 배포 후 CI/CD 파이프라인에서 Datadog CLI 명령을 실행합니다.

    ```sh
    datadog-ci lambda instrument -i --appsec
    ```

3. AWS 자격 증명을 구성합니다.

    Datadog CLI는 AWS Lambda 서비스에 대한 접근이 필요하며, [자격증명을 해결하기 위해][1] AWS JavaScript SDK에 의존합니다. AWS 자격증명이 AWS CLI를 호출할 때 사용하는 것과 동일한 방법으로 구성되어 있는지 확인하세요.

4. Datadog 사이트를 구성합니다.

    ```sh
    export DATADOG_SITE="<DATADOG_SITE>"
    ```

    Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (이 페이지 오른쪽에서 올바른 **Datadog 사이트**가 선택되어 있는지 확인하세요).

5. Datadog API 키를 구성합니다.

    Datadog에서는 보안을 위해 Datadog API 키를 AWS Secrets Manager에 저장할 것을 권장합니다. 키는 일반 텍스트 문자열로 저장되어야 합니다(JSON 블롭이 아님). Lambda 함수에 필요한 `secretsmanager:GetSecretValue` IAM 권한이 있는지 확인하세요.

    ```sh
    export DATADOG_API_KEY_SECRET_ARN="<DATADOG_API_KEY_SECRET_ARN>"
    ```

    For testing purposes, you can also set the Datadog API key in plaintext:

    ```sh
    export DATADOG_API_KEY="<DATADOG_API_KEY>"
    ```

6. Lambda 함수를 계측합니다.

    Lambda 함수를 계측하려면 다음의 명령어를 실행하세요.

    ```sh
    datadog-ci lambda instrument --appsec -f <functionname> -f <another_functionname> -r <aws_region> -e {{< latest-lambda-layer-version layer="extension" >}}
    

```

    To fill in the placeholders:
    - Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
    - Alternatively, you can use `--functions-regex` to automatically instrument multiple functions whose names match the given regular expression.
    - Replace `<aws_region>` with the AWS region name.

   **참고**: 먼저 개발 또는 스테이징 환경에서 Lambda 함수를 계측하세요. 계측 결과가 만족스럽지 않으면 동일한 인수로 `uninstrument`를 실행하여 변경 사항을 되돌립니다. CLI 실행이 완료되면 최신 `datadog-lambda-go` 모듈 릴리스를 사용하도록 소스 코드를 업데이트하여 App and API Protection을 활성화합니다.

    Additional parameters can be found in the [CLI documentation][2].

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog CDK Construct][1]는 자동으로 람다 레이어를 사용해 함수에서 Datadog를 설치합니다. 함수를 설정하여 Datadog Lambda Extension을 통해 Datadog에 메트릭, 트레이스 및 로그를 전송합니다.

1. Datadog CDK constructs 라이브러리를 설치합니다.

    ```sh
    npm install datadog-cdk-constructs-v2 --save-dev
    ```

2. Lambda 함수를 계측합니다.

    ```typescript
    import { Datadog, DatadogAppSecMode } from "datadog-cdk-constructs-v2";

    const datadog = new Datadog(this, "Datadog", {
        extension_layer_version: {{< latest-lambda-layer-version layer="extension" >}},
        site: "<DATADOG_SITE>",
        api_key_secret_arn: "<DATADOG_API_KEY_SECRET_ARN>", // or api_key
        enable_asm: true,
        datadog_app_sec_mode: DatadogAppSecMode.ON,
      });
    datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>]);
    ```

    To fill in the placeholders:
    - Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (오른쪽에서 올바른 SITE가 선택되어 있는지 확인하세요).
    - `<DATADOG_API_KEY_SECRET_ARN>`을 [Datadog API 키][2]가 안전하게 저장된 AWS 시크릿의 ARN으로 바꿉니다. 키는 일반 텍스트 문자열로 저장되어야 합니다(JSON 블롭이 아님). `secretsmanager:GetSecretValue` 권한이 필요합니다. 빠른 테스트를 위해 대신 `apiKey`를 사용하고 Datadog API 키를 일반 텍스트로 설정할 수 있습니다.

    More information and additional parameters can be found on the [Datadog CDK documentation][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "사용자 지정" %}}

1. 최신 Go 트레이서를 사용하도록 함수 코드를 업데이트합니다.
   ```sh
   go get -u github.com/DataDog/datadog-lambda-go
   ```

2. 다음 형식 중 하나의 ARN을 사용하여 Lambda 함수의 레이어를 구성하고 Datadog Lambda Extension을 설치합니다. `<AWS_REGION>`을 `us-east-1`과 같은 유효한 AWS 리전으로 바꿉니다.
   ```sh
   # x86-based Lambda in AWS commercial regions
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # AWS 상용 리전의 arm64 기반 Lambda
   arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   # AWS GovCloud 리전의 x86 기반 Lambda
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   # AWS GovCloud 리전의 arm64 기반 Lambda
   arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM:{{< latest-lambda-layer-version layer="extension" >}}
   ```

3. Enable App and API Protection by adding the following environment variables on your function deployment:
   ```yaml
   environment:
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```

4. 함수를 다시 배포하고 호출합니다. 몇 분 후 [App and API Protection 보기][1]에 나타납니다.
[1]: https://app.datadoghq.com/security/appsec?column=time&order=desc

{{% /tab %}}
{{< /tabs >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
[5]: https://docs.datadoghq.com/ko/serverless/libraries_integrations/plugin/#configuration-parameters
[6]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[7]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[8]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
[9]: https://github.com/DataDog/datadog-cdk-constructs
[10]: https://app.datadoghq.com/organization-settings/api-keys