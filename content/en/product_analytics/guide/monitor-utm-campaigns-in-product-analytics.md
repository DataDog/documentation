---
title: How to Monitor UTM Campaigns in Product Analytics

description: Learn how to use Product Analytics & Session Replay to monitor the performance of UTM campaigns.
---

## Overview

Urchin Tracking Module (UTM) tracking is a parameter that can be added to a URL for tracking the performance of specific campaigns and identifying attribution paths for how visitors arrived on your website. This guide walks you through the types of UTM parameters Datadog Product Analytics collects and how you can use Product Analytics to monitor their use.

## Data collected

UTM campaigns are connected to [View][1] events in Product Analytics. The campaign data is collected automatically by the Browser SDK and can be viewed as facets in the Analytics Explorer. The UTM parameters Datadog collects can be defined as the following:

| Field                | Type   | Description                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | string | The parameter in the URL tracking the source of traffic. |
| `view.url_query.utm_medium`        | string | The parameter in the URL tracking the channel where the traffic is coming from.    |
| `view.url_query.utm_campaign`  | string | The paramter in the URL identifying the specific marketing campaign tied to that view.              |
| `view.url_query.utm_content`  | string | The parameter in the URL identifying the specific element a user clicked within a marketing campaign.           |
| `view.url_query.utm_term` | string | The parameter in the URL tracking the keyword a user searched to trigger a given campaign.             |

## Use cases

### Identify how users arrive at your site

To measure how users arrive at your site, you can use the '@view.url_query.utm_medium' facet. This facet shows different mediums such as social, organic, search, Google campaigns, or even specific events like a webinar. You can watch session replays from users who come to your website from different mediums and observe if any noticeable patterns occur between various groups.

### Track whether certain campaigns are higher traffic than others

{{< img src="real_user_monitoring/guide/UTM-campaign-tracking.png" alt="Screenshot of all views to a given campaign page" style="width:90%;">}}

As in the above query, you can count all views of a page, such as the landing page, where the campaign is running. This can help you understand if certain pages are getting more visits and you should increase advertising spend toward that specific page.

### Analyze a UTM source by country

{{< img src="real_user_monitoring/guide/UTM-by-country.png" alt="Screenshot of UTM source by country" style="width:90%;">}}

In this example, you can track the different sources of campaigns like advertisements versus organic traffic. You can then add an additional layer, like geography, to understand if viewership patterns change by country.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/guide/understanding-the-rum-event-hierarchy/#views
