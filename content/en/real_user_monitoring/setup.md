---
title: RUM Setup
kind: documentation
description: ""
beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/dash-2019-new-feature-roundup/#real-user-monitoring"
  tag: "Blog"
  text: "Real User Monitoring"
---

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

### Client Tokens

For security reasons, [API keys][2] cannot be used to configure the script to send data from browsers, as they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a [client token][3] must be used. For more information about setting up a client token, see the [Client tokens documentation][3].


[1]: https://app.datadoghq.com/rum
[2]: /account_management/api-app-keys/#api-keys
[3]: /account_management/api-app-keys/#client-tokens
