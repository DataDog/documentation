---
title: Watchdog Impact Analysis
kind: Documentation
---

## Overview

Whenever Watchdog finds a new APM anomaly, it simultaneously analyzes a variety of latency and error metrics that are submitted from the RUM SDKs to evaluate if the anomaly is adversely impacting any web or mobile pages visited by your users. 

If Watchdog determines that the end-user experience is impacted, it provides a summary of the impacts in Watchdog APM Alert. This includes:

- A list of impacted RUM views
- An estimated number of impacted users
- A link to the list of impacted users, so that you can reach out to them, if needed. 

{{< img src="watchdog/watchdog_impact_analysis.png" alt="Watchdog Impact Analysis"  style="width:75%;">}}

This feature is automatically enabled for all APM and RUM users. Whenever Watchdog APM alerts are associated with end-user impacts, affected **users** and **view paths** appear in the **Impacts** section of your Watchdog alerts. Click **users** to view the affected users’ contact information if you need to reach out to them. Click **view paths** to access the impacted RUM views for additional information.