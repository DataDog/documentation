---
git_integration_title: google_cloud_platform
integration_title: Google Cloud Platform
kind: integration
placeholder: true
title: Datadog-Google Cloud Platform Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

## Overview

Connect to Google Cloud Platform to see all your Google Compute Engine (GCE) hosts in Datadog. You'll see your hosts in the infrastructure overview in Datadog and be able to sort through them easily, since Datadog automatically tags them with GCE host tags and any GCP labels you've added.

Related integrations include:

|||
|-------------|-------------|
| [App Engine](/integrations/google_app_engine) | platform as a service to build scalable applications |
| [Big Query](/integrations/google_cloud_big_query) | enterprise data warehouse |
| [CloudSQL](/integrations/google_cloudsql) | MySQL database service |
| [Compute Engine](/integrations/google_compute_engine) | high performance virtual machines |
| [Container Engine](/integrations/google_container_engine) | kubernetes, managed by google |
| [Datastore](/integrations/google_cloud_datastore) | NoSQL database |
| [Firebase](/integrations/google_cloud_firebase) | mobile platform for application development |
| [Functions](/integrations/google_cloud_functions) | A serverless platform for building event-based microservices |
| [Machine Learning](/integrations/google_cloud_ml) | machine learning services |
| [Pub/Sub](/integrations/google_cloud_pubsub) | real-time messaging service |
| [Spanner](/integrations/google_cloud_spanner) | horizontally scalable, globally consistent, relational database service |
| [Stackdriver Logging](/integrations/google_stackdriver_logging) | real-time log management and analysis  |
| [Storage](/integrations/google_cloud_storage) | unified object storage |
| [VPN](/integrations/google_cloud_vpn) | managed network functionality |

## Setup
### Installation

From the Integrations page in the Datadog app, select the Google Cloud Platform tile. Switch to the **Configuration** tab and click the **Sign in with Google** button. After you allow access enter the email associated with the account and the Project you wish to monitor. Enter the Project ID for each project. The Project ID is the multi-word id and not the Project Number.

To configure the GCP integration, you need these permissions:

~~~
https://www.googleapis.com/auth/compute.readonly
https://www.googleapis.com/auth/monitoring.read
~~~

[Also, billing must be enabled for the account(s) you wish to monitor.][1]

Optionally, you can limit the GCE instances that are pulled into Datadog by entering tags in the **Limit Metric Collection** textbox. Only hosts that match one of the defined tags will be imported into Datadog. You can use wildcards ('?' for single character, '*' for multi-character) to match many hosts, or '!' to exclude certain hosts. This example includes all c1* sized instances, but excludes staging hosts:

~~~
datadog:monitored,env:production,!env:staging,instance-type:c1.*
~~~

{{< img src="integrations/google_cloud_platform/GCPSetup.png" alt="settings" >}}

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

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
