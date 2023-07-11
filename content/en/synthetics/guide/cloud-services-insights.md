---
title: Cloud Services Insights
kind: guide
further_reading:
    - link: https://datadoghq.com/blog/static-web-application-monitoring-best-practices
      tag: 'Blog'
      text: 'Best practices for monitoring static web applications'
    - link: 'synthetics/browser_tests'
      tag: 'Documentation'
      text: 'Configure a Browser Test'

---

## Overview

Content Delivery Networks (CDNs) are paramount in the delivery of assets (images, videos, CSS/JS files, webpages) online.
Yet failures can happen leading thousands of end users with a terrible experience, and your Synthetics tests to fail.
Datadog detects and indicates CDN service disruptions in-context with your impacted Synthetics tests, allowing you to know the origin of the issue (is it my CDN causing my test to fail?) in seconds.

{{< img src="synthetics/guide/cloud-services-insights/watchdog_banner.png" alt="CDN service disruption banner" >}}

## CDN service disruption
Datadog collects, aggregates, and anonymises data to detect CDN service disruptions.

With that, you can:
1. See when the disruption started and ended (or it is still ongoing)
2. Have a look at your Synthetics HTTP tests impacted by this performance degradation, and
2. Contact your CDN provider with transactions IDs of tests, that experienced this disruption.

{{< img src="synthetics/guide/cloud-services-insights/watchdog_insights.png" alt="CDN service disruption insights" >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests?tab=requestoptions#create-local-variables 
[2]: /synthetics/api_tests/http_tests
