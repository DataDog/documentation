---
title: Advanced Configuration
description: "Configure RUM Browser SDK to modify data collection, override view names, manage user sessions, and control sampling for your application's needs."
aliases:
  - /real_user_monitoring/installation/advanced_configuration/
  - /real_user_monitoring/browser/modifying_data_and_context/
  - /real_user_monitoring/browser/advanced_configuration/
content_filters:
  - trait_id: lib_src
    option_group_id: rum_browser_sdk_source_options
  - trait_id: rum_browser_sdk_version
    option_group_id: rum_browser_sdk_version_for_advanced_config_options

further_reading:
- link: "/real_user_monitoring/application_monitoring/browser/tracking_user_actions"
  tag: Documentation
  text: "Tracking User Actions"
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/application_monitoring/browser/data_collected/"
  tag: "Documentation"
  text: "RUM browser data collected"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/explorer/visualize/"
  tag: "Documentation"
  text: "Apply visualizations on your events"
- link: "/logs/log_configuration/attributes_naming_convention"
  tag: "Documentation"
  text: "Datadog standard attributes"
---

## Overview

There are various ways you can modify the [data and context collected][1] by RUM, to support your needs for:

- Protecting sensitive data like personally identifiable information.
- Connecting a user session with your internal identification of that user, to help with support.
- Reducing how much RUM data you're collecting, through sampling the data.
- Providing more context than what the default attributes provide about where the data is coming from.

<!-- Version must meet 2.17.0 -->
{% if versionMeets($rum_browser_sdk_version, "2.17.0") %}
## Override default RUM view names

Starting with [version 2.17.0][3], you can add view names and assign them to a dedicated service owned by a team by tracking view events manually with the `trackViewsManually` option.

The RUM Browser SDK automatically generates a [view event][2] for each new page visited by your users, or when the page URL is changed (for single-page applications). A view name is computed from the current page URL, where variable IDs are removed automatically. A path segment that contains at least one number is considered a variable ID. For example, `/dashboard/1234` and `/dashboard/9a` become `/dashboard/?`.

To override default RUM view names:

1. Set `trackViewsManually` to true when initializing the RUM Browser SDK.

   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
         ...,
         trackViewsManually: true,
         ...
   });
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         })
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
         window.DD_RUM.init({
            ...,
            trackViewsManually: true,
            ...
         });
   ```
   {% /if %}

2. You must start views for each new page or route change (for single-page applications). RUM data is collected when the view starts.
{% /if %}

   <!-- Version must meet 4.13.0 -->
   {% if versionMeets($rum_browser_sdk_version, "4.13.0") %}
   Starting with [version 4.13.0][16], you can also optionally define the associated service name and version.

   - **View Name**: Defaults to the page URL path.
   - **Service**: Defaults to the default service specified when creating your RUM application.
   - **Version**: Defaults to the default version specified when creating your RUM application.
   <!-- Version must meet 5.28.0 -->
   {% if versionMeets($rum_browser_sdk_version, "5.28.0") %}
   - **Context**: Starting with [version 5.28.0][19], you can add context to views and the child events of views.
   {% /if %}
   <!-- ends 5.28.0 -->

   For more information, see [Setup Browser Monitoring][4].
   {% /if %}
   <!-- ends 4.13.0 -->

   <!-- Version must meet 5.28.0 -->
   {% if versionMeets($rum_browser_sdk_version, "5.28.0") %}
   The following example manually tracks the pageviews on the `checkout` page in a RUM application. Use `checkout` for the view name and associate the `purchase` service with version `1.2.3`.

   <!-- NPM -->
  {% if equals($lib_src, "npm") %}
  ```javascript
   datadogRum.startView({
        name: 'checkout',
        service: 'purchase',
        version: '1.2.3',
        context: {
            payment: 'Done'
        },
   })
   ```
  {% /if %}

  <!-- CDN async -->
  {% if equals($lib_src, "cdn_async") %}
  ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.startView({
            name: 'checkout',
            service: 'purchase',
            version: '1.2.3',
            context: {
                payment: 'Done'
            },
      })
   })
   ```
  {% /if %}

  <!-- CDN sync -->
  {% if equals($lib_src, "cdn_sync") %}
  ```javascript
   window.DD_RUM && window.DD_RUM.startView({
        name: 'checkout',
        service: 'purchase',
        version: '1.2.3',
        context: {
            payment: 'Done'
        },
   })
   ```
  {% /if %}

  {% /if %}
  <!-- ends 5.28.0 -->
   
<!-- Version must meet 5.22.0 -->
{% if versionMeets($rum_browser_sdk_version, "5.22.0") %}
The following example manually tracks the pageviews on the `checkout` page in a RUM application. It uses `checkout` for the view name and associates the `purchase` service with version `1.2.3`.

<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.startView({
    name: 'checkout',
    service: 'purchase',
    version: '1.2.3'
  })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{% /if %}
{% /if %}
<!-- ends 5.22.0 -->

<!-- Version must meet 4.13.0 -->
{% if versionMeets($rum_browser_sdk_version, "4.13.0") %}
The following example manually tracks the pageviews on the `checkout` page in a RUM application. No service or version can be specified.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.startView('checkout')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
      window.DD_RUM.startView('checkout')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.startView('checkout')
```
{% /if %}
{% /if %}
<!-- ends 4.13.0 -->

If you are using React, Angular, Vue, or any other frontend framework, Datadog recommends implementing the `startView` logic at the framework router level.

### React router instrumentation

To override default RUM view names so that they are aligned with how you've defined them in your React application, you need to follow the below steps.

**Note**: These instructions are specific to the **React Router v6** library.

1. Set `trackViewsManually` to `true` when initializing the RUM browser SDK as described [above](#override-default-rum-view-names).

2. Start views for each route change.
   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { matchRoutes, useLocation } from 'react-router-dom';
   import { routes } from 'path/to/routes';
   import { datadogRum } from "@datadog/browser-rum";

   export default function App() {
      // Track every route change with useLocation API
      let location = useLocation();

      useEffect(() => {
      const routeMatches = matchRoutes(routes, location.pathname);
      const viewName = routeMatches && computeViewName(routeMatches);
      if (viewName) {
         datadogRum.startView({name: viewName});
      }
      }, [location.pathname]);

      ...
   }

   // Compute view name out of routeMatches
   function computeViewName(routeMatches) {
      let viewName = "";
      for (let index = 0; index < routeMatches.length; index++) {
      const routeMatch = routeMatches[index];
      const path = routeMatch.route.path;
      // Skip pathless routes
      if (!path) {
         continue;
      }

      if (path.startsWith("/")) {
         // Handle absolute child route paths
         viewName = path;
      } else {
         // Handle route paths ending with "/"
         viewName += viewName.endsWith("/") ? path : `/${path}`;
      }
      }

      return viewName || '/';
   }
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   import { matchRoutes, useLocation } from 'react-router-dom';
   import { routes } from 'path/to/routes';

   export default function App() {
      // Track every route change with useLocation API
      let location = useLocation();

      useEffect(() => {
      const routeMatches = matchRoutes(routes, location.pathname);
      const viewName = routeMatches && computeViewName(routeMatches);
      if (viewName) {
         DD_RUM.onReady(function() {
            DD_RUM.startView({name: viewName});
         });
      }
      }, [location.pathname]);

      ...
   }

   // Compute view name out of routeMatches
   function computeViewName(routeMatches) {
      let viewName = "";
      for (let index = 0; index < routeMatches.length; index++) {
      const routeMatch = routeMatches[index];
      const path = routeMatch.route.path;
      // Skip pathless routes
      if (!path) {
         continue;
      }

      if (path.startsWith("/")) {
         // Handle absolute child route paths
         viewName = path;
      } else {
         // Handle route paths ending with "/"
         viewName += viewName.endsWith("/") ? path : `/${path}`;
      }
      }

      return viewName || '/';
   }
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   import { matchRoutes, useLocation } from 'react-router-dom';
   import { routes } from 'path/to/routes';

   export default function App() {
      // Track every route change with useLocation API
      let location = useLocation();

      useEffect(() => {
      const routeMatches = matchRoutes(routes, location.pathname);
      const viewName = routeMatches && computeViewName(routeMatches);
      if (viewName) {
         window.DD_RUM &&
            window.DD_RUM.startView({name: viewName});
      }
      }, [location.pathname]);

      ...
   }

   // Compute view name out of routeMatches
   function computeViewName(routeMatches) {
      let viewName = "";
      for (let index = 0; index < routeMatches.length; index++) {
      const routeMatch = routeMatches[index];
      const path = routeMatch.route.path;
      // Skip pathless routes
      if (!path) {
         continue;
      }

      if (path.startsWith("/")) {
         // Handle absolute child route paths
         viewName = path;
      } else {
         // Handle route paths ending with "/"
         viewName += viewName.endsWith("/") ? path : `/${path}`;
      }
      }

      return viewName || '/';
   }
   ```
   {% /if %}

### Set view name

Use `setViewName(name: string)` to update the name of the current view. This allows you to change the view name during the view without starting a new one.
   <!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.setViewName('<VIEW_NAME>');

   // Code example
   datadogRum.setViewName('Checkout');
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.setViewName('<VIEW_NAME>');
   })

   // Code example
   window.DD_RUM.onReady(function() {
      window.DD_RUM.setViewName('Checkout');
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM && window.DD_RUM.setViewName('<VIEW_NAME>');

   // Code example
   window.DD_RUM && window.DD_RUM.setViewName('Checkout');
   ```
   {% /if %}

**Note**: Changing the view name affects the view and its child events from the time the method is called.

## Enrich and control RUM data

The RUM Browser SDK captures RUM events and populates their main attributes. The `beforeSend` callback function gives you access to every event collected by the RUM Browser SDK before it is sent to Datadog.

Intercepting the RUM events allows you to:

- Enrich your RUM events with additional context attributes
- Modify your RUM events to alter their content or redact sensitive sequences (see [list of editable properties](#modify-the-content-of-a-rum-event))
- Discard selected RUM events

<!-- Version must meet 2.13.0 -->
{% if versionMeets($rum_browser_sdk_version, "2.13.0") %}
Starting with [version 2.13.0][5], `beforeSend` takes two arguments: the `event` generated by the RUM Browser SDK, and the `context` that triggered the creation of the RUM event.

```javascript
function beforeSend(event, context)
```

The potential `context` values are:

| RUM event type   | Context                   |
|------------------|---------------------------|
| View             | [Location][6]                  |
| Action           | [Event][7] and handling stack                     |
| Resource (XHR)   | [XMLHttpRequest][8], [PerformanceResourceTiming][9], and handling stack            |
| Resource (Fetch) | [Request][10], [Response][11], [PerformanceResourceTiming][9], and handling stack      |
| Resource (Other) | [PerformanceResourceTiming][9] |
| Error            | [Error][12]                     |
| Long Task        | [PerformanceLongTaskTiming][13] |

For more information, see the [Enrich and control RUM data guide][14].
{% /if %}
<!-- ends 2.13.0 -->

### Enrich RUM events

Along with attributes added with the [Global Context API](#global-context) or the [Feature Flag data collection](#enrich-rum-events-with-feature-flags), you can add additional context attributes to the event. For example, tag your RUM resource events with data extracted from a fetch response object:
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      ...,
      beforeSend: (event, context) => {
         // collect a RUM resource's response headers
         if (event.type === 'resource' && event.resource.type === 'fetch') {
               event.context.responseHeaders = Object.fromEntries(context.response.headers)
         }
         return true
      },
      ...
   });
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.init({
         ...,
         beforeSend: (event, context) => {
               // collect a RUM resource's response headers
               if (event.type === 'resource' && event.resource.type === 'fetch') {
                  event.context.responseHeaders = Object.fromEntries(context.response.headers)
               }
               return true
         },
         ...
      })
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
      window.DD_RUM.init({
         ...,
         beforeSend: (event, context) => {
               // collect a RUM resource's response headers
               if (event.type === 'resource' && event.resource.type === 'fetch') {
                  event.context.responseHeaders = Object.fromEntries(context.response.headers)
               }
               return true
         },
         ...
      });
   ```   
   {% /if %}

If a user belongs to multiple teams, add additional key-value pairs in your calls to the Global Context API.

The RUM Browser SDK ignores attributes added outside of `event.context`.

### Enrich RUM events with feature flags

You can [enrich your RUM event data with feature flags][14] to get additional context and visibility into performance monitoring. This lets you determine which users are shown a specific user experience and if it is negatively affecting the user's performance.

### Modify the content of a RUM event

For example, to redact email addresses from your web application URLs:
<!-- NPM -->
   {% if equals($lib_src, "npm") %}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      ...,
      beforeSend: (event) => {
         // remove email from view url
         event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
      },
      ...
   });
   ```
   {% /if %}

   <!-- CDN async -->
   {% if equals($lib_src, "cdn_async") %}
   ```javascript
   window.DD_RUM.onReady(function() {
      window.DD_RUM.init({
         ...,
         beforeSend: (event) => {
               // remove email from view url
               event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
         },
         ...
      })
   })
   ```
   {% /if %}

   <!-- CDN sync -->
   {% if equals($lib_src, "cdn_sync") %}
   ```javascript
   window.DD_RUM &&
      window.DD_RUM.init({
         ...,
         beforeSend: (event) => {
               // remove email from view url
               event.view.url = event.view.url.replace(/email=[^&]*/, "email=REDACTED")
         },
         ...
      });
   ```
   {% /if %}

You can update the following event properties:

| Attribute                      | Type   | Description                                                                                                                                                                               |
| ------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view.url`                     | String | The URL of the active web page.                                                                                                                                                           |
| `view.referrer`                | String | The URL of the previous web page from which a link to the currently requested page was followed.                                                                                          |
| `view.name`                    | String | The name of the current view.                                                                                                                                                             |
| `view.performance.lcp.resource_url` | String |   The resource URL for the Largest Contentful Paint.                                                                                                                                 |
| `service`                      | String | The service name for your application.                                                                                                                                                    |
| `version`                      | String | The application's version. For example: 1.2.3, 6c44da20, or 2020.02.13.                                                                                                                  |
| `action.target.name`           | String | The element that the user interacted with. Only for automatically collected actions.                                                                                                      |
| `error.message`                | String | A concise, human-readable, one-line message explaining the error.                                                                                                                         |
| `error.stack`                 | String | The stack trace or complementary information about the error.                                                                                                                             |
| `error.resource.url`           | String | The resource URL that triggered the error.                                                                                                                                                |
| `resource.url`                 | String | The resource URL.                                                                                                                                                                         |
| `long_task.scripts.source_url` | String | The script resource url                                                                                                                                                                   |
| `long_task.scripts.invoker`    | String | A meaningful name indicating how the script was called                                                                                                                                    |
| `context`                      | Object | Attributes added with the [Global Context API](#global-context), the [View Context API](#view-context), or when generating events manually (for example, `addError` and **`addAction`**). |

The RUM Browser SDK ignores modifications made to event properties not listed above. For more information about event properties, see the [RUM Browser SDK GitHub repository][15].

**Note**: Unlike other events, view events are sent multiple times to Datadog to reflect the updates occurring during their lifecycle. An update on a previous view event can still be sent while a new view is active. Datadog recommends being mindful of this behavior when modifying the content of a view event.

```javascript
beforeSend: (event) => {
    // discouraged, as the current view name could be applied to both the active view and the previous views
    event.view.name = getCurrentViewName()

    // recommended
    event.view.name = getViewNameForUrl(event.view.url)
}
```

### Discard a RUM event

With the `beforeSend` API, discard a RUM event by returning `false`:
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
   ...,
   beforeSend: (event) => {
      if (shouldDiscard(event)) {
         return false
      }
      ...
   },
   ...
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            },
            ...
        },
        ...
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        ...,
        beforeSend: (event) => {
            if (shouldDiscard(event)) {
                return false
            }
            ...
        },
        ...
    });
```
{% /if %}

**Note**: View events cannot be discarded.

## User session

Adding user information to your RUM sessions helps you:

- Follow the journey of a given user
- Know which users are the most impacted by errors
- Monitor performance for your most important users

{% img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in RUM UI" /%}

<!-- Version must meet 6.4.0 -->
{% if versionMeets($rum_browser_sdk_version, "6.4.0") %}
In versions 6.4.0 and above, the following attributes are available:

| Attribute  | Type | Required |  Description                                                                                              |
|------------|------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | String | Yes | Unique user identifier.                                                                                  |
| `usr.name`  | String | No | User friendly name, displayed by default in the RUM UI.                                                  |
| `usr.email` | String | No | User email, displayed in the RUM UI if the user name is not present. It is also used to fetch Gravatars. |
{% /if %}
<!-- ends  6.4.0 -->

<!-- Version must not meet 6.4.0 -->
{% if not(versionMeets($rum_browser_sdk_version, "6.4.0")) %}
The below attributes are optional in versions before 6.4.0, but Datadog strongly recommends providing at least one of them. For example, you should set the user ID on your sessions to see relevant data on some default RUM dashboards, which rely on `usr.id` as part of the query.

| Attribute  | Type | Description                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | String | Unique user identifier.                                                                                  |
| `usr.name`  | String | User friendly name, displayed by default in the RUM UI.                                                  |
| `usr.email` | String | User email, displayed in the RUM UI if the user name is not present. It is also used to fetch Gravatars. |

Increase your filtering capabilities by adding extra attributes on top of the recommended ones. For instance, add information about the user plan, or which user group they belong to.

When making changes to the user session object, all RUM events collected after the change contain the updated information.

**Note**: Deleting the user session information, as in a logout, retains the user information on the last view before the logout, but not on later views or the session level as the session data uses the last view's values.
{% /if %}
<!-- ends not 6.4.0 -->

### Identify user session

`datadogRum.setUser(<USER_CONFIG_OBJECT>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUser({
        id: '1234',
        name: 'John Doe',
        email: 'john@doe.com',
        plan: 'premium',
        ...
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{% /if %}

### Access user session

`datadogRum.getUser()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.getUser()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getUser()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.getUser()
```
{% /if %}

### Add/Override user session property

`datadogRum.setUserProperty('<USER_KEY>', <USER_VALUE>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.setUserProperty('name', 'John Doe')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUserProperty('name', 'John Doe')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```
{% /if %}

### Remove user session property

`datadogRum.removeUserProperty('<USER_KEY>')`
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.removeUserProperty('name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeUserProperty('name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```
{% /if %}

### Clear user session property

`datadogRum.clearUser()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.clearUser()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearUser()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.clearUser()
```
{% /if %}

## Account

To group users into different set, use the account concept.

The following attributes are available:

| Attribute      | Type   | Required | Description                                                |
|----------------|--------|----------|------------------------------------------------------------|
| `account.id`   | String | Yes      | Unique account identifier.                                 |
| `account.name` | String | No       | Account friendly name, displayed by default in the RUM UI. |

### Identify account

`datadogRum.setAccount(<ACCOUNT_CONFIG_OBJECT>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccount({
        id: '1234',
        name: 'My Company Name',
        ...
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{% /if %}

### Access account

`datadogRum.getAccount()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.getAccount()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getAccount()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.getAccount()
```
{% /if %}

### Add/Override account property

`datadogRum.setAccountProperty('<ACCOUNT_KEY>', <ACCOUNT_VALUE>)`
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.setAccountProperty('name', 'My Company Name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccountProperty('name', 'My Company Name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.setAccountProperty('name', 'My Company Name')
```
{% /if %}

### Remove account property

`datadogRum.removeAccountProperty('<ACCOUNT_KEY>')`
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.removeAccountProperty('name')
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeAccountProperty('name')
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.removeAccountProperty('name')
```
{% /if %}

### Clear account properties

`datadogRum.clearAccount()`
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
datadogRum.clearAccount()
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearAccount()
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.clearAccount()
```
{% /if %}

## Sampling

By default, no sampling is applied on the number of collected sessions. To apply a relative sampling (in percent) to the number of sessions collected, use the `sessionSampleRate` parameter when initializing RUM.

The following example collects only 90% of all sessions on a given RUM application:
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sessionSampleRate: 90,
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    });
```
{% /if %}

For a sampled out session, all pageviews and associated telemetry for that session are not collected.

## User tracking consent

To be compliant with GDPR, CCPA, and similar regulations, the RUM Browser SDK lets you provide the tracking consent value at initialization. For more information on tracking consent, see [Data Security][17].

The `trackingConsent` initialization parameter can be one of the following values:

1. `"granted"` (default): The RUM Browser SDK starts collecting data and sends it to Datadog.
2. `"not-granted"`: The RUM Browser SDK does not collect any data.

To change the tracking consent value after the RUM Browser SDK is initialized, use the `setTrackingConsent()` API call. The RUM Browser SDK changes its behavior according to the new value:

- when changed from `"granted"` to `"not-granted"`, the RUM session is stopped, data is no longer sent to Datadog.
- when changed from `"not-granted"` to `"granted"`, a new RUM session is created if no previous session is active, and data collection resumes.

This state is not synchronized between tabs nor persisted between navigation. It is your responsibility to provide the user decision during RUM Browser SDK initialization or by using `setTrackingConsent()`.

When `setTrackingConsent()` is used before `init()`, the provided value takes precedence over the initialization parameter.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogRum.setTrackingConsent('granted');
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.setTrackingConsent('granted');
    });
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM && window.DD_RUM.setTrackingConsent('granted');
});
```
{% /if %}

## View context


Starting with [version 5.28.0][20], the context of view events is modifiable. Context can be added to the current view only, and populates its child events (such as `action`, `error`, and `timing`) with `startView`, `setViewContext`, and `setViewContextProperty` functions.

### Start view with context

Optionally define the context while starting a view with [`startView` options](#override-default-rum-view-names).

### Add view context

Enrich or modify the context of RUM view events and corresponding child events with the `setViewContextProperty(key: string, value: any)` API.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
datadogRum.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### Replace view context

Replace the context of your RUM view events and corresponding child events with `setViewContext(context: Context)` API.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setViewContext({
    originalUrl: 'shopist.io/department/chairs',
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewContext({
      originalUrl: 'shopist.io/department/chairs',
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setViewContext({
        originalUrl: 'shopist.io/department/chairs',
    });
```
{% /if %}

## Error context

### Attaching local error context with dd_context

When capturing errors, additional context may be provided at the time an error is generated. Instead of passing extra information through the `addError()` API, you can attach a `dd_context` property directly to the error instance. The RUM Browser SDK automatically detects this property and merges it into the final error event context.

```javascript
const error = new Error('Something went wrong')
error.dd_context = { component: 'Menu', param: 123, }
throw error
```

## Global context

### Add global context property

After RUM is initialized, add extra context to all RUM events collected from your application with the `setGlobalContextProperty(key: string, value: any)` API:
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// Code example
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContextProperty('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{% /if %}

### Remove global context property

You can remove a previously defined global context property.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
datadogRum.removeGlobalContextProperty('codeVersion');
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```
{% /if %}

### Replace global context

Replace the default context for all your RUM events with the `setGlobalContext(context: Context)` API.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    })
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```
{% /if %}

### Clear global context

You can clear the global context by using `clearGlobalContext`.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```
{% /if %}

### Read global context

Once RUM is initialized, read the global context with the `getGlobalContext()` API.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getGlobalContext();
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getGlobalContext();
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
const context = window.DD_RUM && window.DD_RUM.getGlobalContext();
```
{% /if %}

## Contexts life cycle

By default, global context and user context are stored in the current page memory, which means they are not:

- kept after a full reload of the page
- shared across different tabs or windows of the same session

To add them to all events of the session, they must be attached to every page.

<!-- Version must meet 4.49.0 -->
{% if versionMeets($rum_browser_sdk_version, "4.49.0") %}
With the introduction of the `storeContextsAcrossPages` configuration option in version 4.49.0, those contexts can be stored in [`localStorage`][18], allowing the following behaviors:

- Contexts are preserved after a full reload
- Contexts are synchronized between tabs opened on the same origin

However, this feature comes with some **limitations**:

- Setting Personable Identifiable Information (PII) in those contexts is not recommended, as data stored in `localStorage` outlives the user session
- The feature is incompatible with the `trackSessionAcrossSubdomains` options because `localStorage` data is only shared among the same origin (login.site.com ≠ app.site.com)
- `localStorage` is limited to 5 MiB by origin, so the application-specific data, Datadog contexts, and other third-party data stored in local storage must be within this limit to avoid any issues

{% /if %}
<!-- ends  4.49.0 -->

## Internal context

After the Datadog browser RUM SDK is initialized, you can access the internal context of the SDK. This provides core identifiers and metadata that the SDK uses internally, such as session IDs and application details.

You can explore the following attributes:

| Attribute      | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| application_id | ID of the application.                                            |
| session_id     | ID of the session.                                                |
| user_action    | Object containing action ID (or undefined if no action is found). |
| view           | Object containing details about the current view event.           |

For more information, see [RUM Browser Data Collected][2].

### Example

```json
{
  application_id : "xxx",
  session_id : "xxx",
  user_action: { id: "xxx" },
  view : {
    id : "xxx",
    referrer : "",
    url: "http://localhost:8080/",
    name: "homepage"
  }
}
```

You can optionally use `startTime` parameter to get the context of a specific time. If the parameter is omitted, the current context is returned.

```typescript
getInternalContext (startTime?: 'number' | undefined)
```
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
})
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}

```javascript
window.DD_RUM && window.DD_RUM.getInternalContext() // { session_id: "xxxx", application_id: "xxxx" ... }
```
{% /if %}

<!-- Version must meet 5.22 -->
{% if versionMeets($rum_browser_sdk_version, "5.22") %}
## Micro frontend

Starting with version 5.22, the RUM Browser SDK supports micro frontend architectures. The mechanism is based on stacktrace. To use it, you must be able to extract service and version properties from your application's file paths and filenames.

### How to use it

In the `beforeSend` property, you can override the service and version properties. To help you identify where the event originated, use the `context.handlingStack` property.
<!-- NPM -->
{% if equals($lib_src, "npm") %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

datadogRum.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{% /if %}

<!-- CDN async -->
{% if equals($lib_src, "cdn_async") %}
```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
        ...,
        beforeSend: (event, context) => {
            const stack = context?.handlingStack || event?.error?.stack;
            const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

            if (service && version) {
                event.service = service;
                event.version = version;
            }

            return true;
        },
    });
});
```
{% /if %}

<!-- CDN sync -->
{% if equals($lib_src, "cdn_sync") %}
```javascript
const SERVICE_REGEX = /some-pathname\/(?<service>\w+)\/(?<version>\w+)\//;

window.DD_RUM && window.DD_RUM.init({
    ...,
    beforeSend: (event, context) => {
        const stack = context?.handlingStack || event?.error?.stack;
        const { service, version } = stack?.match(SERVICE_REGEX)?.groups;

        if (service && version) {
          event.service = service;
          event.version = version;
        }

        return true;
    },
});
```
{% /if %}

Any query done in the RUM Explorer can use the service attribute to filter events.

### Limitations

Some events cannot be attributed to an origin, therefore they do not have an associated handling stack. This includes:

- Action events collected automatically
- Resource events other than XHR and Fetch.
- View events (but you can [override default RUM view names][20] instead)
- CORS and CSP violations
{% /if %}
<!-- ends  5.22 -->

[1]: /real_user_monitoring/application_monitoring/browser/data_collected/
[2]: /real_user_monitoring/application_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /real_user_monitoring/application_monitoring/browser/setup/
[5]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2130
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Location
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[12]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[13]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming
[14]: /real_user_monitoring/guide/enrich-and-control-rum-data
[15]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/rumEvent.types.ts
[16]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130
[17]: /data_security/real_user_monitoring/#browser-rum-use-of-cookies
[18]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[19]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v5280
[20]: /real_user_monitoring/application_monitoring/browser/advanced_configuration#override-default-rum-view-names
