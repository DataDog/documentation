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

The [Usage Attribution][1] page provides information and functionality related to data usage and usage types. By default, the data usage can be viewed and filtered by broader categories such as product, organization, or tag keys. You can define up to three usage attribution tags per organization and manage them directly from the UI for each RUM application.

This guide describes how to do the following:

- Configure RUM usage attribution so it can be viewed by custom categories on the Usage Attribution page (accurate to +/- 20% of the actual value). This can help you track RUM sessions and costs for different departments, products, or other categories, instead of viewing a single aggregate number.
- Enforce tags to be set at the organization level (recommended).

As an example, this guide walks through how to track RUM usage by department.

## Set up RUM usage attribution

You can set up RUM usage attribution tags at the SDK level.

### Check your tags

Categories for usage are determined by tags. Before setting up your RUM usage attribution, make sure that the tags you want to use are configured on the Usage Attribution page. Click **Edit tags**, then select the tags that you want to use to view usage and click **Save**. In this example, we've added "department" as a tag.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-1.jpeg" alt="Check your tags on the Usage Attribution page" style="width:100%;">}}

To set tags for **browser sessions**, set the RUM global context at the start of the session (right after calling `datadogRum.init`) using the [`setGlobalContextProperty`][3] method. For example, here's how you could tag sessions so they can be tracked for the marketing department: 

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

Enforce usage attribution tags on RUM applications to track their contribution to your Datadog bill. This setting can be applied without having to instrument or re-instrument your application. When this setting is active, tags must be set when creating or updating RUM applications in Datadog.

**Note**: When attribution tags are set at both the data level (in the events collected by the SDK) and application level, Datadog uses the information set at the application level.

In a Datadog environment with parent and child organizations where the setting is enforced in both, you must set attribution tags for each. For instance, if the parent requires three tags and the child two, the child org inherits the parent org's tag, bringing the total of five tags per application on the child org (an application on the parent org would only require three tags in this example).

**Note**: Even when tags are not enforced on the parent org, the child org still inherits the tags from the parent org.

1. Ensure you have the RUM Settings Write permission.
2. Navigate to **Digital Experience** > **Real User Monitoring** > **Manage Applications** > **Enforce Usage Attribution**.
3. Click the toggle to **Enforce tags for usage attribution on all applications**. With this enabled, apps can only be created or updated if all tags are set.

   {{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/enforce-usage-attribution-toggle-1.png" alt="Toggle the Enforce Usage Attribution Tags setting at the application level." style="width:100%;">}}

   Once this setting is enabled, previously created apps will have empty tag values, so you have to manually backfill the values manually.

### Manage usage attribution tags for your RUM applications
After your usage attribution tags have been enforced and configured, you can tag your RUM sessions with them. 

To manage usage attribution tags to your application in the UI:

1. Go to the [RUM Application Management][2] page.
2. When creating a new application or updating one, you can see how many of the required tags have been added.
3. Click **Edit tags** to assign the [configured usage attribution tags][6].
4. Click **Save Changes**.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/enforce-usage-attribution-tags.png" alt="Prompt to add required usage attribution tags after enforcing the tags." style="width:60%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/usage-attribution
[2]: https://app.datadoghq.com/rum/list
[3]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#global-context
[4]: /api/latest/usage-metering/#get-hourly-usage-attribution-v1
[5]: /real_user_monitoring/application_monitoring/android/advanced_configuration/?tab=kotlin#track-attributes
[6]: /real_user_monitoring/guide/tracking-rum-usage-with-usage-attribution-tags/#check-your-tags
