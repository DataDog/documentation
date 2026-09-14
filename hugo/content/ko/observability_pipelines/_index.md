---
description: Observability Pipelines를 사용하여 자체 인프라 내에서 로그, 메트릭 및 트레이스를 수집, 처리하고 Datadog,
  Amazon S3, Splunk, Microsoft Sentinel과 같은 목적지로 라우팅하는 방법을 알아보세요.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/explore_templates/
  tag: 설명서
  text: Pipelines 설정
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: 설명서
  text: 사용 사례 및 템플릿 살펴보기
- link: /observability_pipelines/configuration/install_the_worker/
  tag: 설명서
  text: Observability Pipelines Worker 설치하기
- link: /agent/configuration/dual-shipping/#yaml-configuration
  tag: 설명서
  text: Observability Pipelines를 사용한 이중 전송
- link: /observability_pipelines/guide/strategies_for_reducing_log_volume/
  tag: 설명서
  text: 로그 볼륨 축소 전략
- link: https://learn.datadoghq.com/courses/course-getting-started-observability-pipelines
  tag: 학습 센터
  text: Observability Pipelines 시작하기
- link: https://www.datadoghq.com/blog/observability-pipelines-reference-tables-log-enrichment/
  tag: 블로그
  text: Reference Tables와 Observability Pipelines를 사용하여 로그에 동적으로 업데이트되는 컨텍스트 추가하기
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: 블로그
  text: Observability Pipelines를 사용하여 AI 앱의 OTel 데이터를 ClickHouse 및 Datadog으로 라우팅하기
- link: https://www.datadoghq.com/blog/observability-pipelines-sensitive-data-redaction/
  tag: 블로그
  text: Observability Pipelines로 온프레미스 환경에서 민감한 로그 데이터를 보호하는 방법
- link: https://www.datadoghq.com/blog/observability-pipelines-dual-ship-logs/
  tag: 블로그
  text: Datadog Observability Pipelines로 로그를 동시에 전송하기
- link: https://www.datadoghq.com/blog/observability-pipelines-log-volume-control/
  tag: 블로그
  text: Datadog Observability Pipelines를 활용한 로그 볼륨 최적화
- link: https://www.datadoghq.com/blog/observability-pipelines-archiving/
  tag: 블로그
  text: Datadog으로의 간편하고 경제적인 마이그레이션을 위해 Observability Pipelines로 로그 아카이빙하기
- link: https://www.datadoghq.com/blog/observability-pipelines/
  tag: 블로그
  text: 'Datadog Observability Pipelines: 로그 수집부터 전송까지 한 번에'
- link: https://www.datadoghq.com/blog/observability-pipelines-stream-logs-in-ocsf-format/
  tag: 블로그
  text: Observability Pipelines를 사용하여 OCSF 형식의 로그를 선호하는 보안 공급업체나 데이터 레이크로 스트리밍하기
- link: https://www.datadoghq.com/blog/observability-pipelines-route-logs-microsoft-sentinel/
  tag: 블로그
  text: Datadog Observability Pipelines를 사용하여 Microsoft Sentinel로의 SIEM 마이그레이션 간소화하기
- link: https://www.datadoghq.com/blog/sled-observability-pipelines/
  tag: 블로그
  text: 주정부, 지방정부 및 교육 기관이 Datadog Observability Pipelines를 사용하여 로그를 유연하고 효율적으로 관리하는
    방법
- link: https://www.datadoghq.com/blog/optimize-high-volume-logs/
  tag: 블로그
  text: 가시성을 저해하지 않으면서 대용량 로그 데이터를 최적화하는 방법
- link: https://www.datadoghq.com/blog/archive-search/
  tag: 블로그
  text: Datadog Archive Search로 과거 로그를 더 효율적으로 검색하기
- link: https://www.datadoghq.com/blog/introducing-datadog-cloudprem/
  tag: 블로그
  text: Datadog BYOC Logs를 사용하여 자체 인프라에서 페타바이트 규모로 로그를 저장하고 검색하기
- link: https://www.datadoghq.com/blog/manage-high-volume-logs-with-observability-pipeline-packs/
  tag: 블로그
  text: Observability Pipelines의 Packs를 사용하여 모든 SIEM 또는 데이터 레이크의 로그 비용 관리하기
- link: https://www.datadoghq.com/blog/observability-pipelines-otel-cost-control/
  tag: 블로그
  text: 벤더 중립적인 로그 수집 및 비용 제어를 위해 OpenTelemetry와 Observability Pipelines 사용하기
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: 블로그
  text: Datadog Observability Pipelines를 사용하여 MSSP의 로그 수집 및 집계 간소화하기
- link: https://www.datadoghq.com/blog/manage-metrics-cost-control-with-observability-pipelines
  tag: 블로그
  text: Observability Pipelines를 사용하여 환경 내의 메트릭 볼륨과 태그 관리하기
title: Observability Pipelines
---
## 개요 {#overview}

{{< img src="observability_pipelines/op_marketecture_06042025.png" alt="다양한 소스에서 수집된 데이터가 자체 환경의 Observability Pipelines Worker에서 처리 및 보강된 후, 사용자가 선택한 보안, 분석 및 스토리지 전송 목적지로 라우팅되는 과정을 나타내는 그래픽" style="width:100%;" >}}

Datadog Observability Pipelines를 사용하면 자체 인프라 내에서 로그, 메트릭 및 트레이스를 수집하고 처리한 후 {{< tooltip text="logs, metrics, and traces" tooltip="사용 사례 및 가격 책정에 대해 논의하려면 계정 관리자에게 문의하세요." >}} 데이터를 여러 목적지로 라우팅할 수 있습니다. 이를 통해 관측 가능성 데이터가 자체 환경을 벗어나기 전에 이를 제어할 수 있습니다.

기본 제공 템플릿을 사용하여 민감한 데이터를 마스킹하고, 데이터를 보강하며, 노이즈가 많은 이벤트를 필터링하고, Datadog, SIEM 도구 또는 클라우드 스토리지와 같은 목적지로 데이터를 라우팅하는 파이프라인을 구축할 수 있습니다.

## 주요 구성 요소 {#key-components}

### Observability Pipelines Worker {#observability-pipelines-worker}

Observability Pipelines Worker는 인프라 내에서 실행되어 데이터를 집계, 처리 및 라우팅합니다.

<div class="alert alert-info">
Datadog은 Observability Pipelines Worker(OPW)를 모든 마이너 및 패치 릴리스별로, 또는 적어도 매월 업데이트할 것을 권장합니다. <br><br> 주요 OPW 버전으로 업그레이드하고 업데이트된 상태를 유지하는 것이 최신 OPW 기능, 수정 사항 및 보안 업데이트를 이용하기 위해 지원되는 유일한 방법입니다. 최신 Worker 버전으로 업데이트하려면 <a href="/observability_pipelines/configuration/install_the_worker/#upgrade-the-worker">Worker 업그레이드</a>를 참조하세요</a>.
</div>

### Observability Pipelines UI {#observability-pipelines-ui}

Observability Pipelines UI는 다음과 같은 작업을 수행할 수 있는 중앙 집중식 컨트롤 플레인을 제공합니다.

- 가이드 템플릿을 사용해 파이프라인을 빌드하고 편집합니다.
- Observability Pipelines Worker를 배포하고 관리합니다.
- 모니터를 활성화하여 파이프라인 상태를 추적합니다.

## 시작하기 {#get-started}

1. [Observability Pipelines][1]로 이동합니다.
1. 사용 사례에 따라 적합한 [템플릿](#common-use-cases-and-templates)을 선택합니다.
1. 파이프라인을 설정합니다.
    1. 로그 [소스][2]를 선택합니다.
    1. [프로세서][3]를 구성합니다.
    1. 하나 이상의 [목적지][4]를 추가합니다.
1. 환경에 [Worker를 설치][5]합니다.
1. 파이프라인 상태를 실시간으로 관찰할 수 있도록 모니터를 활성화합니다.

자세한 지침은 [파이프라인 설정][6]을 참조하세요.

## 일반적인 사용 사례 및 템플릿 {#common-use-cases-and-templates}

Observability Pipelines에는 일반적인 데이터 라우팅 및 변환 워크플로를 위한 사전 구축된 템플릿이 포함되어 있습니다. 사용자의 필요에 맞게 완전히 사용자 지정하거나 결합할 수 있습니다.

{{< img src="observability_pipelines/eight_templates.png" alt="8개의 템플릿이 표시된 Observability Pipelines UI" style="width:100%;" >}}

### 템플릿 {#templates}

{{< tabs >}}
{{% tab "로그" %}}

| 템플릿 | 설명 |
|----------|-------------|
| 로그 보관 | 장기 보존 및 리하이드레이션을 위해 원시 로그를 Amazon S3, Google Cloud Storage 또는 Azure Storage에 저장합니다. |
| 로그 이중 전송 | 동일한 로그 스트림을 여러 목적지(예: Datadog 및 SIEM)로 전송합니다. |
| 로그 기반 메트릭 생성 | 대용량 로그를 카운트 메트릭 또는 분포 메트릭으로 변환하여 스토리지 요구량을 줄입니다. |
| 로그 보강 | 더 효과적인 쿼리를 위해 참조 테이블이나 정적 매핑에서 메타데이터를 추가합니다. |
| 로그 볼륨 제어 | 저장하기 전에 가치가 낮은 로그를 필터링하여 인덱싱된 로그 볼륨을 줄입니다. |
| 민감한 데이터 마스킹 | 내장 또는 사용자 지정 규칙을 사용하여 개인 식별 정보(PII) 및 시크릿을 감지하고 제거합니다. |
| 로그 분할 | 로그를 유형별(예: 보안 또는 애플리케이션)로 서로 다른 도구로 라우팅합니다. |

{{% /tab %}}
{{% tab "메트릭" %}}

| 템플릿 | 설명 |
|----------|-------------|
| 메트릭 태그 거버넌스 | 필요한 메트릭만 유지하고, 메트릭 태깅을 표준화하며, 원치 않는 태그를 제거하여 높은 카디널리티를 방지함으로써 메트릭의 품질과 볼륨을 관리합니다. |

{{% /tab %}}
{{% tab "트레이스" %}}

| 템플릿 | 설명 |
|----------|-------------|
| 트레이스 샘플링 | 트레이스를 수집, 처리 및 라우팅하여 문제 해결 및 분석에 필요한 트레이스를 유지하면서 비용을 제어합니다. |

{{% /tab %}}
{{< /tabs >}}

자세한 내용은 [템플릿 탐색][7]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ko/observability_pipelines/sources/
[3]: /ko/observability_pipelines/processors/
[4]: /ko/observability_pipelines/destinations/
[5]: /ko/observability_pipelines/configuration/install_the_worker/
[6]: /ko/observability_pipelines/configuration/set_up_pipelines/
[7]: /ko/observability_pipelines/configuration/explore_templates/