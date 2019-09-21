---
title: Real User Monitoring
kind: documentation
description: "Visualize and analyze the performance of your front end applications as seen by your users."
beta: true
disable_toc: true
further_reading:
- link: "https://www.datadoghq.com/blog/dash-2019-new-feature-roundup/#real-user-monitoring"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

<div class="alert alert-warning">
This feature is in private beta. Signup for <a href="https://app.datadoghq.com/rum/2019signup">Datadog US Site</a> or <a href="https://app.datadoghq.eu/rum/2019signup">Datadog EU Site</a>  to enable Datadog-Real User Monitoring for your account.
</div>

## What is Real User Monitoring?

Datadog Real User Monitoring enables you to visualize and analyze the performance of your front end applications as seen by your users. It follows the latency from the frontend to the backend using advanced visualizations.

{{< img src="real_user_monitoring/real_user_monitering_overview.png" alt="Image Description" responsive="true" style="width:100%;">}}

## Setup

1. On the [Real User Monitoring page][1], click the **New Application** button.
2. Add in Application Details, and click **Generate Client Token**. This automatically creates a `clientToken` and an `applicationId` for your application.
3. Paste the [generated code snippet](#generated-code-snippet) into the head tag (in front of any other script tags) of every HTML page you want to monitor in your application.
4. Deploy the changes to your application. Once your deployment is live, Datadog starts collecting events and logs from your user's browsers.

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
  window.DD_RUM.init({
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
  window.DD_RUM.init({
    clientToken: '<CLIENT_TOKEN>',
    applicationId: '<APPLICATION_ID>',
  });
</script>
```

{{% /tab %}}
{{< /tabs >}}

### Client Tokens

For security reasons, [API keys][2] cannot be used to configure the script to send data from browsers, as they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a [client token][3] must be used. For more information about setting up a client token, see the [Client tokens documentation][3].

### Supported browsers

The `datadog-logs` library supports all modern desktop and mobile browsers, including IE10 and IE11.

## Data collected

The Datadog-Real User Monitoring script sends to Datadog three main types of events:

- Events about pages loading:
    - DOM interactive time
    - First paint time
    - First contentful paint time
- Events about resources loading
- [Custom events and measures][4].

The following contexts-following the [Datadog Standard Attributes][5] logic-are then attached automatically to all events sent to Datadog:

* [HTTP Requests][6]
* [URL details][7]
* [Geolocation][8]
* [User-Agent][9]
* `sessionId`	The ID corresponding to the session of your user.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum
[2]: /account_management/api-app-keys/#api-keys
[3]: /account_management/api-app-keys/#client-tokens
[4]: /logs/log_collection/javascript/?tab=us#send-a-custom-log-entry
[5]: /logs/processing/attributes_naming_convention
[6]: /logs/processing/attributes_naming_convention/#http-requests
[7]: /logs/processing/attributes_naming_convention/#url-details-attributes
[8]: /logs/processing/attributes_naming_convention/#geolocation
[9]: /logs/processing/attributes_naming_convention/#user-agent-attributes
