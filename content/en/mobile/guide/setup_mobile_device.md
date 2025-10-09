---
title: Set Up Your Mobile Device for the First Time
description: "Complete guide to setting up the Datadog mobile app including installation, push notifications, home screen customization, and widgets."
further_reading:
- link: "https://www.datadoghq.com/blog/mobile-app-getting-started/"
  tag: "Blog"
  text: "Getting started with the Datadog mobile app"
- link: "/mobile/shortcut_configurations/"
  tag: "Documentation"
  text: "Shortcut Configurations"
- link: "https://www.datadoghq.com/blog/datadog-mobile-widgets/"
  tag: "Blog"
  text: "Improve your on-call experience with Datadog mobile dashboard widgets"
---

## Overview
The Datadog mobile app helps you maintain continuous visibility into the health and performance of your system and take action on issues quickly, from anywhere. This guide walks you through the steps to configure your mobile device for optimal performance.

1. [Install the mobile app](#installing)
2. [Set up your home screen](#set-up-your-home-screen)
3. [Enable push notifications](#enable-push-notifications)
4. [Set up widgets](#set-up-home-or-lock-screen-widgets)

## Installing 
Download the app from the [Apple App Store][1] for your iOS device, or from the [Google Play Store][2] for your Android device.

### SAML login

[SAML login][6] requires you to set up and authenticate your SAML provider with Datadog using your default iOS/Android browser. See [this documentation for information on SAML IdP-initiated login][7]. To authenticate SAML:

1. Open the Datadog mobile app on your device.
1. Select your data center region (for example, US1) in the upper right corner of the landing page.
1. Press the **Log In** button.
1. Click the **Using Single Sign-On (SAML)?** link.
1. Enter your company email and tap **Send email**.
1. Open the email from Datadog on your mobile device and tap the link.
1. Enter your org’s SAML credentials to be rerouted to an authenticated session of the Datadog mobile app.

### Login with a QR code 
1. In a desktop browser, open Datadog and navigate to [**Personal Settings > Organizations**][8]. 
1. Click **Log in to Mobile App** for your organization. This displays a QR code.
1. Use your default phone camera app to scan the QR code and then tap the suggested link to open the Datadog App. You will be automatically logged in.


### Switch organizations
If you have multiple organizations in Datadog, you can navigate to the **Organizations page** under **Personal Settings** to switch between organizations to log in to.

## Set up your home screen
Customize the order and modules of the mobile app home page.

{{< tabs >}}
{{% tab "Android" %}}
1. Select the edit icon at the top right of the screen.
2. Toggle the modules that you would like displayed on the home page. 
3. To reorder the modules, hold and drag the modules from the left hand side. 
4. Make edits to Teams, Starred Items, or Monitors Saved Views by tapping the edit icon next to the respective module.

{{< img src="service_management/mobile/android_edit_home.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Android home screen on the mobile app.">}}

{{% /tab %}}
{{% tab "iOS" %}}
1. Select **Edit** at the bottom of the page. 
2. Check the modules that you would like to display on the home page. 
3. To reorder the modules, hold and drag the modules from the right hand side.
4. Make edits to Teams, Starred Items, or Monitor Saved Views by tapping “Edit” next to the respective module.

{{< img src="service_management/mobile/ios_edit_home.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS home screen on the mobile app">}}

{{% /tab %}}
{{< /tabs >}}


### Add starred items
Add your most frequented dashboards, notebooks, and services for quick reference.
1. Select **Edit** next to **Starred Items**
2. Add and arrange up to 5 starred items
3. Tap **Done** when you are finished


### Add monitors saved views
Quickly reference monitor saved views for your most important monitors. For more information, see [manage monitors][3].
1. Select **Edit** next to Monitors Saved Views
2. Add and arrange up to 5 monitor saved views
3. Tap **Done** when you are finished


## Enable push notifications
Enable push notifications to ensure timely response to alerts from On-Call, incidents, or workflows. To receive push notifications: 

{{< tabs >}}
{{% tab "Android" %}}
1. In the Datadog mobile app, navigate to **Settings > Notifications**.
{{< img src="service_management/mobile/android_settings.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="Android notifications settings">}}

2. Enable the **Allow notifications** toggle. Datadog highly recommends you also enable **Sound and vibration** and **Show content on Lock screen**.
{{< img src="service_management/mobile/android_notification.png" style="width:80%; background:none; border:none; box-shadow:none;" alt="Android notifications settings">}}

[4]: https://docs.datadoghq.com/service_management/on-call/guides/configure-mobile-device-for-on-call/?tab=ios

{{% /tab %}}

{{% tab "iOS" %}}
Make sure you grant the mobile app the necessary permissions.

1. In the Datadog mobile app, navigate to **Settings > Notifications**.
{{< img src="service_management/mobile/ios_settings.png" style="width:50%; background:none; border:none; box-shadow:none;" alt="iOS notifications settings">}}

2. Enable the **Allow Notifications** toggle. If this is your first time enabling notifications, this opens up a permissions prompt. Grant permission, then touch **Enable Notifications** again to go to the iOS system settings.
{{< img src="service_management/mobile/ios_notification.png" style="width:80%; background:none; border:none; box-shadow:none;" alt="iOS notifications settings">}}

3. Within the iOS system settings, make sure you enable the **Allow Notifications** toggle. Datadog highly recommends you also enable the **Sound** and **Badges** toggles.

{{% /tab %}}
{{< /tabs >}}

**Note**: If you are using the mobile app for Datadog On-Call, follow this guide to [set up your mobile device for Datadog On-Call][4]. 


## Set up home or lock screen widgets
For fast access to important data, add Datadog widgets to your mobile device’s home or lock screen. You can set up incident, SLO, monitor, dashboard, and on-call widgets. For more information, see [mobile device widgets][5].

### Home screen widgets
Set up home screen widgets to quickly access dashboards. 

{{< img src="service_management/mobile/ios_dashboard_widget.png" style="width:80%; background:none; border:none; box-shadow:none;" alt="iOS home screen dashboard widgets">}}



{{< tabs >}}
{{% tab "Android" %}}
1. Long press on your home screen.
2. Tap the **Widgets** button on your home screen editor. If you have app shortcuts, the **Widgets** button might appear as only an icon on the top right corner of the bubble.
3. Search for “Datadog” widgets.
4. Tap your desired widget and tap **Add**.
5. Resize the widget to fit your preference.
6. Tap the widget to configure the widget fields. When you access the mobile app from the widget, these are the fields that are queried in the app.

{{% /tab %}}

{{% tab "iOS" %}}
1. Long press on your home screen.
2. Tap **Edit**, then tap the **Add Widget** button on the top left corner of the screen.
3. Search for "Datadog" widgets.
4. Tap your desired widget and your preferred size (small, medium, or large).
5. Tap **Add Widget** and configure the widget fields. When you access the mobile app from the widget, these are the fields that are queried in the app.
6. Drag, minimize, or expand the widget to customize the location and size of the widget on your home screen.

{{% /tab %}}
{{< /tabs >}}


### Lock screen widgets
Lock screen widgets for monitors, SLOs, incidents, and dashboards are supported on iOS.

{{< img src="service_management/mobile/lock_screen_widget.png" style="width:80%; background:none; border:none; box-shadow:none;" alt="iOS home screen dashboard widgets">}}

1. Long press on your lock screen.
2. Tap **Customize**, then select **Lock Screen**.
3. Tap on the lock screen widget space to pull up the Add Widgets card.
4. Scroll to and tap on the Datadog app.
5. Tap the lock screen widget you would like to add.
6. Tap the widget on the lock screen to pull up the configuration panel.
7. Configure the widget according to the fields specified for the selected widget.
8. Drag, minimize, or expand the widget to customize the location and size of the widget on your lock screen.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/us/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app&pli=1
[3]: https://docs.datadoghq.com/monitors/manage/
[4]: https://docs.datadoghq.com/service_management/on-call/guides/configure-mobile-device-for-on-call/?tab=ios
[5]: https://docs.datadoghq.com/mobile/widgets?tab=android
[6]: https://docs.datadoghq.com/account_management/saml/#using-saml
[7]: https://docs.datadoghq.com/account_management/saml/#idp-initiated-login
[8]: https://app.datadoghq.com/personal-settings/organizations
