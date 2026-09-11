---
description: 중요 경보 설정을 통해 iOS 및 Android에서 온콜 경보, 인시던트, 워크플로 업데이트에 대한 푸시 알림을 구성하세요.
further_reading:
- link: /incident_response/on-call/
  tag: 설명서
  text: On-Call 설명서
- link: /incident_response/incident_management/notification/
  tag: 설명서
  text: 인시던트 알림 규칙 설명서
- link: /getting_started/workflow_automation/
  tag: 설명서
  text: Workflow Automation 설명서
title: 모바일 앱의 푸시 알림 설정
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 Incident Management 푸시 알림만 지원됩니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}
[온콜 경보](#circumvent-mute-and-Do-Not-Disturb-mode-for-On-Call), [인시던트](#incident-notifications), [워크플로 자동화 업데이트](#workflow-automation-notifications)에 대한 모바일 푸시 알림을 받으면 Datadog 모바일 앱에서 실시간으로 정보를 확인할 수 있습니다.

## 푸시 알림 설정 {#set-up-push-notifications}

기본적으로 모바일 앱에서 알림을 보낼 수 없습니다. 푸시 알림 받기: 

{{< tabs >}}
{{% tab "iOS" %}}

1. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}로 이동합니다.

   {{< img src="mobile/push_notification/ios_settings_may_2025.png" alt="Datadog 모바일 앱의 iOS 버전에서 알림 설정을 찾습니다." style="width:40%; background:none; border:none; box-shadow:none;" >}}

2. {{< ui >}}Allow Notifications{{< /ui >}} 토글을 활성화합니다. 알림을 처음 활성화하는 경우 권한 프롬프트가 열립니다. 권한을 부여한 다음 {{< ui >}}Enable Notifications{{< /ui >}}를 다시 터치하여 iOS 시스템 설정으로 이동합니다.

   {{< img src="mobile/push_notification/ios_notification_may_2025.png" alt="iOS 기기의 시스템 알림 설정을 구성합니다." style="width:100%; background:none; border:none; box-shadow:none;" >}}

3. iOS 시스템 설정 내에서 {{< ui >}}Allow Notifications{{< /ui >}} 토글이 활성화되어 있는지 확인합니다. Datadog은 {{< ui >}}Sound{{< /ui >}} 및 {{< ui >}}Badges{{< /ui >}} 토글을 활성화할 것을 권장합니다.

모바일 앱에 반드시 필요한 권한을 부여해 주세요.

### 커스텀 사운드 {#custom-sounds}

Datadog 모바일 앱에 미리 로드되어 있는 커스텀 사운드로 기본 시스템 알림 사운드를 재정의할 수 있습니다.

알림 사운드 사용자 지정

1. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Notification categories{{< /ui >}}로 이동합니다.
2. 사용자 지정하려는 알림 카테고리를 선택합니다.
3. 사용 가능한 옵션에서 사운드를 선택합니다.

{{% /tab %}}

{{% tab "Android" %}}
1. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}로 이동합니다.

   {{< img src="mobile/push_notification/android_settings_may_2025.png" alt="Datadog 모바일 앱의 Android 버전에서 알림 설정을 찾습니다." style="width:40%; background:none; border:none; box-shadow:none;" >}}

2. {{< ui >}}Allow notifications{{< /ui >}} 토글을 활성화합니다. Datadog은 {{< ui >}}Sound and vibration{{< /ui >}} 및 {{< ui >}}Show content on Lock screen{{< /ui >}}을 활성화할 것을 강력히 권장합니다.

   {{< img src="mobile/push_notification/android_notification_may_2025.png" alt="Android 기기의 시스템 알림 설정을 구성합니다." style="width:100%; background:none; border:none; box-shadow:none;" >}}

### 커스텀 사운드 {#custom-sounds-1}

Datadog 모바일 앱에 미리 로드되어 있는 커스텀 사운드로 기본 시스템 알림 사운드를 재정의할 수 있습니다.

알림 사운드 사용자 지정

1. {{< ui >}}Device Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Advanced Settings{{< /ui >}}로 이동합니다.
2. {{< ui >}}Manage notification categories for each app{{< /ui >}}을 선택하고 Datadog이 선택되어 있는지 확인합니다.
3. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Notification categories{{< /ui >}}로 이동합니다.
4. 사용자 지정하려는 알림 카테고리를 선택합니다.
5. 사용 가능한 옵션에서 사운드를 선택합니다.

**참고**: 푸시 알림 볼륨은 기기의 시스템 볼륨 설정에 따라 지정됩니다.

{{% /tab %}}
{{< /tabs >}}

## On-Call에 대해 음소거 및 방해 금지 모드 우회 {#circumvent-mute-and-do-not-disturb-mode-for-on-call}
Datadog 모바일 앱에서 제공하는 푸시 알림과 음성통화, SMS와 같은 전화 알림에 대해 기기의 시스템 볼륨과 방해 금지 모드를 무시할 수 있습니다.

자세한 내용은 [On-Call을 위한 모바일 기기 설정 가이드][4]를 참조하세요.

### 중요 푸시 알림 {#critical-push-notifications}
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 On-Call이 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}
<div class="alert alert-info">
중요 푸시 알림은 On-Call에서만 사용 가능합니다. Datadog 모바일 앱에서 On-Call을 처음 설정하면 온보딩 플로우를 통해 알림 및 권한을 설정합니다.
</div>
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/push_notification/ios_critical_may_2025.png" alt="iOS 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%; background:none; border:none; box-shadow:none;" >}}

1. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}로 이동합니다.

2. {{< ui >}}Critical Alerts{{< /ui >}} 토글을 활성화합니다. 중요 경보는 음소거 스위치와 방해 금지 모드를 무시합니다. 중요 경보를 활성화하면 시스템은 기기의 음소거 또는 방해 금지 설정과 관계없이 중요 경보 사운드를 재생합니다.

3. iOS 시스템 설정 내에서 {{< ui >}}Critical Alerts{{< /ui >}} 토글이 활성화되어 있는지 확인합니다. 모바일 앱에 반드시 필요한 권한을 부여해 주세요.

4. 알림 기본 설정 섹션에서 {{< ui >}}High Urgency Notifications{{< /ui >}} 및 {{< ui >}}Low Urgency Notifications{{< /ui >}}를 설정할 기기를 선택합니다.

5. 를 탭하여 중요 푸시 알림 설정을 테스트합니다{{< ui >}}Test push notifications{{< /ui >}}.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/push_notification/android_critical_may_2025.png" alt="Android 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%; background:none; border:none; box-shadow:none;" >}}

1. Datadog 모바일 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}로 이동합니다.

{{< img src="mobile/push_notification/android_allow_notification_may_2025.png" alt="Android 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%; background:none; border:none; box-shadow:none;" >}}

2. 알림 권한이 없는 경우 {{< ui >}}Bypass Do Not Disturb{{< /ui >}}를 탭하고 시스템 설정에서 {{< ui >}}Allow notifications{{< /ui >}}를 활성화합니다.

{{< img src="mobile/push_notification/android_override_system_may_2025.png" alt="Android 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%; background:none; border:none; box-shadow:none;" >}}

3. 그런 다음 {{< ui >}}Bypass Do Not Disturb{{< /ui >}}를 탭하고 High Urgency On-Call 실행을 위해 시스템 설정에서 {{< ui >}}Override Do Not Disturb{{< /ui >}}를 활성화합니다.

   **삼성 기기**: {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} > {{< ui >}}App notifications{{< /ui >}}로 이동합니다. Datadog을 선택하고 방해 금지 모드 우회를 허용합니다.

{{< img src="mobile/push_notification/android_override_system_volume_may_2025.png" alt="Android 기기의 시스템 볼륨과 방해 금지 모드를 무시합니다." style="width:100%; background:none; border:none; box-shadow:none;" >}}

4. 시스템 볼륨을 무시하려면 {{< ui >}}Override system volume{{< /ui >}}를 탭하고 시스템 설정에서 {{< ui >}}Mode access{{< /ui >}}의 {{< ui >}}Override system volume{{< /ui >}}토글을 허용합니다.

5. 알림 기본 설정 섹션에서 {{< ui >}}High Urgency Notifications{{< /ui >}} 및 {{< ui >}}Low Urgency Notifications{{< /ui >}}를 설정할 기기를 선택합니다.

6. {{< ui >}}Test push notifications{{< /ui >}}를 탭하여 중요 푸시 알림 설정을 테스트합니다.

<div class="alert alert-warning">
Android에서 Datadog 모바일 앱은 업무용 프로필 내에서 사용 시 시스템 볼륨이나 방해 금지 모드 설정을 우회할 수 없습니다. 이를 해결하려면 개인 프로필에 Datadog 모바일 앱을 설치하세요.
</div>

<div class="alert alert-info">
온콜 페이지를 확인하고 관련 조치를 취하려면 로그인해야 합니다. 단, 모바일 앱에서 로그아웃한 상태에서도 온콜 푸시 알림은 계속 수신됩니다.
</div>

{{% /tab %}}
{{< /tabs >}}

### 중요 푸시의 커스텀 사운드 및 볼륨 {#custom-sounds-and-volume-for-critical-push}

<div class="alert alert-info"> 볼륨 및 사운드 제어는 On-Call 알림 기능에 한해서 사용할 수 있습니다. 인시던트 및 워크플로 알림은 기기의 기본 시스템 설정에 따라 실행됩니다. </div>

긴급도가 높은 알림에 대해, Datadog은 시스템 사운드 및 볼륨 설정을 사용자 지정할 것을 강력히 권장합니다. 이렇게 하면 경보를 보다 분명하게 할 수 있을 뿐 아니라 주의를 끄는 데 더욱 효과적입니다. 중요 푸시 알림 기본 설정을 테스트하여 예상대로 작동하는지 확인하세요.

## 인시던트 알림 {#incident-notifications}
[웹 인시던트 알림 규칙][2]을 설정하여 활성 인시던트의 상태 업데이트를 받습니다. 

1. 인시던트에서 {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Notification Rules{{< /ui >}}][1]로 이동합니다.
2. 오른쪽 상단의 {{< ui >}}+ New Rule{{< /ui >}} 버튼을 클릭합니다.
3. {{< ui >}}When an incident is...{{< /ui >}} 및 {{< ui >}}And meets the following conditions...{{< /ui >}}에 대해 원하는 조건 필드를 입력합니다. 기본적으로 이러한 필터는 비어 있으며, 알림 규칙은 모든 인시던트에 대해 트리거됩니다.
4. {{< ui >}}Notify...{{< /ui >}}에서 알림 수신자를 선택합니다. 수신자의 모바일 기기로 알림을 보내려면 이름 옆에 {{< ui >}}(Mobile Push Notification){{< /ui >}}이 포함된 옵션을 선택합니다. 이 옵션을 표시하려면 수신자가 Datadog 모바일 앱에서 알림을 활성화해야 합니다.
5. {{< ui >}}With Template:{{< /ui >}} 알림 규칙에 적용하려는 메시지 템플릿을 선택합니다.
6. {{< ui >}}Renotify on updates to:{{< /ui >}} 알림을 트리거하는 인시던트 속성을 선택합니다. 선택한 속성 중 하나 이상이 변경될 때마다 알림이 새로 전송됩니다.
7. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

기본적으로 푸시 알림이 활성화되어 있고 인시던트에 커맨더로 할당된 경우, 해당 인시던트에 대한 푸시 알림을 자동으로 받습니다.

## 워크플로 자동화 알림 {#workflow-automation-notifications}
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 <a href="/getting_started/site">Datadog 사이트</a>에서는 워크플로 자동화가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

모바일 푸시 알림을 보내는 [워크플로 자동화][3]를 생성합니다.

1. 워크플로 캔버스에서 {{< ui >}}\+{{< /ui >}} 아이콘을 클릭합니다.
2. {{< ui >}}Send mobile push notification{{< /ui >}}을 검색합니다.
3. {{< ui >}}To{{< /ui >}}에서 알림 수신자를 선택합니다. 이 옵션을 표시하려면 수신자가 Datadog 모바일 앱에서 알림을 활성화해야 합니다.
4. 메시지 입력 {{< ui >}}Body{{< /ui >}}

### 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:https://app.datadoghq.com/incidents/settings?_gl=1*334tvl*_gcl_aw*R0NMLjE3NDUwMDYwODQuQ2p3S0NBand0ZGlfQmhBQ0Vpd0E5N3k4QkxnWmU4cTdmazJtUlJoQ3o1OTZXcTNmRWJIQTk1Rzg4dnAtUmZtUHBQUGx0OVNVSjRlSk9Sb0Nwek1RQXZEX0J3RQ..*_gcl_au*MTAxODMyNDk1My4xNzQwNDk1NzA3LjExNzUxOTU1MTUuMTc0NjQ5NTU3OS4xNzQ2NDk1NTc5*_ga*MjExMzI1MjUyOS4xNzQ1ODU2NjMx*_ga_KN80RDFSQK*czE3NDY0OTQzMzYkbzU4JGcxJHQxNzQ2NDk5MzA0JGowJGwwJGg5NTQ2NTk0Ng..*_fplc*Q2V5WVJmNnRSV2R0RmljTDZyWmg3ZEVZMFZPeDNlTFhLZkxnenFCOXBvTUslMkZTWWk0a3JzVEw1cDU5YlZzTW55TE5YazY5bjdhJTJGOXpySzJ0TFMxTEozZms0WTVlOWVibEN5ZFBNNm1XYmJJQll0R0d4YnlralJ2eU1CS1NoUSUzRCUzRA..#Rules
[2]: /ko/incident_response/incident_management/setup_and_configuration/notification_rules/
[3]: https://docs.datadoghq.com/ko/getting_started/workflow_automation/
[4]: /ko/incident_response/on-call/guides/configure-mobile-device-for-on-call