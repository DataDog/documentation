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
  text: Datadog APM 탐색
- link: /tracing/trace_search_and_analytics/#live-search-for-15-minutes
  tag: 설명서
  text: 실시간 검색
- link: https://www.datadoghq.com/blog/aws-lambda-tracing-go-java-functions/
  tag: 블로그
  text: Go 및 Java Lambda 함수를 위한 실시간 분산 트레이싱
- link: https://www.datadoghq.com/blog/datadog-serverless-view/
  tag: 블로그
  text: Serverless 뷰에서 Serverless 스택 모니터링
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: 블로그
  text: AWS 완전 관리형 서비스를 위한 Datadog Serverless Monitoring
- link: https://www.datadoghq.com/blog/dotnet-lambda-functions-distributed-tracing/
  tag: 블로그
  text: .NET Lambda 함수에 대한 실시간 분산 트레이싱
title: AWS Lambda 서버리스 애플리케이션을 통한 분산 트레이싱
---
{{< img src="tracing/serverless_functions/ServerlessDistributedTrace.png" alt="서버리스 함수 트레이스" style="width:100%;">}}

Datadog는 서버리스 트레이스를 메트릭에 연결하여 애플리케이션 성능에 대한 풍부한 정보를 제공합니다. 이렇게 하면 서버리스 애플리케이션의 특성인 분산된 환경에서도 성능 문제를 정확하게 해결할 수 있습니다.

Datadog Python, Node.js, Ruby, Go, Java 및 .NET SDK는 AWS Lambda에 대한 분산 트레이싱을 지원합니다.

## 서버리스 애플리케이션에서 트레이스 전송 {#send-traces-from-your-serverless-application}

{{< img src="serverless/serverless_tracing_installation_instructions.png" alt="Datadog을 사용한 AWS Lambda 트레이싱을 위한 아키텍처 다이어그램" >}}

Datadog Python, Node.js, Ruby, Go, Java 및 .NET SDK는 AWS Lambda에 대한 분산 트레이싱을 지원합니다. [설치 지침][5]을 사용하여 SDK를 설치할 수 있습니다.

### 런타임 권장 사항 {#runtime-recommendations}

{{< card-grid card_width="30%" image_width="200">}}
  {{< image-card href="/serverless/distributed_tracing#python-and-nodejs" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="/serverless/distributed_tracing#python-and-nodejs" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="/serverless/distributed_tracing#ruby" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="/serverless/distributed_tracing#java" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="/serverless/distributed_tracing#go" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="/serverless/distributed_tracing#net" src="integrations_logos/dotnet_text.png" alt=".NET" >}}
{{< /card-grid >}}

#### Python과 Node.js {#python-and-nodejs}

Datadog Lambda 라이브러리와 Python 및 Node.js용 SDK는 다음을 지원합니다.
- Lambda 로그와 트레이스를 트레이스 ID 및 태그 삽입을 통해 자동으로 상호 연관시킵니다.
- Serverless Framework, AWS SAM 및 AWS CDK 통합을 사용하여 코드 변경 없이 설치.
- 다운스트림 Lambda 함수 또는 컨테이너를 호출하는 HTTP 요청을 트레이싱.
- AWS SDK를 통해 이루어진 연속적인 Lambda 호출을 트레이싱.
- 콜드 스타트 트레이싱
- AWS Managed Services를 통한 비동기식 Lambda 호출 트레이싱
  - API Gateway
  - SQS
  - SNS
  - SNS 및 SQS 직접 통합
  - Kinesis
  - EventBridge
  - DynamoDB
  - S3
  - Step Functions
- 즉시 사용 가능한 수십 개의 추가 [Python][3] 및 [Node.js][4] 라이브러리 트레이싱.

Python 및 Node.js 서버리스 애플리케이션의 경우, Datadog은 [Datadog SDK 설치][5]를 권장합니다.

*위에 나열되지 않은 서버리스 리소스를 추적하고 싶으신가요? [기능 요청을 개설하세요][7].*

#### Ruby {#ruby}

Datadog Lambda 라이브러리 및 Ruby용 SDK는 다음을 지원합니다.
- Lambda 로그와 트레이스를 트레이스 ID 및 태그 삽입을 통해 자동으로 상호 연관시킵니다.
- 다운스트림 Lambda 함수 또는 컨테이너를 호출하는 HTTP 요청을 트레이싱.
- 즉시 사용 가능한 수십 개의 추가 [Ruby][8] 라이브러리를 트레이스합니다.

[Datadog SDK][5]를 사용하여 Datadog에서 서버리스 함수를 트레이스할 수 있습니다.

*위에 나열되지 않은 서버리스 리소스를 추적하고 싶으신가요? [기능 요청을 개설하세요][7].*

#### Go {#go}

Datadog Lambda 라이브러리 및 Go용 SDK는 다음을 지원합니다.
- Lambda 로그와 트레이스를 트레이스 ID 및 태그 삽입을 통해 수동으로 상호 연관시킵니다.
- 다운스트림 Lambda 함수 또는 컨테이너를 호출하는 HTTP 요청을 트레이싱.
- 즉시 사용 가능한 수십 개의 추가 [Go][9] 라이브러리를 트레이스합니다.

Go 서버리스 애플리케이션의 경우, Datadog은 [Datadog SDK][5]를 권장합니다.

*위에 나열되지 않은 서버리스 리소스를 추적하고 싶으신가요? [기능 요청을 개설하세요][7].*

#### Java {#java}

Datadog Lambda 라이브러리와 Java용 SDK는 다음을 지원합니다.
- Lambda 로그와 트레이스를 트레이스 ID 및 태그 삽입을 통해 상호 연관시킵니다. 자세한 내용은 [Java 로그 및 트레이스 연결][10]을 참조하세요.
- 다운스트림 Lambda 함수 또는 컨테이너를 호출하는 HTTP 요청을 트레이싱.
- 즉시 사용 가능한 수십 개의 추가 [Java][11] 라이브러리를 트레이스합니다.

Java 서버리스 애플리케이션의 경우, Datadog은 [Datadog SDK][5]를 권장합니다.

*Java Lambda 함수용 Datadog SDK에 대한 피드백이 있으십니까? [Datadog Slack 커뮤니티][13]의 [#serverless][12] 채널에서 진행 중인 논의를 확인하세요.*

#### .NET {#net}

.NET용 SDK는 다음을 지원합니다.
- 다운스트림 Lambda 함수 또는 컨테이너를 호출하는 HTTP 요청을 트레이싱.
- 즉시 사용 가능한 수십 개의 추가 [.NET][14] 라이브러리를 트레이스합니다.

.NET 서버리스 애플리케이션의 경우, Datadog은 [Datadog SDK][5]를 권장합니다.

[.NET Azure 서버리스 애플리케이션을 통한 트레이싱][15]에 대해 자세히 알아보세요.

## 스팬 자동 연결 {#span-auto-linking}
{{< img src="serverless/lambda/tracing/autolink.png" alt="Datadog에서의 DynamoDB 트레이스입니다. 상단에는 '이 트레이스는 다른 트레이스와 연결되어 있습니다'라는 메시지가 표시됩니다. 스팬 링크 탭이 열려 있으며 다른 DynamoDB 트레이스로의 클릭 가능한 링크가 표시됩니다." style="width:100%;" >}}

Datadog은 비동기 요청의 세그먼트가 트레이스 컨텍스트를 전파할 수 없을 때 연결된 스팬을 자동으로 감지합니다. 예를 들어, 요청이 [S3 변경 이벤트][28] 또는 [DynamoDB 스트림][29]을 트리거할 때 발생할 수 있습니다. 자동 연결된 스팬은 [스팬 링크 탭][30]에서 확인할 수 있습니다. 이들은 **뒤로** 또는 **앞으로** 표시됩니다.

_뒤로_: 링크된 스팬은 현재 보고 있는 트레이스로 인해 발생했습니다.

_앞으로_: 링크된 스팬은 현재 보고 있는 트레이스를 유발했습니다.


<div class="alert alert-info">샘플링 및 <a href="/tracing/trace_pipeline/trace_retention/">보존 필터</a>는 자동 연결에 영향을 줄 수 있습니다. 자동 연결된 스팬을 볼 가능성을 높이려면 샘플링 비율을 높이거나 보존 필터를 조정하세요.</div>

### 지원되는 기술 {#supported-technologies}

스팬 자동 연결은 다음에 대해 사용할 수 있습니다.
- Python AWS Lambda 함수는 [`datadog-lambda-python`][33] 레이어 v101+로 계측되었습니다.
- Python 애플리케이션은 [`dd-trace-py`][31] v2.16+로 계측되었습니다.
- Node.js AWS Lambda 함수는 [`datadog-lambda-js`][34] 레이어 118+로 계측되었습니다.
- Node.js 애플리케이션은 [`dd-trace-js`][32] v4.53.0+ 또는 v5.29.0+로 계측되었습니다.

### DynamoDB 변경 스트림 자동 링크 {#dynamodb-change-stream-auto-linking}

[DynamoDB Change Streams][29]의 경우, 스팬 자동 연결은 다음 작업을 지원합니다.

- `PutItem`
- `UpdateItem`
- `DeleteItem`
- `BatchWriteItem`
- `TransactWriteItems`

<div class="alert alert-info"> <code>PutItem</code> 작업에는 추가 구성이 필요합니다. 자세한 내용은 <a href="/serverless/aws_lambda/installation/python/#span-auto-linking">Python 서버리스 애플리케이션 계측</a> 또는 <a href="/serverless/aws_lambda/installation/nodejs/#span-auto-linking">Node.js 서버리스 애플리케이션 계측</a>.</div>을 참조하세요.

### S3 변경 알림 자동 링크 {#s3-change-notification-auto-linking}

[S3 변경 알림][28]의 경우, 스팬 자동 연결은 다음 작업을 지원합니다.

- `PutObject`
- `CompleteMultipartUpload`
- `CopyObject`


## 하이브리드 환경 {#hybrid-environments}

Lambda 함수, 호스트, 컨테이너 및 관리형 서비스 전반에 걸쳐 엔드 투 엔드 가시성을 위해, Lambda 함수와 호스트 모두에 Datadog SDK(`dd-trace`)를 설치하세요. 귀하의 트레이스는 인프라 경계를 넘는 요청의 전체 모습을 보여줍니다.

Lambda에서 `dd-trace`를 설치하고 [Datadog Lambda Extension][35]을 사용하여 Datadog Agent를 Lambda 실행 환경 내에서 실행하고 최소한의 오버헤드로 트레이스를 Datadog에 직접 전송합니다. Lambda Extension은 새로운 서버리스 애플리케이션 및 기존 서버리스 애플리케이션에 권장되는 설치 방법입니다.

컨테이너 및 호스트 기반 환경에서의 추적 설정에 대한 자세한 내용은 [Datadog APM 문서][16]를 참조하세요.

## Lambda 함수 프로파일링 {#profiling-your-lambda-functions}

Datadog의 [Continuous Profiler][27]는 버전 4.62.0 및 레이어 버전 62 이상에서 Python에 대해 미리보기로 제공됩니다. 이 선택적 기능은 `DD_PROFILING_ENABLED` 환경 변수를 `true`으로 설정하여 활성화됩니다.

Continuous Profiler는 주기적으로 깨어나 실행 중인 모든 Python 코드의 CPU 및 힙의 스냅샷을 찍는 스레드를 생성하여 작동합니다. 여기에는 프로파일러 자체도 포함될 수 있습니다. Continuous Profiler가 자신을 무시하도록 하려면 `DD_PROFILING_IGNORE_PROFILER`를 `true`로 설정하세요.

## 트레이스 병합 {#trace-merging}

### 사용 사례 {#use-cases}

Datadog은 Datadog APM 트레이스 라이브러리(`dd-trace`)만 사용하는 것을 권장하지만, 일부 고급 상황에서는 사용자가 Datadog 트레이스와 AWS X-Ray를 트레이스 병합을 통해 결합할 수 있습니다. 트레이스 병합은 Node.js 및 Python AWS Lambda 함수에서 사용할 수 있습니다. 어떤 SDK를 사용할지 확실하지 않은 경우 [SDK 선택][17]에 대해 읽어보세요.

<div class="alert alert-info">AWS Step Functions 트레이싱은 Datadog에 의해 기본적으로 지원되며 더 이상 X-Ray가 필요하지 않습니다. <a href="/serverless/step_functions/">Serverless Monitoring for AWS Step Functions</a> 및 <a href="/serverless/step_functions/merge-step-functions-lambda/">Merge Step Functions and Lambda Traces</a>.</div>을 참조하세요.

`dd-trace`와 AWS X-Ray 트레이싱 라이브러리를 모두 계측하는 이유는 두 가지입니다.
- AWS 서버리스 환경에서 이미 Lambda 함수를 `dd-trace`로 트레이스하고 있으며, Datadog APM이 아직 계측하지 않는 AWS 관리 서비스(예: AppSync)에 대해 AWS X-Ray 액티브 트레이싱이 필요하고, 단일 트레이스에서 `dd-trace` 및 AWS X-Ray 스팬을 시각화하고자 합니다.
- Lambda 함수와 호스트가 모두 있는 하이브리드 환경에서 `dd-trace`가 호스트를 계측하고, AWS X-Ray는 Lambda 함수를 계측하며, Lambda 함수와 호스트 전반의 트랜잭션에 연결된 트레이스를 시각화하고자 합니다.

**참고:** 이로 인해 더 높은 사용 요금이 발생할 수 있습니다. X-Ray 스팬은 2-5분 후에 병합된 트레이스에서 계속 사용할 수 있습니다. 많은 경우에 Datadog은 단일 SDK만 사용하는 것을 권장합니다. [SDK 선택][17]에 대해 자세히 알아보세요.

위의 각 사용 사례에 대한 설정 지침은 아래에서 확인할 수 있습니다.

- [서버리스 우선 환경에서의 트레이스 병합](#trace-merging-in-an-AWS-serverless-environment)
- [AWS Lambda 및 호스트 전반에서의 트레이스 병합](#tracing-across-aws-lambda-and-hosts)

### AWS 서버리스 환경에서의 트레이스 병합 {#trace-merging-in-an-aws-serverless-environment}

AWS X-Ray는 백엔드 AWS 서비스(AWS X-Ray 액티브 트레이싱)와 클라이언트 라이브러리 세트를 제공합니다. [Lambda 콘솔에서 백엔드 AWS 서비스만 활성화하기][18]를 통해 AWS Lambda 함수에 `Initialization` 및 `Invocation` 스팬을 제공합니다. API Gateway 및 Step Function 콘솔에서도 AWS X-Ray 액티브 트레이싱을 활성화할 수 있습니다.

AWS X-Ray SDK와 Datadog APM 클라이언트 라이브러리(`dd-trace`)는 함수를 직접 접근하여 다운스트림 호출에 대한 메타데이터와 스팬을 추가합니다. 핸들러 수준에서 트레이스를 위해 `dd-trace`를 사용한다고 가정할 때, 설정은 다음과 유사해야 합니다.

1. AWS Lambda 콘솔의 Lambda 함수에서 [AWS X-Ray 액티브 트레이싱][18]를 활성화했습니다. 또한 [Datadog의 AWS X-Ray 통합][19]을 활성화했습니다.
2. Lambda 런타임에 대한 [설치 지침][5]에 따라 Datadog APM(`dd-trace`)으로 Lambda 함수를 계측했습니다.
3. 타사 라이브러리는 `dd-trace`에 의해 자동으로 패치되므로 AWS X-Ray 클라이언트 라이브러리를 설치할 필요가 없습니다.
4. Lambda 함수에서 `DD_MERGE_XRAY_TRACES` 환경 변수를 `true`으로 설정하여 X-Ray와 `dd-trace` 트레이스를 병합하세요(Ruby에서는 `DD_MERGE_DATADOG_XRAY_TRACES`).

### AWS Lambda 및 호스트 전반에 걸친 트레이스 {#tracing-across-aws-lambda-and-hosts}

#### Datadog SDK를 통한 컨텍스트 전파(권장) {#context-propagation-with-the-datadog-sdks-recommended}
Lambda 함수와 호스트 모두에 Datadog SDK(`dd-trace`)를 설치하세요. 이 경우, AWS Lambda, 컨테이너, 온프레미스 호스트 또는 관리형 서비스를 포함한 인프라 경계를 넘나드는 요청들의 전체 그림이 자동으로 표시됩니다.

{{< img src="integrations/amazon_lambda/lambda_host_trace.png" alt="호스트에서 Lambda 함수로의 요청 트레이스" >}}

## 트레이스 전파 {#trace-propagation}
{{< img src="serverless/lambda-non-http-trace.png" alt="서버리스 분산형 Non-HTTP 트레이스" style="width:100%;" >}}

### 필수 설정 {#required-setup}

Node 및 Python 서버리스 애플리케이션에서 Lambda 함수를 비동기적으로 트리거할 때 단일 연결된 트레이스를 보기 위해 추가 계측이 필요할 수 있습니다. Datadog에서 서버리스 애플리케이션 모니터링을 처음 시작하는 경우, [주요 설치 단계][21]를 따르고 [SDK 선택에 대한 이 페이지][22]를 읽으세요. [Datadog Lambda 라이브러리][23]를 사용해 Lambda 함수에서 Datadog으로 트레이스를 전송하면 다음과 같은 경우에 안내된 단계에 따라 두 Lambda 함수 간의 트레이스를 연결할 수 있습니다.
- Step Functions를 통한 Lambda 함수 트리거
- MQTT와 같은 비 HTTP 프로토콜을 통한 Lambda 함수 호출

([여기][24]에 나열된) 많은 AWS Managed Services 트레이싱은 즉시 지원되며 이 페이지에 설명된 단계를 따를 필요가 없습니다.

트레이스를 전송하는 리소스 간에 트레이스 컨텍스트를 성공적으로 연결하려면 다음을 수행해야 합니다.
- 발신 이벤트에 Datadog 트레이스 컨텍스트 포함. 발신 이벤트는 `dd-trace`이 설치된 호스트 또는 Lambda 함수에서 발생할 수 있습니다.
- Consumer Lambda 함수에서 트레이스 컨텍스트를 추출합니다.

### 트레이스 컨텍스트 전달 {#passing-trace-context}

다음 샘플 코드는 HTTP 헤더를 지원하지 않는 서비스나 Datadog이 Node 또는 Python에서 [기본적으로][24] 지원하지 않는 관리형 서비스에 대해 발신 페이로드에서 트레이스 컨텍스트를 전달하는 방법을 설명합니다.

{{< tabs >}}
{{% tab "Python" %}}

Python에서는 `get_dd_trace_context` 헬퍼 함수를 사용하여 Lambda 함수의 발신 이벤트에 트레이스 컨텍스트를 전달할 수 있습니다.

```py
import json
import boto3
import os

from datadog_lambda.tracing import get_dd_trace_context  # Datadog tracing helper function

def handler(event, context):
    my_custom_client.sendRequest(
        {
          'myCustom': 'data',
          '_datadog': {
              'DataType': 'String',
              'StringValue': json.dumps(get_dd_trace_context()) # Includes trace context in outgoing payload.
          },
        },
    )
```

{{% /tab %}}
{{% tab "Node.js" %}}

Node에서는 `getTraceHeaders` 헬퍼 함수를 사용하여 트레이스 컨텍스트를 Lambda 함수의 발신 이벤트에 전달할 수 있습니다.

```js
const { getTraceHeaders } = require("datadog-lambda-js"); // Datadog tracing helper function

module.exports.handler = async event => {
  const _datadog = getTraceHeaders(); // Captures current Datadog trace context.

  var payload = JSON.stringify({ data: 'sns', _datadog });
  await myCustomClient.sendRequest(payload)
```

{{% /tab %}}
{{< /tabs >}}

#### 호스트에서 {#from-hosts}

Lambda 함수에서 트레이스 컨텍스트를 전달하지 않는 경우, `getTraceHeaders` 및 `get_dd_trace_context` 헬퍼 함수 대신 다음 코드 템플릿을 사용하여 현재 스팬 컨텍스트를 얻을 수 있습니다. 모든 런타임에서 이를 수행하는 방법에 대한 지침은 [여기][25]에 설명되어 있습니다.

```js
const tracer = require("dd-trace");

exports.handler = async event => {
  const span = tracer.scope().active();
  const _datadog = {}
  tracer.inject(span, 'text_map', _datadog)

  // ...
```

### 트레이스 컨텍스트 추출 {#extracting-trace-context}

Consumer Lambda 함수에서 위의 트레이스 컨텍스트를 추출하려면, Lambda 함수 핸들러 실행 전에 트레이스 컨텍스트를 캡처하는 추출기 함수를 정의해야 합니다. 이를 위해 `DD_TRACE_EXTRACTOR` 환경 변수를 설정하여 추출기 함수의 위치를 가리키도록 구성합니다. 이 형식은 `<FILE NAME>.<FUNCTION NAME>`입니다. 예를 들어, `extractors.json` `json` 추출기가 `extractors.js` 파일에 있는 경우. Datadog은 추출기 메서드를 하나의 파일에 모두 배치할 것을 권장합니다. 추출기는 여러 Lambda 함수에서 재사용될 수 있습니다. 이 추출기는 모든 사용 사례에 맞게 완전히 사용자 정의할 수 있습니다.

**참고**:
- TypeScript 또는 webpack과 같은 번들러를 사용하는 경우, 추출기가 정의된 Node.js 모듈을 `import`하거나 `require`해야 합니다. 모듈이 컴파일되고 Lambda 배포 패키지에 번들로 포함되도록 보장합니다.
- Node.js Lambda 함수가 `arm64`에서 실행되는 경우, `DD_TRACE_EXTRACTOR` 환경 변수를 사용하는 대신 [함수 코드에서 추출기를 정의][26]해야 합니다.

#### 샘플 추출기 {#sample-extractors}

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

	// Using SQS as a trigger with a batchSize=1 so it's important we check
  // for this as a single SQS message will drive the execution of the handler.
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

## X-Ray 통합을 통해 Datadog에 트레이스 보내기 {#sending-traces-to-datadog-with-the-x-ray-integration}

기존 X-Ray 계측이 있고 계속 사용하고자 하는 경우, [AWS X-Ray 통합][2]을 설치하여 X-Ray에서 Datadog으로 트레이스를 전송하세요. 새로운 서버리스 애플리케이션의 경우, Datadog은 [Datadog Lambda Extension][35]을 사용하여 Lambda 함수를 계측할 것을 권장합니다.

## 추가 자료 {#further-reading}

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
[28]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html
[29]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[30]: https://docs.datadoghq.com/ko/tracing/trace_explorer/trace_view/?tab=spanlinksbeta
[31]: https://github.com/DataDog/dd-trace-py/
[32]: https://github.com/DataDog/dd-trace-js/
[33]: https://github.com/DataDog/datadog-lambda-python
[34]: https://github.com/DataDog/datadog-lambda-js
[35]: /ko/serverless/libraries_integrations/extension/