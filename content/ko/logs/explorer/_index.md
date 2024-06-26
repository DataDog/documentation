---
aliases:
- /ko/logs/explore
- /ko/logs/patterns
- /ko/logs/graph
- /ko/logs/analytics
- /ko/logs/explorer/list
- /ko/logs/explorer/patterns
- /ko/logs/explorer/transactions/
description: 모든 로그를 검색하고 로그 분석 실행
further_reading:
- link: logs/explorer/live_tail
  tag: 설명서
  text: Live Tail에서 로그 미리보기
- link: real_user_monitoring/
  tag: 설명서
  text: 로그 탐색기 자동 설정
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: 블로그
  text: 클립보드에 로그 탐색기 URL 추가
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-kinesis-firehose-and-datadog/
  tag: 블로그
  text: Amazon Kinesis  Data Firehose 및 Datadog으로 Amazon VPC 플로우 로그 전송
kind: 설명서
title: 로그 탐색기
---

## 개요

[**로그 탐색기**][1]는 로그 문제 해결 및 탐색을 위한 홈베이스입니다. 처음부터 시작하든, [저장된 보기][2]에서 시작하든, 모니터 알림이나 대시보드 위젯 등 다른 상황에서 여기로 이동하든, 로그 탐색기에서 로그를 검색 및 필터링하고, 그룹화하고, 시각화하고, 내보낼 수 있습니다.

{{< img src="/logs/explore.png" alt="수집한 로그 탐색" style="width:100%;">}}

## 검색 및 필터링

로그에 대한 **검색** 및 **필터링**을 통해 현재 관심 분야에 맞춰진 로그 하위 집합으로 범위를 좁히거나 넓히거나 포커스를 전환하세요.

  - 로그 탐색기에서 로그를 검색하는 방법에 대해 자세히 알아보려면 [로그 검색][3]을 읽어보세요.
  - 로그 탐색기에서 쿼리 생성 및 패싯 사용을 시작하려면 [로그 검색 구문][4]을 읽어보세요.
  - [Watchdog Insights][9]가 검색 컨텍스트 내에서 오류 로그의 변칙 로그와 이상값을 표시하는 방법을 알아보려면 [Watchdog Insights for Logs][5]를 읽어보세요.

## 분석

정보를 추출하거나 통합하기 위해 쿼리된 로그를 필드, 패턴, 트랜잭션과 같은 상위 수준 항목으로 **그룹화**합니다.

이벤트 하위 집합별로 패턴을 식별하고 로그를 집계하려면 [로그 분석][6]을 참조하세요.

## 시각화

필터 및 집계 결과를 **시각화**하여 로그를 더 잘 이해하고 중요한 정보를 수집하세요. 예를 들어 목록에서 로그를 확인하여 로그 데이터를 열로 구성하거나 시계열 그래프에서 시간 경과에 따른 로그 데이터를 측정할 수 있습니다.

로그 탐색기에서 로그 데이터를 시각화하려면 [로그 시각화][7]를 참조하세요.

## 내보내기

나중에 또는 다른 상황에서 재사용하기 위해 로그 탐색기 보기를 **내보내기**할 수도 있습니다.

로그 쿼리 및 시각화를 내보내는 방법을 알아보려면 [로그 내보내기][8]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /ko/logs/explorer/saved_views/
[3]: /ko/logs/explorer/search
[4]: /ko/logs/explorer/search_syntax/
[5]: /ko/logs/explorer/insights
[6]: /ko/logs/explorer/analytics
[7]: /ko/logs/explorer/visualize
[8]: /ko/logs/explorer/export
[9]: /ko/watchdog/insights