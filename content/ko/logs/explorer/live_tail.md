---
aliases:
- /ko/logs/explore/livetail
- /ko/logs/live_tail
description: 모든 로그를 검색하고 로그 분석 실행
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리하는 방법 배우기
- link: logs/explorer/side_panel
  tag: 설명서
  text: 로그 사이드 패널
- link: logs/explorer/#list-of-logs
  tag: 설명서
  text: 로그 목록 보기
kind: 설명서
title: 라이브 테일
---

## 개요

라이브 테일을 사용하면 인프라스트럭처 어디서든 거의 실시간으로 로그 이벤트에 접근할 수 있습니다. 라이브 테일 보기로 인덱싱 여부와 상관없이 **모든** 로그를 확인할 수 있습니다(로그 인덱스의 [제외 필터][1] 참조). 라이브 테일로 유입되는 로그는 모두 [로그 파이프라인][2]에서 구조화, 처리, 보강됩니다.

예를 들어, 라이브 테일은 프로세스가 올바르게 시작되었거나 신규 배포가 원활하게 진행되었는지 확인하는 데 특히 유용합니다.

## 라이브 테일 보기

[로그 익스플로러][3]에서 시간 범위 내 라이브 테일 옵션을 선택하여 Datadog로 유입되는 로그 쿼리를 빌드합니다.

{{< img src="logs/explorer/live_tail/livetail.mp4" alt="라이브 테일 로그" video=true style="width:100%;" >}}

[로그 익스플로러][3]의 인덱싱 로그의 쿼리와는 달리 라이브 테일 쿼리는 사전에 [패싯을 선언][4]할 필요가 *없습니다*.

**참고**: 가독성을 위해 라이브 테일 아웃풋은 유입 쿼리와 일치하는 로그가 너무 많을 경우 샘플링됩니다. 라이브 테일 로그가 실제 로그 처리량을 통계적으로 대표할 수 있도록 샘플은 균일하게 무작위로 수집됩니다. 유입되는 모든 로그를 각각 식별하고자 한다면 추가 검색 필터를 적용하여 쿼리 범위를 좁힙니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/indexes#exclusion-filters
[2]: /ko/logs/log_configuration/pipelines
[3]: /ko/logs/explorer
[4]: /ko/logs/explorer/facets/