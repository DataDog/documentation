---
title: Monitor Your Next.js App With RUM
kind: guide
description: Guide for monitoring Next.js applications with RUM.
further_reading:
- link: '/monitors/create/types/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM Monitors'
---

## Overview

[Next.js][1] is a JavaScript framework created by [Vercel][8] that is used to create React.js web pages and Node.js APIs. You can integrate Next.js with RUM to monitor your frontend and backend applications for browser-related metrics that you give insight into performance and user behavior.

## Setup

Follow the steps below to set up Datadog RUM browser monitoring.

### Create an application

1. Navigate to **[Digital Experience > Performance Summary][2]**.
2. Click the **New Application** button.
3. Make sure JS is selected, then enter a name for your application and click **Create New RUM Application**. A `clientToken` and `applicationId` are automatically generated for your application.

<div class="alert alert-info">When using `.env.local`, only variables prefixed with `NEXT_PUBLIC_` are included in the client bundle. See <a href="https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser" target="_blank">Bundling Environment Variables for the Browser</a> in the Next.js docs.</div>

### Instrument your application

1. Choose your instrumentation type, then copy and paste the code snippet from the Datadog RUM UI into the appropriate file based on the instrumentation type.

   {{< tabs >}}
   {{% tab "npm" %}}

   When using npm, you need to make a few small changes to the code snippet from the Datadog RUM UI before pasting it into either the root `layout.tsx` or custom `_app.tsx` file (Datadog supports both):

   - If your application relies on the **newer** Next.js [App Router][1] (versions 13+), Datadog recommends using the CDN RUM instrumentation to ensure that the RUM initialization occurs in the client. If you want to use the npm package, the initialization code must run in a [client component][5] so RUM can collect telemetry from the client. You can achieve this without making your [`layout.tsx`][2] file itself a client component by following the example below to create an empty `<DatadogInit />` component with the RUM initialization code, and then rendering that `<DatadogInit />` component in your `layout.tsx`.
   - If your Next.js application relies on the **older** Next.js [Page Router][3], you can paste the initialization snippet into the custom [`_app.tsx`][4] file without the `"use client"` directive and without a separate `<DatadogInit />` component.

   {{< code-block lang="javascript" filename="datadog-init.tsx" disable_copy="false" collapsible="true" >}}
   // Necessary if using App Router to ensure this file runs on the client
   "use client";
    
    import { datadogRum } from "@datadog/browser-rum";
    
    datadogRum.init({
      applicationId: "<YOUR_APPLICATION_ID>",
      clientToken: "<CLIENT_TOKEN>",
      site: "datadoghq.com",
      service: "<SERVICE_NAME>",
      env: "<ENV_NAME>",
      // Specify a version number to identify the deployed version of your application in Datadog
      // version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
      // Specify URLs to propagate trace headers for connection between RUM and backend trace
      allowedTracingUrls: [
        { match: "https://example.com/api/", propagatorTypes: ["tracecontext"] },
      ],
    });
    
    export default function DatadogInit() {
      // Render nothing - this component is only included so that the init code
      // above will run client-side
      return null;
    }
   {{< /code-block >}}
   
   {{< code-block lang="javascript" filename="layout.tsx or _app.tsx" disable_copy="false" collapsible="true" >}}
    import DatadogInit from "@/components/datadog-init";

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
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

   [1]: https://nextjs.org/docs/app
   [2]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [3]: https://nextjs.org/docs/pages
   [4]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [5]: https://nextjs.org/docs/app/building-your-application/rendering/client-components#using-client-components-in-nextjs

   {{% /tab %}}
   {{% tab "CDN async" %}}

   When using CDN async, you need to make a few small changes to the code snippet from the Datadog RUM UI before pasting it into either the root `layout.tsx` or custom `_app.tsx` file (Datadog supports both):

   - If your application relies on the **newer** Next.js [App Router][1] (versions 13+), paste the snippet into the root [`layout.tsx`][2] file.
   - If your Next.js application relies on the **older** Next.js [Page Router][3], paste the snippet into the custom [`_app.tsx`][4] file.
   - The Next.js external scripts need to be loaded like in [this page][5].

   **Note**: The Next.js scripts include import and export lines, and includes curly braces and backticks between the `Script id`, where all instances of `Script` are in uppercase.

   {{< code-block lang="javascript" filename="layout.tsx or _app.tsx" disable_copy="false" collapsible="true" >}}

   import Script from "next/script";

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <Script id="datadog-rum">
           {`
             (function(h,o,u,n,d) {
               h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
               d=o.createElement(u);d.async=1;d.src=n
               n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
             })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js','DD_RUM')
             window.DD_RUM.onReady(function() {
               window.DD_RUM.init({
                 clientToken: '<CLIENT_TOKEN>',
                 applicationId: '<YOUR_APPLICATION_ID>',
                 site: 'datadoghq.com',
                 service: 'next-app-router-rum',
                 env: '<ENV_NAME>',
                 // Specify a version number to identify the deployed version of your application in Datadog
                 // version: '1.0.0',
                 sessionSampleRate: 100,
                 sessionReplaySampleRate: 100,
                 trackUserInteractions: true,
                 trackResources: true,
                 trackLongTasks: true,
               });
             })
           `}
         </Script>
         <body>{children}</body>
       </html>
     );
   }

   {{< /code-block >}}

   [1]: https://nextjs.org/docs/app
   [2]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [3]: https://nextjs.org/docs/pages
   [4]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy

   {{% /tab %}}
   {{% tab "CDN sync" %}}

   When using CDN sync, you need to make a few small changes to the code snippet from the Datadog RUM UI before pasting it into either the root `layout.tsx` or custom `_app.tsx` file (Datadog supports both):

   - If your application relies on the **newer** Next.js [App Router][1] (versions 13+), paste the snippet into the root [`layout.tsx`][2] file.
   - If your Next.js application relies on the **older** Next.js [Page Router][3], paste the snippet into the custom [`_app.tsx`][4] file.
   - The Next.js external scripts need to be loaded like in [this page][5].

   **Note**: The Next.js scripts include import and export lines, and includes curly braces and backticks between the `Script id`, where all instances of `Script` are in uppercase.

   {{< code-block lang="javascript" filename="layout.tsx or _app.tsx" disable_copy="false" collapsible="true" >}}

   import Script from "next/script";

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <body>
           <Script
             id="dd-rum-sync"
             src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum.js"
             type="text/javascript"
             strategy="beforeInteractive"
           />
           <Script id="datadog-rum">
             {`
               window.DD_RUM && window.DD_RUM.init({
                 clientToken: '<CLIENT_TOKEN>',
                 applicationId: '<YOUR_APPLICATION_ID>',
                 site: 'datadoghq.com',
                 service: 'rum-cdn-async',
                 env: '<ENV_NAME>',
                 // Specify a version number to identify the deployed version of your application in Datadog
                 // version: '1.0.0',
                 sessionSampleRate: 100,
                 sessionReplaySampleRate: 100,
                 trackUserInteractions: true,
                 trackResources: true,
                 trackLongTasks: true,
               });
             `}
           </Script>
           {children}
         </body>
       </html>
     );
   }

   {{< /code-block >}}

   [1]: https://nextjs.org/docs/app
   [2]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [3]: https://nextjs.org/docs/pages
   [4]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy

   {{% /tab %}}
   {{< /tabs >}}

3. Follow the in-app steps to verify your installation.
4. Deploy the changes to your application. Once your deployment is live, Datadog collects events from user browsers.
5. You can visualize the [data collected][3] in your Next.js application using [dashboards][4].

## Backend monitoring

To start backend monitoring of your Next.js applications:

1. Follow the browser setup steps for [Connecting RUM and Traces][6].
2. Follow the browser setup steps for [OpenTelemetry support][7] to connect with APM.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://nextjs.org/
[2]: https://app.datadoghq.com/rum/performance-monitoring?_gl=1*il22i*_gcl_aw*R0NMLjE2OTAzMDM5MzcuQ2owS0NRanc1ZjJsQmhDa0FSSXNBSGVUdmxqb3ZQX1YyMFRsV1o1UlJLVHNUNHNITll2ZEJ0bTZONnlxdVM1X3lzY2NOejE4QzVON1ktOGFBcHpYRUFMd193Y0I.*_gcl_au*MjMxOTI4ODMzLjE2OTAyMjI1NTA.*_ga*MTIwMTk2NTA5Ny4xNjY2NzEzMjY2*_ga_KN80RDFSQK*MTY5MTc5ODE4OS4xMzYuMS4xNjkxNzk4NTQyLjAuMC4w*_fplc*RnA3SEVTb1BoTG9ndDI0OFQ5TERxRWRtMjNwTWVrTWZ3VGNGeWRaYm9HRkpJSXBxVHdVdFNTcURCWW1rZENHUldmU2EyTzhtZ3NXVzRUR0JUTzRnSGdPeGRkVVpWYVA5V0x4JTJGeTFRNWo5djNqYmNwQnJpckdHUU93M08xU3clM0QlM0Q
[3]: /real_user_monitoring/browser/data_collected/
[4]: /real_user_monitoring/platform/dashboards/
[5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy
[6]: /real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum#setup-rum
[7]: /real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum#opentelemetry-support
[8]: https://vercel.com
