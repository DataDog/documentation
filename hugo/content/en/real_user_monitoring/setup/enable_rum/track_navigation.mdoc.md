---
title: Track Navigation
content_filters:
  - trait_id: platform
    option_group_id: client_sdk_platform_options
    label: "SDK"
---

## Overview

RUM organizes each session into views, which represent distinct screens or states in your application. Most SDKs track views automatically, and some also support manually starting and stopping views for finer control. Select your SDK for platform-specific setup instructions.

<!-- Browser -->

{% if equals($platform, "browser") %}
{% partial file="sdk/track_navigation/browser.mdoc.md" /%}

### Override default RUM view names

You can add view names and assign them to a dedicated service owned by a team by tracking view events manually with the `trackViewsManually` option.

The Browser SDK automatically generates a view event for each new page visited by your users, or when the page URL changes (for single-page applications). A view name is computed from the current page URL, where variable IDs are removed automatically. A path segment that contains at least one number is considered a variable ID. For example, `/dashboard/1234` and `/dashboard/9a` become `/dashboard/?`.

To override default RUM view names, set `trackViewsManually` to `true` when initializing the Browser SDK, then start views for each new page or route change (for single-page applications).

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
      ...,
      trackViewsManually: true,
      ...
});
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
      window.DD_RUM.init({
         ...,
         trackViewsManually: true,
         ...
      })
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM &&
      window.DD_RUM.init({
         ...,
         trackViewsManually: true,
         ...
      });
```

{% /tab %}
{% /tabs %}

You can also optionally define the associated service name and version.

- **View Name**: Defaults to the page URL path.
- **Service**: Defaults to the default service specified when creating your RUM application.
- **Version**: Defaults to the default version specified when creating your RUM application.

### Manually track pageviews

The following example manually tracks the pageviews on the `checkout` page in a RUM application. It uses `checkout` for the view name, associates the `purchase` service with version `1.2.3`, and adds context to the view.

{% tabs %}
{% tab label="NPM" %}

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

{% /tab %}
{% tab label="CDN async" %}

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

{% /tab %}
{% tab label="CDN sync" %}

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

{% /tab %}
{% /tabs %}

### React router instrumentation

If you are using React, Angular, Vue, or any other frontend framework, Datadog recommends implementing the `startView` logic at the framework router level.

To override default RUM view names so that they are aligned with how you've defined them in your React application, follow the steps below.

**Note**: These instructions are specific to the **React Router v6** library.

1. Set `trackViewsManually` to `true` when initializing the Browser SDK, as described in [Override default RUM view names](#override-default-rum-view-names).
2. Start views for each route change.

{% tabs %}
{% tab label="NPM" %}

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

{% /tab %}
{% tab label="CDN async" %}

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

{% /tab %}
{% tab label="CDN sync" %}

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

{% /tab %}
{% /tabs %}

### Set view name

Use `setViewName(name: string)` to update the name of the current view. This allows you to change the view name during the view without starting a new one.

{% tabs %}
{% tab label="NPM" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setViewName('<VIEW_NAME>');

// Code example
datadogRum.setViewName('Checkout');
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
window.DD_RUM.onReady(function() {
   window.DD_RUM.setViewName('<VIEW_NAME>');
})

// Code example
window.DD_RUM.onReady(function() {
   window.DD_RUM.setViewName('Checkout');
})
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
window.DD_RUM && window.DD_RUM.setViewName('<VIEW_NAME>');

// Code example
window.DD_RUM && window.DD_RUM.setViewName('Checkout');
```

{% /tab %}
{% /tabs %}

**Note**: Changing the view name affects the view and its child events from the time the method is called.
{% /if %}

<!-- Android -->

{% if equals($platform, "android") %}
{% partial file="sdk/track_navigation/android.mdoc.md" /%}
{% /if %}

<!-- iOS -->

{% if equals($platform, "ios") %}
{% partial file="sdk/track_navigation/ios.mdoc.md" /%}
{% /if %}

<!-- Flutter -->

{% if equals($platform, "flutter") %}
{% partial file="sdk/track_navigation/flutter.mdoc.md" /%}
{% /if %}

<!-- React Native -->

{% if equals($platform, "react_native") %}
{% partial file="sdk/track_navigation/react_native.mdoc.md" /%}
{% /if %}

<!-- Kotlin Multiplatform -->

{% if equals($platform, "kotlin_multiplatform") %}
{% partial file="sdk/track_navigation/kotlin_multiplatform.mdoc.md" /%}
{% /if %}

<!-- C / C++ -->

{% if equals($platform, "cpp") %}
{% partial file="sdk/track_navigation/cpp.mdoc.md" /%}
{% /if %}

<!-- .NET MAUI -->

{% if equals($platform, "maui") %}
{% partial file="sdk/track_navigation/maui.mdoc.md" /%}
{% /if %}

<!-- Roku -->

{% if equals($platform, "roku") %}
{% partial file="sdk/track_navigation/roku.mdoc.md" /%}
{% /if %}

<!-- Unity -->

{% if equals($platform, "unity") %}
{% partial file="sdk/track_navigation/unity.mdoc.md" /%}
{% /if %}
