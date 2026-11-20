---
aliases:
- /ko/real_user_monitoring/faq/session_replay_service_worker/
description: Session Replay의 최적의 성능과 데이터 보안을 보장하도록 타사 서비스 워커 권한을 구성하세요.
further_reading:
- link: /session_replay/
  tag: 설명서
  text: Session Replay에 대해 알아보기
title: Session Replay에 대해 타사 서비스 워커 허용
---
## 개요 {#overview}

Session Replay는 다른 도메인 `session-replay-datadoghq.com`에서 서비스 워커를 사용하여 사용자의 개인정보를 보호하고 데이터의 안전을 보장하면서 최상의 경험을 제공합니다.

브라우저 설정에서 타사 쿠키를 차단했거나 브라우저에서 기본적으로 차단한 경우 서비스 워커가 올바르게 등록할 수 없습니다.

### 예외 허용{#allow-an-exception}

Datadog에서는 Session Replay 서비스 워커가 제대로 작동할 수 있도록 타사 쿠키 차단에 예외를 설정할 것을 권장합니다.

Google Chrome을 사용하는 경우 아래 지침을 따르세요. 이 예외 워크플로는 Firefox 및 Brave와 Edge를 포함한 기타 데스크톱 브라우저에도 적용됩니다.

1. 웹 브라우저에서 페이지 URL 왼쪽에 있는 {{< ui >}}Lock{{< /ui >}} 아이콘을 클릭합니다.
2. {{< ui >}}Cookies{{< /ui >}}를 클릭합니다. 팝업 모달이 나타납니다.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-1.png" alt="Session Replay 타사 서비스 워커 허용" >}}

3. {{< ui >}}Blocked{{< /ui >}} 탭으로 이동하고 페이지 목록에서 `session-replay-datadoghq.com`을 선택합니다.
4. {{< ui >}}Allow{{< /ui >}} 및 {{< ui >}}Done{{< /ui >}}을 클릭합니다.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-2.png" alt="Session Replay 타사 서비스 워커 허용" >}}

쿠키 설정을 업데이트한 후 페이지를 다시 로드합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}