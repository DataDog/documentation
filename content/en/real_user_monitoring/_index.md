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
---

<div class="alert alert-warning">
    Real User Monitoring is in private beta. To request access, sign up here.</a>
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
    clientToken: '<clientToken>',
    applicationId: '<applicationId>',
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
    clientToken: '<clientToken>',
    applicationId: '<applicationId>',
  });
</script>
```

{{% /tab %}}
{{< /tabs >}}

### Client Tokens

For security reasons, [API keys][2] cannot be used to configure the data being sent from browsers, as they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a [client token][3] must be used. For more information about setting up a client token, see the [Client tokens documentation][3].

### Supported browsers

The datadog-logs library supports all modern desktop and mobile browsers, including IE10 and IE11.

## Data collected

Adding the above JavaScript snippet to your website sends Datadog three main types of events:

- Events about pages loading:
    - DOM interactive
    - First paint
    - First contentful paint
- Events about resources loading
- Custom events and measures

In addition to these events, you'll also be able to see this context on your user: 

| Event | Data |
|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Screen URL | URL of the page generating the events. Parsed in: <ul><li>hostpage</li><li>pathpage</li><li>schemepage</li><li>hostpage</li><li>pathpage</li><li>scheme</li></ul> |
| GeoIP | Geographic information from the IP address. Parsed in: <ul><li>Continent</li><li>Country</li><li>Countryubdivision</li><li>City</li></ul> |
| UserAgent | The UserAgent as it is sent. Parsed in:<ul><li>Browser patch version</li><li>Browser family</li><li>Browser major version</li><li>Browser minor version</li><li>Browser patch minor version</li><li>OS family</li><li>OS minor version</li><li>OS major version</li><li>OS patch version</li><li>Device family</li> |
| SessionID | The ID corresponding to the session of your user. |



[1]: https://app.datadoghq.com/rum
[2]: /account_management/api-app-keys/#api-keys
[3]: /account_management/api-app-keys/#client-tokens
