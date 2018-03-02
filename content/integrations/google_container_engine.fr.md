---
categories:
- cloud
- containers
- google cloud
ddtype: crawler
description: Monitor your GCE containers' resource usage.
doc_link: https://docs.datadoghq.com/integrations/google_container_engine/
git_integration_title: google_container_engine
has_logo: true
integration_title: Google Container Engine
is_public: true
kind: integration
manifest_version: '1.0'
name: google_container_engine
public_title: Datadog-Google Container Engine Integration
short_description: Monitor your GCE containers' resource usage.
version: '1.0'
---

## Overview
Google Container Engine is a powerful cluster manager and orchestration system for running your Docker containers.

Get metrics from Google Container Engine to:

* Visualize the performance of your Container Engine containers
* Correlate the performance of your Container Engine containers with your applications

## Setup
### Installation

If you haven't already, set up the [Google Cloud Platform integration first](https://docs.datadoghq.com/integrations/google_cloud_platform/). There are no other installation steps that need to be performed.

## Data Collected
### Metrics
{{< get-metrics-from-git "google_container_engine" >}}


### Events
The Google Container Engine integration does not include any event at this time.

### Service Checks
The Google Container Engine integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
