---
title: Advanced Configuration
aliases:
  - /real_user_monitoring/installation/advanced_configuration/
  - /real_user_monitoring/browser/modifying_data_and_context/
further_reading:
- link: "/real_user_monitoring/browser/tracking_user_actions"
  tag: Documentation
  text: "Tracking User Actions"
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/browser/data_collected/"
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

## Override default RUM view names

The RUM Browser SDK automatically generates a [view event][2] for each new page visited by your users, or when the page URL is changed (for single-page applications). A view name is computed from the current page URL, where variable IDs are removed automatically. A path segment that contains at least one number is considered a variable ID. For example, `/dashboard/1234` and `/dashboard/9a` become `/dashboard/?`.

Starting with [version 2.17.0][3], you can add view names and assign them to a dedicated service owned by a team by tracking view events manually with the `trackViewsManually` option:

1. Set `trackViewsManually` to true when initializing the RUM Browser SDK.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
       ...,
       trackViewsManually: true,
       ...
   });
   ```
   {{% /tab %}}
   {{% tab "CDN async" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.init({
           ...,
           trackViewsManually: true,
           ...
       })
   })
   ```
   {{% /tab %}}
   {{% tab "CDN sync" %}}
   ```javascript
   window.DD_RUM &&
       window.DD_RUM.init({
           ...,
           trackViewsManually: true,
           ...
       });
   ```
   {{% /tab %}}
   {{< /tabs >}}

2. You must start views for each new page or route change (for single-page applications). RUM data is collected when the view starts. Starting with [version 4.13.0][17], you can also optionally define the associated service name and version.

   - View Name: Defaults to the page URL path.
   - Service: Defaults to the default service specified when creating your RUM application.
   - Version: Defaults to the default version specified when creating your RUM application.
   - Context: Starting with [version 5.28.0][20], you can add context to views and the child events of views.

   For more information, see [Setup Browser Monitoring][4].

   <details open>
     <summary>Latest version</summary>
   The following example manually tracks the pageviews on the <code>checkout</code> page in a RUM application. Use <code>checkout</code> for the view name and associate the <code>purchase</code> service with version <code>1.2.3</code>.

   {{< tabs >}}
   {{% tab "NPM" %}}
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

   {{% /tab %}}
   {{% tab "CDN async" %}}
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
   {{% /tab %}}
   {{% tab "CDN sync" %}}
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
   {{% /tab %}}
   {{< /tabs >}}

</details>
<details>
<summary>before <code>v5.28.0</code></summary>
The following example manually tracks the pageviews on the <code>checkout</code> page in a RUM application. It uses <code>checkout</code> for the view name and associates the <code>purchase</code> service with version <code>1.2.3</code>.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.startView({
    name: 'checkout',
    service: 'purchase',
    version: '1.2.3'
  })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
})
```
{{% /tab %}}
{{< /tabs >}}
</details>

   <details>
     <summary>before <code>v4.13.0</code></summary>
   The following example manually tracks the pageviews on the <code>checkout</code> page in a RUM application. No service or version can be specified.

   {{< tabs >}}
   {{% tab "NPM" %}}
   ```javascript
   datadogRum.startView('checkout')
   ```

   {{% /tab %}}
   {{% tab "CDN async" %}}
   ```javascript
   window.DD_RUM.onReady(function() {
       window.DD_RUM.startView('checkout')
   })
   ```
   {{% /tab %}}
   {{% tab "CDN sync" %}}
   ```javascript
   window.DD_RUM && window.DD_RUM.startView('checkout')
   ```
   {{% /tab %}}
   {{< /tabs >}}

   </details>

If you are using React, Angular, Vue, or any other frontend framework, Datadog recommends implementing the `startView` logic at the framework router level.

### React router instrumentation

To override default RUM view names so that they are aligned with how you've defined them in your React application, you need to follow the below steps.

**Note**: These instructions are specific to the **React Router v6** library.

1. Set `trackViewsManually` to `true` when initializing the RUM browser SDK as described [above](#override-default-rum-view-names).

2. Start views for each route change.

   {{< tabs >}}
   {{% tab "NPM" %}}
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

   {{% /tab %}}
   {{% tab "CDN async" %}}
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
   {{% /tab %}}
   {{% tab "CDN sync" %}}
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
   {{% /tab %}}
   {{< /tabs >}}

### Set view name

Use `setViewName(name: string)` to update the name of the current view. This allows you to change the view name during the view without starting a new one.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setViewName('<VIEW_NAME>');

// Code example
datadogRum.setViewName('Checkout');
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewName('<VIEW_NAME>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.setViewName('Checkout');
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setViewName('<VIEW_NAME>');

// Code example
window.DD_RUM && window.DD_RUM.setViewName('Checkout');
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Changing the view name affects the view and its child events from the time the method is called.

## Enrich and control RUM data

The RUM Browser SDK captures RUM events and populates their main attributes. The `beforeSend` callback function gives you access to every event collected by the RUM Browser SDK before it is sent to Datadog.

Intercepting the RUM events allows you to:

- Enrich your RUM events with additional context attributes
- Modify your RUM events to alter their content or redact sensitive sequences (see [list of editable properties](#modify-the-content-of-a-rum-event))
- Discard selected RUM events

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

### Enrich RUM events

Along with attributes added with the [Global Context API](#global-context) or the [Feature Flag data collection](#enrich-rum-events-with-feature-flags), you can add additional context attributes to the event. For example, tag your RUM resource events with data extracted from a fetch response object:

{{< tabs >}}
{{% tab "NPM" %}}
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
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
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
{{% /tab %}}
{{< /tabs >}}

If a user belongs to multiple teams, add additional key-value pairs in your calls to the Global Context API.

The RUM Browser SDK ignores attributes added outside of `event.context`.

### Enrich RUM events with feature flags

You can [enrich your RUM event data with feature flags][14] to get additional context and visibility into performance monitoring. This lets you determine which users are shown a specific user experience and if it is negatively affecting the user's performance.

### Modify the content of a RUM event

For example, to redact email addresses from your web application URLs:

{{< tabs >}}
{{% tab "NPM" %}}
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
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
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
{{% /tab %}}
{{< /tabs >}}

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
| `error.stack `                 | String | The stack trace or complementary information about the error.                                                                                                                             |
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

{{< tabs >}}
{{% tab "NPM" %}}

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
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
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
{{% /tab %}}
{{< /tabs >}}

**Note**: View events cannot be discarded.

## User session

Adding user information to your RUM sessions helps you:

* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in RUM UI" >}}

{{< tabs >}}
{{% tab "6.4.0 and above" %}}

The following attributes are available:

| Attribute  | Type | Required |  Description                                                                                              |
|------------|------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | String | Yes | Unique user identifier.                                                                                  |
| `usr.name`  | String | No | User friendly name, displayed by default in the RUM UI.                                                  |
| `usr.email` | String | No | User email, displayed in the RUM UI if the user name is not present. It is also used to fetch Gravatars. |

{{% /tab %}}
{{% tab "Before 6.4.0" %}}

The below attributes are optional but Datadog strongly recommends providing at least one of them. For example, you should set the user ID on your sessions to see relevant data on some default RUM dashboards, which rely on `usr.id` as part of the query.

| Attribute  | Type | Description                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| `usr.id`    | String | Unique user identifier.                                                                                  |
| `usr.name`  | String | User friendly name, displayed by default in the RUM UI.                                                  |
| `usr.email` | String | User email, displayed in the RUM UI if the user name is not present. It is also used to fetch Gravatars. |

{{% /tab %}}
{{< /tabs >}}

Increase your filtering capabilities by adding extra attributes on top of the recommended ones. For instance, add information about the user plan, or which user group they belong to.

When making changes to the user session object, all RUM events collected after the change contain the updated information.

**Note**: Deleting the user session information, as in a logout, retains the user information on the last view before the logout, but not on later views or the session level as the session data uses the last view's values.

### Identify user session

`datadogRum.setUser(<USER_CONFIG_OBJECT>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com',
    plan: 'premium',
    ...
})
```

{{% /tab %}}
{{< /tabs >}}

### Access user session

`datadogRum.getUser()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.getUser()
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getUser()
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.getUser()
```

{{% /tab %}}
{{< /tabs >}}

### Add/Override user session property

`datadogRum.setUserProperty('<USER_KEY>', <USER_VALUE>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUserProperty('name', 'John Doe')
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setUserProperty('name', 'John Doe')
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setUserProperty('name', 'John Doe')
```

{{% /tab %}}
{{< /tabs >}}

### Remove user session property

`datadogRum.removeUserProperty('<USER_KEY>')`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.removeUserProperty('name')
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeUserProperty('name')
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.removeUserProperty('name')
```
{{% /tab %}}
{{< /tabs >}}

### Clear user session property

`datadogRum.clearUser()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.clearUser()
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearUser()
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.clearUser()
```
{{% /tab %}}
{{< /tabs >}}

## Account

To group users into different set, use the account concept.

The following attributes are available:

| Attribute      | Type   | Required | Description                                                |
|----------------|--------|----------|------------------------------------------------------------|
| `account.id`   | String | Yes      | Unique account identifier.                                 |
| `account.name` | String | No       | Account friendly name, displayed by default in the RUM UI. |

### Identify account

`datadogRum.setAccount(<ACCOUNT_CONFIG_OBJECT>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccount({
        id: '1234',
        name: 'My Company Name',
        ...
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setAccount({
    id: '1234',
    name: 'My Company Name',
    ...
})
```

{{% /tab %}}
{{< /tabs >}}

### Access account

`datadogRum.getAccount()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.getAccount()
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.getAccount()
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.getAccount()
```

{{% /tab %}}
{{< /tabs >}}

### Add/Override account property

`datadogRum.setAccountProperty('<ACCOUNT_KEY>', <ACCOUNT_VALUE>)`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setAccountProperty('name', 'My Company Name')
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.setAccountProperty('name', 'My Company Name')
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setAccountProperty('name', 'My Company Name')
```

{{% /tab %}}
{{< /tabs >}}

### Remove account property

`datadogRum.removeAccountProperty('<ACCOUNT_KEY>')`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.removeAccountProperty('name')
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeAccountProperty('name')
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.removeAccountProperty('name')
```
{{% /tab %}}
{{< /tabs >}}

### Clear account properties

`datadogRum.clearAccount()`

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.clearAccount()
```
{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.clearAccount()
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.clearAccount()
```
{{% /tab %}}
{{< /tabs >}}

## Sampling

By default, no sampling is applied on the number of collected sessions. To apply a relative sampling (in percent) to the number of sessions collected, use the `sessionSampleRate` parameter when initializing RUM.

The following example collects only 90% of all sessions on a given RUM application:

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sessionSampleRate: 90,
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sessionSampleRate: 90,
    });
```
{{% /tab %}}
{{< /tabs >}}

For a sampled out session, all pageviews and associated telemetry for that session are not collected.

## User tracking consent

To be compliant with GDPR, CCPA, and similar regulations, the RUM Browser SDK lets you provide the tracking consent value at initialization. For more information on tracking consent, see [Data Security][18].

The `trackingConsent` initialization parameter can be one of the following values:

1. `"granted"`: The RUM Browser SDK starts collecting data and sends it to Datadog.
2. `"not-granted"`: The RUM Browser SDK does not collect any data.

To change the tracking consent value after the RUM Browser SDK is initialized, use the `setTrackingConsent()` API call. The RUM Browser SDK changes its behavior according to the new value:

* when changed from `"granted"` to `"not-granted"`, the RUM session is stopped, data is no longer sent to Datadog.
* when changed from `"not-granted"` to `"granted"`, a new RUM session is created if no previous session is active, and data collection resumes.

This state is not synchronized between tabs nor persisted between navigation. It is your responsibility to provide the user decision during RUM Browser SDK initialization or by using `setTrackingConsent()`.

When `setTrackingConsent()` is used before `init()`, the provided value takes precedence over the initialization parameter.

{{< tabs >}}
{{% tab "NPM" %}}
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
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_RUM && window.DD_RUM.setTrackingConsent('granted');
});
```
{{% /tab %}}
{{< /tabs >}}

## View context

Starting with [version 5.28.0][20], the context of view events is modifiable. Context can be added to the current view only, and populates its child events (such as `action`, `error`, and `timing`) with `startView`, `setViewContext`, and `setViewContextProperty` functions.

### Start view with context

Optionally define the context while starting a view with [`startView` options](#override-default-rum-view-names).

### Add view context

Enrich or modify the context of RUM view events and corresponding child events with the `setViewContextProperty(key: string, value: any)` API.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
datadogRum.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setViewContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setViewContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{< /tabs >}}


### Replace view context

Replace the context of your RUM view events and corresponding child events with `setViewContext(context: Context)` API.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setViewContext({
    originalUrl: 'shopist.io/department/chairs',
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.setViewContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setViewContext({
        originalUrl: 'shopist.io/department/chairs',
    });
```

{{% /tab %}}
{{< /tabs >}}

## Error context

### Attaching local error context with dd_context

When capturing errors, additional context may be provided at the time an error is generated. Instead of passing extra information through the `addError()` API, you can attach a `dd_context` property directly to the error instance. The RUM Browser SDK automatically detects this property and merges it into the final error event context.

{{< code-block lang="javascript" >}}
const error = new Error('Something went wrong')
error.dd_context = { component: 'Menu', param: 123, }
throw error
{{< /code-block >}}

## Global context

### Add global context property

After RUM is initialized, add extra context to all RUM events collected from your application with the `setGlobalContextProperty(key: string, value: any)` API:

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setGlobalContextProperty('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// Code example
datadogRum.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
```javascript
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.setGlobalContextProperty('activity', {
    hasPaid: true,
    amount: 23.42
});
```
{{% /tab %}}
{{< /tabs >}}

### Remove global context property

You can remove a previously defined global context property.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
datadogRum.removeGlobalContextProperty('codeVersion');
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');
})

// Code example
window.DD_RUM.onReady(function() {
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('<CONTEXT_KEY>');

// Code example
window.DD_RUM &&
    window.DD_RUM.removeGlobalContextProperty('codeVersion');
```

{{% /tab %}}
{{< /tabs >}}


### Replace global context

Replace the default context for all your RUM events with the `setGlobalContext(context: Context)` API.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';
datadogRum.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setGlobalContext({
    codeVersion: 34,
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    window.DD_RUM.setGlobalContext({
        codeVersion: 34,
    });
```

{{% /tab %}}
{{< /tabs >}}

### Clear global context

You can clear the global context by using `clearGlobalContext`.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.clearGlobalContext();
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
  window.DD_RUM.clearGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && window.DD_RUM.clearGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

### Read global context

Once RUM is initialized, read the global context with the `getGlobalContext()` API.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getGlobalContext();
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
window.DD_RUM.onReady(function() {
  const context = window.DD_RUM.getGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
const context = window.DD_RUM && window.DD_RUM.getGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

## Contexts life cycle

By default, global context and user context are stored in the current page memory, which means they are not:

- kept after a full reload of the page
- shared across different tabs or windows of the same session

To add them to all events of the session, they must be attached to every page.

With the introduction of the `storeContextsAcrossPages` configuration option in the v4.49.0 of the browser SDK, those contexts can be stored in [`localStorage`][19], allowing the following behaviors:

- Contexts are preserved after a full reload
- Contexts are synchronized between tabs opened on the same origin

However, this feature comes with some **limitations**:

- Setting Personable Identifiable Information (PII) in those contexts is not recommended, as data stored in `localStorage` outlives the user session
- The feature is incompatible with the `trackSessionAcrossSubdomains` options because `localStorage` data is only shared among the same origin (login.site.com ≠ app.site.com)
- `localStorage` is limited to 5 MiB by origin, so the application-specific data, Datadog contexts, and other third-party data stored in local storage must be within this limit to avoid any issues

## Micro frontend

Starting with version 5.22, the RUM Browser SDK supports micro frontend architectures. The mechanism is based on stacktrace. To use it, you must be able to extract service and version properties from your application's file paths and filenames.

### How to use it

In the `beforeSend` property, you can override the service and version properties. To help you identify where the event originated, use the `context.handlingStack` property.

{{< tabs >}}
{{% tab "NPM" %}}
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
{{% /tab %}}
{{% tab "CDN async" %}}
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
{{% /tab %}}
{{% tab "CDN sync" %}}
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
{{% /tab %}}
{{< /tabs >}}

Any query done in the RUM Explorer can use the service attribute to filter events.

### Limitations

Some events cannot be attributed to an origin, therefore they do not have an associated handling stack. This includes:
- Action events collected automatically
- Resource events other than XHR and Fetch.
- View events (but you can [override default RUM view names][21] instead)
- CORS and CSP violations

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/data_collected/
[2]: /real_user_monitoring/browser/monitoring_page_performance/
[3]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170
[4]: /real_user_monitoring/browser/setup/
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
[16]: /logs/log_configuration/attributes_naming_convention/#user-related-attributes
[17]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130
[18]: /data_security/real_user_monitoring/#browser-rum-use-of-cookies
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[20]: https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v5280
[21]: /real_user_monitoring/browser/advanced_configuration#override-default-rum-view-names
