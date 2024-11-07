---
title: Datadog 포워더(Forwarder)를 사용해 파이썬(Python) 서버리스 애플리케이션 계측
---
## 개요

<div class="alert alert-warning">
Datadog 서버리스 신규 사용자인 경우 대신 <a href="/serverless/installation/python">Datadog 람다 확장을 사용해 람다 함수를 계측하기 위한 지침을 따르세요.</a> 람다에서 즉시 사용할 수 있는 기능을 제공하기 전 Datadog 포워더를 사용해 Datadog 서버리스를 설정한 경우 이 가이드를 따라 인스턴스를 유지관리하세요.
</div>

## 전제 조건

[Datadog 포워더(Forwarder) 람다 함수][1]는 AWS 람다 트레이스, 향상된 메트릭, 커스텀 메트릭 및 로그를 수집하는 데 필요합니다.

## 설정

{{< tabs >}}
{{% tab "Datadog CLI" %}}

Datadog CLI는 기존 Lambda 함수의 설정을 변경하여, 새롭게 배포할 필요 없이 계측하도록 해줍니다. 가장 빠르게 시작하는 방법은 Datadog의 서버리스 모니터링을 이용하는 것입니다.

또한 CI/CD 파이프라인에 명령을 추가하여 모든 서버리스 응용프로그램에 대한 계측을 활성화할 수 있습니다. Datadog CLI 명령에 의해 변경된 내용이 재정의되지 않도록 일반 서버리스 응용 프로그램 배포 *후* 명령을 실행합니다.

### 설치

NPM 또는 Yarn과 함께 Datadog CLI를 설치합니다:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### 계측

기능을 계측하려면 [AWS 증명서][1]과 함께 다음 명령을 실행합니다.

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -v <layer_version> --forwarder <forwarder_arn>
```

플레이스홀더 채우기:
- `<functionname>`및 `<another_functionname>`를 람다 함수 이름으로 대체합니다.
- `<aws_region>`을 AWS 리전 이름으로 대체합니다.
- 원하는 버전의 Datadog 람다 라이브러리로 `<layer_version>`을 대체합니다. 최신 버전은 `{{< latest-lambda-layer-version layer="python" >}}`입니다.
- `<forwarder_arn>`을 포워더(Forwarder) ARN으로 대체합니다([포워더(Forwarder) 설명서][2] 참조).

예를 들면 다음과 같습니다.

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -v {{< latest-lambda-layer-version layer="python" >}} --forwarder "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
```

{{< site-region region="us,us3,us5,eu,gov" >}}
람다 함수가 코드 서명을 사용하도록 설정된 경우 Datadog CLI를 사용하여 계측하려면 먼저 Datadog의 서명 프로파일 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

{{< site-region region="ap1" >}}
람다 함수가 코드 서명에 사용되도록 설정한 경우 Datadog 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의  [코드 서명 설정][1]에 추가해야만 Datadog CLI을 사용해 계측할 수 있습니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

자세한 내용 및 추가 파라미터는 [CLI 설명서][4]에서 확인할 수 있습니다.

[1]: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html
[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
[4]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

[Datadog 서버리스 플러그인][1]은 자동으로 레이어를 사용해 Datadog 람다 라이브러리를 함수에 추가하고 함수를 설정하여 [Datadog 포워더][2]를 통해 Datadog에 메트릭, 트레이스와 로그를 전송합니다.

{{< site-region region="us,us3,us5,eu,gov" >}}
람다 기능/함수가 코드 서명을 사용하도록 구성된 경우 Datadog 서버리스 플러그인을 설치하기 전에 함수의 [코드 서명 설정][1]에 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

{{< site-region region="ap1" >}}
람다 기능/함수가 코드 서명을 사용하도록 구성된 경우 Datadog 서버리스 플러그인을 설치하기 전에 기능/함수의 [코드 서명 설정][1]에 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

Datadog Serverless Plugin을 설치하고 설정하려면 다음 절차를 따라주세요.

1. Datadog Serverless Plugin을 설치합니다.
      ```
    yarn add --dev serverless-plugin-datadog
    ```
2. `serverless.yml`에 다음을 추가합니다:
    ```
    plugins:
      - serverless-plugin-datadog
    ```
3. `serverless.yml`에서 다음 섹션도 추가합니다:
    ```
    custom:
      datadog:
        forwarderArn: # The Datadog Forwarder ARN goes here.
    ```
   Datadog Forwarder ARN 또는 설치에 대한 자세한 내용은 [여기][2]를 참조하세요. 자세한 설정은 [플러그인 설명서][1]을 참조하세요.

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog CloudFormation 매크로][1]는 레이어를 사용하여 Datadog 람다 라이브러리를 함수에 추가하기 위해 SAM 응용프로그램 템플릿을 자동으로 변환하고, [Datadog 포워더(Forwarder)][2]를 통해 메트릭, 트레이스 및 로그를 Datadog로 전송하도록 함수를 구성합니다.

### 설치

[AWS 자격 증명][3]을 사용해 다음 명령을 실행하여 CloudFormation 스택을 구축합니다. 해당 스택은 매크로 AWS 리소스를 설치합니다. 계정에서 주어진 지역에 대해 **1회만** 매크로를 설치하면 됩니다. `create-stack`을 `update-stack`으로 대체하여 최신 버전으로 매크로를 업데이트합니다.

```sh
aws cloudformation create-stack \
--stack-name datadog-serverless-macro \
--template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
--capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

매크로가 배포되어 사용할 준비가 되었습니다.

### 계측

함수를 계측하려면 `AWS::Serverless`가 SAM용으로 변환된 **이후** `Transform` 섹션의 `template.yml`에 다음을 추가합니다.

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      pythonLayerVersion: "{{< latest-lambda-layer-version layer="python" >}}"
      stackName: !Ref "AWS::StackName"
      forwarderArn: "<FORWARDER_ARN>"
      service: "<SERVICE>" # Optional
      env: "<ENV>" # Optional
```

플레이스홀더 채우기:
- `<FORWARDER_ARN>`를 포워더(Forwarder) ARN으로 대체합니다([포워더(Forwarder) 설명서][2] 참조).
- `<SERVICE>`와 `<ENV>`를 서비스와 환경값으로 대체합니다. 

{{< site-region region="us,us3,us5,eu,gov" >}}
람다 함수가 코드 서명을 사용하도록 구성된 경우 매크로를 사용려면 먼저 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc``)을 함수의 [코드 서명 설정][1]에 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

{{< site-region region="ap1" >}}
람다 기능/함수가 코드 서명을 사용하도록 설정된 경우 매크로를 사용하려면 먼저 Datadog의 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 기능/함수의 [코드 서명 설정][1]에 추가해야 합니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

자세한 정보와 추가 파라미터는 [매크로 설명서][1]에서 확인할 수 있습니다.

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
{{% /tab %}}
{{% tab "AWS CDK" %}}

Datadog CloudFormation 매크로][1]는 자동으로 AWS CDK에서 생성된 CloudFormation 템플릿을 변환하고 레이어를 사용해 Datadog 람바 라이브러리를 함수에 추가합니다. 그리고 함수를 설정하여 [Datadog 포워더][2]를 사용해 Datadog에 메트릭, 트레이스와 로그를 전송합니다.

### 설치

[AWS 자격 증명][3]을 사용해 다음 명령을 실행하여 CloudFormation 스택을 구축합니다. 해당 스택은 매크로 AWS 리소스를 설치합니다. 계정에서 주어진 지역에 대해 **1회만** 매크로를 설치하면 됩니다. `create-stack`을 `update-stack`으로 대체하여 최신 버전으로 매크로를 업데이트합니다.

```sh
aws cloudformation create-stack \
--stack-name datadog-serverless-macro \
--template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
--capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

매크로가 배포되어 사용할 준비가 되었습니다.

### 계측

함수를 계측하려면 `DatadogServerless` 변환과 `CfnMapping`를 AWS CDK 앱의 `Stack` 개체에 추가합니다. 파이썬에서 아래 샘플 코드를 참조하세요(다른 언어 사용 시에도 유사함).

```python
from aws_cdk import core

class CdkStack(core.Stack):
  def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
    super().__init__(scope, id, **kwargs)
    self.add_transform("DatadogServerless")

    mapping = core.CfnMapping(self, "Datadog",
      mapping={
        "Parameters": {
          "pythonLayerVersion": "{{< latest-lambda-layer-version layer="python" >}}",
          "forwarderArn": "<FORWARDER_ARN>",
          "stackName": self.stackName,
          "service": "<SERVICE>",  # Optional
          "env": "<ENV>",  # Optional
        }
      })
```

플레이스홀더 채우기:
- `<FORWARDER_ARN>`를 포워더(Forwarder) ARN으로 대체합니다([포워더(Forwarder) 설명서][2] 참조).
- `<SERVICE>`와 `<ENV>`를 서비스와 환경값으로 대체합니다. 

람바 함수가 코드 서명을 사용하도록 설정된 경우 Datadog 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][4]에 추가한 다음 매크로를 사용해야 합니다.

자세한 정보와 추가 파라미터는 [매크로 설명서][1]에서 확인할 수 있습니다.

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/macro
[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
[4]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{% /tab %}}
{{% tab "Zappa" %}}

### 설정 업데이트

{{< site-region region="us,us3,us5,eu,gov" >}}
1. `zappa_settings.json`에 다음 설정을 추가하세요.
    ```json
    {
        "dev": {
            "layers": ["arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>"],
            "lambda_handler": "datadog_lambda.handler.handler",
            "aws_environment_variables": {
                "DD_LAMBDA_HANDLER": "handler.lambda_handler",
                "DD_TRACE_ENABLED": "true",
                "DD_FLUSH_TO_LOG": "true",
            },
        }
    }
    ```
1. 레이어 ARN에서 자리표시자 `<AWS_REGION>`, `<RUNTIME>`, `<VERSION>`을 적합한 값으로 대체하세요. 사용 가능한 `RUNTIME` 옵션은 {{< latest-lambda-layer-version layer="python-example-version" >}}입니다. 최신 `VERSION`은 `{{< latest-lambda-layer-version layer="python-versions" >}}`입니다. 예시: 
    ```
    # For regular regions
    arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}

    # For us-gov regions
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}
    ```
1. 람바 함수가 코드 서명을 사용하도록 설정된 경우 Datadog 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가하세요.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

{{< site-region region="ap1" >}}
1. `zappa_settings.json`에 다음 설정을 추가하세요.
    ```json
    {
        "dev": {
            "layers": ["arn:aws:lambda:<AWS_REGION>:417141415827:layer:Datadog-<RUNTIME>:<VERSION>"],
            "lambda_handler": "datadog_lambda.handler.handler",
            "aws_environment_variables": {
                "DD_LAMBDA_HANDLER": "handler.lambda_handler",
                "DD_TRACE_ENABLED": "true",
                "DD_FLUSH_TO_LOG": "true",
            },
        }
    }
    ```
1. 레이어 ARN에서 자리표시자 `<AWS_REGION>`, `<RUNTIME>`, `<VERSION>`을 적합한 값으로 대체하세요. 사용 가능한 `RUNTIME` 옵션은 {{< latest-lambda-layer-version layer="python-versions" >}}입니다. 최신 `VERSION`은 `{{< latest-lambda-layer-version layer="python" >}}`입니다. 예시: 
    ```
    # For regular regions
    arn:aws:lambda:us-east-1:417141415827:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}

    # For us-gov regions
    arn:aws-us-gov:lambda:us-gov-east-1:002406178527:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}
    ```
1. 람바 함수가 코드 서명을 사용하도록 설정된 경우 Datadog 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가하세요.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

### 구독

Datadog 포워더 람바 함수를 각 함수의 로그 그룹에 보내 Datadog에 메트릭, 트레이스와 로그를 전송합니다.

1. 설치하지 않은 경우 [Datadog 포워더를 설치][2]합니다.
2. [함수의 로그 그룹에 Datadog 포워더를 보냅니다][3].

[2]: https://docs.datadoghq.com/ko/serverless/forwarder/
[3]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Chalice" %}}

### 프로젝트 업데이트

1. `config.json`에서 환경 변수 `DD_TRACE_ENABLED` 및 `DD_FLUSH_TO_LOG`를 `"true"`로 설정하세요.
    ```json
    {
      "version": "2.0",
      "app_name": "hello-chalice",
      "stages": {
        "dev": {
          "api_gateway_stage": "api",
          "environment_variables": {
            "DD_TRACE_ENABLED": "true",
            "DD_FLUSH_TO_LOG": "true"
          }
        }
      }
    }
    ```
1. `datadog_lambda`를 `requirements.txt`에 추가합니다.
1. `app.py`에서 [미들웨어][1]로 `datadog_lambda_wrapper`를 등록합니다.
    ```python
    from chalice import Chalice, ConvertToMiddleware
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    app = Chalice(app_name='hello-chalice')

    app.register_middleware(ConvertToMiddleware(datadog_lambda_wrapper))

    @app.route('/')
    def index():
        return {'hello': 'world'}
    ```

{{< site-region region="us,us3,us5,eu,gov" >}}
1. 람바 함수가 코드 서명을 사용하도록 설정된 경우 Datadog 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가하세요.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

{{< site-region region="ap1" >}}
1. 람바 함수가 코드 서명을 사용하도록 설정된 경우 Datadog 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가하세요.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

### 구독

Datadog 포워더 람다 함수를 각 함수의 로그 그룹에 보내 Datadog에 메트릭, 트레이스와 로그를 전송합니다.

1. 설치하지 않은 경우 [Datadog 포워더를 설치][2]합니다.
2. [함수 로그 그룹에서 Datadog Forwarder를 구독하세요][4].

[1]: https://aws.github.io/chalice/topics/middleware.html?highlight=handler#registering-middleware
[3]: https://docs.datadoghq.com/ko/serverless/forwarder/
[4]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "Container Image" %}}

### 설치

람다 함수를 컨테이너 이미지로 구축하는 경우 레이어로 Datadog 람다 라이브러리를 사용할 수 없습니다. 이미지 내 함수의 종속 항목으로 Datadog 람다 라이브러리를 설치해야 합니다.


```sh
pip install datadog-lambda
```

`datadog-lambda` 패키지의 부 버전은 항상 레이어 버전과 일치해야 하니 참고하세요. 예를 들어 `datadog-lambda v0.5.0`는 레이어 버전 5 콘텐츠와 일치해야 합니다.

### 설정하다

기능/함수를 설정하기 위해 다음 단계를 따르세요:

1. 이미지의 `CMD` 값을 `datadog_lambda.handler.handler`로 설정하세요. AWS에서 설정하거나 Dockerfile에서 직접 설정할 수 있습니다. 양쪽에서 설정한 경우 AWS에서 설정한 값이 Dockerfile 값을 덮어쓰니 참고하세요. 
2. AWS에서 다음 환경 변수를 설정하세요:
  - `myfunc.handler`와 같이 `DD_LAMBDA_HANDLER`를 원래 핸들러로 설정합니다.
  - `DD_TRACE_ENABLED`를 `true`로 설정합니다.
  - `DD_FLUSH_TO_LOG`를 `true`로 설정합니다.
3. 필요에 따라 적절한 값을 사용하여 기능/함수에 `service`와 `env`태그를 추가합니다.

### 구독

Datadog 포워더(Forwarder) 람다 함수를 각 함수의 로그 그룹에 등록하여 메트릭, 트레이스 및 로그를 Datadog로 전송합니다.

1. [Datadog 포워더(Forwarder)를 설치하지 않았을 경우 설치][1].
2. [Datadog 포워더(Forwarder)를 기능/함수의 로그 그룹에 등록합니다][2].


[1]: https://docs.datadoghq.com/ko/serverless/forwarder/
[2]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{% tab "커스텀" %}}

### 설치

Datadog 람다 라이브러리를 레이어로 설치하거나(권장) 파이썬 패키지로 설치할 수 있습니다.

`datadog-lambda` 패키지의 부 버전은 항상 레이어 버전과 일치해야 하니 참고하세요. 예를 들어 datadog-lambda v0.5.0는 레이어 버전 5 콘텐츠와 일치해야 합니다.

#### 레이어 사용

다음 형식에 맞추어 ARN을 사용해 Lambda 함수의 [레이어를 설정합니다][1].

```
# For us,us3,us5 and eu regions
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-<RUNTIME>:<VERSION>

# For us-gov regions
arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-<RUNTIME>:<VERSION>

# For us-gov regions
arn:aws-us-gov:lambda:<AWS_REGION>:417141415827:layer:Datadog-<RUNTIME>:<VERSION>
```

사용 가능한 `RUNTIME` 옵션은 {{< latest-lambda-layer-version layer="python-versions" >}}입니다. 최신 `VERSION`은 `{{< latest-lambda-layer-version layer="python" >}}`입니다. 예시:

```
arn:aws:lambda:us-east-1:464622532012:layer:Datadog-{{< latest-lambda-layer-version layer="python-example-version" >}}:{{< latest-lambda-layer-version layer="python" >}}
```

{{< site-region region="us,us3,us5,eu,gov" >}}
람다 함수가 코드 서명을 사용하도록 설정된 경우 Datadog 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가한 다음 레이어로 Datadog 람다 라이브러리를 추가할 수 있습니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

{{< site-region region="ap1" >}}
람다 함수가 코드 서명을 사용하도록 설정된 경우 Datadog 서명 프로필 ARN(`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`)을 함수의 [코드 서명 설정][1]에 추가한 다음 레이어로 Datadog 람다 라이브러리를 추가할 수 있습니다.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-update
{{< /site-region >}}

#### 패키지 사용하기

`datadog-lambda`와 종속 항목을 로컬에서 함수 프로젝트 폴더에 설치합니다. **참고**: `datadog-lambda`는 `ddtrace`에 따라 다릅니다. 해당 항목은 네이티브 확장을 사용하므로 리눅스(Linux)  환경에서 설치하고 컴파일해야 합니다. 예를 들어 서버리스 프레임워크에 [dockerizePip][3], AWS SAM에 [--use-container][4]를 사용할 수 있습니다. 자세한 정보는 [함수 구축 패키지에 종속 항목을 추가하는 방법][5]를 참조하세요.

```
pip install datadog-lambda -t ./
```

[최신 릴리스][6]를 참조하세요.

### 설정하다

기능/함수를 설정하기 위해 다음 단계를 따르세요:

1. 함수 핸들러를 `datadog_lambda.handler.handler`로 설정하세요.
2. 환경 변수`DD_LAMBDA_HANDLER`를 `myfunc.handler`와 같이 기존 핸들러로 설정합니다.
3. 환경 변수 `DD_TRACE_ENABLED`를 `true`로 설정합니다.
4. 환경 변수 `DD_FLUSH_TO_LOG`를 `true`로 설정합니다.
5. 필요에 따라 적절한 값을 가진 `service`및 `env`태그를 기능/함수에 추가합니다.

### 구독

Datadog 포워더 람바 함수를 각 함수의 로그 그룹에 보내 Datadog에 메트릭, 트레이스와 로그를 전송합니다.

1. 설치하지 않은 경우 [Datadog 포워더를 설치][7]하세요. 
2. [함수의 로그 그룹에 Datadog 포워더를 보내세요][8].


[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[3]: https://github.com/UnitedIncome/serverless-python-requirements#cross-compiling
[4]: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-build.html
[5]: https://docs.aws.amazon.com/lambda/latest/dg/python-package.html#python-package-dependencies
[6]: https://pypi.org/project/datadog-lambda/
[7]: https://docs.datadoghq.com/ko/serverless/forwarder/
[8]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
{{% /tab %}}
{{< /tabs >}}

### 태그

부수적인 옵션이긴 하나 Datadog는 [통합 서비스 태깅 설명서][2]에 따라 `env`,`service` 및 `version`태그를 사용하여 서버리스 애플리케이션에 태그를 지정할 것을 권장합니다.

## 탐색

위의 단계에 따라 기능/함수을 설정한 후 [서버리스 홈페이지][3]에서 메트릭, 로그 및 트레이스를 확인합니다.

## 커스텀 비즈니스 로직 모니터링

커스텀 메트릭 또는 스팬(span)을 제출하려면 아래 샘플 코드를 참조하세요:

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
        timestamp=int(time.time()), # optional, must be within last 20 mins
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

커스텀 메트릭 제출에 대한 자세한 정보는 [여기][4]를 참조하세요. 커스텀 계측에 대한 추가 정보는 [커스텀 계측][5]에 대한 Datadog APM 설명서를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/serverless/forwarder
[2]: /ko/getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[3]: https://app.datadoghq.com/functions
[4]: /ko/serverless/custom_metrics?tab=python
[5]: /ko/tracing/custom_instrumentation/python/