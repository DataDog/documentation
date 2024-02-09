---
title: Search RUM Events
kind: documentation
further_reading:
- link: "/real_user_monitoring/explorer/group/"
  tag: "Documentation"
  text: "Group queried RUM events"
- link: "/real_user_monitoring/explorer/visualize/"
  tag: "Documentation"
  text: "Apply visualizations on your events"
---

## Overview

After applying a time range on the top right, you can find events with `key:value` pairs and a full-text search in the RUM Explorer.

## Event types

While RUM automatically captures events, you can also capture your own events. All auto-captured and custom events are stored into six event types for [browser][1], [iOS][2], [Android][3], and [React Native][4] applications and indexed to become searchable.

| Event Type | Retention | Description                                                                                                                                                                                                                                                               |
|------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Session    | 30 days   | A user session begins when a user starts browsing the web application. It contains high-level information about the user (such as browser, device, and geolocation). It aggregates all RUM events collected during the user journey with a unique `session.id` attribute. |
| View       | 30 days   | A view event is generated each time a user visits a page of the web application. While the user remains on the same page, resource, long-task, error, and action events are linked to the related RUM view with the `view.id` attribute.                                   |
| Action     | 30 days   | RUM action events track user interactions during a user journey and can be manually sent to monitor custom user actions.                                                                                                                                                  |
| Error      | 30 days   | RUM collects every frontend error emitted by the browser.                                                                                                                                                                                                                 |
| Resource   | 15 days   | A resource event is generated for images, XHR, Fetch, CSS, or JS libraries loaded on a webpage. It includes detailed loading timing information.                                                                                                                          |
| Long Task  | 15 days   | A long task event is generated for any task in the browser that blocks the main thread for more than 50ms.                                                                                                                                                                |

To search through your RUM events, select an event type from the dropdown menu to the left of the search bar. 

{{< img src="real_user_monitoring/explorer/search/rum-explorer-search-4.png" alt="RUM Explorer" style="width:100%;">}}

## Search query

To filter on sessions produced by a specific application by real users over the past day, use the application selector from the top navigation, then create a custom query such as `@session.type:user` and set the time range to `1d`.

**Note:** If you are including a facet in your query, be sure to create the facet first.

### Search syntax

For more information about searching for RUM events and using time frames, see [Search Syntax][5] and [Custom Time Frames][6].

## Setup facets and measures

All RUM events contain attributes, which are automatically collected by the RUM SDKs, and your custom attributes, which are displayed on the [event side panel][7]. 

While most automatically collected attributes are indexed and faceted, your custom event attributes are not indexed and faceted by default. Index these attributes by creating a facet or measure to be able to access them in your search and [visualizations][8].

### Facets

A facet displays all distinct members of an attribute or tag and provides basic analytics, such as the number of RUM events represented. Facets allow you to pivot or filter your datasets based on a given attribute. Selecting a value applies a filter in the search bar.

{{< img src="real_user_monitoring/explorer/rum-facet-3.png" alt="List of facets to the left of the events list" style="width:90%;">}}

To create a facet, find and click on an attribute in the [event side panel][7]. This creates a section of attributes for the values in the side panel, such as "Country subdivision".

{{< img src="real_user_monitoring/explorer/create_facet.png" alt="Create a facet" style="width:40%;">}}

You can also take metadata from a session and turn it into a facet (Virginia, for example) by clicking **+ Add** from the left side panel, then entering or selecting a path to the facet.

{{< img src="real_user_monitoring/explorer/create-facet-3.png" alt="Create a facet using the +Add button from the facet list" style="width:40%;">}}

You can click **Advanced options** to customize the facet further, such as providing a different display name, type, group, or description.

{{< img src="real_user_monitoring/explorer/create-facet-2.png" alt="Advanced options for the new facet" style="width:40%;">}}

The value for the attribute is stored across all new views. You can access these attributes in the search bar, the **Facets** panel, and your [visualizations][8].

### Measures

A measure is an attribute with a numerical value contained in your RUM events.

To create a measure, find and click on a numerical attribute in the [event side panel][7].

{{< img src="real_user_monitoring/explorer/create_measure.png" alt="Create a measure" style="width:40%;">}}

The value of this attribute is stored across all new RUM events. You can access these attributes in the search bar, the **Facets** panel, and your [visualizations][8].

{{< img src="real_user_monitoring/explorer/edit_measure.png" alt="Edit a measure" style="width:40%;">}}

Every measure has a unit that is displayed in a column of the [RUM Explorer][9] and in [your visualizations][8]. 

## Search for facets

To search for a specific attribute, [add it as a facet](#facets) and enter `@` in your search query. This specifies that you are searching for a facet.

For example, if your facet name is **url** and you want to filter on the **url** value `www.datadoghq.com`, enter `@url:www.datadoghq.com`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/data_collected/
[2]: /real_user_monitoring/android/data_collected/
[3]: /real_user_monitoring/ios/data_collected/
[4]: /real_user_monitoring/reactnative/
[5]: /real_user_monitoring/explorer/search_syntax/
[6]: /dashboards/guide/custom_time_frames
[7]: /real_user_monitoring/explorer/events/
[8]: /real_user_monitoring/explorer/visualize#timeseries
[9]: /real_user_monitoring/explorer/
