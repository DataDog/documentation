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
  text: AWS Lambda용 서버리스 모니터링 설치
- link: /serverless/troubleshooting/
  tag: 설명서
  text: AWS Lambda용 서버리스 모니터링 문제 해결
- link: /integrations/github
  tag: 설명서
  text: Datadog GitHub 통합
title: AWS Lambda용 서버리스 모니터링 구성
---

먼저 Datadog 서버리스 모니터링을 [설치][1]하여 메트릭, 트레이스 및 로그 수집을 시작합니다. 설치가 완료되면 다음 항목을 참조하여 모니터링 요구 사항에 맞도록 설치 옵션을 설정합니다.

### 메트릭
- [논람다 리소스에서 메트릭 수집](#collect-metrics-from-non-lambda-resources)
- [커스텀 메트릭 제출](#submit-custom-metrics)

### 로그
- [로그에서 정보 필터링 또는 스크러빙](#filter-or-scrub-information-from-logs)
- [로그 수집 활성화/비활성화](#enabledisable-log-collection)
- [논람다 리소스에서 로그 수집](#collect-logs-from-non-lambda-resources)
- [로그 변환 및 파싱](#parse-and-transform-logs)
- [로그와 트레이스 연결](#connect-logs-and-traces)

### APM
- [태그를 사용하여 텔레메트리 연결](#connect-telemetry-using-tags)
- [요청 및 응답 페이로드 수집](#collect-the-request-and-response-payloads)
- [논람다 리소스에서 메트릭 수집](#collect-metrics-from-non-lambda-resources)
- [논람다 리소스에서 로그 수집](#collect-logs-from-non-lambda-resources)
- [논람다 리소스에서 트레이스 수집](#collect-traces-from-non-lambda-resources)
- [로그에서 정보 필터링 또는 스크러빙](#filter-or-scrub-information-from-logs)
- [로그 수집 활성화/비활성화](#enabledisable-log-collection)
- [로그 변환 및 파싱](#parse-and-transform-logs)
- [Datadog 트레이서 구성](#configure-the-datadog-tracer)
- [APM 스팬 수집용 샘플 속도 선택](#select-sampling-rates-for-ingesting-apm-span)
- [트레이스에서 민감한 정보 필터링 또는 스크러빙](#filter-or-scrub-sensitive-information-from-traces)
- [트레이스 수집 활성화/비활성화](#enabledisable-trace-collection)
- [로그와 트레이스 연결](#connect-logs-and-traces)
- [오류를 소스 코드에 연결](#link-errors-to-your-source-code)
- [커스텀 메트릭 제출](#submit-custom-metrics)
- [Datadog에 OpenTelemetry 데이터 전송](#send-opentelemetry-data-to-datadog)
- [프로파일링 데이터 수집 (퍼블릭 베타)](#collect-profiling-data-public-beta)
- [PrivateLink나 프록시를 통해 텔레메트리 전송](#send-telemetry-over-privatelink-or-proxy)
- [다중 Datadog 조직에 텔레메트리 전송](#send-telemetry-to-multiple-datadog-organizations)
- [AWS 리소스를 통한 트레이스 컨텍스트 전파](#propagate-trace-context-over-aws-resources)
- [X-Ray 및 Datadog 트레이스 병합](#merge-x-ray-and-datadog-traces)
- [AWS Lambda 코드 서명 활성화](#enable-aws-lambda-code-signing)
- [Datadog Lambda 확장으로 마이그레이션](#migrate-to-the-datadog-lambda-extension)
- [Datadog Lambda 확장을 사용하여 x86에서 arm64로 마이그레이션](#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension)
- [로컬 테스트용 Datadog Lambda 확장 구성](#configure-the-datadog-lambda-extension-for-local-testing)
- [문제 해결](#troubleshoot)
- [더 알아보기](#further-reading)

### 보안
- [위협 탐지를 활성화하여 공격 시도 주시](#enable-threat-detection-to-observe-attack-attempts)

### 기타
- [태그를 사용하여 텔레메트리 연결](#connect-telemetry-using-tags)
- [요청 및 응답 페이로드 수집](#collect-the-request-and-response-payloads)
- [논람다 리소스에서 메트릭 수집](#collect-metrics-from-non-lambda-resources)
- [논람다 리소스에서 로그 수집](#collect-logs-from-non-lambda-resources)
- [논람다 리소스에서 트레이스 수집](#collect-traces-from-non-lambda-resources)
- [로그에서 정보 필터링 또는 스크러빙](#filter-or-scrub-information-from-logs)
- [로그 수집 비활성화](#disable-logs-collection)
- [로그 변환 및 파싱](#parse-and-transform-logs)
- [Datadog 트레이서 구성](#configure-the-datadog-tracer)
- [APM 스팬 수집용 샘플 속도 선택](#select-sampling-rates-for-ingesting-apm-span)
- [트레이스에서 민감한 정보 필터링 또는 스크러빙](#filter-or-scrub-sensitive-information-from-traces)
- [트레이스 수집 비활성화](#disable-trace-collection)
- [로그와 트레이스 연결](#connect-logs-and-traces)
- [오류를 소스 코드에 연결](#link-errors-to-your-source-code)
- [커스텀 메트릭 제출](#submit-custom-metrics)
- [Datadog에 OpenTelemetry 데이터 전송](#send-opentelemetry-data-to-datadog)
- [PrivateLink나 프록시를 통해 텔레메트리 전송](#send-telemetry-over-privatelink-or-proxy)
- [다중 Datadog 조직에 텔레메트리 전송](#send-telemetry-to-multiple-datadog-organizations)
- [AWS 리소스를 통한 트레이스 컨텍스트 전파](#propagate-trace-context-over-aws-resources)
- [X-Ray 및 Datadog 트레이스 병합](#merge-x-ray-and-datadog-traces)
- [AWS Lambda 코드 서명 활성화](#enable-aws-lambda-code-signing)
- [Datadog Lambda 확장으로 마이그레이션](#migrate-to-the-datadog-lambda-extension)
- [Datadog Lambda 확장을 사용하여 x86에서 arm64로 마이그레이션](#migrating-between-x86-to-arm64-with-the-datadog-lambda-extension)
- [로컬 테스트용 Datadog Lambda 확장 구성](#configure-the-datadog-lambda-extension-for-local-testing)
- [문제 해결](#troubleshoot)
- [더 알아보기](#further-reading)

## 위협 탐지를 활성화하여 공격 시도를 주시하세요

서버리스 애플리케이션을 공격하려는 시도에 대한 알림을 받고 신속하게 대응하세요.

시작하려면 먼저 함수가 [추적 활성화][43]되어 있는지 확인하세요.

위협 모니터링을 활성화하려면 언어에 따라 다음 환경 변수를 추가하세요:
   ```yaml
   environment:
     DD_SERVERLESS_APPSEC_ENABLED: true
   ```
   **Go 함수 전용**의 경우 다음을 추가하세요:
   ```yaml
   environment:
     DD_UNIVERSAL_INSTRUMENTATION: true
   ```
   **NodeJS 또는 파이썬 함수**의 경우 다음을 추가하세요;
   ```yaml
   environment:
     DD_EXPERIMENTAL_ENABLE_PROXY: true
     AWS_LAMBDA_EXEC_WRAPPER: /opt/datadog_wrapper
   ```

함수를 다시 배포하고 호출합니다. 몇 분 후에 [ASM 화면][3]에 표시됩니다.

[3]: https://app.datadoghq.com/security/appsec?column=time&order=desc

애플리케이션 보안 관리 위협 탐지 기능이 실제로 작동하는지 확인하려면 알려진 공격 패턴을 애플리케이션에 전송하세요. 예를 들어, [보안 스캐너 공격][44] 시도를 트리거하려면 다음과 같은 `acunetix-product` 값이 포함된 HTTP 헤더를 전송합니다:
   ```sh
   curl -H 'My-ASM-Test-Header: acunetix-product' https://<YOUR_FUNCTION_URL>/<EXISTING_ROUTE>
   ```
애플리케이션을 활성화하고 공격 패턴을 전송한 뒤 몇 분 후 **위협 정보가 [애플리케이션 신호 탐색기][41]**에 표시됩니다.

## 태그를 활용해 텔레메트리 연결

예약(`env`, `service`, `version`) 및 사용자 지정 태그를 사용하여 Datadog 텔레메트리에 함께 연결합니다. 해당 태그를 사용하여 메트릭, 트레이스 및 로그를 원활하게 탐색할 수 있습니다. 적용한 설치 방법에 따른 추가 파라미터를 추가합니다.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

최신 버전의 [Datadog CLI][1]를 사용 중인지 확인하고 올바른 추가 인수를 사용하여 다음과 같이 `datadog-ci lambda instrument` 명령을 실행합니다:

```sh
datadog-ci lambda instrument \
    --env dev \
    --service web \
    --version v1.2.3 \
    --extra-tags "team:avengers,project:marvel"
    # ... 함수 이름과 같은 기타 필수 인수
```

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

최신 버전의 [Datadog 서버리스 플러그인][1]을 사용 중인지 확인하고 다음과 같이 `env`, `service`, `version`, `tags` 파라미터를 사용하여 태그를 적용합니다:

```yaml
custom:
  datadog:
    # ...  Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    env: dev
    service: web
    version: v1.2.3
    tags: "team:avengers,project:marvel"
```

`env` 및 `service`을 정의하지 않으면 플러그인은 서버리스 애플리케이션 정의의 `stage` 및 `service` 값을 자동으로 디폴트값으로 사용합니다. 해당 기능을 비활성화하려면 `enableTags`를 `false`로 설정합니다.

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

최신 버전의 [Datadog 서버리스 매크로][1]를 사용 중인지 확인하고 다음과 같이 `env`, `service`, `version`, `tags` 파라미터를 사용하여 태그를 적용합니다:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
      env: dev
      service: web
      version: v1.2.3
      tags: "team:avengers,project:marvel"
```

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

최신 버전의 [Datadog 서버리스 cdk 컨스트럭트][1]를 사용 중인지 확인하고 다음과 같이 `env`, `service`, `version`, `tags` 파라미터를 사용하여 태그를 적용합니다:

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    env: "dev",
    service: "web",
    version: "v1.2.3",
    tags: "team:avengers,project:marvel"
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "Others" %}}

[Datadog Lambda 확장][1]을 사용하여 Lambda 함수로부터 텔레메트리를 수집하는 경우, 다음과 같이 Lambda 함수에서 환경 변수를 설정합니다.
- DD_ENV: dev
- DD_SERVICE: web
- DD_VERSION: v1.2.3
- DD_TAGS: team:avengers,project:marvel

[Datadog Forwarder Lambda 함수][2]를 사용하여 Lambda 함수로부터 텔레메트리를 수집하는 경우, Lambda 함수에서 `env`, `service`, `version` 및 추가 태그를 AWS 리소스 태그로 설정합니다. `DdFetchLambdaTags` 옵션이 Datadog Forwarder의 CloudFormation 스택에서 `true`로 설정되어 있는지 확인합니다. 해당 옵션은 버전 3.19.0부터 기본값이 true입니다.

[1]: /ko/serverless/libraries_integrations/extension/
[2]: /ko/serverless/libraries_integrations/forwarder/
{{% /tab %}}
{{< /tabs >}}

아울러, Datadog은 몇 분의 지연 시간만으로 Lambda 함수에 정의된 기존 AWS 리소스 태그를 사용하여 수집한 텔레메트리를 보강할 수 있습니다.

- [Datadog Lambda 확장][2]을 사용하여 Lambda 함수에서 텔레메트리를 수집하는 경우, [Datadog AWS 통합][3]을 활성화하세요. 본 기능으로 **사용자 지정** 태그를 사용하여 텔레메트리를 강화합니다. Datadog 예약 태그(`env`, `service`, `version`)는 해당 환경 파라미터(각`DD_ENV`, `DD_SERVICE`, `DD_VERSION`)로 설정해야 합니다. 예약 태그는 서버리스 개발 툴과 Datadog 통합에서 제공하는 파라미터를 사용하여 설정할 수도 있습니다. 해당 기능은 컨테이너 이미지와 함께 배포된 Lambda 함수에서는 작동하지 않습니다.

- [Datadog Forwarder Lambda 함수][4]를 사용하여 Lambda 함수로부터 텔레메트리를 수집하는 경우,  `DdFetchLambdaTags` 옵션을 Datadog Forwarder의 CloudFormation 스택에서 `true`로 설정합니다. 해당 옵션은 버전 3.19.0부터 기본값이 true입니다.

## 요청 및 응답 페이로드 수집

<div class="alert alert-info">본 기능은 파이썬(Python), Node.js, Go, 자바(Java), .NET에서 지원됩니다.</div>

Datadog은 [AWS Lambda 함수의 JSON 요청 및 응답 페이로드를 수집하고 시각화하여][5] 서버리스 애플리케이션에 대한 심층적인 인사이트를 제공하며, Lambda 함수 오류를 해결하는 데 도움을 드릴 수 있습니다.

본 기능은 기본적으로 비활성화되어 있습니다. 적용되는 설치 방법은 하단의 지침을 참조하세요.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

최신 버전의 [Datadog CLI][1]를 사용 중인지 확인하고 다음과 같이 추가 `--capture-lambda-payload' 인수를 사용하여 `datadog-ci lambda instrument`명령을 실행합니다:

```sh
datadog-ci lambda instrument \
    --capture-lambda-payload true
    # ... 함수 이름과 같은 기타 필수 인수
```

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/cli
{{% /tab %}}
{{% tab "Serverless Framework" %}}

최신 버전의 [Datadog 서버리스 플러그인][1]을 사용 중인지 확인하고 다음과 같이 `captureLambdaPayload`를 `true`로 설정합니다:

```yaml
custom:
  datadog:
    # ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/plugin
{{% /tab %}}
{{% tab "AWS SAM" %}}

최신 버전의 [Datadog 서버리스 매크로][1]를 사용 중인지 확인하고 다음과 같이 `captureLambdaPayload` 파라미터를 `true`로 설정합니다:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
      captureLambdaPayload: true
```

[1]: https://docs.datadoghq.com/ko/serverless/serverless_integrations/macro
{{% /tab %}}
{{% tab "AWS CDK" %}}

최신 버전의 [Datadog 서버리스 cdk 컨스트럭트][1]를 사용 중인지 확인하고 다음과 같이 `captureLambdaPayload` 파라미터를 `true`로 설정합니다:

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ...  Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    captureLambdaPayload: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

[1]: https://github.com/DataDog/datadog-cdk-constructs
{{% /tab %}}
{{% tab "Others" %}}

Lambda 함수에서 환경 변수 `DD_CAPTURE_LAMBDA_PAYLOAD`를 `true`로 설정합니다.

{{% /tab %}}
{{< /tabs >}}

요청 또는 응답 JSON 객체 내부의 민감한 데이터가 Datadog으로 전송되지 않도록 하려면 특정 파라미터를 스크러빙합니다.

해당 작업을 하려면, Lambda 함수 코드와 동일한 폴더에 `datadog.yaml` 파일을 새로 추가합니다. 그런 다음, 아래와 같이  `datadog.yaml`의 `apm_config` 설정 내 [replace_tags 블록][6]을 사용해 Lambda 페이로드의 필드를 난독화할 수 있습니다:

```yaml
apm_config:
  replace_tags:
    # 태그에서 "foobar"가 포함된 모든 항목을 "REDACTED"로 변경:
    - name: "*"
      pattern: "foobar"
      repl: "REDACTED"
    # 요청 헤더에서 "auth"를 빈 문자열로 변경
    - name: "function.request.headers.auth"
      pattern: "(?s).*"
      repl: ""
    # 응답 페이로드의 "apiToken"를 "****"로 변경
    - name: "function.response.apiToken"
      pattern: "(?s).*"
      repl: "****"
```

또는 다음과 같이 Lambda 함수에 `DD_APM_REPLACE_TAGS` 환경 변수를 삽입하여 특정 필드를 난독화할 수도 있습니다:

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

## 논람다 리소스에서 메트릭 수집

Datadog은 실시간 [Datadog Lambda  강화 메트릭][7]을 수집하는 것 외에도, [API 게이트웨이][8], [AppSync][9], [SQS][10]와 같은 AWS 관리 리소스에 대한 메트릭을 수집하여 전체 서버리스 애플리케이션을 모니터링할 수 있도록 도와드립니다. 또한 메트릭은 해당 AWS 리소스 태그를 통해 더욱 강력해집니다.

해당 메트릭을 수집하려면 [Datadog AWS 통합][3]을 설정하세요.

## 논람다 리소스에서 로그 수집

AWS Lambda 함수 이외의 관리 리소스에서 생성된 로그는 서버리스 애플리케이션의 오류의 근본 원인을 파악하는 데 유용할 수 있습니다. Datadog은 사용자 환경의 AWS 관리형 리소스에서 다음과 같은 [로그를 수집][11]할 것을 권장합니다:
- API: API Gateway, AppSync, ALB
- 쿼리 & 스트림: SQS, SNS, Kinesis
- 데이터 저장: DynamoDB, S3, RDS

## 논람다 리소스에서 트레이스 수집

<div class="alert alert-info">본 기능은 현재 파이썬(Python), Node.js, 자바(Java), .NET에서 지원됩니다.</div>

Datadog은 Lambda 함수를 트리거하는 AWS 관리 리소스로 들어오는 Lambda 이벤트를 기반으로 APM 스팬을 추론할 수 있습니다. 이를 통해 AWS 관리 리소스 간의 관계를 시각화하고 서버리스 애플리케이션의 성능 문제를 식별할 수 있도록 도와드립니다. 자세한 내용은 [추가 제품 세부 정보][12]를 참조하세요.

현재 지원되는 리소스는 다음과 같습니다.

- API Gateway (REST API, HTTP API, WebSocket)
- 함수 URL
- SQS
- SNS (SQS를 통해 전송되는 SNS 메시지도 지원)
- Kinesis Streams (데이터가 JSON 문자열 또는 base64로 인코딩된 JSON 문자열인 경우)
- EventBridge (커스텀 이벤트, 여기서 `Details`는 JSON 문자열을 뜻함)
- S3
- DynamoDB

이 기능을 비활성화하려면 `DD_TRACE_MANAGED_SERVICES`를 `false`로 설정합니다.

### DD_SERVICE_MAPPING

`DD_SERVICE_MAPPING`는 업스트림 논람다  [서비스 이름][46]의 이름을 변경하는 환경 변수입니다. `old-service:new-service`과 한 쌍으로 동작합니다.

#### Syntax

`DD_SERVICE_MAPPING=key1:value1,key2:value2`...

해당 변수와 상호 작용하는 방법은 다음 두 가지가 있습니다:

#### 해당 유형의 모든 서비스 이름 변경하기

AWS Lambda 통합과 관련된 모든 업스트림 서비스의 이름을 변경하려면 다음의 식별자를 사용합니다:

| AWS 람다 통합 | DD_SERVICE_MAPPING 값 |
|---|---|
| `lambda_api_gateway` | `"lambda_api_gateway:newServiceName"` |
| `lambda_sns` | `"lambda_sns:newServiceName"` |
| `lambda_sqs` | `"lambda_sqs:newServiceName"` |
| `lambda_s3` | `"lambda_s3:newServiceName"` |
| `lambda_eventbridge` | `"lambda_eventbridge:newServiceName"` |
| `lambda_kinesis` | `"lambda_kinesis:newServiceName"` |
| `lambda_dynamodb` | `"lambda_dynamodb:newServiceName"` |
| `lambda_url` | `"lambda_url:newServiceName"` |

#### 특정 서비스 이름 변경

보다 세분화된 접근법을 취하고 싶다면 다음과 같은 서비스별 식별자를 사용하세요:

| 서비스 | 식별자 | DD_SERVICE_MAPPING 값 |
|---|---|---|
| API Gateway | API ID | `"r3pmxmplak:newServiceName"` |
| SNS | 주제 이름 | `"ExampleTopic:newServiceName"` |
| SQS | 큐 이름 | `"MyQueue:newServiceName"` |
| S3 | 버킷 이름 | `"example-bucket:newServiceName"` |
| EventBridge | 이벤트 소스 | `"eventbridge.custom.event.sender:newServiceName"` |
| Kinesis | 스트림 이름 | `"MyStream:newServiceName"` |
| DynamoDB | 테이블 이름 | `"ExampleTableWithStream:newServiceName"` |
| Lambda URL | API ID | `"a8hyhsshac:newServiceName"` |

#### 설명이 첨부된 예시

| 명령어 | 설명 |
|---|---|
| `DD_SERVICE_MAPPING="lambda_api_gateway:new-service-name"` | 모든 `lambda_api_gateway` 업스트림 서비스의 이름을 `new-service-name`로 변경 |
| `DD_SERVICE_MAPPING="08se3mvh28:new-service-name"` | 특정 업스트림 서비스`08se3mvh28.execute-api.eu-west-1.amazonaws.com`의 이름을 `new-service-name`로 변경 |

다운스트림 서비스의 이름을 변경하려면 [트레이서 구성 문서][45]의 `DD_SERVICE_MAPPING`을 참조하세요.

## 로그에서 정보 필터링 또는 스크러빙

`START`, `END` 로그를 제외하려면 환경 변수 `DD_LOGS_CONFIG_PROCESSING_RULES`를 `[{"type": "exclude_at_match", "name": "exclude_start_and_end_logs", "pattern": "(START|END) RequestId"}]` 로 설정합니다. 또는 프로젝트 루트 디렉터리에 다음 내용이 포함된 `datadog.yaml` 파일을 추가합니다:

```yaml
logs_config:
  processing_rules:
    - type: exclude_at_match
      name: exclude_start_and_end_logs
      pattern: (START|END) RequestId
```

Datadog은 서버리스 함수 보기에서 호출 목록을 채우는 데 사용되는 `REPORT` 로그를 보관할 것을 권장합니다.

기타 로그를 Datadog으로 보내기 전에 스크러빙 또는 필터링하려면 [고급 로그 수집][13]을 참조하세요.

## 로그 수집 활성화/비활성화

Datadog Lambda 확장 프로그램을 사용한 로그 수집은 기본으로 활성화되어 있습니다.

{{< tabs >}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    enableDDLogs: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
      enableDDLogs: true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    enableDatadogLogs: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Others" %}}

Lambda 함수에서 환경 변수 `DD_SERVERLESS_LOGS_ENABLED`를 `true`로 설정합니다.

{{% /tab %}}
{{< /tabs >}}

#### 로그 수집 비활성화

Datadog Forwarder Lambda 함수를 사용한 로그 수집을 중단하려면, Lambda 함수의 CloudWatch 로그 그룹에서 구독 필터를 삭제합니다.

Datadog Lambda 확장 프로그램을 사용한 로그 수집을 중단하려면, 적용되는 설치 방법에 대한 하단의 지침을 참조하세요:

{{< tabs >}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    enableDDLogs: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
      enableDDLogs: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    enableDatadogLogs: false
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Others" %}}

Lambda 함수에서 환경 변수 `DD_SERVERLESS_LOGS_ENABLED`를 `false`로 설정합니다.

{{% /tab %}}
{{< /tabs >}}

더 자세한 정보를 확인하려면 [로그 관리][7] 지침을 참조하세요.

## 로그 파싱 및 변환

Datadog에서 로그를 파싱 및 변환하려면 [Datadog 로그 파이프라인][14] 문서를 참조하세요.

## Datadog 트레이서 구성

Datadog APM 클라이언트가 자동으로 계측하는 라이브러리 및 프레임워크를 확인하려면 [APM 호환성 요구 사항][15]을 참조합니다. 사용자 지정 애플리케이션을 계측하려면 [커스텀 계측][16]에 관한 Datadog의 APM 지침을 확인하세요.

## APM 스팬 수집용 샘플링 속도 선택

서버리스 함수용  [APM 호출 트레이스 샘플링 속도][17]를 관리하려면 함수의 `DD_TRACE_SAMPLE_RATE` 환경 변수를 0.000(Lambda 함수 호출 트레이스 없음)에서 1.000(모든 Lambda 함수 호출 트레이스) 사이의 값으로 설정합니다.

메트릭은 애플리케이션 트래픽의 100%를 기준으로 산출되며, 샘플링 구성에 관계없이 정확성을 유지합니다.

처리량이 많은 서비스의 경우, 트레이싱 데이터가 고빈도로 반복되기 때문에 대개 모든 요청을 수집할 필요가 없습니다. 상당히 중요한 문제의 경우 항상 여러 트레이스에서 그 증상을 나타냅니다. 이러한 [수집 관리][18]는 예산 범위 내에서 문제를 해결하는 데 필요한 가시성을 확보하도록 도와드립니다.

데이터 수집을 위한 기본 샘플링 메커니즘을 [헤드 기반 샘플링][19]이라고 합니다. 트레이스를 유지할지 중단할지 여부는 트레이스의 맨 처음, 루트 스팬의 시작 지점에서 결정됩니다. 그런 다음 해당 결정은 요청 컨텍스트의 일부로 다른 서비스(예: HTTP 요청 헤더)로 전파됩니다. 트레이스의 시작 부분에서 결정이 내려지고 해당 결정이 트레이스의 모든 부분에 전달되기 때문에 루트 서비스에서 샘플링 속도를 설정해야 적용이 가능합니다.

Datadog이 스팬을 수집한 후, Datadog Intelligent Retention 필터는 애플리케이션의 상태를 모니터링하는 데 도움이 되도록 트레이스의 일부를 인덱스화합니다. 아울러, 사용자 지정 [보존 필터][20]를 정의하여 조직의 목표 달성을 위해 더 오래 보관하려는 트레이스 데이터를 인덱스화할 수도 있습니다.

[Datadog 트레이스 파이프라인][21]에 대해 더 자세히 알아보세요.

## 트레이스에서 민감한 정보 필터링 또는 스크러빙

트레이스를 Datadog으로 전송하기 전에 필터링하려면 [APM에서 원치 않는 리소스 무시하기][22]를 참조하세요.

데이터 보안을 위해 트레이스 속성을 스크러빙하려면 [데이터 보안을 위한 Datadog 에이전트 또는 트레이서 구성][23]을 참조하세요.

## 트레이스 수집 활성화/비활성화

Datadog Lambda 확장 프로그램을 사용한 트레이스 수집은 기본으로 활성화되어 있습니다.

Lambda  함수에서 트레이스 수집을 시작하려면 다음과 같은 설정을 적용하세요:

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing true
    # ... 함수 이름과 같은 기타 필수 인수
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
      enableDDTracing: true
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    enableDatadogTracing: true
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Others" %}}

Lambda 함수에서 환경 변수 `DD_TRACE_ENABLED`를 `true`로 설정합니다.

{{% /tab %}}
{{< /tabs >}}

#### 트레이스 수집 비활성화

Lambda  함수에서 트레이스 수집을 중단하려면 다음과 같은 설정을 적용하세요:

{{< tabs >}}
{{% tab "Datadog CLI" %}}

```sh
datadog-ci lambda instrument \
    --tracing false
    # ... 함수 이름과 같은 기타 필수 인수
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

```yaml
custom:
  datadog:
    # ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters:
      # ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
      enableDDTracing: false
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

```typescript
const datadog = new Datadog(this, "Datadog", {
    // ... Datadog 사이트 및 API 키와 같은 기타 필수 파라미터
    enableDatadogTracing: false
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>]);
```

{{% /tab %}}
{{% tab "Others" %}}

Lambda 함수에서 환경 변수 `DD_TRACE_ENABLED`를 `false`로 설정합니다.

{{% /tab %}}
{{< /tabs >}}

## 로그 및 트레이스 연결

트레이스 및 로그를 수집하기 위해 [Lambda 확장][2]을 사용하는 경우, Datadog은 `request_id` 태그 아래의 `aws.lambda` 스팬에 AWS Lambda 요청 ID를 자동으로 추가합니다. 아울러, 동일한 요청에 대한 Lambda 로그가 `lambda.request_id` 속성 아래에 추가됩니다. Datadog 트레이스 및 로그 보기는 AWS Lambda 요청 ID를 사용하여 연결합니다.

[Forwarder Lambda 함수][4]를 사용하여 추적 및 로그를 수집하는 경우, `dd.trace_id` 가 자동으로 로그에 삽입됩니다(환경 변수 `DD_LOGS_INJECTION`로 활성화됨). Datadog 트레이스 및 로그 보기는 Datadog 추적 ID를 사용하여 연결합니다. 해당 기능은 주로 사용되는 런타임 및 로거를 활용하는 대부분의 애플리케이션에서 지원됩니다([런타임별 지원][24] 참조).

지원하지 않는 런타임 또는 커스텀 로거를 사용하는 경우 다음 지침을 따르세요:
- JSON으로 로그인할 때, 다음과 같이 `dd-trace`을 사용하여 Datadog 트레이스 ID를 불러와 `dd.trace_id` 필드 아래에 있는 로그에 추가합니다:
    ```javascript
    {
      "message": "This is a log",
      "dd": {
        "trace_id": "4887065908816661012"
      }
      // ... the rest of your log
    }
    ```
- 플레인 텍스트로 로그인 시에는 다음 지침에 따릅니다:
    1. `dd-trace`을 사용하여 Datadog 트레이스 ID를 불러와 로그에 추가합니다.
    2. 기본 Lambda 로그 파이프라인을 복제합니다. 해당 파이프라인은 읽기 전용입니다.
    3. 복제한 파이프라인을 활성화하고 기본 파이프라인을 비활성화합니다.
    4. 복제한 파이프라인의 [Grok 파서][25] 규칙을 업데이트하여 Datadog 트레이스 ID를 `dd.trace_id` 특성으로 파싱합니다. 예를 들어, `[INFO] dd.trace_id=4887065908816661012 My log message`과 같은 로그에 대해 `my_rule \[%{word:level}\]\s+dd.trace_id=%{word:dd.trace_id}.*` 규칙을 적용합니다.

## 소스 코드에 오류 연결

<div class="alert alert-info">본 기능은 Go, 자바(Java), 파이썬(Python), 자바스크립트(Javascript)에서 지원됩니다.</div>

[Datadog 소스 코드 통합][26]을 사용하면 텔레메트리(예: 스택 트레이스)를 GitHub의 Lambda 함수 소스 코드에 연결할 수 있습니다. 해당 기능을 활성화하려면 아래 지침을 따르세요. **참고**: 원격보다 복잡하거나 상위에 있지 않은 로컬 Git 리포지토리에서 배포해야 합니다.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

`datadog-ci lambda instrument`을 `--source-code-integration=true` 로 실행하면 현재 로컬 디렉터리의 Git 메타데이터를 자동으로 전송하고 Lambda 함수에 필요한 태그를 추가합니다.

**참고**: `datadog-ci`에 환경 변수 `DATADOG_API_KEY` 를 설정해야 Git 메타데이터를 업로드할 수 있습니다. 아울러, `DATADOG_API_KEY_SECRET_ARN`이 정의되어 있지 않은 경우 Lambda 함수에서 텔레메트리를 전송하도록 `DATADOG_API_KEY`가 설정되며, 이는 `DATADOG_API_KEY`보다 우선합니다.


```sh
# ... DATADOG_SITE와 같은 기타 필수 환경 변수

# git metadata 업로드 시 필수 조건
export DATADOG_API_KEY=<DATADOG_API_KEY>

# 선택 조건이며, 정의되지 않은 경우 DATADOG_API_KEY가 사용됨
export DATADOG_API_KEY_SECRET_ARN=<DATADOG_API_KEY_SECRET_ARN>

datadog-ci lambda instrument \
    --source-code-integration=true
    # ... 함수 이름과 같은 기타 필수 인수
```
{{% /tab %}}
{{% tab "Serverless Framework" %}}

`enableSourceCodeIntegration`를 `true`로 설정하면, Datadog 서버리스 플러그인이 자동으로 현재 로컬 디렉터리에 있는 Git 메타데이터를 전송하고 Lambda 함수에 필요한 태그를 추가합니다.

**참고**: 플러그인이 Git 메타데이터를 업로드하려면 `apiKey` 파라미터를 반드시 설정해야 합니다. 아울러, `apiKeySecretArn` 가 정의되어 있지 않은 경우 Lambda 함수에서 텔레메트리를 전송하도록 `apiKey`가 설정되며, 이는 `apiKey`보다 우선합니다.

```yaml
custom:
  datadog:
    # ... such as the Datadog 사이트와 같은 기타 필수 파라미터
    apiKey: <apiKey> # git metadata 업로드를 위한 필수 조건
    apiKeySecretArn: <apiKeySecretArn> # 선택 조건이며 정의되지 않은 경우 apiKey가 사용됨
    enableSourceCodeIntegration: true # 기본값은 true로 설정
```

{{% /tab %}}
{{% tab "AWS CDK" %}}

다음과 같이 초기화 함수를 변경하여 gitHash 값을 CDK 스택에 전달합니다:

```typescript
async function main() {
  // 패키지 매니저로 @datadog/datadog-ci를 추가합니다.
  const datadogCi = require("@datadog/datadog-ci");
  const gitHash = await datadogCi.gitMetadata.uploadGitCommitHash('{Datadog_API_Key}', '<SITE>')

  const app = new cdk.App();
  // ExampleStack 생성자에 해시를 전달합니다.
  new ExampleStack(app, "ExampleStack", {}, gitHash);
}
```

스택 생성자에서 선택 `gitHash` 파라미터를 추가하고 `addGitCommitMetadata()`을 호출합니다:

```typescript
export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps, gitHash?: string) {
    ...
    ...
    datadog.addGitCommitMetadata([<YOUR_FUNCTIONS>], gitHash)
  }
}
```

{{% /tab %}}
{{% tab "Others" %}}

1. Lambda 함수에서 환경 변수 `DD_TAGS="git.commit.sha:<GIT_COMMIT_SHA>,git.repository_url=<REPOSITORY_URL>"` 를 설정합니다.
2. CI 파이프라인에서 [datadog-ci git-metadata 업로드][1]를 실행하여 Git 메타데이터를 업로드합니다.
3. 선택 사항으로, 인라인 소스 코드 스니펫을 표시하려면 [GitHub 앱을 설치][2]하세요.

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}
{{< /tabs >}}

## 커스텀 메트릭 제출

[커스텀 메트릭 제출][27]로 커스텀 비즈니스 로직을 모니터링할 수 있습니다.

## Datadog에 OpenTelemetry 데이터 전송하기

1. OpenTelemetry가 [Datadog Lambda 확장][40]에 스팬을 내보내도록 명령하세요.

   ```js
   // instrument.js

   const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
   const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
   const { Resource } = require('@opentelemetry/resources');
   const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');
   const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');

   const provider = new NodeTracerProvider({
      resource: new Resource({
          [ SemanticResourceAttributes.SERVICE_NAME ]: 'rey-app-otlp-dev-node',
      })
   });

   provider.addSpanProcessor(
      new SimpleSpanProcessor(
          new OTLPTraceExporter(
              { url: 'http://localhost:4318/v1/traces' },
          ),
      ),
   );
   provider.register();
   ```
2. AWS Lambda에 대한 OpenTelemetry의 계측값을 추가합니다. 해당 작업은 트레이싱 레이어를 추가하는 것과 비슷합니다.
   ```js
   // instrument.js

   const { AwsInstrumentation } = require('@opentelemetry/instrumentation-aws-sdk');
   const { AwsLambdaInstrumentation } = require('@opentelemetry/instrumentation-aws-lambda');
   const { registerInstrumentations } = require('@opentelemetry/instrumentation');

   registerInstrumentations({
      instrumentations: [
          new AwsInstrumentation({
              suppressInternalInstrumentation: true,
          }),
          new AwsLambdaInstrumentation({
              disableAwsContextPropagation: true,
          }),
      ],
   });

   ```
3. 런타임에 계측을 적용하세요. 예를 들어 Node.js의 경우 `NODE_OPTIONS`을 사용하세요.

   ```yaml
   # serverless.yml

   functions:
     node:
       handler: handler.handler
       environment:
         NODE_OPTIONS: --require instrument
   ```

4. `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT` 또는 `DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_GRPC_ENDPOINT` 환경 변수를 사용하여 OpenTelemetry를 활성화합니다. Datadog 확장 v41 이상 버전을 추가합니다. Datadog 트레이스 레이어는 추가하지 마세요.

   ```yaml
   # serverless.yml

   provider:
     name: aws
     region: sa-east-1
     runtime: nodejs18.x
     environment:
       DD_API_KEY: ${env:DD_API_KEY}
       DD_OTLP_CONFIG_RECEIVER_PROTOCOLS_HTTP_ENDPOINT: localhost:4318
     layers:
       - arn:aws:lambda:sa-east-1:464622532012:layer:Datadog-Extension:{{< latest-lambda-layer-version layer="extension" >}}
   ```

5. 배포.

## 프로파일링 데이터 수집(공개 베타)

Datadog의 [연속 프로파일러][42]는 파이썬(Python) 버전 4.62.0 및 레이어 버전 62 이하에서 베타 버전으로 사용할 수 있습니다. 해당 옵션 기능은 `DD_PROFILING_ENABLED` 환경 변수를 `true`로 설정하여 활성화합니다.

연속 프로파일러는 실행 중인 모든 파이썬(Python) 코드의 CPU 및 힙의 스냅샷을 주기적으로 생성하는 스레드를 생성하는 방식으로 동작합니다. 여기에는 프로파일러 자체가 포함될 수 있습니다. 프로파일러 자체를 무시하려면 `DD_PROFILING_IGNORE_PROFILER`을 `true`으로 설정합니다.

## PrivateLink 또는 프록시로 텔레메트리 전송하기

Datadog Lambda 확장 프로그램이 데이터를 Datadog으로 전송하려면 공용 인터넷에 접근해야 합니다. 공용 인터넷에 접근할 수 없는 VPC에서 Lambda 함수를 배포한 경우, `datadoghq.com` [Datadog 사이트][29]로 [AWS PrivateLink를 통해 데이터를 전송][28]하거나, 나머지 모든 사이트의 경우 [프록시를 통해][30] 데이터를 전송할 수 있습니다.

Datadog 포워더(Forwarder)를 사용하는 경우 다음 [지침][31]을 따르세요.

## 여러 Datadog 조직에 텔레메트리 전송

여러 조직에 데이터를 전송하려면 플레인 텍스트 API 키, AWS Secrets Manager 또는 AWS KMS를 사용하여 이중 전송 옵션을 활성화할 수 있습니다.

{{< tabs >}}
{{% tab "Plaintext API Key" %}}

Lambda 함수에서 다음 환경 변수를 설정하여 플레인 텍스트 API 키를 사용하여 이중 전송을 활성화합니다.

```bash
# 메트릭 이중 전송 활성화
DD_ADDITIONAL_ENDPOINTS={"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}
# APM (트레이스) 이중 전송 활성화
DD_APM_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# APM (프로파일링) 이중 전송 활성화
DD_APM_PROFILING_ADDITIONAL_ENDPOINTS={"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}
# 로그 이중 전송 활성화
DD_LOGS_CONFIG_USE_HTTP=true
DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS=[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]
```

{{% /tab %}}
{{% tab "AWS Secrets Manager" %}}

Datadog 확장 프로그램은 접두사가 `_SECRET_ARN`로 시작하는 모든 환경 변수에 대해 [AWS Secrets Manager][1] 값을 자동으로 검색할 수 있도록 지원합니다. 해당 기능을 사용하여 환경 변수를 Secrets Manager에 안전하게 저장하고 Datadog에 이중 전송할 수 있습니다.

1. Lambda 함수에서 환경 변수`DD_LOGS_CONFIG_USE_HTTP=true`를 설정합니다.
2. `secretsmanager:GetSecretValue` 권한을 Lambda 함수 IAM 역할 권한에 추가합니다.
3. Secrets Manager에서 이중 전송 메트릭 환경 변수를 저장할 새 시크릿을 생성합니다. 콘텐츠는 `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}` 과 유사해야 합니다.
4. Lambda 함수의 환경 변수 `DD_ADDITIONAL_ENDPOINTS_SECRET_ARN`를 위에서 설명한 시크릿의 ARN으로 설정합니다.
5. Secrets Manager에서 이중 전송 APM (트레이스) 환경 변수를 저장할 새 시크릿을 생성합니다. 콘텐츠는 `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`과**유사**해야 합니다.
6. Lambda 함수의 환경 변수 `DD_ADDITIONAL_ENDPOINTS_SECRET_ARN`를 위에서 설명한 시크릿의 ARN과 동일하게 설정합니다.
7. Secrets Manager에서 이중 전송 APM (프로파일링) 환경 변수를 저장할 새 시크릿을 생성합니다. 콘텐츠는 `{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}`과**유사**해야 합니다.
8. Lambda 함수의 환경 변수 `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_SECRET_ARN`를 위에서 설명한 시크릿의 ARN과 동일하게 설정합니다.
9. Secrets Manager에서 이중 전송 로그 환경 변수를 저장할 새 시크릿을 생성합니다. 콘텐츠는 `[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]`과**유사**해야 합니다.
10. Lambda 함수의 환경 변수 `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_SECRET_ARN`를 위에서 설명한 시크릿의 ARN과 동일하게 설정합니다.

[1]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html

{{% /tab %}}
{{% tab "AWS KMS" %}}

Datadog 확장 프로그램은 접두사가 `_KMS_ENCRYPTED`로 시작하는 모든 환경 변수에 대해 [AWS KMS][41] 값을 자동으로 복호화 수 있도록 지원합니다. 해당 기능을 사용하여 환경 변수를 KMS에 안전하게 저장하고 Datadog에 이중 전송할 수 있습니다.

1. Lambda 함수에서 환경 변수`DD_LOGS_CONFIG_USE_HTTP=true`를 설정합니다.
2. `kms:GenerateDataKey` 및 `kms:Decrypt`권한을 Lambda 함수 IAM 역할 권한에 추가합니다.
3. 이중 전송 메트릭의 경우 KMS를 사용하여 `{"https://app.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://app.datadoghq.eu": ["<your_api_key_4>"]}` 를 암호화하고 `DD_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED` 환경 변수를 해당 값과 동일하게 설정합니다.
4. 이중 전송 트레이스의 경우 KMS를 사용하여`{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` 를 암호화하고 `DD_APM_ADDITIONAL_KMS_ENCRYPTED` 환경 변수를 해당 값과 동일하게 설정합니다.
5. 이중 전송 프로파일의 경우 KMS를 사용하여`{"https://trace.agent.datadoghq.com": ["<your_api_key_2>", "<your_api_key_3>"], "https://trace.agent.datadoghq.eu": ["<your_api_key_4>"]}` 를 암호화하고 `DD_APM_PROFILING_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED`환경 변수를 해당 값과 동일하게 설정합니다.
5. 이중 전송 로그의 경우 KMS를 사용하여`[{"api_key": "<your_api_key_2>", "Host": "agent-http-intake.logs.datadoghq.com", "Port": 443, "is_reliable": true}]`를 암호화하고 `DD_LOGS_CONFIG_ADDITIONAL_ENDPOINTS_KMS_ENCRYPTED`환경 변수를 해당 값과 동일하게 설정합니다.

[41]: https://docs.aws.amazon.com/kms/
{{% /tab %}}
{{< /tabs >}}

고급 사용법을 확인하려면 [이중 전송 지침][32]을 참조하세요.

## AWS 리소스를 통한 트레이스 컨텍스트 전파

Datadog은 자동으로 트레이스 컨텍스트를 발신 AWS SDK 요청에 삽입하고 Lambda 이벤트에서 트레이스 컨텍스트를 추출합니다. Datadog은 이러한 기능으로 배포 서비스를 통해 요청 또는 트랜잭션을 트레이싱할 수 있습니다. [서버리스 트레이스 전파][33] 지침을 참조하세요.

## X-Ray 및 Datadog 트레이스 병합

AWS X-Ray는 AppSync 및 Step 함수와 같은 특정 AWS 관리형 서비스를 통한 트레이싱을 지원하며, 이는 데이터독 APM에서 기본 지원되지 않습니다. [Datadog X-Ray 통합][34]을 활성화하고 X-Ray 트레이스를 Datadog 기본 트레이스와 병합할 수 있습니다. 자세한 내용을 보려면 [추가 세부 정보][35]를 참조하세요.

## AWS Lambda 코드 서명 사용

[AWS Lambda 코드 서명][36]은 신뢰할 수 있는 코드만 Lambda 함수에서 AWS로 배포하도록 도와드립니다. 함수에서 코드 서명을 활성화하면 AWS는 배포 시 모든 코드가 코드 서명 설정에서 정의한 신뢰할 수 있는 소스에 의해 서명되었는지 확인합니다.

코드 서명을 사용하도록 Lambda 함수를 설정한 경우, Lambda 함수를 배포하기 전에 Datadog에서 퍼블리싱한 Lambda 레이어를 사용하여 함수의 코드 서명 설정에 Datadog의 서명 프로필 ARN을 추가해야 합니다.

Datadog의 서명 프로필 ARN:

{{< site-region region="us,us3,us5,eu,gov" >}}
```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```
{{< /site-region >}}

{{< site-region region="ap1" >}}
```
arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc
```
{{< /site-region >}}


## Datadog Lambda 확장으로 마이그레이션

Datadog은 [Forwarder Lambda 함수][4] 또는 [Lambda 확장][2]을 사용하여 Lambda 함수에서 모니터링 데이터를 수집할 수 있습니다. Datadog은 신규 설치 시 Lambda 확장을 설치하시길 권장합니다. 확실하지 않다면 [Datadog Lambda 확장으로 마이그레이션 결정하기][37]를 참조하세요.

마이그레이션하려면, [Datadog Lambda 확장 프로그램 사용 설치 지침][1]과 [Datadog Forwarder 사용 지침][38]을 비교해서 확인하세요. 고객님의 편의를 위해 주요 차이점을 하단에 요약해 드리겠습니다.

**참고**: Datadog은 개발 및 스테이징 애플리케이션을 먼저 마이그레이션하고 그 후 제품 애플리케이션을 하나씩 마이그레이션할 것을 권장합니다.

{{< tabs >}}
{{% tab "Datadog CLI" %}}

1. `@datadog/datadog-ci`을 최신 버전으로 업그레이드
2. `--layer-version` 인수를 업데이트하고 런타임 최신 버전으로 설정합니다.
3. `--extension-version ` argument to the latest extension version. The latest extension version is `{{< latest-lambda-layer-version layer="extension" >}}`을 설정합니다.
4. 필수 환경 변수 `DATADOG_SITE` 및 `DATADOG_API_KEY_SECRET_ARN`을 설정합니다.
5. `--forwarder` 인수를 삭제합니다.
6. Forwarder에서 Lambda 로그 그룹으로 자동 구독하도록 Datadog AWS 통합을 설정한 경우, 해당 리전에서 Lambda 함수를 모두 마이그레이션한 후 해당 기능을 비활성화하세요.

{{% /tab %}}
{{% tab "Serverless Framework" %}}

1. `addExtension`을 `false`으로 설정하지 않은 경우,`serverless-plugin-datadog`을 최신 버전으로 업그레이드하여 Datadog Lambda 확장 프로그램을 기본 설치합니다.
2. 필수 파라미터 `site`, `apiKeySecretArn`를 설정합니다.
3. 기존에 Lambda 리소스 태그로 설정한 경우, `env`, `service`, `version` 파라미터를 설정합니다. 확장 기능을 사용할 때 플러그인은 `DD_ENV`와 같은 Datadog 예약 환경 변수를 통해 자동으로 설정됩니다.
4. 논람다 리소스에서 로그를 수집하기 위해 포워더를 유지하려는 경우와 `subscribeToApiGatewayLogs`, `subscribeToHttpApiLogs` 또는 `subscribeToWebsocketLogs`이 `true`로 설정된 경우를 제외하고 `forwarderArn` 파라미터를 삭제합니다.
5. Forwarder에서 Lambda 로그 그룹으로 자동 구독하도록 Datadog AWS 통합을 설정한 경우, 해당 리전에서 Lambda 함수를 모두 마이그레이션한 후 해당 기능을 비활성화하세요.

{{% /tab %}}
{{% tab "AWS SAM" %}}

1. `datadog-serverless-macro` CloudFormation 스택을 업데이트하여 최신 버전을 다운로드합니다.
2. `extensionLayerVersion` 파라미터를 최신 확장 프로그램 버전으로 설정합니다. 최신 확장 프로그램 버전은 `{{< latest-lambda-layer-version layer="extension" >}}`입니다.
3. 필수 파라미터를 `site` 및 `apiKeySecretArn`로 설정합니다.
4. `forwarderArn` 파라미터를 삭제합니다.
5. Forwarder에서 Lambda 로그 그룹으로 자동 구독하도록 Datadog AWS 통합을 설정한 경우, 해당 리전에서 Lambda 함수를 모두 마이그레이션한 후 해당 기능을 비활성화하세요.

{{% /tab %}}
{{% tab "AWS CDK" %}}

1. `datadog-cdk-constructs` 또는 `datadog-cdk-constructs-v2` 을 최신 버전으로 업그레이드합니다.
2. `extensionLayerVersion` 파라미터를 최신 확장 프로그램 버전으로 설정합니다. 최신 확장 프로그램 버전은 `{{< latest-lambda-layer-version layer="extension" >}}`입니다.
3. 필수 파라미터를 `site` 및 `apiKeySecretArn`로 설정합니다.
4. 기존에 Lambda 리소스 태그로 설정한 경우, `env`, `service`, `version` 파라미터를 설정합니다. 확장 기능을 사용할 때 컨스트럭터는 `DD_ENV`와 같은 Datadog 예약 환경 변수를 통해 자동으로 설정됩니다.
5. `forwarderArn` 파라미터를 삭제합니다.
6. Forwarder에서 Lambda 로그 그룹으로 자동 구독하도록 Datadog AWS 통합을 설정한 경우, 해당 리전에서 Lambda 함수를 모두 마이그레이션한 후 해당 기능을 비활성화하세요.

{{% /tab %}}
{{% tab "Others" %}}

1. 런타임용 Datadog Lambda 라이브러리 레이어를 최신 버전으로 업그레이드합니다.
2. 최신 버전의 Datadog Lambda 확장 프로그램을 설치합니다.
3. 필수 환경 변수 `DD_SITE` 및 `DD_API_KEY_SECRET_ARN` 을 설정합니다.
3. 기존에 Lambda 리소스 태그로 설정한 경우, `DD_ENV`, `DD_SERVICE`, `DD_VERSION` 환경 변수를 설정합니다.
4. Lambda 함수의 로그 그룹으로부터 Datadog Forwarder 로그를 스트리밍하는 구독 필터를 삭제합니다.
5. Forwarder에서 Lambda 로그 그룹으로 자동 구독하도록 Datadog AWS 통합을 설정한 경우, 해당 리전에서 Lambda 함수를 모두 마이그레이션한 후 해당 기능을 비활성화하세요.

{{% /tab %}}
{{< /tabs >}}

## Datadog Lambda 확장 프로그램을 사용하여 x86에서 arm64로 마이그레이션하기

Datadog 확장 프로그램은 컴파일된 바이너리이며, x86 및 arm64 변형 버전 모두에서 사용할 수 있습니다. CDK, 서버리스 프레임워크 또는 SAM과 같은 배포 도구를 사용하여 x86 Lambda 함수를 arm64로(또는 arm64에서 x86으로) 마이그레이션하는 경우, 서비스 통합(예: API Gateway, SNS 또는 Kinesis)이 Lambda 함수의 버전 또는 별칭을 사용하도록 설정되어 있는지 확인하세요. 그렇지 않은 경우 배포 중 약 10초 동안 해당 기능을 사용하지 못할 수도 있습니다.

이러한 현상은 Lambda 함수를 x86에서 arm64로 마이그레이션하는 작업이 `updateFunction`와 `updateFunctionConfiguration`라는 두 개의 병렬 API 호출로 구성되기 때문에 발생합니다. 해당 호출 중에는 Lambda `updateFunction` 호출이 완료되고 코드가 새 아키텍처를 사용하도록 업데이트되는 짧은 간격이 존재하나`updateFunctionConfiguration` 호출은 아직 완료되지 않은 상태이므로, 이전 아키텍처가 여전히 확장 프로그램에 적용됩니다.

레이어 버전을 사용할 수 없는 경우, 아키텍처 마이그레이션 프로세스 중에 [Datadog Forwarder][38]를 구성할 것을 권장합니다.


## 로컬 테스트용 Datadog Lambda 확장 구성

Datadog Lambda 확장 프로그램이 설치된 상태에서 로컬로 Lambda 함수의 컨테이너 이미지를 테스트하려면, 로컬 테스트 환경에서 `DD_LOCAL_TEST`을 `true`로 설정해야 합니다. 그렇지 않은 경우 확장 프로그램이 AWS 확장 API의 응답을 기다렸다가 호출을 차단합니다.

## 문제 해결

설치 구성에 문제가 있는 경우, 디버깅 로그를 위해 환경 변수 `DD_LOG_LEVEL`를 `debug`로 설정하세요. 추가 문제 해결 팁을 확인하려면 [서버리스 모니터링 문제 해결 지침][39]를 참조하세요.

## 참고 자료

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
[27]: /ko/serverless/custom_metrics
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