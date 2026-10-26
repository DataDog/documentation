---
aliases:
- /ko/dora_metrics/ai-impact/
- /ko/dora_metrics/ai_impact/
description: AI 코딩 어시스턴트가 Software Delivery 성능에 미치는 영향을 측정할 수 있습니다.
further_reading:
- link: /delivery_performance/ai_impact/setup
  tag: 설명서
  text: AI Impact 설정
- link: /delivery_performance/dora_metrics/
  tag: 설명서
  text: DORA Metrics에 대해 알아보기
- link: /delivery_performance/dora_metrics/setup/
  tag: 설명서
  text: DORA Metrics 설정
- link: /delivery_performance/dora_metrics/calculation/
  tag: 설명서
  text: DORA Metrics 계산 방식 알아보기
- link: https://www.datadoghq.com/blog/devex-measurement-pitfalls-ai-era/
  tag: 블로그
  text: AI 시대에 개발자 경험을 측정할 때 피해야 할 5가지 함정
- link: https://www.datadoghq.com/blog/ai-impact/
  tag: 블로그
  text: Datadog AI Impact로 AI 코딩 도구가 소프트웨어 배포에 미치는 실제 영향 측정하기
- link: https://www.datadoghq.com/blog/how-to-measure-developer-experience-in-the-ai-era/
  tag: 블로그
  text: AI 시대에 개발자 경험을 측정하는 방법
title: AI Impact
---
{{< callout url="#" btn_hidden="true" header="미리 보기에 참여하세요!" >}}
AI Impact는 모든 Datadog 고객에게 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 개요 {#overview}

AI Impact는 코딩 어시스턴트, 검토 에이전트, 자율형 에이전트를 포함한 AI 코딩 도구가 소프트웨어 배포 성능에 어떤 영향을 미치는지 측정합니다. Datadog은 여러 유형의 소스에서 AI 기여도를 탐지합니다. 소스에는 커밋 메타데이터의 공동 작성자 패턴, 공급자 통합, 풀 리퀘스트 레이블 및 사용자가 직접 전송하는 데이터가 포함됩니다.

## 시작하기 {#getting-started}

Datadog은 [DORA Metrics][1]가 배포, 커밋 및 풀 리퀘스트 데이터로 설정된 후 일부 AI 활동을 자동으로 탐지합니다. AI 도구는 커밋 내의 공동 작성자 서명, 검토 의견 및 AI 참여를 나타내는 기타 작성자 정보를 통해 식별될 수 있습니다. 조직 내 AI 활동을 더 완벽하게 파악하려면 [AI Impact 설정][2]을 참조하여 특정 AI 도구와 해당 기여도를 식별하는 소스 및 매핑 규칙을 구성하세요.

## 영향 메트릭 {#impact-metrics}

| 메트릭 | 정의 |
|--------|------------|
| AI 지원 PR | 최소 하나의 AI 지원 커밋이 포함된 PR을 전체 PR 수로 나눈 값입니다. |
| PR 처리량 | AI 지원 작성자와 비지원 작성자를 비교하여 사용자당 하루에 배포된 PR 수입니다. |
| PR 주기 시간 | AI 지원 PR과 비지원 PR을 비교하여 PR의 첫 커밋부터 병합까지 걸린 중앙값 시간입니다. |
| 변경 실패율 | 각 배포에서 AI 지원 커밋의 비율로 가중치를 적용한 실패율을 비지원 커밋의 가중치 비율과 비교한 값입니다. 예를 들어, 실패한 배포의 커밋 10개 중 3개가 AI 지원을 받은 경우, 해당 실패의 30%만이 AI에 기인한 것으로 간주됩니다. |
| 복구 시간 | AI 지원 커밋이 포함된 실패한 배포와 그렇지 않은 배포의 중앙값 복구 시간입니다. |

<div class="alert alert-info">변경 실패율은 코드 변경과 연결된 배포만 포함합니다. 구성 전용 또는 인프라 배포는 AI가 코드 관련 실패에 미치는 영향을 비교에 반영하기 위해 제외됩니다. 이는 모든 배포 유형을 집계하는 표준 DORA 변경 실패율과는 다릅니다.</div>

<div class="alert alert-info">GitHub의 경우에만 PR 수준 메트릭은 전적으로 봇이 작성한 커밋을 가진 PR을 제외합니다. 따라서 자동화된 활동이 계속 비 AI 기준선에서 제외됩니다.</div>

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/delivery_performance/dora_metrics/setup/
[2]: /ko/delivery_performance/ai_impact/setup/