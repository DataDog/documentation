---
aliases:
- /ko/tracing/watchdog
description: 잠재적인 애플리케이션 및 인프라스트럭처 문제를 자동으로 감지
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Watchdog
  tag: 릴리스 노트
  text: 최신 Datadog Watchdog 릴리스를 확인하세요! (앱 로그인 필요).
- link: /logs/
  tag: 설명서
  text: 로그 수집
- link: /infrastructure/process/
  tag: 설명서
  text: 프로세스 수집
- link: /tracing/
  tag: 설명서
  text: 트레이스 수집
- link: https://www.datadoghq.com/blog/datadog-watchdog-automated-root-cause-analysis/
  tag: 블로그
  text: Watchdog RCA를 통한 자동화된 근본 원인 분석
- link: https://www.datadoghq.com/blog/watchdog-impact-analysis/
  tag: 블로그
  text: Watchdog Impact Analysis로 사용자 영향 범위 이해
kind: 설명서
title: Watchdog
---

{{< img src="watchdog/watchdog.png" alt="오류율에 대한 2개의 중요 경고가 제공되는 Watchdog 경고 페이지" >}}

## 개요

Watchdog은 잠재적인 애플리케이션 및 인프라스트럭처 문제를 자동으로 감지하는 APM 성능 및 인프라스트럭처 메트릭을 위한 알고리즘 기능입니다. 이상 징후와 대시보드를 구동할 때와 동일한 시즌 알고리즘을 활용합니다. Watchdog은 다음에서 추세와 패턴을 관찰합니다.

* APM 메트릭:
  * 히트(요청률)
  * 오류율
  * 레이턴스

* 통합 항목의 인프라스트럭처 메트릭:
  * 호스트 수준 메모리 사용량(메모리 누수) 및 TCP 재전송 속도의 경우에는 [System][1]
  * [Redis][2]
  * [PostgreSQL][3]
  * [NGINX][4]
  * [S3][6], [ELB/ALB/NLB][7], [CloudFront][8] 및 [DynamoDB][9] Amazon 서비스의 경우에는 [Amazon Web Services][5]
  * [Alerting][10]

Watchdog은 적중률의 갑작스러운 급증과 같은 메트릭의 불규칙성을 찾습니다. 각 불규칙성에 대해 [Watchdog 페이지][11]에 Watchdog 경고가 표시됩니다. 각 경고에는 감지된 메트릭 불규칙성에 대한 그래프가 포함되며, 관련 타임프레임 및 엔드포인트에 대한 상세 정보를 제공합니다. Watchdog은 Datadog 에이전트 또는 통합 항목에서 보낸 데이터를 자동으로 모니터링합니다.

메트릭, 로그 또는 기타 데이터의 새로운 소스와 관련하여 Watchdog은 예상 동작의 베이스라인을 설정하기 위해 2주간의 데이터를 필요로 합니다. 2주 미만의 데이터를 기반으로 Watchdog에서 감지한 이상 징후에는 부정확성이 포함될 수 있습니다.

## 서비스 목록의 Watchdog

Watchdog이 APM 메트릭에서 불규칙성을 감지하면 [APM 서비스 목록][12]에서 영향을 받는 서비스 옆에 분홍색 Watchdog 쌍안경 아이콘이 나타납니다. 쌍안경 옆의 숫자는 Watchdog이 해당 서비스 내에서 감지한 문제의 수를 나타냅니다.

{{< img src="watchdog/service_list.png" alt="5개의 서비스를 보여주는 APM 서비스 목록 페이지의 스크린샷. 웹 스토어 서비스 이름 뒤에는 분홍색 쌍안경 아이콘이 있습니다." style="width:75%;" >}}

[서비스 페이지][13]로 이동하여 메트릭 이상 징후에 대한 자세한 내용을 볼 수 있습니다. 페이지 상단에는 Watchdog Insights 상자가 있습니다. Watchdog Insights는 더 높은 오류율 또는 레이턴시와 같은 비정상적인 동작과 관련된 태그 값을 검색하는 데 도움이 됩니다.

메트릭 그래프에서도 Watchdog 아이콘을 찾을 수 있습니다.

{{< img src="watchdog/latency_graph.png" alt="y축에 서비스 레이턴시(초)를 표시하고 x축에 하루 중 시간을 표시하는 그래프. 전체 그래프가 분홍색으로 강조 표시되고 상단에 May 2: 13:31 Ongoing이라는 단어가 표시됩니다." style="width:75%;" >}}

쌍안경 아이콘을 클릭하면 자세한 내용이 포함된 [Watchdog 경고][14] 카드를 볼 수 있습니다.

## 트러블슈팅

도움이 필요하시면 [Datadog 지원팀][15]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/system/
[2]: /ko/integrations/redisdb/
[3]: /ko/integrations/postgres/
[4]: /ko/integrations/nginx/
[5]: /ko/integrations/amazon_web_services/
[6]: /ko/integrations/amazon_s3/
[7]: /ko/integrations/amazon_elb/
[8]: /ko/integrations/amazon_cloudfront/
[9]: /ko/integrations/amazon_dynamodb/
[10]: /ko/monitors/
[11]: https://app.datadoghq.com/watchdog
[12]: /ko/tracing/services/services_list/
[13]: /ko/tracing/services/service_page/#overview
[14]: /ko/watchdog/alerts#alert-details
[15]: /ko/help/