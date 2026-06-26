---
title: RUM Recommendations
description: "Get AI-powered recommendations to improve your application's frontend performance, availability, and reliability based on RUM and APM data analysis."
private: true
aliases:
  - /real_user_monitoring/browser/optimizing_performance/recommendations/
further_reading:
  - link: "https://www.datadoghq.com/blog/rum-optimization/"
    tag: "Blog"
    text: "From data to action: Optimize Core Web Vitals and more with Datadog RUM"
---

{{< callout url="https://www.datadoghq.com/product-preview/rum-recommendations/" header="Join the Preview!">}}
  RUM Recommendations is in Preview.
{{< /callout >}}

## Overview

RUM Recommendations highlight opportunities to improve your application's frontend availability, performance, and reliability. Each view in your application has its own set of recommendations, available from the [Optimization page][2].

{{< img src="real_user_monitoring/browser/optimizing_performance/rum-recommendations-overview.mp4" alt="Reviewing a RUM recommendation by Bits AI to review a session replay and alleviate user frustration." video="true">}}

Recommendations enable you to:
- **Detect** an issue, such as a slow HTTP request or slow initial page loading time
- **Assess priority** based on the issue's description and number of impacted events and users 
- **Fix** the issue with suggested code changes

## How it works

Datadog analyzes RUM and APM data to generate recommendations for enhancing the availability, performance, and stability of your application's frontend. A severity indicator is calculated for each recommendation, highlighting the most impactful areas to focus on. A recommendation's severity is determined by the number of impacted events and users.

After the recommendation has been addressed, you can mark it as resolved. Recommendations are automatically resolved if they are no longer detected upon a new application version deployment.

## Recommendation Types

The table below outlines the available RUM recommendation types. Only applications that have the Browser SDK installed and use [RUM Without Limits][1] are supported. 

| Recommendation Type | Description |
|---------------------|-------------|
| Frustration signal on page element | Users are clicking on a static element that produces no action on the page. |
| Improve initial page load time by reducing bundle size | A large JavaScript bundle is impacting the initial load and paint of the page. |


[1]: /real_user_monitoring/rum_without_limits/
[2]: https://app.datadoghq.com/rum/optimization