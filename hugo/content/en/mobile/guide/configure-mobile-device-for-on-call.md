---
title: Set Up Your Mobile Device for Datadog On-Call
description: "Configure your mobile device for reliable on-call notifications with critical alerts, Do Not Disturb bypass, and telephony contact setup."
further_reading:
- link: "https://docs.datadoghq.com/incident_response/on-call/"
  tag: "Documentation"
  text: "On-Call Documentation"
- link: "https://docs.datadoghq.com/mobile/"
  tag: "Documentation"
  text: "Mobile App Documentation"
---
<div class="alert alert-info">
If you only need to access On-Call on mobile and want to restrict access to sensitive telemetry data on mobile devices, contact Datadog support.
</div>

Being on-call requires reliable and timely notifications to ensure you can respond to incidents effectively. This guide walks you through the steps to configure your mobile device for optimal performance with [Datadog On-Call][5].

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

1. In the Datadog mobile app, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/ios_settings_may_2025.png" alt="Find the notification settings in the iOS version of Datadog's mobile app." style="width:35%;" >}}

2. Enable the {{< ui >}}Allow Notifications{{< /ui >}} toggle. If this is your first time enabling notifications, this opens up a permissions prompt. Grant permission, then touch {{< ui >}}Enable Notifications{{< /ui >}} again to go to the iOS system settings.

   {{< img src="mobile/push_notification/ios_notification_may_2025.png" alt="Configure the system notification settings of your iOS device." style="width:100%;" >}}

3. Within the iOS system settings, make sure you enable the {{< ui >}}Allow Notifications{{< /ui >}} toggle. Datadog highly recommends you also enable the {{< ui >}}Sound{{< /ui >}} and {{< ui >}}Badges{{< /ui >}} toggles.

Make sure you grant the mobile app the necessary permissions.
{{% /tab %}}

{{% tab "Android" %}}
1. In the Datadog mobile app, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/android_settings_may_2025.png" alt="Find the notification settings in the Android version of Datadog's mobile app." style="width:35%;" >}}

2. Enable the {{< ui >}}Allow notifications{{< /ui >}} toggle. Datadog highly recommends you also enable {{< ui >}}Sound and vibration{{< /ui >}} and {{< ui >}}Show content on Lock screen{{< /ui >}}.

   {{< img src="mobile/push_notification/android_notification_may_2025.png" alt="Configure the system notification settings of your Android device." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

### Custom sounds
On both iOS and Android, you have the option to override the default system notification sounds. The Datadog app comes preloaded with a selection of custom sounds.  

## Circumvent mute and Do Not Disturb mode for On-Call
You can override your device's system volume and Do Not Disturb mode for both push notifications (from the Datadog mobile app) and telephony notifications (such as voice call and SMS).

### Critical push notifications
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/push_notification/ios_critical_may_2025.png" alt="Override your iOS device's system volume and do-not-disturb mode." style="width:100%;" >}}

1. In the Datadog mobile app, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

2. Enable the {{< ui >}}Critical Alerts{{< /ui >}} toggle. Critical alerts ignore the mute switch and Do Not Disturb. If you enable critical alerts, the system plays a critical alert’s sound regardless of the device’s mute or Do Not Disturb settings.

3. Within the iOS system settings, make sure you enable the {{< ui >}}Critical Alerts{{< /ui >}} toggle. Make sure you grant the mobile app the necessary permissions.

4. Select your device for {{< ui >}}High Urgency Notifications{{< /ui >}} and/or {{< ui >}}Low Urgency Notifications{{< /ui >}} under the Notification Preferences section.

5. Test the setup of your critical push notification by tapping {{< ui >}}Test push notifications{{< /ui >}}.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/push_notification/android_critical_may_2025.png" alt="Override your Android device’s system volume and Do Not Disturb mode." style="width:100%;" >}}

1. In the Datadog mobile app, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

{{< img src="mobile/push_notification/android_allow_notification_may_2025.png" alt="Override your Android device’s system volume and Do Not Disturb mode." style="width:100%;" >}}

2. If notification permissions are missing, tap {{< ui >}}Bypass Do Not Disturb{{< /ui >}} and enable {{< ui >}}Allow notifications{{< /ui >}} in System Settings.

{{< img src="mobile/push_notification/android_override_system_may_2025.png" alt="Override your Android device’s system volume and Do Not Disturb mode." style="width:100%;" >}}

3. Then tap {{< ui >}}Bypass Do Not Disturb{{< /ui >}} and enable {{< ui >}}Override Do Not Disturb{{< /ui >}} in System Settings for High Urgency On-Call.

   **On Samsung devices**: Go to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} > {{< ui >}}App notifications{{< /ui >}}. Select Datadog and allow it to bypass Do Not Disturb.

{{< img src="mobile/push_notification/android_override_system_volume_may_2025.png" alt="Override your Android device’s system volume and Do Not Disturb mode." style="width:100%;" >}}

4. To override system volume, tap the {{< ui >}}Override system volume{{< /ui >}} and allow {{< ui >}}Mode access{{< /ui >}} in System Settings to toggle on {{< ui >}}Override system volume{{< /ui >}}.

5. On web, set up notification preferences for {{< ui >}}High Urgency Notifications{{< /ui >}} and/or {{< ui >}}Low Urgency Notifications{{< /ui >}}.

6. Test the setup of your critical push notification by tapping {{< ui >}}Test push notifications{{< /ui >}}.

<div class="alert alert-warning">
On Android, the Datadog mobile app cannot bypass system volume or Do Not Disturb settings when used within a Work Profile. Datadog recommends installing the Datadog mobile app on your personal profile, subject to your organization's policies.
</div>

{{% /tab %}}
{{< /tabs >}}
### Custom sounds and volume for critical push
For high-urgency notifications, Datadog strongly recommends customizing your system sounds and volume settings. This ensures that alerts are not only more distinct and recognizable, but also more effective in capturing attention. Test your notification preferences to confirm that they behave as expected.

### Telephony channels (voice calls and SMS)

For reliability, Datadog uses a rotating set of phone numbers to contact you. To help your phone recognize calls and messages from Datadog On-Call, you can create a digital contact card. This card automatically updates with Datadog's latest phone numbers. You can assign special permissions to this contact in your system settings for enhanced functionality, such as circumventing Do Not Disturb mode.

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="incident_response/on-call/guides/configure-mobile-device-for-on-call/ios_sync_card_may_2025.png" alt="Override your iOS device's Do Not Disturb mode for SMS and voice calls" style="width:100%;" >}}

1. In the Datadog mobile app, navigate to {{< ui >}}Account{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

2. Toggle on {{< ui >}}Enable Automatic Contact Card Sync{{< /ui >}}. This creates a contact named "Datadog On-Call", which updates regularly with Datadog's latest phone numbers.

3. After this contact is created, open your iOS system settings and navigate to {{< ui >}}Focus{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}}.

4. Under {{< ui >}}People{{< /ui >}}, allow notifications from the Datadog On-Call contact. If you enabled critical alerts for Datadog push applications, then the Datadog mobile app also appears under **Apps**.

5. To bypass silent mode, navigate to the Datadog On-Call contact >> tap {{< ui >}}Ringstone{{< /ui >}} >> activate {{< ui >}}Emergency Bypass{{< /ui >}}.
{{% /tab %}}

{{% tab "Android" %}}

{{< img src="incident_response/on-call/guides/configure-mobile-device-for-on-call/android_sync_card_may_2025.png" alt="Override your Android device's do-not-disturb mode for SMS and voice calls" style="width:100%;" >}}

1. In the Datadog mobile app, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

2. Under {{< ui >}}Phone & SMS{{< /ui >}}, enable {{< ui >}}Automatic Contact Card Sync{{< /ui >}}. This creates a contact named "Datadog On-Call", which updates regularly with Datadog's latest phone numbers.

3. After this contact is created, mark it as a favorite.

4. Open your Android system settings and navigate to {{< ui >}}Sound & vibration{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}}. Create an exception for the Datadog On-Call contact.

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">
<a href="https://datadog-on-call.s3.amazonaws.com/datadog-on-call.vcf">Download the current version of the Datadog On-Call contact card</a>. <strong>Note</strong>: The contact card is subject to change at any time.
</div>

## On-Call mobile widgets
Add On-Call home screen and lock screen widgets to access your pages and shifts.

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

{{< img src="mobile/widgets/ios_shifts_widget_may_2025.png" alt="Configured home screen on-call shift widgets displayed on iOS screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Long press on the widget to configure.
2. Tap {{< ui >}}Edit Widget{{< /ui >}} to bring up the configuration screen.
3. Select the {{< ui >}}Organization{{< /ui >}} and {{< ui >}}Period{{< /ui >}} you would like to see your On-Call shifts for.
4. Tap out of the widget to validate your selection and exit the configuration screen.


{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/widgets/android_shifts_widget_may_2025.png" alt="Configured home screen On-Call shift widgets displayed on Android screens" responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

1. Tap on the widget to configure.
2. Select the {{< ui >}}Organization{{< /ui >}} and {{< ui >}}Time Period{{< /ui >}} you would like to see your On-Call shifts for.
3. Tap {{< ui >}}✓{{< /ui >}} to save the configuration.
4. Long press and resize the widget to fit your preference.

{{% /tab %}}
{{< /tabs >}}

### On-Call lock screen widget

The On-Call lock screen widget displays your On-Call status. Lock screen widgets are only available on iOS.

1. Long press on your lock screen.
2. Tap {{< ui >}}Customize{{< /ui >}}, then {{< ui >}}Lock Screen{{< /ui >}}.
3. Tap on the lock screen widget space to pull up the {{< ui >}}Add Widgets{{< /ui >}} card.
4. Scroll to and tap on the {{< ui >}}Datadog{{< /ui >}} app.
4. Tap the On-Call lock screen widget.
5. Tap the widget on the lock screen to pull up the configuration panel.
6. Select the organization you would like to display your On-Call status for.

**Note**: You must have an empty space on your lock screen to add a new widget. You can delete lock screen widgets by tapping the {{< ui >}}-{{< /ui >}} button on the top left of the widget you would like to delete.

## Troubleshooting
For help with troubleshooting, [contact Datadog support][2]. You can also send a message in the [Datadog public Slack][3] [#mobile-app][4] channel.

[1]: /mobile/?tab=ios
[2]: /help/
[3]: https://chat.datadoghq.com/
[4]: https://datadoghq.slack.com/archives/C0114D5EHNG
[5]: /incident_response/on-call/
