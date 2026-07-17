---
title: Application Monitoring
description: Collect RUM data from your browser, mobile and TV applications.
aliases:
- /real_user_monitoring/mobile_and_tv_monitoring/
- /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/
- /real_user_monitoring/mobile_and_tv_monitoring/data_collected/
- /real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/
- /real_user_monitoring/mobile_and_tv_monitoring/other_frameworks/
- /real_user_monitoring/mobile_and_tv_monitoring/setup/
- /real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
further_reading:
- link: '/session_replay/browser/'
  tag: 'Documentation'
  text: 'Session Replay'
---

## Overview

Datadog Real User Monitoring (RUM) provides deep insight into your application's frontend performance. Monitor real user data to optimize your web experience and provide exceptional user experiences. Correlate synthetic tests, backend metrics, traces, and logs in a single place to identify and troubleshoot performance issues across the stack.

Datadog helps you understand the current level of user experience, identify areas for improvement, and measure the success of each change and/or deployment. Use this information to identify and resolve unexpected frontend issues before users are impacted to deliver the best experience.

The responsibility of keeping user data secure is shared between Datadog and developers who leverage the RUM SDKs. Learn more about [Shared responsibility][1].

## Get started

Select a platform to start collecting RUM data on your application:

{{< card-grid image_width="200" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/setup" src="integrations_logos/javascript_large.svg" alt="browser" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_large.svg" alt="android" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_tv_large.svg" alt="android tv" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/cpp/setup/" src="integrations_logos/cpp_large.svg" alt="C / C++" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/flutter/setup/" src="integrations_logos/flutter_large.svg" alt="flutter" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/ios_large.svg" alt="ios" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/tv_os_large.svg" alt="tv OS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/" src="integrations_logos/kotlin-multiplatform_large.svg" alt="kotlin-multiplatform" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/maui/setup/" src="integrations_logos/maui_large.svg" alt=".NET MAUI" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/" src="integrations_logos/react-native_large.svg" alt="react-native" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/codepush/" src="integrations_logos/react-codepush_large.svg" alt="react-codepush" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/expo/" src="integrations_logos/rum-expo_large.svg" alt="rum-expo" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/roku/setup/" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/unity/setup" src="integrations_logos/rum-unity_large.svg" alt="rum-unity" >}}
{{< /card-grid >}}

[1]: /data_security/real_user_monitoring/#shared-responsibility
