---
title: Create a RUM Application
description: "Create a RUM application in Datadog to generate the application ID and client token that the Datadog SDK needs."
further_reading:
- link: '/real_user_monitoring/setup/install/'
  tag: 'Documentation'
  text: 'Install the Datadog SDK'
- link: '/account_management/api-app-keys/#client-tokens'
  tag: 'Documentation'
  text: 'Client tokens'
---

## Overview

Create a RUM application in Datadog to generate the application ID and client token that the Datadog SDK uses to associate collected data with your application.

## Create the application

1. In Datadog, navigate to [{% ui %}Digital Experience{% /ui %} > {% ui %}Add an Application{% /ui %}](https://app.datadoghq.com/rum/application/create).
2. Select the application type that matches your platform, for example JavaScript (JS), Android, iOS, Flutter, React Native, Kotlin Multiplatform, C++, .NET MAUI, Roku, or Unity.
3. Enter an application name, then click {% ui %}Create Application{% /ui %}. Datadog generates an application ID and a client token for your application.
4. Copy the application ID and client token. You need them to initialize the SDK.

Depending on the application type, you can also configure these settings when you create the application:

- **Web view instrumentation** (Android and iOS): Click the {% ui %}Instrument your webviews{% /ui %} toggle. For more information, see [Track Navigation Across Web Views](/real_user_monitoring/enrich_rum_data/track_navigation_across_web_views/).
- **User data collection**: To disable automatic collection of client IP or geolocation data, turn off those settings. For more information, see [Enable GeoIP Enrichment](/real_user_monitoring/enrich_rum_data/enable_geoip_enrichment/).

## Use a client token

For data security, you must use a client token to configure the Datadog SDK. If you use only [Datadog API keys](/account_management/api-app-keys/#api-keys), they are exposed client-side in your application's code. For more information about setting up a client token, see the [Client Token documentation](/account_management/api-app-keys/#client-tokens).

## Next step

[Install the Datadog SDK](/real_user_monitoring/setup/install/) in your application.
