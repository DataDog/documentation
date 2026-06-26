---
disable_toc: false
further_reading:
- link: /monitors/notify/
  tag: 설명서
  text: 알림 옵션에 관해 알아보기
title: 알림
---

## 개요

Datadog은 [API가 게시한][1] 이벤트 메시지에서 `@notifications`을 지원합니다. 예:

`@all`
: 사용자 조직의 모든 구성원에게 알림을 보냅니다.

`@test@example.com`
: `test@example.com`으로 이메일을 보냅니다.

`@slack-<SLACK_ACCOUNT>-<CHANNEL_NAME>`
: 지정된 Slack 채널에 이벤트 또는 그래프를 게시합니다.

`@webhook`
: 웹훅을 알리거나 트리거합니다. [웹훅 관련 블로그 게시물][2]에서 관련 내용을 확인해 보세요.

더 자세한 내용은 [알림][3]에서 확인해 보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ko/api/latest/events/#post-an-event
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[3]: /ko/monitors/notify/