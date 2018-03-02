---
categories:
- cloud
- google cloud
ddtype: crawler
description: Track min, max, and average function execution times.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_functions/
git_integration_title: google_cloud_functions
has_logo: true
integration_title: Google Cloud Functions
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_functions
public_title: Datadog-Google Cloud Functions Integration
short_description: Track min, max, and average function execution times.
version: '1.0'
---

## Overview
Google Cloud Functions is a lightweight, event-based, asynchronous compute solution that allows you to create small, single-purpose functions.

Get metrics from Google Functions to:

* Visualize the performance of your Functions
* Correlate the performance of your Functions with your applications

## Setup
### Installation

If you haven't already, set up the [Google Cloud Platform integration first](https://docs.datadoghq.com/integrations/google_cloud_platform/). There are no other installation steps that need to be performed.

## Data Collected
### Metrics
{{< get-metrics-from-git "google_cloud_functions" >}}


### Events
The Google Cloud Functions integration does not include any event at this time.

### Service Checks
The Google Cloud Functions integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
