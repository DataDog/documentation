---
aliases:
- /ko/integrations/faq/are-my-aws-cloudwatch-metrics-delayed/
- /ko/integrations/faq/why-is-there-a-delay-in-receiving-my-data/
- /ko/integrations/faq/cloud-metric-delay
description: API를 통해 수집되는 AWS, Azure, Google Cloud 및 기타 클라우드 통합 메트릭의 예상 지연 시간을 알아보세요.
further_reading:
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: FAQ
  text: 클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유
title: 클라우드 메트릭 지연
---
## 개요 {#overview}

Datadog 클라우드 통합(AWS, Azure, Google Cloud 등)을 사용하면 크롤러가 API를 통해 메트릭을 수집합니다. 클라우드 제공업체 API의 제약으로 인해 메트릭 수집이 지연될 수 있습니다.

## 요약 {#summary}

| 제공업체   | 기본 크롤러  |
|------------|------------------|
| Alibaba    | 10분마다 |
| AWS        | 10분마다(3분마다 수집되는 [RDS 메트릭][3]은 제외) |
| Azure      | 2분마다  |
| Cloudflare | 5분마다 |
| GCP        | 5분마다  |

## 클라우드 제공업체 {#cloud-providers}

특정 클라우드 제공업체와 관련된 세부 정보입니다.

### Alibaba {#alibaba}

Alibaba는 1분 단위의 세분성으로 메트릭을 전송합니다. 따라서 메트릭 수집이 약 7~8분 지연될 수 있습니다.

### AWS {#aws}

AWS는 두 가지 수준의 메트릭 세분성(5분 및 1분 단위 메트릭)을 제공합니다. CloudWatch에서 5분 단위 메트릭을 수신하는 경우, 메트릭을 수신하기까지 약 15~20분이 지연될 수 있습니다. 이는 CloudWatch의 데이터 제공 지연 시간 5~10분에 Datadog의 기본 수집 주기인 10분([RDS 메트릭][3]은 3분)이 더해지기 때문입니다. 대기열 및 CloudWatch API의 제한으로 인해 최대 5분의 지연이 추가될 수 있습니다. CloudWatch에서 1분 단위 메트릭을 수신하는 경우, 메트릭을 사용할 수 있기까지 약 2분이 지연되므로 메트릭을 조회하기까지 총 10~12분 정도 걸릴 수 있습니다.

또한 CloudWatch API는 데이터를 가져오기 위해 메트릭별 크롤링만 제공합니다. CloudWatch API에는 인증 정보, 리전 및 서비스의 조합에 따라 달라지는 요청 속도 제한이 있습니다. AWS는 계정 수준에 따라 메트릭을 제공합니다 예를 들어, AWS에서 *상세 메트릭*을 유료로 이용하는 경우, 해당 메트릭을 더 빠르게 사용할 수 있습니다. 상세 메트릭의 이러한 서비스 수준은 데이터의 세분성에도 적용되며, 일부 메트릭은 1분 단위로, 다른 메트릭은 5분 단위로 제공됩니다.

선택한 [Datadog 사이트][4]({{< region-param key="dd_site_name" >}})에서 필요시 Amazon CloudWatch Metric Streams 및 Amazon Data Firehose를 구성하여 CloudWatch 메트릭을 약 2~3분의 지연 시간으로 Datadog에 더 빠르게 가져올 수 있습니다. 이 접근 방식에 대해 자세히 알아보려면 [메트릭 스트리밍 관련 문서][5]를 참조하세요.


### Azure {#azure}

Azure는 1분 단위의 세분성으로 메트릭을 제공합니다. 따라서 메트릭 수집이 약 4~5분 지연될 수 있습니다.

### GCP {#gcp}

GCP는 1분 단위의 세분성으로 메트릭을 제공합니다. 따라서 메트릭 수집이 약 7~8분 지연될 수 있습니다.

## 모니터링 {#monitors}

Datadog에서 모니터링을 생성할 때 지연된 메트릭을 선택하면 경고 메시지가 표시됩니다. Datadog은 이러한 메트릭에 대해 시간 범위를 확장하고 모니터링 평가를 지연할 것을 권장합니다.

<div class="alert alert-info">AWS 기반 메트릭 모니터링의 경우, {{< ui >}}Edit{{< /ui >}}으로 권장 평가 지연 시간(일반적으로 900초)이 표시될 수 있습니다. 해당 값은 AWS 통합에서 가져오며 {{< ui >}}Save{{< /ui >}}를 클릭하기 전까지는 저장되지 않습니다. 저장된 구성을 확인하려면 모니터링 {{< ui >}}Status{{< /ui >}} 페이지를 열고 JSON을 내보낸 뒤 <code>evaluation_delay</code>를 찾습니다. 필드가 누락된 경우 {{< ui >}}Edit{{< /ui >}}에서 지연 시간을 설정하고 모니터링을 저장하세요.</div>

## 더 빠른 메트릭 {#faster-metrics}

가능하다면 클라우드 호스트에 Datadog Agent를 설치하여 시스템 수준 메트릭을 거의 지연 없이 수집하세요. 클라클라우드 인스턴스에 Datadog Agent를 설치할 때 얻을 수 있는 이점의 전체 목록은 [클라우드 인스턴스에 Datadog Agent를 설치해야 하는 이유][1] 문서를 참조하세요.

AWS, Azure 및 GCP 통합의 경우, Datadog 에서 모든 메트릭을 수집하는 기본 메트릭 크롤러의 속도를 높일 수 있습니다. 또한 AWS의 경우, Datadog은 네임스페이스별 크롤러를 보유하고 있습니다. 자세한 내용은 [Datadog 지원팀][2]에 문의하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[2]: /ko/help/
[3]: /ko/integrations/amazon-rds/#metrics
[4]: /ko/getting_started/site/
[5]: /ko/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/