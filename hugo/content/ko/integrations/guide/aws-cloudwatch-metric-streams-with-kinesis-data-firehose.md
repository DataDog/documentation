---
description: Amazon Data Firehose를 통해 CloudWatch 메트릭을 Datadog으로 스트림하여 짧은 지연 시간으로 수집합니다.
further_reading:
- link: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
  tag: 설명서
  text: Metric Streams - Amazon CloudWatch
- link: https://www.datadoghq.com/blog/amazon-cloudwatch-metric-streams-datadog/
  tag: 블로그
  text: Metric Streams를 사용하여 Amazon CloudWatch 메트릭 수집
title: Amazon Data Firehose를 사용한 AWS CloudWatch Metric Streams
---
Amazon CloudWatch Metric Streams 및 Amazon Data Firehose를 사용하면 2~3분의 지연 시간만으로 CloudWatch 메트릭을 Datadog으로 스트림할 수 있습니다. 이는 10분마다 업데이트된 메트릭을 제공하는 Datadog의 기본 API 폴링 방식보다 훨씬 더 빠릅니다. API 폴링 방식에 대한 자세한 내용은 [클라우드 메트릭 지연 설명서][1]에서 확인할 수 있습니다.

## 개요 {#overview}

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric_streaming_diagram.png" alt="메트릭 흐름의 다이어그램" responsive="true">}}

1. 메트릭을 스트림하려는 각 AWS 계정 및 리전에서 CloudWatch Metric Stream을 생성합니다.
   - 필요시 스트림할 제한된 네임스페이스 또는 메트릭 세트를 지정합니다.
2. Metric Stream을 생성하면 Datadog은 즉시 스트림된 메트릭 수신을 시작하고 추가 설정 없이 이를 Datadog 사이트에 표시합니다.

<div class="alert alert-warning">AWS 통합 타일에서 구성된 태그 필터링은 CloudWatch Metric Streams에도 <b>적용됩니다</b>.</div>

### 메트릭 스트리밍과 API 폴링 비교 {#streaming-vs-polling}

다음은 CloudWatch Metric Streams 사용과 API 폴링 사용 간의 주요 차이점입니다.

- **2시간 이상 지연되어 보고된 메트릭**: API 폴링은 메트릭 스트리밍이 활성화된 후에도 계속해서 `aws.s3.bucket_size_bytes` 및 `aws.billing.estimated_charges`와 같은 메트릭을 수집합니다. 이러한 메트릭은 CloudWatch Metric Stream을 통해 전송할 수 없기 때문입니다.

- **메트릭 메타데이터**: Datadog은 계속해서 API 폴링을 사용하여 스트림된 메트릭에 대한 사용자 지정 태그 및 기타 메타데이터를 수집합니다. 이러한 메트릭을 계속 수신하려면 AWS 통합의 설정을 변경하지 마세요.

#### API 폴링에서 메트릭 스트림으로 전환 {#switching-from-api-polling-to-metric-streams}
API 폴링 방식을 통해 특정 CloudWatch 네임스페이스에 대한 메트릭을 이미 수신 중인 경우, Datadog은 이를 자동으로 탐지하고 해당 네임스페이스에 대한 메트릭 스트림을 시작하면 폴링을 중단합니다. AWS 통합 페이지의 구성 설정은 변경하지 마세요. Datadog은 계속해서 API 폴링을 사용하여 스트림된 메트릭에 대한 사용자 지정 태그 및 기타 메타데이터를 수집하기 때문입니다.

#### 메트릭 스트림에서 API 폴링으로 다시 전환 {#switching-back-from-metric-streams-to-api-polling}

나중에 특정 AWS 계정 및 리전 또는 특정 네임스페이스에 대해 메트릭 스트림을 중단하기로 결정하면, Datadog은 AWS 통합 페이지의 구성 설정을 기반으로 해당 메트릭을 API 폴링을 사용하여 자동으로 다시 수집하기 시작합니다. AWS 계정 및 리전에 대한 모든 메트릭 스트리밍을 중단하려면 이 문서의 [메트릭 스트리밍 비활성화 섹션](#disable-metric-streaming)에 있는 지침을 따르세요.

#### 마이그레이션 과정에서 중복 메트릭 방지 {#avoiding-duplicate-metrics-during-migration}

API 폴링에서 Metric Streams로 전환할 때, 두 수집 방법이 동일한 메트릭에 대해 데이터를 전송할 수 있는 중복 기간이 발생합니다. 이로 인해 Datadog에서 메트릭 값이 두 배로 나타날 수 있습니다.

중복 최소화 방법
1. 원하는 네임스페이스 및 리전에 대해 Metric Streams를 활성화합니다.
2. Datadog이 스트림을 탐지하고 해당 네임스페이스에 대한 폴링을 중지할 때까지 기다립니다. 이 탐지 과정은 최대 5분까지 걸릴 수 있지만, 실제로는 활성 폴링 크롤러의 타이밍에 따라 중복 기간이 더 길어질 수 있습니다.
3. 활성화된 스트림 리전에 대해 [AWS 통합 페이지][5]의 **Metric Collection** 탭을 확인하여 전환이 완료되었는지 확인합니다.
4. 전환하는 동안 기존 AWS 통합 구성을 수정하지 마세요. Datadog은 스트리밍된 메트릭에 대한 사용자 지정 태그와 메타데이터를 수집하기 위해 API 폴링을 계속 사용합니다.

<div class="alert alert-info">
CloudWatch Metric Streams를 통해 전송할 수 없는 메트릭도 있습니다. 여기에는 다음이 포함됩니다. <code>aws.s3.bucket_size_bytes</code> 및 <code>aws.billing.estimated_charges</code>. Datadog은 Metric Streams 구성과 관계없이 API 폴링을 통해 이러한 메트릭을 계속 수집합니다.
</div>

### 청구 {#billing}

Datadog은 메트릭 스트림에 대한 추가 비용을 청구하지 않습니다.

AWS는 CloudWatch Metric Stream의 메트릭 업데이트 수와 Amazon Data Firehose로 전송된 데이터 볼륨을 기준으로 요금을 청구합니다. 따라서 스트리밍 중인 메트릭 하위 세트에 대해 CloudWatch 비용이 증가할 가능성이 있습니다. 이러한 이유로 Datadog은 더 낮은 지연 시간이 가장 필요한 AWS 메트릭, 서비스, 리전 및 계정에는 메트릭 스트림을 사용하고, 나머지는 폴링을 사용할 것을 권장합니다. 자세한 내용은 [Amazon CloudWatch 요금][2]을 참조하세요.

스트림의 EC2 또는 Lambda 메트릭은 청구 대상 호스트 수 또는 Lambda 호출 수를 늘릴 수 있습니다(해당 호스트와 함수가 아직 AWS 통합 또는, EC2의 경우 Datadog Agent로 모니터링되지 않는 경우).

**참고**: CloudWatch에서 필터를 생성하여 지정된 메트릭만 스트리밍할 수 있습니다. 자세한 내용은 [Amazon CloudWatch 사용자 가이드][7]를 참조하세요.

## 설정 {#setup}

### 시작 전 참고 사항{#before-you-begin}

1. 메트릭 스트리밍을 활성화하기 전에 차이점을 이해하려면 [메트릭 스트리밍과 API 폴링 비교](#streaming-vs-polling) 섹션을 주의 깊게 읽으세요.

2. 아직 연결하지 않았다면 AWS 계정을 Datadog에 연결하세요. 자세한 내용은 [CloudFormation 설정 지침][3]을 참조하세요.

### 설치 {#installation}

{{< tabs >}}
{{% tab "CloudFormation" %}}

Datadog에서는 여러 AWS 리전을 사용하고 있다면 보다 쉽고 간편한 CloudFormation 사용을 권장합니다.

**참고**: 메트릭 스트리밍은 OpenTelemetry 출력 형식만 지원합니다. 최신 버전은 v1.0입니다. v0.7도 지원되지만 메트릭이 누락될 수 있습니다.

1. Datadog 사이트에서 [AWS 통합 페이지][1]의 **Configuration** 탭으로 이동합니다.
2. 메트릭 스트리밍 설정을 위해 AWS 계정을 클릭합니다.
3. **Metric Collection** 아래의 **CloudWatch Metric Streams**에서 **Automatically Using CloudFormation**을 클릭하여 AWS 콘솔에서 스택을 시작합니다.
 {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-setup.png" alt="Automatically Using CloudFormation 버튼이 강조 표시된 AWS 통합 페이지의 Metric Collection 탭 내 CloudWatch Metric Streams 섹션" responsive="true" style="width:60%;" >}}
4. 필수 파라미터를 입력하세요.
   - **ApiKey**: [Datadog API 키][2]를 입력하세요.
   - **DdSite**: [Datadog 사이트][3]를 선택하세요. 현재 사이트는 다음과 같습니다. {{< region-param key="dd_site" code="true" >}}
   - **Regions**: 메트릭 스트리밍을 설정할 리전의 쉼표로 구분된 목록입니다. 지원되는 리전의 전체 목록은 [메트릭 스트림 사용][4]에 관한 AWS 설명서를 참조하세요.
5. 선택적 파라미터를 입력하세요.
   - **FilterMethod**: 메트릭 스트리밍에 포함할 네임스페이스 목록을 포함하거나 제외합니다.
   - **First/Second/Third Namespace**: 포함하거나 제외할 네임스페이스를 지정합니다. 참고: 네임스페이스 값은 AWS 설명서의 네임스페이스 열에 있는 값과 정확히 일치해야 합니다. 예: AWS/EC2.
6. 'I acknowledge that AWS CloudFormation might create IAM resources with custom names.'라는 승인 상자를 선택합니다.
7. **Create Stack**을 클릭합니다.

### 결과 {#results}

스택이 성공적으로 생성되면 Datadog이 변경 사항을 인식할 때까지 5분 정도 기다리세요. 완료 여부를 확인하려면 Datadog의 [AWS 통합 페이지][1]에 있는 **Metric Collection** 탭으로 이동하여 선택한 계정에 대해 활성화된 리전이 표시되는지 확인하세요.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="활성화된 리전이 하나 있는 AWS 통합 페이지의 Metric Collection 탭에 있는 CloudWatch Metric Streams 섹션" responsive="true" style="width:60%;">}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ko/getting_started/site/
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
{{% /tab %}}
{{% tab "AWS 콘솔" %}}

AWS 콘솔을 사용해 메트릭 스트림을 설정하려면 각 AWS 리전에 [CloudWatch Metric Stream][1]을 생성합니다.

**참고**: 메트릭 스트리밍은 OpenTelemetry 출력 형식만 지원합니다. 최신 버전은 v1.0입니다. v0.7도 지원되지만 메트릭이 누락될 수 있습니다.

1. **Quick AWS Partner Setup**을 선택하고 드롭다운 메뉴에서 AWS 파트너 대상으로 **Datadog**을 선택합니다.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-partner-setup.png" alt="CloudWatch 메트릭 스트림 빠른 파트너 설정" responsive="true" style="width:60%;">}}
2. 메트릭을 스트리밍하려는 Datadog 사이트를 선택하고 [Datadog API 키][2]를 입력하세요.
3.  모든 CloudWatch 메트릭을 스트리밍할지, 아니면 특정 네임스페이스만 스트리밍할지 선택합니다. 특정 메트릭을 제외하는 옵션도 있습니다. 모니터링 계정에 있는 경우 [계정 간 스트리밍][3]을 활성화하도록 선택할 수도 있습니다.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-namespace-filter.png" alt="CloudWatch 메트릭 스트림" responsive="true" style="width:60%;">}}
4. **Add additional statistics**에서 Datadog으로 전송할 AWS 백분위수 메트릭을 포함합니다. Datadog이 폴링을 통해 지원하는 백분위수 메트릭 목록은 [CloudFormation 템플릿][4]을 참조하세요.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/percentiles.png" alt="백분위수" responsive="true" style="width:60%;">}}
5. 메트릭 스트림에 이름을 할당합니다.
6. **Create metric stream**을 클릭합니다.

###  결과 {#results-1}

Metric Stream 리소스가 성공적으로 생성된 것을 확인한 후, Datadog이 변경 사항을 인식할 때까지 5분간 기다리세요. 완료 여부를 확인하려면 Datadog의 [AWS 통합 페이지][5]에 있는 **Metric Collection** 탭으로 이동하여 지정된 AWS 계정에 대해 **CloudWatch Metric Streams**에서 활성화된 리전이 사용 설정되었는지 확인하세요.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="활성화된 리전이 하나 있는 AWS 통합 페이지의 Metric Collection 탭에 있는 CloudWatch Metric Streams 섹션" responsive="true" style="width:60%;">}}

**참고**: 이미 CloudWatch API 폴링을 활성화한 경우, 스트리밍으로 전환하면 스트리밍 중인 특정 메트릭이 Datadog에서 잠시(최대 5분) 동안 중복 계산될 수 있습니다. 이는 Datadog의 크롤러가 실행되어 CloudWatch 메트릭을 제출하는 시점과, Datadog이 해당 메트릭 스트리밍을 시작했음을 인식하고 크롤러를 끄는 시점 사이의 타이밍 차이 때문입니다.

[1]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://docs.datadoghq.com/ko/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/#cross-account-metric-streaming
[4]: https://github.com/DataDog/cloudformation-template/blob/master/aws_streams/streams_single_region.yaml#L168-L249
[5]: https://app.datadoghq.com/integrations/amazon-web-services
{{% /tab %}}
{{< /tabs >}}

### 교차 계정 메트릭 스트리밍 {#cross-account-metric-streaming}
교차 계정 메트릭 스트리밍을 사용하여 단일 AWS 리전 내의 여러 AWS 계정에 걸쳐 있는 단일 Metric Stream에 메트릭을 포함하세요. 이는 공통 대상으로 메트릭을 수집하는 데 필요한 스트림 수를 줄이는 데 도움이 됩니다. 이를 수행하려면 [소스 계정][4]을 모니터링 계정과 연결하고 AWS 모니터링 계정에서 Datadog으로 교차 계정 스트리밍을 활성화하세요.

이 기능이 제대로 작동하려면 모니터링 계정에 다음 권한이 있어야 합니다.
   * oam:ListSinks
   * oam:ListAttachedLinks

**참고:** 스트리밍 메트릭에 대한 사용자 지정 태그 및 기타 메타데이터를 수집하려면 소스 계정을 Datadog과 통합하세요.

### 메트릭 스트리밍 비활성화 {#disable-metric-streaming}

특정 AWS 계정 및 리전에 대해 메트릭 스트리밍을 완전히 비활성화하려면 AWS Metric Stream 및 관련 리소스를 삭제해야 합니다. Datadog에서 메트릭이 손실되지 않도록 다음 삭제 단계를 주의 깊게 따르는 것이 중요합니다.

[CloudFormation](?tab=cloudformation#installation)을 사용하여 스트리밍을 설정한 경우
1. 설정 중에 생성된 스택을 삭제합니다.

[AWS 콘솔](?tab=awsconsole#installation)을 통해 스트리밍을 설정한 경우
1. 전송 스트림에 연결된 CloudWatch Metric Stream을 삭제합니다.
2. 스트림과 관련한 S3 및 Firehose IAM 역할을 비롯해 스트림을 설정할 때 생성된 리소스를 모두 삭제합니다.

리소스가 삭제되면 Datadog이 변경 사항을 인식할 때까지 5분간 기다리세요. 완료 여부를 확인하려면 Datadog의 [AWS 통합 페이지][5]에서 **Metric Collection** 탭으로 이동하여 지정된 AWS 계정에 대해 **CloudWatch Metric Streams** 아래에 비활성화된 리전이 표시되지 않는지 확인합니다.

### 스트림 상태 모니터링 {#monitor-stream-health}

Datadog은 CloudWatch 메트릭 스트림으로부터 데이터를 수신하면 `datadog.aws_metric_streams.data_received` 메트릭을 제출합니다. 이 메트릭을 사용하여 AWS가 메트릭을 전송하고 있고 Datadog이 이를 수신하고 있는지 확인하세요.

`datadog.aws_metric_streams.data_received`
: **유형**: 게이지<br>
Datadog이 CloudWatch 메트릭 스트림으로부터 데이터를 수신하면 `1` 값을 메트릭으로 보고하고, Datadog이 데이터를 수신하지 못하면 보고하지 않습니다. `stream_arn`, `stream_name`, `aws_account` 및 `region`으로 태그가 지정됩니다. 메트릭 보고 빈도는 데이터 볼륨 및 Firehose 전송 스트림의 버퍼링 구성에 따라 다릅니다.

계정 간 스트림의 경우, 메트릭 스트림과 Firehose 전송 스트림은 모니터링 계정에 있습니다. `aws_account` 태그는 메트릭이 발생하는 소스 계정이 아니라 모니터링 계정을 식별합니다.

스트림이 데이터를 전송 중인지 확인하려면 [Metrics Explorer][8]에서 이 메트릭을 쿼리하고 `stream_name` 또는 `stream_arn`으로 그룹화하세요.

이 메트릭은 스트림이 데이터 전송을 중단하면 보고하지 않으므로, 보고 상태에서 데이터 없음 상태로 전환되는지 모니터링하세요. `datadog.aws_metric_streams.data_received`에 [메트릭 모니터링][9]을 생성하고 `stream_arn`으로 그룹화한 다음 데이터 누락 알림을 활성화하세요. 구성 단계는 [특정 태그의 보고가 중단될 때 경보 설정][10]을 참조하세요.

## 문제 해결 {#troubleshooting}

Metric Streams 또는 관련 리소스를 설정하는 동안 문제가 발생하면 [AWS 문제 해결][6]을 참조하세요. Metric Streams가 성공적으로 실행된 후 CloudWatch 메트릭이 나타나지 않으면 Firehose 대상 오류가 원인일 수 있습니다.

### 지속적인 Firehose 대상 오류 {#persistent-firehose-destination-errors}

Datadog에서 CloudWatch 메트릭이 나타나지 않는 경우에도 CloudWatch Metric Stream 및 Amazon Data Firehose 전송 스트림은 여전히 `running` 상태를 표시할 수 있습니다. 이는 Firehose가 더 이상 레코드를 전송하지 않을 때도 발생할 수 있습니다.

이는 Firehose가 [재시도 기간][11] 내에 Datadog HTTP 엔드포인트로 레코드를 전송할 수 없고 S3 백업에도 레코드를 기록할 수 없을 때 발생할 수 있습니다. 두 전송 경로가 모두 실패하면 엔드포인트를 다시 사용할 수 있게 된 후에도 전송 스트림이 HTTP 전송을 자동으로 재개하지 못할 수 있습니다.

전송을 진단하고 복구하려면 다음을 수행하세요.

1. 영향을 받는 CloudWatch Metric Stream과 연결된 Firehose 전송 스트림을 찾습니다. 다음 AWS CLI 명령을 실행하여 응답에서 다음과 같이 `FirehoseArn`을 찾습니다.

   ```shell
   aws cloudwatch get-metric-stream \
     --name <METRIC_STREAM_NAME> \
     --region <AWS_REGION>
   ```

2. CloudWatch Logs에서 [Firehose 전송 오류 로그][12]를 검토합니다. 전송 오류 로깅이 활성화되어 있지 않으면 향후 전송 오류를 캡처할 수 있도록 활성화합니다. 관련 오류에는 `HttpEndpoint.DestinationException`(예: HTTP 408 응답) 및 `S3.AccessDenied`가 포함됩니다.
3. CloudWatch 콘솔에서 [Firehose CloudWatch 메트릭][13]을 검사합니다. 전송이 중단된 동안에는 Datadog에 이 메트릭이 표시되지 않을 수 있습니다. `DeliveryToHttpEndpoint.Success`, `DeliveryToHttpEndpoint.DataFreshness`, `DeliveryToHttpEndpoint.Records` 및 `IncomingRecords`를 확인하세요.
4. Firehose가 레코드를 수신하지만 전송하지 못하는 경우 S3 백업 구성 및 IAM 역할을 확인합니다.
   - Firehose가 구성된 역할을 맡아 백업 버킷에 쓸 수 있는지 확인합니다.
   - 버킷 정책, 권한 경계, 서비스 제어 정책(SCP) 및 KMS 키 정책이 필요한 액세스를 거부하지 않는지 확인합니다.
5. Firehose 전송 스트림의 S3 백업 설정에 구성된 접두사 아래의 백업 버킷을 확인하여 레코드가 S3에 도달하고 있는지 확인합니다. 객체가 기록되지 않는다면 S3 백업 경로에 대한 권한 또는 구성 문제가 있음을 의미합니다. 2단계의 전송 오류 로그에 S3 권한 오류가 표시되면 계속하기 전에 수정하세요.
6. Firehose [UpdateDestination API][14]를 사용하여 Firehose HTTP 대상 구성을 업데이트하세요(예: 재시도 기간 변경). 이와 같은 구성 업데이트는 중단된 대상을 다시 시작할 수 있습니다.

전송이 복구되지 않으면 [Datadog 지원][15]에 문의하고 다음 정보를 제공하세요.
   - AWS 계정 ID 및 리전
   - CloudWatch Metric Stream 및 Firehose 전송 스트림 ARN
   - 전송이 중단된 대략적인 시간
   - 관련 Firehose 오류 로그

**참고**: 전송을 다시 시작하면 새 레코드에만 영향을 미치며 중단 중에 실패한 레코드는 백필되지 않습니다. S3 백업에 기록된 레코드는 Datadog으로 자동으로 수집되지 않습니다.

## 추가 자료 {#further-reading}
 {{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/guide/cloud-metric-delay/
[2]: https://aws.amazon.com/cloudwatch/pricing/
[3]: /ko/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account-Setup.html
[5]: https://app.datadoghq.com/integrations/amazon-web-services
[6]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-troubleshoot.html
[7]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
[8]: https://app.datadoghq.com/metric/explorer
[9]: /ko/monitors/types/metric/
[10]: /ko/monitors/guide/set-up-an-alert-for-when-a-specific-tag-stops-reporting/
[11]: https://docs.aws.amazon.com/firehose/latest/dev/retry.html
[12]: https://docs.aws.amazon.com/firehose/latest/dev/monitoring-with-cloudwatch-logs.html
[13]: https://docs.aws.amazon.com/firehose/latest/dev/monitoring-with-cloudwatch-metrics.html#fh-http-metrics
[14]: https://docs.aws.amazon.com/firehose/latest/APIReference/API_UpdateDestination.html
[15]: /ko/help/