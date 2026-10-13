---
description: Slack에서 임시 코드 채널을 만들고 작업하는 방법을 알아보세요. 이 채널에서 Bits Code를 제어하고, 코드 diff를
  확인하며, PR을 생성할 수 있습니다.
further_reading:
- link: /bits_ai/bits_code/
  tag: 설명서
  text: Bits Code
- link: /bits_ai/bits_chat/#slack
  tag: 설명서
  text: Slack의 Bits Chat
- link: /integrations/slack/
  tag: 설명서
  text: Slack 통합
- link: https://slack.com/features/code-channels
  tag: Slack 설명서
  text: 코드 채널
title: Bits Code를 사용하는 Slack의 코드 채널
---
## 개요 {#overview}

코드 채널은 특정 작업을 위해 코딩 에이전트와 함께 작업하기 위한 전용 임시 Slack 채널입니다. Slack에서 [Bits Chat][1]에 코드 변경을 요청하면, [Bits Code][3]가 해당 작업을 위한 코드 채널을 생성합니다. 귀하와 팀은 기존 대화를 복잡하게 만들지 않고도 해당 채널에서 작업을 팔로우하고, 제어하며, 결과를 검토할 수 있습니다.

{{< img src="bits_ai/dev_agent/slack_code_channels/code_channel.png" alt="Bits Code와의 대화와 제안된 코드 변경 사항의 diff 뷰가 함께 표시되는 Slack 코드 채널" style="width:100%;" >}}

[Slack 설명서][6]에서 코드 채널에 대해 자세히 알아보세요.

## 코드 채널 만들기 {#create-a-code-channel}

[Bits Code 설정][4] 후, Slack에서 `@Datadog`을 멘션하고 수행하려는 코드 변경 사항을 설명하여 코드 채널을 만드세요. Bits Chat이 요청에 코드 변경이 필요하다고 판단하면, 해당 작업을 Bits Code로 넘기고 Bits Code가 코드 채널을 생성합니다. Bits는 원래 요청이 이루어진 위치에 새 코드 채널에 대한 링크를 게시합니다.

{{< img src="bits_ai/dev_agent/slack_code_channels/code_channel_creation.png" alt="@Datadog을 멘션하는 Slack 메시지와 그 뒤에 생성된 코드 채널을 보여주는 카드" style="width:100%;" >}}

Bits Code는 초기 요청을 기반으로 코드 채널의 이름을 자동으로 지정합니다. Slack 사이드바의 전용 {{< ui >}}Code channels{{< /ui >}} 섹션에서 코드 채널을 찾으세요.

### 권한 및 액세스 {#permissions-and-access}

`@Datadog`을 언급한 사용자만 새 코드 채널에 자동으로 추가됩니다. 코드 채널은 해당 채널이 생성된 채널의 공개 범위를 따릅니다(즉, 공개 채널에서 `@Datadog`을 멘션하면 생성된 코드 채널도 공개됩니다).

<div class="alert alert-warning">Bits Code는 <code>@Datadog</code> 을 언급하여 채널을 생성한 사용자의 권한으로 소스 코드 리포지토리에 액세스할 수 있습니다. 채널 내 모든 사용자의 모든 Datadog 텔레메트리(<a href="/account_management/rbac/data_access/">Data Access Control</a> 제한 사항 적용)에 액세스할 수 있습니다. Bits Code는 이 리포지토리 데이터와 텔레메트리를 코드 채널로 가져올 수 있습니다. 코드 채널 생성자로서, 코드 채널을 조회할 수 있는 모든 사람이 해당 콘텐츠를 조회할 권한이 있는지, 그리고 코드 채널에 참여할 수 있는 모든 사람이 Bits Code를 제어할 권한이 있는지 확인하는 것은 귀하의 책임입니다.</div>

에이전트를 제어하려는 모든 사용자는 Slack에 연결된 Datadog 계정이 있어야 합니다. (코드 채널에 게시했지만 연결된 Datadog 계정이 없는 경우, Bits는 해당 메시지를 무시합니다.)

## 코드 채널에서 작업하기 {#work-in-a-code-channel}

다른 Slack 채널에서 Bits Chat의 응답을 받으려면 매번 `@` 멘션을 해야 합니다. 코드 채널은 다르게 작동합니다. Bits Code는 게시되는 모든 메시지를 수신합니다. 에이전트를 계속 제어하기 위해 `@Datadog`을 다시 멘션할 필요는 없습니다.

Bits Code가 작동하면 코드 채널에 다음이 표시됩니다.

-  제안된 코드 변경 사항의 diff 뷰
-  작업과 관련된 Datadog 그래프 위젯
-  준비가 되었을 때 변경 사항으로부터 풀 요청 또는 머지 요청을 열 수 있는 {{< ui >}}Create PR{{< /ui >}} 버튼

Bits Code가 코드 diff를 생성한 후, 코드 채널에서 특정 줄에 직접 코멘트를 달 수 있습니다.

{{< img src="bits_ai/dev_agent/slack_code_channels/commenting_on_code.png" alt="특정 코드 줄에 대해 초안이 작성된 질문" style="width:100%;" >}}

Bits Code는 코드 채널에서 자동으로 풀 요청 또는 머지 요청을 열지 않습니다. 준비가 되면 {{< ui >}}Create PR{{< /ui >}}을 클릭하세요. {{< ui >}}Create PR{{< /ui >}}을 클릭한 사용자가 생성된 풀 요청 또는 머지 요청의 작성자가 됩니다.

모든 코드 채널에서의 작업은 Datadog의 [Bits Code 세션][2]에도 반영됩니다. 이를 보려면 코드 채널 오른쪽 하단 모서리에 있는 {{< ui >}}</> Code session{{< /ui >}}을 클릭하세요.

[Slack 설명서][6]에서 코드 채널에서 작업하는 방법에 대해 자세히 알아보세요.

## 제한 사항 {#limitations}

전반적인 [Bits Code 제한 사항][5]도 코드 채널에 적용됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/bits_chat/#slack
[2]: /ko/bits_ai/bits_code/#sessions
[3]: https://app.datadoghq.com/code
[4]: /ko/bits_ai/bits_code/setup/
[5]: /ko/bits_ai/bits_code/#limitations
[6]: https://slack.com/help/articles/54310833022355-Build-with-AI-as-a-team-using-Slack-Code