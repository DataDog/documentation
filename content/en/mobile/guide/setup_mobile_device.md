---
title: Set Up Your Mobile Device for the First Time
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

1. Installing the Mobile App
2. Set up your home screen
3. Enable push notifications
4. Set up widgets

## Installing 
Download the app from the [Apple App Store][1] for your iOS device, or from the [Google Play Store][2] for your Android device.


### SAML Login

SAML login requires you to set up and authenticate your SAML provider with Datadog using your default iOS/Android browser. For SAML IdP-initiated login, refer to the end of this section. To authenticate SAML:

1. Select your data center region (for example, US1) in the upper right corner.
2. Press the Log In button.
3. Click the Using Single Sign-On (SAML)? link.
4. Enter your company email and tap Send email.
5. Open the email and tap on the indicated link through your default browser.
6. Enter your org’s SAML credentials to be rerouted to an authenticated session of the Datadog mobile app.

### Login via QR code 
In a browser, navigate to your Datadog account Personal Settings Organizations page and click Log in to Mobile App for the organization you are currently logged into. This pops up a QR code.
Use your default phone camera app to scan the QR code and then tap the suggested link to open the Datadog App. You will be automatically logged in.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://apps.apple.com/us/app/datadog/id1391380318
[2]: https://play.google.com/store/apps/details?id=com.datadog.app&pli=1
