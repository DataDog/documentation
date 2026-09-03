---
description: Datadog의 에이전트 기반 조사 기능은 구조화된 초기 근본 원인 분석을 RUM 워크플로에 직접 통합합니다.
further_reading:
- link: /real_user_monitoring/explorer/
  tag: 설명서
  text: RUM Explorer에 대해 자세히 알아보기
title: AI 조사
---
## 개요 {#overview}

RUM에서 사용자 경험이 좋지 않은 경우에는 일반적으로 세션 리플레이, 오류 패널, 트레이스 및 성능 타임라인을 살펴보면서 무엇이 잘못되었는지 파악해야 합니다. AI 조사는 이러한 초기 원인 분석 작업을 자동화합니다. Datadog의 RUM 에이전트는 사용자의 뷰에 연결된 데이터를 검사하고, 우선순위와 범주가 지정된 원인 분석 결과를 RUM 워크플로 내에서 바로 제공합니다.

이 페이지는 사용 가능한 조사 유형을 소개합니다.

## 단일 뷰 AI 조사 {#single-view-ai-investigation}

단일 RUM 뷰에서 에이전트 기반 조사를 실행하여 성능 문제를 조사하거나 특정 페이지 또는 화면에서 최적화 기회를 식별합니다. Datadog의 RUM 에이전트는 뷰 이벤트와 그 하위 이벤트를 검사하여 애플리케이션, 백엔드, 서드파티 라이브러리, 그리고 사용자의 네트워크 환경에 걸친 소스에서 원인을 식별합니다.

{{< img src="real_user_monitoring/ai_investigations/single-view-ai-investigation-overview.png" alt="RUM 뷰에 대한 원인 분석 결과를 제공하는 단일 뷰 AI 조사." style="width:100%;" >}}

자세한 내용은 [단일 뷰 AI 조사][1]를 참조하세요.

## 다중 뷰 AI 조사 {#multi-view-ai-investigation}

느린 성능 지표를 공유하는 여러 뷰의 샘플에 대해 에이전트 기반 조사를 실행합니다. 다중 뷰 AI 조사는 동일한 에이전트 기반 분석을 뷰 집합에 적용하여 전체(뷰 × 성능 지표) 조합이 여러 사용자 사이에서 지속적으로 느리게 작동하는 경우 무엇을 수정해야 할지 파악하는 데 도움을 줍니다. 이 기능은 최적화 페이지에서 Loading Time, Largest Contentful Paint, First Contentful Paint 및 Interaction to Next Paint에 대해 사용할 수 있습니다.

{{< img src="real_user_monitoring/ai_investigations/multi-view-ai-investigation-recommendations.png" alt="성능 지표를 제공하는 최적화 페이지입니다. 각 추천 카드에는 우선순위가 표시되어 있으며, 각각에 Investigate 버튼이 있습니다." style="width:100%;" >}}

자세한 내용은 [다중 뷰 AI 조사][2]를 참조하세요.

## Operation AI 조사 {#operation-ai-investigation}

[Operations Monitoring][3]에서 단일 작업에 대한 에이전트 기반 조사를 실행합니다. 에이전트는 작업의 성공률과 대기 시간을 분석하여 각 실패 모드(오류, 시간 초과, 포기) 및 대기 시간 회귀에 대한 집중 조사를 제공합니다.

{{< img src="real_user_monitoring/ai_investigations/operation-ai-investigation-recommendations.png" alt="작업에 대한 Operations 페이지입니다. 이해하기 쉬운 상태 요약과 우선순위 배지가 표시된 권장 사항 카드가 표시되어 있습니다." style="width:100%;" >}}

자세한 정보는 [Operation AI 조사][4]를 참조하세요.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/ai_investigations/single_view_ai_investigation/
[2]: /ko/real_user_monitoring/ai_investigations/multi_view_ai_investigation/
[3]: /ko/real_user_monitoring/operations_monitoring/
[4]: /ko/real_user_monitoring/ai_investigations/operation_ai_investigation/