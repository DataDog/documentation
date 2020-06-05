---
title: Getting started
kind: documentation
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/rum
[2]: /real_user_monitoring/data_collected/
[3]: /real_user_monitoring/dashboards/
