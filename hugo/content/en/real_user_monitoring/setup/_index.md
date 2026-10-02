---
title: Set Up RUM
description: "Set up Real User Monitoring: create an application, install the Datadog SDK, and enable the RUM module."
further_reading:
- link: "/real_user_monitoring/setup/enable_rum/advanced_configuration/"
  tag: "Documentation"
  text: "Advanced Configuration"
- link: "/real_user_monitoring/guide/"
  tag: "Documentation"
  text: "RUM Guides"
---

{{< learning-center-callout header="Try \"Intro to Real User Monitoring (RUM)\" in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-rum" hide_image="false" >}}
  Learn the fundamentals of Real User Monitoring, including how to instrument your application and use RUM data to improve user experience.
{{< /learning-center-callout >}}

## Overview

Real User Monitoring (RUM) collects data about how real users experience your web and mobile applications. Set up RUM in three steps: create an application, install the Datadog SDK, and enable the RUM module to start collecting data.

## Setup steps

{{< whatsnext desc=" " >}}
    {{< nextlink href="/real_user_monitoring/setup/create_application/" >}}
    <h3>1. Create a RUM Application</h3>
    Create a RUM application in Datadog to generate the application ID and client token your SDK uses to send data.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/setup/install/" >}}
    <h3>2. Install the Datadog SDK</h3>
    Add and initialize the Datadog SDK for your platform.
    {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/setup/enable_rum/" >}}
    <h3>3. Enable the Datadog RUM Module</h3>
    Enable the RUM module to start collecting sessions, errors, and performance data.
    {{< /nextlink >}}
{{< /whatsnext >}}

## Get started

Select an application type to start collecting RUM data:

{{< card-grid card_width="210" >}}
  {{< image-card href="/real_user_monitoring/setup/install/?platform=browser" src="integrations_logos/javascript_large.svg" alt="Browser" title="Browser" >}}
  {{< image-card href="/real_user_monitoring/setup/install/?platform=android" src="integrations_logos/android_large.svg" alt="Android" title="Android Ecosystem" >}}
  {{< image-card href="/real_user_monitoring/setup/install/?platform=ios" src="integrations_logos/ios_large.svg" alt="Apple" title="Apple Ecosystem" >}}
  {{< image-card href="/real_user_monitoring/setup/install/?platform=flutter" src="integrations_logos/flutter_large.svg" alt="Flutter" title="Flutter" >}}
  {{< image-card href="/real_user_monitoring/setup/install/?platform=react_native" src="integrations_logos/react-native_large.svg" alt="React Native" title="React Native" >}}
  {{< image-card href="/real_user_monitoring/setup/install/?platform=kotlin_multiplatform" src="integrations_logos/kotlin-multiplatform_large.svg" alt="Kotlin Multiplatform" title="Kotlin Multiplatform" >}}
  {{< image-card href="/real_user_monitoring/setup/install/?platform=cpp" src="integrations_logos/cpp_large.svg" alt="C++" title="C++" >}}
  {{< image-card href="/real_user_monitoring/setup/install/?platform=roku" src="integrations_logos/roku_large.svg" alt="Roku" title="Roku" >}}
  {{< image-card href="/real_user_monitoring/setup/install/?platform=unity" src="integrations_logos/rum-unity_large.svg" alt="Unity" title="Unity" >}}
  {{< image-card href="/real_user_monitoring/setup/install/?platform=maui" src="integrations_logos/maui_large.svg" alt=".NET MAUI" title=".NET MAUI" >}}
{{< /card-grid >}}

The Android SDK supports the Android ecosystem, including Android TV, Android Automotive OS, and Amazon Fire OS. The iOS SDK supports the Apple ecosystem, including iOS, iPadOS, tvOS, and visionOS.

### Capabilities and platform support

**Note**: The Datadog Flutter SDK is not supported for macOS, Windows, or Linux.

The following table shows which RUM capabilities are supported on each platform:

| Feature | Browser | Android Ecosystem | Apple Ecosystem | Flutter | React Native | Kotlin Multiplatform | C++ | Roku | Unity | .NET MAUI | Notes |
|---------|---------|-------------------|-----------------|---------|--------------|----------------------|-----|------|-------|-----------|-------|
| Send logs to Datadog | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Distributed tracing of network requests | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | - **Roku** is only able to track some types of HTTP requests.<br> - **Unity** uses a wrapper around `UnityWebRequest` to perform request tracking. |
| Track views and actions | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - All actions tracked in **Flutter Web** are recorded as `custom`.<br> - **C++**, **Roku**, and **Unity** support only manual action tracking.<br> - **C++** and **Roku** support only manual view tracking. |
| Feature flag tracking and release tracking | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  | {{< X >}} |  |  |
| Error tracking and source mapping | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Crash tracking, symbolication, and deobfuscation | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Stop sessions (kiosk monitoring) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Track events in web views |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  |  |  |  |
| Monitor platform-specific vitals | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  |  | {{< X >}} |  |
| Global context and attribute tracking in logs | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  | {{< X >}} | {{< X >}} |  |
| Client-side tracing |  | {{< X >}} | {{< X >}} |  |  |  |  |  |  |  |  |
| Session Replay | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  |  | {{< X >}} | **Flutter** Session Replay is in Preview. |
| Frustration signals | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  | {{< X >}} | Only partially supported for **mobile** and **Roku** applications. |

## Supported endpoints for SDK domains

All Datadog SDK traffic is transmitted over SSL (default 443) to the following domains:

| Site | Site URL                                      |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| US2-FED  | `https://browser-intake-us2-ddog-gov.com` |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |
| AP2  | `https://browser-intake-ap2-datadoghq.com`    |
| UK1  | `https://browser-intake-uk1-datadoghq.com`    |

### Additional endpoints for Browser Profiling

When [Browser Profiling][1] is enabled, the SDK also contacts a quota API to determine whether profiling is permitted for the current session. This uses a `quota.` subdomain of the standard intake origin:

| Site | Quota API URL                                             |
|------|-----------------------------------------------------------|
| US1  | `https://quota.browser-intake-datadoghq.com`             |
| US3  | `https://quota.browser-intake-us3-datadoghq.com`         |
| US5  | `https://quota.browser-intake-us5-datadoghq.com`         |
| EU1  | `https://quota.browser-intake-datadoghq.eu`              |
| US1-FED  | `https://quota.browser-intake-ddog-gov.com`          |
| US2-FED  | `https://quota.browser-intake-us2-ddog-gov.com`      |
| AP1  | `https://quota.browser-intake-ap1-datadoghq.com`         |
| AP2  | `https://quota.browser-intake-ap2-datadoghq.com`         |
| UK1  | `https://quota.browser-intake-uk1-datadoghq.com`         |

If you use a [proxy][2] or have a [Content Security Policy (CSP)][3], allow these `quota.` domains as well. See the [Browser Profiling setup][1] page for details.

## Next step

Continue to [Create a RUM Application](/real_user_monitoring/setup/create_application/).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/enrich_rum_data/collect_frontend_profiles/?platform=browser
[2]: /real_user_monitoring/guide/proxy-rum-data
[3]: /integrations/content_security_policy_logs
