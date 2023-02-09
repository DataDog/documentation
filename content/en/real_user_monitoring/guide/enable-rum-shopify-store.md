---
title: Enable RUM on your Shopify store
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

With the ever growing popularity of low-code e-commerce platforms such as Shopify, WooCommerce, or Squarespace, understanding how customers interact with your website — including which pages they visit, how much time they spend on your website, and which products are the most popular — is crucial to the success of your store. This data can be used to optimize your store and improve the overall customer experience.

Thanks to Real User Monitoring you can identify issues such as broken links, slow load times, errors, and detect technical issues before they even arise. Real User Monitoring can be integrated with the aforementioned e-commerce platforms, and we will see in this guide how this can be achieved. Starting today, understand the performance of your web pages and gather valuable insights about your customers.

## Setup

1. Log in your Shopify administration panel.
2. Under **Sales channels**, click on **Online Store**.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-1.png" alt="Enable RUM on your Shopify store" >}}

3. This will open up a new menu, click on **Themes**.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-2.png" alt="Enable RUM on your Shopify store" >}}

4. Click on the **Edit code** button for your current theme.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-3.png" alt="Enable RUM on your Shopify store" >}}

5. Under the **Layout** directory, you will find the main file of your theme **theme.liquid**. Click on the file in order to edit it. 

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-4.png" alt="Enable RUM on your Shopify store" >}}

6. Initialise the Browser RUM SDK by adding the SDK code snippet inside the `<head>` tag. For more information about which installation method to choose, you can refer to the [RUM Browser Monitoring documentation][1].

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
  
   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-5.png" alt="Enable RUM on your Shopify store" >}}

7. Save the changes by clicking on the **Save** button.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-6.png" alt="Enable RUM on your Shopify store" >}}

If needed, more information regarding theme code's editing can be found in [Shopify's documentation][2].

## Start exploring

You can now start using Real User Monitoring with your Shopify store. Get valuable insights about your customers behavior, make data-driven decisions to improve your store, and increase conversion by watching browser recordings enriched sessions with [Session Replay][3], building [funnel analysis][4] to better understand customer journey, or [generating metrics][5] from those newly captured sessions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/#choose-the-right-installation-method/
[2]: https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code
[3]: /real_user_monitoring/session_replay/
[4]: /real_user_monitoring/funnel_analysis/
[5]: /real_user_monitoring/generate_metrics/