---
title: Track RUM Usage with Usage Attribution Tags

beta: true
description: Learn how to track RUM usage with custom attribution tags
aliases:
- /real_user_monitoring/guide/track-rum-usage-with-attribution-tags/
further_reading:
- link: '/account_management/billing/usage_attribution/'
  tag: 'Documentation'
  text: 'Plan and Usage Settings'
---

## Overview

The [Usage Attribution][1] page provides information and functionality related to data usage and usage types. By default, the data usage can be viewed and filtered by broader categories such as product, organization, or tag keys. This guide describes how to configure RUM usage attribution so it can be viewed by custom categories on the Usage Attribution page (accurate to +/- 20% of the actual value). This can help you track RUM sessions and costs for different departments, products, or other categories, instead of viewing a single aggregate number. 

As an example, this guide walks through how to track RUM usage by department.

## Set up RUM usage attribution

### Check your tags

Categories for usage are determined by tags. Before setting up your RUM usage attribution, make sure that the tags you want to use are configured on the Usage Attribution page. Click **Edit tags**, then select the tags that you want to use to view usage and click **Save**. In this example, we've added "department" as a tag.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-1.jpeg" alt="Check your tags on the Usage Attribution page" style="width:100%;">}}

### Add tags to your RUM sessions
Once your usage attribution tags have been configured, you can tag your RUM sessions with them. 

To set tags for **browser sessions**, set the RUM global context at the start of the session (right after calling `datadogRum.init`) using the [`setGlobalContextProperty`][2] method. For example, here's how we would tag sessions so they can be tracked for the marketing department: 

```javascript
datadogRum.setGlobalContextProperty('department', 'marketing');
```

To set tags for **mobile sessions**, use the [`addAttribute`][5] method. Here's an example:

```
//Android
GlobalRumMonitor.get().addAttribute("department", "marketing")

//iOS
RumMonitor.shared().addAttribute(forKey: "department", value: "marketing")
```

**Note**: A few tags are included by default (`service`, `env`, `version`, `application.id`, and `application.name`). For anything else, set the global context using the method above.

Once you've deployed this step, new RUM sessions are tracked according to the tags you added.

## View RUM usage
The newly tagged sessions are displayed on the [Usage Attribution][3] page. When you review the RUM with Session Replay Sessions and RUM Sessions columns, you can see the number of sessions by department.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-3.png" alt="View RUM usage by department" style="width:100%;">}}

Usage information is also available through the [`GetHourlyUsageAttribution`][4] endpoint.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/usage-attribution
[2]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[3]: https://app.datadoghq.com/billing/usage-attribution
[4]: /api/latest/usage-metering/#get-hourly-usage-attribution-v1
[5]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tab=kotlin#track-attributes
