---
title: Define Services And Track UI Components In Your Browser Application

disable_toc: false
further_reading:
- link: "/real_user_monitoring/browser/"
  tag: "Documentation"
  text: "RUM Browser Monitoring"
---

## Overview

RUM captures events from your browser applications and lets you explore them to troubleshoot slow pages and code errors, or to analyze application usage. All captured events are available in [RUM Explorer][1] for querying, dashboarding, and alerting.

If your browser application is large, it's likely been built by multiple web development teams. Each team has an area of ownership that they focus on when troubleshooting errors, slowness, or analyzing usage.

This guide describes how to define an application in RUM. In addition, it covers common use cases in large applications where web development teams may require visibility into the health and usage of their area of ownership.

## Create a RUM application

The first step to tracking and analyzing your browser application is to [create a RUM application][2]. A RUM application maps a browser application available at a given domain that renders the experience for what customers would perceive as a website.

## Track pages in your browser application

Whether your browser application is a single page application or is one that uses server-side rendering, the Browser RUM SDK automatically tracks route changes and creates a view event for every route change.

- A view has a **URL** available at `@view.url`, such as `https://www.yourwebsite.com/about`.
- A view has a **path** available at `@view.url_path`, such as `/about`.

If, for example, automatically capturing pageviews by route change does not provide enough visibility, you can specify a different name for your pages. To do this, you can [track views manually][3] and assign them each a name available at `@view.name`, such as "About Us".

## Track timings during the rendering lifecycle of your pages

The Browser SDK automatically tracks a set of industry-standard timings, Core Web Vitals, page loading times [and more][4].

In addition, you can track the time it takes for a specific item on the page to render, such as an image or a component. You can track more timings by capturing them in code, then pasting the values in your view events. For details on how to do this, see the documentation on [adding your own performance timing][5].

Once timings are captured, they are available like any auto-collected timing. You can use timings to do the following:

- Analyze the distribution of the time across versions of the code in the RUM Explorer
- Troubleshoot possible high values in the [view waterfall][6]

## Track components in web pages

If your browser application uses UI components that are present across multiple pages in one application and/or across multiple applications, you can use custom instrumentation to track the usage and rendering time of these components across pages.

[Generate a custom action][7] to track the lifecycle of components across pages. Let's imagine the `/myorders` page and the `/search` page both use the search box component below.

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-autofill.jpg" alt="Generate a custom action to track the lifecycle of components across pages" style="width:30%;">}}

You can track the following milestones in the lifecycle of the search component by sending a custom action every time:

- `search_component_render`: The search component renders
- `search_component_input`: The search component gets input from the user keyboard
- `search_component_suggestions_display`: The search component displays suggestions

The custom action then automatically carries attributes for:

- The RUM application it was used in
- `@view`: The page it was rendered in
- `@geo`: Geolocation information (if enabled)
- `@session`: The session identifier of the user

With custom instrumentation, the custom action can be assigned attributes for:

- The team it belongs to
- The time it took to render

```
datadogRum.addAction('search_component_render', {
    'team': 'Team A', // for example, 42.12
    'time_to_full_render': 16.5, // for example, ['tomato', 'strawberries']
})
```

From the RUM Explorer, you can then analyze:

- The page where a component is used the most
- The browser application where a component is used the most
- The P75 percentile for the time for the component to fully render

## Track team ownership

### Teams own a set of pages

Imagine a web development team owns a set of pages like the example below.

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-track-team-ownership-2.png" alt="Examples of sets of pages a web development could own" style="width:90%;">}}

Inside your RUM application, create services for each set of pages owned by a team by doing the following:

1. Turn on manual view tracking by setting the configuration option `trackViewsManually` to `true`.
2. For each page of your website, assign a view name and a service following [the instructions for overriding default RUM view names][8].
   - `"purchase"` service for the pages available at `/checkout`, `/payment`, `/confirmOrder`.
   - `"catalog"` service for the pages available at `/beds`, `/chairs/123`, `/search`.
3. [Upload a source map for each service][9] to view unminified stack traces in Error Tracking.

Get insights into the performance or the adoption of a given team's scope by using the `service` attribute in RUM:

1. From the RUM Application Overview page, narrow down all graphs by `service` to get a holistic view for a team's scope
2. Any query done in the RUM Explorer can use the `service` attribute to filter:
   - Errors by service
   - Pageviews by service

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-rum-applications-overview-page-4.png" alt="Search query for actions grouped by user name on Shopist's Cart page" style="width:90%;">}}

### Teams own UI components

{{< img src="real_user_monitoring/guide/define-applications-services-components-rum/rum-guide-team-owns-ui-components-2.png" alt="Components can be tracked using custom actions" style="width:90%;">}}

Components are tracked using custom actions [mentioned above][10]:

1. Add a team attribute inside the custom action definition.
2. Track the loading time and other timings during the component's lifecycle as attributes in the custom actions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/explorer/
[2]: /real_user_monitoring/browser/setup
[3]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[4]: /real_user_monitoring/browser/monitoring_page_performance/#all-performance-metrics
[5]: /real_user_monitoring/browser/monitoring_page_performance/#add-your-own-performance-timing
[6]: /real_user_monitoring/browser/monitoring_page_performance/#overview
[7]: /real_user_monitoring/guide/send-rum-custom-actions/?tab=npm
[8]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[9]: /real_user_monitoring/guide/upload-javascript-source-maps/?tabs=webpackjs#upload-your-source-maps
[10]: #track-components-in-web-pages
