---
title: Monitor Your Next.js App With RUM

description: Guide for monitoring Next.js applications with RUM.
further_reading:
- link: '/monitors/create/types/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM Monitors'
---

## Overview

[Next.js][1] is a JavaScript framework created by [Vercel][7] for building React web applications and Node.js APIs. This guide shows you how to add Datadog RUM to your Next.js application to monitor frontend performance and user behavior.

## Prerequisites

Create a RUM application in Datadog to get your credentials:

1. Go to [**Digital Experience > Performance Summary**][2].
2. Click **New Application**.
3. Select **JS**, enter an application name, and click **Create New RUM Application**.
4. Copy the `applicationId` and `clientToken` values.

<div class="alert alert-info">If you store these in <code>.env.local</code>, prefix them with <code>NEXT_PUBLIC_</code> to expose them to the browser. See <a href="https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser" target="_blank">Next.js environment variables</a>.</div>

## Install the RUM SDK

Choose the section below that matches your Next.js routing setup (App Router or Page Router).

### App Router

**Note:** The [App Router][8] is available in Next.js v13+.

The App Router uses React Server Components by default. Since RUM must run in the browser, initialize it in a [Client Component][9].

{{< tabs >}}
{{% tab "npm" %}}

1. Install the RUM SDK:

   ```bash
   npm install @datadog/browser-rum
   ```

2. Create a client component for RUM initialization:

   {{< code-block lang="tsx" filename="components/datadog-init.tsx" disable_copy="false" >}}
   "use client";

   import { datadogRum } from "@datadog/browser-rum";

   datadogRum.init({
     applicationId: "<YOUR_APPLICATION_ID>",
     clientToken: "<CLIENT_TOKEN>",
     site: "datadoghq.com",
     service: "<SERVICE_NAME>",
     env: "<ENV_NAME>",
     sessionSampleRate: 100,
     sessionReplaySampleRate: 20,
     trackUserInteractions: true,
     trackResources: true,
     trackLongTasks: true,
   });

   export default function DatadogInit() {
     return null;
   }
   {{< /code-block >}}

3. Add the component to your [root layout][1]:

   {{< code-block lang="tsx" filename="app/layout.tsx" disable_copy="false" >}}
   import DatadogInit from "@/components/datadog-init";

   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html lang="en">
         <body>
           <DatadogInit />
           {children}
         </body>
       </html>
     );
   }
   {{< /code-block >}}

[1]: https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates

{{% /tab %}}
{{% tab "CDN" %}}

Use the Next.js `Script` component to load RUM from the CDN:

{{< code-block lang="tsx" filename="app/layout.tsx" disable_copy="false" >}}
import Script from "next/script";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Script id="datadog-rum">
        {`
          (function(h,o,u,n,d) {
            h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
            d=o.createElement(u);d.async=1;d.src=n
            n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
          })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js','DD_RUM')
          window.DD_RUM.onReady(function() {
            window.DD_RUM.init({
              clientToken: '<CLIENT_TOKEN>',
              applicationId: '<YOUR_APPLICATION_ID>',
              site: 'datadoghq.com',
              service: '<SERVICE_NAME>',
              env: '<ENV_NAME>',
              sessionSampleRate: 100,
              sessionReplaySampleRate: 20,
            });
          })
        `}
      </Script>
      <body>{children}</body>
    </html>
  );
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Pages Router

The [Pages Router][10] runs on the client, so you can initialize RUM directly in [`_app.tsx`][11].

{{< tabs >}}
{{% tab "npm" %}}

1. Install the RUM SDK:

   ```bash
   npm install @datadog/browser-rum
   ```

2. Initialize RUM in your custom App component:

   {{< code-block lang="tsx" filename="pages/_app.tsx" disable_copy="false" >}}
   import type { AppProps } from "next/app";
   import { datadogRum } from "@datadog/browser-rum";

   datadogRum.init({
     applicationId: "<YOUR_APPLICATION_ID>",
     clientToken: "<CLIENT_TOKEN>",
     site: "datadoghq.com",
     service: "<SERVICE_NAME>",
     env: "<ENV_NAME>",
     sessionSampleRate: 100,
     sessionReplaySampleRate: 20,
     trackUserInteractions: true,
     trackResources: true,
     trackLongTasks: true,
   });

   export default function App({ Component, pageProps }: AppProps) {
     return <Component {...pageProps} />;
   }
   {{< /code-block >}}

{{% /tab %}}
{{% tab "CDN" %}}

Use the Next.js `Script` component in your custom App:

{{< code-block lang="tsx" filename="pages/_app.tsx" disable_copy="false" >}}
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script id="datadog-rum">
        {`
          (function(h,o,u,n,d) {
            h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
            d=o.createElement(u);d.async=1;d.src=n
            n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
          })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js','DD_RUM')
          window.DD_RUM.onReady(function() {
            window.DD_RUM.init({
              clientToken: '<CLIENT_TOKEN>',
              applicationId: '<YOUR_APPLICATION_ID>',
              site: 'datadoghq.com',
              service: '<SERVICE_NAME>',
              env: '<ENV_NAME>',
              sessionSampleRate: 100,
              sessionReplaySampleRate: 20,
            });
          })
        `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Verify and deploy

1. Run your app locally and check the browser console for RUM initialization.
2. Deploy your changes. After deployment, view your [collected data][3] in [RUM dashboards][4].

## Backend monitoring

To connect RUM with your backend traces:

1. Set up [RUM and Traces][5] to correlate frontend and backend data.
2. Configure [OpenTelemetry support][6] if using APM.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://nextjs.org/
[2]: https://app.datadoghq.com/rum/performance-monitoring
[3]: /real_user_monitoring/application_monitoring/browser/data_collected/
[4]: /real_user_monitoring/platform/dashboards/
[5]: /real_user_monitoring/correlate_with_other_telemetry/apm/?tab=browserrum#setup-rum
[6]: /real_user_monitoring/correlate_with_other_telemetry/apm/?tab=browserrum#opentelemetry-support
[7]: https://vercel.com
[8]: https://nextjs.org/docs/app
[9]: https://nextjs.org/docs/app/building-your-application/rendering/client-components
[10]: https://nextjs.org/docs/pages
[11]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app
