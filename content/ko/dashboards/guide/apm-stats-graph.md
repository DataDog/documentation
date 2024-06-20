---
aliases:
- /ko/dashboards/querying/#configuring-an-apm-stats-graph
disable_toc: false
further_reading:
- link: /dashboards/querying/
  tag: 설명서
  text: 그래프 쿼링 방법 알아보기
title: 애플리케이션 성능 모니터링(APM) 통계 그래프 설정
---

## 개요

애플리케이션 성능 모니터링(APM) 통계 데이터를 사용하여 그래프를 설정하려면 다음 단계를 따르세요.

1. 사용 가능한 [위젯][1]에서 시각화를 선택합니다.
2. [세부 수준을 선택합니다](#level-of-detail).
3. [파라미터를 선택합니다](#apm-stats-parameters).
4. 그래프 이름을 지정합니다(메트릭과 동일하게 지정).

### 상세 수준
하나 이상의 서비스, 리소스 또는 스팬(span)에 대한 통계를 보려는 상세 수준을 선택합니다. 모든 위젯 유형에 사용할 수 있는 기능은 아닙니다.

### 애플리케이션 성능 모니터링(APM) 통계 파라미터
그래프 편집기에서 환경(`env`), 기본 태그(`primary_tag`), 서비스(`service`) 및 작업 이름(`name`)과 같은 파라미터를 선택합니다.

상세 수준이 `resource` 또는 `span`인 경우 일부 위젯 유형에서는 쿼리 범위를 좁히기 위해 리소스 이름(`resource`)을 선택해야 합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/widgets/