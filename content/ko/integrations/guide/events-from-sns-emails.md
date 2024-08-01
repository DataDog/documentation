---
description: Amazon SNS의 이메일을 통해 Datadog에 이벤트를 보내는 단계
further_reading:
- link: https://docs.datadoghq.com/integrations/amazon_web_services/
  tag: 설명서
  text: AWS 통합
- link: https://docs.datadoghq.com/integrations/amazon_sns/#overview
  tag: 설명서
  text: SNS 통합
- link: https://www.datadoghq.com/blog/monitor-aws-fully-managed-services-datadog-serverless-monitoring/
  tag: 블로그
  text: Amazon API Gateway, SQS, Kinesis 등에 대한 Datadog 서버리스 모니터링
title: Amazon SNS 이메일에서 Datadog 이벤트 생성
---

## 개요

Amazon SNS 주제에서 전송된 이메일로 Datadog 이벤트를 생성할 수 있습니다. 이 가이드를 사용하여 Datadog 계정으로 SNS 주제를 구독하고 구독을 확인하세요.

## 설정

1. [이메일이 포함된 이벤트][1] 가이드의 설정 지침에 따라 Datadog에서 전용 이메일 주소를 만듭니다. 생성된 이메일 주소를 클립보드에 복사하세요.
2. 구독하려는 SNS 주제에서 **Create subscription**을 클릭하고 `Email`을 프로토콜로 선택합니다. `Endpoint` 필드에 1단계의 이메일 주소를 붙여넣고 필요한 설정을 마친 후 **Create subscription**을 클릭합니다.
3. Datadog [Events Explorer][2]에서 제목이 `AWS Notification - Subscription Confirmation`인 이벤트를 검색합니다. 확인을 위해 제공된 URL을 복사하세요.

{{< img src="integrations/guide/events_from_sns_emails/events_from_sns_emails.png" alt="AWS Notification - Subscription Confirmation이라는 제목과 Confirm Subscription 텍스트 옆에 강조 표시된 URL이 있는 이벤트의 상세 보기가 표시되는 Datadog 이벤트 탐색기" >}}

4. 브라우저에서 새 탭을 열고 주소 표시줄에 URL을 붙여넣습니다. 브라우저가 URL을 열면 구독이 확인됩니다.

### 검증

AWS 콘솔의 SNS 주제로 돌아가서 구독 상태가 `Confirmed`인지 확인합니다. 주제에 게시된 새 메시지는 Datadog에서 이벤트를 생성합니다.

## Datadog에서 이벤트 사용

[이벤트 모니터][3]를 사용하여 SNS 주제의 이메일을 기반으로 알림을 설정합니다. [Events Explorer][4]에서 이벤트를 검색 및 필터링하거나 [대시보드][5]를 사용하여 이벤트를 추가로 분석하거나 표시합니다.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/events/guides/email/
[2]: https://app.datadoghq.com/event/explorer
[3]: /ko/monitors/types/event/
[4]: /ko/events/explorer/
[5]: /ko/dashboards/