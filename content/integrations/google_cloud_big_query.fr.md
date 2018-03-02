---
categories:
- cloud
- google cloud
- data store
ddtype: crawler
description: Track query count, execution times, uploaded bytes and rows, and more.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_big_query/
git_integration_title: google_cloud_big_query
has_logo: true
integration_title: Google BigQuery
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_big_query
public_title: Datadog-Google BigQuery Integration
short_description: Track query count, execution times, uploaded bytes and rows, and
  more.
version: '1.0'
---

## Overview
BigQuery is Google's fully managed, petabyte scale, low cost enterprise data warehouse for analytics.

Get metrics from Google BigQuery to:

* Visualize the performance of your BigQuery queries
* Correlate the performance of your BigQuery queries with your applications

## Setup
### Installation

If you haven't already, set up the [Google Cloud Platform integration first](https://docs.datadoghq.com/integrations/google_cloud_platform/). There are no other installation steps that need to be performed.

## Data Collected
### Metrics
{{< get-metrics-from-git "google_cloud_big_query" >}}


### Events
The Google BigQuery integration does not include any event at this time.

### Service Checks
The Google BigQuery integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
