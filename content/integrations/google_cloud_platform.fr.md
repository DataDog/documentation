---
categories:
- cloud
- google cloud
ddtype: crawler
description: Collect a wealth of GCP metrics and visualize your instances in a host
  map.
doc_link: https://docs.datadoghq.com/integrations/google_cloud_platform/
git_integration_title: google_cloud_platform
has_logo: true
integration_title: Google Cloud Platform
is_public: true
kind: integration
manifest_version: '1.0'
name: google_cloud_platform
public_title: Datadog-Google Cloud Platform Integration
short_description: Collect a wealth of GCP metrics and visualize your instances in
  a host map.
version: '1.0'
---

## Overview

Connect to Google Cloud Platform to see all your Google Compute Engine (GCE) hosts in Datadog. You'll see your hosts in the infrastructure overview in Datadog and be able to sort through them easily, since Datadog automatically tags them with GCE host tags and any GCP labels you've added.

Related integrations include:

|||
|-------------|-------------|
| [App Engine](https://docs.datadoghq.com/integrations/google_app_engine) | platform as a service to build scalable applications |
| [Big Query](https://docs.datadoghq.com/integrations/google_cloud_big_query) | enterprise data warehouse |
| [CloudSQL](https://docs.datadoghq.com/integrations/google_cloudsql) | MySQL database service |
| [Compute Engine](https://docs.datadoghq.com/integrations/google_compute_engine) | high performance virtual machines |
| [Container Engine](https://docs.datadoghq.com/integrations/google_container_engine) | kubernetes, managed by google |
| [Datastore](https://docs.datadoghq.com/integrations/google_cloud_datastore) | NoSQL database |
| [Firebase](https://docs.datadoghq.com/integrations/google_cloud_firebase) | mobile platform for application development |
| [Functions](https://docs.datadoghq.com/integrations/google_cloud_functions) | A serverless platform for building event-based microservices |
| [Machine Learning](https://docs.datadoghq.com/integrations/google_cloud_ml) | machine learning services |
| [Pub/Sub](https://docs.datadoghq.com/integrations/google_cloud_pubsub) | real-time messaging service |
| [Spanner](https://docs.datadoghq.com/integrations/google_cloud_spanner) | horizontally scalable, globally consistent, relational database service |
| [Stackdriver Logging](https://docs.datadoghq.com/integrations/google_stackdriver_logging) | real-time log management and analysis  |
| [Storage](https://docs.datadoghq.com/integrations/google_cloud_storage) | unified object storage |
| [VPN](https://docs.datadoghq.com/integrations/google_cloud_vpn) | managed network functionality |

## Setup
### Installation

The Datadog <> Google Cloud integration uses Service Accounts to create an API connection between Google Cloud and Datadog. Below are instructions for creating the service account and providing Datadog the service account credentials to begin making API calls on your behalf.

1. Navigate to [Google Cloud credentials page](https://console.cloud.google.com/apis/credentials) for the Google Cloud project you would like to setup the Datadog integration
2. Press *Create credentials* and then select *Service account key*

    {{< img src="integrations/google_cloud_platform/SelectServiceAccount.png" alt="settings" responsive="true" popup="true">}}

3. In the *Service account* dropdown, select *New service account*
4. Give the service account a unique name
5. For *Role*, select *Compute engine —> Compute Viewer* and *Monitoring —> Monitoring Viewer*

    Note, these roles allow us to collect metrics, tags, events, and GCE labels on your behalf.

6. Select *JSON* as the key type, and press create
7. Take note where this file is saved, as it is needed to complete the integration
8. Navigate to the [Datadog Google Cloud Integration tile](http://app.datadoghq.com/account/settings#integrations/google_cloud_platform)
8. Select *Upload Key File* to integrate this project with Datadog
9. Optionally, you can use tags to filter out hosts from being included in this integration. Detailed instructions on this can be found [below](#configuration)

    {{< img src="integrations/google_cloud_platform/ServiceAccountAdded.png" alt="settings" responsive="true" popup="true">}}

10. Press *Install/Update*
11. For each project you want to monitor, repeat this process

[Please note that Google Cloud billing must be enbled for the project(s) you wish to monitor.][1]

### Configuration

Optionally, you can limit the GCE instances that are pulled into Datadog by entering tags in the **Limit Metric Collection** textbox. Only hosts that match one of the defined tags will be imported into Datadog. You can use wildcards ('?' for single character, '**' for multi-character) to match many hosts, or '!' to exclude certain hosts. This example includes all c1* sized instances, but excludes staging hosts:

~~~
datadog:monitored,env:production,!env:staging,instance-type:c1.*
~~~


## Data Collected
### Metrics
{{< get-metrics-from-git "google_cloud_platform" >}}


### Events
The Google Cloud Platform integration does not include any event at this time.

### Service Checks
The Google Cloud Platform integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
### Knowledge Base
#### Tags Assigned

Tags are automatically assigned based on a variety of configuration options with regards to Google Cloud Platform and the Google Compute Engine. The following tags will be automatically assigned:

* Zone
* Instance-type
* Instance-id
* Automatic-restart
* On-host-maintenance
* Project
* Numeric_project_id
* Name

Also, any hosts with `<key>:<value>` labels get tagged with them.

[1]: https://support.google.com/cloud/answer/6293499?hl=en

