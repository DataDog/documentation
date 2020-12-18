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
---

## Initialization

Find below the different initialization options available with the [Datadog Browser SDK][1].

### Identify user sessions
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

### Sampling

By default, no sampling is applied on the number of collected sessions. To apply a relative sampling (in percent) to the number of sessions collected, use the `sampleRate` parameter when initializing RUM. The following example collects only 90% of all sessions on a given RUM application:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { Datacenter, datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    datacenter: Datacenter.US,
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
        sampleRate: 90,
    });
```

{{% /tab %}}
{{< /tabs >}}

**Note**: For a sampled out session, all page views and associated telemetry for that session aren't collected.

## API available

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
    DD_RUM.addRumGlobalContext('<CONTEXT_KEY>', <CONTEXT_VALUE>);
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
window.DD_RUM && window.DD_RUM.addRumGlobalContext('<CONTEXT_KEY>', <CONTEXT_VALUE>);

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

### Custom user actions

Once Real User Monitoring (RUM) is initialized, generate user actions when you want to monitor specific interactions on your application pages or measure custom timings with the `addUserAction(name: string, context: Context)` API:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.addUserAction('<NAME>', '<JSON_OBJECT>');

// Code example
datadogRum.addUserAction('checkout', {
    cart: {
        amount: 42,
        currency: '$',
        nb_items: 2,
        items: ['socks', 't-shirt'],
    },
});
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
DD_RUM.onReady(function() {
    DD_RUM.addUserAction('<NAME>', '<JSON_OBJECT>');
})

// Code example
DD_RUM.onReady(function() {
    DD_RUM.addUserAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
})
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM && DD_RUM.addUserAction('<NAME>', '<JSON_OBJECT>');

// Code example
window.DD_RUM &&
    DD_RUM.addUserAction('checkout', {
        cart: {
            amount: 42,
            currency: '$',
            nb_items: 2,
            items: ['socks', 't-shirt'],
        },
    });
```

{{% /tab %}}
{{< /tabs >}}

With the above example, the RUM SDK would collect the amount of items within a cart, what they are, and how much the cart is worth overall.


### Custom errors
Monitor handled exceptions, handled promise rejections and other errors not tracked automatically by the RUM SDK with the `addError()` API:

```javascript
addError(
    error: unknown,
    context?: Context,
    source: ErrorSource.CUSTOM | ErrorSource.NETWORK | ErrorSource.SOURCE = ErrorSource.CUSTOM
);
```

**Note**: The [Error Tracking][3] feature processes errors sent with source set to `custom` or `source` and that contain a stacktrace.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Send a custom error with context
const error = new Error('Something wrong occured.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error, undefined, 'network');
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error, undefined, 'source');
}
```

{{% /tab %}}
{{% tab "CDN async" %}}
```javascript
// Send a custom error with context
const error = new Error('Something wrong occured.');

DD_RUM.onReady(function() {
    DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error, undefined, 'network');
    });
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error, undefined, 'source');
    })
}
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occured.');

window.DD_RUM && DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && DD_RUM.addError(error, undefined, 'network');
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM && DD_RUM.addError(error, undefined, 'source');
}
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: /logs/processing/attributes_naming_convention/#user-related-attributes
[3]: /real_user_monitoring/error_tracking
