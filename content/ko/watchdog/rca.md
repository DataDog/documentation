---
further_reading:
- link: /watchdog/faq/root-cause-not-showing/
  tag: 설명서
  text: 근본 원인이 표시되지 않음
- link: https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/
  tag: 블로그
  text: 자동 근본 원인 분석
title: Watchdog RCA
---

## 개요

Watchdog 근본 원인 분석(RCA)은 인시던트 선별 중에 예비 조사를 자동화하여 평균 복구 시간(MTTR)을 줄이는 데 도움을 줍니다. Watchdog AI 엔진은 애플리케이션 성능 이상과 관련 구성 요소 간의 상호 종속성을 식별하여 여러 증상 간의 인과 관계를 도출합니다. Watchdog은 APM 이상을 발견할 때마다 이상 원인 및/또는 결과에 대한 더 깊은 인사이트를 제공하기 위해 근본 원인 분석을 시작합니다.

Watchdog RCA는 [APM][1]을 사용해야 합니다. Watchdog이 영향을 받는 서비스에 대한 모든 관련 Datadog 원격 분석을 최대한 활용하려면 [통합 태깅][2]을 설정할 것을 권장합니다.

Watchdog RCA는 분석에서 다음과 같은 데이터 소스를 고려합니다.

* APM 오류율, 레이턴시 및 적중률 메트릭
* APM 배포 추적
* APM 트레이스
* CPU 사용량, 메모리 사용량 및 디스크 사용량을 포함한 에이전트 기반 인프라스트럭처 메트릭
* AWS 인스턴스 상태 점검 메트릭
* 로그 패턴 이상

## Watchdog 근본 원인 분석의 구성 요소

{{< img src="watchdog/rca/root_cause.png" alt="근본 원인, 심각한 오류 및 영향을 보여주는 Watchdog 근본 원인 분석">}}

Watchdog 근본 원인 분석에는 근본 원인, 심각한 오류 및 영향 등 세 가지 구성 요소가 포함됩니다.

### 근본 원인

근본 원인은 애플리케이션 성능 문제로 이어지는 상태 변경을 가리킵니다. 가능한 상태 변경에는 인프라스트럭처 가용성의 차이, 트래픽 급증 또는 코드 배포가 포함됩니다.

Watchdog은 다음 네 가지 유형의 근본 원인을 지원합니다.

* APM 배포 추적에서 캡처한 버전 변경
* APM 계측 서비스의 적중률 메트릭에 캡처된 트래픽 증가
* AWS EC2 통합 메트릭에서 캡처한 AWS 인스턴스 오류
* Datadog 에이전트의 시스템 메트릭에서 캡처한 디스크 공간 부족

Watchdog은 더 높은 레이턴시 또는 새로운 오류와 같은 애플리케이션 성능 저하를 인시던트의 근본 원인으로 분류하지 않습니다. Datadog은 애플리케이션 성능 저하의 초기 증상을 아래에 설명된 대로 **심각한 오류**라고 부릅니다.

### 심각한 오류

심각한 오류 섹션에서는 근본 원인이 애플리케이션 성능 저하를 가장 먼저(그리고 가장 직접적으로) 일으키는 위치와 방법을 강조 표시합니다. 심각한 오류에는 항상 레이턴시 또는 오류율 증가가 포함됩니다.

### 영향

또한 Watchdog RCA는 근본 원인으로부터 간접적으로 영향을 받는 서비스를 식별합니다. 영향을 받는 것으로 표시된 모든 성능 저하는 심각한 오류가 해결되면 복구될 것으로 예상됩니다. 또한 RUM 사용자의 경우 Watchdog은 성능 이상으로부터 영향을 받은 보기의 경로와 사용자를 자동으로 평가합니다.

{{< img src="watchdog/rca/views_impacted.png" alt="영향을 받는 보기 팝업을 보여주는 Watchdog 근본 원인 분석 상세 정보의 스크린샷">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/
[2]: /ko/getting_started/tagging/unified_service_tagging