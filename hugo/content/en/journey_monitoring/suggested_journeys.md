---
title: Suggested Journeys
description: Create journeys from suggestions based on user activity in your frontend applications.
aliases:
- /journey_monitoring/map/suggested_journeys/
further_reading:
- link: '/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about Journey Monitoring'
- link: '/journey_monitoring/map/'
  tag: 'Documentation'
  text: 'Learn about the map'
- link: '/journey_monitoring/configuring_journeys/'
  tag: 'Documentation'
  text: 'Configure journeys'
---

## Overview

Every Wednesday at midnight UTC, Datadog analyzes the previous 30 days of [page views and clicks][3] from frontend applications. Based on this activity, Datadog generates suggested journeys that include:

- A journey name
- A journey description
- A start event
- An end event

Select a suggested journey from the [map][1] or [catalog][2] to open the [journey creation page][4]. Datadog populates the name, description, start event, and end event. Review these fields before you create the journey. If you dismiss a suggested journey, it does not appear again.

<div class="alert alert-warning"><p>Suggested journeys do not appear if your organization has opted out of applied AI experiences.</p></div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /journey_monitoring/map/
[2]: /journey_monitoring/overview/#journey-catalog
[3]: /product_analytics/data_collected/
[4]: /journey_monitoring/configuring_journeys/#choose-a-creation-method
