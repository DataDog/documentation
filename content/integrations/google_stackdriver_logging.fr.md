---
categories:
- cloud
- monitoring
- google cloud
ddtype: crawler
description: Track the size of logs ingested into Google Stackdriver.
doc_link: https://docs.datadoghq.com/integrations/google_stackdriver_logging/
git_integration_title: google_stackdriver_logging
has_logo: true
integration_title: Google Stackdriver Logging
is_public: true
kind: integration
manifest_version: '1.0'
name: google_stackdriver_logging
public_title: Datadog-Google Stackdriver Logging Integration
short_description: Track the size of logs ingested into Google Stackdriver.
version: '1.0'
---

## Overview
Stackdriver Logging allows you to store, search, analyze, monitor, and alert on log data and events from Google Cloud Platform.

Get metrics from Google Stackdriver Logging to:

* Visualize the performance of your Stackdriver logs
* Correlate the performance of your Stackdriver logs with your applications

## Setup
### Installation

If you haven't already, set up the [Google Cloud Platform integration first](https://docs.datadoghq.com/integrations/google_cloud_platform/). There are no other installation steps that need to be performed.

## Data Collected
### Metrics
{{< get-metrics-from-git "google_stackdriver_logging" >}}


### Events
The Google Stackdriver Logging integration does not include any event at this time.

### Service Checks
The Google Stackdriver Logging integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
