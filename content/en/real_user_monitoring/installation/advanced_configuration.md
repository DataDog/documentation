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

## Initialization

Find below the different initialization options available with the [Datadog Browser SDK][1].

### Sampling

By default no sampling is applied upon the amount of collected sessions. To apply a relative sampling (in percent) to the amount of session collected use the `sampleRate` parameter when initializing RUM. The following example would collect only 90% of all sessions on a given RUM application:

```js
window.DD_RUM && window.DD_RUM.init({
        clientToken: '<CLIENT_TOKEN>',
        applicationId: '<APPLICATION_ID>',
        sampleRate: 90
    });
```

**Note**: For a sampled out session, all pages views and associated telemetry for that session aren't collected.

## API availables

### Add global metadata

Once Real User Monitoring (RUM) is initialized, add extra metadata to all RUM events collected from your application with the `addRumGlobalContext` API:

```js
// add global metadata attribute--one attribute can be added at a time
window.DD_RUM && DD_RUM.addRumGlobalContext('<META_KEY>', <META_VALUE>);
```

**Note**: Follow the [Datadog naming convention][2] for a better correlation of your data across the product.

### Replace default context

Once Real User Monitoring (RUM) initialized you can replace the default context for all your RUM events with the `setRumGlobalContext` API:

```js
// Entirely replace the default context for all your views
window.DD_RUM && DD_RUM.setRumGlobalContext({"<CONTEXT_KEY>":"<CONTEXT_VALUE>"});
```

**Note**: Follow the [Datadog naming convention][2] for a better correlation of your data across the product.

### Custom User action

Once Real User Monitoring (RUM) initialized, generate User Actions when you want to monitor specific interactions on your application pages or measure custom timings with the `addUserAction` API:

```js
// Give it a name and an object containing all the data
window.DD_RUM && DD_RUM.addUserAction("<NAME>","<JSON_OBJECT>");
```

For instance, to collect the amount of items within a cart, what they are and how much the cart is worth overall you would do something like this:

```js
window.DD_RUM && DD_RUM.addUserAction("Cart Payed", {
            "cart": {
                "amount": 42,
                "currency": "$",
                "nb_items": 2,
                "items": ["socks", "t-shirt"]
            })
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: https://github.com/DataDog/browser-sdk
[2]: https://docs.datadoghq.com/logs/processing/attributes_naming_convention/#user-related-attributes]
