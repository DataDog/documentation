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

### Installation

From the Integrations page in the Datadog app, select the Google Cloud Platform tile. Switch to the **Configuration** tab and click the **Sign in with Google** button. After you allow access you can add the Project you wish to monitor. Enter the Project ID for each project. The Project ID is the multi-word id and not the Project Number.

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
