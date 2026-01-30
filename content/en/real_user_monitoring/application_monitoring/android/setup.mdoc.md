---
title: Android and Android TV Monitoring Setup
description: Collect RUM and Error Tracking data from your Android projects.
content_filters:
  - trait_id: sdk
    option_group_id: sdk_platform_options
    label: "SDK"
aliases:
    - /real_user_monitoring/android/
    - /real_user_monitoring/setup/android
    - /real_user_monitoring/mobile_and_tv_monitoring/android/setup
further_reading:
- link: /real_user_monitoring/application_monitoring/android/advanced_configuration
  tag: Documentation
  text: RUM Android Advanced Configuration
- link: https://github.com/DataDog/dd-sdk-android
  tag: "Source Code"
  text: Source code for dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
- link: /real_user_monitoring/guide/mobile-sdk-upgrade
  tag: Documentation
  text: Upgrade RUM Mobile SDKs
---

{% partial file="sdk/setup/browser.mdoc.md" /%}


[1]:/real_user_monitoring/
[3]: /error_tracking/frontend/mobile/android
[4]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[5]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[6]: https://app.datadoghq.com/rum/list
[7]: /real_user_monitoring/android/web_view_tracking/
[8]: /real_user_monitoring/android/data_collected/
[9]: /account_management/api-app-keys/#client-tokens
[10]: /getting_started/tagging/using_tags/#rum--session-replay
[11]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters
[12]: /real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[13]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views
[14]: /tracing/trace_collection/dd_libraries/android/
[15]: https://square.github.io/okhttp/features/interceptors/#network-interceptors
[16]: /real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-network-requests
[17]: https://square.github.io/okhttp/features/interceptors/
[18]: /real_user_monitoring/application_monitoring/agentic_onboarding/?tab=realusermonitoring