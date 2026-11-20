---
description: Datadog 웹 애플리케이션, 모바일 앱 또는 Slack에서 Bits Chat을 여세요.
further_reading:
- link: /bits_ai/bits_chat/
  tag: 설명서
  text: Bits Chat
- link: /bits_ai/bits_code/slack_code_channels/
  tag: 설명서
  text: Bits Code를 사용하는 코드 채널
title: Bits Chat 사용하기
---
Bits Chat은 Datadog 공개 설명서, 텔레메트리 및 소유권에 관한 컨텍스트를 갖고 있습니다. Bits Chat을 사용하여 시스템이나 활성 인시던트에 대해 질문할 수 있습니다. Bits Chat은 Datadog 웹 애플리케이션, 모바일 앱 및 Slack에서 사용할 수 있습니다.

## 웹 애플리케이션 {#web-application}
Datadog 웹 애플리케이션에서 Bits Chat을 여는 방법은 여러 가지가 있습니다.
- [Bits Chat][1]으로 바로 이동합니다.
- 탐색 바 오른쪽 상단에서 {{< ui >}}Ask Bits{{< /ui >}}를 클릭합니다.
- Bits Chat과 통합된 Datadog 제품에서 AI 트리거 버튼(예: {{< ui >}}Ask Bits{{< /ui >}}) 또는 {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px" alt="">}} 을 클릭합니다(반짝이는 별 아이콘).
-  <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>를 누릅니다.
- 왼쪽 탐색 패널에서 {{< ui >}}Bits AI{{< /ui >}}를 클릭한 다음 {{< ui >}}Bits Chat{{< /ui >}}을 선택합니다.

## 모바일 애플리케이션 {#mobile-application}

[모바일 앱][2]에서 Bits에 시스템이나 활성 인시던트에 대해 질문하세요. 

1. 홈 화면에서 {{< ui >}}Bits Chat{{< /ui >}}을 탭합니다.
1. 음성 또는 텍스트로 Bits Chat과 대화를 시작합니다.
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="Bits AI가 표시된 모바일 앱 홈 대시보드 화면" style="width:40%;" >}}

## Slack {#slack}
Bits에 질문하거나 인시던트를 선언하거나 조사를 트리거하거나 코드를 변경하세요. Bits Chat은 메시지 스레드에서 답변하므로 팀이 질문, 컨텍스트 및 답변을 한 곳에 보관할 수 있습니다.

1. [Bits Chat 설정][3]에서 Slack 워크스페이스를 선택합니다.
2. **Slack 계정 연결**을 클릭하여 Datadog이 두 제품 모두에서 귀하를 인식할 수 있도록 권한을 부여합니다.
3. (선택 사항) **권한 부여**를 클릭하여 Bits Chat이 관련 Slack 대화를 읽을 수 있도록 워크스페이스에 권한을 부여합니다.

설정이 완료되면 Datadog 앱이 있는 워크스페이스 채널에서 `@Datadog`에 자연어 쿼리를 보낼 수 있습니다. 

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Slack에서 수행한 서비스-종속성 쿼리 예시 출력 화면" style="width:60%;">}}

### Bits Code를 사용하는 코드 채널 {#code-channels-with-bits-code}

Bits Chat에 코드 변경을 요청하면 해당 작업을 위한 전용 [코드 채널][4]이 생성됩니다. 코드 채널에서 [Bits Code][5]가 귀하 및 귀하의 팀과 함께 변경 작업을 수행합니다.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ask
[2]: /ko/mobile/#installing
[3]: https://app.datadoghq.com/ask/settings
[4]: /ko/bits_ai/bits_code/slack_code_channels/
[5]: /ko/bits_ai/bits_code/