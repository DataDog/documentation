---
title: Set Up Push Notifications on Mobile App
description: "Configure push notifications on iOS and Android for on-call alerts, incidents, and workflow updates with critical alert settings."
further_reading:
- link: "/incident_response/on-call/"
  tag: "Documentation"
  text: "On-Call Documentation"
- link: "/incident_response/incident_management/notification/"
  tag: "Documentation"
  text: "Incident Notification Rules Documentation"
- link: "/getting_started/workflow_automation/"
  tag: "Documentation"
  text: "Workflow Automation Documentation"
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Only Incident Management push notifications are supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}
Receive mobile push notifications for [on-call alerts](#circumvent-mute-and-Do-Not-Disturb-mode-for-On-Call), [incidents](#incident-notifications), and [workflow automation updates](#workflow-automation-notifications), so you can stay informed in real time from the Datadog mobile app.

## Set up push notifications

By default, the mobile app is not allowed to send you notifications. To receive push notifications: 

{{< tabs >}}
{{% tab "iOS" %}}

1. In the Datadog mobile app, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/ios_settings_may_2025.png" alt="Find the notification settings in the iOS version of Datadog's mobile app." style="width:40%; background:none; border:none; box-shadow:none;" >}}

2. Enable the {{< ui >}}Allow Notifications{{< /ui >}} toggle. If this is your first time enabling notifications, this opens up a permissions prompt. Grant permission, then touch {{< ui >}}Enable Notifications{{< /ui >}} again to go to the iOS system settings.

   {{< img src="mobile/push_notification/ios_notification_may_2025.png" alt="Configure the system notification settings of your iOS device." style="width:100%; background:none; border:none; box-shadow:none;" >}}

3. Within the iOS system settings, make sure you enable the {{< ui >}}Allow Notifications{{< /ui >}} toggle. Datadog recommends you also enable the {{< ui >}}Sound{{< /ui >}} and {{< ui >}}Badges{{< /ui >}} toggles.

Make sure you grant the mobile app the necessary permissions.

### Custom sounds

You can override the default system notification sounds with custom sounds preloaded in the Datadog mobile app.

To customize notification sounds:

1. In the Datadog mobile app, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Notification categories{{< /ui >}}.
2. Select the notification category you want to customize.
3. Select a sound from the available options.

{{% /tab %}}

{{% tab "Android" %}}
1. In the Datadog mobile app, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}}.

   {{< img src="mobile/push_notification/android_settings_may_2025.png" alt="Find the notification settings in the Android version of Datadog's mobile app." style="width:40%; background:none; border:none; box-shadow:none;" >}}

2. Enable the {{< ui >}}Allow notifications{{< /ui >}} toggle. Datadog highly recommends you also enable {{< ui >}}Sound and vibration{{< /ui >}} and {{< ui >}}Show content on Lock screen{{< /ui >}}.

   {{< img src="mobile/push_notification/android_notification_may_2025.png" alt="Configure the system notification settings of your Android device." style="width:100%; background:none; border:none; box-shadow:none;" >}}

### Custom sounds

You can override the default system notification sounds with custom sounds preloaded in the Datadog mobile app.

To customize notification sounds:

1. Go to {{< ui >}}Device Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Advanced Settings{{< /ui >}}.
2. Select {{< ui >}}Manage notification categories for each app{{< /ui >}} and make sure Datadog is selected.
3. In the Datadog mobile app, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Notification categories{{< /ui >}}.
4. Select the notification category you want to customize.
5. Select a sound from the available options.

**Note**: The volume for push notifications is dictated by your device's system volume settings.

{{% /tab %}}
{{< /tabs >}}

## Circumvent mute and Do Not Disturb mode for On-Call
You can override your device's system volume and Do Not Disturb mode for both push notifications (from the Datadog mobile app) and telephony notifications (such as voice call and SMS).

For more information, see the [guide on setting up your mobile device for On-Call][4].

### Critical push notifications
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">On-Call is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}
<div class="alert alert-info">
Critical push notifications are only available for On-Call. If you are setting up On-Call on the Datadog mobile app for the first time, an onboarding flow takes care of notification settings and permissions.
</div>
{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="mobile/push_notification/ios_critical_may_2025.png" alt="Override your iOS device's system volume and do-not-disturb mode." style="width:100%; background:none; border:none; box-shadow:none;" >}}

1. In the Datadog mobile app, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

2. Enable the {{< ui >}}Critical Alerts{{< /ui >}} toggle. Critical alerts ignore the mute switch and Do Not Disturb. If you enable critical alerts, the system plays a critical alert’s sound regardless of the device’s mute or Do Not Disturb settings.

3. Within the iOS system settings, make sure you enable the {{< ui >}}Critical Alerts{{< /ui >}} toggle. Make sure you grant the mobile app the necessary permissions.

4. Select your device for {{< ui >}}High Urgency Notifications{{< /ui >}} and/or {{< ui >}}Low Urgency Notifications{{< /ui >}} under the Notification Preferences section.

5. Test the setup of your critical push notification by tapping {{< ui >}}Test push notifications{{< /ui >}}.

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="mobile/push_notification/android_critical_may_2025.png" alt="Override your Android device's system volume and Do Not Disturb mode." style="width:100%; background:none; border:none; box-shadow:none;" >}}

1. In the Datadog mobile app, navigate to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}On-Call{{< /ui >}}.

{{< img src="mobile/push_notification/android_allow_notification_may_2025.png" alt="Override your Android device's system volume and Do Not Disturb mode." style="width:100%; background:none; border:none; box-shadow:none;" >}}

2. If notification permissions are missing, tap {{< ui >}}Bypass Do Not Disturb{{< /ui >}} and enable {{< ui >}}Allow notifications{{< /ui >}} in System Settings.

{{< img src="mobile/push_notification/android_override_system_may_2025.png" alt="Override your Android device's system volume and Do Not Disturb mode." style="width:100%; background:none; border:none; box-shadow:none;" >}}

3. Then tap {{< ui >}}Bypass Do Not Disturb{{< /ui >}} and enable {{< ui >}}Override Do Not Disturb{{< /ui >}} in System Settings for High Urgency On-Call.

   **On Samsung devices**: Go to {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Notifications{{< /ui >}} > {{< ui >}}Do Not Disturb{{< /ui >}} > {{< ui >}}App notifications{{< /ui >}}. Select Datadog and allow it to bypass Do Not Disturb.

{{< img src="mobile/push_notification/android_override_system_volume_may_2025.png" alt="Override your Android device's system volume and Do Not Disturb mode." style="width:100%; background:none; border:none; box-shadow:none;" >}}

4. In order to override system volume, tap the {{< ui >}}Override system volume{{< /ui >}} and allow {{< ui >}}Mode access{{< /ui >}} in System Settings to toggle on {{< ui >}}Override system volume{{< /ui >}}.

5. Select your device for {{< ui >}}High Urgency Notifications{{< /ui >}} and/or {{< ui >}}Low Urgency Notifications{{< /ui >}} under the Notification Preferences section.

6. Test the setup of your critical push notification by tapping {{< ui >}}Test push notifications{{< /ui >}}.

<div class="alert alert-warning">
On Android, the Datadog mobile app cannot bypass system volume or Do Not Disturb settings when used within a Work Profile. As a workaround, install the Datadog mobile app on your personal profile.
</div>

<div class="alert alert-info">
You must be logged in to acknowledge and take action for on-call pages. However, you still receive on-call push notifications when you are logged out of the mobile app.
</div>

{{% /tab %}}
{{< /tabs >}}

### Custom sounds and volume for critical push

<div class="alert alert-info"> Volume and sound controls are available only for On-Call notifications. Incident and workflow notifications use your device's default system settings. </div>

For high-urgency notifications, Datadog strongly recommends customizing your system sounds and volume settings. This ensures that alerts are not only more distinct and recognizable, but also more effective in capturing attention. Test your critical push notification preferences to confirm that they behave as expected.

## Incident notifications
Receive status updates on your active incidents by setting up [Notification Rules for incidents on the Web][2]. 

1. In Incidents, navigate to {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Notification Rules{{< /ui >}}][1].
2. Click the {{< ui >}}+ New Rule{{< /ui >}} button on the top right.
3. Enter your desired condition fields for {{< ui >}}When an incident is...{{< /ui >}} and {{< ui >}}And meets the following conditions...{{< /ui >}}. By default, these filters are empty, and a notification rule triggers for any incident.
4. Under {{< ui >}}Notify...{{< /ui >}} select your notification recipient.If you want to notify a recipient’s mobile device, select the option for their name that includes {{< ui >}}(Mobile Push Notification){{< /ui >}}. The recipient must have enabled notifications in the Datadog mobile app for this option to appear.
5. {{< ui >}}With Template:{{< /ui >}} Select the desired message template you want the notification rule to use.
6. {{< ui >}}Renotify on updates to:{{< /ui >}} Select the incident properties that trigger notifications. A new notification is sent whenever one or more of the selected properties change.
7. Click {{< ui >}}Save{{< /ui >}}.

By default if you have push notifications enabled and are assigned as a commander to an incident, you automatically receive push notification for the incident.

## Workflow automation notifications
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Workflow automation is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Create [workflow automations][3] that send mobile push notifications.

1. On the workflow canvas, click the {{< ui >}}+{{< /ui >}} icon.
2. Search for {{< ui >}}Send mobile push notification{{< /ui >}}.
3. Under {{< ui >}}To{{< /ui >}} select your notification recipient. The recipient must have enabled notifications in the Datadog mobile app for this option to appear.
4. Enter the message {{< ui >}}Body{{< /ui >}}.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]:https://app.datadoghq.com/incidents/settings?_gl=1*334tvl*_gcl_aw*R0NMLjE3NDUwMDYwODQuQ2p3S0NBand0ZGlfQmhBQ0Vpd0E5N3k4QkxnWmU4cTdmazJtUlJoQ3o1OTZXcTNmRWJIQTk1Rzg4dnAtUmZtUHBQUGx0OVNVSjRlSk9Sb0Nwek1RQXZEX0J3RQ..*_gcl_au*MTAxODMyNDk1My4xNzQwNDk1NzA3LjExNzUxOTU1MTUuMTc0NjQ5NTU3OS4xNzQ2NDk1NTc5*_ga*MjExMzI1MjUyOS4xNzQ1ODU2NjMx*_ga_KN80RDFSQK*czE3NDY0OTQzMzYkbzU4JGcxJHQxNzQ2NDk5MzA0JGowJGwwJGg5NTQ2NTk0Ng..*_fplc*Q2V5WVJmNnRSV2R0RmljTDZyWmg3ZEVZMFZPeDNlTFhLZkxnenFCOXBvTUslMkZTWWk0a3JzVEw1cDU5YlZzTW55TE5YazY5bjdhJTJGOXpySzJ0TFMxTEozZms0WTVlOWVibEN5ZFBNNm1XYmJJQll0R0d4YnlralJ2eU1CS1NoUSUzRCUzRA..#Rules
[2]: /incident_response/incident_management/setup_and_configuration/notification_rules/
[3]: https://docs.datadoghq.com/getting_started/workflow_automation/
[4]: /incident_response/on-call/guides/configure-mobile-device-for-on-call
