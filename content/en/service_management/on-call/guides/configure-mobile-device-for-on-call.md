---
title: Set Up Your Mobile Device for Datadog On-Call
further_reading:
- link: "https://docs.datadoghq.com/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call Documentation"
---

Being on-call requires reliable and timely notifications to ensure you can respond to incidents effectively. This guide walks you through the steps to configure your mobile device for optimal performance with Datadog On-Call.

1. Install the [Datadog mobile app][1].
2. [Set up push notifications](#set-up-push-notifications): Enable your device to receive notifications from the Datadog mobile app.
3. [Circumvent mute and Do Not Disturb mode](#circumvent-mute-and-do-not-disturb-mode): Receive push notifications, voice calls, and SMS while your device is in Do Not Disturb mode.

## Set up push notifications
<div class="alert alert-info">
When you log into the Datadog mobile app for the first time, an onboarding flow takes care of notification settings and permissions.
</div>

However, by default, the mobile app is not allowed to send you notifications. To receive push notifications: 

{{< tabs >}}
{{% tab "iOS" %}}

1. In the Datadog mobile app, navigate to **Settings** > **Notifications**.

   {{< img src="service_management/mobile/ios_settings_may_2025.png" alt="Find the notification settings in the iOS version of Datadog's mobile app." style="width:35%;" >}}

2. Enable the **Allow Notifications** toggle. If this is your first time enabling notifications, this opens up a permissions prompt. Grant permission, then touch **Enable Notifications** again to go to the iOS system settings.

   {{< img src="service_management/mobile/ios_notification_may_2025.png" alt="Configure the system notification settings of your iOS device." style="width:100%;" >}}

3. Within the iOS system settings, make sure you enable the **Allow Notifications** toggle. Datadog highly recommends you also enable the **Sound** and **Badges** toggles.

Make sure you grant the mobile app the necessary permissions.
{{% /tab %}}

{{% tab "Android" %}}
1. In the Datadog mobile app, navigate to **Settings** > **Notifications**.

   {{< img src="service_management/mobile/android_settings_may_2025.png" alt="Find the notification settings in the Android version of Datadog's mobile app." style="width:35%;" >}}

2. Enable the **Allow notifications** toggle. Datadog highly recommends you also enable **Sound and vibration** and **Show content on Lock screen**.

   {{< img src="service_management/mobile/android_notification_may_2024.png" alt="Configure the system notification settings of your Android device." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

### Custom sounds
On both iOS and Android, you have the option to override the default system notification sounds. The Datadog app comes preloaded with a selection of custom sounds.  

## Circumvent mute and Do Not Disturb mode for On-Call
You can override your device's system volume and Do Not Disturb mode for both push notifications (from the Datadog mobile app) and telephony notifications (such as voice call and SMS).

For more information, here is a full guide on [how to set up your mobile device for On-Call][]

### Critical push notifications
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_critical_may_2025.png" alt="Override your iOS device's system volume and do-not-disturb mode." style="width:100%;" >}}

1. In the Datadog mobile app, navigate to **Settings** > **On-Call**.

2. Enable the **Critical Alerts** toggle. Critical alerts ignore the mute switch and Do Not Disturb. If you enable critical alerts, the system plays a critical alert’s sound regardless of the device’s mute or Do Not Disturb settings.

3. Within the iOS system settings, make sure you enable the **Critical Alerts** toggle. Make sure you grant the mobile app the necessary permissions.

4. Test the setup of your critical push notification by tapping **Test push notifications**

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_critical_may_2025.png" alt="Override your Android device's system volume and Do Not Disturb mode." style="width:100%;" >}}

1. In the Datadog mobile app, navigate to **Settings** > **On-Call**.

2. Tap **Bypass Do Not Disturb** and enable **Allow notifications** for High urgency On-Call.

3. Tap the **Override system volume** and enable toggle. This leads you to your system settings. Find the row for the Datadog mobile app and ensure that the toggle is enabled.

4. Test the setup of your critical push notification by tapping **Test push notifications**

<div class="alert alert-danger">
On Android, the Datadog mobile app cannot bypass system volume or Do Not Disturb settings when used within a Work Profile. As a workaround, install the Datadog mobile app on your personal profile.
</div>

{{% /tab %}}
{{< /tabs >}}
### Custom sounds for critical push
For high-urgency notifications, Datadog strongly recommends customizing your system sounds and volume settings. This ensures that alerts are not only more distinct and recognizable, but also more effective in capturing attention.

### Telephony channels (voice calls and SMS)

For reliability, Datadog uses a rotating set of phone numbers to contact you. To help your phone recognize calls and messages from Datadog On-Call, you can create a digital contact card. This card automatically updates with Datadog's latest phone numbers. You can assign special permissions to this contact in your system settings for enhanced functionality, such as circumventing Do Not Disturb mode.

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_sync_card_may_2025.png" alt="Override your iOS device's Do Not Disturb mode for SMS and voice calls" style="width:100%;" >}}

1. In the Datadog mobile app, navigate to **Account** > **Settings** > **Notifications**.

2. Toggle on **Enable Automatic Contact Card Sync**. This creates a contact named "Datadog On-Call", which updates regularly with Datadog's latest phone numbers.

3. After this contact is created, open your iOS system settings and navigate to **Focus** > **Do Not Disturb**.

4. Under **People**, allow notifications from the Datadog On-Call contact. If you enabled critical alerts for Datadog push applications, then the Datadog mobile app also appears under **Apps**.
{{% /tab %}}

{{% tab "Android" %}}

{{< img src="service_management/mobile/android_sync_card_may_2025.png" alt="Override your Android device's do-not-disturb mode for SMS and voice calls" style="width:100%;" >}}

1. In the Datadog mobile app, navigate to **Account** > **Settings** > **Notifications**.

2. Under **Phone & SMS**, enable **Automatic Contact Card Sync**. This creates a contact named "Datadog On-Call", which updates regularly with Datadog's latest phone numbers.

3. After this contact is created, mark it as a favorite.

4. Open your Android system settings and navigate to **Sound & vibration** > **Do Not Disturb**. Create an exception for the Datadog On-Call contact.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">
<a href="https://datadog-on-call.s3.amazonaws.com/datadog-on-call.vcf">Download the current version of the Datadog On-Call contact card</a>. <strong>Note</strong>: The contact card is subject to change at any time.
</div>

[1]: /service_management/mobile/?tab=ios
