---
title: RUM Get started
kind: documentation
aliases:
- /real_user_monitoring/setup
further_reading:
- link: "https://www.npmjs.com/package/@datadog/browser-rum"
  tag: "NPM"
  text: "datadog/browser-rum NPM package"
- link: "/real_user_monitoring/installation/advanced_configuration"
  tag: "Documentation"
  text: "Advanced configuration for RUM data collection"
- link: "/real_user_monitoring/dashboards"
  tag: "Documentation"
  text: "Visualize your RUM data in out of the box Dashboards"
---

To set up Datadog Real User Monitoring solution:

1. On the [Real User Monitoring page][1], click the **New Application** button.
2. Fill out  Application Details, and click **Generate Client Token**. This automatically creates a `clientToken` and an `applicationId` for your application.
3. Setup the Datadog browser rum library [through NPM](#npm-setup) or paste the [generated code snippet](#bundle-setup) into the head tag.
4. Deploy the changes to your application. Once your deployment is live, Datadog starts collecting events from your user's browsers.
5. Visualize the [data collected][2] in Datadog [out of the box Dashboards][3].

**Note**: Your application shows up on the application list page as "pending" until Datadog starts receiving data.

## NPM Setup

After adding [`@datadog/browser-rum`][4] to your `package.json` file, initialize it with:

{{< tabs >}}
{{% tab "US" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  datacenter: 'us',
  resourceSampleRate: 100,
  sampleRate: 100
})
```

{{% /tab %}}
{{% tab "EU" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum'
datadogRum.init({
  applicationId: '<DATADOG_APPLICATION_ID>',
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  datacenter: 'eu',
  resourceSampleRate: 100,
  sampleRate: 100
})
```

{{% /tab %}}
{{< /tabs >}}

## Bundle Setup

Paste the generated code snippet into the head tag (in front of any other script tags) of every HTML page you want to monitor in your application. Including the script tag higher and synchronized ensures Datadog RUM can collect all performance data and errors.

{{< tabs >}}
{{% tab "US" %}}

```html
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

```html
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

## Initialization parameters

| Parameter            | Type   | Required | Default | Description                                                                                                  |
|----------------------|--------|----------|---------|--------------------------------------------------------------------------------------------------------------|
| `applicationId`      | String | Yes      | ``      | The RUM application ID.                                                                                      |
| `clientToken`        | String | Yes      | ``      | A [Datadog Client Token][5].                                                                                 |
| `datacenter`         | String | Yes      | `us`    | The Datadog Site of your organization. `us` for Datadog US site, `eu` for Datadog EU site.                   |
| `resourceSampleRate` | Number | No       | `100`   | Percentage of tracked sessions with resources collection. `100` for all, `0` for none of them.               |
| `sampleRate`         | Number | No       | `100`   | Percentage of sessions to track. Only tracked sessions send rum events. `100` for all, `0` for none of them. |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum
[2]: /real_user_monitoring/data_collected
[3]: /real_user_monitoring/dashboards
[4]: https://www.npmjs.com/package/@datadog/browser-rum
[5]: /account_management/api-app-keys/#client-tokens
