---
aliases:
- /ko/real_user_monitoring/faq/session_replay_service_worker/
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: 설명서
  text: 세션 재생에 대해 알아보기
title: Session Replay(세션 리플레이)에 대해 타사 서비스 작업자 허용
---

## 개요

Session Replay(세션 리플레이)는 다른 도메인 `session-replay-datadoghq.com`의 서비스 워커를 사용하여 사용자의 개인정보를 보호하고 데이터의 안전을 보장하면서 최상의 경험을 제공합니다.

브라우저 설정에서 타사 쿠키를 차단했거나 브라우저에서 기본적으로 차단한 경우 서비스 작업자가 올바르게 등록할 수 없습니다.

### 예외 허용

Datadog에서는 Session Replay(세션 리플레이) 서비스 작업자가 제대로 작동할 수 있도록 타사 쿠키 차단에 예외를 설정할 것을 권장합니다.

Google Chrome을 사용하는 경우 아래 지침을 따르세요. 이 예외 워크플로는 Brave 및 Edge를 포함하는 Firefox 및 기타 데스크톱 브라우저에도 적용됩니다.

1. 웹 브라우저에서 페이지 URL 왼쪽에 있는 **Lock** 아이콘을 클릭합니다.
2. **Cookies**를 클릭합니다. 팝업 모달이 나타납니다.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-1.png" alt="Session Replay(세션 리플레이) 타사 서비스 작업자 허용" >}}

3. **Blocked** 탭으로 이동하여 페이지 목록에서 `session-replay-datadoghq.com`을 선택합니다.
4. **Allow** 및 **Done**를 클릭합니다.

   {{< img src="real_user_monitoring/session_replay/allow-3p-serviceworker-2.png" alt="Session Replay(세션 리플레이) 타사 서비스 작업자 허용" >}}

쿠키 설정을 업데이트한 후 페이지를 다시 로드합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}