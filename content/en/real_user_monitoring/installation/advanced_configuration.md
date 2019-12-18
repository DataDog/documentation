---
title: RUM Advanced Configuration
kind: documentation
further_reading:
- link: "/real_user_monitoring/rum_explorer"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/rum_analytics"
  tag: "Documentation"
  text: "Build analytics upon your events"
---

## Add global metadata

Once Real User Monitoring (RUM) is initialized, add extra metadata to all RUM events collected from your application with the `addRumGlobalContext` API:

```js
// add global metadata attribute--one attribute can be added at a time
window.DD_RUM && DD_RUM.addRumGlobalContext('<META_KEY>', <META_VALUE>);
```

**Note**: Follow the [Datadog naming convention][1] for a better correlation of your data across the product.

## Replace default context

Once Real User Monitoring (RUM) initialized you can replace the default context for all your RUM events with the `setRumGlobalContext` API:

```js
// Entirely replace the default context for all your views
window.DD_RUM && DD_RUM.setRumGlobalContext({"<CONTEXT_KEY>":"<CONTEXT_VALUE>"});
```

**Note**: Follow the [Datadog naming convention][1] for a better correlation of your data across the product.

## Sampling

By default no sampling, but you can decide the percentage of collected sessions. From 0 to 100 where 100 is all sessions collected. For a sampled out session, all pages views and associated telemetry for that session will not be collected.

```js
window.DD_RUM && window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        sampleRate: 90
    });
```

## User action

Generate user actions when you want to monitor specific interactions on your pages or custom timings. Create facets on your user actions to slice and dice in analytics[link to create facets].

```js
// Give it a name and an object containing all the data
window.DD_RUM && DD_RUM.addUserAction(“user action name”, {"<CONTEXT_KEY>":"<CONTEXT_VALUE>"});
```

Ex: window.DD_RUM && DD_RUM.addUserAction(“cart click”, {cartAmount: 42, cartItems: 4})

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: https://docs.datadoghq.com/logs/processing/attributes_naming_convention/#user-related-attributes]
