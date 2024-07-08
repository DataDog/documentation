---
aliases:
- /ko/serverless/serverless_integrations/macro/
dependencies:
- https://github.com/DataDog/datadog-cloudformation-macro/blob/master/serverless/README.md
title: Datadog 서버리스 매크로
---
![빌드_서버리스](https://github.com/DataDog/datadog-cloudformation-macro/workflows/build_serverless/badge.svg)
[![슬랙](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)

Datadog는 AWS SAM을 사용하여 서버리스 애플리케이션을 배포하는 고객에게 서버리스 CloudFormation 매크로를 권장합니다.

매크로는 다음과 같은 방법으로 서버리스 애플리케이션에서 메트릭, 트레이스 및 로그 수집을 자동으로 설정합니다:

- [파이썬(Python)][1] 및 [Node.js][2] 람다 함수를 위한 Datadog 람다 라이브러리 및 람다 확장 설치 및 설정합니다.
- 람다 함수에서 향상된 람다 메트릭 및 커스텀 메트릭 수집을 활성화합니다.
- 원하는 경우 Datadog 포워더(Forwarder)에서 람다 함수 로그 그룹으로의 구독을 관리합니다.

## 설치

Datadog 서버리스 매크로를 AWS 계정에서 사용하려면 Datadog에서 제공하는 템플릿을 사용하여 CloudFormation 스택을 배포합니다. 이 배포에는 CloudFormation 매크로 리소스 및 매크로가 실행될 때 호출되는 람다 함수가 포함됩니다. 이 스택을 배포하면 동일한 계정에 배포된 다른 CloudFormation 스택에서 매크로를 사용할 수 있습니다. 계정에서 매크로를 정의하는 방법에 대한 자세한 내용은 [CloudFormation 설명서 페이지][3]를 참조하세요.


**참고:** Datadog 서버리스 매크로는 변환할 스택이 포함된 각 영역에 한 번씩 생성해야 합니다.

### 옵션 1: AWS Console

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/quickCreate?stackName=datadog-serverless-macro&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml)

위의 `Launch Stack` 템플릿 링크를 사용하여 AWS 계정에서 Datadog 서버리스 매크로 스택을 만듭니다.


### 옵션 2: AWS CLI

처음 설치하는 경우 다음과 함께 배포합니다:

```bash
aws cloudformation create-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

## AWS SAM과 함께 사용

SAM을 사용하여 서버리스 애플리케이션을 배포하려면 필요한 SAM 변환 후 `template.yml` 파일의 `Transform`섹션 아래에 Datadog 서버리스 CloudFormation 매크로를 추가합니다. 또한 Datadog 소스 코드 통합을 활성화하려면 `DDGitData` 파라미터를 추가하고 매크로에 전달합니다:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      stackName: !Ref "AWS::StackName"
      apiKey: "<DATADOG_API_KEY>"
      pythonLayerVersion: "<LAYER_VERSION>" # Use nodeLayerVersion for Node.js
      extensionLayerVersion: "<LAYER_VERSION>"
      service: "<SERVICE>" # Optional
      env: "<ENV>" # Optional
      version: "<VERSION>" # Optional
      tags: "<TAGS>" # Optional
      # Pass DDGitData here to enable Source Code Integration tagging
      gitData: !Ref DDGitData
      # For additional parameters, see the Configuration section

Parameters:
  DDGitData:
    Type: String
    Default: ""
    Description: "The output of $(git rev-parse HEAD),$(git config --get remote.origin.url). Used for Datadog Source Code Integration tagging"
```

Datadog의 소스 코드 통합에 대한 `DDGitData` 파라미터를 설정하려면  SAM의 `--parameter-overrides`  옵션을 사용합니다:
```bash
sam deploy --parameter-overrides  DDGitData="$(git rev-parse HEAD),$(git config --get remote.origin.url)"
```

참고: 매크로를 설치할 때 제공된 `template.yml` 파일을 수정하지 않은 경우 계정에 정의된 매크로의 이름은 `DatadogServerless`입니다. 원본 템플릿을 수정한 경우 여기에 추가하는 변환의 이름이 `AWS::CloudFormation::Macro` 리소스의 `Name` 속성과 일치하는지 확인합니다.

참고: 일부 설정을 한 번만 지정하려는 경우 `template.yml`를 수정하고 해당 영역에 설정할 환경 변수를 추가할 수 있습니다. 이것은 추가 기본값을 제어하는 방법입니다. 아래 예시에서는 `DD_API_KEY_SECRET_ARN` 및 `DD_ENV`를 설정하고, 이를 매크로가 기본값으로 처리합니다:

```yaml
Resources:
  MacroFunction:
    Type: AWS::Serverless::Function
    DependsOn: MacroFunctionZip
    Properties:
      FunctionName:
        Fn::If:
          - SetFunctionName
          - Ref: FunctionName
          - Ref: AWS::NoValue
      Description: Processes a CloudFormation template to install Datadog Lambda layers for Python and Node.js Lambda functions.
      Handler: src/index.handler
      ...
      Environment:
        Variables:
          DD_API_KEY_SECRET_ARN: "arn:aws:secretsmanager:us-west-2:123456789012:secret:DdApiKeySecret-e1v5Yn7TvIPc-d1Qc4E"
          DD_ENV: "dev"
```

## 업데이트
새 릴리스 후 매크로를 업데이트하는 경우 다음 `update-stack` 방법을 사용합니다:

```bash
aws cloudformation update-stack \
  --stack-name datadog-serverless-macro \
  --template-url https://datadog-cloudformation-template.s3.amazonaws.com/aws/serverless-macro/latest.yml \
  --capabilities CAPABILITY_AUTO_EXPAND CAPABILITY_IAM
```

또한 `0.1.2.yml`와 같이 릴리스 버전을 `latest.yml`로 대체함으로써 최신 [릴리스](https://github.com/DataDog/datadog-cloudformation-macro/releases)에서 매크로 버전을 지정할 수도 있습니다.

## 설정

플러그인을 추가로 설정하려면 다음 커스텀 파라미터를 사용합니다:

| 매개 변수               | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `addLayers`             | 람다 레이어를 추가할지 또는 사용자가 자신의 레이어를 가져올 것으로 예상할지 여부입니다. 기본값은 true입니다. true인 경우 람다 라이브러리 버전 변수도 필요합니다. false인 경우 기능/함수의 배포 패키지에 Datadog 람다 라이브러리를 포함해야 합니다.                                                                                                                                                                                                                                        |
| `pythonLayerVersion`    | 설치할 파이썬(Python) 람다 레이어의 버전입니다 (예: 21). 파이썬(Python)으로 작성된 하나 이상의 람다 함수를 배포하는 경우 필수이며, `addLayers`는 true입니다. [https://github.com/DataDog/datadog-lambda-python/releases][5]에서 최신 버전 번호를 확인하세요.                                                                                                                                                                                                                              |
| `nodeLayerVersion`      | 설치할 Node.js 람다 레이어의 버전입니다 (예: 29). Node.js로 작성된 하나 이상의 람다 함수를 배포할 경우 필수이며, `addLayers`가 true입니다. [https://github.com/DataDog/datadog-lambda-js/releases][6]에서 최신 버전 번호를 확인하세요.                                                                                                                                                                                                                                |
| `extensionLayerVersion` | 설치할 Datadog 람다 확장 레이어의 버전입니다. (예: 5)  `extensionLayerVersion`가 설정된 경우, `apiKey`(또는 암호화된 경우 `apiKMSKey` 또는 `apiKeySecretArn`)도 설정해야 합니다. `extensionLayerVersion`를 사용하는 동안 `forwarderArn`을 설정하지 마세요. 람다 확장에 대한 자세한 정보는 [여기][8]에서 확인하세요.                                                                                                                                                                                      |
| `forwarderArn`          | 설정하면 플러그인이 함수의 로그 그룹을 Datadog 포워더(Forwarder)에 자동으로 등록합니다. 또는 [AWS::Logs::SubscriptionFilter][7] 리소스를 사용하여 로그 구독을 정의할 수 있습니다. **참고**: 매크로가 로그 그룹 및 구독 필터를 생성하려면 함수 이름이 필요하므로 처음 배포되는 함수에 대해 'FunctionName' 속성을 정의해야 합니다. 'FunctionName'에는 `!Sub`과 같은 CloudFormation 함수를 포함할 수 없습니다. |
| `stackName`             | 배포 중인 CloudFormation 스택의 이름입니다. `forwarderArn`가 제공되고 람다 함수의 이름이 동적으로 지정된 경우에만 필요합니다 (람다에 대한 `FunctionName` 속성이 제공되지 않은 경우). SAM 및 CDK에 이 파라미터를 추가하는 방법은 아래 예시를 참조하세요.                                                                                                                                                                                          |
| `flushMetricsToLogs`    | Datadog 포워더 람다 함수가 있는 로그를 통해 커스텀 메트릭을 전송합니다 (권장 사항). 기본값은 `true`입니다. `false`로 설정하면 `apiKey`(암호화된 경우에는 `apiKMSKey` 또는 `apiKeySecretArn`)를 사용하여 Datadog API 키를 정의해야 합니다.                                                                                                                                                                                                                                                             |
| `site`                  | 데이터를 보낼 Datadog 사이트를 설정합니다. flushMetricsToLogs가 `false`인 경우에만 필요합니다. 가능한 값은 `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com` 및 `ddog-gov.com`입니다. 기본값은 `datadoghq.com`입니다.                                                                                                                                                                                                                                                             |
| `apiKey`                | `flushMetricsToLogs`이 `false`로 설정된 경우에만 Datadog API 키가 필요합니다.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `apiKeySecretArn`       | AWS 비밀 관리자에서 Datadog API 키를 저장하는 암호의 ARN입니다. `flushMetricsToLogs`가 `false`일 경우 또는 `extensionLayer`가 설정된 경우 `apiKey` 대신 이 파라미터를 사용합니다. 람다 실행 역할에는`secretsmanager:GetSecretValue` 권한을 추가해야합니다.                                                                                                                                                                                                              |
| `apiKMSKey`             | KMS를 사용하여 암호화된 Datadog API 키입니다. `flushMetricsToLogs`가 false이면서 KMS 암호화를 사용하고 있는 경우 `apiKey` 대신 이 파라미터를 사용합니다.                                                                                                                                                                                                                                                                                                                                                  |
| `enableEnhancedMetrics` | 람다 함수에 대해 향상된 메트릭을 활성화합니다. 기본값은 `true`입니다. Datadog 포워더 람다 함수는 함수 로그 그룹을 구독해야 합니다.                                                                                                                                                                                                                                                                                                                                                      |
| `enableXrayTracing`     | 람다 함수에 대한 추적을 활성화합니다. 기본값은 false입니다.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `enableDDTracing`       | Datadog의 애플리케이션 성능 모니터링(APM) 라이브러리인 dd-trace를 사용하여 람다 함수에 대한 추적을 활성화합니다. 기본값은 `true`입니다. Datadog 포워더 람다 함수는 함수 로그 그룹을 구독해야 합니다.                                                                                                                                                                                                                                                                                                                           |
| `enableDDLogs`          | 람다 함수에 대해 Datadog 로그 수집을 활성화합니다. 참고: 이 설정은 Datadog 포워더를 통해 전송되는 로그에는 적용되지 않습니다. 기본값은 true입니다.                                                                                                                                                                                                                                                                                                                                                   |
| `service`               | `extensionLayerVersion`와 함께 설정하면 매크로가 제공된 값으로 모든 람다 함수에 `DD_SERVICE` 환경 변수를 추가합니다. `forwarderArn`와 함께 설정하면 매크로가 제공된 값으로 모든 람다 함수에 `service` 태그를 추가합니다.                                                                                                                                                                                                                |
| `env`                   | `extensionLayerVersion`와 함께 설정하면 매크로가 제공된 값으로 모든 람다 함수에 `DD_ENV` 환경 변수를 추가합니다. `forwarderArn`와 함께 설정하면 매크로가 제공된 값으로 모든 람다 함수에 `env` 태그를 추가합니다.                                                                                                                                                                                                                        |
| `version`               | `extensionLayerVersion`와 함께 설정하면 매크로가 제공된 값으로 모든 람다 함수에 `DD_VERSION` 환경 변수를 추가합니다. `forwarderArn`와 함께 설정하면 매크로가 제공된 값으로 모든 람다 함수에 `version` 태그를 추가합니다.                                                                                                                                                                                                             |
| `tags`                  | 키:값 쌍을 단일 문자열로써 쉼표로 구분한 목록입니다. `extensionLayerVersion`와 함께 설정하면 `DD_TAGS` 환경 변수가 제공된 값으로 모든 람다 함수에 추가됩니다. `forwarderArn`와 함께 설정하면 매크로가 문자열을 구문 분석하고 모든 람다 함수에 대해 각 키:값 쌍을 태그로 설정합니다. |
| `logLevel`              | 로그 레벨을 설정합니다. 확장 로깅의 경우 `DEBUG`로 설정합니다. |
| `captureLambdaPayload`  | 요청 및 응답 페이로드가 있는 함수 실행 범위에 자동으로 태그를 지정하여 APM 애플리케이션에 표시할 수 있습니다.                                                                                                                                                                                                                                                                                                                                                                 |
| `enableColdStartTracing`      | 콜드 스타트 추적을 비활성화하려면 `false`로 설정합니다. NodeJS 및 파이썬(Python)에서 사용됩니다. 기본값은 `true`입니다. |
| `coldStartTraceMinDuration`   | 콜드 스타트 추적을 통해 추적할 모듈 로드 이벤트의 최소 지속 시간(밀리초)을 설정합니다. 번호. 기본값은`3` 입니다. |
| `coldStartTraceSkipLibs`      | (선택 사항) 쉼표로 구분된 라이브러리 목록에 대한 콜드 스타트 스팬 생성을 건너뛸 수 있습니다. 깊이를 제한하거나 알려진 라이브러리를 건너뛸 때 유용합니다. 기본값은 런타임에 따라 다릅니다. |
| `enableProfiling`             | `true`와 함께 Datadog 계속적인 프로파일러를 사용하도록 설정합니다. NodeJS 및 파이썬(Python)용 베타에서 지원됩니다. 기본값은 `false`입니다. |
| `encodeAuthorizerContext`     | 람다 승인자에 대해 `true`로 설정하면 추적 컨텍스트가 전파를 위해 응답으로 인코딩됩니다. NodeJS 및 파이썬(Python)에서 지원됩니다. 기본값은 `true`입니다. |
| `decodeAuthorizerContext`     | 람다 인증자를 통해 인증된 람다에 대해 `true`로 설정하면 인코딩된 추적 컨텍스트를 구문 분석하고 사용합니다(찾은 경우). NodeJS 및 파이썬(Python)에서 지원됩니다. 기본값은 `true`입니다.                         |
| `apmFlushDeadline` | 밀리초에서 시간 초과하기 전에 기간을 제출할 시기를 결정하는 데 사용됩니다. AWS 람다 호출의 남은 시간이 설정된 값보다 작으면 추적기는 현재 활성 스팬(span)과 완료된 모든 스팬(span)을 제출하려고 시도합니다. NodeJS 및 파이썬(Python)에서 지원됩니다. 기본값은 `100`밀리초입니다. |

## 작동 방식

이 매크로는 함수에 [Node.js][2] 및 [파이썬(Python)][1]의 람다 레이어를 연결하여 Datadog 람다 라이브러리를 설치하도록 CloudFormation 템플릿을 수정합니다. 필수 코드 변경 없이 람다 라이브러리를 초기화하는 교체 핸들러로 리디렉션됩니다.

## 문제 해결

### 디버그 로그

문제를 디버깅하는 데 도움이 되도록 매크로 람다 함수에 대한 CloudWatch 로그를 살펴볼 수 있습니다. CloudWatch 로그를 찾으려면 다음과 같이 하세요:

- 매크로 CloudFormation 스택을 찾습니다 (지침에 따라 명령을 복사한 경우 `datadog-serverless-macro` 이름 지정).
- 리소스 탭을 클릭하면 CloudWatch 로그 그룹을 Logical ID `MacroFunctionLogGroup`와 함께 사용할 수 있습니다

### 오류 메시지: 'FunctionName' property is undefined for...

이 오류는 `forwarderArn`를 제공하고 람다 함수를 처음 배포할 때 발생하므로 로그 그룹이 존재하지 않으며 매크로가 이 로그 그룹을 만들거나 포워더를 구독할 수 없습니다. 이 문제를 해결하기 위해 람다에 `FunctionName` 속성을 명시적으로 정의하세요 (아래 예시 참조).

```yml
Resources:
  MyLambda:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs12.x
      FunctionName: MyFunctionName # Add this property to your Lambdas
```

`FunctionName`를 명시적으로 정의할 수 없거나 (원하지 않는 경우) SAM 템플릿 또는 CDK 소스 코드에서 `forwarderArn` 파라미터를 제거한 후 아래와 같이 [AWS::Logs::SubscriptionFilter][7] 리소스를 사용하여 구독 필터를 정의합니다.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

### 오류 메시지: 'logGroupNamePrefix' failed to satisfy constraint...

`!Sub`와 같이 `FunctionName`가 CloudFormation 함수를 포함한 경우에는 `forwarderArn` 옵션이 작동하지 않습니다. 이 경우 매크로는 실제 함수 이름에 액세스할 수 없습니다 (CloudFormation은 변환 후 함수를 실행합니다). 따라서 함수에 대한 로그 그룹 및 구독 필터를 생성할 수 없습니다.

SAM 템플릿 또는 CDK 소스 코드에서 `forwarderArn` 파라미터를 제거하고 아래와 같이 [AWS::Logs::SubscriptionFilter][7] 리소스를 사용하여 구독 필터를 정의합니다.

```yaml
Resources:
  MyLogSubscriptionFilter:
    Type: "AWS::Logs::SubscriptionFilter"
    Properties:
      DestinationArn: "<DATADOG_FORWARDER_ARN>"
      LogGroupName: "<CLOUDWATCH_LOG_GROUP_NAME>"
      FilterPattern: ""
```

### 오류 메시지: 'Failed to execute transform DatadogServerless'

이 오류는 명령을 실행하는 IAM 사용자에게 `lambda:InvokeFunction` 권한이 없는 경우 발생할 수 있습니다. 사용자의 IAM 역할에 권한을 추가합니다.

## 커뮤니티

제품 피드백 및 질문이 있는 경우 [슬랙의 Datadog 커뮤니티](https://chat.datadoghq.com/)의 `#serverless` 채널에 가입하세요.

[1]: https://github.com/DataDog/datadog-lambda-layer-python
[2]: https://github.com/DataDog/datadog-lambda-layer-js
[3]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html
[4]: https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Stack.html
[5]: https://github.com/DataDog/datadog-lambda-python/releases
[6]: https://github.com/DataDog/datadog-lambda-js/releases
[7]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-logs-subscriptionfilter.html
[8]: https://docs.datadoghq.com/ko/serverless/datadog_lambda_library/extension/