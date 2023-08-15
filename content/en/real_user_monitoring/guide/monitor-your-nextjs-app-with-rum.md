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

To set up Datadog RUM browser monitoring:

1. Navigate to **[UX Monitoring > Real User Monitoring][2]**.
2. Click the **New Application** button.
3. Make sure JS is selected, then enter a name for your application and click **Create New RUM Application**. A `clientToken` and `applicationId` are automatically generated for your application.
4. Instrument your application through [npm][3], [CDN async][4], or [CDN sync][5].
5. Follow the in-app steps to verify your installation.
6. Deploy the changes to your application. Once your deployment is live, Datadog collects events from user browsers.
7. In your `.env.local` file, prefix the update the `applicationId: process.env.DATADOG_APPLICATION_ID` variable to include `NEXT_PUBLIC_` like below:
   `applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID`

   This is an important step for exposing the variable to the browser and loading it into the Node.js environment automatically, which doesn't occur by default.
8. You can now visualize the [data collected][6] in your Next.js application using [dashboards][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://nextjs.org/
[2]: https://app.datadoghq.com/rum/performance-monitoring?_gl=1*il22i*_gcl_aw*R0NMLjE2OTAzMDM5MzcuQ2owS0NRanc1ZjJsQmhDa0FSSXNBSGVUdmxqb3ZQX1YyMFRsV1o1UlJLVHNUNHNITll2ZEJ0bTZONnlxdVM1X3lzY2NOejE4QzVON1ktOGFBcHpYRUFMd193Y0I.*_gcl_au*MjMxOTI4ODMzLjE2OTAyMjI1NTA.*_ga*MTIwMTk2NTA5Ny4xNjY2NzEzMjY2*_ga_KN80RDFSQK*MTY5MTc5ODE4OS4xMzYuMS4xNjkxNzk4NTQyLjAuMC4w*_fplc*RnA3SEVTb1BoTG9ndDI0OFQ5TERxRWRtMjNwTWVrTWZ3VGNGeWRaYm9HRkpJSXBxVHdVdFNTcURCWW1rZENHUldmU2EyTzhtZ3NXVzRUR0JUTzRnSGdPeGRkVVpWYVA5V0x4JTJGeTFRNWo5djNqYmNwQnJpckdHUU93M08xU3clM0QlM0Q
[3]: /real_user_monitoring/browser/#npm
[4]: /real_user_monitoring/browser/#cdn-async
[5]: /real_user_monitoring/browser/#cdn-sync
[6]: /real_user_monitoring/browser/data_collected/
[7]: /real_user_monitoring/dashboards/