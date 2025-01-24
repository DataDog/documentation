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

{{< callout url="#" btn_hidden="true" header="false">}}
  RUM Usage Attribution is in Preview. To request access, contact <a href="https://docs.datadoghq.com/help/"> Datadog Support</a>.
{{< /callout >}}

## Overview

The [Usage Attribution][1] page provides information and functionality related to data usage and usage types. By default, the data usage can be viewed and filtered by broader categories such as product, organization, or tag keys. You can define up to 3 usage attribution tags and manage them directly from the UI for each RUM application.

This guide describes how to do the following:

- Configure RUM usage attribution so it can be viewed by custom categories on the Usage Attribution page (accurate to +/- 20% of the actual value). This can help you track RUM sessions and costs for different departments, products, or other categories, instead of viewing a single aggregate number.
- Enforce tags to be set at the organization level (recommended).

As an example, this guide walks through how to track RUM usage by department.

## Set up RUM usage attribution

### Check your tags

Categories for usage are determined by tags. Before setting up your RUM usage attribution, make sure that the tags you want to use are configured on the Usage Attribution page. Click **Edit tags**, then select the tags that you want to use to view usage and click **Save**. In this example, we've added "department" as a tag.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-1.jpeg" alt="Check your tags on the Usage Attribution page" style="width:100%;">}}

### Add tags to your RUM sessions
After your usage attribution tags have been configured, you can tag your RUM sessions with them. 

To add usage attribution tags to your application:

1. Go to the [RUM Application Management][2] page.
2. When creating a new application or updating one, 

TK

To set tags for **browser sessions**, set the RUM global context at the start of the session (right after calling `datadogRum.init`) using the [`setGlobalContextProperty`][3] method. For example, here's how we would tag sessions so they can be tracked for the marketing department: 

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

After you've deployed this step, new RUM sessions are tracked according to the tags you added.

## View RUM usage
The newly tagged sessions are displayed on the [Usage Attribution][1] page. When you review the RUM with Session Replay Sessions and RUM Sessions columns, you can see the number of sessions by department.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-3.png" alt="View RUM usage by department" style="width:100%;">}}

Usage information is also available through the [`GetHourlyUsageAttribution`][5] endpoint.

## Enforce tags to be set at the org level

You can require that a usage attribution tag gets added to an application so that you can understand how its usage contributes to your Datadog bill. When this setting is active, usage attribution tags are required upon creating a new or updating an existing application on Datadog.

1. Ensure you have the RUM Settings Write permission.
2. Navigate to [**Digital Experience** > **Real User Monitoring** > **Manage Applications** > **Enforce Usage Attribution**][6].
3. Click the toggle to **Enforce tags for usage attribution on all applications**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/usage-attribution
[2]: https://app.datadoghq.com/rum/list
[3]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[4]: /api/latest/usage-metering/#get-hourly-usage-attribution-v1
[5]: /real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/?tab=kotlin#track-attributes
[6]: https://app.datadoghq.com/rum/enforce-usage-attribution-tags