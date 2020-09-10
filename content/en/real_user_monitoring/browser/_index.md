---
title: Getting started
kind: documentation
aliases:
    - /real_user_monitoring/setup
    - /real_user_monitoring/installation/
further_reading:
    - link: 'https://www.npmjs.com/package/@datadog/browser-rum'
      tag: 'npm'
      text: 'datadog/browser-rum npm package'
    - link: '/real_user_monitoring/installation/advanced_configuration'
      tag: 'Documentation'
      text: 'Advanced configuration for RUM data collection'
    - link: '/real_user_monitoring/dashboards'
      tag: 'Documentation'
      text: 'Visualize your RUM data in out of the box Dashboards'
---

To set up Datadog Real User Monitoring solution:

1. On the [Real User Monitoring page][1], click the **New Application** button.
2. Fill out Application Details, and click **Generate Client Token**. This automatically creates a `clientToken` and an `applicationId` for your application.
3. Setup the Datadog RUM SDK [through npm](#npm-setup) or paste the [generated code snippet](#bundle-setup) into the head tag.
4. Deploy the changes to your application. Once your deployment is live, Datadog starts collecting events from your user's browsers.
5. Visualize the [data collected][2] in Datadog [out of the box Dashboards][3].

**Note**: Your application shows up on the application list page as "pending" until Datadog starts receiving data.

## npm Setup

After adding [`@datadog/browser-rum`][4] to your `package.json` file, initialize it with:

{{< tabs >}}
{{% tab "US" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: 'datadoghq.com',
//  service: 'my-web-application',
//  env: 'production',
//  version: '1.0.0',
    sampleRate: 100,
    trackInteractions:true,
});
```

{{% /tab %}}
{{% tab "EU" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: 'datadoghq.eu',
//  service: 'my-web-application',
//  env: 'production',
//  version: '1.0.0',
    sampleRate: 100,
    trackInteractions:true,
});
```

{{% /tab %}}
{{< /tabs >}}

**Note**: The `trackInteractions` initialization parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained on your pages may be included to identify the elements interacted with.

## Bundle Setup

Paste the generated code snippet into the head tag (in front of any other script tags) of every HTML page you want to monitor in your application. Including the script tag higher and synchronized ensures Datadog RUM can collect all performance data and errors.

{{< tabs >}}
{{% tab "US" %}}

```html
<script
    src="https://www.datadoghq-browser-agent.com/datadog-rum.js"
    type="text/javascript"
></script>
<script>
    window.DD_RUM &&
        window.DD_RUM.init({
            clientToken: '<CLIENT_TOKEN>',
            applicationId: '<APPLICATION_ID>',
            site: 'datadoghq.com',
        //  service: 'my-web-application',
        //  env: 'production',
        //  version: '1.0.0',
            sampleRate: 100,
            trackInteractions:true,
        });
</script>
```

{{% /tab %}}
{{% tab "EU" %}}

```html
<script
    src="https://www.datadoghq-browser-agent.com/datadog-rum.js"
    type="text/javascript"
></script>
<script>
    window.DD_RUM &&
        window.DD_RUM.init({
            clientToken: '<CLIENT_TOKEN>',
            applicationId: '<APPLICATION_ID>',
            site: 'datadoghq.eu',
        //  service: 'my-web-application',
        //  env: 'production',
        //  version: '1.0.0',
            sampleRate: 100,
            trackInteractions:true,
        });
</script>
```

{{% /tab %}}
{{< /tabs >}}

**Note**: The `trackInteractions` initialization parameter enables the automatic collection of user clicks in your application. **Sensitive and private data** contained on your pages may be included to identify the elements interacted with.

**Note**: The `window.DD_RUM` check is used to prevent issues if a loading failure occurs with the RUM SDK.

## Initialization parameters

| Parameter                      | Type    | Required | Default         | Description                                                                                                       |
| ------------------------------ | ------- | -------- | --------------- | ----------------------------------------------------------------------------------------------------------------- |
| `applicationId`                | String  | Yes      | ``              | The RUM application ID.                                                                                           |
| `clientToken`                  | String  | Yes      | ``              | A [Datadog Client Token][5].                                                                                      |
| `site`                         | String  | Yes      | `datadoghq.com` | The Datadog Site of your organization. `datadoghq.com` for Datadog US site, `datadoghq.eu` for Datadog EU site.   |
| `service`                      | String  | No       | ``              | The service name for this application.                                                                            |
| `env`                          | String  | No       | ``              | The application’s environment e.g. prod, pre-prod, staging.                                                       |
| `version`                      | String  | No       | ``              | The application’s version e.g. 1.2.3, 6c44da20, 2020.02.13.                                                       |
| `trackInteractions`            | Boolean | No       | `false`         | Enables [automatic collection of Users Actions][6]                                                                |
| `resourceSampleRate`           | Number  | No       | `100`           | Percentage of tracked sessions with resources collection. `100` for all, `0` for none of them.                    |
| `sampleRate`                   | Number  | No       | `100`           | Percentage of sessions to track. Only tracked sessions send rum events. `100` for all, `0` for none of them.      |
| `silentMultipleInit`           | Boolean | No       | `false`         | Initialization fails silently if Datadog's RUM is already initialized on the page                                 |
| `proxyHost`                    | String  | No       | ``              | Optional proxy URL. See the full [proxy setup guide][7] for more information.                                     |
| `trackSessionAcrossSubdomains` | Boolean | no       | `false`         | Set to `true` to preserve session across subdomains of the same site. **Configuration must match when using RUM SDK**  |
| `useSecureSessionCookie`       | Boolean | no       | `false`         | Set to `true` to use a secure session cookie. This will disable rum events sending on insecure (non-HTTPS) connections. **Configuration must match when using RUM SDK** |
| `useCrossSiteSessionCookie`    | Boolean | no       | `false`         | Set to `true` to use a secure cross-site session cookie. This will allow the RUM SDK to run when the site is loaded from another one (ex: via an iframe). Implies useSecureSessionCookie. **Configuration must match when using RUM SDK** |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum
[2]: /real_user_monitoring/data_collected/
[3]: /real_user_monitoring/dashboards/
[4]: https://www.npmjs.com/package/@datadog/browser-rum
[5]: /account_management/api-app-keys/#client-tokens
[6]: /real_user_monitoring/data_collected/user_action/#automatic-collection-of-user-actions
[7]: /real_user_monitoring/faq/proxy_rum_data/
