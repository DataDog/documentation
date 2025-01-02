---
title: Set up your mobile device for Datadog On-Call
description: "Still need to figure this one out."
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

{{% /tab %}}

{{% tab "Android" %}}
To receive push notifications on On-Call events, start by opening the Datadog mobile app and navigate to **Account** > **Settings** > **Notifications**.

{{< img src="service_management/oncall/app_settings_android.png" alt="Find the notification settings in the Android version of Datadog's mobile app." style="width:100%;" >}}

Afterwards, tap **Notifications** to go to the system settings and configure your preferred app notifications. Make sure to enable the **Enable notifications** toggle. We highly recommend you select **Allow sound and vibration** for maximum visibility.

{{< img src="service_management/oncall/system_notifications_settings_android.png" alt="Configure the system notification settings in the on your Android device." style="width:100%;" >}}

{{% /tab %}}

{{< /tabs >}}

### Custom sounds
On both iOS and Android, you have the option to override the default system notification sounds. For high-urgency notifications, we strongly recommend customizing your system sounds and volume settings. This ensures that alerts are not only more distinct and recognizable, but also more effective in capturing attention. The Datadog app comes preloaded with a selection of custom sounds, thoughtfully curated to suit a variety of preferences.

## Circumventing Do-Not-Disturb mode
{{< tabs >}}

{{% tab "iOS" %}}
iOS SchmiOS

{{% /tab %}}

{{% tab "Android" %}}
Android Schmandroid

{{% /tab %}}

{{< /tabs >}}

Some closing text.


[1]: /service_management/mobile/?tab=ios
