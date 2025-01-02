title: Set up your mobile device for Datadog On-Call
---

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
Make sure you download the Datadog [mobile app][1] to acknowledge Pages on the go, review the impact of the alert alongside relevant observability data, and effectively triage the alert. The app is also **required** to let Datadog circumvent your Do Not Disturb mode.

## Set up push notifications
By default, the mobile app is not allowed to send you permissions. To change that, open the app and follow the instructions below.

{{< tabs >}}

{{% tab "iOS" %}}
There are two types of notifications you can enable: regular notifications and iOS critical alerts. Critical alerts ignore the mute switch and Do Not Disturb; the system plays a critical alert’s sound **regardless** of the device’s mute or Do Not Disturb settings.

<TODO>

{{% /tab %}}

{{% tab "Android" %}}
To receive push notifications on On-Call events, start by opening the Datadog mobile app and navigate to **Account** > **Settings** > **Notifications**.

{{< img src="service_management/oncall/app_settings_android.png" alt="Find the notification settings in the Android version of Datadog's mobile app." style="width:25%;" >}}

Afterwards, tap **Notifications** to go to the system settings and configure your preferred app notifications. Make sure to enable the **Enable notifications** toggle. We highly recommend you select **Allow sound and vibration** for maximum visibility.

{{< img src="service_management/oncall/system_notifications_settings_android.png" alt="Configure the system notification settings in the on your Android device." style="width:100%;" >}}

{{% /tab %}}

{{< /tabs >}}

### Custom sounds
On both iOS and Android, you have the option to override the default system notification sounds. For high-urgency notifications, we strongly recommend customizing your system sounds and volume settings. This ensures that alerts are not only more distinct and recognizable, but also more effective in capturing attention. The Datadog app comes preloaded with a selection of custom sounds, thoughtfully curated to suit a variety of preferences.

## Circumventing Do-Not-Disturb mode
Your device's Do-Not-Disturb mode can be overridden for two separate notification channel types: push notifications (coming from the mobile app) and telephony notifications (such as voice call and SMS). This section shows how to circumvent your device's Do-Not-Disturb mode for both notification channel types.

{{< tabs >}}

{{% tab "iOS" %}}
Deep dive into circumvent Do-Not-Disturb mode specifically for iOS devices.

#### Mobile Push Notifications
Same as above, start by opening the Datadog mobile app and navigate to **Account** > **Settings** > **Notifications**.


#### Telephony Channels (Voice Calls and SMS)
Datadog uses a rotating set of phone numbers to contact you, ensuring maximum reliability. To help your phone recognize calls from Datadog On-Call, you can create a digital contact card. This card automatically syncs with our latest phone numbers and updates regularly. You can assign special permissions to this contact in your system settings for enhanced functionality, such as circumventing Do-Not-Disturb mode.

Same as above, start by opening the Datadog mobile app and navigate to **Account** > **Settings** > **Notifications**.

{{% /tab %}}

{{% tab "Android" %}}
Deep dive into circumvent Do-Not-Disturb mode specifically for Android devices. Note, screenshots may not resemble your device's UI exactly since Android device UI differs between vendors.

#### Mobile Push Notifications
Same as above, start by opening the Datadog mobile app and navigate to **Account** > **Settings** > **Notifications**.

Within the settings, enable the toggle to **Override system volume**. This leads you to your system settings. Confirm by finding the row for the Datadog mobile app and once again enable the toggle.

{{< img src="service_management/oncall/override_dnd_push_android.png" alt="Override your Android device's system volume and do-not-disturb mode." style="width:100%;" >}}

With this, push notifications will ignore your system volume as well as your Do-Not-Disturb settings.

#### Telephony Channels (Voice Calls and SMS)
Datadog uses a rotating set of phone numbers to contact you, ensuring maximum reliability. To help your phone recognize calls from Datadog On-Call, you can create a digital contact card. This card automatically syncs with our latest phone numbers and updates regularly. You can assign special permissions to this contact in your system settings for enhanced functionality, such as circumventing Do-Not-Disturb mode.

Same as above, start by opening the Datadog mobile app and navigate to **Account** > **Settings** > **Notifications**.

Scroll down and enable **Automatic Contact Card Sync**. This will automatically create a contact named "Datadog On-Call" and synchronize our latest phone numbers regularly.

{{< img src="service_management/oncall/override_dnd_telephony_android.png" alt="Override your Android device's do-not-disturb mode for SMS and voice calls" style="width:100%;" >}}

Once the contact is created, make sure you mark it as a favorite. Lastly, if you haven't done so yet, move to your Do Not Disturb system settings and create an exception for your favorite contacts.

With that, Datadog will now circumvent your device's Do-Not-Disturb mode for SMS and voice calls.
{{% /tab %}}

{{< /tabs >}}




[1]: /service_management/mobile/?tab=ios
