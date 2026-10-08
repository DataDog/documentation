---
description: Cloudcraft의 APM 오버레이를 사용하여 아키텍처 다이어그램에서 클라우드 리소스 간 분산 트레이스를 시각화하세요.
further_reading:
- link: /datadog_cloudcraft/overlays/infrastructure/
  tag: 문서
  text: 인프라 오버레이
- link: /datadog_cloudcraft/overlays/observability/
  tag: 문서
  text: 관측 가능성 오버레이
- link: /datadog_cloudcraft/overlays/security/
  tag: 문서
  text: 보안 오버레이
- link: /datadog_cloudcraft/overlays/ccm/
  tag: 문서
  text: Cloud Cost Management 오버레이
- link: /tracing/
  tag: 문서
  text: APM
site_support_id: cloudcraft_apm_overlay
title: APM
---
<div class="alert alert-info">APM 오버레이는 미리 보기로 제공되고 있으며 AWS 계정에서만 사용할 수 있습니다.</div>

## 개요 {#overview}

APM 오버레이는 Cloudcraft 다이어그램의 클라우드 리소스 간에 분산 APM 트레이스를 아크로 표시합니다. 이를 통해 아키텍처 보기를 벗어나지 않고도 인프라 전반의 서비스 간 요청 흐름을 파악할 수 있습니다.

오버레이를 열려면 다이어그램 상단의 오버레이 선택기에서 {{< ui >}}APM{{< /ui >}} 탭을 클릭하세요.

### 지원되는 리소스 유형 {#supported-resource-types}

APM 오버레이는 트레이스 데이터에 클라우드 리소스 ID(CCRID)가 포함된 리소스에 대한 연결을 보여줍니다. 지원되는 리소스 유형은 다음과 같습니다.

- EC2
- S3
- Lambda
- RDS

{{< img src="datadog_cloudcraft/overlays/cloudcraft_apm_overlay_diagram.png" alt="AWS 아키텍처 다이어그램 전반에서 서비스를 연결하는 녹색 트레이스 아크를 보여주는 Cloudcraft의 APM 오버레이이며, 왼쪽 하단에 트레이스 수와 범례가 표시되어 있습니다." style="width:100%;" >}}

## 전제 조건 {#prerequisites}

APM이 Datadog 조직에서 활성화되어 있어야 합니다. 즉, 지난 30일 동안 최소 하나의 스팬이 수집되어야 합니다. APM이 설정되지 않은 경우, Cloudcraft는 [APM 설정][1] 링크가 포함된 온보딩 화면을 표시합니다.

## 트레이스 연결 시각화 {#visualize-trace-connections}

APM 오버레이가 활성화되면 다이어그램의 리소스 노드 사이에 곡선 아크로 트레이스가 나타납니다. 각 아크는 두 리소스 간의 분산 트레이스 트래픽을 나타냅니다.

### 범례 {#legend}

| 아크 색상 | 상태 |
|-----------|--------|
| 녹색     | OK     |
| 빨간색       | 오류  |

화면 하단의 범례 패널을 사용하여 상태별로 트레이스를 필터링하세요. 범례에는 현재 표시된 트레이스 수도 표시됩니다. 모든 상태의 선택을 취소하면 보기가 재설정되어 모든 트레이스가 표시됩니다.

## 트레이스 조사 {#investigate-traces}

트레이스 아크를 클릭하면 해당 두 리소스 간 APM 트레이스 목록을 보여주는 사이드 패널이 열립니다. 사이드 패널에는 다음 항목이 포함됩니다.

- 쿼리별로 트레이스를 필터링하는 검색 창
- 시간 선택기(기본값은 최근 30분)
- 트레이스 데이터를 스트리밍하기 위한 {{< ui >}}live mode{{< /ui >}} 토글
- 표시할 필드를 사용자 지정하는 열 선택기 기본 열에는 기간, 서비스, 리소스 이름 및 오류 유형이 포함됩니다.
- [Traces Explorer][2]에서 동일한 쿼리를 볼 수 있는 {{< ui >}}open in APM{{< /ui >}} 링크

사이드 패널에서 트레이스 행을 클릭하면 표준 APM 플레임 그래프가 표시되는 트레이스 상세 보기가 열립니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/trace_collection/automatic_instrumentation/single-step-apm/
[2]: /ko/tracing/trace_explorer/