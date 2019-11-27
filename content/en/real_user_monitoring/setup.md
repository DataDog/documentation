---
title: RUM Setup
kind: documentation
description: ""
beta: true
further_reading:
- link: "/real_user_monitoring/rum_explorer"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/rum_analytics"
  tag: "Documentation"
  text: "Build analytics upon your events"
---

To setup Datadog Real User Monitoring solution:

1. On the [Real User Monitoring page][1], click the **New Application** button.
2. Add in Application Details, and click **Generate Client Token**. This automatically creates a `clientToken` and an `applicationId` for your application.
3. Paste the [generated code snippet](#generated-code-snippet) into the head tag (in front of any other script tags) of every HTML page you want to monitor in your application.
4. Deploy the changes to your application. Once your deployment is live, Datadog starts collecting events from your user's browsers.

**Note**: Your application shows up on the application list page as "pending" until Datadog starts receiving data.

### Generated code snippet

Paste the generated code snippet into the head tag (in front of any other script tags) of every HTML page you want to monitor in your application.

{{< tabs >}}
{{% tab "US" %}}

```
<script
  src="https://www.datadoghq-browser-agent.com/datadog-rum-us.js"
  type="text/javascript">
</script>
<script>
  window.DD_RUM && window.DD_RUM.init({
    clientToken: '<CLIENT_TOKEN>',
    applicationId: '<APPLICATION_ID>',
  });

</script>
```

{{% /tab %}}
{{% tab "EU" %}}

```
<script
  src="https://www.datadoghq-browser-agent.com/datadog-rum-eu.js"
  type="text/javascript">
</script>
<script>
  window.DD_RUM && window.DD_RUM.init({
    clientToken: '<CLIENT_TOKEN>',
    applicationId: '<APPLICATION_ID>',
  });

</script>
```

{{% /tab %}}
{{< /tabs >}}

**Note**: The `window.DD_RUM` check is used to prevent issues if a loading failure occurs with the library.

## Advanced Configuration

### Add global metadata

Once Real User Monitoring (RUM) is initialized, add extra metadata to all RUM events collected from your application with the `addRumGlobalContext` API:

```js
// add global metadata attribute--one attribute can be added at a time
window.DD_RUM && DD_RUM.addRumGlobalContext('<META_KEY>', <META_VALUE>);
```

### Replace default context

Once Real User Monitoring (RUM) initialized you can replace the default context for all your RUM events with the `setRumGlobalContext` API:

```js
// Entirely replace the default context for all your views
window.DD_RUM && DD_RUM.setRumGlobalContext({"<CONTEXT_KEY>":"<CONTEXT_VALUE>"});
```

### Client Tokens

For security reasons, [API keys][2] cannot be used to configure the script to send data from browsers as they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a [client token][3] must be used. For more information about setting up a client token, see the [Client tokens documentation][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum
[2]: /account_management/api-app-keys/#api-keys
[3]: /account_management/api-app-keys/#client-tokens
