---
description: 중요 알림, 방해 금지 모드 우회, 전화 연락처 설정을 통해 신뢰할 수 있는 온콜 알림을 받도록 모바일 기기를 구성하세요.
further_reading:
- link: https://docs.datadoghq.com/incident_response/on-call/
  tag: 설명서
  text: On-Call 설명서
- link: https://docs.datadoghq.com/mobile/
  tag: 설명서
  text: 모바일 앱 문서
title: Datadog On-Call을 위한 모바일 기기 설정
---
<div class="alert alert-info">
모바일에서 On-Call에만 액세스하고 모바일 기기에서 민감한 텔레메트리 데이터에 대한 액세스를 제한하려면 Datadog 지원팀에 문의하세요.
</div>

온콜 상태일 때는 인시던트에 효과적으로 대응할 수 있도록 신뢰할 수 있고 알림을 적시에 수신해야 합니다. 이 가이드는 [Datadog On-Call][5]에서 최적의 성능 발휘를 위해 모바일 기기를 구성하는 단계를 안내합니다.

1. [Datadog 모바일 앱][1]을 설치합니다.
2. [푸시 알림 설정](#set-up-push-notifications): 기기에서 Datadog 모바일 앱의 알림을 받을 수 있도록 설정합니다.
3. [음소거 및 방해 금지 모드 무시](#circumvent-mute-and-do-not-disturb-mode-for-on-call): 기기가 방해 금지 모드에 있는 동안 푸시 알림, 음성통화 및 SMS를 받습니다.

## 푸시 알림 설정 {#set-up-push-notifications}
<div class="alert alert-info">
Datadog 모바일 앱에 처음 로그인하면 온보딩 플로우를 통해 알림 및 권한을 설정합니다.
</div>

단, 기본적으로 모바일 앱에서 알림을 보낼 수 없습니다. 푸시 알림 받기: 

{{< tabs >}}
{{% tab "iOS" %}}

1. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}로 이동합니다.

   {{< img src="mobile/push_notification/ios_settings_may_2025.png" alt="Datadog 모바일 앱의 iOS 버전에서 알림 설정을 찾습니다." style="width:35%;" >}}

2. {{< ui >}}Allow Notifications{{< /ui >}} 토글을 활성화합니다. 알림을 처음 활성화하는 경우 권한 프롬프트가 열립니다. 권한을 부여한 다음 {{< ui >}}Enable Notifications{{< /ui >}}를 다시 터치하여 iOS 시스템 설정으로 이동합니다.

   {{< img src="mobile/push_notification/ios_notification_may_2025.png" alt="iOS 기기의 시스템 알림 설정을 구성합니다." style="width:100%;" >}}

3. iOS 시스템 설정 내에서 {{< ui >}}Allow Notifications{{< /ui >}} 토글이 활성화되어 있는지 확인합니다. Datadog은 {{< ui >}}Sound{{< /ui >}} 및 {{< ui >}}Badges{{< /ui >}} 토글을 활성화할 것을 강력히 권장합니다.

모바일 앱에 반드시 필요한 권한을 부여해 주세요.
{{% /tab %}}

{{% tab "Android" %}}
1. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}로 이동합니다.

   {{< img src="mobile/push_notification/android_settings_may_2025.png" alt="Datadog 모바일 앱의 Android 버전에서 알림 설정을 찾습니다." style="width:35%;" >}}

2. {{< ui >}}Allow notifications{{< /ui >}} 토글을 활성화합니다. Datadog은 {{< ui >}}Sound and vibration{{< /ui >}} 및 {{< ui >}}Show content on Lock screen{{< /ui >}}을 활성화할 것을 강력히 권장합니다.

   {{< img src="mobile/push_notification/android_notification_may_2025.png" alt="Android 기기의 시스템 알림 설정을 구성합니다." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

### 커스텀 사운드 {#custom-sounds}
iOS 및 Android 모두 기본 시스템 알림 사운드를 무시할 수 있는 옵션을 제공합니다. Datadog 앱에는 다양한 커스텀 사운드가 미리 로드되어 있습니다.  

## On-Call에 대해 음소거 및 방해 금지 모드 우회 {#circumvent-mute-and-do-not-disturb-mode-for-on-call}
Datadog 모바일 앱에서 제공하는 푸시 알림과 음성통화, SMS와 같은 전화 알림에 대해 기기의 시스템 볼륨과 방해 금지 모드를 무시할 수 있습니다.

### 중요 푸시 알림 {#critical-push-notifications}
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/push_notification/ios_critical_may_2025.png" alt="iOS 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%;" >}}

1. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}로 이동합니다.

2. {{< ui >}}Critical Alerts{{< /ui >}} 토글을 활성화합니다. 중요 경보는 음소거 스위치와 방해 금지 모드를 무시합니다. 중요 경보를 활성화하면 시스템은 기기의 음소거 또는 방해 금지 설정과 관계없이 중요 경보 사운드를 재생합니다.

3. iOS 시스템 설정 내에서 {{< ui >}}Critical Alerts{{< /ui >}} 토글이 활성화되어 있는지 확인합니다. 모바일 앱에 반드시 필요한 권한을 부여해 주세요.

4. 알림 기본 설정 섹션에서 {{< ui >}}High Urgency Notifications{{< /ui >}} 및 {{< ui >}}Low Urgency Notifications{{< /ui >}}을 설정할 기기를 선택합니다.

5. {{< ui >}}Test push notifications{{< /ui >}}를 탭하여 중요 푸시 알림 설정을 테스트합니다.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/push_notification/android_critical_may_2025.png" alt="Android 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%;" >}}

1. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}로 이동합니다.

{{< img src="mobile/push_notification/android_allow_notification_may_2025.png" alt="Android 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%;" >}}

2. 알림 권한이 없는 경우 {{< ui >}}Bypass Do Not Disturb{{< /ui >}}를 탭하고 시스템 설정에서 {{< ui >}}Allow notifications{{< /ui >}}를 활성화합니다.

{{< img src="mobile/push_notification/android_override_system_may_2025.png" alt="Android 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%;" >}}

3. 그런 다음 {{< ui >}}Bypass Do Not Disturb{{< /ui >}}를 탭하고 High Urgency On-Call 실행을 위해 시스템 설정에서 {{< ui >}}Override Do Not Disturb{{< /ui >}}를 활성화합니다.

   **삼성 기기**: {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} > {{< ui >}}App notifications{{< /ui >}}로 이동합니다. Datadog을 선택하고 방해 금지 모드 우회를 허용합니다.

{{< img src="mobile/push_notification/android_override_system_volume_may_2025.png" alt="Android 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%;" >}}

4. 시스템 볼륨을 무시하려면 {{< ui >}}Override system volume{{< /ui >}}를 탭하고 시스템 설정에서 {{< ui >}}Mode access{{< /ui >}}의 {{< ui >}}Override system volume{{< /ui >}}토글을 허용합니다.

5. 웹에서 {{< ui >}}High Urgency Notifications{{< /ui >}} 및 {{< ui >}}Low Urgency Notifications{{< /ui >}}에 대한 알림 기본 설정을 구성합니다.

6. {{< ui >}}Test push notifications{{< /ui >}}를 탭하여 중요 푸시 알림 설정을 테스트합니다.

<div class="alert alert-warning">
Android에서 Datadog 모바일 앱은 업무용 프로필 내에서 사용 시 시스템 볼륨이나 방해 금지 모드 설정을 우회할 수 없습니다. Datadog은 조직 정책에 따라 개인 프로필에 Datadog 모바일 앱을 설치할 것을 권장합니다.
</div>

{{% /tab %}}
{{< /tabs >}}
### 중요 푸시의 커스텀 사운드 및 볼륨 {#custom-sounds-and-volume-for-critical-push}
긴급도가 높은 알림에 대해, Datadog은 시스템 사운드 및 볼륨 설정을 사용자 지정할 것을 강력히 권장합니다. 이렇게 하면 경보를 보다 분명하게 할 수 있을 뿐 아니라 주의를 끄는 데 더욱 효과적입니다. 알림 기본 설정을 테스트하여 예상대로 작동하는지 확인하세요.

### 전화 채널(음성통화 및 SMS) {#telephony-channels-voice-calls-and-sms}

Datadog은 안정성 보장을 위해 연락할 때 여러 전화번호를 번갈아 가며 사용합니다. Datadog On-Call에서 수신되는 전화와 메시지를 휴대폰에서 인식하도록 디지털 연락처 카드를 생성할 수 있습니다. 이 카드는 Datadog의 최신 전화번호로 자동 업데이트됩니다. 시스템 설정에서 이 연락처에 특별 권한을 할당하여 방해 금지 모드 우회와 같은 향상된 기능을 사용할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="incident_response/on-call/guides/configure-mobile-device-for-on-call/ios_sync_card_may_2025.png" alt="SMS 및 음성 통화에 대해 iOS 기기의 방해 금지 모드를 무시합니다." style="width:100%;" >}}

1. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}로 이동합니다.

2. {{< ui >}}Automatic Contact Card Sync{{< /ui >}} 토글을 활성화합니다. 'Datadog On-Call'이라는 연락처가 생성되고, Datadog의 최신 전화 번호로 정기적으로 업데이트됩니다.

3. 연락처가 생성되면 iOS 시스템 설정을 열고 {{< ui >}}Focus{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}}로 이동합니다.

4. {{< ui >}}People{{< /ui >}}에서 Datadog On-Call 연락처의 알림을 허용합니다. Datadog 푸시 애플리케이션의 중요 경보를 활성화한 경우 Datadog 모바일 앱도 **Apps**에 표시됩니다.

5. 무음 모드를 우회하려면 Datadog On-Call 연락처로 이동하여 {{< ui >}}Ringtone{{< /ui >}}를 탭한 다음 {{< ui >}}Emergency Bypass{{< /ui >}}를 활성화합니다.
{{% /tab %}}

{{% tab "Android" %}}

{{< img src="incident_response/on-call/guides/configure-mobile-device-for-on-call/android_sync_card_may_2025.png" alt="SMS 및 음성 통화에 대해 Android 기기의 방해 금지 모드를 무시합니다." style="width:100%;" >}}

1. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}로 이동합니다.

2. {{< ui >}}Phone & SMS{{< /ui >}}에서 {{< ui >}}Automatic Contact Card Sync{{< /ui >}}를 활성화합니다. 'Datadog On-Call'이라는 연락처가 생성되고, Datadog의 최신 전화 번호로 정기적으로 업데이트됩니다.

3. 생성된 연락처는 즐겨찾기에 추가합니다.

4. Android 시스템 설정에서 {{< ui >}}Sound & vibration{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}}로 이동합니다. Datadog On-Call 연락처에 대해 예외 항목을 생성합니다.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">
<a href="https://datadog-on-call.s3.amazonaws.com/datadog-on-call.vcf">Datadog On-Call 연락처 카드의 현재 버전을 다운로드합니다</a>. <strong>참고</strong>: 연락처 카드는 언제든지 변경될 수 있습니다.
</div>

## On-Call 모바일 위젯 {#on-call-mobile-widgets}
On-Call 홈 화면 및 잠금 화면 위젯을 추가하여 페이지와 교대 근무에 액세스하세요.

### On-Call 홈 화면 위젯 {#on-call-home-screen-widget}

Datadog 위젯을 사용하여 모바일 홈 화면에서 On-Call 교대 근무와 On-Call 페이지를 확인하세요.

다음 필터를 적용해 On-Call 교대 근무 위젯을 사용자 지정할 수 있습니다.

- 조직
- 기간

다음 필터를 적용해 On-Call 페이지 위젯을 사용자 지정할 수 있습니다.

- 조직
- 팀
- 순서

**참고**: On-Call 페이지 위젯에 추가 필터를 적용할 수 있습니다.

#### On-Call 교대 근무 위젯 편집 {#edit-an-on-call-shift-widget}

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/widgets/ios_shifts_widget_may_2025.png" alt="iOS 화면에 표시된 설정 완료된 홈 화면 온콜 교대 근무 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯을 길게 누르세요.
2. {{< ui >}}Edit Widget{{< /ui >}}을 눌러 설정 화면을 불러오세요.
3. On-Call 교대 근무를 조회하려는 {{< ui >}}Organization{{< /ui >}} 및 {{< ui >}}Period{{< /ui >}}를 선택하세요.
4. 위젯 바깥을 눌러 선택 사항을 확정한 다음 설정 화면을 종료하세요.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_shifts_widget_may_2025.png" alt="Android 화면에 표시된 설정 완료된 홈 화면 On-Call 교대 근무 위젯" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. 설정할 위젯을 누르세요.
2. On-Call 교대 근무를 조회하려는 {{< ui >}}Organization{{< /ui >}} 및 {{< ui >}}Time Period{{< /ui >}}를 선택하세요.
3. {{< ui >}}✓{{< /ui >}}를 눌러 설정을 저장하세요.
4. 위젯을 길게 누르고 취향에 맞추어 크기를 조정하세요.

{{% /tab %}}
{{< /tabs >}}

### On-Call 잠금 화면 위젯 {#on-call-lock-screen-widget}

On-Call 잠금 화면 위젯은 사용자의 On-Call 상태를 표시합니다. 잠금 화면 위젯은 iOS에서만 사용 가능합니다.

1. 잠금 화면을 길게 누르세요.
2. {{< ui >}}Customize{{< /ui >}}를 누른 다음 {{< ui >}}Lock Screen{{< /ui >}}을 누르세요.
3. 잠금 화면 위젯 공간을 눌러 {{< ui >}}Add Widgets{{< /ui >}} 카드를 불러오세요.
4. 스크롤하여 {{< ui >}}Datadog{{< /ui >}} 앱을 누르세요.
4. On-Call 잠금 화면 위젯을 누르세요.
5. 잠금 화면에서 위젯을 눌러 설정 패널을 불러오세요.
6. On-Call 상태를 표시하려는 조직을 선택하세요.

**참고**: 새 위젯을 추가하려면 잠금 화면에 빈 공간이 있어야 합니다. 삭제하려는 위젯 왼쪽 상단의 {{< ui >}}\-{{< /ui >}} 버튼을 눌러 잠금 화면 위젯을 삭제할 수 있습니다.

## 문제 해결 {#troubleshooting}
문제 해결을 위한 도움은 [Datadog 지원팀에 문의하세요][2]. 또한 [Datadog 공개 Slack][3] [#mobile-app][4] 채널에 메시지를 보낼 수 있습니다.

[1]: /ko/mobile/?tab=ios
[2]: /ko/help/
[3]: https://chat.datadoghq.com/
[4]: https://datadoghq.slack.com/archives/C0114D5EHNG
[5]: /ko/incident_response/on-call/