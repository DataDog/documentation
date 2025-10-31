---
title: React Native Data Collected
description: Learn about the data collected by React Native Monitoring.
aliases:
- /real_user_monitoring/reactnative/data_collected/
- /real_user_monitoring/mobile_and_tv_monitoring/data_collected/reactnative/
- /real_user_monitoring/mobile_and_tv_monitoring/react_native/data_collected/
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: "Source Code"
  text: Source code for dd-sdk-reactnative
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: Documentation
  text: Monitor hybrid React Native applications

---
## Overview

The Datadog React Native SDK for RUM generates events with associated telemetry and attributes. Telemetry are quantifiable values that can be used for measurements related to the event. Attributes are non-quantifiable values used to slice telemetry values (group by) in the RUM Explorer.

Most React Native Monitoring data is collected by native Datadog iOS and Android SDKs for RUM, and is retained for the same periods of time.
    
* For iOS event-specific telemetry and attributes, see [RUM iOS Data Collected][1].
* For Android event-specific telemetry and attributes, see [RUM Android Data Collected][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/ios/data_collected/#event-specific-metrics-and-attributes
[2]: /real_user_monitoring/android/data_collected/#event-specific-metrics-and-attributes
