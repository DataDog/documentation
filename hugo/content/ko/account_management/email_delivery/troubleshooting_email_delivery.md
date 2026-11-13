---
description: 수신자가 받지 못한 Datadog 이메일을 진단하고 문제를 해결하세요.
further_reading:
- link: /help/
  tag: 설명서
  text: Datadog 지원팀에 문의
- link: /account_management/email_delivery/how_email_delivery_works/#delivery-status
  tag: 설명서
  text: 상태 및 억제 정의
- link: /account_management/email_delivery/setting_up_reliable_delivery/
  tag: 설명서
  text: 신뢰할 수 있는 발신자 및 인증을 통한 실패 방지
- link: /account_management/audit_trail/guides/track_email_delivery/#check-whether-an-email-was-delivered
  tag: 가이드
  text: 전달 이벤트 쿼리 및 경보 설정
private: true
site_support_id: email_delivery
title: 이메일 전달 문제 해결
---
## 개요 {#overview}

사용자가 Datadog 이메일을 받지 못했다고 보고하면 이 페이지를 사용하여 문제를 진단하고 해결하세요. 조직 전체의 전달 이벤트를 감사하거나 경보를 설정하려면 [조직의 이메일 전달 추적][1]을 참조하세요.

## 문제 해결 단계 {#troubleshooting-steps}

1. 수신자 주소로 필터링하여 [Email Delivery][2]에서 전달 결과를 확인합니다.
   - **Delivered**: 수신자에게 스팸 또는 정크 메일함을 확인하고, Datadog 메일을 필터링하는 메일함 규칙이나 차단 목록을 검사하도록 요청합니다.
   - **Bounced**: 수신 메일 서버가 메시지를 거부하고 이유를 반환했습니다. 주소가 잘못되었다면 수정하고, 메일함이 가득 찼다면 공간을 확보하세요. 서버가 Datadog 메일을 필터링하거나 차단하는 경우, [Datadog을 신뢰할 수 있는 발신자로 추가][3]하고 이메일 관리자에게 이유와 이벤트 타임스탬프를 공유하세요.
   - **Dropped**: 주소가 전송 억제 목록에 등록되어 있습니다. 전송 억제 상태를 해제하는 방법은 [이메일 억제][4]를 참조하세요.
2. 여전히 이메일을 받지 못한 경우, [Datadog 지원팀][5]에 문의하여 검토를 요청하세요.

## 실패한 이메일 조사 {#investigate-a-failed-email}

Email Delivery 대시보드에서 기본 감사 이벤트까지 실패를 추적하세요.

1. **Email Delivery Failures** 표에서 영향을 받는 수신자 또는 이메일 유형의 행을 클릭합니다.
2. **View audit events**를 선택하여 해당 전달 시도의 전체 Audit Trail을 엽니다.
3. 개별 감사 이벤트를 클릭하여 SMTP 코드, 메일 서버 응답, 수신자 정보를 포함한 전달 세부 정보를 확인합니다.

## 이메일 실패의 일반적인 이유 {#common-reasons-email-fails}

| 이유                                        | 의미                                                                                                                                                          | 조치 방법                                                                                                                                                                                          |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 메일함을 찾을 수 없음                             | 수신자 주소가 존재하지 않습니다.                                                                                                                                  | 오타나 삭제된 메일함이 있는지 확인한 후 주소를 수정하고 다시 전송합니다.                                                                                                                       |
| 메일함이 가득 참                                  | 수신자의 받은 편지함 할당량이 초과되었습니다.                                                                                                                                     | 수신자에게 받은 편지함 공간을 확보하도록 요청한 후 다시 전송합니다.                                                                                                                                           |
| 발신자가 인증되지 않았거나 정책에 의해 차단됨 | 수신자 메일 서버 또는 그룹 정책이 Datadog 발신자를 거부했습니다. 이는 주로 인증(SPF, DKIM, DMARC) 문제나 인증된 발신자를 요구하는 규칙 때문입니다.        | 수신자 메일 관리자에게 [Datadog을 신뢰할 수 있는 발신자로 추가][3]하도록 요청합니다. 응답에 [발신자 인증][6] 또는 DMARC 실패가 언급된 경우, 해결 과정에 양측의 협조가 필요할 수 있으므로 [Datadog 지원팀][5]에 문의하세요. |
| 억제됨(전송되지 않음)                          | 억제 규칙, 계정 설정 또는 시스템 보호 기능이 메시지를 차단했습니다. 이는 이전에 반송된 후 흔히 발생합니다.                                                        | [이메일 억제][4]를 참조하세요.                                                                                                                                                                        |
| 스팸으로 표시됨                               | 수신자 메일 서버 또는 보안 게이트웨이가 콘텐츠를 기반으로 메시지를 스팸으로 분류했습니다.                                                                     | [이메일 보안 게이트웨이][7]를 참조하세요.                                                                                                                                                                   |

**참고**: 수신자 메일 서버가 SMTP 응답을 생성하며, 이 응답이 항상 정확한 것은 아닙니다. 이를 정확한 원인에 대한 보장이 아닌 강력한 신호로 활용하세요.

## 이메일 억제 {#email-suppressions}

이메일이 반송되면 Datadog은 해당 주소를 억제 목록에 추가하고 억제가 해제될 때까지 전송을 중단합니다.

억제 해제를 요청하려면 [Datadog 지원팀][5]에 문의하고 다음 정보를 제공하세요.

- 차단된 수신자의 이메일 주소
- Email Delivery 대시보드 또는 Audit Trail의 반송 이벤트에 대한 링크

**참고**: 억제를 해제해도 근본적인 원인은 해결되지 않습니다. 해제 후에도 실패가 지속되면 이벤트 타임스탬프와 SMTP 응답을 이메일 관리자나 메일 공급자와 공유하여 추가 조사를 요청하세요.

## 전달 이벤트가 표시되지 않는 경우 {#when-no-delivery-event-appears}

일부 실패는 Datadog이 전달을 시도하지 않기 때문에 전달 이벤트를 생성하지 않습니다. 수신자에 대한 이벤트를 찾을 수 없는 경우, 계정 상태를 검사하여 다음 중 하나에 해당하는지 확인하세요.

- **미확인 사용자**: 초대되었으나 아직 초대를 수락하지 않은 사용자입니다.
- **비활성화된 사용자**: 비활성화된 사용자는 [이메일 다이제스트][8]를 포함한 알림을 받지 않습니다.

## 이메일 보안 게이트웨이 {#email-security-gateways}

조직에서 인바운드 메일을 이메일 보안 게이트웨이나 메일 플랫폼의 내장 보호 기능을 통해 라우팅하는 경우, 신뢰할 수 있는 발신자 항목과 발신자 인증이 올바르게 설정되어 있더라도 Datadog 이메일이 격리되거나 차단될 수 있습니다. 게이트웨이는 자체 필터링을 적용하므로, 메시지가 SPF, DKIM 및 DMARC를 통과하더라도 보류될 수 있습니다.

Datadog 이메일이 여전히 도착하지 않으면 이메일 보안 게이트웨이 공급자에 문의하세요. Email Delivery에서 메시지가 Delivered로 표시되지만 수신자가 스팸 또는 정크 메일함에서도 메시지를 찾을 수 없거나, 유효한 주소로 보낸 메시지가 차단되는 경우 게이트웨이가 원인인 경우가 많습니다. 공급자가 영향을 받는 메시지를 찾고 해당 메시지가 격리되거나 차단된 이유를 확인할 수 있도록 Email Delivery 이벤트의 타임스탬프를 공유하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/audit_trail/guides/track_email_delivery/
[2]: https://app.datadoghq.com/dash/integration/email_delivery_tracking
[3]: /ko/account_management/email_delivery/setting_up_reliable_delivery/#add-datadog-to-your-trusted-senders
[4]: #email-suppressions
[5]: /ko/help/
[6]: /ko/account_management/email_delivery/setting_up_reliable_delivery/#check-your-sender-authentication
[7]: #email-security-gateways
[8]: /ko/account_management/#email-subscriptions