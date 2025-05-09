---
title: Set Up Push Notifications on Mobile App
further_reading:
- link: "https://docs.datadoghq.com/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call Documentation"
- link: "https://docs.datadoghq.com/service_management/incident_management/notification/"
  tag: "Documentation"
  text: "Incident Notification Rules Documentation"
- link: "https://docs.datadoghq.com/getting_started/workflow_automation/"
  tag: "Documentation"
  text: "Workflow Automation Documentation"
---

Receive mobile push notifications for [on-call alerts](#circumvent-mute-and-Do-Not-Disturb-mode-for-On-Call), [incidents](#incident-notifications), and [workflow automation updates](#workflow-automation-notification), so you can stay informed in real time from the Datadog mobile app.

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

## Incident notifications
Receive status updates on your active incidents by setting up [Notification Rules for incidents on the Web][2]. 

1. In Incidents, navigate to **Settings** > [**Notification Rules**][1] 
2. Click **+ New Rule** button on the top right.
3. Enter your desired condition fields for **When an incident is...** and **And meets the following conditions...**. By default, these filters are empty, and a notification rule triggers for any incident.
4. Under **Nofity...** select your notification recipient.If you want to notify a recipient’s mobile device, select the option for their name that includes **(Mobile Push Notification)**. The recipient must have enabled notifications in the Datadog mobile app for this option to appear.
5. **With Template:** Select the desired message template you want the notification rule to use.
6. **Renotify on updates to:** Select the incident properties that trigger notifications. A new notification is sent whenever one or more of the selected properties change.
7. Click **Save**

By default if you have push notifications enabled and are assigned as a commander to an incident, you automatically receive push notification for the incident.

## Workflow automation notifications
Create [workflow automations][3] that send mobile push notifications.

1. On the workflow canvas, click the **+icon**.
2. Search for **Send mobile push notification**
3. Under **To** select your notification recipient. The recipient must have enabled notifications in the Datadog mobile app for this option to appear.
4. Enter the message **Body**

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]:https://app.datadoghq.com/incidents/settings?_gl=1*334tvl*_gcl_aw*R0NMLjE3NDUwMDYwODQuQ2p3S0NBand0ZGlfQmhBQ0Vpd0E5N3k4QkxnWmU4cTdmazJtUlJoQ3o1OTZXcTNmRWJIQTk1Rzg4dnAtUmZtUHBQUGx0OVNVSjRlSk9Sb0Nwek1RQXZEX0J3RQ..*_gcl_au*MTAxODMyNDk1My4xNzQwNDk1NzA3LjExNzUxOTU1MTUuMTc0NjQ5NTU3OS4xNzQ2NDk1NTc5*_ga*MjExMzI1MjUyOS4xNzQ1ODU2NjMx*_ga_KN80RDFSQK*czE3NDY0OTQzMzYkbzU4JGcxJHQxNzQ2NDk5MzA0JGowJGwwJGg5NTQ2NTk0Ng..*_fplc*Q2V5WVJmNnRSV2R0RmljTDZyWmg3ZEVZMFZPeDNlTFhLZkxnenFCOXBvTUslMkZTWWk0a3JzVEw1cDU5YlZzTW55TE5YazY5bjdhJTJGOXpySzJ0TFMxTEozZms0WTVlOWVibEN5ZFBNNm1XYmJJQll0R0d4YnlralJ2eU1CS1NoUSUzRCUzRA..#Rules
[2]:https://docs.datadoghq.com/service_management/incident_management/incident_settings/notification_rules/
[3]:https://docs.datadoghq.com/getting_started/workflow_automation/
