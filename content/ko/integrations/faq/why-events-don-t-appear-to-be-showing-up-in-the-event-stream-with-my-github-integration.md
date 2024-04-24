---
kind: faq
title: 왜 GitHub 통합의 이벤트 스트림에 이벤트가 표시되지 않나요?
---

먼저 GitHub 통합을 설정합니다. [전용 문서][1]를 참조하세요.

관련 GitHub 리포지토리에서 Webhook을 설정하면 데이터 전송은 확인할 수 있지만 이벤트 스트림에 이벤트가 표시되지 않는다면 Webhook 설정이 원인일 수도 있습니다.

Webhook을 content-type:application/x-www-form-urlencoded으로 설정하는 대신,

Webhook을 content-type:application/json:으로 설정합니다.

{{< img src="integrations/faq/github_webhook_config.png" alt="github_webhook_config" >}}

업데이트가 완료되면 Datadog 애플리케이션에 이벤트가 정상적으로 표시되어야 합니다. 그렇지 않은 경우 [당사][2]로 직접 문의해 주세요.

[1]: /ko/integrations/github/
[2]: /ko/help/