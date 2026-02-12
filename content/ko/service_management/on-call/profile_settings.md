---
further_reading:
- link: /service_management/on-call/
  tag: 문서
  text: Datadog On-Call
title: 프로필 설정
---

<div class="alert alert-info">
모바일 기기에서 Datadog On-Call을 사용하려면 <a href="/mobile#installing">Datadog 모바일 앱</a>을 설치하세요.
</div>

On-Call 페이지를 받으려면 먼저 [프로필 설정을 구성][1]해야 합니다. 프로필에는 연락 방법, 해당 방법 테스트 및 알림 기본 설정에 대한 설정이 포함됩니다. 이를 통해 적시에 효과적인 페이지를 받을 수 있습니다.

## On-Call 프로필 설정하기

[My On-Call Profile][1]로 이동하여 설정하세요.

### 연락 방법
{{< img src="service_management/oncall/contact_methods.png" alt="On-Call 프로필 설정에서 연락 방법을 추가합니다. 전화번호, 이메일, 모바일 기기가 구성되었습니다. 전화번호는 hover 상태이며 'Test Call' 및 'Test SMS' 옵션이 표시됩니다." style="width:100%;" >}}
   - 이메일이나 전화번호를 수동으로 추가합니다. 그런 다음 SMS로 연락할 수 있도록 동의를 구하는 화면에서 동의하면 전화번호 옆에 녹색 배지가 나타납니다. 이는 아래 SMS 알림 환경 설정에 사용할 수 있음을 나타냅니다.
   - 기기에 Datadog [모바일 앱][2]이 설치되어 있는 경우 기기가 자동으로 이 목록에 나타납니다. 모바일 앱의 설정에서 알림을 받을 수 있는 상태인지 확인하세요. 
   - 각 연락 방법을 테스트해 보는 것이 좋습니다. 테스트 옵션을 보려면 연락 방법 위에 마우스를 올려놓으세요.

#### 지원되는 연락 방법
- [Datadog 모바일 앱][3]을 통한 푸시 알림
- 이메일(HTML 또는 텍스트 형식)
- SMS
- 음성통화

**방해 금지 모드 무시**를 포함한 모바일 기기 설정 방법을 자세히 알아려보려면 [Datadog On-Call을 위한 모바일 기기 설정][4]을 참조하세요.

### 알림 설정
알림 설정을 사용하면 상황의 긴급성에 따라 **사용자**가 On-Call 페이지에 대한 알림을 받는 방법과 시기를 조정할 수 있습니다. 낮은 긴급성과 높은 긴급성에 대한 기본 설정을 구성하면 페이지의 긴급성에 따라 알림이 효과적으로 작동하고 방해가 되지 않도록 할 수 있습니다. 페이지의 긴급성은 [처리 규칙][5]에서 결정됩니다.

시스템은 [에스컬레이션 정책][6]에 정의된 대로 담당자가 페이지를 확인하거나 다음 온콜 담당자에게 페이지가 에스컬레이션될 때까지 구성된 알림 설정을 순차적으로 시도합니다.

#### 긴급도가 높은 알림
{{< img src="service_management/oncall/high_urgency_notification_preferences.png" alt="On-Call 프로필 설정에서 긴급도가 높은 알림 설정: 'When a high urgency Page is triggered'를 설정하여 중요한 페이지에 신속하게 대응할 수 있도록 해당 전화번호에 즉시 알림을 보냅니다." style="width:100%;" >}}

즉각적인 대응과 에스컬레이션을 위해 긴급도가 높은 페이지(P1 모니터 경고, SEV-1 보안 위협, SEV-1 인시던트 등)를 구성하세요.

예를 들어, On-Call을 구성하여 푸시 알림으로 시작하고 1분 후에 전화하며, 2분 후에도 확인하지 않으면 후속 푸시 알림을 보낼 수 있습니다.

##### 긴급도가 높은 케이스에 대한 모범 사례
- 긴급도가 높은 페이지에 대한 기본 알림 방법으로 즉각적인 푸시 알림과 음성통화를 사용합니다.
- 신속한 확인을 위해 팔로업 간격을 짧게 유지합니다.
- 비상 상황에서 대응 누락을 방지하기 위해 에스컬레이션 정책을 신중하게 계획합니다.

#### 긴급도가 낮은 알림
{{< img src="service_management/oncall/low_urgency_notification_preferences.png" alt="On-Call 프로필 설정에서 긴급도가 낮은 알림 설정: 'When a low urgency Page is triggered'를 설정하여 즉시 이메일로 알림을 보내지만 에스컬레이션하지 않습니다." style="width:100%;" >}}

긴급도가 낮은 페이지(논블로킹 이슈, 정보 신호 등)를 구성하여 방해를 최소화하면서 정보는 계속 받을 수 있도록 설정합니다. 예를 들어, 이메일을 통해 본인만 받도록 선택할 수 있습니다.

### 기타 알림
{{< img src="service_management/oncall/settings_shift_reminder.png" alt="On-Call 프로필 설정에서 교대 알림을 구성합니다. 교대 알림은 교대가 시작되기 10분 전에 전화번호로 알림을 보내도록 구성됩니다." style="width:100%;" >}}

On-Call 근무가 시작되기 전에 **Other Notifications**에서 **Shift reminder**를 받도록 선택할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/profile
[2]: /ko/service_management/mobile/?tab=ios
[3]: /ko/mobile
[4]: /ko/service_management/on-call/guides/configure-mobile-device-for-on-call
[5]: /ko/service_management/on-call/processing_rules
[6]: /ko/service_management/on-call/escalation_policies