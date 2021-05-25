---
title: RUM Advanced Configuration
kind: documentation
aliases:
  - /real_user_monitoring/installation/advanced_configuration/
further_reading:
    - link: 'https://www.npmjs.com/package/@datadog/browser-rum'
      tag: 'NPM'
      text: 'datadog/browser-rum NPM package'
    - link: '/real_user_monitoring/rum_explorer'
      tag: 'Documentation'
      text: 'Explore your views within Datadog'
    - link: '/real_user_monitoring/rum_analytics'
      tag: 'Documentation'
      text: 'Build analytics upon your events'
    - link: 'real_user_monitoring/browser/tracking_user_actions'
      tag: 'Documentation'
      text: 'Tracking custom user actions'
---

## Control sensitive RUM data
If your RUM data contains sensitive information that need redacting, configure the Browser SDK to redact sensitive sequences, or to discard selected RUM events, by using the `beforeSend` callback when you initialize RUM.

This callback function gives you access to every event collected by the RUM SDK before they get sent to Datadog.

### Modify the content of a RUM event

For example, redact email addresses from your web application URLs:

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

You can update the following event properties:

|   Attribute           |   Type    |   Description                                                                                       |
|-----------------------|-----------|-----------------------------------------------------------------------------------------------------|
|   `view.url`            |   String  |   The URL of the active web page.                                                                   |
|   `view.referrer`       |   String  |   The URL of the previous web page from which a link to the currently requested page was followed.  |
|   `action.target.name`  |   String  |   The element that the user interacted with. Only for automatically collected actions.              |
|   `error.message`       |   String  |   A concise, human-readable, one-line message explaining the error.                                 |
|   `error.stack `        |   String  |   The stack trace or complementary information about the error.                                     |
|   `error.resource.url`  |   String  |   The resource URL that triggered the error.                                                        |
|   `error.resource.status_code`  |   String  |   The HTTP status code for failed resources.                                                       |
|   `resource.url`        |   String  |   The resource URL.                                                                                 |
|   `resource.status_code`|   String  |   The resource HTTP status code.                                                                                 |

**Note**: The RUM SDK will ignore modifications made to event properties not listed above. Find out about all event properties on the [Browser SDK repository][1].

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
DD_RUM.onReady(function() {
    DD_RUM.init({
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

## Identify user sessions
Adding user information to your RUM sessions makes it easy to:
* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in RUM UI"  >}}

The following attributes are **optional** but it is recommended to provide **at least one** of them:

| Attribute  | Type | Description                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| usr.id    | String | Unique user identifier.                                                                                  |
| usr.name  | String | User friendly name, displayed by default in the RUM UI.                                                  |
| usr.email | String | User email, displayed in the RUM UI if the user name is not present. It is also used to fetch Gravatars. |

**Note**: Increase your filtering capabilities by adding extra attributes on top of the recommended ones. For instance, add information about the user plan, or which user group they belong to.

To identify user sessions, use the `setUser` API:

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
DD_RUM.onReady(function() {
    DD_RUM.setUser({
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

### Remove the user identification

Clear a previously set user with the `removeUser` API. All RUM events collected afterwards will not contain user information.

{{< tabs >}}
{{% tab "NPM" %}}
```javascript
datadogRum.removeUser()
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.removeUser()
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && window.DD_RUM.removeUser()
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

**Note**: For a sampled out session, all page views and associated telemetry for that session are not collected.

## Global context
### Add global context

Once Real User Monitoring (RUM) is initialized, add extra context to all RUM events collected from your application with the `addRumGlobalContext(key: string, value: any)` API:

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

**Note**: Follow the [Datadog naming convention][2] for a better correlation of your data across the product.

### Replace global context

Once Real User Monitoring (RUM) is initialized, replace the default context for all your RUM events with the `setRumGlobalContext(context: Context)` API:

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

**Note**: Follow the [Datadog naming convention][2] for a better correlation of your data across the product.

### Read global context

Once Real User Monitoring (RUM) is initialized, read the global context with the `getRumGlobalContext()` API:

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



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/DataDog/browser-sdk/blob/main/packages/rum-core/src/rumEvent.types.ts
[2]: /logs/processing/attributes_naming_convention/#user-related-attributes
