---
further_reading:
- link: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
  tag: 설명서
  text: Metric streams - Amazon CloudWatch
- link: https://www.datadoghq.com/blog/amazon-cloudwatch-metric-streams-datadog/
  tag: 블로그
  text: Metric Streams를 사용하여 Amazon CloudWatch 메트릭 수집하기
kind: 가이드
title: Amazon Data Firehose를 사용한 AWS CloudWatch Metric Streams
---
{{% site-region region="us3,gov" %}}
Amazon Data Firehose를 사용한 AWS CloudWatch Metric Streams는 선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.
{{% /site-region %}}

Amazon CloudWatch Metric Streams 및 Amazon Data Firehose를 사용하면 단 2-3분의 지연 시간만으로 CloudWatch 메트릭을 Datadog으로 가져올 수 있습니다. 이는 10분마다 업데이트된 메트릭을 제공하는 Datadog의 기본 API 폴링 접근 방식보다 훨씬 빠릅니다. [클라우드 메트릭 지연 문서][1]에서 API 폴링 접근 방식에 대해 자세히 알아볼 수 있습니다.

## 개요

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric_streaming_diagram.png" alt="메트릭 흐름 다이어그램" responsive="true">}}

1. 메트릭을 스트리밍하려는 각 AWS 계정 및 리전에서 CloudWatch Metric Stream을 생성합니다.
   - (선택 사항) 스트리밍할 제한된 네임스페이스 또는 메트릭 세트를 지정합니다.
2. Metric Stream을 생성하면 Datadog은 즉시 스트리밍 메트릭 수신을 시작하고 추가 설정 없이 이를 Datadog 사이트에 표시합니다.


### Metric Streaming vs API 폴링 {#streaming-vs-polling}

다음은 CloudWatch Metric Streams 사용과 API 폴링 사용 간의 주요 차이점입니다.

- **AWS의 네임스페이스 필터링**: AWS 통합 페이지의 네임스페이스별 기본값과 계정 수준 설정은 API 폴링 접근 방식에만 적용됩니다. AWS 계정의  CloudWatch Metric Streams 설정을 사용하여 스트림의 네임스페이스/메트릭을 포함 및 제외하기 위한 모든 규칙을 관리합니다.

- **2시간 이상 지연되어 보고된 메트릭**: API 폴링은 메트릭 스트리밍이 활성화된 후에도 계속해서 `aws.s3.bucket_size_bytes` 또는 `aws.billing.estimated_charges`와 같은 메트릭을 수집합니다. 이러한 메트릭은 CloudWatch Metric Stream을 통해 전송할 수 없기 때문입니다.

#### API 폴링에서 메트릭 스트림으로 전환
API 폴링 메서드를 통해 특정 CloudWatch 네임스페이스에 대한 메트릭을 이미 수신한 경우 Datadog은 이를 자동으로 감지하고 스트리밍이 시작되면 해당 네임스페이스에 대한 메트릭을 폴링을 중지합니다. AWS 통합 페이지의 설정을 변경 없이 그대로 두세요. Datadog은 계속해서 API 폴링을 사용하여 스트리밍 메트릭에 대한 커스텀 태그 및 기타 메타데이터를 수집합니다.

#### 메트릭 스트림에서 API 폴링으로 다시 전환

나중에 특정 AWS 계정 및 리전 또는 특정 네임스페이스에 대한 메트릭을 스트리밍하지 않을 경우 Datadog은 AWS 통합 페이지의 설정에 따라 다시 API 폴링을 사용하여 해당 메트릭을 자동으로 수집하기 시작합니다. AWS 계정 및 리전에 대한 모든 메트릭 스트리밍을 중지하려면 이 문서의 [메트릭 스트리밍 비활성화 섹션](#disable-metric-streaming) 지침을 따르세요.

### 청구

Datadog은 메트릭 스트리밍에 대한 추가 비용을 청구하지 않습니다.

AWS는 CloudWatch Metric Stream의 메트릭 업데이트 수와 Amazon Data Firehose로 전송된 데이터 볼륨을 기준으로 요금을 청구합니다. 따라서 스트리밍 중인 메트릭 하위 집합에 대한 CloudWatch 비용이 증가할 가능성이 있습니다. 이러한 이유로 Datadog은 더 짧은 지연 시간이 가장 필요한 AWS 메트릭, 서비스, 리전 및 계정에 메트릭 스트림을 사용하고 이외에는 폴링을 사용할 것을 권장합니다. 자세한 내용은 [Amazon CloudWatch 가격][1]을 참조하세요.

스트림의 EC2 또는 Lambda 메트릭은 청구 대상 호스트 수 또는 Lambda 호출 수를 늘릴 수 있습니다 (EC2라면 이러한 호스트와 함수가 AWS 통합 또는 Datadog Agent에서 아직 모니터링되지 않은 경우 ).

## 설정

### 시작 전 참고 사항

1. 메트릭 스트리밍을 활성화하기 전에 차이점을 이해하려면 [Metric Streaming vs API 폴링](#streaming-vs-polling) 섹션을 주의 깊게 읽어보세요.

2. 아직 연결하지 않았다면 AWS 계정을 Datadog에 연결하세요. 자세한 내용은 [CloudFormation 설정 지침][3]을 참조하세요.

### 설치

{{< tabs >}}
{{% tab "CloudFormation" %}}

여러 AWS 리전을 사용하고 있다면 보다 쉽고 간편한 CloudFormation 사용을 권장합니다.

**참고**: Datadog으로의 메트릭 스트리밍은 현재 OpenTelemetry v0.7 출력 형식만 지원합니다.

1. Datadog 사이트에서 [AWS 통합 페이지][1]의 **Configuration** 탭으로 이동합니다.
2. 메트릭 스트리밍 설정을 위해 AWS 계정을 클릭합니다.
3. **Metric Collection**아래 **CloudWatch Metric Streams**에서 **Automatically Using CloudFormation**을 클릭하여 AWS 콘솔에서 스택을 시작합니다.
 {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-setup.png" alt="Automatically Using CloudFormation 버튼이 강조 표시된 AWS 통합 페이지의 Metric Collection 탭에 있는 CloudWatch Metric Streams 섹션" responsive="true" style="width:60%;" >}}
4. 필수 파라미터를 입력합니다.
   - **ApiKey**: [Datadog API 키][2]를 입력합니다.
   - **DdSite**: 해당 [Datadog site][3]를 선택합니다. 사이트: {{< region-param key="dd_site" code="true" >}}
   - **Regions**: 메트릭 스트리밍을 위해 설정하려는 리전의 목록(쉼표로 구분)입니다. 지원되는 리전의 전체 목록은 [메트릭 스트림 사용][4]에 대한 AWS 설명서를 참조하세요.
5. 부수적인 파라미터를 입력합니다.
   - **FilterMethod**: 메트릭 스트리밍에 포함할 네임스페이스 목록을 포함하거나 제외합니다.
   - **First/Second/Third Namespace**: 포함하거나 제외하려는 네임스페이스를 지정합니다. 참고: 네임스페이스 값은 AWS 설명서의 네임스페이스 열 값과 정확하게 일치해야 합니다. 예: AWS/EC2
6. "I acknowledge that AWS CloudFormation might create IAM resources with custom names." (AWS CloudFormation이 사용자 지정 이름으로 IAM 리소스를 생성할 수 있음을 확인했습니다)와 같은 승인 상자를 확인합니다.
7. **Create Stack**을 클릭합니다.

### 결과

스택이 성공적으로 생성되면 Datadog이 변경 사항을 인식할 때까지 5분 동안 기다립니다. 완료를 확인하려면 Datadog의 [AWS 통합 페이지][1]에 있는 **Metric Collection** 탭으로 이동하여 선택한 계정에 대해 활성화된 리전이 나타나는지 확인하세요.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="하나의 활성화된 리전을 가진 AWS 통합 페이지 Metric Collection 탭에 있는 CloudWatch Metric Streams 섹션" responsive="true" style="width:60%;">}}

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /ko/getting_started/site/
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html
{{% /tab %}}
{{% tab "AWS 콘솔" %}}

AWS 콘솔을 사용하여 메트릭 스트림을 설정하려면 각 AWS 리전에 대해 [CloudWatch Metric Stream][2]을 생성합니다.

**참고**: Datadog으로의 메트릭 스트리밍은 현재 OpenTelemetry v0.7 출력 형식만 지원합니다.

1. **Quick AWS Partner Setup**을 선택하고 드롭다운 메뉴에서 AWS 파트너 대상으로 **Datadog**을 선택합니다.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-partner-setup.png" alt="Cloudwatch 메트릭 스트림 빠른 파트너 설정" responsive="true" style="width:60%;">}}
2. 메트릭을 스트리밍하려는 Datadog 사이트를 선택하고 [Datadog API 키][1]를 입력하세요.
3. 모든 CloudWatch 메트릭을 스트리밍할지 아니면 특정 네임스페이스만 스트리밍할지 선택합니다. 특정 메트릭을 제외하는 옵션도 있습니다. 모니터링 계정에 있는 경우 [교차 계정 스트리밍][5]을 활성화하도록 선택할 수도 있습니다.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/metric-stream-namespace-filter.png" alt="Cloudwatch 메트릭 스트림" responsive="true" style="width:60%;">}}
4. **Add additional statistics**에서 Datadog으로 보낼 AWS 백분위수 메트릭을 포함합니다. Datadog이 폴링을 통해 지원하는 백분위수 메트릭 목록은 [CloudFormation 템플릿][3]을 참조하세요.
   {{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/percentiles.png" alt="백분위수" responsive="true" style="width:60%;">}}
5. 메트릭 스트림에 이름을 할당합니다.
6. **Create metric stream**을 클릭합니다.

### 결과

Metric Stream 리소스가 성공적으로 생성된 것을 확인하면 Datadog이 변경 사항을 인식할 때까지 5분 정도 기다립니다. 완료를 확인하려면 Datadog의 [AWS 통합 페이지][4]에 있는 **Metric Collection** 탭으로 이동하여 지정된 AWS 계정에 대해 **CloudWatch Metric Streams**에서 활성화된 리전이 활성화되어 있는지 확인하세요.

{{< img src="integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/active-region.png" alt="하나의 활성화된 리전을 가진 AWS 통합 페이지 Metric Collection 탭에 있는CloudWatch Metric Streams 섹션" responsive="true" style="width:60%;">}}
**참고**: CloudWatch API 폴링을 이미 활성화한 경우 스트리밍으로 전환하면 스트리밍 중인 특정 메트릭이 Datadog에서 이중 계산되는 짧은(최대 5분) 기간이 발생할 수 있습니다. 이는 Datadog의 크롤러가 실행되고 CloudWatch 메트릭을 제출하는 시점과 Datadog이 해당 메트릭 스트리밍이 시작되었음을 인식하고 크롤러를 끄는 시점 사이의 시간차 때문입니다.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#metric-streams:streams/create
[3]: https://github.com/DataDog/cloudformation-template/blob/master/aws_streams/streams_single_region.yaml#L168-L249
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://docs.datadoghq.com/ko/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/#cross-account-metric-streaming
{{% /tab %}}
{{< /tabs >}}

### 교차 계정 메트릭 스트리밍
교차 계정 메트릭 스트리밍을 사용하여 AWS 리전 내의 여러 AWS 계정에 걸쳐 있는 단일 Metric Stream에서 메트릭을 포함합니다. 이렇게 하면 공통 대상의 메트릭을 수집하는 데 필요한 스트림 수를 줄일 수 있습니다. 또한, 모니터링 계정과 [소스 계정을 연결][5]하고 AWS 모니터링 계정에서 Datadog에 대한 교차 계정 스트리밍을 활성화합니다.

이 기능이 제대로 작동하려면 모니터링 계정에 다음 권한이 있어야 합니다.
   * oam:ListSinks
   * oam:ListAttachedLinks

**참고:** 스트리밍 메트릭에 대한 커스텀 태그 및 기타 메타데이터를 수집하려면 소스 계정을 Datadog과 통합하세요.

### 메트릭 스트리밍 비활성화

특정 AWS 계정 및 리전에 대해 메트릭 스트리밍을 완전히 비활성화하려면 AWS Metric Stream 및 관련 리소스를 삭제해야 합니다. Datadog의 메트릭 손실을 방지하려면 다음 삭제 단계를 주의 깊게 따르세요.

[CloudFormation](?tab=cloudformation#installation)으로 스트리밍을 설정하는 경우:
1. 설정 중에 생성된 스택을 삭제합니다.

[AWS 콘솔](?tab=awsconsole#installation)로 스트리밍을 설정하는 경우:
1. 전송 스트림에 연결된 CloudWatch Metric Stream을 삭제합니다.
2. 스트림과 연결된 S3 버킷, Firehose, IAM 역할 및 스트림을 설정하는 동안 생성된 기타 모든 리소스를 삭제합니다.

리소스가 삭제되면 Datadog이 변경 사항을 인식할 때까지 5분 동안 기다립니다. 완료를 확인하려면 Datadog의 [AWS 통합 페이지][4]에 있는 **Metric Collection** 탭으로 이동하여 지정된 AWS 계정의 **CloudWatch Metric Streams** 아래에 비활성화된 리전이 표시되지 않는지 확인하세요.

## 트러블슈팅

Metric Streams 또는 관련 리소스를 설정하는 동안 발생한 문제를 해결하려면 [AWS 트러블슈팅][5]을 참조하세요.

## 참고 자료
 {{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/cloudwatch/pricing/
[2]: https://docs.datadoghq.com/ko/integrations/amazon_web_services/?tab=roledelegation#setup
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-metric-streams-troubleshoot.html
[5]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account-Setup.html