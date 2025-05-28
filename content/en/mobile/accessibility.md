---
title: Accessibility
aliases:
- /service_management/mobile/
algolia:
  tags: ["Datadog mobile app", "mobile device"]
---

## Set Default App
Open external links directly in the Datadog app instead of brower by setting the Datadog mobile app as your default app. 

{{< tabs >}}
{{% tab "iOS" %}}

1. Copy the Datadog link on an application that does not shorten or rewrite links, such as Notes or Mail.

2. Long press the copied link and tap **Open in Datadog**.

**Note:** You only need to do this **once** to set the Datadog Mobile App as the default for opening Datadog links.

{{% /tab %}}

{{% tab "Android" %}}

1. Open **Settings** >> **Apps** >> **Datadog**.

2. Tap a **Open by default** and tap **In the app**. Confirm verified links to set Datadog as your default.

For more infromation about default apps on Android, read [Set or clear default app][7]

{{% /tab %}}
{{< /tabs >}}

## Set Slack to Open In-App
Open Datadog links from Slack directly in the Datadog app.

1. On the Slack app of your mobile device, navigate to your profile >> **Preferences** >> **Advanced**.
2. Enable **In-App Browser** under **Web Browser** settings.

## Focus Mode
To set a focus mode to include or exclude the Datadog Mobile App:

{{< tabs >}}
{{% tab "iOS" %}}

{{< img src="service_management/mobile/iOS_Setting_1.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="focus mode">}}
1. Open **Settings** >> **Focus**.

{{< img src="service_management/mobile/iOS_Setting_2.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="focus mode">}}
2. Tap a **Focus** or create your own.

{{< img src="service_management/mobile/iOS_Setting_3.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="focus mode">}}
3. Tap **Allow Notifications From** and add the Datadog Mobile App. Alertnatively tap **Silence Notifications From** and add the Datadog Mobile App.

For more information about Focus Mode, read the [Set up a Focus on iPhone][5] 
{{% /tab %}}

{{% tab "Android" %}}

{{< img src="service_management/mobile/Android_Setting_1.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="focus mode">}}
1. Open **Settings** >> **Modes and Routines**.

{{< img src="service_management/mobile/Android_Setting_2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="focus mode">}}

2. Tap a **Mode** or create your own.

{{< img src="service_management/mobile/Android_Setting_3.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="focus mode">}}
3. Tap **Stay focused**>> **Restrict app usage** and add the Datadog Mobile App >> **Done**. Alteratively tap **Do not distrub** and add the Datadog Mobile App >> **Done**.

For more information about Modes, read the [Limit interruptions with Modes][6] 
{{% /tab %}}
{{< /tabs >}}

## Quick actions

{{< img src="service_management/mobile/shortcut_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Quick Actions">}}

Long-press the app icon to display a quick-action sheet of your top five [Frequently Viewed By Me][1] dashboards for iOS (measured by view count and recency), or your five most opened dashboards on mobile for Android. Tap a result to open the dashboard in-app.

## Search from home screen

{{< img src="service_management/mobile/iphone_search_doc.png" alt="Home Screen Search" style="width:40%;">}}

**iOS only**: Within iPhone Search, filter and search for the name of any desired dashboard. Press on a result to open the dashboard view directly on the mobile app, or press the "Search in App" button to open the search query in the in-app Dashboard List page.

## Shortcuts and Siri suggestions

**Android**: Create shortcut icons for your dashboards by long pressing the Datadog app icon, then lift your finger. If the app has shortcuts, it displays a list. Touch and hold the desired shortcut, then drag and drop it to another location on your screen to create a unique shortcut icon.

**iOS**: Create Siri Shortcuts for Datadog dashboards and monitors through the Shortcuts App. For a shortcut to be available for creation, you must execute the desired action at least once in the app. For example, to create an "Open AWS Overview Dashboard" shortcut, open the AWS Overview Dashboard in your mobile app at least once.

With the shortcut, you can access your dashboards and monitors through three key actions:

- Pin the shortcut as an icon in your home screen. To do so, access the Shortcuts app, and open the edit menu for your dashboard shortcut.
- Siri Voice: say your shortcut name, such as "Open AWS Overview", and Siri opens your dashboard in-app.
- Siri suggestions: Siri learns your routine, and suggests dashboard shortcuts when you most need them, through a home or lock-screen banner, iPhone search, or iOS 14 Siri Suggestions widgets.

{{< img src="service_management/mobile/siri_shadow.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Shortcuts">}}

For more information about Siri shortcuts and suggestions, read the [Apple Siri documentation][2].

## Handoff

**iOS Only**: Use Apple Handoff to continue your task across Apple devices. While in use, the icon of the Datadog mobile app appears on your Mac at the left end of the Dock. Click on the icon to open your current dashboard or monitor on your Mac.

For Handoff to work, each device must:

- Be signed in to iCloud with the same Apple ID
- Have Bluetooth enabled
- Have Wi-Fi enabled
- Have Handoff enabled

For more information about Handoff, read the [Apple Handoff documentation][3].

## Apple Watch
To enable notifications for the Apple Watch when paired with your iPhone:
1. Open the Watch app on your mobile device.
2. Tap on **Notifications**.
3. Toggle on **Notifications Indicator**. 

**Note:** Apple does not support notifications to both iPhone and Apple Watch. If your iPhone is locked or asleep, you'll receive notifications on your Apple Watch. If you could like to always receive notifications on your phone, head to the Watch App and disable Notifications.
Read the [Notifications on your Apple Watch documentation][4] for more information. 

**Note:** In order to receive notifications, you must be paired with your iPhone and remain within the bluetooth vicinity of your paired phone.


[1]: https://app.datadoghq.com/dashboard/lists/preset/5
[2]: https://support.apple.com/en-us/HT209055
[3]: https://support.apple.com/en-us/HT209455
[4]: https://support.apple.com/en-au/108369
[5]: https://support.apple.com/guide/iphone/set-up-a-focus-iphd6288a67f/ios
[6]: https://support.google.com/android/answer/9069335?hl=en
[7]: https://support.google.com/pixelphone/answer/6271667?hl=en
