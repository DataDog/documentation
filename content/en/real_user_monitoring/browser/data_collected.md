---
title: Collecting Real User Browser Data and Context
kind: documentation
aliases:
  - /real_user_monitoring/data_collected/
  - /real_user_monitoring/data_collected/view/
  - /real_user_monitoring/data_collected/resource/
  - /real_user_monitoring/data_collected/long_task/
  - /real_user_monitoring/data_collected/error/
  - /real_user_monitoring/data_collected/user_action/
  - /real_user_monitoring/browser/advanced_configuration/
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/browser/monitoring_page_performance/"
  tag: "Documentation"
  text: "Monitoring Page Performance"
- link: "/real_user_monitoring/browser/monitoring_resource_performance/"
  tag: "Documentation"
  text: "Monitoring Resource Performance"
- link: "/real_user_monitoring/browser/collecting_browser_errors/"
  tag: "Documentation"
  text: "Collecting Browser Errors"
- link: "/real_user_monitoring/browser/tracking_user_actions"
  tag: "Documentation"
  text: "Tracking User Actions"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/explorer/analytics/"
  tag: "Documentation"
  text: "Build analytics upon your events"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
- link: 'https://www.npmjs.com/package/@datadog/browser-rum'
  tag: 'NPM'
  text: 'datadog/browser-rum NPM package'

---

The Datadog Real User Monitoring (RUM) SDK generates the several types of events from a user's interaction with a web-based application in a browser. Datadog collects RUM data from these events, and you can use the data to create alerts and visualizations that help you with supporting users and deriving insights.

## RUM event types 

The RUM SDK generates the following types of events:

| Event Type     | Retention | Description                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Session   | 30 days   | A user session begins when a user starts browsing the web application. It contains high-level information about the user (browser, device, geolocation). It aggregates all RUM events collected during the user journey with a unique `session.id` attribute. |
| View      | 30 days   | A view event is generated each time a user visits a page of the web application. While the user remains on the same page, resource, long-task, error and action events are linked to the related RUM view with the `view.id` attribute.                       |
| Long Task | 15 days   | A long task event is generated for any task in the browser that blocks the main thread for more than 50ms.                                             |
| Resource  | 15 days   | A resource event is generated for images, XHR, Fetch, CSS, or JS libraries loaded on a webpage. It includes detailed loading timing information.                                                                      |
| Error     | 30 days   | RUM collects every frontend error emitted by the browser.                                                                                                              |
| Action    | 30 days   | RUM action events track user interactions during a user journey and can also be manually sent to monitor custom user actions.                                                                 |

Each user session event contains one or more page views, and each view can contain any combination of long tasks, resource loads, errors, and user actions:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM Event hierarchy" style="width:50%;border:none" >}}

## Default attributes and event-specific RUM data

Generally, _metrics_ are quantities of time or counts of things that you can measure, and _attributes_ are labels or categories that you can use to group or filter by when querying and viewing metrics.

There are metrics and attributes that are specific to each event type. For example, the metric `view.loading_time` is associated with view events and the attribute `resource.method` is associated with resource events. And there are [default attributes](#default-attributes) that are present on all RUM events. For example, the URL of the page (`view.url`) and user information such as their device type (`device.type`) and their country (`geo.country`). These attributes are attached to every piece of RUM data collected.

This page describes:
* The [default attributes](#default-attributes) attached to every RUM event type.
* The metrics and attributes available for [session events](#session-metrics-and-attributes).
* How to [add user information](#identify-user-sessions) to session data.
* How to [add more context](#adding-and-customizing-context) to the RUM data you collect. 
* How to [scrub RUM data](#scrub-sensitive-data-from-your-rum-data) of private information.
* How to [sample RUM session data](#sampling) rather than collecting all of it.

See the following pages for information about metrics and attributes associated with:

* [Monitoring Page Performance][1] (view and long task events)
* [Monitoring Resource Performance][2] (resource events)
* [Collecting Browser Errors][3] (error events)
* [Tracking User Actions][4] (action events)

## Default attributes

All event types have the following attributes attached by default. So you can filter on them or group by them regardless of the RUM event type being queried.

### Core attributes

| Attribute name   | Type   | Description                 |
|------------------|--------|-----------------------------|
| `type`     | string | The type of the event (for example, `view` or `resource`).             |
| `application.id` | string | The Datadog application ID. |

### View attributes

RUM action, error, resource and long task events contain information about the active RUM view event at the time of collection:

| Attribute name                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | string | Randomly generated ID for each page view.                                                                      |
| `view.loading_type`                     | string | The type of page load: `initial_load` or `route_change`. For more information, see the [single page applications support docs][5].|
| `view.referrer`                | string | The URL of the previous web page from which a link to the currently requested page was followed.               |
| `view.url`                     | string | The view URL.                                                                                                  |
| `view.url_hash`                     | string | The hash part of the URL.|
| `view.url_host`        | string | The host part of the URL.                                                                                |
| `view.url_path`        | string | The path part of the URL.                                                                                 |
| `view.url_path_group`  | string | The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`). |
| `view.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes.                        |
| `view.url_scheme` | object | The scheme part of the URL.                        |

### Device attributes

The following device-related attributes are attached automatically to all events collected by Datadog:

| Attribute name                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `device.type`       | string | The device type as reported by the device (User-Agent HTTP header)      |
| `device.brand`  | string | The device brand as reported by the device (User-Agent HTTP header)  |
| `device.model`   | string | The device model as reported by the device (User-Agent HTTP header)   |
| `device.name` | string | The device name as reported by the device (User-Agent HTTP header) |

### Operating system attributes

The following OS-related attributes are attached automatically to all events collected by Datadog:

| Attribute name                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | string | The OS name as reported by the by the device (User-Agent HTTP header)       |
| `os.version`  | string | The OS version as reported by the by the device (User-Agent HTTP header)  |
| `os.version_major`   | string | The OS version major as reported by the by the device (User-Agent HTTP header)   |

### Geo-location attributes

The following attributes are related to the geo-location of IP addresses:

| Fullname                                    | Type   | Description                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | string | Name of the country                                                                                                                  |
| `geo.country_iso_code`     | string | [ISO Code][6] of the country (for example, `US` for the United States, `FR` for France).                                                  |
| `geo.country_subdivision`     | string | Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France). |
| `geo.country_subdivision_iso_code` | string | [ISO Code][6] of the first subdivision level of the country (for example, `CA` in the United States or the `SA` department in France).    |
| `geo.continent_code`       | string | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).                                                                 |
| `geo.continent`       | string | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America`, `Oceania`).                    |
| `geo.city`            | string | The name of the city (example `Paris`, `New York`).                                                                                   |

## Session metrics and attributes

The RUM SDK generates the following metrics for a given user session:

| Metric  | Type   | Description                |
|------------|--------|----------------------------|
| `session.time_spent` | number (ns) | Duration of the user session. |
| `session.view.count`        | number      | Count of all views collected for this session. |
| `session.error.count`      | number      | Count of all errors collected for this session.  |
| `session.resource.count`         | number      | Count of all resources collected for this session. |
| `session.action.count`      | number      | Count of all actions collected for this session. |
| `session.long_task.count`      | number      | Count of all long tasks collected for this session. |

The following attributes are attached to session data:

| Attribute name                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id`                      | string | Randomly generated ID for each session.view.                                                                      |
| `session.type`                     | string | The type of session: `user` or `synthetics`. Sessions from [Synthetic Monitoring Browser Tests][7] are excluded from billing. |
| `session.referrer`                | string | The URL of the previous web page from which a link to the currently requested page was followed. |
| `session.initial_view.id`        | string | The id of the first RUM view generated by the user. |
| `session.initial_view.url_host`        | string | The host part of the URL. |
| `session.initial_view.url_path`        | string | The path part of the URL. |
| `session.initial_view.url_path_group`  | string | The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`). |
| `session.initial_view.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes. |
| `session.initial_view.url_scheme` | object | The scheme part of the URL. |
| `session.last_view.id`        | string | The id of the last RUM view generated by the user. |
| `session.last_view.url_host`        | string | The host part of the URL. |
| `session.last_view.url_path`        | string | The path part of the URL. |
| `session.last_view.url_path_group`  | string | The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`). |
| `session.last_view.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes. |
| `session.last_view.url_scheme` | object | The scheme part of the URL. |

## Identify user sessions

Add user information to your RUM sessions so that you can:
* Follow the journey of a given user.
* Know which users are the most impacted by errors.
* Monitor performance for your most important users.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in RUM UI"  >}}

The following attributes are **optional** but you must provide **at least one** when you want to track RUM data for a specific user:

| Attribute  | Type | Description                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| usr.id    | String | Unique user identifier.                                                                                  |
| usr.name  | String | User friendly name, displayed by default in the RUM UI.                                                  |
| usr.email | String | User email, displayed in the RUM UI if the user name is not present. It is also used to fetch Gravatars. |

To identify user sessions, use the `setUser` API:

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com'
})
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.setUser({
        id: '1234',
        name: 'John Doe',
        email: 'john@doe.com'
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && window.DD_RUM.setUser({
    id: '1234',
    name: 'John Doe',
    email: 'john@doe.com'
})
```

{{% /tab %}}
{{< /tabs >}}




## Adding and customizing context

### Add global context

After you have initialized RUM, you can add extra context to all RUM events collected from your application with the `addRumGlobalContext(key: string, value: any)` API:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addRumGlobalContext('<CONTEXT_KEY>', <CONTEXT_VALUE>);

// Code example
datadogRum.addRumGlobalContext('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('<CONTEXT_KEY>', '<CONTEXT_VALUE>');
})

// Code example
DD_RUM.onReady(function() {
    DD_RUM.addRumGlobalContext('activity', {
        hasPaid: true,
        amount: 23.42
    });
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && window.DD_RUM.addRumGlobalContext('<CONTEXT_KEY>', '<CONTEXT_VALUE>');

// Code example
window.DD_RUM && window.DD_RUM.addRumGlobalContext('activity', {
    hasPaid: true,
    amount: 23.42
});
```

{{% /tab %}}
{{< /tabs >}}

**Note**: Follow the [Datadog naming convention][8] for a better correlation of your data across the product.

### Replace global context

After you have initialized RUM, you can replace the default context for all your RUM events with the `setRumGlobalContext(context: Context)` API:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.setRumGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
datadogRum.setRumGlobalContext({
    codeVersion: 34,
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.setRumGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });
})

// Code example
DD_RUM.onReady(function() {
    DD_RUM.setRumGlobalContext({
        codeVersion: 34,
    })
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    DD_RUM.setRumGlobalContext({ '<CONTEXT_KEY>': '<CONTEXT_VALUE>' });

// Code example
window.DD_RUM &&
    DD_RUM.setRumGlobalContext({
        codeVersion: 34,
    });
```

{{% /tab %}}
{{< /tabs >}}

**Note**: Follow the [Datadog naming convention][8] for a better correlation of your data across the product.

### Read global context

After you have initialized RUM, you can read the global context with the `getRumGlobalContext()` API:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

const context = datadogRum.getRumGlobalContext();
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
  var context = DD_RUM.getRumGlobalContext();
});
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
var context = window.DD_RUM && DD_RUM.getRumGlobalContext();
```

{{% /tab %}}
{{< /tabs >}}

## Scrub sensitive data from your RUM data
If your RUM data contains sensitive information that needs redacting, configure the Browser SDK to scrub sensitive sequences, or to dismiss selected RUM events, by using the `beforeSend` callback function when you initialize RUM.

This callback function gives you access to every event collected by the RUM SDK before they are sent to Datadog.

### Modify the content of a RUM event

You can update the following event properties:

|   Attribute           |   Type    |   Description                                                                                       |
|-----------------------|-----------|-----------------------------------------------------------------------------------------------------|
|   `view.url`            |   String  |   The URL of the active web page.                                                                   |
|   `view.referrer`       |   String  |   The URL of the previous web page from which a link to the currently requested page was followed.  |
|   `action.target.name`  |   String  |   The element that the user interacted with. Only for automatically collected actions.              |
|   `error.message`       |   String  |   A concise, human-readable, one-line message explaining the error.                                 |
|   `error.stack `        |   String  |   The stack trace or complementary information about the error.                                     |
|   `error.resource.url`  |   String  |   The resource URL that triggered the error.                                                        |
|   `resource.url`        |   String  |   The resource URL.                                                                                 |

**Note**: The RUM SDK will ignore modifications made to event properties not listed above. Find out about all event properties on the [Browser SDK repository][9].

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
DD_RUM.onReady(function() {
    DD_RUM.init({
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

### Dismiss a RUM event

With the `beforeSend` API, dismiss a RUM event by returning `false`:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    ...,
    beforeSend: (event) => {
        if (shouldDismiss(event)) {
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
DD_RUM.onReady(function() {
    DD_RUM.init({
        ...,
        beforeSend: (event) => {
            if (shouldDismiss(event)) {
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
            if (shouldDismiss(event)) {
                return false
            }
            ...
        },
        ...
    });
```

{{% /tab %}}
{{< /tabs >}}


## Sampling

By default, no sampling is applied on the number of collected sessions. To apply a relative sampling (in percent) to the number of sessions collected, use the `sampleRate` parameter when initializing RUM. The following example collects only 90% of all sessions on a given RUM application:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    sampleRate: 90,
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```html
<script>
 (function(h,o,u,n,d) {
   h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
   d=o.createElement(u);d.async=1;d.src=n
   n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
})(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum.js','DD_RUM')
  DD_RUM.onReady(function() {
    DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sampleRate: 90,
    })
  })
</script>
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        site: '<DATADOG_SITE>',
        sampleRate: 90,
    });
```

{{% /tab %}}
{{< /tabs >}}

**Note**: For a sampled-out session, all page views and associated telemetry for that session are not collected.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /real_user_monitoring/browser/monitoring_page_performance/
[2]: /real_user_monitoring/browser/monitoring_resource_performance/
[3]: /real_user_monitoring/browser/collecting_browser_errors/
[4]: /real_user_monitoring/browser/tracking_user_actions/
[5]: /real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[6]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[7]: /synthetics/browser_tests/
[8]: /logs/processing/attributes_naming_convention/#user-related-attributes
[9]: https://github.com/DataDog/browser-sdk/blob/master/packages/rum-core/src/rumEvent.types.ts
