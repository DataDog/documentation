---
algolia:
  tags:
  - rum logs
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: 블로그
  text: 실제 사용자 모니터링
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: 가이드
  text: 교차 제품 연결을 통한 트러블슈팅
title: RUM 및 로그 연결
---

{{< img src="real_user_monitoring/correlate_rum_and_logs/rum_browser_logs.png" alt="RUM 작업 내 브라우저 로그" style="width:100%;" >}}

## 개요

RUM과 로그 통합을 이용하면 애플리케이션 상태를 완전히 가시화할 수 있습니다.

RUM, 백엔드, 인프라스트럭처, 로그 정보뿐만 아니라 프런트엔드 데이터를 사용해 스택 어디에서나 이슈를 파악하고 사용자가 어떤 경험을 하는지 이해할 수 있습니다.

RUM 이벤트를 Datadog로 전송하려면 [Real User Monitoring][1]을 확인하세요.

## RUM은 로그와 어떻게 연결되어 있나요?

로그와 RUM 이벤트는 자동으로 상호 연결되어 있습니다. 로그와 RUM을 상호 연결하면 `session_id` 및 `view.id` 등의 속성을 사용하여 [엔티티 수준의 일관성을 유지하는 공격적인 샘플링 전략][2]을 쉽게 구사할 수 있습니다.

더 자세한 정보는 [RUM 및 세션 재생 요금][3]을 참고하세요.
**Browser Logs**에서 연결을 올바르게 설정하려면 [RUM Browser SDK와 Logs SDK 간에 구성을 일치][4]시켜야 합니다.

## 설정 지침

로그 설정 페이지에 액세스하려면 내가 사용하는 플랫폼에 따라 다음 링크를 이용하세요.

{{< partial name="rum/rum-correlate-rum-and-logs.html" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/
[2]: /ko/logs/guide/ease-troubleshooting-with-cross-product-correlation/#correlate-frontend-products
[3]: /ko/account_management/billing/rum/#how-do-you-view-logs-from-the-browser-collector-in-rum
[4]: /ko/real_user_monitoring/browser/setup/#initialization-parameters