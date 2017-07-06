---
title: Datadog-Google Cloud Platform Integration
integration_title: Google Cloud Platform
kind: integration
git_integration_title: google_cloud_platform
---

### Overview

Connect to Google Cloud Platform to:

* See your Google Compute Engine hosts in the infrastructure overview
* Import your Google Compute Engine host tags
* Tag your Google Compute Engine hosts with additional compute-specific metadata (e.g. zone)

Related integrations include:

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
{:.table}

### Installation

From the Integrations page in the Datadog app, select the Google Cloud Platform tile. Switch to the **Configuration** tab and click the **Sign in with Google** button. After you allow access enter the email associated with the account and the Project you wish to monitor. Enter the Project ID for each project. The Project ID is the multi-word id and not the Project Number.

We require the user who configures the integration to have the permissions:  

~~~
https://www.googleapis.com/auth/compute.readonly
https://www.googleapis.com/auth/monitoring.read
~~~

[Billing must also be enbled for the account(s) you wish to monitor.][1]


Optionally, you can limit the GCE instances that are pulled into Datadog by entering tags in the "Limit Metric Collection" textbox. Only hosts that match one of the defined tags will be imported into Datadog. Wildcards, such as '?' (for single characters) and '*' (for multiple characters) can also be used. Host matching a given tag can also be excluded by adding '!' before the tag.

~~~
e.x. datadog:monitored,env:production,!env:staging,instance-type:c1.*
~~~

![settings](/static/images/GCPSetup.png)

**NOTE: `gcp.loadbalancing.*` metrics are available as part of a Google specifc Beta. To see these metrics in Datadog, please contact your Google representative/support and ask to join the Stackdriver Loadbalancing metrics Beta.**

### Metrics

<%= get_metrics_from_git() %>


### Tags Assigned

Tags are automatically assigned based on a variety of configuration options with regards to Google Cloud Platform and the Google Compute Engine. The following tags will be automatically assigned:

* Zone
* Instance-type
* Instance-id
* Automatic-restart
* On-host-maintenance
* Project
* Numeric_project_id
* Name

To learn more about tags in the Datadog platform, refer to the [Guide to Tagging](/guides/tagging)

[1]: https://support.google.com/cloud/answer/6293499?hl=en
