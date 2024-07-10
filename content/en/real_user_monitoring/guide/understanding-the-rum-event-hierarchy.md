---
title: Understanding the RUM Event Hierarchy

further_reading:
- link: '/real_user_monitoring/explorer/'
  tag: 'Documentation'
  text: 'Learn about the RUM Explorer'
- link: '/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn how to visualize your RUM data'
---

## Overview

This guide walks through the different [types of data][1] that RUM collects and describes the hierarchy of each event type. 

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-session-hierarchy-overview.png" alt="Diagram of the RUM event hierarchy, displaying a single session containing multiple views." style="width:50%;">}}

## Sessions
All RUM data refers to user or synthetics sessions, which are at the top of the event hierarchy. A session is a unique user journey and encompasses everything (for example, pages viewed, views, clicks, scrolls, and errors) the user triggered. A session can last up to four hours of continuous activity, or it can expire after [15 minutes of inactivity][2]. Since a session encompasses the entire journey, all [attributes][3] tied to that user are also tied to that session. For example, you may want to query on a default attribute, like `action count`, then add something more custom, like [user attributes][4].

#### Sample search: List all sessions from a user

To list all sessions from a specific user, select **Sessions** from the event type dropdown, then make a search query for the session status and user.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-sample-search-all-session-user-1.png" alt="Sample search listing all sessions from user 'Lee Davis'." style="width:80%;">}}

Each session is automatically associated with a unique `session.id`.

## Views
Within a session, a view event is created each time a user navigates to a page (Browser RUM) or to a screen or screen segment (Mobile RUM) of an application. 

Each view automatically collects multiple view-specific attributes and data, such as text in the URL and timing metrics, such as the load time of a given page. When querying for specific views, you can add any default level attributes, like device, operating system, or user information, for example. However, event-specific attributes must be view-specific. To view events only, you can adjust the event selector as shown in the image below.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-switch-views.png" alt="RUM views." style="width:80%;">}}

Similarly to the `session.id`, each view automatically has a unique `view.id` connected to it. 

### Actions, errors, resources, and long tasks

Within views, the SDK creates more granular events that all fall along the same hierarchy level. However, each event is unique and carries its own attributes and properties.

### Actions

Actions represent user activity on a page. In browsers, all click actions are automatically collected. On mobile, all taps, swipes, and scrolls are collected. Beyond these default actions, you can also send [custom actions][5], such as form completion and business transactions. 

#### Sample search: Top list of actions leading to an error

This example displays a query that searches for all actions from users clicking on the "Add to cart" button that resulted in an error.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-actions-all-add-to-cart-1.png" alt="Sample search of all 'Add to Cart' actions that led to an error." style="width:80%;">}}

### Errors

You can use RUM to collect [frontend errors][6] that occur during the user session. By default, the browser SDK creates error events for unhandled exceptions and console errors. Additionally, you can collect custom errors through the RUM `addError` API (on [browser][7] and [mobile][8]). On mobile apps, you can also see if the error led to a session termination, also known as a crash.

Errors can be viewed in both RUM and Error Tracking. Source and custom errors are processed by Error Tracking, while console errors are solely in RUM.

#### Sample search: List of all crashes that occurred on a page in the application

This example displays a query that searches within the errors event to view all crashes that occurred on the "HomeViewController" page for a particular application.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-sample-search-checkoutviewcontroller.png" alt="Sample search of all crashes that occurred on a page." style="width:80%;">}}

### Resources
Resources are collected from views and include external requests from your application to a network provider, things like XHR, JS loading, images, or fonts, for example. Since it is collected from a view, you can query for all resources loaded on an application, or scope it down to just resources that occurred in a single view. 

#### Sample search: A list of all images loaded on the `/cart` view filtered by image size

In this example, **Resources** is selected from the event type dropdown, then a query for images that loaded on the cart view and were larger or equal to 1000 kilobytes are listed.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-resources.png" alt="Sample search of all images loaded on the cart view that were 1000 kilobytes or greater." style="width:80%;">}}

### Long tasks
Long tasks are any task that blocks the UI thread for a specified period of time. On mobile for example, a long task may be a frozen frame if the screen is blocked for longer than 300 milliseconds.

#### Sample search: All frozen frame long tasks that lasted more than 500 ms

In this example, **Long tasks** is selected from the event type dropdown and then duration is specified.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-long-tasks.png" alt="Sample search of all frozen frame long tasks lasting longer than 500 milliseconds." style="width:80%;">}}

## Troubleshooting

### No data appears after writing a query

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-no-data-appears-3.png" alt="Example of no data appearing after writing a query." style="width:80%;">}}

If you aren't seeing data after writing a query, confirm that the event selector matches what you have in the search bar. In the example above, the event selector is set to search within **views**, but the search bar only contains  **action** attributes. To view action-related data, switch the view selector to actions. If you still don't see any data, check the time frame selector to ensure you are in a time window where data should be appearing.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-data-now-appears.png" alt="Example of updating a query by using the view and time frame selectors." style="width:80%;">}}

### Querying an event type that is nested in a different event type 

When querying for specific actions, you can use the parent event type, but not one at equal or lower level. For example, actions are nested underneath views, and actions and errors are at the same level in the hierarchical chain. This means you can query for all actions and errors that happened on a given page, but not for all actions that had a specific error type.

#### Sample search: The top 10 actions that occurred on `/`

This example searches within the actions event type for all view names using the Top List view to see the top 10 actions that occurred on `/`, which represents the homepage.

{{< img src="real_user_monitoring/guide/understanding-rum-event-hierarchy/rum-top-ten-actions.png" alt="Sample search of the top ten actions that occurred on the homepage." style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/data_collected
[2]: /account_management/billing/rum/#when-does-a-session-expire
[3]: /real_user_monitoring/browser/data_collected/#event-specific-metrics-and-attributes
[4]: /real_user_monitoring/browser/data_collected/#user-attributes
[5]: /real_user_monitoring/guide/send-rum-custom-actions/?tab=npm
[6]: /real_user_monitoring/browser/collecting_browser_errors/?tab=npm
[7]: /real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[8]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios/?tab=swift#custom-errors
