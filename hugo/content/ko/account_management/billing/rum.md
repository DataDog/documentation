---
further_reading:
- link: /real_user_monitoring/
  tag: 설명서
  text: RUM 및 Session Replay알아보기
title: RUM 및 Session Replay 청구
---
## 개요 {#overview}

이 페이지에는 RUM & Session Replay 빌링 주제에 대한 일반적인 질문과 답변이 포함되어 있습니다.

## 세션은 어떻게 정의되나요? {#how-is-a-session-defined}

세션은 웹 또는 모바일 애플리케이션에서의 사용자 여정입니다. 세션에는 일반적으로 관련 텔레메트리가 포함된 여러 페이지 보기가 포함됩니다.

## 세션은 언제 만료되나요? {#when-does-a-session-expire}

세션은 15분 동안 활동이 없으면 만료되며, 최대 지속 시간은 4시간입니다. 4시간이 지나면 새로운 세션이 자동으로 생성됩니다.

## Session Replay 녹화는 얼마나 지속되나요? {#how-long-are-session-replay-recordings}

Session Replay 녹화 시간은 세션 길이에 따라 달라질 수 있습니다. 예를 들어, 5~8초 정도의 짧은 Session Replay가 표시된다면 사용자가 5~8초 후 세션을 종료했다는 의미입니다.

## Datadog RUM 및 Session Replay는 어떤 데이터를 수집하나요? {#what-data-does-datadog-rum-session-replay-collect}

Datadog은 최종 사용자가 방문한 모든 페이지와 함께 리소스 로딩(XHR, 이미지, CSS 파일 및 JS 스크립트), 프런트엔드 오류, 크래시 보고서 및 장기 실행 작업과 같은 주요 텔레메트리를 수집합니다. 이 모든 데이터는 사용자 세션에 포함됩니다. Session Replay의 경우, Datadog은 DOM 스냅샷을 기반으로 iframe을 생성합니다. Datadog은 Datadog Real User Monitoring(RUM) 서비스에 수집된 세션 1,000개당 요금을 청구합니다.

## Datadog에서 단일 페이지 애플리케이션을 처리하나요? {#does-datadog-handle-single-page-applications}

네. 별도로 구성하지 않아도 됩니다. Datadog RUM은 페이지 변경 사항을 자동으로 추적합니다.

## 엔드포인트 요청을 엔드투엔드로 어떻게 볼 수 있나요? {#how-do-you-view-endpoint-requests-end-to-end}

기본 제공 APM 통합을 사용하면 모든 XHR 또는 Fetch 요청을 해당 백엔드 트레이스에 연결할 수 있습니다.

## RUM에서 브라우저 컬렉터의 로그를 어떻게 볼 수 있나요? {#how-do-you-view-logs-from-the-browser-collector-in-rum}

브라우저 로그는 해당 RUM 세션에 자동으로 연결되므로 최종 사용자 여정 중에 발생하면 모니터링할 수 있습니다.

## Datadog은 쿠키를 사용하나요? {#does-datadog-use-cookies}

예. Datadog은 쿠키를 사용하여 사용자의 여러 단계를 하나의 세션으로 연결합니다. 이 프로세스는 도메인 간 쿠키를 사용하지 않으며, 애플리케이션 외부에서 사용자의 활동을 추적하지 않습니다.

## My Usage 페이지에 Browser RUM & Session Replay Plan에 따라 청구된 RUM 세션이 표시되지만, 애플리케이션의 세션 녹화 캡처는 구성하지 않았습니다. {#my-usage-page-shows-rum-sessions-billed-under-the-browser-rum-session-replay-plan-but-i-have-not-configured-capturing-session-recordings-for-my-application}

**Browser RUM & Session Replay** 요금제에서는 세션 녹화(재생)를 사용할 수 있습니다.

- 재생을 수집하는 경우 Replay 요금제에 따라 세션 요금이 청구됩니다.

- 세션 녹화 캡처를 비활성화하려면 [Session Replay 설명서][1]를 참조하세요.

## 모바일 애플리케이션의 웹뷰는 세션 녹화 및 빌링에 어떤 영향을 미치나요? {#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing}

모바일 애플리케이션에 웹뷰가 포함되어 있고 웹 및 모바일 애플리케이션 모두를 Datadog SDK로 계측한 경우 브리지가 생성됩니다. 웹뷰를 통해 로드된 웹 앱에서 Browser SDK가 기록한 모든 이벤트는 Mobile SDK로 전달됩니다. 이러한 이벤트는 모바일 애플리케이션에서 시작된 세션에 연결됩니다.

즉, Datadog에 단 하나의 RUM 모바일 세션만 표시되므로 청구할 수 있는 세션은 이 세션 하나뿐입니다.

{{< img src="account_management/billing/rum/rum-webviews-impact-on-billing-2.png" alt="웹 및 모바일 애플리케이션 모두를 Datadog SDK로 계측한 경우 모바일 세션에 대해서만 요금이 청구됩니다." >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/session_replay/