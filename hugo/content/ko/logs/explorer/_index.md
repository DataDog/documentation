---
aliases:
- /ko/logs/explore
- /ko/logs/patterns
- /ko/logs/graph
- /ko/logs/analytics
- /ko/logs/explorer/list
- /ko/logs/explorer/patterns
- /ko/logs/explorer/transactions/
description: 전체 로그에서 검색 및 로그 분석 수행
further_reading:
- link: logs/explorer/live_tail
  tag: 설명서
  text: Live Tail에서 로그 미리보기
- link: logs/explorer/saved_views/
  tag: 설명서
  text: Log Explorer 자동 구성
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: 블로그
  text: 클립보드에 Log Explorer URL 추가
- link: https://www.datadoghq.com/blog/send-amazon-vpc-flow-logs-to-data-firehose-and-datadog/
  tag: 블로그
  text: Amazon Kinesis Data Firehose 및 Datadog으로 Amazon VPC 흐름 로그 전송
- link: https://www.datadoghq.com/blog/ai-powered-log-parsing
  tag: 블로그
  text: AI 기반 로그 구문 분석으로 조사 가속화
- link: https://learn.datadoghq.com/courses/log-explorer
  tag: 학습 센터
  text: Log Explorer 시작
title: Log Explorer
---
## 개요 {#overview}

[**Log Explorer**][1]는 로그 문제 해결 및 탐색을 위한 홈베이스입니다. 처음부터 또는 [저장된 뷰][2]에서 시작하든, 모니터링 알림이나 대시보드 위젯 등 다른 상황에서 여기로 이동하든, Log Explorer에서 로그를 검색 및 필터링하고, 그룹화하고, 시각화하고, 내보낼 수 있습니다.

{{< img src="/logs/explore.png" alt="수집된 로그 탐색" style="width:100%;">}}

## 검색 및 필터링 {#search-and-filter}

로그에 대한 {{< ui >}}Search{{< /ui >}} 및 {{< ui >}}Filter{{< /ui >}}를 통해 현재 관심 분야에 맞춰진 로그 하위 집합으로 범위를 좁히거나 넓히거나 포커스를 전환하세요.

  - Log Explorer에서 로그를 검색하는 방법에 대해 자세히 알아보려면 [로그 검색][3]을 참조하세요.
  - Log Explorer에서 쿼리 생성 및 패싯 사용을 시작하려면 [로그 검색 구문][4]을 참조하세요.
  - [Watchdog Insights][9]가 검색 컨텍스트 내에서 오류 로그의 이상 로그와 이상치를 표시하는 방법을 알아보려면 [Watchdog Insights for Logs][5]를 참조하세요.

## 분석 {#analyze}

정보를 추출하거나 통합하기 위해 쿼리된 로그를 필드, 패턴, 트랜잭션과 같은 상위 수준 항목으로 {{< ui >}}Group{{< /ui >}}을 만드세요. 

이벤트 하위 집합별로 패턴을 식별하고 로그를 집계하려면 [로그 분석][6]을 참조하세요.

## 시각화 {#visualize}

필터 및 집계 결과를 {{< ui >}}Visualize{{< /ui >}}하여 로그를 더 잘 이해하고 중요한 정보를 수집하세요. 예를 들어 목록에서 로그를 확인하여 로그 데이터를 열로 구성하거나 시계열 그래프에서 시간 경과에 따른 로그 데이터를 측정할 수 있습니다. 

Log Explorer에서 로그 데이터를 시각화하려면 [로그 시각화][7]를 참조하세요.

## 내보내기 {#export}

나중에 또는 다른 상황에서 재사용하기 위해 Log Explorer 뷰를 {{< ui >}}export{{< /ui >}}할 수도 있습니다. 

로그 쿼리 및 시각화를 내보내는 방법을 알아보려면 [로그 내보내기][8]를 참조하세요.

## 추가 자료 {#further-reading}

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