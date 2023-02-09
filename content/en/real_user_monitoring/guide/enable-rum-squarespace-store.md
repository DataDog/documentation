---
title: Enable RUM on Your Squarespace Store
kind: guide
further_reading:
- link: '/real_user_monitoring/guide/rum-for-product-analytics/'
  tag: 'Documentation'
  text: 'Use RUM & Session Replay for Product Analytics'
- link: '/real_user_monitoring/guide/alerting-with-conversion-rates/'
  tag: 'Documentation'
  text: 'Alerting With Conversion Rates'
---

## Overview

Understanding how customers interact with your web pages is crucial to the success of your online store. This guide will walk through how you can set up Real User Monitoring on your Squarespace-powered store.

## Setup

1. Log in your Squarespace administration panel and click on **Settings**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-1.png" alt="Enable RUM on your Squarespace store" >}}

2. Under **Settings**, click on **Advanced**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-2.png" alt="Enable RUM on your Squarespace store" >}}

3. This will open up a new menu, click on **Code Injection**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-3.png" alt="Enable RUM on your Squarespace store" >}}

4. Initialise the Browser RUM SDK by adding the SDK code snippet inside the **Header** section. For more information about which installation method to choose, you can refer to the [RUM Browser Monitoring documentation][1].

{{< tabs >}}
{{% tab "CDN async" %}}
```html
<script>
  (function(h,o,u,n,d) {
     h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
     d=o.createElement(u);d.async=1;d.src=n
     n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
  })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-rum-v4.js','DD_RUM')
  DD_RUM.onReady(function() {
    DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: '<DATADOG_SITE>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
  })
</script>
```
{{% /tab %}}
{{% tab "CDN sync" %}}
```html
<script src="https://www.datadoghq-browser-agent.com/datadog-rum-v4.js" type="text/javascript"></script>
<script>
  window.DD_RUM &&
    window.DD_RUM.init({
      clientToken: '<CLIENT_TOKEN>',
      applicationId: '<APPLICATION_ID>',
      site: '<DATADOG_SITE>',
      //  service: 'my-web-application',
      //  env: 'production',
      //  version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100, // if not included, the default is 100
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    })
</script>
```
{{% /tab %}}
{{< /tabs >}}
  
   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-4.png" alt="Enable RUM on your Squarespace store" >}}

5. Save the changes by clicking on the **Save** button.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-5.png" alt="Enable RUM on your Squaresapce store" >}}

If needed, more information regarding code injection can be found in [Squarespace's documentation][2].

## Start exploring

You can now start using Real User Monitoring with your Squarespace store. Get valuable insights about your customers behavior, make data-driven decisions to improve your store, and increase conversion by watching browser recordings enriched sessions with [Session Replay][3], building [funnel analysis][4] to better understand customer journey, or [generating metrics][5] from those newly captured sessions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#choose-the-right-installation-method/
[2]: https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection
[3]: /real_user_monitoring/session_replay/
[4]: /real_user_monitoring/funnel_analysis/
[5]: /real_user_monitoring/generate_metrics/