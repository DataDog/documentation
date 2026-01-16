---
title: Shortcut Configurations
description: "Configure mobile app shortcuts, Siri integration, focus mode, quick actions, and Apple Watch notifications for enhanced Datadog mobile experience."
further_reading:
- link: "/mobile/"
  tag: "Documentation"
  text: "Learn more about the Datadog Mobile App"
---

## Set Datadog as the default app

Open external links directly in the Datadog app instead of in the browser by setting the Datadog mobile app as your default app.

{{< tabs >}}
{{% tab "iOS" %}}

1. Copy the Datadog link and paste it in an application that does not shorten or rewrite links, such as Notes or Mail.

2. Long press the copied link and tap **Open in Datadog**.

**Note**: You only need to do this **once** to set the Datadog mobile app as the default for opening Datadog links.

{{% /tab %}}
{{% tab "Android" %}}

1. Open **Settings** > **Apps** > **Datadog**.

2. Tap **Open by default** and then tap **In the app**. Confirm verified links to set Datadog as your default.

For more information about default apps on Android, see [Set or clear default app][7]

[7]: https://support.google.com/pixelphone/answer/6271667?hl=en

{{% /tab %}}
{{< /tabs >}}

## Configure Slack to open links in-app

Open Datadog links from Slack directly in the Datadog app.

1. On the Slack app of your mobile device, navigate to your profile > **Preferences** > **Advanced**.
2. Enable **In-App Browser** under **Web Browser** settings.

## Focus mode

To configure a focus mode to include or exclude the Datadog Mobile App:

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/iOS_Setting_1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS Settings screen showing Focus options">}}

1. Open **Settings** > **Focus**.

   {{< img src="service_management/mobile/iOS_Setting_2.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="iOS Focus settings screen">}}

2. Tap a **Focus** or create your own.

   {{< img src="service_management/mobile/iOS_Setting_3.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="iOS Focus settings screen showing options to configure notification preferences">}}

3. Tap **Allow Notifications From** and add the Datadog Mobile App. Alertnatively, tap **Silence Notifications From** and add the Datadog Mobile App.

For more information, see [Set up a Focus on iPhone][5].

[5]: https://support.apple.com/guide/iphone/set-up-a-focus-iphd6288a67f/ios

{{% /tab %}}
{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Setting_1.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="Android Settings screen showing Modes and Routines option">}}

1. Open **Settings** > **Modes and Routines**.

   {{< img src="service_management/mobile/Android_Setting_2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android Modes and Routines settings screen">}}

2. Tap a **Mode** or create your own.

   {{< img src="service_management/mobile/Android_Setting_3.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android Mode configuration screen showing focus options">}}

3. Tap **Stay focused** > **Restrict app usage** and add the Datadog Mobile App > **Done**. Alternatively, tap **Do not disturb** and add the Datadog Mobile App > **Done**.

For more information, see [Limit interruptions with Modes][6].

[6]: https://support.google.com/android/answer/9069335?hl=en

{{% /tab %}}
{{< /tabs >}}

## Quick actions

{{< img src="service_management/mobile/shortcut_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Mobile app icon with quick action menu showing top five frequently viewed dashboards">}}

Long-press the app icon to display a quick-action sheet of your top five [Frequently Viewed By Me][1] dashboards for iOS (measured by view count and recency), or your five most opened dashboards on mobile for Android. Tap a result to open the dashboard in-app.

## Search from home screen

{{< img src="service_management/mobile/iphone_search_doc.png" alt="iPhone home screen search showing Datadog dashboard results" style="width:40%;">}}

**iOS only**: Within iPhone Search, filter and search for the name of any desired dashboard. Press on a result to open the dashboard view directly on the mobile app, or press the **Search in App** button to open the search query in the in-app Dashboard List page.

## Shortcuts and Siri suggestions

{{< tabs >}}
{{% tab "iOS" %}}

Create Siri Shortcuts for Datadog dashboards and monitors using the iOS Shortcuts app. Before you can create a shortcut for a specific dashboard or monitor, you must first open that dashboard or monitor in the Datadog mobile app at least once. For example, to create a shortcut called "Open AWS Overview Dashboard", you need to navigate to and view the AWS Overview Dashboard in the mobile app first.

With the shortcut, you can access your dashboards and monitors through three key actions:

- Pin the shortcut as an icon in your home screen. To do so, access the Shortcuts app, and open the edit menu for your dashboard shortcut.
- Siri Voice: say your shortcut name, such as "Open AWS Overview", and Siri opens your dashboard in-app.
- Siri suggestions: Siri learns your routine, and suggests dashboard shortcuts when you most need them, through a home or lock-screen banner, iPhone search, or iOS 14 Siri Suggestions widgets.

{{< img src="service_management/mobile/siri_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS Shortcuts app showing Datadog dashboard shortcuts with Siri suggestions">}}

For more information about Siri shortcuts and suggestions, see the [Apple Siri documentation][2].

[2]: https://support.apple.com/en-us/HT209055

{{% /tab %}}
{{% tab "Android" %}}

Create shortcut icons for your dashboards by long pressing the Datadog app icon, then lift your finger. If the app has shortcuts, it displays a list. Touch and hold the desired shortcut, then drag and drop it to another location on your screen to create a unique shortcut icon.

{{% /tab %}}
{{< /tabs >}}

## Handoff

**iOS Only**: Use Apple Handoff to continue your task across Apple devices. While in use, the icon of the Datadog mobile app appears on your Mac at the left end of the Dock. Click on the icon to open your current dashboard or monitor on your Mac.

For Handoff to work, each device must:

- Be signed in to iCloud with the same Apple ID
- Have Bluetooth enabled
- Have Wi-Fi enabled
- Have Handoff enabled

For more information, read the [Apple Handoff documentation][3].

## Apple Watch

To enable notifications for the Apple Watch when paired with your iPhone:
1. Open the Watch app on your mobile device.
2. Tap on **Notifications**.
3. Toggle on **Notifications Indicator**. 

Apple does not support sending notifications to both your iPhone and Apple Watch at the same time. If your iPhone is locked or asleep, notifications are delivered only to your Apple Watch. To always receive notifications on your iPhone, open the Watch App and disable notifications.

For more information, see [Notifications on your Apple Watch documentation][4].

**Note**: In order to receive notifications, you must be paired with your iPhone and remain within the bluetooth vicinity of your paired phone.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists/preset/5
[2]: https://support.apple.com/en-us/HT209055
[3]: https://support.apple.com/en-us/HT209455
[4]: https://support.apple.com/en-au/108369
[5]: https://support.apple.com/guide/iphone/set-up-a-focus-iphd6288a67f/ios
[6]: https://support.google.com/android/answer/9069335?hl=en
[7]: https://support.google.com/pixelphone/answer/6271667?hl=en
