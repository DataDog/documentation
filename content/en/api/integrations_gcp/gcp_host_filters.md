---
title: Update a GCP integration host filters
type: apicontent
order: 17.5
external_redirect: /api/#update-a-gcp-integration-host-filters
---

## Update a GCP integration host filters

Updates the defined list of host filters for a given Datadog-GCP integration.

##### ARGUMENTS

* **`project_id`** [*required*]:

    Your Google Cloud project ID found in your JSON service account key.

* **`client_email`** [*required*]:

    Your email found in your JSON service account key.


* **`host_filters`** [*optional*]:

    Limit the GCE instances that are pulled into Datadog by using tags. Only hosts that match one of the defined tags are imported into Datadog.
