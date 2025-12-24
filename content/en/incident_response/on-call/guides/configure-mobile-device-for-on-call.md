---
title: Set Up Your Mobile Device for Datadog On-Call
aliases:
- /service_management/on-call/guides/configure-mobile-device-for-on-call/
further_reading:
- link: "https://docs.datadoghq.com/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call Documentation"
---

Being on-call requires reliable and timely notifications to ensure you can respond to incidents effectively. This guide walks you through the steps to configure your mobile device for optimal performance with Datadog On-Call.

1. Install the [Datadog mobile app][1].
2. [Set up push notifications](#set-up-push-notifications): Enable your device to receive notifications from the Datadog mobile app.
3. [Circumvent mute and Do Not Disturb mode](#circumvent-mute-and-do-not-disturb-mode-for-on-call): Receive push notifications, voice calls, and SMS while your device is in Do Not Disturb mode.

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

   {{< img src="service_management/mobile/android_notification_may_2025.png" alt="Configure the system notification settings of your Android device." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

### Custom sounds 
On both iOS and Android, you have the option to override the default system notification sounds. The Datadog app comes preloaded with a selection of custom sounds. 

## Circumvent mute and Do Not Disturb mode for On-Call
You can override your device's system volume and Do Not Disturb mode for both push notifications (from the Datadog mobile app) and telephony notifications (such as voice call and SMS).

### Critical push notifications
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_critical_may_2025.png" alt="Override your iOS device's system volume and do-not-disturb mode." style="width:100%;" >}}

1. In the Datadog mobile app, navigate to **Settings** > **On-Call**.

2. Enable the **Critical Alerts** toggle. Critical alerts ignore the mute switch and Do Not Disturb. If you enable critical alerts, the system plays a critical alert’s sound regardless of the device’s mute or Do Not Disturb settings.

3. Within the iOS system settings, make sure you enable the **Critical Alerts** toggle. Make sure you grant the mobile app the necessary permissions.

4. Select your device for **High Urgency Notifications** and/or **Low Urgency Notifications** under the Notification Preferences section.

5. Test the setup of your critical push notification by tapping **Test push notifications**.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_critical_may_2025.png" alt="Override your Android device's system volume and Do Not Disturb mode." style="width:100%;" >}}

1. In the Datadog mobile app, navigate to **Settings** > **On-Call**.

{{< img src="service_management/mobile/android_allow_notification_may_2025.png" alt="Override your Android device's system volume and Do Not Disturb mode." style="width:100%;" >}}

2. If notification permissions are missing, tap **Bypass Do Not Disturb** and enable **Allow notifications** in System Settings.

{{< img src="service_management/mobile/android_override_system_may_2025.png" alt="Override your Android device's system volume and Do Not Disturb mode." style="width:100%;" >}}

3. Then tap **Bypass Do Not Disturb** and enable **Override Do Not Disturb** in System Settings for High Urgency On-Call.

**For Samsung:** Go to device **Settings** > **Notifications** > **Do Not Disturb** > **App notification** options. Select Datadog as an app that bypasses Do Not Disturb.

{{< img src="service_management/mobile/android_override_system_volume_may_2025.png" alt="Override your Android device's system volume and Do Not Disturb mode." style="width:100%;" >}}

4. In order to override system volume, tap the **Override system volume** and allow **Mode access** in System Settings to toggle on **Override system volume**.

5. On web, set up notifciation preferences for **High Urgency Notifications** and/or **Low Urgency Notifications**.

6. Test the setup of your critical push notification by tapping **Test push notifications**.

<div class="alert alert-warning">
On Android, the Datadog mobile app cannot bypass system volume or Do Not Disturb settings when used within a Work Profile. As a workaround, install the Datadog mobile app on your personal profile.
</div>

{{% /tab %}}
{{< /tabs >}}
### Custom sounds and volume for critical push
For high-urgency notifications, Datadog strongly recommends customizing your system sounds and volume settings. This ensures that alerts are not only more distinct and recognizable, but also more effective in capturing attention. Test your notification preferences to confirm that they behave as expected.

### Telephony channels (voice calls and SMS)

For reliability, Datadog uses a rotating set of phone numbers to contact you. To help your phone recognize calls and messages from Datadog On-Call, you can create a digital contact card. This card automatically updates with Datadog's latest phone numbers. You can assign special permissions to this contact in your system settings for enhanced functionality, such as circumventing Do Not Disturb mode.

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_sync_card_may_2025.png" alt="Override your iOS device's Do Not Disturb mode for SMS and voice calls" style="width:100%;" >}}

1. In the Datadog mobile app, navigate to **Settings** > **Preferences** > **On-Call**.

2. Toggle on **Automatic Contact Card Sync**. This creates a contact named "Datadog On-Call", which updates regularly with Datadog's latest phone numbers.

3. After this contact is created, open your iOS system settings and navigate to **Focus** > **Do Not Disturb**.

4. Under **People**, allow notifications from the Datadog On-Call contact. If you enabled critical alerts for Datadog push applications, then the Datadog mobile app also appears under **Apps**.

5. To bypass silent mode, navigate to the Datadog On-Call contact >> tap **Ringtone** >> activate **Emergency Bypass**.
{{% /tab %}}

{{% tab "Android" %}}

{{< img src="service_management/mobile/android_sync_card_may_2025.png" alt="Override your Android device's do-not-disturb mode for SMS and voice calls" style="width:100%;" >}}

1. In the Datadog mobile app, navigate to **Settings** > **On-Call**.

2. Under **Phone & SMS**, enable **Automatic Contact Card Sync**. This creates a contact named "Datadog On-Call", which updates regularly with Datadog's latest phone numbers.

3. After this contact is created, mark it as a favorite.

4. Open your Android system settings and navigate to **Sound & vibration** > **Do Not Disturb**. Create an exception for the Datadog On-Call contact.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">
<a href="https://datadog-on-call.s3.amazonaws.com/datadog-on-call.vcf">Download the current version of the Datadog On-Call contact card</a>. <strong>Note</strong>: The contact card is subject to change at any time.
</div>

## On-Call mobile widgets
Add On-Call home screen and lock screen widgets to easily access your pages and shifts.

### On-Call home screen widget

View your On-Call shifts and On-Call pages on your mobile home screen with Datadog widgets.

You can customize your On-Call shift widgets by filtering on:

- Organization
- Period of time

You can customize your On-Call page widgets by filtering on:

- Organization
- Team
- Order

**Note**: You can add additional filters for the On-Call pages widget.

#### Edit an On-Call shift widget

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/ios_shifts_widget_may_2025.png" alt="Configured home screen on-call shift widgets displayed on iOS screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Long press on the widget to configure.
2. Tap **Edit Widget** to bring up the configuration screen.
3. Select the **Organization** and **Period** you would like to see your On-Call shifts for.
4. Tap out of the widget to validate your selection and exit the configuration screen.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/android_shifts_widget_may_2025.png" alt="Configured home screen On-Call shift widgets displayed on Android screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Tap on the widget to configure.
2. Select the **Organization** and **Time Period** you would like to see your On-Call shifts for.
3. Tap **✓** to save the configuration.
4. Long press and resize the widget to fit your preference.

{{% /tab %}}
{{< /tabs >}}

### On-Call lock screen widget

The On-Call lock screen widget displays your On-Call status. Lock screen widgets are only available on iOS.

1. Long press on your lock screen.
2. Tap **Customize**, then **Lock Screen**.
3. Tap on the lock screen widget space to pull up the **Add Widgets** card.
4. Scroll to and tap on the **Datadog** app.
4. Tap the On-Call lock screen widget.
5. Tap the widget on the lock screen to pull up the configuration panel.
6. Select the organization you would like to display your On-Call status for.

**Note**: You must have an empty space on your lock screen to add a new widget. You can delete lock screen widgets by tapping the **-** button on the top left of the widget you would like to delete.

## Troubleshooting
For help with troubleshooting, [contact Datadog support][2]. You can also send a message in the [Datadog public Slack][3] [#mobile-app][4] channel.

[1]: /service_management/mobile/?tab=ios
[2]: /help/
[3]: https://chat.datadoghq.com/
[4]: https://datadoghq.slack.com/archives/C0114D5EHNG
