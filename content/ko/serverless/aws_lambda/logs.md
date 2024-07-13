---
kind: 설명서
title: AWS Lambda에서 로그 수집
---

### 논람다 리소스에서 로그 수집

AWS Lambda 함수 이외의 관리 리소스에서 생성된 로그는 서버리스 애플리케이션의 오류의 근본 원인을 파악하는 데 유용할 수 있습니다. Datadog은 사용자 환경의 AWS 관리형 리소스에서 다음과 같은 [로그를 수집][11]할 것을 권장합니다:
- API: API Gateway, AppSync, ALB
- 쿼리 & 스트림: SQS, SNS, Kinesis
- 데이터 저장: DynamoDB, S3, RDS

## 구성

### 로그 수집 활성화

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

### 로그 수집 비활성화

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

### 로그에서 정보 필터링 또는 스크러빙

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

### 로그 파싱 및 변환

Datadog에서 로그를 파싱 및 변환하려면 [Datadog 로그 파이프라인][14] 문서를 참조하세요.

### 로그 및 트레이스 연결

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

[2]: /ko/serverless/libraries_integrations/extension/
[4]: /ko/serverless/libraries_integrations/forwarder/
[11]: /ko/integrations/amazon_web_services/#log-collection
[13]: /ko/agent/logs/advanced_log_collection/
[14]: /ko/logs/log_configuration/pipelines/
[24]: /ko/tracing/other_telemetry/connect_logs_and_traces/
[25]: /ko/logs/log_configuration/parsing/
[47]: /ko/logs/