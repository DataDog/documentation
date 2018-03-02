---
categories:
- cloud
- data store
- google cloud
ddtype: crawler
description: Track database metrics for performance, health, and replication.
doc_link: https://docs.datadoghq.com/integrations/google_cloudsql/
git_integration_title: google_cloudsql
has_logo: true
integration_title: Google CloudSQL
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloudsql
public_title: Datadog-Google CloudSQL Integration
short_description: Track database metrics for performance, health, and replication.
version: '1.0'
---

## Overview
Google Cloud SQL is a fully-managed database service that makes it easy to set up, maintain, manage, and administer your MySQL databases in the cloud.

Get metrics from Google CloudSQL to:

* Visualize the performance of your CloudSQL databases
* Correlate the performance of your CloudSQL databases with your applications

## Setup
### Installation

If you haven't already, set up the [Google Cloud Platform integration first](https://docs.datadoghq.com/integrations/google_cloud_platform/). There are no other installation steps that need to be performed.

## Data Collected
### Metrics
{{< get-metrics-from-git "google_cloudsql" >}}


### Events
The Google Cloud SQL integration does not include any event at this time.

### Service Checks
The Google Cloud SQL integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
