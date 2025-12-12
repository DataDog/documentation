---
title: Metabase
description: 
further_reading:
  - link: '/data_observability/data_quality'
    tag: 'Documentation'
    text: 'Learn about Data Quality monitoring'
---

## Overview

Datadog's Metabase integration allows you to view end-to-end lineage across your Metabase environment. When Datadog connects, it:

Pulls metadata from your Metabase environment, including cards and dashboards
Automatically generates lineage between warehouse tables and columns and downstream Metabase cards, and between those cards and downstream dashboards

This metadata and lineage help data teams make changes to their data platform without breaking Metabase dashboards, and identify unused cards or dashboards.

## Connecting Metabase

### Prerequisites

This integration requires a Metabase Pro or Enterprise plan.

### Generate an API key

Follow these instructions to generate an API key in Metabase.

### Get DNS alias of Metabase (required for cloud instances only)

Log into your Metabase cloud instance as an administrator.
Click on the gear icon in the upper right corner.
Select Admin settings.
Go to the Settings tab.
Click on the Cloud tab from the left menu.
Click on Go to the Metabase Store.
Log into your Metabase Store using Metabase credentials.
Go to the Instances tab.
Click on DNS alias section to get the DNS alias value.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

