---
title: RUM Kotlin Multiplatform Data Collected
description: Learn about the data collected by Kotlin Multiplatform Monitoring.
code_lang: kotlin-multiplatform
type: multi-code-lang
code_lang_weight: 40
aliases:
- /real_user_monitoring/kotlin-multiplatform/data_collected/
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: "Source Code"
  text: Source code for dd-sdk-kotlin-multiplatform
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Learn how to explore your RUM data

---
## Overview

The Datadog Kotlin Multiplatform SDK for RUM generates events with associated metrics and attributes. Metrics are quantifiable values that can be used for measurements related to the event. Attributes are non-quantifiable values used to slice metrics data (group by) in the RUM Explorer.

Most Kotlin Multiplatform Monitoring data is collected by native Datadog iOS and Android SDKs for RUM, and is retained for the same periods of time.
    
* For iOS event-specific metrics and attributes, see [RUM iOS Data Collected][1].
* For Android event-specific metrics and attributes, see [RUM Android Data Collected][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/ios/data_collected/#event-specific-metrics-and-attributes
[2]: /real_user_monitoring/android/data_collected/#event-specific-metrics-and-attributes
