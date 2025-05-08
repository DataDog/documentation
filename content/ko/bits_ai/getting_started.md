---
further_reading:
- link: bits_ai/
  tag: 설명서
  text: Bits AI 갸요
- link: bits_ai/query_examples
  tag: 설명서
  text: 자연어 쿼리 예
- link: bits_ai/managing_incidents/
  tag: 설명서
  text: 인시던트 관리
title: 시작하기
---

## Datadog에서 쿼리하기

### 채팅 패널에서

앱에서 채팅 패널을 열려면 탐색 메뉴의 왼쪽 하단에 있는 **Bits AI**를 클릭합니다. `Cmd + /`를 사용하여 채팅 패널을 열거나 숨길 수도 있습니다.

Bits AI의 일부 답변에는 **Suggestions** 버튼이 포함되어 있습니다. 이 버튼을 클릭하면 대화의 맥락에 맞는 추가 쿼리가 표시됩니다.

{{< img src="bits_ai/getting_started/chat_panel_star_service.png" alt="'How do I star a service'라는 예시 질문과 Bits AI의 답을 보여주는 Bits AI 채팅 패널" style="width:90%;">}}

### 검색창에서

일부 Datadog 검색창은 자연어 쿼리를 지원합니다.

{{< img src="bits_ai/getting_started/ai-enabled-search-bar.png" alt="자연어 쿼리가 활성화된 검색창" style="width:90%;">}}

이 기능이 제공되는 경우, 검색창에 공백을 입력한 다음 추천 쿼리에서 선택하거나 새로운 쿼리를 입력할 수 있습니다.

{{< img src="bits_ai/getting_started/search-bar-with-ai-suggestions.png" alt="추천 자연어 쿼리를 표시하는 검색 창" style="width:90%;">}}

### 모바일 앱에서

{{< img src="bits_ai/getting_started/bitsai_mobile_app.PNG" alt="Bits AI가 포함된 모바일 앱 홈 대시보드" style="width:40%;" >}}

모바일 앱에서 Bits AI를 클릭해 브라우저에서와 같은 동일한 쿼리 기능에 액세스합니다.

## Slack에서 쿼리하기

1. [Datadog 계정을 Slack 워크스페이스에 연결합니다][1].
1. Slack에서 `/dd connect` 명령을 사용하여 연결할 계정 목록을 표시합니다.
1. 드롭다운에서 Datadog 계정 이름을 선택합니다.
1. Bits AI에 필요한 추가 권한을 승인합니다.

설정이 완료되면 `@Datadog`에 자연어로 쿼리를 보낼 수 있습니다 (예: `@Datadog Are there any issues with example-service's dependencies?`).

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="서비스 종속성 예시 쿼리 결과를 보여주는 Slack 화면" style="width:60%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/slack/?tab=applicationforslack