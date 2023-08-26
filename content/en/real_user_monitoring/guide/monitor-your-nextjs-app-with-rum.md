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
[Next.js][1] is a JavaScript framework that is used to create React.js web pages and Node.js APIs. You can integrate Next.js with RUM to monitor your frontend applications for browser-related metrics that you give insight into performance and user behavior.

## Setup

Follow the steps below to set up Datadog RUM browser monitoring.

### Create a new application

1. Navigate to **[UX Monitoring > Real User Monitoring][2]**.
2. Click the **New Application** button.
3. Make sure JS is selected, then enter a name for your application and click **Create New RUM Application**. A `clientToken` and `applicationId` are automatically generated for your application.

### Instrument your application

1. Choose your instrumentation type, then copy and paste the code snippet from the Datadog RUM UI into the appropriate file based on the instrumentation type.

   {{< tabs >}}
   {{% tab "NPM" %}}

   If using NPM, you can copy and paste the code snippet from the Datadog RUM UI into either of the following:

   - The root [`layout.tsx`][1] file (if using the newer [Next.js app router][2])
   - A custom [`_app.tsx`][3] file (if using the older [Next.js page router][4])

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
       applicationId: '31b0622e-a300-4b17-80b4-ddbe30d2df96',
       clientToken: 'pub0795dd9f6b8d272bec96d5d6b1442776',
       site: 'datadoghq.com',
       service:'nextjs-test',
       env:'<ENV_NAME>',
       // Specify a version number to identify the deployed version of your application in Datadog 
       // version: '1.0.0', 
       sessionSampleRate:100,
       sessionReplaySampleRate: 20,
       trackUserInteractions: true,
       trackResources: true,
       trackLongTasks: true,
       defaultPrivacyLevel:'mask-user-input'
   });
       
   datadogRum.startSessionReplayRecording();
   ```

   [1]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [2]: https://nextjs.org/docs/app
   [3]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [4]: https://nextjs.org/docs/pages

   {{% /tab %}}
   {{% tab "CDN async" %}}

   If using CDN async, you need to make a few small changes to the code snippet from the Datadog RUM UI, then paste it into either of the following:

   - The root [`layout.tsx`][1] file (if using the newer [Next.js app router][2])
   - A custom [`_app.tsx`][3] file (if using the older [Next.js page router][4])

   
   The Next.js external scripts need to be loaded like in [this page][5]. 

   ```javascript
      // Paste the CDN async snippet here without first <script> and last </script> lines like below

      import Script from 'next/script'
       
      function Home() {
        return (
          <div className="container">
            <Script id="datadog-rum">

            (function(h,o,u,n,d) {
              h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
              d=o.createElement(u);d.async=1;d.src=n
              n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
            })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js','DD_RUM')
            window.DD_RUM.onReady(function() {
              window.DD_RUM.init({
                clientToken: 'pub0795dd9f6b8d272bec96d5d6b1442776',
                applicationId: '31b0622e-a300-4b17-80b4-ddbe30d2df96',
                site: 'datadoghq.com',
                service: 'nextjs-test',
                env: '<ENV_NAME>',
                // Specify a version number to identify the deployed version of your application in Datadog 
                // version: '1.0.0', 
                sessionSampleRate: 100,
                sessionReplaySampleRate: 20,
                trackUserInteractions: true,
                trackResources: true,
                trackLongTasks: true,
                defaultPrivacyLevel: 'mask-user-input',
              });

              window.DD_RUM.startSessionReplayRecording();
            })

            </Script>
                </div>
              )
            }
             
            export default Home
   ```

   [1]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [2]: https://nextjs.org/docs/app
   [3]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [4]: https://nextjs.org/docs/pages
   [5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy

   {{% /tab %}}
   {{% tab "CDN sync" %}}

   ```javascript
      // Paste the CDN sync snippet here without first <script> and last </script> lines like below

      import Script from 'next/script'
       
      function Home() {
        return (
          <div className="container">
            <Script id="datadog-rum">

            <script
                src="https://www.datadoghq-browser-agent.com/us1/v4/datadog-rum.js"
                type="text/javascript">
            </script>

                window.DD_RUM && window.DD_RUM.init({
                  clientToken: 'pub0795dd9f6b8d272bec96d5d6b1442776',
                  applicationId: '31b0622e-a300-4b17-80b4-ddbe30d2df96',
                  site: 'datadoghq.com',
                  service: 'nextjs-test',
                  env: '<ENV_NAME>',
                  // Specify a version number to identify the deployed version of your application in Datadog 
                  // version: '1.0.0', 
                  sessionSampleRate: 100,
                  sessionReplaySampleRate: 20,
                  trackUserInteractions: true,
                  trackResources: true,
                  trackLongTasks: true,
                  defaultPrivacyLevel: 'mask-user-input',
                });

                window.DD_RUM &&
                window.DD_RUM.startSessionReplayRecording();

            </Script>
                </div>
              )
            }
             
            export default Home
   ```

   [1]: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
   [2]: https://nextjs.org/docs/app
   [3]: https://nextjs.org/docs/pages/building-your-application/routing/custom-app#usage
   [4]: https://nextjs.org/docs/pages
   [5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy

   {{% /tab %}}
   {{< /tabs >}}

2. Follow the in-app steps to verify your installation.
3. In your `.env.local` file, prefix the update the `applicationId: process.env.DATADOG_APPLICATION_ID` variable to include `NEXT_PUBLIC_` like below:
   `applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID`

   This is an important step for exposing the variable to the browser and loading it into the Node.js environment automatically, which doesn't occur by default.
4. Deploy the changes to your application. Once your deployment is live, Datadog collects events from user browsers.
5. You can now visualize the [data collected][3] in your Next.js application using [dashboards][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://nextjs.org/
[2]: https://app.datadoghq.com/rum/performance-monitoring?_gl=1*il22i*_gcl_aw*R0NMLjE2OTAzMDM5MzcuQ2owS0NRanc1ZjJsQmhDa0FSSXNBSGVUdmxqb3ZQX1YyMFRsV1o1UlJLVHNUNHNITll2ZEJ0bTZONnlxdVM1X3lzY2NOejE4QzVON1ktOGFBcHpYRUFMd193Y0I.*_gcl_au*MjMxOTI4ODMzLjE2OTAyMjI1NTA.*_ga*MTIwMTk2NTA5Ny4xNjY2NzEzMjY2*_ga_KN80RDFSQK*MTY5MTc5ODE4OS4xMzYuMS4xNjkxNzk4NTQyLjAuMC4w*_fplc*RnA3SEVTb1BoTG9ndDI0OFQ5TERxRWRtMjNwTWVrTWZ3VGNGeWRaYm9HRkpJSXBxVHdVdFNTcURCWW1rZENHUldmU2EyTzhtZ3NXVzRUR0JUTzRnSGdPeGRkVVpWYVA5V0x4JTJGeTFRNWo5djNqYmNwQnJpckdHUU93M08xU3clM0QlM0Q
[3]: /real_user_monitoring/browser/data_collected/
[4]: /real_user_monitoring/dashboards/
[5]: https://nextjs.org/docs/messages/next-script-for-ga#using-analyticsjs-legacy