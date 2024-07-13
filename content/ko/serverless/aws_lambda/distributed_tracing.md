---
aliases:
- /ko/tracing/serverless_functions
- /ko/tracing/setup_overview/serverless_functions/
- /ko/serverless/troubleshooting/serverless_apm_metrics/
- /ko/serverless/distributed_tracing/serverless_trace_merging
- /ko/serverless/distributed_tracing/serverless_trace_propagation
- /ko/serverless/distributed_tracing
further_reading:
- link: /tracing/
  tag: 설명서
  text: Datadog APM 탐색하기
- link: /tracing/trace_search_and_analytics/#live-search-for-15-minutes
  tag: 설명서
  text: 실시간 검색
- link: https://www.datadoghq.com/blog/aws-lambda-tracing-go-java-functions/
  tag: 블로그
  text: Go 및 Java Lambda 함수를 위한 실시간 분산 트레이싱
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: 블로그
  text: 서버리스 보기에서 서버리스 스택 모니터링하기
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: 블로그
  text: AWS 완전 관리형 서비스를 위한 Datadog 서버리스 모니터링
- link: https://www.datadoghq.com/blog/dotnet-lambda-functions-distributed-tracing/
  tag: 블로그
  text: .NET Lambda 함수에 대한 실시간 분산 트레이싱
kind: 설명서
title: AWS Lambda 서버리스 애플리케이션을 통한 분산 트레이싱
---

{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="Trace Serverless Functions" style="width:100%;">}}

Datadog는 서버리스 트레이스를 메트릭에 연결하여 애플리케이션 성능에 대한 풍부한 정보를 제공합니다. 이렇게 하면 서버리스 애플리케이션의 특성인 분산된 환경에서도 성능 문제를 정확하게 해결할 수 있습니다.

Datadog Python, Node.js, Ruby, Go, Java 및 .NET 트레이싱 라이브러리는 AWS Lambda에 대한 분산 트레이싱을 지원합니다.

## 서버리스 애플리케이션에서 트레이스 전송

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Datadog으로 AWS Lambda를 추적하기 위한 아키텍처 다이어그램" >}}

Datadog Python, Node.js, Ruby, Go, Java 및 .NET 트레이싱 라이브러리는 AWS Lambda에 대한 분산 트레이싱을 지원합니다. [설치 지침][5]을 사용하여 트레이서를 설치할 수 있습니다. 확장 프로그램이 이미 설치되어 있는 경우, 환경 변수 `DD_TRACE_ENABLED`가 `true`로 설정되어 있는지 확인하세요 .

### 런타임 권장 사항

{{< partial name="serverless/serverless-apm-recommendations.html" >}}

#### Python과 Node.js

Datadog Lambda 라이브러리와 Python 및 Node.js용 트레이싱 라이브러리는 다음을 지원합니다:
- Lambda 로그와 트레이스를 트레이스 ID 및 태그 삽입과 자동으로 상호 연관시킴.
- Serverless Framework, AWS SAM 및 AWS CDK 통합을 사용하여 코드 변경 없이 설치.
- 다운스트림 Lambda 함수 또는 컨테이너를 호출하는 HTTP 요청을 트레이싱.
- AWS SDK를 통해 이루어진 연속적인 Lambda 호출을 트레이싱.
- 콜드 스타트 트레이싱
- AWS Managed Services를 통한 비동기식 Lambda 호출 트레이싱.
  - API Gateway
  - SQS
  - SNS
  - SNS 및 SQS 직접 통합
  - Kinesis
  - EventBridge
- 즉시 사용 가능한 수십 개의 추가 [Python][3] 및 [Node.js][4] 라이브러리를 트레이싱.

Python 및 Node.js 서버리스 애플리케이션의 경우, Datadog은 [Datadog의 트레이싱 라이브러리 설치][5]를 권장합니다.

*위에 나열되지 않은 서버리스 리소스 트레이싱을 원한다면 [기능 요청을 여세요][7].*

#### Ruby

 Datadog Lambda 라이브러리 및 Ruby용 트레이싱 라이브러리는 다음을 지원합니다:
- Lambda 로그와 트레이스를 트레이스 ID 및 태그 삽입과 자동으로 상호 연관시킴.
- 다운스트림 Lambda 함수 또는 컨테이너를 호출하는 HTTP 요청을 트레이싱.
- 즉시 사용 가능한 수십 개의 추가 [Ruby][8] 라이브러리를 트레이싱.

[Datadog의 트레이싱 라이브러리][5]를 사용하여 Datadog에서 서버리스 함수를 추적할 수 있습니다.

*위에 나열되지 않은 서버리스 리소스 트레이싱을 원한다면 [기능 요청을 여세요][7].*

#### Go

 Datadog Lambda 라이브러리 및 Go용 트레이싱 라이브러리는 다음을 지원합니다:
- Lambda 로그와 트레이스를 트레이스 ID 및 태그 삽입과 수동으로 상호 연관시킴.
- 다운스트림 Lambda 함수 또는 컨테이너를 호출하는 HTTP 요청을 트레이싱.
- 즉시 사용 가능한 수십 개의 추가 [Go][9] 라이브러리를 트레이싱.

Go 서버리스 애플리케이션의 경우, Datadog은 [Datadog의 트레이싱 라이브러리][5]를 설치할 것을 권장합니다.

*위에 나열되지 않은 서버리스 리소스 트레이싱을 원한다면 [기능 요청을 여세요][7].*

#### Java

 Datadog Lambda 라이브러리 및 Java용 트레이싱 라이브러리는 다음을 지원합니다:
- Lambda 로그 및 트레이스와 트레이스 ID 및 태그 삽입을 상호 연관 시킴. 자세한 내용은 [Java 로그와 트레이스 연결하기][10]를 참조하세요.
- 다운스트림 Lambda 함수 또는 컨테이너를 호출하는 HTTP 요청을 트레이싱.
- 즉시 사용 가능한 수십 개의 추가 [Java][11] 라이브러리를 트레이싱.

Java 서버리스 애플리케이션의 경우, Datadog은 [Datadog의 트레이싱 라이브러리 설치][5]를 권장합니다.

*Java Lambda 함수용 Datadog 트레이싱 라이브러리에 대한 피드백이 있으신가요? [Datadog Slack 커뮤니티][13]의 [#serverless][12] 채널에서 진행 중인 토론을 확인해 보세요.*

#### .NET

.NET용 트레이싱 라이브러리는 다음을 지원합니다:
- 다운스트림 Lambda 함수 또는 컨테이너를 호출하는 HTTP 요청을 트레이싱.
- 즉시 사용 가능한 수십 개의 추가 [.NET][14] 라이브러리를 트레이싱.

.NET 서버리스 애플리케이션의 경우, Datadog은 [Datadog의 트레이싱 라이브러리 설치][5]를 권장합니다.

[.NET Azure 서버리스 애플리케이션을 통한 트레이싱][15]에 대해 자세히 알아보세요.

### 하이브리드 환경

Lambda 함수와 호스트 모두에 Datadog의 트레이싱 라이브러리(`dd-trace`)를 설치한 경우, 트레이스는 AWS Lambda, 컨테이너, 온프레미스 호스트, 관리형 서비스 등 인프라스트럭처 경계를 넘나드는 요청에 대한 전체 상황을 자동으로 보여줍니다.

`dd-trace`가 Datadog Agent와 함께 호스트에 설치되어 있고 서버리스 기능이 AWS X-Ray로 추적되는 경우, 인프라스트럭처 전반에서 연결된 단일 트레이스를 확인하려면 트레이스 병합이 필요합니다. [서버리스 트레이스 병합][6] 설명서를 참조하여 AWS X-Ray와 `dd-trace`에서의 트레이스 병합에 대해 자세히 알아보세요.

Datadog의 [AWS X-Ray 통합][2]은 Lambda 함수에 대한 트레이스만 제공합니다. 컨테이너 또는 호스트 기반 환경에서의 트레이싱에 대해 자세히 알아보려면 [Datadog APM 설명서][16]를 참조하세요.

## Lambda 함수 프로파일링 (공개 베타)

<div class="alert alert-info">베타 기간 동안에는 추가 비용 없이 프로파일링을 사용할 수 있습니다.</div>

Datadog의 [Continuous Profiler][27]는 버전 4.62.0 및 레이어 버전 62 이상에서 Python용 베타 버전으로 제공됩니다. 이 선택 기능은 `DD_PROFILING_ENABLED` 환경 변수를 `true`로 설정하여 활성화할 수 있습니다.

Continuous Profiler는 주기적으로 깨어나 실행 중인 모든 Python 코드의 CPU와 힙의 스냅샷을 생성하는 스레드를 생성하는 방식으로 작동합니다. 여기에는 프로파일러 자체가 포함될 수 있습니다. 프로파일러 자체를 무시하려면 `DD_PROFILING_IGNORE_PROFILER`를 `true`로 설정합니다.

## 트레이스 병합

### 사용 사례

Datadog은 Datadog APM 트레이스 라이브러리(`dd-trace`)만 사용할 것을 권장하지만, 일부 고급 상황에서는 사용자가 트레이스 병합을 사용하여 Datadog 트레이싱과 AWS X-Ray를 결합할 수 있습니다. 트레이스 병합은 Node.js 및 Python AWS Lambda 함수에서 사용할 수 있습니다. 어떤 트레이싱 라이브러리를 사용해야 할지 잘 모르겠다면 [트레이싱 라이브러리 선택하기][17]를 참고하시기 바랍니다.

`dd-trace`와 AWS X-Ray 트레이싱 라이브러리를 모두 계측하는 이유는 두 가지입니다:
- AWS 서버리스 환경에서 이미 Lambda 함수를 `dd-trace`로 추적하고 있고,  AppSync 및 Step Functions 등 AWS Managed Services에 대해 AWS X-Ray 액티브 트레이싱이 필요하며, 단일 트레이스에서 `dd-trace` 및 AWS X-Ray 스팬을 시각화하고자 합니다.
- Lambda 함수와 호스트가 모두 있는 하이브리드 환경에서 `dd-trace`가 호스트를 계측하고, AWS X-Ray는 Lambda 함수를 계측하며, Lambda 함수와 호스트 전반의 트랜잭션에 연결된 트레이스를 시각화하고자 합니다.

**참고:** 이로 인해 사용 요금이 더 많이 부과될 수 있습니다. 병합된 트레이스에서 2-5분 후에도 X-Ray 스팬을 계속 사용할 수 있습니다. 대부분의 경우 Datadog은 단일 트레이싱 라이브러리만 사용할 것을 권장합니다. [트레이싱 라이브러리 선택][17]에 대해 자세히 알아보세요.

위의 각 사용 사례에 대한 설정 지침은 아래에서 확인할 수 있습니다:

- [서버리스 우선 환경에서의 트레이스 병합](#trace-merging-in-an-AWS-serverless-environment)
- [AWS Lambda 및 호스트 간 트레이스 병합](#tracing-across-aws-lambda-and-hosts)

### AWS 서버리스 환경에서의 트레이스 병합

AWS X-Ray는 백엔드 AWS 서비스(AWS X-Ray 액티브 트레이싱)와 클라이언트 라이브러리 세트를 모두 제공합니다. [Lambda 콘솔에서 백엔드 AWS 서비스만 활성화하면][18] AWS Lambda 함수에 대한 `Initialization` 및 `Invocation` 스팬이 제공됩니다. API Gateway 및 Step Functions 콘솔에서 AWS X-Ray 액티브 트레이싱을 활성화할 수도 있습니다.

AWS X-Ray SDK와 Datadog APM 클라이언트 라이브러리(`dd-trace`)는 모두 함수에 직접 액세스하여 다운스트림 호출을 위한 메타데이터와 스팬을 추가합니다. 핸들러 레벨에서 추적을 위해 `dd-trace`를 사용한다고 가정하면, 설정은 다음과 유사해야 합니다:

1. AWS Lambda 콘솔의 Lambda 함수에서 [AWS X-Ray 액티브 트레이싱][18]을 활성화하고 [Datadog 내의 AWS X-Ray 통합][19]을 활성화했습니다.
2. [Lambda 런타임에 대한 설치 지침][5]에 따라 Datadog APM(`dd-trace`)으로 Lambda 함수를 계측했습니다.
3. 타사 라이브러리는 자동으로 `dd-trace`에 의해 패치되므로 AWS X-Ray 클라이언트 라이브러리를 설치할 필요가 없습니다.
4. `DD_MERGE_XRAY_TRACES` 환경 변수를 Lambda 함수에서 `true`로 설정하여 X-Ray와 `dd-trace` 트레이스 (Ruby에서는 `DD_MERGE_DATADOG_XRAY_TRACES`)를 병합합니다.

### AWS Lambda 및 호스트 전반에서 트레이싱

Lambda 함수와 호스트 모두에 Datadog의 트레이싱 라이브러리(`dd-trace`)를 설치한 경우, 트레이스는 AWS Lambda, 컨테이너, 온프레미스 호스트, 관리형 서비스 등 인프라스트럭처 경계를 넘나드는 요청의 전체 그림을 자동으로 표시합니다.

`dd-trace`가 Datadog Agent와 함께 호스트에 설치되어 있고, Node.js 또는 Python 서버리스 함수가 AWS X-Ray로 추적되는 경우, 설정은 다음과 유사해야 합니다:

1. Lambda 함수 추적을 위한 [AWS X-Ray 통합][18]을 설치하여 AWS X-Ray 액티브 트레이싱을 활성화하고 X-Ray 클라이언트 라이브러리를 설치했습니다.
2. [Lambda 런타임용 Datadog Lambda 라이브러리][5]를 설치했으며 `DD_TRACE_ENABLED` 환경 변수가 `false`로 설정되어 있습니다.
3. [Datadog APM][20]이 호스트 및 컨테이너 기반 인프라스트럭처에 구성되어 있습니다.

그런 다음 X-Ray 및 Datadog APM 트레이스가 동일한 플레임 그래프에 나타나려면 모든 서비스에 동일한 `env` 태그가 있어야 합니다.

**참고**: 분산 트레이싱은 호스트 또는 컨테이너 기반 애플리케이션의 모든 런타임에 대해 지원됩니다. 호스트와 Lambda 함수가 동일한 런타임에 있을 필요는 없습니다.

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="호스트에서 Lambda 함수로의 요청 추적" >}}

## 트레이스 전파
{{< img src="serverless/lambda-non-http-trace.png" alt="서버리스 분산형 Non-HTTP 트레이스" style="width:100%;" >}}

### 필수 설정

Lambda 함수를 비동기적으로 트리거하는 Node 또는 Python 서버리스 애플리케이션에서 하나의 연결된 트레이스를 보려면 추가적인 계측이 필요할 수 있습니다. Datadog에서 서버리스 애플리케이션을 모니터링하기 시작한 경우, [주요 설치 지침][21]을 따르고 [트레이싱 라이브러리 선택에 대한 페이지를 읽어보세요][22]. [Datadog Lambda 라이브러리][23]를 사용하여 Lambda 함수에서 Datadog으로 트레이스를 보내는 경우 다음 단계에 따라 두 Lambda 함수 간에 트레이스를 연결할 수 있습니다:
-  Step Functions를 통해 Lambda 함수 트리거하기
- MQTT와 같은 비 HTTP 프로토콜을 통해 Lambda 함수 호출하기

([여기][24]에 나열된) 많은 AWS Managed Services 트레이싱은 즉시 지원되며 이 페이지에 설명된 단계를 따를 필요가 없습니다.

트레이스를 전송하는 리소스 간에 트레이스 컨텍스트를 성공적으로 연결하려면 다음을 수행해야 합니다:
- 발신 이벤트에 Datadog 트레이스 컨텍스트를 포함합니다. 발신 이벤트는 `dd-trace`를 설치한 호스트 또는 Lambda 함수에서 발생할 수 있습니다.
- Consumer Lambda 함수에서 트레이스 컨텍스트를 추출합니다.

### 트레이스 컨텍스트 전달하기

다음 샘플 코드는 HTTP 헤더를 지원하지 않는 서비스나 Datadog이 Node 또는 Python에서 [기본적으로][24] 지원하지 않는 관리형 서비스에 대해 발신 페이로드에서 트레이스 컨텍스트를 전달하는 방법을 설명합니다.

{{< tabs >}}
{{% tab "Python" %}}

Python에서는 `get_dd_trace_context` 헬퍼 함수를 사용하여 Lambda 함수의 발신 이벤트에 트레이스 컨텍스트를 전달할 수 있습니다:

```py
import json
import boto3
import os

from datadog_lambda.tracing import get_dd_trace_context  # Datadog 트레이싱 헬퍼 함수

def handler(event, context):
    my_custom_client.sendRequest(
        {
          'myCustom': 'data',
          '_datadog': {
              'DataType': 'String',
              'StringValue': json.dumps(get_dd_trace_context()) # 발신 페이로드에 트레이스 컨텍스트를 포함합니다.
          },
        },
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

Node에서는 `getTraceHeaders` 헬퍼 함수를 사용하여 트레이스 컨텍스트를 Lambda 함수의 발신 이벤트에 전달할 수 있습니다:

```js
const { getTraceHeaders } = require("datadog-lambda-js"); // Datadog 트레이싱 헬퍼 함수

module.exports.handler = async event => {
  const _datadog = getTraceHeaders(); // 현재 Datadog 트레이스 컨텍스트를 캡처합니다.

  var payload = JSON.stringify({ data: 'sns', _datadog });
  await myCustomClient.sendRequest(payload)
```

{{% /tab %}}
{{< /tabs >}}

#### 호스트에서

Lambda 함수에서 트레이스 컨텍스트를 전달하지 않는 경우, `getTraceHeaders`와 `get_dd_trace_context` 헬퍼 함수 대신 다음 코드 템플릿을 사용하여 현재 스팬 컨텍스트를 가져올 수 있습니다. 모든 런타임에서 이 작업을 수행하는 방법은 [여기][25]에 설명되어 있습니다.

```js
const tracer = require("dd-trace");

exports.handler = async event => {
  const span = tracer.scope().active();
  const _datadog = {}
  tracer.inject(span, 'text_map', _datadog)

  // ...
```

### 트레이스 컨텍스트 추출하기

Consumer Lambda 함수에서 위의 트레이스 컨텍스트를 추출하려면 Lambda 함수 핸들러를 실행하기 전에 트레이스 컨텍스트를 캡처하는 추출기 함수를 정의해야 합니다. 이렇게 하려면 추출기 함수의 위치를 가리키도록 `DD_TRACE_EXTRACTOR` 환경 변수를 구성합니다. 형식은 `<FILE NAME>.<FUNCTION NAME>`입니다. 예를 들어, `json` 추출기가 `extractors.js` 파일에 있는 경우 `extractors.json`입니다. 추출기는 여러 Lambda 함수에서 재사용할 수 있으므로 모든 추출기 메서드를 하나의 파일에 배치하는 것이 좋습니다. 이러한 추출기는 모든 사용 사례에 맞게 완전히 커스터마이징할 수 있습니다.

**참조**:
- TypeScript 또는 웹팩과 같은 번들러를 사용하는 경우, 추출기가 정의된 Node.js 모듈을 `import` 또는 `require` 해야 합니다. 이렇게 하면 모듈이 컴파일되어 Lambda 배포 패키지에 번들로 제공될 수 있습니다.
- Node.js Lambda 함수가 `arm64`에서 실행되는 경우 `DD_TRACE_EXTRACTOR` 환경 변수를 사용하는 대신 [함수 코드에서 추출기를 정의][26]해야 합니다.

#### 샘플 추출기

다음 코드 샘플에서는 타사 시스템이나 표준 HTTP 헤더를 지원하지 않는 API에서 트레이스 컨텍스트를 전파하는 데 사용하는 추출기 샘플을 설명합니다.

{{< tabs >}}
{{% tab "Python" %}}
```py
def extractor(payload):
    trace_headers = json.loads(payload["_datadog"]);
    trace_id = trace_headers["x-datadog-trace-id"];
    parent_id = trace_headers["x-datadog-parent-id"];
    sampling_priority = trace_headers["x-datadog-sampling-priority"];
    return trace_id, parent_id, sampling_priority
```
{{% /tab %}}
{{% tab "Node.js" %}}

```js
exports.json = (payload) => {
    const traceData = payload._datadog
    const traceID = traceData["x-datadog-trace-id"];
    const parentID = traceData["x-datadog-parent-id"];
    const sampledHeader = traceData["x-datadog-sampling-priority"];
    const sampleMode = parseInt(sampledHeader, 10);

    return {
      parentID,
      sampleMode,
      source: 'event',
      traceID,
    };
};
```
{{% /tab %}}
{{% tab "Go" %}}
```go
var exampleSQSExtractor = func(ctx context.Context, ev json.RawMessage) map[string]string {
    eh := events.SQSEvent{}

    headers := map[string]string{}

    if err := json.Unmarshal(ev, &eh); err != nil {
        return headers
    }

    // SQS를 batchSize=1의 트리거로 사용하면 
  // 하나의 SQS 메시지가 핸들러의 실행을 주도하기 때문에 이를 확인하는 것이 중요합니다.
    if len(eh.Records) != 1 {
        return headers
    }

    record := eh.Records[0]

    lowercaseHeaders := map[string]string{}
    for k, v := range record.MessageAttributes {
        if v.StringValue != nil {
            lowercaseHeaders[strings.ToLower(k)] = *v.StringValue
        }
    }

    return lowercaseHeaders
}

cfg := &ddlambda.Config{
    TraceContextExtractor: exampleSQSExtractor,
}
ddlambda.WrapFunction(handler, cfg)
```
{{% /tab %}}
{{< /tabs >}}

## X-Ray 통합을 통해 Datadog에 트레이스 보내기

이미 X-Ray로 서버리스 애플리케이션을 추적하고 있고 X-Ray를 계속 사용하려는 경우, [AWS X-Ray 통합을 설치][2]하여 X-Ray에서 Datadog으로 트레이스을 전송할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/serverless/distributed_tracing#distributed-tracing-with-datadog-apm
[2]: /ko/integrations/amazon_xray/#overview
[3]: /ko/tracing/trace_collection/compatibility/python
[4]: /ko/tracing/trace_collection/compatibility/nodejs
[5]: /ko/serverless/installation/
[6]: /ko/serverless/distributed_tracing/#trace-merging
[7]: https://docs.datadoghq.com/ko/help/
[8]: /ko/tracing/trace_collection/compatibility/ruby
[9]: /ko/tracing/trace_collection/compatibility/go
[10]: /ko/tracing/other_telemetry/connect_logs_and_traces/java/
[11]: /ko/tracing/trace_collection/compatibility/java
[12]: https://datadoghq.slack.com/archives/CFDPB83M4
[13]: https://chat.datadoghq.com/
[14]: /ko/tracing/trace_collection/compatibility/dotnet-core
[15]: /ko/serverless/azure_app_services
[16]: /ko/tracing/trace_collection/
[17]: /ko/serverless/distributed_tracing/
[18]: https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html
[19]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[20]: /ko/tracing/send_traces/
[21]: /ko/serverless/installation
[22]: /ko/serverless/distributed_tracing
[23]: /ko/serverless/datadog_lambda_library
[24]: /ko/serverless/distributed_tracing#runtime-recommendations
[25]: /ko/tracing/trace_collection/custom_instrumentation/
[26]: /ko/serverless/guide/handler_wrapper/
[27]: /ko/profiler/