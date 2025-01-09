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
title: 라이브 테일
---

## 개요

Live Tail을 사용하면 인프라스트럭처 어디에서나 거의 실시간으로 모든 로그 이벤트에 액세스할 수 있습니다. Live Tail 보기는 Datadog으로 스트리밍되는 인덱싱된 로그와 인덱싱되지 않은 로그 모두에 대한 가시성을 제공합니다. 로그 인덱스에 대한 [제외 필터][1]도 확인해 보세요. Live Tail을 통해 흐르는 로그는 모두 [로그 파이프라인][2]에서 구조화, 처리 및 강화됩니다.

예를 들어, 라이브 테일은 프로세스가 올바르게 시작되었거나 신규 배포가 원활하게 진행되었는지 확인하는 데 특히 유용합니다.

## 라이브 테일 보기

[Log Explorer][3]에서 시간 범위의 Live Tail 옵션을 선택하여 Datadog으로 유입되는 로그를 쿼리합니다. 쿼리에 대한 자세한 내용은 [로그 검색 구문][4]을 참조하세요.

{{< img src="logs/explorer/live_tail/livetail.mp4" alt="라이브 테일 로그" video=true style="width:100%;" >}}

[Log Explorer][3]에서 발생하는 인덱싱된 로그에 대한 쿼리와 달리 Live Tail의 쿼리에서는 사전에 [패싯 선언][5]이 필요하지 *않습니다*.

**참고**: 가독성을 위해 라이브 테일 아웃풋은 유입 쿼리와 일치하는 로그가 너무 많을 경우 샘플링됩니다. 라이브 테일 로그가 실제 로그 처리량을 통계적으로 대표할 수 있도록 샘플은 균일하게 무작위로 수집됩니다. 유입되는 모든 로그를 각각 식별하고자 한다면 추가 검색 필터를 적용하여 쿼리 범위를 좁힙니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/indexes#exclusion-filters
[2]: /ko/logs/log_configuration/pipelines
[3]: /ko/logs/explorer
[4]: /ko/logs/explorer/search_syntax/
[5]: /ko/logs/explorer/facets/