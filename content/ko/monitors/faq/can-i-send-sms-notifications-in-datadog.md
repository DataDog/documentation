---
further_reading:
- link: /monitors/
  tag: 설명서
  text: 모니터 생성 방법
- link: /monitors/notify/
  tag: 설명서
  text: 모니터 알림 설정
kind: faq
title: Datadog에서 SMS 알림을 보낼 수 있나요?
---

많은 고객이 [Webhooks 통합][1]을 사용하여 Twilio와 같은 SMS 서비스에 알림을 보냅니다. 자세한 내용은 [웹후크 및 Twilio를 사용하여 SMS 알림 보내기][2] 블로그 게시물을 참조하세요.

SMS 알림을 보내려는 전화번호의 서비스 제공업체에 따라 이메일을 통해 SMS를 보낼 수도 있습니다. Datadog에서 이를 설정하려면 연결하려는 디바이스의 10자리 전화번호와 해당 모바일 제공업체 게이트웨이로 알림을 보냅니다. 예를 들어 번호가 `+1 (234) 555-0100`이고 서비스 제공업체가 AT&T인 경우 알림을 `2345550100@txt.att.net`로 보냅니다. 마찬가지로, 서비스 제공업체가 Orange인 `+44 113 496 0000`으로 SMS를 보내려면 알림을 `1134960000@orange.net`으로 보냅니다. 다른 제공업체의 경우 해당 이메일-SMS 주소를 찾아보세요.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/webhooks/
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio