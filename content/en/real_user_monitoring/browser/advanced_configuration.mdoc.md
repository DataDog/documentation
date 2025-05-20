---
title: Advanced Configuration
aliases:
  - /real_user_monitoring/installation/advanced_configuration/
  - /real_user_monitoring/browser/modifying_data_and_context/
content_filters:
  - trait_id: lib_src
    option_group_id: rum_browser_sdk_source_options
    label: "SDK source"
  - trait_id: rum_browser_sdk_version
    option_group_id: rum_browser_sdk_version_for_advanced_config_options
further_reading:
  - link: '/real_user_monitoring/browser/tracking_user_actions'
    tag: Documentation
    text: 'Tracking User Actions'
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: 'Blog'
    text: 'Real User Monitoring'
  - link: '/real_user_monitoring/browser/data_collected/'
    tag: 'Documentation'
    text: 'RUM browser data collected'
  - link: '/real_user_monitoring/explorer/'
    tag: 'Documentation'
    text: 'Explore your views within Datadog'
  - link: '/real_user_monitoring/explorer/visualize/'
    tag: 'Documentation'
    text: 'Apply visualizations on your events'
  - link: '/logs/log_configuration/attributes_naming_convention'
    tag: 'Documentation'
    text: 'Datadog standard attributes'
---

## Overview

There are various ways you can modify the [data and context collected](/real_user_monitoring/browser/data_collected/) by RUM, to support your needs for:

- Protecting sensitive data like personally identifiable information.
- Connecting a user session with your internal identification of that user, to help with support.
- Reducing how much RUM data you're collecting, through sampling the data.
- Providing more context than what the default attributes provide about where the data is coming from.

## Override default RUM view names

The RUM Browser SDK automatically generates a [view event](/real_user_monitoring/browser/monitoring_page_performance/) for each new page visited by your users, or when the page URL is changed (for single-page applications). A view name is computed from the current page URL, where variable IDs are removed automatically. A path segment that contains at least one number is considered a variable ID. For example, `/dashboard/1234` and `/dashboard/9a` become `/dashboard/?`.

Starting with [version 2.17.0](https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v2170), you can add view names and assign them to a dedicated service owned by a team by tracking view events manually with the `trackViewsManually` option:

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

1. You must start views for each new page or route change (for single-page applications). RUM data is collected when the view starts. Starting with [version 4.13.0](https://github.com/DataDog/browser-sdk/blob/main/CHANGELOG.md#v4130), you can also optionally define the associated service name and version.

    - View Name: Defaults to the page URL path.
    - Service: Defaults to the default service specified when creating your RUM application.
    - Version: Defaults to the default version specified when creating your RUM application.

    {% if equals($rum_browser_sdk_version, "gte_5_28_0") %}
    - Context: You can add context to views and the child events of views.
    {% /if %}

For more information, see [Setup Browser Monitoring](/real_user_monitoring/browser/setup/).

<!-- SDK version >=5.28.0 -->

{% if equals($rum_browser_sdk_version, "gte_5_28_0") %}
The following example manually tracks the pageviews on the `checkout` page in a RUM application. Use `checkout` for the view name and associate the `purchase` service with version `1.2.3`.

<!-- SDK version >=5.28.0 & NPM -->

{% if equals($lib_src, "npm") %}
```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3',
  context: {
    payment: 'Done'
  }
});
```
{% /if %}

<!-- end SDK version >=5.28.0 & NPM -->

<!-- SDK version >=5.28.0 & CDN async -->

{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.startView({
    name: 'checkout',
    service: 'purchase',
    version: '1.2.3',
    context: {
      payment: 'Done'
    }
  });
});
```
{% /if %}

<!-- end SDK version >=5.28.0 & CDN async -->

<!-- SDK version >=5.28.0 & CDN sync -->

{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
  window.DD_RUM.startView({
    name: 'checkout',
    service: 'purchase',
    version: '1.2.3',
    context: {
      payment: 'Done'
    }
  });
```
{% /if %}

<!-- end SDK version >=5.28.0 & CDN sync -->
{% /if %}

<!-- end SDK version >=5.28.0 -->

<!-- SDK version >=4.13.0 -->

{% else equals($rum_browser_sdk_version, "gte_4_13_0") /%}

The following example manually tracks the pageviews on the `checkout` page in a RUM application. It uses `checkout` for the view name and associates the `purchase` service with version `1.2.3`.

<!-- SDK version >=4.13.0 & NPM -->

{% if equals($lib_src, "npm") %}
```javascript
datadogRum.startView({
  name: 'checkout',
  service: 'purchase',
  version: '1.2.3'
});
```
{% /if %}

<!-- end SDK version >=4.13.0 & NPM -->

<!-- SDK version >=4.13.0 & CDN async -->

{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.startView({
    name: 'checkout',
    service: 'purchase',
    version: '1.2.3'
  });
});
```
{% /if %}

<!-- end SDK version >=4.13.0 & CDN async -->

<!-- SDK version >=4.13.0 & CDN sync -->

{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM &&
  window.DD_RUM.startView({
    name: 'checkout',
    service: 'purchase',
    version: '1.2.3'
  });
```
{% /if %}

<!-- end SDK version >=4.13.0 & CDN sync -->

<!-- end SDK version >=4.13.0 -->

<!-- SDK version < 4.13.0 -->

{% else /%}

The following example manually tracks the pageviews on the `checkout` page in a RUM application. No service or version can be specified.

<!-- SDK version < 4.13.0 & NPM -->

{% if equals($lib_src, "npm") %}
```javascript
datadogRum.startView('checkout');
```
{% /if %}

<!-- SDK version < 4.13.0 & CDN async -->

{% if equals($lib_src, "cdn_async") %}
```javascript
window.DD_RUM.onReady(function () {
  window.DD_RUM.startView('checkout');
});
```
{% /if %}

<!-- SDK version < 4.13.0 & CDN sync -->

{% if equals($lib_src, "cdn_sync") %}
```javascript
window.DD_RUM && window.DD_RUM.startView('checkout');
```
{% /if %}

<!-- end SDK version <4.13.0 -->

If you are using React, Angular, Vue, or any other frontend framework, Datadog recommends implementing the `startView` logic at the framework router level.

### React router instrumentation

To override default RUM view names so that they are aligned with how you've defined them in your React application, you need to follow the below steps.

**Note**: These instructions are specific to the **React Router v6** library.

1. Set `trackViewsManually` to `true` when initializing the RUM browser SDK as described [above](#override-default-rum-view-names).

1. Start views for each route change.

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

    <!-- end NPM -->

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

    <!-- end CDN async -->

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

    <!-- end CDN sync -->

### Set view name

Use `setViewName(name: string)` to update the name of the current view. This allows you to change the view name during the view without starting a new one.

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
window.DD_RUM.onReady(function () {
  window.DD_RUM.setViewName('<VIEW_NAME>');
});

// Code example
window.DD_RUM.onReady(function () {
  window.DD_RUM.setViewName('Checkout');
});
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

<!-- SDK version 2.13.0 and above -->

{% if not($rum_browser_sdk_version, "lt_2_13_0") %}
## Enrich and control RUM data

The RUM Browser SDK captures RUM events and populates their main attributes. The `beforeSend` callback function gives you access to every event collected by the RUM Browser SDK before it is sent to Datadog.

Intercepting the RUM events allows you to:

- Enrich your RUM events with additional context attributes
- Modify your RUM events to alter their content or redact sensitive sequences (see [list of editable properties](#modify-the-content-of-a-rum-event))
- Discard selected RUM events

`beforeSend` takes two arguments: the `event` generated by the RUM Browser SDK, and the `context` that triggered the creation of the RUM event.

```javascript
function beforeSend(event, context)
```

The potential `context` values are:

{% table %}
- RUM event type
- Context
---
- View
- [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location)
---
- Action
- [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) and handling stack
---
- Resource (XHR)
- [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), [PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming), and handling stack
---
- Resource (Fetch)
- [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request), [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response), [PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming), and handling stack
---
- Resource (Other)
- [PerformanceResourceTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming)
---
- Error
- [Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
---
- Long Task
- [PerformanceLongTaskTiming](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceLongTaskTiming)

{% /table %}
{% /if %}

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
  });
});
```
{% /if %}

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