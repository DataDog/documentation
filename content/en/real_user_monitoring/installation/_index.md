---
title: RUM Get started
kind: documentation
aliases:
- /real_user_monitoring/setup
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
2. Fill out  Application Details, and click **Generate Client Token**. This automatically creates a `clientToken` and an `applicationId` for your application.
3. Paste the [generated code snippet](#generated-code-snippet) into the head tag (in front of any other script tags) of every HTML page you want to monitor in your application.
    **Note**: Including the script tag higher and synchronized ensures Datadog RUM can collect all performance data and errors.
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum
