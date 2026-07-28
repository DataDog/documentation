---
aliases:
- /ko/serverless/distributed_tracing/collect_lambda_payloads
- /ko/serverless/libraries_integrations/lambda_code_signing
- /ko/serverless/guide/forwarder_extension_migration/
- /ko/serverless/guide/extension_private_link/
- /ko/serverless/configuration
further_reading:
- link: /serverless/installation/
  tag: 설명서
  text: AWS Lambda용 Serverless Monitoring 설치
- link: /serverless/troubleshooting/
  tag: 설명서
  text: AWS Lambda용 Serverless Monitoring 문제 해결
- link: /integrations/github
  tag: 설명서
  text: Datadog GitHub 통합
- link: https://learn.datadoghq.com/courses/visibility-aws-lambda
  tag: 학습 센터
  text: Datadog으로 AWS Lambda를 Serverless Monitoring에 맞춰 구성
title: AWS Lambda용 Serverless Monitoring 구성
---
먼저, 메트릭, 트레이스 및 로그 수집을 시작하기 위해 Datadog Serverless Monitoring을 [설치][1]합니다. 설치를 완료하고 나면, 다음 주제를 참조하여 각자의 모니터링 요구 사항에 적합하게 설치를 구성합니다.

- [태그를 사용하여 텔레메트리 연결](#connect-telemetry-using-tags)
- [요청 및 응답 페이로드 수집](#collect-the-request-and-response-payloads)
- [Lambda 외의 리소스에서 트레이스 수집](#collect-traces-from-non-lambda-resources)
- [Datadog SDK 구성](#configure-the-datadog-sdk)
- [APM 스팬 수집을 위한 샘플링 레이트 선택](#select-sampling-rates-for-ingesting-apm-spans)
- [트레이스에서 민감한 정보 필터링 또는 스크러빙](#filter-or-scrub-sensitive-information-from-traces)
- [트레이스 수집 활성화/비활성화](#enabledisable-trace-collection)
- [로그 및 트레이스 연결](#connect-logs-and-traces)
- [오류를 소스 코드와 연결](#link-errors-to-your-source-code)
- [사용자 지정 메트릭 제출][27]
- [프로파일링 데이터 수집](#collect-profiling-data)
- [텔레메트리를 PrivateLink 또는 프록시를 통해 전송](#send-telemetry-over-privatelink-or-proxy)
- [여러 Datadog 조직에 텔레메트리 전송](#send-telemetry-to-multiple-datadog-organizations)
- [FIPS 규정 준수 활성화](#enable-fips-compliance)
- [AWS 리소스에 트레이스 컨텍스트 전파](#propagate-trace-context-over-aws-resources)
- [X-Ray 및 Datadog 트레이스 병합](#merge-x-ray-and-datadog-traces)
- [AWS Lambda 코드 서명 활성화](#enable-aws-lambda-code-signing)
- [Datadog Lambda Extension으로 마이그레이션](#migrate-to-the-datadog-lambda-extension)
- [Datadog Lambda Extension을 사용하여 x86에서 arm64로 마이그레이션](#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension)
- [Datadog Lambda Extension을 로컬 테스트용으로 구성](#configure-the-datadog-lambda-extension-for-local-testing)
- [OpenTelemetry API를 사용하여 AWS Lambda 계측](#instrument-aws-lambda-with-the-opentelemetry-api)
- [Datadog Lambda Extension v67+ 사용](#using-datadog-lambda-extension-v67)
- [DynamoDB PutItem에 대한 자동 연결 구성](#configure-auto-linking-for-dynamodb-putitem)
- [AWS 서비스를 적절하게 시각화 및 모델링](#visualize-and-model-aws-services-by-resource-name)
- [로그를 Observability Pipelines로 전송](#send-logs-to-observability-pipelines)
- [API 키 시크릿을 정기적으로 다시 로드](#reload-api-key-secret-periodically)
- [문제 해결](#troubleshoot)
- [추가 자료](#further-reading)


## 위협 탐지를 활성화하여 공격 시도 관찰 {#enable-threat-detection-to-observe-attack-attempts}

서버리스 애플리케이션을 노리는 공격자에 대한 경보를 받고 신속하게 대응하세요.

시작하려면, 먼저 함수에 [트레이싱이 활성화][43]되어 있어야 합니다.

위협 모니터링을 활성화하려면 배포에 다음 환경 변수 추가:
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```

함수를 다시 배포하고 호출합니다. 몇 분 뒤, 해당 함수가 [AAP 조회][49]에 표시됩니다.

App and API Protection 위협 탐지가 실제로 작동하는 모습을 확인하려면 애플리케이션에 알려진 공격 패턴을 전송합니다. 예를 들어 값이 `acunetix-product`인 HTTP 헤더를 전송하면 [보안 스캐너 공격][44] 시도가 트리거됩니다.
   ```sh
   curl -H 'My-AAP-Test-Header: acunetix-product' https://<YOUR_FUNCTION_URL>/<EXISTING_ROUTE>
   ```
애플리케이션을 활성화하고 공격 패턴을 전송한 뒤 몇 분이 지나면 **위협 정보가 [Application Signals Explorer][41]**에 표시됩니다.

## 태그를 사용하여 텔레메트리 연결 {#connect-telemetry-using-tags}

예약된 태그(`env`, `service`, `version`) 및 사용자 지정 태그를 사용하여 Datadog 텔레메트리를 서로 연결하세요. 이러한 태그를 사용하여 메트릭, 트레이스 및 로그를 원활하게 탐색할 수도 있습니다. 설치 방법에 따라 아래와 같은 추가 파라미터를 추가합니다.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

[Datadog CLI][1] 최신 버전을 사용 중이어야 하고, 적절한 추가 인수를 사용해 `datadog-ci lambda instrument` 명령을 실행해야 합니다. 예:

```sh
datadog-ci lambda instrument \
    --env dev \
    --service web \
    --version v1.2.3 \
    --extra-tags "team:avengers,project:marvel"
    # ... other required arguments, such as function names
```

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless 프레임워크" %}}

[Datadog 서버리스 플러그인][1] 최신 버전을 사용 중이어야 하고, `env`, `service`, `version` 및 `tags` 파라미터를 사용하여 태그를 적용해야 합니다. 예:

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    env: dev
    service: web
    version: v1.2.3
    tags: "team:avengers,project:marvel"
```

기본적으로 `env` 및 `service`를 정의하지 않으면 플러그인이 서버리스 애플리케이션 정의에서 가져온 `stage` 및 `service` 값을 자동으로 사용합니다. 이 기능을 비활성화하려면 `enableTags`를 `false`로 설정하세요.

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog 서버리스 매크로][1] 최신 버전을 사용 중이어야 하고, `env`, `service`, `version` 및 `tags` 파라미터를 사용하여 태그를 적용해야 합니다. 예:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      env: dev
      service: web
      version: v1.2.3
      tags: "team:avengers,project:marvel"
```

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog serverless cdk 컨스트럭트][1] 최신 버전을 사용 중이어야 하고, `env`, `service`, `version` 및 `tags` 파라미터를 사용하여 태그를 적용해야 합니다. 예:

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    env: "dev",
    service: "web",
    version: "v1.2.3",
    tags: "team:avengers,project:marvel"
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "기타" %}}

[Datadog Lambda Extension][1]을 사용하여 Lambda 함수로부터 텔레메트리를 수집하는 경우, Lambda 함수에서 다음과 같은 환경 변수를 설정합니다. 예:
- DD_ENV: dev
- DD_SERVICE: web
- DD_VERSION: v1.2.3
- DD_TAGS: team:avengers,project:marvel

[Datadog Forwarder Lambda 함수][2]를 사용하여 Lambda 함수로부터 텔레메트리를 수집하는 경우, Lambda 함수에서 `env`, `service`, `version` 및 추가적인 태그를 AWS 리소스 태그로 설정합니다. `DdFetchLambdaTags` 옵션이 CloudFormation 스택에서 Datadog Forwarder에 대하여 `true`로 설정되었어야 합니다. 이 옵션은 버전 3.19.0부터 기본적으로 true로 설정됩니다.

[1]: /ko/serverless/libraries_integrations/extension/
[2]: /ko/serverless/libraries_integrations/forwarder/
{{% /tab %}}
{{< /tabs >}}

또한 Datadog은 수집된 텔레메트리를 Lambda 함수에서 정의된 기존 AWS 리소스 태그로 보강할 수도 있습니다(몇 분의 지연 시간이 적용됨).

- [Datadog Lambda Extension][2]을 사용하여 Lambda 함수로부터 텔레메트리를 수집하는 경우, [Datadog AWS 통합][3]을 활성화하세요. 이 기능은 텔레메트리를 **사용자 지정** 태그로 보강하도록 설계되었습니다. Datadog 예약된 태그(`env`, `service`, `version`)는 상응하는 환경 변수(각각 `DD_ENV`, `DD_SERVICE`, `DD_VERSION`)를 통해 설정해야 합니다. 예약된 태그는 서버리스 개발자 도구를 사용하여 Datadog 통합이 제공한 파라미터로도 설정할 수 있습니다. 이 기능은 컨테이너 이미지로 배포한 Lambda 함수에 대해서는 작동하지 않습니다.

- [Datadog Forwarder Lambda 함수][4]를 사용하여 Lambda 함수로부터 텔레메트리를 수집하는 경우, `DdFetchLambdaTags` 옵션을 Datadog Forwarder에서 CloudFormation 스택에 대하여 `true`로 설정합니다. 이 옵션은 버전 3.19.0부터 기본적으로 true로 설정됩니다.

## 요청 및 응답 페이로드 수집 {#collect-the-request-and-response-payloads}

<div class="alert alert-info">이 기능은 Python, Node.js, Go, Java 및 .NET에서 지원됩니다.</div>

Datadog은 [AWS Lambda 함수의 JSON 요청 및 응답 페이로드를 수집하고 시각화][5]하여 서버리스 애플리케이션에 대한 심층적인 인사이트를 제공하고, Lambda 함수 실패 시 문제 해결에도 도움이 됩니다.

이 기능은 기본적으로 비활성화되어 있습니다. 설치 방법에 따라 아래의 지침을 따르세요.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

[Datadog CLI][1] 최신 버전을 사용 중이어야 하고, 추가 `--capture-lambda-payload` 인수를 사용해 `datadog-ci lambda instrument` 명령을 실행해야 합니다. 예:

```sh
datadog-ci lambda instrument \
    --capture-lambda-payload true
    # ... other required arguments, such as function names
```

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless 프레임워크" %}}

[Datadog 서버리스 플러그인][1] 최신 버전을 사용 중이어야 하고, `captureLambdaPayload`를 `true`로 설정해야 합니다. 예:

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

[Datadog 서버리스 매크로][1] 최신 버전을 사용 중이어야 하고, `captureLambdaPayload` 파라미터를 `true`로 설정해야 합니다. 예:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

[Datadog 서버리스 cdk 컨스트럭트][1] 최신 버전을 사용 중이어야 하고, `captureLambdaPayload` 파라미터를 `true`로 설정해야 합니다. 예:

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    captureLambdaPayload: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "기타" %}}

Lambda 함수에서 환경 변수 `DD_CAPTURE_LAMBDA_PAYLOAD`를 `true`로 설정합니다.

{{% /tab %}}
{{< /tabs >}}

요청 또는 응답 JSON 개체 내의 민감한 데이터가 Datadog으로 전송되지 않게 방지하려면 특정 파라미터를 스크러빙할 수 있습니다.

이렇게 하려면 Lambda 함수 코드와 동일한 폴더에 새 파일 `datadog.yaml`을 추가하세요. 그러면 `datadog.yaml`의 `apm_config` 설정 내 [replace_tags 블록][6]을 통해 Lambda 페이로드의 필드 난독화를 사용할 수 있습니다.

```yaml
apm_config:
  replace_tags:
    # Replace all the occurrences of "foobar" in any tag with "REDACTED":
    - name: "*"
      pattern: "foobar"
      repl: "REDACTED"
    # Replace "auth" from request headers with an empty string
    - name: "function.request.headers.auth"
      pattern: "(?s).*"
      repl: ""
    # Replace "apiToken" from response payload with "****"
    - name: "function.response.apiToken"
      pattern: "(?s).*"
      repl: "****"
```

이에 대한 대안으로, Lambda 함수에서 `DD_APM_REPLACE_TAGS` 환경 변수를 채워 특정 필드를 난독화할 수도 있습니다.

```yaml
DD_APM_REPLACE_TAGS=[
      {
        "name": "*",
        "pattern": "foobar",
        "repl": "REDACTED"
      },
      {
        "name": "function.request.headers.auth",
        "pattern": "(?s).*",
        "repl": ""
      },
      {
        "name": "function.response.apiToken",
        "pattern": "(?s).*"
        "repl": "****"
      }
]
```

AWS 서비스에서 페이로드를 수집하려면 [AWS Services에서 요청 및 응답 캡처][54]를 참조하세요.



## Lambda 외의 리소스에서 트레이스 수집 {#collect-traces-from-non-lambda-resources}

Datadog은 Lambda 함수를 트리거하는 AWS 관리형 리소스의 수신 Lambda 이벤트에 따라 APM 스팬을 추론할 수 있습니다. 이렇게 하면 AWS 관리형 리소스 간 관계를 시각화하고 서버리스 애플리케이션의 성능 문제를 식별하는 데 도움이 됩니다. [추가적인 제품 세부 정보][12]를 참조하세요.

현재 지원되는 리소스는 다음과 같습니다.

- API Gateway(REST API, HTTP API, WebSocket)
- 함수 URL
- SQS
- SNS(SQS를 통해 전송되는 SNS 메시지도 지원됨)
- Kinesis Streams(데이터가 JSON 문자열 또는 base64 인코딩된 JSON 문자열인 경우)
- EventBridge(사용자 지정 이벤트, 여기에서 `Details`가 JSON 문자열)
- S3
- DynamoDB

이 기능을 비활성화하려면 `DD_TRACE_MANAGED_SERVICES`를 `false`로 설정하세요.

### DD_SERVICE_MAPPING {#dd-service-mapping}

`DD_SERVICE_MAPPING`은 업스트림 Lambda 외 [서비스 이름][46]의 이름을 바꾸는 환경 변수입니다. 이 환경 변수는 `old-service:new-service` 페어와 함께 작동합니다.

#### 구문 {#syntax}

`DD_SERVICE_MAPPING=key1:value1,key2:value2`...

이 변수와 상호작용을 하는 방법은 두 가지입니다.

#### 한 유형의 모든 서비스 이름 바꾸기 {#rename-all-services-of-a-type}

AWS Lambda 통합과 연결된 모든 업스트림 서비스의 이름을 바꾸려면 다음 식별자를 사용하세요.

| AWS Lambda 통합 | DD_SERVICE_MAPPING 값 |
|---|---|
| `lambda_api_gateway` | `"lambda_api_gateway:newServiceName"` |
| `lambda_sns` | `"lambda_sns:newServiceName"` |
| `lambda_sqs` | `"lambda_sqs:newServiceName"` |
| `lambda_s3` | `"lambda_s3:newServiceName"` |
| `lambda_eventbridge` | `"lambda_eventbridge:newServiceName"` |
| `lambda_kinesis` | `"lambda_kinesis:newServiceName"` |
| `lambda_dynamodb` | `"lambda_dynamodb:newServiceName"` |
| `lambda_url` | `"lambda_url:newServiceName"` |
| `lambda_msk` | `"lambda_msk:newServiceName"` |

#### 특정 서비스 이름 변경 {#rename-specific-services}

좀 더 세분화된 방식으로 접근하려면, 다음 서비스별 식별자를 사용합니다.

| 서비스 | 식별자 | DD_SERVICE_MAPPING 값 |
|---|---|---|
| API Gateway | API ID | `"r3pmxmplak:newServiceName"` |
| SNS | 주제 이름 | `"ExampleTopic:newServiceName"` |
| SQS | 대기열 이름 | `"MyQueue:newServiceName"` |
| S3 | 버킷 이름 | `"example-bucket:newServiceName"` |
| EventBridge | 이벤트 소스 | `"eventbridge.custom.event.sender:newServiceName"` |
| Kinesis | 스트림 이름 | `"MyStream:newServiceName"` |
| DynamoDB | 테이블 이름 | `"ExampleTableWithStream:newServiceName"` |
| Lambda URL | API ID | `"a8hyhsshac:newServiceName"` |
| MSK | 클러스터 이름 | `"ExampleCluster:newServiceName"` |

#### 설명을 포함한 예시 {#examples-with-description}

| 명령 | 설명 |
|---|---|
| `DD_SERVICE_MAPPING="lambda_api_gateway:new-service-name"` | 모든 `lambda_api_gateway` 업스트림 서비스를 `new-service-name` |로 이름 변경
| `DD_SERVICE_MAPPING="08se3mvh28:new-service-name"` | 특정 업스트림 서비스 `08se3mvh28.execute-api.eu-west-1.amazonaws.com`을 `new-service-name` |으로 이름 변경

다운스트림 서비스 이름 변경에 관한 내용은 [트레이서의 구성 설명서][45]에 있는 `DD_SERVICE_MAPPING`을 참조하세요.

## Datadog SDK 구성 {#configure-the-datadog-sdk}

Datadog APM 클라이언트가 자동으로 계측하는 라이브러리와 프레임워크가 무엇인지 확인하려면 [APM의 호환성 요구 사항][15]을 참조하세요. 사용자 지정 애플리케이션을 계측하려면 Datadog의 [사용자 지정 계측][16]에 대한 APM 가이드를 참조하세요.

## APM 스팬 수집을 위한 샘플링 레이트 선택 {#select-sampling-rates-for-ingesting-apm-spans}

서버리스 함수의 [APM 트레이싱 호출 샘플링 레이트][17]를 관리하려면 함수의 `DD_TRACE_SAMPLING_RULES` 환경 변수를 0.000(Lambda 함수 호출 추적 안 함)에서 1.000(모든 Lambda 함수 호출 추적) 사이의 값으로 설정합니다.

**참고**:
   - `DD_TRACE_SAMPLE_RATE`는 사용이 중단되었습니다. 대신 `DD_TRACE_SAMPLING_RULES`를 사용하세요. 예를 들어 이미 `DD_TRACE_SAMPLE_RATE`를 `0.1`로 설정한 경우, 대신 `DD_TRACE_SAMPLING_RULES`를 `[{"sample_rate":0.1}]`로 설정하세요.
   - `trace.<OPERATION_NAME>.hits`와 같은 전체 트래픽 메트릭은 Lambda의 샘플링된 호출*만* 기반으로 계산됩니다.

처리량이 많은 서비스의 경우, 트레이스 데이터가 매우 반복적이기 때문에 모든 요청을 수집할 필요가 없는 것이 일반적입니다. 충분히 중요한 문제는 항상 트레이스 여러 개에 증상이 표시됩니다. [Ingestion Control][18]을 사용하면 예산 범위를 벗어나지 않으면서 문제를 해결하는 데 필요한 가시성을 확보할 수 있습니다.

수집의 기본 샘플링 메커니즘을 [헤드 기반 샘플링][19]이라고 합니다. 트레이스를 유지할지 제거할지에 대한 결정은 트레이스의 맨 처음, 즉 루트 스팬이 시작되는 시점에 이루어집니다. 이 결정은 이후 요청 컨텍스트의 일부로, 예를 들어 HTTP 요청 헤더로 다른 서비스에 전파됩니다. 결정이 트레이스 시작 시점에 이루어진 다음 트레이스의 모든 부분으로 전달되기 때문에, 루트 서비스에서 샘플링 레이트를 구성해야 효과가 있습니다.

Datadog에서 스팬이 수집된 뒤, Datadog 지능형 보존 필터가 트레이스의 일부분을 인덱싱하여 애플리케이션 상태를 모니터링하는 데 도움이 됩니다. 사용자 지정 [보존 필터][20]를 정의하여 조직의 목표를 지원하고자 더 오래 보관하려는 트레이스 데이터를 인덱싱할 수도 있습니다.

[Datadog 트레이스 파이프라인][21]에 대해 더 자세히 알아보세요.

## 트레이스에서 민감한 정보 필터링 또는 스크러빙 {#filter-or-scrub-sensitive-information-from-traces}

트레이스를 Datadog으로 전송하기 전에 필터링하려면 [APM에서 원치 않는 리소스 무시하기][22]를 참조하세요.

데이터 보안을 위해 트레이스 속성을 스크러빙하려면 [데이터 보안을 위한 Datadog Agent 또는 Tracer 구성][23]을 참조하세요.

## 트레이스 수집 활성화/비활성화 {#enabledisable-trace-collection}

Datadog Lambda Extension을 통한 트레이스 수집은 기본적으로 활성화됩니다.

Lambda 함수로부터 트레이스 수집을 시작하려면 아래의 구성을 적용하세요.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing true
    # ... other required arguments, such as function names
```
{{% /tab %}}
{{% tab "Serverless 프레임워크" %}}

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    enableDatadogTracing: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "기타" %}}

Lambda 함수에서 환경 변수 `DD_TRACE_ENABLED`를 `true`로 설정합니다.

{{% /tab %}}
{{< /tabs >}}

#### 트레이스 수집 비활성화 {#disable-trace-collection}

Lambda 함수로부터 트레이스 수집을 중지하려면 아래의 구성을 적용하세요.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing false
    # ... other required arguments, such as function names
```
{{% /tab %}}
{{% tab "Serverless 프레임워크" %}}

```yaml
custom:
  datadog:
    # ... other required parameters, such as the Datadog site and API key
    enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... other required parameters, such as the Datadog site and API key
      enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new DatadogLambda(this, "Datadog", {
    // ... other required parameters, such as the Datadog site and API key
    enableDatadogTracing: false
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "기타" %}}

Lambda 함수에서 환경 변수 `DD_TRACE_ENABLED`를 `false`로 설정합니다.

{{% /tab %}}
{{< /tabs >}}

## 로그 및 트레이스 연결 {#connect-logs-and-traces}

[Lambda 확장][2]을 사용하여 트레이스 및 로그를 수집하는 경우, Datadog이 자동으로 AWS Lambda 요청 ID를 `request_id` 태그 아래의 `aws.lambda` 스팬에 추가합니다. 또한, 동일한 요청에 대한 Lambda 로그가 `lambda.request_id` 속성 아래에 추가됩니다. Datadog 트레이스 및 로그 조회는 AWS Lambda 요청 ID를 사용하여 연결됩니다.

[Forwarder Lambda 함수][4]를 사용하여 트레이스 및 로그를 수집하는 경우, `dd.trace_id`가 자동으로 로그에 주입됩니다(환경 변수 `DD_LOGS_INJECTION`을 사용하여 기본적으로 활성화됨). Datadog 트레이스 및 로그 조회는 Datadog 트레이스 ID를 사용하여 연결됩니다. 이 기능은 보편적인 런타임 및 로거를 사용하여 대부분의 애플리케이션에서 지원됩니다([런타임별 지원][24] 참조).

지원되지 않는 런타임 또는 사용자 지정 로거를 사용 중인 경우, 다음 단계를 따르세요.
- JSON으로 로깅하는 경우, `dd-trace`를 사용하여 Datadog 트레이스 ID를 획득해 이를 `dd.trace_id` 필드 아래의 로그에 추가해야 합니다.
    ```javascript
    {
      "message": "This is a log",
      "dd": {
        "trace_id": "4887065908816661012"
      }
      // ... the rest of your log
    }
    ```
- 일반 텍스트로 로깅하는 경우 해야 할 일:
    1. `dd-trace`를 사용하여 Datadog 트레이스 ID를 획득해 이를 로그에 추가합니다.
    2. 기본 Lambda 로그 파이프라인(읽기 전용임)을 복제합니다.
    3. 복제한 파이프라인을 활성화하고 기본 파이프라인을 비활성화합니다.
    4. 복제한 파이프라인의 [Grok 파서][25] 규칙을 업데이트하여 Datadog 트레이스 ID를 `dd.trace_id` 속성으로 구문 분석하게 합니다. 예를 들어 `[INFO] dd.trace_id=4887065908816661012 My log message`와 같은 모양의 로그의 경우 규칙 `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*`을 사용합니다.

## 오류를 소스 코드와 연결 {#link-errors-to-your-source-code}

[Datadog 소스 코드 통합][26]을 사용하면 텔레메트리(예: 스택 트레이스)를 Git 리포지토리에 있는 Lambda 함수의 소스 코드에 연결할 수 있습니다.

서버리스 애플리케이션에서 소스 코드 통합을 설정하는 방법에 대한 지침은 [빌드 아티팩트에 Git 정보 임베딩 섹션][101]을 참조하세요.

[101]: /ko/integrations/guide/source-code-integration/?tab=go#serverless

## 프로파일링 데이터 수집 {#collect-profiling-data}

Datadog의 [Continuous Profiler][42]는 Python 트레이서 버전 4.62.0 및 레이어 버전 62 이하에서 미리 보기로 이용할 수 있습니다. 이 옵션 기능은 `DD_PROFILING_ENABLED` 환경 변수를 `true`로 설정하여 활성화합니다.

Continuous Profiler는 정기적으로 CPU 및 실행 중인 모든 Python 코드의 힙 스냅샷을 생성하는 스레드를 스포닝하는 방식으로 작동합니다. 여기에는 프로파일러 자체도 포함할 수 있습니다. 프로파일러가 자신을 무시하도록 하려면 `DD_PROFILING_IGNORE_PROFILER`를 `true`로 설정하세요.

## 텔레메트리를 PrivateLink 또는 프록시를 통해 전송 {#send-telemetry-over-privatelink-or-proxy}

Datadog Lambda Extension은 Datadog으로 데이터를 전송하기 위해 퍼블릭 인터넷에 대한 액세스가 필요합니다. Lambda 함수가 퍼블릭 인터넷에 액세스할 수 없는 VPC에 배포된 경우, [AWS PrivateLink를 통해 데이터를][28] `datadoghq.com` [Datadog 사이트][29]에 전송하고, 다른 모든 사이트로는 [프록시를 통해 데이터를 전송][30]하세요.

Datadog Forwarder를 사용하는 경우, 이 [지침][31]을 따르세요.

## 여러 Datadog 조직에 텔레메트리 전송 {#send-telemetry-to-multiple-datadog-organizations}

데이터를 여러 조직에 전송하려면 일반 텍스트 API 키, AWS Secrets Manager 또는 AWS KMS를 사용하여 이중 전달을 활성화할 수 있습니다.

{{< tabs >}}
{{% tab "일반 텍스트 API 키" %}}

일반 텍스트 API 키를 사용하여 이중 전달을 활성화하려면 Lambda 함수에서 다음 환경 변수를 설정합니다.

```bash
# Enable dual shipping for metrics
DD_ADDITIONAL_ENDPOINTS={"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for APM (traces)
DD_APM_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for APM (profiling)
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# Enable dual shipping for logs
DD_LOGS_CONFIG_FORCE_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS=[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]
```

{{% /tab %}}
{{% tab "AWS Secrets Manager" %}}

Datadog Extension은 `_SECRET_ARN` 접두사가 붙은 모든 환경 변수에 대하여 [AWS Secrets Manager][1] 값 자동으로 가져오기를 지원합니다. 이 기능을 사용하여 Secrets Manager의 환경 변수를 안전하게 저장하고 Datadog을 사용해 이중 전달할 수 있습니다.

1. Lambda 함수에서 환경 변수 `DD_LOGS_CONFIG_FORCE_USE_HTTP`를 설정합니다.
2. Lambda 함수 IAM 역할 권한에 `secretsmanager:GetSecretValue` 권한을 추가합니다.
3. Secrets Manager에서 새 시크릿을 생성하여 이중 전달 메트릭 환경 변수를 저장합니다. 내용이 `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}`와 유사해야 합니다.
4. Lambda 함수에서 환경 변수 `DD_ADDITIONAL_ENDPOINTS_SECRET_ARN`을 앞서 언급한 시크릿의 ARN으로 설정합니다.
5. Secrets Manager에서 새 시크릿을 생성하여 이중 전달 APM(트레이스) 환경 변수를 저장합니다. 내용이 `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`와 **유사**해야 합니다.
6. Lambda 함수에서 환경 변수 `DD_APM_ADDITIONAL_ENDPOINTS_SECRET_ARN`을 앞서 언급한 시크릿의 ARN과 같게 설정합니다.
7. Secrets Manager에서 새 시크릿을 생성하여 이중 전달 APM(프로파일링) 환경 변수를 저장합니다. 내용이 `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`와 **유사**해야 합니다.
8. Lambda 함수에서 환경 변수 `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_SECRET_ARN`을 앞서 언급한 시크릿의 ARN과 같게 설정합니다.
9. Secrets Manager에서 새 시크릿을 생성하여 이중 전달 로그 환경 변수를 저장합니다. 내용이 `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]`와 **유사**해야 합니다.
10. Lambda 함수에서 환경 변수 `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_SECRET_ARN`을 앞서 언급한 시크릿의 ARN과 같게 설정합니다.

[1]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

{{% /tab %}}
{{% tab "AWS KMS" %}}

Datadog Extension은 `_KMS_ENCRYPTED` 접두사가 붙은 모든 환경 변수에서 [AWS KMS][41] 값을 자동으로 복호화하기를 지원합니다. 이 기능을 사용하여 KMS의 환경 변수를 안전하게 저장하고 Datadog을 사용해 이중 전달할 수 있습니다.

1. Lambda 함수에서 환경 변수 `DD_LOGS_CONFIG_FORCE_USE_HTTP=true`를 설정합니다.
2. `kms:GenerateDataKey` 및 `kms:Decrypt` 권한을 Lambda 함수 IAM 역할 권한에 추가합니다.
3. 이중 전달 메트릭의 경우, KMS를 사용하여 `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}`를 암호화하고 `DD_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` 환경 변수를 그 값과 같게 설정합니다.
4. 이중 전달 트레이스의 경우, KMS를 사용하여 `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`를 암호화하고 `DD_APM_ADDITIONAL_KMS_ENCRYPTED` 환경 변수를 그 값과 같게 설정합니다.
5. 이중 전달 프로파일링의 경우, KMS를 사용하여 `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`를 암호화하고 `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` 환경 변수를 그 값과 같게 설정합니다.
5. 이중 전달 로그의 경우, KMS를 사용하여 `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]`를 암호화하고 `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` 환경 변수를 그 값과 같게 설정합니다.

[41]: https://docs.aws.amazon.com/kms/
{{% /tab %}}
{{< /tabs >}}

고급 사용법에 대한 내용은 [이중 전달 가이드][32]를 참조하세요.

## FIPS 규정 준수 활성화 {#enable-fips-compliance}

<div class="alert alert-info">AWS Lambda 함수에 대한 FIPS 규정 준수 개요 전문은 <a href="/serverless/aws_lambda/fips-compliance">AWS Lambda FIPS 규정 준수</a> 페이지를 참조하세요.</div>

AWS Lambda 함수에 대하여 FIPS 규정 준수를 활성화하려면 다음 단계를 따르세요.

1. 적절한 ARN을 참조하여 FIPS 규정을 준수하는 확장 레이어 사용:

{{< tabs >}}
{{% tab "AWS GovCLoud" %}}
 ```sh
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws-us-gov:lambda:<AWS_REGION>:002406178527:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{% tab "AWS Commercial" %}}
 ```sh
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM-FIPS:{{< latest-lambda-layer-version layer="extension" >}}
 ```
{{% /tab %}}
{{< /tabs >}}

2. Python, JavaScript 또는 Go를 사용하는 Lambda 함수의 경우, 환경 변수 `DD_LAMBDA_FIPS_MODE`를 `true`로 설정합니다. 이 환경 변수의 설명:
   - FIPS 모드에서, Lambda 메트릭 헬퍼 함수에 메트릭 제출을 위해 FIPS 규정을 준수하는 확장이 필요합니다.
   - API 키 조회를 위해 AWS FIPS 엔드포인트 사용
   - GovCloud 환경에서 기본적으로 활성화됨

3. Ruby, .NET 또는 Java를 사용하는 Lambda 함수의 경우, 환경 변수를 추가로 구성할 필요가 없습니다.

4. 완전한 엔드 투 엔드 FIPS 규정 준수를 위해서는, Lambda 함수가 Datadog for Government 사이트를 사용하도록 구성하세요.
   - `DD_SITE`를 `ddog-gov.com`(US1-FED) 또는 `us2.ddog-gov.com`(US2-FED)으로 구성
   **참고**: FIPS 규정을 준수하는 Lambda 구성 요소는 모든 Datadog 사이트에서 작동하지만, FIPS 규정을 준수하는 인테이크 엔드포인트는 Datadog for Government 사이트에만 있습니다.

## AWS 리소스에 트레이스 컨텍스트 전파 {#propagate-trace-context-over-aws-resources}

Datadog은 발신되는 AWS SDK 요청에 자동으로 트레이스 컨텍스트를 주입하고, Lambda 이벤트로부터 트레이스 컨텍스트를 추출합니다. 이렇게 하면 Datadog이 분산된 여러 서비스에서 요청 또는 트랜잭션을 추적할 수 있습니다. [Serverless 트레이스 전파][33]를 참조하세요.

## X-Ray 및 Datadog 트레이스 병합 {#merge-x-ray-and-datadog-traces}

AWS X-Ray는 특정 AWS 관리형 서비스(예: AppSync 및 Step Functions)를 통한 트레이싱을 지원하며, 이것은 Datadog APM에서는 기본적으로 지원되지 않습니다. [Datadog X-Ray 통합][34]을 활성화하고 X-Ray 트레이스를 Datadog 네이티브 트레이스와 병합할 수 있습니다. [추가 세부 정보][35]를 참조하세요.

## AWS Lambda 코드 서명 활성화 {#enable-aws-lambda-code-signing}

[AWS Lambda용 코드 서명][36]은 신뢰할 수 있는 코드만 Lambda 함수에서 AWS로 배포되도록 보장하는 데 도움이 됩니다. 함수에서 코드 서명을 활성화하면 AWS가 배포의 모든 코드가 신뢰할 수 있는 소스로 서명되었는지 검증합니다. 신뢰할 수 있는 소스는 코드 서명 구성에서 정의합니다.

Lambda 함수가 코드 서명을 사용하도록 구성된 경우, 함수의 코드 서명 구성에 Datadog의 Signing Profile ARN을 추가해야만 Datadog이 게시한 Lambda Layers를 사용하여 Lambda 함수를 배포할 수 있습니다.

Datadog의 Signing Profile ARN:

```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```


## Datadog Lambda Extension으로 마이그레이션 {#migrate-to-the-datadog-lambda-extension}

Datadog은 [Forwarder Lambda 함수][4] 또는 [Lambda 확장][2]을 사용하여 Lambda 함수로부터 모니터링 데이터를 수집할 수 있습니다. Datadog은 새 설치의 경우 Lambda 확장을 권장합니다. 확실하지 않은 경우, [Datadog Lambda Extension으로 마이그레이션 결정][37]을 참조하세요.

마이그레이션하려면 [Datadog Lambda Extension을 사용한 설치 지침][1]을 [Datadog Forwarder 사용 지침][38]과 비교합니다. 편의를 위해 주요 차이점을 아래에 요약했습니다.

**참고**: Datadog은 먼저 개발 및 스테이징 애플리케이션부터 마이그레이션한 다음 프로덕션 애플리케이션을 하나씩 마이그레이션할 것을 권장합니다.

<div class="alert alert-info">Datadog Lambda Extension은 기본적으로 로그 수집을 활성화합니다. Forwarder에서 확장으로 마이그레이션하는 경우, 로그 구독을 제거해야 합니다. 아니면 중복된 로그가 표시될 수 있습니다.</div>

{{< tabs >}}
{{% tab "Datadog CLI" %}}

1. `@datadog/datadog-ci`를 최신 버전으로 업그레이드
2. `--layer-version` 인수를 업데이트하고 런타임의 최신 버전으로 설정합니다.
3. `--extension-version` 인수를 최신 확장 버전으로 설정합니다. 최신 확장 버전은 `{{< latest-lambda-layer-version layer="extension" >}}`.
4. Set the required environment variables `DATADOG_SITE` and `DATADOG_API_KEY_SECRET_ARN`.
5. Remove the `--forwarder` argument.
6. Datadog AWS 통합을 Forwarder가 자동으로 Lambda 로그 그룹을 구독하도록 구성한 경우, 해당 리전의 _모든_ Lambda 함수를 마이그레이션한 다음 구독을 비활성화하세요.

{{% /tab %}}
{{% tab "Serverless 프레임워크" %}}

1. `serverless-plugin-datadog`를 최신 버전으로 업그레이드하세요. 이렇게 하면 기본적으로 Datadog Lambda Extension이 설치됩니다(단, `addExtension`을 `false`로 설정한 경우는 예외).
2. 필수 파라미터 `site` 및 `apiKeySecretArn`을 설정합니다.
3. 이전에 `env`, `service`, `version` 매개변수를 Lambda 리소스 태그로 설정한 경우 해당 파라미터를 설정합니다. 확장을 사용하는 경우, 플러그인이 대신 Datadog 예약된 환경 변수를 통해 자동으로 설정합니다(예: `DD_ENV`).
4. `forwarderArn` 파라미터를 제거합니다. 단, Forwarder가 Lambda 외 리소스로부터 계속 로그를 수집하게 하고 싶고 `subscribeToApiGatewayLogs`, `subscribeToHttpApiLogs` 또는 `subscribeToWebsocketLogs`가 `true`로 설정된 경우는 예외입니다.
5. Datadog AWS 통합을 Forwarder가 자동으로 Lambda 그룹을 구독하도록 구성한 경우, 해당 리전의 _모든_ Lambda 함수를 마이그레이션한 다음 구독을 비활성화하세요.

{{% /tab %}}
{{% tab "AWS SAM" %}}

1. `datadog-serverless-macro` CloudFormation 스택이 최신 버전을 반영하도록 업데이트합니다.
2. `extensionLayerVersion` 파라미터를 최신 확장 버전으로 설정합니다. 최신 확장 버전은 `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Set the required parameters `site` and `apiKeySecretArn`.
4. Remove the `forwarderArn` 파라미터입니다.
5. Datadog AWS 통합을 Forwarder가 자동으로 Lambda 로그 그룹을 구독하도록 구성한 경우, 해당 리전의 _모든_ Lambda 함수를 마이그레이션한 다음 구독을 비활성화하세요.

{{% /tab %}}
{{% tab "AWS CDK" %}}

1. `datadog-cdk-constructs` 또는 `datadog-cdk-constructs-v2`를 최신 버전으로 업그레이드합니다.
2. `extensionLayerVersion` 파라미터를 최신 확장 버전으로 설정합니다. 최신 확장 버전은 `{{< latest-lambda-layer-version layer="extension" >}}`.
3. Set the required parameters `site` and `apiKeySecretArn`.
4. Set the `env`, `service`, and `version` parameters if you previously set them as Lambda resource tags. The construct will automatically set them through the Datadog reserved environment variables instead, such as `DD_ENV`, when using the extension.
5. Remove the `forwarderArn` 파라미터입니다.
6. Datadog AWS 통합을 Forwarder가 자동으로 Lambda 로그 그룹을 구독하도록 구성한 경우, 해당 리전의 _모든_ Lambda 함수를 마이그레이션한 다음 구독을 비활성화하세요.

{{% /tab %}}
{{% tab "기타" %}}

1. 런타임용 Datadog Lambda 라이브러리 레이어를 최신 버전으로 업그레이드합니다.
2. Datadog Lambda Extension 최신 버전을 설치합니다.
3. 필수 환경 변수 `DD_SITE` 및 `DD_API_KEY_SECRET_ARN`을 설정합니다.
3. 이전에 `DD_ENV`, `DD_SERVICE`, `DD_VERSION` 환경 변수를 Lambda 리소스 태그로 설정한 경우 해당 환경 변수를 설정합니다.
4. Lambda 함수의 로그 그룹에서 Datadog Forwarder로 로그를 스트리밍하는 구독 필터를 제거합니다.
5. Datadog AWS 통합을 Forwarder가 자동으로 Lambda 그룹을 구독하도록 구성한 경우, 해당 리전의 _모든_ Lambda 함수를 마이그레이션한 다음 구독을 비활성화하세요.

{{% /tab %}}
{{< /tabs >}}

## Datadog Lambda Extension을 사용하여 x86에서 arm64로 마이그레이션 {#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension}

Datadog Extension은 컴파일된 바이너리로, x86 및 arm64 버전 둘 다에서 사용할 수 있습니다. CDK, Serverless Framework 또는 SAM과 같은 배포 도구를 사용하여 x86 Lambda 함수를 arm64로 마이그레이션하는 경우(또는 arm64를 x86으로), 서비스 통합(API Gateway, SNS 또는 Kinesis)이 Lambda 함수의 버전 또는 별칭을 사용하도록 구성되어 있는지 확인하세요. 그러지 않으면 배포 중에 약 10초간 함수를 사용할 수 없을 가능성이 있습니다.

이런 문제가 발생하는 이유는 Lambda 함수를 x86에서 arm64로 마이그레이션하는 작업은 병렬 API 호출 두 개, `updateFunction` 및 `updateFunctionConfiguration`으로 구성되기 때문입니다. 이러한 호출이 진행되는 동안, Lambda `updateFunction` 호출은 완료되어 코드가 새 아키텍처를 사용하도록 업데이트되었지만, `updateFunctionConfiguration` 호출은 아직 완료되지 않아 Extension에는 여전히 기존 아키텍처가 구성되어 있는 짧은 구간이 발생합니다.

Layer Versions를 사용할 수 없는 경우, Datadog은 아키텍처 마이그레이션 프로세스를 진행하는 동안 [Datadog Forwarder][38]를 구성할 것을 권장합니다.


## Datadog Lambda Extension을 로컬 테스트용으로 구성 {#configure-the-datadog-lambda-extension-for-local-testing}

모든 Lambda 에뮬레이터가 AWS Lambda Telemetry API를 지원하는 것은 아닙니다. Lambda 함수의 컨테이너 이미지를 Datadog Lambda Extension이 설치된 상태로 로컬로 테스트하려면 로컬 테스트 환경에서 `DD_SERVERLESS_FLUSH_STRATEGY`를 `periodically,1`로 설정해야 합니다. 그러지 않으면 확장이 AWS Lambda Telemetry API로부터 응답을 기다리며 호출을 차단합니다.

## OpenTelemetry API를 사용하여 AWS Lambda 계측 {#instrument-aws-lambda-with-the-opentelemetry-api}

Datadog SDK는 Datadog Lambda Extension 설치 시 포함되며 OpenTelemetry로 계측된 코드가 생성한 스팬과 트레이스를 수락하고, 텔레메트리를 처리하여 Datadog으로 전송합니다.

이 접근 방식은 일례로 코드가 이미 OpenTelemetry API를 사용하여 계측된 경우 사용할 수 있습니다. 또한 OpenTelemetry API로 벤더 무관 코드를 사용해 계측하면서 Datadog SDK 사용 시 이점도 계속 누리고자 하는 경우에도 이 방식을 사용할 수 있습니다.

OpenTelemetry API를 사용하여 AWS Lambda를 계측하려면 환경 변수 `DD_TRACE_OTEL_ENABLED`를 `true`로 설정합니다. 자세한 내용은 [OpenTelemetry API를 사용한 사용자 지정 계측][48]을 참조하세요.

## Datadog Lambda Extension v67+ 사용 {#using-datadog-lambda-extension-v67}
[Datadog Extension][53]의 버전 67+는 콜드 스타트 시간을 대폭 단축하도록 최적화되었습니다.
최적화된 확장을 사용하려면 `DD_SERVERLESS_APPSEC_ENABLED` 환경 변수를 `false`로 설정하세요.
`DD_SERVERLESS_APPSEC_ENABLED` 환경 변수가 `true`로 설정되어 있으면 Datadog Extension이 기본적으로 완전히 호환되는 오래된 버전으로 설정됩니다. `DD_EXTENSION_VERSION`을 `compatibility`로 설정하여 확장이 오래된 버전을 사용하도록 강제할 수도 있습니다. Datadog에서는 [문제를 GitHub에 추가][54]하고 문제를 `version/next`로 태그하여 피드백 또는 버그를 신고할 것을 독려합니다.

## DynamoDB PutItem에 대한 자동 연결 구성 {#configure-auto-linking-for-dynamodb-putitem}
_Python 및 Node.js 런타임에 대하여 사용 가능_.
비동기 요청의 세그먼트가 트레이스 컨텍스트를 전파할 수 없으면, Datadog의 [스팬 자동 연결][55] 기능이 자동으로 연결된 스팬을 감지합니다. 
[DynamoDB Change Streams][56]의 `PutItem` 작업에 대하여 스팬 자동 연결을 활성화하려면 기본 키 이름을 테이블에 대하여 구성합니다.

{{< tabs >}}
{{% tab "Python" %}}

```python
ddtrace.config.botocore['dynamodb_primary_key_names_for_tables'] = {
    'table_name': {'key1', 'key2'},
    'other_table': {'other_key'},
}
```
{{% /tab %}}
{{% tab "Node.js" %}}

```js
// Initialize the tracer with the configuration
const tracer = require('dd-trace').init({
  dynamoDb: {
    tablePrimaryKeys: {
      'table_name': ['key1', 'key2'],
      'other_table': ['other_key']
    }
  }
})
```
{{% /tab %}}
{{% tab "환경 변수" %}}

```sh
export DD_BOTOCORE_DYNAMODB_TABLE_PRIMARY_KEYS='{
    "table_name": ["key1", "key2"],
    "other_table": ["other_key"]
}'
```
{{% /tab %}}
{{< /tabs >}}

이렇게 하면 DynamoDB `PutItem` 호출이 스팬 포인터를 사용하여 계측되게 할 수 있습니다. 많은 DynamoDB API 호출은 항목의 기본 키 필드를 별도의 값으로 포함하지 않으므로, 그러한 필드를 SDK에 별도로 제공해야 합니다. 위의 구성은 딕셔너리(`dict`) 또는 테이블 이름을 문자열로 하여 키로 지정된 개체(`str`)로 구조화됩니다. 각 값은 연결된 테이블의 기본 키 필드 이름 세트(문자열 형식)입니다. 세트에는 테이블의 기본 키 스키마에 따라 정확히 한 개 또는 두 개의 요소를 포함할 수 있습니다.

## 리소스 이름 기준으로 AWS 서비스 시각화 및 모델링 {#visualize-and-model-aws-services-by-resource-name}

[Node.js][50], [Python][51] 및 [Java][52] Lambda 레이어의 다음 버전은 AWS 관리형 서비스를 올바로 이름 지정, 모델링, 시각화하도록 변경 사항을 릴리스했습니다. 

서비스 이름이 AWS 서비스만이 아니라 실제 AWS 리소스 이름을 반영합니다.
* `aws.lambda` → `[function_name]`
* `aws.dynamodb` → `[table_name]`
* `aws.sns` → `[topic_name]`
* `aws.sqs` → `[queue_name]`
* `aws.kinesis` → `[stream_name]`
* `aws.s3` → `[bucket_name]`
* `aws.eventbridge` → `[event_name]`

대시보드 및 모니터가 레거시 명명 규칙에 의존하는 경우, 오래된 서비스 표시 방식을 선호할 수 있습니다. 이전 동작을 복원하려면 환경 변수를 다음과 같이 설정:`DD_TRACE_AWS_SERVICE_REPRESENTATION_ENABLED=false`

업데이트된 서비스 모델링 구성을 권장합니다.

## 로그를 Observability Pipelines로 전송 {#send-logs-to-observability-pipelines}

{{% observability_pipelines/lambda_extension_source %}}

자세한 내용은 [Datadog Lambda Extension Forwarder 로그를 Observability Pipelines로 전송][58]을 참조하세요.

## API 키 시크릿을 정기적으로 다시 로드 {#reload-api-key-secret-periodically}

`DD_API_KEY_SECRET_ARN`을 사용하여 Datadog API 키를 지정하는 경우, `DD_API_KEY_SECRET_RELOAD_INTERVAL`을 설정하여 시크릿을 정기적으로 다시 로드할 수도 있습니다. 예를 들어 `DD_API_KEY_SECRET_RELOAD_INTERVAL`을 `43200`으로 설정하면 데이터를 전송하는 데 API 키가 필요할 때, 마지막 로드 이후 43,200초 넘게 지났을 때 시크릿이 다시 로드됩니다.

사용 사례 예시: 보안상의 이유로, API 키는 매일(86,400초) 교체되며 시크릿이 새 키로 업데이트되며, 기존 API 키는 유예 기간으로 하루 더 유효한 상태로 유지됩니다. 이 상황에서는 `DD_API_KEY_SECRET_RELOAD_INTERVAL`을 `43200`으로 설정하여 기존 키의 유예 기간 동안 API 키가 다시 로드되도록 할 수 있습니다.

이 기능은 Datadog Lambda Extension 버전 88+에서 사용할 수 있습니다.

## 문제 해결 {#troubleshoot}

설치를 구성하다가 문제가 발생하는 경우, 환경 변수 `DD_LOG_LEVEL`를 디버깅 로그에 대하여 `debug`로 설정합니다. 더 많은 문제 해결 팁은 [서버리스 모니터링 문제 해결 가이드][39]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/serverless/installation/
[2]: /ko/serverless/libraries_integrations/extension/
[3]: /ko/integrations/amazon_web_services/
[4]: /ko/serverless/libraries_integrations/forwarder/
[5]: https://www.datadoghq.com/blog/troubleshoot-lambda-function-request-response-payloads/
[6]: /ko/tracing/configure_data_security/#scrub-sensitive-data-from-your-spans
[7]: /ko/serverless/enhanced_lambda_metrics
[8]: /ko/integrations/amazon_api_gateway/#data-collected
[9]: /ko/integrations/amazon_appsync/#data-collected
[10]: /ko/integrations/amazon_sqs/#data-collected
[11]: /ko/integrations/amazon_web_services/#log-collection
[12]: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
[13]: /ko/agent/logs/advanced_log_collection/
[14]: /ko/logs/log_configuration/pipelines/
[15]: /ko/tracing/trace_collection/compatibility/
[16]: /ko/tracing/trace_collection/custom_instrumentation/
[17]: /ko/tracing/trace_pipeline/ingestion_controls/#configure-the-service-ingestion-rate
[18]: /ko/tracing/guide/trace_ingestion_volume_control#effects-of-reducing-trace-ingestion-volume
[19]: /ko/tracing/trace_pipeline/ingestion_mechanisms/?tabs=environmentvariables#head-based-sampling
[20]: /ko/tracing/trace_pipeline/trace_retention/
[21]: /ko/tracing/trace_pipeline/
[22]: /ko/tracing/guide/ignoring_apm_resources/
[23]: /ko/tracing/configure_data_security/
[24]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[25]: /ko/logs/log_configuration/parsing/
[26]: /ko/integrations/guide/source-code-integration
[27]: /ko/serverless/aws_lambda/metrics/#submit-custom-metrics
[28]: /ko/agent/guide/private-link/
[29]: /ko/getting_started/site/
[30]: /ko/agent/proxy/
[31]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring#aws-privatelink-support
[32]: /ko/agent/guide/dual-shipping/
[33]: /ko/serverless/distributed_tracing/#trace-propagation
[34]: /ko/integrations/amazon_xray/
[35]: /ko/serverless/distributed_tracing/#trace-merging
[36]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[37]: /ko/serverless/guide/extension_motivation/
[38]: /ko/serverless/guide#install-using-the-datadog-forwarder
[39]: /ko/serverless/guide/troubleshoot_serverless_monitoring/
[40]: /ko/serverless/libraries_integrations/extension/
[41]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[42]: /ko/profiler/
[43]: /ko/serverless/installation#installation-instructions
[44]: /ko/security/default_rules/security-scan-detected/
[45]: https://docs.datadoghq.com/ko/tracing/trace_collection/library_config/
[46]: https://docs.datadoghq.com/ko/tracing/glossary/#services
[47]: /ko/logs/
[48]: /ko/tracing/trace_collection/otel_instrumentation/
[49]: https://app.datadoghq.com/security/appsec?column=time&order=desc
[50]: https://github.com/DataDog/datadog-lambda-js/releases/tag/v12.127.0
[51]: https://github.com/DataDog/datadog-lambda-python/releases/tag/v8.113.0
[52]: https://github.com/DataDog/datadog-lambda-java/releases/tag/v24
[53]: https://github.com/DataDog/datadog-lambda-extension
[54]: https://github.com/DataDog/datadog-lambda-extension/issues
[55]: /ko/serverless/aws_lambda/distributed_tracing/#span-auto-linking
[56]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[57]: /ko/tracing/guide/aws_payload_tagging/?code-lang=python&tab=nodejs
[58]: /ko/observability_pipelines/sources/lambda_extension/