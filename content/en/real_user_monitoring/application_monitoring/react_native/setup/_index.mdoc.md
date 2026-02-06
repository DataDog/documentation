---
title: React Native Monitoring Setup
description: Collect RUM and Error Tracking data from your React Native projects.
aliases:
    - /real_user_monitoring/react-native/
    - /real_user_monitoring/reactnative/
    - /real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative
    - /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup
    - /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/reactnative/
    - /real_user_monitoring/application_monitoring/react_native/setup/
    - /real_user_monitoring/application_monitoring/react_native/setup/expo/
    - /real_user_monitoring/reactnative/expo/
    - /real_user_monitoring/reactnative-expo/
    - /real_user_monitoring/mobile_and_tv_monitoring/setup/expo
    - /real_user_monitoring/mobile_and_tv_monitoring/expo/setup
    - /real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/expo/
content_filters:
- trait_id: platform
  option_group_id: rum_react_native_framework_options
  label: "Setup Method"
further_reading:
- link: /real_user_monitoring/application_monitoring/react_native/advanced_configuration
  tag: Documentation
  text: RUM React Native Advanced Configuration
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: "Source Code"
  text: Source code for dd-sdk-reactnative
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Monitor React Native applications
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: Documentation
  text: Monitor hybrid React Native applications
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
---

This page describes how to instrument your applications for [Real User Monitoring (RUM)][1] with the React Native SDK. RUM includes Error Tracking by default, but if you have purchased Error Tracking as a standalone product, see the [Error Tracking setup guide][2] for specific steps.

The minimum supported version for the React Native SDK is React Native v0.65+. Compatibility with older versions is not guaranteed out-of-the-box.

## Setup

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/setup/react-native.mdoc.md" /%}
{% /if %}

<!-- Expo -->
{% if equals($platform, "expo") %}
{% partial file="sdk/setup/react-native-expo.mdoc.md" /%}
{% /if %}

## Sending data when device is offline

The React Native SDK helps make data available when your user device is offline. In cases of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. They are sent as soon as the network is available, and the battery is high enough so the React Native SDK does not impact the end user's experience. If the network is not available with your application running in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.

This means that even if users open your application while offline, no data is lost.

**Note**: The data on the disk is automatically deleted if it gets too old so the React Native SDK does not use too much disk space.

## Track background events

{% alert level="info" %}
Tracking background events may lead to additional sessions, which can impact billing. For questions, [contact Datadog support][12].
{% /alert %}

You can track events such as crashes and network requests when your application is in the background (for example, when no active view is available).

Add the following snippet during initialization in your Datadog configuration:

```javascript
rumConfiguration.trackBackgroundEvents = true;
```

[1]: /real_user_monitoring/
[2]: /error_tracking/
[12]: https://docs.datadoghq.com/help/