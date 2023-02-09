---
title: Enable RUM on Your WooCommerce Store
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

Understanding how customers interact with your web pages is crucial to the success of your online store. This guide will walk through how you can set up Real User Monitoring on your WordPress + WooCommerce-powered store.

## Setup

1. Log in your WordPress administration panel.
2. Under **Plugins**, click on **Add New**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-1.png" alt="Enable RUM on your WooCommerce store" >}}

3. Search for **WPCode** and click on **Install Now**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-2.png" alt="Enable RUM on your WooCommerce store" >}}

4. Once installed, click on **Activate**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-3.png" alt="Enable RUM on your WooCommerce store" >}}

5. You will now see a **Code Snippets** section in your WordPress menu, click on **Header & Footer**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-4.png" alt="Enable RUM on your WooCommerce store" >}}

6. Initialise the Browser RUM SDK by adding the SDK code snippet inside the **Header** section and save the changes by clicking on the **Save** button. For more information about which installation method to choose, you can refer to the [RUM Browser Monitoring documentation][1].

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
  
   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-5.png" alt="Enable RUM on your WooCommerce store" >}}

## Start exploring

You can now start using Real User Monitoring with your WooCommerce store. Get valuable insights about your customers behavior, make data-driven decisions to improve your store, and increase conversion by watching browser recordings enriched sessions with [Session Replay][2], building [funnel analysis][3] to better understand customer journey, or [generating metrics][4] from those newly captured sessions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#choose-the-right-installation-method/
[2]: /real_user_monitoring/session_replay/
[3]: /real_user_monitoring/funnel_analysis/
[4]: /real_user_monitoring/generate_metrics/