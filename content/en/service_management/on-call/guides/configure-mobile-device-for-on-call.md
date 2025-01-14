---
title: Set up your mobile device for Datadog On-Call

description: "Still need to figure this one out."
aliases:
- /on-call/guides/configure-mobile-device-for-on-call
further_reading:
- link: "https://docs.datadoghq.com/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call Documentation"
---

## Introduction
Being on-call requires reliable and timely notifications to ensure you can respond to incidents effectively, no matter where you are. This guide walks you through the steps to configure your mobile device for optimal performance with Datadog’s on-call features. From setting up notifications to bypass Do Not Disturb (DND) mode, to customizing alert preferences, you’ll learn how to stay informed and prepared while minimizing interruptions during off-hours.

## Install the Datadog mobile app
Make sure you download the Datadog [mobile app][1] to acknowledge Pages on the go, review the impact of the alert alongside relevant observability data, and effectively triage the alert. The app also makes it easier to let Datadog circumvent your Do Not Disturb mode.

## Set up push notifications
<div class="alert alert-info">
When logging into the mobile app for the first time, an onboarding flow will take care of notification settings and permissions.
</div>

By default, the mobile app is not allowed to send you notifications. To change that, open the app. To receive push notifications on On-Call events, start by opening the Datadog mobile app and navigate to **Account** > **Settings** > **Notifications**. Afterwards, follow your platform specific instructions:


{{< tabs >}}
{{% tab "iOS" %}}
Within the Settings page, select **Notifications**:

{{< img src="service_management/oncall/app_settings_iOS.png" alt="Find the notification settings in the iOS version of Datadog's mobile app." style="width:35%;" >}}

Afterwards, check the **Enable Notifications** toggle. Depending on whether this is your first time enabling notifications, this will open up either a permissions prompt or take you to the iOS system settings. Within the system settings, make sure you enable the **Allow Notifications** toggle. We highly recommend you also toggle the **Sound** and **Badges** toggles for maximum recognition.

{{< img src="service_management/oncall/system_notifications_settings_iOS.png" alt="Configure the system notification settings of your iOS device." style="width:100%;" >}}

Whenever asked, make sure you grant the mobile app the necessary permissions.
{{% /tab %}}

{{% tab "Android" %}}
Within the Settings page, select **Notifications**:

{{< img src="service_management/oncall/app_settings_android.png" alt="Find the notification settings in the Android version of Datadog's mobile app." style="width:35%;" >}}

Afterwards, tap **Notifications** to go to the system settings and configure your preferred app notifications. Make sure to enable the **Allow notifications** toggle. We highly recommend you select **Allow sound and vibration** for maximum recognition.

{{< img src="service_management/oncall/system_notifications_settings_android.png" alt="Configure the system notification settings of your Android device." style="width:100%;" >}}

{{% /tab %}}

{{< /tabs >}}

### Custom sounds
On both iOS and Android, you have the option to override the default system notification sounds. For high-urgency notifications, we strongly recommend customizing your system sounds and volume settings. This ensures that alerts are not only more distinct and recognizable, but also more effective in capturing attention. The Datadog app comes preloaded with a selection of custom sounds, thoughtfully curated to suit a variety of preferences.

## Circumventing Do-Not-Disturb mode
Your device's Do-Not-Disturb mode can be overridden for two separate notification channel types: push notifications (coming from the Datadog mobile app) and telephony notifications (such as voice call and SMS). This section shows how to circumvent your device's Do-Not-Disturb mode for both notification channel types.

{{< tabs >}}

{{% tab "iOS" %}}
Deep dive into circumventing Do-Not-Disturb mode specifically for iOS devices.

#### Mobile Push Notifications
<div class="alert alert-danger">
On Android, the Datadog app cannot bypass System Volume or Do Not Disturb settings when used within a Work Profile due to platform limitations.
<br>

Workaround:
Install the Datadog app on your personal profile alongside the Work Profile. This allows the app to respect Do Not Disturb settings without requiring further adjustments.
</div>

Similar to how you enabled notifications in the first place, start by opening the Datadog mobile app and navigate to **Account** > **Settings** > **Notifications**.

Within the notification settings, enable the toggle **Enable Critical Alerts**. Critical alerts ignore the mute switch and Do Not Disturb; the system plays a critical alert’s sound regardless of the device’s mute or Do Not Disturb settings.

{{< img src="service_management/oncall/override_dnd_push_iOS.png" alt="Override your iOS device's system volume and do-not-disturb mode." style="width:100%;" >}}

Whenever asked, make sure you grant the mobile app the necessary permissions.

#### Telephony Channels (Voice Calls and SMS)
Datadog uses a rotating set of phone numbers to contact you, ensuring maximum reliability. To help your phone recognize calls from Datadog On-Call, you can create a digital contact card. This card automatically syncs with our latest phone numbers and updates regularly. You can assign special permissions to this contact in your system settings for enhanced functionality, such as circumventing Do-Not-Disturb mode.

Same as above, start by opening the Datadog mobile app and navigate to **Account** > **Settings** > **Notifications**.

In your notifications settings, enable **Automatic Contact Card Sync**. This will automatically create a contact named "Datadog On-Call" and synchronize our latest phone numbers regularly.

Once the contact is created, you can navigate to your Do-Not-Disturb settings via **Settings** > **Focus** > **Do Not Disturb**. If you enabled critical alerts in the mobile app, then the Datadog mobile app logo should already appear under "Apps". All that's left to do now is to tell the system to allow notifications from the Datadog On-Call contact.

{{< img src="service_management/oncall/override_dnd_telephony_iOS.png" alt="Override your iOS device's do-not-disturb mode for SMS and voice calls" style="width:100%;" >}}

With that, Datadog will now circumvent your device's Do-Not-Disturb mode for SMS and voice calls. To test our your setup, log into Datadog and trigger a test notification from your On-Call Profile!

{{% /tab %}}

{{% tab "Android" %}}
Deep dive into circumventing Do-Not-Disturb mode specifically for Android devices. Note, screenshots may not resemble your device's UI exactly since Android device UI differs between vendors.

#### Mobile Push Notifications
Same as above, start by opening the Datadog mobile app and navigate to **Account** > **Settings** > **Notifications**.

Within the settings, enable the toggle to **Override system volume**. This leads you to your system settings. Confirm by finding the row for the Datadog mobile app and once again enable the toggle.

{{< img src="service_management/oncall/override_dnd_push_android.png" alt="Override your Android device's system volume and do-not-disturb mode." style="width:100%;" >}}

With this, push notifications will ignore your system volume as well as your Do-Not-Disturb settings.

#### Telephony Channels (Voice Calls and SMS)
Datadog uses a rotating set of phone numbers to contact you, ensuring maximum reliability. To help your phone recognize calls from Datadog On-Call, you can create a digital contact card. This card automatically syncs with our latest phone numbers and updates regularly. You can assign special permissions to this contact in your system settings for enhanced functionality, such as circumventing Do-Not-Disturb mode.

Same as above, start by opening the Datadog mobile app and navigate to **Account** > **Settings** > **Notifications**.

Scroll down and enable **Automatic Contact Card Sync**. This will automatically create a contact named "Datadog On-Call" and synchronize our latest phone numbers regularly.

Once the contact is created, make sure you mark it as a favorite. Lastly, if you haven't done so yet, move to your Do Not Disturb system settings and create an exception for your favorite contacts.

{{< img src="service_management/oncall/override_dnd_telephony_android.png" alt="Override your Android device's do-not-disturb mode for SMS and voice calls" style="width:100%;" >}}

With that, Datadog will now circumvent your device's Do-Not-Disturb mode for SMS and voice calls. To test our your setup, log into Datadog and trigger a test notification from your On-Call Profile!
{{% /tab %}}

{{< /tabs >}}




[1]: /service_management/mobile/?tab=ios
