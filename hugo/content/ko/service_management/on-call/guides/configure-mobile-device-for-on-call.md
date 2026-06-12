---
further_reading:
- link: https://docs.datadoghq.com/service_management/on-call/
  tag: 설명서
  text: On-Call 설명서
title: Datadog On-Call을 위한 모바일 기기 설정
---

온콜 중에는 인시던트에 효과적으로 대응할 수 있도록 신뢰할 수 있고 시기적절한 알림이 필요합니다. 이 가이드를 통해 Datadog On-Call의 성능을 최적화하기 위한 모바일 기기 구성 방법을 알아보세요.

1. [Datadog 모바일 앱][1]을 설치합니다.
2. [푸시 알림 설정](#set-up-push-notifications): 기기가 Datadog 모바일 앱에서 알림을 받을 수 있도록 설정합니다.
3. [무음 및 방해 금지 모드 무시](#circumvent-mute-and-do-not-disturb-mode): 기기가 방해 금지 모드에 있는 동안 푸시 알림, 음성통화 및 SMS를 받습니다.

## 푸시 알림 설정
<div class="alert alert-info">
Datadog 모바일 앱에 처음 로그인하면 온보딩 플로우를 통해 알림 및 권한을 설정합니다.
</div>

기본적으로 모바일 앱은 알림을 보낼 수 없습니다. On-Call 이벤트에 대한 푸시 알림을 받으려면 다음과 같이 설정하세요.

{{< tabs >}}
{{% tab "iOS" %}}

1. Datadog 모바일 앱에서 **Account** > **Settings** > **Notifications**로 이동합니다.

   {{< img src="service_management/oncall/app_settings_iOS.png" alt="Datadog 모바일 앱의 iOS 버전에서 알림 설정을 찾습니다." style="width:35%;" >}}

2. **Enable Notifications** 토글을 활성화합니다. 처음으로 알림을 활성화하는 경우 권한 프롬프트가 열립니다. 권한을 부여한 다음 **Enable Notifications**을 다시 터치하여 iOS 시스템 설정으로 이동합니다.

   {{< img src="service_management/oncall/system_notifications_settings_iOS.png" alt="iOS 기기의 시스템 알림 설정을 구성합니다." style="width:100%;" >}}

3. iOS 시스템 설정에서 **Allow Notifications** 토글을 활성화해야 합니다. **Sound** 및 **Badges** 토글도 활성화하면 더욱 유용합니다.

모바일 앱에 반드시 필요한 권한을 부여해 주세요.
{{% /tab %}}

{{% tab "Android" %}}
1. Datadog 모바일 앱에서 **Account** > **Settings** > **Notifications**로 이동합니다.

   {{< img src="service_management/oncall/app_settings_android.png" alt="Datadog 모바일 앱의 Android 버전에서 알림 설정을 찾습니다." style="width:35%;" >}}

2. **Notifications**를 탭하여 시스템 설정으로 이동하여 원하는 앱 알림을 구성합니다.

   {{< img src="service_management/oncall/system_notifications_settings_android.png" alt="Android 기기의 시스템 알림 설정을 구성합니다." style="width:100%;" >}}

3. Android 시스템 설정에서 **Allow notifications** 토글을 활성화합니다. **Allow sound and vibration**도 활성화하면 더욱 유용합니다.

{{% /tab %}}
{{< /tabs >}}

### 커스텀 사운드
iOS와 Android 모두에서 기본 시스템 알림 사운드를 재정의할 수 있는 옵션이 있습니다. 긴급도가 높은 알림의 경우 시스템 사운드와 볼륨 설정을 조정하는 것이 좋습니다. 이렇게 하면 알림을 인식하기 쉬울 뿐 아니라 주의를 끌기에도 효과적입니다. Datadog 앱에는 커스텀 사운드가 미리 로드되어 있습니다.

## 음소거 및 방해 금지 모드 무시
Datadog 모바일 앱에서 제공하는 푸시 알림과 음성통화, SMS와 같은 전화 알림에 대해 기기의 시스템 볼륨과 방해 금지 모드를 재정의할 수 있습니다.

### 푸시 알림
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/oncall/override_dnd_push_iOS.png" alt="iOS 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%;" >}}

1. Datadog 모바일 앱에서 **Account** > **Settings** > **Notifications**로 이동합니다.

2. **Enable Critical Alerts** 토글을 활성화합니다.

Critical alerts는 음소거와 방해 금지를 무시합니다. Critical alerts를 활성화하면 시스템은 장치의 음소거 또는 방해 금지 설정과 관계없이 Critical alerts 사운드를 재생합니다.

모바일 앱에 반드시 필요한 권한을 부여해 주세요.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/oncall/override_dnd_push_android.png" alt="Android 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%;" >}}

1. Datadog 모바일 앱에서 **Account** > **Settings** > **Notifications**로 이동합니다.

2. **Override system volume** 토글을 활성화합니다. 그러면 시스템 설정으로 이동합니다. Datadog 모바일 앱 줄에 해당 토글이 활성화되어 있는지 확인합니다.

<div class="alert alert-warning">
Android에서 Datadog 모바일 앱이 Work 프로필 내에서 사용되면 시스템 볼륨이나 방해 금지 설정을 무시할 수 없습니다. 이를 해결하려면 개인 프로필에 Datadog 모바일 앱을 설치하세요.
</div>

{{% /tab %}}
{{< /tabs >}}

### 전화 채널(음성통화 및 SMS)

Datadog은 안정성을 위해 순환하는 전화번호 세트를 사용하여 사용자에게 연락합니다. 모바일 기기가 Datadog On-Call에서 걸려오는 전화와 메시지를 인식하도록 돕기 위해 디지털 연락처 카드를 만들 수 있습니다. 이 카드는 Datadog의 최신 전화번호로 자동으로 업데이트됩니다. 시스템 설정에서 이 연락처에 특별한 권한을 할당하여 방해 금지 모드 무시 등 향상된 기능을 사용할 수 있습니다.

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/oncall/override_dnd_telephony_iOS.png" alt="iOS 기기의 방해 금지 모드를 무시하고 SMS 및 음성통화를 인식할 수 있도록 합니다" style="width:100%;" >}}

1. Datadog 모바일 앱에서 **Account** > **Settings** > **Notifications**로 이동합니다.

2. **Enable Automatic Contact Card Sync** 토글을 활성화하면 "Datadog On-Call"이라는 연락처가 생성되고, Datadog의 최신 전화 번호로 정기적으로 업데이트됩니다.

3. 연락처가 생성되면 iOS 시스템 설정을 열고 **Focus** > **Do Not Disturb**로 이동합니다.

4. **People**에서 Datadog On-Call 연락처의 알림을 허용합니다. Datadog 푸시 애플리케이션에 대한 Critical alerts를 활성화한 경우 Datadog 모바일 앱도 **Apps**에 표시됩니다.
{{% /tab %}}

{{% tab "Android" %}}

{{< img src="service_management/oncall/override_dnd_telephony_android.png" alt="Android 기기의 방해 금지 모드를 무시하고 SMS 및 음성통화를 인식할 수 있도록 합니다" style="width:100%;" >}}

1. Datadog 모바일 앱에서 **Account** > **Settings** > **Notifications**로 이동합니다.

2. **Phone & SMS**에서 **Automatic Contact Card Sync**를 활성화합니다. 이렇게 하면 Datadog의 최신 전화번호로 정기적으로 업데이트되는 "Datadog On-Call"이라는 연락처가 생성됩니다.

3. 생성된 연락처는 즐겨찾기에 추가합니다.

4. Android 시스템 설정을 열고 **Sound & vibration** > **Do Not Disturb**에서 Datadog On-Call 연락처에 대한 예외를 생성합니다.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">
<a href="https://datadog-on-call.s3.amazonaws.com/datadog-on-call.vcf">Datadog On-Call 연락처 카드의 현재 버전을 다운로드하세요</a>. <strong>참고</strong>: 연락처 카드는 언제든지 변경될 수 있습니다.
</div>

[1]: /ko/service_management/mobile/?tab=ios