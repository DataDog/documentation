---
title: React Native Crash Reporting and Error Tracking
description: Set up Error Tracking for your React Native projects.
aliases:
- /real_user_monitoring/error_tracking/reactnative
- /real_user_monitoring/mobile_and_tv_monitoring/reactnative/error_tracking
- /real_user_monitoring/error_tracking/mobile/reactnative/
- /real_user_monitoring/mobile_and_tv_monitoring/react_native/error_tracking
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: "Source Code"
  text: dd-sdk-reactnative Source code
- link: real_user_monitoring/error_tracking/
  tag: Documentation
  text: Learn about Error Tracking
- link: https://www.datadoghq.com/blog/rum-now-offers-react-native-crash-reporting-and-error-tracking/
  tag: Blog
  text: Datadog now offers React Native Crash Reporting and Error Tracking

---

## Overview

Enable React Native Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

-   Aggregated React Native crash dashboards and attributes
-   Symbolicated React Native (JavaScript and native iOS or Android) crash reports
-   Trend analysis with React Native Error Tracking

In order to symbolicate your stack traces, manually upload your source maps and native debug symbols into Datadog.

Your crash reports appear in [**Error Tracking**][1].

## Setup

If you have not set up the React Native SDK yet, follow the [in-app setup instructions][2] or see the [React Native Crash Reporting and Error Tracking][3].


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
<<<<<<< HEAD:content/en/real_user_monitoring/mobile_and_tv_monitoring/react_native/error_tracking.md
[3]: /error_tracking/frontend/mobile/reactnative/
=======
[3]: /real_user_monitoring/application_monitoring/react_native/
[4]: /real_user_monitoring/application_monitoring/ios/error_tracking/?tabs=cocoapods#symbolicate-crash-reports
[5]: https://reactnative.dev/docs/signed-apk-android#enabling-proguard-to-reduce-the-size-of-the-apk-optional
[6]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[7]: https://github.com/cwhenderson20/react-native-crash-tester
[9]: https://fastlane.tools/
[10]: https://appcenter.ms/
[11]: https://www.bitrise.io/
[12]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/react-native#xcode
[13]: https://github.com/DataDog/datadog-react-native-wizard
[14]: https://github.com/DataDog/react-native-performance-limiter
[15]: https://plugins.gradle.org/plugin/com.datadoghq.dd-sdk-android-gradle-plugin
[16]: https://app.datadoghq.com/source-code/setup/rum
[17]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/react-native/README.md#inject-debug-id
>>>>>>> master:content/en/real_user_monitoring/application_monitoring/react_native/error_tracking.md
